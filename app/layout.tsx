import type { Metadata } from "next";
import { Anton, IBM_Plex_Mono, Instrument_Sans } from "next/font/google";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-plex-mono",
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BoomTap — From mouth to music",
  description:
    "Beatbox four bars into your phone. Thirty seconds later it's a produced track — same pattern, same timing, same accents. BoomTap turns voice memos into finished music.",
  openGraph: {
    title: "BoomTap — From mouth to music",
    description:
      "Beatbox it. Hum it. BoomTap keeps your exact groove and hands you a finished track.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${plexMono.variable} ${instrumentSans.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
