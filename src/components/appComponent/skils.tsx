"use client";

import { motion, useAnimation, useInView, Variants } from "motion/react";
import { useEffect, useRef } from "react";

const skills = [
  {
    name: "Frontend Development",
    skillSet: [
      "React",
      "TypeScript",
      "Next.js",
      "Tailwind CSS",
      "Framer Motion",
    ],
  },
  {
    name: "Backend Development",
    skillSet: [
      "Node.js",
      "Express",
      "PostgreSQL",
      "MongoDB",
      "DrizzleORM",
      "BetterAuth",
    ],
  },
  {
    name: "Design & Tools",
    skillSet: [
      "Figma",
      "Adobe XD",
      "Sketch",
      "Photoshop",
      "Illustrator",
      "After Effects",
      "Indesign",
    ],
  },
  {
    name: "DevOps & Cloud",
    skillSet: [
      "AWS",
      "Docker",
      "Kubernetes",
      "GitHub Actions",
      "Vercel",
      "Netlify",
    ],
  },
];

const serviceStats = [
  { name: "5+", p: "Years Experience" },
  { name: "50+", p: "Projects Completed" },
  { name: "100%", p: "Client Satisfaction" },
  { name: "24/7", p: "Support Available" },
];

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3, once: true });
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
      id="skills"
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="py-20 bg-primary/5">
      <div className="max-w-7xl mx-auto px-10">
        <motion.div variants={itemVariants} className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">
            Skills & <span className="text-primary">Expertise</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            A comprehensive toolkit for building modern web applications and
            digital experiences.
          </p>
        </motion.div>
        <motion.div
          variants={containerVariants}
          className="grid md:grid-cols-4 gap-10 mt-16">
          {skills.map((s) => (
            <motion.div
              key={s.name}
              variants={itemVariants}
              className="bg-primary/5 border border-primary/10 rounded-xl p-5 flex flex-col gap-4 items-center">
              <h3 className="text-xl font-semibold text-white">{s.name}</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {s.skillSet.map((skill) => (
                  <motion.div
                    key={skill}
                    variants={itemVariants}
                    className="px-2 py-1 rounded-3xl bg-indigo-600 ring ring-indigo-50/50">
                    <p className="text-[12px] font-bold text-white">{skill}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          variants={containerVariants}
          className="grid md:grid-cols-4 gap-10 mt-10 border-t border-primary/10 p-5">
          {serviceStats.map((s) => (
            <motion.div
              key={s.name}
              variants={itemVariants}
              className="flex flex-col items-center">
              <h3 className="text-2xl md:text-4xl font-bold text-primary">
                {s.name}
              </h3>
              <p className="text-muted-foreground">{s.p}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
