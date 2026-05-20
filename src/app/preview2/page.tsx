"use client";

import { useState, type CSSProperties } from "react";
import {
  Space_Grotesk,
  DM_Sans,
  Zen_Kaku_Gothic_Antique,
  Figtree,
  Bricolage_Grotesque,
  Work_Sans,
} from "next/font/google";
import Concept01 from "./concepts/concept-01";
import Concept02 from "./concepts/concept-02";
import Concept03 from "./concepts/concept-03";
import Concept04 from "./concepts/concept-04";
import Concept05 from "./concepts/concept-05";
import Concept06 from "./concepts/concept-06";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});
const zenKaku = Zen_Kaku_Gothic_Antique({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-zen-kaku",
  display: "swap",
});
const figtree = Figtree({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-figtree",
  display: "swap",
});
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-bricolage",
  display: "swap",
});
const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-work-sans",
  display: "swap",
});

const FONT_VARS_CLASS = [
  spaceGrotesk.variable,
  dmSans.variable,
  zenKaku.variable,
  figtree.variable,
  bricolage.variable,
  workSans.variable,
].join(" ");

const FONT_OPTIONS = [
  {
    display: "Space Grotesk",
    body: "DM Sans",
    displayVar: "var(--font-space-grotesk)",
    bodyVar: "var(--font-dm-sans)",
  },
  {
    display: "Zen Kaku Gothic",
    body: "Figtree",
    displayVar: "var(--font-zen-kaku)",
    bodyVar: "var(--font-figtree)",
  },
  {
    display: "Bricolage",
    body: "Work Sans",
    displayVar: "var(--font-bricolage)",
    bodyVar: "var(--font-work-sans)",
  },
] as const;

const concepts = [
  { label: "I", name: "Corner", Component: Concept01, bg: "#111111", scheme: "dark" as const },
  { label: "II", name: "Island", Component: Concept02, bg: "#ffffff", scheme: "light" as const },
  { label: "III", name: "Spine", Component: Concept03, bg: "#ffffff", scheme: "light" as const },
  { label: "IV", name: "Horizon", Component: Concept04, bg: "#ffffff", scheme: "light" as const },
  { label: "V", name: "Inscription", Component: Concept05, bg: "#ffffff", scheme: "light" as const },
  { label: "VI", name: "Footnote", Component: Concept06, bg: "#ffffff", scheme: "light" as const },
] as const;

// Routing:
//   - Default for everything under .p2-fonts = body font.
//   - Any element whose class OR inline style declares a font-size at or above
//     19px is treated as "display / header" and uses the display font.
//   - font-sans / font-mono fall back to body so meta/overline/headline text
//     (often styled font-mono) follows the body font, not system monospace.
//
// Substring selectors are intentionally specific: `text-[22px` matches the
// class `text-[22px]` but not `text-[220px]` (next char would be `0`, not `p`).
// Same trick for inline `font-size: 22px` vs `font-size: 220px`.
const DISPLAY_PX = [
  19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48,
  50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 84, 88, 92, 96,
  100, 110, 120, 130, 140, 150, 160, 170, 180, 200, 220, 240, 260, 280, 300,
];

const DISPLAY_SELECTORS = DISPLAY_PX.flatMap((px) => [
  `.p2-fonts [class*="text-[${px}px"]`,
  `.p2-fonts [style*="font-size: ${px}px"]`,
  `.p2-fonts [style*="font-size:${px}px"]`,
]).join(",\n  ");

const FONT_SCOPE_CSS = `
  .p2-fonts,
  .p2-fonts .font-sans,
  .p2-fonts .font-mono {
    font-family: var(--p2-font-body);
  }
  ${DISPLAY_SELECTORS} {
    font-family: var(--p2-font-display);
  }
`;

export default function Preview2Page() {
  const [active, setActive] = useState(0);
  const [fontIdx, setFontIdx] = useState(0);
  const Active = concepts[active].Component;
  const fontOpt = FONT_OPTIONS[fontIdx];

  const current = concepts[active];

  return (
    <div
      className={`${FONT_VARS_CLASS} min-h-screen min-w-[1440px] flex flex-col items-center pb-32`}
      style={{
        background: current.bg,
        color: current.scheme === "dark" ? "#fff" : "#000",
        colorScheme: current.scheme,
      }}
    >
      <style>{FONT_SCOPE_CSS}</style>

      <div
        className="p2-fonts"
        style={
          {
            "--p2-font-display": fontOpt.displayVar,
            "--p2-font-body": fontOpt.bodyVar,
          } as CSSProperties
        }
      >
        <Active />
      </div>

      <nav
        aria-label="Concept selector"
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex bg-white border border-black font-mono text-[11px] uppercase tracking-[0.12em]"
      >
        {concepts.map(({ label, name }, i) => {
          const isActive = i === active;
          return (
            <button
              key={label}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={isActive}
              className={[
                "px-4 py-3 border-l border-black first:border-l-0 flex items-center gap-3 transition-colors",
                isActive
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-black hover:text-white",
              ].join(" ")}
            >
              <span className="font-semibold tabular-nums">{label}</span>
              <span>{name}</span>
            </button>
          );
        })}
      </nav>

      <nav
        aria-label="Font selector"
        className="fixed bottom-6 right-6 z-50 flex flex-col bg-white border border-black"
      >
        {FONT_OPTIONS.map((opt, i) => {
          const isActive = i === fontIdx;
          return (
            <button
              key={opt.display}
              type="button"
              onClick={() => setFontIdx(i)}
              aria-pressed={isActive}
              className={[
                "px-3 py-2 border-b last:border-b-0 border-black flex flex-col items-start gap-0.5 text-left transition-colors min-w-[180px]",
                isActive
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-black hover:text-white",
              ].join(" ")}
            >
              <span
                style={{ fontFamily: opt.displayVar }}
                className="text-[13px] leading-none"
              >
                {opt.display}
              </span>
              <span
                style={{ fontFamily: opt.bodyVar }}
                className="text-[11px] leading-none opacity-60"
              >
                {opt.body}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
