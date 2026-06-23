import React from 'react';
import { Upload, Sliders, Truck, CircleCheck } from 'lucide-react';
import { motion } from 'motion/react';

export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      icon: <Upload className="w-6 h-6 text-[#D27D6B]" />,
      title: 'Upload Memories',
      desc: 'Drag & drop your favorite family, couple, baby, or pet portrait. Our engine supports any device image.',
    },
    {
      num: '02',
      icon: <Sliders className="w-6 h-6 text-[#D27D6B]" />,
      title: 'Styling & Captions',
      desc: 'Write custom bottom captions with high-end cursive script, toggle stands, and select shapes (Polaroid or Squares).',
    },
    {
      num: '03',
      icon: <Truck className="w-6 h-6 text-[#D27D6B]" />,
      title: 'Professional Seal',
      desc: 'We construct your magnets with 3mm optical-grade thick glass acrylic and heavy commercial magnetic backings.',
    },
  ];

  return (
    <section className="py-20 px-4 bg-transparent">
      <div className="max-w-7xl mx-auto text-center">
        
        {/* Title */}
        <div className="max-w-2xl mx-auto mb-16 text-center">
          <span className="text-[#D27D6B] text-xs font-bold tracking-widest uppercase block mb-3">
            Simple & Seamless Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#2D2D2D]">
            How We Make Your Magnets Special
          </h2>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            From your screen directly onto your fridge or work desk in three flawless steps.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {/* Connecting arrow/line on Desktop only */}
          <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-[#D27D6B]/20 via-[#F2EFE9] to-[#D27D6B]/20 -translate-y-12 -z-10"></div>

          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
              className="bg-white p-8 rounded-3xl border border-[#F2EFE9] shadow-xs hover:shadow-md transition-shadow relative text-left"
            >
              {/* Giant number indicator in background */}
              <span className="absolute right-6 top-4 font-serif text-6xl font-black text-[#F2EFE9] select-none">
                {step.num}
              </span>

              {/* Icon Container */}
              <div className="w-12 h-12 rounded-2xl bg-[#D27D6B]/10 flex items-center justify-center mb-6 border border-[#D27D6B]/20">
                {step.icon}
              </div>

              {/* Text */}
              <h3 className="font-serif text-xl font-bold text-[#2D2D2D] mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-gray-500 font-light leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bullet proofs assurance */}
        <div className="mt-14 inline-flex flex-wrap items-center justify-center gap-6 text-xs text-gray-650 font-medium bg-white px-6 py-3 rounded-full border border-[#F2EFE9]">
          <span className="flex items-center gap-1">
            <CircleCheck className="w-4 h-4 text-emerald-600" />
            Shatterproof Acrylic
          </span>
          <span className="text-gray-300">|</span>
          <span className="flex items-center gap-1">
            <CircleCheck className="w-4 h-4 text-emerald-600" />
            Fast Delivery Tracker
          </span>
          <span className="text-gray-300">|</span>
          <span className="flex items-center gap-1">
            <CircleCheck className="w-4 h-4 text-emerald-600" />
            Gift Box Option
          </span>
        </div>

      </div>
    </section>
  );
}
