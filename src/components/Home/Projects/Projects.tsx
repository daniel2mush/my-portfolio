"use client";

import { useGetAllProject } from "@/lib/query/projectQuery";
import { ExternalLink, Github, ArrowUpRight, Code2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/LanguageContext";


// --- Skeleton Loader for better UX ---
const ProjectSkeleton = () => (
  <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card animate-pulse">
    <div className="aspect-video bg-muted" />
    <div className="flex flex-1 flex-col p-6 space-y-4">
      <div className="h-6 w-3/4 rounded bg-muted" />
      <div className="h-4 w-full rounded bg-muted" />
      <div className="h-4 w-5/6 rounded bg-muted" />
      <div className="mt-auto pt-4 flex items-center justify-between border-t border-border/50">
        <div className="flex gap-2">
          <div className="h-6 w-16 rounded-full bg-muted" />
          <div className="h-6 w-16 rounded-full bg-muted" />
        </div>
        <div className="flex gap-2">
          <div className="size-8 rounded-full bg-muted" />
          <div className="size-8 rounded-full bg-muted" />
        </div>
      </div>
    </div>
  </div>
);

export default function Projects() {
  const { data: projects, isLoading, isError } = useGetAllProject(2);
  const {t} = useLanguage();
  const pp = t.projectsPage

  // 1. Loading State (Skeleton Grid)
  if (isLoading) {
    return (
      <section id="projects" className="relative h-auto overflow-hidden bg-background px-4 py-24 sm:px-6 lg:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 flex flex-col items-center text-center">
            <div className="mb-4 h-6 w-32 rounded-full bg-muted animate-pulse" />
            <div className="h-10 w-64 rounded bg-muted animate-pulse" />
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <ProjectSkeleton />
            <ProjectSkeleton />
          </div>
        </div>
      </section>
    );
  }

  // 2. Error or Empty State
  if (isError || !projects || projects.length === 0) {
    return (
      <section id="projects" className="flex min-h-[60vh] flex-col items-center justify-center bg-background px-4 text-center">
        <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-muted/50 text-muted-foreground">
          <Code2 size={32} />
        </div>
        <h2 className="mb-2 text-2xl font-bold text-foreground">{pp.emptyTitle}</h2>
        <p className="max-w-md text-muted-foreground">
          {pp.emptySubtitle}
        </p>
      </section>
    );
  }

  // 3. Main Content
  return (
    <section id="projects" className="relative h-auto overflow-hidden bg-background px-4 py-24 sm:px-6 lg:py-32">
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" aria-hidden="true" />
      <div className="pointer-events-none absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <header className="mb-16 flex flex-col items-center text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-1.5 text-sm font-medium text-muted-foreground backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
            </span>
            {pp.badge}
          </div>
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {pp.title1} <span className="text-gradient">{pp.title2}</span>
          </h2>
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {pp.subtitle}
          </p>
        </header>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {projects.map((p, index) => (
            <article
              key={p.id}
              // Uses the animation utility from your globals.css
              className="animate-fade-in-up group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image Area */}
              <Link
                href={p.liveLink || "#"}
                target="_blank"
                className="relative block aspect-video w-full overflow-hidden bg-muted"
              >
                {p.imageUrl ? (
                  <Image
                    src={p.imageUrl}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center text-muted-foreground/20">
                    <Code2 size={64} />
                  </div>
                )}
                {/* Gradient overlay for better text contrast if needed, or just visual depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                {/* "Visit" Indicator */}
                <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-black/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md opacity-0 transition-all duration-300 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
                  {pp.viewLive} <ArrowUpRight size={14} />
                </div>
              </Link>

              {/* Content Area */}
              <div className="flex flex-1 flex-col p-6">
                <h3 className="mb-2 text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  {p.title}
                </h3>
                <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                  {p.description}
                </p>

                {/* Footer: Tags & Actions */}
                <div className="mt-auto flex items-center justify-between border-t border-border/50 pt-4">
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {p.tools?.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="rounded-md bg-secondary/50 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-secondary-foreground"
                      >
                        {t}
                      </span>
                    ))}
                    {p.tools && p.tools.length > 3 && (
                       <span className="text-xs text-muted-foreground">+{p.tools.length - 3}</span>
                    )}
                  </div>

                  {/* Action Icons */}
                  <div className="flex gap-2">
                    {p.projectLink && (
                      <Link
                        href={p.projectLink}
                        target="_blank"
                        className="flex size-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
                        aria-label="View Source Code"
                      >
                        <Github size={16} />
                      </Link>
                    )}
                    {p.liveLink && (
                      <Link
                        href={p.liveLink}
                        target="_blank"
                        className="flex size-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
                        aria-label="View Live Demo"
                      >
                        <ExternalLink size={16} />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-16 flex justify-center">
          {/*
             Using asChild is the correct way to handle Links inside Buttons in modern UI libs.
             If your custom Button doesn't support it, just remove 'asChild' and wrap the Button in the Link.
          */}
          <Link href="/projects">
            <Button size="lg" variant="outline" className="group gap-2">
              {pp.viewAll}
              <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}