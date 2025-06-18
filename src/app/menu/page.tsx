import { menuItems } from '@/lib/data';
import type { MenuItem } from '@/lib/types';
import MenuItemCard from '@/components/menu/MenuItemCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Utensils, GlassWater, Coffee as CoffeeIcon } from 'lucide-react'; // Renamed Coffee to CoffeeIcon to avoid conflict

const groupItemsByCategory = (items: MenuItem[]) => {
  return items.reduce((acc, item) => {
    const category = item.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<MenuItem['category'], MenuItem[]>);
};

const categoryIcons: Record<MenuItem['category'], React.ReactNode> = {
  'Food': <Utensils className="mr-2 h-5 w-5" />,
  'Smoothies': <GlassWater className="mr-2 h-5 w-5" />,
  'Coffee': <CoffeeIcon className="mr-2 h-5 w-5" />,
  'Other Drinks': <GlassWater className="mr-2 h-5 w-5" />, // Generic icon for other drinks
};


export default function MenuPage() {
  const categorizedItems = groupItemsByCategory(menuItems);
  const categories = Object.keys(categorizedItems) as MenuItem['category'][];

  // Determine a default tab, e.g., the first category or 'Food' if it exists
  const defaultTab = categories.includes('Food') ? 'Food' : categories[0] || '';

  return (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-headline font-semibold mb-4 text-primary">Our Menu</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore our wide range of delicious food, refreshing smoothies, and expertly brewed coffee. 
          Customize your order to make it just right for you!
        </p>
      </section>

      <Tabs defaultValue={defaultTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mb-8">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category} className="text-sm sm:text-base py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              {categoryIcons[category]}
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category} value={category} id={category.toLowerCase()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categorizedItems[category].map((item) => (
                <MenuItemCard key={item.id} item={item} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
