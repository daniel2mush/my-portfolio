"use client";

import { motion, useAnimation, useInView, Variants } from "motion/react";
import { useRef, useEffect } from "react";
import { Copyright, ArrowUp } from "lucide-react";
import Image from "next/image";
import { Social } from "./socials";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function FooterPage() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.1, once: true });
  const controls = useAnimation();
  const pathName = usePathname();

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  if (pathName === "/auth" || pathName === "/admin") return null;

  return (
    <motion.footer
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      {/* Subtle background glow */}
      <div />
      <div>
        {/* Brand & Social */}
        <motion.div variants={containerVariants}>
          <motion.div variants={itemVariants}>
            <div>
              <Image src="/logo.png" alt="logo" fill />
            </div>
            <p>
              Crafting scalable, aesthetic, and user‑first digital experiences
              for West African creatives and beyond.
            </p>
          </motion.div>

          <motion.div variants={containerVariants}>
            {Social.map(({ icon, link }, i) => (
              <motion.a
                key={i}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                whileHover={{ scale: 1.15, rotate: 5 }}
              >
                {icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Quick Links */}
        <motion.div variants={itemVariants}>
          <Link href="#projects">Projects</Link>
          <Link href="#about">About</Link>
          <Link href="#contact">Contact</Link>
        </motion.div>

        {/* Divider */}
        <motion.hr variants={itemVariants} />

        {/* Bottom Bar */}
        <motion.div variants={itemVariants}>
          <div>
            <Copyright size={12} />
            <span>{new Date().getFullYear()} ZCoder. All rights reserved.</span>
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <ArrowUp size={14} /> Top
          </button>
        </motion.div>
      </div>
    </motion.footer>
  );
}
