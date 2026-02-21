"use client";

import { motion, useAnimation, useInView, Variants } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Code2, Server, Palette, Cloud } from "lucide-react";

const skills = [
  {
    name: "Frontend Development",
    icon: <Code2 size={24} />,
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
    icon: <Server size={24} />,
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
    icon: <Palette size={24} />,
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
    icon: <Cloud size={24} />,
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
    >
      <div>
        <motion.div variants={item}>
          <h2>
            Skills & <span>Expertise</span>
            <span />
          </h2>
          <p>
            A comprehensive toolkit for building modern web applications and
            digital experiences.
          </p>
        </motion.div>

        <motion.div variants={container}>
          {skills.map((s) => (
            <motion.div
              key={s.name}
              variants={item}
              className={`rounded-xl p-5 bg-gradient-to-br ${s.color} border border-white/10 backdrop-blur-md hover:-rotate-6 transition-all duration-500 hover:scale-110`}
            >
              <div>
                {s.icon}
                <h3>{s.name}</h3>
              </div>
              <div>
                {s.skillSet.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={container}>
          {serviceStats.map((stat) => (
            <motion.div key={stat.name} variants={item}>
              <motion.span
                className={`text-3xl md:text-4xl font-bold ${stat.color}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <AnimatedNumber target={stat.value} suffix={stat.suffix} />
              </motion.span>
              <p>{stat.name}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
