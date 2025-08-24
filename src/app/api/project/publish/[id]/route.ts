import { Publish } from "@/app/actions/projects";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const res = await Publish(id);

  return NextResponse.json(res.message);
}
