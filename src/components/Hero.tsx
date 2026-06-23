import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Image as ImageIcon, Heart, Gift, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onStartDesigning: () => void;
  onExploreGallery: () => void;
}

export default function Hero({ onStartDesigning, onExploreGallery }: HeroProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 768px)');
    setIsMobile(media.matches);
    const listener = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);
  // Decorative sample photos for floating acrylic magnets
  const samples = [
    {
      url: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=300',
      caption: 'Best Boy 🐾',
      rotation: -6,
      x: -40,
      y: -20,
      type: 'polaroid',
    },
    {
      url: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=300',
      caption: 'Little Miracle 🍼',
      rotation: 8,
      x: 70,
      y: 10,
      type: 'polaroid',
    },
    {
      url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80&w=300',
      caption: 'You & Me Sempre ❤️',
      rotation: -12,
      x: -10,
      y: 110,
      type: 'classic-square',
    },
  ];

  return (
    <section
      id="hero-section"
      className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden bg-transparent"
    >

      {/* Background soft pastel watercolor shapes inspired by logo */}
      <div className="absolute top-1/4 right-[5%] w-[40vw] h-[40vw] max-w-lg rounded-full bg-gradient-to-tr from-[#FAF9F6] via-[#D27D6B]/5 to-[#D27D6B]/10 opacity-70 filter blur-3xl -z-10 pointer-events-none"></div>
      <div className="absolute bottom-10 left-[10%] w-[35vw] h-[35vw] max-w-md rounded-full bg-gradient-to-br from-[#FAF9F6] to-[#F2EFE9] opacity-60 filter blur-3xl -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side: Copy and Mottos */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-6 text-left">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D27D6B]/10 border border-[#D27D6B]/20 text-[#D27D6B] text-xs font-semibold uppercase tracking-wider"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Preserving Love on Acrylic</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-serif leading-tight font-medium text-[#2D2D2D]"
          >
            Turning Memories into{' '}
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#D27D6B] to-[#2D2D2D] pb-1">
              Magnets <span className="text-[#D27D6B]">❤️</span>
              {/* Artistic scribble highlight */}
              <span className="absolute left-0 bottom-0 w-full h-[6px] bg-[#D27D6B]/15 rounded-full -rotate-1 opacity-60"></span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-gray-650 max-w-xl font-light leading-relaxed italic"
          >
            "Preserve your most cherished moments in a format that stays close. High-quality, custom magnets for every story."
          </motion.p>

          {/* Mottos Icons list based on prompt details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg mt-2"
          >
            <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-[#F2EFE9] shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#FAF9F6] flex items-center justify-center text-[#D27D6B]">
                <Heart className="w-5 h-5 fill-current" />
              </div>
              <div className="text-left">
                <span className="text-sm font-bold block text-[#2D2D2D]">
                  📷 Handcrafted Magnets
                </span>
                <span className="text-xs text-gray-500">Couple • Baby • Family • Pets</span>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-[#F2EFE9] shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#FAF9F6] flex items-center justify-center text-[#D27D6B]">
                <Gift className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="text-sm font-bold block text-[#2D2D2D]">
                  🎁 Personalised Gifts
                </span>
                <span className="text-xs text-gray-500">Elegant Premium Keepsakes</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4"
          >
            <button
              id="cta-design-now"
              onClick={onStartDesigning}
              className="px-8 py-4 rounded-full bg-[#D27D6B] text-white font-semibold shadow-lg shadow-[#D27D6B]/20 hover:bg-opacity-95 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 uppercase text-xs tracking-widest"
            >
              Start Personalising Now
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              id="cta-explore-bestsellers"
              onClick={onExploreGallery}
              className="px-8 py-4 rounded-full bg-white text-[#2D2D2D] font-semibold border border-[#2D2D2D] hover:bg-[#FAF9F6]/50 transition-all flex items-center justify-center gap-2 uppercase text-xs tracking-widest"
            >
              Browse Best Sellers
              <ImageIcon className="w-4 h-4 text-[#2D2D2D]" />
            </button>
          </motion.div>

          {/* Quick trust assurances */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex items-center gap-4 text-xs text-gray-500 pt-2"
          >
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>3mm Shatterproof Acrylic</span>
            </div>
            <span>•</span>
            <div>Strong Magnetic Backing</div>
            <span>•</span>
            <div>Fast, Custom Dispatch</div>
          </motion.div>
        </div>

        {/* Right Side: Beautiful Interactive Visual Display */}
        <div className="lg:col-span-5 relative h-[420px] sm:h-[480px] lg:h-full w-full flex items-center justify-center mt-6 lg:mt-0">
          {/* Subtle realistic display frame in background representing luxurious soft linen back fabric */}
          <div className="absolute inset-x-4 inset-y-4 rounded-3xl bg-[#E5E1D8] border-4 border-[#FAF9F6] shadow-inner flex items-center justify-center overflow-hidden">
            {/* Soft weave texture simulation */}
            <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]"></div>
            <p className="absolute bottom-4 left-4 text-[10px] font-mono uppercase tracking-widest text-[#6B6B6B]">
              Interactive Linen Canvas
            </p>
          </div>

          {/* Floating and Layered Realistic Acrylic Magnets */}
          <div className="relative w-full h-full flex items-center justify-center">
            {samples.map((sample, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: sample.rotation,
                  x: sample.x,
                  y: sample.y,
                }}
                transition={isMobile ? { type: 'tween', duration: 0.2, delay: 0.1 * idx } : {
                  type: 'spring',
                  stiffness: 70,
                  damping: 15,
                  delay: 0.2 + idx * 0.15,
                }}
                whileHover={isMobile ? undefined : {
                  scale: 1.08,
                  rotate: sample.rotation + (idx % 2 === 0 ? 3 : -3),
                  zIndex: 30,
                  transition: { duration: 0.2 },
                }}
                className={`absolute w-36 sm:w-44 bg-white p-2.5 rounded-sm shadow-[5px_5px_15px_rgba(0,0,0,0.08)] cursor-grab active:cursor-grabbing select-none border ${
                  idx === 1
                    ? 'border-[#D27D6B]/30 shadow-[0_15px_30px_rgba(210,125,107,0.18)] ring-1 ring-[#D27D6B]/15'
                    : 'border-white/80'
                }`}
                style={{
                  boxShadow:
                    '0 15px 30px -10px rgba(210,125,107,0.15), 0 1px 3px rgba(0,0,0,0.05)',
                }}
              >
                {/* Acrylic simulated gloss overlay reflective element */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/40 pointer-events-none rounded-sm"></div>

                {/* Polaroid Frame Container */}
                {sample.type === 'polaroid' ? (
                  <div className="flex flex-col space-y-2">
                    {/* Picture field */}
                    <div className="aspect-square bg-[#FAF9F6] w-full rounded-xs overflow-hidden relative border border-gray-100">
                      <img
                        src={sample.url}
                        alt="Keepsake snippet"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    {/* Bottom comment line */}
                    <div className="text-center pt-1 pb-1">
                      <p className="font-script text-[#3D3D3D] text-lg sm:text-xl leading-none">
                        {sample.caption}
                      </p>
                    </div>
                  </div>
                ) : (
                  // Classic Square Tile
                  <div className="flex flex-col space-y-1">
                    {/* Full photo layout with minimal sleek margins */}
                    <div className="aspect-square bg-[#FAF9F6] w-full rounded-xs overflow-hidden relative border border-gray-100">
                      <img
                        src={sample.url}
                        alt="Keepsake square"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      {/* Integrated discrete label inside photo frame */}
                      <div className="absolute bottom-2 left-2 right-2 bg-black/40 backdrop-blur-xs px-2 py-1 rounded-md text-center">
                        <p className="text-white text-[10px] font-sans font-medium tracking-wide">
                          {sample.caption}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
