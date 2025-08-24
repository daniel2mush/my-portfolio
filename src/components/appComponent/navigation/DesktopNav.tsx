"use client";

import { useEffect, useState } from "react";
import { scrollToSection } from "../scroll";
import { motion } from "framer-motion";

const navSection = [
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
    transition: {
      duration: 0.5,
      delayChildren: 0.3,
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0 },
};

export default function NavBar() {
  const [position] = useState(50);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const scrollListener = () => {
      const currentScroll = window.scrollY;
      setIsScrolling(currentScroll > position);
    };

    window.addEventListener("scroll", scrollListener);
    scrollListener();

    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, [position]);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`w-full fixed top-0 h-16 z-50 ${
        isScrolling && "bg-black/720 backdrop-blur-3xl ring-1 ring-primary/10"
      }`}>
      <div className="w-full max-w-7xl mx-auto">
        <div className="px-10 py-5 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-primary">ZCoder</h1>
          <nav>
            <motion.ul
              className="flex items-center justify-center gap-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible">
              {navSection.map((n) => {
                const isResume = n.name === "Resume";
                return (
                  <motion.li
                    key={n.name}
                    variants={itemVariants}
                    className="list-none">
                    <button
                      onClick={() => scrollToSection(n.link)}
                      className={`font-semibold hover:text-primary text-sm ${
                        isResume &&
                        "border py-1 px-2 bg-background text-white rounded hover:bg-primary hover:text-white"
                      }`}>
                      {n.name}
                    </button>
                  </motion.li>
                );
              })}
            </motion.ul>
          </nav>
        </div>
      </div>
    </motion.div>
  );
}
