import { type ActionFunctionArgs } from "@shopify/remix-oxygen";
import { logoutAdmin } from "~/lib/auth.server";

export async function action({ request, context }: ActionFunctionArgs) {
  return await logoutAdmin(request, context.env);
}
