"use client";

import { useGetAllProject } from "@/lib/query/projectQuery";
import { CiShare1 } from "react-icons/ci";
import { FiGithub } from "react-icons/fi";
import { motion, Variants } from "framer-motion";
import Image from "next/image";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function AllProjectsPage() {
  const { data: projects, isLoading, isError } = useGetAllProject();

  if (isLoading) return <div>Loading projects...</div>;
  if (isError) return <div>Error loading projects.</div>;
  if (!projects!.length) return <div>No published projects found.</div>;

  return (
    <>
      {/* Page content */}
      <section>
        <div>
          {/* Header */}
          <div>
            <h1>
              All <span>Projects</span>
            </h1>
            <p>
              Explore the complete library of my work — technical builds,
              creative designs, and problem‑solving projects.
            </p>
          </div>

          {/* Projects grid */}
          <div>
            {projects!.map((p) => (
              <motion.div
                key={p.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={cardVariants}
                whileHover={{ scale: 1.02 }}
              >
                {/* Image */}
                <div>
                  {p.imageUrl ? (
                    <Image src={p.imageUrl} alt={p.title} fill />
                  ) : (
                    <div>🌐</div>
                  )}

                  {/* Overlay (desktop) */}
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

                {/* Mobile details */}
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

                {/* Title + Tools */}
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
        </div>
      </section>
    </>
  );
}
