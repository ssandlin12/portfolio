// Diffui 3x3 grid mark — silhouette only (single fill color so we can
// rasterize it to a binary mask and bake an SDF from it). Nine equal
// 64x64 squares with a 4-unit gutter, packed inside a 200x200 viewBox.
// The SDF baker takes the union; in the morph this reads as a 3x3
// pattern of small rounded blobs.
export const DIFFUI_SVG = `<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0" y="0" width="64" height="64" fill="black"/>
<rect x="68" y="0" width="64" height="64" fill="black"/>
<rect x="136" y="0" width="64" height="64" fill="black"/>
<rect x="0" y="68" width="64" height="64" fill="black"/>
<rect x="68" y="68" width="64" height="64" fill="black"/>
<rect x="136" y="68" width="64" height="64" fill="black"/>
<rect x="0" y="136" width="64" height="64" fill="black"/>
<rect x="68" y="136" width="64" height="64" fill="black"/>
<rect x="136" y="136" width="64" height="64" fill="black"/>
</svg>`;
