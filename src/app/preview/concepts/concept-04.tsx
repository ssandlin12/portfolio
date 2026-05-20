export default function Concept04() {
  return (
    <div className="w-[1440px] h-[2000px] relative overflow-hidden border border-black bg-white text-black">
      {/* ─────────────────────────────────────────────
          Vertical wordmark — full-height left margin
          ───────────────────────────────────────────── */}
      <div
        className="absolute left-0 top-0 h-[2000px] w-[88px] border-r border-black flex items-center justify-center"
      >
        <div
          className="font-sans font-bold tracking-[-0.03em] leading-[0.85] text-[140px] whitespace-nowrap"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          WERKSTATT
        </div>
      </div>

      {/* Small mono label tucked at top of vertical column */}
      <div
        className="absolute font-mono text-[10px] tracking-[0.18em] uppercase"
        style={{ left: 32, top: 40, writingMode: "vertical-rl", transform: "rotate(180deg)" }}
      >
        Independent · Est. MMXX
      </div>

      {/* Small mono label at the bottom of vertical column */}
      <div
        className="absolute font-mono text-[10px] tracking-[0.18em] uppercase"
        style={{ left: 32, bottom: 40, writingMode: "vertical-rl", transform: "rotate(180deg)" }}
      >
        Vol. IV — Rotation
      </div>

      {/* ─────────────────────────────────────────────
          Top hairline + index marker
          ───────────────────────────────────────────── */}
      <div className="absolute left-[88px] right-0 top-[60px] border-t border-black" />

      <div className="absolute top-[24px] right-[56px] font-mono text-[11px] tracking-[0.2em]">
        N°04 — VI
      </div>

      <div className="absolute top-[24px] left-[120px] font-mono text-[11px] tracking-[0.2em] uppercase">
        Bureau / Werkstatt — Wireframe Concept
      </div>

      {/* ─────────────────────────────────────────────
          Top-right nav, stacked
          ───────────────────────────────────────────── */}
      <div className="absolute top-[96px] right-[56px] font-mono text-[12px] tracking-[0.18em] uppercase text-right leading-[1.9]">
        <div>Work_/01</div>
        <div>Services_/02</div>
        <div>About_/03</div>
        <div>Contact_/04</div>
      </div>

      {/* Filled circle Bauhaus marker — anchored top-right */}
      <div className="absolute top-[120px] right-[220px] w-[14px] h-[14px] rounded-full bg-black" />

      {/* ─────────────────────────────────────────────
          DIAGONAL HAIRLINE — cuts upper-mid region
          ───────────────────────────────────────────── */}
      <svg
        className="absolute inset-0 pointer-events-none"
        width={1440}
        height={2000}
        viewBox="0 0 1440 2000"
      >
        <line x1="120" y1="780" x2="1380" y2="420" stroke="black" strokeWidth="1" />
        {/* secondary short diagonal lower-right */}
        <line x1="900" y1="1620" x2="1380" y2="1480" stroke="black" strokeWidth="1" />
      </svg>

      {/* ─────────────────────────────────────────────
          HERO STATEMENT — primary horizontal axis
          ───────────────────────────────────────────── */}
      <div className="absolute left-[180px] top-[180px] w-[1080px]">
        <div className="font-mono text-[11px] tracking-[0.24em] uppercase mb-6">
          (01) — Positioning
        </div>
        <h1 className="font-sans font-medium text-[148px] leading-[0.86] tracking-[-0.045em]">
          An independent
          <br />
          studio designing
          <br />
          <span className="italic font-light">&amp; building</span> digital
          <br />
          products.
        </h1>
      </div>

      {/* small square marker floating near hero */}
      <div
        className="absolute bg-black"
        style={{ left: 1280, top: 360, width: 18, height: 18 }}
      />

      {/* ─────────────────────────────────────────────
          ROTATED BLOCK — services list tilted -12°
          ───────────────────────────────────────────── */}
      <div
        className="absolute"
        style={{
          left: 880,
          top: 880,
          transform: "rotate(-12deg)",
          transformOrigin: "top left",
        }}
      >
        <div className="border border-black w-[420px] p-8">
          <div className="font-mono text-[10px] tracking-[0.22em] uppercase mb-6 flex justify-between">
            <span>(02) Services</span>
            <span>—— IV disciplines</span>
          </div>
          <ul className="font-sans text-[28px] leading-[1.25] tracking-[-0.02em] font-medium">
            <li className="border-b border-black py-2 flex justify-between items-baseline">
              <span>Strategy</span>
              <span className="font-mono text-[10px] tracking-[0.18em]">i.</span>
            </li>
            <li className="border-b border-black py-2 flex justify-between items-baseline">
              <span>Identity</span>
              <span className="font-mono text-[10px] tracking-[0.18em]">ii.</span>
            </li>
            <li className="border-b border-black py-2 flex justify-between items-baseline">
              <span>Interface</span>
              <span className="font-mono text-[10px] tracking-[0.18em]">iii.</span>
            </li>
            <li className="border-b border-black py-2 flex justify-between items-baseline">
              <span>Build</span>
              <span className="font-mono text-[10px] tracking-[0.18em]">iv.</span>
            </li>
            <li className="py-2 flex justify-between items-baseline">
              <span>Editorial</span>
              <span className="font-mono text-[10px] tracking-[0.18em]">v.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* ─────────────────────────────────────────────
          SELECTED WORK — asymmetric, left-anchored
          ───────────────────────────────────────────── */}
      <div className="absolute left-[180px] top-[940px] w-[640px]">
        <div className="font-mono text-[11px] tracking-[0.24em] uppercase mb-8 flex justify-between border-b border-black pb-3">
          <span>(03) — Selected Work</span>
          <span>MMXXIII — MMXXVI</span>
        </div>

        {/* Work entry 01 */}
        <div className="mb-12">
          <div className="flex items-start gap-6">
            {/* placeholder rectangle with diagonal cross */}
            <div className="relative w-[180px] h-[120px] border border-black shrink-0">
              <svg className="absolute inset-0" width="180" height="120">
                <line x1="0" y1="0" x2="180" y2="120" stroke="black" strokeWidth="1" />
                <line x1="180" y1="0" x2="0" y2="120" stroke="black" strokeWidth="1" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-black/40 mb-1">
                01 / Halden &amp; Co.
              </div>
              <div className="font-sans text-[44px] font-medium leading-[0.92] tracking-[-0.03em]">
                Northwind
              </div>
              <div className="font-mono text-[10px] tracking-[0.18em] uppercase mt-3">
                Identity · Interface · 2026
              </div>
            </div>
          </div>
        </div>

        {/* Work entry 02 */}
        <div className="mb-12 pl-[80px]">
          <div className="flex items-start gap-6">
            <div className="relative w-[180px] h-[120px] border border-black shrink-0">
              <svg className="absolute inset-0" width="180" height="120">
                <line x1="0" y1="0" x2="180" y2="120" stroke="black" strokeWidth="1" />
                <line x1="180" y1="0" x2="0" y2="120" stroke="black" strokeWidth="1" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-black/40 mb-1">
                02 / Proun Editions
              </div>
              <div className="font-sans text-[44px] font-medium leading-[0.92] tracking-[-0.03em]">
                Aksel Press
              </div>
              <div className="font-mono text-[10px] tracking-[0.18em] uppercase mt-3">
                Editorial · Type · 2025
              </div>
            </div>
          </div>
        </div>

        {/* Work entry 03 */}
        <div className="mb-4 pl-[40px]">
          <div className="flex items-start gap-6">
            <div className="relative w-[180px] h-[120px] border border-black shrink-0">
              <svg className="absolute inset-0" width="180" height="120">
                <line x1="0" y1="0" x2="180" y2="120" stroke="black" strokeWidth="1" />
                <line x1="180" y1="0" x2="0" y2="120" stroke="black" strokeWidth="1" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-black/40 mb-1">
                03 / Bureau Voltage
              </div>
              <div className="font-sans text-[44px] font-medium leading-[0.92] tracking-[-0.03em]">
                Lume / OS
              </div>
              <div className="font-mono text-[10px] tracking-[0.18em] uppercase mt-3">
                Strategy · Build · 2024
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────
          ROTATED INDEX BLOCK — 04 / 06, bottom-left tilted
          ───────────────────────────────────────────── */}
      <div
        className="absolute"
        style={{
          left: 200,
          top: 1620,
          transform: "rotate(-90deg)",
          transformOrigin: "top left",
        }}
      >
        <div className="font-sans font-bold text-[220px] leading-[0.8] tracking-[-0.06em]">
          04/06
        </div>
      </div>

      {/* ─────────────────────────────────────────────
          Tilted floating quote — secondary axis 22°
          ───────────────────────────────────────────── */}
      <div
        className="absolute"
        style={{
          left: 520,
          top: 1480,
          transform: "rotate(22deg)",
          transformOrigin: "top left",
        }}
      >
        <div className="font-mono text-[11px] tracking-[0.2em] uppercase border border-black px-4 py-2">
          → Rotation as structure /  not decoration
        </div>
      </div>

      {/* small filled circle, off-axis weight */}
      <div className="absolute w-[12px] h-[12px] rounded-full bg-black" style={{ left: 1100, top: 1200 }} />
      {/* small filled square */}
      <div className="absolute bg-black" style={{ left: 1180, top: 1740, width: 10, height: 10 }} />

      {/* ─────────────────────────────────────────────
          COLOPHON / CONTACT — bottom right
          ───────────────────────────────────────────── */}
      <div className="absolute bottom-[60px] right-[56px] w-[480px]">
        <div className="border-t border-black pt-4 flex justify-between font-mono text-[10px] tracking-[0.22em] uppercase mb-6">
          <span>(04) Colophon</span>
          <span>MMXXVI</span>
        </div>
        <div className="font-sans text-[34px] font-medium leading-[1.0] tracking-[-0.025em] mb-6">
          Currently
          <br />
          accepting
          <br />
          <span className="italic font-light">commissions —</span>
        </div>
        <div className="font-mono text-[11px] tracking-[0.16em] uppercase leading-[1.9]">
          <div>hello@werkstatt.studio</div>
          <div>Brooklyn · NY · 40.6782°N</div>
          <div className="text-black/40">© Werkstatt MMXX—MMXXVI</div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────
          Bottom hairline
          ───────────────────────────────────────────── */}
      <div className="absolute bottom-[40px] left-[120px] right-[600px] border-t border-black" />

      <div className="absolute bottom-[20px] left-[120px] font-mono text-[10px] tracking-[0.2em] uppercase">
        File / concept-04.tsx — Rotation Study
      </div>
    </div>
  );
}
