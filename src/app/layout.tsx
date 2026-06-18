import type { Metadata } from "next";
import { Cormorant_Garamond, Geist } from "next/font/google";
import "./globals.css";

const headingFont = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const bodyFont = Geist({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://hspace.vercel.app"),
  title: {
    default: "Muhammad Rizkan Harin Faza | IoT, Embedded Systems & Research Engineer",
    template: "%s | Muhammad Rizkan Harin Faza",
  },
  description:
    "IoT Engineer, Embedded Systems Engineer, and Research Engineer building environmental monitoring, disaster early warning, telemetry, edge AI, and resilient field-deployed systems.",
  keywords: [
    "IoT Engineer",
    "Embedded Systems Engineer",
    "Research Engineer",
    "AI Systems Developer",
    "Environmental Monitoring",
    "Disaster Early Warning System",
    "Edge AI",
    "Telemetry Systems",
    "IoT Engineer Indonesia",
    "Embedded Systems",
    "Muhammad Rizkan Harin Faza",
  ],
  openGraph: {
    title: "Muhammad Rizkan Harin Faza | IoT, Embedded Systems & Research Engineer",
    description:
      "Field-deployed IoT, embedded systems, environmental monitoring, and disaster resilience engineering.",
    type: "website",
    siteName: "Muhammad Rizkan Harin Faza Portfolio",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Rizkan Harin Faza | IoT, Embedded Systems & Research Engineer",
    description:
      "Engineering portfolio documenting field systems for environmental monitoring and disaster resilience.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable} h-full antialiased`}>
      <body className="min-h-full bg-[var(--bg)] text-[var(--text)]">{children}</body>
    </html>
  );
}
