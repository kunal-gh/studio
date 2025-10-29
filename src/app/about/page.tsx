import Image from "next/image";
import { placeHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
    title: "About - Through Hardik's Eye",
    description: "Learn more about the artist behind the lens, Hardik, and his journey in photography.",
};

export default function AboutPage() {
    const bioImage = placeHolderImages.find(img => img.imageHint.includes('portrait street'));

    return (
        <div className="w-full">
            <section className="container mx-auto px-4 text-center">
                <h1 className="font-headline text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tighter">
                    About the Artist
                </h1>
                <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
                    Discover the passion, inspiration, and story behind Through Hardik's Eye.
                </p>
            </section>

            <section>
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                         {bioImage && (
                            <div className="relative aspect-[4/5]">
                                <Image
                                src={bioImage.imageUrl}
                                alt={bioImage.description}
                                fill
                                className="object-cover"
                                data-ai-hint={bioImage.imageHint}
                                />
                            </div>
                        )}
                        <div className="space-y-6">
                            <h2 className="font-headline text-4xl font-semibold">Hardik — The Eye Behind the Lens</h2>
                            <p className="text-lg text-muted-foreground">
                                Welcome! I'm Hardik, a photographer driven by a desire to capture the fleeting moments that tell a larger story. My journey began with a simple camera and a curiosity for the world around me, which has since blossomed into a full-fledged passion for visual storytelling.
                            </p>
                            <p className="text-lg text-muted-foreground">
                                My approach is to blend classic portraiture with candid, documentary-style photography. My goal is to create images that are not just seen, but felt. Whether I'm capturing the raw energy of the streets, the intimate connection of a portrait, or the vibrant chaos of an event, I aim for authenticity and emotion.
                            </p>
                             <p className="text-lg text-muted-foreground">
                                Each photograph is a piece of a larger narrative, an invitation to see the world through my eyes. Thank you for joining me on this journey.
                            </p>
                             <Button asChild size="lg" variant="outline">
                                <Link href="/contact">
                                    Work With Me <ArrowRight className="ml-2" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
