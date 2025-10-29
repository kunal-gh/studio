import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { HeroScroll } from '@/components/home/hero-scroll';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { placeHolderImages } from '@/lib/placeholder-images';
import { PortfolioGrid } from '@/components/portfolio/portfolio-grid';

export default function Home() {
  const scrollImages = placeHolderImages.filter(img => img.imageHint.includes('wedding'));
  const featuredPortraits = placeHolderImages.filter(p => p.id.startsWith("portrait")).slice(0, 3);


  return (
    <>
      <HeroScroll images={scrollImages.map(img => img.imageUrl)} />
      <div className="relative z-10 bg-background">
        <section className="container mx-auto px-4 text-center">
           <h1 className="font-headline text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tighter">
            Timeless Photography
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
            Welcome to the world as seen through my lens. I am Hardik, a photographer passionate about freezing time and telling stories through portraits, events, fashion, and the raw energy of the streets.
          </p>
          <Button asChild size="lg" variant="outline" className="mt-8">
            <Link href="/portfolio">
              Explore My Work <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </section>

        <section>
            <PortfolioGrid title="Featured Work" images={featuredPortraits} layout="A" />
        </section>
      </div>
    </>
  );
}
