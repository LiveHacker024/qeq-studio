import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Ruler, ArrowRight } from 'lucide-react';

export const SizeAndCareGuideSection: React.FC = () => {
  const { setIsSizeGuideOpen } = useStore();

  const steps = [
    {
      step: '01',
      title: 'CLEAN & PREPARE',
      desc: 'Clean natural nails thoroughly and ensure nails are completely dry.'
    },
    {
      step: '02',
      title: 'SELECT SIZE & ADHESIVE',
      desc: 'Select the matching nail size for each finger and place adhesive tabs.'
    },
    {
      step: '03',
      title: 'ALIGN & PRESS',
      desc: 'Align nail at the cuticle line and press firmly for 30 seconds for secure placement.'
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
      
      {/* Top Banner */}
      <div className="rounded-3xl glass-dark border border-white/10 p-8 sm:p-12 lg:p-16 relative overflow-hidden bg-gradient-to-br from-[#0F1322] via-[#0A0A0E] to-[#0A0A0E]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 relative z-10">
          
          <div className="max-w-2xl">
            <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-blue-400 mb-2 block">
              Application & Fit Guide
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
              SIMPLE APPLICATION & ACCURATE SIZING
            </h2>
            <p className="text-gray-300 text-sm sm:text-base font-light leading-relaxed mb-6">
              Handmade press-on nails designed for comfortable wear. Available in standard sizes XS–XL and custom sizing.
            </p>

            <button
              onClick={() => setIsSizeGuideOpen(true)}
              className="btn-luxury-secondary text-xs tracking-widest uppercase py-3.5 px-6 inline-flex items-center gap-2"
            >
              <Ruler className="w-4 h-4 text-champagne-gold" />
              <span>Open Size Measurement Guide</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </button>
          </div>

          {/* Sizing & Packaging Overview */}
          <div className="grid grid-cols-2 gap-4 w-full lg:w-auto shrink-0">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-center">
              <span className="text-2xl font-bold font-mono text-blue-400 block mb-1">72 Nails</span>
              <span className="text-xs text-gray-400">Normal (3 Packs × 24)</span>
            </div>
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-center">
              <span className="text-2xl font-bold font-mono text-champagne-soft block mb-1">10 Nails</span>
              <span className="text-xs text-gray-400">Premium (1 Pack)</span>
            </div>
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-center">
              <span className="text-2xl font-bold font-mono text-white block mb-1">100%</span>
              <span className="text-xs text-gray-400">Handmade Craft</span>
            </div>
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-center">
              <span className="text-2xl font-bold font-mono text-emerald-400 block mb-1">XS – XL</span>
              <span className="text-xs text-gray-400">Standard & Custom</span>
            </div>
          </div>

        </div>

        {/* 3 Step Cards Below */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14 pt-12 border-t border-white/10">
          {steps.map(step => (
            <div key={step.step} className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <span className="font-mono text-2xl font-bold text-blue-500">{step.step}</span>
                <h3 className="font-editorial text-base font-bold text-white tracking-wider">{step.title}</h3>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed pl-9 font-light">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
