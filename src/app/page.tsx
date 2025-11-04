

'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Mail, MapPin, Phone, Star } from 'lucide-react';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ContactForm } from "@/components/contact/contact-form";
import { Separator } from '@/components/ui/separator';
import { AnimatedHero } from '@/components/home/animated-hero';
import { PortfolioCard } from '@/components/portfolio/portfolio-card';
import { useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import { useFirestore } from '@/firebase/provider';
import { placeHolderImages } from '@/lib/placeholder-images';

const portfolioCategories = [
    { 
        slug: 'weddings',
        title: "Weddings", 
        description: "Capturing the magic of your special day with timeless elegance.",
        coverImage: placeHolderImages.find(p => p.id === 'wedding-1')!,
        className: "md:col-span-10 md:row-span-2",
        sharp: true,
    },
    { 
        slug: 'portraits',
        title: "Portraits", 
        description: "Revealing the essence of personality through captivating portraits.",
        coverImage: placeHolderImages.find(p => p.id === 'portrait-1')!,
        className: "md:col-span-4 md:row-span-2",
        sharp: true,
    },
    { 
        slug: 'street',
        title: "Street", 
        description: "Finding extraordinary stories in ordinary city life.",
        coverImage: placeHolderImages.find(p => p.id === 'street-1')!,
        className: "md:col-span-6 md:row-span-2",
        sharp: true,
    },
    { 
        slug: 'fashion',
        title: "Fashion", 
        description: "Bringing your creative vision to life with striking imagery.",
        coverImage: placeHolderImages.find(p => p.id === 'fashion-1')!,
        className: "md:col-span-7",
        sharp: true,
    },
    { 
        slug: 'ai-generated',
        title: "AI Generated", 
        description: "Exploring the frontiers of creativity with AI-generated imagery.",
        coverImage: placeHolderImages.find(p => p.id === 'ai-new-1')!,
        className: "md:col-span-3",
        sharp: true,
    },
    { 
        slug: 'events',
        title: "Events", 
        description: "Documenting the energy and emotion of every occasion.",
        coverImage: placeHolderImages.find(p => p.id === 'event-1')!,
        className: "md:col-span-10 md:row-span-2",
        sharp: true,
    },
    { 
        slug: 'concerts',
        title: "Concerts", 
        description: "Freezing the high-energy moments of live performances.",
        coverImage: placeHolderImages.find(p => p.id === 'concert-1')!,
        className: "md:col-span-10 md:row-span-2",
        sharp: true,
    },
];

const Rating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1 text-yellow-400">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className={i < rating ? "fill-current" : ""} />
    ))}
  </div>
);


