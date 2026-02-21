"use client";

import styles from "./HeroSection.module.scss";
import { Button } from "@/components/ui/Buttons/Buttons";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { IoArrowDown } from "react-icons/io5";

export default function HeroSection() {
  return (
    <section id="home" className={styles.heroSection}>
      {/* Background Elements */}
      <div className={styles.heroBackground}>
        <video autoPlay loop muted playsInline className={styles.heroVideo}>
          <source src="/hero-background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className={styles.gradientOverlay} />
      </div>

      {/* Foreground Content */}
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          Building Fast, Scalable & Beautiful Digital Experiences.
        </h1>

        <p className={styles.heroSubtitle}>
          I'm Daniel, a Full-Stack Developer and Graphic Designer. I turn
          complex problems into elegant, high-performing solutions across the
          web and print.
        </p>

        {/* Call to Action */}
        <div className={styles.heroButtons}>
          <Button size="md" className={styles.heroButton}>
            View My Work
          </Button>
          <Button size="md" variant="outline" className={styles.heroButton}>
            Contact Me
          </Button>
        </div>

        {/* Social Links */}
        <div className={styles.socialIcons}>
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className={styles.socialIcon}
          >
            <FiGithub size={28} strokeWidth={1.5} />
          </a>
          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className={styles.socialIcon}
          >
            <FiLinkedin size={28} strokeWidth={1.5} />
          </a>
          <a
            href="mailto:your@email.com"
            aria-label="Email"
            className={styles.socialIcon}
          >
            <FiMail size={28} strokeWidth={1.5} />
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <a href="#about" aria-label="Scroll down" className={styles.arrowDown}>
        <IoArrowDown size={32} />
      </a>
    </section>
  );
}
