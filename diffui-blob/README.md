# diffui-blob

Self-contained ray-marched WebGL blob, packaged for drop-in use in any project. Two files, zero dependencies, vanilla ES modules.

```
diffui-blob/
├── diffui-blob-shader.js   GLSL programs + raw WebGL wrapper (the engine)
├── diffui-blob.js          <diffui-blob> custom element (the easy path)
├── index.html              Demo / smoke test
└── README.md
```

## Quick start

Copy the `diffui-blob/` folder into your project, then either:

### A — Custom element (recommended)

```html
<script type="module" src="./diffui-blob/diffui-blob.js"></script>

<diffui-blob></diffui-blob>
<diffui-blob simple color-mode="2"></diffui-blob>
<diffui-blob simple energy="0.25" speed="0.20"></diffui-blob>
```

The element owns the WebGL context, RAF loop, ResizeObserver, and `visibilitychange` pause/resume. Disconnect it from the DOM and everything is cleaned up.

### B — Raw API

```js
import {
  initBlobRenderer,
  renderBlob,
  resizeBlobRenderer,
  disposeBlobRenderer,
} from "./diffui-blob/diffui-blob-shader.js";

const canvas = document.querySelector("canvas");
const r = initBlobRenderer(canvas, { simple: true, energy: 1.0, grain: 0.05 });

const start = performance.now();
const tick = (now) => {
  const t = (now - start) * 0.001 * 0.30;
  renderBlob(r, t, { fuzz: 1.5, rim: 4.0, rotateRad: 0, smooth: 0, colorMode: 1 });
  requestAnimationFrame(tick);
};
requestAnimationFrame(tick);

// When you're done:
// disposeBlobRenderer(r);
```

## Attributes (custom element)

| Attribute      | Default | Notes |
|---|---|---|
| `simple`       | —       | Boolean. Uses `SIMPLE_FS` (single metaball + fold/ripple field) instead of the heavier multi-metaball `FS`. |
| `energy`       | `1.0`   | Fold/wave amplitude. **Per-instance** — changing it rebuilds the renderer. |
| `grain`        | `0.05`  | Surface grain strength. **Per-instance** — changing it rebuilds. |
| `color-mode`   | `1`     | `0` onyx black, `1` BLUE (deep navy → cyan), `2` DARK (vertical near-white-to-black fade). |
| `fuzz`         | `1.5`   | Fresnel rim glow strength. |
| `rim`          | `4.0`   | Rim falloff exponent. |
| `smooth`       | `0`     | Extra smin radius for metaball fusion (complex shader only). |
| `rotate-rad`   | `0`     | Additive Y-rotation offset (radians). |
| `speed`        | `0.30`  | Time-scale multiplier. |
| `paused`       | —       | Boolean. Halts the RAF loop. Removing the attribute resumes. |

## Two shaders, one renderer

- **`FS`** — Complex five-metaball blob with deep fold-field surface displacement. ~80 ray-march iterations. Heavier; use for hero-scale canvases.
- **`SIMPLE_FS`** — Single metaball with stacked wave/ripple layers. Cheaper; use for many small blobs (avatar-sized chips in a grid, etc.).

Switch with the `simple` attribute (custom element) or `opts.simple` (raw API). The same uniform set drives both — uniforms the simple shader doesn't reference (`u_morph`, `u_smooth`, `u_grain`, `u_aspect`) are silently ignored.

## Color modes

Mode definitions live in GLSL inside `diffui-blob-shader.js` (one `if/else if/else` block per shader). To add a new palette, append another branch and bump the mode integer.

## Sizing + DPR

The renderer reads `canvas.clientWidth/clientHeight` on every `renderBlob` call and resizes the backing store to `min(devicePixelRatio, 1.5) × CSS pixels`. The DPR cap of 1.5 trades a bit of sharpness for big perf wins on retina screens where the ray-march cost scales with pixel count.

## License

Use it however you want — extract, fork, embed.
