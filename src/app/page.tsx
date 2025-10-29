
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { placeHolderImages } from '@/lib/placeholder-images';
import { PortfolioGrid } from '@/components/portfolio/portfolio-grid';

export default function Home() {
  const heroImage = placeHolderImages.find(img => img.imageHint.includes('wedding couple'));
  const featuredPortraits = placeHolderImages.filter(p => p.id.startsWith("portrait")).slice(0, 3);

  return (
    <>
      <div className="bg-background text-foreground">
        <section className="relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center text-center text-white">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              priority
              className="object-cover"
              data-ai-hint={heroImage.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative z-10 p-4">
            <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tighter">
              Capturing Life's Fleeting Moments
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl">
              Timeless photography for the modern romantic.
            </p>
          </div>
        </section>

        <section>
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-headline text-4xl md:text-5xl font-semibold tracking-tighter">
              Visual Storytelling
            </h2>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
              Welcome to the world as seen through my lens. I am Hardik, a photographer passionate about freezing time and telling stories through portraits, events, fashion, and the raw energy of the streets.
            </p>
            <Button asChild size="lg" variant="outline" className="mt-8">
              <Link href="/portfolio">
                Explore My Work <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
      <section>
          <PortfolioGrid title="Featured Work" images={featuredPortraits} layout="A" />
      </section>
    </>
  );
}
