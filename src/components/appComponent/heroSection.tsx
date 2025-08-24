"use client";

import Image from "next/image";
import { motion, Variants } from "motion/react";
import { ArrowDown } from "lucide-react";
import { Social } from "./socials";
import Link from "next/link";
import { useState, useEffect } from "react";

// const containerVariants: Variants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: { staggerChildren: 0.3, delayChildren: 0.2 },
//   },
// };

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const roles = [
  "Full-Stack Developer",
  "UI/UX Designer",
  "Graphic Designer",
  // "Open Source Contributor",
];

export default function HeroSection() {
  const [currentRole, setCurrentRole] = useState(0);
  const [text, setText] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(roles[currentRole].substring(0, i));
      i++;
      if (i > roles[currentRole].length) {
        setTimeout(() => {
          i = 0;
          setCurrentRole((prev) => (prev + 1) % roles.length);
        }, 1500);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [currentRole]);

  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div id="home" className="relative min-h-screen w-full">
      <Image
        src="/hero.png"
        alt="hero"
        fill
        className="object-cover"
        priority
      />
      <motion.div className="absolute inset-0 bg-background/50 flex flex-col justify-center items-center p-10">
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-5xl md:text-7xl font-bold text-center">
          Hey, I&apos;m <br />
          <span className="text-primary text-6xl md:text-8xl font-black">
            Daniel Freeman
          </span>
        </motion.h1>
        <motion.h3
          variants={fadeUp}
          className="mt-5 text-xl md:text-3xl text-center font-semibold">
          {text}
        </motion.h3>
        <motion.div variants={fadeUp} className="mt-8 flex gap-4">
          <button
            onClick={() => scrollToSection("#projects")}
            className="bg-primary text-background font-bold py-2 px-4 rounded hover:bg-primary/80">
            View My Work
          </button>
          <button
            onClick={() => scrollToSection("#contact")}
            className="border border-primary text-primary font-bold py-2 px-4 rounded hover:bg-primary hover:text-background">
            Contact Me
          </button>
        </motion.div>
        <motion.div variants={fadeUp} className="mt-8 flex gap-6">
          {Social.map(({ icon, link }, i) => (
            <Link
              key={i}
              href={link}
              target="_blank"
              className="p-3 rounded border hover:border-primary hover:text-primary transition-all">
              {icon}
            </Link>
          ))}
        </motion.div>
        <motion.div variants={fadeUp} className="absolute bottom-10">
          <button
            onClick={() => scrollToSection("#about")}
            className="animate-bounce">
            <ArrowDown />
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
