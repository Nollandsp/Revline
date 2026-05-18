/**
 * Rate limiter in-memory simple (sliding window).
 * Adapté pour Next.js Route Handlers — pas de dépendance externe.
 *
 * Usage :
 *   const { ok, retryAfter } = rateLimit(req, { max: 5, windowMs: 15 * 60 * 1000 });
 *   if (!ok) return NextResponse.json({ error: "Trop de requêtes" }, { status: 429, headers: { "Retry-After": String(retryAfter) } });
 */

const store = new Map(); // ip → { count, resetAt }

/**
 * @param {Request} req
 * @param {{ max: number, windowMs: number }} options
 * @returns {{ ok: boolean, retryAfter: number }}
 */
export function rateLimit(req, { max, windowMs }) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  const now = Date.now();
  const entry = store.get(ip);

  if (!entry || now > entry.resetAt) {
    store.set(ip, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfter: 0 };
  }

  entry.count += 1;

  if (entry.count > max) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
    return { ok: false, retryAfter };
  }

  return { ok: true, retryAfter: 0 };
}
