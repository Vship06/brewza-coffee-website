"use client";

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
  return (
    <>

      <main className="flex-grow">
        <ScrollHero />

        {/* Our Story Section */}
        <section className="py-24 px-margin-mobile md:px-margin-desktop bg-surface-container-low" id="story">
          <div className="max-w-container-max mx-auto">
            <FadeInScroll>
              <div className="text-center mb-16">
                <h2 className="font-headline-md text-headline-md text-primary mb-4">Our Story</h2>
                <div className="w-12 h-px bg-outline-variant mx-auto"></div>
              </div>
            </FadeInScroll>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
              <FadeInScroll delay={200}>
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-primary mb-6">Rooted in Craft</h3>
                  <p className="font-body-lg text-body-lg text-on-surface-variant mb-4">
                    Every great cup begins with an unwavering commitment to quality. At Brewza Coffee Roasters, we approach
                    roasting not just as a science, but as an art form. Our process is deliberate, focusing on bringing
                    out the unique characteristics of each origin.
                  </p>
                  <p className="font-body-lg text-body-lg text-on-surface-variant">
                    We source meticulously, roast precisely, and cup obsessively to ensure that the coffee that makes it
                    to your cup represents the absolute pinnacle of flavor.
                  </p>
                </div>
              </FadeInScroll>
              <FadeInScroll delay={400}>
                <div className="group h-96 bg-surface-container rounded-lg overflow-hidden cursor-pointer">
                  <ParallaxImage
                    alt="Roasting process"
                    imageClassName="transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:brightness-110 group-hover:-rotate-1"
                    src="/rooted_in_craft.jpg"
                  />
                </div>
              </FadeInScroll>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <FadeInScroll delay={200}>
                <div className="group h-96 bg-surface-container rounded-lg overflow-hidden order-2 md:order-1 cursor-pointer">
                  <ParallaxImage
                    alt="Coffee farm"
                    imageClassName="transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:brightness-110 group-hover:rotate-1"
                    // TODO: The actual coffee-farm.jpg image still needs to be added to /public
                    src="/coffee-farm.jpg"
                  />
                </div>
              </FadeInScroll>
              <FadeInScroll delay={400}>
                <div className="order-1 md:order-2">
                  <h3 className="font-headline-sm text-headline-sm text-primary mb-6">Sustainable Sourcing</h3>
                  <p className="font-body-lg text-body-lg text-on-surface-variant mb-4">
                    Our relationship with coffee producers goes beyond fair trade. We build long-term partnerships with
                    small-holder farms, paying premiums that directly impact the livelihoods of the farmers and their
                    communities.
                  </p>
                  <p className="font-body-lg text-body-lg text-on-surface-variant">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-12">
            {products.slice(0, 3).map((product, idx) => (
              <FadeInScroll key={product.id} delay={200 + (idx * 200)} className="group flex flex-col bg-surface border border-outline-variant/20 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 ease-in-out cursor-pointer">
                <div onClick={() => setSelectedProduct(product)} className="flex flex-col flex-grow">
                  <div className="relative h-64 w-full bg-surface-container-low overflow-hidden">
                    <HoverImage
                      alt={product.name}
                      src={product.image}
                      className="object-cover"
                    />
                  </div>
                  <div className="p-8 flex flex-col flex-grow items-center text-center">
                    <h3 className="font-headline-sm text-headline-sm text-primary mb-2 group-hover:text-secondary transition-colors duration-300">{product.name}</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant mb-6 line-clamp-2">
                      {product.shortDescription}
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center mb-6 mt-auto">
                      {product.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-secondary/10 text-secondary font-label-caps text-label-caps rounded-full">
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
                    Add to Cart - ${product.price}
                  </button>
                </div>
              </FadeInScroll>
            ))}
          </div>
          <div className="text-center">
            <Link href="/shop" className="inline-flex items-center justify-center px-8 py-4 border border-outline-variant/50 text-primary font-label-caps rounded hover:bg-surface-variant transition-colors duration-300">
              View All Coffees
              <span className="material-icons-outlined ml-2 text-sm">arrow_forward</span>
            </Link>
          </div>
        </section>

        {/* Subscribe & Save */}
        <CircleArcRevealSection>
          <section className="w-full px-margin-mobile md:px-margin-desktop" id="subscribe">
            <div className="max-w-container-max mx-auto">
              <div className="bg-primary text-on-primary rounded-2xl p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden relative">
                {/* Decorative background circle */}
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 bg-white/5 rounded-full pointer-events-none blur-3xl"></div>
                
                <div className="md:w-1/2 z-10 relative">
                  <h2 className="font-headline-lg text-4xl md:text-5xl mb-6 tracking-tight">Subscribe & Save</h2>
                  <p className="font-body-lg text-lg text-on-primary/80 mb-8 max-w-md">
                    Join the Brewza Coffee Club. Get freshly roasted, artisanal beans delivered right to your door every week. Never run out of your favorite morning ritual.
                  </p>
                  <ul className="space-y-4 mb-8 text-on-primary/90 font-body-md">
                    <li className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-secondary">savings</span>
                      Save 15% on every order
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-secondary">workspace_premium</span>
                      Exclusive access to limited single-origins
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-secondary">pause_circle</span>
                      Cancel or pause anytime
                    </li>
                  </ul>
                  <button 
                    onClick={(e) => { e.preventDefault(); setIsPlanModalOpen(true); }}
                    className="pointer-events-auto px-8 py-4 bg-secondary text-primary font-label-caps text-label-caps rounded hover:bg-secondary-container transition-colors duration-300">
                    Build Your Plan
                  </button>
                </div>
                
                <div className="md:w-1/2 z-10 w-full">
                  <div className="group bg-surface/10 rounded-xl p-8 backdrop-blur-sm border border-white/10 hover:bg-surface/20 transition-colors duration-300 cursor-pointer text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <span className="material-symbols-outlined text-6xl text-secondary mb-4 block group-hover:scale-110 transition-transform duration-500">rocket_launch</span>
                    <h3 className="font-headline-sm text-2xl mb-2">Free Shipping on all subscriptions</h3>
                    <p className="font-body-md text-on-primary/70">Roasted on Monday, delivered fresh by Thursday.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </CircleArcRevealSection>

        {/* Marquee Section */}
        <Marquee />
      </main>

      {/* Footer Component */}
      {/* TODO: Update footer href destinations with real URLs before launch */}
      <footer
        className="w-full mt-auto bg-surface-container text-primary font-body-md transition-opacity duration-300 opacity-90 hover:opacity-100"
        id="locations"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop py-16 max-w-container-max mx-auto">
          <div className="flex flex-col space-y-4 md:col-span-2">
            <span className="font-headline-sm text-headline-sm text-primary">Brewza Coffee Roasters</span>
            <p className="text-on-surface-variant max-w-sm">
              Crafting focus and warmth in every batch. Artisan roasting for the discerning palate.
            </p>
            <p className="text-on-surface-variant mt-4 opacity-75">© 2024 Brewza Coffee Roasters. Crafted with focus.</p>
          </div>
          <div className="flex flex-col space-y-3">
            <h4 className="font-label-caps text-label-caps text-primary tracking-wider mb-2">Support</h4>
            <a className="text-on-surface-variant hover:text-secondary transition-colors" href="#">
              Privacy Policy
            </a>
            <a className="text-on-surface-variant hover:text-secondary transition-colors" href="#">
              Terms of Service
            </a>
            <a className="text-on-surface-variant hover:text-secondary transition-colors" href="#">
              Shipping & Returns
            </a>
          </div>
          <div className="flex flex-col space-y-3">
            <h4 className="font-label-caps text-label-caps text-primary tracking-wider mb-2">Connect</h4>
            <a className="text-on-surface-variant hover:text-secondary transition-colors" href="#">
              Wholesale
            </a>
            <a className="text-on-surface-variant hover:text-secondary transition-colors" href="#">
              Instagram
            </a>
            <a className="text-on-surface-variant hover:text-secondary transition-colors" href="#">
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
        className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-300 ${
          isPlanModalOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsPlanModalOpen(false)}
        />
        <div 
          className={`relative w-full max-w-lg bg-surface text-on-surface p-8 rounded-2xl shadow-2xl transform transition-transform duration-300 ${
            isPlanModalOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'
          }`}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-headline-sm text-3xl text-primary">Build Your Plan</h2>
            <button 
              onClick={() => setIsPlanModalOpen(false)}
              className="p-2 hover:bg-surface-variant rounded-full transition-colors"
            >
              <span className="material-icons-outlined">close</span>
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
              className="w-full py-4 bg-primary text-on-primary font-label-caps rounded-lg hover:bg-primary/90 transition-colors shadow-md"
            >
              Start Subscription
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
