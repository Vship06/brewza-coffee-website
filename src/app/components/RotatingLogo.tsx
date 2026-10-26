"use client";

import { useEffect, useState } from "react";

export default function RotatingLogo() {
  const [rotation, setRotation] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll fraction (0 at top, 1 at bottom)
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollFraction = maxScroll > 0 ? window.scrollY / maxScroll : 0;

      // 3 full rotations (1080 degrees) from top to bottom
      setRotation(scrollFraction * 1080);

      // Minimize and fade the badge when scrolled into content sections
      if (window.scrollY > window.innerHeight * 0.5) {
        setIsMinimized(true);
      } else {
        setIsMinimized(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initial call just in case the page is already scrolled
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`fixed bottom-4 right-4 md:bottom-8 md:right-8 z-20 pointer-events-none transition-all duration-500 ease-in-out ${isMinimized ? 'scale-75 opacity-50' : 'scale-100 opacity-100'}`}>
      <div
        className="w-24 h-24 md:w-32 md:h-32"
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: "transform 0.1s ease-out"
        }}
      >
        <img
          src="/logo.png"
          alt="Brewza Coffee Logo"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
