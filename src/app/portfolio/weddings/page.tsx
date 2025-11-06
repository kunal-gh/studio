'use client';

import { PortfolioGrid } from '@/components/portfolio/portfolio-grid';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, where, orderBy } from 'firebase/firestore';

const categoryTitle = "Weddings";
const categoryDescription = "Capturing the love, joy, and candid moments that make your wedding day unforgettable. From the grand ceremony to the intimate details, we tell your unique love story.";

export default function WeddingsPage() {
  const firestore = useFirestore();

  const photographsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'photographs'), where('category', '==', 'weddings'), orderBy('order'));
  }, [firestore]);

  const { data: images, isLoading } = useCollection(photographsQuery);

  return (
    <div className="py-20 md:py-28 lg:py-32 bg-background animate-in fade-in-50 duration-500">
        <div className="container mx-auto px-4">
            <div className="mb-16 text-center">
                <h1 className="font-headline text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">{categoryTitle}</h1>
                <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground">
                    {categoryDescription}
                </p>
            </div>
            
            {isLoading && <p className="text-center text-muted-foreground">Loading gallery...</p>}
            {!isLoading && images && images.length > 0 && <PortfolioGrid title="" images={images} layout="B" />}
            {!isLoading && (!images || images.length === 0) && <p className="text-center text-muted-foreground">This gallery is empty for now. Check back soon!</p>}

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