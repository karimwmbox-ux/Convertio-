import { MetaCampaign, MetaAdSet, MetaAd, AdMetrics } from './types';

const MOCK_METRICS: AdMetrics = {
  impressions: 12540,
  clicks: 458,
  ctr: 3.65,
  spend: 250.45,
  conversions: 12,
  roas: 4.8,
  cpc: 0.55
};

export const MOCK_CAMPAIGNS: MetaCampaign[] = [
  {
    id: 'camp_1',
    name: 'Summer Launch - Smartwatch',
    objective: 'CONVERSIONS',
    status: 'ACTIVE',
    metrics: { ...MOCK_METRICS },
    suggestions: [
      {
        id: 'sug_1',
        type: 'creative',
        title: 'Refresh Ad Creative',
        description: 'Ad #2 is experiencing creative fatigue. Consider testing a new hero image.',
        impact: 'high'
      }
    ],
    adSets: [
      {
        id: 'adset_1',
        name: 'Tech Enthusiasts - US',
        targetAudience: 'Age 25-45, Interests: Technology, Gadgets, Health',
        budget: 50,
        status: 'ACTIVE',
        metrics: { ...MOCK_METRICS },
        ads: [
          {
            id: 'ad_1',
            name: 'Chronos Feature Video',
            headline: 'The Last Smartwatch You\'ll Ever Buy.',
            body: 'Aerospace titanium meets medical-grade health tracking. Master your time and your health with Chronos v2.',
            cta: 'SHOP NOW',
            imageUrl: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=600&q=80',
            status: 'ACTIVE',
            metrics: { ...MOCK_METRICS }
          }
        ]
      }
    ]
  },
  {
    id: 'camp_2',
    name: 'Retargeting - Abandoned Cart',
    objective: 'CONVERSIONS',
    status: 'PAUSED',
    metrics: {
      impressions: 5400,
      clicks: 120,
      ctr: 2.22,
      spend: 85.20,
      conversions: 5,
      roas: 3.5,
      cpc: 0.71
    },
    suggestions: [],
    adSets: [
      {
        id: 'adset_2',
        name: 'Website Visitors - 30 Days',
        targetAudience: 'Visitors who added to cart but didn\'t purchase',
        budget: 20,
        status: 'PAUSED',
        metrics: {
          impressions: 5400,
          clicks: 120,
          ctr: 2.22,
          spend: 85.20,
          conversions: 5,
          roas: 3.5,
          cpc: 0.71
        },
        ads: [
          {
            id: 'ad_2',
            name: 'Reminder Ad - 10% Off',
            headline: 'Still Thinking About It?',
            body: 'Get 10% off your first order with code WELCOME10. Don\'t miss out on the future of health tracking.',
            cta: 'GET OFFER',
            imageUrl: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=600&q=80',
            status: 'PAUSED',
            metrics: {
              impressions: 5400,
              clicks: 120,
              ctr: 2.22,
              spend: 85.20,
              conversions: 5,
              roas: 3.5,
              cpc: 0.71
            }
          }
        ]
      }
    ]
  }
];
