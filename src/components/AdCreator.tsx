import React, { useState, useId } from 'react';
import { MetaAd } from '../types';
import { AdPreview } from './AdPreview';
import { Wand2, Image as ImageIcon, Layout, Type, Loader2 } from 'lucide-react';

interface Props {
  onSave: (ad: Partial<MetaAd>) => void;
  initialData?: Partial<MetaAd>;
}

export const AdCreator: React.FC<Props> = ({ onSave, initialData }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [ad, setAd] = useState<Partial<MetaAd>>(initialData || {
    name: '',
    headline: '',
    body: '',
    cta: 'Learn More',
    imageUrl: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAd(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerateCopy = () => {
    setIsGenerating(true);
    // Simulating AI generation
    setTimeout(() => {
      setAd(prev => ({
        ...prev,
        headline: "The Future of Professional Gear.",
        body: "Experience unmatched quality and design. Our latest collection is engineered for those who demand excellence in every detail. Limited stock available."
      }));
      setIsGenerating(false);
    }, 800);
  };

  const adNameId = useId();
  const adBodyId = useId();
  const adHeadlineId = useId();
  const adCtaId = useId();
  const adImageUrlId = useId();

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-start">
      {/* Form Side */}
      <div className="space-y-6 bg-zinc-950/60 p-8 rounded-3xl border border-white/5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-emerald-400 uppercase tracking-wider text-sm flex items-center gap-2">
            <Layout className="w-4 h-4" /> Ad Creative Settings
          </h3>
          <button
            onClick={handleGenerateCopy}
            disabled={isGenerating}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-bold text-indigo-400 hover:bg-indigo-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-3 h-3 animate-spin" /> Generating...
              </>
            ) : (
              <>
                <Wand2 className="w-3 h-3" /> Magic Generate
              </>
            )}
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor={adNameId} className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Ad Name</label>
            <input
              id={adNameId}
              name="name"
              value={ad.name}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
              placeholder="e.g. Summer Launch - V1"
            />
          </div>

          <div>
            <label htmlFor={adBodyId} className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
              <Type className="w-3 h-3" /> Primary Text (Body)
            </label>
            <textarea
              id={adBodyId}
              name="body"
              rows={4}
              value={ad.body}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-emerald-500 focus:outline-none resize-none"
              placeholder="Tell people what your ad is about..."
            />
          </div>

          <div>
            <label htmlFor={adHeadlineId} className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Headline</label>
            <input
              id={adHeadlineId}
              name="headline"
              value={ad.headline}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
              placeholder="Catchy headline"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor={adCtaId} className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Call to Action</label>
              <select
                id={adCtaId}
                name="cta"
                value={ad.cta}
                onChange={handleChange}
                className="w-full bg-zinc-900 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-emerald-500 focus:outline-none cursor-pointer"
              >
                <option value="Learn More">Learn More</option>
                <option value="Shop Now">Shop Now</option>
                <option value="Get Offer">Get Offer</option>
                <option value="Sign Up">Sign Up</option>
              </select>
            </div>
            <div>
              <label htmlFor={adImageUrlId} className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                <ImageIcon className="w-3 h-3" /> Image URL
              </label>
              <input
                id={adImageUrlId}
                name="imageUrl"
                value={ad.imageUrl}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
                placeholder="https://images.unsplash.com/..."
              />
            </div>
          </div>
        </div>

        <button
          onClick={() => onSave(ad)}
          className="w-full py-4 rounded-2xl bg-emerald-500 text-black font-black text-sm hover:bg-emerald-400 transition-all active:scale-95 mt-4"
        >
          SAVE AD CREATIVE
        </button>
      </div>

      {/* Preview Side */}
      <div className="space-y-4">
        <h3 className="font-bold text-indigo-400 uppercase tracking-wider text-sm">Live Mobile Preview</h3>
        <div className="flex justify-center bg-zinc-900/40 p-10 rounded-3xl border border-dashed border-white/10">
          <AdPreview ad={ad} />
        </div>
      </div>
    </div>
  );
};
