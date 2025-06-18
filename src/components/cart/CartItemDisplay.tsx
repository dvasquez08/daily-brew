'use client';

import Image from 'next/image';
import type { CartItem } from '@/lib/types';
import { useCart, createCustomizationSignature } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Plus, Minus } from 'lucide-react';

interface CartItemDisplayProps {
  item: CartItem;
}

export default function CartItemDisplay({ item }: CartItemDisplayProps) {
  const { removeFromCart, updateQuantity, getItemSubtotal } = useCart();
  const signature = createCustomizationSignature(item.customizations);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(item.id, signature);
    } else {
      updateQuantity(item.id, newQuantity, signature);
    }
  };

  return (
    <div className="flex items-start space-x-4 py-4 border-b border-border last:border-b-0">
      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
        <Image
          src={item.imageUrl}
          alt={item.name}
          fill
          sizes="80px"
          className="object-cover"
          data-ai-hint={item.dataAiHint || item.category.toLowerCase()}
        />
      </div>
      <div className="flex-grow">
        <h3 className="text-md font-semibold">{item.name}</h3>
        {item.customizations && item.customizations.length > 0 && (
          <div className="text-xs text-muted-foreground mt-1">
            {item.customizations.map(cust => (
              <span key={cust.selectedValue} className="block">{cust.optionName}: {cust.selectedName} {cust.priceChange ? `(+$${cust.priceChange.toFixed(2)})` : ''}</span>
            ))}
          </div>
        )}
        <div className="flex items-center space-x-2 mt-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => handleQuantityChange(item.quantity - 1)}
            aria-label="Decrease quantity"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Input
            type="number"
            value={item.quantity}
            onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
            className="h-8 w-12 text-center px-1"
            aria-label="Item quantity"
          />
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => handleQuantityChange(item.quantity + 1)}
            aria-label="Increase quantity"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="text-right">
        <p className="font-semibold">${getItemSubtotal(item).toFixed(2)}</p>
        <Button
          variant="ghost"
          size="icon"
          className="mt-1 text-muted-foreground hover:text-destructive h-8 w-8"
          onClick={() => removeFromCart(item.id, signature)}
          aria-label="Remove item"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
