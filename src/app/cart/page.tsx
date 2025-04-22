import OrderCart from '@/components/OrderCart';

export default function CartPage() {
  return (
    <div className="container mx-auto p-4 animate-in fade-in duration-75">
      <h1 className="text-2xl font-bold mb-4">Order Cart</h1>
      <OrderCart />
    </div>
  );
}
