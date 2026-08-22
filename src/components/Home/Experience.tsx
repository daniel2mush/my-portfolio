"use client";

import { Briefcase, GraduationCap, Globe, Award } from "lucide-react";

const experience = [
  {
    role: "Graphic Designer",
    company: "PACT Afrique",
    location: "Bamako, Mali",
    period: "June 2020 — Present",
    current: true,
    details: [
      "Lead graphic production for the company — from concept to final print delivery.",
      "Design catalogues, brochures, flyers, institutional documents, and large-format supports (banners, kakémonos).",
      "Create customized promotional merchandise: T-shirts, mugs, agendas, calendars.",
      "Prepare print-ready files and ensure quality control across all productions.",
      "Manage multiple client projects simultaneously with strict deadlines.",
    ],
  },
  {
    role: "Infographer / Graphic Designer",
    company: "Infographe Com",
    location: "Bamako, Mali",
    period: "Jan 2020 — Feb 2021",
    current: false,
    details: [
      "Designed logos, illustrations, and promotional materials for diverse clients.",
      "Managed graphic projects end-to-end, from initial brief to final delivery.",
      "Adapted designs based on client feedback while maintaining brand consistency.",
    ],
  },
  {
    role: "Head of Communication",
    company: "Lexy",
    location: "Bamako, Mali",
    period: "May 2017 — Oct 2019",
    current: false,
    details: [
      "Directed the entire communication department of the company.",
      "Supervised and mentored two junior graphic designers.",
      "Developed visual communication strategies to strengthen company visibility.",
      "Ensured visual consistency and quality control across all productions.",
      "Organized task distribution and coordinated the graphic team's workflow.",
    ],
  },
];

const education = [
  {
    degree: "Web Development Training",
    school: "Udemy — Self-directed",
    period: "Ongoing",
    description: "JavaScript, TypeScript, React, Next.js, Python, FastAPI, PostgreSQL, and modern web technologies.",
  },
  {
    degree: "Graphic Design & Visual Communication",
    school: "Udemy — Self-directed",
    period: "2018 — 2020",
    description: "Graphic design, visual identity, illustration, and graphic communication.",
  },
];

export default function Experience() {
  return (
    <section id="resume" className="relative min-h-screen overflow-hidden bg-background px-4 py-24 sm:px-6 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl">
        <header className="mb-16 flex flex-col items-center text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-1.5 text-sm font-medium text-muted-foreground backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
            </span>
            Career Path
          </div>
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Professional <span className="text-gradient">Experience</span>
          </h2>
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Nearly a decade of delivering visual communication and building digital products.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Experience Column */}
          <div className="lg:col-span-3">
            <div className="glass rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-8">
                <Briefcase className="text-primary" size={20} />
                <h3 className="text-xl font-semibold text-foreground">Work Experience</h3>
              </div>

              <div className="relative pl-8 space-y-10">
                <div className="absolute left-0 top-0 h-full w-0.5 bg-gradient-to-b from-primary via-border to-transparent" />

                {experience.map((job, i) => (
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
                <h3 className="font-semibold text-foreground">Education & Training</h3>
              </div>
              <div className="space-y-5">
                {education.map((edu, i) => (
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
                <h3 className="font-semibold text-foreground">Languages</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-foreground">English</p>
                    <p className="text-xs text-muted-foreground">Native</p>
                  </div>
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(i => <div key={i} className="h-1.5 w-4 rounded-full bg-primary" />)}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-foreground">French</p>
                    <p className="text-xs text-muted-foreground">Professional</p>
                  </div>
                  <div className="flex gap-0.5">
                    {[1,2,3,4].map(i => <div key={i} className="h-1.5 w-4 rounded-full bg-primary" />)}
                    <div className="h-1.5 w-4 rounded-full bg-primary/20" />
                  </div>
                </div>
              </div>
            </div>

            {/* Nationality */}
            <div className="glass rounded-2xl p-6 border-l-4 border-l-primary/50">
              <div className="flex items-center gap-3 mb-2">
                <Award className="text-primary" size={18} />
                <h3 className="font-semibold text-foreground">Nationality</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Nigerian 🇳🇬 • Based in Bamako, Mali 🇲🇱
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Available for remote work and international collaborations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}