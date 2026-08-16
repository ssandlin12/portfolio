"use client";

import Link from "next/link";
import Image from "next/image";
import { Figtree } from "next/font/google";
import { type CSSProperties } from "react";
import {
  CaseProcess,
  type ProcessStep,
} from "../_components/case-process";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-figtree",
  display: "swap",
});

const INK_DARK = "#292929";

const navItem: CSSProperties = {
  fontSize: 15,
  letterSpacing: "0.01em",
  fontWeight: 500,
  color: "rgba(41,41,41,0.5)",
  textDecoration: "none",
  transition: "color 160ms ease-out",
};

const PROCESS: readonly ProcessStep[] = [
  {
    number: "01",
    eyebrow: "Discover",
    heading: "Understanding the system",
    body: "Add the project context, research, audits, and stakeholder inputs that shaped the Fluent design-library work.",
    methods: ["System audit", "Stakeholder interviews", "Usage analysis"],
    takeaway: "Replace this placeholder with the most important insight from discovery.",
  },
  {
    number: "02",
    eyebrow: "Define",
    heading: "Aligning on principles and priorities",
    body: "Describe how the team defined the library strategy, established priorities, and aligned product teams around a shared direction.",
    methods: ["Design principles", "Prioritization", "Roadmapping"],
    takeaway: "Replace this placeholder with the decision that focused the work.",
  },
  {
    number: "03",
    eyebrow: "Build",
    heading: "Evolving the design library",
    body: "Document the component, pattern, token, governance, and contribution work that moved the design library forward.",
    methods: ["Component design", "Prototyping", "Documentation"],
    takeaway: "Replace this placeholder with the core system contribution.",
  },
  {
    number: "04",
    eyebrow: "Scale",
    heading: "Supporting adoption across teams",
    body: "Explain how the library was validated, released, communicated, and supported across Microsoft product teams.",
    methods: ["Usability testing", "Release planning", "Adoption support"],
    takeaway: "Replace this placeholder with the clearest signal of adoption or impact.",
  },
];

function MediaPlaceholder({ label }: { label: string }) {
  return (
    <div className="case-media-placeholder" role="img" aria-label={`${label} media placeholder`}>
      <span>{label}</span>
      <small>Project media</small>
    </div>
  );
}

