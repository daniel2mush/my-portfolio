"use client";
import { useRef, useEffect } from "react";
import { motion, useAnimation, useInView, Variants } from "motion/react";
import { Copyright } from "lucide-react";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

export default function FooterPage() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.1, once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <motion.footer
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}>
      <div className="w-full max-w-7xl mx-auto p-10">
        {/* Grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2">
          <motion.div variants={itemVariants} className="space-y-4">
            <h1 className="font-bold text-2xl text-primary">ZCoder</h1>
            <p className="text-muted-foreground max-w-sm">
              Full-Stack Developer & UI/UX Designer creating digital experiences
              that inspire and engage.
            </p>
          </motion.div>

          {/* Links */}
          <motion.div
            variants={containerVariants}
            className="flex md:justify-end pt-5 md:mt-0 items-center gap-10">
            {[FiGithub, FiLinkedin, FiMail].map((Icon, i) => (
              <motion.button
                key={i}
                variants={itemVariants}
                className="rounded p-2 cursor-pointer hover:ring hover:ring-primary hover:text-primary">
                <Icon size={20} />
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          variants={itemVariants}
          className="py-4 border-t mt-5 flex items-center space-x-3">
          <Copyright size={12} />
          <p className="text-sm text-muted-foreground">
            2025 ZCoder. All rights reserved
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
}
