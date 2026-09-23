import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Order, OrderStatus, Product } from '../types';
import { BUSINESS_INFO } from '../data/initialConfig';
import { 
  User, 
  ShoppingBag, 
  Heart, 
  MapPin, 
  Truck, 
  MessageCircle, 
  ExternalLink, 
  Clock, 
  Calendar,
  CheckCircle2,
  Package
} from 'lucide-react';
import { getAssetUrl } from '../utils/assetUrl';

export const AccountPage: React.FC<{ onNavigateShop: () => void; onProductClick: (slug: string) => void }> = ({
  onNavigateShop,
  onProductClick
}) => {
  const { orders, wishlist, products, moveToCartFromWishlist } = useStore();
  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'addresses' | 'profile'>('orders');

  const wishlistProducts = products.filter((p: Product) => wishlist.includes(p.id));

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto min-h-screen animate-fade-in">
      
      {/* Account Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-white/10 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-blue-600/20 border-2 border-blue-500/40 flex items-center justify-center text-blue-400 font-bold text-xl">
            <User className="w-7 h-7" />
          </div>
          <div>
            <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-white tracking-wide">
              MY ATELIER ACCOUNT
            </h1>
            <p className="text-xs text-gray-400 font-light">
              Track active deliveries, view past handcrafted orders, and manage saved styles.
            </p>
          </div>
        </div>

        <button
          onClick={onNavigateShop}
          className="btn-luxury-secondary text-xs uppercase tracking-widest py-2.5 px-5 self-start sm:self-auto"
        >
          Explore Catalog
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 bg-white/5 p-1.5 rounded-2xl border border-white/10">
        <button
          onClick={() => setActiveTab('orders')}
          className={`py-2.5 px-5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'orders' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>My Orders ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('wishlist')}
          className={`py-2.5 px-5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'wishlist' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Wishlist ({wishlist.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('addresses')}
          className={`py-2.5 px-5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'addresses' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Saved Addresses</span>
        </button>
      </div>

      {/* TAB 1: ORDERS */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          {orders.length === 0 ? (
            <div className="text-center py-20 rounded-3xl glass-dark border border-white/10 p-8">
              <Package className="w-12 h-12 text-gray-500 mx-auto mb-3" />
              <h3 className="font-editorial text-xl font-bold text-white mb-2">No Past Orders Found</h3>
              <p className="text-xs text-gray-400 max-w-sm mx-auto mb-6">
                When you place an order, live tracking milestones and delivery updates will appear right here.
              </p>
              <button onClick={onNavigateShop} className="btn-luxury-primary text-xs uppercase tracking-widest py-3 px-6">
                Start Shopping
              </button>
            </div>
          ) : (
            orders.map((order: Order) => (
              <div key={order.id} className="p-6 sm:p-8 rounded-3xl glass-dark border border-white/10 flex flex-col gap-6 shadow-xl">
                
                {/* Order Top Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-lg font-bold text-white">{order.order_number}</span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-600/30 text-blue-200 border border-blue-500/40">
                      {order.order_status}
                    </span>
                    <span className="text-xs text-gray-400">
                      Placed on {new Date(order.created_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="font-mono text-xl font-bold text-white">₹{order.total}</span>
                    <span className="text-[11px] text-gray-400 block font-light">Paid via {order.payment_method.toUpperCase()}</span>
                  </div>
                </div>

                {/* Tracking Progress */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="flex items-center justify-between mb-2 text-xs">
                    <span className="text-gray-300 font-semibold flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-blue-400" />
                      Status: <strong className="text-white">{order.order_status}</strong>
                    </span>
                    <span className="text-gray-400">
                      Est. Arrival: <strong className="text-champagne-soft">{order.estimated_delivery}</strong>
                    </span>
                  </div>
                </div>

                {/* Items */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {order.items.map((item, i: number) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-black/40 border border-white/5">
                      <img
                        src={getAssetUrl(item.productImage)}
                        alt={item.productName}
                        className="w-12 h-14 rounded-lg object-cover bg-black border border-white/10 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <h5 className="font-semibold text-xs text-white truncate">{item.productName}</h5>
                        <span className="text-[11px] text-gray-400 block">
                          Size: {item.size} • Qty: {item.quantity} • <strong className="text-blue-300 capitalize">{item.qualityTier}</strong>
                        </span>
                      </div>
                      <span className="font-mono text-xs font-bold text-white">₹{item.subtotal}</span>
                    </div>
                  ))}
                </div>

                {/* WhatsApp Update Link */}
                <div className="pt-2 flex justify-end">
                  <a
                    href={`${BUSINESS_INFO.whatsappUrl}?text=${encodeURIComponent(`Hello QeQ Studio! Checking update on order #${order.order_number}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 underline"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Get Instant Updates on WhatsApp</span>
                  </a>
                </div>

              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 2: WISHLIST */}
      {activeTab === 'wishlist' && (
        <div>
          {wishlistProducts.length === 0 ? (
            <div className="text-center py-20 rounded-3xl glass-dark border border-white/10 p-8">
              <Heart className="w-12 h-12 text-gray-500 mx-auto mb-3" />
              <h3 className="font-editorial text-xl font-bold text-white mb-2">No Saved Styles Yet</h3>
              <p className="text-xs text-gray-400 max-w-sm mx-auto mb-6">
                Click the heart icon on any nail set to curate your private favorites list.
              </p>
              <button onClick={onNavigateShop} className="btn-luxury-primary text-xs uppercase tracking-widest py-3 px-6">
                Browse Atelier
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {wishlistProducts.map((p: Product) => (
                <div key={p.id} className="p-4 rounded-2xl glass-dark border border-white/10 flex flex-col justify-between gap-3">
                  <div 
                    onClick={() => onProductClick(p.slug)}
                    className="aspect-[4/5] rounded-xl overflow-hidden cursor-pointer"
                  >
                    <img src={getAssetUrl(p.thumbnail)} alt={p.name} className="w-full h-full object-cover hover:scale-105 transition-transform" />
                  </div>
                  <div>
                    <h4 className="font-editorial text-xs font-bold text-white truncate">{p.name}</h4>
                    <span className="font-mono text-sm font-bold text-white">₹{p.price}</span>
                  </div>
                  <button
                    onClick={() => moveToCartFromWishlist(p.id)}
                    className="w-full btn-luxury-primary text-xs py-2"
                  >
                    Move to Bag
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: SAVED ADDRESSES */}
      {activeTab === 'addresses' && (
        <div className="p-8 rounded-3xl glass-dark border border-white/10 text-xs text-gray-300">
          <h3 className="font-editorial text-base font-bold text-white mb-3">Primary Delivery Address</h3>
          {orders.length > 0 ? (
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 leading-relaxed max-w-md">
              <strong className="text-white block text-sm mb-1">{orders[0].customer_name}</strong>
              <p>{orders[0].shipping_address.addressLine1}</p>
              <p>{orders[0].shipping_address.city}, {orders[0].shipping_address.state} - {orders[0].shipping_address.pincode}</p>
              <p className="text-gray-400 mt-2">Phone: {orders[0].customer_phone}</p>
            </div>
          ) : (
            <p className="text-gray-400">Your address will be automatically saved upon your first checkout.</p>
          )}
        </div>
      )}

    </div>
  );
};
