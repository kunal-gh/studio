
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ImagePlaceholder } from '@/lib/placeholder-images';
import { ArrowRight } from 'lucide-react';

interface PortfolioCardProps {
  slug: string;
  title: string;
  description: string;
  coverImage: ImagePlaceholder;
  className?: string;
  sharp?: boolean;
}

export function PortfolioCard({ slug, title, description, coverImage, className, sharp = false }: PortfolioCardProps) {
  const titleStyle: React.CSSProperties = {
    '--bg-image': `url(${coverImage.imageUrl})`,
  } as React.CSSProperties;

  return (
    <Link href={`/portfolio/${slug}`} className={cn("group relative block w-full h-full overflow-hidden shadow-lg", className, !sharp && "rounded-lg")}>
      <Image
        src={coverImage.imageUrl}
        alt={coverImage.description}
        fill
        className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        data-ai-hint={coverImage.imageHint}
        priority
      />

      <div className="absolute inset-0 flex items-center justify-center p-4">
        <h3 
          style={titleStyle}
          className="font-headline text-6xl md:text-8xl lg:text-9xl font-extrabold uppercase tracking-tighter text-center text-white mix-blend-overlay"
        >
          {title}
        </h3>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
        <h4 className="font-headline text-2xl font-bold">{title}</h4>
        <p className="text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{description}</p>
        <div className="mt-2 flex items-center font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            View Gallery <ArrowRight className="ml-2 h-3 w-3" />
        </div>
      </div>
    </Link>
  );
}
