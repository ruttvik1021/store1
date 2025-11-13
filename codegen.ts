import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  generates: {
    // Storefront API Types
    "app/generated/storefront.generated.d.ts": {
      schema: {
        "https://shopify.dev/storefront-graphql-direct-proxy/2024-10": {
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token":
              process.env.PUBLIC_STOREFRONT_API_TOKEN || "",
          },
        },
      },
      documents: [
        "app/graphql/storefront/**/*.ts",
        "app/graphql/storefront/**/*.graphql",
      ],
      plugins: ["typescript", "typescript-operations"],
      config: {
        skipTypename: false,
        enumsAsTypes: true,
        futureProofEnums: true,
        dedupeFragments: true,
      },
    },
    // Admin API Types
    "app/generated/admin.generated.d.ts": {
      schema: {
        "https://shopify.dev/admin-graphql-direct-proxy/2024-10": {
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Access-Token": process.env.ADMIN_API_ACCESS_TOKEN || "",
          },
        },
      },
      documents: [
        "app/graphql/admin/**/*.ts",
        "app/graphql/admin/**/*.graphql",
      ],
      plugins: ["typescript", "typescript-operations"],
      config: {
        skipTypename: false,
        enumsAsTypes: true,
        futureProofEnums: true,
        dedupeFragments: true,
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
