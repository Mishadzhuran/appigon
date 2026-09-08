import type { Metadata } from "next";
import { Anton, DM_Sans, JetBrains_Mono } from "next/font/google";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { PageLoader } from "@/components/layout/PageLoader";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import "./globals.css";

const display = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const body = DM_Sans({
  variable: "--font-dm",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: "Appigon — Apps. Built to dominate.",
    template: "%s · Appigon",
  },
  description:
    "Appigon develops mobile apps, landing pages, and full App Store & Google Play release support — plus ongoing product success after launch.",
  openGraph: {
    title: "Appigon — Apps. Built to dominate.",
    description:
      "App development, landings, store release, and ongoing support. Dark. Fast. Market-ready.",
    type: "website",
    siteName: "Appigon",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full font-body text-text">
        <SmoothScroll>
          <PageLoader />
          <CustomCursor />
          <div className="grain" aria-hidden />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
