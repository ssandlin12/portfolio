"use client";

import Link from "next/link";
import Image from "next/image";
import { Figtree } from "next/font/google";
import { useState } from "react";
import { PlainCaseStudy, type PlainCaseStudySection } from "../_components/plain-case-study";
import { BackIcon, ExternalLinkIcon } from "../_components/fluent-icons";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-figtree",
  display: "swap",
});

const INK_DARK = "#292929";

function MediaPlaceholder({ label }: { label: string }) {
  return (
    <div className="case-media-placeholder" role="img" aria-label={`${label} media placeholder`}>
      <span>{label}</span>
      <small>Project media</small>
    </div>
  );
}

const FLUENT_STUDY: readonly PlainCaseStudySection[] = [
];

const TEAMS_STUDY: readonly PlainCaseStudySection[] = [
  {
    title: "Overview",
    paragraphs: [
      "How do you build an easy-to-update atom-to-template pipeline for Teams screens?",
      "The Basic Screens pipeline connects Teams 2 Web with a Basic Screens file.",
    ],
    placeholders: [{ label: "Placeholder video: Teams Basic Screens pipeline" }, { label: "Placeholder image: Teams 2 Web preview" }],
  },
  {
    title: "Context",
    paragraphs: [
      "The Basic Screens file was a collection of frames and screenshots that needed to be recreated as a maintainable system.",
    ],
    placeholders: [{ label: "Placeholder image: original Basic Screens file" }],
  },
  {
    title: "Problem",
    paragraphs: [
      "The screens were difficult to scale and keep current while relying on non-components. The work was described as building a Godzilla component.",
    ],
  },
  {
    title: "Scope",
    paragraphs: [
      "The initial system covered light, dark, and high-contrast modes across four breakpoints, with reflow work planned to scale to nine. Multiple screens required confirmation and approval while allowing as much organic contribution as possible.",
    ],
    placeholders: [{ label: "Placeholder image: responsive screen and breakpoint scope" }],
  },
  {
    title: "Process",
    paragraphs: [
      "I conducted focus groups and one-to-one research sessions with designers, created a first solution, and tested it with one feature team. The shell lived in Teams 2 Web while the canvas lived in each designer's file.",
      "After several iterations, the team reached designer and product alignment at version five. The solution was moved into the main file, then introduced through an announcement video and team-by-team seminars on Figma variables.",
      "The rollout also promoted the new Shell 2.0.0 component and light-to-dark mode toggling.",
    ],
    placeholders: [{ label: "Placeholder image: solution iterations and designer feedback" }, { label: "Placeholder video: announcement and training" }],
  },
  {
    title: "Deliverable",
    paragraphs: [
      "The delivered pipeline supported reusable screens and organic contribution from product teams.",
    ],
    placeholders: [{ label: "Placeholder image: Basic Screens deliverable" }],
  },
  {
    title: "Result",
    paragraphs: [
      "The solution was adopted by other product teams and became one of the most popular shell patterns.",
    ],
    placeholders: [{ label: "Placeholder image: adoption result" }],
  },
  {
    title: "Final thoughts",
    paragraphs: [
      "The process evolved through testing and iteration. Adoption improved when the implementation was paired with clear communication, practical training, and a path for teams to contribute.",
    ],
  },
];

