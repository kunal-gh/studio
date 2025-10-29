import { cn } from "@/lib/utils";
import { CubistImage } from "./cubist-image";

interface Image {
  id: string;
  imageUrl: string;
  description: string;
  imageHint: string;
}

interface PortfolioGridProps {
  title: string;
  images: Image[];
  layout?: "A" | "B" | "C";
}

const layoutClasses = {
  A: "grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8",
  B: "grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-8",
  C: "grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8",
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
  if (images.length === 0) return null;

  return (
    <div className="container mx-auto px-4">
      <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight mb-8 text-center">
        {title}
      </h2>
      <div className={cn(layoutClasses[layout])}>
        {images.map((image, index) => (
          <div key={image.id} className={cn("relative aspect-[4/5] md:aspect-auto", itemClasses[layout](index))}>
            <CubistImage
              src={image.imageUrl}
              alt={image.description}
              hint={image.imageHint}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
