"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "motion/react";
import Image from "next/image";
import { CiShare1 } from "react-icons/ci";
import { FiGithub } from "react-icons/fi";
import {
  Plus,
  Eye,
  CheckCircle2,
  Trash2,
  Pencil,
  Filter,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

import AdminForm from "./adminForm";
import {
  useGetAdminProject,
  usePublishProject,
} from "@/lib/query/projectQuery";

type Project = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tools: string[];
  liveLink?: string;
  projectLink?: string;
  isPublished: boolean;
  // createdAt?: string; // if available, you can use it for sorting
};

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

export default function AdminDashboard() {
  const [openForm, setOpenForm] = useState(false);
  const [preview, setPreview] = useState<Project | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<Project | null>(null);

  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | "published" | "draft">("all");
  const [sort, setSort] = useState<"title-asc" | "title-desc">("title-asc");
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const { data, isLoading, isError } = useGetAdminProject();
  const { mutate: publish, isPending: isPublishing } = usePublishProject();

  // Keyboard shortcuts: "/" to focus search, "a" to open Add
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "/") {
        e.preventDefault();
        const el = document.getElementById(
          "admin-search",
        ) as HTMLInputElement | null;
        el?.focus();
      }
      if ((e.key === "a" || e.key === "A") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpenForm(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const projects: Project[] = useMemo(() => (data ?? []) as Project[], [data]);

  const processed = useMemo(() => {
    let list = projects;

    if (status !== "all") {
      list = list.filter((p) =>
        status === "published" ? p.isPublished : !p.isPublished,
      );
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.tools?.some((t) => t.toLowerCase().includes(q)),
      );
    }

    if (sort === "title-asc") {
      list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === "title-desc") {
      list = [...list].sort((a, b) => b.title.localeCompare(a.title));
    }

    return list;
  }, [projects, status, query, sort]);

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const clearSelection = () => setSelected(new Set());

  const bulkPublish = () => {
    const ids = processed
      .filter((p) => !p.isPublished && selected.has(p.id))
      .map((p) => p.id);
    if (ids.length === 0) {
      toast.info("No drafts selected to publish.");
      return;
    }
    ids.forEach((id) =>
      publish(
        { projectId: id },
        {
          onSuccess: () => toast.success("Project published"),
          onError: () => toast.error("Failed to publish project"),
        },
      ),
    );
    clearSelection();
  };

  // Placeholder delete handler — wire your own mutation here if available
  const doDelete = (proj: Project) => {
    setConfirmDelete(null);
    toast.info(`Implement delete for: ${proj.title}`);
  };

  if (isLoading) {
    return (
      <div>
        <span />
      </div>
    );
  }

  if (isError) {
    return <div>Failed to load projects.</div>;
  }

  return (
    <div>
      {/* Top Bar */}
      <div>
        <div>
          <h1>Projects</h1>
          <span>{projects.length} total</span>
        </div>

        <div>
          <div>
            <Label htmlFor="admin-search">Search</Label>
            <Input
              id="admin-search"
              placeholder="Search title, tools, description…  (Press /)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div>/</div>
          </div>

          <div>
            <Select
              value={status}
              onValueChange={(v: "all" | "published" | "draft") => setStatus(v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  <Filter />
                  All
                </SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={sort}
              onValueChange={(v: "title-asc" | "title-desc") => setSort(v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="title-asc">Title A → Z</SelectItem>
                <SelectItem value="title-desc">Title Z → A</SelectItem>
              </SelectContent>
            </Select>

            <Dialog open={openForm} onOpenChange={setOpenForm}>
              <DialogTrigger asChild>
                <Button>
                  <Plus />
                  Add Project
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add new project</DialogTitle>
                </DialogHeader>
                <AdminForm setOpen={() => setOpenForm(false)} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Bulk Bar */}
      <AnimatePresence>
        {selected.size > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
          >
            <div>{selected.size} selected</div>
            <div>
              <Button
                size="sm"
                variant="secondary"
                onClick={bulkPublish}
                disabled={isPublishing}
              >
                <CheckCircle2 /> Publish
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => toast.info("Wire bulk delete mutation")}
              >
                <Trash2 /> Delete
              </Button>
              <Button size="sm" variant="ghost" onClick={clearSelection}>
                <X /> Clear
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Separator />

      {/* Grid */}
      <motion.div layout>
        <AnimatePresence>
          {processed.map((p) => {
            const isChecked = selected.has(p.id);
            return (
              <motion.div
                key={p.id}
                layout
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeIn}
                whileHover={{ y: -2 }}
              >
                <Card>
                  {/* Select Checkbox */}
                  <div>
                    <label>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleSelect(p.id)}
                        aria-label={`Select ${p.title}`}
                      />
                      Select
                    </label>
                  </div>

                  {/* Image */}
                  <div>
                    {p.imageUrl ? (
                      <Image src={p.imageUrl} alt={p.title} fill />
                    ) : (
                      <div>🌐</div>
                    )}
                    <span
                      className={`absolute top-3 right-3 px-3 py-1 text-xs font-medium rounded-full ${
                        p.isPublished
                          ? "bg-green-100 text-green-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {p.isPublished ? "Published" : "Draft"}
                    </span>

                    {/* Subtle overlay actions (desktop hover, always accessible via buttons below too) */}
                    <div>
                      <div>{p.description}</div>
                      <div>
                        {p.liveLink && (
                          <a
                            href={p.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <CiShare1 /> Live
                          </a>
                        )}
                        {p.projectLink && (
                          <a
                            href={p.projectLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FiGithub /> Code
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <div>
                      <h3>{p.title}</h3>
                      <p>{p.description}</p>
                    </div>

                    <div>
                      {p.tools?.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>

                    {/* Actions (always visible, mobile-first) */}
                    <div>
                      {p.liveLink && (
                        <a
                          href={p.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <CiShare1 /> Live
                        </a>
                      )}
                      {p.projectLink && (
                        <a
                          href={p.projectLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FiGithub /> Code
                        </a>
                      )}

                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() =>
                          toast.info("Open edit modal with project data")
                        }
                      >
                        <Pencil /> Edit
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setPreview(p)}
                      >
                        <Eye /> Preview
                      </Button>

                      {!p.isPublished && (
                        <Button
                          onClick={() =>
                            publish(
                              { projectId: p.id },
                              {
                                onSuccess: () =>
                                  toast.success("Project published"),
                                onError: () => toast.error("Failed to publish"),
                              },
                            )
                          }
                          size="sm"
                          disabled={isPublishing}
                        >
                          <CheckCircle2 /> Publish
                        </Button>
                      )}

                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => setConfirmDelete(p)}
                      >
                        <Trash2 /> Delete
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Preview Dialog */}
      <Dialog open={!!preview} onOpenChange={(v) => !v && setPreview(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{preview?.title}</DialogTitle>
            <DialogDescription>{preview?.description}</DialogDescription>
          </DialogHeader>
          <div>
            <div>
              {preview?.imageUrl ? (
                <Image src={preview.imageUrl} alt={preview.title} fill />
              ) : (
                <div>🌐</div>
              )}
            </div>
            <div>
              <div>
                {preview?.tools?.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <div>
                {preview?.liveLink && (
                  <a
                    href={preview.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <CiShare1 /> Live
                  </a>
                )}
                {preview?.projectLink && (
                  <a
                    href={preview.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FiGithub /> Code
                  </a>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirm Delete Dialog */}
      <Dialog
        open={!!confirmDelete}
        onOpenChange={(v) => !v && setConfirmDelete(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete project</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete{" "}
              <span>{confirmDelete?.title}</span>.
            </DialogDescription>
          </DialogHeader>
          <div>
            <Button variant="ghost" onClick={() => setConfirmDelete(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => confirmDelete && doDelete(confirmDelete)}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
