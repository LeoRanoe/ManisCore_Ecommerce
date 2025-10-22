'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, ShoppingCart, Trash2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useCart } from '@/contexts/CartContext';

interface WishlistItem {
  id: string;
  productId: string;
  name: string;
  slug: string;
  price: number;
  imageUrl: string;
  maxStock: number;
}

export default function WishlistPage({ params }: { params: { company: string } }) {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const { addItem } = useCart();

  useEffect(() => {
    // Load wishlist from localStorage
    const savedWishlist = localStorage.getItem(`wishlist_${params.company}`);
    if (savedWishlist) {
      setWishlistItems(JSON.parse(savedWishlist));
    }
  }, [params.company]);

  const removeFromWishlist = (itemId: string) => {
    const updatedWishlist = wishlistItems.filter(item => item.id !== itemId);
    setWishlistItems(updatedWishlist);
    localStorage.setItem(`wishlist_${params.company}`, JSON.stringify(updatedWishlist));
  };

  const addToCart = (item: WishlistItem) => {
    addItem({
      id: item.id,
      productId: item.productId,
      name: item.name,
      slug: item.slug,
      price: item.price,
      quantity: 1,
      imageUrl: item.imageUrl,
      maxStock: item.maxStock,
    });
  };

  const moveToCart = (item: WishlistItem) => {
    addToCart(item);
    removeFromWishlist(item.id);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link 
          href={`/${params.company}`}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Continue Shopping
        </Link>
        <div className="flex items-center gap-3 mb-2">
          <Heart className="h-8 w-8 text-primary" />
          <h1 className="text-3xl md:text-4xl font-bold">My Wishlist</h1>
        </div>
        <p className="text-muted-foreground">
          {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved for later
        </p>
      </div>

      {/* Wishlist Items */}
      {wishlistItems.length === 0 ? (
        <Card className="p-12 text-center">
          <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-semibold mb-2">Your wishlist is empty</h2>
          <p className="text-muted-foreground mb-6">
            Start adding items you love to your wishlist!
          </p>
          <Button asChild>
            <Link href={`/${params.company}/products`}>
              Browse Products
            </Link>
          </Button>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {wishlistItems.map((item) => (
            <Card key={item.id} className="group overflow-hidden">
              <Link href={`/${params.company}/products/${item.slug}`}>
                <div className="aspect-square relative overflow-hidden bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </Link>
              
              <div className="p-4">
                <Link 
                  href={`/${params.company}/products/${item.slug}`}
                  className="block mb-2 hover:text-primary transition-colors"
                >
                  <h3 className="font-semibold line-clamp-2">{item.name}</h3>
                </Link>
                <p className="text-lg font-bold text-primary mb-4">
                  SRD {item.price.toFixed(2)}
                </p>
                
                <div className="flex gap-2">
                  <Button
                    onClick={() => moveToCart(item)}
                    className="flex-1"
                    size="sm"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button
                    onClick={() => removeFromWishlist(item.id)}
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
