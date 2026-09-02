"use client";

import { useCart } from "../../context/CartContext";
import { Product } from "../../data/products";

export default function ProductAddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <button 
      onClick={(e) => {
        e.preventDefault();
        addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image
        });
      }}
      className="w-full py-4 bg-primary text-on-primary font-label-caps text-label-caps rounded-lg hover:bg-primary/90 transition-colors shadow-md"
    >
      Add to Cart - ${product.price}
    </button>
  );
}
