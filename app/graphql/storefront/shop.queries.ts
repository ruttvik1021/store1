export const SHOP_QUERY = `#graphql
  query Shop {
    shop {
      name
      description
      primaryDomain {
        url
      }
      metafield(namespace: "custom", key: "contact_email") {
        value
      }
      metafield(namespace: "custom", key: "store_location") {
        value
      }
      metafield(namespace: "custom", key: "store_phone") {
        value
      }
    }
  }
`;
