"use client";

import Link from "next/link";
import { Figtree } from "next/font/google";
import { type CSSProperties } from "react";

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

export default function TeamsContent() {
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
        .case-title {
          font-size: 34px;
          line-height: 1.2;
          letter-spacing: -0.02em;
          font-weight: 300;
          color: ${INK_DARK};
          text-align: left;
          margin: 0;
        }
        .case-intro {
          font-size: 18px;
          line-height: 1.5;
          color: rgba(41, 41, 41, 0.7);
          text-align: left;
          margin: 20px 0 0;
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
          style={{ justifySelf: "end", columnGap: "clamp(20px, 4vw, 40px)" }}
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
        <h1 className="case-title">Microsoft Teams</h1>
        <p className="case-intro">Case study content coming soon.</p>
      </article>
    </main>
  );
}
