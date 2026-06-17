import React, { useState, useEffect } from 'react';
import { RefreshCw, LayoutGrid, Heart, Sparkles, AlertCircle, Maximize, RotateCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CustomMagnet } from '../types';

interface VirtualFridgeProps {
  // Current custom magnets built in the designer
  customMagnetsInStore: CustomMagnet[];
  onSelectProductForCustomise: (src: string) => void;
}

interface FridgeMagnet {
  id: string;
  url: string;
  caption: string;
  type: 'polaroid' | 'classic-square';
  x: number; // percentage width
  y: number; // percentage height
  rotate: number; // degrees
  scale: number;
}

const INITIAL_FRIDGE_ITEMS: FridgeMagnet[] = [
  {
    id: 'f1',
    url: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=300',
    caption: 'Best Boy 🐾',
    type: 'polaroid',
    x: 18,
    y: 12,
    rotate: -4,
    scale: 0.95
  },
  {
    id: 'f2',
    url: 'https://images.unsplash.com/photo-1519689680058-324335c77ebe?auto=format&fit=crop&q=80&w=300',
    caption: 'Pure Sweet Baby 👶',
    type: 'polaroid',
    x: 55,
    y: 18,
    rotate: 6,
    scale: 1.05
  },
  {
    id: 'f3',
    url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80&w=300',
    caption: 'You & Me Sempre ❤️',
    type: 'classic-square',
    x: 24,
    y: 52,
    rotate: -8,
    scale: 1.0
  },
  {
    id: 'f4',
    url: 'https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?auto=format&fit=crop&q=80&w=300',
    caption: 'Family is Love 🏡',
    type: 'polaroid',
    x: 60,
    y: 55,
    rotate: 3,
    scale: 1.1
  }
];

