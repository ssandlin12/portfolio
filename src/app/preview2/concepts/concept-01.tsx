import type { CSSProperties } from "react";

// ────────────────────────────────────────────────────────────────────────────
// CONCEPT 01 — "CORNER"
// Anchor cluster sits in the right half. Three corners hold a single mono
// micro-line each. The light is a single "spine" — a vertical tube fixture
// at x = 840 (where the original hairline rule sat) that throws a tight,
// bright wash to the right. No top/bottom spillover — the gradient is
// contained entirely within the tube's vertical extent so the canvas top
// and bottom stay fully dark.
// ────────────────────────────────────────────────────────────────────────────

const EDGE = 80;
const ANCHOR_WIDTH = 460;
const ANCHOR_LEFT = 1440 - EDGE - ANCHOR_WIDTH; // 900

// Right-column text held at blue-grey so the screen-blended cones above can
// lift it back toward near-white where the light actually lands.
const BODY_DIM = "rgba(190,205,235,0.55)";
const META_DIM = "rgba(190,205,235,0.22)";
const RULE_DIM = "rgba(190,205,235,0.35)";

// Spine geometry — vertical tube light at SPINE_X, running TUBE_TOP→TUBE_BOTTOM.
const SPINE_X = ANCHOR_LEFT - 60; // 840
const TUBE_TOP = 240;
const TUBE_BOTTOM = 1760;

const lightLayer: CSSProperties = {
  position: "absolute",
  pointerEvents: "none",
  filter: "blur(12px)",
  mixBlendMode: "screen",
};

