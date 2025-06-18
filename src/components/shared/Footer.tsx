import Link from 'next/link';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground py-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        <div>
          <h3 className="text-lg font-headline mb-2">Contact Us</h3>
          <ul className="space-y-1">
            <li className="flex items-center justify-center md:justify-start">
              <MapPin className="h-5 w-5 mr-2 text-accent" /> 123 Cafe Lane, Brewville, CA 90210
            </li>
            <li className="flex items-center justify-center md:justify-start">
              <Phone className="h-5 w-5 mr-2 text-accent" /> (555) 123-4567
            </li>
            <li className="flex items-center justify-center md:justify-start">
              <Mail className="h-5 w-5 mr-2 text-accent" /> info@dailybrew.com
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-headline mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li><Link href="/menu" className="hover:text-accent">Menu</Link></li>
            <li><Link href="/smoothie-ai" className="hover:text-accent">AI Smoothie</Link></li>
            <li><Link href="/order-history" className="hover:text-accent">Order History</Link></li>
            <li><Link href="/contact" className="hover:text-accent">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-headline mb-2">Follow Us</h3>
          <div className="flex space-x-4 justify-center md:justify-start">
            <Link href="#" aria-label="Instagram" className="hover:text-accent"><Instagram className="h-6 w-6" /></Link>
            <Link href="#" aria-label="Facebook" className="hover:text-accent"><Facebook className="h-6 w-6" /></Link>
            <Link href="#" aria-label="Twitter" className="hover:text-accent"><Twitter className="h-6 w-6" /></Link>
          </div>
        </div>
      </div>
      <div className="text-center mt-8 pt-4 border-t border-border">
        <p>&copy; {currentYear} The Daily Brew. All rights reserved.</p>
      </div>
    </footer>
  );
}
