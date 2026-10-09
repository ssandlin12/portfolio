"use client";

import Link from "next/link";
import Image from "next/image";
import { Figtree } from "next/font/google";
import { useState } from "react";
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

type TeamsCaseStudySection = {
  overline: string;
  title: string;
  body: string;
  placeholder?: string;
  imageSrc?: string;
  imageAlt?: string;
  videoSrc?: string;
  videoLabel?: string;
};

const TEAMS_CASE_STUDY: readonly TeamsCaseStudySection[] = [
  {
    overline: "Overview",
    title: "Basic Screens are foundational to Teams design work",
    body: "As one of the most highly requested resources for the Teams design systems team, Basic Screens represent an entire range of designer needs. From day-to-day design work to presentations to deliverables for marketing and conferences, they’re often urgently needed and require extreme coordination to deliver.",
    videoSrc: "/case-studies/teams/teams-overview.mp4",
    videoLabel: "Teams Basic Screens overview",
  },
  {
    overline: "Problem",
    title: "Existing Teams screens were disconnected from our design system",
    body: "As this area of work hadn’t yet been addressed since the Sketch-to-Figma transition, Basic Screens started out as a set of frames with mostly detached, local, or non-existent components and hard-coded hex values. To scale, we needed to audit the screens, componentize the contents, and connect styles and variables. However, before moving straight into that flow, we need to align with designers through some initial conversations.",
    imageSrc: "/case-studies/teams/teams-problem-screens.png",
    imageAlt: "Existing Teams Basic Screens across themes and screen types",
  },
  {
    overline: "Scope",
    title: "Documented 9 reflow breakpoints, 4 appearance themes, and core Shell components",
    body: "For this effort, the scope was in hundreds of thousands of layers. Each screen, if componentized, could easily be 50–100k Figma layers that would have to be constantly updated. Not only did we have to meet that need, the scope actually expanded as the work overlapped with the New Teams and responsive reflow efforts, resulting in us having to account for 9 breakpoints, 4 themes, and 2 platforms (Windows & Mac). For this to scale, we needed a system that could allow for effortless toggling between themes and pixel-perfect responsiveness when swapping breakpoints.",
    videoSrc: "/case-studies/teams/teams-scope.mp4",
    videoLabel: "Teams breakpoints and theme variations",
  },
  {
    overline: "Research",
    title: "Organized focus group and 1:1 research sessions with Teams designers",
    body: "For the research element of this, I wanted to really understand what a long-term Basic Screens solution needed to support. The conversations surfaced the practical constraints of building screens, evolving feature work, and keeping shared foundations relevant as product teams move quickly. With a product as dynamically evolving as Teams, whatever solution we reached had to be something that enabled teams to move faster, not block them from progress.",
    imageSrc: "/case-studies/teams/teams-research.png",
    imageAlt: "FigJam research board for Teams designer sessions",
  },
  {
    overline: "Insight",
    title: "Realized organic Basic Screen contribution requires organic Shell adoption",
    body: "Our initial conversations with Teams designers resulted in a clear insight: for the most up-to-date contribution from different feature teams, aggregating into a set of shared Basic Screens, we needed organic adoption. The entire Teams design organization would have to be all-in on this solution. Otherwise, blockers would delay screen approvals, constantly wrangling updates would exhaust our limited bandwidth, and we’d be overwhelmed during the pre-Ignite and Build rush periods.",
    imageSrc: "/case-studies/teams/teams-problem-v2.png",
    imageAlt: "Broken links to disconnected Teams screen files",
  },
  {
    overline: "Planning",
    title: "Aligned on Shell & Canvas model for clear ownership & contribution guidance",
    body: "Throughout all the focus group and 1:1 sessions, one thing became clear: delegation and contribution would be crucial to maintaining any long term solution. As the design systems team, we needed to delegate screen contribution to core experience owners while maintaining ownership of Shell components themselves in the library. That resulted in a clear solution: a model where we owned the Shell framework and feature teams owned the Canvas that sat inside it.",
    videoSrc: "/case-studies/teams/teams-process.mp4",
    videoLabel: "Teams Basic Screens process",
  },
  {
    overline: "Iteration",
    title: "Iterated on Shell v1 - v5 with lots of designer feedback",
    body: "Designer feedback drove five iterations of Shell. The biggest question was how to support teams who needed to detach and move fast without leaving the library or older work behind. We refined the Canvas and Placeholder model, component properties, versioning, and responsive behavior so the library stayed lightweight while designers could swap, resize, and contribute with less friction.",
    imageSrc: "/case-studies/teams/teams-iteration-feedback.png",
    imageAlt: "Shell iteration feedback notes",
  },
  {
    overline: "Setbacks",
    title: "Released too quickly and overwhelmed Figma's memory limits",
    body: "Despite all the iteration that resulted in a solution which finally resonated with Teams designers, one thing we didn't expect was that it would resonate too much. Designers started to use our new Shell component everywhere and that led to files breaking as they exceeded Figma's 2GB browser-based memory limits. Due to these issues, we had to rebuild our Shell from the ground up with component properties and variables, right as variables were being released at Config 2023.",
    imageSrc: "/case-studies/teams/teams-setbacks.png",
    imageAlt: "Figma browser memory limit warning",
  },
  {
    overline: "Re-release",
    title: "Relaunched with Shell & Basic Screen hype videos",
    body: "Many designers had gone back to using older Shell and Basic Screen frames, often built with groups instead of frames, detached/local components, and inconsistent spacing. We knew that we had to restore designers' trust in componentized solutions. So for adoption, we tried a new approach: releasing announcement videos to help increase visibility and hopefully, by extension, adoption.",
    videoSrc: "/case-studies/teams/teams-adoption.mp4",
    videoLabel: "Teams Basic Screens announcement",
  },
  {
    overline: "Adoption",
    title: "Launched Teams learning sessions to teach Shell & Basic Screen workflows",
    body: "Since the new Shell component, version 2.4.0, was rebuilt to include Figma variables and seamless mode swapping between both Mac/Windows platforms and light/dark modes, we decided to launch learning sessions to help upskill Teams designers with the new Figma variables. By thoroughly teaching designers about Figma variables, we were able to both showcase the value of using our Shell and prep designers for the technicalities of it.",
    videoSrc: "/case-studies/teams/teams-contribution.mp4",
    videoLabel: "Shell Figma variables learning session",
  },
  {
    overline: "Traction",
    title: "Organic Shell adoption & Basic Screen contribution increased exponentially",
    body: "Although we started the contribution efforts to the Basic Screens libraries, by announcing the Shell component, equipping designers with fluency in Figma variables, and working closely with feature teams, we were able to increase adoption to the point of the Shell component being our most used component. That resulted in several designers contributing Basic Screens organically.",
    imageSrc: "/case-studies/teams/teams-traction.png",
    imageAlt: "Shell component adoption analytics",
  },
  {
    overline: "Pre-Ignite",
    title: "Adopted as the go-to solution in preparation for Ignite keynote",
    body: "Here’s one of the many screens released as part of the initial request. As one of the newest Teams features at the time, the “Compact Chat” screen was compiled with extreme attention to detail for both craft and consistency sake, including timestamps, names and list-item matching, chat-thread consistency, Chat badge numbers, and more.",
    imageSrc: "/case-studies/teams/impact-pre-ignite.png",
    imageAlt: "Microsoft Teams chat screen",
  },
  {
    overline: "Deliverable",
    title: "Delivered a fully-componentized library of theme-swappable Basic Screens",
    body: "The result of our work culminated finally in a Basic Screens library which, by implementing component properties and variables, we were able to utilize for Ignite without worries about Figma memory issues and library breakage. Deep-diving into the capabilities of Figma had allowed us to finally have a lasting solution and by working hand-in-hand with feature teams, we had both adoption and contribution.",
    videoSrc: "/case-studies/teams/teams-deliverable.mp4",
    videoLabel: "Basic Screens deliverable",
  },
  {
    overline: "Ignite",
    title: "Showcased at Ignite conference keynote speech",
    body: "As seen in the video below, the background Teams screens are the same ones in the Basic Screens library. This pipeline and its resultant screens became the go-to for Microsoft’s two annual conferences, Build and Ignite. More importantly, it became an incredible day-to-day time-saving solution, with Shell as the most popular component and the Basic Screens library as a popular starting point for daily design work, presentations, marketing deliverables, and more.",
    videoSrc: "/case-studies/teams/teams-ignite.mp4",
    videoLabel: "Microsoft Teams at Ignite",
  },
  {
    overline: "Outcome",
    title: "A new standard for Basic Screens across Microsoft products",
    body: "The pipeline created a sustainable way to build, maintain, and evolve Teams screens, reducing repeated work and helping more teams begin from a common system. It was later used as a model for other Basic Screens libraries across Microsoft products like SharePoint, Planner, and more. The time saved through this solution also likely results in an incredible return on investment.",
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
  secondaryPreviewSrc?: string;
  secondaryPreviewWidth?: number;
  secondaryPreviewHeight?: number;
  caseType?: "full" | "micro";
  descriptors?: readonly string[];
  study?: "fluent" | "teams";
};

export default function FluentContent({
  title = "Microsoft Fluent",
  subtitle = "“How do you structure Figma components that get 1.2 million internal uses per day?”",
  linkHref = "https://www.figma.com/community/file/836828295772957889/microsoft-fluent-2-web",
  linkLabel = "Fluent 2 Web",
  videoSrc = "/fluent-hero.mp4",
  previewSrc = "/fluent-web-ui-kit.png",
  previewWidth = 2048,
  previewHeight = 1152,
  secondaryPreviewSrc,
  secondaryPreviewWidth = 2048,
  secondaryPreviewHeight = 1152,
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
      className={`${figtree.variable} case-study--${study} min-h-screen flex flex-col relative`}
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
          max-width: 800px;
          margin: clamp(56px, calc(6vh + 32px), 120px) auto 0;
        }
        .fluent-case-heading {
          margin: 0 0 48px;
          color: ${INK_DARK};
        }
        .fluent-case-title {
          margin: 0;
          font-size: 32px;
          font-weight: 300;
          line-height: 1.08;
          letter-spacing: -0.045em;
        }
        .fluent-case-subtitle {
          margin: 10px 0 0;
          color: rgba(41, 41, 41, 0.7);
          font-size: 20px;
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
          transition: opacity 180ms ease-out;
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
        .fluent-video-card.is-ready .fluent-video-skeleton {
          opacity: 0;
        }
        .fluent-preview-image {
          position: absolute;
          bottom: -36px;
          right: calc(-1 * var(--preview-overhang));
          width: clamp(140.8px, 16.8vw, 216px);
          height: auto;
          border-radius: clamp(14px, 1.5vw, 24px);
          box-shadow: 0 18px 40px rgba(28, 37, 76, 0.18);
          z-index: 4;
        }
        .fluent-preview-row {
          position: absolute;
          right: calc(-1 * var(--preview-overhang));
          bottom: -36px;
          z-index: 4;
          display: flex;
          align-items: flex-end;
          gap: clamp(14px, 1.8vw, 22px);
        }
.fluent-preview-row .fluent-preview-image {
  position: static;
  width: clamp(140.8px, 16.8vw, 216px);
  aspect-ratio: 16 / 9;
  object-fit: cover;
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
          height: 32px;
          padding: 0 16px;
          border-radius: 999px;
          font-size: 14px;
          font-weight: 400;
          line-height: 1;
          white-space: nowrap;
        }
        .case-study-pill--full { background: ${INK_DARK}; color: #fff; }
        .case-study-pill--micro { background: #f1f1f1; color: ${INK_DARK}; }
        .case-study-pill--descriptor { border: 1px solid ${INK_DARK}; background: #fff; color: ${INK_DARK}; box-sizing: border-box; }
        .case-article {
          width: 100%;
          max-width: 800px;
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
          font-size: 16px;
          line-height: 24px;
        }
        .case-feature-kicker {
          margin: 0 0 8px;
          color: rgba(41, 41, 41, 0.45);
          font-size: 12px;
          font-weight: 500;
          line-height: 18px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .case-feature-title {
          margin: 0;
          font-size: 24px;
          font-weight: 300;
          line-height: 30px;
          letter-spacing: -0.02em;
        }
        .case-feature-intro {
          max-width: none;
          margin: 12px 0 0;
          color: rgba(41, 41, 41, 0.7);
          font-size: 16px;
          line-height: 24px;
        }
        .case-role-section {
          display: grid;
          gap: 12px;
          margin: 0 0 72px;
          padding: clamp(24px, 3vw, 32px);
          border: 1px solid #e1e1e1;
          border-radius: 14px;
          box-sizing: border-box;
        }
        .case-role-section .case-feature-kicker {
          margin-bottom: 0;
        }
        .case-role-timeline {
          margin-top: 8px !important;
        }
        .case-role-body {
          margin: 0;
          color: rgba(41, 41, 41, 0.7);
          font-size: 16px;
          line-height: 24px;
        }
        .case-role-collaborators {
          display: grid;
          gap: 2px;
          margin-top: 8px;
        }
        .case-role-collaborators p {
          margin: 0;
        }
        .case-role-collaborators .case-feature-kicker {
          margin-bottom: 10px;
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
        .teams-case-media-image {
          display: block;
          width: 100%;
          aspect-ratio: 16 / 9;
          margin: 28px auto 0;
          border: 1px solid #e1e1e1;
          border-radius: 14px;
          box-sizing: border-box;
          object-fit: cover;
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
          font-size: 16px;
          line-height: 24px;
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
        .case-next--disabled {
          background: #f6f6f6;
          color: rgba(41, 41, 41, 0.42);
          cursor: not-allowed;
        }
        .case-next--disabled:hover { background: #f6f6f6; }
        .case-next--disabled .case-next-label,
        .case-next--disabled .case-next-title,
        .case-next--disabled .case-next-body { color: inherit; }
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
        .case-study--fluent .case-media-placeholder,
        .case-study--fluent .case-media-image,
        .case-study--fluent .case-problem-media,
        .case-study--fluent .process-media-image,
        .case-study--teams .case-media-placeholder,
        .case-study--teams .case-media-image,
        .case-study--teams .teams-case-media-image,
        .case-study--teams .case-problem-media,
        .case-study--teams .process-media-image {
          margin-top: 48px;
        }
        .case-study--fluent .case-problem-section,
        .case-study--fluent .case-process-summary,
        .case-study--teams .case-problem-section,
        .case-study--teams .case-process-summary {
          margin-top: 72px;
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
            width: min(38.4vw, 152px);
          }
          .fluent-preview-row {
            bottom: -24px;
            gap: 12px;
          }
          .fluent-preview-row .fluent-preview-image {
            width: min(28vw, 128px);
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
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onLoadedMetadata={() => setVideoReady(true)}
            onCanPlay={() => setVideoReady(true)}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
          {secondaryPreviewSrc ? (
            <div className="fluent-preview-row" aria-label="Case study previews">
              <Image
                className="fluent-preview-image"
                src={previewSrc}
                width={previewWidth}
                height={previewHeight}
                sizes="(max-width: 560px) 35vw, 16vw"
                alt="Teams Web and Desktop cover"
              />
              <Image
                className="fluent-preview-image"
                src={secondaryPreviewSrc}
                width={secondaryPreviewWidth}
                height={secondaryPreviewHeight}
                sizes="(max-width: 560px) 35vw, 16vw"
                alt="Teams Basic Screens cover"
              />
            </div>
          ) : (
            <Image
              className="fluent-preview-image"
              src={previewSrc}
              width={previewWidth}
              height={previewHeight}
              sizes="(max-width: 560px) 56vw, 22vw"
              alt="Web UI Kit preview"
            />
          )}
        </div>
      </section>

      <article className="case-article">
        <section className="case-role-section" aria-label="Project role">
          <p className="case-feature-kicker">Role</p>
          <p className="case-role-body">Project Owner</p>
          <p className="case-feature-kicker case-role-timeline">Timeline</p>
          <p className="case-role-body">{study === "fluent" ? "4 Weeks" : "2 Years"}</p>
          <div className="case-role-collaborators">
            <p className="case-feature-kicker">Collaborators</p>
            <p className="case-role-body">Leadership: Teams DS Design Manager</p>
            {study === "fluent" ? (
              <>
                <p className="case-role-body">Fluent Core: 3 Designers</p>
                <p className="case-role-body">Testing: 3 Designers</p>
                <p className="case-role-body">Documentation: Fluent Designer</p>
              </>
            ) : (
              <>
                <p className="case-role-body">Planning: 5 Design Managers, Teams DS Designer</p>
                <p className="case-role-body">Testing: 1 Design Manager + 10 Designers</p>
                <p className="case-role-body">Seminars: 6 Design Managers + 41 Designers</p>
                <p className="case-role-body">Library Reviewers/Approvers: 2 Managers + 8 Designers</p>
                <p className="case-role-body">Documentation: Teams DS Designer</p>
              </>
            )}
          </div>
        </section>

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
            <source src="/case-studies/fluent/avatar-context.mp4" type="video/mp4" />
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
            Examined masking, variants, and component properties
          </h2>
          <p className="case-feature-intro">
            Masking often creates issues with resizing and clipping, making it
            a less scalable solution for the organization. Variants could
            technically solve the issue, but adding all the additional variants
            would result in an unnecessarily complex and heavy component. Even
            component properties could only solve part of the issue: they could
            block layers when switched on, but with a requirement for transparent
            borders, blocking was not applicable.
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
            Experimented with isolating boolean operation layers
          </h2>
          <p className="case-feature-intro">
            Knowing that masking would produce unreliable results at scale and
            variants would be too heavy, I began some tests to isolate boolean
            operation layers and combine that with component properties within
            components. Part of the process involved feasibility but another
            part involved periods of stress testing along the way to ensure
            this method would scale.
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
            Bound Boolean subtract operations to component properties
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
            Stress-tested this solution across all sizes & variants
          </h2>
          <p className="case-feature-intro">
            Although I had individually tested the updated Avatar component
            solution across breakpoints, variants, sizes, properties, repeated
            toggles, and size changes, I set up a couple of async reviews with
            Teams designers to get their feedback before submitting it to the
            Fluent team for merging. The main feedback was a request for
            Teams-specific scenarios, so I explored how to make those work
            seamlessly as well.
          </p>
          <video
            className="process-media-image"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-label="Switching Avatar variants and properties"
          >
            <source src="/case-studies/fluent/avatar-testing-feedback.mp4" type="video/mp4" />
          </video>
        </section>

          </>
        )}

        {study === "teams" && TEAMS_CASE_STUDY.map((section, index) => {
          const id = `teams-${section.overline.toLowerCase()}-title`;
          return (
            <section
              key={section.overline}
              className={index === 0 ? "case-feature-section" : "case-process-summary"}
              aria-labelledby={id}
            >
              <p className="case-feature-kicker">{section.overline}</p>
              <h2 id={id} className="case-feature-title">{section.title}</h2>
              <p className="case-feature-intro">{section.body}</p>
              {section.videoSrc ? (
                <video
                  className="process-media-image"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  aria-label={section.videoLabel}
                >
                  <source src={section.videoSrc} type="video/mp4" />
                </video>
              ) : section.imageSrc ? (
                <Image
                  className="teams-case-media-image"
                src={section.imageSrc}
                alt={section.imageAlt ?? ""}
                width={1920}
                height={1080}
                sizes="(max-width: 940px) calc(100vw - 40px), 900px"
                quality={section.imageSrc.endsWith("/teams-context.png") ? 100 : 75}
                unoptimized={section.imageSrc.endsWith("/teams-context.png")}
              />
              ) : section.placeholder ? (
                <MediaPlaceholder label={section.placeholder} />
              ) : null}
            </section>
          );
        })}

        {study === "fluent" ? (
          <>
            <section className="case-process-summary" aria-labelledby="fluent-delivery-title">
              <p className="case-feature-kicker">Deliverable</p>
              <h2 id="fluent-delivery-title" className="case-feature-title">
                Merged the branch into Fluent 2 Web and published across the org
              </h2>
              <p className="case-feature-intro">
                After syncing with the Fluent core team multiple times throughout
                this process during their weekly sync and ensuring that this
                component was thoroughly stress-tested, I coordinated with the
                main library admin to merge the branch, deprecate the previous
                Avatar, and publish the Fluent 2 Web update.
              </p>
              <video
                className="process-media-image"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                aria-label="Fluent Avatar delivery"
              >
                <source src="/case-studies/fluent/avatar-delivery.mp4" type="video/mp4" />
              </video>
            </section>

            <section className="case-process-summary" aria-labelledby="fluent-implementation-title">
              <p className="case-feature-kicker">Implementation</p>
              <h2 id="fluent-implementation-title" className="case-feature-title">
                Migrated the new Avatar component into Teams 2 Web with custom variants
              </h2>
              <p className="case-feature-intro">
                After publishing the component from Fluent 2 Web and updating
                its documentation, the next step was bringing it into Teams 2
                Web. I styled it with Teams product-specific variables, added
                variants for Teams scenarios such as third-party apps and
                agents or bots, and updated every Teams component that used
                Avatar as a subcomponent.
              </p>
              <video
                className="process-media-image"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                aria-label="Avatar implementation in Teams 2 Web"
              >
                <source src="/case-studies/fluent/avatar-teams-implementation.mp4" type="video/mp4" />
              </video>
            </section>

            <section className="case-process-summary" aria-labelledby="fluent-documentation-title">
              <p className="case-feature-kicker">Documentation</p>
              <h2 id="fluent-documentation-title" className="case-feature-title">
                Updated Fluent documentation, metadata, and changelogs
              </h2>
              <p className="case-feature-intro">
                I updated the changelog and the design-system documentation in
                both the Fluent UI Kit and our Teams 2 Web library, then ensured
                that component links, descriptions, and variables were resolved.
                I also updated Avatar as a subcomponent throughout Fluent 2 Web
                and Teams 2 Web so the implementation and its documentation
                stayed aligned.
              </p>
              <video
                className="process-media-image"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                aria-label="Fluent documentation updates"
              >
                <source src="/case-studies/fluent/avatar-documentation-updates.mp4" type="video/mp4" />
              </video>
            </section>

            <section className="case-process-summary" aria-labelledby="fluent-outcome-title">
              <p className="case-feature-kicker">Outcome</p>
              <h2 id="fluent-outcome-title" className="case-feature-title">
                Gave time back to designers across Microsoft org
              </h2>
              <p className="case-feature-intro">
                The updated Avatar adapts to different backgrounds without
                requiring designers to manually match border colors. Published
                in Fluent 2 Web and integrated into Teams 2 Web, the solution
                preserves presence and activity indicators across sizes and
                surface treatments. Updating dependent components and
                documentation extended the improvement beyond individual Avatars
                to the shared components and templates built on them.
              </p>
            </section>
          </>
        ) : null}

        {study === "teams" ? (
          <div className="case-next case-next--disabled" aria-disabled="true">
            <p className="case-next-label">Next</p>
            <h3 className="case-next-title">Athenahealth (In progress)</h3>
            <p className="case-next-body">Continue to the Athenahealth case study</p>
          </div>
        ) : (
          <Link href="/teams" className="case-next">
            <p className="case-next-label">Next</p>
            <h3 className="case-next-title">Microsoft Teams</h3>
            <p className="case-next-body">Continue to the Microsoft Teams case study.</p>
          </Link>
        )}
      </article>
    </main>
  );
}
