import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Oversubscribed Scorecard | Daniel Priestley",
  description:
    "Are customers chasing you — or are you chasing them? Take the 2-minute Oversubscribed Scorecard and get your personalised demand-engine diagnosis.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800&family=Nunito:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
