import type { Metadata } from "next";
import { Inter } from "next/font/google";

// Import your global SCSS where your CSS variables live
import "@/styles/globals.scss";
import Providers from "@/lib/query/provider";

// Next.js Font Optimization
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-family", // Maps perfectly to your SCSS variables!
});

export const metadata: Metadata = {
  title: "Daniel Ogbeide | Graphic Designer & Web Developer",
  description:
    "Portfolio showcasing high-end graphic design and full-stack web development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      {/* Applying a base class to the body ensures the background color 
        and text rendering are locked in before any components load.
      */}
      <body className="antialiased selection-bg">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
