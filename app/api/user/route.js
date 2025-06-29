import { cookies } from "next/headers"

export async function GET() {
  try {
    const cookieStore = await cookies()
    const authToken = cookieStore.get("scrp-auth")

    if (!authToken) {
      return Response.json({ authenticated: false })
    }

    // Decode the auth token
    const userData = JSON.parse(Buffer.from(authToken.value, "base64").toString())

    return Response.json({
      authenticated: true,
      user: userData,
    })
  } catch (error) {
    console.error("User API error:", error)
    return Response.json({ authenticated: false })
  }
}