export default function Concept01() {
  // Anchor cluster lifted 400px from the bottom so the lower sections sit
  // higher in the canvas (and clear of the down-burst footprint).
  const anchorStyle: CSSProperties = {
    left: ANCHOR_LEFT,
    right: EDGE,
    bottom: EDGE + 400,
    width: ANCHOR_WIDTH,
  };

  return (
    <div className="w-[1440px] h-[2000px] relative overflow-hidden bg-[#111111] text-white">
      {/* ───────── CORNER MICRO-LABELS ───────── */}
      <div
        className="absolute font-mono text-[11px] tracking-[0.14em] uppercase"
        style={{ top: EDGE, left: EDGE }}
      >
        01 / 06
      </div>
      <div
        className="absolute font-mono text-[11px] tracking-[0.14em] uppercase text-right"
        style={{ top: EDGE, right: EDGE }}
      >
        MMXXVI
      </div>
      <div
        className="absolute font-mono text-[11px] tracking-[0.14em] uppercase"
        style={{ bottom: EDGE, left: EDGE }}
      >
        New York, NY
      </div>

      {/* ───────── ANCHOR CLUSTER ───────── */}
      <div className="absolute" style={{ ...anchorStyle, color: BODY_DIM }}>
        <div className="font-sans text-[22px] tracking-[0.32em] font-medium leading-none">
          ATELIER N
        </div>
        <div style={{ height: 64 }} />
        <div
          className="font-sans text-[64px] leading-[1.05] tracking-[-0.02em] font-light"
          style={{ marginLeft: -2 }}
        >
          Quiet work,
          <br />
          made slowly,
          <br />
          on purpose.
        </div>
        <div style={{ height: 72 }} />
        <div className="flex items-baseline justify-between">
          <span
            className="font-mono text-[10px] tracking-[0.18em] uppercase"
            style={{ color: META_DIM }}
          >
            §01 · Index
          </span>
        </div>
        <div style={{ height: 14 }} />
        <div className="font-sans text-[15px] leading-[1.9] tracking-[0.02em]">
          <div>Work</div>
          <div>Services</div>
          <div>About</div>
          <div>Contact</div>
        </div>
        <div style={{ height: 56 }} />
        <div
          className="font-mono text-[10px] tracking-[0.18em] uppercase"
          style={{ color: META_DIM }}
        >
          §02 · Selected
        </div>
        <div style={{ height: 14 }} />
        <div className="w-full h-px" style={{ background: RULE_DIM }} />
        <WorkRow
          name="Halden Press"
          client="Halden &amp; Co."
          year="2025"
          tag="Identity"
          ruleColor={RULE_DIM}
          metaColor={META_DIM}
        />
        <WorkRow
          name="Field Notes Vol. IV"
          client="Northsound"
          year="2025"
          tag="Editorial"
          ruleColor={RULE_DIM}
          metaColor={META_DIM}
        />
        <WorkRow
          name="Marrow OS"
          client="Marrow Labs"
          year="2024"
          tag="Interface"
          ruleColor={RULE_DIM}
          metaColor={META_DIM}
        />
        <div style={{ height: 56 }} />
        <div
          className="font-mono text-[10px] tracking-[0.18em] uppercase"
          style={{ color: META_DIM }}
        >
          §03 · Disciplines
        </div>
        <div style={{ height: 14 }} />
        <div className="font-sans text-[13px] leading-[1.85] tracking-[0.04em]">
          Strategy &nbsp;·&nbsp; Identity &nbsp;·&nbsp; Interface
          <br />
          Editorial &nbsp;·&nbsp; Type
        </div>
        <div style={{ height: 56 }} />
        <div className="w-full h-px" style={{ background: RULE_DIM }} />
        <div style={{ height: 14 }} />
        <div className="flex items-end justify-between font-mono text-[10px] tracking-[0.14em] uppercase">
          <div className="leading-[1.7]">
            <div>hello@atelier-n.studio</div>
            <div style={{ color: META_DIM }}>By appointment</div>
          </div>
          <div className="text-right leading-[1.7]">
            <div>01 / 06</div>
            <div style={{ color: META_DIM }}>MMXXVI</div>
          </div>
        </div>
      </div>

      {/* ───────── SPINE LIGHT — RIGHT WASH ─────────
          Single light layer along the tube's vertical extent. The gradient
          is intentionally tight: small horizontal radius keeps the brightest
          column right at the spine, the hotspot's vertical radius (520px)
          is contained well within the 1520px tube length so the wash fades
          to fully transparent long before reaching either tube end. No
          up/down spillover divs — top and bottom of canvas stay dark. */}
      <div
        aria-hidden
        style={{
          ...lightLayer,
          left: SPINE_X,
          top: TUBE_TOP,
          width: 1440 - SPINE_X,
          height: TUBE_BOTTOM - TUBE_TOP,
          background:
            "radial-gradient(ellipse 140px 520px at 0% 50%, rgba(225,238,255,0.95) 0%, rgba(165,205,250,0.55) 12%, rgba(70,120,210,0.20) 32%, rgba(25,50,110,0.06) 55%, transparent 70%), radial-gradient(ellipse 280px 780px at 0% 50%, rgba(95,150,230,0.30) 0%, rgba(45,90,170,0.10) 35%, transparent 65%)",
        }}
      />
    </div>
  );
}

function WorkRow({
  name,
  client,
  year,
  tag,
  ruleColor,
  metaColor,
}: {
  name: string;
  client: string;
  year: string;
  tag: string;
  ruleColor: string;
  metaColor: string;
}) {
  return (
    <>
      <div className="flex items-baseline justify-between py-[14px]">
        <div className="flex-1 min-w-0">
          <div className="font-sans text-[15px] tracking-[0.01em] leading-none">
            {name}
          </div>
          <div
            className="font-mono text-[10px] tracking-[0.16em] uppercase mt-[6px]"
            style={{ color: metaColor }}
          >
            {client}
          </div>
        </div>
        <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-right leading-[1.6] ml-4">
          <div>{tag}</div>
          <div style={{ color: metaColor }}>{year}</div>
        </div>
      </div>
      <div className="w-full h-px" style={{ background: ruleColor }} />
    </>
  );
}
