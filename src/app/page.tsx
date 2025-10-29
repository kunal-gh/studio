
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Mail, MapPin, Phone, Star } from 'lucide-react';
import Image from 'next/image';
import { placeHolderImages } from '@/lib/placeholder-images';
import { PortfolioGrid } from '@/components/portfolio/portfolio-grid';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ContactForm } from "@/components/contact/contact-form";
import { Separator } from '@/components/ui/separator';
import { AnimatedHero } from '@/components/home/animated-hero';

const testimonials = [
  {
    name: "Emily & John",
    role: "Wedding Clients",
    avatar: "https://picsum.photos/seed/avatar1/100/100",
    rating: 5,
    text: "Hardik was an absolute dream to work with for our wedding. The photos are breathtakingly beautiful, capturing the emotion of the day perfectly. We couldn't be happier!",
  },
  {
    name: "Aisha Khan",
    role: "Portrait Client",
    avatar: "https://picsum.photos/seed/avatar2/100/100",
    text: "The portrait session was so much fun and relaxed. Hardik has a true talent for making you feel comfortable and bringing out your personality in the photos. The results were stunning.",
  },
  {
    name: "Music Fest Organizers",
    role: "Event Client",
    avatar: "https://picsum.photos/seed/avatar3/100/100",
    rating: 5,
    text: "Incredible event photography! The energy of our festival was captured in every shot. The photos are dynamic, vibrant, and tell the story of the event exactly as we hoped. Highly recommended.",
  },
  {
    name: "Chloe Dubois",
    role: "Fashion Designer",
    avatar: "https://picsum.photos/seed/avatar4/100/100",
    text: "Working with Hardik on our lookbook was a fantastic experience. The creativity and unique perspective brought our collection to life. The images are both art and fashion.",
  },
];

const Rating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1 text-primary">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className={i < rating ? "fill-current" : ""} />
    ))}
  </div>
);


