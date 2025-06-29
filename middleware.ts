import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Check if user is authenticated
  const authToken = request.cookies.get("scrp-auth")
  const isLoginPage = request.nextUrl.pathname === "/login"
  const isApiRoute = request.nextUrl.pathname.startsWith("/api")

  // Allow API routes to pass through
  if (isApiRoute) {
    return NextResponse.next()
  }

  // If not authenticated and not on login page, redirect to login
  if (!authToken && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // If authenticated and on login page, redirect to home
  if (authToken && isLoginPage) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
