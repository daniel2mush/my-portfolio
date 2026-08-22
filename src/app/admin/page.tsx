"use client";

import { useState, useMemo, useEffect, ChangeEvent } from "react";
import Image from "next/image";
import {
  Plus,
  Eye,
  CheckCircle2,
  Trash2,
  Pencil,
  X,
  Search,
  Image as ImageIcon,
  ExternalLink,
  Github,
  FolderKanban, Trash,
} from "lucide-react";

import { toast } from "sonner";
import { cn } from "@/lib/utils";

import {
  useGetAdminProject,
  usePublishProject,
  useDeleteProject,
} from "@/lib/query/projectQuery";
import AdminForm from "@/components/Admin/Form/AdminForm";
import { Project } from "@/lib/types";
import { StatusFilter, SortOption } from "@/types/project";
import MessagesList from "./MessageList";
import {Button} from "@/components/ui/button";

// --- Sub-Components ---

const AdminProjectImage = ({ src, alt }: { src: string; alt: string }) => {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-muted text-muted-foreground">
        <ImageIcon size={32} className="opacity-50" />
        <span className="text-xs font-medium">No Image</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover transition-transform duration-500 group-hover:scale-105"
      sizes="(max-width: 768px) 100vw, 300px"
      onError={() => setHasError(true)}
    />
  );
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  useEffect(() => {
    if (!isOpen) return;

    // Lock body scroll when modal is open
    const originalStyle = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Close on Escape key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalStyle;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Content */}
      <div
        className="glass relative z-10 w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border border-border shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-border/50 bg-background/80 px-6 py-4 backdrop-blur-md">
          <h2 id="modal-title" className="text-lg font-semibold text-foreground">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

// --- Main Component ---

export default function AdminDashboard() {
  const [openForm, setOpenForm] = useState(false);
  const [preview, setPreview] = useState<Project | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<Project | null>(null);
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);

  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [sort, setSort] = useState<SortOption>("title-asc");
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const { data, isLoading, isError } = useGetAdminProject();
  const { mutate: publish, isPending: isPublishing } = usePublishProject();
  const { mutate: deleteProject, isPending: isDeleting } = useDeleteProject();

  // Smart Keyboard Shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isTyping = target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable;

      if (e.key === "/" && !isTyping) {
        e.preventDefault();
        document.getElementById("admin-search")?.focus();
      }

      if ((e.key === "a" || e.key === "A") && (e.metaKey || e.ctrlKey) && !isTyping) {
        e.preventDefault();
        setProjectToEdit(null);
        setOpenForm(true);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const projects = useMemo(() => (data ?? []) as Project[], [data]);

  const processed = useMemo(() => {
    let list = [...projects];
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
    if (sort === "title-asc") list.sort((a, b) => a.title.localeCompare(b.title));
    else if (sort === "title-desc") list.sort((a, b) => b.title.localeCompare(a.title));
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
    const ids = processed.filter((p) => !p.isPublished && selected.has(p.id)).map((p) => p.id);
    if (ids.length === 0) return toast.info("No drafts selected to publish.");
    ids.forEach((id) => publish({ projectId: id }, { onSuccess: () => toast.success("Published"), onError: () => toast.error("Failed to publish") }));
    clearSelection();
  };

  const bulkDelete = () => {
    if (selected.size === 0) return toast.info("No projects selected.");
    const ids = Array.from(selected);
    ids.forEach((id) => deleteProject(id));
    toast.success("Initiated deletion of selected projects.");
    clearSelection();
  };

  const doDelete = (proj: Project) => {
    deleteProject(proj.id, {
      onSuccess: () => {
        toast.success(`${proj.title} deleted permanently.`);
        setConfirmDelete(null);
      },
      onError: () => toast.error(`Failed to delete ${proj.title}.`),
    });
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setProjectToEdit(null);
  };

  if (isLoading) return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <p className="text-sm text-muted-foreground">Loading dashboard...</p>
      </div>
    </div>
  );

  if (isError) return (
    <div className="flex min-h-screen items-center justify-center bg-background text-danger">
      Failed to load projects. Please check your connection.
    </div>
  );

  return (
    <div className="relative min-h-screen bg-background p-4 text-foreground sm:p-6 lg:p-8">
      {/* Background Grid */}
    <div   className="absolute inset-0 h-full w-full opacity-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[16px_16px]"
 />

      <div className="relative mx-auto max-w-7xl space-y-8">

        {/* Header */}
        <header className="flex flex-col gap-4 border-b border-border/50 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Project Management
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage your portfolio, publish drafts, and track messages.
            </p>
          </div>
          <div className="flex items-center gap-3">
             <span className="inline-flex items-center rounded-full border border-border bg-card/50 px-3 py-1 text-xs font-medium text-muted-foreground">
              {projects.length} Total
            </span>
            <Button onClick={() => { setProjectToEdit(null); setOpenForm(true); }} className="gap-2">
              <Plus size={18} /> Add Project
            </Button>
          </div>
        </header>

        <MessagesList />

        {/* Form Modal */}
        <Modal isOpen={openForm} onClose={handleCloseForm} title={projectToEdit ? "Edit Project" : "Add New Project"}>
          <AdminForm setOpen={handleCloseForm} projectToEdit={projectToEdit} />
        </Modal>

        {/* Toolbar */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <Search size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              id="admin-search"
              type="text"
              placeholder="Search title, tools..."
              value={query}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
              className="w-full rounded-lg border border-border bg-card/50 px-4 py-2.5 pl-10 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 hidden select-none items-center gap-1 rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:flex">
              /
            </kbd>
          </div>

          <div className="flex gap-3">
            <select
              value={status}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setStatus(e.target.value as StatusFilter)}
              className="min-w-[140px] cursor-pointer rounded-lg border border-border bg-card/50 px-3 py-2.5 text-sm text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              <option value="all">All Statuses</option>
              <option value="published">Published</option>
              <option value="draft">Drafts</option>
            </select>

            <select
              value={sort}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setSort(e.target.value as SortOption)}
              className="min-w-[140px] cursor-pointer rounded-lg border border-border bg-card/50 px-3 py-2.5 text-sm text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              <option value="title-asc">Title (A-Z)</option>
              <option value="title-desc">Title (Z-A)</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
          {processed.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/30 px-6 py-20 text-center">
              <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <FolderKanban size={28} />
              </div>
              <h3 className="mb-1 text-lg font-semibold text-foreground">No projects found</h3>
              <p className="mb-6 max-w-sm text-sm text-muted-foreground">
                {query || status !== "all"
                  ? "Try adjusting your search or filters to find what you're looking for."
                  : "Get started by creating your first project."}
              </p>
              {!query && status === "all" && (
                <Button onClick={() => { setProjectToEdit(null); setOpenForm(true); }} className="gap-2">
                  <Plus size={16} /> Add Project
                </Button>
              )}
            </div>
          ) : (
            processed.map((p) => {
              const isChecked = selected.has(p.id);
              return (
                <article
                  key={p.id}
                  className={cn(
                    "group relative flex flex-col overflow-hidden rounded-xl border border-border/60 bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5",
                    isChecked && "border-primary bg-primary/5 shadow-[0_0_0_1px_var(--primary)]"
                  )}
                >
                  <div className="relative h-[180px] border-b border-border/50 bg-muted">
                    <AdminProjectImage src={p.imageUrl} alt={p.title} />

                    {/* Status Badge */}
                    <div className="absolute right-3 top-3">
                      <span className={cn(
                        "rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md",
                        p.isPublished
                          ? "border border-emerald-500/30 bg-emerald-500/15 text-emerald-300"
                          : "border border-amber-500/30 bg-amber-500/15 text-amber-300"
                      )}>
                        {p.isPublished ? "Live" : "Draft"}
                      </span>
                    </div>

                    {/* Checkbox */}
                    <label className="absolute left-3 top-3 flex cursor-pointer items-center justify-center rounded-md border border-white/20 bg-black/40 p-1.5 backdrop-blur-md transition-colors hover:bg-black/60">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleSelect(p.id)}
                        className="size-4 cursor-pointer accent-primary"
                      />
                    </label>
                  </div>

                  <div className="flex grow flex-col p-5">
                    <h3 className="mb-1.5 text-lg font-bold text-foreground line-clamp-1">{p.title}</h3>
                    <p className="mb-4 text-sm leading-relaxed text-muted-foreground line-clamp-2">{p.description}</p>

                    <div className="mt-auto flex flex-wrap gap-1.5">
                      {p.tools?.slice(0, 3).map((t) => (
                        <span key={t} className="rounded-md border border-border/50 bg-muted/50 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                          {t}
                        </span>
                      ))}
                      {p.tools && p.tools.length > 3 && (
                        <span className="text-[10px] font-medium text-muted-foreground self-center">
                          +{p.tools.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-border/50 bg-muted/30 px-4 py-3">
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" onClick={() => { setProjectToEdit(p); setOpenForm(true); }} className="h-8 gap-1.5 px-2.5 text-xs">
                        <Pencil size={14} /> Edit
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => setPreview(p)} className="h-8 gap-1.5 px-2.5 text-xs">
                        <Eye size={14} /> View
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      {!p.isPublished && (
                        <Button size="sm" onClick={() => publish({ projectId: p.id })}  className="h-8 w-8 p-0">
                          <CheckCircle2 size={14} />
                        </Button>
                      )}
                      <Button size="icon-lg"  variant={'ghost'} className={'text-red-500 rounded-full! cursor-pointer hover:bg-red-500 hover:text-white'}  onClick={() => setConfirmDelete(p)}>
                            <Trash2 size={14} />

                      </Button>
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </div>

        {/* Floating Bulk Actions Bar */}
        {selected.size > 0 && (
          <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 animate-fade-in-up">
            <div className="glass flex items-center gap-4 rounded-full border border-primary/30 px-5 py-2.5 shadow-2xl shadow-black/40">
              <span className="text-sm font-semibold text-foreground whitespace-nowrap">
                {selected.size} selected
              </span>
              <div className="h-5 w-px bg-border" />
              <div className="flex items-center gap-2">
                <Button size="sm" onClick={bulkPublish}  className="gap-1.5 h-8 px-3 text-xs">
                  <CheckCircle2 size={14} /> Publish
                </Button>
                <Button size="sm" variant="destructive" onClick={bulkDelete} className="gap-1.5 h-8 px-3 text-xs">
                  <Trash2 size={14} /> Delete
                </Button>
                <button
                  onClick={clearSelection}
                  className="flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label="Clear selection"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Preview Modal */}
        <Modal isOpen={!!preview} onClose={() => setPreview(null)} title={preview?.title || "Project Preview"}>
          <div className="space-y-6">
            <p className="text-sm leading-relaxed text-muted-foreground">{preview?.description}</p>

            <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border bg-muted">
              <AdminProjectImage src={preview?.imageUrl || ""} alt={preview?.title || ""} />
            </div>

            <div className="flex flex-wrap gap-2">
              {preview?.tools?.map((t) => (
                <span key={t} className="rounded-md border border-border/50 bg-muted/50 px-2.5 py-1 text-xs font-medium text-foreground">
                  {t}
                </span>
              ))}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              {preview?.liveLink && (
                <a href={preview.liveLink} target="_blank" rel="noopener noreferrer" className="flex-1">
                  <Button variant="outline" className="w-full gap-2">
                    <ExternalLink size={16} /> Live Demo
                  </Button>
                </a>
              )}
              {preview?.projectLink && (
                <a href={preview.projectLink} target="_blank" rel="noopener noreferrer" className="flex-1">
                  <Button variant="outline" className="w-full gap-2">
                    <Github size={16} /> Source Code
                  </Button>
                </a>
              )}
            </div>
          </div>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal isOpen={!!confirmDelete} onClose={() => setConfirmDelete(null)} title="Delete Project">
          <div className="space-y-6">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Are you sure you want to permanently delete <strong className="font-semibold text-foreground">{confirmDelete?.title}</strong>?
              This action cannot be undone and will remove the project from your public portfolio.
            </p>
            <div className="flex justify-end gap-3 border-t border-border/50 pt-4">
              <Button variant="outline" onClick={() => setConfirmDelete(null)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => confirmDelete && doDelete(confirmDelete)}

                className="gap-2"
              >
                <Trash2 size={16} /> Delete Permanently
              </Button>
            </div>
          </div>
        </Modal>

      </div>
    </div>
  );
}