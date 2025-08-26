"use client";

import { useGetAllProject } from "@/lib/query/projectQuery";
import { CiShare1 } from "react-icons/ci";
import { FiGithub } from "react-icons/fi";
import { Button } from "../ui/button";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Projects() {
  const { data: projects, isLoading, isError } = useGetAllProject(2);

  if (isLoading)
    return <div className="text-center py-20">Loading projects...</div>;
  if (isError)
    return (
      <div className="text-center py-20 text-red-500">
        Error loading projects.
      </div>
    );
  if (!projects || projects.length === 0)
    return <div className="text-center py-20">No projects found.</div>;

  return (
    <section
      id="projects"
      className="py-20 w-full min-h-screen bg-gradient-to-b from-background via-background/95 to-background">
      <div className="max-w-7xl mx-auto px-6 space-y-14">
        {/* Section Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">
            Featured <span className="text-primary">Projects</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A curated showcase of my recent work — combining technical
            expertise, creativity, and problem‑solving.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-10">
          {projects.map((p) => (
            <motion.div
              key={p.id}
              className="group relative rounded-xl overflow-hidden shadow-lg border border-white/10 bg-background/10 backdrop-blur-lg hover:shadow-2xl transition-all duration-500"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}>
              {/* Project Image */}
              <div className="relative w-full h-64 overflow-hidden">
                {p.imageUrl ? (
                  <Image
                    src={p.imageUrl}
                    alt={p.title}
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-6xl">
                    🌐
                  </div>
                )}

                {/* Hover Overlay for Desktop */}
                <div
                  className="hidden md:flex absolute inset-0 bg-gradient-to-t from-black/80 via-black/70 to-transparent 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex-col justify-end p-5">
                  <p className="text-white text-sm line-clamp-3">
                    {p.description}
                  </p>
                  <div className="flex gap-3 mt-4">
                    <a
                      href={p.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary text-background hover:brightness-110 transition">
                      <CiShare1 /> Live
                    </a>
                    <a
                      href={p.projectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 rounded-lg border border-primary text-primary bg-background/30 hover:bg-primary hover:text-background transition">
                      <FiGithub /> Code
                    </a>
                  </div>
                </div>
              </div>

              {/* Always-visible section for Mobile */}
              <div className="p-5 space-y-3 md:hidden">
                <p className="text-sm text-muted-foreground">{p.description}</p>
                <div className="flex gap-3">
                  <a
                    href={p.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary text-background hover:brightness-110 transition">
                    <CiShare1 /> Live
                  </a>
                  <a
                    href={p.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg border border-primary text-primary bg-background/30 hover:bg-primary hover:text-background transition">
                    <FiGithub /> Code
                  </a>
                </div>
              </div>

              {/* Project Title + Tools */}
              <div className="p-5 space-y-4">
                <h3 className="text-xl font-bold">{p.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {p.tools.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-1 text-[12px] font-bold rounded-3xl bg-primary/10 text-primary border border-primary/20">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-5">
          <Button className="px-10 py-3 font-bold rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300">
            <Link href={"/projects"}>View All Projects</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
