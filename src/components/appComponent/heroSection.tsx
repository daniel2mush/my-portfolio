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
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0">
        <Image
          src="/hero.png"
          alt="Hero background"
          fill
          className="object-cover opacity-70"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/90 z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(var(--primary-rgb),0.25),transparent_60%)] animate-pulse" />
      </motion.div>

      <div className="absolute inset-0 z-20 flex flex-col justify-center items-center px-6 md:px-12 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight">
          Hey, I&apos;m <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 text-5xl sm:text-6xl md:text-8xl font-black">
            Daniel Freeman
          </span>
        </motion.h1>

        <AnimatePresence mode="wait">
          <motion.div
            key={roles[currentRole].label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="mt-6 px-6 py-3 rounded-full bg-primary/10 backdrop-blur-md text-primary font-semibold flex items-center gap-3 border border-primary/20">
            <span className="text-xl">{roles[currentRole].icon}</span>
            <span className="text-lg">{roles[currentRole].label}</span>
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          className="mt-10 flex gap-4 flex-wrap justify-center">
          <button
            onClick={() => scrollToSection("#projects")}
            className="group flex items-center gap-2 bg-gradient-to-r from-primary to-primary/80 text-background font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300">
            <Hammer size={20} className="group-hover:animate-bounce" />
            View My Work
          </button>
          <button
            onClick={() => scrollToSection("#contact")}
            className="group flex items-center gap-2 border-2 border-primary text-primary font-bold py-3 px-6 rounded-lg hover:bg-primary hover:text-background hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300">
            <Mail size={20} className="group-hover:animate-pulse" />
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
          className="mt-12 flex gap-6">
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
              className="p-3 rounded-full bg-background/20 backdrop-blur-lg border border-primary/30 text-primary hover:text-background hover:bg-primary/90 transition-all duration-300 shadow hover:shadow-lg">
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
          className="absolute bottom-8 md:bottom-12">
          <button
            onClick={() => scrollToSection("#about")}
            className="text-primary animate-bounce">
            <ArrowDown size={32} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
