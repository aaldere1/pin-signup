import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Boy Who Lived — Collector's Pin · Join the list",
  description:
    "A 925 silver collector's pin from the Harry Potter Film Concert Series — limited edition of 500. Sign up for first access.",
  openGraph: {
    title: "Harry Potter Collector's Pin — Join the List",
    description:
      "925 sterling silver, limited to 500 pieces. Sign up for early access before the Sept 1, 2026 release.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/mtl1idj.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
