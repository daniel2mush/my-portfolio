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
    >
      {/* Decorative blobs */}
      <motion.div aria-hidden />
      <motion.div aria-hidden />

      <div>
        {/* Header */}
        <motion.div variants={itemVariants}>
          <h1>
            Let&apos;s <span>Connect</span>
          </h1>
          <p>
            Have a project in mind or just want to chat — I’d love to hear from
            you.
          </p>
        </motion.div>

        {/* Layout */}
        <motion.div variants={containerVariants}>
          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h2>Get In Touch</h2>
            <div>
              {contactInfo.map((c) => (
                <motion.div
                  key={c.name}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, translateY: -2 }}
                >
                  <div>{c.icon}</div>
                  <div>
                    <h3>{c.name}</h3>
                    {c.name === "Email" ? (
                      <Link href={`mailto:${c.info}`}>{c.info}</Link>
                    ) : (
                      <p>{c.info}</p>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Freelance Availability */}
              <motion.div variants={itemVariants}>
                <h3>
                  <span>
                    <span />
                    <span />
                  </span>
                  Available for Freelance
                </h3>
                <p>Open to exciting projects and new opportunities.</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <MyForm />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
