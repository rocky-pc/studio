import MeatCatalog from '@/components/MeatCatalog';
import OrderCart from '@/components/OrderCart';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Local Meats Express</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <MeatCatalog />
        </div>
        <div>
          <OrderCart />
        </div>
      </div>
    </div>
  );
}
