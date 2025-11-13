import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@shopify/remix-oxygen";
import { useLoaderData } from "@remix-run/react";
import { FEATURED_PRODUCTS_QUERY } from "~/graphql/storefront/product.queries";
import { FEATURED_COLLECTIONS_QUERY } from "~/graphql/storefront/collection.queries";
import FeaturedProducts from "~/components/Storefront/FeaturedProducts";
import FeaturedCollections from "~/components/Storefront/FeaturedCollections";
import HeroBanner from "~/components/Storefront/HeroBanner";
import PriceFilterCTA from "~/components/Storefront/PriceFilterCTA";
import ContactSection from "~/components/Storefront/ContactSection";
import Header from "~/components/Layout/Header";
import Footer from "~/components/Layout/Footer";

export const meta: MetaFunction = () => {
  return [
    { title: "Home - Retail Clothing Store" },
    {
      name: "description",
      content: "Shop the latest fashion trends at our retail clothing store",
    },
  ];
};

export async function loader({ context }: LoaderFunctionArgs) {
  const { storefront } = context;

  try {
    // Parallel data loading for better performance
    const [productsResponse, collectionsResponse] = await Promise.all([
      storefront.query(FEATURED_PRODUCTS_QUERY, {
        variables: { first: 8 },
      }),
      storefront.query(FEATURED_COLLECTIONS_QUERY, {
        variables: { first: 6 },
      }),
    ]);

    return json({
      featuredProducts: productsResponse.data?.products?.nodes || [],
      featuredCollections: collectionsResponse.data?.collections?.nodes || [],
    });
  } catch (error) {
    console.error("Error loading home page data:", error);
    return json({
      featuredProducts: [],
      featuredCollections: [],
    });
  }
}

export default function Index() {
  const { featuredProducts, featuredCollections } =
    useLoaderData<typeof loader>();

  const bannerData = {
    image: "https://cdn.shopify.com/s/files/1/placeholder-banner.jpg",
    title: "New Season Collection",
    subtitle: "Discover the latest trends in fashion",
    ctaText: "Shop Now",
    ctaLink: "/collections/new-arrivals",
  };

  const priceFilters = [
    { price: "₹999", link: "/collections/all?maxPrice=999" },
    { price: "₹1499", link: "/collections/all?maxPrice=1499" },
    { price: "₹2999", link: "/collections/all?maxPrice=2999" },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero Banner */}
        <HeroBanner {...bannerData} />

        {/* Price Filter CTAs */}
        <section className="container py-12">
          <PriceFilterCTA filters={priceFilters} />
        </section>

        {/* Featured Products */}
        <section className="container py-12">
          <FeaturedProducts products={featuredProducts} />
        </section>

        {/* Featured Collections */}
        <section className="container py-12 bg-gray-50">
          <FeaturedCollections collections={featuredCollections} />
        </section>

        {/* Contact Section */}
        <section className="container py-12">
          <ContactSection />
        </section>
      </main>

      <Footer />
    </div>
  );
}
