import React from 'react';
import { motion } from 'motion/react';

export default function SilkWaves() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-20 select-none">
      {/* Dynamic Luster Light Source - mimics moving light across the fabric */}
      <motion.div
        animate={{
          x: ['-20%', '20%', '-20%'],
          y: ['-10%', '10%', '-10%'],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] bg-radial from-[#FCEAE6] via-[#FAF9F6] to-transparent opacity-65 blur-3xl"
      />

      <svg
        className="absolute w-[220%] h-[140%] top-[-20%] left-[-60%] transform-gpu origin-center"
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="silk-grad-premium-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF9F8" stopOpacity="0.5" />
            <stop offset="30%" stopColor="#FBDCD5" stopOpacity="0.8" />
            <stop offset="65%" stopColor="#F7C4BA" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FFF1EF" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="silk-grad-premium-2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.3" />
            <stop offset="45%" stopColor="#F9D2C9" stopOpacity="0.7" />
            <stop offset="80%" stopColor="#EFAAA4" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#FDF7F5" stopOpacity="0.25" />
          </linearGradient>
          <linearGradient id="silk-grad-premium-3" x1="15%" y1="85%" x2="85%" y2="15%">
            <stop offset="0%" stopColor="#FDF8F7" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#F5B9AD" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#E98F7E" stopOpacity="0.35" />
          </linearGradient>
          <linearGradient id="silk-grad-premium-4" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="40%" stopColor="#FBDCD5" stopOpacity="0.35" />
            <stop offset="85%" stopColor="#F4ABA1" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>

          {/* Special filter to soften and blend fabric folds elegantly */}
          <filter id="soft-silk-blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" />
          </filter>
        </defs>

        {/* Ambient Overlay to bind colors together */}
        <rect width="1440" height="900" fill="#FAF9F6" fillOpacity="0.2" />

        {/* Wave Layer 1 - Soft Background Silk Panel */}
        <motion.path
          animate={{
            d: [
              "M 0,380 C 350,220 750,580 1150,320 C 1500,80 1900,420 2400,280 L 2400,950 L 0,950 Z",
              "M 0,320 C 450,480 850,280 1250,420 C 1650,560 2050,180 2400,320 L 2400,950 L 0,950 Z",
              "M 0,380 C 350,220 750,580 1150,320 C 1500,80 1900,420 2400,280 L 2400,950 L 0,950 Z"
            ]
          }}
          transition={{
            duration: 26,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          fill="url(#silk-grad-premium-1)"
          filter="url(#soft-silk-blur)"
        />

        {/* Wave Layer 2 - Mid-depth Satin Swell */}
        <motion.path
          animate={{
            d: [
              "M 0,470 C 280,630 680,330 1080,530 C 1480,730 1880,380 2400,430 L 2400,950 L 0,950 Z",
              "M 0,530 C 380,380 780,580 1180,430 C 1580,280 1980,630 2400,480 L 2400,950 L 0,950 Z",
              "M 0,470 C 280,630 680,330 1080,530 C 1480,730 1880,380 2400,430 L 2400,950 L 0,950 Z"
            ]
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          fill="url(#silk-grad-premium-2)"
          filter="url(#soft-silk-blur)"
        />

        {/* Wave Layer 3 - Premium Fabric Fold Crest */}
        <motion.path
          animate={{
            d: [
              "M 0,580 C 420,440 820,680 1280,520 C 1740,360 2000,580 2400,460 L 2400,950 L 0,950 Z",
              "M 0,510 C 360,610 760,420 1200,570 C 1640,720 1920,460 2400,550 L 2400,950 L 0,950 Z",
              "M 0,580 C 420,440 820,680 1280,520 C 1740,360 2000,580 2400,460 L 2400,950 L 0,950 Z"
            ]
          }}
          transition={{
            duration: 19,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          fill="url(#silk-grad-premium-3)"
        />

        {/* Wave Layer 4 - Shimmering Highlight Sheen */}
        <motion.path
          animate={{
            d: [
              "M 0,690 C 520,590 920,800 1380,640 C 1840,485 2080,710 2400,580 L 2400,950 L 0,950 Z",
              "M 0,630 C 420,740 820,530 1280,680 C 1740,830 1980,580 2400,685 L 2400,950 L 0,950 Z",
              "M 0,690 C 520,590 920,800 1380,640 C 1840,485 2080,710 2400,580 L 2400,950 L 0,950 Z"
            ]
          }}
          transition={{
            duration: 21,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          fill="url(#silk-grad-premium-4)"
          mixBlendMode="screen"
        />
      </svg>

      {/* Exquisite micro-shimmer sparkle elements drifting lazily */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white text-[#D27D6B] flex items-center justify-center font-sans select-none"
            style={{
              width: i % 2 === 0 ? '4px' : '6px',
              height: i % 2 === 0 ? '4px' : '6px',
              left: `${15 + i * 14}%`,
              top: `${25 + (i * 11) % 45}%`,
              boxShadow: '0 0 10px rgba(255, 255, 255, 0.9), 0 0 20px rgba(210, 125, 107, 0.3)',
            }}
            animate={{
              y: [0, -35, 0],
              opacity: [0, 0.7, 0],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 12 + i * 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 2,
            }}
          />
        ))}
      </div>
    </div>
  );
}

