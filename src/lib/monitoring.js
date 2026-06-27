export function trackEvent(name, properties = {}) {
  if (import.meta.env.DEV) {
    console.log(`[Analytics] ${name}`, properties);
    return;
  }

  const payload = {
    event: name,
    properties,
    timestamp: new Date().toISOString(),
    url: window.location.href,
    referrer: document.referrer || "direct",
  };

  if (navigator.sendBeacon) {
    navigator.sendBeacon(
      "/api/analytics",
      JSON.stringify(payload)
    );
  } else {
    fetch("/api/analytics", {
      method: "POST",
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});
  }
}

export function trackError(error, context = {}) {
  const errorPayload = {
    message: error?.message,
    stack: error?.stack,
    name: error?.name,
    context,
    timestamp: new Date().toISOString(),
    url: window.location.href,
  };

  if (import.meta.env.DEV) {
    console.error("[Error Tracked]", errorPayload);
    return;
  }

  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/errors", JSON.stringify(errorPayload));
  } else {
    fetch("/api/errors", {
      method: "POST",
      body: JSON.stringify(errorPayload),
      keepalive: true,
    }).catch(() => {});
  }
}

export function trackModeration(action, table, reason) {
  trackEvent("moderation", { action, table, reason });
}

export function trackSubmission(table, success) {
  trackEvent("submission", { table, success });
}
