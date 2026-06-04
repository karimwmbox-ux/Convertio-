import { AdMetrics, OptimizationSuggestion } from '../types';

/**
 * Generates optimization suggestions based on ad performance metrics.
 */
export function getOptimizationSuggestions(metrics: AdMetrics): OptimizationSuggestion[] {
  const suggestions: OptimizationSuggestion[] = [];

  // CTR Analysis
  if (metrics.ctr < 1.0) {
    suggestions.push({
      id: `opt_ctr_${Date.now()}`,
      type: 'creative',
      title: 'Low Click-Through Rate (CTR)',
      description: 'Your CTR is below 1%. This usually indicates that your creative or headline is not resonating with the audience. Try testing a more provocative hook or higher-contrast images.',
      impact: 'high'
    });
  } else if (metrics.ctr < 2.0) {
    suggestions.push({
      id: `opt_ctr_med_${Date.now()}`,
      type: 'creative',
      title: 'Average CTR',
      description: 'Your CTR is healthy but could be better. Consider A/B testing different CTA buttons like "Learn More" vs "Shop Now".',
      impact: 'medium'
    });
  }

  // ROAS Analysis
  if (metrics.roas < 2.0) {
    suggestions.push({
      id: `opt_roas_${Date.now()}`,
      type: 'budget',
      title: 'Low Return on Ad Spend (ROAS)',
      description: 'You are barely breaking even. Review your landing page conversion rate and ensure the offer is compelling enough. Consider narrowing your targeting to high-intent audiences.',
      impact: 'high'
    });
  }

  // CPC Analysis
  if (metrics.cpc > 1.5) {
    suggestions.push({
      id: `opt_cpc_${Date.now()}`,
      type: 'targeting',
      title: 'High Cost Per Click (CPC)',
      description: 'Your CPC is higher than average for this niche. This often happens when targeting is too broad or competition is high. Try using Lookalike Audiences or more specific interest targeting.',
      impact: 'medium'
    });
  }

  // Conversions Analysis
  if (metrics.conversions === 0 && metrics.clicks > 100) {
    suggestions.push({
      id: `opt_conv_${Date.now()}`,
      type: 'creative',
      title: 'No Conversions detected',
      description: 'You have high traffic but zero sales. This is almost always a Landing Page issue. Check your checkout flow for friction or bugs.',
      impact: 'high'
    });
  }

  return suggestions;
}

/**
 * Formats currency values.
 */
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

/**
 * Formats large numbers with commas.
 */
export const formatNumber = (num: number) => {
  return new Intl.NumberFormat('en-US').format(num);
};
