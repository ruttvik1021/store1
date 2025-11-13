import { Link } from "@remix-run/react";

interface PriceFilter {
  price: string;
  link: string;
}

interface PriceFilterCTAProps {
  filters: PriceFilter[];
}

export default function PriceFilterCTA({ filters }: PriceFilterCTAProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-6">Shop by Price</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filters.map((filter, index) => (
          <Link
            key={index}
            to={filter.link}
            className="group bg-gradient-to-br from-primary-500 to-primary-700 text-white rounded-lg p-8 text-center hover:from-primary-600 hover:to-primary-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <div className="text-sm uppercase tracking-wide mb-2 opacity-90">
              Under
            </div>
            <div className="text-4xl font-bold mb-4">{filter.price}</div>
            <div className="inline-flex items-center gap-2 font-semibold">
              <span>Shop Now</span>
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
