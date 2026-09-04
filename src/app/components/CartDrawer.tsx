"use client";

import React, { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { X, ShoppingBag, Loader2 } from 'lucide-react';
import Image from 'next/image';

export default function CartDrawer() {
  const { cartItems, isCartOpen, toggleCart, updateQuantity, removeFromCart, cartTotal } = useCart();
  const [isCheckingOut, setIsCheckingOut] = React.useState(false);

  const handleCheckout = async () => {
    try {
      setIsCheckingOut(true);
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: cartItems }),
      });

      const data = await response.json();
      
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('Checkout error:', data.error);
        alert(data.error || 'Something went wrong during checkout.');
        setIsCheckingOut(false);
      }
    } catch (err) {
      console.error('Network error during checkout:', err);
      alert('Network error. Please try again.');
      setIsCheckingOut(false);
    }
  };

  // Prevent body scroll when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen]);

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300 ${isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={toggleCart}
      />
      
      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-surface shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="p-6 border-b border-outline-variant/30 flex justify-between items-center">
          <h2 className="font-headline-sm text-headline-sm text-primary">Your Cart</h2>
          <button 
            onClick={toggleCart}
            className="p-2 hover:bg-surface-container-low rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-on-surface-variant" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-on-surface-variant">
              <ShoppingBag className="w-16 h-16 mb-4 opacity-50" />
              <p className="font-body-lg">Your cart is empty.</p>
              <button 
                onClick={toggleCart}
                className="mt-6 text-secondary hover:underline font-label-caps"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="flex gap-4 bg-surface-container-low p-4 rounded-lg">
                <div className="relative w-20 h-24 flex-shrink-0">
                  <Image 
                    src={item.image} 
                    alt={item.name} 
                    fill
                    sizes="80px"
                    className="object-cover rounded" 
                  />
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between">
                    <h3 className="font-headline-sm text-lg text-primary">{item.name}</h3>
                    <button onClick={() => removeFromCart(item.id)} className="text-on-surface-variant hover:text-error transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="font-body-md text-on-surface-variant mb-auto">${item.price.toFixed(2)}</p>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border border-outline-variant rounded">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 hover:bg-surface-variant transition-colors"
                        aria-label="Decrease quantity"
                      >-</button>
                      <span className="px-3 py-1 font-body-md text-sm">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 hover:bg-surface-variant transition-colors"
                        aria-label="Increase quantity"
                      >+</button>
                    </div>
                    <span className="font-headline-sm text-primary font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-outline-variant/30 bg-surface">
            <div className="flex justify-between items-center mb-6">
              <span className="font-body-lg text-on-surface-variant">Subtotal</span>
              <span className="font-headline-sm text-2xl text-primary">${cartTotal.toFixed(2)}</span>
            </div>
            <button 
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full py-4 bg-primary text-on-primary font-label-caps text-label-caps rounded hover:bg-primary/90 transition-colors duration-300 shadow-md disabled:opacity-50 flex justify-center items-center"
            >
              {isCheckingOut ? (
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
              ) : null}
              {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
