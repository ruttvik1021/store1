import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@shopify/remix-oxygen";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { COLLECTION_QUERY } from "~/graphql/storefront/collection.queries";
import ProductCard from "~/components/Product/ProductCard";
import Header from "~/components/Layout/Header";
import Footer from "~/components/Layout/Footer";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data?.collection) {
    return [{ title: "Collection Not Found" }];
  }

  return [
    { title: data.collection.seo?.title || data.collection.title },
    {
      name: "description",
      content: data.collection.seo?.description || data.collection.description,
    },
  ];
};

export async function loader({ params, request, context }: LoaderFunctionArgs) {
  const { handle } = params;
  const { storefront } = context;

  if (!handle) {
    throw new Response("Collection handle is required", { status: 400 });
  }

  const url = new URL(request.url);
  const sortParam = url.searchParams.get("sort") || "COLLECTION_DEFAULT";

  // Map sort param to Shopify sort keys
  const sortKeyMap: Record<string, string> = {
    PRICE: "PRICE",
    TITLE: "TITLE",
    CREATED: "CREATED",
    BEST_SELLING: "BEST_SELLING",
    COLLECTION_DEFAULT: "COLLECTION_DEFAULT",
  };

  const sortKey = sortKeyMap[sortParam] || "COLLECTION_DEFAULT";

  const { data } = await storefront.query(COLLECTION_QUERY, {
    variables: {
      handle,
      first: 24,
      sortKey,
    },
  });

  if (!data?.collection) {
    throw new Response("Collection not found", { status: 404 });
  }

  return json({
    collection: data.collection,
  });
}

export default function CollectionPage() {
  const { collection } = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSort = searchParams.get("sort") || "COLLECTION_DEFAULT";

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value;
    setSearchParams({ sort: newSort });
  };

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container py-8">
        {/* Collection Header */}
        {collection.image && (
          <div className="relative h-64 mb-8 rounded-lg overflow-hidden">
            <img
              src={collection.image.url}
              alt={collection.image.altText || collection.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h1 className="text-4xl font-bold text-white">
                {collection.title}
              </h1>
            </div>
          </div>
        )}

        {!collection.image && (
          <h1 className="text-4xl font-bold mb-4">{collection.title}</h1>
        )}

        {collection.description && (
          <p className="text-gray-600 mb-8 max-w-3xl">
            {collection.description}
          </p>
        )}

        {/* Sort & Filter Bar */}
        <div className="flex justify-between items-center mb-8">
          <p className="text-gray-600">
            {collection.products.nodes.length} products
          </p>

          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-sm font-medium">
              Sort by:
            </label>
            <select
              id="sort"
              value={currentSort}
              onChange={handleSortChange}
              className="border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="COLLECTION_DEFAULT">Featured</option>
              <option value="PRICE">Price: Low to High</option>
              <option value="TITLE">Alphabetically</option>
              <option value="CREATED">Newest</option>
              <option value="BEST_SELLING">Best Selling</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {collection.products.nodes.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* No Products Message */}
        {collection.products.nodes.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">
              No products found in this collection.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
