"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { toast } from "sonner";
import { UploadCloud, FileImage } from "lucide-react";

import { useAddProjectQuery, useEditProject } from "@/lib/query/projectQuery";
import styles from "./AdminForm.module.scss";
import { Button } from "@/components/ui/Buttons/Buttons";
import { Project } from "@/types/project";

// --- Schema ---
// Modified to accept a File (new upload) OR a string (existing database URL)
const ThumbnailSchema = z.union(
  [
    z
      .instanceof(File)
      .refine((f) => f.size <= 10 * 1024 * 1024, "Image must be less than 10MB")
      .refine(
        (f) =>
          [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp",
            "image/avif",
          ].includes(f.type),
        "Invalid image format (JPG, PNG, WEBP, AVIF only)",
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
    .transform((tools) =>
      tools.map((t) => t.trim()).filter((t) => t.length > 0),
    ),
  liveLink: z.string().min(5, "Live link is required"),
  projectLink: z.string().min(5, "Github link is required"),
  thumbNail: ThumbnailSchema,
});

type FormTypes = z.infer<typeof FormSchema>;

// Added projectToEdit prop
export default function AdminForm({
  setOpen,
  projectToEdit,
}: {
  setOpen: () => void;
  projectToEdit?: Project | null;
}) {
  const { mutate: addProject } = useAddProjectQuery();
  const { mutate: editProject } = useEditProject(); // Added Edit Hook

  const [uploadValue, setUploadValue] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [toolsInput, setToolsInput] = useState("");

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

  // Watch the thumbnail to show the user what file is selected
  const currentThumbnail = watch("thumbNail");

  // --- Pre-fill Form Data for Editing ---
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
      // Pre-fill the visual comma-separated input
      setToolsInput(projectToEdit.tools.join(", "));
    } else {
      // Clear form if opening for a "New Project"
      reset({
        title: "",
        description: "",
        tools: [],
        liveLink: "",
        projectLink: "",
      });
      setToolsInput("");
    }
  }, [projectToEdit, reset]);

  // Handle comma-separated tools string
  const handleToolsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToolsInput(e.target.value);
    const arr = e.target.value
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);
    setValue("tools", arr, { shouldValidate: true });
  };

  async function uploadToCloudinary(file: File) {
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
            const percent = Math.round((event.loaded * 100) / event.total);
            setUploadValue(percent);
          }
        },
      },
    );
    return res.data;
  }

  async function handleOnSave(data: FormTypes) {
    try {
      setIsUploading(true);
      let finalImageUrl = "";

      // 1. Determine Image URL (Upload new or keep existing)
      if (data.thumbNail instanceof File) {
        const cloudinaryRes = await uploadToCloudinary(data.thumbNail);
        if (!cloudinaryRes?.url) throw new Error("Failed to upload image");
        finalImageUrl = cloudinaryRes.url;
      } else if (typeof data.thumbNail === "string") {
        finalImageUrl = data.thumbNail; // Keep the existing URL
      }

      // 2. Prepare Final Payload
      const validData = { ...data, thumbNail: finalImageUrl };

      // 3. Save or Update Database
      if (projectToEdit) {
        editProject(
          { projectId: projectToEdit.id, data: validData },
          {
            onSuccess: () => {
              toast.success("Project updated successfully!");
              reset();
              setOpen(); // Close modal
            },
            onError: () => toast.error("Failed to update project."),
          },
        );
      } else {
        addProject(validData, {
          onSuccess: () => {
            toast.success("Project added successfully!");
            reset();
            setOpen(); // Close modal
          },
          onError: () => toast.error("Failed to add project."),
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsUploading(false);
      setUploadValue(0);
    }
  }

  return (
    <form onSubmit={handleSubmit(handleOnSave)} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="title" className={styles.label}>
          Title
        </label>
        <input
          id="title"
          type="text"
          placeholder="e.g. Next.js E-commerce Platform"
          className={`${styles.input} ${errors.title ? styles.inputError : ""}`}
          {...register("title")}
        />
        {errors.title && (
          <span className={styles.errorText}>{errors.title.message}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="description" className={styles.label}>
          Description
        </label>
        <textarea
          id="description"
          placeholder="Describe the project, challenges, and solutions..."
          className={`${styles.textarea} ${errors.description ? styles.inputError : ""}`}
          {...register("description")}
        />
        {errors.description && (
          <span className={styles.errorText}>{errors.description.message}</span>
        )}
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="tools" className={styles.label}>
            Tools (comma separated)
          </label>
          <input
            id="tools"
            type="text"
            placeholder="React, SCSS, Node.js"
            value={toolsInput}
            onChange={handleToolsChange}
            className={`${styles.input} ${errors.tools ? styles.inputError : ""}`}
          />
          {errors.tools && (
            <span className={styles.errorText}>{errors.tools.message}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="liveLink" className={styles.label}>
            Live Link
          </label>
          <input
            id="liveLink"
            type="url"
            placeholder="https://myproject.com"
            className={`${styles.input} ${errors.liveLink ? styles.inputError : ""}`}
            {...register("liveLink")}
          />
          {errors.liveLink && (
            <span className={styles.errorText}>{errors.liveLink.message}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="projectLink" className={styles.label}>
            Github Link
          </label>
          <input
            id="projectLink"
            type="url"
            placeholder="https://github.com/..."
            className={`${styles.input} ${errors.projectLink ? styles.inputError : ""}`}
            {...register("projectLink")}
          />
          {errors.projectLink && (
            <span className={styles.errorText}>
              {errors.projectLink.message}
            </span>
          )}
        </div>
      </div>

      {/* File Upload UI */}
      <div className={styles.formGroup}>
        <label className={styles.label}>Project Thumbnail</label>
        <div
          className={`${styles.fileUploadWrapper} ${errors.thumbNail ? styles.inputError : ""}`}
        >
          {/* Visual feedback if a file or existing image is present */}
          {currentThumbnail ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <FileImage size={24} className={styles.uploadIcon} />
              <span className={styles.uploadText}>
                {currentThumbnail instanceof File
                  ? currentThumbnail.name
                  : "Existing Image Selected"}
              </span>
              <span className={styles.uploadSubtext}>
                Click to replace image
              </span>
            </div>
          ) : (
            <>
              <UploadCloud size={24} className={styles.uploadIcon} />
              <span className={styles.uploadText}>
                Click to browse or drag and drop
              </span>
              <span className={styles.uploadSubtext}>
                JPG, PNG, or WEBP (Max 10MB)
              </span>
            </>
          )}

          <input
            type="file"
            accept="image/*"
            className={styles.fileInput}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setValue("thumbNail", file, { shouldValidate: true });
            }}
          />
        </div>
        {errors.thumbNail && (
          <span className={styles.errorText}>{errors.thumbNail.message}</span>
        )}
      </div>

      {isUploading && (
        <div className={styles.progressContainer}>
          <div className={styles.progressHeader}>
            <span>
              {/* Check currentThumbnail instead of data */}
              {currentThumbnail instanceof File
                ? "Uploading Image..."
                : "Saving Data..."}
            </span>
            <span>{uploadValue}%</span>
          </div>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${uploadValue}%` }}
            />
          </div>
        </div>
      )}

      <div className={styles.formFooter}>
        <Button
          type="button"
          variant="ghost"
          onClick={setOpen}
          disabled={isUploading}
        >
          Cancel
        </Button>
        <Button type="submit" variant="primary" isLoading={isUploading}>
          {projectToEdit ? "Update Project" : "Save Project"}
        </Button>
      </div>
    </form>
  );
}
