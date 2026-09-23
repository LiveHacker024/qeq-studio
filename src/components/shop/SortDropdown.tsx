import React from 'react';
import { ArrowUpDown } from 'lucide-react';

export type SortOption = 'featured' | 'newest' | 'price-low' | 'price-high' | 'name';

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export const SortDropdown: React.FC<SortDropdownProps> = ({ value, onChange }) => {
  return (
    <div className="relative inline-flex items-center">
      <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-gray-300">
        <ArrowUpDown className="w-3.5 h-3.5 text-blue-400" />
        <span className="text-gray-400">Sort:</span>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as SortOption)}
          className="bg-transparent text-white font-medium focus:outline-none cursor-pointer pr-2"
        >
          <option value="featured" className="bg-[#121218] text-white">Default Catalog</option>
          <option value="name" className="bg-[#121218] text-white">Product Name (A–Z)</option>
          <option value="price-low" className="bg-[#121218] text-white">Price: Low to High</option>
          <option value="price-high" className="bg-[#121218] text-white">Price: High to Low</option>
          <option value="newest" className="bg-[#121218] text-white">Newest</option>
        </select>
      </div>
    </div>
  );
};
