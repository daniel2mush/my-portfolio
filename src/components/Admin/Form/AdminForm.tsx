"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { toast } from "sonner";
import {
  UploadCloud,
  X,
  Image as ImageIcon,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import Image from "next/image";

import { useAddProjectQuery, useEditProject } from "@/lib/query/projectQuery";
import { Project } from "@/types/project";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// ============================================================
// SCHEMA
// ============================================================

const ThumbnailSchema = z.union(
  [
    z
      .instanceof(File)
      .refine((f) => f.size <= 10 * 1024 * 1024, "Image must be less than 10MB")
      .refine(
        (f) =>
          ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/avif"].includes(f.type),
        "Invalid format (JPG, PNG, WEBP, AVIF only)",
      ),
    z.string().url("Valid image URL is required"),
  ],
  { message: "Thumbnail image is required" },
);

const FormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  tools: z
    .array(z.string())
    .min(1, "At least one tool is required")
    .transform((tools) => tools.map((t) => t.trim()).filter((t) => t.length > 0)),
  liveLink: z.string().url("Must be a valid URL"),
  projectLink: z.string().url("Must be a valid URL"),
  thumbNail: ThumbnailSchema,
});

type FormTypes = z.infer<typeof FormSchema>;

// ============================================================
// REUSABLE FORM FIELD WRAPPER
// ============================================================

interface FormFieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
  hint?: string;
}

function FormField({ label, htmlFor, error, children, hint }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium text-foreground">
        {label}
      </label>
      {children}
      {hint && !error && (
        <span className="text-xs text-muted-foreground">{hint}</span>
      )}
      {error && (
        <span className="flex items-center gap-1.5 text-xs font-medium text-red-400">
          <AlertCircle size={12} />
          {error}
        </span>
      )}
    </div>
  );
}

// ============================================================
// TAG INPUT COMPONENT (For Tools)
// ============================================================

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  hasError?: boolean;
}

function TagInput({ tags, onChange, hasError }: TagInputProps) {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const addTag = (value: string) => {
    const trimmed = value.trim();
    if (trimmed && !tags.includes(trimmed)) {
      onChange([...tags, trimmed]);
    }
    setInputValue("");
  };

  const removeTag = (index: number) => {
    onChange(tags.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(inputValue);
    }
    if (e.key === "Backspace" && !inputValue && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  };

  return (
    <div
      className={cn(
        "flex min-h-[46px] w-full flex-wrap items-center gap-2 rounded-lg border bg-background/50 px-3 py-2 transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20",
        hasError ? "border-red-500/60 bg-red-500/5" : "border-border"
      )}
      onClick={() => inputRef.current?.focus()}
    >
      {tags.map((tag, index) => (
        <span
          key={tag}
          className="group inline-flex items-center gap-1 rounded-md bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary border border-primary/20"
        >
          {tag}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              removeTag(index);
            }}
            className="ml-0.5 rounded-full p-0.5 transition-colors hover:bg-primary/20"
            aria-label={`Remove ${tag}`}
          >
            <X size={10} />
          </button>
        </span>
      ))}
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => inputValue && addTag(inputValue)}
        placeholder={tags.length === 0 ? "Type a tool and press Enter..." : ""}
        className="min-w-[120px] flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/50"
      />
    </div>
  );
}

// ============================================================
// IMAGE UPLOAD COMPONENT
// ============================================================

interface ImageUploadProps {
  value: File | string | undefined;
  onChange: (file: File) => void;
  onClear: () => void;
  hasError?: boolean;
}

