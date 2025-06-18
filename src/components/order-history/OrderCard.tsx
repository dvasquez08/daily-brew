'use client';

import type { Order, CartItem } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { History, ShoppingCart } from 'lucide-react';

interface OrderCardProps {
  order: Order;
}

export default function OrderCard({ order }: OrderCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleReorder = () => {
    order.items.forEach(item => {
      // Find the original menu item to ensure we have all base properties
      // This is a simplified approach; a real app might fetch current item details
      const baseItem = { 
        id: item.id, 
        name: item.name, 
        description: item.description, 
        price: item.price, 
        category: item.category, 
        imageUrl: item.imageUrl,
        customizableOptions: item.customizableOptions,
        dataAiHint: item.dataAiHint,
      };
      addToCart(baseItem, item.quantity, item.customizations);
    });
    toast({
      title: "Items Added to Cart",
      description: `All items from order #${order.id.slice(-6)} have been added to your cart.`,
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <Card className="shadow-lg mb-6">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="font-headline text-xl">Order #{order.id.slice(-6)}</CardTitle>
            <CardDescription>Placed on: {formatDate(order.date)}</CardDescription>
          </div>
          <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'} 
                 className={order.status === 'Delivered' ? 'bg-green-600 text-white' : ''}>
            {order.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 mb-4">
          {order.items.map((item, index) => (
            <li key={`${item.id}-${index}`} className="text-sm flex justify-between">
              <div>
                <span>{item.name} (x{item.quantity})</span>
                {item.customizations && item.customizations.length > 0 && (
                  <span className="text-xs text-muted-foreground block pl-2">
                    Custom: {item.customizations.map(c => c.selectedName).join(', ')}
                  </span>
                )}
              </div>
              <span>${(item.price * item.quantity + (item.customizations?.reduce((acc, curr) => acc + (curr.priceChange || 0),0) || 0) * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="border-t pt-2 text-md font-semibold flex justify-between">
          <span>Total:</span>
          <span>${order.totalAmount.toFixed(2)}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleReorder} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
          <ShoppingCart className="mr-2 h-4 w-4" /> Reorder
        </Button>
      </CardFooter>
    </Card>
  );
}
