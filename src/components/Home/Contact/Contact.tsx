"use client";

import { Mail, MapPin, Phone } from "lucide-react";
// import MyForm from "./form"; // Assuming this handles its own styling or adapts to parent

import MyForm from "@/components/Form/Form";

const styles = {
  section: "relative min-h-screen overflow-hidden bg-background px-5 py-24",
  blobTop: "pointer-events-none absolute -right-24 top-24 size-72 rounded-full bg-primary/10 blur-3xl",
  blobBottom: "pointer-events-none absolute -bottom-24 left-0 size-72 rounded-full bg-white/5 blur-3xl",
  content: "relative mx-auto max-w-[1200px]",
  header: "mb-14 flex flex-col items-center text-center",
  highlight: "relative inline-flex flex-col text-primary",
  underline: "absolute -bottom-1 left-0 h-1.5 w-full rounded bg-primary",
  subtitle: "m-0 max-w-2xl text-balance text-lg leading-7 text-text-secondary",
  grid: "grid grid-cols-1 gap-8 lg:grid-cols-[0.8fr_1.2fr]",
  infoColumn: "flex flex-col gap-6",
  infoCards: "grid gap-4",
  contactCard: "flex animate-[slide-up-fade_0.5s_ease_forwards] items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-5 text-left opacity-0 transition-all hover:-translate-y-1 hover:border-primary",
  iconWrapper: "flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary",
  cardText: "",
  freelanceStatus: "animate-[slide-up-fade_0.5s_ease_forwards] rounded-xl border border-white/10 bg-white/[0.03] p-5 opacity-0",
  statusHeader: "mb-2 flex items-center gap-3",
  pulseDot: "relative flex size-3 items-center justify-center",
  dotCore: "absolute size-2 rounded-full bg-emerald-400",
  dotRing: "absolute size-3 animate-ping rounded-full bg-emerald-400/40",
  formColumn: "rounded-xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur",
  formWrapper: "",
};

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
          <h2 className="mb-4 text-[clamp(2.5rem,5vw,4rem)] font-extrabold text-foreground">
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
                      <h3 className="mb-1 text-base font-bold text-foreground">{c.name}</h3>
                      <p className="m-0 text-sm text-text-secondary">{c.info}</p>
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
                <h3 className="text-lg font-bold text-foreground">
                  Available for Freelance
                </h3>
              </div>
              <p className="m-0 text-sm text-text-secondary">
                Open to exciting projects and new opportunities.
              </p>
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
