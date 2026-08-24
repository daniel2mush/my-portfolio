"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";


export default function Skills() {

  const {t} = useLanguage();

  const s = t.skills
  return (
    <section id="skills" className="relative h-auto overflow-hidden bg-background px-4 py-24 sm:px-6 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" aria-hidden="true" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl">
        <header className="mb-16 flex flex-col items-center text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-1.5 text-sm font-medium text-muted-foreground backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
            </span>
            {s.badge}
          </div>
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {s.title1}<span className="text-gradient">{s.title2}</span>
          </h2>
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {s.subtitle}
          </p>
        </header>

        <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-4">
          {s.skills && s.skills.map((skill) => (
            <div
              key={skill.name}
              className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/30 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--theme)]/50 hover:shadow-xl hover:shadow-[var(--theme)]/5"
              style={{ "--theme": skill.color } as React.CSSProperties}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--theme)]/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative z-10">
                <div className="mb-6 flex items-center gap-4">
                  <div
                    className="flex size-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${skill.color}15`, color: skill.color }}
                  >
                    <skill.icon size={24} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{skill.name}</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {skill.skillSet.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-border/50 bg-background/50 px-3 py-1 text-xs font-medium text-muted-foreground transition-all duration-300 group-hover:border-[var(--theme)]/30 group-hover:text-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {s.serviceStats.map((stat) => (
            <div
              key={stat.name}
              className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/20 p-6 backdrop-blur-sm transition-all duration-300 hover:border-[var(--theme)]/50 hover:shadow-lg hover:shadow-[var(--theme)]/5"
              style={{ "--theme": stat.color } as React.CSSProperties}
            >
              <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-[var(--theme)] to-transparent opacity-60 transition-opacity group-hover:opacity-100" />
              <span className="block text-4xl font-bold tracking-tight transition-transform duration-300 group-hover:scale-105" style={{ color: stat.color }}>
                {stat.value}<span className="text-2xl text-muted-foreground">{stat.suffix}</span>
              </span>
              <p className="mt-2 text-sm font-medium text-muted-foreground">{stat.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}