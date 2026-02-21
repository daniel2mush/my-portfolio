"use client";

import { useState, useEffect } from "react";
// framer-motion removed — using plain HTML
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Hamburger, Home, MenuIcon } from "lucide-react";
import { scrollToSection } from "@/components/appComponent/scroll";
import styles from "./Navigation.module.scss";
import { useMediaQuery } from "react-responsive";
import { FiMenu } from "react-icons/fi";

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
  const navbarHeight = 64;

  const isMobile = useMediaQuery({ maxWidth: 768 });
  useEffect(() => {
    setMounted(true); // Only render route-based conditionals after mount
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      const scrollPos = window.scrollY + navbarHeight + 20;

      navSections.forEach((section) => {
        if (!section.link.startsWith("#")) return;
        const el = document.querySelector(section.link);
        if (el) {
          const htmlEl = el as HTMLElement;
          const top = htmlEl.offsetTop;
          const bottom = top + htmlEl.clientHeight;
          if (scrollPos >= top && scrollPos < bottom) {
            setActiveSection(section.link);
          }
        }
      });

      setIsScrolling(window.scrollY > 50);

      const progress =
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
        100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mounted]);

  if (pathName === "/resume") {
    return (
      <nav>
        <div>
          <Link href="/">
            <Home />
            Return Home
          </Link>
          <span>My Resume</span>
        </div>
      </nav>
    );
  }

  if (pathName === "/projects")
    return (
      <nav>
        <div>
          <Link href="/">
            <Home />
            Return Home
          </Link>
          <span>All Projects</span>
        </div>
      </nav>
    );

  return (
    <header className={styles.header}>
      <div className={styles.progressBar} />

      <div className={styles.navContainer}>
        <Link href={"/"} className={styles.logoContainer}>
          <Image
            className={styles.logo}
            src="/logo.png"
            alt="logo"
            fill
            priority
          />
        </Link>

        <nav className={styles.navLinks}>
          {!isMobile &&
            navSections.map((n) => {
              const isResume = n.name === "Resume";
              return isResume ? (
                <Link
                  className={styles.resumeButton}
                  key={n.name}
                  href={n.link}
                >
                  {n.name}
                </Link>
              ) : (
                <button
                  className={styles.navButton}
                  key={n.name}
                  onClick={() => scrollToSection(n.link)}
                >
                  {n.name}
                </button>
              );
            })}
        </nav>
      </div>
      {/* Mobile Menu Toggle*/}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.cancelButtonMobile}>
            <button
              className={styles.cancelIcon}
              onClick={() => setMenuOpen(false)}
            >
              <div>
                <div className={styles.cancelIconLine1} />
                <div className={styles.cancelIconLine2} />
              </div>
            </button>
          </div>
          {navSections.map((n) => {
            const isResume = n.name === "Resume";
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
                className={styles.navButtonMobile}
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
        </div>
      )}

      {isMobile && (
        <button
          className={styles.menuButton}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FiMenu size={24} />
        </button>
      )}
    </header>
  );
}
