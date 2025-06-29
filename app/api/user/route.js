import { cookies } from "next/headers"

export async function GET() {
  try {
    const cookieStore = await cookies()
    const authToken = cookieStore.get("scrp-auth")

    console.log("User API - Auth token present:", !!authToken)
    console.log(
      "User API - All cookies:",
      cookieStore.getAll().map((c) => c.name),
    )

    if (!authToken) {
      console.log("User API - No auth token found")
      return Response.json({ authenticated: false })
    }

    // Decode the auth token
    const userData = JSON.parse(Buffer.from(authToken.value, "base64").toString())

    console.log("User API - Decoded user:", {
      username: userData.username,
      userId: userData.userId,
      loginTime: userData.loginTime ? new Date(userData.loginTime).toISOString() : "unknown",
    })

    return Response.json({
      authenticated: true,
      user: {
        id: userData.userId,
        username: userData.username,
        discriminator: userData.discriminator,
        avatar: userData.avatar,
        loginTime: userData.loginTime,
      },
    })
  } catch (error) {
    console.error("User API error:", error)
    return Response.json({ authenticated: false, error: error.message })
  }
}
