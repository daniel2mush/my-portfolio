"use client";

import { scrollToSection } from "@/components/appComponent/scroll";
import Image from "next/image";
import { FiGithub, FiLinkedin, FiMail, FiInstagram } from "react-icons/fi";
import { IoArrowDown } from "react-icons/io5";
import {Button} from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/LanguageContext";


export default function HeroSection() {
  const {t} = useLanguage();

  const h = t.hero



  return (
    <>
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
        className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-background px-4 sm:px-6"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/bhero.jpg"
            alt="Abstract background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(28,28,28,0.3)_0%,var(--background)_100%)]" />
        </div>

        <div className="relative z-10 mx-auto flex max-w-5xl animate-fade-in-up flex-col items-center text-center">


          <h1 className="mb-6 text-4xl font-black leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            {h.title1}<br className="hidden sm:block" />
            <span className="text-gradient">{h.title2}</span>
          </h1>

          <p className="mb-10 max-w-2xl text-balance text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {
              h.subtitle
            }
          </p>

          <div className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button onClick={() => scrollToSection("#projects")} size="lg">
              {h.ctaWork}
            </Button>
            <Button
              onClick={() => scrollToSection("#contact")}
              size="lg"
              variant="outline"
            >
              {h.ctaContact}
            </Button>
          </div>

          <div className="flex items-center justify-center gap-5">
            <a
              href="https://github.com/daniel2mush"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="group flex size-12 items-center justify-center rounded-full border border-border/50 bg-card/50 text-foreground backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-primary hover:text-primary-foreground"
            >
              <FiGithub size={22} strokeWidth={1.5} />
            </a>
            <a
              href="https://www.linkedin.com/in/daniel-ogbeide/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="group flex size-12 items-center justify-center rounded-full border border-border/50 bg-card/50 text-foreground backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-primary hover:text-primary-foreground"
            >
              <FiLinkedin size={22} strokeWidth={1.5} />
            </a>
            <a
              href="https://www.instagram.com/ogbeide_daniiel/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Daniel Ogbeide"
              className="group flex size-12 items-center justify-center rounded-full border border-border/50 bg-card/50 text-foreground backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-primary hover:text-primary-foreground"
            >
              <FiInstagram size={22} strokeWidth={1.5}/>
            </a>
            <a
              href="mailto:daniel2mush@gmail.com"
              aria-label="Email"
              className="group flex size-12 items-center justify-center rounded-full border border-border/50 bg-card/50 text-foreground backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-primary hover:text-primary-foreground"
            >
              <FiMail size={22} strokeWidth={1.5} />
            </a>
          </div>
        </div>

        <a
          href="#about"
          aria-label="Scroll down"
          className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 animate-bounce text-muted-foreground transition-colors hover:text-primary"
        >
          <IoArrowDown size={32} />
        </a>
      </section>
    </>
  );
}