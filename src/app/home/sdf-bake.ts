// Bakes a 2D signed distance field from an SVG silhouette at runtime.
//
// Pipeline:
//   1. Rasterize the SVG to a binary mask via an off-screen <canvas>.
//   2. Run a 2D Euclidean Distance Transform (Felzenszwalb–Huttenlocher) on
//      both the inside and outside of the mask.
//   3. Combine: signed distance = sqrt(d²_outside) - sqrt(d²_inside).
//   4. Pack to 8-bit luminance, centered at 128 with a fixed pixel range.
//
// Returns a Uint8Array suitable for upload as a WebGL LUMINANCE texture.

export type SdfBake = {
  data: Uint8Array;
  size: number;
  /** Pixel range encoded across the 0..255 byte range (±sdfRange pixels). */
  sdfRange: number;
};

export async function bakeSdfFromSvg(
  svgString: string,
  size = 256,
  contentScale = 0.78,
): Promise<SdfBake> {
  // 1. Rasterize SVG to a binary mask via an offscreen canvas.
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("2D canvas context unavailable");

  // Use a data URL (more reliable than Blob URLs for SVG-as-image) and
  // wire up listeners BEFORE setting src so synchronous load completion
  // (e.g. cached) doesn't slip past the Promise.
  const img = new Image();
  const loaded = new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error("SVG image failed to load"));
  });
  img.src = `data:image/svg+xml;base64,${typeof btoa === "function" ? btoa(svgString) : Buffer.from(svgString).toString("base64")}`;
  await loaded;
  if (img.naturalWidth === 0 || img.naturalHeight === 0) {
    throw new Error(
      `SVG decoded with zero dimensions (${img.naturalWidth}x${img.naturalHeight}) — check width/height attrs`,
    );
  }

  // Fit the SVG into a centered square inside the texture, preserving its
  // aspect ratio (so the silhouette doesn't squash) and leaving margin so
  // the SDF has room to encode the distance field around the silhouette.
  const aspect = img.naturalWidth / img.naturalHeight;
  const fit = size * contentScale;
  const drawW = aspect >= 1 ? fit : fit * aspect;
  const drawH = aspect >= 1 ? fit / aspect : fit;
  const offX = (size - drawW) / 2;
  const offY = (size - drawH) / 2;
  ctx.clearRect(0, 0, size, size);
  ctx.drawImage(img, offX, offY, drawW, drawH);

  const imgData = ctx.getImageData(0, 0, size, size);
  const inside = new Uint8Array(size * size);
  let insideCount = 0;
  // Use any non-zero alpha (rather than > 128) so anti-aliased edge pixels
  // count too — and so we don't miss anything if the SVG renderer produces
  // pre-multiplied or low-alpha output.
  for (let i = 0; i < size * size; i++) {
    const isInside = imgData.data[i * 4 + 3] > 0 ? 1 : 0;
    inside[i] = isInside;
    insideCount += isInside;
  }
  if (insideCount === 0) {
    throw new Error(
      `SVG rasterized to empty mask — drawImage drew nothing opaque. natural=${img.naturalWidth}x${img.naturalHeight}`,
    );
  }

  // 2 + 3. Compute signed Euclidean distance field (in pixel units).
  const sdfPixels = computeSignedEDT(inside, size, size);

  // 4. Pack to 8-bit. Encode ±sdfRange pixel-distance across [0, 255].
  const sdfRange = size * 0.25;
  const packed = new Uint8Array(size * size);
  for (let i = 0; i < size * size; i++) {
    const norm = sdfPixels[i] / sdfRange; // [-1, 1] within range, clamped
    packed[i] = Math.max(0, Math.min(255, Math.round(norm * 127 + 128)));
  }

  return { data: packed, size, sdfRange };
}

// Felzenszwalb–Huttenlocher 1D EDT — operates on a Float32Array in place.
//
// IMPORTANT: positions where src[q] == Infinity are *not* sources and must
// be skipped when building the parabola lower envelope. Including them would
// produce Inf − Inf = NaN intersections, and NaN comparisons (always false)
// would freeze the active-parabola pointer and corrupt every distance read
// after the first source. The output for skipped positions is filled in by
// the second pass via the envelope of the actual sources.
function edt1d(f: Float32Array, n: number): void {
  const v = new Int32Array(n);
  const z = new Float32Array(n + 1);
  const src = new Float32Array(n);
  for (let q = 0; q < n; q++) src[q] = f[q];

  // Find first finite-valued source. If none, every output is Infinity.
  let first = 0;
  while (first < n && !isFinite(src[first])) first++;
  if (first >= n) {
    for (let q = 0; q < n; q++) f[q] = Infinity;
    return;
  }

  v[0] = first;
  z[0] = -Infinity;
  z[1] = +Infinity;
  let k = 0;
  for (let q = first + 1; q < n; q++) {
    if (!isFinite(src[q])) continue;
    let s = 0;
    do {
      const r = v[k];
      s = (src[q] + q * q - src[r] - r * r) / (2 * (q - r));
    } while (s <= z[k] && --k > -1);
    k++;
    v[k] = q;
    z[k] = s;
    z[k + 1] = +Infinity;
  }

  k = 0;
  for (let q = 0; q < n; q++) {
    while (z[k + 1] < q) k++;
    const r = v[k];
    f[q] = (q - r) * (q - r) + src[r];
  }
}

// 2D EDT via two passes of 1D EDT (rows then columns).
function edt(input: Float32Array, w: number, h: number): Float32Array {
  const result = new Float32Array(input);
  const f = new Float32Array(Math.max(w, h));

  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) f[y] = result[y * w + x];
    edt1d(f, h);
    for (let y = 0; y < h; y++) result[y * w + x] = f[y];
  }
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) f[x] = result[y * w + x];
    edt1d(f, w);
    for (let x = 0; x < w; x++) result[y * w + x] = f[x];
  }
  return result;
}

function computeSignedEDT(
  mask: Uint8Array,
  w: number,
  h: number,
): Float32Array {
  const out = new Float32Array(w * h);
  for (let i = 0; i < w * h; i++) out[i] = mask[i] ? 0 : Infinity;
  const distOut = edt(out, w, h);

  const inn = new Float32Array(w * h);
  for (let i = 0; i < w * h; i++) inn[i] = mask[i] ? Infinity : 0;
  const distIn = edt(inn, w, h);

  const sdf = new Float32Array(w * h);
  for (let i = 0; i < w * h; i++) {
    sdf[i] = Math.sqrt(distOut[i]) - Math.sqrt(distIn[i]);
  }
  return sdf;
}
