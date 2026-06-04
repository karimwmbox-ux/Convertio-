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

/**
 * Meta Ads Platform Types
 */

export interface AdMetrics {
  impressions: number;
  clicks: number;
  ctr: number;
  spend: number;
  conversions: number;
  roas: number;
  cpc: number;
}

export interface OptimizationSuggestion {
  id: string;
  type: 'creative' | 'targeting' | 'budget';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
}

export interface MetaAd {
  id: string;
  name: string;
  headline: string;
  body: string;
  cta: string;
  imageUrl: string;
  status: 'ACTIVE' | 'PAUSED' | 'ARCHIVED';
  metrics: AdMetrics;
}

export interface MetaAdSet {
  id: string;
  name: string;
  targetAudience: string;
  budget: number;
  status: 'ACTIVE' | 'PAUSED' | 'ARCHIVED';
  ads: MetaAd[];
  metrics: AdMetrics;
}

export interface MetaCampaign {
  id: string;
  name: string;
  objective: 'CONVERSIONS' | 'TRAFFIC' | 'AWARENESS';
  status: 'ACTIVE' | 'PAUSED' | 'ARCHIVED';
  adSets: MetaAdSet[];
  metrics: AdMetrics;
  suggestions: OptimizationSuggestion[];
}
