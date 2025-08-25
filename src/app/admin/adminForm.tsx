"use client";

import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import axios from "axios";
import { useAddProjectQuery } from "@/lib/query/projectQuery";
import { toast } from "sonner";
import { env } from "../../../env";

export default function AdminForm({ setOpen }: { setOpen: () => void }) {
  const [uploadValue, setUploadValue] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const { mutate } = useAddProjectQuery();
  const [inputValue, setInputValue] = useState<string>("");

  const ThumbnailSchema = z
    .instanceof(File)
    .refine((f) => f.size > 0, "Thumbnail is required")
    .refine((f) => f.size <= 10 * 1024 * 1024, "Image must be lesser than 10MB")
    .refine(
      (f) =>
        [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/webp",
          "image/avif",
        ].includes(f.type),
      "Invalid image format"
    );

  const FormSchema = z.object({
    title: z.string().min(10, "Title cannot be null"),
    description: z.string().min(10, "Description cannot be null"),
    tools: z
      .array(z.string())
      .min(1, "Tools cannot be null")
      .transform((tools) =>
        tools.map((t) => t.trim()).filter((t) => t.length > 0)
      ),
    liveLink: z.string().min(5, "Live link cannot be null"),
    projectLink: z.string().min(5, "Project link cannot be null"),
    thumbNail: ThumbnailSchema,
  });

  type formTypes = z.infer<typeof FormSchema>;

  const form = useForm<formTypes>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      description: "",
      liveLink: "",
      projectLink: "",
      title: "",
      tools: [""],
    },
  });
  async function uploadToCloudinary(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "portfolio");
    formData.append("folder", "portfolio");

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${env.NEXT_PUBLIC_CLOUDINARY_NAME}/upload`,
        formData,
        {
          onUploadProgress: (event) => {
            if (event.total) {
              const percent = Math.round((event.loaded * 100) / event.total);
              setUploadValue(percent);
            }
          },
        }
      );

      return res.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function handleOnSave(data: formTypes) {
    try {
      setIsUploading(true);
      const res = (await uploadToCloudinary(data.thumbNail)) as {
        url: string;
      };
      const valid = { ...data, thumbNail: res.url };

      mutate(valid, {
        onSuccess: () => {
          toast.success("Project added successfully");
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsUploading(false);
      form.reset();
      setOpen();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleOnSave)} className=" space-y-5">
        <FormField
          name="title"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter your project title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Description</FormLabel>
              <FormControl>
                <Textarea
                  className=" h-20"
                  placeholder="Enter your project description"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="tools"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="font-bold">
                  Tools (comma separated)
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="React, Vue, MongoDB"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onBlur={() => {
                      // Convert to array on blur
                      const arr = inputValue
                        .split(",")
                        .map((t) => t.trim())
                        .filter((t) => t.length > 0);
                      field.onChange(arr);
                      setInputValue(arr.join(", "));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          name="liveLink"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Live link</FormLabel>
              <FormControl>
                <Input placeholder="Enter your project live link" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="projectLink"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Github Link</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your project github link"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="thumbNail"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Thumbnail</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) field.onChange(file);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          {isUploading && (
            <progress
              className="w-full h-3 rounded-lg bg-gray-100 overflow-hidden"
              value={uploadValue}
              max={100}
            />
          )}
        </div>
        <DialogFooter>
          <DialogClose>Close</DialogClose>
          <Button disabled={isUploading} className=" font-bold text-white">
            {isUploading ? "Uploading" : "Upload"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
