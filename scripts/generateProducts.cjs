const fs = require('fs');
const path = require('path');

const normalDir = path.join(__dirname, '../public/assets/products/normal');
const premiumDir = path.join(__dirname, '../public/assets/products/premium');

const normalFiles = fs.readdirSync(normalDir).filter(f => f.endsWith('.jpg') || f.endsWith('.png'));
const premiumFiles = fs.readdirSync(premiumDir).filter(f => f.endsWith('.jpg') || f.endsWith('.png'));

console.log('Normal files found:', normalFiles.length);
console.log('Premium files found:', premiumFiles.length);

const shapes = ['Almond', 'Coffin', 'Oval', 'Square', 'Stiletto', 'Ballerina'];
const lengths = ['Medium', 'Long', 'Short', 'Medium', 'Long'];

const normalFinishes = ['High Gloss Gel', 'Velvet Matte', 'Blush Ombre', 'French Luxe', 'Diamond Glitter', 'Magnetic Cat Eye'];
const premiumFinishes = ['3D Crystal Embellished', 'Mirror Chrome', 'Magnetic Cat Eye', '3D Crystal Embellished', 'French Luxe', 'Diamond Glitter'];

const categories = ['Everyday', 'Bridal', 'Party', 'Minimal', 'Glitter', 'Chrome', 'Floral', 'Luxury', 'New Arrivals'];

const colorPalettes = [
  { name: 'Nude Blush', hex: '#E8B4B8' },
  { name: 'Opal Glaze', hex: '#F0E6EF' },
  { name: 'Smoky Rose', hex: '#C28B93' },
  { name: 'Milky Pearl', hex: '#FDFBF7' },
  { name: 'Royal Sapphire', hex: '#1A56DB' },
  { name: 'Champagne Shimmer', hex: '#E5C158' },
  { name: 'Midnight Obsidian', hex: '#1C1C24' },
  { name: 'Mauve Whisper', hex: '#B89B9E' },
  { name: 'Berry Velvet', hex: '#7A2E3B' },
  { name: 'Icy Quartz', hex: '#D6E4F0' },
  { name: 'Caramel Macchiato', hex: '#9C6644' },
  { name: 'Emerald Mirage', hex: '#1B493A' },
  { name: 'Coral Sunrise', hex: '#F4846F' },
  { name: 'Lavender Haze', hex: '#C8B6FF' }
];

const normalThemes = [
  'Silk Rosewater Ombre', 'Frosted Glazed Donut', 'Milky Way French Tips', 'Blush Petal Aura', 
  'Velvet Cashmere Nude', 'Mocha Swirl Minimal', 'Peach Blossom Dew', 'Soft Amber Radiance',
  'Powder Pink Ballerina', 'Alabaster Clean Girl', 'Vanilla Glaze Coffin', 'Rose Gold Shimmer',
  'Lilac Sunset Gradient', 'Cocoa Butter Square', 'Honey Glaze Stiletto', 'Marshmallow Cloud',
  'Chiffon Bare Nude', 'Dusty Mauve Chic', 'Morning Mist Almond', 'Barely Blush Luxe',
  'Frosted Coconut Cream', 'Warm Sand Minimalist', 'Sweet Blossom Jelly', 'Oatmeal Latte Classic',
  'Pearl Essence Gloss', 'Sunkissed Peachy Gleam', 'Vintage Rose Petal', 'Champagne Pearl Glaze',
  'Baby Pink Glass Gel', 'Petal Whisper Almond', 'Nude Elegance Square', 'Caramel Drizzle Tip',
  'Sheer Organza Pink', 'Velvet Nude Ballerina', 'Creamy Peach Oval', 'Toasted Almond Classic'
];

