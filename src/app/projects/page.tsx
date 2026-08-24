"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Loader2, Image as ImageIcon, X, ExternalLink, Github, FolderKanban } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

import { Project } from "@/types/project";
import { useGetAllProject } from "@/lib/query/projectQuery";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// --- Sub-Components ---

const ProjectImage = ({ src, alt }: { src: string; alt: string }) => {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-muted text-muted-foreground">
        <ImageIcon size={32} className="opacity-50" />
        <span className="text-xs font-medium">No Image</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover transition-transform duration-500 group-hover:scale-105"
      sizes="(max-width: 768px) 100vw, 400px"
      onError={() => setHasError(true)}
    />
  );
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  useEffect(() => {
    if (!isOpen) return;

    // Lock body scroll
    const originalStyle = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Close on Escape
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalStyle;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className="glass relative z-10 w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl border border-border shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-border/50 bg-background/80 px-6 py-4 backdrop-blur-md">
          <h2 id="modal-title" className="text-lg font-semibold text-foreground truncate pr-4">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="flex size-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

// --- Skeleton Loader ---
const ProjectSkeleton = () => (
  <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card animate-pulse">
    <div className="aspect-video bg-muted" />
    <div className="flex flex-1 flex-col p-6 space-y-4">
      <div className="h-6 w-3/4 rounded bg-muted" />
      <div className="h-4 w-full rounded bg-muted" />
      <div className="h-4 w-5/6 rounded bg-muted" />
      <div className="mt-auto pt-4 flex gap-2">
        <div className="h-6 w-16 rounded-full bg-muted" />
        <div className="h-6 w-16 rounded-full bg-muted" />
      </div>
    </div>
  </div>
);

// --- Main Component ---
export default function AllProjectsPage() {
  const { t } = useLanguage();
  const { data, isLoading, isError } = useGetAllProject();
  const [preview, setPreview] = useState<Project | null>(null);

  const projects = (data ?? []) as Project[];

  if (isLoading) {
    return (
      <section className="relative min-h-screen overflow-hidden bg-background px-4 py-24 sm:px-6 lg:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 flex flex-col items-center text-center">
            <div className="mb-4 h-6 w-32 rounded-full bg-muted animate-pulse" />
            <div className="h-10 w-64 rounded bg-muted animate-pulse" />
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <ProjectSkeleton />
            <ProjectSkeleton />
            <ProjectSkeleton />
            <ProjectSkeleton />
            <ProjectSkeleton />
            <ProjectSkeleton />
          </div>
        </div>
      </section>
    );
  }

  if (isError || projects.length === 0) {
    return (
      <section className="flex min-h-[80vh] flex-col items-center justify-center bg-background px-4 text-center">
        <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-muted/50 text-muted-foreground">
          <FolderKanban size={32} />
        </div>
        <h2 className="mb-2 text-2xl font-bold text-foreground">{t.projects.emptyTitle}</h2>
        <p className="max-w-md text-muted-foreground">
          {t.projects.emptySubtitle}
        </p>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-background px-4 py-24 sm:px-6 lg:py-32">
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" aria-hidden="true" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <header className="mb-16 flex flex-col items-center text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-1.5 text-sm font-medium text-muted-foreground backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
            </span>
            Portfolio
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {t.projects.title1} <span className="text-gradient">{t.projects.title2}</span>
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {t.projects.subtitle}
          </p>
        </header>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, index) => (
            <article
              key={p.id}
              className="group glass relative flex flex-col overflow-hidden rounded-2xl border border-border/60 transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 animate-fade-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="relative aspect-video w-full overflow-hidden bg-muted">
                <ProjectImage src={p.imageUrl} alt={p.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              <div className="flex grow flex-col p-6">
                <h3 className="mb-2 text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                  {p.title}
                </h3>
                <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                  {p.description}
                </p>

                <div className="mt-auto flex flex-wrap gap-2">
                  {p.tools?.slice(0, 3).map((t_item) => (
                    <span key={t_item} className="rounded-md border border-border/50 bg-background/50 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                      {t_item}
                    </span>
                  ))}
                  {p.tools && p.tools.length > 3 && (
                    <span className="text-[10px] font-medium text-muted-foreground self-center">
                      +{p.tools.length - 3}
                    </span>
                  )}
                </div>
              </div>

              <div className="border-t border-border/50 px-6 py-4">
                <Button
                  variant="outline"
                  className="w-full gap-2"
                  onClick={() => setPreview(p)}
                >
                  <ExternalLink size={16} /> {t.projects.details}
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Preview Modal */}
      <Modal
        isOpen={!!preview}
        onClose={() => setPreview(null)}
        title={preview?.title || ""}
      >
        <div className="space-y-6">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border bg-muted">
            <ProjectImage
              src={preview?.imageUrl || ""}
              alt={preview?.title || ""}
            />
          </div>

          <p className="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
            {preview?.description}
          </p>

          {preview?.tools && preview.tools.length > 0 && (
            <div>
              <h4 className="mb-3 text-sm font-semibold text-foreground">{t.projects.techStack}</h4>
              <div className="flex flex-wrap gap-2">
                {preview.tools.map((t_item) => (
                  <span key={t_item} className="rounded-md border border-border/50 bg-muted/50 px-2.5 py-1 text-xs font-medium text-foreground">
                    {t_item}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-3 sm:flex-row pt-2">
            {preview?.liveLink && (
              <a href={preview.liveLink} target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button variant="default" className="w-full gap-2">
                  <ExternalLink size={16} /> {t.projects.liveDemo}
                </Button>
              </a>
            )}
            {preview?.projectLink && (
              <a href={preview.projectLink} target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button variant="outline" className="w-full gap-2">
                  <Github size={16} /> {t.projects.viewCode}
                </Button>
              </a>
            )}
          </div>
        </div>
      </Modal>
    </section>
  );
}