"use client";

import { useEffect } from "react";

export function trackEvent(
  eventName: "page_view" | "resume_view" | "cert_view" | "social_click",
  detail?: string
) {
  if (typeof window === "undefined") return;

  try {
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get("utm_source") || "";
    const utmCampaign = urlParams.get("utm_campaign") || "";

    const payload = {
      event: eventName,
      detail: detail || "",
      referrer: document.referrer || "Direct",
      screen: `${window.screen.width}x${window.screen.height}`,
      language: navigator.language || "en",
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "Unknown",
      path: window.location.pathname,
      url: window.location.href,
      utm_source: utmSource,
      utm_campaign: utmCampaign,
    };

    fetch("/api/telemetry/visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {
      // silent background failure
    });
  } catch {
    // silent
  }
}

export function VisitorTracker() {
  useEffect(() => {
    // Avoid double logging on hot reload / same tab navigation session
    const hasLogged = sessionStorage.getItem("portfolio_telemetry_logged");
    if (!hasLogged) {
      trackEvent("page_view");
      sessionStorage.setItem("portfolio_telemetry_logged", "true");
    }
  }, []);

  return null;
}

