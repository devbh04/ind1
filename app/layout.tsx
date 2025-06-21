import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"

const geistSans = Work_Sans({
  weight: '400',
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CodeVibe",
  description: "CodeVibe- Leetcode Killer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script defer src="https://cloud.umami.is/script.js" data-website-id="5179aa5d-92b8-452a-82ef-291c9c806a27"></script>
      </head>
      <body
        className={`${geistSans.className} h-screen text-black bg-slate-100`}
      >
        <Toaster />
        {children}
      </body>
    </html>
  );
}