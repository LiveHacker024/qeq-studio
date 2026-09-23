import React, { useEffect } from 'react';
import { Order } from '../../types';
import { BUSINESS_INFO } from '../../data/initialConfig';
import { 
  CheckCircle2, 
  Package, 
  Truck, 
  MessageCircle, 
  ArrowRight, 
  ShoppingBag, 
  Calendar, 
  MapPin, 
  Clock, 
  Sparkles 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { getAssetUrl } from '../../utils/assetUrl';

interface OrderConfirmationViewProps {
  order: Order;
  onNavigateHome: () => void;
  onNavigateShop: () => void;
}

export const OrderConfirmationView: React.FC<OrderConfirmationViewProps> = ({
  order,
  onNavigateHome,
  onNavigateShop
}) => {
  useEffect(() => {
    // Subtle luxury celebration confetti
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#2563EB', '#D4AF37', '#E5E7EB']
      });
    } catch (e) {}
  }, []);

  const statuses = [
    { label: 'Confirmed', desc: 'Order received & verified' },
    { label: 'Processing', desc: 'Atelier handcrafting tips' },
    { label: 'Shipped', desc: 'Handed to express courier' },
    { label: 'Out for Delivery', desc: 'Arriving at your doorstep' },
    { label: 'Delivered', desc: 'Enjoy your salon nails' }
  ];

  const currentIdx = statuses.findIndex(s => s.label === order.order_status);
  const activeStepIdx = currentIdx >= 0 ? currentIdx : 0;

  const whatsappMessage = encodeURIComponent(
    `Hello QeQ Studio Atelier! I placed order #${order.order_number} for ₹${order.total}. Could you please confirm tracking updates?`
  );

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto animate-fade-in">
      
      {/* Top Celebration Card */}
      <div className="p-8 sm:p-12 rounded-3xl glass-dark border border-blue-500/30 text-center relative overflow-hidden bg-gradient-to-b from-[#12162E] to-[#0A0A0F] shadow-2xl mb-10">
        
        {/* Checkmark Animation */}
        <div className="w-20 h-20 rounded-full bg-blue-600/20 border-2 border-blue-500 text-blue-400 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-600/30 animate-pulse-subtle">
          <CheckCircle2 className="w-10 h-10 text-blue-400" />
        </div>

        <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-blue-300 block mb-2">
          Payment & Order Verified
        </span>

        <h1 className="font-editorial text-3xl sm:text-5xl font-bold text-white tracking-tight mb-3">
          ORDER CONFIRMED
        </h1>

        <p className="text-gray-300 text-sm sm:text-base max-w-lg mx-auto font-light leading-relaxed mb-6">
          Thank you, <strong className="text-white">{order.customer_name}</strong>. Your handmade press-on nail sets are now being prepared by our atelier.
        </p>

        {/* Order Details Chip */}
        <div className="inline-flex flex-wrap items-center justify-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-6 py-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <span className="text-gray-400">Order Number:</span>
            <span className="font-mono font-bold text-white text-base">{order.order_number}</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-gray-600 hidden sm:block" />
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-champagne-gold" />
            <span className="text-gray-400">Estimated Delivery:</span>
            <span className="font-semibold text-white">{order.estimated_delivery}</span>
          </div>
        </div>
      </div>

      {/* Live Order Tracker Progress */}
      <div className="p-6 sm:p-8 rounded-3xl glass-dark border border-white/10 shadow-xl mb-10">
        <h3 className="font-editorial text-base sm:text-lg font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
          <Truck className="w-5 h-5 text-blue-400" />
          <span>Live Order Tracking</span>
        </h3>

        {/* Horizontal Progress Bar */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {statuses.map((step, idx) => {
            const isCompleted = idx <= activeStepIdx;
            const isCurrent = idx === activeStepIdx;

            return (
              <div key={step.label} className="flex flex-col gap-2 relative">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    isCompleted
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/40'
                      : 'bg-white/5 text-gray-500 border border-white/10'
                  }`}>
                    {idx + 1}
                  </div>
                  <span className={`text-xs font-bold ${isCompleted ? 'text-white' : 'text-gray-500'}`}>
                    {step.label}
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 pl-10 md:pl-0 font-light leading-tight">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Order Items & Shipping Address Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
        
        {/* Items List (7 Cols) */}
        <div className="md:col-span-7 p-6 rounded-3xl glass-dark border border-white/10 flex flex-col gap-4">
          <h4 className="font-editorial text-sm font-bold text-white uppercase tracking-wider pb-2 border-b border-white/10">
            Items in This Order
          </h4>

          <div className="space-y-3">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                <img
                  src={getAssetUrl(item.productImage)}
                  alt={item.productName}
                  className="w-14 h-16 rounded-lg object-cover bg-black/40 border border-white/10 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h5 className="font-semibold text-xs text-white truncate">{item.productName}</h5>
                  <span className="text-[11px] text-gray-400 block">
                    Tier: <strong className="text-blue-300 capitalize">{item.qualityTier}</strong> • Size: {item.size} • Qty: {item.quantity}
                  </span>
                  <span className="text-[10px] text-champagne-soft font-medium block">
                    {item.qualityTier === 'premium' ? '1 Premium Pack (10 Handmade Nails)' : '3 Packs × 24 Nails (72 Nails Total)'}
                  </span>
                </div>
                <span className="font-mono text-xs font-bold text-white">₹{item.subtotal}</span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10 space-y-1 text-xs text-gray-400">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-mono text-white">₹{order.subtotal}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span>Discount</span>
                <span className="font-mono">-₹{order.discount}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="font-mono text-white">{order.shipping === 0 ? 'FREE' : `₹${order.shipping}`}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/10">
              <span>Total Paid</span>
              <span className="font-mono text-base">₹{order.total}</span>
            </div>
          </div>
        </div>

        {/* Shipping Address (5 Cols) */}
        <div className="md:col-span-5 p-6 rounded-3xl glass-dark border border-white/10 flex flex-col justify-between gap-4">
          <div>
            <h4 className="font-editorial text-sm font-bold text-white uppercase tracking-wider pb-2 border-b border-white/10 mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-400" />
              <span>Delivery Address</span>
            </h4>
            <div className="text-xs text-gray-300 leading-relaxed space-y-1">
              <strong className="text-white block">{order.customer_name}</strong>
              <p>{order.shipping_address.addressLine1}</p>
              {order.shipping_address.addressLine2 && <p>{order.shipping_address.addressLine2}</p>}
              <p>{order.shipping_address.city}, {order.shipping_address.state} - {order.shipping_address.pincode}</p>
              <p className="text-gray-400 pt-1">Phone: {order.customer_phone}</p>
              <p className="text-gray-400">Email: {order.customer_email}</p>
            </div>
          </div>

          {/* WhatsApp Direct Concierge */}
          <div className="pt-4 border-t border-white/10">
            <a
              href={`${BUSINESS_INFO.whatsappUrl}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-600 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Track via WhatsApp Concierge</span>
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={onNavigateShop}
          className="w-full sm:w-auto btn-luxury-primary text-xs uppercase tracking-widest py-3.5 px-8 flex items-center justify-center gap-2"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Continue Shopping</span>
        </button>

        <button
          onClick={onNavigateHome}
          className="w-full sm:w-auto btn-luxury-secondary text-xs uppercase tracking-widest py-3.5 px-8"
        >
          Back to Homepage
        </button>
      </div>

    </div>
  );
};
