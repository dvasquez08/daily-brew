'use client';

import type { CartItem, MenuItem, SelectedCustomization } from '@/lib/types';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: MenuItem, quantity: number, customizations?: SelectedCustomization[]) => void;
  removeFromCart: (itemId: string, customizationSignature?: string) => void;
  updateQuantity: (itemId: string, quantity: number, customizationSignature?: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getTotalItems: () => number;
  getItemSubtotal: (item: CartItem) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const createCustomizationSignature = (customizations?: SelectedCustomization[]): string => {
  if (!customizations || customizations.length === 0) return 'default';
  return customizations
    .map(c => `${c.optionId}:${c.selectedValue}`)
    .sort()
    .join('|');
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const localData = localStorage.getItem('dailyBrewCart');
      return localData ? JSON.parse(localData) : [];
    }
    return [];
  });
  const { toast } = useToast();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('dailyBrewCart', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const addToCart = (item: MenuItem, quantity: number, customizations?: SelectedCustomization[]) => {
    setCartItems(prevItems => {
      const signature = createCustomizationSignature(customizations);
      const existingItemIndex = prevItems.findIndex(
        ci => ci.id === item.id && createCustomizationSignature(ci.customizations) === signature
      );

      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        return [...prevItems, { ...item, quantity, customizations }];
      }
    });
    toast({
      title: `${item.name} added to cart!`,
      description: customizations && customizations.length > 0 
        ? `Customizations: ${customizations.map(c => c.selectedName).join(', ')}` 
        : undefined,
      variant: "default",
    });
  };

  const removeFromCart = (itemId: string, customizationSignature?: string) => {
    setCartItems(prevItems =>
      prevItems.filter(item => !(item.id === itemId && createCustomizationSignature(item.customizations) === (customizationSignature || 'default')))
    );
    const removedItem = cartItems.find(item => item.id === itemId && createCustomizationSignature(item.customizations) === (customizationSignature || 'default'));
    if (removedItem) {
      toast({
        title: `${removedItem.name} removed from cart.`,
        variant: "default",
      });
    }
  };

  const updateQuantity = (itemId: string, quantity: number, customizationSignature?: string) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId && createCustomizationSignature(item.customizations) === (customizationSignature || 'default')
          ? { ...item, quantity: Math.max(0, quantity) } // Ensure quantity doesn't go below 0
          : item
      ).filter(item => item.quantity > 0) // Remove item if quantity is 0
    );
  };

  const clearCart = () => {
    setCartItems([]);
    toast({
      title: "Cart cleared!",
      variant: "default",
    });
  };

  const getItemSubtotal = (item: CartItem): number => {
    let customizedPrice = item.price;
    if (item.customizations) {
      customizedPrice += item.customizations.reduce((acc, cust) => acc + (cust.priceChange || 0), 0);
    }
    return customizedPrice * item.quantity;
  };
  
  const getCartTotal = (): number => {
    return cartItems.reduce((total, item) => total + getItemSubtotal(item), 0);
  };

  const getTotalItems = (): number => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };


  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal, getTotalItems, getItemSubtotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export { createCustomizationSignature };
