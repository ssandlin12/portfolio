export default function Concept01() {
  return (
    <div className="w-[1440px] h-[2000px] relative overflow-hidden border border-black bg-white text-black">
      {/* ───────────────────────── TOP NAV STRIP ───────────────────────── */}
      <div className="absolute top-0 left-0 right-0 h-[72px] flex items-center justify-between px-[56px] border-b border-black">
        <div className="flex items-baseline gap-[14px]">
          <span className="font-sans font-bold tracking-[-0.02em] text-[20px] leading-none">
            WERKSTATT
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/40">
            est. mmxx — independent
          </span>
        </div>
        <nav className="flex items-center gap-[28px] font-mono text-[11px] uppercase tracking-[0.16em]">
          <span>Work</span>
          <span className="text-black/40">/</span>
          <span>Services</span>
          <span className="text-black/40">/</span>
          <span>About</span>
          <span className="text-black/40">/</span>
          <span>Contact</span>
        </nav>
      </div>

      {/* ───────────────────────── SECTION 01 MARKER STRIP ───────────────────────── */}
      <div className="absolute top-[72px] left-0 right-0 h-[44px] flex items-center justify-between px-[56px] border-b border-black">
        <div className="flex items-center gap-[16px] font-mono text-[10px] uppercase tracking-[0.22em]">
          <span className="font-bold">§ 01</span>
          <span className="text-black/40">—</span>
          <span>Manifesto</span>
        </div>
        <div className="flex items-center gap-[10px] font-mono text-[10px] uppercase tracking-[0.22em] text-black/40">
          <span>N 51°30′ · W 0°07′</span>
          <span>·</span>
          <span>14.05.2026</span>
          <span>·</span>
          <span>09:42 GMT</span>
        </div>
      </div>

      {/* ───────────────────────── LEFT MICRO-GUTTER ───────────────────────── */}
      <div className="absolute top-[116px] bottom-[260px] left-[28px] w-[20px] flex flex-col items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-black/40">
        <span style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
          Concept 01 — Monolith
        </span>
        <div className="w-[8px] h-[8px] rounded-full bg-black" />
        <span style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
          Specimen / display set
        </span>
      </div>

      {/* ───────────────────────── RIGHT MICRO-GUTTER ───────────────────────── */}
      <div className="absolute top-[116px] bottom-[260px] right-[28px] w-[20px] flex flex-col items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-black/40">
        <span style={{ writingMode: "vertical-rl" }}>
          Set in Geist · 220/240/260
        </span>
        <div className="w-[10px] h-[10px] border border-black" />
        <span style={{ writingMode: "vertical-rl" }}>
          Pinned 14.v.mmxxvi
        </span>
      </div>

      {/* ───────────────────────── MONOLITH — THE HERO ───────────────────────── */}
      <div className="absolute top-[156px] left-[68px] right-[68px]">
        {/* tiny pre-heading */}
        <div className="flex items-center justify-between pb-[14px] border-b border-black">
          <div className="flex items-center gap-[10px] font-mono text-[10px] uppercase tracking-[0.24em]">
            <span className="font-bold">A · POSITION</span>
            <span className="text-black/40">—</span>
            <span className="text-black/40">read slow</span>
          </div>
          <div className="flex items-center gap-[10px] font-mono text-[10px] uppercase tracking-[0.24em] text-black/40">
            <span>fig. 01</span>
            <span>—</span>
            <span>one voice, four lines</span>
          </div>
        </div>

        {/* THE MONOLITH ITSELF */}
        <div
          className="pt-[28px] font-sans font-medium"
          style={{
            fontSize: 248,
            lineHeight: 0.84,
            letterSpacing: "-0.045em",
          }}
        >
          <div className="flex items-baseline">
            <span className="font-mono text-[12px] uppercase tracking-[0.22em] mr-[18px] mb-[24px] self-start pt-[18px]">
              i.
            </span>
            <span>An in-</span>
          </div>
          <div>de&shy;pen&shy;dent</div>
          <div className="flex items-baseline gap-[28px]">
            <span>studio</span>
            <span
              className="font-mono font-normal text-[12px] uppercase tracking-[0.22em] self-start pt-[36px]"
            >
              ¶
            </span>
          </div>
          <div className="flex items-baseline">
            <span>design&shy;ing</span>
          </div>
          <div className="flex items-baseline gap-[36px]">
            <span>&amp; build&shy;ing</span>
            <span className="inline-block w-[44px] h-[44px] rounded-full bg-black translate-y-[-28px]" />
          </div>
          <div className="flex items-baseline">
            <span>digital&nbsp;</span>
            <span className="italic font-sans">things.</span>
          </div>
        </div>

        {/* hero sub-footer */}
        <div className="mt-[36px] pt-[14px] border-t border-black flex items-start justify-between">
          <p className="font-sans text-[15px] leading-[1.45] max-w-[440px] tracking-[-0.005em]">
            We work in small rooms with long tables, for clients who would rather
            be clear than clever — type, identity, interface, build.
          </p>
          <div className="flex items-center gap-[10px] font-mono text-[10px] uppercase tracking-[0.24em] text-black/40">
            <span>—</span>
            <span>since 2020</span>
            <span>·</span>
            <span>still small</span>
          </div>
        </div>
      </div>

      {/* ───────────────────────── LOWER BAND: WORK / SERVICES / CONTACT ───────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 h-[260px] border-t border-black grid grid-cols-12 gap-0">
        {/* col 1-5 — selected work index */}
        <div className="col-span-5 border-r border-black px-[56px] py-[22px] flex flex-col">
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.24em] pb-[14px] border-b border-black">
            <span className="font-bold">§ 02 — Selected Work</span>
            <span className="text-black/40">12 / 47 shown</span>
          </div>

          <div className="grid grid-cols-[28px_1fr_70px_60px] gap-x-[10px] font-mono text-[10px] uppercase tracking-[0.18em] py-[8px] border-b border-black text-black/40">
            <span>№</span>
            <span>Project / Client</span>
            <span>Year</span>
            <span>Disc.</span>
          </div>

          <ul className="flex-1">
            <li className="grid grid-cols-[28px_1fr_70px_60px] gap-x-[10px] items-baseline py-[10px] border-b border-black">
              <span className="font-mono text-[11px]">01</span>
              <div className="flex items-baseline gap-[10px]">
                <span className="font-sans font-medium text-[16px] tracking-[-0.01em]">
                  Halftone Press
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/40">
                  Editorial house
                </span>
              </div>
              <span className="font-mono text-[11px]">2025</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em]">
                Id · Typ
              </span>
            </li>
            <li className="grid grid-cols-[28px_1fr_70px_60px] gap-x-[10px] items-baseline py-[10px] border-b border-black">
              <span className="font-mono text-[11px]">02</span>
              <div className="flex items-baseline gap-[10px]">
                <span className="font-sans font-medium text-[16px] tracking-[-0.01em]">
                  Kerning &amp; Co.
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/40">
                  Foundry, Berlin
                </span>
              </div>
              <span className="font-mono text-[11px]">2025</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em]">
                Int · Bld
              </span>
            </li>
            <li className="grid grid-cols-[28px_1fr_70px_60px] gap-x-[10px] items-baseline py-[10px] border-b border-black">
              <span className="font-mono text-[11px]">03</span>
              <div className="flex items-baseline gap-[10px]">
                <span className="font-sans font-medium text-[16px] tracking-[-0.01em]">
                  Field Notes Quarterly
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/40">
                  Independent journal
                </span>
              </div>
              <span className="font-mono text-[11px]">2024</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em]">
                Edt · Brd
              </span>
            </li>
            <li className="grid grid-cols-[28px_1fr_70px_60px] gap-x-[10px] items-baseline py-[10px] border-b border-black">
              <span className="font-mono text-[11px]">04</span>
              <div className="flex items-baseline gap-[10px]">
                <span className="font-sans font-medium text-[16px] tracking-[-0.01em]">
                  Northbank Atlas
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/40">
                  Civic mapping co-op
                </span>
              </div>
              <span className="font-mono text-[11px]">2024</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em]">
                Rsh · Brd
              </span>
            </li>
            <li className="grid grid-cols-[28px_1fr_70px_60px] gap-x-[10px] items-baseline py-[10px]">
              <span className="font-mono text-[11px]">05</span>
              <div className="flex items-baseline gap-[10px]">
                <span className="font-sans font-medium text-[16px] tracking-[-0.01em]">
                  Common Hours
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/40">
                  Workspace, Lisbon
                </span>
              </div>
              <span className="font-mono text-[11px]">2023</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em]">
                Stg · Id
              </span>
            </li>
          </ul>
        </div>

        {/* col 6-9 — services list + thumb */}
        <div className="col-span-4 border-r border-black px-[36px] py-[22px] flex flex-col">
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.24em] pb-[14px] border-b border-black">
            <span className="font-bold">§ 03 — Disciplines</span>
            <span className="text-black/40">06 of many</span>
          </div>

          <ul className="flex-1 flex flex-col">
            {[
              { n: "i", label: "Strategy", note: "positioning, naming" },
              { n: "ii", label: "Identity", note: "marks, systems, voice" },
              { n: "iii", label: "Interface", note: "product · web · type" },
              { n: "iv", label: "Editorial", note: "books · journals · papers" },
              { n: "v", label: "Build", note: "tested, shipped, owned" },
              { n: "vi", label: "Research", note: "fieldwork, audits" },
            ].map((s, idx, arr) => (
              <li
                key={s.label}
                className={`flex items-baseline justify-between py-[7px] ${
                  idx < arr.length - 1 ? "border-b border-black" : ""
                }`}
              >
                <div className="flex items-baseline gap-[14px]">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/40 w-[18px]">
                    {s.n}
                  </span>
                  <span className="font-sans font-medium text-[18px] tracking-[-0.015em]">
                    {s.label}
                  </span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/40">
                  {s.note}
                </span>
              </li>
            ))}
          </ul>

          {/* small placeholder rectangle with diagonal cross */}
          <div className="mt-[18px] relative border border-black h-[58px] w-full">
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full"
            >
              <line x1="0" y1="0" x2="100" y2="100" stroke="black" strokeWidth="0.3" vectorEffect="non-scaling-stroke" />
              <line x1="100" y1="0" x2="0" y2="100" stroke="black" strokeWidth="0.3" vectorEffect="non-scaling-stroke" />
            </svg>
            <span className="absolute bottom-[6px] left-[8px] font-mono text-[9px] uppercase tracking-[0.2em] text-black/40">
              fig. 02 — specimen
            </span>
            <span className="absolute top-[6px] right-[8px] font-mono text-[9px] uppercase tracking-[0.2em] text-black/40">
              720 × 480
            </span>
          </div>
        </div>

        {/* col 10-12 — contact / colophon */}
        <div className="col-span-3 px-[36px] py-[22px] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.24em] pb-[14px] border-b border-black">
              <span className="font-bold">§ 04 — Address</span>
              <div className="w-[8px] h-[8px] bg-black" />
            </div>

            <div className="pt-[12px] flex flex-col gap-[8px]">
              <a className="font-sans font-medium text-[20px] tracking-[-0.02em] leading-[1.05]">
                hello@werkstatt.studio
              </a>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/40 leading-[1.5]">
                Studio 4, 17 Garner St.<br />
                London E2 — UK
              </p>
            </div>

            <div className="mt-[14px] pt-[10px] border-t border-black grid grid-cols-2 gap-y-[6px] font-mono text-[10px] uppercase tracking-[0.2em]">
              <span className="text-black/40">Instagram</span>
              <span>@werkstatt</span>
              <span className="text-black/40">Are.na</span>
              <span>/werkstatt</span>
              <span className="text-black/40">Signal</span>
              <span>on request</span>
            </div>
          </div>

          {/* colophon + index */}
          <div className="pt-[12px] border-t border-black flex items-end justify-between">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-black/40 leading-[1.5]">
              © Werkstatt<br />
              mmxx — mmxxvi
            </div>
            <div className="flex items-baseline gap-[6px]">
              <span className="font-sans font-bold text-[40px] leading-none tracking-[-0.04em]">
                01
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-black/40">
                / 06
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ───────────────────────── BOTTOM EDGE TICKER ───────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 h-[18px] border-t border-black flex items-center justify-between px-[56px] font-mono text-[9px] uppercase tracking-[0.3em] text-black/40 bg-white">
        <span>Concept 01 / 06 — Monolith</span>
        <span>Wireframe · low-fi · b/w · no color</span>
        <span>1440 × 2000 · pinned</span>
      </div>
    </div>
  );
}
