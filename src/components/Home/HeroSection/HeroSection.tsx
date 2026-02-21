import Image from "next/image";
import styles from "./HeroSection.module.scss";
import { Button } from "@/components/ui/Buttons/Buttons";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { IoArrowDown } from "react-icons/io5";

export default function HeroSection() {
  return (
    <div className={styles.heroSection}>
      <div className={styles.heroContent}>
        <div>
          <h1 className={styles.heroTitle}>
            Building Fast, Scalable, and Beautiful Digital Experiences.
          </h1>
        </div>
        <p className={styles.heroSubtitle}>
          I’m Daniel, a web developer and graphic designer who brings ideas to
          life across every medium. From building scalable applications with
          React, Next.js and SCSS, Zod, Postgress, BetterAuth, NextAuth to
          leading large-scale, high-quality print production, I craft
          experiences that leave a lasting mark
        </p>
        {/* Call to action */}
        <div className={styles.heroButtons}>
          <Button size={"md"} fullWidth={true} className={styles.heroButton}>
            View my work
          </Button>
          <Button
            size="md"
            fullWidth={true}
            variant={"outline"}
            className={styles.heroButton}
          >
            Contact Me
          </Button>
        </div>
        {/* Social icons */}
        <div className={styles.socialIcons}>
          <div className={styles.socialIcon}>
            <FiGithub size={40} strokeWidth={1} />
          </div>
          <div className={styles.socialIcon}>
            <FiLinkedin size={40} strokeWidth={1} />
          </div>
          <div className={styles.socialIcon}>
            <FiMail size={40} strokeWidth={1} />
          </div>
        </div>
      </div>
      {/* Arrow down */}
      <div className={styles.arrowDown}>
        <IoArrowDown size={40} />
      </div>
      {/* Close heroContent */}

      <div className={styles.heroBackground}>
        <video autoPlay loop muted className={styles.heroVideo}>
          <source src="/hero-background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className={styles.gradientOverlay} />
    </div>
  );
}
