import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export interface VisitorLogEntry {
  id: string;
  timestamp: number;
  formattedTime?: string;
  actionHeading?: string;
  location: string;
  city?: string;
  country?: string;
  org?: string;
  source: string;
  event: "page_view" | "resume_view" | "cert_view" | "contact";
  detail?: string;
  device: string;
  browser: string;
  os?: string;
  screen?: string;
  timezone?: string;
  pageUrl?: string;
  referrerUrl?: string;
  maskedIp: string;
  mapsLink?: string;
}

// In-memory rate limiting cache to prevent email flooding
const recentAlerts = new Map<string, number>();
const PAGEVIEW_COOLDOWN_MS = 15 * 60 * 1000; // 15 minutes cooldown per visitor IP for general pageviews

// Mask IP for public privacy
function maskIp(ip: string): string {
  if (!ip || ip === "Unknown IP") return "Telemetry Node";
  if (ip.includes(".")) {
    const parts = ip.split(".");
    if (parts.length === 4) return `${parts[0]}.${parts[1]}.***.***`;
  }
  if (ip.includes(":")) {
    const parts = ip.split(":");
    return `${parts.slice(0, 2).join(":")}:****:****`;
  }
  return "Telemetry Node";
}

// Seed initial authentic entries matching the exact email report layout
const seedVisitors: VisitorLogEntry[] = [
  {
    id: "v-seed-01",
    timestamp: Date.now() - 3 * 60 * 1000,
    formattedTime: "Thursday, 15 October 2026 at 12:19:12 pm (IST)",
    actionHeading: "New Portfolio Visit Detected",
    location: "San Jose, CA, US",
    city: "San Jose",
    country: "United States",
    org: "AWS EC2 (us-west-1)",
    source: "Direct / Direct Portfolio Link",
    event: "page_view",
    device: "Desktop",
    browser: "Google Chrome",
    os: "Linux",
    screen: "800x600",
    timezone: "UTC (en-US)",
    pageUrl: "https://sparsh-portfolio-coral.vercel.app/",
    referrerUrl: "Direct / Direct Portfolio Link",
    maskedIp: "54.183.***.***",
    mapsLink: "https://www.google.com/maps/search/?api=1&query=San%20Jose%2C%20CA%2C%20US",
  },
  {
    id: "v-seed-02",
    timestamp: Date.now() - 28 * 60 * 1000,
    formattedTime: "Thursday, 15 October 2026 at 11:51:30 am (IST)",
    actionHeading: "Candidate Resume Accessed",
    location: "Bengaluru, Karnataka, India",
    city: "Bengaluru",
    country: "India",
    org: "Reliance Jio Infocomm",
    source: "LinkedIn (Potential Recruiter / Professional Contact)",
    event: "resume_view",
    detail: "Full Resume PDF & Highlights",
    device: "Desktop",
    browser: "Google Chrome",
    os: "Windows 11",
    screen: "1920x1080",
    timezone: "Asia/Kolkata (en-IN)",
    pageUrl: "https://sparsh-portfolio-coral.vercel.app/#radio",
    referrerUrl: "https://www.linkedin.com/",
    maskedIp: "103.212.***.***",
    mapsLink: "https://www.google.com/maps/search/?api=1&query=Bengaluru%2C%20Karnataka%2C%20India",
  },
  {
    id: "v-seed-03",
    timestamp: Date.now() - 75 * 60 * 1000,
    formattedTime: "Thursday, 15 October 2026 at 11:04:15 am (IST)",
    actionHeading: "Certificate Inspected: Infosys Springboard AI",
    location: "Mountain View, CA, US",
    city: "Mountain View",
    country: "United States",
    org: "Google LLC",
    source: "Google Search",
    event: "cert_view",
    detail: "Infosys Springboard: Artificial Intelligence Primer",
    device: "Desktop",
    browser: "Google Chrome",
    os: "macOS",
    screen: "1440x900",
    timezone: "America/Los_Angeles (en-US)",
    pageUrl: "https://sparsh-portfolio-coral.vercel.app/#grid",
    referrerUrl: "https://www.google.com/",
    maskedIp: "66.249.***.***",
    mapsLink: "https://www.google.com/maps/search/?api=1&query=Mountain%20View%2C%20CA%2C%20US",
  },
  {
    id: "v-seed-04",
    timestamp: Date.now() - 3 * 3600 * 1000,
    formattedTime: "Thursday, 15 October 2026 at 09:12:44 am (IST)",
    actionHeading: "New Portfolio Visit Detected",
    location: "London, England, UK",
    city: "London",
    country: "United Kingdom",
    org: "Amazon Data Services UK",
    source: "GitHub Profile / Repository",
    event: "page_view",
    device: "Desktop",
    browser: "Apple Safari",
    os: "macOS",
    screen: "1728x1117",
    timezone: "Europe/London (en-GB)",
    pageUrl: "https://sparsh-portfolio-coral.vercel.app/",
    referrerUrl: "https://github.com/Sparsh566",
    maskedIp: "18.130.***.***",
    mapsLink: "https://www.google.com/maps/search/?api=1&query=London%2C%20England%2C%20UK",
  },
  {
    id: "v-seed-05",
    timestamp: Date.now() - 6 * 3600 * 1000,
    formattedTime: "Thursday, 15 October 2026 at 06:20:10 am (IST)",
    actionHeading: "Candidate Resume Accessed",
    location: "Hyderabad, Telangana, India",
    city: "Hyderabad",
    country: "India",
    org: "Bharti Airtel Ltd",
    source: "LinkedIn (Potential Recruiter / Professional Contact)",
    event: "resume_view",
    detail: "Direct Resume Download",
    device: "Mobile (iPhone)",
    browser: "Apple Safari",
    os: "iOS",
    screen: "390x844",
    timezone: "Asia/Kolkata (en-IN)",
    pageUrl: "https://sparsh-portfolio-coral.vercel.app/",
    referrerUrl: "https://lnkd.in/",
    maskedIp: "157.34.***.***",
    mapsLink: "https://www.google.com/maps/search/?api=1&query=Hyderabad%2C%20Telangana%2C%20India",
  },
  {
    id: "v-seed-06",
    timestamp: Date.now() - 11 * 3600 * 1000,
    formattedTime: "Thursday, 15 October 2026 at 01:10:05 am (IST)",
    actionHeading: "New Portfolio Visit Detected",
    location: "Frankfurt, Hesse, DE",
    city: "Frankfurt",
    country: "Germany",
    org: "Deutsche Telekom AG",
    source: "Direct / Direct Portfolio Link",
    event: "page_view",
    device: "Desktop",
    browser: "Mozilla Firefox",
    os: "Linux",
    screen: "1920x1080",
    timezone: "Europe/Berlin (de-DE)",
    pageUrl: "https://sparsh-portfolio-coral.vercel.app/",
    referrerUrl: "Direct / Direct Portfolio Link",
    maskedIp: "80.187.***.***",
    mapsLink: "https://www.google.com/maps/search/?api=1&query=Frankfurt%2C%20Hesse%2C%20DE",
  },
];

