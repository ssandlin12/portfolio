// WVN "W" mark — silhouette only (single fill color so we can rasterize it
// to a binary mask and bake an SDF from it). The W is built from four
// chunky angled strokes (parallelograms) that overlap at the V valleys and
// the middle peak, plus the period-style dot to the right at baseline.
// The SDF baker takes the union. The pink accent triangle from the brand
// mark is omitted since the blob is monochromatic, but the dot is kept
// because it's a recognizable part of the wordmark's silhouette.
export const WVN_SVG = `<svg width="220" height="120" viewBox="0 0 220 120" fill="none" xmlns="http://www.w3.org/2000/svg">
<polygon points="0,0 26,0 76,120 50,120" fill="black"/>
<polygon points="50,120 76,120 102,30 78,30" fill="black"/>
<polygon points="78,30 102,30 130,120 104,120" fill="black"/>
<polygon points="104,120 130,120 180,0 154,0" fill="black"/>
<circle cx="200" cy="107" r="13" fill="black"/>
</svg>`;
