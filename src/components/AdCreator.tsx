import React, { useState, useId, useRef, useEffect } from 'react';
import { MetaAd } from '../types';
import { AdPreview } from './AdPreview';
import { Wand2, Image as ImageIcon, Layout, Type, RefreshCw } from 'lucide-react';

interface Props {
  onSave: (ad: Partial<MetaAd>) => void;
  initialData?: Partial<MetaAd>;
}

export const AdCreator: React.FC<Props> = ({ onSave, initialData }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);
  const [nameId, bodyId, headlineId, ctaId, imageUrlId] = [useId(), useId(), useId(), useId(), useId()];
  const [ad, setAd] = useState<Partial<MetaAd>>({
    name: '', headline: '', body: '', cta: 'Learn More', imageUrl: '', ...initialData
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setAd(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleGenerateCopy = () => {
    setIsGenerating(true);
    timerRef.current = setTimeout(() => {
      setAd(prev => ({
        ...prev,
        headline: "The Future of Professional Gear.",
        body: "Experience unmatched quality and design. Our latest collection is engineered for those who demand excellence in every detail. Limited stock available."
      }));
      setIsGenerating(false);
    }, 800);
  };

  const renderLabel = (id: string, text: string, len?: number, max?: number, icon?: React.ReactNode) => (
    <div className="flex justify-between items-center mb-1.5">
      <label htmlFor={id} className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 cursor-pointer">
        {icon}{text}
      </label>
      {max !== undefined && (
        <span className={`text-[10px] font-bold ${len && len > max ? 'text-red-500' : len && len >= max * 0.8 ? 'text-orange-500' : 'text-gray-500'}`}>
          {len || 0}/{max}
        </span>
      )}
    </div>
  );

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-start">
      <div className="space-y-6 bg-zinc-950/60 p-8 rounded-3xl border border-white/5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-emerald-400 uppercase tracking-wider text-sm flex items-center gap-2">
            <Layout className="w-4 h-4" /> Ad Creative Settings
          </h3>
          <button
            onClick={handleGenerateCopy}
            disabled={isGenerating}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-bold text-indigo-400 hover:bg-indigo-500/20 transition-all disabled:opacity-50 cursor-pointer"
          >
            {isGenerating ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Wand2 className="w-3 h-3" />}
            {isGenerating ? 'Generating...' : 'Magic Generate'}
          </button>
        </div>

        <div className="space-y-4">
          <div>
            {renderLabel(nameId, "Ad Name")}
            <input
              id={nameId}
              name="name"
              value={ad.name}
              onChange={handleChange}
              disabled={isGenerating}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-emerald-500 focus:outline-none disabled:opacity-50"
              placeholder="e.g. Summer Launch - V1"
            />
          </div>

          <div>
            {renderLabel(bodyId, "Primary Text (Body)", ad.body?.length, 125, <Type className="w-3 h-3" />)}
            <textarea
              id={bodyId}
              name="body"
              rows={4}
              value={ad.body}
              onChange={handleChange}
              disabled={isGenerating}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-emerald-500 focus:outline-none resize-none disabled:opacity-50"
              placeholder="Tell people what your ad is about..."
            />
          </div>

          <div>
            {renderLabel(headlineId, "Headline", ad.headline?.length, 40)}
            <input
              id={headlineId}
              name="headline"
              value={ad.headline}
              onChange={handleChange}
              disabled={isGenerating}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-emerald-500 focus:outline-none disabled:opacity-50"
              placeholder="Catchy headline"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              {renderLabel(ctaId, "Call to Action")}
              <select
                id={ctaId}
                name="cta"
                value={ad.cta}
                onChange={handleChange}
                disabled={isGenerating}
                className="w-full bg-zinc-900 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-emerald-500 focus:outline-none cursor-pointer disabled:opacity-50"
              >
                <option value="Learn More">Learn More</option>
                <option value="Shop Now">Shop Now</option>
                <option value="Get Offer">Get Offer</option>
                <option value="Sign Up">Sign Up</option>
              </select>
            </div>
            <div>
              {renderLabel(imageUrlId, "Image URL", undefined, undefined, <ImageIcon className="w-3 h-3" />)}
              <input
                id={imageUrlId}
                name="imageUrl"
                value={ad.imageUrl}
                onChange={handleChange}
                disabled={isGenerating}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-emerald-500 focus:outline-none disabled:opacity-50"
                placeholder="https://images.unsplash.com/..."
              />
            </div>
          </div>
        </div>

        <button
          onClick={() => onSave(ad)}
          disabled={isGenerating}
          className="w-full py-4 rounded-2xl bg-emerald-500 text-black font-black text-sm hover:bg-emerald-400 transition-all active:scale-95 mt-4 disabled:opacity-50 cursor-pointer"
        >
          SAVE AD CREATIVE
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
