import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { 
  Upload, Sparkles, Wand2, X, Eye, Code, Download, Languages, 
  ChevronRight, LayoutTemplate, Palette, Sliders, RefreshCw, 
  FileCode, Play, Layers, BadgeAlert, CheckCircle2, Cpu,
  Cloud, Database, LogIn, LogOut, Trash2, Megaphone
} from 'lucide-react';
import { LandingPageData, AnalysisResult, Niche } from './types';
import { LandingRenderer } from './components/LandingRenderer';
import { AdsDashboard } from './components/AdsDashboard';
import { SAMPLE_PRESETS, SamplePreset } from './mockData';
import { cn } from './lib/utils';
import confetti from 'canvas-confetti';

// Firebase & Firestore Connectors
import { 
  auth, 
  db, 
  googleProvider, 
  signInWithPopup, 
  signOut, 
  handleFirestoreError, 
  OperationType 
} from './lib/firebase';
import { 
  onAuthStateChanged, 
  User 
} from 'firebase/auth';
import { 
  collection, 
  doc, 
  setDoc, 
  deleteDoc, 
  query, 
  where, 
  onSnapshot, 
  serverTimestamp,
  getDoc
} from 'firebase/firestore';

type ViewMode = 'dashboard' | 'preview' | 'code' | 'ads';

