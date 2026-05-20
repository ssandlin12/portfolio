// <diffui-blob> — Drop-in custom element wrapping the ray-marched blob
// shader. Owns the WebGL renderer + RAF loop + resize observer so
// consumers only have to write markup.
//
//   <diffui-blob></diffui-blob>                          // complex shader, BLUE
//   <diffui-blob simple></diffui-blob>                   // SIMPLE_FS, BLUE
//   <diffui-blob simple color-mode="2"></diffui-blob>    // SIMPLE_FS, DARK
//
// Supported attributes (all optional, observed at runtime):
//   simple              — use SIMPLE_FS instead of FS
//   energy="1.0"        — fold/wave amplitude (per-instance, set at init)
//   grain="0.05"        — surface grain strength (per-instance, set at init)
//   color-mode="1"      — 0 onyx, 1 BLUE, 2 DARK vertical fade
//   fuzz="1.5"          — rim glow strength
//   rim="4.0"           — rim falloff exponent
//   smooth="0"          — extra smin radius for metaball fusion
//   rotate-rad="0"      — additive Y-rotation offset
//   speed="0.30"        — time-scale multiplier
//   paused              — stops the RAF loop (still renders last frame)
//
// Changing `simple`, `energy`, or `grain` after mount rebuilds the
// renderer. Everything else is read per-frame.

import {
  initBlobRenderer,
  renderBlob,
  resizeBlobRenderer,
  disposeBlobRenderer,
} from "./diffui-blob-shader.js";

const template = document.createElement("template");
template.innerHTML = `
  <style>
    :host {
      display: block;
      width: 200px;
      height: 200px;
    }
    canvas {
      width: 100%;
      height: 100%;
      display: block;
    }
  </style>
  <canvas></canvas>
`;

const numAttr = (el, name, fallback) => {
  const v = el.getAttribute(name);
  if (v == null) return fallback;
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : fallback;
};
const intAttr = (el, name, fallback) => {
  const v = el.getAttribute(name);
  if (v == null) return fallback;
  const n = parseInt(v, 10);
  return Number.isFinite(n) ? n : fallback;
};

export class DiffuiBlob extends HTMLElement {
  static get observedAttributes() {
    return [
      "simple", "energy", "grain",
      "color-mode", "fuzz", "rim", "smooth", "rotate-rad", "speed",
      "paused",
    ];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this._canvas = this.shadowRoot.querySelector("canvas");
    this._renderer = null;
    this._raf = 0;
    this._start = 0;
    this._stopped = false;
  }

  connectedCallback() {
    this._mount();
    // Re-fit when the host's size changes so the blob always fills
    // the element without distortion.
    this._ro = new ResizeObserver(() => {
      if (this._renderer) resizeBlobRenderer(this._renderer);
    });
    this._ro.observe(this);
    this._onVis = () => {
      if (document.hidden) this._pauseLoop();
      else if (!this.hasAttribute("paused")) this._startLoop();
    };
    document.addEventListener("visibilitychange", this._onVis);
  }

  disconnectedCallback() {
    this._pauseLoop();
    if (this._ro) { this._ro.disconnect(); this._ro = null; }
    if (this._onVis) document.removeEventListener("visibilitychange", this._onVis);
    if (this._renderer) {
      disposeBlobRenderer(this._renderer);
      this._renderer = null;
    }
  }

  attributeChangedCallback(name) {
    if (!this.isConnected) return;
    // simple/energy/grain are baked into the renderer at init time —
    // rebuild on change. Everything else is read per-frame.
    if (name === "simple" || name === "energy" || name === "grain") {
      this._remount();
      return;
    }
    if (name === "paused") {
      this.hasAttribute("paused") ? this._pauseLoop() : this._startLoop();
    }
  }

  _mount() {
    this._renderer = initBlobRenderer(this._canvas, {
      simple: this.hasAttribute("simple"),
      energy: numAttr(this, "energy", 1.0),
      grain:  numAttr(this, "grain",  0.05),
    });
    if (!this._renderer) return;
    this._start = performance.now();
    if (!this.hasAttribute("paused")) this._startLoop();
    else this._renderOnce(0);
  }

  _remount() {
    this._pauseLoop();
    if (this._renderer) {
      disposeBlobRenderer(this._renderer);
      this._renderer = null;
    }
    this._mount();
  }

  _startLoop() {
    if (this._raf || !this._renderer) return;
    this._stopped = false;
    const tick = (now) => {
      if (this._stopped || !this._renderer) return;
      const speed = numAttr(this, "speed", 0.30);
      const t = (now - this._start) * 0.001 * speed;
      this._renderOnce(t);
      this._raf = requestAnimationFrame(tick);
    };
    this._raf = requestAnimationFrame(tick);
  }

  _pauseLoop() {
    this._stopped = true;
    if (this._raf) {
      cancelAnimationFrame(this._raf);
      this._raf = 0;
    }
  }

  _renderOnce(t) {
    if (!this._renderer) return;
    renderBlob(this._renderer, t, {
      fuzz:      numAttr(this, "fuzz",      1.5),
      rim:       numAttr(this, "rim",       4.0),
      rotateRad: numAttr(this, "rotate-rad", 0),
      smooth:    numAttr(this, "smooth",    0),
      colorMode: intAttr(this, "color-mode", 1),
    });
  }
}

if (!customElements.get("diffui-blob")) {
  customElements.define("diffui-blob", DiffuiBlob);
}
