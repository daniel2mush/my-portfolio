"use client";

import { IoCode, IoColorPaletteOutline, IoRocket } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import type { IconType } from "react-icons";

// Extracted data for cleaner JSX
const corePillars = [
  {
    title: "Bulletproof Architecture",
    description: "Writing scalable, maintainable code that doesn't break when your user base doubles.",
    icon: IoCode,
  },
  {
    title: "Pixel-Perfect Execution",
    description: "Bridging the gap between Figma and React. If it's designed, I can build it flawlessly.",
    icon: IoColorPaletteOutline,
  },
  {
    title: "Relentless Optimization",
    description: "Obsessing over milliseconds, LCP scores, and smooth 60fps interactions.",
    icon: IoRocket,
  },
  {
    title: "Cross-Functional Synergy",
    description: "I speak both 'developer' and 'designer', eliminating friction in the product pipeline.",
    icon: FiUser,
  },
];

export default function AboutMe() {
  return (
    <>
      {/* Self-contained animation keyframes */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          opacity: 0;
          animation: fadeIn 0.8s ease-out forwards;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
      `}</style>

      <section
        id="about"
        className="relative min-h-screen overflow-hidden bg-background px-4 py-24 sm:px-6 lg:py-32"
      >
        {/* Subtle background gradient */}
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(var(--primary-rgb),0.08),transparent_50%)]"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-6xl">
          {/* Section Header */}
          <header className="mb-16 flex flex-col items-center text-center animate-fade-in">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
              </span>
              The Philosophy
            </div>
            <h2 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Beyond the <span className="text-primary">Codebase</span>
            </h2>
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
              I exist at the intersection of logic and aesthetics. I don&apos;t just build applications;
              I engineer digital ecosystems that feel as good as they perform.
            </p>
          </header>

          {/* Main Grid Content */}
          <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
            {/* Left Column: The Story */}
            <article className="lg:col-span-3 flex flex-col justify-center animate-fade-in delay-100">
              <h3 className="mb-6 text-2xl font-bold text-foreground sm:text-3xl">
                Bridging the gap between engineering and design.
              </h3>

              <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
                <p>
                  While most developers focus solely on the backend, and designers obsess over the pixels,
                  I live in the space in between. My journey started with a simple question: <em className="text-foreground font-medium">Why can&apos;t software be both incredibly powerful and beautiful to use?</em>
                </p>
                <p>
                  Today, I specialize in architecting high-performance Next.js and Node.js platforms, backed by
                  design systems that scale. I believe that accessibility, speed, and stunning visuals aren&apos;t
                  mutually exclusive—they are the baseline.
                </p>
              </div>

              {/* Expertise Tags */}
              <div className="mt-8 flex flex-wrap gap-3">
                {["System Architecture", "UI/UX Engineering", "Performance Optimization", "Open Source"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border bg-card/50 px-4 py-1.5 text-sm font-medium text-foreground backdrop-blur-sm transition-colors hover:border-primary/50 hover:bg-primary/5"
                    >
                      {tag}
                    </span>
                  ),
                )}
              </div>
            </article>

            {/* Right Column: Core Pillars (Bento Grid) */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 animate-fade-in delay-200">
              {corePillars.map((pillar, index) => (
                <div
                  key={pillar.title}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card/30 p-6 backdrop-blur-md transition-all duration-300 hover:border-primary/50 hover:bg-card/60 hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                    <pillar.icon size={20} strokeWidth={1.5} />
                  </div>
                  <h4 className="mb-2 text-lg font-semibold text-foreground">
                    {pillar.title}
                  </h4>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}