export default function VirtualFridge({
  customMagnetsInStore,
  onSelectProductForCustomise
}: VirtualFridgeProps) {
  const [fridgeItems, setFridgeItems] = useState<FridgeMagnet[]>(INITIAL_FRIDGE_ITEMS);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [fridgeColor, setFridgeColor] = useState<'stainless' | 'pastel-pink' | 'charcoal'>('stainless');

  // Automatically inject custom magnets designed by the user onto the fridge so they can see them live
  useEffect(() => {
    if (customMagnetsInStore.length > 0) {
      // Avoid duplicate keys
      const mapped = customMagnetsInStore.map((m, idx) => {
        // Distribute coordinates nicely based on index
        const col = idx % 2 === 0 ? 15 : 45;
        const row = Math.min(75, 40 + idx * 10);
        return {
          id: m.id,
          url: m.imageSrc,
          caption: m.caption,
          type: m.type,
          x: col + (idx * 5) % 30,
          y: row,
          rotate: ((idx % 3) - 1) * 6,
          scale: m.size === '2x2' ? 0.8 : m.size === '3x3' ? 1.0 : 1.2
        };
      });

      // Filter out mapped items already present, ensuring absolutely no duplicate IDs are pushed
      const uniqueNewItems: FridgeMagnet[] = [];
      const seenIds = new Set(fridgeItems.map(item => item.id));
      for (const item of mapped) {
        if (!seenIds.has(item.id)) {
          uniqueNewItems.push(item);
          seenIds.add(item.id);
        }
      }
      if (uniqueNewItems.length > 0) {
        setFridgeItems(prev => [...prev, ...uniqueNewItems]);
      }
    }
  }, [customMagnetsInStore, fridgeItems]);

  const handleReset = () => {
    setFridgeItems(INITIAL_FRIDGE_ITEMS);
    setActiveItem(null);
  };

  const updateActiveMagnet = (property: 'rotate' | 'scale' | 'x' | 'y', amount: number) => {
    if (!activeItem) return;
    setFridgeItems(items =>
      items.map(item => {
        if (item.id === activeItem) {
          if (property === 'rotate') {
            return { ...item, rotate: (item.rotate + amount) };
          } else if (property === 'scale') {
            return { ...item, scale: Math.max(0.6, Math.min(1.4, item.scale + amount)) };
          } else if (property === 'x') {
            return { ...item, x: Math.max(5, Math.min(85, item.x + amount)) };
          } else if (property === 'y') {
            return { ...item, y: Math.max(5, Math.min(85, item.y + amount)) };
          }
        }
        return item;
      })
    );
  };

  return (
    <section id="playground" className="py-24 px-4 bg-[#FAF9F6] border-t border-[#F2EFE9]">
      <div className="max-w-7xl mx-auto">
        
        {/* Slogan Intro */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#D27D6B] text-sm font-semibold tracking-widest uppercase block mb-3">
            🧊 Live interactive board
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#2D2D2D]">
            The Virtual Refrigerator Playroom
          </h2>
          <p className="text-gray-650 mt-2 text-sm sm:text-base font-light">
            Select standard magnets or designs from your editor, rearrange them, toggle fridge colors, and pre-visualise your gorgeous gallery!
          </p>
        </div>

        {/* Playroom Board Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Controls column - Column 1 to 4 */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-[#F2EFE9] shadow-sm flex flex-col justify-between">
            <div className="space-y-6 text-left">
              <h3 className="font-serif text-xl font-bold text-[#2D2D2D] flex items-center gap-2">
                <LayoutGrid className="w-5 h-5 text-[#D27D6B]" />
                Playroom Tools
              </h3>
              
              <p className="text-xs text-gray-500 leading-relaxed">
                Click any magnet on our virtual fridge to unlock live orientation handlers. Move, scale, or tilt your designed memories!
              </p>

              {/* Fridge Theme selector */}
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2.5">
                  Fridge Decor Surface:
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setFridgeColor('stainless')}
                    className={`py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                      fridgeColor === 'stainless'
                        ? 'border-[#D27D6B] bg-[#D27D6B]/10 text-[#D27D6B]'
                        : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                    }`}
                  >
                    Stainless Steel
                  </button>
                  <button
                    onClick={() => setFridgeColor('pastel-pink')}
                    className={`py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                      fridgeColor === 'pastel-pink'
                        ? 'border-[#D27D6B] bg-[#D27D6B]/10 text-[#D27D6B]'
                        : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                    }`}
                  >
                    Rose Wash Pink
                  </button>
                  <button
                    onClick={() => setFridgeColor('charcoal')}
                    className={`py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                      fridgeColor === 'charcoal'
                        ? 'border-[#D27D6B] bg-[#D27D6B]/10 text-[#D27D6B]'
                        : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                    }`}
                  >
                    Slate Charcoal
                  </button>
                </div>
              </div>

              {/* Active Selection custom sliders (Only visible when activeItem is set!) */}
              <AnimatePresence mode="wait">
                {activeItem ? (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-4 rounded-2xl bg-neutral-50 border border-neutral-150 space-y-4"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-[#D27D6B] uppercase animate-pulse">
                        🔧 Adjust Custom Selection
                      </span>
                      <button
                        onClick={() => setActiveItem(null)}
                        className="text-[10px] text-gray-400 hover:text-gray-650 uppercase font-bold cursor-pointer"
                      >
                        Deselect
                      </button>
                    </div>

                    {/* Direct Dials and Sliders */}
                    <div className="space-y-3.5">
                      {/* Horizontal Alignment */}
                      <div>
                        <div className="flex justify-between text-xs font-medium text-gray-500 mb-1">
                          <span>Left & Right</span>
                          <span>{fridgeItems.find(i => i.id === activeItem)?.x}%</span>
                        </div>
                        <input
                          type="range"
                          min="5"
                          max="85"
                          value={fridgeItems.find(i => i.id === activeItem)?.x || 45}
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            setFridgeItems(items => items.map(item => item.id === activeItem ? { ...item, x: val } : item));
                          }}
                          className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#D27D6B]"
                        />
                      </div>

                      {/* Vertical Alignment */}
                      <div>
                        <div className="flex justify-between text-xs font-medium text-gray-500 mb-1">
                          <span>Up & Down</span>
                          <span>{fridgeItems.find(i => i.id === activeItem)?.y}%</span>
                        </div>
                        <input
                          type="range"
                          min="5"
                          max="85"
                          value={fridgeItems.find(i => i.id === activeItem)?.y || 45}
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            setFridgeItems(items => items.map(item => item.id === activeItem ? { ...item, y: val } : item));
                          }}
                          className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#D27D6B]"
                        />
                      </div>

                      {/* Rotation controls */}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => updateActiveMagnet('rotate', -15)}
                          className="py-1.5 rounded-lg bg-white border text-[11px] font-semibold text-gray-700 hover:bg-neutral-100 flex items-center justify-center gap-1 shadow-xs cursor-pointer"
                        >
                          <RotateCw className="w-3 h-3 text-[#D27D6B] -scale-x-100" />
                          Rotate Left
                        </button>
                        <button
                          onClick={() => updateActiveMagnet('rotate', 15)}
                          className="py-1.5 rounded-lg bg-white border text-[11px] font-semibold text-gray-700 hover:bg-neutral-100 flex items-center justify-center gap-1 shadow-xs cursor-pointer"
                        >
                          <RotateCw className="w-3 h-3 text-[#D27D6B]" />
                          Rotate Right
                        </button>
                      </div>

                      {/* Scale controls */}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => updateActiveMagnet('scale', -0.1)}
                          className="py-1.5 rounded-lg bg-white border text-[11px] font-semibold text-gray-700 hover:bg-neutral-100 flex items-center justify-center gap-1 shadow-xs cursor-pointer"
                        >
                          Shrink Size
                        </button>
                        <button
                          onClick={() => updateActiveMagnet('scale', 0.1)}
                          className="py-1.5 rounded-lg bg-white border text-[11px] font-semibold text-gray-700 hover:bg-neutral-100 flex items-center justify-center gap-1 shadow-xs cursor-pointer"
                        >
                          Enlarge Size
                        </button>
                      </div>

                    </div>
                  </motion.div>
                ) : (
                  <div className="p-5 rounded-2xl border border-dashed border-gray-200 bg-neutral-50/50 flex flex-col items-center justify-center text-center space-y-2">
                    <AlertCircle className="w-6 h-6 text-gray-400" />
                    <span className="text-xs font-semibold text-gray-500">No Magnet Selected</span>
                    <p className="text-[10px] text-gray-400">Click any photograph on the refrigerator door to configure its position.</p>
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom auxiliary reset option */}
            <button
              onClick={handleReset}
              className="mt-6 w-full py-3.5 rounded-xl border border-[#F2EFE9] hover:border-gray-400 text-xs font-semibold text-gray-600 bg-white active:bg-neutral-50 flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
            >
              <RefreshCw className="w-4 h-4 text-gray-500" />
              Reset Refrigerator Layout
            </button>
          </div>

          {/* Interactive Refrigerator Model - Column 5 to 12 */}
          <div className="lg:col-span-8 relative">
            
            {/* Refrigerator Frame Exterior casing */}
            <div
              className={`w-full min-h-[500px] sm:min-h-[600px] h-full rounded-3xl relative border-8 border-gray-400 overflow-hidden shadow-2xl transition-all duration-700 ${
                fridgeColor === 'stainless'
                  ? 'bg-[#CCCCCC]'
                  : fridgeColor === 'pastel-pink'
                  ? 'bg-gradient-to-tr from-[#FAF6F4] via-[#FDF5F2] to-[#F5ECE8]'
                  : 'bg-[#2E2E2E]'
              }`}
            >
              
              {/* Stainless details, handle, split doors layout line representation */}
              {fridgeColor === 'stainless' && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-neutral-400 via-neutral-150 to-neutral-400/90 [background-size:200%_100%]"></div>
                  {/* Fine metallic sheets */}
                  <div className="absolute inset-0 opacity-15 bg-[linear-gradient(90deg,rgba(0,0,0,0.15)_1px,transparent_1px)] [background-size:3px_100%]"></div>
                </>
              )}
              {fridgeColor === 'pastel-pink' && (
                <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]"></div>
              )}
              {fridgeColor === 'charcoal' && (
                <div className="absolute inset-0 bg-gradient-to-b from-[#3E3E3E] via-[#242424] to-[#1C1C1C]"></div>
              )}

              {/* Simulated Freezer to fridge split vertical line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-1.5 bg-black/20 shadow-inner z-[5]"></div>

              {/* Refrigerator Stainless Handles */}
              <div className="absolute left-[calc(50%-14px)] top-12 bottom-12 w-1.5 rounded-full bg-white/40 blur-xs pointer-events-none z-[6]"></div>
              
              <div className="absolute left-[calc(50%-18px)] top-16 h-40 w-3 rounded-full bg-gradient-to-r from-[#8E8D8D] to-[#E3E3E3] border border-black/10 shadow-md flex items-center justify-center z-[7] pointer-events-none">
                <div className="w-[1px] h-full bg-white/20"></div>
              </div>
              <div className="absolute left-[calc(50%+8px)] top-16 h-40 w-3 rounded-full bg-gradient-to-r from-[#D7D7D7] to-[#807D7D] border border-black/10 shadow-md flex items-center justify-center z-[7] pointer-events-none">
                <div className="w-[1px] h-full bg-white/20"></div>
              </div>

              {/* RENDER PLACED MAGNETS */}
              <div className="absolute inset-0 p-6 z-[4]">
                {fridgeItems.map((item) => {
                  const isActive = activeItem === item.id;
                  return (
                    <motion.div
                      key={item.id}
                      style={{
                        left: `${item.x}%`,
                        top: `${item.y}%`,
                        scale: item.scale,
                        rotate: item.rotate,
                        zIndex: isActive ? 20 : 10
                      }}
                      whileHover={{ scale: item.scale * 1.05, transition: { duration: 0.15 } }}
                      onClick={() => setActiveItem(item.id)}
                      className={`absolute w-28 sm:w-36 bg-white p-2 text-left rounded-xs transition-shadow cursor-pointer select-none border ${
                        isActive
                          ? 'ring-2 ring-[#D27D6B] border-transparent shadow-[0_15px_30px_rgba(210,125,107,0.35)]'
                          : 'border-black/5 shadow-[2px_10px_20px_rgba(0,0,0,0.12)]'
                      }`}
                    >
                      {/* Reflection sheen layers */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/35 pointer-events-none rounded-xs"></div>
                      
                      {item.type === 'polaroid' ? (
                        <div className="flex flex-col space-y-1.5">
                          {/* Image box within polaroid frame */}
                          <div className="aspect-square bg-gray-150 rounded-2xs overflow-hidden relative">
                            <img
                              src={item.url}
                              alt={item.caption}
                              className="w-full h-full object-cover pointer-events-none"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          {/* Polaroid bottom script message caption */}
                          <div className="text-center pt-0.5">
                            <p className="font-script text-[#2D2D2D] text-sm leading-none whitespace-nowrap overflow-hidden text-ellipsis px-1">
                              {item.caption}
                            </p>
                          </div>
                        </div>
                      ) : (
                        // Square Frameless Tile
                        <div className="aspect-square bg-gray-150 rounded-xs overflow-hidden relative">
                          <img
                            src={item.url}
                            alt="Square Tile"
                            className="w-full h-full object-cover pointer-events-none"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute bottom-1 left-1 right-1 bg-black/45 backdrop-blur-xs py-0.5 rounded-sm text-center">
                            <span className="text-[8px] text-white font-medium block">
                              Acrylic Slate
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Black dynamic magnet backing shadow simulation */}
                      <div className="absolute -inset-x-0.5 -bottom-0.5 bg-[#171616]/40 -z-10 blur-[1px] rounded-xs"></div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Watermark in corner */}
              <div className="absolute right-4 bottom-4 z-10 bg-black/10 backdrop-blur-md px-3 py-1.5 rounded-full text-white/60 text-[9px] uppercase tracking-widest pointer-events-none">
                📸 Magnetify Moments Simulator
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