function ImageUpload({ value, onChange, onClear, hasError }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Generate preview URL for File objects
  useEffect(() => {
    if (value instanceof File) {
      const url = URL.createObjectURL(value);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else if (typeof value === "string" && value) {
      setPreviewUrl(value);
    } else {
      setPreviewUrl(null);
    }
  }, [value]);

  const handleFile = useCallback(
    (file: File | undefined) => {
      if (!file) return;
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file.");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast.error("Image must be less than 10MB.");
        return;
      }
      onChange(file);
    },
    [onChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      handleFile(e.dataTransfer.files?.[0]);
    },
    [handleFile]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  // If we have a preview, show the image with a replace/remove overlay
  if (previewUrl) {
    return (
      <div className="group relative aspect-video w-full overflow-hidden rounded-lg border border-border bg-muted">
        <Image
          src={previewUrl}
          alt="Project thumbnail preview"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 500px"
        />
        {/* Hover Overlay */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/60 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20"
          >
            <UploadCloud size={16} /> Replace
          </button>
          <button
            type="button"
            onClick={onClear}
            className="flex items-center gap-2 rounded-lg bg-red-500/20 px-4 py-2 text-sm font-medium text-red-300 transition-colors hover:bg-red-500/30"
          >
            <X size={16} /> Remove
          </button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </div>
    );
  }

  // Empty state: Drag & Drop zone
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Upload project thumbnail"
      className={cn(
        "relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-10 text-center transition-all",
        isDragging
          ? "border-primary bg-primary/10 scale-[1.02]"
          : hasError
            ? "border-red-500/60 bg-red-500/5"
            : "border-border/60 bg-background/30 hover:border-primary/50 hover:bg-primary/5"
      )}
      onClick={() => fileInputRef.current?.click()}
      onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <div className={cn(
        "mb-3 flex size-12 items-center justify-center rounded-full transition-colors",
        isDragging ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
      )}>
        <UploadCloud size={24} strokeWidth={1.5} />
      </div>
      <p className="mb-1 text-sm font-medium text-foreground">
        {isDragging ? "Drop your image here" : "Click to browse or drag & drop"}
      </p>
      <p className="text-xs text-muted-foreground">
        JPG, PNG, WEBP, or AVIF • Max 10MB
      </p>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
    </div>
  );
}

// ============================================================
// MAIN FORM COMPONENT
// ============================================================

export default function AdminForm({
  setOpen,
  projectToEdit,
}: {
  setOpen: () => void;
  projectToEdit?: Project | null;
}) {
  const { mutate: addProject, isPending: isAdding } = useAddProjectQuery();
  const { mutate: editProject, isPending: isEditing } = useEditProject();

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [tools, setTools] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormTypes>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      description: "",
      tools: [],
      liveLink: "",
      projectLink: "",
    },
  });

  const currentThumbnail = watch("thumbNail");
  const isSaving = isAdding || isEditing || isUploading;

  // Sync tools state with react-hook-form
  useEffect(() => {
    setValue("tools", tools, { shouldValidate: true });
  }, [tools, setValue]);

  // Pre-fill form for editing
  useEffect(() => {
    if (projectToEdit) {
      reset({
        title: projectToEdit.title,
        description: projectToEdit.description,
        tools: projectToEdit.tools,
        liveLink: projectToEdit.liveLink || "",
        projectLink: projectToEdit.projectLink || "",
        thumbNail: projectToEdit.imageUrl,
      });
      setTools(projectToEdit.tools);
    } else {
      reset({
        title: "",
        description: "",
        tools: [],
        liveLink: "",
        projectLink: "",
      });
      setTools([]);
    }
  }, [projectToEdit, reset]);

  async function uploadToCloudinary(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "portfolio");
    formData.append("folder", "portfolio");

    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/upload`,
      formData,
      {
        onUploadProgress: (event) => {
          if (event.total) {
            setUploadProgress(Math.round((event.loaded * 100) / event.total));
          }
        },
      },
    );

    if (!res.data?.secure_url) throw new Error("Upload failed");
    return res.data.secure_url;
  }

  async function handleOnSave(data: FormTypes) {
    try {
      setIsUploading(true);
      let finalImageUrl = "";

      if (data.thumbNail instanceof File) {
        finalImageUrl = await uploadToCloudinary(data.thumbNail);
      } else if (typeof data.thumbNail === "string") {
        finalImageUrl = data.thumbNail;
      }

      const payload = { ...data, thumbNail: finalImageUrl };

      if (projectToEdit) {
        editProject(
          { projectId: projectToEdit.id, data: payload },
          {
            onSuccess: () => {
              toast.success("Project updated successfully!");
              setOpen();
            },
            onError: () => toast.error("Failed to update project."),
          },
        );
      } else {
        addProject(payload, {
          onSuccess: () => {
            toast.success("Project created successfully!");
            setOpen();
          },
          onError: () => toast.error("Failed to create project."),
        });
      }
    } catch (error) {
      console.error("Save error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  }

  const inputClasses = (hasError?: boolean) =>
    cn(
      "w-full rounded-lg border bg-background/50 px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/50",
      "focus:border-primary focus:ring-2 focus:ring-primary/20",
      hasError
        ? "border-red-500/60 bg-red-500/5 focus:border-red-500 focus:ring-red-500/20"
        : "border-border"
    );

  return (
    <form onSubmit={handleSubmit(handleOnSave)} className="flex flex-col gap-6">
      {/* Title */}
      <FormField label="Project Title" htmlFor="title" error={errors.title?.message}>
        <input
          id="title"
          type="text"
          placeholder="e.g. Next.js E-commerce Platform"
          className={inputClasses(!!errors.title)}
          aria-invalid={!!errors.title}
          {...register("title")}
        />
      </FormField>

      {/* Description */}
      <FormField label="Description" htmlFor="description" error={errors.description?.message}>
        <textarea
          id="description"
          placeholder="Describe the project scope, challenges faced, and solutions delivered..."
          rows={4}
          className={cn(inputClasses(!!errors.description), "resize-y min-h-[120px]")}
          aria-invalid={!!errors.description}
          {...register("description")}
        />
      </FormField>

      {/* Tools (Tag Input) */}
      <FormField
        label="Tech Stack"
        htmlFor="tools"
        error={errors.tools?.message}
        hint="Press Enter or comma to add a tag"
      >
        <TagInput tags={tools} onChange={setTools} hasError={!!errors.tools} />
      </FormField>

      {/* Links Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField label="Live URL" htmlFor="liveLink" error={errors.liveLink?.message}>
          <input
            id="liveLink"
            type="url"
            placeholder="https://myproject.com"
            className={inputClasses(!!errors.liveLink)}
            aria-invalid={!!errors.liveLink}
            {...register("liveLink")}
          />
        </FormField>

        <FormField label="GitHub URL" htmlFor="projectLink" error={errors.projectLink?.message}>
          <input
            id="projectLink"
            type="url"
            placeholder="https://github.com/user/repo"
            className={inputClasses(!!errors.projectLink)}
            aria-invalid={!!errors.projectLink}
            {...register("projectLink")}
          />
        </FormField>
      </div>

      {/* Thumbnail Upload */}
      <FormField label="Project Thumbnail" htmlFor="thumbnail" error={errors.thumbNail?.message}>
        <ImageUpload
          value={currentThumbnail}
          onChange={(file) => setValue("thumbNail", file, { shouldValidate: true })}
          onClear={() => setValue("thumbNail", "" as never, { shouldValidate: true })}
          hasError={!!errors.thumbNail}
        />
      </FormField>

      {/* Upload Progress */}
      {isUploading && uploadProgress > 0 && uploadProgress < 100 && (
        <div className="flex items-center gap-4 rounded-lg border border-border/50 bg-card/50 p-4">
          <Loader2 size={18} className="animate-spin text-primary shrink-0" />
          <div className="flex-1">
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="font-medium text-foreground">Uploading to Cloudinary...</span>
              <span className="text-muted-foreground">{uploadProgress}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all duration-300 ease-out"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Saving Indicator */}
      {isSaving && uploadProgress === 0 && (
        <div className="flex items-center gap-3 rounded-lg border border-border/50 bg-card/50 p-4">
          <Loader2 size={18} className="animate-spin text-primary" />
          <span className="text-sm font-medium text-foreground">
            {projectToEdit ? "Updating project..." : "Creating project..."}
          </span>
        </div>
      )}

      {/* Footer Actions */}
      <div className="flex items-center justify-end gap-3 border-t border-border/50 pt-6">
        <Button
          type="button"
          variant="ghost"
          onClick={setOpen}
          disabled={isSaving}
          className="gap-2"
        >
          <X size={16} /> Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSaving}
          className="gap-2 shadow-lg shadow-primary/20"
        >
          {isSaving ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <CheckCircle2 size={16} />
              {projectToEdit ? "Update Project" : "Create Project"}
            </>
          )}
        </Button>
      </div>
    </form>
  );
}