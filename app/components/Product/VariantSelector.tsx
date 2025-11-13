import { useState } from "react";
import { useSearchParams } from "@remix-run/react";

interface Variant {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: Array<{
    name: string;
    value: string;
  }>;
}

interface ProductOption {
  name: string;
  values: string[];
}

interface Product {
  id: string;
  options: ProductOption[];
  variants: {
    nodes: Variant[];
  };
}

interface VariantSelectorProps {
  product: Product;
}

export default function VariantSelector({ product }: VariantSelectorProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >(() => {
    // Initialize from URL params or first available option
    const initial: Record<string, string> = {};
    product.options.forEach((option) => {
      const paramValue = searchParams.get(option.name.toLowerCase());
      initial[option.name] = paramValue || option.values[0];
    });
    return initial;
  });

  const handleOptionChange = (optionName: string, value: string) => {
    const newSelectedOptions = {
      ...selectedOptions,
      [optionName]: value,
    };
    setSelectedOptions(newSelectedOptions);

    // Update URL with selected options
    const newParams = new URLSearchParams(searchParams);
    newParams.set(optionName.toLowerCase(), value);

    // Find matching variant and set variant ID in URL
    const matchingVariant = findMatchingVariant(newSelectedOptions);
    if (matchingVariant) {
      newParams.set("variant", matchingVariant.id);
    }

    setSearchParams(newParams);
  };

  const findMatchingVariant = (
    options: Record<string, string>
  ): Variant | null => {
    return (
      product.variants.nodes.find((variant) => {
        return variant.selectedOptions.every(
          (option) => options[option.name] === option.value
        );
      }) || null
    );
  };

  const isOptionAvailable = (optionName: string, value: string): boolean => {
    const testOptions = {
      ...selectedOptions,
      [optionName]: value,
    };

    return product.variants.nodes.some((variant) => {
      if (!variant.availableForSale) return false;
      return variant.selectedOptions.every(
        (option) => testOptions[option.name] === option.value
      );
    });
  };

  const selectedVariant = findMatchingVariant(selectedOptions);

  return (
    <div className="space-y-6 mb-8">
      {product.options.map((option) => (
        <div key={option.name}>
          <label className="block text-sm font-medium mb-3">
            {option.name}:{" "}
            <span className="font-bold">{selectedOptions[option.name]}</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {option.values.map((value) => {
              const isSelected = selectedOptions[option.name] === value;
              const isAvailable = isOptionAvailable(option.name, value);

              return (
                <button
                  key={value}
                  onClick={() => handleOptionChange(option.name, value)}
                  disabled={!isAvailable}
                  className={`px-4 py-2 rounded-lg border-2 transition-all ${
                    isSelected
                      ? "border-primary-600 bg-primary-600 text-white"
                      : isAvailable
                      ? "border-gray-300 hover:border-primary-600"
                      : "border-gray-200 text-gray-400 cursor-not-allowed opacity-50"
                  }`}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {selectedVariant && !selectedVariant.availableForSale && (
        <div className="text-red-600 font-medium">
          This variant is currently out of stock
        </div>
      )}
    </div>
  );
}