const premiumThemes = [
  'Celestial Marquise Royale', 'Diamond Empress Cascades', 'Crystal Dewdrop Illusion', 
  'Gilded Baroque Filigree', 'Royal Sapphire Solitaire', 'Obsidian Chrome Starlight',
  'Haute Couture Bridal Crown', 'Glacier Ice Crystal Shards', 'Emerald Sovereign Jeweled',
  'Platinum Mirror Aurora', 'Champagne Crystal Cascade', 'Velvet Noir Rhinestone Gem',
  'Rose Quartz Crystal Halo', 'Golden Sunburst Opulence', 'Swarovski Starlight Dream',
  'Imperial Pearl & Diamond Vine', 'Midnight Galaxy Prism', 'Diamond Cut French Crown',
  'Silk Veil 3D Bloom', 'Gilded Rose Gold Marquise', 'Diamond Teardrop Majesty',
  'Crystal Rain Luxury Coffin', 'Royal Twilight Cat-Eye', 'Mirror Chrome Halo Glow',
  'Golden Empress Stiletto', 'Starry Night Velvet Gem', 'Opal Luster Crystal Wave'
];

let products = [];

// Generate Normal Products (₹249 - 3 Packs × 24 Nails = 72 Handmade Nails Total)
normalFiles.forEach((file, index) => {
  const code = file.replace(/\.[^/.]+$/, '');
  const theme = normalThemes[index % normalThemes.length] + (Math.floor(index / normalThemes.length) > 0 ? ' #' + (Math.floor(index / normalThemes.length) + 1) : '');
  const shape = shapes[index % shapes.length];
  const length = lengths[index % lengths.length];
  const finish = normalFinishes[index % normalFinishes.length];
  const category = categories[index % categories.length];
  const colorObj = colorPalettes[index % colorPalettes.length];

  products.push({
    id: 'prod-norm-' + (index + 1),
    name: theme.trim() + ' (' + code + ')',
    slug: 'normal-' + code.toLowerCase() + '-' + theme.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-'),
    quality_tier: 'normal',
    price: 249,
    compare_price: 399,
    pack_count: 3,
    nails_per_pack: 24,
    total_nails: 72,
    is_handmade: true,
    shape: shape,
    length: length,
    finish: finish,
    category: category,
    collection: 'Normal Collection',
    color: colorObj.name,
    color_hex: colorObj.hex,
    description: 'The ' + theme.trim() + ' set brings handmade salon-grade gel artistry straight to your fingertips. Crafted by hand with premium multi-layer gel for natural curvature and lightweight wear, it includes 3 individual packs (24 nails each, totaling 72 handmade press-on nails) for everyday elegance, office chic, and casual brunches.',
    short_description: '3 Individual Packs (72 Handmade Nails Total) with salon-grade gel finish and durable everyday natural fit.',
    features: [
      '3 individual packs (24 nails each = 72 handmade nails total)',
      '100% handmade salon-grade gel coating',
      '10-minute application at home',
      'Wearable up to 2-3 weeks with glue or 3-7 days with adhesive tabs',
      'Reusable up to 5+ applications with proper care',
      'Salon-quality high-shine protective top coat',
      'Waterproof, chip-resistant, and gentle on natural nails'
    ],
    whats_included: [
      '3 individual packs of handmade press-on nails (24 nails per pack = 72 nails total)',
      'Professional dual-ended wooden cuticle stick',
      'Mini nail buffer & file (100/180 grit)',
      '3x Alcohol prep sanitizing pads',
      '72x Ultra-bond adhesive jelly tabs',
      '1x Precision quick-dry nail glue (2g)'
    ],
    application_guide: 'Push cuticles back, gently buff natural nail shine, wipe with alcohol pad, apply glue or adhesive tab, and press firmly for 30 seconds at a 45-degree angle.',
    images: ['/assets/products/normal/' + file],
    thumbnail: '/assets/products/normal/' + file,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'CUSTOM'],
    stock: 25 + (index % 15),
    sku: 'QEQ-NORM-' + code,
    featured: index < 8,
    best_seller: index % 4 === 0,
    new_arrival: index % 3 === 0,
    rating: Number((4.8 + (index % 3) * 0.1).toFixed(1)),
    review_count: 18 + (index % 24),
    is_active: true,
    created_at: new Date(Date.now() - (index * 86400000)).toISOString(),
    updated_at: new Date().toISOString()
  });
});

