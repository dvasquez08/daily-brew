'use client'; // Required for localStorage access for mock data

import OrderCard from '@/components/order-history/OrderCard';
import type { Order } from '@/lib/types';
import { orderHistory as defaultOrderHistory } from '@/lib/data'; // Default mock data
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { History } from 'lucide-react';

export default function OrderHistoryPage() {
  const [userOrderHistory, setUserOrderHistory] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching order history. In a real app, this would be an API call.
    // For this mock, we'll try to get from localStorage (where CheckoutForm saves it)
    // and fall back to default mock data.
    const storedOrdersRaw = localStorage.getItem('dailyBrewOrderHistory');
    let ordersToDisplay: Order[] = [];
    if (storedOrdersRaw) {
        try {
            const storedOrders = JSON.parse(storedOrdersRaw) as Order[];
            // Basic validation or filtering can be added here
            ordersToDisplay = storedOrders;
        } catch (e) {
            console.error("Failed to parse order history from localStorage", e);
            ordersToDisplay = defaultOrderHistory; // Fallback to default if parsing fails
        }
    } else {
        ordersToDisplay = defaultOrderHistory; // Fallback if nothing in localStorage
    }
    
    // Sort orders by date, most recent first
    ordersToDisplay.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setUserOrderHistory(ordersToDisplay);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <History className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-xl text-muted-foreground">Loading your order history...</p>
      </div>
    );
  }

  return (
    <div className="py-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-semibold text-primary">Your Order History</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Review your past orders and easily reorder your favorites.
        </p>
      </section>

      {userOrderHistory.length === 0 ? (
        <div className="text-center py-10">
          <History className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-headline mb-4">No Past Orders Found</h2>
          <p className="text-muted-foreground mb-6">Looks like you haven't placed any orders yet.</p>
          <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/menu">Start Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto space-y-6">
          {userOrderHistory.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
