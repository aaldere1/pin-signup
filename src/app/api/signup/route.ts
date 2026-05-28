import { NextRequest, NextResponse } from "next/server";
import { upsertSignup } from "@/app/lib/db";
import { sendVerificationEmail } from "@/app/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, city, tour, optedIn } = body;

    if (!name?.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    const { ref, token, isNew } = await upsertSignup({
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

    return NextResponse.json({ success: true, ref });
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
