
'use client';

import { PortfolioGrid } from '@/components/portfolio/portfolio-grid';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import { useEffect } from 'react';
import { seedPhotographs } from '@/lib/seed-db';
import { Skeleton } from '@/components/ui/skeleton';

const categoryDescriptions: Record<string, string> = {
    weddings: "Capturing the love, joy, and candid moments that make your wedding day unforgettable. From the grand ceremony to the intimate details, we tell your unique love story.",
    portraits: "Whether for professional headshots, family photos, or creative concepts, our portrait sessions are tailored to capture your essence in a relaxed and artful way.",
    "live-events": "From corporate functions and high-energy concerts to private parties and celebrations, we document the energy and key moments of any event with professionalism and a keen eye.",
    fashion: "Collaborating with designers and brands to create striking lookbooks, editorials, and campaign imagery that brings your collection to life with style and creativity.",
    street: "Finding beauty and narrative in the everyday. Our street photography captures the candid, fleeting moments of life in the city with an authentic, documentary style.",
    "ai-generated": "Exploring the frontiers of creativity with AI-generated imagery. A showcase of art that blends technology and imagination.",
};

const LoadingSkeleton = () => (
    <div className="container mx-auto px-4">
      <div className="animate-pulse">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4" style={{ gridAutoRows: 'minmax(200px, auto)' }}>
          <div className="col-span-2 row-span-2 rounded-lg bg-muted"></div>
          <div className="col-span-1 rounded-lg bg-muted"></div>
          <div className="col-span-1 rounded-lg bg-muted"></div>
          <div className="col-span-1 rounded-lg bg-muted"></div>
          <div className="col-span-1 rounded-lg bg-muted"></div>
          <div className="col-span-2 rounded-lg bg-muted"></div>
        </div>
      </div>
    </div>
  );


export default function PortfolioCategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const firestore = useFirestore();

  // Seed the database if it's empty
  useEffect(() => {
    if (firestore) {
      seedPhotographs(firestore);
    }
  }, [firestore]);

  const categoryTitle = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  const photographsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'photographs'), where('category', '==', slug));
  }, [firestore, slug]);

  const { data: images, isLoading } = useCollection(photographsQuery);

  return (
    <div className="py-12 md:py-16 bg-background animate-in fade-in-25 duration-300">
        <div className="container mx-auto px-4 relative">
            <div className="sticky top-24 z-10 mb-8">
                <Button asChild variant="outline" size="lg" className="rounded-full w-14 h-14 p-0">
                    <Link href="/#portfolio" aria-label="Back to All Portfolios">
                        <ArrowLeft className="h-6 w-6" />
                    </Link>
                </Button>
            </div>
            <div className="mb-12 text-center">
                <h1 className="font-headline text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">{categoryTitle}</h1>
                <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground">
                    {categoryDescriptions[slug] || "A collection of our finest work."}
                </p>
            </div>
            
            {isLoading && <LoadingSkeleton />}
            {!isLoading && images && images.length > 0 && <PortfolioGrid title="" images={images} />}
            {!isLoading && (!images || images.length === 0) && <p className="text-center text-muted-foreground">This gallery is empty for now. Check back soon!</p>}

        </div>
    </div>
  );
}
