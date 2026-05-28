const IMG_BASE = "https://raw.githubusercontent.com/aaldere1/pin-signup/main/public/assets";

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

<!-- Outer wrapper — concert-black background -->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0C0E13;">
<tr><td align="center" style="padding:0;">

<!-- ============================================================
     HEADER — Logo bar
     ============================================================ -->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">
<tr><td style="padding:32px 32px 0;text-align:center;">
  <a href="https://harrypotterinconcert.com" target="_blank" rel="noopener noreferrer">
    <img src="${IMG_BASE}/hpfcs-logo.png" alt="Harry Potter Film Concert Series" width="220" style="display:inline-block;height:auto;max-width:220px;opacity:0.9;" />
  </a>
</td></tr>
</table>

<!-- ============================================================
     HERO — 25 Years lockup + pin image
     ============================================================ -->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">
<tr><td style="padding:28px 32px 0;text-align:center;">
  <img src="${IMG_BASE}/hp-25-lockup.png" alt="Harry Potter — 25 Years of Magic" width="180" style="display:inline-block;height:auto;max-width:180px;" />
</td></tr>
<tr><td style="padding:24px 32px 8px;text-align:center;">
  <img src="${IMG_BASE}/pin-front.png" alt="Collector's Pin — Front" width="200" style="display:inline-block;height:auto;max-width:200px;" />
</td></tr>
<tr><td style="padding:0 32px;text-align:center;">
  <p style="margin:0;font-size:10px;text-transform:uppercase;letter-spacing:0.18em;color:#6C7283;font-family:'Courier New',monospace;">925 Sterling Silver &middot; Limited to 500 &middot; Series I</p>
</td></tr>
</table>

<!-- ============================================================
     MAIN CARD — dark surface with gold top rule
     ============================================================ -->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">
<tr><td style="padding:28px 24px 0;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#14171E;border:1px solid #1C2029;border-radius:10px;overflow:hidden;">

<!-- Gold accent bar -->
<tr><td style="height:3px;background:linear-gradient(to right,#B27018,#E09028,#F4B048,#E09028,#B27018);"></td></tr>

<!-- Card body -->
<tr><td style="padding:32px 28px 24px;">

  <!-- Kicker -->
  <p style="margin:0 0 16px;font-size:10px;text-transform:uppercase;letter-spacing:0.18em;color:#E09028;font-family:'Courier New',monospace;">
    &#9679; Collector's Pin &middot; Reservation Confirmation
  </p>

  <!-- Headline -->
  <h1 style="margin:0 0 14px;font-size:22px;font-weight:600;color:#D4D8E3;line-height:1.25;">
    Confirm your place in line.
  </h1>

  <!-- Body copy -->
  <p style="margin:0 0 24px;font-size:15px;line-height:1.65;color:#6C7283;">
    Hi ${escapeHtml(name)}, you've requested early access to the limited-edition
    Harry Potter 25th Anniversary Collector's Pin. Tap the button below to verify
    your email &mdash; we'll write 24 hours before the public sale opens with a
    private purchase link.
  </p>

  <!-- CTA Button -->
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin:0 0 24px;">
  <tr><td align="center">
    <table role="presentation" cellpadding="0" cellspacing="0">
    <tr><td style="background-color:#E09028;border-radius:6px;">
      <a href="${escapeHtml(verifyUrl)}" target="_blank" rel="noopener noreferrer"
         style="display:inline-block;padding:14px 36px;font-size:15px;font-weight:600;color:#0C0E13;text-decoration:none;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;letter-spacing:0.01em;">
        Verify my email &rarr;
      </a>
    </td></tr>
    </table>
  </td></tr>
  </table>

  <!-- Divider -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 20px;">
  <tr><td style="border-top:1px dashed #262B38;"></td></tr>
  </table>

  <!-- Ref code -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
  <tr>
    <td style="font-size:11px;color:#6C7283;font-family:'Courier New',monospace;letter-spacing:0.06em;">
      Reservation ref
    </td>
    <td style="text-align:right;font-size:13px;color:#D4D8E3;font-family:'Courier New',monospace;letter-spacing:0.04em;font-weight:600;">
      ${escapeHtml(ref)}
    </td>
  </tr>
  </table>

</td></tr>
</table>
</td></tr>
</table>

<!-- ============================================================
     DETAIL STRIP — three pin detail shots
     ============================================================ -->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">
<tr><td style="padding:20px 24px 0;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
<tr>
  <td width="33%" style="padding:0 4px 0 0;">
    <img src="${IMG_BASE}/detail-1.png" alt="Filigree detail" width="176" style="display:block;width:100%;height:auto;border-radius:6px;border:1px solid #1C2029;" />
  </td>
  <td width="33%" style="padding:0 2px;">
    <img src="${IMG_BASE}/detail-2.png" alt="Front detail" width="176" style="display:block;width:100%;height:auto;border-radius:6px;border:1px solid #1C2029;" />
  </td>
  <td width="33%" style="padding:0 0 0 4px;">
    <img src="${IMG_BASE}/detail-3.png" alt="Reverse detail" width="176" style="display:block;width:100%;height:auto;border-radius:6px;border:1px solid #1C2029;" />
  </td>
</tr>
<tr><td colspan="3" style="padding:8px 0 0;text-align:center;">
  <p style="margin:0;font-size:10px;text-transform:uppercase;letter-spacing:0.16em;color:#6C7283;font-family:'Courier New',monospace;">Filigree &middot; Front &middot; Reverse</p>
</td></tr>
</table>
</td></tr>
</table>

<!-- ============================================================
     FALLBACK LINK
     ============================================================ -->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">
<tr><td style="padding:20px 28px 0;text-align:center;">
  <p style="margin:0;font-size:11px;color:#6C7283;line-height:1.6;">
    If the button doesn't work, paste this URL into your browser:<br/>
    <a href="${escapeHtml(verifyUrl)}" style="color:#E09028;text-decoration:underline;word-break:break-all;font-size:11px;">${escapeHtml(verifyUrl)}</a>
  </p>
</td></tr>
</table>

<!-- ============================================================
     FOOTER
     ============================================================ -->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">
<tr><td style="padding:28px 32px 12px;text-align:center;">
  <img src="${IMG_BASE}/brought-to-you-by.png" alt="Brought to you by CineConcerts" width="160" style="display:inline-block;height:auto;max-width:160px;opacity:0.6;" />
</td></tr>
<tr><td style="padding:0 32px 36px;text-align:center;">
  <p style="margin:0;font-size:10px;color:#4A4F5C;line-height:1.6;">
    You're receiving this because you signed up at the Harry Potter Film Concert Series collector's pin page.
    If this wasn't you, you can safely ignore this email.<br/>
    &copy; &amp; &trade; WBEI. (s26)
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
