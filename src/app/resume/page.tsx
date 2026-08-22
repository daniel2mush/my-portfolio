"use client";

import { Download, Briefcase, GraduationCap, Globe, Code2, Palette, Sparkles } from "lucide-react";

// Data structure remains the same, just cleanly typed
const resumeData = {
  summary:
    "Versatile technologist and design leader bridging the gap between digital architecture and physical branding. I combine expertise in modern Full-Stack web development (React, Node.js) with extensive experience directing large-scale print production and UI/UX design. Passionate about building scalable applications and delivering pixel-perfect, high-impact visual experiences from screen to print.",
  skills: {
    technical: [
      "React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "Express", "PostgreSQL", "Zod",
    ],
    design: [
      "UI/UX Design", "Figma", "Adobe XD", "Photoshop", "Illustrator", "InDesign", "Large Format Printing", "Brand Identity",
    ],
  },
  languages: [
    { name: "English", level: "Fluent" },
    { name: "French", level: "Fluent" },
    { name: "Bambara", level: "Learning" },
  ],
  experience: [
    {
      role: "Head of Production & Senior Graphic Designer",
      company: "PactAfrique",
      period: "2020 - Present",
      details: [
        "Direct end-to-end production for high-volume custom print items, including kakemonos, apparel, and corporate merchandise.",
        "Led the comprehensive design and print execution for major national events, including the Salon Monétique National du Mali (SamonaM).",
        "Design engaging magazine layouts, promotional materials, and brand identities, optimizing for maximum visual impact.",
        "Ensure rigorous quality control across all print-ready files and final physical deliverables.",
      ],
    },
    {
      role: "Freelance Full-Stack Developer & UI/UX Designer",
      company: "Independent",
      period: "2021 - Present",
      details: [
        "Architect and develop responsive, high-performance web applications utilizing React, Next.js, and modern CSS frameworks.",
        "Design intuitive UI/UX flows and interactive prototypes in Figma, translating complex client requirements into seamless user journeys.",
        "Implement robust backend solutions and authentication systems (Postgres, BetterAuth) to support scalable web platforms.",
      ],
    },
  ],
  education: [
    {
      degree: "Bachelor's in Computer Science",
      school: "University of Mali",
      period: "2017 - 2021",
    },
  ],
};

export default function ResumeSection() {
  return (
    <section id="resume" className="relative min-h-screen overflow-hidden bg-background px-4 py-24 sm:px-6 lg:py-32">
      {/* Background Elements */}
      <div   className="absolute inset-0 h-full w-full opacity-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[16px_16px]"
 />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <header className="mb-16 flex flex-col items-center text-center animate-fade-in-up">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-1.5 text-sm font-medium text-muted-foreground backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
            </span>
            Career Timeline
          </div>
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            My <span className="text-gradient">Resume</span>
          </h2>
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
            A snapshot of my professional journey, technical milestones, and creative leadership.
          </p>
        </header>

        {/* Summary Block */}
        <div
          className="animate-fade-in-up glass mb-10 rounded-2xl p-8 sm:p-10 border-l-4 border-l-primary/50"
          style={{ animationDelay: "100ms" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <h3 className="text-lg font-semibold text-foreground">Professional Summary</h3>
          </div>
          <p className="text-lg leading-relaxed text-muted-foreground">
            {resumeData.summary}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-8 lg:grid-cols-5">

          {/* Left Column: Experience */}
          <div className="lg:col-span-3 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            <div className="glass rounded-2xl p-6 sm:p-8 h-full">
              <div className="flex items-center gap-3 mb-8">
                <Briefcase className="text-primary" size={20} />
                <h3 className="text-xl font-semibold text-foreground">Experience</h3>
              </div>

              {/* Custom Timeline */}
              <div className="relative pl-8 space-y-10">
                {/* Gradient Line */}
                <div className="absolute left-0 top-0 h-full w-0.5 bg-gradient-to-b from-primary via-border to-transparent" />

                {resumeData.experience.map((job, i) => (
                  <div key={i} className="relative">
                    {/* Glowing Dot */}

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
                      <h4 className="text-lg font-bold text-foreground">{job.role}</h4>
                      <span className="text-xs font-medium uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-0.5 rounded-full w-fit border border-primary/20">
                        {job.period}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-muted-foreground mb-4">{job.company}</p>

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

          {/* Right Column: Sidebar (Skills, Edu, Languages) */}
          <div className="lg:col-span-2 flex flex-col gap-6 animate-fade-in-up" style={{ animationDelay: "300ms" }}>

            {/* Technical Skills */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Code2 className="text-primary" size={18} />
                <h3 className="font-semibold text-foreground">Engineering Stack</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.technical.map((skill) => (
                  <span key={skill} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Design Skills */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Palette className="text-primary" size={18} />
                <h3 className="font-semibold text-foreground">Design & Production</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.design.map((skill) => (
                  <span key={skill} className="px-3 py-1 rounded-full bg-secondary/50 text-secondary-foreground text-xs font-medium border border-border/50">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Education & Languages Combined */}
            <div className="glass rounded-2xl p-6 space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <GraduationCap className="text-primary" size={18} />
                  <h3 className="font-semibold text-foreground">Education</h3>
                </div>
                {resumeData.education.map((edu, i) => (
                  <div key={i}>
                    <h4 className="text-sm font-bold text-foreground">{edu.degree}</h4>
                    <p className="text-xs text-muted-foreground">{edu.school} • {edu.period}</p>
                  </div>
                ))}
              </div>

              <div className="h-px bg-border/50" />

              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Globe className="text-primary" size={18} />
                  <h3 className="font-semibold text-foreground">Languages</h3>
                </div>
                <div className="space-y-2">
                  {resumeData.languages.map((lang) => (
                    <div key={lang.name} className="flex items-center justify-between text-sm">
                      <span className="text-foreground font-medium">{lang.name}</span>
                      <span className="text-muted-foreground text-xs">{lang.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Download CTA */}
        <div className="mt-12 flex justify-center animate-fade-in-up" style={{ animationDelay: "400ms" }}>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
          >
            <Download size={18} className="transition-transform group-hover:-translate-y-0.5" />
            Download Full Resume
          </a>
        </div>
      </div>
    </section>
  );
}