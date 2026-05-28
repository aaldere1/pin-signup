"use client";

import { useState, useEffect } from "react";
import SignupForm, { type FormValues } from "./SignupForm";
import Success from "./Success";
import Details from "./Details";

const RELEASE_TARGET = new Date(2026, 8, 1, 0, 0, 0, 0).getTime();

export function useCountdown(targetMs: number) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, targetMs - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return { d, h, m, s, isLive: diff === 0 };
}

const pad = (n: number, w = 2) => String(n).padStart(w, "0");

interface CopyProps {
  onJoin: () => void;
  mode: "idle" | "form" | "done";
  onSubmit: (vals: FormValues, optedIn: boolean) => Promise<void>;
  data: FormValues | null;
  refCode: string;
  submitError: string;
  reset: () => void;
}

export default function Copy({ onJoin, mode, onSubmit, data, refCode, submitError, reset }: CopyProps) {
  const { d, h, m, s, isLive } = useCountdown(RELEASE_TARGET);

  return (
    <div className="copy-col">
      <div className="eyebrow-row reveal" style={{ animationDelay: "0ms" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="lockup"
          src="/assets/hp-25-lockup.png"
          alt="Harry Potter — 25 Years of Magic"
        />
      </div>

      <h1 className="display reveal" style={{ animationDelay: "60ms" }}>
        25 Years of Magic,
        <span className="accent">cast in sterling silver.</span>
      </h1>

      <p className="lede reveal" style={{ animationDelay: "120ms" }}>
        A 925 silver collector&apos;s pin from the Harry Potter Film Concert
        Series — commissioned for 25 Years of Magic, in a limited edition of
        five hundred. Each piece individually numbered, certified, and
        dispatched in a velvet-lined presentation case with a signed certificate
        of authenticity.
      </p>

      <div className="specs reveal" style={{ animationDelay: "180ms" }}>
        <div className="spec">
          <span className="label">Material</span>
          <span className="value">925 Sterling</span>
        </div>
        <div className="spec">
          <span className="label">Dimensions</span>
          <span className="value">1.5 × 1.65 in</span>
          <span className="sub">38 × 42 mm</span>
        </div>
        <div className="spec">
          <span className="label">Edition</span>
          <span className="value gold">500 pieces</span>
        </div>
        <div className="spec">
          <span className="label">Release</span>
          {isLive ? (
            <span className="value countdown live">Now on sale</span>
          ) : (
            <span className="value countdown">
              {pad(d, 3)}
              <em>D</em>
              {pad(h)}
              <em>H</em>
              {pad(m)}
              <em>M</em>
              {pad(s)}
              <em>S</em>
            </span>
          )}
          <span className="sub">Sept 1, 2026 · 00:00 local</span>
        </div>
      </div>

      <div id="cta-zone" className="cta-zone reveal" style={{ animationDelay: "220ms" }}>
        {mode === "idle" && (
          <button className="btn solid" onClick={onJoin}>
            {isLive ? "Pin sale is live" : "Be first in line"}
            <span className="arrow">→</span>
          </button>
        )}
        {mode === "form" && (
          <SignupForm onClose={reset} onSubmit={onSubmit} error={submitError} />
        )}
        {mode === "done" && data && (
          <Success values={data} refCode={refCode} onReset={reset} />
        )}
      </div>

      <p className="includes reveal" style={{ animationDelay: "280ms" }}>
        <span className="ico" aria-hidden="true" />
        <span>
          <b>Includes</b> Velvet-lined presentation case and free-standing
          easel — wear it on a lapel, or stand it on the shelf.
        </span>
      </p>

      <Details />
    </div>
  );
}
