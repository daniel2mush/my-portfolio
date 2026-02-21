"use client";

import { Download } from "lucide-react";
import styles from "./Resume.module.scss";
import { Button } from "@/components/ui/Buttons/Buttons";

// Refined, high-impact copywriting
const resumeData = {
  name: "Daniel",
  title: "Full-Stack Developer & Head of Production",
  contact: {
    email: "Daniel2mush@gmail.com",
    phone: "+223 71 90 70 48",
    location: "Bamako, Mali",
  },
  summary:
    "Versatile technologist and design leader bridging the gap between digital architecture and physical branding. I combine expertise in modern Full-Stack web development (React, Node.js) with extensive experience directing large-scale print production and UI/UX design. Passionate about building scalable applications and delivering pixel-perfect, high-impact visual experiences from screen to print.",
  skills: {
    technical: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Zod",
    ],
    design: [
      "UI/UX Design",
      "Figma",
      "Adobe XD",
      "Photoshop",
      "Illustrator",
      "InDesign",
      "Large Format Printing",
      "Brand Identity",
    ],
  },
  languages: [
    { name: "English", level: "Fluent" },
    { name: "French", level: "Fluent" },
    { name: "Bambara", level: "Learning" },
  ],
  experience: [
    {
      role: "Head of Production & Senior Graphic Designer",
      company: "PactAfrique",
      period: "2020 - Present",
      details: [
        "Direct end-to-end production for high-volume custom print items, including kakemonos, apparel, and corporate merchandise.",
        "Led the comprehensive design and print execution for major national events, including the Salon Monétique National du Mali (SamonaM).",
        "Design engaging magazine layouts, promotional materials, and brand identities, optimizing for maximum visual impact and audience retention.",
        "Ensure rigorous quality control across all print-ready files and final physical deliverables.",
      ],
    },
    {
      role: "Freelance Full-Stack Developer & UI/UX Designer",
      company: "Independent",
      period: "2021 - Present",
      details: [
        "Architect and develop responsive, high-performance web applications utilizing React, Next.js, and modern CSS frameworks.",
        "Design intuitive UI/UX flows and interactive prototypes in Figma, translating complex client requirements into seamless user journeys.",
        "Implement robust backend solutions and authentication systems (Postgres, BetterAuth) to support scalable web platforms.",
      ],
    },
  ],
  education: [
    {
      degree: "Bachelor's in Computer Science",
      school: "University of Mali",
      period: "2017 - 2021",
    },
  ],
};

export default function ResumeSection() {
  return (
    <section id="resume" className={styles.section}>
      <div className={styles.content}>
        {/* Section Header */}
        <header
          className={styles.header}
          style={{ "--index": 0 } as React.CSSProperties}
        >
          <h2>
            My{" "}
            <span className={styles.highlight}>
              Resume
              <span className={styles.underline} />
            </span>
          </h2>
          <p className={styles.subtitle}>
            A snapshot of my professional journey, skills, and milestones.
          </p>
        </header>

        {/* Main Resume Grid */}
        <div className={styles.resumeGrid}>
          {/* Left Column: Summary & Experience */}
          <div className={styles.mainColumn}>
            {/* Summary */}
            <article
              className={styles.resumeBlock}
              style={{ "--index": 1 } as React.CSSProperties}
            >
              <h3 className={styles.blockTitle}>Professional Summary</h3>
              <p className={styles.summaryText}>{resumeData.summary}</p>
            </article>

            {/* Experience (Timeline style) */}
            <article
              className={styles.resumeBlock}
              style={{ "--index": 2 } as React.CSSProperties}
            >
              <h3 className={styles.blockTitle}>Experience</h3>
              <div className={styles.timeline}>
                {resumeData.experience.map((job, i) => (
                  <div key={i} className={styles.timelineItem}>
                    <div className={styles.timelineDot} />
                    <h4 className={styles.role}>{job.role}</h4>
                    <span className={styles.companyMeta}>
                      {job.company} • {job.period}
                    </span>
                    <ul className={styles.jobDetails}>
                      {job.details.map((detail, idx) => (
                        <li key={idx}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </article>
          </div>

          {/* Right Column: Skills, Education, Languages */}
          <aside className={styles.sidebarColumn}>
            {/* Technical Skills */}
            <div
              className={styles.resumeCard}
              style={{ "--index": 3 } as React.CSSProperties}
            >
              <h3 className={styles.cardTitle}>Technical Stack</h3>
              <div className={styles.tags}>
                {resumeData.skills.technical.map((skill) => (
                  <span key={skill} className={styles.tag}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Design Skills */}
            <div
              className={styles.resumeCard}
              style={{ "--index": 4 } as React.CSSProperties}
            >
              <h3 className={styles.cardTitle}>Design & Production</h3>
              <div className={styles.tags}>
                {resumeData.skills.design.map((skill) => (
                  <span key={skill} className={styles.tag}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Education */}
            <div
              className={styles.resumeCard}
              style={{ "--index": 5 } as React.CSSProperties}
            >
              <h3 className={styles.cardTitle}>Education</h3>
              {resumeData.education.map((edu, i) => (
                <div key={i} className={styles.eduItem}>
                  <h4>{edu.degree}</h4>
                  <p>{edu.school}</p>
                  <span>{edu.period}</span>
                </div>
              ))}
            </div>

            {/* Languages */}
            <div
              className={styles.resumeCard}
              style={{ "--index": 6 } as React.CSSProperties}
            >
              <h3 className={styles.cardTitle}>Languages</h3>
              <ul className={styles.langList}>
                {resumeData.languages.map((lang) => (
                  <li key={lang.name}>
                    <strong>{lang.name}</strong>
                    <span className={styles.langLevel}>{lang.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        {/* Download Action */}
        <div
          className={styles.footerAction}
          style={{ "--index": 7 } as React.CSSProperties}
        >
          <Button
            onClick={() => window.open("/resume.pdf", "_blank")}
            className={styles.downloadBtn}
          >
            <Download size={18} />
            Download Full Resume
          </Button>
        </div>
      </div>
    </section>
  );
}
