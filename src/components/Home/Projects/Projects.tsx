"use client";

import { useGetAllProject } from "@/lib/query/projectQuery";
import { CiShare1 } from "react-icons/ci";
import { FiGithub } from "react-icons/fi"; // Assuming this is your custom button
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Buttons/Buttons";

const styles = {
  section: "min-h-screen bg-background px-5 py-24",
  content: "mx-auto max-w-[1200px]",
  header: "mb-14 flex flex-col items-center text-center",
  highlight: "relative inline-flex flex-col text-primary",
  underline: "absolute -bottom-1 left-0 h-1.5 w-full rounded bg-primary",
  subtitle: "m-0 max-w-2xl text-balance text-lg leading-7 text-text-secondary",
  grid: "grid grid-cols-1 gap-8 md:grid-cols-2",
  card: "animate-[slide-up_0.6s_ease_forwards] overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] opacity-0 transition-all hover:-translate-y-1 hover:border-primary",
  imageWrapper: "group relative aspect-video w-full overflow-hidden",
  image: "object-cover transition-transform duration-300 group-hover:scale-105",
  placeholderImage: "flex size-full items-center justify-center bg-white/[0.03] text-4xl",
  overlay: "absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/60 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100",
  actionBtn: "inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition-all hover:bg-primary hover:text-primary-foreground",
  cardInfo: "flex flex-col gap-4 p-6",
  title: "text-xl font-bold text-foreground",
  description: "text-sm leading-6 text-text-secondary",
  tools: "flex flex-wrap gap-2",
  toolTag: "rounded-md border border-primary/20 bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary",
  footer: "mt-10 flex justify-center",
  btnLink: "inline-flex items-center",
  statusContainer: "flex min-h-[40vh] flex-col items-center justify-center gap-4 text-text-secondary",
  spinner: "size-8 animate-spin rounded-full border-2 border-primary border-t-transparent",
};

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
          <h2 className="mb-4 text-[clamp(2.5rem,5vw,4rem)] font-extrabold text-foreground">
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
              // This inline style passes the index for staggered CSS animations.
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
            <Link className={styles.btnLink} href="/projects">
              View All Projects
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
