
'use server';

import {ai} from '@/ai/genkit';
import {
  addDocumentNonBlocking,
  Photograph,
  PhotographSchema,
} from '@/firebase';
import {collection, getFirestore} from 'firebase/firestore';
import {z} from 'zod';

const AddToPortfolioInputSchema = z.object({
  prompt: z
    .string()
    .describe('The text prompt used to generate the images.'),
});
export type AddToPortfolioInput = z.infer<typeof AddToPortfolioInputSchema>;

export async function addToPortfolio(
  input: AddToPortfolioInput
): Promise<void> {
  return addToPortfolioFlow(input);
}

const prompt = ai.definePrompt({
  name: 'addToPortfolioPrompt',
  input: {schema: AddToPortfolioInputSchema},
  output: {schema: z.array(PhotographSchema)},
  prompt: `You are a portfolio curator. Given a prompt, you will generate a list of images that match the prompt.
Prompt: {{{prompt}}}`,
});

const addToPortfolioFlow = ai.defineFlow(
  {
    name: 'addToPortfolioFlow',
    inputSchema: AddToPortfolioInputSchema,
    outputSchema: z.void(),
  },
  async (input: AddToPortfolioInput) => {
    const photographs = await prompt(input);
    const db = getFirestore();
    const batch: Promise<any>[] = [];
    photographs.forEach(photograph => {
      const p = addDocumentNonBlocking(
        collection(db, 'photographs'),
        photograph
      );
      batch.push(p);
    });
    await Promise.all(batch);
  }
);

    
