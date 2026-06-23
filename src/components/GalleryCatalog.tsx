import React, { useState } from 'react';
import { ShoppingCart, Sparkles, Filter, Heart, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ProductPreset, CustomMagnet } from '../types';
import { PRODUCT_PRESETS, CATEGORIES } from '../data';

interface GalleryCatalogProps {
  onSelectPresetForCustomisation: (preset: { image: string; caption?: string }) => void;
  onQuickAdd: (magnet: CustomMagnet) => void;
}

export default function GalleryCatalog({
  onSelectPresetForCustomisation,
  onQuickAdd,
}: GalleryCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  const filteredPresets = selectedCategory === 'all'
    ? PRODUCT_PRESETS
    : PRODUCT_PRESETS.filter((p) => p.category === selectedCategory);

  const handleQuickAddClick = (preset: ProductPreset, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering card click
    
    // Construct standard custom magnet configuration
    const standardMagnet: CustomMagnet = {
      id: `preset-${preset.id}-${Date.now()}-${Math.floor(Math.random() * 1000000)}`,
      imageSrc: preset.image,
      type: preset.id.includes('p3') || preset.id.includes('p4') ? 'classic-square' : 'polaroid',
      caption: preset.defaultCaption || 'Sweet Memories',
      hasStand: false,
      size: '3x3',
      quantity: 1,
      price: preset.price,
    };
    onQuickAdd(standardMagnet);
  };

  return (
    <section id="gallery" className="py-24 px-4 bg-transparent border-t border-[#F2EFE9]">
      <div className="max-w-7xl mx-auto">
        
        {/* Title & Introduction */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[#D27D6B] text-sm font-semibold tracking-widest uppercase block mb-3">
            🎁 Our Curated Showcase
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#2D2D2D]">
            Personalised Gifts for Every Occasion
          </h2>
          <p className="text-gray-650 mt-2 text-sm sm:text-base font-light">
            Choose a preset collection design below to instantly quick-add, or tap "Personalise This 🪄" to custom-caption or add tabletop stands in our studio.
          </p>
        </div>

        {/* Categories Tab Bar Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12" id="category-filter-nav">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#D27D6B] text-white shadow-md shadow-[#D27D6B]/15'
                  : 'bg-white text-[#3D3D3D] border border-[#F2EFE9] hover:bg-[#FAF9F6] hover:border-gray-400'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Products Dynamic Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredPresets.map((preset) => (
              <motion.div
                key={preset.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative bg-white rounded-3xl overflow-hidden border border-[#F2EFE9] shadow-xs hover:shadow-md hover:-translate-y-1 transition-all flex flex-col justify-between"
                onMouseEnter={() => setHoveredCardId(preset.id)}
                onMouseLeave={() => setHoveredCardId(null)}
              >
                
                {/* Image Wrap & Badge indicators */}
                <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
                  <img
                    src={preset.image}
                    alt={preset.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Acrylic Gloss overlay shine simulation */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/40 pointer-events-none"></div>

                  {preset.badge && (
                    <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-[#D27D6B] text-[10px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-full shadow-xs border border-[#F2EFE9]">
                      {preset.badge}
                    </span>
                  )}

                  {/* Hot Spot Overlay Actions (on Desktop Hover only) */}
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button
                      onClick={() =>
                        onSelectPresetForCustomisation({
                          image: preset.image,
                          caption: preset.defaultCaption,
                        })
                      }
                      className="px-5 py-2.5 rounded-full bg-white text-[#2D2D2D] text-xs font-semibold hover:bg-[#FAF9F6] hover:text-[#D27D6B] transition-all shadow-md flex items-center gap-1 cursor-pointer"
                    >
                      Personalise This 🪄
                    </button>
                  </div>
                </div>

                {/* Info Text Footer */}
                <div className="p-6 text-left flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#2D2D2D] group-hover:text-[#D27D6B] transition-colors leading-snug">
                      {preset.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1.5 line-clamp-2 leading-relaxed">
                      {preset.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gray-400 block uppercase font-semibold tracking-wider">
                        Price
                      </span>
                      <span className="text-xl font-bold text-[#2D2D2D]">
                        ${preset.price.toFixed(2)}
                      </span>
                    </div>

                    {/* Interactive Add Actions */}
                    <div className="flex gap-2">
                      {/* Personalize Button (Visible on all sizes, crucial on mobile because they don't hover!) */}
                      <button
                        onClick={() =>
                          onSelectPresetForCustomisation({
                            image: preset.image,
                            caption: preset.defaultCaption,
                          })
                        }
                        className="sm:hidden px-3.5 py-2 rounded-xl bg-[#D27D6B]/10 text-[#D27D6B] hover:bg-[#D27D6B] hover:text-white text-xs font-semibold transition-all border border-[#D27D6B]/20 flex items-center gap-1 cursor-pointer"
                        aria-label="Customize Preset"
                      >
                        Personalise 🪄
                      </button>

                      {/* Quick Add Button */}
                      <button
                        onClick={(e) => handleQuickAddClick(preset, e)}
                        className="py-2.5 px-3.5 rounded-xl bg-[#D27D6B] text-white hover:bg-opacity-95 hover:shadow-md transition-all flex items-center gap-1.5 hover:scale-105 cursor-pointer font-medium"
                        title="Quick Add 3x3 Magnet to cart"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span className="text-xs">Quick Add</span>
                      </button>
                    </div>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
