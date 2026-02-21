"use client";

import { Code, Rocket, Users } from "lucide-react";
import { IoColorPaletteOutline } from "react-icons/io5";
import styles from "./AboutMe.module.scss";

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
  return (
    <section className={styles.section}>
      {/* Moving background pattern */}
      <div />

      <div className={styles.sectionContent}>
        {/* Header */}
        <div className={styles.header}>
          <h1>
            About
            <span className={styles.me}>
              Me
              <span className={styles.underline} />
            </span>
          </h1>
          <p>
            I build digital tools that empower people — blending{" "}
            <span>code</span>, <span>design</span>, and civic purpose.
          </p>
        </div>

        {/* Divider */}
        <div />

        {/* Grid */}
        <div>
          {/* Left Content */}
          <div>
            <h2>Crafting Digital Experiences</h2>
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

            {/* Tags */}
            <div>
              {["#Accessibility", "#ScalableCode", "#CivicImpact"].map(
                (tag) => (
                  <span key={tag}>{tag}</span>
                ),
              )}
            </div>
          </div>

          {/* Vertical Accent Bar */}
          <div />

          {/* Skills */}
          <div>
            {skillsInfo.map((skill) => (
              <div key={skill.header}>
                <div>
                  <div>{skill.icon}</div>
                </div>
                <h3>{skill.header}</h3>
                <p>{skill.p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