export default function Home() {
  const firestore = useFirestore();
  const photographsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'photographs'));
  }, [firestore]);

  const { data: photographs } = useCollection(photographsQuery);
  const categories = photographs ? [...new Set(photographs.map(p => p.category))] : [];
  
  const testimonialsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'testimonials'));
  }, [firestore]);

  const { data: testimonials } = useCollection(testimonialsQuery);
  
  const bioImages = [
    placeHolderImages.find(img => img.id === 'portrait-3'),
    placeHolderImages.find(img => img.id === 'portrait-1'),
    placeHolderImages.find(img => img.id === 'portrait-2'),
  ].filter(img => img !== undefined) as (typeof placeHolderImages[0])[];
  
  const heroImages = [
    placeHolderImages.find(img => img.imageHint.includes('wedding couple')),
    placeHolderImages.find(img => img.imageHint.includes('fashion model')),
    placeHolderImages.find(img => img.imageHint.includes('street city')),
  ].filter(img => img !== undefined) as (typeof placeHolderImages[0])[];


  return (
    <>
      <div className="bg-background text-foreground w-full overflow-x-hidden">
        <section id="home" className="h-screen w-full flex items-center justify-center">
            <div className="relative w-[94%] h-[95vh] flex items-center justify-center text-center text-white">
                <AnimatedHero images={heroImages} />
                
                <div className="relative z-10 p-4">
                    <h1 className="font-headline text-5xl sm:text-6xl md:text-8xl lg:text-9xl tracking-tighter text-white/90 drop-shadow-md">
                    Capturing Life's Fleeting Moments
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl md:text-2xl font-body text-white/80 drop-shadow-sm">
                    Visual stories, captured with soul.
                    </p>
                </div>
            </div>
        </section>

        <section id="portfolio" className="py-20 md:py-28 lg:py-32">
           <div className="container mx-auto px-4 text-center mb-12 md:mb-16">
             <h2 className="font-headline text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight">
              My Work
            </h2>
            <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground">
              My lens seeks the poetry in motion, the quiet narratives hidden in plain sight. This collection is more than just images; it's a gallery of feelings and fleeting instants. I hope they resonate with you as much as they did with me.
            </p>
          </div>
          <div className="container mx-auto px-2">
            <div className="grid grid-cols-1 md:grid-cols-10 auto-rows-[20rem] md:auto-rows-[15rem] gap-4">
              {portfolioCategories.map((category) => (
                <PortfolioCard 
                  key={category.slug}
                  slug={category.slug}
                  title={category.title}
                  description={category.description}
                  coverImage={category.coverImage}
                  className={category.className}
                />
              ))}
            </div>
          </div>
        </section>

        <Separator className="my-12 md:my-16" />

        <section id="about" className="py-20 md:py-28 lg:py-32 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center max-w-7xl mx-auto">
                <div className="relative w-full h-full min-h-[500px] group">
                    <AnimatedHero images={bioImages} />
                </div>
                <div className="text-left">
                    <h3 className="font-headline text-xl md:text-2xl font-bold text-primary tracking-wide uppercase">
                        Hardik — The Eye Behind the Lens
                    </h3>
                    <h2 className="mt-4 font-headline text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
                        About The Artist
                    </h2>
                    <div className="mt-8 text-xl text-foreground/80 leading-relaxed space-y-8">
                        <p>
                            Welcome! I'm Hardik, a photographer driven by a desire to capture the fleeting moments that tell a larger story. My journey began with a simple camera and a curiosity for the world around me, which has since blossomed into a full-fledged passion for visual storytelling.
                        </p>
                        <p>
                            My approach is to blend classic portraiture with candid, documentary-style photography. I believe the best photographs are born from genuine moments and authentic emotions, and I strive to create a comfortable, collaborative atmosphere where my subjects can reveal their true personalities. My goal is to create images that are not just seen, but felt.
                        </p>
                    </div>
                    <Button asChild size="lg" variant="outline" className="text-base mt-10">
                        <Link href="/#contact">
                            Work With Me <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
          </div>
        </section>
        
        <Separator className="my-12 md:my-16" />

        <section id="testimonials" className="py-20 md:py-28 lg:py-32 bg-secondary/30">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12 md:mb-20">
                    <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">Client Voices</h2>
                    <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground">
                        Stories from those who have trusted me to capture their most precious moments.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                    {testimonials?.map((testimonial, index) => (
                    <Card key={index} className="flex flex-col bg-card/50 border-border/50 shadow-lg">
                        <CardHeader className="p-6 md:p-8">
                        <div className="flex items-start gap-4 md:gap-6">
                            <Avatar className="w-16 h-16 md:w-20 md:h-20 border-2 border-primary">
                            <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
                            <AvatarFallback>{testimonial.author.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                            <h3 className="font-headline text-xl md:text-2xl font-bold">{testimonial.author}</h3>
                            <p className="text-sm md:text-base text-muted-foreground">{testimonial.role}</p>
                            {testimonial.rating && <div className="mt-2"><Rating rating={testimonial.rating} /></div>}
                            </div>
                        </div>
                        </CardHeader>
                        <CardContent className="flex-grow p-6 md:p-8 pt-0">
                        <p className="text-base md:text-lg italic text-foreground/80 leading-relaxed">"{testimonial.text}"</p>
                        </CardContent>
                    </Card>
                    ))}
                </div>
                <div className="mt-16 md:mt-20 text-center">
                    <Button asChild size="lg" variant="outline">
                        <Link href="/testimonials">
                            View All Reviews <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
        
        <Separator className="my-12 md:my-16" />

        <section id="contact" className="py-20 md:py-28 lg:py-32 bg-background">
          <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 lg:gap-24 items-start">
                  <div className="space-y-8">
                      <div className="text-left">
                          <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl fontbold tracking-tight">Let's Create Together</h2>
                          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
                          Have a project in mind? I'd love to hear about it. Reach out, and let's discuss how we can bring your vision to life.
                          </p>
                      </div>
                      <div className="space-y-6 text-lg">
                          <div className="flex items-center gap-4">
                              <Mail className="h-6 w-6 text-primary" />
                              <a href="mailto:contact@hardikseye.com" className="hover:text-primary transition-colors">contact@hardikseye.com</a>
                          </div>
                          <div className="flex items-center gap-4">
                              <Phone className="h-6 w-6 text-primary" />
                              <span>(123) 456-7890</span>
                          </div>
                          <div className="flex items-center gap-4">
                              <MapPin className="h-6 w-6 text-primary" />
                              <span>New York, NY | Available Worldwide</span>
                          </div>
                      </div>
                  </div>
                  <div>
                      <ContactForm />
                  </div>
              </div>
          </div>
        </section>
      </div>
    </>
  );
}

