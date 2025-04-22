"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Label } from "@/components/ui/label";

const OrderCart = () => {
  const [cart, setCart] = useState<{ id: string; quantity: number }[]>([]);
  const [deliveryDetails, setDeliveryDetails] = useState({
    address: "",
    contact: "",
  });

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

  const updateQuantity = (id: string, quantity: number) => {
    setCart(
      cart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const calculateTotal = () => {
    let total = 0;
    cart.forEach((item) => {
      const meat = meatData.find((m) => m.id === item.id);
      if (meat) {
        total += meat.price * item.quantity;
      }
    });
    return total.toFixed(2);
  };

  const handleSubmit = () => {
    // Process order logic here (e.g., send to backend)
    alert(
      `Order confirmed!\nOrder ID: ${Math.random()
        .toString(36)
        .substring(7)}\nTotal: $${calculateTotal()}`
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Cart</CardTitle>
      </CardHeader>
      <CardContent>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <ul>
              {cart.map((item) => {
                const meat = meatData.find((m) => m.id === item.id);
                if (!meat) return null;
                return (
                  <li key={item.id} className="mb-2">
                    <div className="flex items-center justify-between">
                      <span>
                        {meat.name} x {item.quantity}
                      </span>
                      <div>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(item.id, parseInt(e.target.value))
                          }
                          className="w-20 text-center"
                        />
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                          className="ml-2"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="mt-4">
              <strong>Total: ${calculateTotal()}</strong>
            </div>
          </>
        )}

        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Delivery Details</h3>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <Label htmlFor="address">Address</Label>
              <Input
                type="text"
                id="address"
                value={deliveryDetails.address}
                onChange={(e) =>
                  setDeliveryDetails({ ...deliveryDetails, address: e.target.value })
                }
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="contact">Contact</Label>
              <Input
                type="text"
                id="contact"
                value={deliveryDetails.contact}
                onChange={(e) =>
                  setDeliveryDetails({ ...deliveryDetails, contact: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        <Button className="mt-4 w-full" onClick={handleSubmit}>
          Confirm Order
        </Button>
      </CardContent>
    </Card>
  );
};

export default OrderCart;
