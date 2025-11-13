import { Link } from "@remix-run/react";

interface Collection {
  id: string;
  handle: string;
  title: string;
  description?: string;
  image?: {
    url: string;
    altText?: string;
  };
}

interface FeaturedCollectionsProps {
  collections: Collection[];
}

export default function FeaturedCollections({
  collections,
}: FeaturedCollectionsProps) {
  if (!collections || collections.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-8">
        Featured Collections
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((collection) => (
          <Link
            key={collection.id}
            to={`/collections/${collection.handle}`}
            className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 aspect-[4/3]"
          >
            {/* Collection Image */}
            <div className="absolute inset-0">
              {collection.image ? (
                <img
                  src={collection.image.url}
                  alt={collection.image.altText || collection.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              ) : (
                <div className="w-full h-full bg-gray-200" />
              )}
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-2xl font-bold mb-2">{collection.title}</h3>
              {collection.description && (
                <p className="text-sm opacity-90 line-clamp-2 mb-3">
                  {collection.description}
                </p>
              )}
              <span className="inline-block btn btn-primary group-hover:bg-primary-700">
                Shop Now
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
