"use client";

import { motion, useAnimation, useInView, Variants } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Code2, Server, Palette, Cloud } from "lucide-react";

const skills = [
  {
    name: "Frontend Development",
    icon: <Code2 className="text-primary" size={24} />,
    color: "from-primary/20 to-primary/5",
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
    icon: <Server className="text-purple-500" size={24} />,
    color: "from-purple-500/20 to-purple-500/5",
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
    icon: <Palette className="text-pink-500" size={24} />,
    color: "from-pink-500/20 to-pink-500/5",
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
    icon: <Cloud className="text-green-500" size={24} />,
    color: "from-green-500/20 to-green-500/5",
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
  { name: "Years Experience", value: 5, suffix: "+", color: "text-primary" },
  {
    name: "Projects Completed",
    value: 50,
    suffix: "+",
    color: "text-purple-500",
  },
  {
    name: "Client Satisfaction",
    value: 100,
    suffix: "%",
    color: "text-pink-500",
  },
  {
    name: "Support Available",
    value: 24,
    suffix: "/7",
    color: "text-green-500",
  },
];

function AnimatedNumber({
  target,
  suffix,
}: {
  target: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 1500; // ms
    const stepTime = 1000 / 60; // ~60fps
    const totalSteps = Math.ceil(duration / stepTime);
    const increment = target / totalSteps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      setCount(Math.floor(current));
    }, stepTime);

    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3, once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.section
      id="skills"
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={container}
      className="py-24 bg-gradient-to-b from-background via-background/95 to-background">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <motion.div variants={item} className="text-center space-y-3">
          <h2 className="text-4xl md:text-5xl font-bold relative inline-block">
            Skills & <span className="text-primary">Expertise</span>
            <span className="absolute left-0 bottom-0 w-full h-[4px] bg-gradient-to-r from-primary to-transparent scale-x-0 origin-left motion-safe:animate-[grow_0.6s_ease-out_forwards_0.3s]" />
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit for building modern web applications and
            digital experiences.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          className="grid md:grid-cols-4 gap-8 mt-16">
          {skills.map((s) => (
            <motion.div
              key={s.name}
              variants={item}
              className={`rounded-xl p-5 bg-gradient-to-br ${s.color} border border-white/10 backdrop-blur-md hover:-rotate-6 transition-all duration-500 hover:scale-110`}>
              <div className="flex items-center gap-3">
                {s.icon}
                <h3 className="text-xl font-semibold">{s.name}</h3>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {s.skillSet.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-xs font-semibold rounded-full bg-background/40 border border-white/10">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={container}
          className="grid md:grid-cols-4 gap-8 mt-16 border-t border-white/10 pt-10">
          {serviceStats.map((stat) => (
            <motion.div
              key={stat.name}
              variants={item}
              className="flex flex-col items-center">
              <motion.span
                className={`text-3xl md:text-4xl font-bold ${stat.color}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}>
                <AnimatedNumber target={stat.value} suffix={stat.suffix} />
              </motion.span>
              <p className="text-sm text-muted-foreground">{stat.name}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
