import { NextRequest, NextResponse } from "next/server";
import { upsertSignup } from "@/app/lib/db";
import { sendVerificationEmail } from "@/app/lib/email";
import { checkRateLimit } from "@/app/lib/rate-limit";
import { verifyTurnstile } from "@/app/lib/turnstile";

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "unknown";

    const { allowed, remaining } = checkRateLimit(ip);
    if (!allowed) {
      return NextResponse.json(
        { error: "Too many signups from this address. Please try again later." },
        { status: 429, headers: { "Retry-After": "3600" } }
      );
    }

    const body = await request.json();
    const { name, email, city, tour, optedIn, turnstileToken } = body;

    const turnstileOk = await verifyTurnstile(turnstileToken ?? "", ip);
    if (!turnstileOk) {
      return NextResponse.json(
        { error: "Verification failed. Please refresh and try again." },
        { status: 403 }
      );
    }

    if (!name?.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    const { ref, token } = await upsertSignup({
      name: name.trim(),
      email,
      city: city?.trim() || undefined,
      tour: tour === "any" ? undefined : tour,
      optedIn: optedIn !== false,
    });

    if (!ref && !token) {
      return NextResponse.json({
        error: "This email is already verified and on the list.",
        alreadyVerified: true,
      }, { status: 409 });
    }

    const host = request.headers.get("host") ?? "pin-signup.vercel.app";

    await sendVerificationEmail({ to: email, name: name.trim(), ref, token, host });

    return NextResponse.json(
      { success: true, ref },
      { headers: { "X-RateLimit-Remaining": String(remaining) } }
    );
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
