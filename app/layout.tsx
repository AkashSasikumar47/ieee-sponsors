import type { Metadata, Viewport } from "next";
import {
  IBM_Plex_Mono,
  IBM_Plex_Sans,
  IBM_Plex_Sans_Condensed,
} from "next/font/google";
import { Toaster } from "@ieee/ui/components/sonner";
import { MotionProvider } from "@/components/motion/motion-provider";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
});

const plexCondensed = IBM_Plex_Sans_Condensed({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-plex-condensed",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  title: "Sponsors | IEEE SRMIST",
  description: "The IEEE SRMIST sponsor directory, kept by the admins.",
  applicationName: "IEEE SRMIST Sponsors",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${plexSans.className} ${plexSans.variable} ${plexCondensed.variable} ${plexMono.variable}`}
    >
      <body className="flex min-h-dvh flex-col antialiased">
        <MotionProvider>{children}</MotionProvider>
        <Toaster theme="light" position="bottom-center" />
      </body>
    </html>
  );
}
