'use server';

/**
 * @fileOverview An AI portfolio curator that selects the best photos for a photographer's portfolio.
 *
 * - aiPortfolioCurator - A function that handles the portfolio curation process.
 * - AIPortfolioCuratorInput - The input type for the aiPortfolioCurator function.
 * - AIPortfolioCuratorOutput - The return type for the aiPortfolioCurator function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIPortfolioCuratorInputSchema = z.object({
  photos: z
    .array(z.string())
    .describe(
      'An array of photo data URIs that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' 
    ),
  customerFeedback: z
    .array(z.string())
    .describe('An array of customer feedback strings.'),
  seasonalTrend: z.string().describe('The current seasonal trend.'),
});
export type AIPortfolioCuratorInput = z.infer<typeof AIPortfolioCuratorInputSchema>;

const AIPortfolioCuratorOutputSchema = z.object({
  selectedPhotos: z
    .array(z.string())
    .describe("An array of photo data URIs that are selected for the portfolio."),
});
export type AIPortfolioCuratorOutput = z.infer<typeof AIPortfolioCuratorOutputSchema>;

export async function aiPortfolioCurator(input: AIPortfolioCuratorInput): Promise<AIPortfolioCuratorOutput> {
  return aiPortfolioCuratorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiPortfolioCuratorPrompt',
  input: {schema: AIPortfolioCuratorInputSchema},
  output: {schema: AIPortfolioCuratorOutputSchema},
  prompt: `You are an AI portfolio curator for a photographer. You will be given a list of photos, customer feedback, and the current seasonal trend. You will select the best photos for the portfolio based on aesthetics, customer sentiment, and seasonal trends.

Photos: {{#each photos}}{{this}}\n{{/each}}

Customer Feedback: {{#each customerFeedback}}{{this}}\n{{/each}}

Seasonal Trend: {{seasonalTrend}}

Based on the above information, select the best photos for the portfolio. Return only the selected photos in the array.
`, 
});

const aiPortfolioCuratorFlow = ai.defineFlow(
  {
    name: 'aiPortfolioCuratorFlow',
    inputSchema: AIPortfolioCuratorInputSchema,
    outputSchema: AIPortfolioCuratorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
