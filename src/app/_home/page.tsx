"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { Figtree } from "next/font/google";
import Link from "next/link";
import Blob from "./blob";

// Maps a tile index to a shader morph-target ID. Tiles not in the map don't
// trigger a morph (the blob stays as-is on hover).
const TILE_MORPH_TARGET: Record<number, number> = {
  0: 0, // Microsoft Fluent → MS 4-square mark
  1: 1, // Microsoft Teams → Teams (SDF texture)
  2: 4, // Diffui.ai → 3x3 grid (SDF texture)
  3: 3, // WVN → "W" letterform (SDF texture)
  4: 2, // Fitably → radial-burst (SDF texture)
  5: 5, // Medium → Medium logo (SDF texture)
};

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-figtree",
  display: "swap",
});

// Darkest ink anywhere on the page is #292929 — pure black is forbidden.
// Larger text gets a "lit from top-left" gradient (lighter at the upper-left,
// settling to #292929 at the lower-right) so the type catches light the same
// way the glass surfaces do.
const INK_DARK = "#292929";
const INK_LIT_LIGHT = "#525252";

const navItem: CSSProperties = {
  fontSize: 15,
  letterSpacing: "0.01em",
  fontWeight: 500,
  // 50% opacity of INK_DARK at rest; hover darkens to full ink. Solid
  // color (not the lit gradient) so the hover transition stays simple —
  // gradient-clipped text + color transition don't mix cleanly.
  color: "rgba(41,41,41,0.5)",
  textDecoration: "none",
  transition: "color 160ms ease-out",
};

// Tiles in the bottom toggle bar. `href` makes the tile clickable
// (internal routes use next/link, external URLs open in a new tab).
// Tiles without an href are "disabled" — greyed out and non-interactive.
const tiles: Array<{ title: string; href?: string }> = [
  { title: "Microsoft\nFluent", href: "/fluent" },
  { title: "Microsoft Teams", href: "/teams" },
  { title: "Diffui.ai", href: "/diffui" },
  { title: "WVN", href: "/wvn" },
  { title: "Fitably", href: "/fitably" },
  {
    title: "Medium",
    href: "https://medium.com/design-bootcamp/designing-amidst-the-acceleration-towards-ai-singularity-ea35a0429470",
  },
];

