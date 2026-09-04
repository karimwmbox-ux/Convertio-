import React from 'react';
import { MetaAd } from '../types';
import { MoreHorizontal, ThumbsUp, MessageCircle, Share2, Globe } from 'lucide-react';

interface Props {
  ad: Partial<MetaAd>;
}

export const AdPreview: React.FC<Props> = ({ ad }) => {
  return (
    <div className="max-w-[500px] bg-white text-[#1c1e21] rounded-lg shadow-sm border border-[#dddfe2] font-sans overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl">
            B
          </div>
          <div>
            <div className="font-bold text-[15px] hover:underline cursor-pointer">Brand Name</div>
            <div className="flex items-center gap-1 text-[13px] text-[#65676b]">
              <span>Sponsored</span>
              <span>·</span>
              <Globe className="w-3 h-3" />
            </div>
          </div>
        </div>
        <button
          type="button"
          aria-label="More options"
          className="text-[#65676b] hover:bg-[#f2f2f2] p-2 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Primary Text */}
      <div className="px-4 pb-3 text-[15px] leading-tight">
        {ad.body || 'Your ad primary text will appear here. Tell people what your product is about.'}
      </div>

      {/* Media */}
      <div className="bg-[#f0f2f5] aspect-[1.91/1] flex items-center justify-center overflow-hidden border-y border-[#dddfe2]">
        {ad.imageUrl ? (
          <img
            src={ad.imageUrl}
            alt={ad.headline ? `Ad preview image for ${ad.headline}` : 'Ad preview image'}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-gray-400 text-sm font-medium">Image Placeholder</div>
        )}
      </div>

      {/* Bottom Bar / CTA */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#f0f2f5]">
        <div className="flex-1 min-w-0 pr-4">
          <div className="text-[13px] text-[#65676b] uppercase tracking-wide truncate">
            CONVERTO.AI
          </div>
          <div className="font-bold text-[17px] leading-tight truncate">
            {ad.headline || 'Your Ad Headline'}
          </div>
        </div>
        <button
          type="button"
          className="px-4 py-2 bg-[#e4e6eb] hover:bg-[#d8dadf] text-[#050505] font-bold text-[15px] rounded-md transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          {ad.cta || 'Learn More'}
        </button>
      </div>

      {/* Interactions */}
      <div className="px-4 py-2 flex items-center justify-between border-t border-[#dddfe2] mx-3 my-1">
        <button
          type="button"
          aria-label="Like ad"
          className="flex items-center gap-1.5 text-[#65676b] hover:text-[#1c1e21] text-[15px] font-medium py-1.5 px-2 hover:bg-[#f2f2f2] rounded-md flex-1 justify-center cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          <ThumbsUp className="w-5 h-5" /> Like
        </button>
        <button
          type="button"
          aria-label="Comment on ad"
          className="flex items-center gap-1.5 text-[#65676b] hover:text-[#1c1e21] text-[15px] font-medium py-1.5 px-2 hover:bg-[#f2f2f2] rounded-md flex-1 justify-center cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          <MessageCircle className="w-5 h-5" /> Comment
        </button>
        <button
          type="button"
          aria-label="Share ad"
          className="flex items-center gap-1.5 text-[#65676b] hover:text-[#1c1e21] text-[15px] font-medium py-1.5 px-2 hover:bg-[#f2f2f2] rounded-md flex-1 justify-center cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          <Share2 className="w-5 h-5" /> Share
        </button>
      </div>
    </div>
  );
};
