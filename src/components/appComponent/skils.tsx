"use client";
import { motion, useAnimation, useInView, Variants } from "motion/react";
import { useRef, useEffect } from "react";

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3, once: true });
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
      id="skills"
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="bg-primary/5 w-full min-h-screen flex justify-center items-center py-10">
      <div className="w-full max-w-7xl mx-auto px-10">
        {/* Header */}
        <motion.div variants={itemVariants} className="space-y-4 text-center">
          <h1 className="font-bold text-4xl md:text-5xl">
            Skills & <span className="text-primary">Expertise</span>
          </h1>
          <p className="text-xl font-semibold text-muted-foreground">
            A comprehensive toolkit for building modern web applications <br />
            and digital experiences.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-4 gap-10 mt-20">
          {Skils.map((s) => (
            <motion.div
              key={s.name}
              variants={itemVariants}
              className="bg-primary/5 border border-primary/10 rounded-xl p-5 flex items-center flex-col gap-4">
              <h1 className="text-xl font-semibold text-white">{s.name}</h1>
              <div className="flex justify-center items-center flex-wrap gap-2">
                {s.skillSet.map((set) => (
                  <motion.div
                    key={set}
                    variants={itemVariants}
                    className="px-2 ring ring-indigo-50/50 rounded-3xl bg-indigo-600">
                    <p className="text-[12px] font-bold text-white">{set}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Service Stats */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-4 border-t border-primary/10 p-5 mt-10 gap-10">
          {service.map((s) => (
            <motion.div
              key={s.name}
              variants={itemVariants}
              className="flex justify-center items-center flex-col">
              <h1 className="text-2xl font-bold text-primary md:text-4xl">
                {s.name}
              </h1>
              <p className="text-muted-foreground">{s.p}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

const Skils = [
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
    skillSet: ["   Node.js", "Express", "PostgreSQL", "MongoDB"],
  },
  {
    name: "Design & Tools",
    skillSet: [
      "  Figma",
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

// Service
const service = [
  {
    name: "5+",
    p: "Years Experience",
  },
  {
    name: "50+",
    p: "Projects Completed",
  },
  {
    name: "100%",
    p: "Client Satisfaction",
  },
  {
    name: "24/7",
    p: "Support Available",
  },
];
