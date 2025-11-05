
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Mail, MapPin, Phone, Star, Instagram, Twitter, Facebook } from 'lucide-react';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { ContactForm } from "@/components/contact/contact-form";
import { Separator } from '@/components/ui/separator';
import { AnimatedHero } from '@/components/home/animated-hero';
import { PortfolioCard } from '@/components/portfolio/portfolio-card';
import { useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import { useFirestore } from '@/firebase/provider';
import { placeHolderImages } from '@/lib/placeholder-images';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import React from 'react';

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
        title: "That's AI", 
        description: "Exploring the frontiers of creativity with AI-generated imagery.",
        coverImage: placeHolderImages.find(p => p.id === 'ai-new-1')!,
        className: "md:col-span-3",
        sharp: true,
    },
    { 
        slug: 'live-events',
        title: "Live Events", 
        description: "Documenting the energy and emotion of every occasion, from concerts to conferences.",
        coverImage: placeHolderImages.find(p => p.id === 'event-1')!,
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

const sampleTestimonials = [
    {
      author: "Jessica & Tom",
      text: "Hardik didn't just take photos; he captured the soul of our wedding day. We look at our album and relive every laugh, tear, and dance. Truly magical.",
      role: "Wedding Client",
      avatar: "https://i.pravatar.cc/150?img=1",
      rating: 5,
    },
    {
      author: "Amina Yusuf",
      text: "The portrait session was so relaxed and professional. Hardik made me feel completely at ease, and the final shots are the best photos I've ever had taken.",
      role: "Portrait Client",
      avatar: "https://i.pravatar.cc/150?img=5",
      rating: 5,
    },
    {
      author: "David Chen",
      text: "His eye for street photography is unmatched. The photos he took for our magazine feature were raw, powerful, and told an incredible story.",
      role: "Magazine Editor",
      avatar: "https://i.pravatar.cc/150?img=8",
      rating: 5,
    },
    {
        author: "Sarah Jenkins",
        text: "The fashion shoot was a dream. The creativity and direction were top-notch, resulting in a stunning lookbook that exceeded all our expectations.",
        role: "Fashion Designer",
        avatar: "https://i.pravatar.cc/150?img=12",
        rating: 5,
    },
    {
        author: "Michael B.",
        text: "Incredible ability to capture the energy of a live event. The photos from our conference are dynamic and professional. Highly recommended.",
        role: "Event Organizer",
        avatar: "https://i.pravatar.cc/150?img=11",
        rating: 5,
    }
  ];

function TestimonialsSection() {
    const firestore = useFirestore();
    const testimonialsQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(collection(firestore, 'testimonials'));
    }, [firestore]);

    // Using sample testimonials for now
    const { data: testimonialsFromDB, isLoading: testimonialsLoading } = useCollection(testimonialsQuery);
    const testimonials = sampleTestimonials;
    
    return (
        <section id="testimonials" className="py-20 md:py-28 lg:py-32 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12 md:mb-20">
                    <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">Client Voices</h2>
                    <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground">
                        Words from those who have seen through my eye.
                    </p>
                </div>
                
                {testimonialsLoading && <p className="text-center text-muted-foreground">Loading testimonials...</p>}

                {testimonials && testimonials.length > 0 && (
                  <Carousel
                    opts={{
                        align: "center",
                        loop: true,
                    }}
                    className="w-full max-w-6xl mx-auto"
                  >
                    <CarouselContent>
                    {testimonials.map((testimonial, index) => (
                        <CarouselItem key={index} index={index} className="md:basis-1/2 lg:basis-1/3 p-4">
                            <Card className="h-full flex flex-col items-center text-center p-8 border border-border/20 shadow-sm bg-card/20 rounded-lg testimonial-card">
                                <Avatar className="w-24 h-24 mb-6 border-4 border-background shadow-md">
                                    <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
                                    <AvatarFallback>{testimonial.author.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <CardContent className="p-0 flex-grow">
                                    <p className="text-base italic text-foreground/70 mb-6">"{testimonial.text}"</p>
                                    <h3 className="font-headline text-xl font-semibold text-foreground">{testimonial.author}</h3>
                                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                    {testimonial.rating && <div className="mt-4"><Rating rating={testimonial.rating} /></div>}
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-[-50px] text-foreground/50 hover:text-foreground" />
                    <CarouselNext className="right-[-50px] text-foreground/50 hover:text-foreground" />
                  </Carousel>
                )}
                
                {!testimonialsLoading && (!testimonials || testimonials.length === 0) && (
                    <p className="text-center text-muted-foreground">No testimonials yet.</p>
                )}


                <div className="mt-16 md:mt-20 text-center">
                    <Button asChild size="lg" variant="outline">
                        <Link href="/testimonials">
                            View All Reviews <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default function Home() {
  const firestore = useFirestore();
  const photographsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'photographs'));
  }, [firestore]);

  const { data: photographs } = useCollection(photographsQuery);
  const categories = photographs ? [...new Set(photographs.map(p => p.category))] : [];
  
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
      <section id="home" className="w-full">
            <div className="relative w-full h-screen flex items-center justify-center text-center text-white">
                <div className="absolute inset-0 shadow-2xl">
                    <AnimatedHero images={heroImages} />
                </div>
                
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
                  sharp={category.sharp}
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
                            I'm Hardik, a photographer driven to capture the fleeting moments that tell a larger story. My approach blends classic portraiture with candid, documentary-style photography to create images that are not just seen, but felt.
                        </p>
                        <p>
                            I strive to create a comfortable, collaborative atmosphere where my subjects can reveal their true personalities, resulting in images that are both genuine and timeless.
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

        <TestimonialsSection />
        
        <Separator className="my-12 md:my-16" />

        <section id="contact" className="py-20 md:py-28 lg:py-32 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">Let's Create Together</h2>
              <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground">
                Have a project in mind? I'd love to hear about it. Reach out, and let's discuss how we can bring your vision to life.
              </p>
            </div>
            <div className="max-w-4xl mx-auto grid md:grid-cols-5 gap-8 bg-card p-8 rounded-2xl shadow-lg border border-border/10">
              <div className="md:col-span-2 space-y-8">
                  <h3 className="font-headline text-2xl font-semibold">Contact Information</h3>
                  <div className="space-y-6 text-base">
                      <div className="flex items-start gap-4 group">
                          <div className="p-2 bg-primary/10 rounded-full mt-1 transition-colors group-hover:bg-primary/20">
                            <Mail className="h-5 w-5 text-primary transition-transform group-hover:scale-110" />
                          </div>
                          <div>
                            <p className="font-semibold transition-colors group-hover:text-primary">Email</p>
                            <a href="mailto:contact@hardikseye.com" className="text-muted-foreground group-hover:text-primary transition-colors">contact@hardikseye.com</a>
                          </div>
                      </div>
                      <div className="flex items-start gap-4 group">
                          <div className="p-2 bg-primary/10 rounded-full mt-1 transition-colors group-hover:bg-primary/20">
                            <Phone className="h-5 w-5 text-primary transition-transform group-hover:scale-110" />
                          </div>
                          <div>
                            <p className="font-semibold transition-colors group-hover:text-primary">Phone</p>
                            <span className="text-muted-foreground group-hover:text-primary transition-colors">(123) 456-7890</span>
                          </div>
                      </div>
                      <div className="flex items-start gap-4 group">
                          <div className="p-2 bg-primary/10 rounded-full mt-1 transition-colors group-hover:bg-primary/20">
                            <MapPin className="h-5 w-5 text-primary transition-transform group-hover:scale-110" />
                          </div>
                          <div>
                            <p className="font-semibold transition-colors group-hover:text-primary">Location</p>
                            <span className="text-muted-foreground group-hover:text-primary transition-colors">New York, NY | Available Worldwide</span>
                          </div>
                      </div>
                  </div>
                   <div className="space-y-4 pt-4">
                    <h4 className="font-headline text-lg font-semibold">Follow Me</h4>
                    <div className="flex items-center gap-4">
                      <Link href="#" aria-label="Twitter" className="group">
                        <Twitter className="h-6 w-6 text-muted-foreground transition-colors group-hover:text-primary" />
                      </Link>
                      <Link href="#" aria-label="Facebook" className="group">
                        <Facebook className="h-6 w-6 text-muted-foreground transition-colors group-hover:text-primary" />
                      </Link>
                      <Link href="#" aria-label="Instagram" className="group">
                        <Instagram className="h-6 w-6 text-muted-foreground transition-colors group-hover:text-primary" />
                      </Link>
                    </div>
                  </div>
              </div>
              <div className="md:col-span-3">
                  <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
