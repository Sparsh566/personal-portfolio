import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// In-memory rate limiting cache to prevent email flooding (IP + event -> timestamp)
const recentAlerts = new Map<string, number>();
const PAGEVIEW_COOLDOWN_MS = 15 * 60 * 1000; // 15 minutes cooldown per visitor IP for general pageviews

// Clean up old cache entries periodically
function cleanupCache() {
  const now = Date.now();
  for (const [key, timestamp] of recentAlerts.entries()) {
    if (now - timestamp > PAGEVIEW_COOLDOWN_MS) {
      recentAlerts.delete(key);
    }
  }
}

// User-Agent parser for cleaner reports
function parseUserAgent(ua: string) {
  let browser = "Unknown Browser";
  let os = "Unknown OS";
  let device = "Desktop";

  if (/iPhone|iPad|iPod/i.test(ua)) {
    device = /iPad/i.test(ua) ? "Tablet (iPad)" : "Mobile (iPhone)";
    os = "iOS";
  } else if (/Android/i.test(ua)) {
    device = "Mobile (Android)";
    os = "Android";
  } else if (/Windows NT 10/i.test(ua)) {
    os = "Windows 10/11";
  } else if (/Macintosh|Mac OS X/i.test(ua)) {
    os = "macOS";
  } else if (/Linux/i.test(ua)) {
    os = "Linux";
  }

  if (/Edg\//i.test(ua)) {
    browser = "Microsoft Edge";
  } else if (/Chrome\//i.test(ua) && !/Edg\//i.test(ua)) {
    browser = "Google Chrome";
  } else if (/Safari\//i.test(ua) && !/Chrome\//i.test(ua)) {
    browser = "Apple Safari";
  } else if (/Firefox\//i.test(ua)) {
    browser = "Mozilla Firefox";
  }

  return { browser, os, device };
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const eventType: string = body.event || "page_view";
    const detail: string = body.detail || "";
    const clientReferrer: string = body.referrer || "";
    const clientScreen: string = body.screen || "Unknown";
    const clientLanguage: string = body.language || "Unknown";
    const clientTimezone: string = body.timezone || "Unknown";
    const pageUrl: string = body.url || "";
    const utmSource: string = body.utm_source || "";
    const utmCampaign: string = body.utm_campaign || "";

    // Extract headers
    const forwardedFor = request.headers.get("x-forwarded-for");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : "Unknown IP";
    const userAgent = request.headers.get("user-agent") || "Unknown Browser";
    const rawReferer = request.headers.get("referer") || clientReferrer || "Direct";

    // Geolocation from Vercel Edge headers
    let city = request.headers.get("x-vercel-ip-city");
    let country = request.headers.get("x-vercel-ip-country");
    let region = request.headers.get("x-vercel-ip-country-region");
    let isp = "";
    let org = "";

    if (city) {
      try {
        city = decodeURIComponent(city);
      } catch {
        // keep raw
      }
    }

    // IP intelligence lookup for ISP & Org or fallback location
    const isPublicIp =
      clientIp &&
      clientIp !== "Unknown IP" &&
      !clientIp.startsWith("127.") &&
      clientIp !== "::1" &&
      !clientIp.startsWith("192.168.") &&
      !clientIp.startsWith("10.");

    if (isPublicIp) {
      try {
        const geoRes = await fetch(
          `http://ip-api.com/json/${clientIp}?fields=status,country,regionName,city,isp,org,as,query`,
          { signal: AbortSignal.timeout(2500) }
        );
        if (geoRes.ok) {
          const geoData = await geoRes.json();
          if (geoData?.status === "success") {
            if (!city) city = geoData.city || "";
            if (!country) country = geoData.country || "";
            if (!region) region = geoData.regionName || "";
            isp = geoData.isp || "";
            org = geoData.org || "";
          }
        }
      } catch {
        // non-blocking fallback
      }
    }

    const locationString =
      city && country
        ? `${city}, ${region ? `${region}, ` : ""}${country}`
        : country || city || "Unknown Location";

    // Categorize referrer source & UTM
    let sourceCategory = "Direct / Direct Portfolio Link";
    const lowerReferer = rawReferer.toLowerCase();
    if (utmSource) {
      sourceCategory = `Campaign: ${utmSource}${utmCampaign ? ` (${utmCampaign})` : ""}`;
    } else if (lowerReferer.includes("linkedin.com") || lowerReferer.includes("lnkd.in")) {
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
      sourceCategory = `External Website (${rawReferer})`;
    }

    const clientDevice = parseUserAgent(userAgent);

    // Cooldown check
    cleanupCache();
    const alertKey = `${clientIp}_${eventType}`;
    const lastAlertTime = recentAlerts.get(alertKey);
    const now = Date.now();

    // Debounce page views from same visitor for 15 mins, but ALWAYS alert on resume view & contact interactions
    if (lastAlertTime && now - lastAlertTime < PAGEVIEW_COOLDOWN_MS && eventType === "page_view") {
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
        const isCert = eventType === "cert_view";

        let subjectBadge = "[TELEMETRY]";
        let subject = `New Portfolio Visitor from ${locationString}`;
        let themeColor = "#e10600";
        let actionHeading = "New Portfolio Visit Detected";

        if (isResume) {
          subjectBadge = "[RESUME ALERT]";
          subject = `🔥 Someone from ${locationString} is viewing your Resume!`;
          themeColor = "#10b981";
          actionHeading = "Resume Document Opened & Viewed";
        } else if (isCert) {
          subjectBadge = "[CREDENTIAL AUDIT]";
          subject = `📜 Visitor from ${locationString} checked: ${detail || "Certificate"}`;
          themeColor = "#3b82f6";
          actionHeading = `Certificate Inspected: ${detail}`;
        } else {
          subject = `🏎️ Visitor from ${locationString} (${org || isp || sourceCategory})`;
        }

        const fullSubject = `${subjectBadge} ${subject}`;

        const timestampStr = new Date().toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
          dateStyle: "full",
          timeStyle: "medium",
        });

        const mapsQuery = encodeURIComponent(locationString !== "Unknown Location" ? locationString : clientIp);
        const mapsLink = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

        await transporter.sendMail({
          from: `"Pit-Wall Telemetry" <${gmailUser}>`,
          to: gmailUser,
          subject: fullSubject,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 620px; margin: 0 auto; padding: 24px; border: 1px solid #232730; border-radius: 8px; background-color: #0b0c0e; color: #f3f4f6;">
              <div style="border-bottom: 2px solid ${themeColor}; padding-bottom: 12px; margin-bottom: 20px;">
                <span style="background-color: ${themeColor}22; color: ${themeColor}; font-size: 11px; font-weight: bold; font-family: monospace; padding: 4px 8px; text-transform: uppercase; border-radius: 2px; border: 1px solid ${themeColor}55;">
                  ${eventType.toUpperCase()} EVENT
                </span>
                <h2 style="color: #f3f4f6; margin: 12px 0 0 0; font-size: 20px; font-weight: 800; letter-spacing: -0.02em;">
                  ${actionHeading}
                </h2>
                <p style="color: #8f94a0; margin: 4px 0 0 0; font-size: 12px; font-family: monospace;">
                  ${timestampStr} (IST)
                </p>
              </div>

              <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 20px; font-family: monospace;">
                <tr style="border-bottom: 1px solid #1a1d24;">
                  <td style="padding: 10px 0; color: #8f94a0; width: 140px; text-transform: uppercase;">Location:</td>
                  <td style="padding: 10px 0; font-weight: bold; color: #10b981; font-size: 15px;">
                    <a href="${mapsLink}" target="_blank" style="color: #10b981; text-decoration: none;">📍 ${locationString} ↗</a>
                  </td>
                </tr>
                ${
                  org || isp
                    ? `<tr style="border-bottom: 1px solid #1a1d24;">
                        <td style="padding: 10px 0; color: #8f94a0; text-transform: uppercase;">Network / Org:</td>
                        <td style="padding: 10px 0; color: #f3f4f6; font-weight: bold;">🏢 ${org || isp}</td>
                      </tr>`
                    : ""
                }
                <tr style="border-bottom: 1px solid #1a1d24;">
                  <td style="padding: 10px 0; color: #8f94a0; text-transform: uppercase;">Traffic Source:</td>
                  <td style="padding: 10px 0; color: #f3f4f6; font-weight: bold;">${sourceCategory}</td>
                </tr>
                <tr style="border-bottom: 1px solid #1a1d24;">
                  <td style="padding: 10px 0; color: #8f94a0; text-transform: uppercase;">Device & OS:</td>
                  <td style="padding: 10px 0; color: #f3f4f6;">${clientDevice.device} • ${clientDevice.os} • ${clientDevice.browser}</td>
                </tr>
                <tr style="border-bottom: 1px solid #1a1d24;">
                  <td style="padding: 10px 0; color: #8f94a0; text-transform: uppercase;">Screen & Zone:</td>
                  <td style="padding: 10px 0; color: #8f94a0;">${clientScreen} • ${clientTimezone} (${clientLanguage})</td>
                </tr>
                ${
                  pageUrl
                    ? `<tr style="border-bottom: 1px solid #1a1d24;">
                        <td style="padding: 10px 0; color: #8f94a0; text-transform: uppercase;">Page Path:</td>
                        <td style="padding: 10px 0; color: #8f94a0; word-break: break-all;">${pageUrl}</td>
                      </tr>`
                    : ""
                }
                <tr style="border-bottom: 1px solid #1a1d24;">
                  <td style="padding: 10px 0; color: #8f94a0; text-transform: uppercase;">Referrer URL:</td>
                  <td style="padding: 10px 0; color: #8f94a0; word-break: break-all;">${rawReferer}</td>
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
        org: org || isp,
      },
    });
  } catch (error) {
    console.error("Telemetry error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

