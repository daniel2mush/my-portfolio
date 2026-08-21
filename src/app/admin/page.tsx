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
} from "lucide-react";
import { CiShare1 } from "react-icons/ci";
import { FiGithub } from "react-icons/fi";

import { toast } from "sonner";

import {
  useGetAdminProject,
  usePublishProject,
  useDeleteProject, // Added this import
} from "@/lib/query/projectQuery";
import { Button } from "@/components/ui/Buttons/Buttons";
import AdminForm from "@/components/Admin/Form/AdminForm";
import { Project } from "@/lib/types";
import { StatusFilter, SortOption } from "@/types/project";
import MessagesList from "./MessageList";
import { cn } from "@/lib/utils";

export const adminStyles = {
  dashboard: "flex min-h-screen flex-col gap-8 bg-background p-5 text-foreground md:p-10",
  loader: "flex min-h-screen items-center justify-center bg-background text-lg text-text-secondary",
  error: "flex min-h-screen items-center justify-center bg-background text-lg text-red-400",
  header: "flex flex-col gap-5 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between",
  headerTitles: "",
  badge: "inline-block rounded-full border border-primary/20 bg-primary/15 px-3 py-1 text-sm font-semibold text-primary",
  toolbar: "flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between",
  searchBox: "relative grow lg:max-w-[450px]",
  searchIcon: "pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary",
  nativeInput: "w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 pl-11 text-sm text-foreground outline-none transition-all placeholder:text-white/30 focus:border-primary focus:bg-white/[0.05] focus:ring-4 focus:ring-primary/15",
  filters: "flex flex-col gap-4 sm:flex-row",
  nativeSelect: "min-w-40 cursor-pointer rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-primary focus:bg-white/[0.05] focus:ring-4 focus:ring-primary/15",
  bulkBar: "flex animate-[slide-down-fade_0.3s_ease-out_forwards] flex-col gap-4 rounded-lg border border-primary/30 bg-primary/10 p-4 md:flex-row md:items-center md:justify-between md:px-6",
  bulkCount: "text-base font-semibold text-primary",
  bulkActions: "flex flex-wrap gap-3",
  grid: "grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-7",
  emptyState: "col-span-full rounded-xl border border-dashed border-white/15 bg-white/[0.02] px-5 py-20 text-center text-lg text-text-secondary",
  card: "flex animate-[slide-up-fade_0.5s_cubic-bezier(0.16,1,0.3,1)_forwards] flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] opacity-0 backdrop-blur transition-all hover:border-white/20 hover:shadow-[0_10px_30px_rgba(0,0,0,0.2)]",
  cardSelected: "border-primary bg-primary/5 shadow-[0_0_0_1px_var(--primary)]",
  cardHeader: "relative h-[180px] border-b border-white/5 bg-black/40",
  imageWrapper: "relative size-full",
  image: "object-cover",
  imageFallback: "flex h-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-white/[0.02] to-white/[0.05] text-text-secondary",
  fallbackIcon: "opacity-50",
  badges: "absolute right-3.5 top-3.5",
  statusBadge: "rounded-full px-3 py-1 text-xs font-bold uppercase",
  published: "border border-emerald-500/30 bg-emerald-500/15 text-emerald-300",
  draft: "border border-amber-500/30 bg-amber-500/15 text-amber-300",
  checkboxWrapper: "absolute left-3 top-3 flex cursor-pointer items-center justify-center rounded-md border border-white/10 bg-black/60 p-2 backdrop-blur transition-colors hover:bg-black/80",
  checkbox: "size-[18px] cursor-pointer accent-primary",
  cardBody: "flex grow flex-col p-6",
  title: "mb-2 text-xl font-bold text-foreground",
  description: "mb-5 overflow-hidden text-sm leading-6 text-text-secondary [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]",
  tools: "mt-auto flex flex-wrap gap-2",
  toolTag: "rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-text-light",
  cardFooter: "flex justify-between border-t border-white/5 bg-black/20 px-6 py-4",
  actionGroup: "flex gap-3",
  modalOverlay: "fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 p-5 backdrop-blur-md",
  modalContent: "max-h-[90vh] w-full max-w-[650px] overflow-y-auto rounded-2xl border border-white/10 bg-background shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]",
  modalHeader: "flex items-center justify-between border-b border-white/10 px-6 py-5 md:px-8",
  closeModalBtn: "flex items-center justify-center rounded-md p-1.5 text-text-secondary transition-all hover:bg-white/10 hover:text-foreground",
  modalBody: "p-6 md:p-8",
  previewContent: "flex flex-col gap-6",
  previewImageWrapper: "relative aspect-video w-full overflow-hidden rounded-lg border border-white/10",
  previewTools: "flex flex-wrap gap-2.5",
  previewLinks: "flex flex-col gap-4 sm:flex-row",
  deleteWarning: "mb-6 text-base leading-7 text-text-secondary",
  deleteDialogActions: "flex justify-end gap-4 border-t border-white/10 pt-6",
};

