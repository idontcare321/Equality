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

  // Debug logging (remove in production)
  console.log("Middleware check:", {
    path: request.nextUrl.pathname,
    hasAuthToken: !!authToken,
    isLoginPage,
    authTokenValue: authToken?.value ? "present" : "missing",
  })

  // If not authenticated and not on login page, redirect to login
  if (!authToken && !isLoginPage) {
    console.log("Redirecting to login - no auth token")
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // If authenticated and on login page, redirect to home
  if (authToken && isLoginPage) {
    console.log("Redirecting to home - already authenticated")
    return NextResponse.redirect(new URL("/", request.url))
  }

  // Verify the auth token is valid
  if (authToken && !isLoginPage) {
    try {
      const userData = JSON.parse(Buffer.from(authToken.value, "base64").toString())
      if (!userData.userId || !userData.username) {
        console.log("Invalid auth token, clearing and redirecting to login")
        const response = NextResponse.redirect(new URL("/login", request.url))
        response.cookies.delete("scrp-auth")
        return response
      }
    } catch (error) {
      console.log("Corrupted auth token, clearing and redirecting to login")
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
