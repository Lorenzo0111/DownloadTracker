import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/middleware";

export async function middleware(request: NextRequest) {
  const { supabase, response } = createClient(request);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (
    request.nextUrl.pathname.startsWith("/auth/login") ||
    request.nextUrl.pathname.startsWith("/unauthorized") ||
    request.nextUrl.pathname.startsWith("/auth/callback")
  )
    return response;

  if (!user) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  const { data: admin } = await supabase
    .from("admins")
    .select("id")
    .eq("id", user.id)
    .single();

  if (!admin) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|download|_next/static|_next/image|favicon.ico).*)"],
};
