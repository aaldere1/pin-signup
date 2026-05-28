export function buildVerificationEmail(params: {
  name: string;
  ref: string;
  verifyUrl: string;
}): string {
  const { name, ref, verifyUrl } = params;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>Confirm your reservation</title>
</head>
<body style="margin:0;padding:0;background-color:#0C0E13;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0C0E13;min-height:100vh;">
<tr><td align="center" style="padding:40px 16px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background-color:#14171E;border:1px solid #1C2029;border-radius:10px;overflow:hidden;">

<!-- Gold accent bar -->
<tr><td style="height:3px;background:linear-gradient(to right,#B27018,#E09028,#F4B048,#E09028,#B27018);"></td></tr>

<!-- Body -->
<tr><td style="padding:36px 32px 28px;">

  <!-- Kicker -->
  <p style="margin:0 0 20px;font-size:11px;text-transform:uppercase;letter-spacing:0.16em;color:#6C7283;font-family:'Courier New',monospace;">
    Collector's Pin · Series I · Reservation
  </p>

  <!-- Headline -->
  <h1 style="margin:0 0 16px;font-size:24px;font-weight:600;color:#D4D8E3;line-height:1.2;">
    Confirm your owl post address.
  </h1>

  <!-- Body copy -->
  <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#6C7283;">
    Hi ${escapeHtml(name)}, you've requested early access to the limited-edition Harry Potter
    25th Anniversary Collector's Pin. Tap the button below to verify your email — we'll
    write 24 hours before the public sale with a private link.
  </p>

  <!-- CTA Button -->
  <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
  <tr><td style="background-color:#E09028;border-radius:6px;">
    <a href="${escapeHtml(verifyUrl)}" target="_blank" rel="noopener noreferrer"
       style="display:inline-block;padding:14px 28px;font-size:15px;font-weight:600;color:#0C0E13;text-decoration:none;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
      Verify my email &rarr;
    </a>
  </td></tr>
  </table>

  <!-- Ref -->
  <p style="margin:0 0 8px;font-size:12px;color:#9298A8;font-family:'Courier New',monospace;letter-spacing:0.06em;">
    Reservation ref: <strong style="color:#D4D8E3;">${escapeHtml(ref)}</strong>
  </p>

  <!-- Fallback link -->
  <p style="margin:0;font-size:12px;color:#6C7283;line-height:1.5;">
    If the button doesn't work, paste this URL into your browser:<br/>
    <a href="${escapeHtml(verifyUrl)}" style="color:#E09028;text-decoration:underline;word-break:break-all;">${escapeHtml(verifyUrl)}</a>
  </p>

</td></tr>

<!-- Footer -->
<tr><td style="padding:20px 32px;border-top:1px solid #1C2029;">
  <p style="margin:0;font-size:11px;color:#6C7283;line-height:1.5;text-align:center;">
    You're receiving this because you signed up at the Harry Potter Film Concert Series collector's pin page.
    If this wasn't you, you can safely ignore this email.<br/>
    &copy; &amp; &trade; WBEI. (s26) · Presented by CineConcerts
  </p>
</td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
