export async function POST() {
  try {
    const response = Response.json({ success: true })

    // Clear the authentication cookie
    response.headers.set("Set-Cookie", "scrp-auth=; HttpOnly; Secure; SameSite=Strict; Max-Age=0; Path=/")

    return response
  } catch (error) {
    console.error("Logout error:", error)
    return Response.json({ error: "Logout failed" }, { status: 500 })
  }
}
