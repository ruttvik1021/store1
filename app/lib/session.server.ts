import { createCookieSessionStorage } from "@shopify/remix-oxygen";

export function createSessionStorage(env: any) {
  return createCookieSessionStorage({
    cookie: {
      name: "__session",
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secrets: [env.SESSION_SECRET],
      secure: process.env.NODE_ENV === "production",
    },
  });
}

export async function getSession(cookieHeader: string | null, env: any) {
  const sessionStorage = createSessionStorage(env);
  return sessionStorage.getSession(cookieHeader);
}

export async function commitSession(session: any, env: any) {
  const sessionStorage = createSessionStorage(env);
  return sessionStorage.commitSession(session);
}

export async function destroySession(session: any, env: any) {
  const sessionStorage = createSessionStorage(env);
  return sessionStorage.destroySession(session);
}
