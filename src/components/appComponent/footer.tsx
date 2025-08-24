"use client";

import { motion, useAnimation, useInView, Variants } from "motion/react";
import { useRef, useEffect } from "react";
import { Copyright } from "lucide-react";
import Image from "next/image";
import { Social } from "./socials";
import { usePathname } from "next/navigation";

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
      transition: { staggerChildren: 0.2, delayChildren: 0.2 },
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

  if (pathName === "/auth" || pathName === "/admin") return;
  return (
    <motion.footer
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="bg-background/90 py-10">
      <div className="max-w-7xl mx-auto px-10 space-y-10">
        <motion.div
          variants={containerVariants}
          className="grid md:grid-cols-2 gap-5">
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <div className="relative h-10 w-28">
              <Image
                src="/logo.png"
                alt="logo"
                fill
                className="object-contain invert"
              />
            </div>
            <p className="text-muted-foreground max-w-sm">
              Full-Stack Developer & UI/UX Designer creating digital experiences
              that inspire and engage.
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
                className="hover:text-primary cursor-pointer p-2 rounded ring ring-transparent hover:ring-primary transition-all">
                {icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-2 border-t border-primary/10 pt-4 text-muted-foreground">
          <Copyright size={12} />
          <span>2025 ZCoder. All rights reserved</span>
        </motion.div>
      </div>
    </motion.footer>
  );
}
