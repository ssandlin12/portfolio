export default function Concept05() {
  return (
    <div className="w-[1440px] h-[2000px] relative overflow-hidden border border-black bg-white text-black">
      {/* ───────────────────────────────────────────────────────────────
         CONCEPT 05 — "MARGIN"
         A discipline of empty space. One small cluster, one quiet echo,
         one hairline, one marker. The rest is intentional void.
         ─────────────────────────────────────────────────────────────── */}

      {/* Vertical hairline running edge-to-edge through the void.
          Placed at the golden-ish vertical so the empty regions feel
          weighted, not symmetrical. */}
      <div className="absolute top-0 bottom-0 left-[890px] w-px bg-black" />

      {/* Vertical label running UP the left margin — tiny, mono, tracked. */}
      <div
        className="absolute font-mono text-[10px] tracking-[0.4em] uppercase text-black/40"
        style={{
          left: 48,
          top: 1000,
          transform: "rotate(-90deg)",
          transformOrigin: "left top",
          whiteSpace: "nowrap",
        }}
      >
        Atelier N — independent practice — est. mmxix
      </div>

      {/* ───────────────────────────────────────────────────────────────
         TOP-RIGHT MARGINALIA — the index marker. The opposite corner
         from the main cluster, used to triangulate the composition.
         ─────────────────────────────────────────────────────────────── */}
      <div className="absolute top-[96px] right-[96px] text-right">
        <div className="font-mono text-[11px] tracking-[0.2em] uppercase leading-[1.6]">
          Concept
        </div>
        <div className="font-mono text-[11px] tracking-[0.2em] uppercase leading-[1.6] text-black/40">
          Homepage / Wireframe
        </div>
        <div className="mt-6 flex items-center justify-end gap-3">
          <span className="block w-[10px] h-[10px] rounded-full bg-black" />
          <span className="font-mono text-[12px] tracking-[0.15em]">05 / 06</span>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────────
         SECOND CLUSTER (opposite-ish) — selected work index.
         Placed in the upper-right quadrant past the vertical rule.
         Tight, ~320×180px, mono. A quiet echo of the main cluster.
         ─────────────────────────────────────────────────────────────── */}
      <div className="absolute top-[320px] right-[96px] w-[300px]">
        <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-black/40 pb-3 border-b border-black">
          Selected Work
        </div>

        <div className="pt-3 pb-3 border-b border-black flex items-baseline justify-between">
          <div>
            <div className="font-sans text-[13px] font-medium leading-[1.3]">
              Halden Editions
            </div>
            <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-black/40 mt-1">
              Identity · Editorial
            </div>
          </div>
          <div className="font-mono text-[10px] tracking-[0.1em]">’24</div>
        </div>

        <div className="pt-3 pb-3 border-b border-black flex items-baseline justify-between">
          <div>
            <div className="font-sans text-[13px] font-medium leading-[1.3]">
              Field Notes Vol. III
            </div>
            <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-black/40 mt-1">
              Type · Interface
            </div>
          </div>
          <div className="font-mono text-[10px] tracking-[0.1em]">’24</div>
        </div>

        <div className="pt-3 pb-3 border-b border-black flex items-baseline justify-between">
          <div>
            <div className="font-sans text-[13px] font-medium leading-[1.3]">
              Ostmark Index
            </div>
            <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-black/40 mt-1">
              Strategy · Build
            </div>
          </div>
          <div className="font-mono text-[10px] tracking-[0.1em]">’23</div>
        </div>

        <div className="pt-3 pb-3 flex items-baseline justify-between">
          <div>
            <div className="font-sans text-[13px] font-medium leading-[1.3]">
              Kerr & Daughter
            </div>
            <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-black/40 mt-1">
              Brand · Research
            </div>
          </div>
          <div className="font-mono text-[10px] tracking-[0.1em]">’23</div>
        </div>

        {/* tiny placeholder — outlined rectangle with thin diagonal cross */}
        <div className="mt-6 relative w-[120px] h-[80px] border border-black">
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 120 80"
            preserveAspectRatio="none"
          >
            <line x1="0" y1="0" x2="120" y2="80" stroke="black" strokeWidth="1" />
            <line x1="120" y1="0" x2="0" y2="80" stroke="black" strokeWidth="1" />
          </svg>
        </div>
        <div className="mt-2 font-mono text-[9px] tracking-[0.2em] uppercase text-black/40">
          Fig. 01 — work plate
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────────
         HORIZONTAL HAIRLINE — runs the full canvas width, dividing
         the lower void from the upper. Sits low to give the main
         cluster room to breathe above it.
         ─────────────────────────────────────────────────────────────── */}
      <div className="absolute left-0 right-0 top-[1380px] h-px bg-black" />

      {/* A single bauhaus circle anchored to the hairline intersection,
          triangulating the composition. */}
      <div className="absolute left-[890px] top-[1380px] -translate-x-1/2 -translate-y-1/2 w-[12px] h-[12px] rounded-full bg-black" />

      {/* ───────────────────────────────────────────────────────────────
         MAIN CLUSTER — bottom-left quadrant. Wordmark, hero statement,
         nav. Roughly 560×520px. All of the gravity lives here.
         ─────────────────────────────────────────────────────────────── */}
      <div className="absolute left-[120px] bottom-[160px] w-[640px]">
        {/* wordmark + section number row */}
        <div className="flex items-baseline justify-between pb-4 border-b border-black">
          <div className="font-sans text-[20px] font-medium tracking-[-0.01em]">
            Atelier N
          </div>
          <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-black/40">
            §00 — Index
          </div>
        </div>

        {/* hero statement — medium scale, restrained, generous leading */}
        <h1
          className="mt-12 font-sans font-medium text-[72px] leading-[0.95] tracking-[-0.035em]"
        >
          An independent
          <br />
          studio, quietly.
        </h1>

        {/* secondary line — small, mono, set apart */}
        <p className="mt-10 font-mono text-[12px] leading-[1.7] tracking-[0.02em] text-black/40 max-w-[360px]">
          Design &amp; build for considered brands, editorial
          systems, and the occasional tool worth making.
        </p>

        {/* nav stack — tight, mono numerals, hairline-separated */}
        <nav className="mt-14 w-[300px]">
          <div className="flex items-center justify-between py-3 border-t border-black">
            <span className="font-mono text-[10px] tracking-[0.2em] text-black/40">
              i.
            </span>
            <span className="font-sans text-[14px] tracking-[-0.005em]">
              Work
            </span>
            <span className="font-mono text-[10px] tracking-[0.1em] text-black/40">
              ↗
            </span>
          </div>
          <div className="flex items-center justify-between py-3 border-t border-black">
            <span className="font-mono text-[10px] tracking-[0.2em] text-black/40">
              ii.
            </span>
            <span className="font-sans text-[14px] tracking-[-0.005em]">
              Services
            </span>
            <span className="font-mono text-[10px] tracking-[0.1em] text-black/40">
              ↗
            </span>
          </div>
          <div className="flex items-center justify-between py-3 border-t border-black">
            <span className="font-mono text-[10px] tracking-[0.2em] text-black/40">
              iii.
            </span>
            <span className="font-sans text-[14px] tracking-[-0.005em]">
              About
            </span>
            <span className="font-mono text-[10px] tracking-[0.1em] text-black/40">
              ↗
            </span>
          </div>
          <div className="flex items-center justify-between py-3 border-t border-b border-black">
            <span className="font-mono text-[10px] tracking-[0.2em] text-black/40">
              iv.
            </span>
            <span className="font-sans text-[14px] tracking-[-0.005em]">
              Contact
            </span>
            <span className="font-mono text-[10px] tracking-[0.1em] text-black/40">
              ↗
            </span>
          </div>
        </nav>
      </div>

      {/* ───────────────────────────────────────────────────────────────
         BELOW THE HAIRLINE — services list, contact, colophon.
         Quiet horizontal band, hugging the very bottom of the canvas
         to the right of the main cluster, balancing the lower void.
         ─────────────────────────────────────────────────────────────── */}

      {/* Services — small inline list, tucked to the right */}
      <div className="absolute right-[96px] top-[1430px] w-[300px]">
        <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-black/40 pb-3">
          Practice
        </div>
        <ul className="font-sans text-[14px] leading-[1.9] tracking-[-0.005em]">
          <li className="flex items-baseline justify-between">
            <span>Strategy</span>
            <span className="font-mono text-[10px] text-black/40">01</span>
          </li>
          <li className="flex items-baseline justify-between">
            <span>Identity</span>
            <span className="font-mono text-[10px] text-black/40">02</span>
          </li>
          <li className="flex items-baseline justify-between">
            <span>Interface</span>
            <span className="font-mono text-[10px] text-black/40">03</span>
          </li>
          <li className="flex items-baseline justify-between">
            <span>Editorial</span>
            <span className="font-mono text-[10px] text-black/40">04</span>
          </li>
          <li className="flex items-baseline justify-between">
            <span>Build</span>
            <span className="font-mono text-[10px] text-black/40">05</span>
          </li>
        </ul>
      </div>

      {/* Contact + colophon — single line along the very bottom edge */}
      <div className="absolute left-[120px] right-[96px] bottom-[64px] flex items-baseline justify-between border-t border-black pt-4">
        <div className="font-mono text-[10px] tracking-[0.2em] uppercase">
          hello@atelier-n.studio
        </div>
        <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-black/40">
          Brooklyn ↔ Lisbon
        </div>
        <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-black/40">
          © MMXXVI
        </div>
        <div className="font-mono text-[10px] tracking-[0.2em] uppercase flex items-center gap-2">
          <span className="block w-[6px] h-[6px] rounded-full bg-black" />
          In Practice
        </div>
      </div>

      {/* A single, tiny square marker floating in the upper-left void —
          the smallest possible gesture, just to register the corner. */}
      <div className="absolute left-[120px] top-[96px]">
        <div className="flex items-center gap-3">
          <span className="block w-[8px] h-[8px] bg-black" />
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase">
            A / N
          </span>
        </div>
      </div>
    </div>
  );
}
