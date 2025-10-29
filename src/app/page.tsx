import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { HeroScroll } from '@/components/home/hero-scroll';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import placeholderImages from '@/lib/placeholder-images.json';

export default function Home() {
  const scrollImages = placeholderImages.placeholderImages.filter(img => img.imageHint.includes('concert'));
  const bioImage = placeholderImages.placeholderImages.find(img => img.imageHint.includes('portrait street'));

  return (
    <>
      <HeroScroll images={scrollImages.map(img => img.imageUrl)} />
      <div className="relative z-10 bg-background">
        <section className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
                Capturing Moments, Creating Art.
              </h1>
              <p className="text-lg text-muted-foreground">
                Welcome to the world as seen through my lens. I am Hardik, a photographer passionate about freezing time and telling stories through portraits, events, fashion, and the raw energy of the streets.
              </p>
              <p className="text-lg text-muted-foreground">
                My work is a blend of observation and emotion, inspired by the multifaceted perspectives of cubism and the emotional depth of Picasso's eras. Each photograph is not just an image, but a piece of a larger narrative.
              </p>
              <Button asChild size="lg">
                <Link href="/portfolio">
                  Explore My Work <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </div>
            {bioImage && (
              <div className="relative aspect-[4/5] rounded-lg overflow-hidden shadow-2xl">
                 <Image
                  src={bioImage.imageUrl}
                  alt={bioImage.description}
                  fill
                  className="object-cover"
                  data-ai-hint={bioImage.imageHint}
                />
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
