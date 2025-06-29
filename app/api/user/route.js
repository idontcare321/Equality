import { cookies } from "next/headers"

export async function GET() {
  const cookieStore = cookies()
  const authToken = cookieStore.get("scrp-auth")

  if (!authToken) {
    return new Response(JSON.stringify({ authenticated: false }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    })
  }

  try {
    // Decode the auth token
    const userData = JSON.parse(Buffer.from(authToken.value, "base64").toString())

    return new Response(
      JSON.stringify({
        authenticated: true,
        user: {
          id: userData.userId,
          username: userData.username,
          discriminator: userData.discriminator,
          avatar: userData.avatar,
          loginTime: userData.loginTime,
        },
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    )
  } catch (error) {
    return new Response(JSON.stringify({ authenticated: false }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    })
  }
}
