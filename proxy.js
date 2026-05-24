import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

function proxy(req) {
  const token = req.nextauth.token;
  const pathname = req.nextUrl.pathname;

  // Protect admin routes
  if (pathname.startsWith("/admin")) {
    if (!token || token.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // Protect authenticated routes
  if (pathname.startsWith("/profile")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export default withAuth(proxy, {
  callbacks: {
    authorized: ({ token }) => {
      return !!token;
    },
  },

  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: [
    "/profile/:path*",
    "/admin/:path*",
  ],
};