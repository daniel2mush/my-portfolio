import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Themes from "@/lib/theme/theme";
import FooterPage from "@/components/appComponent/footer";
import NavBar from "@/components/appComponent/navigation/DesktopNav";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "@/lib/query/provider";
import { Analytics } from "@vercel/analytics/next";

const PoppinsSans = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700"], // Regular, SemiBold, Bold
});

export const metadata: Metadata = {
  title: "ZCoder Portfolio | Full‑stack Developer & Designer",
  description:
    "Portfolio of Daniel Freeman (ZCoder): full‑stack development and design for accessible, civic‑minded web experiences in West Africa.",
  keywords: [
    "ZCoder",
    "Daniel Freeman",
    "portfolio",
    "full-stack developer",
    "designer",
    "civic tech",
    "accessibility",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Framer Motion",
    "Cloudinary",
    "West Africa",
    "Mali",
    "Nigeria",
  ],
  authors: [{ name: "Daniel Freeman", url: "mailto:daniel2mush@gmail.com" }],
  creator: "Daniel Freeman",
  publisher: "Daniel Freeman",
  metadataBase: new URL("https://zcoderportfolio.vercel.app"),
  alternates: {
    canonical: "https://zcoderportfolio.vercel.app",
  },
  openGraph: {
    title: "ZCoder Portfolio | Full‑stack Developer & Designer",
    description:
      "Explore projects, case studies, and design systems for African creatives — modular, animated, and accessible.",
    url: "https://zcoderportfolio.vercel.app",
    siteName: "ZCoder",
    // images: [
    //   {
    //     url: "https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/f_auto,q_auto,c_fill,w_1200,h_630/vXYZ/og-zcoder.jpg",
    //     width: 1200,
    //     height: 630,
    //     alt: "ZCoder portfolio preview",
    //   },
    // ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZCoder Portfolio | Full‑stack Developer & Designer",
    description:
      "Civic‑minded, accessible web experiences for African creatives — crafted by Daniel Freeman (ZCoder).",
    // images: [
    //   "https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/f_auto,q_auto,c_fill,w_1200,h_630/vXYZ/og-zcoder.jpg",
    // ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${PoppinsSans.variable}  antialiased scroll-smooth transition-all duration-300 ease-in-out`}>
        <Providers>
          <Themes defaultTheme="dark">
            <Analytics />
            <NavBar />
            {children}
            <FooterPage />
          </Themes>
          <Toaster richColors />
        </Providers>
      </body>
    </html>
  );
}
