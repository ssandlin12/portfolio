// A transparent, single-color recreation of the Athenahealth leaf mark.
// The SDF baker consumes its alpha silhouette, so no white background is
// introduced when the homepage blob morphs into this shape.
export const ATHENAHEALTH_SVG = `
<svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M58 108V77.5C42.4 72.3 28.2 59.8 22.5 38.4C43.3 42.4 58.4 55.3 63 73.1V108H58Z" fill="#000"/>
  <path d="M63 107.7V76.5C68.3 54.1 83.3 40.8 104.5 36.5C101.3 61.4 86.2 80.2 63 88.4V107.7Z" fill="#000"/>
  <path d="M60 49C46.7 37.8 46.7 20.2 60 5.5C73.3 20.2 73.3 37.8 60 49Z" fill="#000"/>
  <circle cx="83.3" cy="32.5" r="8.1" fill="#000"/>
</svg>`;
