import { useState } from "react";
import { useCart } from "@shopify/hydrogen-react";
import { useSearchParams } from "@remix-run/react";

interface Variant {
  id: string;
  availableForSale: boolean;
}

interface Product {
  id: string;
  title: string;
  variants: {
    nodes: Variant[];
  };
}

interface AddToCartProps {
  product: Product;
}

export default function AddToCart({ product }: AddToCartProps) {
  const { linesAdd, status } = useCart();
  const [searchParams] = useSearchParams();
  const [quantity, setQuantity] = useState(1);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Get selected variant from URL or default to first variant
  const variantId =
    searchParams.get("variant") || product.variants.nodes[0]?.id;
  const selectedVariant = product.variants.nodes.find(
    (v) => v.id === variantId
  );

  const isAvailable = selectedVariant?.availableForSale ?? false;
  const isLoading = status === "creating" || status === "updating";

  const handleAddToCart = async () => {
    if (!selectedVariant || !isAvailable) return;

    try {
      await linesAdd([
        {
          merchandiseId: selectedVariant.id,
          quantity,
        },
      ]);

      // Show confirmation message
      setShowConfirmation(true);
      setTimeout(() => setShowConfirmation(false), 3000);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const incrementQuantity = () => setQuantity((q) => q + 1);
  const decrementQuantity = () => setQuantity((q) => Math.max(1, q - 1));

  return (
    <div className="space-y-4">
      {/* Quantity Selector */}
      <div>
        <label className="block text-sm font-medium mb-2">Quantity</label>
        <div className="flex items-center gap-3">
          <button
            onClick={decrementQuantity}
            className="w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-100 font-bold"
            disabled={quantity <= 1}
          >
            -
          </button>
          <span className="w-12 text-center font-semibold">{quantity}</span>
          <button
            onClick={incrementQuantity}
            className="w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-100 font-bold"
          >
            +
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={!isAvailable || isLoading}
        className={`w-full btn ${
          isAvailable
            ? "btn-primary"
            : "bg-gray-400 text-white cursor-not-allowed"
        }`}
      >
        {isLoading ? "Adding..." : isAvailable ? "Add to Cart" : "Out of Stock"}
      </button>

      {/* Confirmation Message */}
      {showConfirmation && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
          <span className="block sm:inline">
            Added {quantity} {quantity === 1 ? "item" : "items"} to cart!
          </span>
        </div>
      )}
    </div>
  );
}
