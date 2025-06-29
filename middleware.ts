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

  // Debug logging
  console.log("Middleware check:", {
    path: request.nextUrl.pathname,
    hasAuthToken: !!authToken,
    isLoginPage,
    cookieValue: authToken?.value ? authToken.value.substring(0, 20) + "..." : "none",
  })

  // If not authenticated and not on login page, redirect to login
  if (!authToken && !isLoginPage) {
    console.log("No auth token, redirecting to login")
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // If authenticated and on login page, redirect to home
  if (authToken && isLoginPage) {
    console.log("Already authenticated, redirecting to home")
    return NextResponse.redirect(new URL("/", request.url))
  }

  // Verify the auth token is valid (only if we have one and not on login page)
  if (authToken && !isLoginPage) {
    try {
      const userData = JSON.parse(Buffer.from(authToken.value, "base64").toString())
      console.log("Token validation:", {
        hasUserId: !!userData.userId,
        hasUsername: !!userData.username,
        username: userData.username,
      })

      if (!userData.userId || !userData.username) {
        console.log("Invalid token data, clearing cookie and redirecting to login")
        const response = NextResponse.redirect(new URL("/login", request.url))
        response.cookies.delete("scrp-auth")
        return response
      }

      console.log("Token valid, allowing access")
    } catch (error) {
      console.log("Token parsing error:", error.message)
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
