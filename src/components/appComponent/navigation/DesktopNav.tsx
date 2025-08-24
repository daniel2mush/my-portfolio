"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { scrollToSection } from "../scroll";
import { FiMenu, FiX } from "react-icons/fi";

const navSections = [
  { name: "Home", link: "#home" },
  { name: "About", link: "#about" },
  { name: "Skills", link: "#skills" },
  { name: "Projects", link: "#projects" },
  { name: "Contact", link: "#contact" },
  { name: "Resume", link: "#resume" },
];

const containerVariants = {
  hidden: { opacity: 0, y: -100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delayChildren: 0.3, staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0 },
};

export default function NavBar() {
  const [activeSection, setActiveSection] = useState("#home");
  const [isScrolling, setIsScrolling] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navbarHeight = 64; // adjust for offset

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + navbarHeight + 20;

      navSections.forEach((section) => {
        const el = document.querySelector(section.link);
        if (el) {
          const htmlEl = el as HTMLElement; // cast to HTMLElement
          const top = htmlEl.offsetTop;
          const bottom = top + htmlEl.clientHeight;

          if (scrollPos >= top && scrollPos < bottom) {
            setActiveSection(section.link);
          }
        }
      });

      setIsScrolling(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`fixed top-0 w-full z-50 flex justify-center items-center py-2 transition-all duration-300 ${
        isScrolling ? "bg-black/70 backdrop-blur-xl ring-1 ring-primary/10" : ""
      }`}>
      <div className="w-full max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center">
        <div className="relative h-10 w-20 bg-red">
          <Image
            src="/logo.png"
            alt="logo"
            fill
            priority
            className="object-contain invert"
          />
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6">
          {navSections.map((n) => {
            const isResume = n.name === "Resume";
            return (
              <motion.button
                key={n.name}
                variants={itemVariants}
                onClick={() => scrollToSection(n.link)}
                className={`font-semibold text-sm transition-all duration-300 ${
                  activeSection === n.link ? "text-primary" : "text-white"
                } ${
                  isResume
                    ? "border py-1 px-2 bg-background rounded hover:bg-primary hover:text-white"
                    : ""
                }`}>
                {n.name}
              </motion.button>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-16 left-0 w-full bg-black/90 backdrop-blur-xl flex flex-col items-center gap-6 py-6 md:hidden">
          {navSections.map((n) => {
            const isResume = n.name === "Resume";
            return (
              <button
                key={n.name}
                onClick={() => {
                  scrollToSection(n.link, navbarHeight);
                  setMenuOpen(false);
                }}
                className={`font-semibold text-lg transition-all duration-300 ${
                  activeSection === n.link ? "text-primary" : "text-white"
                } ${
                  isResume
                    ? "border py-1 px-2 bg-background rounded hover:bg-primary hover:text-white"
                    : ""
                }`}>
                {n.name}
              </button>
            );
          })}
        </motion.div>
      )}
    </motion.div>
  );
}
