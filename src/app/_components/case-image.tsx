"use client";
import Image, { type ImageProps } from "next/image";
import { useState, type CSSProperties } from "react";

export default function CaseImage({ managed = true, ...props }: ImageProps & { managed?: boolean }) {
  if (!managed) return <Image {...props} alt={props.alt} />;
  return <ManagedImage {...props} />;
}
function ManagedImage({ className, style, width, height, onError, onLoad, ...props }: ImageProps) {
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  return <div className={`case-image-frame ${className ?? ""}`} data-case-media style={{ ...style, "--case-media-aspect": `${width} / ${height}` } as CSSProperties}>
    <Image {...props} alt={props.alt} key={attempt} width={width} height={height} onLoad={event => { setFailed(false); onLoad?.(event); }} onError={event => { setFailed(true); onError?.(event); }} />
    {failed && <div className="case-image-status" role="status"><span>Image could not load.</span><button type="button" onClick={() => { setFailed(false); setAttempt(value => value + 1); }}>Retry image</button></div>}
  </div>;
}
