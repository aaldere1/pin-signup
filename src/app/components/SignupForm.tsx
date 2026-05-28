"use client";

import { useState, useEffect, useRef } from "react";

interface SignupFormProps {
  onClose: () => void;
  onSubmit: (values: FormValues) => void;
}

export interface FormValues {
  name: string;
  email: string;
  city: string;
  tour: string;
}

export default function SignupForm({ onClose, onSubmit }: SignupFormProps) {
  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    city: "",
    tour: "any",
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    firstFieldRef.current?.focus();
  }, []);

  const set = (k: keyof FormValues, v: string) =>
    setValues((s) => ({ ...s, [k]: v }));

  const validate = () => {
    const e: Record<string, boolean> = {};
    if (!values.name.trim()) e.name = true;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) e.email = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    onSubmit(values);
  };

  const D = (i: number) => ({ animationDelay: `${i * 55}ms` });

  return (
    <form className="form-panel" onSubmit={submit} noValidate>
      <div className="form-head reveal" style={D(0)}>
        <div>
          <h3>Reserve your seat at the door.</h3>
          <p>
            We&apos;ll write the moment the owls take flight — sale opens to
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
            placeholder="owl@hogwarts.edu"
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
        <input type="checkbox" defaultChecked />
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

      <div className="form-actions reveal" style={D(4)}>
        <button type="submit" className="btn solid">
          Send the owl
          <span className="arrow">→</span>
        </button>
        <span className="hint">Free · No payment yet</span>
      </div>
    </form>
  );
}
