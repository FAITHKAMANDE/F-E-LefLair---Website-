"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { zonedNow, type ZonedNow } from "@/lib/booking";

/** "Now" in the business time zone, refreshed every 30s so slots grey out live. */
export function useZonedNow(): ZonedNow {
  const [now, setNow] = useState<ZonedNow>(() => zonedNow());
  useEffect(() => {
    const id = window.setInterval(() => setNow(zonedNow()), 30_000);
    return () => window.clearInterval(id);
  }, []);
  return now;
}

/**
 * GETs `url` (JSON) whenever it changes; `reload()` refetches.
 * Also refetches when the tab regains focus, so the view stays current.
 */
export function useJson<T>(url: string | null) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [tick, setTick] = useState(0);
  const latest = useRef(0);

  const reload = useCallback(() => setTick((t) => t + 1), []);

  useEffect(() => {
    if (!url) return;
    const id = ++latest.current;
    const ctrl = new AbortController();
    setLoading(true);
    fetch(url, { signal: ctrl.signal, cache: "no-store" })
      .then(async (res) => {
        const body = await res.json().catch(() => ({}));
        if (!res.ok) throw Object.assign(new Error(body.error || "Request failed"), { status: res.status });
        return body as T;
      })
      .then((body) => {
        if (id !== latest.current) return;
        setData(body);
        setError(null);
      })
      .catch((err: Error) => {
        if (ctrl.signal.aborted || id !== latest.current) return;
        setError(err.message || "Couldn’t load availability.");
      })
      .finally(() => {
        if (id === latest.current) setLoading(false);
      });
    return () => ctrl.abort();
  }, [url, tick]);

  useEffect(() => {
    const onFocus = () => reload();
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [reload]);

  return { data, error, loading, reload };
}

/** POST/DELETE JSON helper that surfaces the API's error message. */
export async function sendJson<T = unknown>(
  url: string,
  method: "POST" | "DELETE",
  body?: unknown,
): Promise<{ ok: true; data: T } | { ok: false; status: number; error: string }> {
  try {
    const res = await fetch(url, {
      method,
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) return { ok: false, status: res.status, error: data.error || "Request failed." };
    return { ok: true, data: data as T };
  } catch {
    return { ok: false, status: 0, error: "Network error — check your connection and try again." };
  }
}
