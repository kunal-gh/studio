
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const allTestimonials = [
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
  {
    name: "David Chen",
    role: "Corporate Headshots",
    avatar: "https://picsum.photos/seed/avatar5/100/100",
    rating: 5,
    text: "Fast, professional, and excellent results. Hardik made the process of getting new company headshots completely painless. The team looks great!",
  },
  {
    name: "Maria Rodriguez",
    role: "Family Portraits",
    avatar: "https://picsum.photos/seed/avatar6/100/100",
    rating: 5,
    text: "We will treasure these family photos forever. Hardik was amazing with our kids and managed to capture their personalities perfectly. The photos are so natural and full of joy.",
  },
];

const Rating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1 text-yellow-400">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className={i < rating ? "fill-current" : ""} />
    ))}
  </div>
);

export default function TestimonialsPage() {
  return (
    <div className="py-20 md:py-28 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h1 className="font-headline text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">Client Voices</h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground">
            Stories from those who have trusted me to capture their most precious moments.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {allTestimonials.map((testimonial, index) => (
            <Card key={index} className="flex flex-col bg-card/50 border-border/50 shadow-lg">
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
        <div className="mt-24 text-center">
            <Button asChild variant="outline" size="lg">
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                </Link>
            </Button>
        </div>
      </div>
    </div>
  );
}
