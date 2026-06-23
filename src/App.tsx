import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import InteractiveDesigner from './components/InteractiveDesigner';
import GalleryCatalog from './components/GalleryCatalog';
import HowItWorks from './components/HowItWorks';
import VirtualFridge from './components/VirtualFridge';
import FAQAndContact from './components/FAQAndContact';
import CartDrawer from './components/CartDrawer';
import { CustomMagnet, CartItem } from './types';
import SilkWaves from './components/SilkWaves';
import { Sparkles, Heart, Gift, Mail, ArrowUpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // Cart state with localStorage safe keeping
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('magnetify_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [cartOpen, setCartOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Communication bridge to pass preset selected image to designer dynamically
  const [selectedPreset, setSelectedPreset] = useState<{
    image: string;
    caption?: string;
  } | null>(null);

  useEffect(() => {
    localStorage.setItem('magnetify_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);

      // Simple intersection observer emulation for top navbar highlights
      const sections = ['hero', 'designer', 'gallery', 'playground', 'faqs'];
      let currentSection = '';

      for (const sect of sections) {
        const el = document.getElementById(sect);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            currentSection = sect;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAddToCart = (newMagnet: CustomMagnet) => {
    setCartItems((prev) => {
      // Look for identical configurations (same source, type, caption, size, stand)
      const matchesIdx = prev.findIndex(
        (item) =>
          item.magnet.imageSrc === newMagnet.imageSrc &&
          item.magnet.type === newMagnet.type &&
          item.magnet.caption === newMagnet.caption &&
          item.magnet.size === newMagnet.size &&
          item.magnet.hasStand === newMagnet.hasStand
      );

      if (matchesIdx > -1) {
        const updated = [...prev];
        updated[matchesIdx].quantity += newMagnet.quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            id: `cart-item-${Date.now()}-${Math.floor(Math.random() * 1000000)}`,
            magnet: newMagnet,
            quantity: newMagnet.quantity,
          },
        ];
      }
    });

    // Auto open the drawer with smooth celebration!
    setCartOpen(true);
  };

  const handleUpdateQty = (itemId: string, newQty: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleScrollToSection = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectPresetForCustomisation = (preset: { image: string; caption?: string }) => {
    setSelectedPreset(preset);
    // Scroll automatically down to designer
    setTimeout(() => {
      handleScrollToSection('designer');
    }, 100);
  };

  const totalCartUnits = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div id="magnetify-app-root" className="min-h-screen flex flex-col justify-between bg-transparent selection:bg-[#D27D6B]/20 selection:text-[#D27D6B]">
      
      {/* Luxury animated pinkish fabric silk waves motion graphics flowing globally in the background */}
      <SilkWaves />

      {/* 1. Header & Navigation */}
      <Navbar
        cartCount={totalCartUnits}
        onCartClick={() => setCartOpen(true)}
        onNavigateToSection={handleScrollToSection}
        activeSection={activeSection}
      />

      {/* 2. Main Sections */}
      <main className="flex-grow">
        
        {/* HERO HEADER SECTION */}
        <div id="hero">
          <Hero
            onStartDesigning={() => handleScrollToSection('designer')}
            onExploreGallery={() => handleScrollToSection('gallery')}
          />
        </div>

        {/* INTERACTIVE 3D CONFIGURATOR CONTAINER */}
        <InteractiveDesigner
          onAddCustomMagnetToCart={handleAddToCart}
          initialPreset={selectedPreset}
        />

        {/* PRESET GALLERY & CATALOG */}
        <GalleryCatalog
          onSelectPresetForCustomisation={handleSelectPresetForCustomisation}
          onQuickAdd={handleAddToCart}
        />

        {/* FRIDGE PLAYROOM PREVIEW */}
        <VirtualFridge
          customMagnetsInStore={cartItems.map((item) => item.magnet)}
          onSelectProductForCustomise={(src) => handleSelectPresetForCustomisation({ image: src })}
        />

        {/* PROCESS FLOW TIMELINE */}
        <HowItWorks />

        {/* REVIEWS, FAQS & CONTRACT BATCH */}
        <FAQAndContact />

      </main>

      {/* 3. Shopping Drawer overlay panel */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* 4. Elegant Brand Footer */}
      <footer className="bg-white text-[#3D3D3D] border-t border-[#D27D6B]/15 py-16 px-6 relative overflow-hidden text-left font-sans">
        
        {/* Soft background glow mimicking warmth */}
        <div className="absolute right-[-10%] bottom-[-10%] w-96 h-96 rounded-full bg-[#D27D6B]/5 filter blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          
          {/* Logo brand and slogan column info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-[#D27D6B] rounded-md shadow-sm flex items-center justify-center">
                <Heart className="w-4 h-4 text-white fill-white" />
              </div>
              <span className="text-xl font-serif font-bold tracking-tight text-[#2D2D2D]">
                magnetify<span className="text-[#D27D6B]">.moments</span>
              </span>
            </div>
            <p className="text-xs text-[#6B6B6B] leading-relaxed max-w-sm font-light">
              Turning Memories into Magnets ❤️ Personalised premium high-gloss acrylic rectangular polaroids & square magnetic tiles tailored for couples, kids, family, and pets. Perfect keepsakes to enrich any magnetic canvas.
            </p>
            <p className="text-[10px] text-[#D27D6B] font-bold tracking-widest uppercase">
              📷 Couple | Baby | Family Magnets
            </p>
          </div>

          {/* Nav links shortcuts */}
          <div className="md:col-span-3 space-y-3.5">
            <h5 className="text-[#2D2D2D] text-xs font-bold uppercase tracking-widest">
              Quick Navigation
            </h5>
            <ul className="text-xs text-[#6B6B6B] space-y-2">
              <li>
                <button onClick={() => handleScrollToSection('hero')} className="hover:text-[#D27D6B] transition">
                  Welcome Canvas
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollToSection('designer')} className="hover:text-[#D27D6B] transition">
                  3D Custom Studio
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollToSection('gallery')} className="hover:text-[#D27D6B] transition">
                  Best Selling Gifts
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollToSection('playground')} className="hover:text-[#D27D6B] transition">
                  Virtual Refrigerator Playroom
                </button>
              </li>
            </ul>
          </div>

          {/* Handcraft assurances */}
          <div className="md:col-span-4 space-y-3.5">
            <h5 className="text-[#2D2D2D] text-xs font-bold uppercase tracking-widest">
              Our Material Assurance
            </h5>
            <p className="text-xs text-[#6B6B6B] leading-relaxed font-light">
              Every magnet is coated with 3mm optical distortion-free clear shatterproof acrylic resin, layered with heavy industrial-grade magnets, and polished with high precision. Handmade with love for Siri Jain's signature collections.
            </p>
            <div className="flex gap-2">
              <span className="text-[10px] px-2.5 py-1 rounded-md bg-[#FAF9F6] text-[#6B6B6B] border border-[#F2EFE9] font-mono">
                🇮🇳 Handmade with Care
              </span>
              <span className="text-[10px] px-2.5 py-1 rounded-md bg-[#FAF9F6] text-[#6B6B6B] border border-[#F2EFE9] font-mono">
                ✨ Clear Gloss Acrylic
              </span>
            </div>
          </div>

        </div>

        {/* Divider & Copyright */}
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-[#F2EFE9] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p className="text-[#A1A1A1]">© 2026 magnetify.moments by Siri Jain. All rights reserved.</p>
          <div className="flex gap-4 text-[#6B6B6B]">
            <span className="hover:text-[#D27D6B] cursor-pointer">Instagram</span>
            <span>•</span>
            <span className="hover:text-[#D27D6B] cursor-pointer">Pinterest</span>
            <span>•</span>
            <span className="hover:text-[#D27D6B] cursor-pointer">Support Terms</span>
          </div>
        </div>

      </footer>

      {/* 5. Micro-Interactions: Back to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 left-6 z-40 p-2.5 rounded-full bg-[#D27D6B] text-white hover:bg-opacity-90 shadow-lg hover:scale-110 active:scale-95 transition-all"
            title="Scroll to Top"
            aria-label="Scroll back to top"
          >
            <ArrowUpCircle className="w-5 h-5 animate-bounce" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