export default function Home() {
  const bioImage = placeHolderImages.find(img => img.imageHint.includes('portrait street'));

  const categories = ["Weddings", "Portraits", "Events", "Fashion", "Concerts", "Street"];
  
  const imagesByCategory = categories.reduce((acc, category) => {
    const categoryKey = category.toLowerCase().replace(' ', '');
    acc[category] = placeHolderImages.filter(p => p.id.startsWith(categoryKey.slice(0, -1)));
    return acc;
  }, {} as Record<string, typeof placeHolderImages>);
  
  const heroImages = [
    placeHolderImages.find(img => img.imageHint.includes('wedding couple')),
    placeHolderImages.find(img => img.imageHint.includes('fashion model')),
    placeHolderImages.find(img => img.imageHint.includes('street city')),
  ].filter(img => img !== undefined) as (typeof placeHolderImages[0])[];


  return (
    <>
      <div className="bg-background text-foreground">
        <section id="home" className="relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center text-center text-white overflow-hidden">
          <AnimatedHero images={heroImages} />
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative z-10 p-4">
            <h1 className="font-headline text-7xl md:text-8xl lg:text-9xl font-semibold tracking-tighter text-white/90 drop-shadow-md">
              Capturing Life's Fleeting Moments
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-white/90 drop-shadow-sm">
              Timeless photography for the modern romantic.
            </p>
          </div>
        </section>

        <section id="portfolio" className="py-20 md:py-28 lg:py-32">
           <div className="container mx-auto px-4 text-center">
             <h2 className="font-headline text-4xl md:text-5xl font-semibold tracking-tighter">
              Our Work
            </h2>
            <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground">
              A curated selection of moments captured with passion and a unique perspective. Explore the stories told in each frame.
            </p>
          </div>
          <div className="py-16 md:py-24">
            <Tabs defaultValue="Weddings" className="w-full">
              <div className="container mx-auto px-4 flex justify-center">
                <TabsList>
                  {categories.map((category) => (
                    <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
                  ))}
                </TabsList>
              </div>
              {categories.map((category, index) => (
                <TabsContent key={category} value={category}>
                  <div className="pt-12">
                    <PortfolioGrid title="" images={imagesByCategory[category]} layout={index % 2 === 0 ? 'A' : 'B'} />
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        <Separator className="my-12 md:my-16" />

        <section id="about" className="py-20 md:py-28 lg:py-32 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="relative grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
                    {bioImage && (
                        <div className="relative aspect-[4/5] -ml-16 md:-ml-24 lg:-ml-32">
                            <Image
                                src={bioImage.imageUrl}
                                alt={bioImage.description}
                                fill
                                className="object-cover rounded-lg"
                                data-ai-hint={bioImage.imageHint}
                            />
                        </div>
                    )}
                    <div className="relative bg-background/80 backdrop-blur-sm p-8 md:p-0 md:bg-transparent md:backdrop-blur-none rounded-lg md:-ml-32 lg:-ml-48">
                        <div className="max-w-lg space-y-8">
                             <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tighter">
                                About The Artist
                            </h2>
                            <h3 className="font-headline text-4xl font-semibold">Hardik — The Eye Behind the Lens</h3>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Welcome! I'm Hardik, a photographer driven by a desire to capture the fleeting moments that tell a larger story. My journey began with a simple camera and a curiosity for the world around me, which has since blossomed into a full-fledged passion for visual storytelling.
                            </p>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                My approach is to blend classic portraiture with candid, documentary-style photography. My goal is to create images that are not just seen, but felt.
                            </p>
                            <Button asChild size="lg" variant="outline" className="animate-pulse">
                                <Link href="/#contact">
                                    Work With Me <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <Separator className="my-12 md:my-16" />

        <section id="testimonials" className="py-20 md:py-28 lg:py-32">
            <div className="container mx-auto px-4">
                <div className="text-center mb-20">
                    <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">Client Voices</h2>
                    <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground">
                        Stories from those who have trusted me to capture their most precious moments.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {testimonials.map((testimonial, index) => (
                    <Card key={index} className="flex flex-col bg-card/50">
                        <CardHeader className="p-8">
                        <div className="flex items-start gap-6">
                            <Avatar className="w-20 h-20 border-2 border-primary">
                            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                            <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                            <h3 className="font-headline text-2xl font-bold">{testimonial.name}</h3>
                            <p className="text-base text-muted-foreground">{testimonial.role}</p>
                            {testimonial.rating && <div className="mt-2"><Rating rating={testimonial.rating} /></div>}
                            </div>
                        </div>
                        </CardHeader>
                        <CardContent className="flex-grow p-8 pt-0">
                        <p className="text-lg italic text-foreground/80 leading-relaxed">"{testimonial.text}"</p>
                        </CardContent>
                    </Card>
                    ))}
                </div>
            </div>
        </section>
        
        <Separator className="my-12 md:my-16" />

        <section id="contact" className="py-20 md:py-28 lg:py-32">
            <div className="container mx-auto px-4">
                <div className="text-center mb-20">
                    <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">Let's Create Together</h2>
                    <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground">
                    Have a project in mind? I'd love to hear about it. Reach out, and let's discuss how we can bring your vision to life.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
                    <div className="space-y-8">
                    <h3 className="font-headline text-3xl font-bold">Get in Touch</h3>
                    <div className="space-y-6 text-lg">
                        <div className="flex items-center gap-4">
                        <Mail className="h-5 w-5 text-primary" />
                        <a href="mailto:contact@hardikseye.com" className="hover:text-primary transition-colors">contact@hardikseye.com</a>
                        </div>
                        <div className="flex items-center gap-4">
                        <Phone className="h-5 w-5 text-primary" />
                        <span>(123) 456-7890</span>
                        </div>
                        <div className="flex items-center gap-4">
                        <MapPin className="h-5 w-5 text-primary" />
                        <span>New York, NY | Available Worldwide</span>
                        </div>
                    </div>
                    <p className="text-muted-foreground text-base leading-relaxed">
                        For inquiries about weddings, portraits, events, or collaborations, please use the form, and I will get back to you as soon as possible. I am excited to hear about your ideas and how we can work together to create something beautiful.
                    </p>
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
