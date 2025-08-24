import { GetAdminProjects } from "@/app/actions/projects";
import { NextResponse } from "next/server";

export async function GET() {
  const res = await GetAdminProjects();
  return NextResponse.json(res, { status: 200 });
}
