import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Star } from "lucide-react";

export const metadata = {
  title: "Testimonials - Through Hardik's Eye",
  description: "Hear what clients have to say about their experience and the art we created together.",
};

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


export default function TestimonialsPage() {
  return (
    <>
      <section className="border-b">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">Client Voices</h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            Stories from those who have trusted me to capture their most precious moments.
          </p>
        </div>
      </section>
      
      <section>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <Avatar className="w-16 h-16 border-2 border-primary">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-headline text-xl font-bold">{testimonial.name}</h3>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                       {testimonial.rating && <Rating rating={testimonial.rating} />}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-lg italic text-foreground/80">"{testimonial.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
