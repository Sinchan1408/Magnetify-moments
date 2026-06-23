import React, { useState, useRef, useEffect } from 'react';
import { Upload, Plus, Minus, Heart, Sparkles, Check, RefreshCw, Eye, Smartphone, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CustomMagnet, MagnetType } from '../types';

interface InteractiveDesignerProps {
  onAddCustomMagnetToCart: (magnet: CustomMagnet) => void;
  // Allows preset injection if user clicked "Personalize This" in the gallery
  initialPreset?: {
    image: string;
    caption?: string;
    category?: string;
  } | null;
}

const PRESET_PICS = [
  {
    id: 'couple',
    label: 'Couples ❤️',
    url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=600',
    caption: 'You & Me Sempre'
  },
  {
    id: 'baby',
    label: 'Babies 👶',
    url: 'https://images.unsplash.com/photo-1515488042361-404e9250afef?auto=format&fit=crop&q=80&w=600',
    caption: 'Pure Love'
  },
  {
    id: 'family',
    label: 'Family 🏡',
    url: 'https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?auto=format&fit=crop&q=80&w=600',
    caption: 'Family First'
  },
  {
    id: 'pet',
    label: 'Pets 🐾',
    url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=600',
    caption: 'Best Companion'
  }
];

export default function InteractiveDesigner({
  onAddCustomMagnetToCart,
  initialPreset
}: InteractiveDesignerProps) {
  // Config state
  const [magnetType, setMagnetType] = useState<MagnetType>('polaroid');
  const [caption, setCaption] = useState('Sweet Moments');
  const [captionFont, setCaptionFont] = useState<'cursive' | 'sans' | 'serif'>('cursive');
  const [magnetSize, setMagnetSize] = useState<'2x2' | '3x3' | '4x4'>('3x3');
  const [hasStand, setHasStand] = useState(false);
  const [customImage, setCustomImage] = useState<string>(PRESET_PICS[0].url);
  const [qty, setQty] = useState(1);
  const [previewBg, setPreviewBg] = useState<'fridge' | 'linen' | 'cork'>('linen');
  const [zoom, setZoom] = useState(1);
  const [dragActive, setDragActive] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync initial preset when user clicks "Personalise This" on another component
  useEffect(() => {
    if (initialPreset) {
      setCustomImage(initialPreset.image);
      if (initialPreset.caption) {
        setCaption(initialPreset.caption);
      }
      // Scroll to designer
      const designerEl = document.getElementById('designer');
      if (designerEl) {
        designerEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [initialPreset]);

  // Price Calculation
  const getUnitPrice = () => {
    let base = 5.99;
    if (magnetSize === '3x3') base = 6.99;
    if (magnetSize === '4x4') base = 8.99;
    if (hasStand) base += 1.50; // Stand extra
    return base;
  };

  const totalPrice = getUnitPrice() * qty;

  // File Upload Handlers (Supports standard Click and Drag & Drop)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setCustomImage(reader.result);
          setZoom(1); // reset zoom
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setCustomImage(reader.result);
          setZoom(1);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const openFileSelector = () => {
    fileInputRef.current?.click();
  };

  const handleAddToCart = () => {
    const customMagnet: CustomMagnet = {
      id: `custom-${Date.now()}-${Math.floor(Math.random() * 1000000)}`,
      imageSrc: customImage,
      type: magnetType,
      caption: magnetType === 'polaroid' ? caption : '',
      hasStand,
      size: magnetSize,
      quantity: qty,
      price: getUnitPrice()
    };

    onAddCustomMagnetToCart(customMagnet);
    
    // Play sound or show animated micro feedback
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
    }, 2500);
  };

  return (
    <section id="designer" className="py-24 px-4 bg-transparent border-t border-[#F2EFE9]">
      <div className="max-w-7xl mx-auto">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#D27D6B] text-sm font-semibold tracking-widest uppercase block mb-3">
            ✨ Premium 3D Studio
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#2D2D2D]">
            Design Your Custom Magnet
          </h2>
          <p className="text-gray-650 mt-2 text-sm sm:text-base font-light">
            Configure, write captions, and instantly preview on different surfaces to see exactly what will arrive at your door!
          </p>
        </div>

        {/* Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Configurator Controls Form - 7 Cols */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#F2EFE9] shadow-sm space-y-8 text-left">
            
            {/* 1. LAYOUT STYLE */}
            <div>
              <label className="text-sm font-bold tracking-wide text-[#2D2D2D] uppercase block mb-3">
                1. Select Magnet Style
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  id="style-polaroid-btn"
                  onClick={() => setMagnetType('polaroid')}
                  className={`p-4 rounded-2xl border-2 text-left transition-all ${
                    magnetType === 'polaroid'
                      ? 'border-[#D27D6B] bg-[#D27D6B]/10 text-[#D27D6B]'
                      : 'border-[#F2EFE9] bg-white hover:border-[#D27D6B]/40 text-gray-700'
                  }`}
                >
                  <span className="block font-semibold text-sm">📸 Acrylic Polaroid</span>
                  <span className="text-xs text-gray-500 mt-1 block">Classic 3:4 aspect ratio with wide bottom text footer.</span>
                </button>
                <button
                  id="style-classic-square-btn"
                  onClick={() => setMagnetType('classic-square')}
                  className={`p-4 rounded-2xl border-2 text-left transition-all ${
                    magnetType === 'classic-square'
                      ? 'border-[#D27D6B] bg-[#D27D6B]/10 text-[#D27D6B]'
                      : 'border-[#F2EFE9] bg-white hover:border-[#D27D6B]/40 text-gray-700'
                  }`}
                >
                  <span className="block font-semibold text-sm">🔲 Square Acrylic Tile</span>
                  <span className="text-xs text-gray-500 mt-1 block">Borderless, modern full-bleed finish. Max photo size.</span>
                </button>
              </div>
            </div>

            {/* 2. IMAGE CONTENT SELECTION */}
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
                <label className="text-sm font-bold tracking-wide text-[#2D2D2D] uppercase">
                  2. Choose Photo
                </label>
                <span className="text-xs text-gray-500 font-medium">✨ Upload your couple, baby, family or pet moment</span>
              </div>

              {/* Drag and Drop Zone */}
              <div
                id="drop-zone"
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={openFileSelector}
                className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-2 ${
                  dragActive
                    ? 'border-[#D27D6B] bg-[#D27D6B]/10'
                    : 'border-[#F2EFE9] hover:border-[#D27D6B]/50 bg-[#FAF9F6]'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-[#F2EFE9] flex items-center justify-center text-gray-500">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#2D2D2D]">
                    Drag & Drop or Click to Upload
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Supports high-res JPEG, PNG & WebP images
                  </p>
                </div>
              </div>

              {/* Presets Grid fallback in case user wants to test quickly */}
              <div className="mt-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Or test with sample moments:
                </p>
                <div className="grid grid-cols-4 gap-2.5">
                  {PRESET_PICS.map((pic) => (
                    <button
                      key={pic.id}
                      onClick={() => {
                        setCustomImage(pic.url);
                        setCaption(pic.caption);
                      }}
                      className={`p-1 rounded-xl border-2 transition-all relative overflow-hidden group ${
                        customImage === pic.url
                          ? 'border-[#D27D6B] ring-2 ring-[#D27D6B]/15'
                          : 'border-[#F2EFE9] hover:border-gray-400'
                      }`}
                    >
                      <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                        <img
                          src={pic.url}
                          alt={pic.label}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <span className="hidden sm:block text-[10px] font-medium text-gray-600 mt-1 line-clamp-1">
                        {pic.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. CAPTION AND FONTS - Polaroids Only */}
            {magnetType === 'polaroid' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4"
              >
                <div>
                  <label className="text-sm font-bold tracking-wide text-[#2D2D2D] uppercase block mb-2">
                    3. Handwritten Captions ❤️
                  </label>
                  <input
                    id="caption-text-input"
                    type="text"
                    maxLength={32}
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="E.g., Baby's First Steps... ❤️"
                    className="w-full px-4 py-3 rounded-xl border border-[#F2EFE9] bg-[#FAF9F6] text-[#2D2D2D] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D27D6B]/20 focus:border-[#D27D6B] transition-all font-sans text-sm"
                  />
                </div>

                {/* Font choice */}
                <div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                    Caption Typography Style:
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setCaptionFont('cursive')}
                      className={`py-2 px-3 rounded-lg border text-xs font-medium transition-all ${
                        captionFont === 'cursive'
                          ? 'border-[#D27D6B] bg-[#D27D6B]/15 text-[#D27D6B]'
                          : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-600'
                      }`}
                    >
                      🖋️ Sweet Hand
                    </button>
                    <button
                      onClick={() => setCaptionFont('serif')}
                      className={`py-2 px-3 rounded-lg border text-xs font-medium transition-all ${
                        captionFont === 'serif'
                          ? 'border-[#D27D6B] bg-[#D27D6B]/15 text-[#D27D6B]'
                          : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-600'
                      }`}
                    >
                      📰 Classic Serif
                    </button>
                    <button
                      onClick={() => setCaptionFont('sans')}
                      className={`py-2 px-3 rounded-lg border text-xs font-medium transition-all ${
                        captionFont === 'sans'
                          ? 'border-[#D27D6B] bg-[#D27D6B]/15 text-[#D27D6B]'
                          : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-600'
                      }`}
                    >
                      🎒 Neat Print
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 4. SIZING */}
            <div>
              <label className="text-sm font-bold tracking-wide text-[#2D2D2D] uppercase block mb-3">
                {magnetType === 'polaroid' ? '4. Choose Size' : '3. Choose Size'}
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  id="size-2x2-btn"
                  onClick={() => setMagnetSize('2x2')}
                  className={`p-3 rounded-xl border-2 text-center transition-all ${
                    magnetSize === '2x2'
                      ? 'border-[#D27D6B] bg-[#D27D6B]/10 text-[#2D2D2D]'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="block font-bold text-sm">2" x 2"</span>
                  <span className="text-[11px] text-gray-500 block mt-0.5">Mini Gift ($5.99)</span>
                </button>
                <button
                  id="size-3x3-btn"
                  onClick={() => setMagnetSize('3x3')}
                  className={`p-3 rounded-xl border-2 text-center transition-all ${
                    magnetSize === '3x3'
                      ? 'border-[#D27D6B] bg-[#D27D6B]/10 text-[#2D2D2D]'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="block font-bold text-sm">3" x 3"</span>
                  <span className="text-[11px] text-gray-500 block mt-0.5">Medium standard ($6.99)</span>
                </button>
                <button
                  id="size-4x4-btn"
                  onClick={() => setMagnetSize('4x4')}
                  className={`p-3 rounded-xl border-2 text-center transition-all ${
                    magnetSize === '4x4'
                      ? 'border-[#D27D6B] bg-[#D27D6B]/10 text-[#2D2D2D]'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="block font-bold text-sm">4" x 4"</span>
                  <span className="text-[11px] text-gray-500 block mt-0.5">Premium Giant ($8.99)</span>
                </button>
              </div>
            </div>

            {/* 5. ADD STAND OPTION */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-white border border-[#F2EFE9] shadow-xs">
              <div className="text-left pr-4">
                <span className="font-semibold text-sm block text-[#2D2D2D]">
                  Add Mini Clear Acrylic Stand?
                </span>
                <span className="text-xs text-gray-500 block mt-0.5">
                  Let it sit proudly on desks, counters, bookshelves, or your nightstand. (+ $1.50)
                </span>
              </div>
              <button
                id="toggle-stand-btn"
                onClick={() => setHasStand(!hasStand)}
                className={`w-14 h-8 flex-shrink-0 rounded-full p-1 transition-colors duration-200 focus:outline-none ${
                  hasStand ? 'bg-[#D27D6B]' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-200 ${
                    hasStand ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* 6. QUANTITY & ADD STEPPER */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-gray-700">Quantity</span>
                <div className="flex items-center border border-gray-200 rounded-xl bg-white overflow-hidden shadow-sm">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="p-3 text-gray-500 hover:bg-gray-50 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-5 font-semibold text-gray-800 text-sm">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="p-3 text-gray-500 hover:bg-gray-50 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Total display & submit */}
              <div className="flex items-center justify-between sm:justify-end gap-6 flex-1">
                <div className="text-right">
                  <span className="text-xs text-gray-500 block">Total cost</span>
                  <span className="text-2xl font-bold text-[#2D2D2D]">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>

                <button
                  id="add-to-cart-btn"
                  onClick={handleAddToCart}
                  disabled={addedSuccess}
                  className={`px-8 py-4 rounded-full font-semibold shadow-md transition-all flex items-center justify-center gap-2 flex-1 sm:flex-none uppercase text-xs tracking-widest ${
                    addedSuccess
                      ? 'bg-emerald-600 text-white cursor-default'
                      : 'bg-[#D27D6B] text-white hover:bg-opacity-95 hover:shadow-lg'
                  }`}
                >
                  {addedSuccess ? (
                    <>
                      <Check className="w-5 h-5 animate-bounce" />
                      Moment Saved!
                    </>
                  ) : (
                    <>
                      <Heart className="w-5 h-5 fill-current text-white/80" />
                      Add to Magnet Board
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>

          {/* RIGHT: High-Fidelity 3D Live Canvas Preview Area - 5 Cols */}
          <div className="lg:col-span-5 flex flex-col space-y-4 w-full sticky top-24">
            
            {/* Background Selector */}
            <div className="bg-white px-4 py-3 rounded-2xl border border-[#F2EFE9] flex items-center justify-between shadow-xs">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-[#D27D6B]" />
                Visualise On:
              </span>
              <div className="flex gap-1.5">
                <button
                  onClick={() => setPreviewBg('fridge')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                    previewBg === 'fridge'
                      ? 'bg-neutral-800 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                  }`}
                >
                  🧊 Fridge Door
                </button>
                <button
                  onClick={() => setPreviewBg('linen')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                    previewBg === 'linen'
                      ? 'bg-[#E5E1D8] border border-[#FAF9F6] text-[#2D2D2D]'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                  }`}
                >
                  🌸 Cream Linen
                </button>
                <button
                  onClick={() => setPreviewBg('cork')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                    previewBg === 'cork'
                      ? 'bg-[#D29E73] text-[#3A1E0E]'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                  }`}
                >
                  🪵 Wood Board
                </button>
              </div>
            </div>

            {/* Dynamic Stage Canvas Container */}
            <div
              className={`h-[400px] sm:h-[460px] rounded-3xl relative flex items-center justify-center p-8 transition-colors duration-500 overflow-hidden border border-[#F2EFE9] shadow-inner ${
                previewBg === 'fridge'
                  ? 'bg-gradient-to-r from-neutral-300 via-neutral-200 to-neutral-300'
                  : previewBg === 'linen'
                  ? 'bg-[#F2EFE9]'
                  : 'bg-[#E5C39E]'
              }`}
            >
              {/* Context Texturising Overlays */}
              {previewBg === 'fridge' && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-white/10 pointer-events-none"></div>
                  {/* Fridge metallic brushed lines */}
                  <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] [background-size:4px_100%] pointer-events-none"></div>
                </>
              )}
              {previewBg === 'linen' && (
                <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none"></div>
              )}
              {previewBg === 'cork' && (
                // Cork/fiber texture simulator
                <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(#5a2e17_1px,transparent_1px)] [background-size:8px_8px] pointer-events-none"></div>
              )}

              {/* Zoom modifier control slider */}
              <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-gray-200/60 shadow-xs">
                <span className="text-[10px] uppercase font-mono tracking-wider text-gray-500">Zoom</span>
                <input
                  type="range"
                  min="0.8"
                  max="1.6"
                  step="0.05"
                  value={zoom}
                  onChange={(e) => setZoom(parseFloat(e.target.value))}
                  className="w-16 h-1 bg-[#F2EFE9] rounded-full appearance-none cursor-pointer accent-[#D27D6B]"
                />
              </div>

              {/* Mini Stand Trigger Indicator Badge */}
              <AnimatePresence>
                {hasStand && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-4 right-4 bg-[#D27D6B] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs"
                  >
                    📦 Tiny Desktop Stand Included
                  </motion.div>
                )}
              </AnimatePresence>

              {/* THE MAGNET ELEMENT IN 3D DEPICTION */}
              <motion.div
                key={`${magnetType}-${magnetSize}-${hasStand}`}
                style={{ scale: zoom }}
                initial={{ rotate: -2, y: 10, opacity: 0 }}
                animate={{ rotate: 1, y: 0, opacity: 1 }}
                transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                className="relative flex flex-col items-center"
              >
                
                {/* 1. Main Acrylic Magnet Tile Frame */}
                {/* Outer Glass layer simulation */}
                <div
                  className={`bg-white rounded-xs relative transition-all duration-300 border border-black/5 ${
                    magnetSize === '2x2'
                      ? 'w-[180px]'
                      : magnetSize === '3x3'
                      ? 'w-[230px]'
                      : 'w-[280px]'
                  } ${
                    magnetType === 'polaroid'
                      ? 'p-3.5 pb-8 sm:pb-11' // spacing for polaroid bottom
                      : 'p-2' // sleek padding for classic square
                  }`}
                  style={{
                    boxShadow: '0 25px 50px -12px rgba(61,45,42,0.25), 0 5px 15px rgba(0,0,0,0.1)',
                  }}
                >
                  
                  {/* Refractive reflection glass shine block */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/40 pointer-events-none rounded-xs z-10"></div>
                  {/* High Gloss Acrylic Edge highlight */}
                  <div className="absolute inset-0 border border-white/60 pointer-events-none rounded-xs z-10"></div>

                  <div className="w-full relative overflow-hidden bg-neutral-100 rounded-2xs border border-gray-100 aspect-square">
                    <img
                      src={customImage}
                      alt="Magnet live output preview"
                      className="w-full h-full object-cover select-none"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Tiny watermark gloss shine across image */}
                    <div className="absolute -inset-x-20 top-0 h-10 bg-white/20 -skew-y-12 animate-pulse pointer-events-none"></div>

                    {/* Integrated bottom box for Square classic style captions if needed, else square is frameless */}
                    {magnetType === 'classic-square' && (
                      <div className="absolute bottom-2 left-2 right-2 bg-black/50 backdrop-blur-xs px-2.5 py-1.5 rounded-lg text-center">
                        <span className="text-white text-[11px] font-sans font-medium tracking-wide">
                          Magnetify.moments Square Premium Tile
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Polaroid text footer layout */}
                  {magnetType === 'polaroid' && (
                    <div className="text-center pt-3 pb-0.5 relative z-10">
                      <p
                        className={`text-[#2F211F] text-center w-full focus:outline-none select-none tracking-wide text-pretty leading-none ${
                          captionFont === 'cursive'
                            ? 'font-script text-2xl sm:text-[28px]'
                            : captionFont === 'serif'
                            ? 'font-serif text-lg font-bold italic'
                            : 'font-sans text-sm font-semibold tracking-wider text-gray-700'
                        }`}
                      >
                        {caption || 'Our Sweet Story'}
                      </p>
                    </div>
                  )}

                  {/* Dark magnet backing edge peaking slightly behind to show material realism */}
                  <div className="absolute -bottom-1 -right-0.5 w-[98%] h-full rounded-xs bg-[#241F1F]/45 -z-10 blur-[1px]"></div>
                </div>

                {/* 2. Stand Illustration */}
                {/* Renders a wooden triangular mini easel holding the glass plate if hasStand is true */}
                {hasStand && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center -mt-2.5 relative z-20"
                  >
                    {/* The front support ledge */}
                    <div className="w-32 h-3.5 rounded-sm bg-[#CEA07E] border-t border-b border-[#AF815F] shadow-sm flex items-center justify-between px-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#AF815F]"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-[#AF815F]"></div>
                    </div>
                    {/* The tripod floor legs */}
                    <div className="flex gap-12 -mt-0.5 justify-center w-36">
                      <div className="w-3 h-14 bg-[#B58765] origin-top border-b border-l border-[#895E3E] rounded-b-sm rotate-15 transform translate-x-2"></div>
                      {/* Back leg shadow */}
                      <div className="w-2.5 h-12 bg-[#8E5E3A] border-b border-r border-[#633F24] rounded-b-xs opacity-80 z-[-1] absolute translate-y-1"></div>
                      <div className="w-3 h-14 bg-[#B58765] origin-top border-b border-r border-[#895E3E] rounded-b-sm -rotate-15 transform -translate-x-2"></div>
                    </div>
                  </motion.div>
                )}

              </motion.div>
            </div>

            {/* Quick configuration bullet proof overview */}
            <div className="bg-white/90 p-4 rounded-2xl border border-[#F2EFE9] text-left text-xs text-gray-500 space-y-1 shadow-xs">
              <p className="font-semibold text-gray-750">🛒 Custom Magnet Summary:</p>
              <div className="grid grid-cols-2 gap-y-1">
                <span>Material: <b>3mm Scratchless Acrylic</b></span>
                <span>Aspect: <b>{magnetType === 'polaroid' ? '3:4 Retro' : '1:1 Fit'}</b></span>
                <span>Resolution: <b>High-Gloss 300DPI</b></span>
                <span>Stand: <b>{hasStand ? 'Acrylic Stand' : 'Commercial Magnet Only'}</b></span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
