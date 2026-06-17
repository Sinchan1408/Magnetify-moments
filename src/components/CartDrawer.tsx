import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, CreditCard, ChevronRight, CheckCircle, ArrowRight, Truck, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQty: (itemId: string, newQty: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'shipping' | 'success'>('cart');
  const [shippingForm, setShippingForm] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
  });

  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.magnet.price * item.quantity, 0);
  const estShipping = cartSubtotal > 20.0 ? 0.0 : 3.99; // Free shipping for orders over $20!
  const estTax = cartSubtotal * 0.08; // 8% sales tax
  const cartTotal = cartSubtotal + estShipping + estTax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep('success');
  };

  const handleRestartFullFlow = () => {
    onClearCart();
    setCheckoutStep('cart');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Blur overlay backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-50 backdrop-blur-xs"
          ></motion.div>

          {/* Sled out Drawer */}
          <motion.div
            id="cart-drawer-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#FAF9F6] shadow-2xl z-50 flex flex-col justify-between border-l border-[#F2EFE9] overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 py-5 bg-white border-b border-[#F2EFE9] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#D27D6B]" />
                <span className="font-serif font-black text-[#2D2D2D] text-lg">
                  {checkoutStep === 'success'
                    ? 'Order Confirmed!'
                    : checkoutStep === 'shipping'
                    ? 'Shipping & Checkout'
                    : 'Your Memory Board'}
                </span>
                {cartItems.length > 0 && checkoutStep === 'cart' && (
                  <span className="bg-[#D27D6B]/10 text-[#D27D6B] text-xs font-bold px-2 py-0.5 rounded-full border border-[#D27D6B]/20">
                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                  </span>
                )}
              </div>
              <button
                id="cart-close-btn"
                onClick={onClose}
                className="p-1 px-2 text-gray-400 hover:text-gray-750 transition cursor-pointer"
                aria-label="Close Shopping Drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main scroll content block */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              
              {/* STEP 1: CART LIST */}
              {checkoutStep === 'cart' && (
                <>
                  {cartItems.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center py-20 space-y-4">
                      <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-[#B4A79A]">
                        <ShoppingBag className="w-8 h-8" />
                      </div>
                      <div>
                        <h4 className="font-serif font-bold text-gray-800 text-base">Your board is empty</h4>
                        <p className="text-xs text-gray-500 max-w-xs mt-1">
                          You haven't added any personalised magnets yet. Start designing in our 3D Studio to see them here!
                        </p>
                      </div>
                      <button
                        onClick={onClose}
                        className="py-2.5 px-6 rounded-full bg-[#D27D6B] text-white hover:bg-opacity-95 text-xs font-semibold transition shadow-xs cursor-pointer"
                      >
                        Start Customising 🪄
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="bg-white p-4 rounded-2xl border border-[#F2EFE9] shadow-xs flex gap-3.5 items-start text-left"
                        >
                          {/* Mini Thumbnail view */}
                          <div className="w-20 h-20 rounded-lg relative overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-100 shadow-inner">
                            <img
                              src={item.magnet.imageSrc}
                              alt="Magnet card mini preview"
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                            {/* Glass glossy cover */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 pointer-events-none"></div>
                          </div>

                          {/* Info Column */}
                          <div className="flex-1 min-w-0">
                            <h5 className="font-bold text-sm text-[#2D2D2D] truncate leading-tight">
                              {item.magnet.type === 'polaroid' ? '📸 Polaroid Acrylic' : '🔲 Square Glass Tile'}
                            </h5>
                            
                            {/* Option list details */}
                            <div className="text-[10px] text-gray-500 space-y-0.5 mt-1">
                              {item.magnet.caption && (
                                <p className="truncate">Caption: <span className="font-semibold font-script text-xs text-[#D27D6B]">"{item.magnet.caption}"</span></p>
                              )}
                              <p>Size: <span className="font-semibold text-gray-700">{item.magnet.size}" x {item.magnet.size}"</span></p>
                              <p>Desktop Stand: <span className="font-semibold text-gray-700">{item.magnet.hasStand ? 'Yes (+ $1.50)' : 'No (Magnet Only)'}</span></p>
                            </div>

                            {/* Stepper controls */}
                            <div className="flex items-center justify-between mt-3">
                              <div className="flex items-center border border-gray-100 bg-[#FAF9F6] rounded-lg overflow-hidden scale-90 -translate-x-2">
                                <button
                                  onClick={() => onUpdateQty(item.id, Math.max(1, item.quantity - 1))}
                                  className="p-1 px-2 hover:bg-gray-100 text-gray-400 cursor-pointer"
                                >
                                  -
                                </button>
                                <span className="px-2.5 text-xs font-bold text-gray-700">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                                  className="p-1 px-2 hover:bg-gray-100 text-gray-400 cursor-pointer"
                                >
                                  +
                                </button>
                              </div>

                              <div className="flex items-center gap-3">
                                <span className="font-bold text-sm text-gray-800">
                                  ${(item.magnet.price * item.quantity).toFixed(2)}
                                </span>
                                <button
                                  onClick={() => onRemoveItem(item.id)}
                                  className="text-stone-400 hover:text-rose-600 transition cursor-pointer"
                                  title="Delete item"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>

                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {/* STEP 2: SHIPPING DETAILS FORM */}
              {checkoutStep === 'shipping' && (
                <form id="shipping-details-form" onSubmit={handleCreateOrder} className="space-y-4 pt-2 text-left">
                  <div className="bg-[#FAF9F6] p-4 rounded-2xl border border-[#F2EFE9] space-y-1 mb-4">
                    <p className="text-xs font-bold text-[#D27D6B] uppercase tracking-wider flex items-center gap-1">
                      <Truck className="w-4 h-4" />
                      Free Gifting Packing Applied!
                    </p>
                    <p className="text-[10px] text-gray-500">Each order includes our signature peach-blush tissue wrap with custom logo seal.</p>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wide block mb-1">
                      Full Name
                    </label>
                    <input
                      name="name"
                      type="text"
                      required
                      value={shippingForm.name}
                      onChange={handleInputChange}
                      placeholder="E.g., Harshal Kumar Jain"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#D27D6B]/15 focus:border-[#D27D6B] transition-all text-xs text-gray-700"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wide block mb-1">
                      Email Address
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      value={shippingForm.email}
                      onChange={handleInputChange}
                      placeholder="your.email@gmail.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#D27D6B]/15 focus:border-[#D27D6B] transition-all text-xs text-gray-700"
                    />
                  </div>

                  {/* Street Address */}
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wide block mb-1">
                      Street Address
                    </label>
                    <input
                      name="address"
                      type="text"
                      required
                      value={shippingForm.address}
                      onChange={handleInputChange}
                      placeholder="123 Cozy Lane, Sector 5..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#D27D6B]/15 focus:border-[#D27D6B] transition-all text-xs text-gray-700"
                    />
                  </div>

                  {/* Grid details */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wide block mb-1">
                        City
                      </label>
                      <input
                        name="city"
                        type="text"
                        required
                        value={shippingForm.city}
                        onChange={handleInputChange}
                        placeholder="New Delhi"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#D27D6B]/15 focus:border-[#D27D6B] transition-all text-xs text-gray-700"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wide block mb-1">
                        PIN Code
                      </label>
                      <input
                        name="zip"
                        type="text"
                        required
                        value={shippingForm.zip}
                        onChange={handleInputChange}
                        placeholder="110001"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#D27D6B]/15 focus:border-[#D27D6B] transition-all text-xs text-gray-700"
                      />
                    </div>
                  </div>

                  {/* Simulated Secure Payment Disclaimer */}
                  <div className="p-3.5 rounded-2xl bg-[#EAF7EC] border border-[#BFDFDB] flex items-center gap-3 mt-4 text-xs">
                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <p className="text-stone-700 leading-tight">
                      <b>Secure Demo Checkout</b> • We support COD or instant UPI at delivery. No real-money transaction will be initialized in this sandbox.
                    </p>
                  </div>

                  {/* Trigger Order Submit */}
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-[#D27D6B] text-white text-xs font-bold uppercase tracking-wider items-center justify-center flex gap-1.5 hover:bg-opacity-95 transition shadow cursor-pointer"
                  >
                    <CreditCard className="w-4 h-4" />
                    Place My Order
                  </button>
                </form>
              )}

              {/* STEP 3: ORDER SUCCESS ANIMATION */}
              {checkoutStep === 'success' && (
                <div className="py-12 flex flex-col items-center text-center space-y-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 border-4 border-white shadow-md relative"
                  >
                    <CheckCircle className="w-10 h-10" />
                    {/* Tiny hearts celebration pop */}
                    <span className="absolute -top-1 -right-1 text-rose-500 text-lg">❤️</span>
                  </motion.div>

                  <div className="space-y-2">
                    <h4 className="font-serif font-black text-2xl text-[#2D2D2D]">
                      Thank You, {shippingForm.name || 'Friend'}!
                    </h4>
                    <p className="text-xs text-gray-500 px-4">
                      Siri Jain and our expert printers are already reviewing your photographs to guarantee a pristine, scratch-free gloss sealant.
                    </p>
                  </div>

                  {/* Order Specs */}
                  <div className="w-full bg-white p-5 rounded-2xl border border-dashed border-[#F2EFE9] text-left text-xs space-y-2">
                    <div className="flex justify-between font-semibold border-b pb-2">
                      <span>Order Code:</span>
                      <span className="text-[#D27D6B] tracking-widest font-mono font-bold">MM-{Math.floor(100000 + Math.random() * 900000)}</span>
                    </div>
                    <div className="flex justify-between text-gray-500">
                      <span>Recipient Email:</span>
                      <span className="text-[#2D2D2D] truncate max-w-[200px]">{shippingForm.email || 'customer@gmail.com'}</span>
                    </div>
                    <div className="flex justify-between text-gray-500">
                      <span>Shipping Speed:</span>
                      <span className="text-emerald-700 font-bold">Fast Air Despatch</span>
                    </div>
                    <div className="flex justify-between text-gray-500">
                      <span>Est. Delivery:</span>
                      <span className="text-gray-800 font-bold">In 3-5 Business Days</span>
                    </div>
                  </div>

                  <button
                    onClick={handleRestartFullFlow}
                    className="w-full py-3.5 rounded-full bg-[#D27D6B] text-white text-xs font-semibold uppercase tracking-wider hover:bg-opacity-95 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    Return to Studio
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

            </div>

            {/* Price Calculations and Proceed Buttons (Hidden during checkout Success) */}
            {checkoutStep !== 'success' && cartItems.length > 0 && (
              <div className="bg-white px-6 py-5 border-t border-[#F2EFE9] text-left">
                
                {/* Cost lines */}
                <div className="space-y-2 text-xs text-gray-500 border-b pb-4 mb-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-gray-800">${cartSubtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    {estShipping === 0 ? (
                      <span className="text-emerald-600 font-bold">FREE over $20</span>
                    ) : (
                      <span className="font-semibold text-gray-800">${estShipping.toFixed(2)}</span>
                    )}
                  </div>
                  <div className="flex justify-between">
                    <span>Sales Tax (8%)</span>
                    <span className="font-semibold text-gray-800">${estTax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-[#2D2D2D] pt-1">
                    <span>Total Cost</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Conditional next button */}
                {checkoutStep === 'cart' && (
                  <button
                    id="checkout-proceed-btn"
                    onClick={() => setCheckoutStep('shipping')}
                    className="w-full py-3.5 rounded-full bg-[#D27D6B] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1 shadow hover:bg-opacity-95 transition group cursor-pointer"
                  >
                    Proceed to Shipping
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                )}
                
                {checkoutStep === 'shipping' && (
                  <button
                    onClick={() => setCheckoutStep('cart')}
                    className="w-full py-2.5 rounded-full bg-white border border-[#F2EFE9] text-gray-650 text-xs font-medium uppercase tracking-wider hover:bg-gray-50 flex items-center justify-center gap-1 transition cursor-pointer"
                  >
                    Back to Memory Board
                  </button>
                )}

              </div>
            )}

            {/* Empty back option */}
            {checkoutStep !== 'success' && cartItems.length === 0 && (
              <div className="p-4 bg-white border-t border-gray-100 flex items-center justify-center">
                <p className="text-[10px] text-gray-400">Secure Personal Checkout © magnetify.moments</p>
              </div>
            )}

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
