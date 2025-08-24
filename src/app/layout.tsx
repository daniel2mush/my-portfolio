import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Themes from "@/lib/theme/theme";
import FooterPage from "@/components/appComponent/footer";
import NavWrapper from "@/components/appComponent/navigation/NavbarWrapper";

const PoppinsSans = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700"], // Regular, SemiBold, Bold
});

export const metadata: Metadata = {
  title: "Zcoder | Freelance Developer & Designer",
  description:
    "Welcome to Zcoder's homepage—where code meets creativity. Zcoder is a freelance full-stack developer and graphic designer specializing in scalable web solutions, visual branding, and civic-friendly design.",
  authors: [{ name: "Zcoder", url: "zcoder@example.com" }],
  creator: "Zcoder",
  publisher: "Zcoder",
  metadataBase: new URL("https://zcoder.dev"),
  alternates: {
    canonical: "https://zcoder.dev",
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
        <Themes defaultTheme="dark">
          <NavWrapper>
            {children}
            <FooterPage />
          </NavWrapper>
        </Themes>
      </body>
    </html>
  );
}
