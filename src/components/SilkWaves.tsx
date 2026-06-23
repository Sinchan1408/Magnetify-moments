import React from 'react';
import { motion } from 'motion/react';

export default function SilkWaves() {
  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden pointer-events-none -z-50 select-none bg-[#FAF8F5]">
      {/* Luxurious Luster Light Reflection source - mimics gentle light shining on satin silk */}
      <motion.div
        animate={{
          x: ['-10%', '15%', '-10%'],
          y: ['-5%', '10%', '-5%'],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-[-25%] left-[-25%] w-[150%] h-[150%] bg-radial from-white via-[#FAF8F5] to-transparent opacity-75 blur-3xl"
      />

      <svg
        className="absolute w-[240%] h-[140%] top-[-15%] left-[-70%] transform-gpu origin-center opacity-85"
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Ivory to Peach Luxurious Smooth Gradients */}
          <linearGradient id="silk-grad-luxury-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.75" />
            <stop offset="35%" stopColor="#FAF8F5" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#F3E5D8" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#EAD7C7" stopOpacity="0.5" />
          </linearGradient>

          <linearGradient id="silk-grad-luxury-2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.5" />
            <stop offset="40%" stopColor="#F3E5D8" stopOpacity="0.8" />
            <stop offset="80%" stopColor="#EAD7C7" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#FAF8F5" stopOpacity="0.4" />
          </linearGradient>

          <linearGradient id="silk-grad-luxury-3" x1="10%" y1="90%" x2="90%" y2="10%">
            <stop offset="0%" stopColor="#FAF8F5" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#EAD7C7" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.7" />
          </linearGradient>

          <linearGradient id="silk-grad-luxury-4" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="45%" stopColor="#FAF8F5" stopOpacity="0.45" />
            <stop offset="80%" stopColor="#F3E5D8" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>

          {/* High-class heavy blur to blend waves into fabric folds */}
          <filter id="luxury-silk-blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="40" />
          </filter>
        </defs>

        {/* Ambient Master Binding layer */}
        <rect width="1440" height="900" fill="#FAF8F5" fillOpacity="0.1" />

        {/* Wave Layer 1 - Deep Ivory & Warm Beige Base Wave */}
        <motion.path
          animate={{
            d: [
              "M 0,340 C 320,180 720,540 1120,280 C 1460,50 1860,380 2400,240 L 2400,950 L 0,950 Z",
              "M 0,280 C 420,440 820,240 1220,380 C 1620,520 2020,140 2400,280 L 2400,950 L 0,950 Z",
              "M 0,340 C 320,180 720,540 1120,280 C 1460,50 1860,380 2400,240 L 2400,950 L 0,950 Z"
            ]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          fill="url(#silk-grad-luxury-1)"
          filter="url(#luxury-silk-blur)"
        />

        {/* Wave Layer 2 - Intermediate Peach & Cream Swell */}
        <motion.path
          animate={{
            d: [
              "M 0,440 C 260,600 660,300 1060,500 C 1460,700 1860,350 2400,400 L 2400,950 L 0,950 Z",
              "M 0,500 C 360,350 760,550 1160,400 C 1560,250 1960,600 2400,450 L 2400,950 L 0,950 Z",
              "M 0,440 C 260,600 660,300 1060,500 C 1460,700 1860,350 2400,400 L 2400,950 L 0,950 Z"
            ]
          }}
          transition={{
            duration: 21,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          fill="url(#silk-grad-luxury-2)"
          filter="url(#luxury-silk-blur)"
        />

        {/* Wave Layer 3 - Elegant Foreground Satin Fold Crest */}
        <motion.path
          animate={{
            d: [
              "M 0,550 C 400,410 800,650 1250,490 C 1700,330 1960,550 2400,430 L 2400,950 L 0,950 Z",
              "M 0,480 C 330,580 730,390 1170,540 C 1600,690 1880,430 2400,520 L 2400,950 L 0,950 Z",
              "M 0,550 C 400,410 800,650 1250,490 C 1700,330 1960,550 2400,430 L 2400,950 L 0,950 Z"
            ]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          fill="url(#silk-grad-luxury-3)"
        />

        {/* Wave Layer 4 - Shimmering Cream Sheen Highlight */}
        <motion.path
          animate={{
            d: [
              "M 0,660 C 490,560 890,770 1350,610 C 1810,455 2050,680 2400,550 L 2400,950 L 0,950 Z",
              "M 0,600 C 390,710 790,500 1250,650 C 1710,800 1950,550 2400,655 L 2400,950 L 0,950 Z",
              "M 0,660 C 490,560 890,770 1350,610 C 1810,455 2050,680 2400,550 L 2400,950 L 0,950 Z"
            ]
          }}
          transition={{
            duration: 23,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          fill="url(#silk-grad-luxury-4)"
          style={{ mixBlendMode: 'overlay' }}
        />
      </svg>

      {/* Pure luxury soft ivory / white micro-lustres drifting lazily */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white select-none pointer-events-none"
            style={{
              width: i % 2 === 0 ? '5px' : '7px',
              height: i % 2 === 0 ? '5px' : '7px',
              left: `${12 + i * 18}%`,
              top: `${20 + (i * 13) % 55}%`,
              boxShadow: '0 0 8px rgba(255, 255, 255, 0.8), 0 0 16px rgba(243, 229, 216, 0.5)',
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0, 0.65, 0],
              scale: [0.8, 1.25, 0.8],
            }}
            transition={{
              duration: 15 + i * 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 2.5,
            }}
          />
        ))}
      </div>
    </div>
  );
}

