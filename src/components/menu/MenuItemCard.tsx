'use client';

import Image from 'next/image';
import type { MenuItem, SelectedCustomization } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';

interface MenuItemCardProps {
  item: MenuItem;
}

export default function MenuItemCard({ item }: MenuItemCardProps) {
  const { addToCart } = useCart();
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [selectedCustomizations, setSelectedCustomizations] = useState<SelectedCustomization[]>([]);

  const handleCustomizationChange = (optionId: string, optionName: string, valueId: string, valueName: string, priceChange?: number, allowsMultiple?: boolean) => {
    setSelectedCustomizations(prev => {
      const existingOptionIndex = prev.findIndex(c => c.optionId === optionId);
      if (allowsMultiple) {
        // For checkboxes (multiple selections allowed)
        if (prev.find(c => c.optionId === optionId && c.selectedValue === valueId)) {
          // If already selected, remove it
          return prev.filter(c => !(c.optionId === optionId && c.selectedValue === valueId));
        } else {
          // Add new selection
          return [...prev, { optionId, optionName, selectedValue: valueId, selectedName: valueName, priceChange }];
        }
      } else {
        // For radio buttons (single selection)
        const newCustomizations = prev.filter(c => c.optionId !== optionId);
        return [...newCustomizations, { optionId, optionName, selectedValue: valueId, selectedName: valueName, priceChange }];
      }
    });
  };

  const calculateCustomizedPrice = () => {
    let currentPrice = item.price;
    selectedCustomizations.forEach(customization => {
      currentPrice += customization.priceChange || 0;
    });
    return currentPrice;
  };

  const handleAddToCart = () => {
    addToCart(item, 1, selectedCustomizations);
    setIsCustomizeOpen(false); // Close dialog after adding to cart
    setSelectedCustomizations([]); // Reset customizations for next time
  };
  
  const handleDirectAddToCart = () => {
    addToCart(item, 1, []); // Add with no customizations
  };


  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg">
      <CardHeader className="p-0">
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
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-xl font-headline mb-1">{item.name}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground mb-2">{item.description}</CardDescription>
        <p className="text-lg font-semibold text-primary">
          ${(item.customizableOptions && item.customizableOptions.length > 0 ? calculateCustomizedPrice() : item.price).toFixed(2)}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        {item.customizableOptions && item.customizableOptions.length > 0 ? (
          <Dialog open={isCustomizeOpen} onOpenChange={setIsCustomizeOpen}>
            <DialogTrigger asChild>
              <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">Customize & Add</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="font-headline">Customize {item.name}</DialogTitle>
                <DialogDescription>
                  Make selections to customize your item. Current price: ${calculateCustomizedPrice().toFixed(2)}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
                {item.customizableOptions.map(opt => (
                  <div key={opt.id} className="space-y-2">
                    <Label htmlFor={opt.id} className="font-semibold">{opt.name}</Label>
                    <Separator className="my-1"/>
                    {opt.allowsMultiple ? (
                       opt.options.map(choice => (
                        <div key={choice.id} className="flex items-center space-x-2">
                           <Checkbox
                            id={`${opt.id}-${choice.id}`}
                            checked={selectedCustomizations.some(c => c.optionId === opt.id && c.selectedValue === choice.id)}
                            onCheckedChange={() => handleCustomizationChange(opt.id, opt.name, choice.id, choice.name, choice.priceChange, true)}
                          />
                          <Label htmlFor={`${opt.id}-${choice.id}`} className="font-normal flex-grow">
                            {choice.name} {choice.priceChange ? `(+$${choice.priceChange.toFixed(2)})` : ''}
                          </Label>
                        </div>
                       ))
                    ) : (
                      <RadioGroup 
                        id={opt.id}
                        onValueChange={(value) => {
                          const selectedChoice = opt.options.find(c => c.id === value);
                          if (selectedChoice) {
                            handleCustomizationChange(opt.id, opt.name, selectedChoice.id, selectedChoice.name, selectedChoice.priceChange, false);
                          }
                        }}
                        defaultValue={opt.options.find(op => selectedCustomizations.some(s => s.optionId === opt.id && s.selectedValue === op.id))?.id || opt.options[0]?.id}
                      >
                        {opt.options.map(choice => (
                          <div key={choice.id} className="flex items-center space-x-2">
                            <RadioGroupItem value={choice.id} id={`${opt.id}-${choice.id}`} />
                            <Label htmlFor={`${opt.id}-${choice.id}`} className="font-normal">
                              {choice.name} {choice.priceChange ? `(+$${choice.priceChange.toFixed(2)})` : ''}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    )}
                  </div>
                ))}
              </div>
              <DialogFooter>
                <Button type="button" onClick={handleAddToCart} className="bg-primary hover:bg-primary/90">Add to Cart</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ) : (
          <Button className="w-full bg-primary hover:bg-primary/90" onClick={handleDirectAddToCart}>Add to Cart</Button>
        )}
      </CardFooter>
    </Card>
  );
}
