import type { CSSProperties } from "react";

export default function Concept05() {
  const inscriptionStyle: CSSProperties = {
    letterSpacing: "0.5em",
    fontWeight: 500,
  };

  const subInscriptionStyle: CSSProperties = {
    letterSpacing: "0.42em",
    fontWeight: 400,
  };

  return (
    <div className="w-[1440px] h-[2000px] relative overflow-hidden bg-white text-black">
      {/* Top micro-header: index marker + nav, kept tiny and far apart */}
      <div
        className="absolute font-mono text-[11px] uppercase tracking-[0.18em] text-black/40"
        style={{ top: 64, left: 96 }}
      >
        05 / 06
      </div>

      <nav
        className="absolute font-mono text-[11px] uppercase tracking-[0.18em] text-black/40 flex gap-10"
        style={{ top: 64, right: 96 }}
      >
        <span>Work</span>
        <span>Services</span>
        <span>About</span>
        <span>Contact</span>
      </nav>

      {/* The inscription — the entire visual event.
          Framed by two hairline rules, like a chiseled cartouche. */}
      <div
        className="absolute"
        style={{ top: 420, left: 96, right: 96 }}
      >
        {/* Top hairline */}
        <div className="w-full h-px bg-black" />

        {/* Inscription line 1 — wordmark */}
        <div
          className="w-full font-sans uppercase text-center"
          style={{
            ...inscriptionStyle,
            fontSize: 84,
            lineHeight: 1,
            paddingTop: 56,
            paddingBottom: 36,
            // letterspacing creates trailing space — compensate visually
            paddingLeft: "0.5em",
          }}
        >
          A T E L I E R&nbsp;&nbsp;&nbsp;N
        </div>

        {/* Inscription line 2 — tagline, smaller, also letterspaced */}
        <div
          className="w-full font-sans uppercase text-center"
          style={{
            ...subInscriptionStyle,
            fontSize: 22,
            lineHeight: 1,
            paddingBottom: 56,
            paddingLeft: "0.42em",
          }}
        >
          A&nbsp;&nbsp;S M A L L&nbsp;&nbsp;I N D E P E N D E N T&nbsp;&nbsp;S T U D I O&nbsp;&nbsp;F O R&nbsp;&nbsp;D I G I T A L&nbsp;&nbsp;F O R M
        </div>

        {/* Bottom hairline */}
        <div className="w-full h-px bg-black" />
      </div>

      {/* A single Bauhaus marker — small filled black square — at dead center
          of the canvas as a quiet anchor. Canvas is 1440×2000 → center 720, 1000. */}
      <div
        className="absolute bg-black"
        style={{ width: 10, height: 10, top: 1000 - 5, left: 720 - 5 }}
      />

      {/* Services — one quiet line, aligned left, mid-lower zone */}
      <div
        className="absolute font-mono text-[12px] uppercase tracking-[0.22em] text-black"
        style={{ left: 96, top: 1240 }}
      >
        Identity &nbsp;·&nbsp; Interface &nbsp;·&nbsp; Editorial &nbsp;·&nbsp; Type
      </div>

      {/* Selected work index — aligned right, low on the canvas */}
      <div
        className="absolute font-mono text-[12px] uppercase tracking-[0.16em] text-right"
        style={{ right: 96, top: 1400, width: 420 }}
      >
        <div
          className="font-mono text-[10px] tracking-[0.28em] text-black/40 mb-4"
          style={{ letterSpacing: "0.28em" }}
        >
          SELECTED&nbsp;&nbsp;WORK
        </div>
        <div className="flex justify-between border-t border-black pt-3">
          <span>Quiet Index</span>
          <span className="text-black/40">Mnemo</span>
          <span>2025 — Identity</span>
        </div>
        <div className="flex justify-between pt-2">
          <span>Field Notes</span>
          <span className="text-black/40">Northwind</span>
          <span>2024 — Editorial</span>
        </div>
        <div className="flex justify-between pt-2">
          <span>Slow Press</span>
          <span className="text-black/40">Hannes &amp; Co.</span>
          <span>2024 — Interface</span>
        </div>
      </div>

      {/* Colophon — bottom, three quiet clusters */}
      <div
        className="absolute font-mono text-[11px] uppercase tracking-[0.18em] flex justify-between"
        style={{ left: 96, right: 96, bottom: 64 }}
      >
        <span className="text-black/40">hello@atelier-n.studio</span>
        <span className="text-black/40">Brooklyn &nbsp;·&nbsp; Lisbon</span>
        <span className="text-black/40">MMXXVI</span>
      </div>
    </div>
  );
}
