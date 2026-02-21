"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { scrollToSection } from "@/components/appComponent/scroll";
import styles from "./Navigation.module.scss";
import { FiMenu, FiX } from "react-icons/fi";
import { Home } from "lucide-react"; // Kept your lucide import for the fallback navs

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
      <header className={`${styles.header} ${styles.scrolled}`}>
        <div className={styles.navContainer}>
          <Link href="/" className={styles.backLink}>
            <Home size={20} />
            <span>Return Home</span>
          </Link>
          <span className={styles.pageTitle}>
            {pathName === "/resume" ? "My Resume" : "All Projects"}
          </span>
        </div>
      </header>
    );
  }

  return (
    <header
      className={`${styles.header} ${isScrolling ? styles.scrolled : ""}`}
    >
      {/* Scroll Progress Bar - Now properly wired up! */}
      <div
        className={styles.progressBar}
        style={{ width: `${scrollProgress}%` }}
      />

      <div className={styles.navContainer}>
        {/* Logo */}
        <Link href="/" className={styles.logoContainer}>
          <Image
            className={styles.logo}
            src="/logo.png"
            alt="Daniel Logo"
            fill
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav}>
          {navSections.map((n) => {
            const isResume = n.name === "Resume";
            const isActive = activeSection === n.link;

            return isResume ? (
              <Link className={styles.resumeButton} key={n.name} href={n.link}>
                {n.name}
              </Link>
            ) : (
              <button
                className={`${styles.navButton} ${isActive ? styles.activeNavLink : ""}`}
                key={n.name}
                onClick={() => scrollToSection(n.link)}
              >
                {n.name}
              </button>
            );
          })}
        </nav>

        {/* Mobile Menu Toggle Button */}
        <button
          className={styles.menuToggleButton}
          onClick={() => setMenuOpen(true)}
          aria-label="Open Menu"
        >
          <FiMenu size={28} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`}
      >
        <button
          className={styles.closeButton}
          onClick={() => setMenuOpen(false)}
          aria-label="Close Menu"
        >
          <FiX size={32} />
        </button>

        <nav className={styles.mobileNavLinks}>
          {navSections.map((n) => {
            const isResume = n.name === "Resume";
            const isActive = activeSection === n.link;

            return isResume ? (
              <Link
                className={styles.resumeButtonMobile}
                key={n.name}
                href={n.link}
                onClick={() => setMenuOpen(false)}
              >
                {n.name}
              </Link>
            ) : (
              <button
                className={`${styles.navButtonMobile} ${isActive ? styles.activeNavLinkMobile : ""}`}
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
