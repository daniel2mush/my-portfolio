"use server";

import { db } from "@/lib/db";
import { recentProjects } from "@/lib/db/schema";
import { uploadTypes } from "@/lib/types";
import { eq } from "drizzle-orm";

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

export async function GetAllProjects() {
  try {
    const res = await db
      .select()
      .from(recentProjects)
      .where(eq(recentProjects.isPublished, true))
      .limit(2);
    return res;
  } catch (error) {
    console.log(error);
    return [];
  }
}
