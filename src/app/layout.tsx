import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Use same font for headings
const headingFont = inter;

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://hspace.vercel.app"),
  title: {
    default: "Rizkan Harin | IoT & AI Engineer",
    template: "%s | Rizkan Harin",
  },
  description:
    "Personal portfolio of an IoT & AI Engineer showcasing projects, technologies, and engineering work.",
  keywords: [
    "IoT Engineer",
    "AI Engineer",
    "Embedded Systems",
    "Automation",
    "Portfolio",
    "Rizkan Harin",
  ],
  openGraph: {
    title: "Rizkan Harin | IoT & AI Engineer",
    description:
      "Personal portfolio of an IoT & AI Engineer showcasing projects, technologies, and engineering work.",
    type: "website",
    siteName: "Rizkan Harin Portfolio",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rizkan Harin | IoT & AI Engineer",
    description:
      "Personal portfolio of an IoT & AI Engineer showcasing projects, technologies, and engineering work.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${headingFont.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
