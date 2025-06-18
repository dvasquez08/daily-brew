// smoothie-suggestion.ts
'use server';
/**
 * @fileOverview Provides smoothie suggestions based on user preferences.
 *
 * - getSmoothieSuggestion - A function that generates smoothie suggestions.
 * - SmoothieSuggestionInput - The input type for the getSmoothieSuggestion function.
 * - SmoothieSuggestionOutput - The return type for the getSmoothieSuggestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmoothieSuggestionInputSchema = z.object({
  ingredients: z
    .string()
    .describe('A comma-separated list of ingredients the user likes.'),
  dietaryRestrictions: z
    .string()
    .describe(
      'A comma-separated list of dietary restrictions the user has (e.g., vegan, gluten-free, dairy-free).'
    ),
});
export type SmoothieSuggestionInput = z.infer<typeof SmoothieSuggestionInputSchema>;

const SmoothieSuggestionOutputSchema = z.object({
  smoothieName: z.string().describe('The suggested smoothie name.'),
  ingredients: z.array(z.string()).describe('A list of ingredients for the smoothie.'),
  instructions: z.string().describe('Instructions on how to make the smoothie.'),
  description: z.string().describe('A short description of the smoothie.'),
});
export type SmoothieSuggestionOutput = z.infer<typeof SmoothieSuggestionOutputSchema>;

export async function getSmoothieSuggestion(input: SmoothieSuggestionInput): Promise<SmoothieSuggestionOutput> {
  return smoothieSuggestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'smoothieSuggestionPrompt',
  input: {schema: SmoothieSuggestionInputSchema},
  output: {schema: SmoothieSuggestionOutputSchema},
  prompt: `You are a smoothie expert. A user will provide you with a list of ingredients that they like, as well as dietary restrictions. Your goal is to suggest a smoothie that they would enjoy. Return the smoothie name, a list of ingredients, instructions on how to make the smoothie, and a short description of the smoothie. 

Ingredients: {{{ingredients}}}
Dietary Restrictions: {{{dietaryRestrictions}}}

Make sure the smoothie adheres to their dietary restrictions. Return the ingredients as a list of strings.
`,
});

const smoothieSuggestionFlow = ai.defineFlow(
  {
    name: 'smoothieSuggestionFlow',
    inputSchema: SmoothieSuggestionInputSchema,
    outputSchema: SmoothieSuggestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
