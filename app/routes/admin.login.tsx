import {
  json,
  type LoaderFunctionArgs,
  type ActionFunctionArgs,
} from "@shopify/remix-oxygen";
import { Form, useActionData, redirect } from "@remix-run/react";
import { authenticateAdmin, isAdminSession } from "~/lib/auth.server";
import { commitSession, getSession } from "~/lib/session.server";
import { useState } from "react";

export async function loader({ request, context }: LoaderFunctionArgs) {
  // If already logged in, redirect to admin dashboard
  const isAdmin = await isAdminSession(request, context.env);

  if (isAdmin) {
    return redirect("/admin");
  }

  return json({});
}

export async function action({ request, context }: ActionFunctionArgs) {
  const formData = await request.formData();
  const password = formData.get("password") as string;

  if (!password) {
    return json({ error: "Password is required" }, { status: 400 });
  }

  const isValid = await authenticateAdmin(request, context.env, password);

  if (!isValid) {
    return json({ error: "Invalid password" }, { status: 401 });
  }

  // Set session cookie
  const session = await getSession(request.headers.get("Cookie"), context.env);
  session.set("isAdmin", true);

  return redirect("/admin", {
    headers: {
      "Set-Cookie": await commitSession(session, context.env),
    },
  });
}

export default function AdminLogin() {
  const actionData = useActionData<typeof action>();
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8">Admin Login</h1>

        {actionData?.error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {actionData.error}
          </div>
        )}

        <Form method="post" className="space-y-6">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2"
            >
              Admin Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
              placeholder="Enter admin password"
            />
          </div>

          <button type="submit" className="w-full btn btn-primary">
            Login
          </button>
        </Form>

        <div className="mt-6 text-center">
          <a href="/" className="text-primary-600 hover:underline">
            ← Back to Store
          </a>
        </div>
      </div>
    </div>
  );
}
