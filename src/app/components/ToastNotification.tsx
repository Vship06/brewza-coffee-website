"use client";

import { useCart } from "../context/CartContext";

export default function ToastNotification() {
  const { toastMessage, setToastMessage, toggleCart } = useCart();

  return (
    <div
      className={`fixed bottom-8 right-8 z-[100] transition-all duration-300 transform ${
        toastMessage 
          ? "translate-y-0 opacity-100 pointer-events-auto" 
          : "translate-y-4 opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-surface border border-outline-variant/30 shadow-2xl rounded-lg py-4 px-6 flex items-center gap-4">
        <span className="material-icons-outlined text-secondary">check_circle</span>
        <p className="font-body-md text-on-surface">{toastMessage}</p>
        <button 
          onClick={() => {
            setToastMessage(null);
            toggleCart();
          }}
          className="ml-2 font-label-caps text-secondary text-sm hover:underline"
        >
          View Cart
        </button>
        <button 
          onClick={() => setToastMessage(null)}
          className="ml-2 text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center"
        >
          <span className="material-icons-outlined text-sm">close</span>
        </button>
      </div>
    </div>
  );
}
