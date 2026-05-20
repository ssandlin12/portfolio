"use client";

import { useEffect, useRef } from "react";
// Skipping the bundled custom-element wrapper — in React we own the
// lifecycle, so we drive the raw renderer directly.
import {
  initBlobRenderer,
  renderBlob,
  resizeBlobRenderer,
  disposeBlobRenderer,
  setBlobSdfTexture,
  setBlobFitablySdfTexture,
  setBlobWvnSdfTexture,
  setBlobDiffuiSdfTexture,
  setBlobBcSdfTexture,
} from "../../../diffui-blob/diffui-blob-shader.js";
import { TEAMS_SVG } from "./teams-svg";
import { FITABLY_SVG } from "./fitably-svg";
import { WVN_SVG } from "./wvn-svg";
import { DIFFUI_SVG } from "./diffui-svg";
import { MEDIUM_SVG } from "./medium-svg";
import { bakeSdfFromSvg } from "./sdf-bake";

type BlobProps = {
  /** Cheaper single-metaball shader vs. the heavier 5-metaball one. */
  simple?: boolean;
  /** 0 onyx · 1 BLUE · 2 DARK (vertical near-white→black fade). */
  colorMode?: 0 | 1 | 2;
  /** Time-scale multiplier applied to the RAF clock. */
  speed?: number;
  /** Per-frame uniforms (see diffui-blob README). */
  fuzz?: number;
  rim?: number;
  smooth?: number;
  rotateRad?: number;
  /** Per-instance — baked into the renderer at init. Changing rebuilds. */
  energy?: number;
  grain?: number;
  /** Morph amount TARGET: 0 = blob, 1 = morph target shape. The component
   *  exponentially eases the on-screen value toward this each frame. */
  morph?: number;
  /** Which target shape to morph into. 0 = MS 4-square, 1 = Teams. */
  morphTarget?: number;
};

