"use client";

import { useEffect, useRef } from "react";

const TOTAL_FRAMES = 240;

export default function ScrollHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Refs for the animated text elements
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);

  // Preload images to prevent flickering
  const imagesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    // Preload all frames
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const paddedIndex = i.toString().padStart(3, "0");
      // Use the new coffee drip sequence
      img.src = `/coffee-drip-sequence/ezgif-frame-${paddedIndex}.jpg`;
      imagesRef.current.push(img);
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    const container = containerRef.current;

    if (!canvas || !context || !container) return;

    // Draw a specific frame
    const drawFrame = (frameIndex: number) => {
      const img = imagesRef.current[frameIndex];
      if (img && img.complete) {
        // Calculate dimensions to cover the canvas
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;
        let drawWidth, drawHeight, offsetX, offsetY;

        if (canvasRatio > imgRatio) {
          drawWidth = canvas.width;
          drawHeight = canvas.width / imgRatio;
          offsetX = 0;
          offsetY = (canvas.height - drawHeight) / 2;
        } else {
          drawHeight = canvas.height;
          drawWidth = canvas.height * imgRatio;
          offsetX = (canvas.width - drawWidth) / 2;
          offsetY = 0;
        }

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }
    };

    // Initialize first frame
    const handleLoadFirstFrame = () => {
      drawFrame(0);
    };

    if (imagesRef.current[0]) {
      imagesRef.current[0].onload = handleLoadFirstFrame;
      // If already cached and loaded
      if (imagesRef.current[0].complete) {
        handleLoadFirstFrame();
      }
    }

    const handleScroll = () => {
      const { top, height } = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Scroll progress inside the container (0 to 1)
      const maxScroll = height - windowHeight;
      let scrollProgress = -top / maxScroll;
      
      // Clamp between 0 and 1
      scrollProgress = Math.max(0, Math.min(1, scrollProgress));

      // Determine frame index
      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.floor(scrollProgress * TOTAL_FRAMES)
      );

      drawFrame(frameIndex);

      // Handle text animations directly via DOM for performance
      const updateText = (ref: React.RefObject<HTMLDivElement | null>, start: number, fade: number, end: number) => {
        if (!ref.current) return;
        
        let opacity = 0;
        let translateY = 40; // Start slightly below
        
        if (scrollProgress >= start && scrollProgress <= end) {
          if (scrollProgress < start + fade) {
            // Fading in
            const progress = (scrollProgress - start) / fade;
            opacity = progress;
            translateY = 40 * (1 - progress);
          } else if (scrollProgress > end - fade) {
            // Fading out
            const progress = (end - scrollProgress) / fade;
            opacity = progress;
            translateY = -40 * (1 - progress); // Move up as it fades out
          } else {
            // Fully visible
            opacity = 1;
            translateY = 0;
          }
        }
        
        ref.current.style.opacity = opacity.toString();
        // Combine centering transform with the dynamic Y translation
        ref.current.style.transform = `translate(-50%, calc(-50% + ${translateY}px))`;
      };

      updateText(text1Ref, 0.0, 0.08, 0.33);
      updateText(text2Ref, 0.33, 0.08, 0.66);
      updateText(text3Ref, 0.66, 0.08, 1.0);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      handleScroll(); // Redraw on resize
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initial sizing and draw
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section id="hero-section" ref={containerRef} className="relative h-[300vh] w-full bg-surface-container-lowest">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-70 mix-blend-screen" />
        
        {/* Dark gradient overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

        {/* Top Legibility Scrim for Navbar */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/40 to-transparent pointer-events-none z-10" />

        {/* Text Layer 1 */}
        <div 
          ref={text1Ref} 
          className="absolute top-1/2 left-1/2 w-full px-8 text-center pointer-events-none will-change-[opacity,transform]"
          style={{ opacity: 0, transform: 'translate(-50%, calc(-50% + 40px))' }}
        >
          <h2 className="font-headline-lg text-4xl md:text-6xl text-white mb-4 tracking-tight drop-shadow-lg">
            Every Drop Tells a Story
          </h2>
          <div className="w-16 h-px bg-secondary mx-auto mb-6"></div>
          <p className="font-body-lg text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-light">
            Sourced with integrity, roasted with intention.
          </p>
        </div>

        {/* Text Layer 2 */}
        <div 
          ref={text2Ref} 
          className="absolute top-1/2 left-1/2 w-full px-8 text-center pointer-events-none will-change-[opacity,transform]"
          style={{ opacity: 0, transform: 'translate(-50%, calc(-50% + 40px))' }}
        >
          <h2 className="font-headline-lg text-4xl md:text-6xl text-white mb-4 tracking-tight drop-shadow-lg">
            Patience. Precision. Perfection.
          </h2>
          <div className="w-16 h-px bg-secondary mx-auto mb-6"></div>
          <p className="font-body-lg text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-light">
            Bringing out the nuanced characteristics of each origin.
          </p>
        </div>

        {/* Text Layer 3 */}
        <div 
          ref={text3Ref} 
          className="absolute top-1/2 left-1/2 w-full px-8 text-center pointer-events-none will-change-[opacity,transform]"
          style={{ opacity: 0, transform: 'translate(-50%, calc(-50% + 40px))' }}
        >
          <h2 className="font-headline-lg text-4xl md:text-6xl text-white mb-4 tracking-tight drop-shadow-lg">
            Experience Brewza Coffee
          </h2>
          <div className="w-16 h-px bg-secondary mx-auto mb-6"></div>
          <p className="font-body-lg text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-light">
            The absolute pinnacle of flavor in your cup.
          </p>
        </div>

      </div>
    </section>
  );
}
