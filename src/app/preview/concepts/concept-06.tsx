import type { CSSProperties } from "react";

// Band heights (must sum to exactly 2000):
//  A: 72   (thin top wayfinding)
//  B: 620  (tall hero / positioning)
//  C: 88   (thin caption strip)
//  D: 460  (selected work)
//  E: 320  (services)
//  F: 80   (contact / colophon)
//  G: 360  (oversized footer wordmark)
// Total = 72 + 620 + 88 + 460 + 320 + 80 + 360 = 2000

const tickerLine =
  "INDEPENDENT STUDIO  ·  EST. 2018  ·  STRATEGY · IDENTITY · INTERFACE · BUILD  ·  CURRENTLY ACCEPTING WORK FOR Q3  ·  ";

const workEntries = [
  {
    no: "I",
    name: "Hemlock & Hare",
    client: "Hemlock & Hare Pty.",
    year: "2025",
    tags: ["Identity", "Type", "Editorial"],
  },
  {
    no: "II",
    name: "North Atlas",
    client: "Atlas Cartography",
    year: "2024",
    tags: ["Interface", "Build", "Brand"],
  },
  {
    no: "III",
    name: "Field Notes Vol. 04",
    client: "Cabin Press",
    year: "2024",
    tags: ["Editorial", "Type"],
  },
  {
    no: "IV",
    name: "Signal/Noise",
    client: "Hertz Industries",
    year: "2023",
    tags: ["Strategy", "Identity"],
  },
];

const services = [
  { no: "01", name: "Strategy", note: "Positioning, naming, narrative." },
  { no: "02", name: "Identity", note: "Marks, systems, guidelines." },
  { no: "03", name: "Interface", note: "Product, web, editorial UI." },
  { no: "04", name: "Build", note: "Front-end, CMS, deployment." },
  { no: "05", name: "Editorial", note: "Print, books, periodicals." },
  { no: "06", name: "Type", note: "Custom letterforms, wordmarks." },
];

function DiagonalCross() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
    >
      <line x1="0" y1="0" x2="100" y2="100" stroke="black" strokeWidth="0.3" vectorEffect="non-scaling-stroke" />
      <line x1="100" y1="0" x2="0" y2="100" stroke="black" strokeWidth="0.3" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

