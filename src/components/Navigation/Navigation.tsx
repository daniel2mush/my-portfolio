"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { scrollToSection } from "@/components/appComponent/scroll";
import { Menu, X, Home, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function NavBar() {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState("#home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const navbarHeight = 80;

  const navLinks = [
    { name: t.nav.home, link: "#home" },
    { name: t.nav.about, link: "#about" },
    { name: t.nav.skills, link: "#skills" },
    { name: t.nav.projects, link: "#projects" },
    { name: t.nav.contact, link: "#contact" },
  ];

  // 1. Lock body scroll when mobile menu is open (Fixes the "goes up" bug)
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // 2. Handle scroll events (Progress, Glassmorphism, Scroll Spy)
  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      // Progress
      const totalScroll = window.scrollY;
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = windowHeight > 0 ? (totalScroll / windowHeight) * 100 : 0;
      setScrollProgress(progress);

      // Glassmorphism
      setIsScrolled(window.scrollY > 20);

      // Scroll Spy (only on homepage)
      if (pathname === "/") {
        const scrollPos = window.scrollY + navbarHeight + 100;
        const sections = ["#home", "#about", "#skills", "#projects", "#contact"];

        for (const sectionId of sections) {
          const el = document.querySelector(sectionId) as HTMLElement | null;
          if (el) {
            const top = el.offsetTop;
            const bottom = top + el.offsetHeight;
            if (scrollPos >= top && scrollPos < bottom) {
              setActiveSection(sectionId);
              break;
            }
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname, navbarHeight]);

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <header className="fixed left-0 top-0 z-[1000] flex h-20 w-full items-center border-b border-transparent bg-transparent">
        <div className="mx-auto flex h-full w-full max-w-[1400px] items-center justify-between px-6 md:px-10">
          <div className="h-10 w-[120px]" />
        </div>
      </header>
    );
  }

  // Hide on auth/admin
  if (pathname === "/auth" || pathname === "/admin") return null;

  // Sub-page navigation (Resume / Projects)
  if (pathname === "/resume" || pathname === "/projects") {
    return (
      <header className="fixed left-0 top-0 z-[1000] flex h-20 w-full items-center border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-full w-full max-w-[1400px] items-center justify-between px-6 md:px-10">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-2 text-sm font-medium text-foreground transition-all hover:border-primary/50 hover:bg-primary/5"
          >
            <Home size={16} className="transition-transform group-hover:-translate-x-0.5" />
            <span>Return Home</span>
          </Link>

          <LanguageSwitcher />
        </div>
      </header>
    );
  }

  return (
    <>
      <header
        className={cn(
          "fixed left-0 top-0 z-[1000] flex h-20 w-full items-center transition-all duration-300",
          isScrolled
            ? "h-[70px] border-b border-border/50 bg-background/80 shadow-lg shadow-black/5 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        {/* Scroll Progress Bar */}
        <div
          className="absolute left-0 top-0 z-[1001] h-[2px] bg-gradient-to-r from-primary to-primary/50 shadow-[0_0_10px_var(--primary)] transition-[width] duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />

        <div className="mx-auto flex h-full w-full max-w-[1400px] items-center justify-between px-6 md:px-10">
          {/* Logo */}
          <Link href="/" className="relative h-10 w-[120px] shrink-0">
            <Image
              className="object-contain invert dark:invert"
              src="/logo.png"
              alt="Daniel Ogbeide Logo"
              fill
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((n) => {
              const isActive = activeSection === n.link;
              return (
                <button
                  key={n.name}
                  onClick={() => scrollToSection(n.link, navbarHeight)}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {n.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-4 md:flex">
            <LanguageSwitcher />
            <Link
              href="/resume"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
            >
              {t.nav.resume}
              <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-3 md:hidden">
            <LanguageSwitcher />
            <button
              className="flex size-10 items-center justify-center rounded-full border border-border bg-card/50 text-foreground transition-colors hover:bg-muted"
              onClick={() => setMenuOpen(true)}
              aria-label="Open Menu"
              aria-expanded={menuOpen}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[2000] flex flex-col bg-background/95 backdrop-blur-2xl transition-all duration-300 md:hidden",
          menuOpen ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"
        )}
        aria-hidden={!menuOpen}
      >
        {/* Mobile Header */}
        <div className="flex h-20 items-center justify-between px-6">
          <Link href="/" className="relative h-8 w-[100px]" onClick={() => setMenuOpen(false)}>
            <Image
              className="object-contain invert dark:invert"
              src="/logo.png"
              alt="Daniel Ogbeide Logo"
              fill
              priority
            />
          </Link>
          <button
            className="flex size-10 items-center justify-center rounded-full border border-border bg-card/50 text-foreground transition-all hover:bg-muted hover:rotate-90"
            onClick={() => setMenuOpen(false)}
            aria-label="Close Menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Mobile Nav Links */}
        <nav className="flex flex-1 flex-col items-center justify-center gap-2 px-6">
          {navLinks.map((n, i) => {
            const isActive = activeSection === n.link;
            return (
              <button
                key={n.name}
                className={cn(
                  "w-full rounded-xl px-6 py-4 text-center text-2xl font-semibold transition-all duration-300",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-muted/50"
                )}
                style={{
                  transitionDelay: menuOpen ? `${i * 50}ms` : "0ms",
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? "translateY(0)" : "translateY(20px)"
                }}
                onClick={() => {
                  scrollToSection(n.link, navbarHeight);
                  setMenuOpen(false);
                }}
              >
                {n.name}
              </button>
            );
          })}

          <Link
            href="/resume"
            className="mt-4 w-full rounded-xl bg-primary px-6 py-4 text-center text-2xl font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300"
            style={{
              transitionDelay: menuOpen ? `${navLinks.length * 50}ms` : "0ms",
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateY(0)" : "translateY(20px)"
            }}
            onClick={() => setMenuOpen(false)}
          >
            {t.nav.resume}
          </Link>
        </nav>
      </div>
    </>
  );
}