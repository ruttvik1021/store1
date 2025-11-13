import {
  createStorefrontClient,
  createCustomerAccountClient,
} from "@shopify/hydrogen";
import {
  createRequestHandler,
  getStorefrontHeaders,
} from "@shopify/remix-oxygen";
import { AppLoadContext } from "@shopify/remix-oxygen";

export default {
  async fetch(
    request: Request,
    env: Env,
    executionContext: ExecutionContext
  ): Promise<Response> {
    try {
      const waitUntil = (promise: Promise<any>) =>
        executionContext.waitUntil(promise);
      const [cache, session] = await Promise.all([
        caches.open("hydrogen"),
        getSession(request, env),
      ]);

      const { storefront } = createStorefrontClient({
        cache,
        waitUntil,
        i18n: { language: "EN", country: "IN" },
        publicStorefrontToken: env.PUBLIC_STOREFRONT_API_TOKEN,
        privateStorefrontToken: env.PRIVATE_STOREFRONT_API_TOKEN,
        storeDomain: env.PUBLIC_STORE_DOMAIN,
        storefrontId: env.PUBLIC_STOREFRONT_ID,
        storefrontHeaders: getStorefrontHeaders(request),
      });

      const handleRequest = createRequestHandler({
        build: await import("./build/index.js"),
        mode: process.env.NODE_ENV,
        getLoadContext: (): AppLoadContext => ({
          storefront,
          session,
          env,
          waitUntil,
        }),
      });

      return await handleRequest(request);
    } catch (error) {
      console.error(error);
      return new Response("An unexpected error occurred", { status: 500 });
    }
  },
};

async function getSession(request: Request, env: Env) {
  const sessionStorage = await import("./app/lib/session.server");
  return sessionStorage.getSession(request.headers.get("Cookie"));
}

interface Env {
  SESSION_SECRET: string;
  PUBLIC_STOREFRONT_API_TOKEN: string;
  PRIVATE_STOREFRONT_API_TOKEN: string;
  PUBLIC_STORE_DOMAIN: string;
  PUBLIC_STOREFRONT_ID: string;
  ADMIN_API_ACCESS_TOKEN: string;
}