const styles = adminStyles;

const AdminProjectImage = ({ src, alt }: { src: string; alt: string }) => {
  const [hasError, setHasError] = useState(false);
  if (!src || hasError) {
    return (
      <div className={styles.imageFallback}>
        <ImageIcon size={30} className={styles.fallbackIcon} />
        <span>No image</span>
      </div>
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={styles.image}
      sizes="(max-width: 768px) 100vw, 300px"
      onError={() => setHasError(true)}
    />
  );
};

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) => {
  if (!isOpen) return null;
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className="text-xl font-bold text-foreground">{title}</h2>
          <button
            className={styles.closeModalBtn}
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>
        <div className={styles.modalBody}>{children}</div>
      </div>
    </div>
  );
};

export default function AdminDashboard() {
  const [openForm, setOpenForm] = useState(false);
  const [preview, setPreview] = useState<Project | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<Project | null>(null);
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null); // New state for editing

  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [sort, setSort] = useState<SortOption>("title-asc");
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const { data, isLoading, isError } = useGetAdminProject();
  const { mutate: publish, isPending: isPublishing } = usePublishProject();
  const { mutate: deleteProject, isPending: isDeleting } = useDeleteProject(); // Initialized delete mutation

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "/") {
        e.preventDefault();
        document.getElementById("admin-search")?.focus();
      }
      if ((e.key === "a" || e.key === "A") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpenForm(true);
        setProjectToEdit(null); // Ensure form is empty for "Add"
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
    if (sort === "title-asc")
      list.sort((a, b) => a.title.localeCompare(b.title));
    else if (sort === "title-desc")
      list.sort((a, b) => b.title.localeCompare(a.title));
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
    if (ids.length === 0) return toast.info("No drafts selected to publish.");
    ids.forEach((id) =>
      publish(
        { projectId: id },
        {
          onSuccess: () => toast.success("Published"),
          onError: () => toast.error("Failed to publish some items"),
        },
      ),
    );
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

  // Helper to cleanly close the form and wipe the edit state
  const handleCloseForm = () => {
    setOpenForm(false);
    setProjectToEdit(null);
  };

  if (isLoading)
    return <div className={styles.loader}>Loading dashboard...</div>;
  if (isError)
    return <div className={styles.error}>Failed to load projects.</div>;

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <div className={styles.headerTitles}>
          <h1 className="mb-2 text-[clamp(1.8rem,3vw,2.2rem)] font-bold text-foreground">
            Project Management
          </h1>
          <span className={styles.badge}>{projects.length} Total Projects</span>
        </div>

        <Button
          variant="primary"
          onClick={() => {
            setProjectToEdit(null); // Ensure form is blank for new project
            setOpenForm(true);
          }}
        >
          <Plus size={18} /> Add Project
        </Button>
      </header>

      <MessagesList />

      <Modal
        isOpen={openForm}
        onClose={handleCloseForm}
        title={projectToEdit ? "Edit Project" : "Add New Project"}
      >
        <AdminForm
          setOpen={handleCloseForm}
          projectToEdit={projectToEdit} // Pass this down to pre-fill your form!
        />
      </Modal>

      {/* Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <Search size={18} className={styles.searchIcon} />
          <input
            id="admin-search"
            type="text"
            placeholder="Search title, tools... (Press /)"
            value={query}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setQuery(e.target.value)
            }
            className={styles.nativeInput}
          />
        </div>

        <div className={styles.filters}>
          <select
            value={status}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setStatus(e.target.value as StatusFilter)
            }
            className={styles.nativeSelect}
          >
            <option value="all">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
          </select>

          <select
            value={sort}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setSort(e.target.value as SortOption)
            }
            className={styles.nativeSelect}
          >
            <option value="title-asc">Title (A-Z)</option>
            <option value="title-desc">Title (Z-A)</option>
          </select>
        </div>
      </div>

      {selected.size > 0 && (
        <div className={styles.bulkBar}>
          <span className={styles.bulkCount}>
            {selected.size} items selected
          </span>
          <div className={styles.bulkActions}>
            <Button
              size="sm"
              variant="primary"
              onClick={bulkPublish}
              isLoading={isPublishing}
            >
              <CheckCircle2 size={16} /> Publish Selected
            </Button>
            <Button size="sm" variant="danger" onClick={bulkDelete}>
              <Trash2 size={16} /> Delete Selected
            </Button>
            <Button size="sm" variant="ghost" onClick={clearSelection}>
              <X size={16} /> Clear
            </Button>
          </div>
        </div>
      )}

      {/* Grid */}
      <div className={styles.grid}>
        {processed.length === 0 ? (
          <div className={styles.emptyState}>
            No projects match your search criteria.
          </div>
        ) : (
          processed.map((p, index) => {
            const isChecked = selected.has(p.id);
            return (
              <article
                key={p.id}
                className={cn(styles.card, isChecked && styles.cardSelected)}
                style={{ "--index": index } as React.CSSProperties}
              >
                <div className={styles.cardHeader}>
                  <div className={styles.imageWrapper}>
                    <AdminProjectImage src={p.imageUrl} alt={p.title} />
                  </div>
                  <div className={styles.badges}>
                    <span
                      className={cn(
                        styles.statusBadge,
                        p.isPublished ? styles.published : styles.draft,
                      )}
                    >
                      {p.isPublished ? "Published" : "Draft"}
                    </span>
                  </div>
                  <label className={styles.checkboxWrapper}>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleSelect(p.id)}
                      className={styles.checkbox}
                    />
                  </label>
                </div>

                <div className={styles.cardBody}>
                  <h3 className={styles.title}>{p.title}</h3>
                  <p className={styles.description}>{p.description}</p>
                  <div className={styles.tools}>
                    {p.tools?.slice(0, 4).map((t) => (
                      <span key={t} className={styles.toolTag}>
                        {t}
                      </span>
                    ))}
                    {p.tools && p.tools.length > 4 && (
                      <span className={styles.toolTag}>
                        +{p.tools.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                <div className={styles.cardFooter}>
                  <div className={styles.actionGroup}>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setProjectToEdit(p);
                        setOpenForm(true);
                      }}
                    >
                      <Pencil size={14} /> Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setPreview(p)}
                    >
                      <Eye size={14} /> Preview
                    </Button>
                  </div>
                  <div className={styles.actionGroup}>
                    {!p.isPublished && (
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => publish({ projectId: p.id })}
                        isLoading={isPublishing}
                      >
                        <CheckCircle2 size={14} />
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => setConfirmDelete(p)}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>

      <Modal
        isOpen={!!preview}
        onClose={() => setPreview(null)}
        title={preview?.title || "Project Preview"}
      >
        <div className={styles.previewContent}>
          <p className={styles.description}>{preview?.description}</p>
          <div className={styles.previewImageWrapper}>
            <AdminProjectImage
              src={preview?.imageUrl || ""}
              alt={preview?.title || ""}
            />
          </div>
          <div className={styles.previewTools}>
            {preview?.tools?.map((t) => (
              <span key={t} className={styles.toolTag}>
                {t}
              </span>
            ))}
          </div>
          <div className={styles.previewLinks}>
            {preview?.liveLink && (
              <Button
                variant="outline"
                onClick={() => window.open(preview.liveLink, "_blank")}
              >
                <CiShare1 size={18} /> View Live Demo
              </Button>
            )}
            {preview?.projectLink && (
              <Button
                variant="outline"
                onClick={() => window.open(preview.projectLink, "_blank")}
              >
                <FiGithub size={18} /> View Source Code
              </Button>
            )}
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        title="Delete Project"
      >
        <p className={styles.deleteWarning}>
          Are you sure? This will permanently delete{" "}
          <strong className="text-foreground">{confirmDelete?.title}</strong>.
          This action cannot be undone.
        </p>
        <div className={styles.deleteDialogActions}>
          <Button variant="outline" onClick={() => setConfirmDelete(null)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => confirmDelete && doDelete(confirmDelete)}
            isLoading={isDeleting}
          >
            Delete Permanently
          </Button>
        </div>
      </Modal>
    </div>
  );
}
