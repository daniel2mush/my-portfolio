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
import styles from "./Projects.module.scss";

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
          <h2>{title}</h2>
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
          <h1>
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
                {/* 3-line truncation handled via SCSS */}
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
