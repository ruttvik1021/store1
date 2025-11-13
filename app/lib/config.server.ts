/**
 * Configuration and Environment Variables Management
 *
 * This module validates and exports all environment variables required for the Hydrogen app.
 * It ensures all required variables are present and properly formatted.
 */

import { createStorefrontClient } from "@shopify/hydrogen";

interface StorefrontConfig {
  publicStorefrontToken: string;
  privateStorefrontToken: string;
  storeDomain: string;
  storefrontId: string;
  storefrontApiVersion: string;
}

interface AdminConfig {
  adminAccessToken: string;
  storeDomain: string;
  apiVersion: string;
}

interface SessionConfig {
  secret: string;
}

/**
 * Get and validate Storefront API configuration
 */
export function getStorefrontConfig(env: any): StorefrontConfig {
  const publicToken = env.PUBLIC_STOREFRONT_API_TOKEN;
  const privateToken = env.PRIVATE_STOREFRONT_API_TOKEN;
  const storeDomain = env.PUBLIC_STORE_DOMAIN;
  const storefrontId = env.PUBLIC_STOREFRONT_ID;

  if (!publicToken) {
    throw new Error("PUBLIC_STOREFRONT_API_TOKEN is required");
  }

  if (!privateToken) {
    throw new Error("PRIVATE_STOREFRONT_API_TOKEN is required");
  }

  if (!storeDomain) {
    throw new Error("PUBLIC_STORE_DOMAIN is required");
  }

  if (!storefrontId) {
    throw new Error("PUBLIC_STOREFRONT_ID is required");
  }

  return {
    publicStorefrontToken: publicToken,
    privateStorefrontToken: privateToken,
    storeDomain,
    storefrontId,
    storefrontApiVersion: "2024-10",
  };
}

/**
 * Get and validate Admin API configuration
 */
export function getAdminConfig(env: any): AdminConfig {
  const adminToken = env.ADMIN_API_ACCESS_TOKEN;
  const storeDomain = env.PUBLIC_STORE_DOMAIN;

  if (!adminToken) {
    throw new Error("ADMIN_API_ACCESS_TOKEN is required");
  }

  if (!storeDomain) {
    throw new Error("PUBLIC_STORE_DOMAIN is required");
  }

  return {
    adminAccessToken: adminToken,
    storeDomain,
    apiVersion: "2024-10",
  };
}

/**
 * Get and validate session configuration
 */
export function getSessionConfig(env: any): SessionConfig {
  const secret = env.SESSION_SECRET;

  if (!secret) {
    throw new Error("SESSION_SECRET is required");
  }

  if (secret.length < 32) {
    throw new Error("SESSION_SECRET must be at least 32 characters long");
  }

  return {
    secret,
  };
}

/**
 * Get admin password from environment
 */
export function getAdminPassword(env: any): string {
  const password = env.ADMIN_PASSWORD;

  if (!password) {
    throw new Error("ADMIN_PASSWORD is required");
  }

  return password;
}

/**
 * Create Admin API client
 */
export function createAdminClient(env: any) {
  const config = getAdminConfig(env);

  return {
    async request(query: string, variables?: Record<string, any>) {
      const response = await fetch(
        `https://${config.storeDomain}/admin/api/${config.apiVersion}/graphql.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Access-Token": config.adminAccessToken,
          },
          body: JSON.stringify({ query, variables }),
        }
      );

      if (!response.ok) {
        throw new Error(`Admin API request failed: ${response.statusText}`);
      }

      const json = await response.json();

      if (json.errors) {
        throw new Error(`Admin API errors: ${JSON.stringify(json.errors)}`);
      }

      return json;
    },
  };
}
