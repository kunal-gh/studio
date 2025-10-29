"use client";

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { useScrollProgress } from '@/hooks/use-scroll-progress';
import { cn } from '@/lib/utils';
import { ArrowDown } from 'lucide-react';

interface HeroScrollProps {
  images: string[];
}

export function HeroScroll({ images }: HeroScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useScrollProgress(scrollRef);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const frameIndex = Math.min(
    images.length - 1,
    Math.floor(scrollProgress * images.length)
  );

  return (
    <div ref={scrollRef} className="relative h-[300vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Title and Overlay */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/40 text-center text-white">
          <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter drop-shadow-2xl">
            Through Hardik's Eye
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-white/90 drop-shadow-lg">
            A journey through moments, captured with an artist's touch.
          </p>
          <div className="absolute bottom-10 animate-bounce">
            <ArrowDown className="h-8 w-8" />
          </div>
        </div>

        {/* Animated Images */}
        {isClient && images.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt={`Hero image ${index + 1}`}
            fill
            priority={index < 2}
            className={cn(
              'object-cover transition-opacity duration-500 ease-in-out',
              index === frameIndex ? 'opacity-100' : 'opacity-0'
            )}
          />
        ))}

        {/* Fallback for SSR or no images */}
        {!isClient && images.length > 0 && (
          <Image
            src={images[0]}
            alt="Hero image"
            fill
            priority
            className="object-cover"
          />
        )}
      </div>
    </div>
  );
}
