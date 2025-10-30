
import { placeHolderImages } from '@/lib/placeholder-images';
import { PortfolioGrid } from '@/components/portfolio/portfolio-grid';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const categories = ["Weddings", "Portraits", "Events", "AI Generated", "Concerts", "Street", "Fashion"];

const categoryDescriptions: Record<string, string> = {
    weddings: "Capturing the love, joy, and candid moments that make your wedding day unforgettable. From the grand ceremony to the intimate details, we tell your unique love story.",
    portraits: "Whether for professional headshots, family photos, or creative concepts, our portrait sessions are tailored to capture your essence in a relaxed and artful way.",
    events: "From corporate functions and conferences to private parties and celebrations, we document the energy and key moments of any event with professionalism and a keen eye.",
    fashion: "Collaborating with designers and brands to create striking lookbooks, editorials, and campaign imagery that brings your collection to life with style and creativity.",
    concerts: "Freezing the electrifying energy of live music. We capture artists in their element and the vibrant atmosphere of the crowd, from small gigs to large festivals.",
    street: "Finding beauty and narrative in the everyday. Our street photography captures the candid, fleeting moments of life in the city with an authentic, documentary style.",
    "ai-generated": "Exploring the frontiers of creativity with AI-generated imagery. A showcase of art that blends technology and imagination.",
};

export async function generateStaticParams() {
    return categories.map((category) => ({
      slug: category.toLowerCase().replace(' ', '-'),
    }));
}

export default function PortfolioCategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const categoryTitle = categories.find(c => c.toLowerCase().replace(' ', '-') === slug) || "Portfolio";

  const images = placeHolderImages.filter(p => {
    const categoryKey = categoryTitle.toLowerCase().replace(' ', '-');
    
    // Handle special cases for matching image IDs
    if (categoryKey === 'weddings') {
        return p.id.startsWith('wedding');
    }
    if (categoryKey === 'ai-generated') {
        return p.id.startsWith('ai');
    }

    const singularKey = categoryKey.endsWith('s') ? categoryKey.slice(0, -1) : categoryKey;
    return p.id.startsWith(singularKey);
  });

  return (
    <div className="py-20 md:py-28 lg:py-32">
        <div className="container mx-auto px-4">
            <div className="mb-16 text-center">
                <h1 className="font-headline text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">{categoryTitle}</h1>
                <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground">
                    {categoryDescriptions[slug] || "A collection of our finest work."}
                </p>
            </div>
            
            <PortfolioGrid title="" images={images} layout="B" />

            <div className="mt-24 text-center">
                <Button asChild variant="outline" size="lg">
                    <Link href="/#portfolio">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to All Portfolios
                    </Link>
                </Button>
            </div>
        </div>
    </div>
  );
}
