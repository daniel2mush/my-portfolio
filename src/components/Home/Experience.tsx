"use client";

import { Briefcase, GraduationCap, Globe, Award } from "lucide-react";


import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function Experience() {
  const {t} = useLanguage();
  const e = t.experience
  return (
    <section id="resume" className="relative h-auto overflow-hidden bg-background px-4 py-24 sm:px-6 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl">
        <header className="mb-16 flex flex-col items-center text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-1.5 text-sm font-medium text-muted-foreground backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
            </span>
            {e.badge}
          </div>
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {e.title1} <span className="text-gradient">{e.title2}</span>
          </h2>
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {e.subtitle}
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Experience Column */}
          <div className="lg:col-span-3">
            <div className="glass rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-8">
                <Briefcase className="text-primary" size={20} />
                <h3 className="text-xl font-semibold text-foreground">{e.workTitle}</h3>
              </div>

              <div className="relative pl-8 space-y-10">
                <div className="absolute left-0 top-0 h-full w-0.5 bg-gradient-to-b from-primary via-border to-transparent" />

                {e.items.map((job, i) => (
                  <div key={i} className="relative">

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
                      <h4 className="text-lg font-bold text-foreground">{job.role}</h4>
                      <span className={`text-xs font-medium uppercase tracking-wider px-2.5 py-0.5 rounded-full w-fit border ${
                        job.current
                          ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                          : 'bg-primary/10 text-primary border-primary/20'
                      }`}>
                        {job.current ? 'Current' : job.period}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-muted-foreground mb-4">
                      {job.company} • {job.location}
                    </p>

                    <ul className="space-y-3 text-sm leading-relaxed text-muted-foreground">
                      {job.details.map((detail, idx) => (
                        <li key={idx} className="flex gap-3">
                          <span className="mt-2 size-1 shrink-0 rounded-full bg-primary/60" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Education */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <GraduationCap className="text-primary" size={18} />
                <h3 className="font-semibold text-foreground">{e.educationTitle}</h3>
              </div>
              <div className="space-y-5">
                {e.education.map((edu, i) => (
                  <div key={i} className="border-l-2 border-primary/30 pl-4">
                    <h4 className="text-sm font-bold text-foreground">{edu.degree}</h4>
                    <p className="text-xs text-muted-foreground mb-1">{edu.school} • {edu.period}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{edu.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="text-primary" size={18} />
                <h3 className="font-semibold text-foreground">{e.languagesTitle}</h3>
              </div>
              <div className="space-y-3">
<div className="space-y-3">
  {/* Map through the translated languages array */}
  {t.experience.languages.map((language, i) => (
    <div className="flex items-center justify-between" key={i}>

      {/* Left side: Name and Level */}
      <div>
        <p className="text-sm font-semibold text-foreground">{language.name}</p>
        <p className="text-xs text-muted-foreground">{language.level}</p>
      </div>

      {/* Right side: Progress Bars */}
      <div className="flex gap-0.5">
        {/* 1. Render the FILLED bars based on the 'bars' number from translations */}
        {Array.from({ length: language.bars }).map((_, idx) => (
          <div key={`filled-${idx}`} className="h-1.5 w-4 rounded-full bg-primary" />
        ))}

        {/* 2. Render the EMPTY bars to make up the remaining total of 5 */}
        {Array.from({ length: 5 - language.bars }).map((_, idx) => (
          <div key={`empty-${idx}`} className="h-1.5 w-4 rounded-full bg-primary/20" />
        ))}
      </div>

    </div>
  ))}
</div>              </div>
            </div>

            {/* Nationality */}
            <div className="glass rounded-2xl p-6 border-l-4 border-l-primary/50">
              <div className="flex items-center gap-3 mb-2">
                <Award className="text-primary" size={18} />
                <h3 className="font-semibold text-foreground">{e.nationalityTitle}</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                {e.nationality}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                {e.nationalityNote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}