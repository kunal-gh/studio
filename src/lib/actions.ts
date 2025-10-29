"use server";

import { z } from "zod";
import { aiPortfolioCurator, type AIPortfolioCuratorInput } from "@/ai/flows/ai-portfolio-curator";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export async function submitContactForm(formData: FormData) {
  const data = Object.fromEntries(formData);
  const parsed = contactSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  // In a real application, you would send an email or save to a database here.
  console.log("Contact form submitted:", parsed.data);

  return {
    success: true,
    message: "Thank you for your message! I'll get back to you soon.",
  };
}

export async function getCuratedPortfolio(input: AIPortfolioCuratorInput) {
    try {
        const result = await aiPortfolioCurator(input);
        return { success: true, data: result };
    } catch (error) {
        console.error("AI Portfolio Curation Error:", error);
        return { success: false, error: "Failed to curate portfolio. Please try again." };
    }
}
