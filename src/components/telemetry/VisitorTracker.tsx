"use client";

import { useEffect } from "react";

export function trackEvent(eventName: "page_view" | "resume_view") {
  if (typeof window === "undefined") return;

  try {
    const payload = {
      event: eventName,
      referrer: document.referrer || "Direct",
      screen: `${window.screen.width}x${window.screen.height}`,
      language: navigator.language || "en",
      path: window.location.pathname,
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
