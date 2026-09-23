import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ShippingAddress, PaymentMethod, Order } from '../../types';
import { 
  ShieldCheck, 
  Lock, 
  Truck, 
  CreditCard, 
  Smartphone, 
  Building, 
  Banknote, 
  Check, 
  ArrowLeft, 
  AlertCircle 
} from 'lucide-react';

interface CheckoutFormProps {
  onOrderSuccess: (order: Order) => void;
  onBackToCart: () => void;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({
  onOrderSuccess,
  onBackToCart
}) => {
  const { 
    cart, 
    cartSubtotal, 
    cartDiscount, 
    cartShipping, 
    cartTotal, 
    appliedCoupon, 
    createOrder,
    showToast
  } = useStore();

  const [formData, setFormData] = useState<ShippingAddress>({
    fullName: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: 'Maharashtra',
    pincode: '',
    landmark: ''
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [upiId, setUpiId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Delhi',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  const handleInputChange = (field: keyof ShippingAddress, val: string) => {
    setFormData(prev => ({ ...prev, [field]: val }));
    if (formErrors[field]) {
      setFormErrors(prev => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) errors.fullName = 'Full name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errors.email = 'Valid email is required';
    if (!formData.phone.trim() || formData.phone.length < 10) errors.phone = '10-digit mobile number is required';
    if (!formData.addressLine1.trim()) errors.addressLine1 = 'Street address is required';
    if (!formData.city.trim()) errors.city = 'City is required';
    if (!formData.pincode.trim() || formData.pincode.length < 6) errors.pincode = '6-digit PIN code is required';
    
    if (paymentMethod === 'upi' && !upiId.includes('@')) {
      errors.upiId = 'Valid UPI ID (e.g. user@okhdfcbank) is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      showToast('Form Incomplete', 'Please fill in all required shipping fields.', 'error');
      return;
    }

    if (cart.length === 0) {
      showToast('Empty Bag', 'Your shopping bag is empty.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate secure order processing
      await new Promise(r => setTimeout(r, 1200));
      const order = await createOrder(formData, paymentMethod);
      showToast('Order Placed', `Order ${order.order_number} confirmed!`);
      onOrderSuccess(order);
    } catch (err) {
      showToast('Error', 'Failed to place order. Please retry.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="py-24 text-center max-w-md mx-auto px-4">
        <h2 className="font-editorial text-2xl font-bold text-white mb-4">No Items to Checkout</h2>
        <p className="text-gray-400 text-xs mb-6">Your shopping bag is currently empty.</p>
        <button onClick={onBackToCart} className="btn-luxury-primary text-xs uppercase tracking-widest py-3 px-6">
          Explore Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      
      {/* Top Header */}
      <div className="flex items-center justify-between mb-10 pb-4 border-b border-white/10">
        <button
          onClick={onBackToCart}
          className="text-xs text-gray-400 hover:text-white flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Cart
        </button>
        <div className="flex items-center gap-2 text-xs text-gray-300">
          <Lock className="w-3.5 h-3.5 text-blue-400" />
          <span>256-Bit SSL Encrypted Checkout</span>
        </div>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* LEFT: Shipping & Contact Form (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          
          {/* 1. Contact Information */}
          <div className="p-6 sm:p-8 rounded-3xl glass-dark border border-white/10 flex flex-col gap-4">
            <h3 className="font-editorial text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-mono">1</span>
              <span>Contact Information</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="text-xs text-gray-400 block mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={e => handleInputChange('fullName', e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                />
                {formErrors.fullName && <span className="text-[11px] text-rose-400 mt-1 block">{formErrors.fullName}</span>}
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => handleInputChange('email', e.target.value)}
                  placeholder="priya@example.com"
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                />
                {formErrors.email && <span className="text-[11px] text-rose-400 mt-1 block">{formErrors.email}</span>}
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-1">Mobile Phone *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={e => handleInputChange('phone', e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                />
                {formErrors.phone && <span className="text-[11px] text-rose-400 mt-1 block">{formErrors.phone}</span>}
              </div>
            </div>
          </div>

          {/* 2. Shipping Address */}
          <div className="p-6 sm:p-8 rounded-3xl glass-dark border border-white/10 flex flex-col gap-4">
            <h3 className="font-editorial text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-mono">2</span>
              <span>Delivery Address</span>
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-400 block mb-1">Flat, House No., Apartment, Building *</label>
                <input
                  type="text"
                  required
                  value={formData.addressLine1}
                  onChange={e => handleInputChange('addressLine1', e.target.value)}
                  placeholder="Apartment 402, Royal Palms"
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                />
                {formErrors.addressLine1 && <span className="text-[11px] text-rose-400 mt-1 block">{formErrors.addressLine1}</span>}
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-1">Area, Street, Sector, Village</label>
                <input
                  type="text"
                  value={formData.addressLine2}
                  onChange={e => handleInputChange('addressLine2', e.target.value)}
                  placeholder="Bandra West"
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-gray-400 block mb-1">PIN Code *</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={formData.pincode}
                    onChange={e => handleInputChange('pincode', e.target.value)}
                    placeholder="400050"
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  />
                  {formErrors.pincode && <span className="text-[11px] text-rose-400 mt-1 block">{formErrors.pincode}</span>}
                </div>

                <div>
                  <label className="text-xs text-gray-400 block mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={e => handleInputChange('city', e.target.value)}
                    placeholder="Mumbai"
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  />
                  {formErrors.city && <span className="text-[11px] text-rose-400 mt-1 block">{formErrors.city}</span>}
                </div>

                <div>
                  <label className="text-xs text-gray-400 block mb-1">State *</label>
                  <select
                    value={formData.state}
                    onChange={e => handleInputChange('state', e.target.value)}
                    className="w-full bg-[#14141E] border border-white/15 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    {indianStates.map(st => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Payment Method */}
          <div className="p-6 sm:p-8 rounded-3xl glass-dark border border-white/10 flex flex-col gap-4">
            <h3 className="font-editorial text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-mono">3</span>
              <span>Payment Option</span>
            </h3>

            <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs mb-2">
              <span className="font-bold block mb-0.5">Development / Test Mode</span>
              <p className="text-[11px] text-amber-300/80 font-light leading-relaxed">
                Payment simulation active. Connect your live payment gateway (Razorpay, Cashfree, or Stripe) via environment keys for live automated settlement.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`p-4 rounded-2xl text-left border transition-all flex items-center gap-3 ${
                  paymentMethod === 'upi'
                    ? 'bg-blue-950/40 border-blue-500 text-white shadow-md'
                    : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-5 h-5 text-blue-400" />
                <div>
                  <span className="text-xs font-bold block text-white">Instant UPI (Test Mode)</span>
                  <span className="text-[10px] text-gray-400">GPay, PhonePe, Paytm</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-4 rounded-2xl text-left border transition-all flex items-center gap-3 ${
                  paymentMethod === 'card'
                    ? 'bg-blue-950/40 border-blue-500 text-white shadow-md'
                    : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                }`}
              >
                <CreditCard className="w-5 h-5 text-blue-400" />
                <div>
                  <span className="text-xs font-bold block text-white">Cards (Test Mode)</span>
                  <span className="text-[10px] text-gray-400">Visa, Mastercard, RuPay</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('netbanking')}
                className={`p-4 rounded-2xl text-left border transition-all flex items-center gap-3 ${
                  paymentMethod === 'netbanking'
                    ? 'bg-blue-950/40 border-blue-500 text-white shadow-md'
                    : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                }`}
              >
                <Building className="w-5 h-5 text-blue-400" />
                <div>
                  <span className="text-xs font-bold block text-white">Net Banking (Test Mode)</span>
                  <span className="text-[10px] text-gray-400">All Major Indian Banks</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-4 rounded-2xl text-left border transition-all flex items-center gap-3 ${
                  paymentMethod === 'cod'
                    ? 'bg-blue-950/40 border-blue-500 text-white shadow-md'
                    : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                }`}
              >
                <Banknote className="w-5 h-5 text-emerald-400" />
                <div>
                  <span className="text-xs font-bold block text-white">Cash on Delivery (COD)</span>
                  <span className="text-[10px] text-gray-400">Pay cash upon delivery</span>
                </div>
              </button>
            </div>

            {/* UPI ID Field if UPI selected */}
            {paymentMethod === 'upi' && (
              <div className="mt-2 p-4 rounded-2xl bg-white/5 border border-white/10 animate-fade-in">
                <label className="text-xs text-gray-400 block mb-1">Enter UPI ID (e.g. user@okhdfcbank) *</label>
                <input
                  type="text"
                  value={upiId}
                  onChange={e => setUpiId(e.target.value)}
                  placeholder="username@okhdfcbank"
                  className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                />
                {formErrors.upiId && <span className="text-[11px] text-rose-400 mt-1 block">{formErrors.upiId}</span>}
              </div>
            )}
          </div>

        </div>

        {/* RIGHT: Order Summary Sidebar (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="p-6 sm:p-8 rounded-3xl glass-dark border border-white/15 shadow-2xl flex flex-col gap-6 bg-[#0E0E16]">
            
            <h3 className="font-editorial text-lg font-bold text-white uppercase tracking-wider pb-3 border-b border-white/10">
              Order Summary ({cart.length} items)
            </h3>

            {/* Item Detailed List */}
            <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
              {cart.map(item => {
                const isPrem = item.product.quality_tier === 'premium';
                return (
                  <div key={`${item.product.id}-${item.selectedSize}`} className="p-3 rounded-2xl bg-white/5 border border-white/5 flex gap-3 text-xs">
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.name}
                      className="w-14 h-16 rounded-xl object-cover bg-black/40 shrink-0 border border-white/10"
                    />
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-semibold text-white truncate">{item.product.name}</h4>
                        <span className="font-mono font-bold text-white shrink-0">
                          ₹{item.product.price * item.quantity}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-[11px] text-gray-400">
                        <span className="text-blue-300 font-medium">
                          {isPrem ? 'Premium Collection' : 'Normal Collection'}
                        </span>
                        <span>•</span>
                        <span>₹{item.product.price} each</span>
                      </div>

                      <div className="text-[10px] text-gray-300">
                        <span>Packaging: </span>
                        <strong className="text-white">
                          {isPrem ? '1 Premium Pack' : '3 Packs × 24 Nails'}
                        </strong>
                      </div>

                      <div className="text-[10px] text-gray-300 flex items-center justify-between">
                        <span>
                          Total Nails: <strong className="text-white">{isPrem ? '10 Handmade Nails' : '72 Handmade Nails Total'}</strong>
                        </span>
                        <span className="text-gray-400">
                          Size: {item.selectedSize} • Qty: {item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Financial Breakdown */}
            <div className="space-y-2 pt-4 border-t border-white/10 text-xs text-gray-400">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-mono text-white">₹{cartSubtotal}</span>
              </div>

              {cartDiscount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Discount ({appliedCoupon?.code || 'Promo'})</span>
                  <span className="font-mono">-₹{cartDiscount}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Express Courier Shipping</span>
                <span className="font-mono text-white">
                  {cartShipping === 0 ? <span className="text-emerald-400">FREE</span> : `₹${cartShipping}`}
                </span>
              </div>

              <div className="flex justify-between text-base font-bold text-white pt-3 border-t border-white/10">
                <span>Total Amount Payable</span>
                <span className="font-mono text-xl text-white">₹{cartTotal}</span>
              </div>
            </div>

            {/* Place Order CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-luxury-primary text-xs sm:text-sm uppercase tracking-widest py-4 flex items-center justify-center gap-2 shadow-2xl shadow-blue-600/40 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Confirming Order...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Place Order (₹{cartTotal})</span>
                </>
              )}
            </button>

            {/* Trust Assurances */}
            <div className="pt-2 text-center text-[11px] text-gray-400 space-y-1">
              <div>🛡️ Includes Complete Atelier Prep Kit</div>
              <div>✨ 100% Satisfaction & Authenticity Guarantee</div>
            </div>

          </div>
        </div>

      </form>
    </div>
  );
};
