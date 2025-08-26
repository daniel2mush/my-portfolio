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
          "admin-search"
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
        status === "published" ? p.isPublished : !p.isPublished
      );
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.tools?.some((t) => t.toLowerCase().includes(q))
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
        }
      )
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
      <div className="w-full h-[80vh] flex items-center justify-center">
        <span className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center text-red-500">
        Failed to load projects.
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-10 space-y-8">
      {/* Top Bar */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">Projects</h1>
          <span className="text-sm text-muted-foreground">
            {projects.length} total
          </span>
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="flex items-center gap-2">
            <Label htmlFor="admin-search" className="sr-only">
              Search
            </Label>
            <Input
              id="admin-search"
              placeholder="Search title, tools, description…  (Press /)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-64"
            />
            <div className="hidden md:flex text-xs text-muted-foreground px-2 py-1 rounded border">
              /
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Select
              value={status}
              onValueChange={(v: "all" | "published" | "draft") =>
                setStatus(v)
              }>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  <Filter className="inline mr-2 h-3 w-3" />
                  All
                </SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={sort}
              onValueChange={(v: "title-asc" | "title-desc") => setSort(v)}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="title-asc">Title A → Z</SelectItem>
                <SelectItem value="title-desc">Title Z → A</SelectItem>
              </SelectContent>
            </Select>

            <Dialog open={openForm} onOpenChange={setOpenForm}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add Project
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl h-[80vh] overflow-y-auto">
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
            className="flex items-center justify-between p-3 rounded-md border bg-background/60"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}>
            <div className="text-sm">{selected.size} selected</div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={bulkPublish}
                disabled={isPublishing}>
                <CheckCircle2 className="w-4 h-4 mr-1" /> Publish
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => toast.info("Wire bulk delete mutation")}>
                <Trash2 className="w-4 h-4 mr-1" /> Delete
              </Button>
              <Button size="sm" variant="ghost" onClick={clearSelection}>
                <X className="w-4 h-4 mr-1" /> Clear
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Separator />

      {/* Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                className="relative">
                <Card className="overflow-hidden border border-border/60 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/50">
                  {/* Select Checkbox */}
                  <div className="absolute top-3 left-3 z-10">
                    <label className="flex items-center gap-2 rounded bg-background/80 px-2 py-1 text-xs border">
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
                  <div className="relative w-full h-56 bg-muted">
                    {p.imageUrl ? (
                      <Image
                        src={p.imageUrl}
                        alt={p.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-5xl">
                        🌐
                      </div>
                    )}
                    <span
                      className={`absolute top-3 right-3 px-3 py-1 text-xs font-medium rounded-full ${
                        p.isPublished
                          ? "bg-green-100 text-green-700"
                          : "bg-amber-100 text-amber-700"
                      }`}>
                      {p.isPublished ? "Published" : "Draft"}
                    </span>

                    {/* Subtle overlay actions (desktop hover, always accessible via buttons below too) */}
                    <div className="hidden md:flex absolute inset-0 items-end justify-between p-4 opacity-0 hover:opacity-100 transition-opacity bg-gradient-to-t from-black/40 via-black/10 to-transparent">
                      <div className="text-white/90 text-sm line-clamp-2 max-w-[75%]">
                        {p.description}
                      </div>
                      <div className="flex gap-2">
                        {p.liveLink && (
                          <a
                            href={p.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 px-2 py-1.5 text-xs rounded-md bg-primary text-background hover:brightness-110">
                            <CiShare1 /> Live
                          </a>
                        )}
                        {p.projectLink && (
                          <a
                            href={p.projectLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 px-2 py-1.5 text-xs rounded-md border bg-background/60 hover:bg-primary hover:text-background">
                            <FiGithub /> Code
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-4">
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold">{p.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 md:line-clamp-3">
                        {p.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {p.tools?.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Actions (always visible, mobile-first) */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {p.liveLink && (
                        <a
                          href={p.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-md border hover:bg-primary/10">
                          <CiShare1 /> Live
                        </a>
                      )}
                      {p.projectLink && (
                        <a
                          href={p.projectLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-md border hover:bg-primary/10">
                          <FiGithub /> Code
                        </a>
                      )}

                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() =>
                          toast.info("Open edit modal with project data")
                        }>
                        <Pencil className="w-4 h-4 mr-1" /> Edit
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setPreview(p)}>
                        <Eye className="w-4 h-4 mr-1" /> Preview
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
                              }
                            )
                          }
                          size="sm"
                          className="bg-green-500 hover:bg-green-600 text-white"
                          disabled={isPublishing}>
                          <CheckCircle2 className="w-4 h-4 mr-1" /> Publish
                        </Button>
                      )}

                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => setConfirmDelete(p)}>
                        <Trash2 className="w-4 h-4 mr-1" /> Delete
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
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{preview?.title}</DialogTitle>
            <DialogDescription className="line-clamp-none">
              {preview?.description}
            </DialogDescription>
          </DialogHeader>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative w-full h-64 bg-muted rounded-md overflow-hidden">
              {preview?.imageUrl ? (
                <Image
                  src={preview.imageUrl}
                  alt={preview.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-5xl">
                  🌐
                </div>
              )}
            </div>
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {preview?.tools?.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                {preview?.liveLink && (
                  <a
                    href={preview.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-md border hover:bg-primary/10">
                    <CiShare1 /> Live
                  </a>
                )}
                {preview?.projectLink && (
                  <a
                    href={preview.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-md border hover:bg-primary/10">
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
        onOpenChange={(v) => !v && setConfirmDelete(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Delete project</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete{" "}
              <span className="font-semibold">{confirmDelete?.title}</span>.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setConfirmDelete(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => confirmDelete && doDelete(confirmDelete)}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
