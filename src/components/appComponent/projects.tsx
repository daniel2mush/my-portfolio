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

  if (isLoading) return <div>Loading projects...</div>;
  if (isError) return <div>Error loading projects.</div>;
  if (!projects || projects.length === 0) return <div>No projects found.</div>;

  return (
    <section id="projects">
      <div>
        {/* Section Header */}
        <div>
          <h1>
            Featured <span>Projects</span>
          </h1>
          <p>
            A curated showcase of my recent work — combining technical
            expertise, creativity, and problem‑solving.
          </p>
        </div>

        {/* Projects Grid */}
        <div>
          {projects.map((p) => (
            <motion.div
              key={p.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}
            >
              {/* Project Image */}
              <div>
                {p.imageUrl ? (
                  <Image src={p.imageUrl} alt={p.title} fill />
                ) : (
                  <div>🌐</div>
                )}

                {/* Hover Overlay for Desktop */}
                <div
                  className="hidden md:flex absolute inset-0 bg-gradient-to-t from-black/80 via-black/70 to-transparent 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex-col justify-end p-5"
                >
                  <p>{p.description}</p>
                  <div>
                    <a
                      href={p.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <CiShare1 /> Live
                    </a>
                    <a
                      href={p.projectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FiGithub /> Code
                    </a>
                  </div>
                </div>
              </div>

              {/* Always-visible section for Mobile */}
              <div>
                <p>{p.description}</p>
                <div>
                  <a
                    href={p.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <CiShare1 /> Live
                  </a>
                  <a
                    href={p.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FiGithub /> Code
                  </a>
                </div>
              </div>

              {/* Project Title + Tools */}
              <div>
                <h3>{p.title}</h3>
                <div>
                  {p.tools.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div>
          <Button>
            <Link href={"/projects"}>View All Projects</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
