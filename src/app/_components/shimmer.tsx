"use client";

import { useState, type ReactNode } from "react";

// Shared loading-skeleton components. Both reserve their final dimensions
// up front via `aspect-ratio` (so layout never shifts when the media
// finishes loading) and animate a shimmer behind the empty space until
// the image/video signals it's ready, at which point the shimmer fades
// out and the real content fades in.
//
// The shimmer animation itself is in `globals.css` — these components
// only attach the right classes and inline aspect-ratio.

type ShimmerVideoProps = {
  /** Reserved space, e.g. "1920 / 1044". Required so the box has the
      right height before any pixels paint. */
  aspectRatio: string;
  /** Video loaded first; falls back to image on `error`. */
  videoSrc: string;
  /** Fallback still image (also used by screenreaders via alt). */
  imageSrc: string;
  alt: string;
  /** Optional data-bg variant for the wrap (currently only "dark"). */
  bgVariant?: string;
  /** Slot for absolutely-positioned overlays (expand button, etc.). */
  children?: ReactNode;
};

export function ShimmerVideo({
  aspectRatio,
  videoSrc,
  imageSrc,
  alt,
  bgVariant,
  children,
}: ShimmerVideoProps) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`case-media-wrap${loaded ? " is-loaded" : ""}`}
      data-bg={bgVariant}
      style={{ aspectRatio }}
    >
      {failed ? (
        <img
          className="case-media"
          src={imageSrc}
          alt={alt}
          onLoad={() => setLoaded(true)}
        />
      ) : (
        <video
          className="case-media"
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          controls={false}
          onLoadedData={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      )}
      {children}
    </div>
  );
}

type ShimmerImageProps = {
  aspectRatio: string;
  src: string;
  alt: string;
  /** Optional extra class for the wrap (defaults to "shimmer-frame"). */
  className?: string;
};

export function ShimmerImage({
  aspectRatio,
  src,
  alt,
  className,
}: ShimmerImageProps) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div
      className={`shimmer-frame${loaded ? " is-loaded" : ""}${className ? " " + className : ""}`}
      style={{ aspectRatio }}
    >
      <img src={src} alt={alt} onLoad={() => setLoaded(true)} />
    </div>
  );
}
