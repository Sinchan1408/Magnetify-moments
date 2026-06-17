import React, { useState } from 'react';
import { Mail, HelpCircle, ChevronDown, MessageSquare, Send, CheckCircle, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Review, FAQItem } from '../types';
import { FAQS, CUSTOMER_REVIEWS } from '../data';

export default function FAQAndContact() {
  const [openFaq, setOpenFaq] = useState<string | null>('faq1');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    purpose: 'anniversary',
    customNotes: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple verification & animated transition
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setContactForm({
        name: '',
        email: '',
        purpose: 'anniversary',
        customNotes: '',
      });
    }, 4500);
  };

  return (
    <section id="faqs" className="py-24 px-4 bg-[#FAF9F6] border-t border-[#F2EFE9]">
      <div className="max-w-7xl mx-auto">
        
        {/* REVIEWS ROW */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#D27D6B] text-sm font-semibold tracking-widest uppercase block mb-3">
              💖 Customer Love
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#2D2D2D]">
              Loved by Couples & Families
            </h2>
            <p className="text-gray-500 mt-2 text-sm sm:text-base font-light">
              See what Siri Jain and our wonderful collectors say about their custom-crafted acrylic captures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CUSTOMER_REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="bg-white p-6 rounded-3xl border border-[#F2EFE9] shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between text-left relative"
              >
                {/* Hearts floating deco inside first card */}
                {rev.id === 'r2' && (
                  <span className="absolute top-4 right-4 bg-[#D27D6B]/10 text-[#D27D6B] text-xs font-semibold px-2.5 py-1 rounded-full border border-[#D27D6B]/20">
                    💡 Siri Jain (Founder)
                  </span>
                )}

                <div>
                  {/* Star counters */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <p className="text-sm text-gray-550 italic leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="flex items-center gap-3.5 mt-6 pt-4 border-t border-gray-100">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 border border-gray-100 shadow-sm">
                    <img
                      src={rev.avatar}
                      alt={rev.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <span className="font-bold text-sm block text-[#2D2D2D]">
                      {rev.name}
                    </span>
                    <span className="text-[10px] text-gray-500 font-medium">
                      {rev.role} • {rev.date}
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* FAQS & ACCORDIONS AND CONTACT BULK FORM ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-20">
          
          {/* FAQ Left Block - 7 Cols */}
          <div className="lg:col-span-7 flex flex-col space-y-6 text-left">
            <div>
              <span className="text-[#D27D6B] text-xs font-semibold tracking-widest uppercase block mb-2">
                💬 Need Answers?
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-black text-[#2D2D2D]">
                Frequently Asked Questions
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Everything you need to know about acrylic quality, orders, shipping rates, and gifting boxes.
              </p>
            </div>

            {/* Accordions */}
            <div className="space-y-4 pt-4">
              {FAQS.map((faq) => {
                const isOpen = openFaq === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="bg-white rounded-2xl border border-[#F2EFE9] overflow-hidden transition-all duration-300"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                      className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none focus:bg-neutral-50/40 cursor-pointer"
                    >
                      <span className="font-serif font-bold text-[#2D2D2D] text-sm sm:text-base pr-4">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-400 transition-transform duration-305 flex-shrink-0 ${
                          isOpen ? 'rotate-180 text-[#D27D6B]' : ''
                        }`}
                      />
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-gray-600 border-t border-gray-55 leading-relaxed">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contact & Inquiries Form Right Block - 5 Cols */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#F2EFE9] shadow-xs text-left">
            <div>
              <span className="text-[#D27D6B] text-xs font-semibold tracking-widest uppercase block mb-1">
                🎁 Bulk & Gifting Favors
              </span>
              <h4 className="text-xl font-serif font-black text-[#2D2D2D]">
                Event Bulk Inquiries
              </h4>
              <p className="text-xs text-gray-500 mt-1">
                Perfect for wedding favors, couple anniversaries, baby announcements, or custom corporate gift crates.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {formSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-12 flex flex-col items-center text-center space-y-3"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-2">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h5 className="font-serif font-bold text-lg text-gray-800">
                    Inquiry Received!
                  </h5>
                  <p className="text-xs text-gray-500 max-w-sm leading-relaxed">
                    Thank you! Siri Jain or our support specialists will email you within 12 hours with customized wholesale rate quotes.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4 pt-6" id="bulk-contact-form">
                  {/* Name field */}
                  <div>
                    <label className="text-[11px] font-bold text-gray-500 uppercase block mb-1.5">
                      Your Full Name
                    </label>
                    <input
                      name="name"
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={handleInputChange}
                      placeholder="E.g., Siri Jain"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#F2EFE9] bg-[#FAF9F6] text-[#2D2D2D] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D27D6B]/25 focus:border-[#D27D6B] transition-all text-sm"
                    />
                  </div>

                  {/* Email field */}
                  <div>
                    <label className="text-[11px] font-bold text-gray-500 uppercase block mb-1.5">
                      Your Email Address
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={handleInputChange}
                      placeholder="you@domain.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#F2EFE9] bg-[#FAF9F6] text-[#2D2D2D] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D27D6B]/25 focus:border-[#D27D6B] transition-all text-sm"
                    />
                  </div>

                  {/* Occasion / Purpose option */}
                  <div>
                    <label className="text-[11px] font-bold text-gray-500 uppercase block mb-1.5">
                      What is the Occasion?
                    </label>
                    <select
                      name="purpose"
                      value={contactForm.purpose}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#F2EFE9] bg-[#FAF9F6] text-[#2D2D2D] focus:outline-none focus:ring-2 focus:ring-[#D27D6B]/25 focus:border-[#D27D6B] transition-all text-sm"
                    >
                      <option value="anniversary">📷 Couple Anniversary / Valentine Gift</option>
                      <option value="babyshower">👶 Baby Shower / Birth Celebration</option>
                      <option value="wedding">👰 Wedding Favors (Wholesale Bundles)</option>
                      <option value="familypack">🏡 Extended Family Reunion Giveaways</option>
                      <option value="other">🎁 Other Personalised Occasion Pack</option>
                    </select>
                  </div>

                  {/* Notes / Message */}
                  <div>
                    <label className="text-[11px] font-bold text-gray-500 uppercase block mb-1.5">
                      Desired Quantities & Details
                    </label>
                    <textarea
                      name="customNotes"
                      rows={3}
                      required
                      value={contactForm.customNotes}
                      onChange={handleInputChange}
                      placeholder="Describe what kind of magnets you want, stand requirements, or estimated batch quantity..."
                      className="w-full px-4 py-2.5 rounded-xl border border-[#F2EFE9] bg-[#FAF9F6] text-[#2D2D2D] focus:outline-none focus:ring-2 focus:ring-[#D27D6B]/25 focus:border-[#D27D6B] transition-all text-sm resize-none"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    id="contact-form-submit-btn"
                    className="w-full py-3.5 rounded-full bg-[#D27D6B] hover:bg-opacity-95 text-white text-xs font-semibold tracking-wider uppercase shadow-md transition-all flex items-center justify-center gap-1.5 hover:scale-103 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    Submit Custom Inquiry
                  </button>
                </form>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
