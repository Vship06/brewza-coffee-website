"use client";

import { useEffect, useRef, useState } from "react";

interface CircleRevealSectionProps {
  children: React.ReactNode;
}

export default function CircleRevealSection({ children }: CircleRevealSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [radius, setRadius] = useState(0);

  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      animationFrameId = requestAnimationFrame(() => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // The container is 200vh tall.
        // We want the animation to progress as the container's top is pinned.
        // rect.top is the distance from the viewport top to the container's top.
        const scrollDistance = -rect.top;
        const maxScroll = rect.height - windowHeight;

        let progress = 0;
        if (maxScroll > 0) {
          // progress is 0 when rect.top >= 0, 1 when rect.bottom <= windowHeight
          progress = Math.max(0, Math.min(1, scrollDistance / maxScroll));
        }

        // The diagonal of the screen requires a radius of about 150% of the viewport width/height
        // to fully cover the corners. We'll animate radius from 0 to 150.
        // Using an easing function (ease-in-out) for a smoother feel.
        const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        const easedProgress = easeInOutCubic(progress);
        
        setRadius(progress === 0 ? 0 : Math.max(0, easedProgress * 150));
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    
    // Initial call
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // When radius is 0, we can disable pointer events so clicks pass through to the section behind it.
  // When radius fully covers (e.g., > 100), we allow normal interaction.
  const isFullyHidden = radius === 0;

  return (
    // Negative margin pulls this section up so it overlaps the previous section exactly.
    // The previous section must be at least 100vh tall for this to look seamless.
    <div ref={containerRef} className="relative h-[200vh] w-full -mt-[100vh]">
      <div 
        className="sticky top-0 w-full h-screen overflow-hidden"
        style={{ pointerEvents: isFullyHidden ? 'none' : 'auto' }}
        aria-hidden={isFullyHidden}
      >
        <div 
          className="w-full h-full bg-surface-container-low flex flex-col justify-center"
          style={{
            clipPath: `circle(${radius}% at 50% 100%)`,
            // Optional: add a subtle transform to the content as it reveals
            // transform: `scale(${isFullyHidden ? 0.95 : 1})`,
            // transition: "transform 0.1s ease-out"
          }}
        >
          <div className="w-full h-full overflow-y-auto overflow-x-hidden">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
