import { cn } from "@/lib/utils";
import Image from "next/image";

interface ImageInfo {
  id: string;
  imageUrl: string;
  description: string;
  imageHint: string;
}

interface PortfolioGridProps {
  title: string;
  images: ImageInfo[];
  layout?: "A" | "B" | "C";
}

const layoutClasses = {
  A: "grid grid-cols-2 md:grid-cols-3 gap-4",
  B: "grid grid-cols-1 md:grid-cols-5 gap-4",
  C: "grid grid-cols-2 md:grid-cols-4 gap-4",
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
      "md:col-span-3",
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
          <div key={image.id} className={cn("relative aspect-[4/5] md:aspect-auto overflow-hidden rounded-lg", itemClasses[layout](index))}>
            <Image
              src={image.imageUrl}
              alt={image.description}
              fill
              className="object-cover w-full h-full transition-transform duration-300 ease-in-out hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              data-ai-hint={image.imageHint}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
