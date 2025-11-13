import { type MetaFunction } from "@shopify/remix-oxygen";
import { useCart } from "@shopify/hydrogen-react";
import { Link } from "@remix-run/react";
import Header from "~/components/Layout/Header";
import Footer from "~/components/Layout/Footer";

export const meta: MetaFunction = () => {
  return [
    { title: "Shopping Cart - Retail Clothing Store" },
    { name: "description", content: "View your shopping cart" },
  ];
};

export default function CartPage() {
  const { lines, cost, linesRemove, linesUpdate, checkoutUrl } = useCart();

  const handleUpdateQuantity = async (lineId: string, quantity: number) => {
    if (quantity <= 0) {
      await linesRemove([lineId]);
    } else {
      await linesUpdate([{ id: lineId, quantity }]);
    }
  };

  const handleRemoveItem = async (lineId: string) => {
    await linesRemove([lineId]);
  };

  if (!lines || lines.length === 0) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">
              Add some products to get started!
            </p>
            <Link to="/" className="btn btn-primary">
              Continue Shopping
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {lines.map((line: any) => (
                <div
                  key={line.id}
                  className="flex gap-4 p-4 border border-gray-200 rounded-lg"
                >
                  {/* Product Image */}
                  <div className="w-24 h-24 flex-shrink-0">
                    <img
                      src={line.merchandise.image?.url}
                      alt={
                        line.merchandise.image?.altText ||
                        line.merchandise.product.title
                      }
                      className="w-full h-full object-cover rounded"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-grow">
                    <h3 className="font-semibold mb-1">
                      {line.merchandise.product.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {line.merchandise.title !== "Default Title" &&
                        line.merchandise.title}
                    </p>
                    <p className="font-bold">
                      ₹{parseFloat(line.cost.totalAmount.amount).toFixed(2)}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => handleRemoveItem(line.id)}
                      className="text-red-600 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>

                    <div className="flex items-center gap-2 border border-gray-300 rounded">
                      <button
                        onClick={() =>
                          handleUpdateQuantity(line.id, line.quantity - 1)
                        }
                        className="px-3 py-1 hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 min-w-[3ch] text-center">
                        {line.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleUpdateQuantity(line.id, line.quantity + 1)
                        }
                        className="px-3 py-1 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <div className="border border-gray-200 rounded-lg p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">
                    ₹
                    {cost?.subtotalAmount?.amount
                      ? parseFloat(cost.subtotalAmount.amount).toFixed(2)
                      : "0.00"}
                  </span>
                </div>

                {cost?.totalTaxAmount &&
                  parseFloat(cost.totalTaxAmount.amount) > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span className="font-semibold">
                        ₹{parseFloat(cost.totalTaxAmount.amount).toFixed(2)}
                      </span>
                    </div>
                  )}

                <div className="border-t pt-3 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>
                    ₹
                    {cost?.totalAmount?.amount
                      ? parseFloat(cost.totalAmount.amount).toFixed(2)
                      : "0.00"}
                  </span>
                </div>
              </div>

              {/* Discount Code */}
              <div className="mb-6">
                <label
                  htmlFor="discount"
                  className="block text-sm font-medium mb-2"
                >
                  Discount Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    id="discount"
                    placeholder="Enter code"
                    className="flex-grow border border-gray-300 rounded px-3 py-2"
                  />
                  <button className="btn btn-secondary">Apply</button>
                </div>
              </div>

              {/* Checkout Button */}
              {checkoutUrl && (
                <a
                  href={checkoutUrl}
                  className="btn btn-primary w-full text-center block"
                >
                  Proceed to Checkout
                </a>
              )}

              <Link
                to="/"
                className="block text-center mt-4 text-primary-600 hover:underline"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
