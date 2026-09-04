"use client";

import { ArrowRight, PiggyBank, Award, PauseCircle, Rocket, X } from "lucide-react";
import ScrollHero from "./components/ScrollHero";
import FadeInScroll from "./components/FadeInScroll";
import HoverImage from "./components/HoverImage";
import CircleArcRevealSection from "./components/CircleArcRevealSection";
import ParallaxImage from "./components/ParallaxImage";
import Marquee from "./components/Marquee";
import { useCart } from "./context/CartContext";
import { useState } from "react";
import Link from "next/link";
import { products, Product } from "./data/products";
import ProductModal from "./components/ProductModal";

export default function Home() {
  const { addToCart } = useCart();
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"Roast Level" | "Price" | "A-Z">("A-Z");
  const [expandedDetailId, setExpandedDetailId] = useState<string | null>(null);
  const [subFrequency, setSubFrequency] = useState("Every 2 weeks");
  const [subRoast, setSubRoast] = useState("Roaster's Pick");
  const [showAllCoffees, setShowAllCoffees] = useState(false);

  // Derive unique flavor categories
  const flavorCategories = ["All", ...Array.from(new Set(products.map(p => p.flavorCategory)))];

  // Filter and sort products
  const filteredProducts = products.filter(p => activeFilter === "All" || p.flavorCategory === activeFilter);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "Price") return a.price - b.price;
    if (sortBy === "A-Z") return a.name.localeCompare(b.name);
    if (sortBy === "Roast Level") {
      const roastWeight = { "Light": 1, "Medium": 2, "Dark": 3 };
      return roastWeight[a.roastLevel] - roastWeight[b.roastLevel];
    }
    return 0;
  });
  return (
    <>

      <main className="flex-grow">
        <ScrollHero />

        {/* Our Story Section */}
        <section className="pt-32 pb-24 px-margin-mobile md:px-margin-desktop bg-surface-container-low overflow-hidden" id="story">
          <div className="max-w-container-max mx-auto relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute left-4 md:-left-8 top-32 bottom-32 w-px bg-outline-variant/40 z-0"></div>
            <FadeInScroll>
              <div className="text-center mb-16">
                <h2 className="font-headline-md text-headline-md text-primary mb-4">Our Story</h2>
                <div className="w-12 h-px bg-outline-variant mx-auto"></div>
              </div>
            </FadeInScroll>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center mb-24 relative z-10">
              <FadeInScroll delay={200} className="lg:col-span-7">
                <div className="pr-0 lg:pr-8">
                  <div className="font-label-caps text-label-caps text-secondary tracking-wide mb-2 uppercase">01 — Craft</div>
                  <h3 className="font-headline-md text-headline-md text-primary mb-6">Rooted in Craft</h3>
                  <p className="font-body-lg text-body-lg text-on-surface-variant mb-4 max-w-lg leading-relaxed">
                    Every great cup begins with an unwavering commitment to quality. At Brewza Coffee Roasters, we approach
                    roasting not just as a science, but as an art form. Our process is deliberate, focusing on bringing
                    out the unique characteristics of each origin.
                  </p>
                  <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg leading-relaxed">
                    We source meticulously, roast precisely, and cup obsessively to ensure that the coffee that makes it
                    to your cup represents the absolute pinnacle of flavor.
                  </p>
                </div>
              </FadeInScroll>
              <FadeInScroll delay={400} className="lg:col-span-5">
                <div className="group w-full aspect-[4/5] bg-surface-container rounded-lg overflow-hidden cursor-pointer shadow-xl shadow-primary/5 border border-outline-variant/20">
                  <ParallaxImage
                    alt="Hands checking roasted coffee beans during roasting"
                    className="w-full h-full"
                    imageClassName="transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:brightness-110 group-hover:-rotate-1"
                    src="/story/rooted-in-craft.jpg"
                  />
                </div>
              </FadeInScroll>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center relative z-10">
              <FadeInScroll delay={200} className="order-2 lg:order-1 lg:col-span-5 lg:translate-y-12">
                <div className="group w-full aspect-[4/5] bg-surface-container rounded-lg overflow-hidden cursor-pointer shadow-xl shadow-primary/5 border border-outline-variant/20">
                  <ParallaxImage
                    alt="Coffee picker harvesting ripe cherries by hand"
                    className="w-full h-full"
                    imageClassName="transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:brightness-110 group-hover:rotate-1"
                    src="/story/sustainable-sourcing.jpg"
                  />
                </div>
              </FadeInScroll>
              <FadeInScroll delay={400} className="order-1 lg:order-2 lg:col-span-7">
                <div className="pl-0 lg:pl-8">
                  <div className="font-label-caps text-label-caps text-secondary tracking-wide mb-2 uppercase">02 — Sourcing</div>
                  <h3 className="font-headline-md text-headline-md text-primary mb-6">Sustainable Sourcing</h3>
                  <p className="font-body-lg text-body-lg text-on-surface-variant mb-4 max-w-lg leading-relaxed">
                    Our relationship with coffee producers goes beyond fair trade. We build long-term partnerships with
                    small-holder farms, paying premiums that directly impact the livelihoods of the farmers and their
                    communities.
                  </p>
                  <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg leading-relaxed">
                    By prioritizing sustainable farming practices and environmental stewardship, we ensure that our
                    passion for exceptional coffee also contributes to a healthier planet.
                  </p>
                </div>
              </FadeInScroll>
            </div>
          </div>
        </section>

        {/* Featured Roasts */}
        <section className="py-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto min-h-screen" id="shop">
          <FadeInScroll>
            <div className="text-center mb-16">
              <h2 className="font-headline-md text-headline-md text-primary mb-4">Featured Roasts</h2>
              <div className="w-12 h-px bg-outline-variant mx-auto"></div>
            </div>
          </FadeInScroll>
          
          {showAllCoffees && (
            <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 animate-in fade-in duration-500">
              {/* Filter Pills */}
              <div className="flex flex-wrap justify-center gap-3">
                {flavorCategories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`px-5 py-2 font-label-caps text-[12px] rounded-full transition-colors duration-300 ${activeFilter === cat
                      ? 'bg-primary text-on-primary'
                      : 'border border-outline-variant/30 text-primary hover:border-primary'
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Sort Toggle */}
              <div className="flex items-center gap-3">
                <span className="font-label-caps text-on-surface-variant text-xs tracking-widest uppercase">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent border border-outline-variant/30 text-primary font-body-md text-sm rounded-lg px-3 py-1.5 outline-none focus:border-primary transition-colors cursor-pointer"
                >
                  <option value="A-Z">A-Z</option>
                  <option value="Price">Price</option>
                  <option value="Roast Level">Roast Level</option>
                </select>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-12">
            {(showAllCoffees ? sortedProducts : sortedProducts.slice(0, 3)).map((product, idx) => (
              <div key={product.id} className="group flex flex-col bg-surface border border-outline-variant/20 rounded-lg overflow-hidden hover:shadow-xl hover:-translate-y-[2px] transition-all duration-300 ease-in-out cursor-pointer animate-in fade-in zoom-in-95 duration-500">
                <div onClick={() => setSelectedProduct(product)} className="flex flex-col flex-grow relative">
                  <div className="relative h-64 w-full bg-surface-container-low overflow-hidden rounded-t-lg group-hover:cursor-pointer" onClick={(e) => {
                    if (window.matchMedia('(hover: none)').matches) {
                      e.stopPropagation();
                      setExpandedDetailId(expandedDetailId === product.id ? null : product.id);
                    }
                  }}>
                    {idx === 0 && sortBy === "A-Z" && activeFilter === "All" && (
                      <div className="absolute top-4 left-4 z-20 bg-primary text-on-primary px-3 py-1 rounded-full font-label-caps text-[10px] shadow-sm pointer-events-none">
                        Best Seller
                      </div>
                    )}

                    <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-105">
                      <HoverImage
                        alt={product.name}
                        src={product.image}
                        className="object-cover"
                      />
                    </div>

                    {/* Interactive Overlay */}
                    <div className={`absolute bottom-0 left-0 right-0 bg-surface/95 backdrop-blur-md p-6 border-t border-white/10 transition-transform duration-300 z-10 ${expandedDetailId === product.id ? 'translate-y-0' : 'translate-y-full group-hover:translate-y-0'
                      }`}>
                      <h4 className="font-label-caps text-xs text-secondary mb-3 border-b border-outline-variant/20 pb-2">Roast Details</h4>
                      <div className="space-y-2 font-body-md text-sm text-on-surface">
                        <div className="flex justify-between"><span className="opacity-70">Altitude</span><span>{product.altitude}</span></div>
                        <div className="flex justify-between"><span className="opacity-70">Process</span><span>{product.process}</span></div>
                        <div className="flex justify-between mt-2 pt-2 border-t border-outline-variant/20"><span className="text-primary font-medium">{product.brewSuggestion}</span></div>
                      </div>
                    </div>
                  </div>

                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex justify-between items-start w-full mb-4">
                      <div className="flex flex-col items-start text-left">
                        <h3 className="font-headline-sm text-lg text-primary group-hover:text-secondary transition-colors duration-300">{product.name}</h3>
                        {/* Roast Level Indicator */}
                        <div className="flex items-center gap-1.5 mt-1.5" title={`Roast: ${product.roastLevel}`}>
                          {[1, 2, 3].map(level => (
                            <div key={level} className={`w-1.5 h-1.5 rounded-full ${(product.roastLevel === 'Light' && level <= 1) ||
                              (product.roastLevel === 'Medium' && level <= 2) ||
                              (product.roastLevel === 'Dark' && level <= 3)
                              ? 'bg-secondary' : 'bg-outline-variant/40'
                              }`} />
                          ))}
                          <span className="text-[10px] font-label-caps text-on-surface-variant uppercase ml-1">{product.roastLevel}</span>
                        </div>
                      </div>
                      <span className="font-headline-sm text-xl text-primary">${product.price}</span>
                    </div>

                    <div className="font-body-md text-on-surface-variant mb-6 line-clamp-2 min-h-[3rem] text-left w-full">
                      {product.shortDescription}
                    </div>
                    <div className="flex flex-wrap gap-2 justify-start mt-auto w-full">
                      {product.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-secondary/10 text-secondary font-label-caps text-[10px] rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="px-8 pb-8 pt-0 mt-auto">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      addToCart({ id: product.id, name: product.name, price: product.price, image: product.image });
                    }}
                    className="relative z-10 w-full py-3 border border-outline-variant/30 text-primary font-label-caps text-label-caps rounded hover:border-secondary hover:text-secondary transition-colors duration-300"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/shop" className="inline-flex items-center justify-center px-8 py-4 border border-outline-variant/50 text-primary font-label-caps rounded hover:bg-surface-variant transition-colors duration-300">
              View All Coffees
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Marquee Section */}
        <Marquee />

        {/* Subscribe & Save */}
        <CircleArcRevealSection>
          <section className="w-full px-margin-mobile md:px-margin-desktop" id="subscribe">
            <div className="max-w-container-max mx-auto">
              <div className="bg-primary text-on-primary rounded-lg p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden relative">

                <div className="md:w-1/2 z-10 relative">
                  <h2 className="font-headline-lg text-4xl md:text-5xl mb-6 tracking-tight">Subscribe & Save</h2>
                  <p className="font-body-lg text-lg text-on-primary/80 mb-8 max-w-md">
                    Join the Brewza Coffee Club. Get freshly roasted, artisanal beans delivered right to your door every week. Never run out of your favorite morning ritual.
                  </p>

                  {/* Selectors */}
                  <div className="mb-8 space-y-6">
                    <div>
                      <h4 className="font-label-caps text-xs text-on-primary/60 uppercase tracking-widest mb-3">Frequency</h4>
                      <div className="flex flex-wrap gap-2">
                        {["Every 2 weeks", "Every 4 weeks", "Every 6 weeks"].map((freq) => (
                          <button
                            key={freq}
                            onClick={() => setSubFrequency(freq)}
                            className={`px-4 py-2 rounded-full font-label-caps text-[11px] transition-colors duration-300 ${subFrequency === freq
                                ? 'bg-secondary text-primary'
                                : 'border border-outline-variant/30 text-on-primary hover:border-secondary hover:text-secondary'
                              }`}
                          >
                            {freq}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-label-caps text-xs text-on-primary/60 uppercase tracking-widest mb-3">Roast Selection</h4>
                      <div className="flex flex-wrap gap-2">
                        {["Roaster's Pick", "I'll choose each time"].map((roast) => (
                          <button
                            key={roast}
                            onClick={() => setSubRoast(roast)}
                            className={`px-4 py-2 rounded-full font-label-caps text-[11px] transition-colors duration-300 ${subRoast === roast
                                ? 'bg-secondary text-primary'
                                : 'border border-outline-variant/30 text-on-primary hover:border-secondary hover:text-secondary'
                              }`}
                          >
                            {roast}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8 text-on-primary/90 font-body-md">
                    <li className="flex items-center gap-3">
                      <PiggyBank className="w-6 h-6 text-secondary" />
                      Save 15% on every order <span className="opacity-60 line-through ml-1">$24.00</span> <span className="text-secondary ml-1">$20.40/bag</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Award className="w-6 h-6 text-secondary" />
                      Exclusive access to limited single-origins
                    </li>
                    <li className="flex items-center gap-3">
                      <PauseCircle className="w-6 h-6 text-secondary" />
                      Cancel or pause anytime
                    </li>
                  </ul>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      console.log("Subscription Configured:", { frequency: subFrequency, roast: subRoast });
                      setIsPlanModalOpen(true);
                    }}
                    className="pointer-events-auto px-8 py-4 bg-secondary text-primary font-label-caps text-label-caps rounded hover:bg-secondary-container transition-colors duration-300">
                    Build Your Plan
                  </button>
                </div>

                <div className="md:w-1/2 z-10 w-full">
                  <div className="group bg-surface/10 rounded-lg p-8 backdrop-blur-sm border border-white/10 hover:bg-surface/20 transition-colors duration-300 cursor-pointer text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <Rocket className="w-16 h-16 text-secondary mx-auto mb-4 block group-hover:scale-110 transition-transform duration-500" />
                    <h3 className="font-headline-sm text-2xl mb-2">Free Shipping on all subscriptions</h3>
                    <p className="font-body-md text-on-primary/70">Roasted on Monday, delivered fresh by Thursday.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </CircleArcRevealSection>
      </main>

      {/* Footer Component */}
      <footer
        className="w-full mt-auto bg-primary text-on-primary font-body-md"
        id="locations"
      >
        <div className="px-margin-mobile md:px-margin-desktop py-12 max-w-container-max mx-auto border-b border-on-primary/20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
              <h3 className="font-headline-sm text-2xl text-on-primary mb-2">Stay in the loop</h3>
              <p className="font-body-md text-on-primary/70">Roasting notes and new arrivals, no spam.</p>
            </div>
            <form className="flex w-full md:w-auto gap-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email address"
                className="w-full md:w-72 p-3 bg-transparent border border-on-primary/30 rounded focus:border-secondary outline-none font-body-md text-on-primary placeholder:text-on-primary/50 transition-colors"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-secondary text-primary font-label-caps rounded hover:bg-secondary-container transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop py-16 max-w-container-max mx-auto">
          <div className="flex flex-col space-y-4 md:col-span-2">
            <span className="font-headline-sm text-headline-sm text-on-primary">Brewza Coffee Roasters</span>
            <p className="text-on-primary/70 max-w-sm">
              Crafting focus and warmth in every batch. Artisan roasting for the discerning palate.
            </p>
            {/* TODO: Add real contact email */}
            <a href="mailto:hello@brewzacoffee.com" className="text-on-primary/70 hover:text-secondary transition-colors block mt-2">
              hello@brewzacoffee.com
            </a>
            <div className="flex items-center gap-4 mt-6">
              {/* TODO: Update with real social handle */}
              <a href="#" aria-label="Instagram" className="text-on-primary/70 hover:text-secondary transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              {/* TODO: Update with real social handle */}
              <a href="#" aria-label="Twitter" className="text-on-primary/70 hover:text-secondary transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
              {/* TODO: Update with real social handle */}
              <a href="#" aria-label="Facebook" className="text-on-primary/70 hover:text-secondary transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>
            <p className="text-on-primary/70 mt-8 opacity-75">© 2024 Brewza Coffee Roasters. Crafted with focus.</p>
          </div>
          <div className="flex flex-col space-y-3">
            <h4 className="font-label-caps text-label-caps text-on-primary tracking-wider mb-2">Support</h4>
            {/* TODO: Add real privacy policy URL */}
            <a className="text-on-primary/70 hover:text-secondary transition-colors" href="#">
              Privacy Policy
            </a>
            {/* TODO: Add real terms of service URL */}
            <a className="text-on-primary/70 hover:text-secondary transition-colors" href="#">
              Terms of Service
            </a>
            {/* TODO: Add real shipping & returns URL */}
            <a className="text-on-primary/70 hover:text-secondary transition-colors" href="#">
              Shipping & Returns
            </a>
          </div>
          <div className="flex flex-col space-y-3">
            <h4 className="font-label-caps text-label-caps text-on-primary tracking-wider mb-2">Connect</h4>
            {/* TODO: Add real wholesale info URL */}
            <a className="text-on-primary/70 hover:text-secondary transition-colors" href="#">
              Wholesale
            </a>
            {/* TODO: Add real contact us URL */}
            <a className="text-on-primary/70 hover:text-secondary transition-colors" href="#">
              Contact Us
            </a>
          </div>
        </div>
      </footer>

      <ProductModal
        product={selectedProduct}
        isOpen={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Build Your Plan Modal */}
      <div
        className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-300 ${isPlanModalOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
      >
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsPlanModalOpen(false)}
        />
        <div
          className={`relative w-full max-w-lg bg-surface text-on-surface p-8 rounded-2xl shadow-2xl transform transition-transform duration-300 ${isPlanModalOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'
            }`}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-headline-sm text-3xl text-primary">Build Your Plan</h2>
            <button
              onClick={() => setIsPlanModalOpen(false)}
              className="p-2 hover:bg-surface-variant rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block font-label-caps text-primary mb-2">Select Your Roast Preference</label>
              <div className="grid grid-cols-2 gap-3">
                <button className="py-3 border border-outline-variant/30 rounded hover:border-secondary transition-colors font-body-md">Light & Bright</button>
                <button className="py-3 border border-outline-variant/30 rounded hover:border-secondary transition-colors font-body-md">Dark & Bold</button>
              </div>
            </div>

            <div>
              <label className="block font-label-caps text-primary mb-2">Delivery Frequency</label>
              <select className="w-full p-3 bg-surface border border-outline-variant/30 rounded focus:border-secondary outline-none font-body-md">
                <option>Every 1 Week</option>
                <option>Every 2 Weeks</option>
                <option>Once a Month</option>
              </select>
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={() => setIsPlanModalOpen(false)}
              className="w-full py-4 bg-primary text-on-primary font-label-caps rounded hover:bg-primary/90 transition-colors shadow-md"
            >
              Start Subscription
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
