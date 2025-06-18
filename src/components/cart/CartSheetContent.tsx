'use client';

import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import CartItemDisplay from './CartItemDisplay';
import Link from 'next/link';
import { SheetClose, SheetFooter, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet'; // SheetClose added

export default function CartSheetContent() {
  const { cartItems, getCartTotal, clearCart, getTotalItems } = useCart();
  const totalItems = getTotalItems();
  const cartTotal = getCartTotal();

  return (
    <>
      <SheetHeader>
        <SheetTitle className="font-headline">Your Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})</SheetTitle>
        {cartItems.length === 0 && (
          <SheetDescription className="py-8 text-center">
            Your cart is empty. Start adding some delicious items!
          </SheetDescription>
        )}
      </SheetHeader>
      
      {cartItems.length > 0 && (
        <>
          <ScrollArea className="flex-grow pr-6 -mr-6 mb-4"> {/* Added pr-6 and -mr-6 for scrollbar spacing */}
            <div className="space-y-2">
              {cartItems.map((item, index) => (
                <CartItemDisplay key={`${item.id}-${index}`} item={item} />
              ))}
            </div>
          </ScrollArea>
          <SheetFooter className="mt-auto border-t pt-4">
            <div className="w-full space-y-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Subtotal:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={clearCart} className="flex-1">Clear Cart</Button>
                <SheetClose asChild>
                    <Button asChild className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground">
                        <Link href="/checkout">Checkout</Link>
                    </Button>
                </SheetClose>
              </div>
            </div>
          </SheetFooter>
        </>
      )}
    </>
  );
}
