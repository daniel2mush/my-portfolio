"use client";

import Image from "next/image";
import Link from "next/link";
import { FiGithub, FiLinkedin, FiMail, FiArrowUp } from "react-icons/fi";
import { scrollToSection } from "@/components/appComponent/scroll";
import { usePathname } from "next/navigation";

const quickLinks = [
  { name: "Home", link: "#home" },
  { name: "About", link: "#about" },
  { name: "Skills", link: "#skills" },
  { name: "Projects", link: "#projects" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const pathName = usePathname();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (pathName === "/auth" || pathName === "/admin") {
    return null; // Don't render the footer on auth or admin pages
  }

  return (
    <footer className="relative z-10 overflow-hidden border-t border-white/5 bg-background/95 px-5 pb-8 pt-16">
      <div
        className="absolute left-1/2 top-0 h-px w-4/5 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/50 to-transparent shadow-[0_0_15px_rgba(242,242,242,0.4)]"
        aria-hidden="true"
      />

      <div className="mx-auto flex w-full max-w-[1200px] flex-col">
        <div className="mb-14 grid grid-cols-1 gap-8 text-center md:grid-cols-2 md:text-left lg:grid-cols-[2fr_1fr_1fr]">
          <div className="flex flex-col items-center gap-5 md:items-start">
            <Link
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleScrollToTop();
              }}
            >
              <div className="relative h-10 w-[120px] transition-opacity hover:opacity-80">
                <Image
                  src="/logo.png"
                  alt="Daniel Logo"
                  fill
                  className="object-contain invert"
                />
              </div>
            </Link>
            <p className="max-w-80 text-sm leading-6 text-text-secondary">
              Building fast, scalable, and beautiful digital experiences across
              the web.
            </p>
          </div>

          <div className="flex flex-col gap-5">
            <h3 className="text-lg font-bold text-foreground">Quick Links</h3>
            <nav className="flex flex-col items-center gap-2 md:items-start">
              {quickLinks.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.link)}
                  className="w-fit p-0 text-sm text-text-secondary transition-all hover:-translate-y-0.5 hover:text-primary md:hover:translate-x-1 md:hover:translate-y-0"
                >
                  {item.name}
                </button>
              ))}
              <Link
                href="/resume"
                className="w-fit text-sm text-text-secondary transition-all hover:-translate-y-0.5 hover:text-primary md:hover:translate-x-1 md:hover:translate-y-0"
              >
                Resume
              </Link>
            </nav>
          </div>

          <div className="flex flex-col gap-5">
            <h3 className="text-lg font-bold text-foreground">Connect</h3>
            <div className="flex items-center justify-center gap-4 md:justify-start">
              <a
                href="https://github.com/daniel2mush"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="flex size-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-text-secondary transition-all hover:-translate-y-1 hover:border-primary hover:bg-primary hover:text-primary-foreground"
              >
                <FiGithub size={22} />
              </a>
              <a
                href="https://www.linkedin.com/in/daniel-ogbeide/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex size-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-text-secondary transition-all hover:-translate-y-1 hover:border-primary hover:bg-primary hover:text-primary-foreground"
              >
                <FiLinkedin size={22} />
              </a>
              <a
                href="mailto:Daniel2mush@gmail.com"
                aria-label="Email"
                className="flex size-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-text-secondary transition-all hover:-translate-y-1 hover:border-primary hover:bg-primary hover:text-primary-foreground"
              >
                <FiMail size={22} />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col-reverse items-center justify-between gap-5 border-t border-white/10 pt-8 text-center md:flex-row md:text-left">
          <div className="flex flex-col items-center gap-1 text-sm text-text-secondary md:flex-row md:gap-2">
            <p>© {currentYear} Daniel. All rights reserved.</p>
            <span className="text-white/40 md:before:mr-2 md:before:content-['•']">
              Crafted in Bamako.
            </span>
          </div>

          <button
            onClick={handleScrollToTop}
            className="flex size-10 items-center justify-center rounded-md border border-white/10 bg-white/5 text-foreground transition-all hover:-translate-y-1 hover:bg-foreground hover:text-background"
            aria-label="Scroll back to top"
          >
            <FiArrowUp size={20} />
          </button>
        </div>
      </div>
    </footer>
  );
}
