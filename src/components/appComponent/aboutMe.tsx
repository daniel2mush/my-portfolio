"use client";

import { Code, Rocket, Users } from "lucide-react";
import { IoColorPaletteOutline } from "react-icons/io5";
import { motion, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect } from "react";

const skillsInfo = [
  {
    header: "Clean Code",
    p: "Maintainable, scalable, future-proof.",
    icon: <Code size={20} />,
  },
  {
    header: "Design Thinking",
    p: "User-first, detail-obsessed workflows.",
    icon: <IoColorPaletteOutline size={20} />,
  },
  {
    header: "Performance",
    p: "Optimized for speed, efficiency, and trust.",
    icon: <Rocket size={20} />,
  },
  {
    header: "Collaboration",
    p: "Team synergy for exceptional outcomes.",
    icon: <Users size={20} />,
  },
];

export default function AboutMe() {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.2, once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.25 } },
  };
  const item = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.section
      id="about"
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={container}
      className="relative w-full py-24 bg-gradient-to-b from-background via-background/95 to-background">
      {/* Moving background pattern */}
      <div className="absolute inset-0 opacity-10 bg-[url('/grid.svg')] bg-center bg-cover animate-[pulse_8s_ease-in-out_infinite]" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        {/* Header */}
        <motion.div variants={item} className="text-center space-y-4">
          <motion.h1
            className="text-4xl md:text-5xl font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}>
            About{" "}
            <motion.span className="text-primary relative inline-block">
              Me
              <motion.span
                className="absolute bottom-0 left-0 w-full h-[4px] bg-primary"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </motion.span>
          </motion.h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            I build digital tools that empower people — blending{" "}
            <span className="text-primary font-medium">code</span>,{" "}
            <span className="text-primary font-medium">design</span>, and civic
            purpose.
          </p>
        </motion.div>

        {/* Divider */}
        <motion.div
          variants={item}
          className="my-10 h-1 w-40 mx-auto bg-primary/40 rounded-full"
        />

        {/* Grid */}
        <div className="grid md:grid-cols-[1fr_auto_1fr] gap-12 mt-6">
          {/* Left Content */}
          <motion.div variants={item} className="space-y-5">
            <h2 className="text-3xl font-semibold text-primary">
              Crafting Digital Experiences
            </h2>
            <p className="text-muted-foreground">
              With roots in both development and design, I bridge the gap
              between aesthetics and functionality. My journey began with
              curiosity and became a mission to build scalable, civic‑minded
              platforms.
            </p>
            <p className="text-muted-foreground">
              Specializing in React, Node.js, and modern design systems, I
              deliver inclusive and high‑performance experiences.
            </p>
            <p className="text-muted-foreground">
              Outside of code, I explore design trends, contribute to open
              source, and mentor emerging creatives.
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {["#Accessibility", "#ScalableCode", "#CivicImpact"].map(
                (tag) => (
                  <motion.span
                    key={tag}
                    whileHover={{ scale: 1.05 }}
                    className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary font-medium">
                    {tag}
                  </motion.span>
                )
              )}
            </div>
          </motion.div>

          {/* Vertical Accent Bar */}
          <motion.div
            variants={item}
            className="hidden md:block w-[2px] bg-gradient-to-b from-primary/60 to-transparent mx-auto rounded-full"
          />

          {/* Skills */}
          <motion.div
            variants={container}
            className="grid sm:grid-cols-2 gap-6">
            {skillsInfo.map((skill) => (
              <motion.div
                key={skill.header}
                variants={item}
                whileHover={{ rotate: 1, scale: 1.05 }}
                className="bg-background border border-primary/20 rounded-xl p-5 shadow hover:shadow-lg transition-all group">
                <div className="flex items-center justify-center mb-3">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="bg-primary text-white h-10 w-10 rounded-full flex items-center justify-center ring ring-white group-hover:ring-primary/50">
                    {skill.icon}
                  </motion.div>
                </div>
                <h3 className="font-semibold text-primary text-center">
                  {skill.header}
                </h3>
                <p className="text-sm text-center text-muted-foreground mt-2">
                  {skill.p}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
