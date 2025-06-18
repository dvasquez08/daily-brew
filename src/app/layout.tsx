import type { Metadata } from 'next';
import Link from 'next/link';
import { ShoppingCart, ListOrdered, Sparkles, History, Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';

export const metadata: Metadata = {
  title: 'The Daily Brew',
  description: 'Your favorite neighborhood cafe for coffee, smoothies, and delicious food.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen">
        <CartProvider>
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
          <Footer />
        </CartProvider>
        <Toaster />
      </body>
    </html>
  );
}
