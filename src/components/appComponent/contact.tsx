"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import MyForm from "./form";
import { motion, useAnimation, useInView, Variants } from "motion/react";
import { useRef, useEffect } from "react";
import Link from "next/link";

const contactInfo = [
  { name: "Email", info: "Daniel2mush@gmail.com", icon: <Mail /> },
  { name: "Phone", info: "+223 71 90 70 48", icon: <Phone /> },
  { name: "Location", info: "Bamako, Mali", icon: <MapPin /> },
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
      transition: { staggerChildren: 0.2, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      id="contact"
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="py-20 bg-primary/5">
      <div className="max-w-7xl mx-auto px-10">
        <motion.div variants={itemVariants} className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">
            Let&apos;s <span className="text-primary">Connect</span>
          </h1>
          <p className="md:text-xl text-muted-foreground">
            Have a project in mind or just want to chat? I&apos;d love to hear
            from you.
          </p>
        </motion.div>
        <motion.div
          variants={containerVariants}
          className="grid md:grid-cols-3 gap-10 mt-10">
          <motion.div variants={itemVariants} className="space-y-5">
            <h2 className="text-2xl font-bold">Get In Touch</h2>
            <div className="space-y-5">
              {contactInfo.map((c) => (
                <motion.div
                  key={c.name}
                  variants={itemVariants}
                  className="bg-primary/5 ring ring-primary/15 p-3 rounded-lg flex gap-5 items-center">
                  <div className="bg-primary text-white w-12 h-12 rounded-full flex justify-center items-center">
                    {c.icon}
                  </div>
                  <div>
                    <h3 className="text-muted-foreground">{c.name}</h3>
                    {c.name === "Email" ? (
                      <Link href={`mailto:${c.info}`} className="font-bold">
                        {c.info}
                      </Link>
                    ) : (
                      <p className="font-bold">{c.info}</p>
                    )}
                  </div>
                </motion.div>
              ))}
              <motion.div
                variants={itemVariants}
                className="bg-primary/5 ring ring-primary/10 p-5 rounded-lg space-y-2">
                <h3 className="font-bold">Available for Freelance</h3>
                <p className="text-muted-foreground">
                  I&apos;m currently open to freelance projects and new
                  opportunities.
                </p>
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
              </motion.div>
            </div>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="md:col-span-2 bg-primary/5 ring ring-primary/10 p-5 rounded-lg">
            <MyForm />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
