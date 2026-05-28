"use client";

import { useState, useEffect } from "react";

const DETAIL_SHOTS = [
  { src: "/assets/detail-1.png", label: "Filigree" },
  { src: "/assets/detail-2.png", label: "Front" },
  { src: "/assets/detail-3.png", label: "Reverse" },
];

export default function Details() {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (open == null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <div className="details reveal" style={{ animationDelay: "340ms" }}>
        {DETAIL_SHOTS.map((d, i) => (
          <button
            key={i}
            className="detail-thumb"
            onClick={() => setOpen(i)}
            aria-label={`View detail: ${d.label}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={d.src} alt={`Pin detail — ${d.label}`} />
            <span className="label">{d.label}</span>
          </button>
        ))}
      </div>
      {open != null && (
        <div
          className="lightbox"
          onClick={() => setOpen(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            className="close"
            onClick={() => setOpen(null)}
            aria-label="Close"
          >
            ✕
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={DETAIL_SHOTS[open].src}
            alt={`Pin detail — ${DETAIL_SHOTS[open].label}`}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
