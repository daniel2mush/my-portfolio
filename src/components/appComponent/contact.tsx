"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import MyForm from "./form";
import { motion, useAnimation, useInView, Variants } from "motion/react";
import { useRef, useEffect } from "react";
import Link from "next/link";

const contactInfo = [
  { name: "Email", info: "Daniel2mush@gmail.com", icon: <Mail size={20} /> },
  { name: "Phone", info: "+223 71 90 70 48", icon: <Phone size={20} /> },
  { name: "Location", info: "Bamako, Mali", icon: <MapPin size={20} /> },
];

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3, once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      id="contact"
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="relative py-20 bg-gradient-to-b from-background via-background/95 to-background overflow-hidden">
      {/* Decorative blobs */}
      <motion.div
        className="absolute -top-32 -left-32 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply blur-3xl animate-pulse"
        aria-hidden
      />
      <motion.div
        className="absolute -bottom-32 -right-32 w-72 h-72 bg-accent/20 rounded-full mix-blend-multiply blur-3xl animate-pulse"
        aria-hidden
      />

      <div className="max-w-7xl mx-auto px-6 space-y-14 relative z-10">
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">
            Let&apos;s <span className="text-primary">Connect</span>
          </h1>
          <p className="md:text-lg text-muted-foreground">
            Have a project in mind or just want to chat — I’d love to hear from
            you.
          </p>
        </motion.div>

        {/* Layout */}
        <motion.div
          variants={containerVariants}
          className="grid md:grid-cols-3 gap-10">
          {/* Contact Info */}
          <motion.div
            variants={itemVariants}
            className="space-y-6 p-6 rounded-2xl bg-background/60 backdrop-blur-lg border border-white/10 shadow-xl">
            <h2 className="text-2xl font-bold">Get In Touch</h2>
            <div className="space-y-5">
              {contactInfo.map((c) => (
                <motion.div
                  key={c.name}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, translateY: -2 }}
                  className="flex items-center gap-5 p-4 rounded-lg bg-primary/5 border border-primary/10 transition-all cursor-pointer">
                  <div className="flex justify-center items-center w-12 h-12 rounded-full bg-primary text-white">
                    {c.icon}
                  </div>
                  <div>
                    <h3 className="text-sm text-muted-foreground">{c.name}</h3>
                    {c.name === "Email" ? (
                      <Link
                        href={`mailto:${c.info}`}
                        className="font-bold hover:underline">
                        {c.info}
                      </Link>
                    ) : (
                      <p className="font-bold">{c.info}</p>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Freelance Availability */}
              <motion.div
                variants={itemVariants}
                className="p-5 rounded-lg bg-green-500/10 border border-green-500/20">
                <h3 className="font-bold flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
                  </span>
                  Available for Freelance
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Open to exciting projects and new opportunities.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-2 p-6 rounded-2xl bg-background/60 backdrop-blur-lg border border-white/10 shadow-xl">
            <MyForm />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
