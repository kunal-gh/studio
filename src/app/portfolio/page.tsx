import { PortfolioGrid } from "@/components/portfolio/portfolio-grid";
import placeholderImages from "@/lib/placeholder-images.json";

export const metadata = {
  title: "Portfolio - Through Hardik's Eye",
  description: "Explore a diverse collection of photography spanning weddings, portraits, events, fashion, concerts, and street life.",
};

export default function PortfolioPage() {
  const weddings = placeholderImages.placeholderImages.filter(p => p.id.startsWith("wedding"));
  const portraits = placeholderImages.placeholderImages.filter(p => p.id.startsWith("portrait"));
  const events = placeholderImages.placeholderImages.filter(p => p.id.startsWith("event"));
  const fashion = placeholderImages.placeholderImages.filter(p => p.id.startsWith("fashion"));
  const concerts = placeholderImages.placeholderImages.filter(p => p.id.startsWith("concert"));
  const street = placeholderImages.placeholderImages.filter(p => p.id.startsWith("street"));

  return (
    <div className="bg-background">
      <section className="border-b">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">My Work</h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            A curated selection of moments captured with passion and a unique perspective. Explore the stories told in each frame.
          </p>
        </div>
      </section>

      <div className="space-y-16 md:space-y-24 lg:space-y-32 py-16 md:py-24 lg:py-32">
        <PortfolioGrid title="Weddings" images={weddings} layout="A" />
        <PortfolioGrid title="Portraits" images={portraits} layout="B" />
        <PortfolioGrid title="Public Events" images={events} layout="C" />
        <PortfolioGrid title="Fashion" images={fashion} layout="B" />
        <PortfolioGrid title="Concerts" images={concerts} layout="A" />
        <PortfolioGrid title="Street Photography" images={street} layout="C" />
      </div>
    </div>
  );
}
