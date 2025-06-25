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
      <section className="relative text-center h-[60vh] flex flex-col justify-center items-center rounded-xl overflow-hidden shadow-2xl">
        <Image 
          src="/exterior.jpg" 
          alt="Exterior view of The Daily Brew cafe" 
          fill
          priority
          className="object-cover z-0"
        />
        <div className="absolute inset-0 bg-black/50 z-10"></div> {/* Overlay */}
        <div className="relative z-20 p-8 space-y-6">
          <h1 className="text-5xl md:text-7xl font-headline font-bold text-white leading-tight">
            Welcome to <span className="text-primary">The Daily Brew</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto">
            Your perfect escape for aromatic coffees, refreshing smoothies, and delightful bites in a cozy atmosphere.
          </p>
          <Button size="lg" asChild className="bg-accent hover:bg-accent/80 text-accent-foreground text-lg px-8 py-6 shadow-md transition-transform hover:scale-105">
            <Link href="/menu">
              Explore Our Menu <ArrowRight className="ml-2 h-5 w-5" />
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

      {/* AI Smoothie Teaser */}
      <section className="bg-secondary/50 p-8 md:p-12 rounded-xl shadow-lg">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-headline font-semibold mb-4">Can't Decide on a Smoothie?</h2>
            <p className="text-lg text-secondary-foreground mb-6">
              Let our AI craft a personalized smoothie suggestion based on your favorite flavors and dietary needs. It's fun, easy, and delicious!
            </p>
            <Button size="lg" asChild className="bg-accent hover:bg-accent/80 text-accent-foreground shadow-md transition-transform hover:scale-105">
              <Link href="/smoothie-ai">
                Try AI Smoothie Suggester <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
          <div className="md:w-1/2 flex justify-center">
             <Image 
                src="https://placehold.co/400x300.png" 
                alt="Colorful smoothie ingredients"
                width={400}
                height={300}
                className="rounded-lg shadow-md"
                data-ai-hint="smoothie ingredients"
             />
          </div>
        </div>
      </section>
    </div>
  );
}
