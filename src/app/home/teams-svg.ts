// Microsoft Teams "people" mark — silhouette only (single fill color so we
// can rasterize it to a binary mask and bake an SDF from it). Geometry
// matches Frame 65.svg exactly; the multi-filter fills are stripped since
// we only need the path data for distance-field generation.
export const TEAMS_SVG = `<svg width="133" height="153" viewBox="0 0 133 153" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="43" y="61.6001" width="72.6" height="75.9" rx="22" fill="black"/>
<path d="M5.5 72.8005C5.5 62.4175 13.917 54.0005 24.3 54.0005H53.4764C63.6714 54.0005 72.0085 62.1263 72.2702 72.318L72.7999 92.9505C72.7999 92.9505 72.7999 86.9005 72.7999 111.375C72.7999 135.85 91.3999 137.5 91.3999 137.5H40.4502C30.9502 137.5 21.0999 134.53 14.4502 126.55C9.4502 120.55 5.5 112.55 5.5 91.9505V72.8005Z" fill="black"/>
<circle cx="39.7003" cy="27.5001" r="20.9" fill="black"/>
<circle cx="91.4003" cy="37.4003" r="17.6" fill="black"/>
</svg>`;
