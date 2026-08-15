"use client";

import Link from "next/link";
import { Figtree } from "next/font/google";
import { useEffect, useState, type CSSProperties } from "react";
import { ShimmerVideo } from "../_components/shimmer";

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
  heading: string;
  body: string;
  videoSrc: string;
  imageSrc: string;
  alt: string;
  // Tinted background under the wrap — useful when a screenshot has a
  // dark footer that should bleed into the surrounding area instead of
  // ending on a thin white strip.
  bg?: "dark";
  /** "width / height" of the video — feeds the shimmer wrap's aspect-ratio
      so the box reserves its final size before any pixels load. */
  aspectRatio: string;
};

const SECTIONS: Section[] = [
  {
    heading: "Before",
    body:
      "Despite having a rich library of short and feature films made by women filmmakers, the entry point to the film library was buried under “What We Do” in the blog’s navigation menu.",
    videoSrc: "/case-studies/wvn/01.mp4",
    imageSrc: "/case-studies/wvn/01.png",
    alt: "Women's Voices Now — before",
    bg: "dark",
    aspectRatio: "1920 / 998",
  },
  {
    heading: "After",
    body:
      "I delivered a redesigned homepage that positioned WVN as a modern streaming platform with multiple “Watch Now” entry points and with the film stills and covers as the focus. Additionally, the logo redesign that I delivered has now become an iconic part of the WVN brand.",
    videoSrc: "/case-studies/wvn/02.mp4",
    imageSrc: "/case-studies/wvn/02.png",
    alt: "Women's Voices Now — after",
    aspectRatio: "1920 / 1332",
  },
];

