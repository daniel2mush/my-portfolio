"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowDown,
  Mail,
  Hammer,
  Code2,
  GitBranch,
  ImageIcon,
  Palette,
  Smartphone,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Social } from "./socials";

const roles = [
  { label: "Full-Stack Developer", icon: <Code2 /> },
  { label: "UI/UX Designer", icon: <Palette /> },
  { label: "Graphic Designer", icon: <ImageIcon /> },
  { label: "Open Source Contributor", icon: <GitBranch /> },
  { label: "Mobile App Developer", icon: <Smartphone /> },
];

export default function HeroSection() {
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home">
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <Image src="/hero.png" alt="Hero background" fill priority />
        <div />
        <div />
      </motion.div>

      <div>
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Hey, I&apos;m <br />
          <span>Daniel Freeman</span>
        </motion.h1>

        <AnimatePresence mode="wait">
          <motion.div
            key={roles[currentRole].label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <span>{roles[currentRole].icon}</span>
            <span>{roles[currentRole].label}</span>
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
        >
          <button onClick={() => scrollToSection("#projects")}>
            <Hammer size={20} />
            View My Work
          </button>
          <button onClick={() => scrollToSection("#contact")}>
            <Mail size={20} />
            Contact Me
          </button>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: { staggerChildren: 0.15, delayChildren: 0.6 },
            },
          }}
        >
          {Social.map(({ icon, link }, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: "easeOut" },
                },
              }}
              whileHover={{ scale: 1.15, rotate: 5 }}
            >
              <Link href={link} target="_blank">
                {icon}
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <button onClick={() => scrollToSection("#about")}>
            <ArrowDown size={32} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
