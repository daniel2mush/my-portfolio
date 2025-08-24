"use client";
import { useRef, useEffect } from "react";
import { motion, useAnimation, useInView, Variants } from "motion/react";
import { myRecentProject } from "@/lib/db/fakeDb";
import { CiShare1 } from "react-icons/ci";
import { FiGithub } from "react-icons/fi";
import { Button } from "../ui/button";

export default function Projects() {
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
      className="min-h-screen w-full flex justify-center items-start">
      <div className="w-full max-w-7xl mx-auto px-10 space-y-10 py-10">
        {/* Heading */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col justify-center items-center space-y-5">
          <h1 className="font-bold text-4xl md:text-5xl">
            Featured <span className="text-primary">Projects</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl text-center">
            A showcase of my recent work, demonstrating technical expertise and
            creative problem-solving.
          </p>
        </motion.div>

        {/* Project Grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {myRecentProject.map((p, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="border border-primary/10 rounded-lg overflow-hidden hover:border-primary hover: shadow cursor-pointer hover:scale-105 transition-all duration-300">
              {/* Image */}
              <div className="relative w-full h-60 flex justify-center items-center bg-primary/50">
                {p.imageIcon}
              </div>
              {/* Text */}
              <div className="p-5 space-y-8 bg-primary/5">
                <div>
                  <h1 className="text-xl font-bold">{p.name}</h1>
                  <p className="text-muted-foreground">{p.description}</p>
                </div>
                <div className="flex items-center flex-wrap gap-5">
                  {p.tools.map((t, i) => (
                    <motion.div
                      key={i}
                      variants={itemVariants}
                      className="rounded-lg px-2 ring ring-primary/10">
                      {t}
                    </motion.div>
                  ))}
                </div>
                {/* Buttons */}
                <div className="flex items-center gap-4">
                  <button className="flex items-center bg-background gap-4 border border-primary/25 py-2 px-3 cursor-pointer rounded-lg hover:bg-primary">
                    <CiShare1 size={20} /> Live Demo
                  </button>
                  <button className="flex items-center gap-4 border border-primary/25 py-2 px-3 cursor-pointer rounded-lg hover:bg-primary">
                    <FiGithub size={20} /> Code
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div variants={itemVariants} className="text-center w-full">
          <Button className="cursor-pointer font-bold px-10">
            View all projects
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
