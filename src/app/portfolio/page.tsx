import { PortfolioGrid } from "@/components/portfolio/portfolio-grid";
import { placeHolderImages } from "@/lib/placeholder-images";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata = {
  title: "Portfolio - Through Hardik's Eye",
  description: "Explore a diverse collection of photography spanning weddings, portraits, events, fashion, concerts, and street life.",
};

export default function PortfolioPage() {
  const categories = ["Weddings", "Portraits", "Events", "Fashion", "Concerts", "Street"];
  
  const imagesByCategory = categories.reduce((acc, category) => {
    const categoryKey = category.toLowerCase().replace(' ', '');
    acc[category] = placeHolderImages.filter(p => p.id.startsWith(categoryKey.slice(0, -1)));
    return acc;
  }, {} as Record<string, typeof placeHolderImages>);


  return (
    <div className="bg-background">
      <section className="border-b">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">Our Work</h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            A curated selection of moments captured with passion and a unique perspective. Explore the stories told in each frame.
          </p>
        </div>
      </section>

      <div className="py-16 md:py-24 lg:py-28">
        <Tabs defaultValue="Weddings" className="w-full">
          <div className="container mx-auto px-4 flex justify-center">
            <TabsList>
              {categories.map((category) => (
                <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
              ))}
            </TabsList>
          </div>
          {categories.map((category, index) => (
            <TabsContent key={category} value={category}>
              <div className="pt-12">
                 <PortfolioGrid title="" images={imagesByCategory[category]} layout={index % 2 === 0 ? 'A' : 'B'} />
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
