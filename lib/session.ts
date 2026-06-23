const SESSION_COOKIE = "bbg_session";
const SESSION_TTL_MS = 12 * 60 * 60 * 1000;

function getSessionSecret() {
  const secret = process.env.BBG_SESSION_SECRET;
  if (!secret) {
    throw new Error("BBG_SESSION_SECRET is not configured");
  }
  return secret;
}

function toBase64Url(bytes: Uint8Array) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

async function sign(payload: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(getSessionSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return toBase64Url(new Uint8Array(signature));
}

export function getSessionCookieName() {
  return SESSION_COOKIE;
}

export async function createSessionToken(now = Date.now()) {
  const expiresAt = now + SESSION_TTL_MS;
  const payload = String(expiresAt);
  return `${payload}.${await sign(payload)}`;
}

export async function isValidSessionToken(token?: string | null, now = Date.now()) {
  if (!token) return false;

  const [expiresAt, signature, extra] = token.split(".");
  if (!expiresAt || !signature || extra) return false;

  const expiry = Number(expiresAt);
  if (!Number.isFinite(expiry) || expiry <= now) return false;

  return signature === await sign(expiresAt);
}
