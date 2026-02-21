"use client";

import { useGetAllProject } from "@/lib/query/projectQuery";
import { CiShare1 } from "react-icons/ci";
import { FiGithub } from "react-icons/fi"; // Assuming this is your custom button
import Image from "next/image";
import Link from "next/link";
import styles from "./Projects.module.scss";
import { Button } from "@/components/ui/Buttons/Buttons";

export default function Projects() {
  const { data: projects, isLoading, isError } = useGetAllProject(2);

  if (isLoading) {
    return (
      <section className={styles.section}>
        <div className={styles.statusContainer}>
          <div className={styles.spinner} />
          <p>Loading projects...</p>
        </div>
      </section>
    );
  }

  if (isError || !projects || projects.length === 0) {
    return (
      <section className={styles.section}>
        <div className={styles.statusContainer}>
          <p>No projects found right now. Check back later!</p>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className={styles.section}>
      <div className={styles.content}>
        {/* Section Header */}
        <header className={styles.header}>
          <h2>
            Featured{" "}
            <span className={styles.highlight}>
              Projects
              <span className={styles.underline} />
            </span>
          </h2>
          <p className={styles.subtitle}>
            A curated showcase of my recent work — combining technical
            expertise, creativity, and problem‑solving.
          </p>
        </header>

        {/* Projects Grid */}
        <div className={styles.grid}>
          {projects.map((p, index) => (
            <article
              key={p.id}
              className={styles.card}
              // This inline style passes the index to SCSS for staggered CSS animations!
              style={{ "--index": index } as React.CSSProperties}
            >
              {/* Image & Hover Action Overlay */}
              <div className={styles.imageWrapper}>
                {p.imageUrl ? (
                  <Image
                    src={p.imageUrl}
                    alt={p.title}
                    fill
                    className={styles.image}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <div className={styles.placeholderImage}>🌐</div>
                )}

                {/* Unified overlay for links (Hover on Desktop, Static on Mobile) */}
                <div className={styles.overlay}>
                  <a
                    href={p.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.actionBtn}
                  >
                    <CiShare1 size={20} /> Live Demo
                  </a>
                  <a
                    href={p.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.actionBtn}
                  >
                    <FiGithub size={20} /> Source Code
                  </a>
                </div>
              </div>

              {/* Project Info */}
              <div className={styles.cardInfo}>
                <h3 className={styles.title}>{p.title}</h3>
                <p className={styles.description}>{p.description}</p>

                <div className={styles.tools}>
                  {p.tools.map((t) => (
                    <span key={t} className={styles.toolTag}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Call to Action */}
        <div className={styles.footer}>
          <Button size="md">
            <Link href="/projects">View All Projects</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
