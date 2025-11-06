
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ImageInfo {
  id: string;
  imageUrl: string;
  title?: string;
  description?: string;
  imageHint?: string;
}

interface PortfolioGridProps {
  title: string;
  images: ImageInfo[];
  layout?: "A" | "B" | "C";
}

const layoutClasses = {
  A: "grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[minmax(100px,_auto)]",
  B: "grid grid-cols-1 md:grid-cols-5 gap-4 auto-rows-[minmax(100px,_auto)]",
  C: "grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[minmax(100px,_auto)]",
};

const itemClasses = {
  A: (index: number) => {
    const patterns = [
      "col-span-1 row-span-2",
      "col-span-1",
      "col-span-1",
      "col-span-1 row-span-2",
      "col-span-1",
      "col-span-1",
    ];
    return patterns[index % patterns.length];
  },
  B: (index: number) => {
     const patterns = [
      "md:col-span-3 md:row-span-2",
      "md:col-span-2",
      "md:col-span-2",
      "md:col-span-3",
      "md:col-span-2",
      "md:col-span-2 md:row-span-2",
    ];
    return patterns[index % patterns.length];
  },
  C: (index: number) => {
    const patterns = [
      "col-span-2 row-span-2",
      "col-span-1",
      "col-span-1",
      "col-span-1",
      "col-span-1",
      "col-span-2",
    ];
    return patterns[index % patterns.length];
  },
};

export function PortfolioGrid({ title, images, layout = "A" }: PortfolioGridProps) {
  if (!images || images.length === 0) return (
    <div className="container mx-auto px-4 text-center">
      <p className="text-muted-foreground">No images to display in this category.</p>
    </div>
  );

  return (
    <div className="container mx-auto px-4">
      {title && (
        <h2 className="font-headline text-4xl md:text-5xl font-semibold tracking-tight mb-12 text-center">
          {title}
        </h2>
      )}
      <div className={cn(layoutClasses[layout])}>
        {images.map((image, index) => (
          <div key={image.id} className={cn("group relative overflow-hidden rounded-lg", itemClasses[layout](index))}>
            <Image
              src={image.imageUrl}
              alt={image.description || 'Portfolio image'}
              fill
              className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              data-ai-hint={image.imageHint}
              priority={index < 4}
            />
             <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 p-4 text-white opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <p className="text-sm font-semibold">{image.title}</p>
                <p className="text-xs text-white/80">{image.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
