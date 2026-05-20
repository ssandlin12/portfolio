"use client";

import Link from "next/link";
import { Figtree } from "next/font/google";
import { useEffect, useState, type CSSProperties } from "react";

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
  },
  {
    heading: "After",
    body:
      "I delivered a redesigned homepage that positioned WVN as a modern streaming platform with multiple “Watch Now” entry points and with the film stills and covers as the focus. Additionally, the logo redesign that I delivered has now become an iconic part of the WVN brand.",
    videoSrc: "/case-studies/wvn/02.mp4",
    imageSrc: "/case-studies/wvn/02.png",
    alt: "Women's Voices Now — after",
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
        backgroundColor: "#f5f5f5",
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
            href="https://drive.google.com/file/d/1f-wtoB6_PEa-Yj8H4Z_48y2xLTAL0-gE/view?usp=sharing"
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

        {SECTIONS.map((s, i) => (
          <section key={s.heading} className="case-section">
            <div className="case-section-heading">{s.heading}</div>
            <p className="case-section-body">{s.body}</p>
            <div className="case-media-wrap" data-bg={s.bg}>
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
          </section>
        ))}

        <section className="case-section">
          <div className="case-section-heading">Outcome</div>
          <p className="case-section-body">
            Women&rsquo;s Voices Now has to date reached over 50 million
            viewers across their film library, including 14 million viewers
            in 2025 alone, with 3 Emmy nominations and 1 Emmy win.
          </p>
        </section>

        <Link href="/fitably" className="case-next">
          <p className="case-next-label">Next</p>
          <h3 className="case-next-title">Fitably</h3>
          <p className="case-next-body">
            A UX research-led redesign of a fitness partner matching app.
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
