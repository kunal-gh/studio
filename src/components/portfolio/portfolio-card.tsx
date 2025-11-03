
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
}

export function PortfolioCard({ slug, title, description, coverImage, className }: PortfolioCardProps) {
  return (
    <Link href={`/portfolio/${slug}`} className={cn("group relative block w-full h-full overflow-hidden shadow-lg", className)}>
        <Image
            src={coverImage.imageUrl}
            alt={coverImage.description}
            fill
            className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            data-ai-hint={coverImage.imageHint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 text-white">
            <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
                <h3 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">{title}</h3>
                <div className="mt-4 max-h-0 overflow-hidden opacity-0 transition-all duration-500 group-hover:max-h-40 group-hover:opacity-100">
                    <p className="text-white/90">{description}</p>
                    <div className="mt-4 flex items-center font-semibold">
                        View Gallery <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                </div>
            </div>
        </div>
    </Link>
  );
}
