"use client";

import { useState } from "react";
import Image from "next/image";
import { Loader2, Image as ImageIcon, Eye, X } from "lucide-react";
import { CiShare1 } from "react-icons/ci";
import { FiGithub } from "react-icons/fi";

// 1. Import your new shared type
import { Project } from "@/types/project";
import { useGetAllProject } from "@/lib/query/projectQuery";
import { Button } from "@/components/ui/Buttons/Buttons";

const styles = {
  section: "min-h-screen bg-background px-5 py-24 md:py-28",
  content: "mx-auto flex max-w-[1200px] flex-col",
  header: "mb-12 flex flex-col items-center text-center",
  highlight: "text-primary",
  subtitle: "m-0 max-w-[600px] text-balance text-lg text-text-secondary",
  grid: "grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8",
  card: "flex animate-[slide-up_0.6s_ease_forwards] flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] opacity-0 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-[0_10px_30px_rgba(0,0,0,0.2)]",
  imageWrapper: "relative h-[200px] w-full",
  image: "object-cover",
  imageFallback: "flex h-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-white/[0.02] to-white/[0.05] text-text-secondary",
  fallbackIcon: "opacity-50",
  cardBody: "flex grow flex-col items-stretch p-6",
  title: "mb-2 text-xl font-bold text-foreground",
  description: "mb-5 overflow-hidden text-sm leading-6 text-text-secondary [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]",
  tools: "mt-auto flex flex-wrap gap-2",
  toolTag: "rounded-md border border-primary/20 bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary",
  cardFooter: "border-t border-white/5 px-6 py-4",
  statusContainer: "flex min-h-[60vh] flex-col items-center justify-center gap-4 bg-background text-lg text-text-secondary",
  spinner: "animate-spin text-primary",
  modalOverlay: "fixed inset-0 z-[1000] flex items-center justify-center bg-background/85 p-5 backdrop-blur-md",
  modalContent: "max-h-[90vh] w-full max-w-[700px] overflow-y-auto rounded-2xl border border-white/10 bg-background shadow-[0_25px_50px_rgba(0,0,0,0.5)]",
  modalHeader: "flex items-center justify-between border-b border-white/5 px-6 py-5",
  closeModalBtn: "flex items-center justify-center rounded-full p-2 text-text-secondary transition-all hover:rotate-90 hover:bg-white/10 hover:text-foreground",
  modalBody: "p-6",
  previewContent: "flex flex-col gap-6",
  previewImageWrapper: "relative aspect-video w-full overflow-hidden rounded-lg border border-white/10",
  fullDescription: "whitespace-pre-wrap text-base leading-8 text-text-secondary",
  previewTools: "flex flex-wrap gap-2.5",
  previewLinks: "flex flex-col gap-4 sm:flex-row",
};

const ProjectImage = ({ src, alt }: { src: string; alt: string }) => {
  const [hasError, setHasError] = useState(false);
  if (!src || hasError) {
    return (
      <div className={styles.imageFallback}>
        <ImageIcon size={30} className={styles.fallbackIcon} />
        <span>No image</span>
      </div>
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={styles.image}
      sizes="(max-width: 768px) 100vw, 400px"
      onError={() => setHasError(true)}
    />
  );
};

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) => {
  if (!isOpen) return null;
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className="text-xl font-bold text-foreground">{title}</h2>
          <button
            className={styles.closeModalBtn}
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>
        <div className={styles.modalBody}>{children}</div>
      </div>
    </div>
  );
};

export default function AllProjectsPage() {
  const { data, isLoading, isError } = useGetAllProject();

  // 2. Use the Project type instead of 'any'
  const [preview, setPreview] = useState<Project | null>(null);

  // Safely cast data from query
  const projects = (data ?? []) as Project[];

  if (isLoading) {
    return (
      <div className={styles.statusContainer}>
        <Loader2 className={styles.spinner} size={40} />
        <p>Loading projects...</p>
      </div>
    );
  }

  if (isError || projects.length === 0) {
    return (
      <div className={styles.statusContainer}>
        <p>No projects found. Check back soon!</p>
      </div>
    );
  }

  return (
    <section id="projects" className={styles.section}>
      <div className={styles.content}>
        <header className={styles.header}>
          <h1 className="mb-4 text-[clamp(2.5rem,5vw,3.5rem)] font-black text-foreground">
            My <span className={styles.highlight}>Projects</span>
          </h1>
          <p className={styles.subtitle}>
            A showcase of my recent work, from web applications to creative
            experiments.
          </p>
        </header>

        <div className={styles.grid}>
          {projects.map((p, index) => (
            <article
              key={p.id}
              className={styles.card}
              style={{ "--index": index } as React.CSSProperties}
            >
              <div className={styles.imageWrapper}>
                <ProjectImage src={p.imageUrl} alt={p.title} />
              </div>

              <div className={styles.cardBody}>
                <h3 className={styles.title}>{p.title}</h3>
                {/* 3-line truncation handled via Tailwind */}
                <p className={styles.description}>{p.description}</p>

                <div className={styles.tools}>
                  {p.tools?.slice(0, 3).map((t) => (
                    <span key={t} className={styles.toolTag}>
                      {t}
                    </span>
                  ))}
                  {p.tools?.length > 3 && (
                    <span className={styles.toolTag}>
                      +{p.tools.length - 3}
                    </span>
                  )}
                </div>
              </div>

              <div className={styles.cardFooter}>
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  onClick={() => setPreview(p)}
                >
                  <Eye size={16} /> Details
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>

      <Modal
        isOpen={!!preview}
        onClose={() => setPreview(null)}
        title={preview?.title || ""}
      >
        <div className={styles.previewContent}>
          <div className={styles.previewImageWrapper}>
            <ProjectImage
              src={preview?.imageUrl || ""}
              alt={preview?.title || ""}
            />
          </div>
          {/* Full description shown here */}
          <p className={styles.fullDescription}>{preview?.description}</p>
          <div className={styles.previewTools}>
            {preview?.tools?.map((t) => (
              <span key={t} className={styles.toolTag}>
                {t}
              </span>
            ))}
          </div>
          <div className={styles.previewLinks}>
            {preview?.liveLink && (
              <Button
                variant="primary"
                onClick={() => window.open(preview.liveLink, "_blank")}
              >
                <CiShare1 size={20} /> Live Demo
              </Button>
            )}
            {preview?.projectLink && (
              <Button
                variant="outline"
                onClick={() => window.open(preview.projectLink, "_blank")}
              >
                <FiGithub size={20} /> View Code
              </Button>
            )}
          </div>
        </div>
      </Modal>
    </section>
  );
}
