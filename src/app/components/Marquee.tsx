import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  { 
    name: "Alex M.",
    stars: 5,
    roastTag: "Light Roast",
    quote: "The clarity and sweetness of this Ethiopian Yirgacheffe is unparalleled. Best coffee I've ever had."
  },
  { 
    name: "Sarah J.",
    stars: 5,
    roastTag: "Medium Roast",
    quote: "A masterclass in sustainable sourcing and flavor. The balanced notes of chocolate and hazelnut are perfect."
  },
  { 
    name: "Michael T.",
    stars: 5,
    roastTag: "Dark Roast",
    quote: "Deep, bold, and incredibly smooth. It's the perfect morning ritual without any of the typical bitterness."
  },
  { 
    name: "Emma W.",
    stars: 5,
    roastTag: "Espresso Blend",
    quote: "Pulls a beautiful shot with rich crema every single time. Absolutely my new go-to for daily lattes."
  }
];

export default function Marquee() {
  return (
    <div className="w-full bg-primary text-on-primary py-20 overflow-hidden relative flex flex-col items-center">
      
      <div className="text-center mb-12">
        <h2 className="font-headline-md text-headline-md text-on-primary mb-4">What They're Saying</h2>
        <div className="w-12 h-px bg-on-primary/30 mx-auto"></div>
      </div>

      {/* Gradient edges for smooth fade */}
      <div className="absolute top-0 left-0 bottom-0 w-24 bg-gradient-to-r from-primary to-transparent z-10 pointer-events-none"></div>
      <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-primary to-transparent z-10 pointer-events-none"></div>
      
      <div className="flex whitespace-nowrap animate-marquee hover:[animation-play-state:paused] transition-all">
        {/* Double the array for seamless infinite looping */}
        {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
          <div key={i} className="flex-shrink-0 w-[300px] md:w-[450px] mx-4 md:mx-6 bg-surface p-8 rounded-2xl border border-outline-variant/20 shadow-xl shadow-black/10 whitespace-normal flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 mb-6">
                {[...Array(t.stars)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                ))}
              </div>
              <p className="font-body-lg text-on-surface-variant text-lg leading-relaxed mb-8 italic">
                "{t.quote}"
              </p>
            </div>
            
            <div className="flex items-center justify-between border-t border-outline-variant/20 pt-6 mt-auto">
              <span className="font-headline-sm text-primary">{t.name}</span>
              <span className="px-3 py-1 bg-secondary/10 text-secondary font-label-caps text-[10px] rounded-full">
                {t.roastTag}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
