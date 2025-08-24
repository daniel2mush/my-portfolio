"use client";

import { useGetAllProject } from "@/lib/query/projectQuery";
import { CiShare1 } from "react-icons/ci";
import { FiGithub } from "react-icons/fi";
import { Button } from "../ui/button";
import { motion, Variants } from "framer-motion";
import Image from "next/image";

export default function Projects() {
  const { data: projects, isLoading, isError } = useGetAllProject();

  if (isLoading) return <div>Loading projects...</div>;
  if (isError) return <div>Error loading projects.</div>;
  if (!projects || projects.length === 0) return <div>No projects found.</div>;

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div id="projects" className="py-20 w-full min-h-screen">
      <div className="max-w-7xl mx-auto px-10 space-y-10">
        {/* Header */}
        <div className="text-center space-y-5">
          <h1 className="text-4xl md:text-5xl font-bold">
            Featured <span className="text-primary">Projects</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work, demonstrating technical expertise and
            creative problem-solving.
          </p>
        </div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 gap-10">
          {projects.map((p) => (
            <motion.div
              key={p.id}
              className="border border-primary/10 rounded-lg overflow-hidden hover:scale-105 transition-transform cursor-pointer"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }} // animate only once when 20% visible
              variants={cardVariants}
              whileHover={{ scale: 1.03 }}>
              <div className="relative w-full h-60 flex justify-center items-center bg-primary/50">
                {p.imageUrl ? (
                  <Image
                    src={p.imageUrl}
                    alt={p.title}
                    fill
                    className="object-contain w-full h-full"
                  />
                ) : (
                  <div className="text-6xl">🌐</div>
                )}
              </div>
              <div className="p-5 bg-primary/5 space-y-5">
                <div>
                  <h3 className="text-xl font-bold">{p.title}</h3>
                  <p className="text-muted-foreground line-clamp-2">
                    {p.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {p.tools.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-1 bg-indigo-600 rounded-3xl text-[12px] font-bold">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3 flex-wrap">
                  <a
                    href={p.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg border hover:bg-primary transition">
                    <CiShare1 /> Live Demo
                  </a>
                  <a
                    href={p.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg border hover:bg-primary transition">
                    <FiGithub /> Code
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all button */}
        <div className="text-center mt-5">
          <Button className="px-10 py-2 font-bold">View All Projects</Button>
        </div>
      </div>
    </div>
  );
}