export default function Home() {
  // `hoveredTile` is the tile under the cursor right now.
  // `activeTile` is the shape the blob is currently morphed into. We only
  // commit a new active tile after the previous shape has retracted to the
  // blob — switching directly between two morph targets at morph=1 would
  // snap (no smooth interpolation between two non-blob iso-surfaces).
  const [hoveredTile, setHoveredTile] = useState<number | null>(null);
  const [activeTile, setActiveTile] = useState<number | null>(null);

  useEffect(() => {
    if (hoveredTile === activeTile) return;
    if (activeTile === null) {
      // Nothing showing yet — switch in immediately and let the morph ease.
      setActiveTile(hoveredTile);
      return;
    }
    // Currently showing a shape. Retract first (clear active), then commit
    // the new one after the morph has had time to ease back to ~0.
    setActiveTile(null);
    if (hoveredTile !== null) {
      const t = setTimeout(() => setActiveTile(hoveredTile), 360);
      return () => clearTimeout(t);
    }
  }, [hoveredTile, activeTile]);

  const morph = activeTile !== null ? 1 : 0;
  const morphTarget =
    activeTile !== null ? TILE_MORPH_TARGET[activeTile] ?? 0 : 0;

  return (
    <main
      className={`${figtree.variable} min-h-screen flex flex-col relative`}
      style={{
        fontFamily: "var(--font-figtree), system-ui, sans-serif",
        color: INK_DARK,
        backgroundColor: "#f5f5f5",
        paddingInline: "clamp(20px, 6vw, 120px)",
        // Top is 24px tighter than bottom; keep the responsive clamp so it
        // still shrinks on short viewports.
        paddingTop: "calc(clamp(24px, 6vh, 72px) - 24px)",
        paddingBottom: "clamp(24px, 6vh, 72px)",
        colorScheme: "light",
      }}
    >
      <style>{`
        /* Glassmorphic case-study toggle bar — fixed at bottom-center of
           the viewport, with one button per case study. */
        .work-bar-wrapper {
          position: fixed;
          bottom: calc(clamp(20px, 4vh, 40px) + 16px);
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          pointer-events: none;
        }
        .work-bar {
          display: flex;
          gap: 2px;
          padding: 6px;
          border-radius: 999px;
          background-color: rgba(255, 255, 255, 0.35);
          backdrop-filter: blur(32px) saturate(160%);
          -webkit-backdrop-filter: blur(32px) saturate(160%);
          border: none;
          box-shadow:
            0 20px 50px rgba(0, 0, 0, 0.05),
            0 6px 16px rgba(0, 0, 0, 0.03),
            0 1px 2px rgba(0, 0, 0, 0.02);
          pointer-events: auto;
        }
        .work-bar-item {
          position: relative;
          display: inline-flex;
          align-items: center;
          padding: 10px 18px;
          border-radius: 999px;
          background-color: transparent;
          text-decoration: none;
          white-space: nowrap;
          cursor: pointer;
          font-size: 15px;
          font-weight: 500;
          letter-spacing: -0.005em;
          line-height: 1.2;
          transition: background-color 160ms ease-out, color 160ms ease-out;
        }
        .work-bar-item[data-external="true"] .work-bar-item-text,
        .work-bar-item[data-external="true"] .work-bar-item-ext {
          transition: opacity 160ms ease-out;
        }
        .work-bar-item[data-external="true"] .work-bar-item-ext {
          position: absolute;
          inset: 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          pointer-events: none;
        }
        .work-bar-item[data-external="true"]:hover .work-bar-item-text {
          opacity: 0;
        }
        .work-bar-item[data-external="true"]:hover .work-bar-item-ext {
          opacity: 1;
        }
        .work-bar-item[data-active="true"] {
          color: rgba(41, 41, 41, 0.75);
        }
        .work-bar-item[data-active="true"]:hover {
          background-color: rgba(255, 255, 255, 0.75);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.6),
            0 1px 2px rgba(0, 0, 0, 0.04);
          color: ${INK_DARK};
        }
        .work-bar-item[data-active="false"] {
          color: rgba(41, 41, 41, 0.3);
          cursor: default;
        }
        .work-bar-item[data-active="false"]:hover {
          background-color: transparent;
          color: rgba(41, 41, 41, 0.3);
        }
        /* Small "Case Studies" caption above the bar. Inherits the
           wrapper's pointer-events: none so it never blocks clicks. */
        .work-bar-label {
          font-size: 15px;
          font-weight: 500;
          letter-spacing: 0.01em;
          color: rgba(41, 41, 41, 0.5);
          text-align: center;
          margin: 0 0 8px;
        }
        /* Narrow-viewport: stack tiles vertically so they don't overflow
           horizontally. The bar stays anchored bottom-center. */
        @media (max-width: 720px) {
          .work-bar {
            flex-direction: column;
            gap: 4px;
          }
          .work-bar-item {
            justify-content: center;
            min-width: 200px;
          }
        }
        .nav-link:hover {
          color: ${INK_DARK} !important;
        }
        /* Lit-text gradient applied via class so nested text elements (title,
           subtitle, bullets) each get their own background-clip pass. */
        .lit {
          background-image: linear-gradient(135deg, ${INK_LIT_LIGHT} 0%, ${INK_DARK} 65%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }

      `}</style>

      {/* Wordmark + nav row — pinned to the top of the safe-area. When a
          case study is open, an optional centered title slot sits between
          the wordmark (left) and the nav (right). */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          columnGap: "clamp(20px, 4vw, 48px)",
          rowGap: 12,
        }}
      >
        <Link
          href="/"
          aria-label="Anna Sandlin — Home"
          style={{
            justifySelf: "start",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            textDecoration: "none",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 36,
              height: 36,
              lineHeight: 0,
              flexShrink: 0,
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path d="M19 6L7.5996 25H2L13.4004 6H19Z" fill="black" />
              <rect width="11" height="5" transform="translate(16 20)" fill="black" />
              <rect width="9" height="5" transform="translate(27 6) rotate(90)" fill="black" />
            </svg>
          </span>
          <span
            style={{
              fontSize: 15,
              fontWeight: 500,
              color: INK_DARK,
              lineHeight: "27px",
              whiteSpace: "nowrap",
            }}
          >
            Anna Sandlin
          </span>
        </Link>
        {/* Center slot — empty by default. The case title now lives inside
            the glassmorphic case container, above the media. */}
        <span aria-hidden />
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

      {/* Hero — center-aligned, centered on the page. */}
      <h1
        style={{
          fontFamily: "var(--font-figtree), system-ui, sans-serif",
          fontSize: 34,
          lineHeight: 1.2,
          letterSpacing: "-0.02em",
          fontWeight: 300,
          textAlign: "center",
          maxWidth: "min(720px, 100%)",
          margin: 0,
          marginInline: "auto",
          marginTop: "clamp(56px, calc(6vh + 32px), 120px)",
          color: "rgba(41,41,41,0.5)",
        }}
      >
        Hi, I&rsquo;m <span style={{ color: INK_DARK }}>Anna Sandlin</span>.
        <br />
        I&rsquo;m currently doing design
        <br />
        systems work at <span style={{ color: INK_DARK }}>Microsoft</span>.
      </h1>

      {/* Blob — inline, centered under the hero. */}
      <div
        aria-hidden
        className="pointer-events-none"
        style={{
          width: "clamp(260px, 28vw, 380px)",
          aspectRatio: "1 / 1",
          marginInline: "auto",
          marginTop: "calc(clamp(16px, 3vh, 32px) - 8px)",
        }}
      >
        <Blob morph={morph} morphTarget={morphTarget} />
      </div>


      {/* Fixed glassmorphic case-study toggle bar at the bottom of the
          viewport. Hovering an item drives the blob morph via the shared
          hoveredTile state. */}
      <div className="work-bar-wrapper">
        <p className="work-bar-label">Case Studies</p>
        <div className="work-bar">
          {tiles.map((tile, i) => {
            const isActive = !!tile.href;
            const display = tile.title.replace(/\n/g, " ");
            const onEnter = () => setHoveredTile(i);
            const onLeave = () =>
              setHoveredTile((curr) => (curr === i ? null : curr));
            const dataActive = isActive ? "true" : "false";

            if (!tile.href) {
              return (
                <span
                  key={tile.title}
                  className="work-bar-item"
                  data-active={dataActive}
                  onMouseEnter={onEnter}
                  onMouseLeave={onLeave}
                >
                  {display}
                </span>
              );
            }
            if (tile.href.startsWith("http")) {
              return (
                <a
                  key={tile.title}
                  href={tile.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="work-bar-item"
                  data-active={dataActive}
                  data-external="true"
                  onMouseEnter={onEnter}
                  onMouseLeave={onLeave}
                >
                  <span className="work-bar-item-text">{display}</span>
                  <span className="work-bar-item-ext" aria-hidden>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </span>
                </a>
              );
            }
            return (
              <Link
                key={tile.title}
                href={tile.href}
                className="work-bar-item"
                data-active={dataActive}
                onMouseEnter={onEnter}
                onMouseLeave={onLeave}
              >
                {display}
              </Link>
            );
          })}
        </div>
      </div>

    </main>
  );
}
