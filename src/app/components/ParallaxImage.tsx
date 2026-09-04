"use client";

import React, { useEffect, useRef } from 'react';

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
}

export default function ParallaxImage({ src, alt, className = "", imageClassName = "" }: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !imageRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      
      // Check if container is in viewport
      if (rect.top <= window.innerHeight && rect.bottom >= 0) {
        // Calculate scroll percentage (0 when entering bottom, 1 when leaving top)
        const scrollPercent = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        
        // Translate Y from -15% to +15%
        const translateY = (scrollPercent - 0.5) * 30; 
        // We scale the image to 1.3 so the edges don't show when translating
        imageRef.current.style.transform = `translateY(${translateY}%) scale(1.3)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className={`overflow-hidden relative ${className}`}>
      <div ref={imageRef} className="w-full h-full will-change-transform" style={{ transform: 'scale(1.3)' }}>
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover ${imageClassName}`}
        />
      </div>
    </div>
  );
}
