"use client";

import { useState } from "react";
import Ambient from "./components/Ambient";
import Pin from "./components/Pin";
import Copy from "./components/Copy";
import StickyCTA from "./components/StickyCTA";
import type { FormValues } from "./components/SignupForm";

export default function Home() {
  const [mode, setMode] = useState<"idle" | "form" | "done">("idle");
  const [data, setData] = useState<FormValues | null>(null);
  const [ref, setRef] = useState<string>("");
  const [submitError, setSubmitError] = useState<string>("");

  const handleSubmit = async (vals: FormValues, optedIn: boolean) => {
    setSubmitError("");
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...vals, optedIn }),
      });
      const json = await res.json();
      if (!res.ok) {
        setSubmitError(json.error ?? "Something went wrong");
        if (json.alreadyVerified) {
          setData(vals);
          setRef("");
          setMode("done");
        }
        return;
      }
      setData(vals);
      setRef(json.ref);
      setMode("done");
    } catch {
      setSubmitError("Network error — please try again.");
    }
  };
  const reset = () => {
    setMode("idle");
    setData(null);
    setRef("");
    setSubmitError("");
  };
  const onJoin = () => setMode("form");

  return (
    <>
      <Ambient />
      <div id="root-shell">
        <header className="brand">
          <div className="brand-mark">
            <a
              href="https://harrypotterinconcert.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/hpfcs-logo.png"
                alt="Harry Potter Film Concert Series"
              />
            </a>
          </div>
          <div className="kicker brand-meta">
            <div className="top">Limited edition · 500 pieces</div>
            <div className="row-2">Collector&apos;s pin · Series I</div>
          </div>
        </header>

        <main className="stage">
          <Copy
            onJoin={onJoin}
            mode={mode}
            onSubmit={handleSubmit}
            data={data}
            refCode={ref}
            submitError={submitError}
            reset={reset}
          />
          <Pin />
        </main>

        <footer className="fine">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="brought-by"
            src="/assets/brought-to-you-by.png"
            alt="Brought to you by CineConcerts"
          />
          <span className="kicker-tight">© &amp; ™ WBEI. (s26)</span>
        </footer>

        <StickyCTA mode={mode} onJoin={onJoin} />
      </div>
    </>
  );
}
