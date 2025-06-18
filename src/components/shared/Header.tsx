'use client';

import Link from 'next/link';
import { ShoppingBag, ListOrdered, Sparkles, History, Menu as MenuIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import CartSheetContent from '@/components/cart/CartSheetContent'; 
import { useCart } from '@/context/CartContext';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

const navLinks = [
  { href: '/menu', label: 'Menu', icon: <ListOrdered className="h-5 w-5" /> },
  { href: '/smoothie-ai', label: 'AI Smoothie', icon: <Sparkles className="h-5 w-5" /> },
  { href: '/order-history', label: 'Order History', icon: <History className="h-5 w-5" /> },
  { href: '/contact', label: 'Contact Us', icon: <Sparkles className="h-5 w-5" /> }, // Placeholder icon
];

export default function Header() {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-headline text-2xl font-bold text-primary">The Daily Brew</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} className="transition-colors hover:text-accent">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="h-6 w-6" />
                {totalItems > 0 && (
                  <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 justify-center rounded-full p-0">
                    {totalItems}
                  </Badge>
                )}
                <span className="sr-only">Open Cart</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px] flex flex-col">
              <CartSheetContent />
            </SheetContent>
          </Sheet>

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[300px]">
              <SheetHeader>
                <SheetTitle>
                    <Link href="/" className="font-headline text-2xl font-bold text-primary" onClick={() => setMobileMenuOpen(false)}>
                        The Daily Brew
                    </Link>
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-8 flex flex-col space-y-4">
                {navLinks.map(link => (
                  <Link 
                    key={link.href} 
                    href={link.href} 
                    className="flex items-center space-x-2 rounded-md p-2 transition-colors hover:bg-accent hover:text-accent-foreground"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
