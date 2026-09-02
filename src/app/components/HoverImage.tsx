"use client";

import { useState, MouseEvent } from "react";

export default function HoverImage({ src, alt, className }: { src: string, alt: string, className?: string }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    // Calculate distance from center (-1 to 1)
    const x = (e.clientX - left - width / 2) / (width / 2);
    const y = (e.clientY - top - height / 2) / (height / 2);
    
    // Move opposite to cursor for parallax feel, increase magnitude to 25px
    setPosition({ x: -x * 25, y: -y * 25 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div 
      className="relative w-full h-full overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={src}
        alt={alt}
        className={`w-full h-full transition-transform duration-300 ease-out ${className || 'object-cover'}`}
        style={{
          // Zoom in by default (scale 1.15) and apply the translation
          transform: `scale(1.15) translate(${position.x}px, ${position.y}px)`,
        }}
      />
    </div>
  );
}