const PROCESS = [
  {
    number: "01",
    eyebrow: "Discover",
    heading: "Reframing the problem",
    body:
      "I began by auditing the site as both an editorial archive and a first-time visitor experience. Impression testing with people unfamiliar with WVN exposed the central disconnect: they understood the mission, but did not immediately realize there were films to watch. Conversations and usability sessions with current users confirmed that even motivated viewers had trouble finding the library.",
    methods: ["Content audit", "Impression testing", "User interviews"],
    takeaway:
      "The opportunity was bigger than refreshing a nonprofit website. WVN needed to behave like a destination for watching films.",
  },
  {
    number: "02",
    eyebrow: "Define",
    heading: "Understanding why people came",
    body:
      "I synthesized the research into lightweight personas, jobs to be done, and journey maps. The work separated three overlapping needs: viewers looking for a film, supporters learning about the mission, and filmmakers looking for a platform. Mapping their paths made it clear that the existing blog-first structure treated every audience the same and asked people to understand the organization before they could engage with its work.",
    methods: ["Personas", "JTBD", "Journey mapping"],
    takeaway:
      "The primary job became: help me quickly discover a film that feels relevant, understand why it matters, and start watching.",
  },
  {
    number: "03",
    eyebrow: "Structure",
    heading: "Making the film library the product",
    body:
      "I rebuilt the sitemap around discovery instead of organizational language. Films moved out from under “What We Do” and into a top-level viewing experience, while programs, impact, and ways to support WVN remained available without competing with the main task. I then translated that structure into task flows and low-fidelity wireframes for browsing, evaluating, and starting a film.",
    methods: ["Sitemapping", "Task flows", "Wireframing"],
    takeaway:
      "Every route needed to create another useful way into the collection—not another dead end in the organization’s story.",
  },
  {
    number: "04",
    eyebrow: "Iterate",
    heading: "Testing the shift to streaming",
    body:
      "Across multiple rounds, I tested navigation language, content hierarchy, film-card density, and the prominence of “Watch Now.” Early concepts still read like a redesigned publication, so I pushed the imagery forward, reduced explanatory copy, and introduced familiar streaming patterns. Follow-up usability testing with current users helped refine browsing cues and confirm that the library was now visible from the first screen.",
    methods: ["Prototype testing", "Usability testing", "Visual iteration"],
    takeaway:
      "The strongest direction let the films explain the value of WVN before the interface explained the organization.",
  },
  {
    number: "05",
    eyebrow: "Unify",
    heading: "Turning the direction into a system",
    body:
      "The final layer brought the experience and brand together. I developed a flexible visual system for film stills, covers, metadata, calls to action, and editorial content, then carried it across responsive page templates. The redesigned logo gave WVN a recognizable mark that could live equally well on the platform, campaign materials, and film programming.",
    methods: ["UI system", "Responsive design", "Brand identity"],
    takeaway:
      "The result was not a streaming-style homepage applied to a blog, but a coherent platform designed around the collection.",
  },
] as const;

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

        .case-article {
          width: 100%;
          max-width: 768px;
          margin-inline: auto;
          margin-top: clamp(56px, calc(6vh + 32px), 120px);
          margin-bottom: 100px;
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
          font-size: 18px;
          line-height: 1.5;
          color: rgba(41, 41, 41, 0.7);
          text-align: left;
          margin: 20px 0 0;
        }
        .case-section {
          margin-top: 48px;
        }
        .case-media-wrap {
          width: 100%;
          position: relative;
          overflow: hidden;
          border-radius: 14px;
          border: 1px solid #e1e1e1;
          box-sizing: border-box;
          margin-top: 28px;
        }
        .case-media-wrap[data-bg="dark"] {
          background-color: #2A2B30;
        }
        .case-media {
          display: block;
          width: 100%;
          height: auto;
        }
        .case-section-heading {
          font-size: 20px;
          font-weight: 400;
          color: ${INK_DARK};
          margin: 0 0 4px;
        }
        .case-section-body {
          font-size: 17px;
          line-height: 1.5;
          color: rgba(41, 41, 41, 0.7);
          margin: 0;
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
        <Link
          href="/"
          className="back-pill"
          aria-label="Back to home"
          style={{ justifySelf: "start" }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path
              d="M10 4L5 8L10 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back
        </Link>
        <nav
          className="flex"
          style={{
            justifySelf: "end",
            columnGap: "clamp(20px, 4vw, 40px)",
          }}
        >
          <a
            href="https://drive.google.com/file/d/1Vc50sGAOZPn380b65T648lka6LVHIrct/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
            style={navItem}
          >
            Resume
          </a>
          <a
            href="https://www.linkedin.com/in/anna-sandlin/"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
            style={navItem}
          >
            LinkedIn
          </a>
        </nav>
      </div>

      <article className="case-article">
        <div className="case-title-row">
          <h1 className="case-title">Women&rsquo;s Voices Now</h1>
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

        <section className="case-section">
          <div className="case-section-heading">{SECTIONS[0].heading}</div>
          <p className="case-section-body">{SECTIONS[0].body}</p>
          <ShimmerVideo
            videoSrc={SECTIONS[0].videoSrc}
            imageSrc={SECTIONS[0].imageSrc}
            alt={SECTIONS[0].alt}
            aspectRatio={SECTIONS[0].aspectRatio}
            bgVariant={SECTIONS[0].bg}
          >
            <button
              type="button"
              className="case-expand-btn"
              aria-label="Expand Before"
              onClick={() => setExpanded(0)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 3 21 3 21 9" />
                <polyline points="9 21 3 21 3 15" />
                <line x1="21" y1="3" x2="14" y2="10" />
                <line x1="3" y1="21" x2="10" y2="14" />
              </svg>
            </button>
          </ShimmerVideo>
        </section>

        <section className="process" aria-labelledby="process-title">
          <p className="process-kicker">The process</p>
          <h2 id="process-title" className="process-title">
            From content archive to viewing experience
          </h2>
          <p className="process-intro">
            The final direction emerged through layered research, information
            architecture, prototyping, and testing. Each round moved the
            experience further away from a blog and closer to a platform built
            around film discovery.
          </p>
          <div className="process-list">
            {PROCESS.map((step) => (
              <article className="process-step" key={step.number}>
                <div className="process-number" aria-hidden="true">
                  {step.number}
                </div>
                <div>
                  <p className="process-eyebrow">{step.eyebrow}</p>
                  <h3 className="process-heading">{step.heading}</h3>
                  <p className="process-body">{step.body}</p>
                  <div className="process-methods" aria-label="Methods used">
                    {step.methods.map((method) => (
                      <span className="process-method" key={method}>
                        {method}
                      </span>
                    ))}
                  </div>
                  <p className="process-takeaway">{step.takeaway}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="case-section">
          <div className="case-section-heading">{SECTIONS[1].heading}</div>
          <p className="case-section-body">{SECTIONS[1].body}</p>
          <ShimmerVideo
            videoSrc={SECTIONS[1].videoSrc}
            imageSrc={SECTIONS[1].imageSrc}
            alt={SECTIONS[1].alt}
            aspectRatio={SECTIONS[1].aspectRatio}
          >
            <button
              type="button"
              className="case-expand-btn"
              aria-label="Expand After"
              onClick={() => setExpanded(1)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 3 21 3 21 9" />
                <polyline points="9 21 3 21 3 15" />
                <line x1="21" y1="3" x2="14" y2="10" />
                <line x1="3" y1="21" x2="10" y2="14" />
              </svg>
            </button>
          </ShimmerVideo>
        </section>

        <section className="case-section">
          <div className="case-section-heading">Outcome</div>
          <p className="case-section-body">
            Women&rsquo;s Voices Now has to date reached over 50 million
            viewers across their film library, including 14 million viewers
            in 2025 alone, with 3 Emmy nominations and 1 Emmy win.
          </p>
        </section>

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
              videoSrc={SECTIONS[expanded].videoSrc}
              imageSrc={SECTIONS[expanded].imageSrc}
              alt={SECTIONS[expanded].alt}
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
