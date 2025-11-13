import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { json, type LoaderFunctionArgs } from "@shopify/remix-oxygen";
import { CartProvider } from "@shopify/hydrogen-react";

export async function loader({ context }: LoaderFunctionArgs) {
  const { storefront, env } = context;

  return json({
    publicStoreDomain: env.PUBLIC_STORE_DOMAIN,
    publicStorefrontId: env.PUBLIC_STOREFRONT_ID,
  });
}

export default function App() {
  const data = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <CartProvider
          storeDomain={data.publicStoreDomain}
          storefrontId={data.publicStorefrontId}
        >
          <Outlet />
        </CartProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>Error</title>
        <Meta />
        <Links />
      </head>
      <body>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Oops! Something went wrong
          </h1>
          <p className="text-gray-600 mb-8">
            We're sorry for the inconvenience.
          </p>
          <a href="/" className="btn btn-primary">
            Go back home
          </a>
        </div>
        <Scripts />
      </body>
    </html>
  );
}
