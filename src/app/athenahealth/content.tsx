"use client";

import Link from "next/link";
import { Figtree } from "next/font/google";
import { PlainCaseStudy, type PlainCaseStudySection } from "../_components/plain-case-study";
import { BackIcon } from "../_components/fluent-icons";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-figtree",
  display: "swap",
});

const STUDY: readonly PlainCaseStudySection[] = [
  {
    title: "Overview",
    paragraphs: [
      "How do you migrate an entire three-tool design stack into a consolidated Figma approach?",
      "Athenahealth's design-system migration moved work from Sketch, Abstract, Zeplin, and InVision into Figma.",
    ],
    placeholders: [{ label: "Representative video placeholder: Athenahealth design-system migration" }, { label: "Preview image placeholder: migration file" }],
  },
  {
    title: "Context",
    paragraphs: [
      "Sketch supported design, Abstract handled versioning and file storage, Zeplin supported styles, components, and developer handoff, and InVision supported prototyping.",
    ],
    placeholders: [{ label: "Placeholder image: original Sketch, Abstract, Zeplin, and InVision stack" }],
  },
  {
    title: "Problem",
    paragraphs: [
      "The team wanted to migrate to Figma without breaking the existing Zeplin connections used by engineering.",
    ],
    placeholders: [{ label: "Placeholder image: Zeplin connection preview" }],
  },
  {
    title: "Scope",
    paragraphs: [
      "The scope included rebuilding every design library for web, desktop, iOS, and Android; migrating each design file; and preserving the Zeplin handoff connections.",
    ],
    placeholders: [{ label: "Placeholder image: library and platform migration scope" }],
  },
  {
    title: "Process",
    paragraphs: [
      "I documented components, styles, and status in an audit spreadsheet, then learned Figma for design-system work and built a complete system with styles, components, variants, and auto layout.",
      "The Sketch files were migrated and rebuilt component by component. Color and text styles were added and connected across web, desktop, and mobile. A design-systems partner was consulted on the workflow.",
      "Testing confirmed that Zeplin could accept Figma updates. Engineers then tested syncing styles and components before the team completed a code freeze and published the updates.",
      "The migration surfaced duplicated text and color styles with different semantic names. The team cataloged the cases in an updated spreadsheet, corrected them manually, and republished successfully.",
    ],
    placeholders: [{ label: "Placeholder image: migration audit spreadsheet" }, { label: "Placeholder image: Figma design-system rebuild" }, { label: "Placeholder image: Zeplin sync testing" }],
  },
  {
    title: "Deliverable",
    paragraphs: [
      "The project delivered three design libraries for web, iOS, and Android, more than twenty design files, and updated Zeplin handoff.",
    ],
    placeholders: [{ label: "Placeholder image: delivered design libraries" }],
  },
  {
    title: "Result",
    paragraphs: [
      "The team continued working seamlessly and recovered with only a one-week delay.",
    ],
    placeholders: [{ label: "Placeholder image: migration result" }],
  },
  {
    title: "Final thoughts",
    paragraphs: [
      "The migration benefited from detailed planning and a dedicated time to handle edge cases. The unexpected duplicate-style issue showed that an early audit of semantic naming is essential before a large tool migration.",
    ],
  },
];

export default function AthenahealthContent() {
  return (
    <main className={figtree.variable} style={{ fontFamily: "var(--font-figtree), system-ui, sans-serif", color: "#292929", background: "#fff", minHeight: "100vh", padding: "clamp(24px, 6vw, 120px)" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link href="/" style={{ color: "#292929", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}>
          <BackIcon /> Back
        </Link>
        <span>Full case study</span>
      </header>
      <article style={{ maxWidth: 900, margin: "96px auto 0" }}>
        <h1>Athenahealth</h1>
        <p>Design system migration: Sketch, Abstract, Zeplin, and InVision to Figma.</p>
        <PlainCaseStudy sections={STUDY} />
      </article>
    </main>
  );
}
