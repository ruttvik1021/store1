import { getSession, commitSession } from "./session.server";
import { getAdminPassword } from "./config.server";
import { redirect } from "@shopify/remix-oxygen";

/**
 * Check if a session is authenticated as admin
 */
export async function isAdminSession(
  request: Request,
  env: any
): Promise<boolean> {
  const session = await getSession(request.headers.get("Cookie"), env);
  return session.get("isAdmin") === true;
}

/**
 * Require admin authentication - redirect to login if not authenticated
 */
export async function requireAdmin(request: Request, env: any) {
  const isAdmin = await isAdminSession(request, env);

  if (!isAdmin) {
    throw redirect("/admin/login");
  }
}

/**
 * Authenticate admin with password
 */
export async function authenticateAdmin(
  request: Request,
  env: any,
  password: string
): Promise<boolean> {
  const adminPassword = getAdminPassword(env);

  if (password !== adminPassword) {
    return false;
  }

  const session = await getSession(request.headers.get("Cookie"), env);
  session.set("isAdmin", true);

  return true;
}

/**
 * Logout admin
 */
export async function logoutAdmin(request: Request, env: any) {
  const session = await getSession(request.headers.get("Cookie"), env);
  session.unset("isAdmin");

  const headers = new Headers();
  headers.append("Set-Cookie", await commitSession(session, env));

  return redirect("/admin/login", { headers });
}
