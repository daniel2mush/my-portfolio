"use client";

import { Mail, MapPin, Phone } from "lucide-react";
// import MyForm from "./form"; // Assuming this handles its own styling or adapts to parent
import Link from "next/link";
import styles from "./Contact.module.scss";
import MyForm from "@/components/Form/Form";

const contactInfo = [
  {
    name: "Email",
    info: "Daniel2mush@gmail.com",
    href: "mailto:Daniel2mush@gmail.com",
    icon: <Mail size={24} strokeWidth={1.5} />,
  },
  {
    name: "Phone",
    info: "+223 71 90 70 48",
    href: "tel:+22371907048",
    icon: <Phone size={24} strokeWidth={1.5} />,
  },
  {
    name: "Location",
    info: "Bamako, Mali",
    href: null,
    icon: <MapPin size={24} strokeWidth={1.5} />,
  },
];

export default function Contact() {
  return (
    <section id="contact" className={styles.section}>
      {/* CSS-only Decorative Glowing Blobs */}
      <div className={styles.blobTop} aria-hidden="true" />
      <div className={styles.blobBottom} aria-hidden="true" />

      <div className={styles.content}>
        {/* Header */}
        <header className={styles.header}>
          <h2>
            Let&apos;s{" "}
            <span className={styles.highlight}>
              Connect
              <span className={styles.underline} />
            </span>
          </h2>
          <p className={styles.subtitle}>
            Have a project in mind or just want to chat? I’d love to hear from
            you.
          </p>
        </header>

        {/* Layout Grid */}
        <div className={styles.grid}>
          {/* Left Column: Contact Info */}
          <div className={styles.infoColumn}>
            <div className={styles.infoCards}>
              {contactInfo.map((c, index) => {
                const isLink = c.href !== null;

                const CardContent = (
                  <>
                    <div className={styles.iconWrapper}>{c.icon}</div>
                    <div className={styles.cardText}>
                      <h3>{c.name}</h3>
                      <p>{c.info}</p>
                    </div>
                  </>
                );

                return isLink ? (
                  <a
                    key={c.name}
                    href={c.href}
                    className={styles.contactCard}
                    style={{ "--index": index } as React.CSSProperties}
                  >
                    {CardContent}
                  </a>
                ) : (
                  <div
                    key={c.name}
                    className={styles.contactCard}
                    style={{ "--index": index } as React.CSSProperties}
                  >
                    {CardContent}
                  </div>
                );
              })}
            </div>

            {/* Freelance Availability Status */}
            <div
              className={styles.freelanceStatus}
              style={{ "--index": contactInfo.length } as React.CSSProperties}
            >
              <div className={styles.statusHeader}>
                <span className={styles.pulseDot}>
                  <span className={styles.dotCore} />
                  <span className={styles.dotRing} />
                </span>
                <h3>Available for Freelance</h3>
              </div>
              <p>Open to exciting projects and new opportunities.</p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className={styles.formColumn}>
            <div className={styles.formWrapper}>{<MyForm />}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