// Generate Premium Products (₹299 - 1 Premium Pack = 10 Handmade Nails)
premiumFiles.forEach((file, index) => {
  const code = file.replace(/\.[^/.]+$/, '');
  const theme = premiumThemes[index % premiumThemes.length] + (Math.floor(index / premiumThemes.length) > 0 ? ' #' + (Math.floor(index / premiumThemes.length) + 1) : '');
  const shape = shapes[(index + 2) % shapes.length];
  const length = lengths[(index + 1) % lengths.length];
  const finish = premiumFinishes[index % premiumFinishes.length];
  const category = (index % 3 === 0) ? 'Bridal' : (index % 2 === 0 ? 'Luxury' : 'Party');
  const colorObj = colorPalettes[(index + 3) % colorPalettes.length];

  products.push({
    id: 'prod-prem-' + (index + 1),
    name: theme.trim() + ' (' + code + ')',
    slug: 'premium-' + code.toLowerCase() + '-' + theme.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-'),
    quality_tier: 'premium',
    price: 299,
    compare_price: 599,
    pack_count: 1,
    nails_per_pack: 10,
    total_nails: 10,
    is_handmade: true,
    shape: shape,
    length: length,
    finish: finish,
    category: category,
    collection: 'Premium Collection',
    color: colorObj.name,
    color_hex: colorObj.hex,
    description: 'The ' + theme.trim() + ' luxury set represents the pinnacle of handmade nail artistry. Hand-sculpted with 10 bespoke premium press-on nails featuring multi-dimensional 3D crystal detailing, diamond-cut accents, and high-gloss multi-layered gel encapsulation for high-fashion runway brilliance.',
    short_description: '1 Premium Pack (10 Handmade Luxury Nails) with hand-applied crystals, 3D accents, and mirror gel encapsulation.',
    features: [
      '1 Premium Pack with 10 bespoke handmade luxury embellished nails',
      'Handcrafted with genuine multi-facet crystals and luxury 3D charms',
      'Quad-layer gel encapsulation prevents crystal loss and snagging',
      'Sculpted apex curvature for high durability and comfortable luxury feel',
      'Wearable up to 3+ weeks with professional nail glue',
      'Reusable 5–10 times with gentle warm-water removal'
    ],
    whats_included: [
      '1 Premium collector pack of 10 bespoke handmade embellished nail tips',
      'Premium metal-tipped cuticle pusher & wooden stick',
      'Fine precision nail buffer & glass file',
      '2x Alcohol sanitizing prep pads',
      '20x Double-strength waterproof adhesive tabs',
      '1x Studio-grade ultra-hold brush-on nail glue (5g)'
    ],
    application_guide: 'Thoroughly prep nail plate, select matched sizes, apply studio adhesive glue to both natural nail and press-on base, hold with firm pressure for 35 seconds.',
    images: ['/assets/products/premium/' + file],
    thumbnail: '/assets/products/premium/' + file,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'CUSTOM'],
    stock: 18 + (index % 10),
    sku: 'QEQ-PREM-' + code,
    featured: index < 12,
    best_seller: index % 3 === 0,
    new_arrival: index % 2 === 0,
    rating: Number((4.9 + (index % 2) * 0.1).toFixed(1)),
    review_count: 26 + (index % 35),
    is_active: true,
    created_at: new Date(Date.now() - (index * 43200000)).toISOString(),
    updated_at: new Date().toISOString()
  });
});

const targetDir = path.join(__dirname, '../src/data');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const fileContent = 'import { Product } from "../types";\n\nexport const INITIAL_PRODUCTS: Product[] = ' + JSON.stringify(products, null, 2) + ';\n';

fs.writeFileSync(path.join(targetDir, 'initialProducts.ts'), fileContent, 'utf8');
console.log('Successfully written ' + products.length + ' products to src/data/initialProducts.ts with updated handmade packaging structure');
