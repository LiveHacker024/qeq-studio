import React, { useRef } from 'react';
import { DESIGN_PRESETS } from '../../data/customStudioData';
import { CustomDesignReference } from '../../types/customOrder';
import { Upload, X, Image as ImageIcon, Sparkles, Check } from 'lucide-react';

interface NailDesignSelectorProps {
  selectedDesign: string;
  onSelectDesign: (design: string) => void;
  designReference: CustomDesignReference | null;
  onUploadReference: (ref: CustomDesignReference | null) => void;
}

export const NailDesignSelector: React.FC<NailDesignSelectorProps> = ({
  selectedDesign,
  onSelectDesign,
  designReference,
  onUploadReference
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a valid image file (JPG, PNG, or WEBP).');
      return;
    }

    // Create local object URL for preview
    const previewUrl = URL.createObjectURL(file);
    onUploadReference({
      name: file.name,
      previewUrl,
      file
    });

    // Auto-select 'Custom Design' if not already selected
    if (selectedDesign !== 'Custom Design') {
      onSelectDesign('Custom Design');
    }
  };

  const handleRemoveReference = () => {
    if (designReference?.previewUrl) {
      URL.revokeObjectURL(designReference.previewUrl);
    }
    onUploadReference(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-blue-400 block mb-1">
            Step 2 • Artwork & Pattern
          </span>
          <h3 className="text-base font-bold text-white tracking-tight">
            CHOOSE NAIL DESIGN
          </h3>
        </div>

        <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-200 font-semibold">
          {selectedDesign}
        </div>
      </div>

      {/* Design Presets Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3">
        {DESIGN_PRESETS.map((item) => {
          const isSelected = selectedDesign === item.name;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectDesign(item.name)}
              className={`p-3.5 rounded-2xl text-left transition-all duration-300 border flex flex-col justify-between relative group ${
                isSelected
                  ? 'bg-blue-950/40 border-blue-400 shadow-lg shadow-blue-900/30 -translate-y-0.5'
                  : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span className="text-[9px] uppercase font-bold tracking-wider text-blue-300/80">
                    {item.tag}
                  </span>
                  {isSelected && (
                    <div className="w-4 h-4 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                  )}
                </div>

                <h4 className={`text-xs sm:text-sm font-bold truncate ${
                  isSelected ? 'text-white' : 'text-gray-200 group-hover:text-white'
                }`}>
                  {item.name}
                </h4>

                <p className="text-[11px] text-gray-400 line-clamp-2 mt-1 leading-snug font-light">
                  {item.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Optional Reference Upload Section */}
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Upload className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-gray-200">
              Upload Your Design Reference (Optional)
            </span>
          </div>
          <span className="text-[10px] text-gray-400">JPG, PNG, WEBP</span>
        </div>

        {/* Upload Box / Active File Preview */}
        {!designReference ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-white/15 hover:border-blue-400/60 rounded-2xl p-5 text-center cursor-pointer transition-all bg-white/[0.02] hover:bg-white/[0.05] group"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".jpg,.jpeg,.png,.webp"
              onChange={handleFileChange}
              className="hidden"
              id="custom-design-upload"
            />
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="w-10 h-10 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-200 group-hover:text-white">
                  Click or drag reference photo here
                </p>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  Have an Instagram/Pinterest inspo image? Attach it for your artisan consultation.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-[#12121A] border border-blue-500/40 shadow-xl flex items-center justify-between gap-4 animate-fade-in">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/20 bg-black shrink-0">
                <img
                  src={designReference.previewUrl}
                  alt={designReference.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-white truncate">
                    {designReference.name}
                  </span>
                </div>
                <p className="text-[11px] text-emerald-400 flex items-center gap-1 mt-0.5">
                  <Check className="w-3 h-3" />
                  <span>Ready for WhatsApp consultation</span>
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleRemoveReference}
              className="p-2 text-gray-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors shrink-0"
              title="Remove reference image"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

    </div>
  );
};
