"use client";

import Link from "next/link";
import Image from "next/image";
import { Figtree } from "next/font/google";
import { useEffect, useState, type CSSProperties } from "react";
import { ShimmerVideo } from "../_components/shimmer";
import { BackIcon, ExternalLinkIcon } from "../_components/fluent-icons";

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

type Section = {
  overline: string;
  title: string;
  body: string;
  videoSrc?: string;
  imageSrc?: string;
  alt?: string;
  // Tinted background under the wrap — useful when a screenshot has a
  // dark footer that should bleed into the surrounding area instead of
  // ending on a thin white strip.
  bg?: "dark";
  /** "width / height" of the video — feeds the shimmer wrap's aspect-ratio
      so the box reserves its final size before any pixels load. */
  aspectRatio?: string;
  placeholder?: string;
};

const SECTIONS: Section[] = [
  {
    overline: "Problem",
    title: "A massive film library hidden within blog-style navigation",
    body:
      "Despite having a rich library of short and feature films made by women filmmakers, the entry point to the film library was buried under “What We Do” in the blog’s navigation menu.",
    videoSrc: "/case-studies/wvn/01.mp4",
    imageSrc: "/case-studies/wvn/01.png",
    alt: "Women's Voices Now — before",
    bg: "dark",
    aspectRatio: "1920 / 998",
  },
  {
    overline: "Solution",
    title: "A streaming experience built for discovery",
    body:
      "I delivered a redesigned homepage that positioned WVN as a modern streaming platform with multiple “Watch Now” entry points and with the film stills and covers as the focus. Additionally, the logo redesign that I delivered has now become an iconic part of the WVN brand.",
    videoSrc: "/case-studies/wvn/02.mp4",
    imageSrc: "/case-studies/wvn/02.png",
    alt: "Women's Voices Now — after",
    aspectRatio: "1920 / 1332",
  },
  {
    overline: "Outcome",
    title: "50 million viewers, 3 Emmy nominations, and 1 Emmy win.",
    body:
      "Women’s Voices Now has reached more than 50 million viewers across its film library, including 14 million viewers in 2025 alone, with three Emmy nominations and one Emmy win. They continue to grow in viewership and films submitted through their yearly Women’s Voices Now Film Festival.",
    videoSrc: "/case-studies/wvn/wvn-outcome.mp4",
    alt: "Women’s Voices Now audience outcome",
  },
];

function FallbackVideo({
  videoSrc,
  imageSrc,
  alt,
}: {
  videoSrc: string;
  imageSrc: string;
  alt: string;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) return <img className="case-media" src={imageSrc} alt={alt} />;
  return (
    <video
      className="case-media"
      src={videoSrc}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      controls={false}
      onError={() => setFailed(true)}
    />
  );
}

