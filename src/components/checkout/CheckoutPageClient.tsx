'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Textarea } from '@/components/ui/Textarea';
import { Card } from '@/components/ui/Card';
import { ChevronLeft, ShoppingBag, MapPin, Phone, Mail, User, MessageCircle } from 'lucide-react';

interface CheckoutFormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  notes: string;
  acceptTerms: boolean;
}

interface CheckoutFormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  notes?: string;
  acceptTerms?: string;
}

interface CheckoutPageClientProps {
  companySlug: string;
  companyName: string;
  companyPhone?: string;
}

export function CheckoutPageClient({ companySlug, companyName, companyPhone }: CheckoutPageClientProps) {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    notes: '',
    acceptTerms: false,
  });
  const [errors, setErrors] = useState<CheckoutFormErrors>({});

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      router.push(`/${companySlug}/cart`);
    }
  }, [items, router, companySlug]);

  const tax = subtotal * 0.1; // 10% tax
  const shipping = subtotal >= 500 ? 0 : 50; // Free shipping over SRD 500
  const total = subtotal + tax + shipping;

  const validateForm = (): boolean => {
    const newErrors: CheckoutFormErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{7,15}$/.test(formData.phone.replace(/[\s-]/g, ''))) {
      newErrors.phone = 'Invalid phone number';
    }
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.acceptTerms) newErrors.acceptTerms = 'You must accept the terms and conditions';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateWhatsAppMessage = (): string => {
    const orderDetails = items.map((item, index) => 
      `${index + 1}. *${item.name}*\n   Quantity: ${item.quantity}\n   Price: SRD ${item.price.toFixed(2)}\n   Subtotal: SRD ${(item.price * item.quantity).toFixed(2)}`
    ).join('\n\n');

    return `🛍️ *New Order from ${companyName}*\n\n` +
      `*Customer Information:*\n` +
      `Name: ${formData.fullName}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone}\n\n` +
      `*Delivery Address:*\n` +
      `${formData.address}\n` +
      `${formData.city}${formData.postalCode ? `, ${formData.postalCode}` : ''}\n\n` +
      `*Order Details:*\n${orderDetails}\n\n` +
      `*Order Summary:*\n` +
      `Subtotal: SRD ${subtotal.toFixed(2)}\n` +
      `Tax (10%): SRD ${tax.toFixed(2)}\n` +
      `Shipping: ${shipping === 0 ? 'FREE' : `SRD ${shipping.toFixed(2)}`}\n` +
      `*Total: SRD ${total.toFixed(2)}*\n\n` +
      (formData.notes ? `*Additional Notes:*\n${formData.notes}\n\n` : '') +
      `Please confirm this order and provide payment instructions.`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Generate WhatsApp message
      const message = generateWhatsAppMessage();
      const encodedMessage = encodeURIComponent(message);
      
      // Get company phone or use default
      const whatsappNumber = companyPhone || '5978888888';
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

      // Store order details in session storage for confirmation page
      sessionStorage.setItem('lastOrder', JSON.stringify({
        orderNumber: `ORD-${Date.now()}`,
        customer: {
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
        },
        items,
        subtotal,
        tax,
        shipping,
        total,
        timestamp: new Date().toISOString(),
      }));

      // Clear the cart
      clearCart();

      // Open WhatsApp
      window.open(whatsappUrl, '_blank');

      // Redirect to confirmation page
      router.push(`/${companySlug}/checkout/success`);
    } catch (error) {
      console.error('Error processing order:', error);
      alert('There was an error processing your order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof CheckoutFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  if (items.length === 0) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href={`/${companySlug}/cart`}
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Cart
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold">Checkout</h1>
          <p className="text-muted-foreground mt-2">Complete your order</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Customer Information */}
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <User className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">Customer Information</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      placeholder="John Doe"
                      className={errors.fullName ? 'border-red-500' : ''}
                    />
                    {errors.fullName && <p className="text-sm text-red-500 mt-1">{errors.fullName}</p>}
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="john@example.com"
                      className={errors.email ? 'border-red-500' : ''}
                    />
                    {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="5978888888"
                      className={errors.phone ? 'border-red-500' : ''}
                    />
                    {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
                  </div>
                </div>
              </Card>

              {/* Delivery Address */}
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <MapPin className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">Delivery Address</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="address">Street Address *</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="123 Main Street"
                      className={errors.address ? 'border-red-500' : ''}
                    />
                    {errors.address && <p className="text-sm text-red-500 mt-1">{errors.address}</p>}
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        placeholder="Paramaribo"
                        className={errors.city ? 'border-red-500' : ''}
                      />
                      {errors.city && <p className="text-sm text-red-500 mt-1">{errors.city}</p>}
                    </div>
                    <div>
                      <Label htmlFor="postalCode">Postal Code (Optional)</Label>
                      <Input
                        id="postalCode"
                        value={formData.postalCode}
                        onChange={(e) => handleInputChange('postalCode', e.target.value)}
                        placeholder="1234"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="notes">Delivery Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                      placeholder="Any special instructions for delivery..."
                      rows={3}
                    />
                  </div>
                </div>
              </Card>

              {/* Payment Method */}
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">Payment Method</h2>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    Your order will be sent via WhatsApp. We&apos;ll provide payment instructions after confirming your order details.
                  </p>
                  <div className="flex items-center gap-2 mt-3 text-sm font-medium">
                    <MessageCircle className="h-4 w-4 text-green-600" />
                    <span>WhatsApp Order Confirmation</span>
                  </div>
                </div>
              </Card>

              {/* Terms and Conditions */}
              <Card className="p-6">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
                    className="mt-1 h-4 w-4"
                  />
                  <Label htmlFor="acceptTerms" className="text-sm cursor-pointer">
                    I agree to the{' '}
                    <Link href={`/${companySlug}/terms-conditions`} className="text-primary hover:underline" target="_blank">
                      terms and conditions
                    </Link>
                    {' '}and{' '}
                    <Link href={`/${companySlug}/privacy-policy`} className="text-primary hover:underline" target="_blank">
                      privacy policy
                    </Link>
                    . *
                  </Label>
                </div>
                {errors.acceptTerms && <p className="text-sm text-red-500 mt-2 ml-7">{errors.acceptTerms}</p>}
              </Card>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : 'Place Order via WhatsApp'}
              </Button>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <ShoppingBag className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">Order Summary</h2>
                </div>

                {/* Items */}
                <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center text-xs text-muted-foreground overflow-hidden">
                        {item.imageUrl ? (
                          <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          'No image'
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-sm line-clamp-1">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        <p className="text-sm font-medium">SRD {(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 border-t pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>SRD {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax (10%)</span>
                    <span>SRD {tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>
                      {shipping === 0 ? 'FREE' : `SRD ${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="border-t pt-3 flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>SRD {total.toFixed(2)}</span>
                  </div>
                </div>

                {shipping > 0 && (
                  <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <p className="text-xs text-blue-600 dark:text-blue-400">
                      Add SRD {(500 - subtotal).toFixed(2)} more for free shipping!
                    </p>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
