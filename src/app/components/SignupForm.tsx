"use client";

import { useState, useEffect, useRef, useCallback } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (el: string | HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id: string) => void;
    };
  }
}

interface SignupFormProps {
  onClose: () => void;
  onSubmit: (values: FormValues, optedIn: boolean, turnstileToken: string) => Promise<void>;
  error?: string;
}

export interface FormValues {
  name: string;
  email: string;
  city: string;
  tour: string;
}

export default function SignupForm({ onClose, onSubmit, error }: SignupFormProps) {
  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    city: "",
    tour: "any",
  });
  const [optedIn, setOptedIn] = useState(true);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const turnstileIdRef = useRef<string | null>(null);

  useEffect(() => {
    firstFieldRef.current?.focus();
  }, []);

  const renderTurnstile = useCallback(() => {
    if (!turnstileRef.current || !window.turnstile || turnstileIdRef.current) return;
    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
    if (!siteKey) return;
    turnstileIdRef.current = window.turnstile.render(turnstileRef.current, {
      sitekey: siteKey,
      size: "invisible",
      callback: (token: string) => setTurnstileToken(token),
    });
  }, []);

  useEffect(() => {
    if (window.turnstile) {
      renderTurnstile();
    } else {
      const check = setInterval(() => {
        if (window.turnstile) {
          clearInterval(check);
          renderTurnstile();
        }
      }, 200);
      return () => clearInterval(check);
    }
  }, [renderTurnstile]);

  const set = (k: keyof FormValues, v: string) =>
    setValues((s) => ({ ...s, [k]: v }));

  const validate = () => {
    const e: Record<string, boolean> = {};
    if (!values.name.trim()) e.name = true;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) e.email = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate() || submitting) return;
    setSubmitting(true);
    try {
      await onSubmit(values, optedIn, turnstileToken);
    } finally {
      setSubmitting(false);
    }
  };

  const D = (i: number) => ({ animationDelay: `${i * 55}ms` });

  return (
    <form className="form-panel" onSubmit={submit} noValidate>
      <div className="form-head reveal" style={D(0)}>
        <div>
          <h3>Reserve your seat at the door.</h3>
          <p>
            We&apos;ll notify you the moment the doors open — sale opens to
            this list first, 24 hours before public release.
          </p>
        </div>
        <button
          type="button"
          className="close-x"
          onClick={onClose}
          aria-label="Close form"
        >
          ✕
        </button>
      </div>

      <div className="field-row reveal" style={D(1)}>
        <div className={`field ${errors.name ? "invalid" : ""}`}>
          <label htmlFor="f-name">Your name</label>
          <input
            id="f-name"
            ref={firstFieldRef}
            type="text"
            autoComplete="name"
            placeholder="J. K. Reader"
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
          />
        </div>
        <div className={`field ${errors.email ? "invalid" : ""}`}>
          <label htmlFor="f-email">Email</label>
          <input
            id="f-email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
          />
        </div>
      </div>

      <div className="field-row reveal" style={D(2)}>
        <div className="field">
          <label htmlFor="f-city">Nearest city</label>
          <input
            id="f-city"
            type="text"
            autoComplete="address-level2"
            placeholder="London, Los Angeles, Tokyo…"
            value={values.city}
            onChange={(e) => set("city", e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="f-tour">Which show have you been to?</label>
          <select
            id="f-tour"
            value={values.tour}
            onChange={(e) => set("tour", e.target.value)}
          >
            <option value="any">Pick a film…</option>
            <option value="ps">Sorcerer&apos;s Stone</option>
            <option value="cos">Chamber of Secrets</option>
            <option value="poa">Prisoner of Azkaban</option>
            <option value="gof">Goblet of Fire</option>
            <option value="ootp">Order of the Phoenix</option>
            <option value="hbp">Half-Blood Prince</option>
            <option value="dh1">Deathly Hallows — Part 1</option>
            <option value="dh2">Deathly Hallows — Part 2</option>
            <option value="none">Haven&apos;t been yet</option>
          </select>
        </div>
      </div>

      <label className="checkbox-row reveal" style={D(3)}>
        <input
          type="checkbox"
          checked={optedIn}
          onChange={(e) => setOptedIn(e.target.checked)}
        />
        <span>
          I&apos;d like the occasional letter about new pins, tour dates, and
          partner programmes. Unsubscribe anytime —{" "}
          <a
            href="https://cineconcerts.digital/privacy-policy.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            privacy
          </a>
          .
        </span>
      </label>

      {error && (
        <p className="reveal" style={{ color: "var(--color-tint-restrict)", fontSize: "0.85rem", margin: 0 }}>
          {error}
        </p>
      )}

      <div ref={turnstileRef} />

      <div className="form-actions reveal" style={D(4)}>
        <button type="submit" className="btn solid" disabled={submitting}>
          {submitting ? "Reserving…" : "Reserve my spot"}
          <span className="arrow">→</span>
        </button>
        <span className="hint">Free · No payment yet</span>
      </div>
    </form>
  );
}
