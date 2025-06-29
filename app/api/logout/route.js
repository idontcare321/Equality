import { cookies } from "next/headers"

export async function POST() {
  try {
    const cookieStore = cookies()

    // Clear the authentication cookie
    cookieStore.delete("scrp-auth")

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    })
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
