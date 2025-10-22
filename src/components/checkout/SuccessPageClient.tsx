'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { CheckCircle, Package, Mail, Phone, MapPin, ShoppingBag, Home, MessageCircle } from 'lucide-react';

interface OrderDetails {
  orderNumber: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
    image?: string;
  }>;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  timestamp: string;
}

interface SuccessPageClientProps {
  companySlug: string;
  companyName: string;
  companyEmail?: string;
  companyPhone?: string;
}

export function SuccessPageClient({ companySlug, companyName, companyEmail, companyPhone }: SuccessPageClientProps) {
  const router = useRouter();
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

  useEffect(() => {
    // Retrieve order details from session storage
    const storedOrder = sessionStorage.getItem('lastOrder');
    if (storedOrder) {
      setOrderDetails(JSON.parse(storedOrder));
      // Clear the stored order after retrieving it
      sessionStorage.removeItem('lastOrder');
    } else {
      // If no order found, redirect to homepage
      router.push(`/${companySlug}`);
    }
  }, [router, companySlug]);

  if (!orderDetails) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading order details...</p>
        </div>
      </div>
    );
  }

  const orderDate = new Date(orderDetails.timestamp);

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/20 mb-4">
            <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Order Placed Successfully!</h1>
          <p className="text-muted-foreground text-lg">
            Thank you for your order. We&apos;ll contact you shortly via WhatsApp.
          </p>
        </div>

        {/* Order Number Card */}
        <Card className="p-6 mb-6 bg-primary/5 border-primary/20">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-1">Order Number</p>
            <p className="text-2xl font-bold text-primary">{orderDetails.orderNumber}</p>
            <p className="text-sm text-muted-foreground mt-2">
              {orderDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </Card>

        {/* What&apos;s Next */}
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-primary" />
            What Happens Next?
          </h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                1
              </div>
              <div>
                <h3 className="font-medium mb-1">WhatsApp Confirmation</h3>
                <p className="text-sm text-muted-foreground">
                  Your order details have been sent to our WhatsApp. We&apos;ll review and confirm your order shortly.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                2
              </div>
              <div>
                <h3 className="font-medium mb-1">Payment Instructions</h3>
                <p className="text-sm text-muted-foreground">
                  We&apos;ll send you payment details and instructions via WhatsApp once your order is confirmed.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                3
              </div>
              <div>
                <h3 className="font-medium mb-1">Order Processing</h3>
                <p className="text-sm text-muted-foreground">
                  After payment confirmation, we&apos;ll prepare your order for delivery.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                4
              </div>
              <div>
                <h3 className="font-medium mb-1">Delivery</h3>
                <p className="text-sm text-muted-foreground">
                  Your order will be delivered to your address. We&apos;ll keep you updated throughout the process.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Customer Information */}
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{orderDetails.customer.email}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">{orderDetails.customer.phone}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Package className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Items</p>
                <p className="font-medium">{orderDetails.items.length} product{orderDetails.items.length !== 1 ? 's' : ''}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Order Items */}
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Order Items
          </h2>
          <div className="space-y-4">
            {orderDetails.items.map((item) => (
              <div key={item.id} className="flex gap-4 pb-4 border-b last:border-0 last:pb-0">
                <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center text-xs text-muted-foreground overflow-hidden flex-shrink-0">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    'No image'
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium mb-1">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                  <p className="text-sm font-medium mt-1">SRD {item.price.toFixed(2)} each</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">SRD {(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Order Summary */}
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>SRD {orderDetails.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tax (10%)</span>
              <span>SRD {orderDetails.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span className={orderDetails.shipping === 0 ? 'text-green-600 font-medium' : ''}>
                {orderDetails.shipping === 0 ? 'FREE' : `SRD ${orderDetails.shipping.toFixed(2)}`}
              </span>
            </div>
            <div className="border-t pt-3 flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>SRD {orderDetails.total.toFixed(2)}</span>
            </div>
          </div>
        </Card>

        {/* Contact Information */}
        {(companyEmail || companyPhone) && (
          <Card className="p-6 mb-8 bg-muted/30">
            <h2 className="font-semibold mb-3">Need Help?</h2>
            <p className="text-sm text-muted-foreground mb-3">
              If you have any questions about your order, feel free to contact us:
            </p>
            <div className="space-y-2">
              {companyPhone && (
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <a href={`tel:${companyPhone}`} className="hover:text-primary">
                    {companyPhone}
                  </a>
                </div>
              )}
              {companyEmail && (
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a href={`mailto:${companyEmail}`} className="hover:text-primary">
                    {companyEmail}
                  </a>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href={`/${companySlug}`}>
              <Home className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href={`/${companySlug}/products`}>
              <ShoppingBag className="h-5 w-5 mr-2" />
              Continue Shopping
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
