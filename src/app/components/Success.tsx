"use client";

import { useMemo } from "react";
import type { FormValues } from "./SignupForm";

interface SuccessProps {
  values: FormValues;
  onReset: () => void;
}

export default function Success({ values, onReset }: SuccessProps) {
  const ref = useMemo(() => {
    const part = () =>
      Math.random().toString(36).slice(2, 6).toUpperCase();
    return `HP-25Y-${part()}-${part()}`;
  }, []);

  return (
    <div className="success reveal" role="status">
      <span className="seal">
        <span className="dot" />
        Reservation held
      </span>
      <h3>Owl post on its way to {values.email.split("@")[0]}.</h3>
      <p>
        We&apos;ll write 24 hours before the public sale with a private link.
        The first 500 pins are individually numbered — in line order, list
        members first.
      </p>
      <div className="mono-line">
        <span>
          ref ·{" "}
          <span style={{ color: "var(--color-text)" }}>{ref}</span>
        </span>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onReset();
          }}
          style={{
            color: "var(--color-text-dim)",
            textDecoration: "underline",
            textDecorationStyle: "dotted" as const,
          }}
        >
          Add another address →
        </a>
      </div>
    </div>
  );
}
