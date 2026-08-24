"use client";

import { Code2, Palette, Briefcase, Globe } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";

// Icons zipped by index with the translated pillars
const pillarIcons = [Palette, Code2, Briefcase, Globe];

export default function AboutMe() {
  const { t } = useLanguage();

  return (
    <section
      id="about"
      className="relative h-auto overflow-hidden bg-background px-4 py-24 sm:px-6 lg:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.06),transparent_50%)]"
        aria-hidden="true"
      />
       <Image
            src="/bg.png"
            alt="Abstract background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-5"
          />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <header className="mb-16 flex flex-col items-center text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-1.5 text-sm font-medium text-muted-foreground backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
            </span>
            {t.about.badge}
          </div>
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {t.about.title1} <span className="text-gradient">{t.about.title2}</span>
          </h2>
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {t.about.subtitle}
          </p>
        </header>

        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Left: Professional Photo */}
          <div className="lg:col-span-2">
            <div className="group relative">
              {/* Soft glow frame */}

              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-primary/25 to-transparent opacity-60 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

              <div className="glass relative overflow-hidden rounded-2xl border border-border/60">
                <div className="relative aspect-[4/5]">
                  <Image
                    src="/daniel.jpg"
                    alt={t.about.photo.alt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 80vw, 400px"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  {/* Bottom gradient for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-xl font-bold text-white">{t.about.photo.name}</p>
                    <p className="text-sm text-white/70">{t.about.photo.role}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Story */}
          <article className="lg:col-span-3 flex flex-col justify-center">
            <h3 className="mb-6 text-2xl font-bold text-foreground sm:text-3xl">
              {t.about.heading}
            </h3>

            <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
              <p>{t.about.p3}</p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {t.about.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border bg-card/50 px-4 py-1.5 text-sm font-medium text-foreground backdrop-blur-sm transition-colors hover:border-primary/50 hover:bg-primary/5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
        </div>

        {/* Pillars Grid */}
        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.about.pillars.map((pillar, index) => {
            const Icon = pillarIcons[index];
            return (
              <div
                key={pillar.title}
                className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/30 p-6 backdrop-blur-md transition-all duration-300 hover:border-primary/50 hover:bg-card/60 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                  <Icon size={20} strokeWidth={1.5} />
                </div>
                <h4 className="mb-2 text-lg font-semibold text-foreground">{pillar.title}</h4>
                <p className="text-sm leading-relaxed text-muted-foreground">{pillar.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}