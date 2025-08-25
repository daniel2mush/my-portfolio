import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  //   const session = req.cookies.get("admin_session")?.value; // ✅ get value safely
  //   if (req.nextUrl.pathname.startsWith("/admin")) {
  //     if (!session) {
  //       return NextResponse.redirect(new URL("/auth", req.url));
  //     }
  //   }
  //   return NextResponse.next();
  // }
  // export const config = {
  //   matcher: ["/admin/:path*"], // ✅ only apply to /admin routes
}
