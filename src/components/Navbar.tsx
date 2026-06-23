import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  onNavigateToSection: (sectionId: string) => void;
  activeSection: string;
}

export default function Navbar({
  cartCount,
  onCartClick,
  onNavigateToSection,
  activeSection,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'designer', label: 'Create Magnet ⚡' },
    { id: 'gallery', label: 'Shop Best Sellers' },
    { id: 'playground', label: 'Virtual Fridge 🧊' },
    { id: 'faqs', label: 'FAQs & Love' },
  ];

  const handleItemClick = (id: string) => {
    setIsOpen(false);
    onNavigateToSection(id);
  };

  return (
    <nav
      id="nav-container"
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/60 backdrop-blur-xl border-b border-white/35 shadow-md shadow-[#D27D6B]/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Brand Title */}
          <div
            onClick={() => handleItemClick('hero')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            {/* Elegant Square Logo from Professional Polish design */}
            <div className="w-8 h-8 bg-[#D27D6B] rounded-md shadow-sm flex items-center justify-center transition-transform group-hover:scale-105">
              <span className="text-white font-bold font-sans text-sm">M</span>
            </div>
            
            <div className="flex flex-col justify-center">
              <span className="text-xl font-serif font-bold tracking-tight text-[#2D2D2D] group-hover:text-[#D27D6B] transition-colors">
                magnetify<span className="text-[#D27D6B]">.moments</span>
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleItemClick(item.id)}
                className={`text-sm font-medium tracking-wide transition-all duration-200 relative py-1 ${
                  activeSection === item.id || (item.id === 'hero' && activeSection === '')
                    ? 'text-[#D27D6B]'
                    : 'text-[#3D3D3D] hover:text-[#D27D6B]'
                }`}
              >
                {item.label}
                {(activeSection === item.id || (item.id === 'hero' && activeSection === '')) && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D27D6B] rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Actions: Cart & Mobile Menu Button */}
          <div className="flex items-center gap-4">
            {/* Custom interactive cart toggler */}
            <button
              id="cart-trigger-btn"
              onClick={onCartClick}
              className="relative p-2.5 rounded-full border border-[#F2EFE9] bg-white text-[#3D3D3D] hover:text-[#D27D6B] hover:border-[#D27D6B] hover:shadow-xs transition-all flex items-center justify-center group"
              aria-label="Toggle Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 bg-[#D27D6B] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2.5 rounded-full border border-[#F2EFE9] bg-white text-[#3D3D3D] hover:bg-[#FAF9F6] transition-all"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#FAF9F6] border-b border-[#F2EFE9] shadow-lg overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all ${
                    activeSection === item.id
                      ? 'bg-[#D27D6B]/10 text-[#D27D6B]'
                      : 'text-[#3D3D3D] hover:bg-[#F2EFE9]/60'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
