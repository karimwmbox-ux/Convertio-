import React, { useState, useId, useRef, useEffect } from 'react';
import { MetaAd } from '../types';
import { AdPreview } from './AdPreview';
import { Wand2, Image as ImageIcon, Layout, Type, RefreshCw } from 'lucide-react';
import { cn } from '../lib/utils';

interface Props {
  onSave: (ad: Partial<MetaAd>) => void;
  initialData?: Partial<MetaAd>;
}

const defs = { name: '', headline: '', body: '', cta: 'Learn More', imageUrl: '' };

export const AdCreator: React.FC<Props> = ({ onSave, initialData }) => {
  const [ad, setAd] = useState<Partial<MetaAd>>({ ...defs, ...initialData });
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const nameId = useId(), bodyId = useId(), headlineId = useId(), ctaId = useId(), imageUrlId = useId();
  const tGen = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tSav = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (tGen.current) clearTimeout(tGen.current);
    if (tSav.current) clearTimeout(tSav.current);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setAd(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleGenerateCopy = () => {
    setIsGenerating(true);
    tGen.current = setTimeout(() => {
      setAd(prev => ({ ...prev, headline: "The Future of Professional Gear.", body: "Experience unmatched quality and design. Our latest collection is engineered for those who demand excellence in every detail. Limited stock available." }));
      setIsGenerating(false);
    }, 800);
  };

  const handleSave = () => {
    setIsSaving(true);
    tSav.current = setTimeout(() => {
      onSave(ad);
      setIsSaving(false);
    }, 800);
  };

  const getCol = (l: number, lim: number) => l > lim ? 'text-red-500 font-bold' : l >= lim * 0.8 ? 'text-orange-500 font-bold' : 'text-gray-500';

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-start">
      <div className="space-y-6 bg-zinc-950/60 p-8 rounded-3xl border border-white/5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-emerald-400 uppercase tracking-wider text-sm flex items-center gap-2">
            <Layout className="w-4 h-4" /> Ad Creative Settings
          </h3>
          <button type="button" onClick={handleGenerateCopy} disabled={isGenerating || isSaving} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-bold text-indigo-400 hover:bg-indigo-500/20 transition-all disabled:opacity-50">
            {isGenerating ? <><RefreshCw className="w-3 h-3 animate-spin" /> Generating...</> : <><Wand2 className="w-3 h-3" /> Magic Generate</>}
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor={nameId} className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5 cursor-pointer">Ad Name</label>
            <input id={nameId} disabled={isSaving || isGenerating} name="name" value={ad.name} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-emerald-500 focus:outline-none" placeholder="e.g. Summer Launch - V1" />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5"><label htmlFor={bodyId} className="text-[10px] font-bold text-gray-400 uppercase tracking-wider cursor-pointer flex items-center gap-1.5"><Type className="w-3 h-3" /> Primary Text (Body)</label><span className={cn("text-[10px]", getCol((ad.body || '').length, 125))}>{(ad.body || '').length}/125</span></div>
            <textarea id={bodyId} disabled={isSaving || isGenerating} name="body" rows={4} value={ad.body} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-emerald-500 focus:outline-none resize-none" placeholder="Tell people what your ad is about..." />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5"><label htmlFor={headlineId} className="text-[10px] font-bold text-gray-400 uppercase tracking-wider cursor-pointer">Headline</label><span className={cn("text-[10px]", getCol((ad.headline || '').length, 40))}>{(ad.headline || '').length}/40</span></div>
            <input id={headlineId} disabled={isSaving || isGenerating} name="headline" value={ad.headline} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-emerald-500 focus:outline-none" placeholder="Catchy headline" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor={ctaId} className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5 cursor-pointer">Call to Action</label>
              <select id={ctaId} disabled={isSaving || isGenerating} name="cta" value={ad.cta} onChange={handleChange} className="w-full bg-zinc-900 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-emerald-500 focus:outline-none cursor-pointer">
                <option value="Learn More">Learn More</option>
                <option value="Shop Now">Shop Now</option>
                <option value="Get Offer">Get Offer</option>
                <option value="Sign Up">Sign Up</option>
              </select>
            </div>
            <div>
              <label htmlFor={imageUrlId} className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5 cursor-pointer"><ImageIcon className="w-3 h-3" /> Image URL</label>
              <input id={imageUrlId} disabled={isSaving || isGenerating} name="imageUrl" value={ad.imageUrl} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-emerald-500 focus:outline-none" placeholder="https://images.unsplash.com/..." />
            </div>
          </div>
        </div>

        <button onClick={handleSave} disabled={isSaving || isGenerating} className="w-full py-4 rounded-2xl bg-emerald-500 text-black font-black text-sm hover:bg-emerald-400 transition-all active:scale-95 mt-4 flex items-center justify-center gap-2 disabled:opacity-50">
          {isSaving ? <><RefreshCw className="w-4 h-4 animate-spin text-black" /> SAVING...</> : 'SAVE AD CREATIVE'}
        </button>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-indigo-400 uppercase tracking-wider text-sm">Live Mobile Preview</h3>
        <div className="flex justify-center bg-zinc-900/40 p-10 rounded-3xl border border-dashed border-white/10">
          <AdPreview ad={ad} />
        </div>
      </div>
    </div>
  );
};
