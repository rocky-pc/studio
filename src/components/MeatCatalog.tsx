"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const meatData = [
  {
    id: "fish",
    name: "Fresh Fish",
    description: "Locally sourced fresh fish, perfect for grilling or baking.",
    price: 7.99,
    image: "https://picsum.photos/200/150",
  },
  {
    id: "goat",
    name: "Goat Meat",
    description: "Tender goat meat, ideal for stews and curries.",
    price: 9.99,
    image: "https://picsum.photos/200/151",
  },
  {
    id: "cow",
    name: "Cow Meat",
    description: "High-quality cow meat, great for steaks and roasts.",
    price: 12.99,
    image: "https://picsum.photos/200/152",
  },
];

const MeatCatalog = () => {
  const [cart, setCart] = useState<{ id: string; quantity: number }[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Load cart data from localStorage on component mount
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    // Save cart data to localStorage whenever the cart changes
    localStorage.setItem('cart', JSON.stringify(cart));

    // Dispatch a custom event so other components can react to cart changes
    window.dispatchEvent(new Event('cartUpdated'));
  }, [cart]);


  const addToCart = (id: string) => {
    const existingItem = cart.find((item) => item.id === id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { id, quantity: 1 }]);
    }
    toast({
      title: "Item added to cart!",
      description: "See your cart for details.",
    });
  };

  const totalItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div>
      <div className="flex items-center justify-end mb-4">
        <ShoppingCart className="mr-2" />
        <Badge variant="secondary">{totalItemsInCart}</Badge>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {meatData.map((meat) => (
          <Card key={meat.id} className="animate-in fade-in duration-75">
            <CardHeader>
              <CardTitle>{meat.name}</CardTitle>
              <CardDescription>{meat.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <img
                src={meat.image}
                alt={meat.name}
                className="rounded-md mb-2 w-full h-32 object-cover"
              />
              <div className="flex items-center justify-between">
                <span>Price: ${meat.price.toFixed(2)}</span>
                <Button onClick={() => addToCart(meat.id)}
                  className="transition-colors duration-300 hover:bg-green-600"
                >Add to Cart</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MeatCatalog;
