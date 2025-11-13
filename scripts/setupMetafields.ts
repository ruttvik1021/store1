/**
 * Setup script for creating metafield definitions in Shopify
 * Run with: npm run setup:metafields
 */

import { createAdminClient } from "../app/lib/config.server";

// Environment variables
const env = {
  ADMIN_API_ACCESS_TOKEN: process.env.ADMIN_API_ACCESS_TOKEN,
  PUBLIC_STORE_DOMAIN: process.env.PUBLIC_STORE_DOMAIN,
};

const METAFIELD_DEFINITIONS = [
  // Product Metafields
  {
    namespace: "custom",
    key: "is_featured",
    name: "Is Featured",
    description: "Mark product as featured",
    type: "boolean",
    ownerType: "PRODUCT",
  },
  {
    namespace: "custom",
    key: "sale_percentage",
    name: "Sale Percentage",
    description: "Sale discount percentage",
    type: "number_integer",
    ownerType: "PRODUCT",
  },
  {
    namespace: "custom",
    key: "care_instructions",
    name: "Care Instructions",
    description: "Product care instructions",
    type: "multi_line_text_field",
    ownerType: "PRODUCT",
  },
  // Collection Metafields
  {
    namespace: "custom",
    key: "is_featured",
    name: "Is Featured",
    description: "Mark collection as featured",
    type: "boolean",
    ownerType: "COLLECTION",
  },
  {
    namespace: "custom",
    key: "display_order",
    name: "Display Order",
    description: "Order to display collection",
    type: "number_integer",
    ownerType: "COLLECTION",
  },
  // Shop Metafields
  {
    namespace: "custom",
    key: "contact_email",
    name: "Contact Email",
    description: "Store contact email",
    type: "single_line_text_field",
    ownerType: "SHOP",
  },
  {
    namespace: "custom",
    key: "store_location",
    name: "Store Location",
    description: "Physical store location address",
    type: "multi_line_text_field",
    ownerType: "SHOP",
  },
  {
    namespace: "custom",
    key: "store_phone",
    name: "Store Phone",
    description: "Store contact phone number",
    type: "single_line_text_field",
    ownerType: "SHOP",
  },
];

const CREATE_METAFIELD_DEFINITION_MUTATION = `#graphql
  mutation CreateMetafieldDefinition($definition: MetafieldDefinitionInput!) {
    metafieldDefinitionCreate(definition: $definition) {
      createdDefinition {
        id
        name
        namespace
        key
      }
      userErrors {
        field
        message
      }
    }
  }
`;

async function setupMetafields() {
  console.log("🚀 Starting metafield setup...\n");

  const admin = createAdminClient(env);

  for (const definition of METAFIELD_DEFINITIONS) {
    try {
      console.log(
        `Creating metafield: ${definition.ownerType}.${definition.namespace}.${definition.key}`
      );

      const { data } = await admin.request(
        CREATE_METAFIELD_DEFINITION_MUTATION,
        {
          variables: {
            definition: {
              name: definition.name,
              namespace: definition.namespace,
              key: definition.key,
              description: definition.description,
              type: definition.type,
              ownerType: definition.ownerType,
            },
          },
        }
      );

      if (data?.metafieldDefinitionCreate?.userErrors?.length > 0) {
        const errors = data.metafieldDefinitionCreate.userErrors;
        // Check if error is "already exists"
        if (
          errors.some(
            (e: any) =>
              e.message.includes("taken") ||
              e.message.includes("already exists")
          )
        ) {
          console.log(`  ⚠️  Already exists, skipping...\n`);
        } else {
          console.error(`  ❌ Error:`, errors);
        }
      } else {
        console.log(`  ✅ Created successfully\n`);
      }
    } catch (error) {
      console.error(`  ❌ Failed to create metafield:`, error);
    }
  }

  console.log("✨ Metafield setup complete!");
}

// Run the setup
setupMetafields().catch((error) => {
  console.error("Failed to setup metafields:", error);
  process.exit(1);
});
