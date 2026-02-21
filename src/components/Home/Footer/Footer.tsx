"use client";

import Image from "next/image";
import Link from "next/link";
import { FiGithub, FiLinkedin, FiMail, FiArrowUp } from "react-icons/fi";
import { scrollToSection } from "@/components/appComponent/scroll";
import styles from "./Footer.module.scss";
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
    <footer className={styles.footer}>
      {/* Subtle top glowing border */}
      <div className={styles.glowBar} aria-hidden="true" />

      <div className={styles.container}>
        {/* Top Section: 3 Columns */}
        <div className={styles.topSection}>
          {/* Brand Column */}
          <div className={styles.brandCol}>
            <Link
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleScrollToTop();
              }}
            >
              <div className={styles.logoContainer}>
                <Image
                  src="/logo.png"
                  alt="Daniel Logo"
                  fill
                  className={styles.logo}
                />
              </div>
            </Link>
            <p className={styles.brandDescription}>
              Building fast, scalable, and beautiful digital experiences across
              the web.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className={styles.linksCol}>
            <h3>Quick Links</h3>
            <nav className={styles.navLinks}>
              {quickLinks.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.link)}
                  className={styles.navLink}
                >
                  {item.name}
                </button>
              ))}
              <Link href="/resume" className={styles.navLink}>
                Resume
              </Link>
            </nav>
          </div>

          {/* Socials Column */}
          <div className={styles.socialCol}>
            <h3>Connect</h3>
            <div className={styles.socialIcons}>
              <a
                href="https://github.com/daniel2mush"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <FiGithub size={22} />
              </a>
              <a
                href="https://www.linkedin.com/in/daniel-ogbeide/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <FiLinkedin size={22} />
              </a>
              <a href="mailto:Daniel2mush@gmail.com" aria-label="Email">
                <FiMail size={22} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright & Back to Top */}
        <div className={styles.bottomSection}>
          <div className={styles.copyright}>
            <p>© {currentYear} Daniel. All rights reserved.</p>
            <span className={styles.location}>Crafted in Bamako.</span>
          </div>

          <button
            onClick={handleScrollToTop}
            className={styles.backToTop}
            aria-label="Scroll back to top"
          >
            <FiArrowUp size={20} />
          </button>
        </div>
      </div>
    </footer>
  );
}
