import React from 'react';
import { Product } from '../../types';
import { ProductCard } from '../shop/ProductCard';

interface RelatedProductsProps {
  currentProduct: Product;
  allProducts: Product[];
  onProductClick: (slug: string) => void;
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({
  currentProduct,
  allProducts,
  onProductClick
}) => {
  // Find products in same tier or category
  const related = allProducts
    .filter(p => p.id !== currentProduct.id && (p.quality_tier === currentProduct.quality_tier || p.category === currentProduct.category))
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <div className="mt-20 pt-16 border-t border-white/10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-blue-400 block mb-1">
            Complete The Look
          </span>
          <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-white tracking-wide">
            YOU MAY ALSO ADORE
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {related.map(p => (
          <ProductCard
            key={p.id}
            product={p}
            onProductClick={onProductClick}
          />
        ))}
      </div>
    </div>
  );
};
