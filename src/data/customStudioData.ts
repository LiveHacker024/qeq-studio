import { BaseColorPreset, DesignPreset, CustomOrderState } from '../types/customOrder';

export const BASE_COLOR_PRESETS: BaseColorPreset[] = [
  { id: 'nude', name: 'Nude', hex: '#D8B4A0' },
  { id: 'soft-pink', name: 'Soft Pink', hex: '#E8B4B8' },
  { id: 'baby-pink', name: 'Baby Pink', hex: '#FAD2E1' },
  { id: 'white', name: 'White', hex: '#F8F9FA' },
  { id: 'black', name: 'Black', hex: '#121214' },
  { id: 'red', name: 'Red', hex: '#C81D25' },
  { id: 'wine', name: 'Wine', hex: '#6A0D25' },
  { id: 'brown', name: 'Brown', hex: '#6B4423' },
  { id: 'lavender', name: 'Lavender', hex: '#CDB4DB' },
  { id: 'blue', name: 'Blue', hex: '#3A6B9B' },
  { id: 'custom', name: 'Custom Color', hex: '#C89B7B', isCustom: true },
];

export const DESIGN_PRESETS: DesignPreset[] = [
  {
    id: 'solid',
    name: 'Solid',
    description: 'Uniform high-gloss color with ultra-smooth glass reflection',
    tag: 'Classic Luxe'
  },
  {
    id: 'french-tip',
    name: 'French Tip',
    description: 'Crisp, hand-defined tip crescent with subtle contrast',
    tag: 'Timeless Atelier'
  },
  {
    id: 'ombre',
    name: 'Ombre',
    description: 'Seamless gradient fade from cuticle base to soft tip melt',
    tag: 'Soft Velvet'
  },
  {
    id: 'glitter',
    name: 'Glitter',
    description: 'Radiant fine shimmer particles with light-catching sparkle',
    tag: 'Luminous Glow'
  },
  {
    id: 'floral',
    name: 'Floral',
    description: 'Delicate hand-drawn botanical lines & petal motifs',
    tag: 'Artisan Painted'
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean negative space accents and refined micro geometric lines',
    tag: 'Modern Chic'
  },
  {
    id: 'custom-design',
    name: 'Custom Design',
    description: 'Crafted to your exact personal pattern or reference photo',
    tag: 'Bespoke Atelier'
  }
];

export const NAIL_LENGTH_CARDS = [
  {
    length: 'Long' as const,
    title: 'LONG',
    subtitle: 'Statement Apex',
    description: 'Sculpted elongated silhouette for bold editorial presence',
    visualHeight: 'h-16'
  },
  {
    length: 'Medium' as const,
    title: 'MEDIUM',
    subtitle: 'Salon Balance',
    description: 'Harmonious versatile taper suited for everyday wear',
    visualHeight: 'h-12'
  },
  {
    length: 'Short' as const,
    title: 'SHORT',
    subtitle: 'Natural Ergonomics',
    description: 'Subtle clean curve aligned with active daily comfort',
    visualHeight: 'h-8'
  }
];

/**
 * Retrieves the WhatsApp number for Custom Orders.
 * Uses VITE_QEQ_CUSTOM_ORDER_WHATSAPP if defined, otherwise defaults to 918447311551.
 */
export const getCustomOrderWhatsappNumber = (): string => {
  const envNumber = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_QEQ_CUSTOM_ORDER_WHATSAPP)
    ? String(import.meta.env.VITE_QEQ_CUSTOM_ORDER_WHATSAPP).replace(/[^0-9]/g, '')
    : '';
  return envNumber || '918447311551';
};

export const CUSTOM_ORDER_WHATSAPP_DISPLAY = '+91 84473 11551';

/**
 * Builds the exact Retail WhatsApp message specified in requirements.
 */
export const buildRetailWhatsappMessage = (state: CustomOrderState): string => {
  const colorDisplay = state.isCustomColor
    ? `Custom Color (${state.customColorHex.toUpperCase()})`
    : state.colorName;

  const designRefText = state.designReference
    ? `Uploaded reference (${state.designReference.name})`
    : 'None';

  return [
    'Hello QeQ STUDIO,',
    '',
    'I would like to create a custom nail order.',
    '',
    `Name:\n${state.name.trim()}`,
    '',
    `Phone:\n${state.phone.trim()}`,
    '',
    `Email:\n${state.email.trim() || 'Not provided'}`,
    '',
    `Nail Size:\n${state.size}`,
    '',
    `Color:\n${colorDisplay}`,
    '',
    `Design:\n${state.design}`,
    '',
    `Quantity:\n${state.retailQuantity} set${state.retailQuantity > 1 ? 's' : ''}`,
    '',
    `Custom Design:\n${designRefText}`,
    '',
    `Additional Notes:\n${state.notes.trim() || 'None'}`,
    '',
    'Please share the available options and pricing.',
    '',
    'Thank you.'
  ].join('\n');
};

/**
 * Builds the exact Bulk WhatsApp message specified in requirements.
 */
export const buildBulkWhatsappMessage = (state: CustomOrderState): string => {
  const colorDisplay = state.isCustomColor
    ? `Custom Color (${state.customColorHex.toUpperCase()})`
    : state.colorName;

  const designRefText = state.designReference
    ? `Uploaded reference (${state.designReference.name})`
    : 'None';

  return [
    'Hello QeQ STUDIO,',
    '',
    'I would like to request a custom nail order.',
    '',
    'Order Type:\nBulk / Wholesale',
    '',
    `Business Name:\n${state.businessName.trim()}`,
    '',
    `Contact Person:\n${state.contactPerson.trim()}`,
    '',
    `Phone:\n${state.bulkPhone.trim()}`,
    '',
    `Email:\n${state.bulkEmail.trim()}`,
    '',
    `Quantity:\n${state.bulkQuantity} pieces`,
    '',
    `Nail Size:\n${state.size}`,
    '',
    `Base Color:\n${colorDisplay}`,
    '',
    `Design:\n${state.design}`,
    '',
    `Custom Design:\n${designRefText}`,
    '',
    `Packaging Requirements:\n${state.packagingRequirements.trim() || 'Standard / To be discussed'}`,
    '',
    `Private Label / Branding:\n${state.privateLabel.trim() || 'None / To be discussed'}`,
    '',
    `Additional Requirements:\n${state.bulkNotes.trim() || 'None'}`,
    '',
    'Please share the available options, pricing and next steps.',
    '',
    'Thank you.'
  ].join('\n');
};
