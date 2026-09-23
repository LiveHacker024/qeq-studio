const fs = require('fs');
const path = require('path');

const normalDir = path.join(__dirname, '../public/assets/products/normal');
const premiumDir = path.join(__dirname, '../public/assets/products/premium');

const normalFiles = fs.readdirSync(normalDir).filter(f => f.endsWith('.jpg') || f.endsWith('.png')).sort();
const premiumFiles = fs.readdirSync(premiumDir).filter(f => f.endsWith('.jpg') || f.endsWith('.png')).sort((a, b) => {
  const numA = parseInt(a.replace(/[^0-9]/g, '')) || 0;
  const numB = parseInt(b.replace(/[^0-9]/g, '')) || 0;
  if (numA !== numB) return numA - numB;
  return a.localeCompare(b);
});

console.log(`Found ${normalFiles.length} normal files and ${premiumFiles.length} premium files.`);

const products = [];

// 1. Generate Normal Collection Products
normalFiles.forEach((file, idx) => {
  const indexStr = String(idx + 1).padStart(3, '0');
  const id = `normal-${indexStr}`;
  const name = `QeQ Normal Nail Set ${indexStr}`;
  const slug = `qeq-normal-nail-set-${indexStr}`;
  
  products.push({
    id,
    name,
    slug,
    quality_tier: 'normal',
    price: 249,
    pack_count: 3,
    nails_per_pack: 24,
    total_nails: 72,
    is_handmade: true,
    collection: 'Normal Collection',
    description: 'Handmade press-on nail set. Includes 3 individual packs (24 nails each) for 72 handmade press-on nails total.',
    short_description: '3 Packs × 24 Nails (72 Handmade Nails Total)',
    images: [`/assets/products/normal/${file}`],
    thumbnail: `/assets/products/normal/${file}`,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'CUSTOM'],
    sku: `QEQ-NORM-${indexStr}`,
    is_active: true,
    created_at: '2026-01-01T00:00:00.000Z',
    updated_at: '2026-01-01T00:00:00.000Z'
  });
});

// 2. Generate Premium Collection Products
premiumFiles.forEach((file, idx) => {
  const indexStr = String(idx + 1).padStart(3, '0');
  const id = `premium-${indexStr}`;
  const name = `QeQ Premium Nail Set ${indexStr}`;
  const slug = `qeq-premium-nail-set-${indexStr}`;
  
  products.push({
    id,
    name,
    slug,
    quality_tier: 'premium',
    price: 299,
    pack_count: 1,
    nails_per_pack: 10,
    total_nails: 10,
    is_handmade: true,
    collection: 'Premium Collection',
    description: 'Handmade press-on nail set. Includes 1 premium pack with 10 handmade press-on nails.',
    short_description: '1 Premium Pack (10 Handmade Nails)',
    images: [`/assets/products/premium/${file}`],
    thumbnail: `/assets/products/premium/${file}`,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'CUSTOM'],
    sku: `QEQ-PREM-${indexStr}`,
    is_active: true,
    created_at: '2026-01-01T00:00:00.000Z',
    updated_at: '2026-01-01T00:00:00.000Z'
  });
});

// Validation
products.forEach(p => {
  if (p.total_nails !== p.pack_count * p.nails_per_pack) {
    throw new Error(`Inconsistent nails calculation in ${p.id}: ${p.pack_count} * ${p.nails_per_pack} !== ${p.total_nails}`);
  }
});

const fileContent = `import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = ${JSON.stringify(products, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '../src/data/initialProducts.ts'), fileContent, 'utf8');
console.log(`Successfully written ${products.length} validated products to src/data/initialProducts.ts`);
