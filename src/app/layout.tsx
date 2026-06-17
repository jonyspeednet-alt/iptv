import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StreamVault TV - Modern IPTV Player",
  description: "Watch live TV channels from Bangladesh, India, Sports, Music, and more. Modern IPTV player with M3U import, PiP, favorites, and keyboard shortcuts.",
  keywords: ["IPTV", "Live TV", "Bangla TV", "Bangladesh", "Sports", "Streaming", "HLS"],
  authors: [{ name: "StreamVault TV" }],
  manifest: "/manifest.json",
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "StreamVault TV",
    description: "Modern IPTV Player - Live TV from Bangladesh, India & more",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
