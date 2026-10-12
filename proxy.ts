import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@ieee/supabase/proxy";

export async function proxy(request: NextRequest) {
  const { response, user } = await updateSession(request);
  const { pathname } = request.nextUrl;
  const isLogin = pathname === "/login";

  if (pathname.startsWith("/api/auth") || (user ? !isLogin : isLogin)) {
    return response;
  }
  if (pathname.startsWith("/api")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = request.nextUrl.clone();
  url.pathname = user ? "/" : "/login";
  url.search = "";
  const redirect = NextResponse.redirect(url);
  for (const cookie of response.cookies.getAll()) {
    redirect.cookies.set(cookie);
  }
  return redirect;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|apple-icon.png|logos/).*)",
  ],
};
