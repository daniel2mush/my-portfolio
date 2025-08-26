"use server";

import { db } from "@/lib/db";
import { recentProjects } from "@/lib/db/schema";
import { uploadTypes } from "@/lib/types";
import { desc, eq } from "drizzle-orm";

export async function AddToDatabase(formValue: uploadTypes) {
  console.log(formValue);

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
      message: "Project successfuly uploaded",
    };
  } catch (error) {
    console.log(error);

    return {
      status: false,
      message: "Error occured while adding new products",
    };
  }
}

export async function GetAdminProjects() {
  try {
    const res = await db.select().from(recentProjects);
    return res;
  } catch (error) {
    console.log(error);
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
    console.log(error);

    return {
      status: false,
      message: "Error occured, please try again later",
    };
  }
}
