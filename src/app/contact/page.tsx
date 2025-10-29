import { ContactForm } from "@/components/contact/contact-form";
import { Mail, Phone, MapPin } from "lucide-react";

export const metadata = {
  title: "Contact - Through Hardik's Eye",
  description: "Get in touch to discuss your photography needs, book a session, or collaborate on a project.",
};

export default function ContactPage() {
  return (
    <>
      <section className="border-b">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">Let's Create Together</h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            Have a project in mind? I'd love to hear about it. Reach out, and let's discuss how we can bring your vision to life.
          </p>
        </div>
      </section>

      <section>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <h2 className="font-headline text-3xl font-bold">Get in Touch</h2>
              <div className="space-y-4 text-lg">
                <div className="flex items-center gap-4">
                  <Mail className="h-6 w-6 text-primary" />
                  <span>contact@hardikseye.com</span>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="h-6 w-6 text-primary" />
                  <span>(123) 456-7890</span>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin className="h-6 w-6 text-primary" />
                  <span>Based in New York, NY | Available Worldwide</span>
                </div>
              </div>
              <p className="text-muted-foreground">
                For inquiries about weddings, portraits, events, or collaborations, please use the form, and I will get back to you as soon as possible.
              </p>
            </div>
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
