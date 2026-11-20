"use client";

import { Children, isValidElement, useEffect, useRef, useState, type CSSProperties, type VideoHTMLAttributes } from "react";
import dimensions from "./case-video-dimensions.json";

type Props = VideoHTMLAttributes<HTMLVideoElement> & { managed?: boolean };
export default function CaseVideo({ managed = true, ...props }: Props) {
  if (!managed) return <video {...props} />;
  return <ManagedVideo {...props} />;
}

function ManagedVideo({ children, className, style, onLoadedMetadata, onCanPlay, onError, ...props }: VideoHTMLAttributes<HTMLVideoElement>) {
  const source = props.src ?? Children.toArray(children).flatMap(child => isValidElement<{ src?: string }>(child) && child.props.src ? [child.props.src] : [])[0];
  const [width, height] = (dimensions as Record<string, number[]>)[typeof source === "string" ? source : ""] ?? [1920, 1080];
  const frame = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const wanted = useRef(false);
  const [loaded, setLoaded] = useState(false);
  const [status, setStatus] = useState<"loading" | "ready" | "blocked" | "error" | "slow">("loading");
  const play = () => {
    const element = video.current;
    if (!element || !wanted.current || element.readyState < 2) return;
    void element.play().then(() => {
      if (!wanted.current) element.pause();
      else setStatus("ready");
    }).catch(error => {
      if (wanted.current && error.name === "NotAllowedError") setStatus("blocked");
    });
  };
  const playRef = useRef(play);
  useEffect(() => { playRef.current = play; });

  useEffect(() => {
    const element = video.current;
    const container = frame.current;
    const root = container?.closest("main");
    if (!element || !container || !root) return;
    const section = container.closest("section");
    let visible = false;
    let near = false;
    const sync = () => {
      const presenting = root.hasAttribute("data-presentation");
      const active = section?.dataset.presentationSlide === "active" && section.dataset.presentationPart !== "copy";
      wanted.current = !document.hidden && (presenting ? active : visible);
      if (presenting ? active : near) setLoaded(true);
      if (wanted.current) playRef.current();
      else element.pause();
    };
    const nearby = new IntersectionObserver(([entry]) => { near = entry.isIntersecting; sync(); }, { rootMargin: "240px" });
    const onscreen = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: 0.05 });
    nearby.observe(container);
    onscreen.observe(container);
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["data-presentation"] });
    if (section) observer.observe(section, { attributes: true, attributeFilter: ["data-presentation-slide", "data-presentation-part"] });
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => {
      wanted.current = false;
      nearby.disconnect(); onscreen.disconnect(); observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      element.pause();
    };
  }, []);

  useEffect(() => {
    if (!loaded || status !== "loading") return;
    const timer = setTimeout(() => setStatus("slow"), 15000);
    return () => clearTimeout(timer);
  }, [loaded, status]);

  const retry = () => { setLoaded(true); setStatus("loading"); video.current?.load(); };
  return <div ref={frame} className={`case-video-frame ${className ?? ""}`} data-case-media data-media-src={source} data-media-status={status} style={{ ...style, "--case-media-aspect": `${width} / ${height}` } as CSSProperties}>
    <video {...props} autoPlay={false} ref={video} src={loaded ? source : undefined} preload={loaded ? "auto" : "none"} width={width} height={height}
      onLoadedMetadata={event => { onLoadedMetadata?.(event); }}
      onLoadedData={() => { setStatus("ready"); playRef.current(); }}
      onCanPlay={event => { setStatus("ready"); playRef.current(); onCanPlay?.(event); }}
      onError={event => { setStatus("error"); onError?.(event); }}
    />
    {status !== "ready" && <div className="case-video-status" role="status">
      <span>{status === "error" ? "Video could not load." : status === "blocked" ? "Video paused." : status === "slow" ? "This video is taking longer to load." : "Loading video…"}</span>
      {status === "blocked" ? <button type="button" onClick={() => { wanted.current = true; play(); }}>Play video</button> : (status === "error" || status === "slow") && <button type="button" onClick={retry}>Retry video</button>}
    </div>}
  </div>;
}
