export async function POST() {
  const response = new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  })

  // Clear the authentication cookie
  response.headers.set("Set-Cookie", "scrp-auth=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0")

  return response
}
