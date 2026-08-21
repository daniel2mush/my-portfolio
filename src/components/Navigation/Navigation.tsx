"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { scrollToSection } from "@/components/appComponent/scroll";
import { FiMenu, FiX } from "react-icons/fi";
import { Home } from "lucide-react";
import { cn } from "@/lib/utils";

const navSections = [
  { name: "Home", link: "#home" },
  { name: "About", link: "#about" },
  { name: "Skills", link: "#skills" },
  { name: "Projects", link: "#projects" },
  { name: "Contact", link: "#contact" },
  { name: "Resume", link: "/resume" },
];

export default function NavBar() {
  const [activeSection, setActiveSection] = useState("#home");
  const [isScrolling, setIsScrolling] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  const pathName = usePathname();
  const navbarHeight = 80; // Adjusted for a slightly taller, premium nav

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      // 1. Handle Scroll Progress
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const progress = `${(totalScroll / windowHeight) * 100}%`;
      setScrollProgress(parseFloat(progress));

      // 2. Handle Glassmorphism state
      setIsScrolling(window.scrollY > 50);

      // 3. Handle Scroll Spy (Active Section)
      const scrollPos = window.scrollY + navbarHeight + 50;
      navSections.forEach((section) => {
        if (!section.link.startsWith("#")) return;
        const el = document.querySelector(section.link) as HTMLElement;
        if (el) {
          const top = el.offsetTop;
          const bottom = top + el.offsetHeight;
          if (scrollPos >= top && scrollPos < bottom) {
            setActiveSection(section.link);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Trigger once on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent hydration mismatch by not rendering complex UI until mounted
  if (!mounted) return null;

  if (pathName === "/auth" || pathName === "/admin") return;

  // Simplified sub-page navigations (Resume / Projects)
  if (pathName === "/resume" || pathName === "/projects") {
    return (
      <header className="fixed left-0 top-0 z-[1000] flex h-[70px] w-full items-center border-b border-white/5 bg-background/85 shadow-[0_4px_30px_rgba(0,0,0,0.2)] backdrop-blur-xl transition-all duration-300">
        <div className="mx-auto flex h-full w-full max-w-[1400px] items-center justify-between px-6 md:px-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-medium text-text-secondary transition-colors hover:text-foreground"
          >
            <Home size={20} />
            <span>Return Home</span>
          </Link>
          <span className="text-lg font-bold text-foreground">
            {pathName === "/resume" ? "My Resume" : "All Projects"}
          </span>
        </div>
      </header>
    );
  }

  return (
    <header
      className={cn(
        "fixed left-0 top-0 z-[1000] flex h-20 w-full items-center border-b border-transparent bg-transparent transition-all duration-300",
        isScrolling &&
          "h-[70px] border-white/5 bg-background/85 shadow-[0_4px_30px_rgba(0,0,0,0.2)] backdrop-blur-xl",
      )}
    >
      <div
        className="absolute left-0 top-0 z-[1001] h-[3px] bg-primary shadow-[0_0_12px_rgba(242,242,242,0.8)] transition-[width] duration-100"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="mx-auto flex h-full w-full max-w-[1400px] items-center justify-between px-6 md:px-10">
        <Link href="/" className="relative h-10 w-[120px]">
          <Image
            className="object-contain invert"
            src="/logo.png"
            alt="Daniel Logo"
            fill
            priority
          />
        </Link>

        <nav className="hidden items-center justify-center gap-8 md:flex">
          {navSections.map((n) => {
            const isResume = n.name === "Resume";
            const isActive = activeSection === n.link;

            return isResume ? (
              <Link
                className="rounded-full border border-white/20 bg-white/5 px-6 py-2.5 text-sm font-bold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-primary-foreground"
                key={n.name}
                href={n.link}
              >
                {n.name}
              </Link>
            ) : (
              <button
                className={cn(
                  "relative py-2 text-sm font-medium text-text-secondary transition-colors after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-primary after:transition-all hover:text-foreground hover:after:w-1/2",
                  isActive && "font-bold text-foreground after:w-full",
                )}
                key={n.name}
                onClick={() => scrollToSection(n.link)}
              >
                {n.name}
              </button>
            );
          })}
        </nav>

        <button
          className="inline-flex items-center justify-center p-2 text-foreground md:hidden"
          onClick={() => setMenuOpen(true)}
          aria-label="Open Menu"
        >
          <FiMenu size={28} />
        </button>
      </div>

      <div
        className={cn(
          "fixed inset-0 z-[2000] flex -translate-y-2 flex-col items-center justify-center bg-background/98 opacity-0 backdrop-blur-2xl transition-all duration-300 pointer-events-none",
          menuOpen && "translate-y-0 opacity-100 pointer-events-auto",
        )}
      >
        <button
          className="absolute right-8 top-8 rounded-full p-2 text-foreground transition-all hover:rotate-90 hover:bg-white/10"
          onClick={() => setMenuOpen(false)}
          aria-label="Close Menu"
        >
          <FiX size={32} />
        </button>

        <nav className="flex flex-col items-center justify-center gap-8">
          {navSections.map((n) => {
            const isResume = n.name === "Resume";
            const isActive = activeSection === n.link;

            return isResume ? (
              <Link
                className="mt-4 rounded-full bg-primary px-8 py-3 text-lg font-bold text-primary-foreground"
                key={n.name}
                href={n.link}
                onClick={() => setMenuOpen(false)}
              >
                {n.name}
              </Link>
            ) : (
              <button
                className={cn(
                  "text-xl font-bold text-text-secondary transition-colors hover:text-foreground",
                  isActive && "text-primary",
                )}
                key={n.name}
                onClick={() => {
                  scrollToSection(n.link, navbarHeight);
                  setMenuOpen(false);
                }}
              >
                {n.name}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
