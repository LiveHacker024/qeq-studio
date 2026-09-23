import { DynamicStoreConfig, PromoOffer } from '../types';

export const INITIAL_OFFERS: PromoOffer[] = [
  {
    id: 'offer-b2g1',
    code: 'BUY2GET1',
    title: 'BUY 2 GET 1 FREE',
    description: 'Add any 3 nail sets to cart and get the 3rd set free!',
    type: 'buy_x_get_y',
    buy_qty: 2,
    get_qty: 1,
    is_active: true
  },
  {
    id: 'offer-welcome10',
    code: 'WELCOME10',
    title: 'FLAT 10% OFF',
    description: 'Get 10% off on your first order with code WELCOME10',
    type: 'percentage',
    discount_percentage: 10,
    min_order_amount: 498,
    is_active: true
  },
  {
    id: 'offer-luxe50',
    code: 'LUXE50',
    title: '₹50 OFF ON ₹799+',
    description: 'Get instant ₹50 discount on orders above ₹799',
    type: 'fixed_amount',
    discount_amount: 50,
    min_order_amount: 799,
    is_active: true
  }
];

export const INITIAL_STORE_CONFIG: DynamicStoreConfig = {
  normalPrice: 249,
  premiumPrice: 299,
  freeShippingThreshold: 599,
  shippingCost: 49,
  announcementText: 'EXCLUSIVE OFFER: BUY 2 GET 1 FREE WITH CODE "BUY2GET1" • FREE EXPRESS SHIPPING ABOVE ₹599',
  announcementActive: true,
  offers: INITIAL_OFFERS
};

export const SIZE_CHART_DATA = [
  { size: 'XS', thumb: '14mm', index: '10mm', middle: '11mm', ring: '10mm', pinky: '7mm', tipSizes: '3, 6, 5, 6, 9' },
  { size: 'S', thumb: '15mm', index: '11mm', middle: '12mm', ring: '11mm', pinky: '8mm', tipSizes: '2, 5, 4, 5, 8' },
  { size: 'M', thumb: '16mm', index: '12mm', middle: '13mm', ring: '12mm', pinky: '9mm', tipSizes: '1, 4, 3, 4, 7' },
  { size: 'L', thumb: '17mm', index: '13mm', middle: '14mm', ring: '13mm', pinky: '10mm', tipSizes: '0, 3, 2, 3, 6' },
  { size: 'XL', thumb: '18mm', index: '14mm', middle: '15mm', ring: '14mm', pinky: '11mm', tipSizes: '0, 2, 1, 2, 5' },
];

const envWhatsapp = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_QEQ_WHATSAPP_NUMBER)
  ? String(import.meta.env.VITE_QEQ_WHATSAPP_NUMBER).trim()
  : '918447311551';

export const BUSINESS_INFO = {
  brandName: 'QeQ STUDIO',
  tagline: 'Handcrafted Luxury Press-On Nails',
  category: 'Handmade Press-On Nails',
  whatsappNumber: envWhatsapp,
  whatsappDisplay: '+91 84473 11551',
  whatsappUrl: `https://wa.me/${envWhatsapp.replace(/[^0-9]/g, '') || '918447311551'}`,
  hasWhatsapp: true,
  instagramHandle: 'nail_art_veloura',
  instagramUrl: 'https://instagram.com/nail_art_veloura',
  supportEmail: 'contact@qeqstudio.com',
  address: 'QeQ Studio Atelier, India',
  hours: 'Mon – Sat: 10:00 AM – 8:00 PM IST',
  startingNormalPrice: 249,
  startingPremiumPrice: 299,
};

