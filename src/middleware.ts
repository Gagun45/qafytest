import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const intlMiddleware = createMiddleware(routing);

const stripLocales = (pathname: string) => {
  const locales = ["en", "de", "ukr"];
  const parts = pathname.split("/");
  if (locales.includes(parts[1])) {
    return "/" + parts.slice(2).join("/");
  }
  return pathname;
};

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
    cookieName: '__Secure-authjs.session-token'
  });

  console.log("middleware token: ", token);

  const pathname = stripLocales(request.nextUrl.pathname);

  const isAuthPage =
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/reset-password") ||
    pathname.startsWith("/forgot-password");

  const isProfilePage = pathname.startsWith("/profile");

  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isProfilePage && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
