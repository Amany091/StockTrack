import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("access_token")?.value;
    const pathname = req.nextUrl.pathname;

    const isProtectedPage = pathname !== "/auth/login" && pathname !== "/auth/signup";
    const isAuthPage = pathname.startsWith("/auth/login") || pathname.startsWith("/auth/signup");

    // Redirect unauthenticated users away from protected pages
    if (!token && isProtectedPage) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    // Redirect authenticated users away from login/signup
    if (token && isAuthPage) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"], // Excludes Next.js assets & API routes
};