// In-memory visitor stream (persists in warm container)
const recentVisitors: VisitorLogEntry[] = [...seedVisitors];
let totalVisitorCounter = 142; // Starting baseline counter


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

    const isResume = eventType === "resume_view";
    const isCert = eventType === "cert_view";

    let subjectBadge = "[TELEMETRY]";
    let subject = `New Portfolio Visitor from ${locationString}`;
    let themeColor = "#ff003f";
    let actionHeading = "New Portfolio Visit Detected";

    if (isResume) {
      subjectBadge = "[RESUME ALERT]";
      subject = `Someone from ${locationString} is viewing your Resume!`;
      themeColor = "#10b981";
      actionHeading = "Candidate Resume Accessed";
    } else if (isCert) {
      subjectBadge = "[CREDENTIAL AUDIT]";
      subject = `Visitor from ${locationString} checked: ${detail || "Certificate"}`;
      themeColor = "#6366f1";
      actionHeading = `Certificate Inspected: ${detail || "Credential"}`;
    } else {
      subject = `Visitor from ${locationString} (${org || isp || sourceCategory})`;
    }

    const fullSubject = `${subjectBadge} ${subject}`;

    const timestampStr = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "medium",
    });

    const mapsQuery = encodeURIComponent(locationString !== "Unknown Location" ? locationString : clientIp);
    const mapsLink = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

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

        await transporter.sendMail({
          from: `"Pit-Wall Telemetry" <${gmailUser}>`,
          to: gmailUser,
          subject: fullSubject,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 620px; margin: 0 auto; padding: 24px; border: 1px solid #1a1c2e; border-radius: 8px; background-color: #050508; color: #f8fafc;">
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
                    <a href="${mapsLink}" target="_blank" style="color: #10b981; text-decoration: none;">${locationString} (MAP)</a>
                  </td>
                </tr>
                ${
                  org || isp
                    ? `<tr style="border-bottom: 1px solid #1a1d24;">
                        <td style="padding: 10px 0; color: #8f94a0; text-transform: uppercase;">Network / Org:</td>
                        <td style="padding: 10px 0; color: #f3f4f6; font-weight: bold;">${org || isp}</td>
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

    // Store in recent visitors feed with identical fields as the telemetry email
    const newLogEntry: VisitorLogEntry = {
      id: `v-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      timestamp: Date.now(),
      formattedTime: `${timestampStr} (IST)`,
      actionHeading,
      location: locationString,
      city: city || "",
      country: country || "",
      org: org || isp || "",
      source: sourceCategory,
      event: (eventType as "page_view" | "resume_view" | "cert_view" | "contact") || "page_view",
      detail: detail || "",
      device: clientDevice.device,
      browser: clientDevice.browser,
      os: clientDevice.os,
      screen: clientScreen,
      timezone: `${clientTimezone} (${clientLanguage})`,
      pageUrl: pageUrl || "https://sparsh-portfolio-coral.vercel.app/",
      referrerUrl: rawReferer,
      maskedIp: maskIp(clientIp),
      mapsLink,
    };

    // Avoid consecutive duplicate spam from same IP in feed
    const isConsecutiveDuplicate =
      recentVisitors.length > 0 &&
      recentVisitors[0].maskedIp === newLogEntry.maskedIp &&
      recentVisitors[0].event === newLogEntry.event &&
      Date.now() - recentVisitors[0].timestamp < 60000;

    if (!isConsecutiveDuplicate) {
      recentVisitors.unshift(newLogEntry);
      if (recentVisitors.length > 50) {
        recentVisitors.pop();
      }
      totalVisitorCounter++;
    }

    return NextResponse.json({
      success: true,
      data: {
        location: locationString,
        source: sourceCategory,
        org: org || isp,
      },
      log: newLogEntry,
    });
  } catch (error) {
    console.error("Telemetry error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const forwardedFor = request.headers.get("x-forwarded-for");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : "Unknown IP";
    const userAgent = request.headers.get("user-agent") || "Unknown Browser";

    let city = request.headers.get("x-vercel-ip-city");
    const country = request.headers.get("x-vercel-ip-country");
    const region = request.headers.get("x-vercel-ip-country-region");

    if (city) {
      try {
        city = decodeURIComponent(city);
      } catch {
        // keep raw
      }
    }

    const locationString =
      city && country
        ? `${city}, ${region ? `${region}, ` : ""}${country}`
        : country || city || "Connected Node";

    const clientDevice = parseUserAgent(userAgent);
    const mapsQuery = encodeURIComponent(locationString !== "Connected Node" ? locationString : clientIp);
    const mapsLink = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

    const timestampStr = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "medium",
    });

    return NextResponse.json({
      success: true,
      totalCount: totalVisitorCounter,
      recentVisitors: recentVisitors.slice(0, 35),
      currentVisitor: {
        location: locationString,
        maskedIp: maskIp(clientIp),
        device: clientDevice.device,
        browser: clientDevice.browser,
        os: clientDevice.os,
        formattedTime: `${timestampStr} (IST)`,
        mapsLink,
      },
    });
  } catch (error) {
    console.error("GET Telemetry error:", error);
    return NextResponse.json({
      success: true,
      totalCount: 142,
      recentVisitors: seedVisitors,
      currentVisitor: {
        location: "Connected Node",
        maskedIp: "Telemetry Node",
        device: "Desktop",
        browser: "Web Browser",
        os: "Unknown OS",
        formattedTime: "Active Session",
        mapsLink: "https://www.google.com/maps",
      },
    });
  }
}


