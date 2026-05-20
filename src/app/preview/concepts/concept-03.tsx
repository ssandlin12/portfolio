import type { CSSProperties } from "react";

const works: Array<{
  no: string;
  project: string;
  client: string;
  year: string;
  discipline: string;
}> = [
  { no: "01", project: "Field Notes Quarterly", client: "Cartographers Guild", year: "2026", discipline: "Editorial · Identity" },
  { no: "02", project: "Halcyon Operating System", client: "Halcyon Labs", year: "2025", discipline: "Interface · Build" },
  { no: "03", project: "Meridian Coffee Bar", client: "Meridian & Co.", year: "2025", discipline: "Identity · Type" },
  { no: "04", project: "Praxis Reader v3", client: "Praxis Foundation", year: "2025", discipline: "Interface · Editorial" },
  { no: "05", project: "Northbound Atlas", client: "Northbound Transit", year: "2024", discipline: "Strategy · Identity" },
  { no: "06", project: "Untitled Index, A–Z", client: "Self-initiated", year: "2024", discipline: "Type · Research" },
  { no: "07", project: "Quiet Hours Radio", client: "Quiet Hours FM", year: "2024", discipline: "Brand · Interface" },
  { no: "08", project: "Stoneworks Catalogue", client: "Stoneworks Ltd.", year: "2023", discipline: "Editorial · Build" },
  { no: "09", project: "Folio for Anchorage", client: "Anchorage Museum", year: "2023", discipline: "Research · Editorial" },
  { no: "10", project: "Lattice Type System", client: "Lattice Foundry", year: "2023", discipline: "Type · Build" },
];

const services: Array<{ idx: string; name: string; note: string }> = [
  { idx: "A", name: "Strategy", note: "Positioning, audits, naming" },
  { idx: "B", name: "Identity", note: "Marks, systems, guidelines" },
  { idx: "C", name: "Interface", note: "Product, web, application UI" },
  { idx: "D", name: "Build", note: "Front-end engineering, CMS" },
  { idx: "E", name: "Editorial", note: "Books, reports, periodicals" },
  { idx: "F", name: "Type", note: "Custom letterforms, lettering" },
];

const colStyle: CSSProperties = { fontVariantNumeric: "tabular-nums" };

