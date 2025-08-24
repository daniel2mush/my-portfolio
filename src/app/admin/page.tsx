"use client";
import { useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { CiShare1 } from "react-icons/ci";
import { FiGithub } from "react-icons/fi";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AdminForm from "./adminForm";
import {
  useGetAdminProject,
  usePublishProject,
} from "@/lib/query/projectQuery";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

export default function AdminDashboard() {
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetAdminProject();
  const { mutate: publish } = usePublishProject();

  if (isLoading) {
    return (
      <div className="w-full h-[80vh] flex items-center justify-center">
        <span className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full"></span>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-10 space-y-10">
      {/* Header + Dialog */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl h-[80vh] overflow-y-scroll">
            <DialogHeader>
              <DialogTitle>Add new project</DialogTitle>
            </DialogHeader>
            <AdminForm setOpen={() => setOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Grid with project cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data!.map((p, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}>
            <Card className="overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
              {/* Image section */}
              <div className="relative w-full h-56 bg-muted">
                <Image
                  src={p.imageUrl}
                  alt={p.title}
                  fill
                  className="object-cover"
                />
                <span
                  className={`absolute top-3 right-3 px-3 py-1 text-xs font-medium rounded-full ${
                    p.isPublished
                      ? "bg-green-100 text-green-700"
                      : "bg-amber-100 text-amber-700"
                  }`}>
                  {p.isPublished ? "Published" : "Draft"}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {p.description}
                  </p>
                </div>

                {/* Tools */}
                <div className="flex flex-wrap gap-2">
                  {p.tools.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2 pt-2">
                  <a
                    href={p.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-md border hover:bg-primary/10">
                    <CiShare1 /> Live
                  </a>
                  <a
                    href={p.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-md border hover:bg-primary/10">
                    <FiGithub /> Code
                  </a>
                  <Button size="sm" variant="secondary">
                    Edit
                  </Button>
                  <Button size="sm" variant="destructive">
                    Delete
                  </Button>
                  {!p.isPublished && (
                    <Button
                      onClick={() =>
                        publish(
                          { projectId: p.id },
                          {
                            onSuccess: () => toast.success("Project published"),
                          }
                        )
                      }
                      size="sm"
                      className="bg-green-500 hover:bg-green-600">
                      Publish
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
