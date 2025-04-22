"use client";

import MeatCatalog from '@/components/MeatCatalog';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function Home() {
  const [cart, setCart] = useState<{ id: string; quantity: number }[]>([]);

  useEffect(() => {
    // Load cart data from localStorage on component mount
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }

    const handleCartUpdate = () => {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    };

    window.addEventListener('cartUpdated', handleCartUpdate);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  const totalItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Local Meats Express</h1>
      <div className="flex items-center justify-between mb-4">
        <div>
          <MeatCatalog />
        </div>
        <Link href="/cart" className="flex items-center transition-colors duration-300 hover:text-green-600">
          <ShoppingCart className="mr-2" />
          Cart
          {totalItemsInCart > 0 && (
            <Badge variant="secondary" className="ml-2">{totalItemsInCart}</Badge>
          )}
        </Link>
      </div>
    </div>
  );
}

