import type { CSSProperties } from "react";

export default function Concept02() {
  // ISLAND composition — a single quiet cluster in the dead center.
  // Canvas: 1440 × 2000. Cluster: 520px wide, vertically anchored slightly
  // above center (golden-section ~ 0.382 from top → cluster top near y=620).

  const CLUSTER_WIDTH = 520;
  const CLUSTER_LEFT = (1440 - CLUSTER_WIDTH) / 2; // 460
  const CLUSTER_TOP = 340;

  const clusterStyle: CSSProperties = {
    position: "absolute",
    left: CLUSTER_LEFT,
    top: CLUSTER_TOP,
    width: CLUSTER_WIDTH,
  };

  return (
    <div className="w-[1440px] h-[2000px] relative overflow-hidden bg-white text-black">
      {/* ── CORNER ANCHORS ──────────────────────────────────────────────── */}

      {/* Top-left: index marker */}
      <div
        className="absolute font-mono text-[10px] tracking-[0.18em] uppercase"
        style={{ left: 48, top: 48 }}
      >
        02 / 06
      </div>

      {/* Top-right: year, roman */}
      <div
        className="absolute font-mono text-[10px] tracking-[0.18em] uppercase text-right"
        style={{ right: 48, top: 48 }}
      >
        MMXXVI
      </div>

      {/* Bottom-left: location */}
      <div
        className="absolute font-mono text-[10px] tracking-[0.18em] uppercase"
        style={{ left: 48, bottom: 48 }}
      >
        45.5° N / 122.6° W
      </div>

      {/* ── AXIS MARKER ─────────────────────────────────────────────────── */}
      {/* A single filled circle marker on the central vertical axis,
          placed below the cluster, extending the axis downward. */}
      <div
        className="absolute bg-black"
        style={{
          left: 1440 / 2 - 4,
          top: CLUSTER_TOP + 700 + 96, // below cluster
          width: 8,
          height: 8,
          borderRadius: "9999px",
        }}
        aria-hidden
      />

      {/* ── CENTRAL CLUSTER ─────────────────────────────────────────────── */}
      <div style={clusterStyle}>
        {/* Top hairline */}
        <div className="w-full h-px bg-black" />

        {/* Wordmark */}
        <div className="pt-6 pb-2 text-center">
          <div className="font-mono text-[11px] tracking-[0.32em] uppercase">
            Atelier&nbsp;N
          </div>
        </div>

        {/* Hero statement */}
        <div className="pt-10 pb-12 text-center">
          <h1
            className="font-sans font-light tracking-[-0.02em] leading-[1.10] whitespace-nowrap"
            style={{ fontSize: 36 }}
          >
            I build design system
            <br />
            components with 1 million+
            <br />
            internal pulls monthly
          </h1>
        </div>

        {/* Practice note */}
        <div className="pb-8 text-center">
          <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-black/40">
            Studio of two — est. 2021
          </div>
        </div>

        {/* Mid hairline */}
        <div className="w-full h-px bg-black" />

        {/* Selected work — 3 rows, center aligned */}
        <div className="pt-5 pb-5">
          {/* Section label */}
          <div className="flex items-center justify-center gap-3 pb-4">
            <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-black/40">
              01 — Selected
            </span>
          </div>

          {[
            { name: "Halden", client: "Halden Editions", year: "2025", tag: "Identity" },
            { name: "Vellum", client: "Vellum Type Co.", year: "2024", tag: "Type" },
            { name: "Mire", client: "Mire Architects", year: "2024", tag: "Interface" },
          ].map((w) => (
            <div
              key={w.name}
              className="grid grid-cols-12 items-baseline py-[6px] font-mono text-[11px] tracking-[0.06em] uppercase"
            >
              <div className="col-span-1 text-black/40">{w.year}</div>
              <div className="col-span-4 text-left">{w.name}</div>
              <div className="col-span-4 text-left text-black/40">{w.client}</div>
              <div className="col-span-3 text-right">{w.tag}</div>
            </div>
          ))}
        </div>

        {/* Mid hairline */}
        <div className="w-full h-px bg-black" />

        {/* Services — single quiet row */}
        <div className="pt-5 pb-5 text-center">
          <div className="font-mono text-[11px] tracking-[0.18em] uppercase">
            Identity
            <span className="text-black/40 px-3">·</span>
            Interface
            <span className="text-black/40 px-3">·</span>
            Editorial
            <span className="text-black/40 px-3">·</span>
            Type
          </div>
        </div>

        {/* Mid hairline */}
        <div className="w-full h-px bg-black" />

        {/* Nav + contact, single line */}
        <div className="pt-5 pb-5">
          <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.16em] uppercase">
            <span>Work</span>
            <span>About</span>
            <span>Contact</span>
            <span className="text-black/40">hello@atelier-n.co</span>
          </div>
        </div>

        {/* Closing hairline */}
        <div className="w-full h-px bg-black" />
      </div>
    </div>
  );
}
