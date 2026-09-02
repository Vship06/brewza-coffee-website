"use client";

import { useState } from "react";
import Link from "next/link";
import { products, Product } from "../data/products";
import ProductModal from "../components/ProductModal";
import HoverImage from "../components/HoverImage";
import FadeInScroll from "../components/FadeInScroll";
import { useCart } from "../context/CartContext";

export default function ShopPage() {
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <>
      <main className="min-h-screen pt-32 pb-24 px-margin-mobile md:px-margin-desktop bg-background">
        <div className="max-w-container-max mx-auto">
          {/* Back to Home Link */}
          <Link href="/" className="inline-flex items-center text-on-surface-variant hover:text-primary transition-colors mb-12 font-label-caps">
            <span className="material-icons-outlined text-sm mr-2">arrow_back</span>
            Back to Home
          </Link>

          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="font-headline-lg text-4xl md:text-5xl text-primary mb-6">Our Roasts</h1>
            <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">
              Explore our full collection of artisanal coffees. Each batch is carefully roasted to honor its unique origin and flavor profile.
            </p>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {products.map((product, idx) => (
              <FadeInScroll key={product.id} delay={100 + (idx * 100)} className="group flex flex-col bg-surface border border-outline-variant/20 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 ease-in-out cursor-pointer">
                <div onClick={() => setSelectedProduct(product)} className="flex flex-col flex-grow">
                  <div className="relative h-64 w-full bg-surface-container-low overflow-hidden">
                    <HoverImage
                      alt={product.name}
                      src={product.image}
                      className="object-cover"
                    />
                  </div>
                  <div className="p-8 flex flex-col flex-grow items-center text-center">
                    <h3 className="font-headline-sm text-headline-sm text-primary mb-2 group-hover:text-secondary transition-colors duration-300">{product.name}</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant mb-6 line-clamp-2">
                      {product.shortDescription}
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center mb-6 mt-auto">
                      {product.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-secondary/10 text-secondary font-label-caps text-[10px] rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="px-8 pb-8 pt-0 mt-auto">
                  <button 
                    onClick={(e) => { 
                      e.preventDefault(); 
                      e.stopPropagation(); 
                      addToCart({ id: product.id, name: product.name, price: product.price, image: product.image }); 
                    }}
                    className="relative z-10 w-full py-3 border border-outline-variant/30 text-primary font-label-caps rounded hover:border-secondary hover:text-secondary transition-colors duration-300"
                  >
                    Add to Cart - ${product.price}
                  </button>
                </div>
              </FadeInScroll>
            ))}
          </div>
        </div>
      </main>

      <ProductModal 
        product={selectedProduct} 
        isOpen={selectedProduct !== null} 
        onClose={() => setSelectedProduct(null)} 
      />
    </>
  );
}
