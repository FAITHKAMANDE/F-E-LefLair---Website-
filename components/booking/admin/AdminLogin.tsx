"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";
import { sendJson } from "../hooks";

export function AdminLogin({ configured }: { configured: boolean }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const res = await sendJson("/api/admin/login", "POST", { password });
    setBusy(false);
    if (res.ok) router.refresh();
    else setError(res.error);
  };

  return (
    <div className="mx-auto max-w-sm rounded-3xl border border-ink/[0.07] bg-white p-8 shadow-card">
      <span className="grid h-11 w-11 place-items-center rounded-xl bg-burgundy-50 text-burgundy">
        <Lock className="h-5 w-5" aria-hidden />
      </span>
      <h2 className="mt-4 font-display text-xl font-semibold text-ink">Admin sign in</h2>
      {!configured ? (
        <p className="mt-2 text-sm text-ink-muted">
          Admin access isn’t set up yet. Add <code>ADMIN_PASSWORD</code> and{" "}
          <code>ADMIN_SESSION_SECRET</code> to your environment (see{" "}
          <code>.env.example</code>) and restart the server.
        </p>
      ) : (
        <form onSubmit={submit} className="mt-5 space-y-4">
          <div>
            <label htmlFor="admin-password" className="mb-1.5 block text-sm font-semibold text-ink">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-ink/[0.12] bg-white px-3.5 py-2.5 text-sm text-ink focus:border-burgundy focus:outline-none focus:ring-2 focus:ring-burgundy/20"
            />
          </div>
          {error && (
            <p role="alert" className="text-sm font-medium text-burgundy">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={busy || !password}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-burgundy px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-burgundy-700 disabled:opacity-50"
          >
            {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
            Sign in
          </button>
        </form>
      )}
    </div>
  );
}
