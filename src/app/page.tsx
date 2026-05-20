// Root route ("/") just renders the home page module. The actual page
// implementation lives in `_home/` (underscore = Next.js private folder,
// not exposed as its own route) so it stays grouped with its blob shader,
// SDF utilities, and SVG modules.
export { default } from "./_home/page";
