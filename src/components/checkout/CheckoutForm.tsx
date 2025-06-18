'use client';

import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation'; // For redirecting after order
import { useState } from 'react';
import type { Order } from '@/lib/types';
import { Loader2 } from 'lucide-react';

const checkoutFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  address: z.string().min(5, { message: "Address must be at least 5 characters." }),
  // Basic mock payment details
  cardNumber: z.string().length(16, { message: "Card number must be 16 digits." }).regex(/^\d+$/, "Card number must be digits only."),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: "Expiry date must be in MM/YY format." }),
  cvv: z.string().length(3, { message: "CVV must be 3 digits." }).regex(/^\d+$/, "CVV must be digits only."),
});

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

export default function CheckoutForm() {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { toast } = useToast();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const cartTotal = getCartTotal();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
    },
  });

  // Mock function to "save" order
  const saveOrderToHistory = (order: Order) => {
    // In a real app, this would send data to a backend.
    // For now, we'll simulate by adding to localStorage if needed or just acknowledge.
    console.log("Order placed:", order);
    const existingOrders = JSON.parse(localStorage.getItem('dailyBrewOrderHistory') || '[]');
    localStorage.setItem('dailyBrewOrderHistory', JSON.stringify([order, ...existingOrders]));
  };


  const onSubmit: SubmitHandler<CheckoutFormValues> = async (data) => {
    setIsProcessing(true);
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    const order: Order = {
      id: `order-${Date.now()}`,
      date: new Date().toISOString(),
      items: cartItems,
      totalAmount: cartTotal,
      status: 'Confirmed',
      customerDetails: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
      },
    };

    saveOrderToHistory(order);
    
    toast({
      title: "Order Placed Successfully!",
      description: `Thank you, ${data.name}! Your order #${order.id.slice(-6)} is confirmed.`,
    });
    clearCart();
    setIsProcessing(false);
    router.push('/order-history'); // Redirect to order history or a thank you page
  };

  if (cartItems.length === 0 && !isProcessing) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-headline mb-4">Your cart is empty.</h2>
        <Button asChild>
          <a href="/menu">Go to Menu</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 gap-8">
      <Card className="md:col-span-2 shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Checkout</CardTitle>
          <CardDescription>Please fill in your details to complete the order.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              <FormField control={form.control} name="phone" render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number (Optional)</FormLabel>
                  <FormControl><Input type="tel" placeholder="(555) 123-4567" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="address" render={({ field }) => (
                <FormItem>
                  <FormLabel>Delivery Address</FormLabel>
                  <FormControl><Input placeholder="123 Main St, Anytown, USA" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <h3 className="text-lg font-semibold pt-4 border-t mt-6">Payment Details (Mock)</h3>
              <FormField control={form.control} name="cardNumber" render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Number</FormLabel>
                  <FormControl><Input placeholder="•••• •••• •••• ••••" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <div className="grid md:grid-cols-2 gap-4">
                <FormField control={form.control} name="expiryDate" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expiry Date (MM/YY)</FormLabel>
                    <FormControl><Input placeholder="MM/YY" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="cvv" render={({ field }) => (
                  <FormItem>
                    <FormLabel>CVV</FormLabel>
                    <FormControl><Input placeholder="123" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              
              <Button type="submit" disabled={isProcessing || cartItems.length === 0} className="w-full bg-primary hover:bg-primary/90">
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing Order...
                  </>
                ) : (
                  `Place Order - $${cartTotal.toFixed(2)}`
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <Card className="md:col-span-1 shadow-lg h-fit">
        <CardHeader>
          <CardTitle className="font-headline text-xl">Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {cartItems.map(item => (
            <div key={`${item.id}-${JSON.stringify(item.customizations)}`} className="flex justify-between text-sm">
              <span>{item.name} x {item.quantity}</span>
              <span>${(item.price * item.quantity + (item.customizations?.reduce((acc, curr) => acc + (curr.priceChange || 0), 0) || 0) * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t pt-2 mt-2 flex justify-between font-semibold text-lg">
            <span>Total:</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
