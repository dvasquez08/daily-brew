import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Image from 'next/image';

// Simple server action for form (for demonstration, does not actually send email)
async function submitContactForm(formData: FormData) {
  "use server";
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");
  console.log("Contact form submission (simulated):", { name, email, message });
  // In a real app, you'd send an email or save to a database here.
  // For now, we'll just log it. A toast could be triggered on the client if this returned a status.
  return { success: true, message: "Your message has been sent (simulated)!" };
}


export default function ContactPage() {
  return (
    <div className="py-12 space-y-16">
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-headline font-semibold mb-4 text-primary">Get In Touch</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          We'd love to hear from you! Whether you have a question, feedback, or just want to say hello, feel free to reach out.
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Contact Information Section */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Our Cafe</CardTitle>
            <CardDescription>Find us or drop us a line.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start space-x-3">
              <MapPin className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold">Address</h3>
                <p>123 Cafe Lane, Brewville, CA 90210</p>
                <a href="https://maps.google.com/?q=123+Cafe+Lane,+Brewville,+CA+90210" target="_blank" rel="noopener noreferrer" className="text-sm text-accent hover:underline">
                  Get Directions
                </a>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Phone className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold">Phone</h3>
                <p>(555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Mail className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold">Email</h3>
                <p>info@dailybrew.com</p>
              </div>
            </div>
            <div className="pt-4">
                 <h3 className="font-semibold mb-2">Opening Hours</h3>
                 <p>Monday - Friday: 7:00 AM - 6:00 PM</p>
                 <p>Saturday - Sunday: 8:00 AM - 5:00 PM</p>
            </div>
          </CardContent>
        </Card>

        {/* Contact Form Section */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Send Us a Message</CardTitle>
            <CardDescription>We'll get back to you as soon as possible.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={submitContactForm} className="space-y-6">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" placeholder="John Doe" required />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" name="email" type="email" placeholder="you@example.com" required />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" name="message" placeholder="Your message here..." rows={5} required />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                <Send className="mr-2 h-4 w-4" /> Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

       {/* Map Section */}
      <section className="mt-16">
        <h2 className="text-3xl font-headline font-semibold text-center mb-8">Visit Us</h2>
        <div className="aspect-[16/9] bg-muted rounded-lg shadow-lg overflow-hidden">
          <Image 
            src="/interior.jpg" 
            alt="Interior view of the cafe"
            width={1200}
            height={675}
            className="w-full h-full object-cover"
            data-ai-hint="cafe interior"
          />
        </div>
      </section>
    </div>
  );
}