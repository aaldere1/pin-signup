"use client";

import type { FormValues } from "./SignupForm";

interface SuccessProps {
  values: FormValues;
  refCode: string;
  onReset: () => void;
}

export default function Success({ values, refCode, onReset }: SuccessProps) {
  const alreadyVerified = !refCode;

  return (
    <div className="success reveal" role="status">
      <span className="seal">
        <span className="dot" />
        {alreadyVerified ? "Already on the list" : "Reservation held"}
      </span>
      <h3>
        {alreadyVerified
          ? `${values.email.split("@")[0]}, you're already verified.`
          : `Check your email, ${values.email.split("@")[0]}.`}
      </h3>
      <p>
        {alreadyVerified ? (
          <>
            This email is already verified and on the list. We&apos;ll write
            24 hours before the public sale with a private link.
          </>
        ) : (
          <>
            We&apos;ve sent a verification owl to <strong style={{ color: "var(--color-text)" }}>{values.email}</strong>.
            Click the link in the email to confirm your spot. Once verified,
            we&apos;ll write 24 hours before the public sale with a private link.
            The first 500 pins are individually numbered — in line order, list
            members first.
          </>
        )}
      </p>
      {refCode && (
        <div className="mono-line">
          <span>
            ref ·{" "}
            <span style={{ color: "var(--color-text)" }}>{refCode}</span>
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
      )}
    </div>
  );
}
