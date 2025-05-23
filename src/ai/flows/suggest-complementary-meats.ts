// This is an autogenerated file from Firebase Studio.

'use server';
/**
 * @fileOverview Suggests complementary meats based on items in the cart.
 *
 * - suggestComplementaryMeats - A function that handles the suggestion of complementary meats.
 * - SuggestComplementaryMeatsInput - The input type for the suggestComplementaryMeats function.
 * - SuggestComplementaryMeatsOutput - The return type for the suggestComplementaryMeats function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const SuggestComplementaryMeatsInputSchema = z.object({
  cartItems: z
    .array(z.string())
    .describe('The items currently in the user\'s cart.'),
});
export type SuggestComplementaryMeatsInput = z.infer<
  typeof SuggestComplementaryMeatsInputSchema
>;

const SuggestComplementaryMeatsOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe('A list of suggested complementary meats.'),
});
export type SuggestComplementaryMeatsOutput = z.infer<
  typeof SuggestComplementaryMeatsOutputSchema
>;

export async function suggestComplementaryMeats(
  input: SuggestComplementaryMeatsInput
): Promise<SuggestComplementaryMeatsOutput> {
  return suggestComplementaryMeatsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestComplementaryMeatsPrompt',
  input: {
    schema: z.object({
      cartItems: z
        .array(z.string())
        .describe('The items currently in the user\'s cart.'),
    }),
  },
  output: {
    schema: z.object({
      suggestions: z
        .array(z.string())
        .describe('A list of suggested complementary meats.'),
    }),
  },
  prompt: `You are a culinary expert specializing in meat pairings.

  Based on the items currently in the user\'s cart, suggest complementary meats that would enhance their meal.
  Consider flavor profiles, cooking methods, and cultural cuisines when making your suggestions.

  Cart Items: {{{cartItems}}}

  Suggestions:`,
});

const suggestComplementaryMeatsFlow = ai.defineFlow<
  typeof SuggestComplementaryMeatsInputSchema,
  typeof SuggestComplementaryMeatsOutputSchema
>(
  {
    name: 'suggestComplementaryMeatsFlow',
    inputSchema: SuggestComplementaryMeatsInputSchema,
    outputSchema: SuggestComplementaryMeatsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
