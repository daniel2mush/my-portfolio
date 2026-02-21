"use client";

import { useRef } from "react";
import { Code2, Server, Palette, Cloud } from "lucide-react";
import styles from "./Skills.module.scss";

// Moved outside component to prevent unnecessary re-renders
const skills = [
  {
    name: "Frontend Development",
    icon: <Code2 size={28} />,
    color: "#808bf8",
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
    icon: <Server size={28} />,
    color: "#ac47ff",
    skillSet: [
      "Node.js",
      "Express",
      "PostgreSQL",
      "MongoDB",
      "DrizzleORM",
      "Auth.js",
    ],
  },
  {
    name: "Design & Tools",
    icon: <Palette size={28} />,
    color: "#f6339a",
    skillSet: [
      "Figma",
      "Adobe XD",
      "Sketch",
      "Photoshop",
      "Illustrator",
      "After Effects",
    ],
  },
  {
    name: "DevOps & Cloud",
    icon: <Cloud size={28} />,
    color: "#00c851",
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
  { name: "Years Experience", value: 5, suffix: "+", color: "#808bf8" },
  { name: "Projects Completed", value: 50, suffix: "+", color: "#ac47ff" },
  { name: "Client Satisfaction", value: 100, suffix: "%", color: "#f6339a" },
  { name: "Support Available", value: 24, suffix: "/7", color: "#00c851" },
];

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section id="skills" className={styles.section} ref={ref}>
      <div className={styles.content}>
        {/* Header */}
        <header className={styles.header}>
          <h2>
            Skills &{" "}
            <span className={styles.highlight}>
              Expertise
              <span className={styles.underline} />
            </span>
          </h2>
          <p className={styles.subtitle}>
            A comprehensive toolkit for building modern web applications and
            digital experiences.
          </p>
        </header>

        {/* Main Content Area */}
        <div className={styles.flexContainer}>
          {/* Skills Grid */}
          <div className={styles.grid}>
            {skills.map((s) => (
              <div
                className={styles.card}
                key={s.name}
                // Passing the hex color as a CSS variable for dynamic SCSS styling
                style={{ "--theme": s.color } as React.CSSProperties}
              >
                <div className={styles.cardHeader}>
                  <div className={styles.iconWrapper}>{s.icon}</div>
                  <h3>{s.name}</h3>
                </div>

                <div className={styles.tags}>
                  {s.skillSet.map((skill) => (
                    <span key={skill} className={styles.tag}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Smooth Separator */}
          <div className={styles.separator} aria-hidden="true" />

          {/* Stats Grid */}
          <div className={styles.statsGrid}>
            {serviceStats.map((stat) => (
              <div className={styles.stat} key={stat.name}>
                <span
                  className={styles.statValue}
                  style={{ color: stat.color }}
                >
                  {stat.value}
                  {stat.suffix}
                </span>
                <p className={styles.statName}>{stat.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