export default function Concept06() {
  // helper for consistent band container (full-width, top hairline supplied by previous band's bottom)
  const band: CSSProperties = { width: 1440 };

  return (
    <div className="w-[1440px] h-[2000px] relative overflow-hidden border border-black bg-white text-black font-sans">
      {/* ============================================================ */}
      {/* BAND A — 72px — thin top wayfinding strip                    */}
      {/* ============================================================ */}
      <section
        style={{ ...band, height: 72 }}
        className="relative flex items-center justify-between px-10 border-b border-black"
      >
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-black" />
          <span className="font-sans font-bold tracking-[-0.02em] text-[20px] leading-none">
            ATELIER&nbsp;N
          </span>
        </div>

        <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-black/40">
          A — Index / Wayfinding
        </div>

        <nav className="flex items-center gap-8 font-mono text-[12px] uppercase tracking-[0.16em]">
          <span>Work</span>
          <span>Services</span>
          <span>About</span>
          <span>Contact</span>
          <span className="text-black/40">06/06</span>
        </nav>
      </section>

      {/* ============================================================ */}
      {/* BAND B — 620px — TALL HERO / positioning statement           */}
      {/* ============================================================ */}
      <section
        style={{ ...band, height: 620 }}
        className="relative border-b border-black"
      >
        {/* mono micro-grid labels at top of band */}
        <div className="absolute top-6 left-10 font-mono text-[11px] uppercase tracking-[0.18em] text-black/40">
          B / Manifesto
        </div>
        <div className="absolute top-6 right-10 font-mono text-[11px] uppercase tracking-[0.18em] text-black/40">
          N° 01 — Positioning
        </div>

        {/* huge anchoring numeral */}
        <div
          className="absolute left-10 font-sans font-medium leading-none tracking-[-0.06em] select-none"
          style={{ top: 70, fontSize: 380 }}
        >
          01
        </div>

        {/* positioning statement, right-aligned, large display */}
        <div className="absolute right-10" style={{ top: 150, width: 760 }}>
          <h1 className="font-sans font-medium tracking-[-0.035em] leading-[0.92] text-[92px]">
            An independent
            <br />
            studio designing
            <br />
            &amp; building
            <br />
            <span className="italic font-normal">digital products</span>
            <br />
            with care.
          </h1>
        </div>

        {/* lower-left tag cluster */}
        <div className="absolute left-10 bottom-8 flex items-center gap-6 font-mono text-[12px] uppercase tracking-[0.16em]">
          <span className="w-2 h-2 bg-black inline-block" />
          <span>Brooklyn / Remote</span>
          <span className="text-black/40">—</span>
          <span>Est. 2018</span>
          <span className="text-black/40">—</span>
          <span>Independent</span>
        </div>

        {/* lower-right scroll-cue (static) */}
        <div className="absolute right-10 bottom-8 flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.16em]">
          <span>Descend</span>
          <span className="block w-12 h-px bg-black" />
          <span className="w-2 h-2 bg-black inline-block" />
        </div>
      </section>

      {/* ============================================================ */}
      {/* BAND C — 88px — thin mono caption ticker                     */}
      {/* ============================================================ */}
      <section
        style={{ ...band, height: 88 }}
        className="relative border-b border-black flex items-center overflow-hidden"
      >
        <div className="absolute left-10 top-3 font-mono text-[10px] uppercase tracking-[0.2em] text-black/40">
          C / Ticker
        </div>
        <div className="absolute right-10 top-3 font-mono text-[10px] uppercase tracking-[0.2em] text-black/40">
          ↳ continues
        </div>

        {/* repeated mono "ticker" line, large */}
        <div className="w-full whitespace-nowrap font-mono uppercase text-[22px] tracking-[0.04em] pt-4">
          {tickerLine.repeat(4)}
        </div>
      </section>

      {/* ============================================================ */}
      {/* BAND D — 460px — selected work, 4-up wireframe rectangles    */}
      {/* ============================================================ */}
      <section
        style={{ ...band, height: 460 }}
        className="relative border-b border-black px-10 pt-8 pb-8"
      >
        {/* band header row */}
        <div className="flex items-end justify-between mb-6">
          <div className="flex items-baseline gap-5">
            <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-black/40">
              D / 02
            </span>
            <h2 className="font-sans font-medium tracking-[-0.03em] text-[44px] leading-none">
              Selected Work
            </h2>
          </div>
          <div className="font-mono text-[12px] uppercase tracking-[0.16em]">
            <span className="text-black/40">Showing&nbsp;</span>
            04 of 27 &nbsp;→
          </div>
        </div>

        {/* 4-column work grid */}
        <div className="grid grid-cols-4 gap-6">
          {workEntries.map((w) => (
            <div key={w.no} className="flex flex-col">
              {/* placeholder rectangle, transparent w/ diagonal cross */}
              <div className="relative border border-black w-full" style={{ height: 220 }}>
                <DiagonalCross />
                <span className="absolute top-2 left-2 font-mono text-[10px] uppercase tracking-[0.18em]">
                  {w.no}
                </span>
                <span className="absolute bottom-2 right-2 font-mono text-[10px] uppercase tracking-[0.18em] text-black/40">
                  {w.year}
                </span>
              </div>

              {/* caption block */}
              <div className="mt-3 border-t border-black pt-2">
                <div className="font-sans font-medium tracking-[-0.02em] text-[20px] leading-tight">
                  {w.name}
                </div>
                <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-black/40 mt-1">
                  {w.client}
                </div>
                <div className="font-mono text-[11px] uppercase tracking-[0.14em] mt-2 flex flex-wrap gap-x-2">
                  {w.tags.map((t, i) => (
                    <span key={t}>
                      {t}
                      {i < w.tags.length - 1 ? " ·" : ""}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* BAND E — 320px — services, 6-column grid                     */}
      {/* ============================================================ */}
      <section
        style={{ ...band, height: 320 }}
        className="relative border-b border-black px-10 pt-8 pb-8"
      >
        <div className="flex items-end justify-between mb-8">
          <div className="flex items-baseline gap-5">
            <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-black/40">
              E / 03
            </span>
            <h2 className="font-sans font-medium tracking-[-0.03em] text-[44px] leading-none">
              Disciplines
            </h2>
          </div>
          <div className="font-mono text-[12px] uppercase tracking-[0.16em] text-black/40">
            Six practices, one studio
          </div>
        </div>

        {/* 6-column discipline grid */}
        <div className="grid grid-cols-6 border-t border-black">
          {services.map((s) => (
            <div
              key={s.no}
              className="border-r border-black last:border-r-0 pt-4 pr-3 pb-2 min-h-[180px] flex flex-col justify-between"
            >
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-black/40">
                  {s.no}
                </div>
                <div className="font-sans font-medium tracking-[-0.025em] text-[28px] leading-tight mt-3">
                  {s.name}
                </div>
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.12em] leading-snug mt-6">
                {s.note}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* BAND F — 80px — thin contact / colophon                      */}
      {/* ============================================================ */}
      <section
        style={{ ...band, height: 80 }}
        className="relative border-b border-black px-10 flex items-center justify-between"
      >
        <div className="flex items-center gap-4 font-mono text-[12px] uppercase tracking-[0.16em]">
          <span className="w-2 h-2 bg-black inline-block" />
          <span className="text-black/40">Write:</span>
          <span className="font-sans font-medium tracking-[-0.01em] text-[16px] normal-case">
            hello@atelier-n.studio
          </span>
        </div>

        <div className="font-mono text-[12px] uppercase tracking-[0.16em]">
          <span className="text-black/40">Located:</span>{" "}
          <span>Brooklyn, NY · 40.6782° N</span>
        </div>

        <div className="flex items-center gap-4 font-mono text-[12px] uppercase tracking-[0.16em]">
          <span>© 2026</span>
          <span className="block w-8 h-px bg-black" />
          <span className="font-sans font-medium text-[16px] tracking-[-0.01em]">06 / 06</span>
          <span className="w-3 h-3 rounded-full bg-black inline-block" />
        </div>
      </section>

      {/* ============================================================ */}
      {/* BAND G — 360px — oversized footer wordmark / signoff         */}
      {/* ============================================================ */}
      <section
        style={{ ...band, height: 360 }}
        className="relative overflow-hidden"
      >
        {/* mono micro-row at top of band */}
        <div className="absolute top-6 left-10 right-10 flex justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-black/40">
          <span>G / Signoff</span>
          <span>End of transmission</span>
          <span>06 — 06</span>
        </div>

        {/* huge wordmark */}
        <div
          className="absolute left-0 right-0 text-center font-sans font-medium tracking-[-0.05em] leading-[0.82] select-none"
          style={{ top: 60, fontSize: 280 }}
        >
          ATELIER&nbsp;N
        </div>

        {/* bottom signoff row */}
        <div className="absolute bottom-6 left-10 right-10 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em]">
          <span className="flex items-center gap-3">
            <span className="w-2 h-2 bg-black inline-block" />
            An independent practice
          </span>
          <span className="text-black/40">— Wireframe / Concept 06 —</span>
          <span className="flex items-center gap-3">
            Available Q3 2026
            <span className="w-2 h-2 bg-black inline-block" />
          </span>
        </div>
      </section>
    </div>
  );
}
