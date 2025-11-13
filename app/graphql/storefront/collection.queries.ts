export const FEATURED_COLLECTIONS_QUERY = `#graphql
  query FeaturedCollections($first: Int!) {
    collections(first: $first, query: "tag:featured") {
      nodes {
        id
        handle
        title
        description
        image {
          url
          altText
          width
          height
        }
        metafield(namespace: "custom", key: "is_featured") {
          value
        }
        metafield(namespace: "custom", key: "display_order") {
          value
        }
      }
    }
  }
`;

export const COLLECTION_QUERY = `#graphql
  query Collection($handle: String!, $first: Int!, $sortKey: ProductCollectionSortKeys!) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      descriptionHtml
      image {
        url
        altText
        width
        height
      }
      products(first: $first, sortKey: $sortKey) {
        nodes {
          id
          handle
          title
          description
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          compareAtPriceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          featuredImage {
            url
            altText
            width
            height
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
      seo {
        title
        description
      }
    }
  }
`;
