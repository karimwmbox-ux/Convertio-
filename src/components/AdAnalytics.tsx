import React from 'react';
import { AdMetrics } from '../types';
import { formatCurrency, formatNumber } from '../lib/adUtils';
import { TrendingUp, MousePointer2, Target, Wallet, BarChart3, Repeat } from 'lucide-react';

interface Props {
  metrics: AdMetrics;
}

export const AdAnalytics: React.FC<Props> = ({ metrics }) => {
  const cards = [
    { label: 'Spend', value: formatCurrency(metrics.spend), icon: Wallet, color: 'text-blue-400' },
    { label: 'Impressions', value: formatNumber(metrics.impressions), icon: BarChart3, color: 'text-purple-400' },
    { label: 'Clicks', value: formatNumber(metrics.clicks), icon: MousePointer2, color: 'text-emerald-400' },
    { label: 'CTR', value: `${metrics.ctr}%`, icon: TrendingUp, color: 'text-orange-400' },
    { label: 'Conversions', value: metrics.conversions, icon: Target, color: 'text-red-400' },
    { label: 'ROAS', value: `${metrics.roas}x`, icon: Repeat, color: 'text-indigo-400' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {cards.map((card, i) => (
        <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-2xl">
          <div className="flex items-center justify-between mb-2">
            <card.icon className={`w-4 h-4 ${card.color}`} />
          </div>
          <div className="text-2xl font-black text-white">{card.value}</div>
          <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{card.label}</div>
        </div>
      ))}
    </div>
  );
};
