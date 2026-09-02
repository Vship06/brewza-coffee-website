"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Product } from "../data/products";
import { useCart } from "../context/CartContext";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const { addToCart } = useCart();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isVisible && !isOpen) return null;
  if (!product) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div 
        className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-surface text-on-surface rounded-2xl shadow-2xl transform transition-transform duration-300 flex flex-col md:flex-row ${
          isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'
        }`}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-surface/50 hover:bg-surface-variant rounded-full transition-colors backdrop-blur-md md:text-on-surface text-white"
        >
          <span className="material-icons-outlined">close</span>
        </button>

        {/* Image Section */}
        <div className="relative w-full md:w-1/2 h-64 md:h-auto bg-surface-container-lowest">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
        
        {/* Details Section */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col">
          <div className="mb-6">
            <h2 className="font-headline-lg text-3xl md:text-4xl text-primary mb-2">{product.name}</h2>
            <p className="font-headline-sm text-2xl text-secondary">${product.price}</p>
          </div>
          
          <p className="font-body-md text-on-surface-variant leading-relaxed mb-8">
            {product.longDescription}
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div>
              <span className="block font-label-caps text-xs text-on-surface-variant mb-1">Origin</span>
              <span className="font-body-sm text-primary">{product.origin}</span>
            </div>
            <div>
              <span className="block font-label-caps text-xs text-on-surface-variant mb-1">Altitude</span>
              <span className="font-body-sm text-primary">{product.altitude}</span>
            </div>
            <div>
              <span className="block font-label-caps text-xs text-on-surface-variant mb-1">Process</span>
              <span className="font-body-sm text-primary">{product.process}</span>
            </div>
            <div>
              <span className="block font-label-caps text-xs text-on-surface-variant mb-1">Roast</span>
              <span className="font-body-sm text-primary">{product.roastLevel}</span>
            </div>
          </div>
          
          <div className="mb-8">
            <span className="block font-label-caps text-xs text-on-surface-variant mb-3">Tasting Notes</span>
            <div className="flex flex-wrap gap-2">
              {product.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-secondary/10 text-secondary font-label-caps text-[10px] rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          <div className="mt-auto">
            <button 
              onClick={() => {
                addToCart({ id: product.id, name: product.name, price: product.price, image: product.image });
                onClose();
              }}
              className="w-full py-4 bg-primary text-on-primary font-label-caps rounded-lg hover:bg-primary/90 transition-colors shadow-md"
            >
              Add to Cart - ${product.price}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
