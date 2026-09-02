"use client";

import { useEffect, useRef, useState } from "react";

interface CircleArcRevealSectionProps {
  children: React.ReactNode;
  headline?: string;
}

export default function CircleArcRevealSection({ 
  children, 
  headline = "EXPERIENCE THE BREWZA DIFFERENCE" 
}: CircleArcRevealSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    let animationFrameId: number;

    const handleScrollAndResize = () => {
      animationFrameId = requestAnimationFrame(() => {
        if (!containerRef.current) return;

        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;
        
        setDimensions((prev) => {
          if (prev.width !== winWidth || prev.height !== winHeight) {
            return { width: winWidth, height: winHeight };
          }
          return prev;
        });

        const rect = containerRef.current.getBoundingClientRect();
        
        // Progress tracking for the 250vh container.
        const scrollDistance = -rect.top;
        const maxScroll = rect.height - winHeight;

        let p = 0;
        if (maxScroll > 0) {
          p = Math.max(0, Math.min(1, scrollDistance / maxScroll));
        }

        // Apply a gentle ease-out curve so the growth starts responsive and slows slightly at the end
        const easeOutQuad = (t: number) => t * (2 - t);
        setProgress(easeOutQuad(p));
      });
    };

    window.addEventListener("scroll", handleScrollAndResize, { passive: true });
    window.addEventListener("resize", handleScrollAndResize, { passive: true });
    
    handleScrollAndResize();

    return () => {
      window.removeEventListener("scroll", handleScrollAndResize);
      window.removeEventListener("resize", handleScrollAndResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const isFullyHidden = progress === 0;
  
  const cx = dimensions.width / 2;
  const cy = dimensions.height;
  
  // Max radius needs to cover the entire screen from the bottom center.
  // The distance from bottom center to top corner is Math.hypot(width/2, height).
  const maxRadius = Math.hypot(dimensions.width / 2, dimensions.height);
  
  // Minimum radius when the circle first appears
  const minRadius = Math.min(100, dimensions.width * 0.15); 
  const currentRadius = minRadius + progress * (maxRadius - minRadius);

  // Position text slightly outside the circle edge
  const textRadius = currentRadius + 32;

  // The SVG path for the top half of the circle
  const pathD = `M ${cx - textRadius},${cy} A ${textRadius},${textRadius} 0 0,1 ${cx + textRadius},${cy}`;

  // Fade the text out as the circle consumes the screen (around 70% progress)
  const textOpacity = progress > 0 ? Math.max(0, 1 - Math.pow(progress / 0.7, 4)) : 0;

  return (
    <div ref={containerRef} className="relative h-[250vh] w-full -mt-[30vh] pointer-events-none">
      <div 
        className="sticky top-0 w-full h-screen overflow-hidden"
        style={{ pointerEvents: isFullyHidden ? 'none' : 'auto' }}
        aria-hidden={isFullyHidden}
      >
        {/* SVG Curved Text Layer */}
        <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
          {dimensions.width > 0 && (
            <svg width="100%" height="100%" className="absolute inset-0">
              <defs>
                <path id="curve" d={pathD} />
              </defs>
              <text 
                fill="currentColor" 
                className="text-primary font-label-caps uppercase"
                fontSize="clamp(14px, 2vw, 24px)"
                style={{
                  opacity: textOpacity,
                  letterSpacing: "0.2em",
                  transition: "opacity 0.1s"
                }}
              >
                <textPath 
                  href="#curve" 
                  startOffset="50%" 
                  textAnchor="middle"
                >
                  {headline}
                </textPath>
              </text>
            </svg>
          )}
        </div>

        {/* The Clipped Section */}
        <div 
          className="w-full h-full bg-primary flex flex-col justify-center relative z-10"
          style={{
            clipPath: `circle(${currentRadius}px at 50% 100%)`,
          }}
        >
          <div className="w-full h-full overflow-y-auto overflow-x-hidden pt-12 md:pt-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
