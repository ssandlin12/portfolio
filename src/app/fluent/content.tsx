"use client";

import Link from "next/link";
import Image from "next/image";
import { Figtree } from "next/font/google";
import { useState } from "react";
import {
  CaseProcess,
  type ProcessStep,
} from "../_components/case-process";
import { BackIcon, ExternalLinkIcon } from "../_components/fluent-icons";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-figtree",
  display: "swap",
});

const INK_DARK = "#292929";

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

type CaseStudyProps = {
  title?: string;
  subtitle?: string;
  linkHref?: string;
  linkLabel?: string;
  videoSrc?: string;
  previewSrc?: string;
  previewWidth?: number;
  previewHeight?: number;
};

export default function FluentContent({
  title = "Microsoft Fluent",
  subtitle = "“How do you structure Figma components that get 1 million internal uses per day?”",
  linkHref = "https://www.figma.com/community/file/836828295772957889/microsoft-fluent-2-web",
  linkLabel = "Fluent 2 Web",
  videoSrc = "/fluent-hero.mp4",
  previewSrc = "/fluent-web-ui-kit.png",
  previewWidth = 2048,
  previewHeight = 1152,
}: CaseStudyProps) {
  const [videoReady, setVideoReady] = useState(false);

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
        .fluent-page-header {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .fluent-case-hero {
          --preview-overhang: 56px;
          width: 100%;
          max-width: 900px;
          margin: clamp(56px, calc(6vh + 32px), 120px) auto 0;
        }
        .fluent-case-heading {
          margin: 0 0 48px;
          color: ${INK_DARK};
        }
        .fluent-case-title {
          margin: 0;
          font-size: clamp(30px, 2.4vw, 42px);
          font-weight: 300;
          line-height: 1.08;
          letter-spacing: -0.045em;
        }
        .fluent-case-subtitle {
          margin: 10px 0 0;
          color: rgba(41, 41, 41, 0.7);
          font-size: clamp(19px, 1.5vw, 27px);
          font-weight: 300;
          line-height: 1.15;
          letter-spacing: -0.035em;
        }
        .fluent-video-card {
          position: relative;
          min-width: 0;
          width: calc(100% - var(--preview-overhang));
          aspect-ratio: 16 / 9;
          line-height: 0;
        }
        .fluent-video-card::after {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 3;
          pointer-events: none;
          border: 1px solid rgba(41, 41, 41, 0.14);
          border-radius: clamp(18px, 2vw, 34px);
        }
        .fluent-video-skeleton {
          position: absolute;
          inset: 0;
          border-radius: clamp(18px, 2vw, 34px);
          background: linear-gradient(105deg, #e6e6e6 20%, #f4f4f4 42%, #e6e6e6 64%);
          background-size: 220% 100%;
          animation: fluent-video-shimmer 1.6s linear infinite;
        }
        @keyframes fluent-video-shimmer {
          from { background-position: 100% 0; }
          to { background-position: -120% 0; }
        }
        .fluent-video-card video {
          position: absolute;
          inset: 0;
          z-index: 1;
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: clamp(18px, 2vw, 34px);
          opacity: 0;
          transition: opacity 280ms ease-out;
        }
        .fluent-video-card.is-ready video {
          opacity: 1;
        }
        .fluent-preview-image {
          position: absolute;
          bottom: -36px;
          right: calc(-1 * var(--preview-overhang));
          width: clamp(176px, 21vw, 270px);
          height: auto;
          border-radius: clamp(14px, 1.5vw, 24px);
          box-shadow: 0 18px 40px rgba(28, 37, 76, 0.18);
          z-index: 4;
        }
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
        .case-type-pill {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          display: inline-flex;
          align-items: center;
          height: 36px;
          padding: 0 16px;
          border-radius: 999px;
          background: ${INK_DARK};
          color: #fff;
          font-size: 15px;
          font-weight: 400;
          line-height: 1;
          white-space: nowrap;
        }
        .case-article {
          width: 100%;
          max-width: 900px;
          margin: clamp(88px, calc(7vh + 48px), 150px) auto 100px;
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
        .case-bottom-media {
          display: grid;
          gap: 28px;
          margin-top: 72px;
        }
        .case-bottom-media .case-media-image {
          margin-top: 0;
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
          .fluent-case-hero {
            --preview-overhang: 28px;
            margin-top: 56px;
          }
          .fluent-preview-image {
            bottom: -24px;
            width: min(48vw, 190px);
          }
        }
      `}</style>

      <header className="fluent-page-header">
        <Link href="/" className="back-pill" aria-label="Back to home">
          <BackIcon />
          Back
        </Link>
        <span className="case-type-pill">Full case study</span>
        <a
          className="back-pill"
          href={linkHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${linkLabel}`}
        >
          {linkLabel}
          <ExternalLinkIcon />
        </a>
      </header>

      <section className="fluent-case-hero" aria-labelledby="fluent-case-title">
        <div className="fluent-case-heading">
          <h1 id="fluent-case-title" className="fluent-case-title">{title}</h1>
          <p className="fluent-case-subtitle">{subtitle}</p>
        </div>
        <div className={`fluent-video-card${videoReady ? " is-ready" : ""}`} aria-label="Microsoft Fluent case study video">
          <div className="fluent-video-skeleton" aria-hidden="true" />
          <video autoPlay loop muted playsInline preload="auto" onLoadedData={() => setVideoReady(true)}>
            <source src={videoSrc} type="video/mp4" />
          </video>
          <Image
            className="fluent-preview-image"
            src={previewSrc}
            width={previewWidth}
            height={previewHeight}
            sizes="(max-width: 560px) 56vw, 22vw"
            alt="Web UI Kit preview"
          />
        </div>
      </section>

      <article className="case-article">
        <p className="case-intro">
          Planning, brainstorming, structuring, building, delivering a complete
          rebuild for one of Fluent&rsquo;s most used components: the Avatar
          component.
        </p>
        <video
          className="case-media-image"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-label="Fluent Avatar component documentation"
        >
          <source src="/case-studies/fluent/avatar-documentation.mp4" type="video/mp4" />
        </video>
        <section className="case-section">
          <p className="case-feature-kicker">The problem</p>
          <h2 className="case-feature-title">
            “How do you structure a Figma component that gets
            <br />
            1.2 million uses per day?”
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
            sizes="(max-width: 940px) calc(100vw - 40px), 900px"
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
            sizes="(max-width: 940px) calc(100vw - 40px), 900px"
            alt="Microsoft Fluent Avatar specification showing sizes, presence badges, activity rings, and appearance variants"
          />
        </CaseProcess>

        <section className="case-bottom-media" aria-label="Additional Avatar component work">
          <Image
            className="case-media-image"
            src="/case-studies/fluent/avatar-frame-119.svg"
            width={800}
            height={586}
            sizes="(max-width: 940px) calc(100vw - 40px), 900px"
            unoptimized
            alt="Additional Microsoft Fluent Avatar component exploration"
          />
          <Image
            className="case-media-image"
            src="/case-studies/fluent/avatar-frame-122.svg"
            width={800}
            height={586}
            sizes="(max-width: 940px) calc(100vw - 40px), 900px"
            unoptimized
            alt="Additional Microsoft Fluent Avatar component specification"
          />
        </section>

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
