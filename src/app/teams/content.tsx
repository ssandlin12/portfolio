"use client";

import Image from "next/image";
import Link from "next/link";
import { Figtree } from "next/font/google";
import { useState } from "react";

const figtree = Figtree({ subsets: ["latin"] });
const decks = Array.from({ length: 21 }, (_, index) => `/case-studies/teams/decks-${String(index).padStart(2, "0")}.png`);
const buildingBlocks = ["/case-studies/teams/building-blocks-00.png", "/case-studies/teams/building-blocks-01.png", "/case-studies/teams/building-blocks-02.png"];
const examples = ["/case-studies/teams/examples-00.png", "/case-studies/teams/examples-01.png", "/case-studies/teams/examples-02.png"];

function ExternalIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>;
}

function StudyImage({ src, alt, priority = false }: { src: string; alt: string; priority?: boolean }) {
  return <Image className="teams-study-image" src={src} width={1920} height={1080} sizes="(max-width: 940px) calc(100vw - 40px), 900px" alt={alt} priority={priority} />;
}

export default function TeamsContent() {
  const [videoReady, setVideoReady] = useState(false);

  return (
    <main className={`${figtree.className} teams-case-page`}>
      <style jsx>{`
        .teams-case-page { min-height: 100vh; background: #fff; color: #292929; }
        .teams-case-header { display: flex; align-items: center; justify-content: space-between; padding: 40px clamp(24px, 5vw, 80px) 0; }
        .teams-pill { display: inline-flex; align-items: center; gap: 6px; height: 36px; padding: 0 16px; border-radius: 999px; background: #f1f1f1; color: #303030; font-size: 16px; font-weight: 400; line-height: 1; text-decoration: none; transition: background 160ms ease; }
        .teams-pill:hover { background: #e6e6e6; }
        .teams-back { padding-left: 14px; padding-right: 20px; }
        .teams-back-arrow { font-size: 24px; font-weight: 300; line-height: 0; transform: translateY(-1px); }
        .teams-hero { --preview-overhang: 56px; width: 100%; max-width: 900px; margin: clamp(72px, 12vh, 160px) auto 0; }
        .teams-heading { margin: 0 0 32px; }
        .teams-title { margin: 0; font-size: clamp(30px, 2.4vw, 42px); font-weight: 300; letter-spacing: -0.045em; line-height: 1.08; }
        .teams-subtitle { margin: 10px 0 0; color: rgba(41, 41, 41, .7); font-size: clamp(19px, 1.5vw, 27px); font-weight: 300; letter-spacing: -0.035em; line-height: 1.15; }
        .teams-video { position: relative; width: calc(100% - var(--preview-overhang)); aspect-ratio: 16 / 9; line-height: 0; }
        .teams-video::after { content: ""; position: absolute; inset: 0; z-index: 3; pointer-events: none; border: 1px solid rgba(41, 41, 41, .14); border-radius: clamp(18px, 2vw, 34px); }
        .teams-video-skeleton { position: absolute; inset: 0; border-radius: clamp(18px, 2vw, 34px); background: linear-gradient(105deg, #e6e6e6 20%, #f4f4f4 42%, #e6e6e6 64%); background-size: 220% 100%; animation: teams-shimmer 1.6s linear infinite; }
        @keyframes teams-shimmer { from { background-position: 100% 0; } to { background-position: -120% 0; } }
        .teams-video video { position: relative; z-index: 1; display: block; width: 100%; height: auto; border-radius: clamp(18px, 2vw, 34px); opacity: 0; transition: opacity 280ms ease-out; }
        .teams-video.is-ready video { opacity: 1; }
        .teams-preview { position: absolute; z-index: 4; bottom: -36px; right: calc(-1 * var(--preview-overhang)); width: clamp(176px, 21vw, 270px); height: auto; border-radius: clamp(14px, 1.5vw, 24px); box-shadow: 0 18px 40px rgba(28, 37, 76, .18); }
        .teams-article { width: min(900px, calc(100% - 40px)); margin: 112px auto 0; padding-bottom: 120px; }
        .teams-intro { margin: 0 0 52px; color: #737373; font-size: clamp(24px, 2.25vw, 34px); font-weight: 300; letter-spacing: -0.035em; line-height: 1.28; }
        .teams-section { margin-top: 116px; }
        .teams-kicker { margin: 0 0 20px; color: #a0a0a0; font-size: 16px; font-weight: 500; letter-spacing: .12em; text-transform: uppercase; }
        .teams-heading-two { max-width: 780px; margin: 0; font-size: clamp(34px, 3.3vw, 54px); font-weight: 300; letter-spacing: -0.05em; line-height: 1.06; }
        .teams-copy { max-width: 760px; margin: 30px 0 42px; color: #737373; font-size: clamp(19px, 1.65vw, 25px); font-weight: 300; letter-spacing: -0.025em; line-height: 1.48; }
        .teams-study-image { display: block; width: 100%; height: auto; border: 1px solid #dfdfdf; border-radius: 28px; }
        .teams-gallery { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; }
        .teams-gallery .teams-study-image { border-radius: 20px; }
        .teams-gallery--three { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        .teams-gallery--three .teams-study-image { border-radius: 18px; }
        .teams-caption { margin: 14px 0 0; color: #929292; font-size: 15px; line-height: 1.35; }
        @media (max-width: 700px) { .teams-case-header { padding: 24px 20px 0; } .teams-pill { font-size: 15px; } .teams-hero { --preview-overhang: 28px; width: calc(100% - 40px); margin-top: 64px; } .teams-preview { bottom: -24px; width: min(48vw, 190px); } .teams-article { margin-top: 86px; } .teams-section { margin-top: 80px; } .teams-gallery, .teams-gallery--three { grid-template-columns: 1fr; gap: 16px; } .teams-study-image { border-radius: 18px; } }
      `}</style>

      <header className="teams-case-header">
        <Link href="/" className="teams-pill teams-back"><span className="teams-back-arrow" aria-hidden="true">‹</span>Back</Link>
        <a className="teams-pill" href="https://www.microsoft.com/en-us/microsoft-teams/group-chat-software" target="_blank" rel="noopener noreferrer">Microsoft Teams<ExternalIcon /></a>
      </header>

      <section className="teams-hero" aria-labelledby="teams-title">
        <div className="teams-heading"><h1 id="teams-title" className="teams-title">Microsoft Teams</h1><p className="teams-subtitle">“How do you build an atom to template pipeline for the world&apos;s largest enterprise app?”</p></div>
        <div className={`teams-video${videoReady ? " is-ready" : ""}`} aria-label="Microsoft Teams case study video">
          <div className="teams-video-skeleton" aria-hidden="true" />
          <video autoPlay loop muted playsInline preload="auto" onLoadedData={() => setVideoReady(true)}><source src="/teams-hero.mp4" type="video/mp4" /></video>
          <Image className="teams-preview" src="/teams-preview.png" width={1920} height={1152} sizes="(max-width: 560px) 56vw, 22vw" alt="Microsoft Teams component library preview" />
        </div>
      </section>

      <article className="teams-article">
        <p className="teams-intro">A recap of the Basic Screens work: establishing a practical system of building blocks, shell patterns, and reusable templates for Microsoft Teams.</p>
        <section className="teams-section">
          <p className="teams-kicker">The foundation</p><h2 className="teams-heading-two">Designing the building blocks for a flexible screen system.</h2>
          <p className="teams-copy">The work started by making the smallest decisions explicit. Building blocks created a shared vocabulary for the parts of a Teams screen, so designers could assemble patterns with clarity before moving into full templates.</p>
          <div className="teams-gallery teams-gallery--three">{buildingBlocks.map((src, index) => <StudyImage key={src} src={src} alt={`Microsoft Teams building blocks reference ${index + 1}`} />)}</div>
        </section>
        <section className="teams-section">
          <p className="teams-kicker">From atoms to templates</p><h2 className="teams-heading-two">Turning the system into Basic Screens.</h2>
          <p className="teams-copy">The resulting specs map the progression from component decisions to usable layouts. Each screen documents the relationship between the shell, content regions, and the elements that can be swapped or extended as a product flow evolves.</p>
          <div className="teams-gallery">{decks.map((src, index) => <StudyImage key={src} src={src} alt={`Microsoft Teams Basic Screens specification ${index + 1}`} priority={index < 2} />)}</div>
        </section>
        <section className="teams-section">
          <p className="teams-kicker">In practice</p><h2 className="teams-heading-two">A system that supports real product experiences.</h2>
          <p className="teams-copy">The final examples show how the structure carries into product use: familiar navigation, content density, and interaction patterns can be composed from the same foundation while still serving distinct tasks.</p>
          <div className="teams-gallery teams-gallery--three">{examples.map((src, index) => <StudyImage key={src} src={src} alt={`Microsoft Teams Basic Screens product example ${index + 1}`} />)}</div>
          <p className="teams-caption">Basic Screens recap materials</p>
        </section>
      </article>
    </main>
  );
}
