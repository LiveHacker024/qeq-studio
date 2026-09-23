import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { 
  Product, 
  CartItem, 
  Order, 
  NailSize, 
  DynamicStoreConfig, 
  PromoOffer, 
  ShippingAddress,
  PaymentMethod,
  QualityTier,
  validateProduct
} from '../types';
import { INITIAL_PRODUCTS } from '../data/initialProducts';
import { INITIAL_STORE_CONFIG, BUSINESS_INFO } from '../data/initialConfig';
import { getAssetUrl } from '../utils/assetUrl';

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  title: string;
  message: string;
}

interface StoreContextType {
  products: Product[];
  storeConfig: DynamicStoreConfig;
  cart: CartItem[];
  wishlist: string[]; // product IDs
  orders: Order[];
  appliedCoupon: PromoOffer | null;
  quickViewProduct: Product | null;
  isCartOpen: boolean;
  isSearchOpen: boolean;
  isSizeGuideOpen: boolean;
  searchQuery: string;
  toasts: ToastMessage[];
  
  // Cart Actions
  addToCart: (product: Product, size: NailSize, quantity?: number, customSizes?: CartItem['customSizes']) => void;
  removeFromCart: (productId: string, size: NailSize) => void;
  updateCartQuantity: (productId: string, size: NailSize, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  
  // Cart Calculations
  cartSubtotal: number;
  cartDiscount: number;
  cartShipping: number;
  cartTotal: number;
  cartItemCount: number;
  freeShippingProgress: number; // percentage (0 - 100)
  amountForFreeShipping: number;

  // Wishlist Actions
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  moveToCartFromWishlist: (productId: string, size?: NailSize) => void;

  // UI State Modals
  setQuickViewProduct: (product: Product | null) => void;
  setIsCartOpen: (open: boolean) => void;
  setIsSearchOpen: (open: boolean) => void;
  setIsSizeGuideOpen: (open: boolean) => void;
  setSearchQuery: (query: string) => void;
  showToast: (title: string, message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;

  // Checkout & Order Actions
  createOrder: (
    address: ShippingAddress, 
    paymentMethod: PaymentMethod
  ) => Promise<Order>;
  getOrderById: (orderIdOrNumber: string) => Order | undefined;

  // Admin Actions
  updateProduct: (product: Product) => void;
  addProduct: (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => void;
  deleteProduct: (productId: string) => void;
  updateGlobalPrices: (normalPrice: number, premiumPrice: number) => void;
  updateStoreConfig: (config: Partial<DynamicStoreConfig>) => void;
  updateOrderStatus: (orderId: string, status: Order['order_status'], note?: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Store Config
  const [storeConfig, setStoreConfig] = useState<DynamicStoreConfig>(() => {
    const saved = localStorage.getItem('qeq_store_config');
    return saved ? JSON.parse(saved) : INITIAL_STORE_CONFIG;
  });

  // Base Products Catalog
  const [rawProducts, setRawProducts] = useState<Product[]>(() => {
    // Always use INITIAL_PRODUCTS for fresh packaging data if stored version lacks new fields
    const saved = localStorage.getItem('qeq_products');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.length > 0 && parsed[0].total_nails !== undefined) {
          return parsed;
        }
      } catch (e) {}
    }
    return INITIAL_PRODUCTS;
  });

  // Dynamically compute products with active global base prices & correct packaging
  const products = useMemo(() => {
    return rawProducts.map(p => {
      const activePrice = p.quality_tier === 'premium' 
        ? storeConfig.premiumPrice 
        : storeConfig.normalPrice;
      
      const comparePrice = p.quality_tier === 'premium' ? 599 : 399;
      const pack_count = p.pack_count || (p.quality_tier === 'premium' ? 1 : 3);
      const nails_per_pack = p.nails_per_pack || (p.quality_tier === 'premium' ? 10 : 24);
      const total_nails = pack_count * nails_per_pack;
      const normalizedThumbnail = getAssetUrl(p.thumbnail);
      const normalizedImages = Array.isArray(p.images) && p.images.length > 0
        ? p.images.map(img => getAssetUrl(img))
        : [normalizedThumbnail];

      return {
        ...p,
        thumbnail: normalizedThumbnail,
        images: normalizedImages,
        price: activePrice,
        compare_price: comparePrice,
        pack_count,
        nails_per_pack,
        total_nails,
        is_handmade: true
      };
    });
  }, [rawProducts, storeConfig.normalPrice, storeConfig.premiumPrice]);

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('qeq_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('qeq_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('qeq_orders');
    return saved ? JSON.parse(saved) : [];
  });

