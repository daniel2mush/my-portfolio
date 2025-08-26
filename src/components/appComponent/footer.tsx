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
      className="relative bg-gradient-to-b from-background/80 via-background to-background/95 py-14 mt-20 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05),transparent)] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 space-y-12 relative z-10">
        {/* Brand & Social */}
        <motion.div
          variants={containerVariants}
          className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="relative h-12 w-36 bg-background/40 backdrop-blur-lg rounded-lg p-2">
              <Image
                src="/logo.png"
                alt="logo"
                fill
                className="object-contain invert"
              />
            </div>
            <p className="text-muted-foreground max-w-sm">
              Crafting scalable, aesthetic, and user‑first digital experiences
              for West African creatives and beyond.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="flex md:justify-end gap-5 items-center">
            {Social.map(({ icon, link }, i) => (
              <motion.a
                key={i}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                whileHover={{ scale: 1.15, rotate: 5 }}
                className="p-2 rounded-full bg-primary/10 border border-primary/20 hover:bg-primary hover:text-background transition-colors">
                {icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap gap-6 text-sm text-muted-foreground">
          <Link
            href="#projects"
            className="hover:text-primary transition-colors">
            Projects
          </Link>
          <Link href="#about" className="hover:text-primary transition-colors">
            About
          </Link>
          <Link
            href="#contact"
            className="hover:text-primary transition-colors">
            Contact
          </Link>
        </motion.div>

        {/* Divider */}
        <motion.hr
          variants={itemVariants}
          className="border-t border-primary/20"
        />

        {/* Bottom Bar */}
        <motion.div
          variants={itemVariants}
          className="flex justify-between items-center text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Copyright size={12} />
            <span>{new Date().getFullYear()} ZCoder. All rights reserved.</span>
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-1 hover:text-primary transition-colors">
            <ArrowUp size={14} /> Top
          </button>
        </motion.div>
      </div>
    </motion.footer>
  );
}
