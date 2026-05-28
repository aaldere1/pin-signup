import { neon } from "@neondatabase/serverless";
import { randomUUID } from "crypto";

function getSQL() {
  const url = process.env.POSTGRES_URL;
  if (!url) throw new Error("POSTGRES_URL not set");
  return neon(url);
}

function generateRef(): string {
  const part = () =>
    Math.random().toString(36).slice(2, 6).toUpperCase();
  return `HP-25Y-${part()}-${part()}`;
}

export interface SignupRow {
  id: number;
  name: string;
  email: string;
  city: string | null;
  tour: string | null;
  verified: boolean;
  token: string;
  ref_code: string;
  opted_in: boolean;
  created_at: string;
  verified_at: string | null;
}

export async function upsertSignup(data: {
  name: string;
  email: string;
  city?: string;
  tour?: string;
  optedIn?: boolean;
}): Promise<{ ref: string; token: string; isNew: boolean }> {
  const sql = getSQL();
  const token = randomUUID();
  const ref = generateRef();
  const email = data.email.toLowerCase().trim();

  const existing = await sql`
    SELECT id, verified, ref_code FROM signups WHERE email = ${email}
  `;

  if (existing.length > 0) {
    const row = existing[0];
    if (row.verified) {
      return { ref: "", token: "", isNew: false };
    }
    await sql`
      UPDATE signups
      SET name = ${data.name}, token = ${token}, city = ${data.city ?? null},
          tour = ${data.tour ?? null}, opted_in = ${data.optedIn ?? true}
      WHERE email = ${email}
    `;
    return { ref: row.ref_code as string, token, isNew: false };
  }

  await sql`
    INSERT INTO signups (name, email, city, tour, token, ref_code, opted_in)
    VALUES (${data.name}, ${email}, ${data.city ?? null}, ${data.tour ?? null},
            ${token}, ${ref}, ${data.optedIn ?? true})
  `;
  return { ref, token, isNew: true };
}

export async function verifyToken(token: string): Promise<SignupRow | null> {
  const sql = getSQL();
  const result = await sql`
    SELECT * FROM signups WHERE token = ${token}
  `;
  if (result.length === 0) return null;

  const row = result[0] as SignupRow;
  if (row.verified) return row;

  await sql`
    UPDATE signups SET verified = true, verified_at = NOW() WHERE id = ${row.id}
  `;
  return { ...row, verified: true, verified_at: new Date().toISOString() };
}
