import type { ReactNode } from "react";

/**
 * CONCEPT 02 — "MANIFESTO"
 * A single-page program of works. Numbered sections descend the canvas
 * with strict vertical rhythm. Bauhaus / Tschichold reference.
 */

type SectionProps = {
  numeral: string;
  label: string;
  meta?: string;
  children: ReactNode;
};

function Section({ numeral, label, meta, children }: SectionProps) {
  return (
    <section className="border-t border-black grid grid-cols-12 gap-x-6 px-16 py-12">
      {/* Numeral anchor */}
      <div className="col-span-2 flex flex-col">
        <span className="font-mono text-[120px] leading-[0.82] tracking-[-0.04em] font-medium">
          {numeral}
        </span>
        {meta ? (
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/40 mt-3">
            {meta}
          </span>
        ) : null}
      </div>

      {/* Section label */}
      <div className="col-span-3 pt-3">
        <h2 className="font-sans text-[40px] leading-[0.95] tracking-[-0.03em] font-medium">
          {label}
        </h2>
      </div>

      {/* Body */}
      <div className="col-span-7 pt-4">{children}</div>
    </section>
  );
}

function PlaceholderRect({
  className,
  ratio,
}: {
  className?: string;
  ratio: string;
}) {
  return (
    <div
      className={`relative border border-black w-full ${className ?? ""}`}
      style={{ aspectRatio: ratio }}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <line x1="0" y1="0" x2="100" y2="100" stroke="black" strokeWidth="0.3" />
        <line x1="100" y1="0" x2="0" y2="100" stroke="black" strokeWidth="0.3" />
      </svg>
    </div>
  );
}

