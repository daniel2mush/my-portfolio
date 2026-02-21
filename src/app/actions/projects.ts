"use server";

import { db } from "@/lib/db";
import { recentProjects } from "@/lib/db/schema";
import { uploadTypes } from "@/lib/types";
import { desc, eq } from "drizzle-orm";

export async function AddToDatabase(formValue: uploadTypes) {
  if (!formValue)
    return {
      status: false,
      message: "No formValue",
    };

  try {
    await db.insert(recentProjects).values({
      description: formValue.description,
      imageUrl: formValue.thumbNail,
      liveLink: formValue.liveLink,
      projectLink: formValue.projectLink,
      title: formValue.title,
      tools: formValue.tools,
    });

    return {
      status: true,
      message: "Project successfully uploaded",
    };
  } catch (error) {
    console.error(error);
    return {
      status: false,
      message: "Error occurred while adding new project",
    };
  }
}

export async function GetAdminProjects() {
  try {
    const res = await db.select().from(recentProjects);
    return res;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function GetAllProjects(limit?: number) {
  try {
    const baseQuery = db
      .select()
      .from(recentProjects)
      .where(eq(recentProjects.isPublished, true))
      .orderBy(desc(recentProjects.createdAt));

    const finalQuery =
      typeof limit === "number" ? baseQuery.limit(limit) : baseQuery;

    const res = await finalQuery;
    return res;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Publish action
export async function Publish(projectId: string) {
  if (!projectId)
    return {
      status: false,
      message: "No project id found",
    };

  try {
    await db
      .update(recentProjects)
      .set({
        isPublished: true,
      })
      .where(eq(recentProjects.id, projectId));

    return {
      status: true,
      message: "Project published successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      status: false,
      message: "Error occurred, please try again later",
    };
  }
}

// ==========================================
// ✏️ EDIT ACTION
// ==========================================
export async function EditProject(projectId: string, formValue: uploadTypes) {
  if (!projectId || !formValue) {
    return {
      status: false,
      message: "Missing project ID or form data",
    };
  }

  try {
    await db
      .update(recentProjects)
      .set({
        description: formValue.description,
        imageUrl: formValue.thumbNail,
        liveLink: formValue.liveLink,
        projectLink: formValue.projectLink,
        title: formValue.title,
        tools: formValue.tools,
      })
      .where(eq(recentProjects.id, projectId));

    return {
      status: true,
      message: "Project updated successfully",
    };
  } catch (error) {
    console.error("Error updating project:", error);
    return {
      status: false,
      message: "Error occurred while updating the project",
    };
  }
}

// ==========================================
// 🗑️ DELETE ACTION
// ==========================================
export async function DeleteProject(projectId: string) {
  if (!projectId) {
    return {
      status: false,
      message: "No project id found",
    };
  }

  try {
    await db.delete(recentProjects).where(eq(recentProjects.id, projectId));

    return {
      status: true,
      message: "Project deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting project:", error);
    return {
      status: false,
      message: "Error occurred while deleting the project",
    };
  }
}