export default function Concept03() {
  return (
    <div className="w-[1440px] h-[2000px] relative overflow-hidden border border-black bg-white text-black font-sans">
      {/* faint 12-column grid hairlines */}
      <div className="absolute inset-x-[80px] top-0 bottom-0 grid grid-cols-12 pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="border-l border-black/10 h-full" />
        ))}
        <div className="absolute right-0 top-0 bottom-0 border-r border-black/10" />
      </div>

      {/* TOP META BAR */}
      <div className="absolute left-0 right-0 top-0 border-b border-black">
        <div className="flex items-stretch justify-between px-[24px] py-[10px] font-mono text-[11px] uppercase tracking-[0.12em]">
          <span>Vol. XII</span>
          <span>No. 03 / 06</span>
          <span>Index of Works &amp; Services</span>
          <span>Folio MMXXVI</span>
          <span>Printed in two impressions</span>
          <span>Page 01 of 01</span>
        </div>
      </div>

      {/* HEADER BAND */}
      <div className="absolute left-0 right-0 top-[34px] border-b border-black">
        <div className="flex items-end justify-between px-[80px] pt-[28px] pb-[22px]">
          <div className="flex items-baseline gap-[14px]">
            <span className="inline-block w-[12px] h-[12px] rounded-full bg-black translate-y-[-2px]" />
            <span className="text-[28px] font-bold tracking-[-0.02em] leading-none">BUREAU</span>
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-black/40 pl-[6px]">
              est. 2017 — independent
            </span>
          </div>
          <nav className="flex items-baseline gap-[40px] font-mono text-[12px] uppercase tracking-[0.16em]">
            <span>① Work</span>
            <span>② Services</span>
            <span>③ About</span>
            <span>④ Contact</span>
          </nav>
        </div>
      </div>

      {/* SECTION 00 — MASTHEAD / HERO + COLOPHON */}
      <div className="absolute left-[80px] right-[80px] top-[150px]">
        <div className="flex items-start justify-between border-b border-black pb-[10px]">
          <div className="font-mono text-[11px] uppercase tracking-[0.14em]">§ 00 — Masthead</div>
          <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-black/40">A directory in one folio</div>
        </div>

        <div className="grid grid-cols-12 gap-x-[24px] pt-[36px]">
          {/* Hero positioning — 8 cols */}
          <div className="col-span-8 pr-[24px] border-r border-black">
            <div className="font-mono text-[11px] uppercase tracking-[0.14em] mb-[18px]">
              Positioning Statement · read first
            </div>
            <h1 className="text-[88px] leading-[0.92] tracking-[-0.035em] font-medium">
              An independent studio<br />
              designing &amp; building<br />
              <span className="italic font-normal">considered</span> digital products
              <span className="inline-block w-[16px] h-[16px] rounded-full bg-black translate-y-[-12px] ml-[10px]" />
            </h1>
            <div className="mt-[28px] grid grid-cols-2 gap-x-[24px] font-mono text-[12px] leading-[1.55]">
              <p>
                Bureau is a small practice of designers and engineers working across identity, interface, editorial,
                and type. We make things slowly, in the open, with a fondness for grids.
              </p>
              <p>
                This index catalogues the studio&rsquo;s output as of MMXXVI. Read it as a table of contents — each
                row a project, each column a fact, each rule a boundary between them.
              </p>
            </div>
          </div>

          {/* Colophon — 4 cols */}
          <div className="col-span-4 pl-[24px]">
            <div className="font-mono text-[11px] uppercase tracking-[0.14em] mb-[18px]">Colophon</div>
            <dl className="font-mono text-[12px] leading-[1.7]">
              <div className="flex justify-between border-b border-black py-[6px]">
                <dt className="uppercase tracking-[0.1em] text-black/40">Studio</dt>
                <dd>Bureau / Office N</dd>
              </div>
              <div className="flex justify-between border-b border-black py-[6px]">
                <dt className="uppercase tracking-[0.1em] text-black/40">Email</dt>
                <dd>hello@bureau.studio</dd>
              </div>
              <div className="flex justify-between border-b border-black py-[6px]">
                <dt className="uppercase tracking-[0.1em] text-black/40">Telephone</dt>
                <dd>+1 (212) 555 0117</dd>
              </div>
              <div className="flex justify-between border-b border-black py-[6px]">
                <dt className="uppercase tracking-[0.1em] text-black/40">Location</dt>
                <dd>Brooklyn, NY · Lisbon, PT</dd>
              </div>
              <div className="flex justify-between border-b border-black py-[6px]">
                <dt className="uppercase tracking-[0.1em] text-black/40">Hours</dt>
                <dd>Mon–Thu, 09:00–18:00 ET</dd>
              </div>
              <div className="flex justify-between py-[6px]">
                <dt className="uppercase tracking-[0.1em] text-black/40">Set in</dt>
                <dd>Geist Sans &amp; Geist Mono</dd>
              </div>
            </dl>

            <div className="mt-[22px] relative border border-black h-[120px] w-full overflow-hidden">
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                <line x1="0" y1="0" x2="100%" y2="100%" stroke="black" strokeWidth="1" />
                <line x1="100%" y1="0" x2="0" y2="100%" stroke="black" strokeWidth="1" />
              </svg>
              <div className="absolute bottom-[8px] left-[10px] font-mono text-[10px] uppercase tracking-[0.14em]">
                Portrait of the studio — plate I
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 01 — SELECTED WORK / INDEX TABLE */}
      <div className="absolute left-[80px] right-[80px] top-[760px]">
        <div className="flex items-end justify-between border-b border-black pb-[10px]">
          <div className="flex items-baseline gap-[18px]">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em]">§ 01</span>
            <span className="text-[28px] font-medium tracking-[-0.02em] leading-none">Selected Work</span>
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-black/40 pl-[6px]">
              ten of forty-eight catalogued
            </span>
          </div>
          <div className="font-mono text-[11px] uppercase tracking-[0.14em]">
            Sort: chronological ↓
          </div>
        </div>

        {/* Column headings */}
        <div
          className="grid grid-cols-12 gap-x-[24px] py-[10px] border-b border-black font-mono text-[10px] uppercase tracking-[0.14em] text-black/40"
          style={colStyle}
        >
          <div className="col-span-1">№</div>
          <div className="col-span-5">Project</div>
          <div className="col-span-3">Client</div>
          <div className="col-span-1">Year</div>
          <div className="col-span-2 text-right">Discipline</div>
        </div>

        {/* Rows */}
        <ul>
          {works.map((w) => (
            <li
              key={w.no}
              className="grid grid-cols-12 gap-x-[24px] items-baseline border-b border-black py-[14px]"
              style={colStyle}
            >
              <span className="col-span-1 font-mono text-[14px]">{w.no}</span>
              <span className="col-span-5 text-[22px] font-medium tracking-[-0.015em] leading-[1.1]">
                {w.project}
              </span>
              <span className="col-span-3 font-mono text-[13px]">{w.client}</span>
              <span className="col-span-1 font-mono text-[13px]">{w.year}</span>
              <span className="col-span-2 font-mono text-[11px] uppercase tracking-[0.12em] text-right">
                {w.discipline}
              </span>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between pt-[10px] font-mono text-[11px] uppercase tracking-[0.14em] text-black/40">
          <span>End of section 01.</span>
          <span>Continued in the full archive →</span>
        </div>
      </div>

      {/* SECTION 02 — SERVICES MATRIX */}
      <div className="absolute left-[80px] right-[80px] top-[1480px]">
        <div className="flex items-end justify-between border-b border-black pb-[10px]">
          <div className="flex items-baseline gap-[18px]">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em]">§ 02</span>
            <span className="text-[28px] font-medium tracking-[-0.02em] leading-none">Services</span>
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-black/40 pl-[6px]">
              six disciplines, one method
            </span>
          </div>
          <div className="font-mono text-[11px] uppercase tracking-[0.14em]">
            Engagements 6–16 weeks
          </div>
        </div>

        <div className="grid grid-cols-12 gap-x-[24px] pt-[24px]">
          {/* Services list — 8 cols, 6 cells in 3 columns */}
          <div className="col-span-8 grid grid-cols-3 gap-x-[24px] gap-y-[18px] pr-[24px] border-r border-black">
            {services.map((s) => (
              <div key={s.idx} className="border-t border-black pt-[10px]">
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-black/40">{s.idx}</span>
                  <span className="inline-block w-[8px] h-[8px] rounded-full bg-black" />
                </div>
                <div className="mt-[8px] text-[26px] font-medium tracking-[-0.02em] leading-[1.05]">
                  {s.name}
                </div>
                <div className="mt-[6px] font-mono text-[11px] leading-[1.5] text-black">
                  {s.note}
                </div>
              </div>
            ))}
          </div>

          {/* Process — 4 cols */}
          <div className="col-span-4 pl-[24px]">
            <div className="font-mono text-[11px] uppercase tracking-[0.14em] mb-[12px]">Process — four phases</div>
            <ol className="font-mono text-[12px] leading-[1.6]">
              <li className="flex items-baseline justify-between border-b border-black py-[8px]">
                <span className="uppercase tracking-[0.1em]">I — Listen</span>
                <span className="text-black/40">wk 01–02</span>
              </li>
              <li className="flex items-baseline justify-between border-b border-black py-[8px]">
                <span className="uppercase tracking-[0.1em]">II — Frame</span>
                <span className="text-black/40">wk 02–04</span>
              </li>
              <li className="flex items-baseline justify-between border-b border-black py-[8px]">
                <span className="uppercase tracking-[0.1em]">III — Make</span>
                <span className="text-black/40">wk 04–12</span>
              </li>
              <li className="flex items-baseline justify-between border-b border-black py-[8px]">
                <span className="uppercase tracking-[0.1em]">IV — Hand off</span>
                <span className="text-black/40">wk 12–16</span>
              </li>
            </ol>

            <div className="mt-[18px] font-mono text-[11px] leading-[1.6]">
              We work in residency with a small number of clients each year. New engagements open quarterly; the
              next intake begins 01 September MMXXVI.
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 03 — CONTACT CTA STRIP */}
      <div className="absolute left-[80px] right-[80px] top-[1820px] border-t border-black border-b border-black">
        <div className="grid grid-cols-12 gap-x-[24px] items-baseline py-[22px]">
          <div className="col-span-1 font-mono text-[11px] uppercase tracking-[0.14em]">§ 03</div>
          <div className="col-span-6 text-[34px] font-medium tracking-[-0.025em] leading-[1] flex items-baseline gap-[12px]">
            Commission a project
            <span className="inline-block w-[10px] h-[10px] rounded-full bg-black translate-y-[-6px]" />
          </div>
          <div className="col-span-3 font-mono text-[12px] leading-[1.5]">
            Write to <span className="underline underline-offset-[3px]">hello@bureau.studio</span> with a brief and
            a timeline.
          </div>
          <div className="col-span-2 text-right font-mono text-[11px] uppercase tracking-[0.14em] text-black/40">
            Reply within 3 business days
          </div>
        </div>
      </div>

      {/* FOOTER BAND — INDEX MARKER */}
      <div className="absolute left-0 right-0 bottom-0 border-t border-black">
        <div className="flex items-center justify-between px-[24px] py-[12px] font-mono text-[11px] uppercase tracking-[0.14em]">
          <span className="flex items-center gap-[10px]">
            <span className="inline-block w-[8px] h-[8px] bg-black" />
            Bureau — Index Folio
          </span>
          <span>Brooklyn · Lisbon</span>
          <span>© MMXXVI All rights reserved</span>
          <span>Set in Geist Sans &amp; Mono</span>
          <span className="flex items-center gap-[10px]">
            Concept
            <span className="text-[14px] tracking-[0.04em]">03 / 06</span>
            <span className="inline-block w-[8px] h-[8px] rounded-full bg-black" />
          </span>
        </div>
      </div>
    </div>
  );
}
