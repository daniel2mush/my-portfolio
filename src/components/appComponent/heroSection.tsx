"use client";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import Link from "next/link";
import { scrollToSection } from "./scroll";
import { motion, Variants } from "motion/react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      type: "spring",
      stiffness: 80,
    },
  },
};

export default function HeroSection() {
  return (
    <div id="home" className="">
      <div className="relative min-h-[80vh] w-full">
        <Image src={"/hero.png"} alt="hero" fill priority />

        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex justify-center items-center bg-background/50 absolute inset-0">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-7xl mx-auto p-10 flex flex-col gap-8">
            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="text-center font-bold text-3xl md:text-7xl">
              Hey, I&apos;m <br />
              <span className="text-primary text-4xl md:text-8xl">
                Daniel Freeman
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.h3
              variants={fadeUp}
              className="max-w-4xl font-semibold md:text-3xl text-center">
              Full-Stack Developer & UI/UX Designer crafting digital experiences
              that inspire and engage users worldwide.
            </motion.h3>

            {/* Buttons */}
            <motion.div
              variants={fadeUp}
              className="flex justify-center items-center gap-4">
              <button className="font-bold py-2 px-4 text-background cursor-pointer bg-primary rounded hover:bg-primary/80 hover:ring-1 ring-primary">
                View my work
              </button>
              <button className="ring-1 ring-primary text-primary hover:bg-primary hover:text-background font-bold py-2 px-4 rounded cursor-pointer">
                Get in touch
              </button>
            </motion.div>

            {/* Social Icons */}
            <motion.div
              variants={fadeUp}
              className="flex justify-center items-center gap-6">
              {[FiGithub, FiLinkedin, FiMail].map((Icon, i) => (
                <Link
                  key={i}
                  href={""}
                  className="hover:text-primary hover:border-primary cursor-pointer border p-3 rounded transition-all duration-300">
                  <Icon size={20} />
                </Link>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Arrow Down */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="flex justify-center items-center h-[20vh]">
        <button
          onClick={() => scrollToSection("#about")}
          className="animate-bounce duration-100 cursor-pointer">
          <ArrowDown />
        </button>
      </motion.div>
    </div>
  );
}
