"use client";

import { useEffect, useState } from "react";

export default function RotatingLogo() {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll fraction (0 at top, 1 at bottom)
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollFraction = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      
      // 3 full rotations (1080 degrees) from top to bottom
      setRotation(scrollFraction * 1080);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Initial call just in case the page is already scrolled
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-30 pointer-events-none">
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
