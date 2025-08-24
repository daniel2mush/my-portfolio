"use client";

import { motion, useAnimation, useInView, Variants } from "motion/react";
import { useRef, useEffect } from "react";
import { CiShare1 } from "react-icons/ci";
import { FiGithub } from "react-icons/fi";
import { Button } from "../ui/button";

// Example project data
export const myRecentProject = [
  {
    name: "Portfolio Website",
    description: "A modern portfolio built with Next.js and TailwindCSS.",
    tools: ["Next.js", "React", "Tailwind", "Framer Motion"],
    imageIcon: <div className="text-6xl">🌐</div>,
    liveDemo: "#",
    code: "#",
  },
  {
    name: "E-commerce App",
    description: "Full-stack e-commerce solution with payment integration.",
    tools: ["Node.js", "Express", "MongoDB", "React"],
    imageIcon: <div className="text-6xl">🛒</div>,
    liveDemo: "#",
    code: "#",
  },
];

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.1, once: true });
  const controls = useAnimation();

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      id="projects"
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="py-20 w-full min-h-screen">
      <div className="max-w-7xl mx-auto px-10 space-y-10">
        <motion.div variants={itemVariants} className="text-center space-y-5">
          <h1 className="text-4xl md:text-5xl font-bold">
            Featured <span className="text-primary">Projects</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work, demonstrating technical expertise and
            creative problem-solving.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid md:grid-cols-2 gap-10">
          {myRecentProject.map((p, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="border border-primary/10 rounded-lg overflow-hidden hover:scale-105 transition-transform cursor-pointer">
              <div className="relative w-full h-60 flex justify-center items-center bg-primary/50">
                {p.imageIcon}
              </div>
              <div className="p-5 bg-primary/5 space-y-5">
                <div>
                  <h3 className="text-xl font-bold">{p.name}</h3>
                  <p className="text-muted-foreground">{p.description}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {p.tools.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-1 bg-indigo-600 rounded-3xl text-[12px] font-bold">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <a
                    href={p.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg border hover:bg-primary transition">
                    <CiShare1 /> Live Demo
                  </a>
                  <a
                    href={p.code}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg border hover:bg-primary transition">
                    <FiGithub /> Code
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} className="text-center mt-5">
          <Button className="px-10 py-2 font-bold">View All Projects</Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
