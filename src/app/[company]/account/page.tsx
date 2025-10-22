'use client';

import { useState } from 'react';
import Link from 'next/link';
import { User, Package, Heart, MapPin, Settings, LogOut, ArrowLeft, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';

export default function AccountPage({ params }: { params: { company: string } }) {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses'>('profile');

  // Mock user data - in production, this would come from your auth system
  const [userData, setUserData] = useState({
    name: 'Guest User',
    email: 'guest@example.com',
    phone: '',
  });

  const tabs = [
    { id: 'profile' as const, label: 'Profile', icon: User },
    { id: 'orders' as const, label: 'Orders', icon: Package },
    { id: 'addresses' as const, label: 'Addresses', icon: MapPin },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link 
          href={`/${params.company}`}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
        <div className="flex items-center gap-3 mb-2">
          <User className="h-8 w-8 text-primary" />
          <h1 className="text-3xl md:text-4xl font-bold">My Account</h1>
        </div>
      </div>

      <div className="grid md:grid-cols-[240px_1fr] gap-6">
        {/* Sidebar */}
        <Card className="p-4 h-fit">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground/60 hover:bg-accent hover:text-foreground'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                {tab.label}
              </button>
            ))}
            
            <div className="border-t my-4" />
            
            <Link
              href={`/${params.company}/wishlist`}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium text-foreground/60 hover:bg-accent hover:text-foreground transition-colors"
            >
              <Heart className="h-5 w-5" />
              Wishlist
            </Link>
            
            <Link
              href={`/${params.company}`}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              Sign Out
            </Link>
          </nav>
        </Card>

        {/* Main Content */}
        <div>
          {activeTab === 'profile' && (
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <User className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold">Profile Information</h2>
              </div>

              <form className="space-y-4 max-w-lg">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={userData.name}
                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={userData.email}
                      onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                      placeholder="your@email.com"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      value={userData.phone}
                      onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                      placeholder="+597 123 4567"
                      className="pl-10"
                    />
                  </div>
                </div>

                <Button type="button" className="mt-6">
                  Save Changes
                </Button>
              </form>
            </Card>
          )}

          {activeTab === 'orders' && (
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Package className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold">Order History</h2>
              </div>

              <div className="text-center py-12">
                <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">No orders yet</h3>
                <p className="text-muted-foreground mb-6">
                  When you place an order, it will appear here
                </p>
                <Button asChild>
                  <Link href={`/${params.company}/products`}>
                    Start Shopping
                  </Link>
                </Button>
              </div>
            </Card>
          )}

          {activeTab === 'addresses' && (
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold">Saved Addresses</h2>
              </div>

              <div className="text-center py-12">
                <MapPin className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">No saved addresses</h3>
                <p className="text-muted-foreground mb-6">
                  Save addresses for faster checkout
                </p>
                <Button>
                  Add New Address
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
