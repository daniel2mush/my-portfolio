"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { scrollToSection } from "../scroll";
import Hamburger from "../utils/hamburger";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home } from "lucide-react";

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
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 left-0 w-full bg-background/80 backdrop-blur-md shadow-md z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link
            href="/"
            className="text-primary flex items-center gap-4 font-semibold hover:underline">
            <Home />
            Return Home
          </Link>
          <span className="font-bold text-lg">My Resume</span>
        </div>
      </motion.nav>
    );
  }

  if (pathName === "/projects")
    return (
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 left-0 w-full bg-background/80 backdrop-blur-md shadow-md z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link
            href="/"
            className="text-primary flex items-center gap-4 font-semibold hover:underline">
            <Home />
            Return Home
          </Link>
          <span className="font-bold text-lg">All Projects</span>
        </div>
      </motion.nav>
    );

  if (pathName === "/")
    return (
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolling
            ? "bg-background/50 backdrop-blur-xl shadow-lg border-b border-primary/10"
            : ""
        }`}>
        {/* Scroll Progress Bar */}
        <motion.div
          className="absolute top-0 left-0 h-1 bg-primary origin-left"
          style={{ width: `${scrollProgress}%` }}
        />

        <div className="max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative h-10 w-20">
            <Image
              src="/logo.png"
              alt="logo"
              fill
              priority
              className="object-contain invert"
            />
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 relative">
            {navSections.map((n) => {
              const isResume = n.name === "Resume";
              const isActive = activeSection === n.link;
              return isResume ? (
                <motion.a
                  key={n.name}
                  href={n.link}
                  whileHover={{ scale: 1.1 }}
                  className={`px-3 py-1 rounded-md font-semibold ${
                    isActive ? "text-primary bg-primary/10" : "text-white"
                  } border border-primary/20 hover:bg-primary hover:text-background transition-all`}>
                  {n.name}
                </motion.a>
              ) : (
                <motion.button
                  key={n.name}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => scrollToSection(n.link)}
                  className={`font-semibold relative pb-1 transition-colors ${
                    isActive ? "text-primary" : "text-white"
                  }`}>
                  {n.name}
                  {isActive && (
                    <motion.span
                      layoutId="underline"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                      className="absolute -bottom-0.5 left-0 w-full h-[2px] bg-primary rounded-full"
                    />
                  )}
                </motion.button>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Hamburger open={menuOpen} onClick={() => setMenuOpen(!menuOpen)} />
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="md:hidden absolute top-16 left-1/2 -translate-x-1/2 w-[80%] rounded-lg bg-background/95 backdrop-blur-xl border border-primary/10 shadow-lg flex flex-col items-center gap-5 py-6">
              {navSections.map((n) => {
                const isResume = n.name === "Resume";
                return isResume ? (
                  <Link
                    key={n.name}
                    href={n.link}
                    onClick={() => setMenuOpen(false)}
                    className="w-full text-center py-2 font-semibold border rounded-md bg-primary text-background hover:brightness-110">
                    {n.name}
                  </Link>
                ) : (
                  <button
                    key={n.name}
                    onClick={() => {
                      scrollToSection(n.link, navbarHeight);
                      setMenuOpen(false);
                    }}
                    className={`font-semibold ${
                      activeSection === n.link ? "text-primary" : "text-white"
                    }`}>
                    {n.name}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    );
}
