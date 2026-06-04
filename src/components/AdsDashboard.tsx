import React, { useState } from 'react';
import { MOCK_CAMPAIGNS } from '../mockAdsData';
import { AdAnalytics } from './AdAnalytics';
import { AdCreator } from './AdCreator';
import { MetaCampaign, MetaAd } from '../types';
import {
  BarChart2, Plus, Play, Pause, AlertCircle, ChevronRight,
  Target, Rocket, Sparkles, Filter
} from 'lucide-react';
import { cn } from '../lib/utils';

export const AdsDashboard: React.FC = () => {
  const [campaigns, setCampaigns] = useState<MetaCampaign[]>(MOCK_CAMPAIGNS);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(campaigns[0]?.id);

  const selectedCampaign = campaigns.find(c => c.id === selectedCampaignId);

  const toggleStatus = (id: string) => {
    setCampaigns(prev => prev.map(c => {
      if (c.id === id) {
        return { ...c, status: c.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE' };
      }
      return c;
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 animate-fade-in">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2">
            Ads <span className="text-emerald-400">Manager</span>
          </h1>
          <p className="text-gray-400 text-sm">Monitor performance and optimize your Meta Ads in real-time.</p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold hover:bg-white/10 transition-all">
            <Filter className="w-3.5 h-3.5" /> Filter
          </button>
          <button
            onClick={() => setIsCreating(!isCreating)}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 text-black font-black text-sm hover:bg-emerald-400 transition-all active:scale-95 shadow-lg shadow-emerald-500/20"
          >
            {isCreating ? 'BACK TO DASHBOARD' : (
              <><Plus className="w-4 h-4" /> CREATE NEW AD</>
            )}
          </button>
        </div>
      </div>

      {isCreating ? (
        <AdCreator onSave={(ad) => {
          console.log('Ad Saved:', ad);
          setIsCreating(false);
        }} />
      ) : (
        <div className="space-y-8">
          {/* Optimization Suggestions Banner */}
          {selectedCampaign && selectedCampaign.suggestions.length > 0 && (
            <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-3xl p-6 flex flex-col md:flex-row items-center gap-6">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-indigo-400 text-sm uppercase tracking-wider mb-1">AI Optimization Engine</h3>
                <p className="text-gray-300 font-medium">{selectedCampaign.suggestions[0].title}: {selectedCampaign.suggestions[0].description}</p>
              </div>
              <button className="px-6 py-2.5 rounded-xl bg-indigo-500 text-white font-bold text-xs hover:bg-indigo-600 transition-all whitespace-nowrap">
                APPLY OPTIMIZATION
              </button>
            </div>
          )}

          {/* Quick Metrics */}
          {selectedCampaign && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
                <BarChart2 className="w-3 h-3" /> Performance Overview: {selectedCampaign.name}
              </div>
              <AdAnalytics metrics={selectedCampaign.metrics} />
            </div>
          )}

          {/* Campaigns Table */}
          <div className="bg-zinc-950/60 rounded-3xl border border-white/5 overflow-hidden">
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <Target className="w-4 h-4 text-emerald-400" /> Active Campaigns
              </h3>
              <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                Last updated: Just now
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-[10px] font-black text-gray-500 uppercase tracking-widest border-b border-white/5">
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Campaign Name</th>
                    <th className="px-6 py-4">Objective</th>
                    <th className="px-6 py-4 text-right">Spend</th>
                    <th className="px-6 py-4 text-right">ROAS</th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {campaigns.map((camp) => (
                    <tr
                      key={camp.id}
                      onClick={() => setSelectedCampaignId(camp.id)}
                      className={cn(
                        "group cursor-pointer transition-colors",
                        selectedCampaignId === camp.id ? "bg-emerald-500/5" : "hover:bg-white/[0.02]"
                      )}
                    >
                      <td className="px-6 py-4">
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleStatus(camp.id); }}
                          className={cn(
                            "flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-bold transition-all",
                            camp.status === 'ACTIVE'
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : "bg-gray-500/10 text-gray-400 border border-gray-500/20"
                          )}
                        >
                          {camp.status === 'ACTIVE' ? <Play className="w-2.5 h-2.5 fill-emerald-400" /> : <Pause className="w-2.5 h-2.5 fill-gray-400" />}
                          {camp.status}
                        </button>
                      </td>
                      <td className="px-6 py-4 font-bold text-white group-hover:text-emerald-400 transition-colors">
                        {camp.name}
                      </td>
                      <td className="px-6 py-4 text-gray-400">
                        <span className="flex items-center gap-1.5">
                          <Rocket className="w-3.5 h-3.5" /> {camp.objective}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right font-mono text-gray-300">
                        ${camp.metrics.spend.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className={cn(
                          "font-bold",
                          camp.metrics.roas >= 4 ? "text-emerald-400" : camp.metrics.roas >= 2 ? "text-orange-400" : "text-red-400"
                        )}>
                          {camp.metrics.roas}x
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-white transition-all group-hover:translate-x-1 inline" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
