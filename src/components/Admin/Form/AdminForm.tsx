"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { toast } from "sonner";
import { UploadCloud } from "lucide-react";

import { useAddProjectQuery } from "@/lib/query/projectQuery";
import styles from "./AdminForm.module.scss";
import { Button } from "@/components/ui/Buttons/Buttons";

// --- Schema ---
const ThumbnailSchema = z
  .instanceof(File, { message: "Thumbnail image is required" })
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

export default function AdminForm({ setOpen }: { setOpen: () => void }) {
  const { mutate } = useAddProjectQuery();
  const [uploadValue, setUploadValue] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [toolsInput, setToolsInput] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
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

      // 1. Upload Image
      const cloudinaryRes = await uploadToCloudinary(data.thumbNail);
      if (!cloudinaryRes?.url) throw new Error("Failed to upload image");

      // 2. Prepare Data
      const validData = { ...data, thumbNail: cloudinaryRes.url };

      // 3. Save to Database
      mutate(validData, {
        onSuccess: () => {
          toast.success("Project added successfully!");
          reset();
          setOpen(); // Close modal
        },
        onError: () => {
          toast.error("Failed to save project to the database.");
        },
      });
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during upload. Please try again.");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(handleOnSave)} className={styles.form}>
      {/* Title */}
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

      {/* Description */}
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

      {/* Tools & Links Row */}
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

      {/* File Upload */}
      <div className={styles.formGroup}>
        <label className={styles.label}>Project Thumbnail</label>
        <div
          className={`${styles.fileUploadWrapper} ${errors.thumbNail ? styles.inputError : ""}`}
        >
          <UploadCloud size={24} className={styles.uploadIcon} />
          <span className={styles.uploadText}>
            Click to browse or drag and drop
          </span>
          <span className={styles.uploadSubtext}>
            JPG, PNG, or WEBP (Max 10MB)
          </span>
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

      {/* Custom Progress Bar */}
      {isUploading && (
        <div className={styles.progressContainer}>
          <div className={styles.progressHeader}>
            <span>Uploading...</span>
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

      {/* Footer Actions */}
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
          Save Project
        </Button>
      </div>
    </form>
  );
}
