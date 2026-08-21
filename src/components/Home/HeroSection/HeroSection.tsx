"use client";

import { scrollToSection } from "@/components/appComponent/scroll";
import { Button } from "@/components/ui/Buttons/Buttons";
import Image from "next/image";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { IoArrowDown } from "react-icons/io5";

// Centralized social links for cleaner JSX
const SOCIAL_LINKS = [
  { href: "https://github.com/daniel2mush", icon: FiGithub, label: "GitHub", isExternal: true },
  { href: "https://www.linkedin.com/in/daniel-ogbeide/", icon: FiLinkedin, label: "LinkedIn", isExternal: true },
  { href: "mailto:daniel2mush@gmail.com", icon: FiMail, label: "Email", isExternal: false },
];

export default function HeroSection() {
  return (
    <>
      {/*
        Self-contained animation keyframes.
        This removes the need for a tailwind.config file completely.
      */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          opacity: 0;
          animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <section
        id="home"
        className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background px-4 sm:px-6"
      >
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/background.png"
            alt="Abstract background pattern"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* Content Layer */}
        <div className="relative z-10 mx-auto flex max-w-4xl animate-fade-in-up flex-col items-center text-center">

          {/* Headline: Highlighting the Dev/Design hybrid */}
          <h1 className="mb-6 text-4xl font-black leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl [text-shadow:0_4px_12px_rgba(0,0,0,0.4)]">
            Engineering Logic.<br className="hidden sm:block" />
            <span className="text-primary">Designing Emotion.</span>
          </h1>

          <p className="mb-10 max-w-2xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl [text-shadow:0_2px_8px_rgba(0,0,0,0.6)]">
            I’m Daniel. I architect high-performance full-stack systems and craft the striking visual experiences that bring them to life.
          </p>

          {/* CTA Buttons */}
          <div className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button onClick={() => scrollToSection("#projects")} size="lg">
              View My Work
            </Button>
            <Button
              onClick={() => scrollToSection("#contact")}
              size="lg"
              variant="outline"
            >
              Let's Talk
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-5">
            {SOCIAL_LINKS.map(({ href, icon: Icon, label, isExternal }) => (
              <a
                key={label}
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                aria-label={`Visit my ${label} profile`}
                className="group flex size-12 items-center justify-center rounded-full border border-border/50 bg-background/50 text-foreground backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/20"
              >
                <Icon size={22} strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <a
          href="#about"
          aria-label="Scroll down to about section"
          className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 animate-bounce text-muted-foreground transition-colors duration-300 hover:text-primary"
        >
          <IoArrowDown size={32} />
        </a>
      </section>
    </>
  );
}