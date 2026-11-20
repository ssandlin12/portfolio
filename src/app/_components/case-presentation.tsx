"use client";

import { useEffect, useRef, useState } from "react";

// Present the existing sections so slide content stays in sync with the case study.
type SlideView = { element: HTMLElement; part: "all" | "copy" | "media" };

export default function CasePresentation() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const questionsRef = useRef<HTMLElement>(null);
  const scrollPosition = useRef(0);
  const [slides, setSlides] = useState<HTMLElement[]>([]);
  const [presenting, setPresenting] = useState(false);
  const [index, setIndex] = useState(0);
  const [views, setViews] = useState<SlideView[]>([]);
  const viewsRef = useRef<SlideView[]>([]);
  const indexRef = useRef(0);
  useEffect(() => { indexRef.current = index; }, [index]);

  const toggle = () => {
    if (presenting) {
      setPresenting(false);
      return;
    }
    const root = buttonRef.current?.closest("main");
    if (!root) return;
    const sections = Array.from(root.querySelectorAll<HTMLElement>(
      ":scope > .fluent-case-hero, :scope > .case-article > section, :scope > .case-article > .case-next"
    ));
    if (!sections.length) return;
    scrollPosition.current = window.scrollY;
    const elements = questionsRef.current ? [...sections, questionsRef.current] : sections;
    const initialViews: SlideView[] = elements.map(element => ({ element, part: "all" }));
    viewsRef.current = initialViews;
    setViews(initialViews);
    setSlides(elements);
    setIndex(0);
    setPresenting(true);
  };

  useEffect(() => {
    if (!presenting) return;
    const root = buttonRef.current?.closest("main");
    if (!root) return;
    const trigger = buttonRef.current;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    root.dataset.presentation = "true";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setPresenting(false);
        return;
      }
      const target = event.target;
      if ((target instanceof Element && target.closest("input, textarea, select, [contenteditable=true]")) || event.altKey || event.ctrlKey || event.metaKey) return;
      if (event.key.toLowerCase() === "r") {
        event.preventDefault();
        setIndex(0);
        slides[0]?.scrollTo({ top: 0 });
        slides[0]?.querySelectorAll("video").forEach(video => { video.currentTime = 0; });
      } else if (["ArrowRight", "PageDown", "ArrowLeft", "PageUp", "Home", "End"].includes(event.key)) {
        event.preventDefault();
        setIndex(current => event.key === "Home" ? 0 : event.key === "End" ? viewsRef.current.length - 1 :
          Math.max(0, Math.min(viewsRef.current.length - 1, current + (["ArrowRight", "PageDown"].includes(event.key) ? 1 : -1))));
      }
    };
    window.addEventListener("keydown", onKeyDown, true);
    return () => {
      delete root.dataset.presentation;
      slides.forEach(slide => {
        delete slide.dataset.presentationSlide;
        delete slide.dataset.presentationPart;
        slide.inert = false;
      });
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKeyDown, true);
      window.scrollTo({ top: scrollPosition.current, behavior: "instant" });
      trigger?.focus({ preventScroll: true });
    };
  }, [presenting, slides]);

  useEffect(() => {
    if (!presenting) return;
    const root = buttonRef.current?.closest("main");
    const view = viewsRef.current[index];
    const active = view?.element;
    if (!root || !active) return;
    slides.forEach(slide => {
      slide.dataset.presentationSlide = slide === active ? "active" : "hidden";
      slide.inert = slide !== active;
      delete slide.dataset.presentationPart;
      if (slide === active) {
        slide.dataset.presentationPart = view.part;
        slide.scrollTop = 0;
      }
    });
    // Keep keyboard focus on a visible control when entering or changing slides.
    if (!document.activeElement || document.activeElement === buttonRef.current ||
        document.activeElement.closest('[data-presentation-slide="hidden"]')) {
      root.querySelector<HTMLButtonElement>('.presentation-controls button')?.focus({ preventScroll: true });
    }
  }, [presenting, index, slides, views]);

  // Measure every slide against both viewport dimensions, so ordinary slides
  // share a width instead of changing scale as the viewer moves between them.
  useEffect(() => {
    if (!presenting) return;
    const root = buttonRef.current?.closest("main");
    if (!root) return;
    const mediaSelector = ":scope > .case-media-image, :scope > .process-media-image, :scope > .teams-case-media-image, :scope > .case-problem-media, :scope > .case-media-placeholder";
    let frame = 0;
    let disposed = false;
    const fit = () => {
      if (disposed) return;
      const edge = window.innerWidth <= 600 || (window.innerWidth < 1000 && window.innerHeight < 500) ? 32 : 100;
      const contentTop = Math.min(72, Math.max(24, window.innerHeight * 0.06)) + 18;
      const available = Math.max(120, window.innerHeight - contentTop - 24);
      const maximum = Math.min(1232, window.innerWidth - edge * 2 - (window.innerWidth <= 600 ? 16 : 40));
      const ordinary = slides.filter(slide => !slide.matches(".fluent-case-hero, .case-role-slide, .case-outcome, .presentation-questions"));
      const split = new Set<HTMLElement>();
      slides.forEach(slide => {
        delete slide.dataset.presentationPart;
        delete slide.dataset.presentationOverflow;
        for (const child of Array.from(slide.children)) {
          if (!(child instanceof HTMLElement)) continue;
          child.dataset.presentationContent = child.matches("[data-case-media], .case-problem-media, .case-media-placeholder") ? "media" : "copy";
        }
        delete slide.dataset.presentationLayout;
        slide.style.removeProperty("--slide-media-height");
        slide.style.removeProperty("--slide-width");
        slide.dataset.presentationMeasure = "true";
      });
      root.style.setProperty("--presentation-width", `${maximum}px`);
      const measure = (slide: HTMLElement) => slide.getBoundingClientRect().height;
      let shared = maximum;
      let found = false;
      // Reflow text at each candidate width; never transform or reduce font sizes.
      for (let width = maximum; width >= Math.min(maximum, 600); width -= 8) {
        root.style.setProperty("--presentation-width", `${width}px`);
        if (ordinary.every(slide => measure(slide) <= available)) {
          shared = width;
          found = true;
          break;
        }
      }
      root.style.setProperty("--presentation-width", `${shared}px`);
      if (!found) ordinary.forEach(slide => {
        if (measure(slide) <= available) return;
        const media = slide.querySelector<HTMLElement>(mediaSelector);
        if (!media) return;
        if (window.innerWidth >= 700) {
          slide.dataset.presentationLayout = "columns";
          if (measure(slide) <= available) return;
          delete slide.dataset.presentationLayout;
        }
        // On narrow screens, reserve the copy's natural height, then contain the
        // media in the remaining space without cropping or distorting it.
        const mediaHeight = media.getBoundingClientRect().height;
        const copyHeight = measure(slide) - mediaHeight;
        const remaining = available - copyHeight;
        if (remaining < 120) split.add(slide);
        else slide.style.setProperty("--slide-media-height", `${remaining}px`);
      });
      const hero = slides.find(slide => slide.matches(".fluent-case-hero"));
      if (hero) {
        if (window.innerHeight < 500 && window.innerWidth >= 650) hero.dataset.presentationLayout = "hero-columns";
        let bestWidth = maximum;
        let bestHeight = Infinity;
        for (let width = maximum; width >= Math.min(maximum, 280); width -= 8) {
          hero.style.setProperty("--slide-width", `${width}px`);
          const height = measure(hero);
          if (height < bestHeight) { bestWidth = width; bestHeight = height; }
          if (height <= available) break;
        }
        hero.style.setProperty("--slide-width", `${bestHeight > available ? maximum : bestWidth}px`);
      }
      const nextViews: SlideView[] = slides.flatMap<SlideView>(element => split.has(element)
        ? [{ element, part: "copy" as const }, { element, part: "media" as const }]
        : [{ element, part: "all" as const }]);
      for (const view of nextViews) {
        view.element.dataset.presentationPart = view.part;
        if (view.part === "media") view.element.style.setProperty("--slide-media-height", `${Math.min(available - 16, (shared - 32) * 9 / 16)}px`);
        if (measure(view.element) > available + 1) view.element.dataset.presentationOverflow = "true";
      }
      const previous = viewsRef.current[indexRef.current];
      const nextIndex = Math.max(0, nextViews.findIndex(view => view.element === previous?.element &&
        (view.part === previous?.part || view.part === "all" || previous?.part === "all")));
      const changed = nextViews.length !== viewsRef.current.length || nextViews.some((view, i) => view.element !== viewsRef.current[i]?.element || view.part !== viewsRef.current[i]?.part);
      if (changed) {
        viewsRef.current = nextViews;
        indexRef.current = nextIndex;
        setViews(nextViews);
        setIndex(nextIndex);
      }
      slides.forEach(slide => { delete slide.dataset.presentationMeasure; delete slide.dataset.presentationPart; });
      const current = viewsRef.current[indexRef.current];
      if (current) current.element.dataset.presentationPart = current.part;
    };
    const schedule = () => {
      if (disposed) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(fit);
    };
    fit();
    window.addEventListener("resize", schedule);
    root.addEventListener("load", schedule, true);
    root.addEventListener("loadedmetadata", schedule, true);
    void document.fonts.ready.then(schedule);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", schedule);
      root.removeEventListener("load", schedule, true);
      root.removeEventListener("loadedmetadata", schedule, true);
      root.style.removeProperty("--presentation-width");
      slides.forEach(slide => {
        delete slide.dataset.presentationMeasure;
        delete slide.dataset.presentationOverflow;
        delete slide.dataset.presentationPart;
        for (const child of Array.from(slide.children)) if (child instanceof HTMLElement) delete child.dataset.presentationContent;
        delete slide.dataset.presentationLayout;
        slide.style.removeProperty("--slide-media-height");
        slide.style.removeProperty("--slide-width");
      });
    };
  }, [presenting, slides]);

  const restart = () => {
    setIndex(0);
    slides[0]?.scrollTo({ top: 0 });
    slides[0]?.querySelectorAll("video").forEach(video => { video.currentTime = 0; });
  };

  return (
    <>
      <style>{`
        .case-header-actions { display: flex; align-items: center; justify-content: flex-end; gap: 12px; flex-wrap: wrap; }
        .presentation-toggle { cursor: pointer; font-family: inherit; }
        .presentation-toggle svg { width: 16px; height: 16px; flex: none; }
        .presentation-toggle:focus-visible, .presentation-controls button:focus-visible, .presentation-edge:focus-visible { outline: 2px solid #555; outline-offset: 4px; }
        main[data-presentation] { --presentation-edge-width: 100px; --presentation-content-top: calc(clamp(24px, 6vh, 72px) + 18px); --presentation-content-center: calc((100dvh + var(--presentation-content-top) - 24px) / 2); position: fixed !important; inset: 0; height: 100dvh; min-height: 0 !important; overflow: hidden; z-index: 50; }
        main[data-presentation] .fluent-page-header, main[data-presentation] .case-header-actions { display: contents; }
        main[data-presentation] .fluent-page-header a, main[data-presentation] .presentation-toggle { display: none; }
        main[data-presentation] .case-article { display: contents; }
        main[data-presentation] [data-presentation-slide="hidden"] { display: none !important; }
        main[data-presentation] :is([data-presentation-slide="active"], [data-presentation-measure]) {
          position: fixed; top: var(--presentation-content-top); left: 50%;
          width: var(--slide-width, var(--presentation-width, min(1232px, calc(100vw - 2 * var(--presentation-edge-width) - 40px)))); max-width: none;
          height: auto; max-height: none;
          margin: 0 !important; padding: 0 16px 16px; box-sizing: border-box; flex: none;
          transform: translateX(-50%); overflow: visible;
          scrollbar-width: thin; scrollbar-gutter: stable both-edges; overscroll-behavior: contain;
          overflow-anchor: none;
        }
        main[data-presentation] :is([data-presentation-slide="active"], [data-presentation-measure]) > :is(
          .case-media-image, .process-media-image, .teams-case-media-image,
          .case-problem-media, .case-media-placeholder
        ) {
          width: 100%;
          height: var(--slide-media-height, auto); aspect-ratio: var(--case-media-aspect, 16 / 9); object-fit: contain;
          margin: 24px auto 0; background: #f5f5f5;
        }
        main[data-presentation] .case-problem-media-image { height: var(--slide-media-height, auto); object-fit: contain; transform: none; }
        main[data-presentation] .case-media-placeholder { aspect-ratio: 16 / 9; }
        main.case-study--fluent[data-presentation] .case-problem-media { aspect-ratio: 16 / 9; }
        main.case-study--fluent[data-presentation] .case-problem-media-image { height: 100%; object-fit: cover; transform: scale(1.045); }
        main[data-presentation] .case-role-slide:is([data-presentation-slide="active"], [data-presentation-measure]) { top: 50%; transform: translate(-50%, -50%); padding-bottom: 0; }
        main[data-presentation] .presentation-role-overline { display: block; margin: 0 0 8px; color: rgba(41, 41, 41, 0.45); font-size: 12px; line-height: 18px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; }
        main[data-presentation] .presentation-role-title { display: block; text-align: left; font-size: 24px; line-height: 30px; font-weight: 300; margin: 0 0 24px; }
        main[data-presentation] .case-role-section { margin: 0; align-content: start; }
        main[data-presentation] .case-outcome:is([data-presentation-slide="active"], [data-presentation-measure]) { width: min(1100px, calc(100vw - 2 * var(--presentation-edge-width) - 40px)); top: 50%; transform: translate(-50%, -50%); padding-bottom: 0; }
        main[data-presentation] .case-outcome .case-next { display: none; }
        main[data-presentation] .fluent-case-hero:is([data-presentation-slide="active"], [data-presentation-measure]) { padding-bottom: 64px; top: var(--presentation-content-center); transform: translate(-50%, -50%); }
        main[data-presentation] .fluent-case-heading { margin-bottom: 32px; }
        main[data-presentation] [data-presentation-layout="columns"] {
          display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.25fr); column-gap: 32px; grid-template-rows: repeat(9, min-content) 1fr; align-content: start;
        }
        main[data-presentation] [data-presentation-layout="columns"] > * { grid-column: 1; min-width: 0; }
        main[data-presentation] [data-presentation-layout="columns"] > :is(.case-media-image, .process-media-image, .teams-case-media-image, .case-problem-media, .case-media-placeholder) {
          grid-column: 2; grid-row: 1 / span 10; align-self: center; margin-top: 0;
        }
        main[data-presentation] [data-presentation-measure] { display: block !important; visibility: hidden; pointer-events: none; }
        main[data-presentation] [data-presentation-measure][data-presentation-layout="columns"] { display: grid !important; }
        main[data-presentation] [data-presentation-layout="hero-columns"] { display: grid !important; grid-template-columns: 1.4fr 1fr; gap: 24px; align-items: start; padding-bottom: 40px; }
        main[data-presentation] [data-presentation-layout="hero-columns"] .fluent-case-heading { margin-bottom: 0; }
        main[data-presentation] [data-presentation-layout="hero-columns"] .fluent-preview-image { max-width: 100px; }
        @media (max-height: 500px) and (min-width: 650px) {
          main[data-presentation] .case-role-section { display: grid; grid-template-columns: 1fr 3fr; gap: 8px 24px; padding: 16px; }
          main[data-presentation] .presentation-role-title { margin-bottom: 8px; }
          main[data-presentation] .case-outcome .case-next { margin-top: 8px; padding: 8px 24px; }
          main[data-presentation] .case-outcome .case-feature-intro { margin-top: 8px; }
          main[data-presentation] .case-role-collaborators { grid-column: 2; grid-row: 1 / span 4; margin-top: 0; align-self: start; }
        }
        @media (max-height: 500px) and (max-width: 999px) {
          main[data-presentation] { --presentation-edge-width: 32px; }
        }
        .presentation-questions { display: none; }
        main[data-presentation] .presentation-questions:is([data-presentation-slide="active"], [data-presentation-measure]) { display: block; top: 50%; transform: translate(-50%, -50%); padding: 0 16px; text-align: center; }
        .presentation-questions h2 { margin: 0; font-size: 32px; line-height: 1.2; font-weight: 300; letter-spacing: -0.02em; }
        main[data-presentation] [data-presentation-part="copy"] > [data-presentation-content="media"],
        main[data-presentation] [data-presentation-part="media"] > [data-presentation-content="copy"] { display: none !important; }
        main[data-presentation] [data-presentation-part="media"] > [data-presentation-content="media"] { margin-top: 0; }
        main[data-presentation] [data-presentation-overflow="true"]:not([data-presentation-measure]) {
          top: var(--presentation-content-top); transform: translateX(-50%); max-height: calc(100dvh - var(--presentation-content-top) - 16px); overflow-y: auto; overflow-x: hidden;
        }
        main[data-presentation] .case-video-frame > video, main[data-presentation] .case-image-frame > img { object-fit: contain; }
        main.case-study--fluent[data-presentation] .case-problem-media-image > img { object-fit: cover; }
        .presentation-controls {
          position: fixed; top: calc(clamp(24px, 6vh, 72px) - 24px);
          left: clamp(20px, 6vw, 120px); right: clamp(20px, 6vw, 120px);
          display: flex; align-items: center; justify-content: space-between; z-index: 5;
          pointer-events: none;
        }
        .presentation-controls svg { width: 16px; height: 16px; flex: none; }
        .presentation-controls button { pointer-events: auto; white-space: nowrap; cursor: pointer; font-family: inherit; }
        .presentation-edge { position: fixed; top: 0; bottom: 0; width: var(--presentation-edge-width); z-index: 4; display: flex; align-items: center; justify-content: center; padding: 0; border: 0; background: transparent; color: #292929; cursor: pointer; }
        .presentation-edge--previous { left: 0; }
        .presentation-edge--next { right: 0; }
        .presentation-edge svg { width: 28px; height: 28px; opacity: 0; transition: opacity 120ms ease; }
        .presentation-edge:not(:disabled):hover svg, .presentation-edge:focus-visible svg { opacity: 1; }
        .presentation-edge:disabled { cursor: default; }
        .presentation-announcement { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
        @media(max-width: 600px) {
          main[data-presentation] { --presentation-edge-width: 32px; }
          .case-header-actions { gap: 8px; }
          main[data-presentation] :is([data-presentation-slide="active"], [data-presentation-measure]) { padding-left: 8px; padding-right: 8px; }
          main[data-presentation] .case-role-section, main[data-presentation] .case-outcome .case-next { padding: 20px; }
        }
      `}</style>
      <button ref={buttonRef} type="button" className="back-pill presentation-toggle" aria-pressed={presenting} onClick={toggle}>
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" aria-hidden="true"><path d="M5 3.8c0-.8.9-1.3 1.6-.9l10 6.2a1 1 0 0 1 0 1.8l-10 6.2c-.7.4-1.6-.1-1.6-.9V3.8Z" /></svg>
        Present Mode
      </button>
      <section ref={questionsRef} className="presentation-questions" aria-label="Questions">
        <h2>Any questions?</h2>
      </section>
      {presenting && <>
        <button type="button" className="presentation-edge presentation-edge--previous" disabled={index === 0} onClick={() => setIndex(current => Math.max(0, current - 1))} aria-label="Previous slide"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m12 5-5 5 5 5" /></svg></button>
        <button type="button" className="presentation-edge presentation-edge--next" disabled={index === views.length - 1} onClick={() => setIndex(current => Math.min(viewsRef.current.length - 1, current + 1))} aria-label="Next slide"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m8 5 5 5-5 5" /></svg></button>
        <nav className="presentation-controls" aria-label="Presentation controls">
          <button type="button" className="back-pill" aria-keyshortcuts="Escape" onClick={() => setPresenting(false)}><svg style={{ transform: "rotate(180deg)" }} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 3H3v14h5M7 10h10m-4-4 4 4-4 4" /></svg>Exit</button>
          <button type="button" className="back-pill" onClick={restart} aria-keyshortcuts="R">Restart (R)</button>
        </nav>
        <div className="presentation-announcement" role="status" aria-live="polite" aria-atomic="true">Slide {index + 1} of {views.length}</div>
      </>}

    </>
  );
}
