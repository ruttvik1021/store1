interface SaleBadgeProps {
  price: number;
  compareAtPrice: number;
}

export default function SaleBadge({ price, compareAtPrice }: SaleBadgeProps) {
  // Only show if there's a discount
  if (!compareAtPrice || compareAtPrice <= price) {
    return null;
  }

  const discountPercentage = Math.round(
    ((compareAtPrice - price) / compareAtPrice) * 100
  );

  return (
    <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-2 rounded-lg font-bold text-lg shadow-lg">
      {discountPercentage}% OFF
    </div>
  );
}
