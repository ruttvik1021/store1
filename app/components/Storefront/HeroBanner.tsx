import { Link } from "@remix-run/react";

interface BannerData {
  image: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

export default function HeroBanner({
  image,
  title,
  subtitle,
  ctaText,
  ctaLink,
}: BannerData) {
  return (
    <div className="relative h-[500px] md:h-[600px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40" />

      {/* Content */}
      <div className="container relative h-full flex items-center justify-center text-center text-white">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            {title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 drop-shadow-lg">{subtitle}</p>
          <Link
            to={ctaLink}
            className="btn btn-primary text-lg px-8 py-4 inline-block"
          >
            {ctaText}
          </Link>
        </div>
      </div>
    </div>
  );
}
