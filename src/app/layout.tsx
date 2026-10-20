import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/data/site";
import { VisitorTracker } from "@/components/telemetry/VisitorTracker";
import { LivePitWallRadar } from "@/components/telemetry/LivePitWallRadar";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  publisher: siteConfig.author,
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#000000] text-[#f8fafc] antialiased selection:bg-[#ff003f] selection:text-white">
        <VisitorTracker />
        <LivePitWallRadar />
        {children}
      </body>
    </html>
  );
}
