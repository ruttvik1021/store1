import { useCart } from "@shopify/hydrogen-react";
import { Link } from "@remix-run/react";
import { useEffect } from "react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { lines, cost, linesRemove, linesUpdate, checkoutUrl } = useCart();

  // Close drawer on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleUpdateQuantity = async (lineId: string, quantity: number) => {
    if (quantity <= 0) {
      await linesRemove([lineId]);
    } else {
      await linesUpdate([{ id: lineId, quantity }]);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col animate-slide-in">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">Shopping Cart</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
            aria-label="Close cart"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {!lines || lines.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-600 mb-4">Your cart is empty</p>
              <button onClick={onClose} className="btn btn-primary">
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {lines.map((line: any) => (
                <div key={line.id} className="flex gap-4 p-4 border rounded-lg">
                  {/* Product Image */}
                  <img
                    src={line.merchandise.image?.url}
                    alt={
                      line.merchandise.image?.altText ||
                      line.merchandise.product.title
                    }
                    className="w-20 h-20 object-cover rounded"
                  />

                  {/* Product Info */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm mb-1">
                      {line.merchandise.product.title}
                    </h3>
                    {line.merchandise.title !== "Default Title" && (
                      <p className="text-xs text-gray-600 mb-2">
                        {line.merchandise.title}
                      </p>
                    )}
                    <p className="font-bold text-sm">
                      ₹{parseFloat(line.cost.totalAmount.amount).toFixed(2)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          handleUpdateQuantity(line.id, line.quantity - 1)
                        }
                        className="w-6 h-6 rounded border hover:bg-gray-100 text-sm"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-sm">
                        {line.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleUpdateQuantity(line.id, line.quantity + 1)
                        }
                        className="w-6 h-6 rounded border hover:bg-gray-100 text-sm"
                      >
                        +
                      </button>
                      <button
                        onClick={() => linesRemove([line.id])}
                        className="ml-auto text-red-600 hover:text-red-700 text-xs"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {lines && lines.length > 0 && (
          <div className="border-t p-4 space-y-4">
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>
                ₹
                {cost?.totalAmount?.amount
                  ? parseFloat(cost.totalAmount.amount).toFixed(2)
                  : "0.00"}
              </span>
            </div>

            {checkoutUrl && (
              <a
                href={checkoutUrl}
                className="btn btn-primary w-full text-center block"
              >
                Checkout
              </a>
            )}

            <Link
              to="/cart"
              onClick={onClose}
              className="btn btn-secondary w-full text-center block"
            >
              View Cart
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
