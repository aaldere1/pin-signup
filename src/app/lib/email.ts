import Mailgun from "mailgun.js";
import FormData from "form-data";
import { buildVerificationEmail } from "./email-template";

const mg = new Mailgun(FormData);

function getClient() {
  const apiKey = process.env.MAILGUN_API_KEY;
  if (!apiKey) throw new Error("MAILGUN_API_KEY not set");
  return mg.client({
    username: "api",
    key: apiKey,
    url: "https://api.mailgun.net",
  });
}

export async function sendVerificationEmail(params: {
  to: string;
  name: string;
  ref: string;
  token: string;
  host: string;
}) {
  const client = getClient();
  const domain = process.env.MAILGUN_DOMAIN ?? "cineconcertassets.com";
  const verifyUrl = `https://${params.host}/verify?token=${params.token}`;

  const html = buildVerificationEmail({
    name: params.name,
    ref: params.ref,
    verifyUrl,
  });

  await client.messages.create(domain, {
    from: `CineConcerts <noreply@${domain}>`,
    to: [params.to],
    subject: "Confirm your reservation — HP Collector's Pin",
    html,
    text: `Hi ${params.name}, confirm your reservation (${params.ref}) by visiting: ${verifyUrl}`,
    "h:Reply-To": "support@cineconcerts.com",
    "o:tag": ["pin-signup", "verification"],
  });
}
