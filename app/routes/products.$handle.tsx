import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@shopify/remix-oxygen";
import { useLoaderData } from "@remix-run/react";
import {
  PRODUCT_QUERY,
  PRODUCT_RECOMMENDATIONS_QUERY,
} from "~/graphql/storefront/product.queries";
import ProductGallery from "~/components/Product/ProductGallery";
import VariantSelector from "~/components/Product/VariantSelector";
import AddToCart from "~/components/Product/AddToCart";
import SaleBadge from "~/components/Storefront/SaleBadge";
import ProductCard from "~/components/Product/ProductCard";
import Header from "~/components/Layout/Header";
import Footer from "~/components/Layout/Footer";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data?.product) {
    return [{ title: "Product Not Found" }];
  }

  return [
    { title: data.product.seo?.title || data.product.title },
    {
      name: "description",
      content: data.product.seo?.description || data.product.description,
    },
  ];
};

export async function loader({ params, context }: LoaderFunctionArgs) {
  const { handle } = params;
  const { storefront } = context;

  if (!handle) {
    throw new Response("Product handle is required", { status: 400 });
  }

  const { data } = await storefront.query(PRODUCT_QUERY, {
    variables: { handle },
  });

  if (!data?.product) {
    throw new Response("Product not found", { status: 404 });
  }

  // Load recommendations in parallel
  const recommendationsResponse = await storefront.query(
    PRODUCT_RECOMMENDATIONS_QUERY,
    {
      variables: { productId: data.product.id },
    }
  );

  return json({
    product: data.product,
    recommendations: recommendationsResponse.data?.productRecommendations || [],
  });
}

export default function ProductPage() {
  const { product, recommendations } = useLoaderData<typeof loader>();

  const price = product.priceRange.minVariantPrice.amount;
  const compareAtPrice = product.compareAtPriceRange?.minVariantPrice?.amount;
  const images = product.images.nodes.map((img: any) => ({
    url: img.url,
    altText: img.altText || product.title,
  }));

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="relative">
            {compareAtPrice &&
              parseFloat(compareAtPrice) > parseFloat(price) && (
                <div className="absolute top-4 right-4 z-10">
                  <SaleBadge
                    price={parseFloat(price)}
                    compareAtPrice={parseFloat(compareAtPrice)}
                  />
                </div>
              )}
            <ProductGallery images={images} />
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-4xl font-bold mb-4">{product.title}</h1>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold">
                ₹{parseFloat(price).toFixed(2)}
              </span>
              {compareAtPrice &&
                parseFloat(compareAtPrice) > parseFloat(price) && (
                  <span className="text-xl text-gray-500 line-through">
                    ₹{parseFloat(compareAtPrice).toFixed(2)}
                  </span>
                )}
            </div>

            <div
              className="prose mb-8"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />

            {/* Variant Selector */}
            <VariantSelector product={product} />

            {/* Add to Cart */}
            <AddToCart product={product} />

            {/* Care Instructions */}
            {product.metafield?.value && (
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">Care Instructions</h3>
                <p className="text-sm text-gray-600">
                  {product.metafield.value}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Product Recommendations */}
        {recommendations.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {recommendations.map((rec: any) => (
                <ProductCard key={rec.id} product={rec} />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
