import { GetAdminProjects } from "@/app/actions/projects";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const res = await GetAdminProjects();
  return NextResponse.json(res, { status: 200 });
}
