"use client";
import { Mail, MapPin, Phone } from "lucide-react";
import MyForm from "./form";
import { useRef, useEffect } from "react";
import { motion, useAnimation, useInView, Variants } from "motion/react";
import Link from "next/link";

const contactInfo = [
  {
    name: "Email",
    info: "Daniel2mush@gmail.com",
    icon: <Mail />,
  },
  {
    name: "Phone",
    info: "+223 71 90 70 48",
    icon: <Phone />,
  },
  {
    name: "Location",
    info: "Bamako, Mali",
    icon: <MapPin />,
  },
];

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3, once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
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
      className="min-h-screen w-full bg-primary/5 ring ring-primary/10">
      <div className="w-full max-w-7xl mx-auto px-10 py-10">
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center space-y-4">
          <h1 className="font-bold text-4xl md:text-5xl">
            Let&apos;s <span className="text-primary">Connect</span>
          </h1>
          <p className="md:text-xl text-muted-foreground">
            Have a project in mind or just want to chat? <br />
            I&apos;d love to hear from you. Let&apos;s create something amazing
            together.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 mt-10 gap-10">
          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-5">
            <h1 className="text-2xl font-bold">Get In Touch</h1>
            <div className="space-y-10">
              {contactInfo.map((c) => {
                const isEmail = c.name === "Email";

                return (
                  <motion.div
                    key={c.name}
                    variants={itemVariants}
                    className="bg-primary/5 rounded-lg ring ring-primary/15 p-3 flex items-center gap-5">
                    <div className="w-13 h-13 rounded-full bg-primary text-white flex justify-center items-center">
                      {c.icon}
                    </div>
                    <div>
                      <h1 className="text-muted-foreground">{c.name}</h1>
                      {isEmail ? (
                        <Link
                          href={"mailto:daniel2mush@gmail.com"}
                          className="font-bold">
                          {c.info}
                        </Link>
                      ) : (
                        <p className="font-bold">{c.info}</p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
              <motion.div
                variants={itemVariants}
                className="bg-primary/5 ring ring-primary/10 rounded-lg p-5 space-y-4">
                <h1 className="font-bold">Available for Freelance</h1>
                <p className="text-muted-foreground">
                  I&apos;m currently available for freelance projects and new
                  opportunities. Let&apos;s discuss how we can work together.
                </p>
                <div className="bg-green-500 rounded-full h-4 w-4" />
              </motion.div>
            </div>
          </motion.div>

          {/* Form */}
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