// Pre-defined local copy engines matching niches perfectly with professional high-converting structures
const LOCAL_NICHE_TEMPLATES: Record<Niche, {
  primaryColor: string;
  bgColor: string;
  textColor: string;
  heroTitle: string;
  heroSubtitle: string;
  heroCta: string;
  features: Array<{ title: string; description: string; icon: string }>;
  benefits: Array<{ title: string; description: string; emotional_hook: string }>;
  reviews: Array<{ author: string; text: string; rating: number }>;
  badges: string[];
  faq: Array<{ question: string; answer: string }>;
  guaranteeTitle: string;
  guaranteeText: string;
}> = {
  luxury: {
    primaryColor: '#854D0E', // Golden brown
    bgColor: '#FDFBF7', // Off-white
    textColor: '#1F2937', 
    heroTitle: 'Crafted for Stories Yet Unwritten.',
    heroSubtitle: 'Hand-sewn from premium full-grain materials that deepen in character on every single journey.',
    heroCta: 'Acquire Secure Ownership',
    features: [
      { title: 'Artisanal Hand Stitching', description: 'Each unit takes 14 hours of master handcrafting utilizing historical saddle-stitching.', icon: 'Award' },
      { title: 'Solid Heavy-Cast Brass', description: 'Metals are cast from solid nautical brass ensuring lifetime smooth operations and no rust.', icon: 'Shield' },
      { title: 'Smart Modular Fittings', description: 'Equipped with dry/wet separation, dedicated passport pouches, and a padded sleeve.', icon: 'Check' }
    ],
    benefits: [
      { title: 'Effortless Carry with Maximum Volume', description: 'Sized to fit perfectly beneath commercial airline seats or overhead cabins, holding garments without creasing.', emotional_hook: 'EFFORTLESS LUXURY' },
      { title: 'The Signature Aroma of True Heritage Materials', description: 'No cheap polymer scents. Your acquisition matures to form a brilliant honeyed glaze over time.', emotional_hook: 'MAJESTIC AGING' }
    ],
    reviews: [
      { author: 'Richard Sterling, Atelier Director', text: 'I constantly get compliments. This is better than options costing three times its price. Truly beautiful build.', rating: 5 },
      { author: 'Elena Rostova, Nomad Writer', text: 'The waterproof satin lining works wonderfully for storing damp items. Best travel companion I own.', rating: 5 }
    ],
    badges: ['100% Genuine Full-Grain', 'Handmade in Tuscany', 'Lifetime Thread Guarantee'],
    faq: [
      { question: 'How do I care for my luxury item?', answer: 'We include a tin of natural beeswax protective cream. Apply a thin coat once every six months.' },
      { question: 'Is it carry-on approved?', answer: 'Yes, it was designed precisely to match standard domestic and international cabin requirements.' }
    ],
    guaranteeTitle: 'OUR 100-YEAR LEGACY COMMITMENT',
    guaranteeText: 'If any seam opens or hardware fails, we will repair or rebuild it for free under our generational legacy commitment.'
  },
  streetwear: {
    primaryColor: '#000000', // Noir solid
    bgColor: '#F4F4F5', // Cool gray
    textColor: '#09090B',
    heroTitle: 'Heavy Armor for Modern Environments.',
    heroSubtitle: 'Double-woven knit engineered to blocks heavy cold wind while offering a substantial premium drape that won\'t lose shape.',
    heroCta: 'Unlock Apex Silhouette',
    features: [
      { title: '500GSM Pre-Shrunk Terry', description: 'Substantial heavy-cotton weave that retains its structured boxy form during heavy wear.', icon: 'Flame' },
      { title: 'Double-Reinforced Rigid Hood', description: 'Deep architectural hood structure that remains rigid, perfect for high comfort and headset wear.', icon: 'Shield' },
      { title: 'Seamless Hidden Pockets', description: 'Side-seam invisible zippered compartments to secure your hardware without altering clean stitchlines.', icon: 'Check' }
    ],
    benefits: [
      { title: 'Maintains Flawless Boxy Profile Always', description: 'Unlike cheap fabrics that sag or pull, our proprietary construction retains a premium cropped boxy outline during motion.', emotional_hook: 'STREET REBELLION' },
      { title: 'Eco Pre-Washed Organic Cotton', description: 'Grown using rainfall. Pre-washed three times to guarantee zero size-shifting after machine cycles.', emotional_hook: 'UNCOMPROMISING ETHICS' }
    ],
    reviews: [
      { author: 'Jordan K., Creative Archivist', text: 'Best silhouette of the season. Drops exactly where it should at the hips. Substantial weight is amazing.', rating: 5 },
      { author: 'Mimi Zhao, Fashion Stylist', text: 'Very boxy and cozy. Fabric is dense and resists pilling even after multiple heavy machine laundry cycles.', rating: 5 }
    ],
    badges: ['500GSM French Terry', '100% Organic Rain Cotton', 'YKK Concealed Zippers'],
    faq: [
      { question: 'How is the crop sizing?', answer: 'It runs oversized with dropped shoulders but cropped slightly at the hips for a high-fashion fit.' },
      { question: 'Can I tumble dry it?', answer: 'Yes, because the knit is pre-shrunk, standard tumble drying will not alter the silhouette.' }
    ],
    guaranteeTitle: 'HEAVY TRIPLE-STITCH WARRANTY',
    guaranteeText: 'If any thread pulls or seams fail within 3 years, we replace the product instantly. Built for the streets.'
  },
  tech: {
    primaryColor: '#10B981', // Emerald
    bgColor: '#0B0F19', // Dark tech deep
    textColor: '#F3F4F6',
    heroTitle: 'Master Your Time. Realize Your Potential.',
    heroSubtitle: 'Engineered with premium aerospace alloys and micro-sensing telemetry to guide your performance with absolute precision.',
    heroCta: 'Access High-Precision Intel',
    features: [
      { title: 'Aerospace Grade Alloys', description: 'Machined from blocks of military titanium to resist scratches, high impact pressures, and 100M ocean dives.', icon: 'Shield' },
      { title: '6-Diode Active Telemetry', description: 'Tracks vital cardiovascular metrics, blood oxygen, and sleep sleep cycles in real-time.', icon: 'Heart' },
      { title: 'Ultra-Efficient Core Charge', description: 'Hybrid smart power array delivering a solid 7 days of operational tracking on a single fast charge.', icon: 'Zap' }
    ],
    benefits: [
      { title: 'Classic Professional Aesthetics Meets Solid Health Analytics', description: 'Avoid fragile plastic gadgets. Our sleek timeless watch face serves beautifully in executive boardrooms and extreme endurance trails.', emotional_hook: 'CONFIDENCE & POWER' },
      { title: 'Actionable Diagnostics Without Interruption Devs', description: 'Understand your biological strain level and focus rhythms without intrusive notifications or alert fatigue.', emotional_hook: 'CALM FOCUS' }
    ],
    reviews: [
      { author: 'Marcus Vance, Tech Critic', text: 'Our team ran testing on five smartwatches this quarter, and Chronos beat the competition in screen outdoor legibility and GPS battery life.', rating: 5 },
      { author: 'Clara Dubois, IronMan Competitor', text: 'The battery and offline topographic maps saved me during my mountain hike. Accurate telemetry with zero lag.', rating: 5 }
    ],
    badges: ['FDA Certified Active Sensors', 'ISO-9001 Titanium Casting', '30-Day Performance Promise'],
    faq: [
      { question: 'Is it compatible with my mobile ecosystem?', answer: 'Yes, it syncs flawlessly via Bluetooth using our secure, encrypted companion application for iOS and Android.' },
      { question: 'How does the offline tracking work?', answer: 'It is built with an integrated GPS receiver that loads and stores pre-cached map quadrants onto its local flash drives.' }
    ],
    guaranteeTitle: 'LIFETIME SENSOR WARRANTY',
    guaranteeText: 'If your titanium outer frame ruptures or any interior biometric sensor breaks, we ship a replacement unit to your door.'
  },
  beauty: {
    primaryColor: '#9A3412', // Warm ochre
    bgColor: '#FAF8F5', // Soft spa white
    textColor: '#44403C',
    heroTitle: 'Purify Your Atmosphere. Quiet Your Mind.',
    heroSubtitle: 'Crafted from textured terracotta stoneware. Releases a gentle ultrasonic micro-mist to transform dry air into pure essential wellness.',
    heroCta: 'Transform Your Air Sanctuary',
    features: [
      { title: 'Earthenware Stone Cover', description: 'Hand-formed clay terracotta piece that serves as a beautiful warm home accent.', icon: 'Sparkles' },
      { title: 'High-Frequency Ultrasonic Mist', description: 'Vibrates at 2.4MHz to instantly diffuse water and plant extracts into clean aerosols without heat.', icon: 'Flame' },
      { title: 'Silent Bedtime Sound Dampener', description: 'Proprietary sound buffer running beneath 19dB for peaceful skin hydration through the night.', icon: 'Check' }
    ],
    benefits: [
      { title: 'Heal Dry Air & Relieve Workspace Stress', description: 'Eliminate morning dry throats, skin irritation, and dry eyes instantly while distributing soothing pine or lavender fragrances.', emotional_hook: 'SERENE ENVIRONMENT' },
      { title: 'Bedtime Ambient Relaxation Lamp', description: 'Adjustable warm breathing luminescence glows warmly to help slow your breathing rate during sleep preparation.', emotional_hook: 'BEDTIME COMFORT' }
    ],
    reviews: [
      { author: 'Dr. Evelyn Moss, Health Consultant', text: 'This terracotta humidifier is brilliant because it refuses heating plates, thereby protecting the active botanical elements of oils.', rating: 5 },
      { author: 'Timothy J., Apartment Therapist', text: 'Incredibly silent and acts as a gorgeous vase when off. My sleep and focus have improved dramatically.', rating: 5 }
    ],
    badges: ['BPA-Free Eco Polymers', 'Safe Water Auto-Shutoff', 'FCC Certified Soft Luminescence'],
    faq: [
      { question: 'How long does a filled run last?', answer: 'The 300ml internal reservoir provides continuous humidification for 6 hours, or pulse-misting for 9 hours.' },
      { question: 'Does it turn off automatically?', answer: 'Yes, once the water container runs empty, it shuts down immediately to ensure absolute electrical safety.' }
    ],
    guaranteeTitle: '365-DAY TRIAL GUARANTEE',
    guaranteeText: 'Try it in your bedroom or studio. If you don\'t experience deeper sleep and less skin dryness, send it back for a full refund.'
  },
  minimal: {
    primaryColor: '#000000',
    bgColor: '#FFFFFF',
    textColor: '#17171C',
    heroTitle: 'Draft Your Vision with Flawless Focus.',
    heroSubtitle: 'Milled from a single solid block of anodized aluminum. Weight-balanced at the exact hand center for fatigue-free drafting.',
    heroCta: 'Acquire Nero Drafter',
    features: [
      { title: 'Centered Gravity Weighting', description: 'Refined weight density situated near the nib to minimize writing friction and hand fatigue.', icon: 'Award' },
      { title: 'Shock Retracting Lead Shield', description: 'An internal tension sensor that retracts lead tips back on high-impact hard writing slips to prevent breaks.', icon: 'Target' },
      { title: 'Micro-Knipped Safe Grip', description: 'Precision-grooved metal grip that provides absolute control without needing cheap silicone layers that yellow.', icon: 'Check' }
    ],
    benefits: [
      { title: 'Fatigue-Free Layout Work & Architect Blueprints', description: 'Ideal for designers, structural architects, and writers who require hours of tactile graphing without forearm tension.', emotional_hook: 'ELEGANT DISCIPLINE' },
      { title: 'Uncompromising Milled Brass Interior', description: 'No cheap plastic clutches. The interior tube is turned in pure brass to guarantee lead lock concentricity forever.', emotional_hook: 'ETERNAL COMPANION' }
    ],
    reviews: [
      { author: 'Lars V., Principal Planner', text: 'A masterpiece of weight distribution. I map models for hours, and my wrist stays completely relaxed. Exceptional matte finish.', rating: 5 },
      { author: 'Hana Shiro, Technical Illustrator', text: 'The lead protector works perfectly. I haven\'t cracked a graphite stick in three weeks of intensive sketch rendering.', rating: 5 }
    ],
    badges: ['Space-Grade Anodized Alloy', 'Turned Milled Brass Mechanisms', 'Includes Custom Lead Refill Pack'],
    faq: [
      { question: 'What lead size does Nero utilize?', answer: 'Nero accepts standard high-density 0.5mm graphite lead refills of any hardness grade (HB, 2B, etc.).' },
      { question: 'Is an eraser included?', answer: 'Yes, an adjustable synthetic clean-wipe eraser sits nested securely beneath the anodized cap.' }
    ],
    guaranteeTitle: 'LIFETIME INTERNAL REPAIR WARRANTY',
    guaranteeText: 'All internal brass claws are under warranty. If they slip or fail to advance graphite, returned writepieces are replaced.'
  },
  educational: {
    primaryColor: '#4F46E5', // Indigo
    bgColor: '#FAF9F6', // Sand background
    textColor: '#1E293B',
    heroTitle: 'Learn Logic Loops. With Touch and Play.',
    heroSubtitle: 'A tactile wooden puzzle block set with magnetic paths to learn boolean logic, conditions, and structures without screens.',
    heroCta: 'Unlock Code Blocks Set',
    features: [
      { title: 'Genuine Waxed Ashwood', description: 'Handcrafted blocks milled from sustainable resources and covered with organic health-safe beeswax coatings.', icon: 'Award' },
      { title: 'Magnetic Conduit Triggers', description: 'Neodymium connectors that click blocks in alignment securely without complex sockets or wires.', icon: 'Sparkles' },
      { title: '40-Stage Quest Syllabus', description: 'Sequenced visual challenge cards guiding builders from basic math steps up to algorithmic routing mysteries.', icon: 'Code' }
    ],
    benefits: [
      { title: 'Escape Digital Screen Congestion Safely', description: 'Provide children and programming students with concrete mechanical models to understand software engineering without blue light.', emotional_hook: 'COGNITIVE CLARITY' },
      { title: 'Spatial Reasoning & Strategic Creativity', description: 'Empowers hand-eye learning, motor logic, and mechanical problem solving with immediate tangible feedback loops.', emotional_hook: 'CREATIVE AGILITY' }
    ],
    reviews: [
      { author: 'Sarah Jenkins, Kindergarten Director', text: 'This has become the most popular STEM resource in our center. Children grasp programming loops without looking at screen grids.', rating: 5 },
      { author: 'Devon M., Tech Team Lead', text: 'My seven-year-old constructed a physical conditional logic loop in twenty minutes. Tactile concepts are permanent.', rating: 5 }
    ],
    badges: ['100% Certified Sustainable Timber', '100% Screen-Free Logic Catalyst', 'Montessori Method Approved'],
    faq: [
      { question: 'What is the optimal age spectrum?', answer: 'Excellent for builders aged 6 to 14, as well as developers seeking an elegant tactical desk puzzle.' },
      { question: 'Does it require external power or batteries?', answer: 'No, it operates entirely using mechanical marbles and kinetic paths—no electronic chargers needed.' }
    ],
    guaranteeTitle: 'STEM LEARNING PLEDGE',
    guaranteeText: 'If your household doesn\'t build and solve their first mechanical calculation loop in 30 days, we accept swift stress-free returns.'
  },
  fitness: {
    primaryColor: '#D97706', // Amber orange
    bgColor: '#09090B', // Deep black
    textColor: '#F9FAFB',
    heroTitle: 'Accelerate Cardiovascular Endurance.',
    heroSubtitle: 'A high-speed adjustable steel wire rope equipped with micro-bearings and handle CAD pacing to keep you perfectly on track.',
    heroCta: 'Unlock Athletic Pacing',
    features: [
      { title: 'Internal Cadence Haptics', description: 'Vibrates gently inside the handle grip to maintain target RPM thresholds for consistent calorie burn.', icon: 'Zap' },
      { title: 'Double Aluminum Cylinders', description: 'Aerospace-quality ball bearings allowing frictionless cable swings up to 280 RPM with no rope twist.', icon: 'Target' },
      { title: 'Liquid Silicone Anti-Slip Wraps', description: 'Comfortable textured sleeve that prevents slipping and wicks hand sweat during heavy CrossFit sessions.', icon: 'Check' }
    ],
    benefits: [
      { title: 'High-Velocity Calorie Destruction', description: 'Elevate your core pulse rate and burn fats up to two times faster than a standard jogging routine.', emotional_hook: 'UNBRIDLED POTENCY' },
      { title: 'Aircraft-Grade Steel Wire Cable', description: 'Fully adjustable cable length to accommodate athletes up to 6\'6". Surrounded by high-molecular vinyl sheath.', emotional_hook: 'INDOMITABLE DURABILITY' }
    ],
    reviews: [
      { author: 'Coach Tyler, CrossFit Coach', text: 'Superb balance. The weight feels centered, and double unders are effortless to perform. Bearing speed is phenomenal.', rating: 5 },
      { author: 'Nadia Belov, Boxer', text: 'Adjusted length in two minutes. The handle grip stays perfectly secure even during long sweaty interval training sets.', rating: 5 }
    ],
    badges: ['360° Zero-Friction Bearings', 'High-Tensile Coated Steel Core', 'Washable Sweatsheld Handgrips'],
    faq: [
      { question: 'Does it work well on outdoors asphalt fields?', answer: 'Yes, it comes equipped with a sacrificial plastic sleeve guard to shield the steel wire wire when skipping outdoors.' },
      { question: 'How is the battery charged?', answer: 'Charges via standard USB-C inside the bottom caps. A single 20-minute charge delivers up to 60 rope training workouts.' }
    ],
    guaranteeTitle: '180-DAY ATHLETE PROMISE',
    guaranteeText: 'If your steel cable snaps or the handle ball bearings fail during ordinary cardio skip classes, we ship a fresh unit instantly.'
  }
};

