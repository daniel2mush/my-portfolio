"use client";

import { IoCode, IoColorPaletteOutline, IoRocket } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import styles from "./AboutMe.module.scss";

// Moved outside the component to prevent recreation on every render
const skillsInfo = [
  {
    header: "Clean Code",
    p: "Maintainable, scalable, future-proof.",
    icon: <IoCode size={24} />,
  },
  {
    header: "Design Thinking",
    p: "User-first, detail-obsessed workflows.",
    icon: <IoColorPaletteOutline size={24} />,
  },
  {
    header: "Performance",
    p: "Optimized for speed, efficiency, and trust.",
    icon: <IoRocket size={24} />,
  },
  {
    header: "Collaboration",
    p: "Team synergy for exceptional outcomes.",
    icon: <FiUser size={24} />,
  },
];

export default function AboutMe() {
  return (
    <section id="about" className={styles.section}>
      {/* Decorative background pattern (if you add CSS for it later) */}
      <div className={styles.bgPattern} aria-hidden="true" />

      <div className={styles.sectionContent}>
        {/* Section Header */}
        <header className={styles.header}>
          <h2>
            About
            <span className={styles.highlight}>
              Me
              <span className={styles.underline} />
            </span>
          </h2>
          <p className={styles.subtitle}>
            I build digital tools that empower people — blending{" "}
            <span className={styles.textAccent}>code</span>,{" "}
            <span className={styles.textAccent}>design</span>, and civic
            purpose.
          </p>
        </header>

        {/* Main Grid Content */}
        <div className={styles.sectionGrid}>
          {/* Left Column: Text */}
          <article className={styles.gridLeft}>
            <h3>Crafting Digital Experiences</h3>
            <div className={styles.textContent}>
              <p>
                With roots in both development and design, I bridge the gap
                between aesthetics and functionality. My journey began with
                curiosity and became a mission to build scalable, civic‑minded
                platforms.
              </p>
              <p>
                Specializing in React, Node.js, and modern design systems, I
                deliver inclusive and high‑performance experiences.
              </p>
              <p>
                Outside of code, I explore design trends, contribute to open
                source, and mentor emerging creatives.
              </p>
            </div>

            {/* Tags */}
            <div className={styles.tags}>
              {["#Accessibility", "#ScalableCode", "#CivicImpact"].map(
                (tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ),
              )}
            </div>
          </article>

          {/* Center Column: Vertical Accent Bar */}
          <div className={styles.dividerWrapper}>
            <div className={styles.divider} />
          </div>

          {/* Right Column: Skill Cards */}
          <div className={styles.gridRight}>
            {skillsInfo.map((skill) => (
              <div className={styles.skillCard} key={skill.header}>
                <div className={styles.iconWrapper}>
                  <div className={styles.icon}>{skill.icon}</div>
                </div>
                <h4 className={styles.skillHeader}>{skill.header}</h4>
                <p className={styles.skillP}>{skill.p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
