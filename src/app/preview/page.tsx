"use client";

import { useState } from "react";
import Concept01 from "./concepts/concept-01";
import Concept02 from "./concepts/concept-02";
import Concept03 from "./concepts/concept-03";
import Concept04 from "./concepts/concept-04";
import Concept05 from "./concepts/concept-05";
import Concept06 from "./concepts/concept-06";

const concepts = [
  { label: "I", name: "Monolith", Component: Concept01 },
  { label: "II", name: "Manifesto", Component: Concept02 },
  { label: "III", name: "Index", Component: Concept03 },
  { label: "IV", name: "Rotation", Component: Concept04 },
  { label: "V", name: "Margin", Component: Concept05 },
  { label: "VI", name: "Bands", Component: Concept06 },
] as const;

export default function PreviewPage() {
  const [active, setActive] = useState(0);
  const Active = concepts[active].Component;

  return (
    <div
      className="min-h-screen min-w-[1440px] bg-white text-black flex flex-col items-center pb-32"
      style={{ colorScheme: "light" }}
    >
      <Active />

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
    </div>
  );
}
