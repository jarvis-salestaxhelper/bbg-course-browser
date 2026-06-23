import { NextRequest, NextResponse } from "next/server";
import { createSessionToken, getSessionCookieName } from "@/lib/session";

export async function POST(request: NextRequest) {
  const form = await request.formData();
  const password = String(form.get("password") || "");
  const nextPath = String(form.get("next") || "/");
  const expectedPassword = process.env.BBG_BROWSER_PASSWORD;

  if (!expectedPassword) {
    return NextResponse.json({ error: "Password is not configured" }, { status: 500 });
  }

  if (password !== expectedPassword) {
    const url = new URL("/login", request.url);
    url.searchParams.set("error", "1");
    if (nextPath.startsWith("/")) url.searchParams.set("next", nextPath);
    return NextResponse.redirect(url, { status: 303 });
  }

  const redirectTo = nextPath.startsWith("/") && !nextPath.startsWith("//") ? nextPath : "/";
  const response = NextResponse.redirect(new URL(redirectTo, request.url), { status: 303 });
  response.cookies.set({
    name: getSessionCookieName(),
    value: await createSessionToken(),
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
  });

  return response;
}
