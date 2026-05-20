import type { CSSProperties } from "react";

export default function Concept06() {
  const LEFT = 120;
  const COLUMN_WIDTH = 720;
  const TOP_BLOCK_TOP = 200;
  const RULE_Y = 820;
  const FOOTNOTES_TOP = 880;
  const FOOTNOTE_ROW = 28;

  const microLabelStyle: CSSProperties = {
    letterSpacing: "0.18em",
  };

  const footnotes: Array<{ marker: string; text: React.ReactNode }> = [
    {
      marker: "1",
      text: (
        <>
          Selected work: <span className="italic">Quiet Index</span> &mdash; Halden Editions &middot; 2025 &middot; Identity
        </>
      ),
    },
    {
      marker: "2",
      text: (
        <>
          Selected work: <span className="italic">Margin Notes</span> &mdash; Institute for Slow Reading &middot; 2024 &middot; Editorial
        </>
      ),
    },
    {
      marker: "3",
      text: (
        <>
          Selected work: <span className="italic">Form &amp; Co.</span> &mdash; Foundry Halberd &middot; 2024 &middot; Interface
        </>
      ),
    },
    {
      marker: "4",
      text: <>Practice: Strategy &middot; Identity &middot; Interface &middot; Editorial &middot; Type</>,
    },
    {
      marker: "5",
      text: <>Contact: hello@minor.studio &middot; Copenhagen &middot; MMXXVI</>,
    },
    {
      marker: "6",
      text: <>Index: 06/06 &mdash; Wireframe stage, MMXXVI</>,
    },
  ];

  return (
    <div className="w-[1440px] h-[2000px] relative overflow-hidden bg-white text-black">
      {/* Corner micro-labels (concept index, top-right) */}
      <div
        className="absolute font-mono text-[10px] text-black/40"
        style={{ top: 40, left: LEFT, ...microLabelStyle }}
      >
        MINOR &mdash; STUDIO NOTES
      </div>
      <div
        className="absolute font-mono text-[10px] text-black/40"
        style={{ top: 40, right: LEFT, ...microLabelStyle }}
      >
        06 / 06
      </div>

      {/* Wordmark */}
      <div
        className="absolute font-sans"
        style={{ top: 120, left: LEFT }}
      >
        <span className="font-mono text-[11px] tracking-[0.28em] text-black/40">
          STUDIO
        </span>
      </div>

      {/* Primary text block — wordmark + hero statement */}
      <div
        className="absolute"
        style={{ top: TOP_BLOCK_TOP, left: LEFT, width: COLUMN_WIDTH }}
      >
        {/* Bauhaus anchor circle, acting as pilcrow */}
        <div
          className="absolute rounded-full bg-black"
          style={{
            width: 8,
            height: 8,
            left: -28,
            top: 28,
          }}
        />

        {/* Hero positioning statement with superscript footnote markers */}
        <h1
          className="font-sans font-normal text-[64px] leading-[1.08] tracking-[-0.02em]"
          style={{ margin: 0 }}
        >
          We design quiet
          <sup className="font-mono text-[38px] align-super ml-[2px] tracking-normal">
            1
          </sup>
          <br />
          systems for patient
          <sup className="font-mono text-[38px] align-super ml-[2px] tracking-normal">
            4
          </sup>
          <br />
          clients.
          <sup className="font-mono text-[38px] align-super ml-[2px] tracking-normal">
            5
          </sup>
        </h1>
      </div>

      {/* Nav, very small, top-right area — trimmed to three */}
      <div
        className="absolute font-mono text-[11px] tracking-[0.22em]"
        style={{ top: 120, right: LEFT }}
      >
        <span className="mr-8">WORK</span>
        <span className="mr-8">PRACTICE</span>
        <span>CONTACT</span>
      </div>

      {/* Footnote divider hairline */}
      <div
        className="absolute bg-black"
        style={{
          left: LEFT,
          top: RULE_Y,
          width: COLUMN_WIDTH,
          height: 1,
        }}
      />

      {/* Small mono label above/below the rule, on the right side of the column */}
      <div
        className="absolute font-mono text-[10px] text-black/40"
        style={{
          left: LEFT + COLUMN_WIDTH - 60,
          top: RULE_Y - 18,
          ...microLabelStyle,
        }}
      >
        NOTES
      </div>

      {/* Footnotes */}
      <div
        className="absolute"
        style={{ top: FOOTNOTES_TOP, left: LEFT, width: COLUMN_WIDTH }}
      >
        {footnotes.map((fn, i) => (
          <div
            key={fn.marker}
            className="relative"
            style={{ height: FOOTNOTE_ROW }}
          >
            {/* Hanging superscript marker in the left margin */}
            <span
              className="absolute font-mono text-[10px]"
              style={{ left: -22, top: 0 }}
            >
              {fn.marker}
            </span>
            <span className="font-sans text-[12px] leading-[1.4] tracking-[0.01em]">
              {fn.text}
            </span>
          </div>
        ))}
      </div>

      {/* Colophon at the very bottom */}
      <div
        className="absolute font-mono text-[10px] text-black/40"
        style={{
          left: LEFT,
          bottom: 40,
          ...microLabelStyle,
        }}
      >
        SET IN GEIST &middot; MMXXVI
      </div>

      {/* Small bauhaus marker — single filled square at far bottom-right as page mark */}
      <div
        className="absolute bg-black"
        style={{
          width: 6,
          height: 6,
          right: LEFT,
          bottom: 44,
        }}
      />
    </div>
  );
}
