"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    let isTicking = false;

    const handleScroll = () => {
      if (!isTicking) {
        animationFrameId = requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const height = document.documentElement.scrollHeight - window.innerHeight;
          const currentProgress = height > 0 ? (scrollY / height) * 100 : 0;
          setProgress(currentProgress);
          isTicking = false;
        });
        isTicking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Initial call to set progress if already scrolled on load
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-[100] pointer-events-none">
      <div 
        className="h-full bg-secondary transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
