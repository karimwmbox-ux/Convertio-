import React from 'react';
import { LandingPageData } from '../types';
import { LucideIcon } from './LucideIcon';
import { cn } from '../lib/utils';
import { Check, Star, ArrowRight, ShieldCheck } from 'lucide-react';

interface Props {
  data: LandingPageData;
  productImage?: string;
}

export const LandingRenderer: React.FC<Props> = ({ data, productImage }) => {
  const { config, hero, features, benefits, social_proof, faq, guarantee, footer } = data;

  // Inject dynamic theme colors as CSS variables
  const themeStyles = {
    '--theme-primary': config.colors.primary,
    '--theme-bg': config.colors.background,
    '--theme-text': config.colors.text,
    backgroundColor: config.colors.background,
    color: config.colors.text,
    fontFamily: config.font || 'Inter, sans-serif'
  } as React.CSSProperties;

  return (
    <div className="min-h-screen font-sans" style={themeStyles}>
      {/* Header / Nav */}
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="text-2xl font-bold tracking-tighter flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[var(--theme-primary)]" />
          <span>{config.theme || 'Brand'}</span>
        </div>
        <button 
          className="px-6 py-2 rounded-full font-medium transition-all hover:scale-105 active:scale-95 bg-[var(--theme-primary)] text-white"
        >
          {hero.cta}
        </button>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-20 md:py-32 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div 
          className="animate-fade-in"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
            {hero.title}
          </h1>
          <p className="text-xl opacity-80 mb-8 leading-relaxed max-w-lg">
            {hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              className="px-8 py-4 rounded-xl text-xl font-bold transition-all hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 bg-[var(--theme-primary)] text-white"
            >
              {hero.cta}
            </button>
            <div className="flex items-center gap-2 text-sm font-medium opacity-60">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              {guarantee.title}
            </div>
          </div>
        </div>

        <div 
          className="relative group animate-scale-up"
        >
          <div 
            className="absolute -inset-4 rounded-3xl blur-3xl opacity-20 group-hover:opacity-30 transition-opacity bg-[var(--theme-primary)]"
          />
          {productImage ? (
            <img 
              src={productImage} 
              alt="Product" 
              className="relative rounded-2xl shadow-2xl w-full h-auto object-cover border border-white/10"
            />
          ) : (
            <div className="relative aspect-square rounded-2xl bg-gray-200 animate-pulse flex items-center justify-center text-gray-400">
              Product Preview
            </div>
          )}
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-24 bg-black/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">Why People Love Us</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div 
                key={i}
                className="p-8 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20 hover:border-[var(--theme-primary)]/30 transition-colors animate-fade-in"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-[var(--theme-primary)]/10 text-[var(--theme-primary)]"
                >
                  <LucideIcon name={feature.icon} className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="opacity-70 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits / Social Proof */}
      <section className="px-6 py-24 max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-4">Unmatched Results</h2>
          <div className="flex justify-center gap-1">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-amber-400 text-amber-400" />)}
          </div>
          <p className="mt-2 text-sm opacity-60 uppercase tracking-widest font-bold">Trusted by thousands</p>
        </div>

        <div className="grid gap-12">
          {benefits.map((benefit, i) => (
            <div 
              key={i}
              className="flex flex-col md:flex-row gap-8 items-center animate-fade-in"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className={cn("flex-1", i % 2 !== 0 && "md:order-2")}>
                <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold mb-4">
                  {benefit.emotional_hook}
                </div>
                <h3 className="text-2xl font-bold mb-4">{benefit.title}</h3>
                <p className="text-lg opacity-80 leading-relaxed">{benefit.description}</p>
              </div>
              <div className="flex-1 w-full aspect-video rounded-2xl bg-black/5 flex items-center justify-center italic opacity-40">
                Visual context placeholder
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-24 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
           {social_proof.reviews.map((review, i) => (
             <div key={i} className="p-8 rounded-2xl bg-gray-50 border border-gray-100 italic">
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, j) => <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-gray-700 mb-6">"{review.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200" />
                  <span className="font-bold text-sm">{review.author}</span>
                </div>
             </div>
           ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-24 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Common Questions</h2>
        <div className="space-y-4">
          {faq.map((item, i) => (
            <details key={i} className="group p-6 rounded-xl bg-black/5 active:bg-black/10 transition-colors">
              <summary className="font-bold flex justify-between items-center cursor-pointer list-none">
                {item.question}
                <ArrowRight className="w-4 h-4 transition-transform group-open:rotate-90" />
              </summary>
              <p className="mt-4 opacity-70 leading-relaxed font-normal">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-24 text-center">
        <div 
          className="max-w-4xl mx-auto p-12 md:p-20 rounded-[2.5rem] relative overflow-hidden bg-[var(--theme-primary)] text-white"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
              Ready to elevate your game?
            </h2>
            <button className="px-12 py-5 rounded-full bg-white text-black text-xl font-bold shadow-xl hover:scale-105 transition-transform active:scale-95">
              Get Started Now
            </button>
            <p className="mt-6 text-sm opacity-80">{guarantee.text}</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-black/5 opacity-60 text-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>{footer.copyright}</div>
          <div className="flex gap-8">
            {footer.links.map((link, i) => <a key={i} href="#" className="hover:underline">{link}</a>)}
          </div>
        </div>
      </footer>
    </div>
  );
};
