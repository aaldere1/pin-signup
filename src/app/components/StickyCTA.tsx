"use client";

import { useState, useEffect } from "react";
import { useCountdown } from "./Copy";

const RELEASE_TARGET = new Date(2026, 8, 1, 0, 0, 0, 0).getTime();

interface StickyCTAProps {
  mode: "idle" | "form" | "done";
  onJoin: () => void;
}

export default function StickyCTA({ mode, onJoin }: StickyCTAProps) {
  const [visible, setVisible] = useState(false);
  const { d, h, m, isLive } = useCountdown(RELEASE_TARGET);

  useEffect(() => {
    let ctaInView = false;
    let scrolledPast = false;

    const update = () => setVisible(scrolledPast && !ctaInView);

    const onScroll = () => {
      const past = window.scrollY > window.innerHeight * 0.5;
      const docH = document.documentElement.scrollHeight;
      const nearBottom = window.scrollY + window.innerHeight > docH - 80;
      scrolledPast = past && !nearBottom;
      update();
    };

    const ctaEl = document.getElementById("cta-zone");
    let io: IntersectionObserver | null = null;
    if (ctaEl && "IntersectionObserver" in window) {
      io = new IntersectionObserver(
        ([entry]) => {
          ctaInView =
            entry.isIntersecting && entry.intersectionRatio > 0.25;
          update();
        },
        { threshold: [0, 0.25, 0.6] }
      );
      io.observe(ctaEl);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      io?.disconnect();
    };
  }, []);

  const handleClick = () => {
    onJoin();
    setTimeout(() => {
      const el = document.getElementById("cta-zone");
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 32;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 60);
  };

  if (mode !== "idle") return null;

  const countdownLine = isLive
    ? "Live now · 500 pieces"
    : `${d}d ${String(h).padStart(2, "0")}h ${String(m).padStart(2, "0")}m`;

  return (
    <div
      className={`sticky-cta ${visible ? "visible" : ""}`}
      aria-hidden={!visible}
    >
      <div className="sticky-meta">
        <span className="top">
          {isLive ? "On sale now" : "Owls dispatch in"}
        </span>
        <span className="bottom">{countdownLine}</span>
      </div>
      <button
        className="btn solid"
        onClick={handleClick}
        tabIndex={visible ? 0 : -1}
      >
        {isLive ? "Buy now" : "Be first in line"}
        <span className="arrow">→</span>
      </button>
    </div>
  );
}
