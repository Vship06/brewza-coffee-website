"use client";

import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { cartCount, toggleCart, isCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      const heroEl = document.getElementById('hero-section');
      if (heroEl) {
        const heroBottom = heroEl.getBoundingClientRect().bottom;
        setIsScrolled(heroBottom <= 0);
      } else {
        if (window.scrollY > 50) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check immediately on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for active section highlighting
  useEffect(() => {
    const intersectingSections = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        let hasChanges = false;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            intersectingSections.add(entry.target.id);
            hasChanges = true;
          } else {
            if (intersectingSections.has(entry.target.id)) {
              intersectingSections.delete(entry.target.id);
              hasChanges = true;
            }
          }
        });

        if (hasChanges) {
          if (intersectingSections.size === 0) {
            setActiveSection('');
          } else {
            const sectionsOrder = ['story', 'shop', 'subscribe'];
            for (const section of sectionsOrder) {
              if (intersectingSections.has(section)) {
                setActiveSection(section);
                break;
              }
            }
          }
        }
      },
      { rootMargin: '-40% 0px -40% 0px' }
    );

    const sections = ['story', 'shop', 'subscribe'];
    sections.forEach((section) => {
      const el = document.getElementById(section);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Close mobile menu if cart opens
  useEffect(() => {
    if (isCartOpen && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [isCartOpen, isMobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else if (!isCartOpen) {
      document.body.style.overflow = 'unset';
    }
    return () => {
      if (!isCartOpen) {
        document.body.style.overflow = 'unset';
      }
    };
  }, [isMobileMenuOpen, isCartOpen]);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { href: '#story', label: 'Story', id: 'story' },
    { href: '#shop', label: 'Shop', id: 'shop' },
    { href: '#subscribe', label: 'Subscribe', id: 'subscribe' },
  ];

  const getPillLinkClass = (id: string) => {
    const isActive = activeSection === id;
    if (isScrolled) {
      return isActive ? 'bg-primary text-on-primary' : 'hover:bg-primary hover:text-on-primary text-on-surface-variant';
    } else {
      return isActive ? 'bg-white text-primary' : 'hover:bg-white hover:text-primary text-white/90';
    }
  };

  const getPillContainerClass = () => {
    return `items-center rounded-full p-1.5 transition-all duration-300 backdrop-blur-md border pointer-events-auto shadow-sm ${
      isScrolled 
        ? 'bg-surface/70 border-outline-variant/30 text-on-surface-variant' 
        : 'bg-white/10 border-white/20 text-white drop-shadow-sm'
    }`;
  };

  const getIconButtonClass = () => {
    return `relative p-2 rounded-full transition-colors duration-300 flex items-center justify-center ${
      isScrolled
        ? 'hover:bg-primary hover:text-on-primary text-on-surface-variant'
        : 'hover:bg-white hover:text-primary text-white/90'
    }`;
  };

  const cartButton = (
    <button 
      onClick={toggleCart}
      className={getIconButtonClass()}
      aria-label="Open cart"
    >
      <span className="material-icons-outlined text-xl">shopping_bag</span>
      {cartCount > 0 && (
        <span className="absolute top-0 right-0 w-5 h-5 bg-secondary text-white text-xs font-bold flex items-center justify-center rounded-full transform translate-x-1/4 -translate-y-1/4 shadow-sm border-2 border-transparent">
          {cartCount}
        </span>
      )}
    </button>
  );

  const mobileMenuToggle = (
    <button
      onClick={handleMobileMenuToggle}
      className={getIconButtonClass()}
      aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
    >
      <span className="material-icons-outlined text-xl">
        {isMobileMenuOpen ? 'close' : 'menu'}
      </span>
    </button>
  );

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 pt-6 pb-4 pointer-events-none`}
    >
      {/* Mobile Menu Overlay */}
      <div 
        className={`md:hidden fixed inset-0 transition-all duration-300 pointer-events-auto ${
          isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        } ${
          isScrolled ? 'bg-surface/95 backdrop-blur-md' : 'bg-black/80 backdrop-blur-md'
        }`}
        style={{ zIndex: 45 }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`font-headline-md text-4xl tracking-tight transition-colors duration-300 ${
                activeSection === link.id 
                  ? (isScrolled ? 'text-primary' : 'text-white') 
                  : (isScrolled ? 'text-on-surface-variant' : 'text-white/70')
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex justify-between items-center relative z-50">
        {/* Logo / Brand Name */}
        <a 
          href="#" 
          className={`pointer-events-auto font-headline-md text-2xl md:text-3xl tracking-tight transition-all duration-300 ${
            isScrolled && !isMobileMenuOpen 
              ? 'opacity-0 -translate-y-2 pointer-events-none' 
              : 'opacity-100 translate-y-0'
          } ${
            isMobileMenuOpen ? 'text-primary' : 'text-white drop-shadow-md'
          }`}
        >
          Brewza.
        </a>

        {/* Navigation Links (Desktop) */}
        <nav className={`hidden md:flex ${getPillContainerClass()}`}>
          {navLinks.map((link) => (
            <a 
              key={link.id}
              href={link.href} 
              className={`font-label-caps text-label-caps uppercase tracking-wider transition-colors duration-300 px-6 py-2.5 rounded-full ${getPillLinkClass(link.id)}`}
            >
              {link.label}
            </a>
          ))}
          <div className="w-px h-5 bg-current opacity-20 mx-1"></div>
          {cartButton}
        </nav>

        {/* Actions (Mobile) */}
        <div className={`flex md:hidden ${getPillContainerClass()}`}>
          {cartButton}
          <div className="w-px h-5 bg-current opacity-20 mx-1"></div>
          {mobileMenuToggle}
        </div>
      </div>
    </header>
  );
}