export default function FluentContent() {
  return (
    <main
      className={`${figtree.variable} min-h-screen flex flex-col relative`}
      style={{
        fontFamily: "var(--font-figtree), system-ui, sans-serif",
        color: INK_DARK,
        backgroundColor: "#ffffff",
        paddingInline: "clamp(20px, 6vw, 120px)",
        paddingTop: "calc(clamp(24px, 6vh, 72px) - 24px)",
        paddingBottom: "clamp(24px, 6vh, 72px)",
        colorScheme: "light",
      }}
    >
      <style>{`
        .nav-link:hover { color: ${INK_DARK} !important; }
        .back-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          height: 36px;
          padding: 0 22px 0 16px;
          border: 0;
          border-radius: 999px;
          background: #f1f1f1;
          color: ${INK_DARK};
          font-size: 15px;
          font-weight: 400;
          text-decoration: none;
          transition: background-color 160ms ease-out;
        }
        .back-pill:hover { background: #e8e8e8; }
        .case-article {
          width: 100%;
          max-width: 768px;
          margin: clamp(56px, calc(6vh + 32px), 120px) auto 100px;
        }
        .case-title-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 16px;
        }
        .case-title {
          margin: 0;
          color: ${INK_DARK};
          font-size: 34px;
          font-weight: 300;
          line-height: 1.2;
          letter-spacing: -0.02em;
        }
        .case-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          flex: none;
          padding: 8px 16px;
          border-radius: 999px;
          background: #f1f1f1;
          color: rgba(41, 41, 41, 0.68);
          font-size: 15px;
          text-decoration: none;
          transition: background-color 160ms ease-out;
        }
        .case-tag:hover { background: #e8e8e8; }
        .case-intro {
          margin: 20px 0 0;
          color: rgba(41, 41, 41, 0.7);
          font-size: 18px;
          line-height: 1.5;
        }
        .case-section { margin-top: 48px; }
        .case-section-heading {
          margin: 0 0 4px;
          color: ${INK_DARK};
          font-size: 20px;
          font-weight: 400;
        }
        .case-section-body {
          margin: 0;
          color: rgba(41, 41, 41, 0.7);
          font-size: 17px;
          line-height: 1.5;
        }
        .case-feature-kicker {
          margin: 0 0 8px;
          color: rgba(41, 41, 41, 0.45);
          font-size: 14px;
          font-weight: 500;
          line-height: 1.4;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .case-feature-title {
          margin: 0;
          font-size: 28px;
          font-weight: 300;
          line-height: 1.25;
          letter-spacing: -0.02em;
        }
        .case-feature-intro {
          max-width: 680px;
          margin: 12px 0 0;
          color: rgba(41, 41, 41, 0.7);
          font-size: 17px;
          line-height: 1.55;
        }
        .case-media-placeholder {
          display: flex;
          aspect-ratio: 16 / 9;
          width: 100%;
          box-sizing: border-box;
          margin-top: 28px;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 6px;
          border: 1px solid #e1e1e1;
          border-radius: 14px;
          background:
            radial-gradient(circle at 25% 20%, rgba(98, 100, 167, 0.13), transparent 40%),
            linear-gradient(145deg, #fafafa, #f1f1f1);
          color: rgba(41, 41, 41, 0.58);
        }
        .case-media-placeholder span {
          font-size: 20px;
          font-weight: 400;
        }
        .case-media-placeholder small {
          font-size: 13px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          opacity: 0.58;
        }
        .case-media-image {
          display: block;
          width: 100%;
          height: auto;
          margin: 28px auto 0;
          border: 1px solid #e1e1e1;
          border-radius: 14px;
          box-sizing: border-box;
        }
        .case-media-caption {
          margin: 10px 0 0;
          color: rgba(41, 41, 41, 0.55);
          font-size: 14px;
          line-height: 1.45;
          text-align: center;
        }
        .case-post-media-copy {
          margin: 28px 0 0;
          color: rgba(41, 41, 41, 0.7);
          font-size: 17px;
          line-height: 1.55;
        }
        .process-media-image {
          display: block;
          width: 100%;
          height: auto;
          margin-top: 28px;
          border: 1px solid #e1e1e1;
          border-radius: 14px;
          box-sizing: border-box;
        }
        .case-next {
          display: block;
          margin-top: 64px;
          padding: 28px 32px;
          border-radius: 16px;
          background: #f1f1f1;
          color: ${INK_DARK};
          text-decoration: none;
          transition: background-color 160ms ease-out;
        }
        .case-next:hover { background: #e8e8e8; }
        .case-next-label {
          margin: 0;
          color: rgba(41, 41, 41, 0.5);
          font-size: 15px;
          font-weight: 500;
        }
        .case-next-title {
          margin: 2px 0 4px;
          font-size: 20px;
          font-weight: 400;
          letter-spacing: -0.01em;
        }
        .case-next-body {
          margin: 0;
          color: rgba(41, 41, 41, 0.7);
          font-size: 16px;
          line-height: 1.5;
        }
        @media (max-width: 560px) {
          .case-title-row { align-items: flex-start; flex-direction: column; }
          .case-tag { font-size: 14px; }
        }
      `}</style>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          alignItems: "center",
          columnGap: "clamp(20px, 4vw, 48px)",
        }}
      >
        <Link href="/" className="back-pill" aria-label="Back to home" style={{ justifySelf: "start" }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M10 4L5 8L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </Link>
        <nav className="flex" style={{ justifySelf: "end", columnGap: "clamp(20px, 4vw, 40px)" }}>
          <a href="https://drive.google.com/file/d/1Vc50sGAOZPn380b65T648lka6LVHIrct/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="nav-link" style={navItem}>Resume</a>
          <a href="https://www.linkedin.com/in/anna-sandlin/" target="_blank" rel="noopener noreferrer" className="nav-link" style={navItem}>LinkedIn</a>
        </nav>
      </div>

      <article className="case-article">
        <div className="case-title-row">
          <h1 className="case-title">Microsoft Fluent</h1>
          <a
            className="case-tag"
            href="https://www.figma.com/community/file/836828295772957889/microsoft-fluent-2-web"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Microsoft Fluent 2 Web in Figma Community"
          >
            Fluent 2 Web
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
        <p className="case-intro">
          Planning, brainstorming, structuring, building, delivering a complete
          rebuild for one of Fluent&rsquo;s most used components: the Avatar
          component.
        </p>
        <Image
          className="case-media-image"
          src="/case-studies/fluent/avatar-hero-final.svg"
          width={960}
          height={492}
          sizes="(max-width: 808px) calc(100vw - 40px), 768px"
          unoptimized
          alt="Fluent Avatar component shown across image, initials, icon, size, and presence variants"
        />
        <section className="case-section">
          <p className="case-feature-kicker">The problem</p>
          <h2 className="case-feature-title">
            How do you build a Figma component that gets
            <br />
            1.2 million uses per day?
          </h2>
          <p className="case-feature-intro">
            The Fluent team reached out to me as one of the contributors to
            the main Fluent library in order to help solve an issue with the
            Avatar component, which was getting consistent feedback that it
            needed a presence badge border solution. It had been built with
            the stroke visible around the Avatar image and Presence Badge.
          </p>
          <Image
            className="case-media-image"
            src="/case-studies/fluent/avatar-presence-comparison-v2.png"
            width={926}
            height={238}
            sizes="(max-width: 808px) calc(100vw - 40px), 768px"
            alt="Microsoft Fluent Avatar component comparing success and error presence badge borders"
          />
          <p className="case-media-caption">
            Left: Stroke not visible on white background. Right: Stroke visible
            on a non-white background.
          </p>
          <p className="case-post-media-copy">
            This was fine on white backgrounds, but for any non-white
            backgrounds, designers had to constantly change all of those
            stroke variables to match the background color. As a component that
            consistently got 1.2+ million uses a day, this would equate to
            saving lots of designers&rsquo; time across the Microsoft work.
          </p>
        </section>

        <CaseProcess
          id="fluent-process-title"
          kicker="The scope"
          title="Auditing 91 variants for the existing component"
          intro="With thirteen sizes, three layouts, and three colors, as well as two properties, this required reviewing multiple variant-specific distinctions. I had to go into the spec documentation in order to see all of the sizes for activity ring stroke width, presence badge size, and presence badge stroke width."
          steps={PROCESS}
        >
          <Image
            className="process-media-image"
            src="/case-studies/fluent/avatar-specification-v2.png"
            width={1682}
            height={1771}
            sizes="(max-width: 808px) calc(100vw - 40px), 768px"
            alt="Microsoft Fluent Avatar specification showing sizes, presence badges, activity rings, and appearance variants"
          />
        </CaseProcess>

        <section className="case-section">
          <h2 className="case-section-heading">After</h2>
          <p className="case-section-body">
            Describe the evolved library, the experience it enabled, and what changed for product teams.
          </p>
          <MediaPlaceholder label="After" />
        </section>

        <section className="case-section">
          <h2 className="case-section-heading">Outcome</h2>
          <p className="case-section-body">
            Add measurable outcomes, adoption signals, organizational impact, and the next direction for the library.
          </p>
        </section>

        <Link href="/teams" className="case-next">
          <p className="case-next-label">Next</p>
          <h3 className="case-next-title">Microsoft Teams</h3>
          <p className="case-next-body">Continue to the Microsoft Teams case study.</p>
        </Link>
      </article>
    </main>
  );
}
