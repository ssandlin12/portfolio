import type { CSSProperties } from "react";

export default function Concept04() {
  // HORIZON: a single horizontal hairline at y = 1300 (low horizon, 65% from top).
  // Sky (above) is the void. Earth (below) holds the wordmark, hero, nav, and indices.
  // One accent — a small filled black circle — sits EXACTLY on the horizon, off-center,
  // like a sun resting on the line. A single corner label lives in the void.

  const HORIZON_Y = 1300; // 65% from top
  const HORIZON_INSET = 80; // breathing margin from each edge
  const SUN_X = 1056; // off-center accent on the horizon
  const SUN_SIZE = 10;

  const horizonRule: CSSProperties = {
    position: "absolute",
    left: HORIZON_INSET,
    right: HORIZON_INSET,
    top: HORIZON_Y,
    height: 1,
    background: "#000",
  };

  const sun: CSSProperties = {
    position: "absolute",
    left: SUN_X - SUN_SIZE / 2,
    top: HORIZON_Y - SUN_SIZE / 2,
    width: SUN_SIZE,
    height: SUN_SIZE,
    background: "#000",
    borderRadius: "9999px",
  };

  return (
    <div className="w-[1440px] h-[2000px] relative overflow-hidden bg-white text-black">
      {/* ───────────────────── VOID (above horizon) ───────────────────── */}
      {/* A single mono micro-label in the upper-left corner of the sky.
          The only inhabitant of the void — a colophon whisper. */}
      <div
        className="absolute font-mono text-[11px] tracking-[0.18em] uppercase text-black/40"
        style={{ left: 96, top: 96 }}
      >
        MMXXVI &nbsp; — &nbsp; A QUIET PRACTICE
      </div>

      {/* Upper-right: section index, mono, ultra low contrast. */}
      <div
        className="absolute font-mono text-[11px] tracking-[0.18em] uppercase text-black/40"
        style={{ right: 96, top: 96, textAlign: "right" }}
      >
        04 / 06
      </div>

      {/* ───────────────────── THE HORIZON ───────────────────── */}
      <div style={horizonRule} />
      <div style={sun} aria-hidden />

      {/* ───────────────────── EARTH (below horizon) ───────────────────── */}
      {/* Wordmark — sits just below the horizon line, left-aligned at 96px. */}
      <div
        className="absolute font-sans"
        style={{ left: 96, top: HORIZON_Y + 56 }}
      >
        <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-black/40">
          Studio
        </div>
        <div
          className="font-sans"
          style={{
            fontSize: 28,
            lineHeight: 1.05,
            letterSpacing: "-0.01em",
            fontWeight: 500,
            marginTop: 8,
          }}
        >
          ATELIER N
        </div>
      </div>

      {/* Hero positioning statement — the loudest typography on the page,
          hanging just below the wordmark, treating the horizon as a baseline. */}
      <div
        className="absolute font-sans"
        style={{
          left: 96,
          top: HORIZON_Y + 140,
          width: 920,
          fontSize: 72,
          lineHeight: 1.08,
          letterSpacing: "-0.025em",
          fontWeight: 400,
        }}
      >
        <div>Design that</div>
        <div>holds its breath.</div>
      </div>

      {/* Hairline divider between hero and the indices. */}
      <div
        className="absolute"
        style={{
          left: 96,
          width: 1248,
          top: HORIZON_Y + 360,
          height: 1,
          background: "#000",
        }}
      />

      {/* Three-column index row: NAV · SELECTED WORK · SERVICES. */}
      {/* Each column is a quiet, mono micro-list. */}
      <div
        className="absolute"
        style={{ left: 96, top: HORIZON_Y + 388, width: 1248 }}
      >
        <div className="grid grid-cols-12 gap-x-8">
          {/* Column 1 — Index / nav. */}
          <div className="col-span-3">
            <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-black/40">
              Index
            </div>
            <ul className="mt-6 font-sans" style={{ fontSize: 18, lineHeight: 1.9 }}>
              <li>Work</li>
              <li>Services</li>
              <li>Contact</li>
            </ul>
          </div>

          {/* Column 2 — Selected work. Three entries: name · client · year · tag. */}
          <div className="col-span-6">
            <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-black/40">
              Selected — 2024 / 26
            </div>
            <ul
              className="mt-6 font-sans"
              style={{ fontSize: 16, lineHeight: 1.7 }}
            >
              <li className="grid grid-cols-12 gap-x-4 py-2 border-b border-black">
                <span className="col-span-1 font-mono text-[11px] tracking-[0.18em] text-black/40">
                  01
                </span>
                <span className="col-span-5">Quiet Field</span>
                <span className="col-span-3 font-mono text-[12px] uppercase tracking-[0.12em] text-black/40">
                  Halden Press
                </span>
                <span className="col-span-2 font-mono text-[12px] uppercase tracking-[0.12em] text-black/40">
                  Editorial
                </span>
                <span className="col-span-1 font-mono text-[12px] text-right text-black/40">
                  ’25
                </span>
              </li>
              <li className="grid grid-cols-12 gap-x-4 py-2 border-b border-black">
                <span className="col-span-1 font-mono text-[11px] tracking-[0.18em] text-black/40">
                  02
                </span>
                <span className="col-span-5">North Atlas</span>
                <span className="col-span-3 font-mono text-[12px] uppercase tracking-[0.12em] text-black/40">
                  Maren &amp; Co.
                </span>
                <span className="col-span-2 font-mono text-[12px] uppercase tracking-[0.12em] text-black/40">
                  Identity
                </span>
                <span className="col-span-1 font-mono text-[12px] text-right text-black/40">
                  ’25
                </span>
              </li>
              <li className="grid grid-cols-12 gap-x-4 py-2 border-b border-black">
                <span className="col-span-1 font-mono text-[11px] tracking-[0.18em] text-black/40">
                  03
                </span>
                <span className="col-span-5">Slow Index</span>
                <span className="col-span-3 font-mono text-[12px] uppercase tracking-[0.12em] text-black/40">
                  Forrest Bureau
                </span>
                <span className="col-span-2 font-mono text-[12px] uppercase tracking-[0.12em] text-black/40">
                  Interface
                </span>
                <span className="col-span-1 font-mono text-[12px] text-right text-black/40">
                  ’24
                </span>
              </li>
            </ul>
          </div>

          {/* Column 3 — Services. */}
          <div className="col-span-3">
            <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-black/40">
              Practice
            </div>
            <ul
              className="mt-6 font-sans"
              style={{ fontSize: 16, lineHeight: 1.9 }}
            >
              <li>Identity</li>
              <li>Editorial</li>
              <li>Interface</li>
              <li>Type</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ───────────────────── FOOTER COLOPHON ───────────────────── */}
      {/* A single hairline near the bottom, then mono micro-copy. */}
      <div
        className="absolute"
        style={{
          left: 96,
          width: 1248,
          bottom: 96,
          height: 1,
          background: "#000",
        }}
      />
      <div
        className="absolute font-mono text-[11px] tracking-[0.18em] uppercase text-black/40 flex items-center justify-between"
        style={{ left: 96, right: 96, bottom: 60 }}
      >
        <span>hello@atelier-n.studio</span>
        <span>Oslo · Lisbon</span>
        <span>MMXXVI</span>
      </div>
    </div>
  );
}
