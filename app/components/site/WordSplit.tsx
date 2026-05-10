"use client";

import React from "react";

export function WordSplit({ text, className }: { text: string; className?: string }) {
  const words = text.split(/\s+/).filter(Boolean);

  return (
    <span className={className} aria-hidden={false}>
      {/* Visual word spans for GSAP targeting */}
      {words.map((w, i) => (
        <span key={i} className="word inline-block mr-1 break-keep">
          {w}
        </span>
      ))}
      {/* Keep an accessible copy for screen readers */}
      <span className="sr-only">{text}</span>
    </span>
  );
}
