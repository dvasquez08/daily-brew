import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ArrowRight, Coffee, Zap, Utensils } from 'lucide-react';
import { menuItems } from '@/lib/data'; // For popular items example

export default function HomePage() {
  const popularItems = menuItems.slice(0, 3); // Example: show first 3 items as popular

  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="relative text-center h-[80vh] flex flex-col justify-center items-center rounded-xl overflow-hidden shadow-2xl">
        <Image
          src="/exterior.jpg"
          alt="Exterior view of The Daily Brew cafe"
          fill
          priority
          className="object-cover z-0"
        />
        <div className="absolute inset-0 bg-black/10 z-10"></div> {/* Overlay */}
        <div className="relative z-20 p-4 sm:p-8 space-y-4 sm:space-y-6"> {/* Adjusted padding and space for small screens */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-headline font-bold text-white leading-tight"> {/* Smaller text on mobile, scales up */}
            Welcome to <span className="text-primary">The Daily Brew</span>
          </h1>
          <p className="text-base sm:text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto px-2"> {/* Smaller text on mobile, scales up, added horizontal padding for small screens */}
            Your perfect escape for aromatic coffees, refreshing smoothies, and delightful bites in a cozy atmosphere.
          </p>
          <Button size="sm" className="bg-accent hover:bg-accent/80 text-accent-foreground text-base px-6 py-4 sm:text-lg sm:px-8 sm:py-6 shadow-md transition-transform hover:scale-105"> {/* Smaller button on mobile, scales up */}
            <Link href="/menu">
              Explore Our Menu <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" /> {/* Smaller icon on mobile */}
            </Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="text-center">
        <h2 className="text-3xl md:text-4xl font-headline font-semibold mb-12">What We Offer</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="items-center">
              <Coffee className="h-12 w-12 text-primary mb-2" />
              <CardTitle className="font-headline">Artisan Coffee</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Expertly brewed coffees from the finest beans. From classic lattes to bold espressos.</p>
            </CardContent>
          </Card>
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="items-center">
              <Zap className="h-12 w-12 text-primary mb-2" /> {/* Using Zap for smoothies */}
              <CardTitle className="font-headline">Fresh Smoothies</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Vibrant smoothies packed with fresh fruits and wholesome ingredients. Try our AI suggestions!</p>
            </CardContent>
          </Card>
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="items-center">
              <Utensils className="h-12 w-12 text-primary mb-2" />
              <CardTitle className="font-headline">Delicious Food</CardTitle>
            </CardHeader>
            <CardContent>
              <p>A curated menu of tasty treats, from hearty breakfasts to light lunches.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Popular Items Section */}
      <section>
        <h2 className="text-3xl md:text-4xl font-headline font-semibold text-center mb-12">Popular Picks</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {popularItems.map(item => (
            <Card key={item.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="aspect-[3/2] relative w-full">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                  data-ai-hint={item.dataAiHint || item.category.toLowerCase()}
                />
              </div>
              <CardContent className="p-4">
                <CardTitle className="font-headline text-xl mb-1">{item.name}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground truncate">{item.description}</CardDescription>
                <p className="text-lg font-semibold text-primary mt-2">${item.price.toFixed(2)}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button asChild className="w-full bg-primary hover:bg-primary/90">
                  <Link href={`/menu#${item.category.toLowerCase()}`}>View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button variant="outline" asChild>
            <Link href="/menu">See Full Menu <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>

    </div>
  );
}