import { LandingPageData, AnalysisResult } from './types';

export interface SamplePreset {
  id: string;
  name: string;
  image: string; // Base64 or elegant SVG placeholder
  analysis: AnalysisResult;
  pageData: LandingPageData;
}

export const SAMPLE_PRESETS: SamplePreset[] = [
  {
    id: 'pulse-watch',
    name: 'Chronos Smartwatch',
    image: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=600&q=80',
    analysis: {
      productName: 'Chronos Watch',
      description: 'An elegant titan-frame smartwatch with medical-grade biomonitors and customizable modern displays.',
      niche: 'tech',
      keyFeatures: ['7-Day Titanium Frame', 'Bio-Sensing Core v2', 'Offline GPS Tracking', 'Ambient Display Always-On'],
      targetAudience: 'Productivity professionals, high-end athletes, and design enthusiasts.',
      suggestedStructure: 'AIDA'
    },
    pageData: {
      config: {
        theme: 'Future Cyberpunk',
        colors: {
          primary: '#10B981', // Emerald green
          secondary: '#111827', // Slate deep gray
          accent: '#06B6D4', // Cyan
          background: '#0B0F19',
          text: '#F3F4F6'
        },
        font: 'Inter, sans-serif',
        niche: 'tech',
        language: 'English'
      },
      hero: {
        title: 'Master Your Time. Empower Your Health.',
        subtitle: 'Engineered with premium aerospace titanium and bio-sensing telemetry to guide your life with absolute precision.',
        cta: 'Order Chronos v2 Now'
      },
      features: [
        {
          title: 'Titanium Shell',
          description: 'Forged with aerospace alloy v4 to survive drops, shocks, and deep dives up to 100 meters.',
          icon: 'Shield'
        },
        {
          title: 'Heart Core v2',
          description: 'A 6-diode optical array continuously tracking heart rhythm, blood oxygen, and circadian sleep loops.',
          icon: 'Heart'
        },
        {
          title: 'Infinite Charge',
          description: 'Optimized hybrid display provides a solid 7 days of power with advanced GPS enabled.',
          icon: 'Zap'
        }
      ],
      benefits: [
        {
          title: 'Uncompromised Design Meets Absolute Utilitarian Power',
          description: 'No more fragile gadgetry on your wrist. The Chronos smartwatch acts as an elegant mechanical timekeeper while carrying robust health tech.',
          emotional_hook: 'CONFIDENCE & STRENGTH'
        },
        {
          title: 'Daily Actionable Insights Without Alert Fatigue',
          description: 'Get deep analytics summarizing your physical stress and focus rhythms without annoying notifications.',
          emotional_hook: 'CALM FOCUS'
        }
      ],
      social_proof: {
        reviews: [
          {
            author: 'Marcus Vance, Tech Analyst',
            text: 'Chronos is the first fitness smartwatch that doesnt look like a plastic toy. I wear it to boardroom meetings and triathlons alike. Absolutely brilliant build.',
            rating: 5
          },
          {
            author: 'Clara Dubois, Triathlete',
            text: 'The battery and offline pathfinding maps saved me during my mountain hike. Accurate heart-rate telemetry without lag.',
            rating: 5
          }
        ],
        trust_badges: ['FDA Certified Biologics', 'ISO-9001 Titanium Forging', '30-Day Moneyback Policy']
      },
      faq: [
        {
          question: 'Does it work with iOS or Android?',
          answer: 'Yes, Chronos syncs seamlessly with both iOS and Android through our lightweight, open-source companion dashboard app with local-first data backup.'
        },
        {
          question: 'How long does shipping take?',
          answer: 'All orders ship within 24 hours via carbon-neutral express courier. Delivery varies between 2-4 business days.'
        }
      ],
      guarantee: {
        title: 'LIFETIME HARDWARE WARRANTY',
        text: 'If your titanium shell breaks or any sensor malfunctions during ordinary usage, we will replace your device free of charge, no complex forms requested.'
      },
      footer: {
        copyright: '© 2026 Chronos Lab Inc. All rights reserved.',
        links: ['Specifications', 'Privacy Shield', 'Clinical Studies', 'Enterprise Inquiries']
      }
    }
  },
  {
    id: 'luxe-bag',
    name: 'Atelier Leather Duffel',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80',
    analysis: {
      productName: 'Atelier Duffel',
      description: 'A luxurious full-grain leather duffel bag handcrafted for weekend travelers and stylish weekend getaways.',
      niche: 'luxury',
      keyFeatures: ['Full-Grain Calfskin Leather', 'Heavy-Duty Solid Brass Hardware', 'Waterproof Satin Lining', 'Modular Passport Pouch'],
      targetAudience: 'Sophisticated executives, frequent fliers, and lovers of artisanal heritage products.',
      suggestedStructure: 'PAS'
    },
    pageData: {
      config: {
        theme: 'Parisian Atelier',
        colors: {
          primary: '#854D0E', // Golden brown brass
          secondary: '#FDFBF7', // Luxe creamy white
          accent: '#1F2937', // Deep charcoal accent
          background: '#FDFBF7', // Cream background
          text: '#22252A'
        },
        font: 'Georgia, serif',
        niche: 'luxury',
        language: 'English'
      },
      hero: {
        title: 'Crafted for Stories Yet Unwritten.',
        subtitle: 'Hand-sewn from premium full-grain leather that deepens in character on every journey. Standardized for all global flight cabins.',
        cta: 'Acquire Your Atelier Duffel'
      },
      features: [
        {
          title: 'Artisanal Hand-Sewn Leather',
          description: 'Each duffel takes 14 hours of master handcrafting utilizing historical Parisian saddle-stitching.',
          icon: 'Award'
        },
        {
          title: 'Solid Heavy-Cast Brass',
          description: 'Zippers and clasps are cast from solid nautical brass ensuring lifetime smooth operations and no rust.',
          icon: 'Shield'
        },
        {
          title: 'Smart Compartmentalization',
          description: 'Equipped with dry/wet separation, dedicated passport pouches, and a padded sleeve for 16-inch laptops.',
          icon: 'Check'
        }
      ],
      benefits: [
        {
          title: 'Effortless Cabin Transit with Maximum Volume',
          description: 'Sized to fit perfectly beneath commercial airlines seats or overhead cabins, holding up to 4 days of tailored clothes without creasing.',
          emotional_hook: 'EFFORTLESS LUXURY'
        },
        {
          title: 'The Signature Aroma and Patina of True Heritage Leather',
          description: 'Zero chemical plasticizer scents. Your bag matures to form a brilliant honeyed glaze over time, recounting your historic travel destinations.',
          emotional_hook: 'MAJESTIC AGING'
        }
      ],
      social_proof: {
        reviews: [
          {
            author: 'Richard Sterling, Creative Director',
            text: 'I constantly get compliments at airports. This duffel is better than options costing 3 times its price. The brass zippers are buttery smooth.',
            rating: 5
          },
          {
            author: 'Elena Rostova, Nomad Writer',
            text: 'The waterproof satin lining works wonderfully for storing damp swimwear. This is the ultimate travel accessory I own.',
            rating: 5
          }
        ],
        trust_badges: ['100% Full-Grain Calfskin', 'Handmade in Tuscany', 'Lifetime Thread Guarantee']
      },
      faq: [
        {
          question: 'How do I care for my Atelier duffel leather?',
          answer: 'We include a tin of natural beeswax leather cream. Apply a thin coat once every six months to condition the grain and maintain water-repellency.'
        },
        {
          question: 'Is it cabin approved for all airlines?',
          answer: 'Yes, it was designed precisely to match domestic and international carry-on sizing charts: 48cm x 26cm x 22cm.'
        }
      ],
      guarantee: {
        title: 'OUR 100-YEAR LEGACY GUARANTEE',
        text: 'We stand behind our materials and stitching. If any seam opens or hardware fails, send it back and we will repair or rebuild it for free under our multi-generational heirloom commitment.'
      },
      footer: {
        copyright: '© 2026 Atelier Sterling. Handmades of the World.',
        links: ['Our Workshop', 'Leather Ethics', 'Bespoke Orders', 'Care Guide']
      }
    }
  },
  {
    id: 'aroma-mist',
    name: 'Aeros Pure Mist Diffuser',
    image: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?auto=format&fit=crop&w=600&q=80',
    analysis: {
      productName: 'Aeros Diffuser',
      description: 'An elegant glass and ceramic ultrasonic aroma diffuser that emits micro-fine mist for atmospheric wellness.',
      niche: 'beauty',
      keyFeatures: ['Ultrasonic 2.4MHz Plate', 'Terracotta Ceramic Shell', 'Whisper-Quiet 19dB Fan', 'Smart Sleep Timer'],
      targetAudience: 'Aromatherapy enthusiasts, home-spa crafters, and design conscious interior lovers.',
      suggestedStructure: 'BAB'
    },
    pageData: {
      config: {
        theme: 'Spa Serenity',
        colors: {
          primary: '#9A3412', // Warm ochre orange
          secondary: '#FAF7F2', // Minimal sand white
          accent: '#78716C', // Warm stone gray
          background: '#FAFAF9',
          text: '#44403C'
        },
        font: 'Inter, sans-serif',
        niche: 'beauty',
        language: 'English'
      },
      hero: {
        title: 'Purify Your Atmosphere. Uplift Your Mind.',
        subtitle: 'Crafted from textured terracotta stoneware. Releases a gentle ultrasonic micro-mist to transform dry air into crisp mountain pure essential wellness.',
        cta: 'Transform Your Home Sanctuary'
      },
      features: [
        {
          title: 'Textured Ceramic Terracotta Shell',
          description: 'A hand-refined earthenware cover that matches beautiful earthy minimalist living spaces.',
          icon: 'Sparkles'
        },
        {
          title: 'Deep Ultrasonic Humidification',
          description: 'Vibrates at 2.4 million cycles per second to break oil and water particles into dry-free aerosols without heat.',
          icon: 'Flame'
        },
        {
          title: 'Whisper Silent Core',
          description: 'Engineered with a high-efficiency acoustic dampener running below 20 decibels for tranquil night sleep.',
          icon: 'Check'
        }
      ],
      benefits: [
        {
          title: 'Relieve Dry Air and Create an Immersive Aromatherapy Spa',
          description: 'Combat dry winter atmospheres, congested sinuses, and dry skin instantly while filling your home with organic plant-based fragrances.',
          emotional_hook: 'SERENE WELL-BEING'
        },
        {
          title: 'Calming Ambient Luminescence',
          description: 'Soft warm glow acts as a beautiful bedside reading lamp or meditation companion to wind down stress after long sessions.',
          emotional_hook: 'BEDTIME COMFORT'
        }
      ],
      social_proof: {
        reviews: [
          {
            author: 'Dr. Evelyn Moss, Holistic Therapist',
            text: 'An outstanding diffuser that retains the healing qualities of essential oils by avoiding heating tubes. The design looks gorgeous of course.',
            rating: 5
          },
          {
            author: 'Timothy J., Apartment Therapy',
            text: 'It is so silent I often forget it is running. The auto-shutoff works beautifully when the terracotta urn runs dry. Best sleep I have had.',
            rating: 5
          }
        ],
        trust_badges: ['BPA-Free Eco Polymers', 'Auto-Shutoff Electronic Protectors', 'FCC Certified Radiance']
      },
      faq: [
        {
          question: 'How long does the water tank last?',
          answer: 'The 300ml reservoir runs for up to 9 hours in interval pulsing mode, and 5.5 hours in continuous flow stream.'
        },
        {
          question: 'Does it include essential oils?',
          answer: 'We provide a sample pack with 3 of our finest organic essential oils: Lavender Rain, Sandalwood Forest, and Crisp Eucalyptus!'
        }
      ],
      guarantee: {
        title: '1-YEAR SPA SATISFACTION GUARANTEE',
        text: 'Try Aeros Pure Diffuser in your raw workspace. If you dont find yourself feeling notably calmer and rested, contact us within 365 days for a stress-free refund.'
      },
      footer: {
        copyright: '© 2026 Aeros Wellness. Nature Refined.',
        links: ['Aromatics Manual', 'Eco Sourcing', 'Gift Cards', 'Shipping Policy']
      }
    }
  }
];
