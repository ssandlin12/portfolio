import type { CSSProperties } from "react";

// CONCEPT 03 — "SPINE"
// A single vertical hairline at x=504 (35% of 1440) organizes the entire composition.
// Strong side: RIGHT of the spine. Quiet side: LEFT.
// One node — a filled circle — sits EXACTLY on the spine.

const SPINE_X = 504; // 35% of 1440
const SPINE_TOP = 120;
const SPINE_BOTTOM = 1880;

export default function Concept03() {
  // tiny inline helpers, no state
  const spineLine: CSSProperties = {
    left: SPINE_X,
    top: SPINE_TOP,
    width: 1,
    height: SPINE_BOTTOM - SPINE_TOP,
  };

  return (
    <div className="w-[1440px] h-[2000px] relative overflow-hidden bg-white text-black">
      {/* ── THE SPINE ─────────────────────────────────────────────── */}
      <div className="absolute bg-black" style={spineLine} aria-hidden />

      {/* ── CORNER MICRO-LABELS (sheet metadata, very quiet) ──────── */}
      <div
        className="absolute font-mono text-[10px] tracking-[0.18em] uppercase text-black/40"
        style={{ left: 48, top: 48 }}
      >
        Sheet 03 / 06
      </div>
      <div
        className="absolute font-mono text-[10px] tracking-[0.18em] uppercase text-black/40"
        style={{ right: 48, top: 48 }}
      >
        Spine — 35%
      </div>

      {/* ── WORDMARK (quiet side, right-aligned to spine) ─────────── */}
      <div
        className="absolute text-right font-sans text-[14px] tracking-[0.22em] uppercase"
        style={{ right: 1440 - SPINE_X + 24, top: 168 }}
      >
        Atelier&nbsp;N
      </div>

      {/* ── HERO STATEMENT (strong side, left-aligned to spine) ──── */}
      {/* 3 lines, ~68px, generous leading */}
      <div
        className="absolute font-sans"
        style={{ left: SPINE_X + 32, top: 240 }}
      >
        <div className="text-[68px] leading-[1.06] tracking-[-0.02em] font-normal">
          A quiet practice
          <br />
          for brands that
          <br />
          intend to last.
        </div>
      </div>

      {/* ── NAV STACK (strong side, aligned to spine, mono) ───────── */}
      <div
        className="absolute font-mono text-[12px] tracking-[0.18em] uppercase leading-[2]"
        style={{ left: SPINE_X + 32, top: 568 }}
      >
        <div>Work</div>
        <div>Services</div>
        <div>About</div>
        <div>Contact</div>
      </div>

      {/* ── INDEX LABEL above selected work ───────────────────────── */}
      <div
        className="absolute font-mono text-[10px] tracking-[0.22em] uppercase text-black/40"
        style={{ left: SPINE_X + 32, top: 880 }}
      >
        Index — Selected
      </div>

      {/* ── SELECTED WORK (3 entries, hairline-separated rows) ────── */}
      <div
        className="absolute"
        style={{ left: SPINE_X + 32, top: 916, width: 760 }}
      >
        {/* row 01 */}
        <div className="border-t border-black flex items-baseline justify-between py-5">
          <div className="font-sans text-[22px] tracking-[-0.01em]">
            North Field
          </div>
          <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-black/60">
            Hverr&nbsp;&nbsp;·&nbsp;&nbsp;Identity&nbsp;&nbsp;·&nbsp;&nbsp;2024
          </div>
        </div>
        {/* row 02 */}
        <div className="border-t border-black flex items-baseline justify-between py-5">
          <div className="font-sans text-[22px] tracking-[-0.01em]">
            Slow Press
          </div>
          <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-black/60">
            Marginalia&nbsp;&nbsp;·&nbsp;&nbsp;Editorial&nbsp;&nbsp;·&nbsp;&nbsp;2024
          </div>
        </div>
        {/* row 03 */}
        <div className="border-t border-black flex items-baseline justify-between py-5">
          <div className="font-sans text-[22px] tracking-[-0.01em]">
            Halflight
          </div>
          <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-black/60">
            Verre&nbsp;&nbsp;·&nbsp;&nbsp;Interface&nbsp;&nbsp;·&nbsp;&nbsp;2025
          </div>
        </div>
        {/* closing rule */}
        <div className="border-t border-black" />
      </div>

      {/* ── A SINGLE WORK PLACEHOLDER (transparent rect, hairline) ── */}
      {/* Sits on the strong side, low and small — a single hint of an image */}
      <div
        className="absolute border border-black"
        style={{ left: SPINE_X + 32, top: 1300, width: 220, height: 140 }}
        aria-hidden
      >
        <svg width="220" height="140" className="block">
          <line x1="0" y1="0" x2="220" y2="140" stroke="black" strokeWidth="1" />
          <line x1="220" y1="0" x2="0" y2="140" stroke="black" strokeWidth="1" />
        </svg>
      </div>
      <div
        className="absolute font-mono text-[10px] tracking-[0.18em] uppercase text-black/40"
        style={{ left: SPINE_X + 32, top: 1452 }}
      >
        Fig. 01 — Halflight, plate
      </div>

      {/* ── SERVICES (quiet side — asymmetric balance) ───────────── */}
      {/* right-aligned to spine, far below hero so the void above breathes */}
      <div
        className="absolute text-right"
        style={{ right: 1440 - SPINE_X + 24, top: 1300 }}
      >
        <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-black/40 mb-5">
          Disciplines
        </div>
        <div className="font-sans text-[18px] leading-[1.9] tracking-[-0.005em]">
          <div>Strategy</div>
          <div>Identity</div>
          <div>Editorial</div>
          <div>Interface</div>
          <div>Type</div>
        </div>
      </div>

      {/* ── THE NODE — single filled circle EXACTLY on the spine ── */}
      {/* 9px circle, vertically positioned between hero and work */}
      <div
        className="absolute bg-black rounded-full"
        style={{
          left: SPINE_X - 4,
          top: 836 - 4,
          width: 9,
          height: 9,
        }}
        aria-hidden
      />

      {/* ── COLOPHON / CONTACT — bottom of the spine, strong side ─ */}
      <div
        className="absolute font-mono text-[11px] tracking-[0.16em] uppercase leading-[1.9]"
        style={{ left: SPINE_X + 32, top: 1760 }}
      >
        <div className="text-black/40 mb-2">Contact</div>
        <div>hello@atelier-n.studio</div>
        <div>Reykjavík&nbsp;&nbsp;·&nbsp;&nbsp;52° 31′ N</div>
      </div>

      {/* ── COLOPHON — bottom of the spine, quiet side ───────────── */}
      <div
        className="absolute text-right font-mono text-[11px] tracking-[0.16em] uppercase leading-[1.9]"
        style={{ right: 1440 - SPINE_X + 24, top: 1760 }}
      >
        <div className="text-black/40 mb-2">Colophon</div>
        <div>MMXXVI</div>
        <div>03 / 06</div>
      </div>

      {/* ── SPINE TERMINUS MARKS (tiny ticks at top and bottom) ──── */}
      {/* a small filled square at the top of the spine, on-axis */}
      <div
        className="absolute bg-black"
        style={{ left: SPINE_X - 3, top: SPINE_TOP - 3, width: 7, height: 7 }}
        aria-hidden
      />
      {/* mirroring tick at the foot — same width as spine, slight cross */}
      <div
        className="absolute bg-black"
        style={{ left: SPINE_X - 12, top: SPINE_BOTTOM, width: 25, height: 1 }}
        aria-hidden
      />
    </div>
  );
}
