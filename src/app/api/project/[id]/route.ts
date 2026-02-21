import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { recentProjects } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// ==========================================
// ✏️ UPDATE (PUT)
// ==========================================
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // In Next.js 15+, params is a Promise and must be awaited
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: "Project ID is required" },
        { status: 400 }
      );
    }

    const body = await req.json();

    // Map the incoming payload to your Drizzle schema
    await db
      .update(recentProjects)
      .set({
        title: body.title,
        description: body.description,
        tools: body.tools,
        liveLink: body.liveLink,
        projectLink: body.projectLink,
        imageUrl: body.thumbNail, // Matching your schema's column name
      })
      .where(eq(recentProjects.id, id));

    return NextResponse.json(
      { message: "Project updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json(
      { message: "Error updating project" },
      { status: 500 }
    );
  }
}

// ==========================================
// 🗑️ DELETE (DELETE)
// ==========================================
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: "Project ID is required" },
        { status: 400 }
      );
    }

    // Delete the row that matches the ID
    await db.delete(recentProjects).where(eq(recentProjects.id, id));

    return NextResponse.json(
      { message: "Project deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json(
      { message: "Error deleting project" },
      { status: 500 }
    );
  }
}