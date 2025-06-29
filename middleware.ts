import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
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

  // Verify the auth token is valid (only if we have one)
  if (authToken && !isLoginPage) {
    try {
      const userData = JSON.parse(Buffer.from(authToken.value, "base64").toString())
      if (!userData.userId || !userData.username) {
        // Invalid token, clear it and redirect to login
        const response = NextResponse.redirect(new URL("/login", request.url))
        response.cookies.delete("scrp-auth")
        return response
      }
    } catch (error) {
      // Corrupted token, clear it and redirect to login
      const response = NextResponse.redirect(new URL("/login", request.url))
      response.cookies.delete("scrp-auth")
      return response
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
