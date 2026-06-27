import { useCallback, useRef } from "react";

export function useRateLimit(key, limit = 10, windowMs = 5 * 60 * 1000) {
  const timestampsRef = useRef([]);

  const enforce = useCallback(() => {
    const now = Date.now();
    const recent = timestampsRef.current.filter(
      (t) => now - t < windowMs
    );
    timestampsRef.current = recent;

    if (recent.length >= limit) {
      return {
        allowed: false,
        remaining: 0,
        retryAfter: Math.ceil((recent[0] + windowMs - now) / 1000),
      };
    }

    timestampsRef.current.push(now);
    return {
      allowed: true,
      remaining: limit - recent.length - 1,
    };
  }, [limit, windowMs]);

  const reset = useCallback(() => {
    timestampsRef.current = [];
  }, []);

  return { enforce, reset };
}

export function useSubmissionCooldown(key, cooldownMs = 5000) {
  const lastSubmissionRef = useRef(0);

  const canSubmit = useCallback(() => {
    const now = Date.now();
    if (now - lastSubmissionRef.current < cooldownMs) {
      return false;
    }
    lastSubmissionRef.current = now;
    return true;
  }, [cooldownMs]);

  return { canSubmit };
}
