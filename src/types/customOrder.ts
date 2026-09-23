export type CustomNailLength = 'Long' | 'Medium' | 'Short';

export type CustomOrderType = 'retail' | 'bulk';

export interface BaseColorPreset {
  id: string;
  name: string;
  hex: string;
  isCustom?: boolean;
}

export interface DesignPreset {
  id: string;
  name: string;
  description: string;
  tag: string;
}

export interface CustomDesignReference {
  name: string;
  previewUrl: string;
  file?: File;
}

export interface CustomOrderState {
  orderType: CustomOrderType;
  
  // Customization choices
  size: CustomNailLength;
  colorName: string;
  colorHex: string;
  isCustomColor: boolean;
  customColorHex: string;
  design: string;
  designReference: CustomDesignReference | null;
  
  // Retail Customer Fields
  name: string;
  phone: string;
  email: string;
  retailQuantity: number;
  notes: string;
  
  // Bulk Customer Fields
  businessName: string;
  contactPerson: string;
  bulkPhone: string;
  bulkEmail: string;
  bulkQuantity: number;
  packagingRequirements: string;
  privateLabel: string;
  bulkNotes: string;
}
