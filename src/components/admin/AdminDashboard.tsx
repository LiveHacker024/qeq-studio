import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Product, QualityTier, Order, OrderStatus } from '../../types';
import { 
  ShieldCheck, 
  Tag, 
  Layers, 
  ShoppingBag, 
  Settings, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  Check, 
  Lock, 
  Database, 
  RefreshCw,
  Search,
  Truck
} from 'lucide-react';
import { getAssetUrl } from '../../utils/assetUrl';

export const AdminDashboard: React.FC<{ onNavigateHome: () => void }> = ({ onNavigateHome }) => {
  const {
    products,
    storeConfig,
    orders,
    updateGlobalPrices,
    updateStoreConfig,
    updateProduct,
    addProduct,
    deleteProduct,
    updateOrderStatus,
    showToast
  } = useStore();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  const [activeTab, setActiveTab] = useState<'pricing' | 'products' | 'orders' | 'offers' | 'database'>('pricing');

  // Pricing Form State
  const [normalPriceInput, setNormalPriceInput] = useState(storeConfig.normalPrice);
  const [premiumPriceInput, setPremiumPriceInput] = useState(storeConfig.premiumPrice);
  const [shippingCostInput, setShippingCostInput] = useState(storeConfig.shippingCost);
  const [freeShippingThresholdInput, setFreeShippingThresholdInput] = useState(storeConfig.freeShippingThreshold);

  // Announcement State
  const [announcementInput, setAnnouncementInput] = useState(storeConfig.announcementText);
  const [announcementActive, setAnnouncementActive] = useState(storeConfig.announcementActive);

  // Product Filter & Edit State
  const [productSearch, setProductSearch] = useState('');
  const [selectedTierFilter, setSelectedTierFilter] = useState<'all' | 'normal' | 'premium'>('all');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Add Product Form Modal State
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newProdData, setNewProdData] = useState({
    name: '',
    slug: '',
    quality_tier: 'normal' as QualityTier,
    price: 249,
    pack_count: 3,
    nails_per_pack: 24,
    total_nails: 72,
    is_handmade: true,
    collection: 'Normal Collection',
    description: 'Bespoke handmade press-on nail set.',
    images: ['/assets/products/normal/JHB001.jpg'],
    thumbnail: '/assets/products/normal/JHB001.jpg',
    stock: 25,
    sku: 'QEQ-CUSTOM-01',
    is_active: true
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'qeq2026' || passcode === 'admin' || passcode === 'studio') {
      setIsAuthenticated(true);
      setAuthError('');
      showToast('Admin Logged In', 'Welcome to QeQ Studio Control Center.');
    } else {
      setAuthError('Incorrect passcode. (Use "admin" or "qeq2026")');
    }
  };

  const handleSavePrices = (e: React.FormEvent) => {
    e.preventDefault();
    updateGlobalPrices(Number(normalPriceInput), Number(premiumPriceInput));
    updateStoreConfig({
      shippingCost: Number(shippingCostInput),
      freeShippingThreshold: Number(freeShippingThresholdInput)
    });
  };

  const handleSaveAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    updateStoreConfig({
      announcementText: announcementInput,
      announcementActive
    });
  };

  const handleSaveEditedProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    
    const packCount = Number(editingProduct.pack_count) || 1;
    const nailsPerPack = Number(editingProduct.nails_per_pack) || 1;
    const totalNails = packCount * nailsPerPack;

    const updatedProduct: Product = {
      ...editingProduct,
      pack_count: packCount,
      nails_per_pack: nailsPerPack,
      total_nails: totalNails,
      is_handmade: true
    };

    try {
      updateProduct(updatedProduct);
      showToast('Product Updated', `${updatedProduct.name} updated successfully.`);
      setEditingProduct(null);
    } catch (err: any) {
      showToast('Validation Error', err.message || 'Failed to update product due to invalid data.');
    }
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const packCount = Number(newProdData.pack_count) || 1;
    const nailsPerPack = Number(newProdData.nails_per_pack) || 1;
    const totalNails = packCount * nailsPerPack;

    const createdProduct = {
      ...newProdData,
      slug: newProdData.slug || newProdData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      sku: newProdData.sku || `QEQ-${Date.now()}`,
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'CUSTOM'] as Product['sizes'],
      pack_count: packCount,
      nails_per_pack: nailsPerPack,
      total_nails: totalNails,
      is_handmade: true,
      price: Number(newProdData.price) || (newProdData.quality_tier === 'premium' ? storeConfig.premiumPrice : storeConfig.normalPrice)
    };

    try {
      addProduct(createdProduct);
      showToast('Product Created', `${createdProduct.name} added to catalog.`);
      setIsAddProductOpen(false);
    } catch (err: any) {
      showToast('Validation Error', err.message || 'Failed to create product due to invalid data.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="py-24 px-4 max-w-md mx-auto animate-fade-in text-center">
        <div className="w-16 h-16 rounded-full bg-blue-600/20 border border-blue-500 text-blue-400 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-600/30">
          <Lock className="w-8 h-8" />
        </div>
        <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-white mb-2">
          ATELIER ADMIN ACCESS
        </h2>
        <p className="text-xs text-gray-400 mb-6 font-light">
          Enter your authorized administrator credential to manage catalog, dynamic pricing, and orders.
        </p>

        <form onSubmit={handleLogin} className="p-6 rounded-3xl glass-dark border border-white/15 flex flex-col gap-4">
          <div>
            <label className="text-xs text-gray-400 block text-left mb-1.5 font-medium">Passcode</label>
            <input
              type="password"
              value={passcode}
              onChange={e => setPasscode(e.target.value)}
              placeholder="Enter passcode (e.g. admin)"
              className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-center"
            />
          </div>

          {authError && <span className="text-xs text-rose-400">{authError}</span>}

          <button
            type="submit"
            className="w-full btn-luxury-primary text-xs uppercase tracking-widest py-3.5 mt-2"
          >
            Access Dashboard
          </button>
        </form>
      </div>
    );
  }

  // Filter products in admin
  const filteredAdminProducts = products.filter(p => {
    const matchesTier = selectedTierFilter === 'all' || p.quality_tier === selectedTierFilter;
    const matchesSearch = productSearch.trim() === '' || 
      p.name.toLowerCase().includes(productSearch.toLowerCase()) || 
      p.sku.toLowerCase().includes(productSearch.toLowerCase());
    return matchesTier && matchesSearch;
  });

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-fade-in">
      
      {/* Dashboard Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-white/10 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-600/20 border border-blue-500 flex items-center justify-center text-blue-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-white tracking-wide">
              QeQ STUDIO ATELIER ADMIN
            </h1>
            <span className="text-xs text-gray-400 font-light">
              Live Product Catalog ({products.length} active sets) • Orders ({orders.length})
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onNavigateHome}
            className="btn-luxury-secondary text-xs uppercase tracking-widest py-2.5 px-4"
          >
            Storefront
          </button>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="text-xs text-gray-400 hover:text-white px-3 py-2"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap gap-2 mb-8 bg-white/5 p-1.5 rounded-2xl border border-white/10">
        <button
          onClick={() => setActiveTab('pricing')}
          className={`py-2.5 px-5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'pricing' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Tag className="w-4 h-4" />
          <span>Dynamic Pricing</span>
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`py-2.5 px-5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'products' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Products ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`py-2.5 px-5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'orders' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Orders ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('offers')}
          className={`py-2.5 px-5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'offers' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Offers & Banner</span>
        </button>

        <button
          onClick={() => setActiveTab('database')}
          className={`py-2.5 px-5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'database' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>Supabase SQL Schema</span>
        </button>
      </div>

      {/* TAB 1: DYNAMIC BASE PRICING */}
      {activeTab === 'pricing' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
          <form onSubmit={handleSavePrices} className="p-8 rounded-3xl glass-dark border border-white/15 flex flex-col gap-6">
            <div>
              <h3 className="font-editorial text-xl font-bold text-white mb-1">
                Global Quality Tier Pricing
              </h3>
              <p className="text-xs text-gray-400 font-light">
                Changes here instantly update all 124 product cards, cart totals, and checkout across the entire website without touching code.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1 uppercase tracking-wider">
                  Normal Collection Base Price (₹)
                </label>
                <input
                  type="number"
                  min="1"
                  value={normalPriceInput}
                  onChange={e => setNormalPriceInput(Number(e.target.value))}
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-lg font-mono font-bold text-white focus:outline-none focus:border-blue-500"
                />
                <span className="text-[11px] text-gray-400 block mt-1">Default: ₹249 for everyday salon sets</span>
              </div>

              <div>
                <label className="text-xs font-bold text-champagne-gold block mb-1 uppercase tracking-wider">
                  Premium Collection Base Price (₹)
                </label>
                <input
                  type="number"
                  min="1"
                  value={premiumPriceInput}
                  onChange={e => setPremiumPriceInput(Number(e.target.value))}
                  className="w-full bg-white/5 border border-champagne-gold/30 rounded-xl px-4 py-3 text-lg font-mono font-bold text-champagne-soft focus:outline-none focus:border-champagne-gold"
                />
                <span className="text-[11px] text-gray-400 block mt-1">Default: ₹299 for handcrafted 3D crystal sets</span>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Standard Shipping (₹)</label>
                  <input
                    type="number"
                    value={shippingCostInput}
                    onChange={e => setShippingCostInput(Number(e.target.value))}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Free Shipping Above (₹)</label>
                  <input
                    type="number"
                    value={freeShippingThresholdInput}
                    onChange={e => setFreeShippingThresholdInput(Number(e.target.value))}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn-luxury-primary text-xs uppercase tracking-widest py-3.5 flex items-center justify-center gap-2 shadow-xl shadow-blue-600/30"
            >
              <Save className="w-4 h-4" />
              <span>Apply Pricing Changes Across Website</span>
            </button>
          </form>

          {/* Live Preview Card */}
          <div className="p-8 rounded-3xl glass-dark border border-white/15 flex flex-col justify-between">
            <div>
              <h4 className="font-editorial text-lg font-bold text-white mb-2">
                Live Pricing Status
              </h4>
              <p className="text-xs text-gray-400 mb-6 font-light">
                Here is how customer prices are currently configured:
              </p>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-blue-950/30 border border-blue-500/20 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-blue-300 block">Normal Collection (80 Sets)</span>
                    <span className="text-[11px] text-gray-400">Everyday salon gel finish</span>
                  </div>
                  <span className="font-mono text-2xl font-bold text-white">₹{storeConfig.normalPrice}</span>
                </div>

                <div className="p-4 rounded-2xl bg-amber-950/30 border border-champagne-gold/30 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-champagne-gold block">Premium Collection (44 Sets)</span>
                    <span className="text-[11px] text-gray-400">Handcrafted 3D crystal luxury</span>
                  </div>
                  <span className="font-mono text-2xl font-bold text-champagne-soft">₹{storeConfig.premiumPrice}</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-gray-300">
              💡 <strong>Instant Sync:</strong> All customer cart calculation algorithms recalculate subtotal in real-time when prices change.
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PRODUCTS MANAGER */}
      {activeTab === 'products' && (
        <div className="flex flex-col gap-6 animate-fade-in">
          
          {/* Top Controls */}
          <div className="p-4 rounded-2xl glass-dark border border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-1 max-w-sm">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={productSearch}
                onChange={e => setProductSearch(e.target.value)}
                placeholder="Search products by name or SKU..."
                className="w-full bg-transparent text-xs text-white focus:outline-none placeholder-gray-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center bg-white/5 rounded-xl p-1 border border-white/10 text-xs">
                <button
                  onClick={() => setSelectedTierFilter('all')}
                  className={`px-3 py-1 rounded-lg ${selectedTierFilter === 'all' ? 'bg-blue-600 text-white font-bold' : 'text-gray-400'}`}
                >
                  All ({products.length})
                </button>
                <button
                  onClick={() => setSelectedTierFilter('normal')}
                  className={`px-3 py-1 rounded-lg ${selectedTierFilter === 'normal' ? 'bg-blue-600 text-white font-bold' : 'text-gray-400'}`}
                >
                  Normal (80)
                </button>
                <button
                  onClick={() => setSelectedTierFilter('premium')}
                  className={`px-3 py-1 rounded-lg ${selectedTierFilter === 'premium' ? 'bg-blue-600 text-white font-bold' : 'text-gray-400'}`}
                >
                  Premium (44)
                </button>
              </div>

              <button
                onClick={() => setIsAddProductOpen(true)}
                className="btn-luxury-primary text-xs py-2 px-4 inline-flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Add Product
              </button>
            </div>
          </div>

          {/* Products Table */}
          <div className="overflow-x-auto rounded-3xl glass-dark border border-white/10">
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="bg-white/5 text-white font-bold uppercase tracking-wider text-[10px] border-b border-white/10">
                <tr>
                  <th className="py-3 px-4">Image</th>
                  <th className="py-3 px-4">Name & SKU</th>
                  <th className="py-3 px-4">Tier</th>
                  <th className="py-3 px-4">Shape & Finish</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Stock</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredAdminProducts.map(prod => (
                  <tr key={prod.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4">
                      <img
                        src={getAssetUrl(prod.thumbnail)}
                        alt={prod.name}
                        className="w-10 h-12 rounded-lg object-cover bg-black/40 border border-white/10"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-white truncate max-w-xs">{prod.name}</div>
                      <span className="text-[10px] text-gray-400">{prod.sku}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase border ${
                        prod.quality_tier === 'premium'
                          ? 'bg-champagne-gold/20 text-champagne-soft border-champagne-gold/40'
                          : 'bg-blue-600/20 text-blue-200 border-blue-500/30'
                      }`}>
                        {prod.quality_tier}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-gray-300">{prod.shape}</span>
                      <span className="text-gray-500 block text-[10px]">{prod.finish}</span>
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-white">
                      ₹{prod.price}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`font-mono ${(prod.stock ?? 20) > 10 ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {prod.stock ?? 20} units
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setEditingProduct(prod)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-blue-600 hover:text-white text-gray-300 transition-colors"
                          title="Edit"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteProduct(prod.id)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-600 hover:text-white text-gray-400 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: ORDERS MANAGER */}
      {activeTab === 'orders' && (
        <div className="flex flex-col gap-6 animate-fade-in">
          {orders.length === 0 ? (
            <div className="p-16 text-center rounded-3xl glass-dark border border-white/10 text-gray-400 text-xs">
              No orders placed yet. Place a test order through the storefront to see live fulfillment tracking.
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map(order => (
                <div key={order.id} className="p-6 rounded-3xl glass-dark border border-white/10 flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-base font-bold text-white">{order.order_number}</span>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-600/30 text-blue-200 border border-blue-500/40">
                          {order.order_status}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400">
                        Placed by {order.customer_name} ({order.customer_phone}) • {new Date(order.created_at).toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">Update Status:</span>
                      <select
                        value={order.order_status}
                        onChange={e => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                        className="bg-[#151522] border border-white/20 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
                      >
                        <option value="Confirmed">Confirmed</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs text-gray-300">
                    <div className="p-3 rounded-xl bg-white/5">
                      <span className="text-gray-400 text-[10px] block">Shipping Address</span>
                      <span>{order.shipping_address.addressLine1}, {order.shipping_address.city} ({order.shipping_address.pincode})</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5">
                      <span className="text-gray-400 text-[10px] block">Payment Method</span>
                      <span className="uppercase font-semibold text-white">{order.payment_method} ({order.payment_status})</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5">
                      <span className="text-gray-400 text-[10px] block">Items</span>
                      <span>{order.items.length} sets ({order.items.map(i => i.productName).join(', ')})</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5">
                      <span className="text-gray-400 text-[10px] block">Order Total</span>
                      <span className="font-mono text-base font-bold text-white">₹{order.total}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: OFFERS & ANNOUNCEMENT */}
      {activeTab === 'offers' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
          <form onSubmit={handleSaveAnnouncement} className="p-8 rounded-3xl glass-dark border border-white/15 flex flex-col gap-6">
            <h3 className="font-editorial text-xl font-bold text-white">
              Announcement Banner
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-400 block mb-1">Banner Text</label>
                <textarea
                  rows={3}
                  value={announcementInput}
                  onChange={e => setAnnouncementInput(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-300">Show Announcement Bar</span>
                <button
                  type="button"
                  onClick={() => setAnnouncementActive(!announcementActive)}
                  className={`w-11 h-6 rounded-full transition-colors relative ${
                    announcementActive ? 'bg-blue-600' : 'bg-white/20'
                  }`}
                >
                  <span className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                    announcementActive ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn-luxury-primary text-xs uppercase tracking-widest py-3"
            >
              Save Announcement Settings
            </button>
          </form>

          {/* Active Offers Manager */}
          <div className="p-8 rounded-3xl glass-dark border border-white/15 flex flex-col gap-4">
            <h3 className="font-editorial text-xl font-bold text-white mb-2">
              Configured Promotional Offers
            </h3>

            <div className="space-y-3">
              {storeConfig.offers.map(offer => (
                <div key={offer.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-champagne-soft">{offer.code}</span>
                      <span className="text-[10px] text-gray-400">({offer.title})</span>
                    </div>
                    <p className="text-[11px] text-gray-300 mt-0.5">{offer.description}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                    Active
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: SUPABASE SQL SCHEMA EXPORTER */}
      {activeTab === 'database' && (
        <div className="p-8 rounded-3xl glass-dark border border-white/15 animate-fade-in flex flex-col gap-4">
          <div>
            <h3 className="font-editorial text-xl font-bold text-white mb-1">
              Supabase PostgreSQL Database Schema
            </h3>
            <p className="text-xs text-gray-400 font-light">
              Copy and execute this migration script in your Supabase SQL Editor to initialize the production database tables with secure RLS policies.
            </p>
          </div>

          <pre className="bg-[#060608] p-4 rounded-2xl border border-white/10 text-xs font-mono text-blue-200 overflow-x-auto leading-relaxed">
{`-- QeQ STUDIO Supabase PostgreSQL Database Schema

-- 1. Create Products Table
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  quality_tier TEXT CHECK (quality_tier IN ('normal', 'premium')) NOT NULL,
  price NUMERIC NOT NULL,
  compare_price NUMERIC,
  pack_count INTEGER NOT NULL DEFAULT 3,
  nails_per_pack INTEGER NOT NULL DEFAULT 24,
  total_nails INTEGER NOT NULL DEFAULT 72,
  is_handmade BOOLEAN NOT NULL DEFAULT true,
  shape TEXT,
  length TEXT,
  finish TEXT,
  category TEXT,
  collection TEXT,
  color TEXT,
  color_hex TEXT,
  description TEXT,
  short_description TEXT,
  features TEXT[],
  whats_included TEXT[],
  images TEXT[],
  thumbnail TEXT,
  sizes TEXT[] DEFAULT ARRAY['XS','S','M','L','XL','CUSTOM'],
  stock INTEGER DEFAULT 20,
  sku TEXT UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 2. Create Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  items JSONB NOT NULL,
  subtotal NUMERIC NOT NULL,
  shipping NUMERIC DEFAULT 0,
  discount NUMERIC DEFAULT 0,
  coupon_code TEXT,
  total NUMERIC NOT NULL,
  payment_method TEXT NOT NULL,
  payment_status TEXT DEFAULT 'Paid',
  order_status TEXT DEFAULT 'Confirmed',
  shipping_address JSONB NOT NULL,
  tracking_id TEXT,
  estimated_delivery TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 3. Row Level Security Policies
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public Read Products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Public Read Orders" ON public.orders FOR SELECT USING (true);
CREATE POLICY "Public Create Orders" ON public.orders FOR INSERT WITH CHECK (true);`}
          </pre>
        </div>
      )}

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-[#0C0C14] border border-white/20 rounded-3xl p-6 shadow-2xl flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
            <h3 className="font-editorial text-lg font-bold text-white">Edit Product: {editingProduct.name}</h3>

            <div className="space-y-4 text-xs">
              <div>
                <label className="text-gray-400 block mb-1">Product Name</label>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/15 rounded-xl p-2.5 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-400 block mb-1">Quality Tier</label>
                  <select
                    value={editingProduct.quality_tier}
                    onChange={e => {
                      const tier = e.target.value as QualityTier;
                      const isPrem = tier === 'premium';
                      const pCount = isPrem ? 1 : 3;
                      const nPerPack = isPrem ? 10 : 24;
                      setEditingProduct({ 
                        ...editingProduct, 
                        quality_tier: tier,
                        price: isPrem ? storeConfig.premiumPrice : storeConfig.normalPrice,
                        pack_count: pCount,
                        nails_per_pack: nPerPack,
                        total_nails: pCount * nPerPack
                      });
                    }}
                    className="w-full bg-[#151522] border border-white/15 rounded-xl p-2.5 text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="normal">Normal (₹{storeConfig.normalPrice} - 3 packs × 24)</option>
                    <option value="premium">Premium (₹{storeConfig.premiumPrice} - 1 pack × 10)</option>
                  </select>
                </div>

                <div>
                  <label className="text-gray-400 block mb-1">Price (₹)</label>
                  <input
                    type="number"
                    min="1"
                    value={editingProduct.price}
                    onChange={e => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="w-full bg-white/5 border border-white/15 rounded-xl p-2.5 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                <div>
                  <label className="text-gray-400 block mb-1">Pack Count</label>
                  <input
                    type="number"
                    min="1"
                    value={editingProduct.pack_count}
                    onChange={e => {
                      const pCount = Number(e.target.value);
                      const total = pCount * (editingProduct.nails_per_pack || 1);
                      setEditingProduct({
                        ...editingProduct,
                        pack_count: pCount,
                        total_nails: total
                      });
                    }}
                    className="w-full bg-black/40 border border-white/15 rounded-lg p-2 text-white text-center font-mono"
                  />
                </div>

                <div>
                  <label className="text-gray-400 block mb-1">Nails / Pack</label>
                  <input
                    type="number"
                    min="1"
                    value={editingProduct.nails_per_pack}
                    onChange={e => {
                      const nPerPack = Number(e.target.value);
                      const total = (editingProduct.pack_count || 1) * nPerPack;
                      setEditingProduct({
                        ...editingProduct,
                        nails_per_pack: nPerPack,
                        total_nails: total
                      });
                    }}
                    className="w-full bg-black/40 border border-white/15 rounded-lg p-2 text-white text-center font-mono"
                  />
                </div>

                <div>
                  <label className="text-blue-300 block mb-1 font-semibold">Total Nails</label>
                  <div className="w-full bg-blue-950/40 border border-blue-500/30 rounded-lg p-2 text-blue-200 text-center font-mono font-bold">
                    {editingProduct.pack_count * editingProduct.nails_per_pack}
                  </div>
                </div>
              </div>

              <div>
                <label className="text-gray-400 block mb-1">Product Image URL</label>
                <input
                  type="text"
                  value={editingProduct.thumbnail || editingProduct.images[0] || ''}
                  onChange={e => {
                    const url = e.target.value;
                    setEditingProduct({
                      ...editingProduct,
                      thumbnail: url,
                      images: [url]
                    });
                  }}
                  className="w-full bg-white/5 border border-white/15 rounded-xl p-2.5 text-white font-mono text-[11px] focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-gray-400 block mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingProduct.description || ''}
                  onChange={e => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full bg-white/5 border border-white/15 rounded-xl p-2.5 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="editIsActive"
                  checked={editingProduct.is_active !== false}
                  onChange={e => setEditingProduct({ ...editingProduct, is_active: e.target.checked })}
                  className="rounded border-white/20 text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <label htmlFor="editIsActive" className="text-gray-300 cursor-pointer">
                  Product is Active & Visible in Storefront
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                onClick={() => setEditingProduct(null)}
                className="px-4 py-2 text-xs text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEditedProduct}
                className="btn-luxury-primary text-xs py-2 px-5 shadow-lg shadow-blue-600/30"
              >
                Save Product
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-[#0C0C14] border border-white/20 rounded-3xl p-6 shadow-2xl flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
            <h3 className="font-editorial text-lg font-bold text-white">Add New Handcrafted Set</h3>

            <div className="space-y-4 text-xs">
              <div>
                <label className="text-gray-400 block mb-1">Product Name</label>
                <input
                  type="text"
                  value={newProdData.name}
                  onChange={e => setNewProdData({ ...newProdData, name: e.target.value })}
                  placeholder="e.g. QeQ Normal Nail Set 081"
                  className="w-full bg-white/5 border border-white/15 rounded-xl p-2.5 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-400 block mb-1">Quality Tier</label>
                  <select
                    value={newProdData.quality_tier}
                    onChange={e => {
                      const tier = e.target.value as QualityTier;
                      const isPrem = tier === 'premium';
                      const pCount = isPrem ? 1 : 3;
                      const nPerPack = isPrem ? 10 : 24;
                      setNewProdData({ 
                        ...newProdData, 
                        quality_tier: tier,
                        price: isPrem ? storeConfig.premiumPrice : storeConfig.normalPrice,
                        pack_count: pCount,
                        nails_per_pack: nPerPack,
                        total_nails: pCount * nPerPack
                      });
                    }}
                    className="w-full bg-[#151522] border border-white/15 rounded-xl p-2.5 text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="normal">Normal (₹{storeConfig.normalPrice} - 3 packs × 24)</option>
                    <option value="premium">Premium (₹{storeConfig.premiumPrice} - 1 pack × 10)</option>
                  </select>
                </div>

                <div>
                  <label className="text-gray-400 block mb-1">Price (₹)</label>
                  <input
                    type="number"
                    min="1"
                    value={newProdData.price}
                    onChange={e => setNewProdData({ ...newProdData, price: Number(e.target.value) })}
                    className="w-full bg-white/5 border border-white/15 rounded-xl p-2.5 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                <div>
                  <label className="text-gray-400 block mb-1">Pack Count</label>
                  <input
                    type="number"
                    min="1"
                    value={newProdData.pack_count}
                    onChange={e => {
                      const pCount = Number(e.target.value);
                      const total = pCount * (newProdData.nails_per_pack || 1);
                      setNewProdData({
                        ...newProdData,
                        pack_count: pCount,
                        total_nails: total
                      });
                    }}
                    className="w-full bg-black/40 border border-white/15 rounded-lg p-2 text-white text-center font-mono"
                  />
                </div>

                <div>
                  <label className="text-gray-400 block mb-1">Nails / Pack</label>
                  <input
                    type="number"
                    min="1"
                    value={newProdData.nails_per_pack}
                    onChange={e => {
                      const nPerPack = Number(e.target.value);
                      const total = (newProdData.pack_count || 1) * nPerPack;
                      setNewProdData({
                        ...newProdData,
                        nails_per_pack: nPerPack,
                        total_nails: total
                      });
                    }}
                    className="w-full bg-black/40 border border-white/15 rounded-lg p-2 text-white text-center font-mono"
                  />
                </div>

                <div>
                  <label className="text-blue-300 block mb-1 font-semibold">Total Nails</label>
                  <div className="w-full bg-blue-950/40 border border-blue-500/30 rounded-lg p-2 text-blue-200 text-center font-mono font-bold">
                    {newProdData.pack_count * newProdData.nails_per_pack}
                  </div>
                </div>
              </div>

              <div>
                <label className="text-gray-400 block mb-1">Product Image URL</label>
                <input
                  type="text"
                  value={newProdData.thumbnail}
                  onChange={e => {
                    const url = e.target.value;
                    setNewProdData({
                      ...newProdData,
                      thumbnail: url,
                      images: [url]
                    });
                  }}
                  placeholder="/assets/products/normal/JHB001.jpg"
                  className="w-full bg-white/5 border border-white/15 rounded-xl p-2.5 text-white font-mono text-[11px] focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-gray-400 block mb-1">Description</label>
                <textarea
                  rows={3}
                  value={newProdData.description}
                  onChange={e => setNewProdData({ ...newProdData, description: e.target.value })}
                  className="w-full bg-white/5 border border-white/15 rounded-xl p-2.5 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="addIsActive"
                  checked={newProdData.is_active}
                  onChange={e => setNewProdData({ ...newProdData, is_active: e.target.checked })}
                  className="rounded border-white/20 text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <label htmlFor="addIsActive" className="text-gray-300 cursor-pointer">
                  Product is Active & Visible in Storefront
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                onClick={() => setIsAddProductOpen(false)}
                className="px-4 py-2 text-xs text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateProduct}
                className="btn-luxury-primary text-xs py-2 px-5 shadow-lg shadow-blue-600/30"
              >
                Create Product
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
