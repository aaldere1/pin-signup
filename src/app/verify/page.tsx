import { verifyToken } from "@/app/lib/db";
import "./verify.css";

interface VerifyPageProps {
  searchParams: Promise<{ token?: string }>;
}

export default async function VerifyPage({ searchParams }: VerifyPageProps) {
  const { token } = await searchParams;

  if (!token) {
    return (
      <div id="root-shell">
        <div className="verify-container">
          <div className="verify-card error">
            <span className="verify-icon">✕</span>
            <h1>Invalid link</h1>
            <p>This verification link is missing a token. Please use the link from your email.</p>
            <a href="/" className="verify-btn">Back to signup →</a>
          </div>
        </div>
      </div>
    );
  }

  const { row, expired } = await verifyToken(token);

  if (expired) {
    return (
      <div id="root-shell">
        <div className="verify-container">
          <div className="verify-card error">
            <span className="verify-icon">✕</span>
            <h1>Link expired</h1>
            <p>This verification link has expired (24-hour window). Please sign up again to get a fresh link.</p>
            <a href="/" className="verify-btn">Back to signup →</a>
          </div>
        </div>
      </div>
    );
  }

  if (!row) {
    return (
      <div id="root-shell">
        <div className="verify-container">
          <div className="verify-card error">
            <span className="verify-icon">✕</span>
            <h1>Link not found</h1>
            <p>This verification link is invalid. Please use the link from your email, or sign up again.</p>
            <a href="/" className="verify-btn">Back to signup →</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="root-shell">
      <div className="verify-container">
        <div className="verify-card success">
          <span className="verify-seal">
            <span className="dot" />
            Verified
          </span>
          <h1>Your spot is saved.</h1>
          <p>
            You&apos;re confirmed on the list, {row.name.split(" ")[0]}. We&apos;ll write
            24 hours before the public sale with a private purchase link.
            The first 500 pins are individually numbered — in line order, list members first.
          </p>
          <div className="verify-ref">
            ref · <span>{row.ref_code}</span>
          </div>
          <a href="/" className="verify-btn gold">Back to the pin →</a>
        </div>
      </div>
    </div>
  );
}
