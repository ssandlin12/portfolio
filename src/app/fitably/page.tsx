"use client";

import Link from "next/link";
import { Figtree } from "next/font/google";
import { useEffect, useState, type CSSProperties } from "react";
import { ShimmerImage } from "../_components/shimmer";

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
  // Optional: when set, the section renders this set of images side-by-side
  // (no shared frame) INSTEAD of the single video/image.
  triptych?: { src: string; alt: string }[];
  /** "width / height" shared by every triptych image in this section — feeds
      each shimmer frame's aspect-ratio so the row reserves its final height
      before any pixels load. */
  triptychAspectRatio?: string;
};

const SECTIONS: Section[] = [
  {
    heading: "Before",
    body: "Spottr's brand didn't fit a college-fitness audience, the visual treatment was dated and low-contrast, and the matching flow leaned on a Tinder-style swipe pattern that felt transactional rather than community-driven.",
    videoSrc: "/case-studies/fitably/01.mov",
    imageSrc: "/case-studies/fitably/01.svg",
    alt: "Spottr before",
    triptych: [
      { src: "/case-studies/fitably/01_before.png", alt: "Spottr screen 1" },
      { src: "/case-studies/fitably/02_before.png", alt: "Spottr screen 2" },
      { src: "/case-studies/fitably/03_before.png", alt: "Spottr screen 3" },
    ],
    triptychAspectRatio: "750 / 1334",
  },
  {
    heading: "After",
    body: "Fitably focuses on a streamlined, minimalist visual language with custom illustration and logo design. It replaces swipe matching with workout events and campus-based connection and follows a complete end-to-end user flow that accounts for multiple connection entry points.",
    videoSrc: "/case-studies/fitably/02.mov",
    imageSrc: "/case-studies/fitably/02.svg",
    alt: "Fitably after",
    triptych: [
      { src: "/case-studies/fitably/01.PNG", alt: "Fitably screen 1" },
      { src: "/case-studies/fitably/02.PNG", alt: "Fitably screen 2" },
      { src: "/case-studies/fitably/03.PNG", alt: "Fitably screen 3" },
    ],
    triptychAspectRatio: "1290 / 2796",
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

export default function FitablyCaseStudy() {
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

        /* Pill-style back button that replaces the wordmark in the top-left. */
        .back-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #ffffff;
          border-radius: 999px;
          height: 36px;
          padding: 0 18px 0 24px;
          font-size: 15px;
          font-weight: 500;
          color: ${INK_DARK};
          text-decoration: none;
          border: none;
          cursor: pointer;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
          transition: background-color 160ms ease-out, box-shadow 160ms ease-out;
        }
        .back-pill:hover {
          background: #f5f5f5;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
        }

        .case-article {
          width: 100%;
          max-width: 768px;
          margin-inline: auto;
          margin-top: clamp(56px, calc(6vh + 32px), 120px);
          margin-bottom: 24px;
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
          background: #ececec;
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
          background: #e3e3e3;
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
        .case-media {
          display: block;
          width: 100%;
          height: auto;
        }
        /* Triptych row — three naked images side-by-side filling the
           article width, no frame, just 16px gap between them. */
        .case-triptych {
          display: flex;
          gap: 16px;
          margin-top: 28px;
        }
        .case-triptych img {
          display: block;
          flex: 1 1 0;
          min-width: 0;
          width: 100%;
          height: auto;
          border-radius: 14px;
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

        /* "Next" card at the end of the case study — links to the next
           case study in sequence. Matches article width, sits well below
           the last section. */
        .case-next {
          display: block;
          margin-top: 64px;
          background: #ececec;
          border-radius: 16px;
          padding: 28px 32px;
          color: ${INK_DARK};
          text-decoration: none;
          transition: background-color 160ms ease-out;
        }
        .case-next:hover {
          background: #e3e3e3;
        }
        .case-next-label {
          font-size: 15px;
          font-weight: 500;
          color: rgba(41, 41, 41, 0.5);
          margin: 0;
        }
        .case-next-title {
          font-size: 22px;
          font-weight: 400;
          letter-spacing: -0.01em;
          color: ${INK_DARK};
          margin: 2px 0 4px;
        }
        .case-next-body {
          font-size: 17px;
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
          <h1 className="case-title">Fitably</h1>
          <a
            className="case-link-pill"
            href="https://fitably.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit fitably.com"
          >
            fitably.com
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
          Fitably, previously called Spottr, is a fitness app that helps
          college students find workout partners at their local gym. As
          part of the redesign of the original product, I provided a
          visual refresh, full UX research effort, and complete app flow.
        </p>

        {SECTIONS.map((s, i) => (
          <section key={s.heading} className="case-section">
            <div className="case-section-heading">{s.heading}</div>
            <p className="case-section-body">{s.body}</p>
            {s.triptych ? (
              <div className="case-triptych">
                {s.triptych.map((img) => (
                  <ShimmerImage
                    key={img.src}
                    src={img.src}
                    alt={img.alt}
                    aspectRatio={s.triptychAspectRatio ?? "1 / 1"}
                  />
                ))}
              </div>
            ) : (
              <div className="case-media-wrap">
                <FallbackVideo
                  videoSrc={s.videoSrc}
                  imageSrc={s.imageSrc}
                  alt={s.alt}
                />
                <button
                  type="button"
                  className="case-expand-btn"
                  aria-label={`Expand ${s.heading}`}
                  onClick={() => setExpanded(i)}
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
                    <polyline points="15 3 21 3 21 9" />
                    <polyline points="9 21 3 21 3 15" />
                    <line x1="21" y1="3" x2="14" y2="10" />
                    <line x1="3" y1="21" x2="10" y2="14" />
                  </svg>
                </button>
              </div>
            )}
          </section>
        ))}

        <section className="case-section">
          <div className="case-section-heading">Outcome</div>
          <p className="case-section-body">
            During its initial beta testing at the University of Colorado
            Boulder, Fitably worked with multiple brand ambassadors to
            onboard nearly 1,000 new users over the course of one month
            with over a hundred workouts created.
          </p>
        </section>

        <Link href="/fluent" className="case-next">
          <p className="case-next-label">Next</p>
          <h3 className="case-next-title">Microsoft Fluent</h3>
          <p className="case-next-body">
            Design systems work shaping Microsoft&rsquo;s Fluent design
            language.
          </p>
        </Link>
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