type CaseStudyProps = {
  title?: string;
  subtitle?: string;
  linkHref?: string;
  linkLabel?: string;
  videoSrc?: string;
  previewSrc?: string;
  previewWidth?: number;
  previewHeight?: number;
  caseType?: "full" | "micro";
  descriptors?: readonly string[];
  study?: "fluent" | "teams";
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
  caseType = "full",
  descriptors = ["Component architecture", "Documentation", "System design"],
  study = "fluent",
}: CaseStudyProps) {
  const [videoReady, setVideoReady] = useState(false);
  const featureCopy = study === "fluent"
    ? {
        overview: {
          heading: "Avatar is one of Microsoft’s most widely used Fluent components.",
          body: "Avatar represents people and groups through images, initials, or icons. Presence badges and activity indicators add status at a glance, while neutral, brand, and shared-color treatments let it work across Microsoft products and surfaces. The component scales across sizes and supports Avatar Groups for multi-person experiences.",
        },
        context: {
          heading: "The default white stroke did not adapt to every background surface.",
          body: "The Avatar image and Presence Badge each used a fixed white stroke. It blended into white backgrounds but remained visible on color, tint, and image surfaces, creating inconsistent edges.",
        },
        problem: {
          heading: "Manual stroke & background matching was wasting designers’ time.",
          intro: "I met with the core Fluent team to discuss this issue after several Teams designers surfaced the concern. The team had heard similar feedback but as this was especially relevant to Teams design work with the Avatar being heavily used in core Teams experiences, I had an added sense of urgency to make this update.",
          detail: null,
        },
        scope: {
          overline: "Preparation",
          heading: "Conducted a full audit of the Avatar's 91 variants",
          body: "The component combined 13 sizes, three layouts, three color treatments, and two properties. I audited each variation and reviewed its activity-ring and presence-badge specifications, including sizing and stroke widths.",
        },
      }
    : {
        overview: {
          heading: "The Fluent Avatar component is one of the most highly used components across Microsoft.",
          body: "Avatar represents a person or group with an image, initials, or an icon. Presence badges and activity indicators add context at a glance, while neutral, brand, and shared-color treatments let the component work across product surfaces. It scales through a wide range of sizes and can be combined into Avatar Groups when a conversation or collaboration space needs to represent many people.",
        },
        context: {
          heading: "The Fluent Avatar component had a fixed white stroke in two areas that was visible on a wide range of background surfaces.",
          body: "The stroke appeared around the Avatar image and the Presence Badge. It disappeared into white surfaces, but remained visible on colored, tinted, and image-based backgrounds, creating an inconsistent edge treatment across the component.",
        },
        problem: {
          heading: "Too much designers’ time was being wasted on matching the Avatar stroke to the background surface.",
          intro: "The Fluent team reached out to me as one of the contributors to the main Fluent library in order to help solve an issue with the Avatar component, which was getting consistent feedback that it needed a presence badge border solution. It had been built with the stroke visible around the Avatar image and Presence Badge.",
          detail: "This was fine on white backgrounds, but for any non-white backgrounds, designers had to constantly change all of those stroke variables to match the background color. As a component that consistently got 1.2+ million uses a day, this would equate to saving lots of designers’ time across the Microsoft work.",
        },
        scope: {
          overline: "The scope",
          heading: "Auditing 91 variants for the existing component",
          body: "With thirteen sizes, three layouts, and three colors, as well as two properties, this required reviewing multiple variant-specific distinctions. I had to go into the spec documentation to review activity ring stroke width, presence badge size, and presence badge stroke width.",
        },
      };

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
        .case-study-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 20px;
        }
        .case-study-pill {
          display: inline-flex;
          align-items: center;
          height: 36px;
          padding: 0 16px;
          border-radius: 999px;
          font-size: 15px;
          font-weight: 400;
          line-height: 1;
          white-space: nowrap;
        }
        .case-study-pill--full { background: ${INK_DARK}; color: #fff; }
        .case-study-pill--micro { background: #f1f1f1; color: ${INK_DARK}; }
        .case-study-pill--descriptor { border: 1px solid ${INK_DARK}; background: #fff; color: ${INK_DARK}; box-sizing: border-box; }
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
          max-width: none;
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
        .case-problem-media {
          aspect-ratio: 16 / 9;
          margin-top: 28px;
          overflow: hidden;
          border: 1px solid #e1e1e1;
          border-radius: 14px;
          box-sizing: border-box;
        }
        .case-problem-media-image {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.045);
        }
        .case-post-media-copy {
          margin: 28px 0 0;
          color: rgba(41, 41, 41, 0.7);
          font-size: 17px;
          line-height: 1.55;
        }
        .case-problem-section { margin-top: 56px; }
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
        .case-process-summary { margin-top: 72px; }
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
          <div className="case-study-pills" aria-label="Case study topics">
            <span className={`case-study-pill case-study-pill--${caseType}`}>{caseType === "full" ? "Full case study" : "Micro case study"}</span>
            {descriptors.map((descriptor) => <span className="case-study-pill case-study-pill--descriptor" key={descriptor}>{descriptor}</span>)}
          </div>
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
        {study === "fluent" && (
          <>
            <section>
          <p className="case-feature-kicker">Overview</p>
          <h2 className="case-feature-title">{featureCopy.overview.heading}</h2>
          <p className="case-feature-intro">{featureCopy.overview.body}</p>
        </section>

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

        <section className="case-problem-section">
          <p className="case-feature-kicker">Context</p>
          <h2 className="case-feature-title">{featureCopy.context.heading}</h2>
          <p className="case-feature-intro">{featureCopy.context.body}</p>
          <video
            className="case-media-image"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-label="Microsoft Fluent Avatar presence badge border demonstration"
          >
            <source src="/case-studies/fluent/avatar-presence-comparison.mp4" type="video/mp4" />
          </video>
        </section>

        <section className="case-problem-section">
          <p className="case-feature-kicker">Problem</p>
          <h2 className="case-feature-title">{featureCopy.problem.heading}</h2>
          <p className="case-feature-intro">{featureCopy.problem.intro}</p>
          {featureCopy.problem.detail && (
            <p className="case-post-media-copy">{featureCopy.problem.detail}</p>
          )}
          <div className="case-problem-media">
            <Image
              className="case-problem-media-image"
              src="/case-studies/fluent/avatar-problem-meeting-v2.png"
              width={1800}
              height={1028}
              sizes="(max-width: 940px) calc(100vw - 40px), 900px"
              alt="Microsoft Teams meeting showing Avatar presence states"
            />
          </div>
        </section>

        <section className="case-process-summary" aria-labelledby="fluent-process-title">
          <p className="case-feature-kicker">{featureCopy.scope.overline}</p>
          <h2 id="fluent-process-title" className="case-feature-title">
            {featureCopy.scope.heading}
          </h2>
          <p className="case-feature-intro">{featureCopy.scope.body}</p>
          <video
            className="process-media-image"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-label="Microsoft Fluent Avatar component variants"
          >
            <source src="/case-studies/fluent/avatar-scope-variants.mp4" type="video/mp4" />
          </video>
        </section>

        <section className="case-process-summary" aria-labelledby="fluent-exploration-title">
          <p className="case-feature-kicker">Exploration</p>
          <h2 id="fluent-exploration-title" className="case-feature-title">
            Finding a scalable border approach
          </h2>
          <p className="case-feature-intro">
            Masking did not resize reliably, and a variant-heavy solution would
            have made the component unnecessarily complex. I explored precise
            shapes, Boolean properties, and component-bound properties instead
            of adding hidden layers.
          </p>
          <video
            className="process-media-image"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-label="Fluent Avatar border exploration"
          >
            <source src="/case-studies/fluent/avatar-exploration.mp4" type="video/mp4" />
          </video>
        </section>

        <section className="case-process-summary" aria-labelledby="fluent-implementation-title">
          <p className="case-feature-kicker">Process</p>
          <h2 id="fluent-implementation-title" className="case-feature-title">
            Building border treatments into component properties
          </h2>
          <p className="case-feature-intro">
            Based on the audit, I created a Presence Badge stroke shape and
            applied the same treatment to the main Avatar and activity ring.
            Each shape was bound to its relevant component property; the
            activity-ring treatment also included a Presence Badge cutout.
          </p>
          <video
            className="process-media-image"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-label="Boolean subtract operations bound to Fluent Avatar component properties"
          >
            <source src="/case-studies/fluent/avatar-boolean-properties.mp4" type="video/mp4" />
          </video>
        </section>

        <section className="case-process-summary" aria-labelledby="fluent-solution-title">
          <p className="case-feature-kicker">Solution</p>
          <h2 id="fluent-solution-title" className="case-feature-title">
            Binding Boolean subtract operations to component properties
          </h2>
          <p className="case-feature-intro">
            Rather than relying on a fixed white stroke, I created two Boolean
            component properties that subtract border shapes from the Avatar
            layers. Binding those operations to the relevant properties
            preserved Avatar border effects across backgrounds without asking
            designers to match a stroke to the surface.
          </p>
          <video
            className="process-media-image"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-label="Testing Fluent Avatar variants and properties"
          >
            <source src="/case-studies/fluent/avatar-testing.mp4" type="video/mp4" />
          </video>
        </section>

        <section className="case-process-summary" aria-labelledby="fluent-testing-title">
          <p className="case-feature-kicker">Testing</p>
          <h2 id="fluent-testing-title" className="case-feature-title">
            Stress-testing every Avatar configuration
          </h2>
          <p className="case-feature-intro">
            I tested the component across breakpoints, variants, sizes,
            properties, repeated toggles, and size changes to confirm the new
            behavior remained stable in every configuration.
          </p>
          <MediaPlaceholder label="Switching Avatar variants and properties" />
        </section>

          </>
        )}

        <PlainCaseStudy sections={study === "teams" ? TEAMS_STUDY : FLUENT_STUDY} />

        {study === "fluent" ? (
          <>
            <section className="case-process-summary" aria-labelledby="fluent-delivery-title">
              <p className="case-feature-kicker">Delivery</p>
              <h2 id="fluent-delivery-title" className="case-feature-title">
                Shipping the adaptive Avatar treatment
              </h2>
              <p className="case-feature-intro">
                The work was developed in a Fluent 2 Web branch, shared with
                the core Fluent team, merged into the main library, and copied
                into Teams 2 Web for Teams-specific styling.
              </p>
              <MediaPlaceholder label="Fluent and Teams delivery" />
            </section>

            <section className="case-process-summary" aria-labelledby="fluent-outcome-title">
              <p className="case-feature-kicker">Outcome</p>
              <h2 id="fluent-outcome-title" className="case-feature-title">
                Estimated $53 million saved across the organization
              </h2>
              <p className="case-feature-intro">
                We know that this component gets 1.2 million uses per day.
                Let&apos;s assume that with component and template duplicates only
                1/10 of those cases required a stroke-to-background match.
                Let&apos;s also estimate that this matching might take a designer
                about 30 seconds each. Considering that the average designer
                salary at Microsoft is $227,843, this single update potentially
                saved Microsoft $53 million per year.
              </p>
            </section>
          </>
        ) : (
          <>
            <section className="case-section">
              <h2 className="case-section-heading">After</h2>
              <p className="case-section-body">
                Describe the evolved library, the experience it enabled, and what changed for product teams.
              </p>
              <video
                className="case-media-image"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                aria-label="Microsoft Teams at Build"
              >
                <source src="/case-studies/teams/teams-at-build.mp4" type="video/mp4" />
              </video>
            </section>

            <section className="case-section">
              <h2 className="case-section-heading">Outcome</h2>
              <p className="case-section-body">
                Add measurable outcomes, adoption signals, organizational impact, and the next direction for the library.
              </p>
            </section>
          </>
        )}

        <Link href="/teams" className="case-next">
          <p className="case-next-label">Next</p>
          <h3 className="case-next-title">Microsoft Teams</h3>
          <p className="case-next-body">Continue to the Microsoft Teams case study.</p>
        </Link>
      </article>
    </main>
  );
}
