"use client";

import { Code, Rocket, Users } from "lucide-react";
import { IoColorPaletteOutline } from "react-icons/io5";
import { motion, useAnimation, useInView, Variants } from "motion/react";
import { useRef, useEffect } from "react";

const skillsInfo = [
  {
    header: "Clean Code",
    p: "Writing maintainable, scalable code that stands the test of time.",
    icon: <Code size={30} />,
  },
  {
    header: "Design Thinking",
    p: "Creating user-centered designs with attention to every detail.",
    icon: <IoColorPaletteOutline size={30} />,
  },
  {
    header: "Performance",
    p: "Optimizing for speed and efficiency across all platforms.",
    icon: <Rocket size={30} />,
  },
  {
    header: "Collaboration",
    p: "Working seamlessly with teams to deliver exceptional results.",
    icon: <Users size={30} />,
  },
];

export default function AboutMe() {
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
      transition: { staggerChildren: 0.3, delayChildren: 0.2 },
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
      id="about"
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="w-full py-20">
      <div className="max-w-7xl mx-auto px-10">
        <motion.div variants={itemVariants} className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">
            About <span className="text-primary">Me</span>
          </h1>
          <p className="text-lg md:text-xl">
            I&apos;m a passionate developer and designer with over 5 years of
            experience creating digital solutions that make a difference.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 mt-10 gap-10">
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-3xl font-semibold">
              Crafting Digital Experiences
            </h2>
            <p>
              With a background in both development and design, I bridge the gap
              between aesthetics and functionality. My journey started with a
              curiosity about how things work, leading me to explore web
              development.
            </p>
            <p>
              I specialize in React, Node.js, and modern design systems, staying
              up-to-date with the latest technologies and best practices to
              create exceptional user experiences.
            </p>
            <p>
              When I&apos;m not coding, you&apos;ll find me exploring new design
              trends, contributing to open-source projects, or sharing knowledge
              with the community.
            </p>
          </motion.div>
          <motion.div
            variants={containerVariants}
            className="grid md:grid-cols-2 gap-5">
            {skillsInfo.map((skill) => (
              <motion.div
                key={skill.header}
                variants={itemVariants}
                className="bg-primary/10 rounded-lg p-5 flex flex-col items-center text-center space-y-2">
                <div className="bg-primary text-white h-12 w-12 rounded-full flex justify-center items-center ring ring-white">
                  {skill.icon}
                </div>
                <h3 className="font-bold text-white">{skill.header}</h3>
                <p className="text-sm">{skill.p}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
