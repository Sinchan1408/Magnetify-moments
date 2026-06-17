import { ProductPreset, Review, FAQItem } from './types';

export const CATEGORIES = [
  { id: 'all', name: '✨ All Moments' },
  { id: 'couple', name: '❤️ Couples' },
  { id: 'baby', name: '👶 Kids & Babies' },
  { id: 'family', name: '🏡 Family & Home' },
  { id: 'pet', name: '🐾 Pet Memories' },
  { id: 'gift', name: '🎁 Special Gift Packs' }
] as const;

export const PRODUCT_PRESETS: ProductPreset[] = [
  {
    id: 'p1',
    title: 'Polaroid "Best Boy" Acrylic Magnet',
    description: 'Acrylic polaroid style magnet with elegant cursive text. Fits any fridge or whiteboard.',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=600',
    category: 'pet',
    themeColor: '#FAF5ED',
    badge: 'Popular',
    defaultCaption: 'Best Boy 🐾'
  },
  {
    id: 'p2',
    title: 'Polaroid "Sweet Dreams" Puppy Magnet',
    description: 'Perfect for sleepy puppy photos. Crafted from crystal-clear shatterproof acrylic.',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=600',
    category: 'pet',
    themeColor: '#FAF5ED',
    badge: 'New Arrival',
    defaultCaption: 'Sweet Dreams ❤️'
  },
  {
    id: 'p3',
    title: 'Eternal Love Square Frameless Magnet',
    description: 'Modern frameless glossy square tile. Generates maximum contrast and crisp colors.',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80&w=600',
    category: 'couple',
    themeColor: '#FAF5ED',
    badge: 'Best Seller',
    defaultCaption: 'You & Me Always ✨'
  },
  {
    id: 'p4',
    title: 'Pure Innocence Baby Portrait',
    description: 'The tender warmth of your little one, sealed in a high-gloss water-resistant magnet.',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=600',
    category: 'baby',
    themeColor: '#FDF7F5',
    defaultCaption: 'Welcome Little One 🌸'
  },
  {
    id: 'p5',
    title: 'Golden Sunset Family Walk',
    description: 'Cherish laughter and gatherings. Strong, extra-durable backing hold up to 3 papers.',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?auto=format&fit=crop&q=80&w=600',
    category: 'family',
    themeColor: '#FAF5ED',
    defaultCaption: 'Family is Everything 🏡'
  },
  {
    id: 'p6',
    title: 'Memory Lover Gift Tin (6-Pack)',
    description: 'The ultimate bespoke set. Six custom magnets of choice inside a gorgeous presentation box.',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600',
    category: 'gift',
    themeColor: '#FCECEE',
    badge: 'Perfect Gift',
    defaultCaption: 'Our Sweet Journey'
  }
];

export const CUSTOMER_REVIEWS: Review[] = [
  {
    id: 'r1',
    name: 'Harshal Kumar Jain',
    role: 'Verified Purchaser',
    rating: 5,
    comment: 'Ordered 10 Acrylic polaroids of our puppy and they are simply sensational! The hand-written text effect with the stand looks just like a tiny piece of art on my desk.',
    date: '3 days ago',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    magnetImage: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 'r2',
    name: 'Siri Jain',
    role: 'Founder & Designer',
    rating: 5,
    comment: 'We spent months finding the perfect scratch-resistant acrylic and extra strong light magnets. I personally review and polish every memory magnet to guarantee it lasts a lifetime!',
    date: '1 week ago',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
    magnetImage: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 'r3',
    name: 'Ananya Sharma',
    role: 'Gift Buyer',
    rating: 5,
    comment: 'I sent a bundle of couple and baby magnets to my sister for her anniversary. The peach-blush gift tin and the tiny stands are beautifully made with high-end premium finish. Highly recommend dynamic preview on this web!',
    date: '2 weeks ago',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq1',
    question: 'How do I upload and personalize my memories?',
    answer: 'Simply use our Interactive Magnet Designer! Drag and drop or crop your sweet photos, choose either a classy retro Polaroid with custom handwritten captions or a sleek Square Acrylic Tile, and select if you would like custom acrylic stands.',
    category: 'Ordering'
  },
  {
    id: 'faq2',
    question: 'What materials do you use for the magnets?',
    answer: 'We construct each magnet from high-grade, 3mm thick clear glossy acrylic. This provides beautiful depth and glass-like elegance while remaining completely shatterproof and water-resistant. The back is layered with a strong, print-safe commercial rubber magnet.',
    category: 'Quality'
  },
  {
    id: 'faq3',
    question: 'How strong are the magnets on my fridge?',
    answer: 'Very strong! Standard thin sheet magnets slide down, but our heavy-duty commercial backing easily holds up to 3 sheets of 80gsm paper without slipping or scratching your surface.',
    category: 'Quality'
  },
  {
    id: 'faq4',
    question: 'Do you offer bulk packaging for events, baby showers or weddings?',
    answer: 'Absolutely! Our bespoke magnets are very popular for wedding favors, couple anniversaries, and baby showers. Contact us using the custom inquiry form below for special volume pricing and fast-track shipping.',
    category: 'Gifting'
  }
];
