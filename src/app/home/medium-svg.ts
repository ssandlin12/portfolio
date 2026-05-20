// Medium logo silhouette — one big circle plus two progressively narrower
// tall ellipses, all sharing the same vertical baseline. Single fill so
// we can rasterize it to a binary mask and bake an SDF from it; the SDF
// baker takes the union.
export const MEDIUM_SVG = `<svg width="240" height="100" viewBox="0 0 240 100" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="50" cy="50" r="50" fill="black"/>
<ellipse cx="140" cy="50" rx="20" ry="48" fill="black"/>
<ellipse cx="200" cy="50" rx="10" ry="46" fill="black"/>
</svg>`;
