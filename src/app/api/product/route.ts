import { AddToDatabase, GetAllProjects } from "@/app/actions/projects";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();

  const { message } = await AddToDatabase({ ...data });

  return NextResponse.json({ message }, { status: 200 });
}

export async function GET(request: NextRequest) {
  const res = await GetAllProjects();
  return NextResponse.json(res, { status: 200 });
}
