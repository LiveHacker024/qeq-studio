import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ShippingAddress, PaymentMethod, Order } from '../../types';
import { 
  ShieldCheck, 
  Lock, 
  Smartphone, 
  CreditCard, 
  Building, 
  Banknote, 
  ArrowLeft 
} from 'lucide-react';
import { getAssetUrl } from '../../utils/assetUrl';

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
    if (!formData.phone.trim() || formData.phone.length < 10) errors.phone = '10-digit mobile number is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errors.email = 'Valid email is required';
    if (!formData.addressLine1.trim()) errors.addressLine1 = 'House/flat & street address is required';
    if (!formData.city.trim()) errors.city = 'City is required';
    if (!formData.pincode.trim() || formData.pincode.length < 6) errors.pincode = '6-digit PIN code is required';

    if (paymentMethod === 'upi' && !upiId.includes('@')) {
      errors.upiId = 'Enter a valid UPI ID (e.g. name@okhdfcbank)';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      showToast('Incomplete Information', 'Please complete the required shipping fields.', 'error');
      return;
    }

    if (cart.length === 0) {
      showToast('Empty Cart', 'Your shopping cart is empty.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      await new Promise(r => setTimeout(r, 800));
      const order = await createOrder(formData, paymentMethod);
      showToast('Order Placed Successfully', `Order #${order.order_number} confirmed!`);
      onOrderSuccess(order);
    } catch (err) {
      showToast('Error', 'Could not complete order. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="py-24 text-center max-w-md mx-auto px-4">
        <h2 className="font-editorial text-2xl font-bold text-white mb-3">Your Cart is Empty</h2>
        <p className="text-gray-400 text-xs mb-6">Add items to your cart before proceeding to checkout.</p>
        <button onClick={onBackToCart} className="btn-luxury-primary text-xs uppercase tracking-widest py-3 px-6">
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto min-h-screen">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
        <button
          onClick={onBackToCart}
          className="text-xs text-gray-300 hover:text-white flex items-center gap-1.5 transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Cart
        </button>
        <div className="flex items-center gap-1.5 text-xs text-gray-300">
          <Lock className="w-3.5 h-3.5 text-emerald-400" />
          <span>Secure Checkout</span>
        </div>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: 3 Simple Steps (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* STEP 1: Contact Information */}
          <div className="p-6 rounded-2xl bg-[#111111] border border-white/10 flex flex-col gap-4">
            <h3 className="font-editorial text-sm sm:text-base font-bold text-white tracking-wider uppercase flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-[#1A56DB] text-white text-xs flex items-center justify-center font-mono font-bold">1</span>
              <span>Contact Information</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="sm:col-span-2">
                <label className="text-xs text-gray-300 block mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={e => handleInputChange('fullName', e.target.value)}
                  placeholder="e.g. Ananya Sharma"
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                />
                {formErrors.fullName && <span className="text-[11px] text-rose-400 mt-1 block">{formErrors.fullName}</span>}
              </div>

              <div>
                <label className="text-xs text-gray-300 block mb-1">Mobile Phone (WhatsApp) *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={e => handleInputChange('phone', e.target.value)}
                  placeholder="10-digit mobile number"
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                />
                {formErrors.phone && <span className="text-[11px] text-rose-400 mt-1 block">{formErrors.phone}</span>}
              </div>

              <div>
                <label className="text-xs text-gray-300 block mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => handleInputChange('email', e.target.value)}
                  placeholder="ananya@example.com"
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                />
                {formErrors.email && <span className="text-[11px] text-rose-400 mt-1 block">{formErrors.email}</span>}
              </div>
            </div>
          </div>

          {/* STEP 2: Shipping Information */}
          <div className="p-6 rounded-2xl bg-[#111111] border border-white/10 flex flex-col gap-4">
            <h3 className="font-editorial text-sm sm:text-base font-bold text-white tracking-wider uppercase flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-[#1A56DB] text-white text-xs flex items-center justify-center font-mono font-bold">2</span>
              <span>Shipping Address</span>
            </h3>

            <div className="space-y-3.5">
              <div>
                <label className="text-xs text-gray-300 block mb-1">Address (House / Flat / Building / Street) *</label>
                <input
                  type="text"
                  required
                  value={formData.addressLine1}
                  onChange={e => handleInputChange('addressLine1', e.target.value)}
                  placeholder="Flat 302, Palm Heights, Link Road"
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                />
                {formErrors.addressLine1 && <span className="text-[11px] text-rose-400 mt-1 block">{formErrors.addressLine1}</span>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label className="text-xs text-gray-300 block mb-1">PIN Code *</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={formData.pincode}
                    onChange={e => handleInputChange('pincode', e.target.value)}
                    placeholder="400050"
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  />
                  {formErrors.pincode && <span className="text-[11px] text-rose-400 mt-1 block">{formErrors.pincode}</span>}
                </div>

                <div>
                  <label className="text-xs text-gray-300 block mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={e => handleInputChange('city', e.target.value)}
                    placeholder="Mumbai"
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  />
                  {formErrors.city && <span className="text-[11px] text-rose-400 mt-1 block">{formErrors.city}</span>}
                </div>

                <div>
                  <label className="text-xs text-gray-300 block mb-1">State *</label>
                  <select
                    value={formData.state}
                    onChange={e => handleInputChange('state', e.target.value)}
                    className="w-full bg-[#181818] border border-white/15 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    {indianStates.map(st => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* STEP 3: Payment Method */}
          <div className="p-6 rounded-2xl bg-[#111111] border border-white/10 flex flex-col gap-4">
            <h3 className="font-editorial text-sm sm:text-base font-bold text-white tracking-wider uppercase flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-[#1A56DB] text-white text-xs flex items-center justify-center font-mono font-bold">3</span>
              <span>Payment Option</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`p-3.5 rounded-xl text-left border transition-all flex items-center gap-3 ${
                  paymentMethod === 'upi'
                    ? 'bg-white/10 border-white/40 text-white'
                    : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-5 h-5 text-[#C8A96B]" />
                <div>
                  <span className="text-xs font-bold block text-white">Instant UPI</span>
                  <span className="text-[10px] text-gray-400">GPay, PhonePe, Paytm</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3.5 rounded-xl text-left border transition-all flex items-center gap-3 ${
                  paymentMethod === 'card'
                    ? 'bg-white/10 border-white/40 text-white'
                    : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                }`}
              >
                <CreditCard className="w-5 h-5 text-[#C8A96B]" />
                <div>
                  <span className="text-xs font-bold block text-white">Debit / Credit Card</span>
                  <span className="text-[10px] text-gray-400">Visa, Mastercard, RuPay</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('netbanking')}
                className={`p-3.5 rounded-xl text-left border transition-all flex items-center gap-3 ${
                  paymentMethod === 'netbanking'
                    ? 'bg-white/10 border-white/40 text-white'
                    : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                }`}
              >
                <Building className="w-5 h-5 text-[#C8A96B]" />
                <div>
                  <span className="text-xs font-bold block text-white">Net Banking</span>
                  <span className="text-[10px] text-gray-400">All Major Banks</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-3.5 rounded-xl text-left border transition-all flex items-center gap-3 ${
                  paymentMethod === 'cod'
                    ? 'bg-white/10 border-white/40 text-white'
                    : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                }`}
              >
                <Banknote className="w-5 h-5 text-emerald-400" />
                <div>
                  <span className="text-xs font-bold block text-white">Cash on Delivery</span>
                  <span className="text-[10px] text-gray-400">Pay on receipt</span>
                </div>
              </button>
            </div>

            {paymentMethod === 'upi' && (
              <div className="mt-2 p-3.5 rounded-xl bg-black/40 border border-white/10">
                <label className="text-xs text-gray-300 block mb-1">Enter UPI ID (e.g. mobile@okhdfcbank) *</label>
                <input
                  type="text"
                  value={upiId}
                  onChange={e => setUpiId(e.target.value)}
                  placeholder="yourname@okhdfcbank"
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                />
                {formErrors.upiId && <span className="text-[11px] text-rose-400 mt-1 block">{formErrors.upiId}</span>}
              </div>
            )}
          </div>

        </div>

        {/* RIGHT COLUMN: Step 4 Order Summary (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          <div className="p-6 rounded-2xl bg-[#111111] border border-white/10 shadow-xl flex flex-col gap-5">
            
            <h3 className="font-editorial text-sm sm:text-base font-bold text-white tracking-wider uppercase pb-3 border-b border-white/10 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#1A56DB] text-white text-xs flex items-center justify-center font-mono font-bold">4</span>
              <span>Order Summary ({cart.length} item{cart.length > 1 ? 's' : ''})</span>
            </h3>

            {/* Products List */}
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {cart.map(item => {
                const isPrem = item.product.quality_tier === 'premium';
                return (
                  <div key={`${item.product.id}-${item.selectedSize}`} className="p-3 rounded-xl bg-[#171717] border border-white/5 flex gap-3 text-xs">
                    <img
                      src={getAssetUrl(item.product.thumbnail)}
                      alt={item.product.name}
                      className="w-12 h-14 rounded-lg object-cover bg-black shrink-0 border border-white/10"
                    />
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-semibold text-white truncate" title={item.product.name}>{item.product.name}</h4>
                        <span className="font-mono font-bold text-white shrink-0">
                          ₹{item.product.price * item.quantity}
                        </span>
                      </div>
                      
                      <div className="text-[11px] text-gray-400 flex items-center justify-between">
                        <span>
                          {isPrem ? '1 pack (10 nails)' : '3 packs (72 nails)'}
                        </span>
                        <span>Size: {item.selectedSize} • Qty: {item.quantity}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Price Calculations */}
            <div className="space-y-2 pt-3 border-t border-white/10 text-xs text-gray-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono text-white font-medium">₹{cartSubtotal}</span>
              </div>

              {cartDiscount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Discount</span>
                  <span className="font-mono">-₹{cartDiscount}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-mono text-white font-medium">
                  {cartShipping === 0 ? <span className="text-emerald-400 font-semibold">FREE</span> : `₹${cartShipping}`}
                </span>
              </div>

              <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/10">
                <span>Total Amount</span>
                <span className="font-mono text-xl text-white font-bold">₹{cartTotal}</span>
              </div>
            </div>

            {/* Primary Action Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-luxury-primary text-xs uppercase tracking-widest py-3.5 flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 font-bold"
            >
              {isSubmitting ? (
                <span>Placing Order...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Place Order (₹{cartTotal})</span>
                </>
              )}
            </button>

            <div className="text-center text-[10px] text-gray-400">
              Complete prep kit included with every order.
            </div>

          </div>
        </div>

      </form>
    </div>
  );
};
