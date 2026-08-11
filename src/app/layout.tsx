import type { Metadata } from "next";
import { Geist_Mono, Inter, Instrument_Sans } from "next/font/google";
import "./globals.css";
import { PostHogProvider } from "@/components/PostHogProvider";
import { SmoothScroll } from "@/components/SmoothScroll";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kate Xu - Senior Product Designer & Builder",
  description: "I ask good questions and build things that make people more capable.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistMono.variable} ${inter.variable} ${instrument.variable}`}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className="antialiased">
        <PostHogProvider>
          <SmoothScroll />
          {children}
        </PostHogProvider>
      </body>
    </html>
  );
}
