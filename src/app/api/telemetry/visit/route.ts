import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// In-memory rate limiting cache to prevent email flooding (IP + event -> timestamp)
const recentAlerts = new Map<string, number>();
const COOLDOWN_MS = 15 * 60 * 1000; // 15 minutes cooldown per visitor IP for general pageviews

// Clean up old cache entries periodically
function cleanupCache() {
  const now = Date.now();
  for (const [key, timestamp] of recentAlerts.entries()) {
    if (now - timestamp > COOLDOWN_MS) {
      recentAlerts.delete(key);
    }
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const eventType = body.event || "page_view"; // "page_view" | "resume_view"
    const clientReferrer = body.referrer || "";
    const clientScreen = body.screen || "Unknown";
    const clientLanguage = body.language || "Unknown";

    // Extract headers
    const forwardedFor = request.headers.get("x-forwarded-for");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : "Unknown IP";
    const userAgent = request.headers.get("user-agent") || "Unknown Browser";
    const rawReferer = request.headers.get("referer") || clientReferrer || "Direct";

    // Geolocation from Vercel Edge headers
    let city = request.headers.get("x-vercel-ip-city");
    let country = request.headers.get("x-vercel-ip-country");
    let region = request.headers.get("x-vercel-ip-country-region");

    if (city) {
      try {
        city = decodeURIComponent(city);
      } catch {
        // keep raw
      }
    }

    // Fallback geolocation lookup if running outside Vercel or headers missing (for public non-local IPs)
    if (!city && !country && clientIp && clientIp !== "Unknown IP" && !clientIp.startsWith("127.") && clientIp !== "::1" && !clientIp.startsWith("192.168.")) {
      try {
        const geoRes = await fetch(`http://ip-api.com/json/${clientIp}?fields=city,regionName,country,isp`, {
          signal: AbortSignal.timeout(2000),
        });
        if (geoRes.ok) {
          const geoData = await geoRes.json();
          if (geoData?.country) {
            city = geoData.city || "";
            country = geoData.country || "";
            region = geoData.regionName || "";
          }
        }
      } catch {
        // silent fallback
      }
    }

    const locationString = city && country ? `${city}, ${region ? `${region}, ` : ""}${country}` : country || city || "Unknown Location";

    // Categorize referrer source
    let sourceCategory = "Direct / Bookmark / Shared Link";
    const lowerReferer = rawReferer.toLowerCase();
    if (lowerReferer.includes("linkedin.com")) {
      sourceCategory = "LinkedIn (Potential Recruiter / Professional Contact)";
    } else if (lowerReferer.includes("github.com")) {
      sourceCategory = "GitHub Profile / Repository";
    } else if (lowerReferer.includes("google.com")) {
      sourceCategory = "Google Search";
    } else if (lowerReferer.includes("t.co") || lowerReferer.includes("twitter.com") || lowerReferer.includes("x.com")) {
      sourceCategory = "Twitter / X";
    } else if (lowerReferer.includes("instagram.com")) {
      sourceCategory = "Instagram";
    } else if (rawReferer && rawReferer !== "Direct" && !rawReferer.includes("localhost") && !rawReferer.includes("sparsh-portfolio")) {
      sourceCategory = `External Link (${rawReferer})`;
    }

    // Cooldown check
    cleanupCache();
    const alertKey = `${clientIp}_${eventType}`;
    const lastAlertTime = recentAlerts.get(alertKey);
    const now = Date.now();

    // Skip duplicate notifications within 15 minutes unless it's a resume view
    if (lastAlertTime && now - lastAlertTime < COOLDOWN_MS && eventType !== "resume_view") {
      return NextResponse.json({ success: true, status: "debounced" });
    }

    recentAlerts.set(alertKey, now);

    // Send notification email via Gmail SMTP
    const gmailUser = process.env.GMAIL_USER || "1774.sparsh@gmail.com";
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

    if (gmailAppPassword) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: gmailUser,
            pass: gmailAppPassword,
          },
        });

        const isResume = eventType === "resume_view";
        const subject = isResume
          ? `[ALERT] 📄 Someone from ${locationString} is viewing your Resume!`
          : `[Telemetry] New Visitor from ${locationString} via ${sourceCategory}`;

        const timestampStr = new Date().toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
          dateStyle: "full",
          timeStyle: "medium",
        });

        await transporter.sendMail({
          from: `"Portfolio Telemetry" <${gmailUser}>`,
          to: gmailUser,
          subject,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 620px; margin: 0 auto; padding: 24px; border: 1px solid #232730; border-radius: 8px; background-color: #0b0c0e; color: #f3f4f6;">
              <div style="border-bottom: 2px solid ${isResume ? '#10b981' : '#e10600'}; padding-bottom: 12px; margin-bottom: 20px;">
                <span style="background-color: ${isResume ? 'rgba(16, 185, 129, 0.2)' : 'rgba(225, 6, 0, 0.2)'}; color: ${isResume ? '#10b981' : '#e10600'}; font-size: 11px; font-weight: bold; font-family: monospace; padding: 4px 8px; text-transform: uppercase;">
                  ${isResume ? 'RESUME DOCUMENT INTERACTION' : 'LIVE VISITOR TELEMETRY'}
                </span>
                <h2 style="color: #f3f4f6; margin: 10px 0 0 0; font-size: 20px; font-weight: 800;">
                  ${isResume ? 'Candidate Resume Accessed' : 'New Portfolio Visitor Detected'}
                </h2>
                <p style="color: #8f94a0; margin: 4px 0 0 0; font-size: 12px; font-family: monospace;">
                  ${timestampStr} (IST)
                </p>
              </div>

              <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 20px; font-family: monospace;">
                <tr style="border-bottom: 1px solid #1a1d24;">
                  <td style="padding: 10px 0; color: #8f94a0; width: 140px; text-transform: uppercase;">Location:</td>
                  <td style="padding: 10px 0; font-weight: bold; color: #10b981; font-size: 15px;">${locationString}</td>
                </tr>
                <tr style="border-bottom: 1px solid #1a1d24;">
                  <td style="padding: 10px 0; color: #8f94a0; text-transform: uppercase;">Traffic Source:</td>
                  <td style="padding: 10px 0; color: #f3f4f6; font-weight: bold;">${sourceCategory}</td>
                </tr>
                <tr style="border-bottom: 1px solid #1a1d24;">
                  <td style="padding: 10px 0; color: #8f94a0; text-transform: uppercase;">Referrer URL:</td>
                  <td style="padding: 10px 0; color: #8f94a0; word-break: break-all;">${rawReferer}</td>
                </tr>
                <tr style="border-bottom: 1px solid #1a1d24;">
                  <td style="padding: 10px 0; color: #8f94a0; text-transform: uppercase;">Screen & Lang:</td>
                  <td style="padding: 10px 0; color: #f3f4f6;">${clientScreen} // ${clientLanguage}</td>
                </tr>
                <tr style="border-bottom: 1px solid #1a1d24;">
                  <td style="padding: 10px 0; color: #8f94a0; text-transform: uppercase;">Device & Browser:</td>
                  <td style="padding: 10px 0; color: #8f94a0; font-size: 11px; word-break: break-all;">${userAgent}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #8f94a0; text-transform: uppercase;">Client IP:</td>
                  <td style="padding: 10px 0; color: #8f94a0;">${clientIp}</td>
                </tr>
              </table>

              <div style="padding-top: 16px; border-top: 1px solid #232730; font-size: 11px; color: #8f94a0; text-align: center; font-family: monospace;">
                Automated Pit-Wall Telemetry System // sparshgoswami.dev
              </div>
            </div>
          `,
        });
      } catch (err) {
        console.warn("Visitor telemetry notification warning:", err);
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        location: locationString,
        source: sourceCategory,
      },
    });
  } catch (error) {
    console.error("Telemetry error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