export default function Blob({
  simple = true,
  colorMode = 2,
  speed = 0.30,
  fuzz = 1.5,
  rim = 4.0,
  smooth = 0,
  rotateRad = 0,
  energy = 1.0,
  grain = 0.05,
  morph = 0,
  morphTarget = 0,
}: BlobProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Per-frame params live in a ref so prop changes don't re-init the
  // renderer (only `simple` / `energy` / `grain` would need that).
  const paramsRef = useRef({ fuzz, rim, smooth, rotateRad, colorMode, morphTarget });
  paramsRef.current = { fuzz, rim, smooth, rotateRad, colorMode, morphTarget };
  const speedRef = useRef(speed);
  speedRef.current = speed;
  // Morph: `morph` prop is the destination amount; `morphAmount` is the
  // eased value the shader actually receives. Frame-rate-independent
  // exponential lerp.
  const morphTargetAmount = useRef(morph);
  morphTargetAmount.current = morph;
  const morphCurrent = useRef(morph);
  const lastFrameTime = useRef(0);
  // Rotation is accumulated in JS rather than computed in the shader
  // (angle = t × speed × (1 − morph) produces a visible angular snap when
  // the speed factor changes, because elapsed t gets retroactively
  // rescaled). Integrating dt × current_speed each frame avoids that.
  const angleAcc = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Renderer lives in a let so it can be rebuilt on webglcontextrestored
    // (the GL context tied to the old renderer is dead at that point).
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let renderer: any = null;
    let raf = 0;
    let stopped = false;
    let cancelled = false;
    const start = performance.now();

    const tick = (now: number) => {
      if (stopped || !renderer) return;
      const t = (now - start) * 0.001 * speedRef.current;

      // Frame-rate-independent exponential ease toward target. `tau` is the
      // ~time constant; smaller = snappier. 0.18s ≈ a comfortable morph.
      const dt = lastFrameTime.current === 0 ? 0.016 : (now - lastFrameTime.current) * 0.001;
      lastFrameTime.current = now;
      const tau = 0.18;
      const k = 1 - Math.exp(-dt / tau);
      morphCurrent.current += (morphTargetAmount.current - morphCurrent.current) * k;

      // Accumulate rotation. Base rate matches the original shader's
      // hardcoded 0.30 rad/s; the (1 − morph) factor decays it to 0 as
      // the blob settles into its morph target, then ramps back up.
      const spinRate = 0.30 * (1 - morphCurrent.current);
      angleAcc.current += dt * spinRate;

      renderBlob(renderer, t, {
        ...paramsRef.current,
        morph: morphCurrent.current,
        rotateRad: paramsRef.current.rotateRad + angleAcc.current,
      });
      raf = requestAnimationFrame(tick);
    };

    // Build the renderer, kick off SDF bakes, and start the RAF. Called
    // once on mount and again on webglcontextrestored. The `cancelled`
    // flag is checked in every bake callback so an in-flight bake from a
    // previous init can't write into the new renderer after unmount.
    const init = () => {
      renderer = initBlobRenderer(canvas, { simple, energy, grain });
      if (!renderer) return;

      // worldHalf for the texture-based targets is intentionally 0.575 (the
      // procedural MS mark uses its own hardcoded dimensions). Increasing
      // worldHalf maps the same UV → a larger world region, so the rendered
      // silhouette appears ~15% larger than the MS mark.
      bakeSdfFromSvg(TEAMS_SVG, 256)
        .then(({ data, size, sdfRange }) => {
          if (cancelled || !renderer) return;
          setBlobSdfTexture(renderer, data, size, sdfRange, 0.575);
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.error("[blob] Teams SDF bake failed:", err);
        });
      bakeSdfFromSvg(FITABLY_SVG, 256)
        .then(({ data, size, sdfRange }) => {
          if (cancelled || !renderer) return;
          // worldHalf 0.6325 = 0.575 * 1.10, i.e. 10% bigger than the MS/Teams
          // baseline so the non-Microsoft logos read a touch larger.
          setBlobFitablySdfTexture(renderer, data, size, sdfRange, 0.6325);
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.error("[blob] Fitably SDF bake failed:", err);
        });
      bakeSdfFromSvg(WVN_SVG, 256)
        .then(({ data, size, sdfRange }) => {
          if (cancelled || !renderer) return;
          // worldHalf 0.6325 = 0.575 * 1.10 — see Fitably above.
          setBlobWvnSdfTexture(renderer, data, size, sdfRange, 0.6325);
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.error("[blob] WVN SDF bake failed:", err);
        });
      bakeSdfFromSvg(DIFFUI_SVG, 256)
        .then(({ data, size, sdfRange }) => {
          if (cancelled || !renderer) return;
          // worldHalf 0.4741 = 0.575 * 0.75 * 1.10, i.e. the dense 3x3 pattern
          // keeps its 25% downscale (so it doesn't overwhelm the blob) and
          // then picks up the +10% bump applied to all non-Microsoft logos.
          setBlobDiffuiSdfTexture(renderer, data, size, sdfRange, 0.4741);
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.error("[blob] Diffui SDF bake failed:", err);
        });
      bakeSdfFromSvg(MEDIUM_SVG, 256)
        .then(({ data, size, sdfRange }) => {
          if (cancelled || !renderer) return;
          // worldHalf 0.6476 ≈ 0.575 * 1.10 * 1.10 * 0.93 — the Medium logo is
          // a wide 2.4:1 silhouette that only occupies ~42% of its square
          // texture, so it carries the same +10% non-Microsoft bump on top of
          // its one-off +10% aspect-ratio compensation, then a manual −7%
          // trim because at full size it was reading too heavy.
          setBlobBcSdfTexture(renderer, data, size, sdfRange, 0.6476);
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.error("[blob] Medium SDF bake failed:", err);
        });

      stopped = false;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    };

    init();

    const ro = new ResizeObserver(() => {
      if (renderer) resizeBlobRenderer(renderer);
    });
    ro.observe(canvas);

    // Pause while the tab is hidden; resume when it comes back. Note that
    // visibilitychange does NOT fire when a page is restored from the
    // browser's back-forward cache — see onPageShow below for that case.
    const onVis = () => {
      if (document.hidden) {
        stopped = true;
        cancelAnimationFrame(raf);
      } else if (stopped) {
        stopped = false;
        raf = requestAnimationFrame(tick);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    // Back-forward cache restore. When a page is restored from bfcache the
    // RAF that was running before navigation has long since stopped, but
    // visibilitychange doesn't fire to wake it up — only `pageshow` with
    // `persisted: true` does. Kick the RAF back on so the blob redraws.
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted && renderer) {
        stopped = false;
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(tick);
      }
    };
    window.addEventListener("pageshow", onPageShow);

    // WebGL context loss (most often on iOS Safari or after long bg time).
    // preventDefault on `webglcontextlost` allows the browser to attempt
    // restoration; on `webglcontextrestored` we throw away the dead
    // renderer and rebuild from scratch (textures included).
    const onContextLost = (e: Event) => {
      e.preventDefault();
      stopped = true;
      cancelAnimationFrame(raf);
    };
    const onContextRestored = () => {
      if (renderer) disposeBlobRenderer(renderer);
      renderer = null;
      init();
    };
    canvas.addEventListener("webglcontextlost", onContextLost);
    canvas.addEventListener("webglcontextrestored", onContextRestored);

    return () => {
      cancelled = true;
      stopped = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pageshow", onPageShow);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      canvas.removeEventListener("webglcontextrestored", onContextRestored);
      if (renderer) disposeBlobRenderer(renderer);
    };
    // simple / energy / grain are baked in at init — listing them here so
    // a change rebuilds the renderer.
  }, [simple, energy, grain]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%", display: "block" }}
      aria-hidden
    />
  );
}
