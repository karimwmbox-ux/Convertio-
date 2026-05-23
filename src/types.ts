/**
 * Core types for the AI-generated landing page structure
 */

export type Niche = 
  | 'luxury' 
  | 'streetwear' 
  | 'beauty' 
  | 'tech' 
  | 'minimal' 
  | 'educational' 
  | 'fitness';

export type MarketingStructure = 
  | 'AIDA' 
  | 'PAS' 
  | 'BAB' 
  | 'HookStoryOffer';

export interface LandingPageData {
  config: {
    theme: string;
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      background: string;
      text: string;
    };
    font: string;
    niche: Niche;
    language: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
    imageDescription?: string; // For generating secondary images if needed
  };
  features: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  benefits: Array<{
    title: string;
    description: string;
    emotional_hook: string;
  }>;
  social_proof: {
    reviews: Array<{
      author: string;
      text: string;
      rating: number;
    }>;
    trust_badges: string[];
  };
  faq: Array<{
    question: string;
    answer: string;
  }>;
  guarantee: {
    title: string;
    text: string;
  };
  footer: {
    copyright: string;
    links: string[];
  };
}

export interface AnalysisResult {
  productName: string;
  description: string;
  niche: Niche;
  keyFeatures: string[];
  targetAudience: string;
  suggestedStructure: MarketingStructure;
}
