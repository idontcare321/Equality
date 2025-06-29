export async function POST() {
  try {
    const response = new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    })

    // Clear the authentication cookie
    response.headers.set(
      "Set-Cookie",
      "scrp-auth=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0; Domain=scrpsites.vercel.app",
    )

    return response
  } catch (error) {
    console.error("Logout error:", error)
    return new Response(JSON.stringify({ success: false, error: "Logout failed" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
}
