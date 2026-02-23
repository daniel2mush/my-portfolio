import type { Metadata } from "next";
import { Inter } from "next/font/google";

// Import your global SCSS where your CSS variables live
import "@/styles/globals.scss";
import Providers from "@/lib/query/provider";
import NavBar from "@/components/Navigation/Navigation";
import Footer from "@/components/Home/Footer/Footer";

// Next.js Font Optimization
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-family", // Maps perfectly to your SCSS variables!
});

export const metadata: Metadata = {
  // Replace this with your actual domain later if you buy a custom one!
  metadataBase: new URL("https://zcoderportfolio.vercel.app"),

  title: {
    default: "Daniel Ogbeide | Graphic Designer & Full-Stack Developer",
    // This template automatically formats child pages (e.g., "Projects | Daniel Ogbeide")
    template: "%s | Daniel Ogbeide",
  },

  description:
    "Portfolio of Daniel Ogbeide, showcasing a fusion of high-end graphic design and robust full-stack web development. Specializing in UI/UX, Next.js, and print media.",

  keywords: [
    "Daniel Ogbeide",
    "Graphic Designer",
    "Web Developer",
    "Full-Stack Developer",
    "UI/UX Design",
    "Next.js",
    "React",
    "SCSS",
    "Print Production",
    "Bamako Web Development",
    "Creative Developer",
  ],

  authors: [{ name: "Daniel Ogbeide" }],
  creator: "Daniel Ogbeide",

  // Controls how your site looks when shared on LinkedIn, Facebook, iMessage, etc.
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://zcoderportfolio.vercel.app",
    title: "Daniel Ogbeide | Graphic Designer & Web Developer",
    description:
      "Explore the portfolio of Daniel Ogbeide. Blending premium graphic design with modern full-stack web development.",
    siteName: "Daniel Ogbeide Portfolio",
    images: [
      {
        // You will need to add a cool 1200x630 image to your public folder!
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Daniel Ogbeide Portfolio Preview",
      },
    ],
  },

  // Controls how your site looks when shared on Twitter/X
  twitter: {
    card: "summary_large_image",
    title: "Daniel Ogbeide | Graphic Designer & Web Developer",
    description:
      "Explore the portfolio of Daniel Ogbeide. Blending premium graphic design with modern full-stack web development.",
    images: ["/og-image.jpg"],
  },

  // Tells Google it is safe to index and follow the links on your site
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
        <Providers>
          <NavBar />
          {children}
        </Providers>
        <Footer />
      </body>
    </html>
  );
}
