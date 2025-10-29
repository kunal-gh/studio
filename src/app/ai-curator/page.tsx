import { CuratorForm } from "@/components/ai-curator/curator-form";

export const metadata = {
  title: "AI Portfolio Curator - Through Hardik's Eye",
  description: "Use an AI-powered tool to select the best photos for your portfolio based on aesthetics, feedback, and trends.",
};

export default function AiCuratorPage() {
  return (
    <>
      <section className="border-b">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">AI Portfolio Curator</h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            Leverage the power of AI to analyze and select the most impactful photos for your portfolio. This tool considers aesthetics, customer feedback, and seasonal trends to help you put your best work forward.
          </p>
        </div>
      </section>

      <section>
        <div className="container mx-auto px-4">
          <CuratorForm />
        </div>
      </section>
    </>
  );
}
