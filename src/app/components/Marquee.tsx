import React from 'react';

const testimonials = [
  { text: "Best coffee I've ever had. Truly exceptional.", source: "The Roaster Daily" },
  { text: "A masterclass in sustainable sourcing and flavor.", source: "Coffee Digest" },
  { text: "The perfect morning ritual.", source: "Vogue Living" },
  { text: "Unparalleled clarity and sweetness in every cup.", source: "Barista Magazine" },
];

export default function Marquee() {
  return (
    <div className="w-full bg-secondary text-primary py-8 overflow-hidden relative flex items-center">
      {/* Gradient edges for smooth fade */}
      <div className="absolute top-0 left-0 bottom-0 w-16 bg-gradient-to-r from-secondary to-transparent z-10 pointer-events-none"></div>
      <div className="absolute top-0 right-0 bottom-0 w-16 bg-gradient-to-l from-secondary to-transparent z-10 pointer-events-none"></div>
      
      <div className="flex whitespace-nowrap animate-marquee">
        {/* Double the array for seamless infinite looping */}
        {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
          <div key={i} className="flex items-center mx-8 md:mx-16">
            <span className="material-icons-outlined text-primary/50 mr-4">format_quote</span>
            <p className="font-headline-sm text-xl md:text-2xl tracking-tight">
              "{t.text}" <span className="font-body-md text-sm ml-2 opacity-70">— {t.source}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
