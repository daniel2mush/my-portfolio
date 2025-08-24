"use client";
import { Code, Rocket, Users } from "lucide-react";
import { IoColorPaletteOutline } from "react-icons/io5";
import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView, Variants } from "motion/react";

const myFunction = [
  {
    header: "Clean Code",
    p: "Writing maintainable, scalable code that stands the test of time.",
    icon: <Code size={30} />,
  },
  {
    header: "Design Thinking",
    p: "Creating user-centered designs with attention to every detail.",
    icon: <IoColorPaletteOutline size={30} />,
  },
  {
    header: "Performance",
    p: "Optimizing for speed and efficiency across all platforms.",
    icon: <Rocket size={30} />,
  },
  {
    header: "Collaboration",
    p: "Working seamlessly with teams to deliver exceptional results.",
    icon: <Users size={30} />,
  },
];

export default function AboutMe() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.1, once: true });
  const mainAnimation = useAnimation();

  useEffect(() => {
    if (inView) {
      mainAnimation.start("visible");
    }
  }, [inView, mainAnimation]);

  const containerVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={mainAnimation}
      id="about"
      className="w-full">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-7xl mx-auto px-10 pb-10">
        {/* About me section */}
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            About <span className="text-primary">Me</span>
          </h1>
          <p className="text-[18px] md:text-xl">
            I&apos;m a passionate developer and designer with over 5 years of
            experience creating digital solutions that make a difference.
          </p>
        </div>

        {/* Grid section */}
        <div className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-10">
          {/* Grid 1 */}
          <div className="space-y-4 flex flex-col items-start justify-between">
            <h1 className="text-xl md:text-3xl font-semibold text-white">
              Crafting Digital Experiences
            </h1>
            <p className="text-justify">
              With a background in both development and design, I bridge the gap
              between aesthetics and functionality. My journey started with a
              curiosity about how things work, which led me to explore the
              endless possibilities of web development.
            </p>
            <p className="text-justify">
              I specialize in React, Node.js, and modern design systems, always
              staying up-to-date with the latest technologies and best
              practices. My goal is to create solutions that not only look great
              but also provide exceptional user experiences.
            </p>
            <p className="text-justify">
              When I&apos;m not coding, you&apos;ll find me exploring new design
              trends, contributing to open-source projects, or sharing knowledge
              with the developer community.
            </p>
          </div>

          {/* Grid 2 */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
            variants={containerVariants}
            initial="hidden"
            animate={mainAnimation}>
            {myFunction.map((c) => (
              <motion.div
                key={c.header}
                variants={itemVariants}
                className="bg-primary/10 rounded flex flex-col space-y-2 justify-center items-center p-4">
                <div className="bg-primary text-white h-10 w-10 rounded-full flex justify-center items-center ring ring-white">
                  {c.icon}
                </div>
                <h1 className="font-bold text-white">{c.header}</h1>
                <p className="text-center text-sm">{c.p}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