export default function WvnCaseStudy() {
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    if (expanded === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpanded(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [expanded]);

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
        .case-title-row .case-link-pill { display: none; }

        .back-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #f1f1f1;
          border-radius: 999px;
          height: 36px;
          padding: 0 22px 0 16px;
          font-size: 15px;
          font-weight: 400;
          color: ${INK_DARK};
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: background-color 160ms ease-out;
        }
        .back-pill:hover {
          background: #e8e8e8;
        }
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
        .case-study-pill--micro { background: #f1f1f1; color: ${INK_DARK}; }
        .case-study-pill--descriptor { border: 1px solid ${INK_DARK}; background: #fff; color: ${INK_DARK}; box-sizing: border-box; }

        .case-article {
          width: 100%;
          max-width: 900px;
          margin: clamp(88px, calc(7vh + 48px), 150px) auto 100px;
        }
        .case-hero {
          --preview-overhang: 56px;
          width: 100%;
          max-width: 900px;
          margin: clamp(56px, calc(6vh + 32px), 120px) auto 0;
        }
        .case-hero-heading { margin-bottom: 48px; }
        .case-hero-title {
          font-size: 34px;
          line-height: 1.2;
          letter-spacing: -0.02em;
          font-weight: 300;
          color: ${INK_DARK};
          margin: 0;
        }
        .case-title-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 16px;
        }
        .case-title {
          font-size: 34px;
          line-height: 1.2;
          letter-spacing: -0.02em;
          font-weight: 300;
          color: ${INK_DARK};
          text-align: left;
          margin: 0;
        }
        .case-link-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #f1f1f1;
          border-radius: 999px;
          padding: 8px 16px;
          font-size: 15px;
          font-weight: 400;
          color: ${INK_DARK};
          text-decoration: none;
          white-space: nowrap;
          transition: background-color 160ms ease-out;
        }
        .case-link-pill:hover {
          background: #e8e8e8;
        }
        .case-intro {
          font-size: clamp(19px, 1.5vw, 27px);
          font-weight: 300;
          line-height: 1.15;
          letter-spacing: -0.035em;
          color: rgba(41, 41, 41, 0.7);
          text-align: left;
          margin: 10px 0 0;
        }
        .wvn-hero-media {
          position: relative;
          width: calc(100% - var(--preview-overhang));
          aspect-ratio: 16 / 9;
          margin-top: 48px;
          line-height: 0;
          overflow: visible;
          background:
            radial-gradient(circle at 25% 20%, rgba(98, 100, 167, 0.13), transparent 40%),
            linear-gradient(145deg, #fafafa, #f1f1f1);
        }
        .wvn-hero-media video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          border: 1px solid rgba(41, 41, 41, 0.14);
          border-radius: clamp(18px, 2vw, 34px);
          box-sizing: border-box;
        }
        .wvn-hero-preview {
          position: absolute;
          right: calc(-1 * var(--preview-overhang));
          bottom: -36px;
          width: clamp(176px, 21vw, 270px);
          aspect-ratio: 16 / 9;
          border-radius: clamp(14px, 1.5vw, 24px);
          border: 1px solid #e1e1e1;
          box-sizing: border-box;
          box-shadow: 0 18px 40px rgba(28, 37, 76, 0.18);
          object-fit: cover;
        }
        .case-feature-section { margin-top: 0; }
        .case-process-summary { margin-top: 96px; }
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
          margin: 12px 0 0;
          color: rgba(41, 41, 41, 0.7);
          font-size: 17px;
          line-height: 1.55;
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
          font-size: 17px;
          line-height: 1.55;
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
        .case-media-wrap {
          width: 100%;
          position: relative;
          overflow: hidden;
          border-radius: 14px;
          border: 1px solid #e1e1e1;
          box-sizing: border-box;
          margin-top: 48px;
        }
        .case-media-wrap[data-bg="dark"] {
          background-color: #2A2B30;
        }
        .case-media {
          display: block;
          width: 100%;
          height: auto;
        }
        .wvn-media-placeholder {
          display: flex;
          width: 100%;
          aspect-ratio: 16 / 9;
          margin-top: 48px;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 6px;
          box-sizing: border-box;
          border: 1px solid #e1e1e1;
          border-radius: 14px;
          background:
            radial-gradient(circle at 25% 20%, rgba(98, 100, 167, 0.13), transparent 40%),
            linear-gradient(145deg, #fafafa, #f1f1f1);
          color: rgba(41, 41, 41, 0.58);
        }
        .wvn-media-placeholder span { font-size: 20px; }
        .wvn-media-placeholder small {
          font-size: 13px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          opacity: 0.58;
        }
        .wvn-outcome-video {
          display: block;
          width: 100%;
          height: auto;
          margin-top: 48px;
          border: 1px solid #e1e1e1;
          border-radius: 14px;
          box-sizing: border-box;
        }
        .process {
          margin-top: 72px;
          padding-top: 28px;
          border-top: 1px solid #e1e1e1;
        }
        .process-kicker {
          font-size: 14px;
          line-height: 1.4;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(41, 41, 41, 0.45);
          margin: 0 0 8px;
        }
        .process-title {
          font-size: 28px;
          line-height: 1.25;
          letter-spacing: -0.02em;
          font-weight: 300;
          margin: 0;
        }
        .process-intro {
          font-size: 17px;
          line-height: 1.55;
          color: rgba(41, 41, 41, 0.7);
          margin: 12px 0 0;
          max-width: 680px;
        }
        .process-list {
          margin: 72px 0;
          display: grid;
          gap: 72px;
        }
        .process-step {
          display: grid;
          grid-template-columns: 68px minmax(0, 1fr);
          gap: 24px;
          padding: 0;
        }
        .process-number {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 68px;
          height: 68px;
          box-sizing: border-box;
          border: 1px solid #d7d7d7;
          border-radius: 50%;
          background: #ffffff;
          font-size: 16px;
          line-height: 1;
          font-weight: 500;
          color: rgba(41, 41, 41, 0.5);
        }
        .process-eyebrow {
          font-size: 13px;
          line-height: 1.4;
          font-weight: 500;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          color: rgba(41, 41, 41, 0.46);
          margin: 0 0 5px;
        }
        .process-heading {
          font-size: 21px;
          line-height: 1.3;
          letter-spacing: -0.01em;
          font-weight: 400;
          margin: 0;
        }
        .process-body {
          font-size: 16px;
          line-height: 1.58;
          color: rgba(41, 41, 41, 0.7);
          margin: 12px 0 0;
        }
        .process-methods {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 18px;
        }
        .process-method {
          display: inline-flex;
          align-items: center;
          min-height: 28px;
          padding: 3px 10px;
          border: 1px solid rgba(41, 41, 41, 0.12);
          border-radius: 999px;
          font-size: 13px;
          color: rgba(41, 41, 41, 0.62);
          background: rgba(255, 255, 255, 0.55);
        }
        .process-takeaway {
          font-size: 15px;
          line-height: 1.5;
          font-weight: 500;
          color: rgba(41, 41, 41, 0.76);
          margin: 20px 0 0;
          padding-top: 18px;
          border-top: 1px solid rgba(41, 41, 41, 0.1);
        }
        @media (max-width: 560px) {
          .case-title-row {
            align-items: flex-start;
            flex-direction: column;
          }
          .process-step {
            grid-template-columns: 1fr;
            gap: 18px;
          }
          .case-hero { --preview-overhang: 28px; }
          .wvn-hero-preview {
            bottom: -24px;
            width: min(48vw, 190px);
          }
        }

        /* "Next" card at the end of the case study — links to the next
           case study in sequence. Matches article width, sits well below
           the last section. */
        .case-next {
          display: block;
          margin-top: 64px;
          background: #f1f1f1;
          border-radius: 16px;
          padding: 28px 32px;
          color: ${INK_DARK};
          text-decoration: none;
          transition: background-color 160ms ease-out;
        }
        .case-next:hover {
          background: #e8e8e8;
        }
        .case-next-label {
          font-size: 15px;
          font-weight: 500;
          color: rgba(41, 41, 41, 0.5);
          margin: 0;
        }
        .case-next-title {
          font-size: 20px;
          font-weight: 400;
          letter-spacing: -0.01em;
          color: ${INK_DARK};
          margin: 2px 0 4px;
        }
        .case-next-body {
          font-size: 16px;
          line-height: 1.5;
          color: rgba(41, 41, 41, 0.7);
          margin: 0;
        }

        /* Hover-only expand affordance in the top-right corner of each
           media. Stays hidden until the user hovers the media (or
           focuses the button via keyboard). */
        .case-expand-btn {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(0, 0, 0, 0.55);
          color: rgba(255, 255, 255, 0.95);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: none;
          cursor: pointer;
          opacity: 0;
          transition: opacity 160ms ease-out, background-color 160ms ease-out;
        }
        .case-media-wrap:hover .case-expand-btn,
        .case-expand-btn:focus-visible {
          opacity: 1;
        }
        .case-expand-btn:hover {
          background: rgba(0, 0, 0, 0.75);
        }

        /* Expanded modal — full-viewport scrim with the media floated in
           the middle. Click anywhere outside the media (or the close btn)
           to dismiss. */
        .case-modal {
          position: fixed;
          inset: 0;
          z-index: 100;
          background: rgba(0, 0, 0, 0.65);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10vh 10vw;
          cursor: zoom-out;
        }
        .case-modal-content {
          position: relative;
          cursor: default;
          display: flex;
          border-radius: 14px;
          overflow: hidden;
          max-width: 80vw;
          max-height: 80vh;
        }
        .case-modal .case-media {
          max-width: 80vw;
          max-height: 80vh;
          width: auto;
          height: auto;
        }
        .case-modal-close {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(0, 0, 0, 0.55);
          color: rgba(255, 255, 255, 0.95);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: none;
          cursor: pointer;
          opacity: 0;
          transition: opacity 160ms ease-out, background-color 160ms ease-out;
        }
        .case-modal-content:hover .case-modal-close,
        .case-modal-close:focus-visible {
          opacity: 1;
        }
        .case-modal-close:hover {
          background: rgba(0, 0, 0, 0.75);
        }
      `}</style>

      {/* Top header — Back pill (left), nav links (right). */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          alignItems: "center",
          columnGap: "clamp(20px, 4vw, 48px)",
        }}
      >
        <Link href="/" className="back-pill" aria-label="Back to home" style={{ justifySelf: "start" }}>
          <BackIcon />
          Back
        </Link>
        <a href="https://womensvoicesnow.org" target="_blank" rel="noopener noreferrer" className="back-pill" style={{ justifySelf: "end" }} aria-label="Visit womensvoicesnow.org">
          womensvoicesnow.org
          <ExternalLinkIcon />
        </a>
      </div>

      <section className="case-hero" aria-labelledby="wvn-case-title">
        <div className="case-title-row">
          <h1 id="wvn-case-title" className="case-hero-title">Women&rsquo;s Voices Now</h1>
          <a
            className="case-link-pill"
            href="https://womensvoicesnow.org"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit womensvoicesnow.org"
          >
            womensvoicesnow.org
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
        <p className="case-intro">
          Women&rsquo;s Voices Now, a 501(c) non-profit aimed at showcasing
          global, women and women&rsquo;s rights-centered films, hired me
          to fully redesign their site. I returned with a fresh take that
          helped shift them from a non-profit blog to a modern streaming
          platform.
        </p>
        <div className="case-study-pills" aria-label="Case study topics">
          <span className="case-study-pill case-study-pill--micro">Micro case study</span>
          <span className="case-study-pill case-study-pill--descriptor">Content strategy</span>
          <span className="case-study-pill case-study-pill--descriptor">Film discovery</span>
          <span className="case-study-pill case-study-pill--descriptor">Visual identity</span>
        </div>
        <div className="wvn-hero-media" aria-label="Women’s Voices Now case study video">
          <video autoPlay loop muted playsInline preload="metadata">
            <source src="/case-studies/wvn/wvn-hero.mp4" type="video/mp4" />
          </video>
          <Image
            className="wvn-hero-preview"
            src="/case-studies/wvn/wvn-design-toolkit-preview.png"
            width={3840}
            height={2160}
            sizes="(max-width: 560px) 48vw, 22vw"
            alt="Women’s Voices Now design toolkit preview"
          />
        </div>
      </section>

      <article className="case-article">
        <section className="case-role-section" aria-label="Project role">
          <p className="case-feature-kicker">Role</p>
          <p className="case-role-body">Design Owner</p>
          <p className="case-feature-kicker case-role-timeline">Timeline</p>
          <p className="case-role-body">8 Months</p>
          <div className="case-role-collaborators">
            <p className="case-feature-kicker">Collaborators</p>
            <p className="case-role-body">Leadership: Director</p>
            <p className="case-role-body">Collaborators: Head of Marketing, Marketing Assistant</p>
            <p className="case-role-body">Testing: 4 Current Users + 7 Random Testers</p>
            <p className="case-role-body">Engineering: 2 Engineers</p>
          </div>
        </section>

        {SECTIONS.map((section, index) => (
          <section
            key={section.overline}
            className={index === 0 ? "case-feature-section" : "case-process-summary"}
          >
            <p className="case-feature-kicker">{section.overline}</p>
            <h2 className="case-feature-title">{section.title}</h2>
            <p className="case-feature-intro">{section.body}</p>
            {section.videoSrc && section.imageSrc && section.alt && section.aspectRatio ? (
              <ShimmerVideo
                videoSrc={section.videoSrc}
                imageSrc={section.imageSrc}
                alt={section.alt}
                aspectRatio={section.aspectRatio}
                bgVariant={section.bg}
              >
                <button
                  type="button"
                  className="case-expand-btn"
                  aria-label={`Expand ${section.overline}`}
                  onClick={() => setExpanded(index)}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 3 21 3 21 9" />
                    <polyline points="9 21 3 21 3 15" />
                    <line x1="21" y1="3" x2="14" y2="10" />
                    <line x1="3" y1="21" x2="10" y2="14" />
                  </svg>
                </button>
              </ShimmerVideo>
            ) : section.videoSrc ? (
              <video
                className="wvn-outcome-video"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                aria-label={section.alt}
              >
                <source src={section.videoSrc} type="video/mp4" />
              </video>
            ) : section.placeholder ? (
              <div className="wvn-media-placeholder" role="img" aria-label={`${section.placeholder} media placeholder`}>
                <span>{section.placeholder}</span>
                <small>Project media</small>
              </div>
            ) : null}
          </section>
        ))}

      </article>

      {expanded !== null && (
        <div
          className="case-modal"
          role="dialog"
          aria-modal="true"
          onClick={() => setExpanded(null)}
        >
          <div
            className="case-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <FallbackVideo
              videoSrc={SECTIONS[expanded].videoSrc!}
              imageSrc={SECTIONS[expanded].imageSrc!}
              alt={SECTIONS[expanded].alt!}
            />
            <button
              type="button"
              className="case-modal-close"
              aria-label="Close"
              onClick={() => setExpanded(null)}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