export default function Concept02() {
  return (
    <div className="w-[1440px] h-[2000px] relative overflow-hidden border border-black bg-white text-black font-sans">
      {/* ============ MASTHEAD ============ */}
      <header className="px-16 pt-10 pb-6">
        {/* Top utility row */}
        <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.22em] pb-6">
          <span>A Program of Works</span>
          <span className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-black" />
            <span>MMXXVI — Edition I</span>
          </span>
          <span>02 / 06</span>
        </div>

        {/* Hairline above wordmark */}
        <div className="border-t border-black" />

        {/* Wordmark */}
        <div className="flex items-end justify-between pt-6 pb-4">
          <h1 className="font-sans text-[160px] leading-[0.82] tracking-[-0.05em] font-medium">
            WERKSTATT
          </h1>
          <div className="flex flex-col items-end pb-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-black/40">
              Est. MMXVI
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] mt-1">
              No. 02 of 06
            </span>
          </div>
        </div>

        {/* Subtitle row + hairline below */}
        <div className="border-t border-black pt-3 flex items-baseline justify-between">
          <p className="font-mono text-[12px] uppercase tracking-[0.28em]">
            An Independent Practice — Strategy · Identity · Interface · Build
          </p>
          <nav className="flex gap-6 font-mono text-[12px] uppercase tracking-[0.22em]">
            <span>Work</span>
            <span>Services</span>
            <span>About</span>
            <span>Contact</span>
          </nav>
        </div>
      </header>

      {/* ============ §01 POSITION ============ */}
      <Section numeral="01" label="Position" meta="The Statement">
        <p className="font-sans text-[44px] leading-[1.02] tracking-[-0.025em] font-medium max-w-[700px]">
          An independent studio designing &amp; building digital products for
          companies who treat the interface as the product.
        </p>
        <div className="flex items-center gap-3 mt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-black/40">
          <span className="inline-block w-2 h-2 rounded-full bg-black" />
          <span>Founded 2016 — Independent — Two principals, four collaborators</span>
        </div>
      </Section>

      {/* ============ §02 PRACTICE ============ */}
      <Section numeral="02" label="Practice" meta="Disciplines">
        <ol className="grid grid-cols-2 gap-x-12">
          {[
            ["i.", "Strategy", "Positioning, naming, narrative"],
            ["ii.", "Identity", "Marks, systems, type"],
            ["iii.", "Interface", "Product & web design"],
            ["iv.", "Build", "Front-end engineering"],
            ["v.", "Editorial", "Long-form & print"],
            ["vi.", "Research", "Audits, interviews, testing"],
          ].map(([roman, name, desc]) => (
            <li
              key={name}
              className="flex items-start gap-4 border-b border-black/40 py-3"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-black/40 w-8 pt-1">
                {roman}
              </span>
              <div className="flex-1">
                <div className="font-sans text-[22px] leading-[1] tracking-[-0.02em] font-medium">
                  {name}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-black/40 mt-1">
                  {desc}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* ============ §03 WORK ============ */}
      <Section numeral="03" label="Work" meta="Selected, 2023 — 2026">
        <div className="grid grid-cols-3 gap-6">
          {[
            {
              n: "01",
              title: "Halden",
              client: "Halden Bank",
              year: "2026",
              tags: "Identity · Interface",
              ratio: "4 / 3",
            },
            {
              n: "02",
              title: "Field Notes",
              client: "Aster Press",
              year: "2025",
              tags: "Editorial · Type",
              ratio: "4 / 3",
            },
            {
              n: "03",
              title: "Tilt",
              client: "Tilt Health",
              year: "2024",
              tags: "Strategy · Build",
              ratio: "4 / 3",
            },
          ].map((w) => (
            <div key={w.n} className="flex flex-col gap-2">
              <PlaceholderRect ratio={w.ratio} />
              <div className="flex items-baseline justify-between pt-1">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-black/40">
                  {w.n}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-black/40">
                  {w.year}
                </span>
              </div>
              <div className="font-sans text-[20px] leading-[1] tracking-[-0.02em] font-medium">
                {w.title}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em]">
                {w.client}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-black/40">
                {w.tags}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ============ §04 METHOD ============ */}
      <Section numeral="04" label="Method" meta="How We Work">
        <div className="grid grid-cols-4 gap-6">
          {[
            ["a.", "Listen", "Discover · interview · audit"],
            ["b.", "Frame", "Position · narrative · scope"],
            ["c.", "Make", "Design · prototype · iterate"],
            ["d.", "Ship", "Build · launch · maintain"],
          ].map(([k, head, body]) => (
            <div key={head} className="border-t border-black pt-3">
              <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.22em]">
                <span>{k}</span>
                <span className="inline-block w-2 h-2 bg-black" />
              </div>
              <div className="font-sans text-[22px] leading-[1] tracking-[-0.02em] font-medium mt-3">
                {head}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-black/40 mt-2">
                {body}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ============ §05 / §06 — SIDE BY SIDE ============ */}
      <section className="border-t border-b border-black grid grid-cols-12 gap-x-6 px-16 py-12">
        {/* §05 Studio */}
        <div className="col-span-6 pr-8 border-r border-black">
          <div className="flex items-start gap-6">
            <span className="font-mono text-[120px] leading-[0.82] tracking-[-0.04em] font-medium">
              05
            </span>
            <div className="pt-3">
              <h2 className="font-sans text-[40px] leading-[0.95] tracking-[-0.03em] font-medium">
                Studio
              </h2>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-black/40 block mt-2">
                The Place
              </span>
            </div>
          </div>
          <div className="mt-6 font-mono text-[11px] uppercase tracking-[0.22em] grid grid-cols-2 gap-y-2">
            <span className="text-black/40">Located</span>
            <span>Brooklyn, NY</span>
            <span className="text-black/40">Hours</span>
            <span>M—F · 09—18</span>
            <span className="text-black/40">Capacity</span>
            <span>Two engagements / quarter</span>
            <span className="text-black/40">Index</span>
            <span>No. 02 / 06</span>
          </div>
        </div>

        {/* §06 Contact */}
        <div className="col-span-6 pl-8">
          <div className="flex items-start gap-6">
            <span className="font-mono text-[120px] leading-[0.82] tracking-[-0.04em] font-medium">
              06
            </span>
            <div className="pt-3">
              <h2 className="font-sans text-[40px] leading-[0.95] tracking-[-0.03em] font-medium">
                Contact
              </h2>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-black/40 block mt-2">
                The Address
              </span>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            <a className="block font-sans text-[28px] leading-[1] tracking-[-0.02em] font-medium underline underline-offset-4">
              office@werkstatt.studio
            </a>
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-black/40">
              For new commissions, press &amp; collaboration
            </div>
            <div className="flex gap-6 pt-2 font-mono text-[11px] uppercase tracking-[0.22em]">
              <span>Are.na</span>
              <span>Read.cv</span>
              <span>LinkedIn</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ COLOPHON FOOTER ============ */}
      <footer className="absolute bottom-0 left-0 right-0 px-16 py-5 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.22em]">
        <span className="flex items-center gap-3">
          <span className="inline-block w-2 h-2 rounded-full bg-black" />
          <span>Werkstatt — A Program of Works</span>
        </span>
        <span className="text-black/40">
          Set in Geist Sans &amp; Geist Mono · Printed in one ink, black, on white
        </span>
        <span>02 / 06 — MMXXVI</span>
      </footer>
    </div>
  );
}
