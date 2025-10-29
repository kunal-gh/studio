"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const GRID_SIZE = 5;

export function CubistImage({ src, alt, hint }: { src: string; alt: string; hint: string }) {
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const cells = Array.from({ length: GRID_SIZE * GRID_SIZE });

  return (
    <div
      ref={ref}
      className="relative w-full h-full rounded-lg overflow-hidden bg-muted shadow-lg"
    >
      <Image
        src={src}
        alt={alt}
        fill
        className={cn(
          "object-cover transition-opacity duration-300",
          isLoaded ? "opacity-0" : "opacity-100"
        )}
        onLoad={() => setIsLoaded(true)}
        data-ai-hint={hint}
      />

      {isLoaded && (
        <div
          className="cubist-image-grid absolute inset-0 grid grid-cols-5 grid-rows-5"
          data-in-view={isInView}
        >
          {cells.map((_, i) => {
            const row = Math.floor(i / GRID_SIZE);
            const col = i % GRID_SIZE;
            return (
              <div
                key={i}
                className="w-full h-full"
                style={{
                  backgroundImage: `url(${src})`,
                  backgroundSize: `${GRID_SIZE * 100}% ${GRID_SIZE * 100}%`,
                  backgroundPosition: `${(col * 100) / (GRID_SIZE - 1)}% ${
                    (row * 100) / (GRID_SIZE - 1)
                  }%`,
                  transitionDelay: `${i * 15}ms`,
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
