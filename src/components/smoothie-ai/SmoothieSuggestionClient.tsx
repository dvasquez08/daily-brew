'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getSmoothieSuggestion, type SmoothieSuggestionInput, type SmoothieSuggestionOutput } from '@/ai/flows/smoothie-suggestion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles } from 'lucide-react';

const smoothieSuggestionFormSchema = z.object({
  ingredients: z.string().min(3, { message: "Please list at least one ingredient you like." }),
  dietaryRestrictions: z.string().optional(),
});

type SmoothieSuggestionFormValues = z.infer<typeof smoothieSuggestionFormSchema>;

export default function SmoothieSuggestionClient() {
  const [suggestion, setSuggestion] = useState<SmoothieSuggestionOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<SmoothieSuggestionFormValues>({
    resolver: zodResolver(smoothieSuggestionFormSchema),
    defaultValues: {
      ingredients: '',
      dietaryRestrictions: '',
    },
  });

  const onSubmit: SubmitHandler<SmoothieSuggestionFormValues> = async (data) => {
    setIsLoading(true);
    setSuggestion(null);
    try {
      const inputData: SmoothieSuggestionInput = {
        ingredients: data.ingredients,
        dietaryRestrictions: data.dietaryRestrictions || 'None',
      };
      const result = await getSmoothieSuggestion(inputData);
      setSuggestion(result);
    } catch (error) {
      console.error("Error getting smoothie suggestion:", error);
      toast({
        title: "Error",
        description: "Could not fetch smoothie suggestion. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center">
            <Sparkles className="h-6 w-6 mr-2 text-accent" />
            Discover Your Perfect Smoothie
          </CardTitle>
          <CardDescription>
            Tell us what you like, and our AI will craft a unique smoothie recipe just for you!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="ingredients"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ingredients You Love</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., banana, spinach, peanut butter" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter a comma-separated list of ingredients.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dietaryRestrictions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dietary Restrictions (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., vegan, gluten-free, dairy-free" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter a comma-separated list of restrictions.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Brewing Suggestion...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Get My Smoothie!
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {suggestion && (
        <Card className="shadow-lg animate-in fade-in-50 duration-500">
          <CardHeader>
            <CardTitle className="font-headline text-2xl text-primary">{suggestion.smoothieName}</CardTitle>
            <CardDescription>{suggestion.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-lg mb-1">Ingredients:</h4>
              <ul className="list-disc list-inside pl-4 space-y-1">
                {suggestion.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-1">Instructions:</h4>
              <p className="whitespace-pre-line">{suggestion.instructions}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