  // Applied Coupon
  const [appliedCoupon, setAppliedCoupon] = useState<PromoOffer | null>(null);

  // Modals & Navigation States
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('qeq_store_config', JSON.stringify(storeConfig));
  }, [storeConfig]);

  useEffect(() => {
    localStorage.setItem('qeq_products', JSON.stringify(rawProducts));
  }, [rawProducts]);

  useEffect(() => {
    localStorage.setItem('qeq_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('qeq_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('qeq_orders', JSON.stringify(orders));
  }, [orders]);

  // Toast Helpers
  const showToast = (title: string, message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Cart Helpers
  const addToCart = (
    product: Product, 
    size: NailSize = 'M', 
    quantity = 1, 
    customSizes?: CartItem['customSizes']
  ) => {
    // Look up dynamic price and exact packaging structure
    const activePrice = product.quality_tier === 'premium' ? storeConfig.premiumPrice : storeConfig.normalPrice;
    const itemToAdd: Product = { 
      ...product, 
      thumbnail: getAssetUrl(product.thumbnail),
      images: Array.isArray(product.images) && product.images.length > 0
        ? product.images.map(img => getAssetUrl(img))
        : [getAssetUrl(product.thumbnail)],
      price: activePrice,
      pack_count: product.quality_tier === 'premium' ? 1 : 3,
      nails_per_pack: product.quality_tier === 'premium' ? 10 : 24,
      total_nails: product.quality_tier === 'premium' ? 10 : 72,
      is_handmade: true
    };

    setCart(prev => {
      const existingIdx = prev.findIndex(
        item => item.product.id === product.id && item.selectedSize === size
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      } else {
        return [...prev, {
          product: itemToAdd,
          selectedSize: size,
          customSizes,
          quantity
        }];
      }
    });

    const packDesc = product.quality_tier === 'premium' ? '1 Premium Pack (10 Handmade Nails)' : '3 Packs × 24 Nails (72 Handmade Nails)';
    showToast('Added to Bag', `${product.name} [${packDesc}] added to your bag.`);
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, size: NailSize) => {
    setCart(prev => prev.filter(
      item => !(item.product.id === productId && item.selectedSize === size)
    ));
    showToast('Item Removed', 'Product removed from your shopping bag.', 'info');
  };

  const updateCartQuantity = (productId: string, size: NailSize, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }
    setCart(prev => prev.map(item => {
      if (item.product.id === productId && item.selectedSize === size) {
        return { ...item, quantity };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Wishlist Helpers
  const toggleWishlist = (productId: string) => {
    const exists = wishlist.includes(productId);
    const product = products.find(p => p.id === productId);
    if (exists) {
      setWishlist(prev => prev.filter(id => id !== productId));
      showToast('Removed from Wishlist', `${product?.name || 'Item'} removed from wishlist.`, 'info');
    } else {
      setWishlist(prev => [...prev, productId]);
      showToast('Saved to Wishlist', `${product?.name || 'Item'} saved to your wishlist.`);
    }
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const moveToCartFromWishlist = (productId: string, size: NailSize = 'M') => {
    const product = products.find(p => p.id === productId);
    if (product) {
      addToCart(product, size);
      setWishlist(prev => prev.filter(id => id !== productId));
    }
  };

  // Cart Calculations
  const cartItemCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  const cartSubtotal = useMemo(() => {
    return cart.reduce((acc, item) => {
      const price = item.product.quality_tier === 'premium' ? storeConfig.premiumPrice : storeConfig.normalPrice;
      return acc + (price * item.quantity);
    }, 0);
  }, [cart, storeConfig.normalPrice, storeConfig.premiumPrice]);

  // Discount Calculation based on applied coupon or active rules
  const cartDiscount = useMemo(() => {
    if (!appliedCoupon || cart.length === 0) return 0;

    if (appliedCoupon.type === 'buy_x_get_y' && appliedCoupon.code === 'BUY2GET1') {
      const individualPrices: number[] = [];
      cart.forEach(item => {
        const price = item.product.quality_tier === 'premium' ? storeConfig.premiumPrice : storeConfig.normalPrice;
        for (let i = 0; i < item.quantity; i++) {
          individualPrices.push(price);
        }
      });

      if (individualPrices.length >= 3) {
        individualPrices.sort((a, b) => a - b);
        const freeCount = Math.floor(individualPrices.length / 3);
        const discountVal = individualPrices.slice(0, freeCount).reduce((a, b) => a + b, 0);
        return discountVal;
      }
      return 0;
    }

    if (appliedCoupon.type === 'percentage' && appliedCoupon.discount_percentage) {
      if (!appliedCoupon.min_order_amount || cartSubtotal >= appliedCoupon.min_order_amount) {
        return Math.round((cartSubtotal * appliedCoupon.discount_percentage) / 100);
      }
    }

    if (appliedCoupon.type === 'fixed_amount' && appliedCoupon.discount_amount) {
      if (!appliedCoupon.min_order_amount || cartSubtotal >= appliedCoupon.min_order_amount) {
        return appliedCoupon.discount_amount;
      }
    }

    return 0;
  }, [appliedCoupon, cart, cartSubtotal, storeConfig.normalPrice, storeConfig.premiumPrice]);

  const cartShipping = useMemo(() => {
    if (cart.length === 0) return 0;
    if (cartSubtotal >= storeConfig.freeShippingThreshold) return 0;
    return storeConfig.shippingCost;
  }, [cart.length, cartSubtotal, storeConfig.freeShippingThreshold, storeConfig.shippingCost]);

  const cartTotal = useMemo(() => {
    return Math.max(0, cartSubtotal - cartDiscount + cartShipping);
  }, [cartSubtotal, cartDiscount, cartShipping]);

  const freeShippingProgress = useMemo(() => {
    if (cartSubtotal >= storeConfig.freeShippingThreshold) return 100;
    return Math.min(100, Math.round((cartSubtotal / storeConfig.freeShippingThreshold) * 100));
  }, [cartSubtotal, storeConfig.freeShippingThreshold]);

  const amountForFreeShipping = useMemo(() => {
    return Math.max(0, storeConfig.freeShippingThreshold - cartSubtotal);
  }, [cartSubtotal, storeConfig.freeShippingThreshold]);

  const applyCoupon = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    const offer = storeConfig.offers.find(o => o.code.toUpperCase() === trimmed && o.is_active);

    if (!offer) {
      return { success: false, message: 'Invalid or expired promo code.' };
    }

    if (offer.min_order_amount && cartSubtotal < offer.min_order_amount) {
      return { 
        success: false, 
        message: `Code ${offer.code} requires a minimum order amount of ₹${offer.min_order_amount}.` 
      };
    }

    if (offer.code === 'BUY2GET1' && cartItemCount < 3) {
      return {
        success: false,
        message: 'Add at least 3 nail sets to your cart to activate Buy 2 Get 1 FREE.'
      };
    }

    setAppliedCoupon(offer);
    showToast('Promo Applied', `${offer.title} has been applied!`);
    return { success: true, message: `${offer.title} applied successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Promo Removed', 'Discount coupon removed.', 'info');
  };

  // Checkout & Order Creation
  const createOrder = async (
    address: ShippingAddress, 
    paymentMethod: PaymentMethod
  ): Promise<Order> => {
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const orderNumber = `QEQ-${randomSuffix}`;

    const orderItems = cart.map(item => {
      const price = item.product.quality_tier === 'premium' ? storeConfig.premiumPrice : storeConfig.normalPrice;
      const packCount = item.product.quality_tier === 'premium' ? 1 : 3;
      const totalNails = item.product.quality_tier === 'premium' ? 10 : 72;

      return {
        productId: item.product.id,
        productName: item.product.name,
        productImage: item.product.thumbnail,
        qualityTier: item.product.quality_tier,
        size: item.selectedSize,
        price,
        packCount,
        totalNails,
        isHandmade: true,
        quantity: item.quantity,
        subtotal: price * item.quantity
      };
    });

    const now = new Date();
    const deliveryDate = new Date(Date.now() + 4 * 24 * 60 * 60 * 1000);
    const deliveryStr = deliveryDate.toLocaleDateString('en-IN', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      order_number: orderNumber,
      customer_name: address.fullName,
      customer_email: address.email,
      customer_phone: address.phone,
      items: orderItems,
      subtotal: cartSubtotal,
      shipping: cartShipping,
      discount: cartDiscount,
      coupon_code: appliedCoupon?.code,
      total: cartTotal,
      payment_method: paymentMethod,
      payment_status: paymentMethod === 'cod' ? 'COD' : 'Paid',
      order_status: 'Confirmed',
      shipping_address: address,
      tracking_id: `TRK-IN-${randomSuffix}`,
      estimated_delivery: deliveryStr,
      created_at: now.toISOString(),
      timeline: [
        {
          status: 'Confirmed',
          timestamp: now.toISOString(),
          note: 'Order placed successfully. Atelier preparing handmade set.'
        }
      ]
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const getOrderById = (orderIdOrNumber: string) => {
    return orders.find(
      o => o.id === orderIdOrNumber || o.order_number.toUpperCase() === orderIdOrNumber.toUpperCase()
    );
  };

  // Admin Actions
  const updateProduct = (updated: Product) => {
    validateProduct(updated);
    setRawProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
    showToast('Product Updated', `Changes to "${updated.name}" saved.`);
  };

  const addProduct = (newProductData: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
    const id = `prod-custom-${Date.now()}`;
    const pack_count = newProductData.pack_count || (newProductData.quality_tier === 'premium' ? 1 : 3);
    const nails_per_pack = newProductData.nails_per_pack || (newProductData.quality_tier === 'premium' ? 10 : 24);
    const total_nails = pack_count * nails_per_pack;

    const newProd: Product = {
      ...newProductData,
      id,
      pack_count,
      nails_per_pack,
      total_nails,
      is_handmade: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    validateProduct(newProd);
    setRawProducts(prev => [newProd, ...prev]);
    showToast('Product Added', `"${newProd.name}" added to catalog.`);
  };

  const deleteProduct = (productId: string) => {
    setRawProducts(prev => prev.filter(p => p.id !== productId));
    showToast('Product Deleted', 'Product removed from catalog.', 'info');
  };

  const updateGlobalPrices = (normalPrice: number, premiumPrice: number) => {
    setStoreConfig(prev => ({
      ...prev,
      normalPrice: Math.max(1, normalPrice),
      premiumPrice: Math.max(1, premiumPrice)
    }));
    showToast('Prices Updated', `Normal: ₹${normalPrice} | Premium: ₹${premiumPrice}`);
  };

  const updateStoreConfig = (config: Partial<DynamicStoreConfig>) => {
    setStoreConfig(prev => ({ ...prev, ...config }));
    showToast('Settings Saved', 'Store configuration updated.');
  };

  const updateOrderStatus = (orderId: string, status: Order['order_status'], note = '') => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          order_status: status,
          timeline: [
            ...order.timeline,
            {
              status,
              timestamp: new Date().toISOString(),
              note: note || `Order status transitioned to ${status}.`
            }
          ]
        };
      }
      return order;
    }));
    showToast('Order Status Updated', `Status updated to "${status}".`);
  };

  return (
    <StoreContext.Provider value={{
      products,
      storeConfig,
      cart,
      wishlist,
      orders,
      appliedCoupon,
      quickViewProduct,
      isCartOpen,
      isSearchOpen,
      isSizeGuideOpen,
      searchQuery,
      toasts,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      applyCoupon,
      removeCoupon,
      cartSubtotal,
      cartDiscount,
      cartShipping,
      cartTotal,
      cartItemCount,
      freeShippingProgress,
      amountForFreeShipping,
      toggleWishlist,
      isInWishlist,
      moveToCartFromWishlist,
      setQuickViewProduct,
      setIsCartOpen,
      setIsSearchOpen,
      setIsSizeGuideOpen,
      setSearchQuery,
      showToast,
      removeToast,
      createOrder,
      getOrderById,
      updateProduct,
      addProduct,
      deleteProduct,
      updateGlobalPrices,
      updateStoreConfig,
      updateOrderStatus
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
};
