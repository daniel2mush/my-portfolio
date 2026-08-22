"use client";

import { Mail, Phone, MapPin, ArrowUpRight, type LucideIcon } from "lucide-react";
import MyForm from "@/components/Form/Form";
import {FiInstagram} from "react-icons/fi";

interface ContactMethod {
  name: string;
  value: string;
  href: string;
  icon: LucideIcon;
}

const contactMethods: ContactMethod[] = [
  {
    name: "Email",
    value: "daniel2mush@gmail.com",
    href: "mailto:daniel2mush@gmail.com",
    icon: Mail,
  },
  {
    name: "Phone / WhatsApp",
    value: "+223 71 90 70 48",
    href: "tel:+22371907048",
    icon: Phone,
  },
  {
    name: "Location",
    value: "Bamako, Mali",
    href: "https://maps.google.com/?q=Bamako,Mali",
    icon: MapPin,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="relative min-h-screen overflow-hidden bg-background px-4 py-24 sm:px-6 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-20 top-1/4 size-[500px] rounded-full bg-primary/5 blur-[120px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-20 bottom-1/4 size-[500px] rounded-full bg-primary/10 blur-[120px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl">
        <header className="mb-16 flex flex-col items-center text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-1.5 text-sm font-medium text-muted-foreground backdrop-blur-sm">
             <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
            </span>
            Let's Work Together
          </div>
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Ready to <span className="text-gradient">Build Something?</span>
          </h2>
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Whether you need a brand identity, a print campaign, or a full-stack web application — I'd love to hear about your project.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-5 lg:gap-12">
          <div className="flex flex-col gap-6 lg:col-span-2">
            <div className="space-y-4">
              {contactMethods.map((method, index) => {
                const isExternal = method.name === "Location";
                return (
                  <a
                    key={method.name}
                    href={method.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="glass group flex items-center gap-4 rounded-xl p-4 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <method.icon size={22} strokeWidth={1.5} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{method.name}</p>
                      <p className="truncate text-base font-medium text-foreground transition-colors group-hover:text-primary">{method.value}</p>
                    </div>
                    <div className="text-muted-foreground transition-transform group-hover:translate-x-1">
                      <ArrowUpRight size={18} />
                    </div>
                  </a>
                );
              })}
            </div>

            <div className="glass rounded-xl p-5 border-l-4 border-l-emerald-500/50">
              <div className="flex items-center gap-3 mb-2">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500"></span>
                </span>
                <h3 className="font-semibold text-foreground">Available for Freelance</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Currently taking on design and development projects. Remote-friendly.
              </p>
            </div>

            {/* Portfolio Links */}
            <div className="glass rounded-xl p-5">
              <h3 className="font-semibold text-foreground mb-3">My Portfolios</h3>
              <div className="space-y-2">
                <a href="https://bit.ly/daniel-ogbeide-fullstack" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between text-sm text-muted-foreground hover:text-primary transition-colors">
                  <span>Graphic Design Portfolio</span>
                  <ArrowUpRight size={14} />
                </a>
                <a href="https://www.instagram.com/ogbeide_daniiel/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between text-sm text-muted-foreground hover:text-primary transition-colors">
                  <span>Instagram Profile</span>
                  <ArrowUpRight size={14} />
                </a>
                <a href="https://github.com/daniel2mush" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between text-sm text-muted-foreground hover:text-primary transition-colors">
                  <span>GitHub Profile</span>
                  <ArrowUpRight size={14} />
                </a>
                <a href="https://www.linkedin.com/in/daniel-ogbeide/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between text-sm text-muted-foreground hover:text-primary transition-colors">
                  <span>LinkedIn</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="glass h-full rounded-2xl p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute -right-10 -top-10 size-40 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <MyForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}