export default function App() {
  const [image, setImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState('');
  const [pageData, setPageData] = useState<LandingPageData | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('dashboard');
  const [language, setLanguage] = useState('English');
  
  // Custom creator form state
  const [formName, setFormName] = useState('HydroMist Care');
  const [formNiche, setFormNiche] = useState<Niche>('beauty');
  const [formDescription, setFormDescription] = useState('An elegant glass and ceramic ultrasonic aroma humidifier that fills your apartment with pure hydration waves.');
  const [formFeature1, setFormFeature1] = useState('Earthenware Stone Cover');
  const [formFeature1Desc, setFormFeature1Desc] = useState('Hand-formed raw terracotta dome designed to blend beautifully with warm modern studio desks.');
  const [formFeature2, setFormFeature2] = useState('Ultra-Fine Cold Humidification');
  const [formFeature2Desc, setFormFeature2Desc] = useState('Vibrates mineral particles at 2.4MHz to emit deep skin hydration without high temperatures.');
  const [formFeature3, setFormFeature3] = useState('Whisper Sleep Acoustic Shield');
  const [formFeature3Desc, setFormFeature3Desc] = useState('Patented acoustic dampener running below 19dB to protect eyes, lips, and sinuses through the night.');

  // Live visual customizer adjustments state
  const [customBrand, setCustomBrand] = useState('My Brand');
  const [customTitle, setCustomTitle] = useState('');
  const [customSubtitle, setCustomSubtitle] = useState('');
  const [customCta, setCustomCta] = useState('');
  const [customPrimaryColor, setCustomPrimaryColor] = useState('#9A3412');
  const [customBgColor, setCustomBgColor] = useState('#FAF8F5');
  const [customTextColor, setCustomTextColor] = useState('#44403C');
  const [customGuaranteeTitle, setCustomGuaranteeTitle] = useState('');
  const [customGuaranteeText, setCustomGuaranteeText] = useState('');
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Firebase state sync machines
  const [user, setUser] = useState<User | null>(null);
  const [userTemplates, setUserTemplates] = useState<any[]>([]);
  const [isLoadingTemplates, setIsLoadingTemplates] = useState(false);
  const [currentSavedId, setCurrentSavedId] = useState<string | null>(null);

  // Google Login & Sign Out controls
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      showNotification('Successfully connected with Google Auth!', 'success');
    } catch (error) {
      console.error('Login error', error);
      showNotification('Authentication cancelled or failed.', 'error');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      showNotification('Signed out from Google session.', 'info');
    } catch (error) {
      showNotification('Sign out failed.', 'error');
    }
  };

  // Firebase Authentication persistent listening session
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setIsLoadingTemplates(true);
        const q = query(
          collection(db, 'landingPages'),
          where('userId', '==', currentUser.uid)
        );
        const unsubFirestore = onSnapshot(q, (snapshot) => {
          const templates: any[] = [];
          snapshot.forEach((doc) => {
            templates.push({ id: doc.id, ...doc.data() });
          });
          // Sort templates by updatedAt (descending)
          templates.sort((a, b) => {
            const timeA = a.updatedAt?.seconds ?? 0;
            const timeB = b.updatedAt?.seconds ?? 0;
            return timeB - timeA;
          });
          setUserTemplates(templates);
          setIsLoadingTemplates(false);
        }, (error) => {
          handleFirestoreError(error, OperationType.LIST, 'landingPages');
          setIsLoadingTemplates(false);
        });
        return () => {
          unsubFirestore();
        };
      } else {
        setUserTemplates([]);
        setCurrentSavedId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Write and update template states cleanly in the Cloud
  const handleSaveToCloud = async () => {
    if (!user) {
      handleGoogleLogin();
      return;
    }

    const data = getActivePageData();
    if (!data) {
      showNotification('Cannot save an empty template.', 'error');
      return;
    }

    try {
      const docId = currentSavedId || `page-${Date.now()}`;
      const docRef = doc(db, 'landingPages', docId);

      // We maintain the temporal and immutable attributes defined in security rules
      if (currentSavedId) {
        const existingDoc = await getDoc(docRef);
        if (existingDoc.exists()) {
          const existingData = existingDoc.data();
          const updateObj = {
            userId: user.uid,
            productName: formName,
            niche: formNiche,
            pageData: data,
            image: image || '',
            isPublished: existingData.isPublished ?? true,
            createdAt: existingData.createdAt, // KEEP the same!
            updatedAt: serverTimestamp(), // Update to request.time on server
          };
          await setDoc(docRef, updateObj);
        } else {
          // Fallback if document got deleted in database
          const createObj = {
            userId: user.uid,
            productName: formName,
            niche: formNiche,
            pageData: data,
            image: image || '',
            isPublished: true,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          };
          await setDoc(docRef, createObj);
        }
      } else {
        const createObj = {
          userId: user.uid,
          productName: formName,
          niche: formNiche,
          pageData: data,
          image: image || '',
          isPublished: true,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        };
        await setDoc(docRef, createObj);
        setCurrentSavedId(docId);
      }

      showNotification('Landing page saved to cloud securely!', 'success');
      confetti({
        particleCount: 80,
        spread: 40,
        colors: [customPrimaryColor, '#ffffff']
      });
    } catch (error) {
      console.error(error);
      handleFirestoreError(error, currentSavedId ? OperationType.UPDATE : OperationType.CREATE, 'landingPages');
      showNotification('Firebase action blocked or failed!', 'error');
    }
  };

  const handleDeleteCloudPage = async (e: React.MouseEvent, pageId: string) => {
    e.stopPropagation();
    if (!user) return;

    if (!window.confirm('Do you really want to delete this cloud design permanent?')) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'landingPages', pageId));
      if (currentSavedId === pageId) {
        setCurrentSavedId(null);
      }
      showNotification('Landing page deleted from cloud.', 'info');
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `landingPages/${pageId}`);
      showNotification('Could not delete page.', 'error');
    }
  };

  const loadCloudTemplate = (tpl: any) => {
    setPageData(tpl.pageData);
    setImage(tpl.image || null);
    setCurrentSavedId(tpl.id);

    // Sync state
    setFormName(tpl.productName);
    setFormNiche(tpl.niche);
    setFormDescription(tpl.pageData.hero.subtitle);
    setFormFeature1(tpl.pageData.features[0].title);
    setFormFeature1Desc(tpl.pageData.features[0].description);
    setFormFeature2(tpl.pageData.features[1].title);
    setFormFeature2Desc(tpl.pageData.features[1].description);
    setFormFeature3(tpl.pageData.features[2].title);
    setFormFeature3Desc(tpl.pageData.features[2].description);

    setViewMode('preview');
    showNotification(`Cloud landing page "${tpl.productName}" loaded!`, 'success');
    confetti({
      particleCount: 50,
      spread: 30,
      colors: [tpl.pageData.config.colors.primary, '#ffffff']
    });
  };

  // Load a beautiful default structure when mounting
  useEffect(() => {
    // Prime the system with the default first preset
    const startPreset = SAMPLE_PRESETS[0];
    setPageData(startPreset.pageData);
    setImage(startPreset.image);
    // Synclines to form state
    setFormName(startPreset.analysis.productName);
    setFormNiche(startPreset.analysis.niche);
    setFormDescription(startPreset.analysis.description);
    setFormFeature1(startPreset.pageData.features[0].title);
    setFormFeature1Desc(startPreset.pageData.features[0].description);
    setFormFeature2(startPreset.pageData.features[1].title);
    setFormFeature2Desc(startPreset.pageData.features[1].description);
    setFormFeature3(startPreset.pageData.features[2].title);
    setFormFeature3Desc(startPreset.pageData.features[2].description);
  }, []);

  // Sync loaded pageData to visual customizable fields whenever it updates
  useEffect(() => {
    if (pageData) {
      setCustomBrand(pageData.config.theme || 'Premium Brand');
      setCustomTitle(pageData.hero.title);
      setCustomSubtitle(pageData.hero.subtitle);
      setCustomCta(pageData.hero.cta);
      setCustomPrimaryColor(pageData.config.colors.primary);
      setCustomBgColor(pageData.config.colors.background);
      setCustomTextColor(pageData.config.colors.text || '#22252A');
      setCustomGuaranteeTitle(pageData.guarantee.title);
      setCustomGuaranteeText(pageData.guarantee.text);
    }
  }, [pageData]);

  // Handle niche select change -> auto update content fields with expert pre-written copywriting presets!
  const handleNicheSelection = (niche: Niche) => {
    setFormNiche(niche);
    const template = LOCAL_NICHE_TEMPLATES[niche];
    if (template) {
      setFormName(template.features[0].title === '500GSM Pre-Shrunk Terry' ? 'Apex Street Hoodie' : 
                  template.features[0].title === 'Aerospace Grade Alloys' ? 'Chronos Watch v2' :
                  template.features[0].title === 'Centered Gravity Weighting' ? 'Nero Draft Pen' :
                  template.features[0].title === 'Genuine Waxed Ashwood' ? 'FocusBlocks Set' :
                  template.features[0].title === 'Internal Cadence Haptics' ? 'Velo Speed Rope' :
                  niche === 'luxury' ? 'Atelier Travel bag' : 'Aeros Hydrating Stone');
      setFormDescription(template.heroSubtitle);
      setFormFeature1(template.features[0].title);
      setFormFeature1Desc(template.features[0].description);
      setFormFeature2(template.features[1].title);
      setFormFeature2Desc(template.features[1].description);
      setFormFeature3(template.features[2].title);
      setFormFeature3Desc(template.features[2].description);
      showNotification(`Loaded marketing layout preset for Niche: ${niche.toUpperCase()}`, 'info');
    }
  };

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
      showNotification('Product photo successfully registered in browser!', 'success');
    };
    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false
  } as any);

  // High-fidelity local multi-agent log simulation & page compiler
  const compileLandingPageClientOnly = () => {
    setIsGenerating(true);
    setViewMode('dashboard');

    const steps = [
      'Scanning local files & verifying sandbox security bounds...',
      'Vision Agent: Analyzing silhouette shapes and product niche...',
      'CRO Architect: Customizing layout dimensions matching focus frameworks...',
      'Copywriter Core: Re-writing user headlines into ultimate sales hooks...',
      'Visual Designer: Fitting perfect color palettes & typography pairing...',
      'Linter Sync: Bundling high-converting responsive code structure...'
    ];

    let currentStepIndex = 0;
    
    const interval = setInterval(() => {
      if (currentStepIndex < steps.length) {
        setGenerationStep(steps[currentStepIndex]);
        currentStepIndex++;
      } else {
        clearInterval(interval);
        
        // Compile physical inputs into clean data
        const nicheTemplate = LOCAL_NICHE_TEMPLATES[formNiche] || LOCAL_NICHE_TEMPLATES['tech'];
        
        const newlyCompiledData: LandingPageData = {
          config: {
            theme: formName + " Lab",
            colors: {
              primary: nicheTemplate.primaryColor,
              secondary: nicheTemplate.bgColor,
              accent: nicheTemplate.textColor,
              background: nicheTemplate.bgColor,
              text: nicheTemplate.textColor
            },
            font: formNiche === 'luxury' ? 'Georgia, serif' : 'Inter, sans-serif',
            niche: formNiche,
            language: language
          },
          hero: {
            title: nicheTemplate.heroTitle,
            subtitle: formDescription,
            cta: nicheTemplate.heroCta
          },
          features: [
            { title: formFeature1, description: formFeature1Desc, icon: nicheTemplate.features[0].icon },
            { title: formFeature2, description: formFeature2Desc, icon: nicheTemplate.features[1].icon },
            { title: formFeature3, description: formFeature3Desc, icon: nicheTemplate.features[2].icon }
          ],
          benefits: nicheTemplate.benefits,
          social_proof: {
            reviews: nicheTemplate.reviews,
            trust_badges: nicheTemplate.badges
          },
          faq: nicheTemplate.faq,
          guarantee: {
            title: nicheTemplate.guaranteeTitle,
            text: nicheTemplate.guaranteeText
          },
          footer: {
            copyright: `© 2026 ${formName} Labs Corp. Sandbox Verified.`,
            links: ['Client Terms', 'Data Privacy', 'Global Logistics', 'Materials Sourcing']
          }
        };

        setPageData(newlyCompiledData);
        setIsGenerating(false);
        setViewMode('preview');
        showNotification('E-commerce funnel successfully compiled offline!', 'success');
        
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: [nicheTemplate.primaryColor, '#ffffff']
        });
      }
    }, 350);
  };

  const loadPresetManually = (preset: SamplePreset) => {
    setIsGenerating(true);
    setViewMode('dashboard');

    const steps = [
      'Locating standard preset assets in local repository...',
      'Validating JSON schema files matching LandingPageData guidelines...',
      'Unpacking preset template details and colors...'
    ];

    let currentStepIndex = 0;
    const interval = setInterval(() => {
      if (currentStepIndex < steps.length) {
        setGenerationStep(steps[currentStepIndex]);
        currentStepIndex++;
      } else {
        clearInterval(interval);
        setPageData(preset.pageData);
        setImage(preset.image);
        
        // Sync compiler fields to let user modify loaded values
        setFormName(preset.analysis.productName);
        setFormNiche(preset.analysis.niche);
        setFormDescription(preset.analysis.description);
        setFormFeature1(preset.pageData.features[0].title);
        setFormFeature1Desc(preset.pageData.features[0].description);
        setFormFeature2(preset.pageData.features[1].title);
        setFormFeature2Desc(preset.pageData.features[1].description);
        setFormFeature3(preset.pageData.features[2].title);
        setFormFeature3Desc(preset.pageData.features[2].description);

        setIsGenerating(false);
        setViewMode('preview');
        showNotification(`Preset "${preset.name}" loaded successfully!`, 'success');
        
        confetti({
          particleCount: 100,
          spread: 50,
          colors: [preset.pageData.config.colors.primary, '#FFFFFF']
        });
      }
    }, 250);
  };

  const showNotification = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  // Compile active customizable states live
  const getActivePageData = (): LandingPageData | null => {
    if (!pageData) return null;
    return {
      ...pageData,
      config: {
        ...pageData.config,
        theme: customBrand,
        colors: {
          ...pageData.config.colors,
          primary: customPrimaryColor,
          background: customBgColor,
          text: customTextColor
        }
      },
      hero: {
        ...pageData.hero,
        title: customTitle,
        subtitle: customSubtitle,
        cta: customCta
      },
      guarantee: {
        ...pageData.guarantee,
        title: customGuaranteeTitle,
        text: customGuaranteeText
      }
    };
  };

  const activePageData = getActivePageData();

  // Downloader exporting dynamic HTML
  const handleExportHtml = () => {
    if (!activePageData) return;

    const data = activePageData;
    const resolvedBrand = customBrand;

    const featuresHtml = data.features.map(f => `
      <div class="p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all">
        <div class="w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-opacity-10 text-primary-color" style="background-color: ${data.config.colors.primary}18; color: ${data.config.colors.primary};">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sparkles"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z"/><path d="m5 3 1 2.5L8.5 6 6 7 5 9.5 4 7 1.5 6 4 5Z"/><path d="m19 17 1 2.5 2.5.5-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1Z"/></svg>
        </div>
        <h3 class="text-xl font-bold mb-3 text-gray-900">${f.title}</h3>
        <p class="text-gray-600 leading-relaxed">${f.description}</p>
      </div>
    `).join('');

    const benefitsHtml = data.benefits.map((b, idx) => `
      <div class="flex flex-col md:flex-row gap-8 items-center py-8">
        <div class="flex-1 ${idx % 2 !== 0 ? 'md:order-2' : ''}">
          <span class="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 bg-emerald-100 text-emerald-800 uppercase tracking-widest">${b.emotional_hook}</span>
          <h3 class="text-2xl md:text-3xl font-extrabold mb-4 text-gray-900">${b.title}</h3>
          <p class="text-lg text-gray-600 leading-relaxed">${b.description}</p>
        </div>
        <div class="flex-1 w-full aspect-video rounded-3xl bg-gray-100 flex items-center justify-center border border-gray-200 shadow-inner">
          <span class="text-xs text-gray-400 font-mono tracking-widest uppercase">Verified Benefit Quality Focus</span>
        </div>
      </div>
    `).join('');

    const reviewsHtml = data.social_proof.reviews.map(r => `
      <div class="p-8 rounded-2xl bg-gray-50 border border-gray-100 relative">
        <div class="flex text-amber-400 mb-4 font-bold text-lg">★★★★★</div>
        <p class="text-gray-700 italic mb-6">"${r.text}"</p>
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-700 text-xs">${r.author.charAt(0)}</div>
          <div>
            <span class="font-bold text-sm block text-gray-900">${r.author}</span>
            <span class="text-xs text-gray-400 block">Verified Buyer</span>
          </div>
        </div>
      </div>
    `).join('');

    const faqHtml = data.faq.map(f => `
      <div class="border-b border-gray-100 pb-6">
        <h4 class="text-lg font-bold text-gray-900 mb-2">${f.question}</h4>
        <p class="text-gray-600 leading-relaxed">${f.answer}</p>
      </div>
    `).join('');

    const badgesHtml = data.social_proof.trust_badges.map(b => `
      <span class="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-[#000000] bg-opacity-5 text-gray-700 font-bold border border-gray-200">
        ✓ ${b}
      </span>
    `).join(' ');

    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${resolvedBrand} - ${data.hero.title}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
    body {
      font-family: 'Inter', sans-serif;
    }
  </style>
</head>
<body style="background-color: ${data.config.colors.background}; color: ${data.config.colors.text};">

  <!-- Nav Header -->
  <nav class="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center bg-transparent">
    <div class="flex items-center gap-2 text-2xl font-black tracking-tighter">
      <div class="w-8 h-8 rounded-lg" style="background-color: ${data.config.colors.primary};"></div>
      <span>${resolvedBrand}</span>
    </div>
    <a href="#buy" class="px-6 py-2.5 rounded-full font-bold text-sm text-white transition-all hover:scale-105 active:scale-95" style="background-color: ${data.config.colors.primary};">
      ${data.hero.cta}
    </a>
  </nav>

  <!-- Hero -->
  <header class="max-w-7xl mx-auto px-6 py-16 md:py-28 grid md:grid-cols-2 gap-12 items-center">
    <div>
      <h1 class="text-4xl md:text-6xl font-black tracking-tight leading-[1.1] mb-6 text-gray-900">${data.hero.title}</h1>
      <p class="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">${data.hero.subtitle}</p>
      <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <a href="#buy" class="px-8 py-4 rounded-xl text-lg font-bold text-white shadow-lg shadow-gray-200 transition-all hover:-translate-y-0.5" style="background-color: ${data.config.colors.primary};">
          ${data.hero.cta}
        </a>
        <div class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
          <span class="text-green-600 text-lg">✓</span> ${data.guarantee.title}
        </div>
      </div>
    </div>
    <div class="relative">
      <div class="absolute -inset-1 rounded-3xl blur-2xl opacity-10" style="background-color: ${data.config.colors.primary};"></div>
      <div class="relative aspect-square rounded-2xl bg-gray-150 border border-gray-200 flex items-center justify-center text-gray-400 overflow-hidden shadow-xl">
         <span class="font-mono text-xs uppercase tracking-widest text-center px-4">Primary Product Display Placeholder</span>
      </div>
    </div>
  </header>

  <!-- Trust Badges -->
  <section class="max-w-7xl mx-auto px-6 py-8 border-t border-b border-gray-100 flex flex-wrap gap-4 justify-center items-center">
    ${badgesHtml}
  </section>

  <!-- Features -->
  <section class="py-24 bg-gray-50 px-6">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-3xl font-extrabold text-center text-gray-900 mb-16">Outstanding Advantages</h2>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        ${featuresHtml}
      </div>
    </div>
  </section>

  <!-- Benefits -->
  <section class="max-w-5xl mx-auto px-6 py-24">
    ${benefitsHtml}
  </section>

  <!-- Social Proof Reviews -->
  <section class="py-24 bg-white px-6">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-3xl font-extrabold text-center text-gray-900 mb-16">Endorsed by Customers</h2>
      <div class="grid md:grid-cols-2 gap-8">
        ${reviewsHtml}
      </div>
    </div>
  </section>

  <!-- FAQ -->
  <section class="max-w-3xl mx-auto px-6 py-24">
    <h2 class="text-3xl font-bold text-center text-gray-900 mb-16">Common Enquiries</h2>
    <div class="space-y-8">
      ${faqHtml}
    </div>
  </section>

  <!-- Final Call to Action -->
  <section id="buy" class="max-w-5xl mx-auto px-6 py-20 text-center">
    <div class="p-12 md:p-20 rounded-[2.5rem] relative overflow-hidden text-white" style="background-color: ${data.config.colors.primary};">
      <div class="relative z-10 max-w-2xl mx-auto">
        <h2 class="text-3xl md:text-5xl font-black mb-6 leading-tight">${data.hero.title}</h2>
        <p class="text-lg opacity-90 mb-10">${data.hero.subtitle}</p>
        <a href="#" class="inline-block px-10 py-4 rounded-full bg-white text-gray-900 text-lg font-bold shadow-xl transition-all hover:scale-105 active:scale-95">
          ${data.hero.cta}
        </a>
        <p class="mt-6 text-sm opacity-85">${data.guarantee.text}</p>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="border-t border-gray-100 py-12 px-6 text-sm text-gray-500">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
      <p>${data.footer.copyright}</p>
      <div class="flex gap-6">
        ${data.footer.links.map(l => `<a href="#" class="hover:underline">${l}</a>`).join('')}
      </div>
    </div>
  </footer>

</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resolvedBrand.toLowerCase().replace(/[^a-z0-9]/g, '-')}-landing-page.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showNotification('Raw Static HTML E-commerce package exported successfully!', 'success');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black">
      {/* Dynamic Header Toolbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center border-b border-white/5 backdrop-blur-xl bg-black/20">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 font-black text-xl tracking-tighter cursor-pointer" onClick={() => setViewMode('dashboard')}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-emerald-400 rotate-12 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            CONVERTO<span className="text-emerald-400">.AI</span>
          </div>
          
          <div className="hidden md:flex items-center gap-1 p-1 rounded-full bg-white/5 border border-white/10">
            {(['dashboard', 'preview', 'code', 'ads'] as ViewMode[]).map((mode) => (
              <button
                id={`tab-${mode}`}
                key={mode}
                onClick={() => setViewMode(mode)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-xs font-bold transition-all capitalize flex items-center gap-1",
                  viewMode === mode 
                    ? "bg-white text-black font-extrabold" 
                    : "text-gray-400 hover:text-white"
                )}
              >
                {mode === 'dashboard' && <Sliders className="w-3 h-3" />}
                {mode === 'preview' && <Eye className="w-3 h-3" />}
                {mode === 'code' && <FileCode className="w-3 h-3" />}
                {mode === 'ads' && <Megaphone className="w-3 h-3" />}
                {mode}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Cloud Persisted Action Engine */}
          {user ? (
            <div className="flex items-center gap-3">
              {/* Active save button */}
              <button
                id="btn-cloud-save"
                onClick={handleSaveToCloud}
                disabled={!activePageData}
                style={{ backgroundColor: activePageData ? 'rgba(16, 185, 129, 0.15)' : undefined }}
                className={cn(
                  "flex items-center gap-1.5 px-4 py-2 border rounded-full font-bold text-xs transition-all",
                  activePageData 
                    ? "text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/25 active:scale-95 cursor-pointer" 
                    : "bg-white/5 border-white/10 text-gray-500 cursor-not-allowed"
                )}
                title={currentSavedId ? "Update saved cloud page" : "Save to cloud database"}
              >
                <Cloud className="w-3.5 h-3.5" /> 
                {currentSavedId ? 'Update Cloud' : 'Save to Cloud'}
              </button>

              {/* User Identity Banner */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300">
                {user.photoURL ? (
                  <img 
                    src={user.photoURL} 
                    alt="avatar" 
                    className="w-4 h-4 rounded-full object-cover border border-emerald-500" 
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-4 h-4 rounded-full bg-emerald-500/25 border border-emerald-500 text-[9px] font-black flex items-center justify-center text-emerald-400">
                    {user.email?.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="max-w-[80px] truncate font-semibold hidden sm:inline">{user.displayName || user.email}</span>
              </div>

              {/* Sign out indicator */}
              <button 
                id="btn-cloud-signout"
                onClick={handleSignOut}
                className="p-2 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-red-400 hover:border-red-500/20 hover:bg-red-500/5 transition-all"
                title="Disconnect Google Account"
                aria-label="Sign out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              id="btn-cloud-login"
              onClick={handleGoogleLogin}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full font-bold text-xs bg-white text-black hover:bg-white/95 active:scale-95 transition-all text-sm cursor-pointer shadow-lg"
              title="Connect Google Account to Save Funnels"
            >
              <LogIn className="w-3.5 h-3.5" /> Sign with Google
            </button>
          )}

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs">
            <Languages className="w-3.5 h-3.5" />
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent border-none outline-none cursor-pointer font-bold text-gray-300"
            >
              <option value="English" className="bg-black text-white">English</option>
              <option value="Français" className="bg-black text-white">Français</option>
              <option value="Spanish" className="bg-black text-white">Español</option>
              <option value="German" className="bg-black text-white">Deutsch</option>
            </select>
          </div>
          
          <button 
            id="btn-export"
            onClick={handleExportHtml}
            disabled={!activePageData}
            style={{ backgroundColor: activePageData ? customPrimaryColor : undefined }}
            className={cn(
              "flex items-center gap-2 px-5 py-2.5 rounded-full font-black text-sm transition-all",
              activePageData 
                ? "text-white shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:scale-105 active:scale-95 cursor-pointer" 
                : "bg-white/5 text-gray-500 cursor-not-allowed"
            )}
          >
            <Download className="w-4 h-4" /> Export HTML
          </button>
        </div>
      </nav>

      {/* Persistent Floating Alerts */}
      {notification && (
        <div className={cn(
          "fixed bottom-6 right-6 z-50 p-4 rounded-xl shadow-2xl border flex items-center gap-3 animate-fade-in backdrop-blur-md",
          notification.type === 'success' ? "bg-emerald-950/90 border-emerald-500/30 text-emerald-200 animate-bounce" :
          notification.type === 'info' ? "bg-blue-950/90 border-blue-500/30 text-blue-200" :
          "bg-red-950/90 border-red-500/30 text-red-200"
        )}>
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-semibold">{notification.message}</span>
        </div>
      )}

      <main className="pt-24 min-h-screen">
        {viewMode === 'ads' && <AdsDashboard />}
        {viewMode === 'dashboard' && (
          <div className="max-w-7xl mx-auto px-6 py-6 animate-fade-in">
            {/* Header branding */}
            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-400 mb-5">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                100% SECURE OFFLINE COMPILER ACTIVE
              </span>
              <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight mb-4 leading-none select-none">
                Converto <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-indigo-400 font-black">Studio</span> Suite
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                Design fully customized, high-converting checkout landing pages instantly inside the browser. No cloud dependencies, no region constraints.
              </p>
            </div>

            {/* Ready Presets Rack */}
            <div className="mb-10 p-6 rounded-3xl bg-white/[0.01] border border-white/5">
              <h3 className="text-xs uppercase tracking-widest text-[#B5BAC1] font-extrabold mb-4 flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                Click any High-Converting Preset Profile to Load Pre-written Copy
              </h3>
              <div className="grid sm:grid-cols-3 gap-6">
                {SAMPLE_PRESETS.map((preset) => (
                  <div 
                    key={preset.id}
                    onClick={() => loadPresetManually(preset)}
                    className="p-5 rounded-2xl bg-black border border-white/5 hover:border-emerald-500/35 hover:bg-white/[0.02] transition-all cursor-pointer group flex gap-4 items-center relative overflow-hidden"
                  >
                    <img 
                      src={preset.image} 
                      alt={preset.name} 
                      className="w-16 h-16 rounded-xl object-cover border border-white/10 group-hover:scale-105 transition-transform" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1">
                      <h4 className="font-bold text-sm text-white group-hover:text-emerald-400 transition-colors">{preset.name}</h4>
                      <p className="text-xs text-gray-500 line-clamp-1 capitalize">{preset.analysis.niche} Framework</p>
                      <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-semibold mt-1">
                        <Play className="w-2.5 h-2.5 fill-emerald-400" /> Boot Blueprint
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cloud Templates Rack */}
            <div className="mb-10 p-6 rounded-3xl bg-white/[0.01] border border-white/5">
              <h3 className="text-xs uppercase tracking-widest text-[#B5BAC1] font-extrabold mb-4 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Cloud className="w-3.5 h-3.5 text-indigo-400" />
                  My Cloud Collections ({userTemplates.length})
                </span>
                {!user && (
                  <span className="text-[10px] text-gray-550 normal-case font-medium">
                    Connect account to persist designs across sessions.
                  </span>
                )}
              </h3>

              {!user ? (
                <div className="flex flex-col items-center justify-center p-8 bg-zinc-950/40 rounded-2xl border border-dashed border-white/5 text-center">
                  <Database className="w-8 h-8 text-gray-600 mb-3" />
                  <p className="text-xs font-bold text-gray-300 mb-2">Login to Sync Your Creations On Firebase Cloud</p>
                  <button
                    onClick={handleGoogleLogin}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-white text-black hover:bg-white/90 active:scale-95 transition-all cursor-pointer"
                  >
                    <LogIn className="w-3 h-3" /> Sign in with Google
                  </button>
                </div>
              ) : isLoadingTemplates ? (
                <div className="flex items-center justify-center gap-2 p-10 text-xs text-gray-400 font-bold">
                  <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" /> Downloading cloud files...
                </div>
              ) : userTemplates.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8 bg-zinc-950/40 rounded-2xl border border-dashed border-indigo-500/20 text-center">
                  <Cloud className="w-8 h-8 text-indigo-500/40 mb-3" />
                  <p className="text-xs font-bold text-gray-400 mb-1">No Cloud-Saved Funnels Yet</p>
                  <p className="text-[10px] text-gray-500">Create a landing page below, then hit "Save to Cloud" in the toolbar!</p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-3 gap-6">
                  {userTemplates.map((tpl) => (
                    <div 
                      key={tpl.id}
                      onClick={() => loadCloudTemplate(tpl)}
                      className="p-5 rounded-2xl bg-black border border-white/5 hover:border-indigo-500/35 hover:bg-white/[0.02] transition-all cursor-pointer group flex gap-4 items-center relative overflow-hidden"
                    >
                      {tpl.image ? (
                        <img 
                          src={tpl.image} 
                          alt={tpl.productName} 
                          className="w-16 h-16 rounded-xl object-cover border border-white/10 group-hover:scale-105 transition-transform" 
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-xl bg-zinc-900 border border-white/10 flex flex-col items-center justify-center text-gray-600 text-[10px] text-center p-1 uppercase font-mono tracking-tighter">
                          No Image
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-1">
                          <h4 className="font-bold text-sm text-white group-hover:text-indigo-400 transition-colors truncate">{tpl.productName}</h4>
                          <button
                            onClick={(e) => handleDeleteCloudPage(e, tpl.id)}
                            className="p-1 text-gray-600 hover:text-red-400 transition-colors rounded hover:bg-white/5"
                            title="Delete permanently"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 line-clamp-1 capitalize">{tpl.niche} Structure</p>
                        <span className="inline-flex items-center gap-1 text-[10px] text-indigo-400 font-semibold mt-1">
                          <Cloud className="w-2.5 h-2.5" /> Load Cloud Funnel
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Two-Column Studio Creator */}
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              {/* Product details & dropzone */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* File Dropzone */}
                <div 
                  {...getRootProps()} 
                  id="dropzone-box"
                  className={cn(
                    "relative aspect-[16/6] rounded-3xl border-2 border-dashed transition-all flex flex-col items-center justify-center p-8 overflow-hidden group cursor-pointer",
                    isDragActive ? "border-emerald-500 bg-emerald-500/5" : "border-white/10 hover:border-white/30 bg-white/[0.01]"
                  )}
                >
                  <input {...getInputProps()} />
                  {image ? (
                    <>
                      <img src={image} className="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:opacity-35 transition-opacity" referrerPolicy="no-referrer" />
                      <div className="relative z-10 flex flex-col items-center">
                        <button 
                          onClick={(e) => { e.stopPropagation(); setImage(null); }}
                          className="p-3 rounded-full bg-black/70 border border-white/10 mb-2 hover:bg-red-500/50 transition-colors text-white"
                          aria-label="Remove image"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <div className="px-3 py-1.5 rounded-full bg-emerald-500 text-black text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-xl">
                           <CheckCircle2 className="w-3.5 h-3.5" />
                           Product Image Embedded
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-3 group-hover:scale-105 transition-all">
                        <Upload className="w-6 h-6 text-emerald-400" />
                      </div>
                      <p className="text-base font-bold mb-1">Drag and drop any custom product photo</p>
                      <p className="text-gray-500 text-xs">Or use any template preset above to keep testing</p>
                    </>
                  )}
                </div>

                {/* Main Creative Input Sheet */}
                <div className="p-8 rounded-3xl bg-zinc-950/60 border border-white/5 space-y-6">
                  <h3 className="font-bold text-sm uppercase tracking-wider text-emerald-400 border-b border-white/5 pb-2">
                    Step 1: Product Specifications
                  </h3>

                  {/* Name and Niche Selector Grid */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="product-name" className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Product Name</label>
                      <input 
                        id="product-name"
                        type="text" 
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
                        placeholder="e.g. Aero Hydration Pod"
                      />
                    </div>
                    <div>
                      <label htmlFor="niche-template" className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Store Niche Template</label>
                      <select 
                        id="niche-template"
                        value={formNiche}
                        onChange={(e) => handleNicheSelection(e.target.value as Niche)}
                        className="w-full bg-zinc-900 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-emerald-500 focus:outline-none cursor-pointer"
                      >
                        <option value="beauty">Beauty & Living Care</option>
                        <option value="tech">Tech & Hardware Core</option>
                        <option value="luxury">Luxury & Classic Goods</option>
                        <option value="streetwear">Streetwear & Apparel</option>
                        <option value="minimal">Minimalist Haus Writing</option>
                        <option value="educational">Educational & Toys Play</option>
                        <option value="fitness">Active Fitness Sports</option>
                      </select>
                    </div>
                  </div>

                  {/* Hook description */}
                  <div>
                    <label htmlFor="product-hook" className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Product Subtitle Description (Marketing Hook)</label>
                    <textarea 
                      id="product-hook"
                      rows={2}
                      value={formDescription}
                      onChange={(e) => setFormDescription(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-emerald-500 focus:outline-none resize-none"
                      placeholder="Briefly state the emotional hook or physical quality..."
                    />
                  </div>

                  {/* Feature Specifications Grid */}
                  <div className="pt-4 border-t border-white/5 space-y-4">
                    <h3 className="font-bold text-sm uppercase tracking-wider text-indigo-400">
                      Step 2: Distinct Product Features
                    </h3>

                    <div className="grid sm:grid-cols-3 gap-6">
                      {/* Feature 1 */}
                      <div className="space-y-2 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                        <label className="text-[9px] font-black text-[#B5BAC1] uppercase tracking-wide block">Feature 1 Title</label>
                        <input 
                          type="text" 
                          value={formFeature1}
                          onChange={(e) => setFormFeature1(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-xs text-white focus:border-emerald-500 focus:outline-none font-bold"
                        />
                        <textarea 
                          rows={3}
                          value={formFeature1Desc}
                          onChange={(e) => setFormFeature1Desc(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-[11px] text-gray-400 focus:border-emerald-500 focus:outline-none resize-none"
                        />
                      </div>

                      {/* Feature 2 */}
                      <div className="space-y-2 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                        <label className="text-[9px] font-black text-[#B5BAC1] uppercase tracking-wide block">Feature 2 Title</label>
                        <input 
                          type="text" 
                          value={formFeature2}
                          onChange={(e) => setFormFeature2(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-xs text-white focus:border-emerald-500 focus:outline-none font-bold"
                        />
                        <textarea 
                          rows={3}
                          value={formFeature2Desc}
                          onChange={(e) => setFormFeature2Desc(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-[11px] text-gray-400 focus:border-emerald-500 focus:outline-none resize-none"
                        />
                      </div>

                      {/* Feature 3 */}
                      <div className="space-y-2 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                        <label className="text-[9px] font-black text-[#B5BAC1] uppercase tracking-wide block">Feature 3 Title</label>
                        <input 
                          type="text" 
                          value={formFeature3}
                          onChange={(e) => setFormFeature3(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-xs text-white focus:border-emerald-500 focus:outline-none font-bold"
                        />
                        <textarea 
                          rows={3}
                          value={formFeature3Desc}
                          onChange={(e) => setFormFeature3Desc(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-[11px] text-gray-400 focus:border-emerald-500 focus:outline-none resize-none"
                        />
                      </div>

                    </div>
                  </div>

                </div>

                {/* Ultimate Compile Button */}
                <button 
                  onClick={compileLandingPageClientOnly}
                  disabled={isGenerating}
                  className="w-full py-5 rounded-2xl flex items-center justify-center gap-3 text-lg font-black transition-all bg-emerald-500 text-black hover:scale-[1.01] hover:bg-emerald-400 active:scale-95 shadow-xl shadow-emerald-500/10 cursor-pointer"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin text-black" />
                      {generationStep}
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-5 h-5 text-black" />
                      COMPILE LANDING PAGE MODEL
                    </>
                  )}
                </button>
              </div>

              {/* Sidebar Diagnostics */}
              <div className="lg:col-span-4 space-y-6">
                <div className="p-6 rounded-3xl bg-zinc-950/60 border border-white/5">
                  <h3 className="font-bold flex items-center gap-2 mb-4 text-emerald-400 text-sm">
                    <LayoutTemplate className="w-4 h-4 text-emerald-400" />
                    How to Test the Funnels
                  </h3>
                  <div className="space-y-4 text-xs text-gray-400">
                    <p>
                      1. **Preset Testing**: Instantly try beautiful layout combinations pre-optimized by our marketing templates using the cards above.
                    </p>
                    <p>
                      2. **Drop Your Photo**: Drag any product image or screenshot into the zone to embed it directly in the landing page canvas.
                    </p>
                    <p>
                      3. **Live Customizer Panel**: In Preview, use the Left Panel controls to adjust colors, edit raw headline wording, or adjust guarantee text on-the-fly.
                    </p>
                    <p>
                      4. **Export Clean Code**: Click **"Export HTML"** in the top bar to save a standalone single-file webpage package.
                    </p>
                  </div>
                </div>

                {/* Simulated Pipeline Log Panel */}
                <div className="p-6 rounded-3xl bg-zinc-950/60 border border-white/5">
                  <h3 className="font-bold mb-3 text-indigo-400 flex items-center gap-2 text-sm">
                    <Cpu className="w-4 h-4 text-indigo-400" />
                    Static Pipeline Console
                  </h3>
                  <div className="font-mono text-[10px] text-gray-500 space-y-2">
                    <div className="flex justify-between border-b border-white/5 pb-1">
                      <span>Sandbox Engine v4.2</span>
                      <span className="text-emerald-400 font-bold uppercase">Ready</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-1">
                      <span>Local-First Copy v1</span>
                      <span className="text-emerald-400 font-bold uppercase">Ready</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-1">
                      <span>GCP Connections</span>
                      <span className="text-red-400 font-extrabold uppercase">Eradicated</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-1">
                      <span>Server Region Security</span>
                      <span className="text-emerald-400 font-bold uppercase">Offline-Safe</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {viewMode === 'preview' && activePageData && (
          <div className="flex flex-col lg:flex-row h-full min-h-[calc(100vh-6rem)] animate-fade-in relative">
            {/* Live customizer panel */}
            {isSidebarOpen ? (
              <div className="w-full lg:w-96 bg-[#09090b] border-r border-white/10 p-6 space-y-6 flex-shrink-0 z-15">
                <div className="flex justify-between items-center pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-emerald-400" />
                    <span className="font-bold text-sm tracking-wide">Brand & Visual Customizer</span>
                  </div>
                  <button 
                    onClick={() => setIsSidebarOpen(false)}
                    className="p-1 px-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 transition-colors text-xs"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Brand customization */}
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Brand Theme Name</label>
                    <input 
                      type="text" 
                      value={customBrand}
                      onChange={(e) => setCustomBrand(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  {/* Headline */}
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Primary Sales Title</label>
                    <textarea 
                      rows={3}
                      value={customTitle}
                      onChange={(e) => setCustomTitle(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white focus:border-emerald-500 focus:outline-none resize-none"
                    />
                  </div>

                  {/* Subtitle */}
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Marketing Subtitle</label>
                    <textarea 
                      rows={3}
                      value={customSubtitle}
                      onChange={(e) => setCustomSubtitle(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white focus:border-emerald-500 focus:outline-none resize-none"
                    />
                  </div>

                  {/* CTA */}
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">CTA Action Button Text</label>
                    <input 
                      type="text" 
                      value={customCta}
                      onChange={(e) => setCustomCta(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  {/* Guarantee Title */}
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Guarantee Badge Text</label>
                    <input 
                      type="text" 
                      value={customGuaranteeTitle}
                      onChange={(e) => setCustomGuaranteeTitle(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  {/* Colors Engine */}
                  <div className="pt-2 border-t border-white/5">
                    <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block mb-3">Colors Tuning Panel</span>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[9px] font-bold text-gray-500 block mb-1">Primary Color</label>
                        <div className="flex gap-2">
                          <input 
                            type="color" 
                            value={customPrimaryColor}
                            onChange={(e) => setCustomPrimaryColor(e.target.value)}
                            className="bg-transparent border-0 cursor-pointer h-7 w-7 p-0"
                          />
                          <input 
                            type="text" 
                            value={customPrimaryColor}
                            onChange={(e) => setCustomPrimaryColor(e.target.value)}
                            className="flex-1 bg-white/5 border border-white/10 rounded-lg text-[10px] text-center"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[9px] font-bold text-gray-500 block mb-1">Background Theme</label>
                        <div className="flex gap-2">
                          <input 
                            type="color" 
                            value={customBgColor}
                            onChange={(e) => setCustomBgColor(e.target.value)}
                            className="bg-transparent border-0 cursor-pointer h-7 w-7 p-0"
                          />
                          <input 
                            type="text" 
                            value={customBgColor}
                            onChange={(e) => setCustomBgColor(e.target.value)}
                            className="flex-1 bg-white/5 border border-white/10 rounded-lg text-[10px] text-center"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                <div className="pt-4 border-t border-white/10 flex justify-between space-x-2">
                  <button 
                    onClick={() => {
                      setCustomBrand('Custom Atelier');
                      setCustomTitle('Precision Crafted For Professional Comfort.');
                      setCustomSubtitle('Organically milled under sustainable guidelines to guarantee a luxurious lifetime companion.');
                      setCustomPrimaryColor('#B45309');
                      setCustomBgColor('#FDFBF7');
                      setCustomTextColor('#22252A');
                      showNotification('Fitted warm boutique custom design settings', 'info');
                    }}
                    className="flex-1 py-2 rounded-lg bg-zinc-800 text-gray-300 text-[10px] font-bold tracking-wide transition-colors hover:bg-zinc-700"
                  >
                    Boutique Tone
                  </button>
                  <button 
                    onClick={() => {
                      if (pageData) {
                        setCustomBrand(pageData.config.theme || 'Brand');
                        setCustomTitle(pageData.hero.title);
                        setCustomSubtitle(pageData.hero.subtitle);
                        setCustomPrimaryColor(pageData.config.colors.primary);
                        setCustomBgColor(pageData.config.colors.background);
                        setCustomTextColor(pageData.config.colors.text);
                        showNotification('Restored raw generation aesthetics', 'info');
                      }
                    }}
                    className="px-3 py-2 rounded-lg bg-red-950/40 text-red-300 text-[10px] font-bold transition-colors hover:bg-red-900/65"
                  >
                    Reset
                  </button>
                </div>
              </div>
            ) : (
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="absolute top-4 left-4 z-40 px-4 py-2 rounded-full bg-zinc-900/90 border border-white/15 text-xs text-emerald-400 font-bold hover:bg-black transition-all"
              >
                ◀ Show Brand Panel
              </button>
            )}

            {/* Sandbox Render Canvas frame */}
            <div className="flex-1 bg-white rounded-t-[2.5rem] lg:rounded-tl-[3.5rem] lg:rounded-tr-none overflow-hidden shadow-2xl relative">
              <div className="sticky top-0 z-30 p-3 bg-zinc-900 border-b border-white/15 flex justify-between items-center px-6">
                <div className="flex items-center gap-2">
                  <div className="w-2h h-2 rounded-full bg-emerald-500 animate-pulse bg-emerald-500" />
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#B5BAC1]">Live Viewport Frame</span>
                </div>
                <div className="text-[10px] text-gray-400">
                  CSS Injected Variable Theme Mechanics Active
                </div>
              </div>
              <div className="max-h-[82vh] overflow-y-auto">
                <LandingRenderer data={activePageData} productImage={image || undefined} />
              </div>
            </div>
          </div>
        )}

        {viewMode === 'code' && activePageData && (
          <div className="max-w-4xl mx-auto px-6 py-12 animate-fade-in animate-scale-up">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FileCode className="w-5 h-5 text-indigo-400" /> JSON Framework Block Code
            </h2>
            <div className="p-8 rounded-[2rem] bg-zinc-950 border border-white/10 font-mono text-sm overflow-auto max-h-[70vh]">
               <pre className="text-emerald-400">
                 {JSON.stringify(activePageData, null, 2)}
               </pre>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
