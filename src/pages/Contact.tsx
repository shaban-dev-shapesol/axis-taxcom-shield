import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SEO } from "@/components/SEO";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Phone, Mail, MapPin, Clock, Send, Shield } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import OfficeMap from "@/components/OfficeMap";

const Contact = () => {
  const heroSection = useScrollAnimation();
  const formSection = useScrollAnimation();
  const locationsSection = useScrollAnimation();
  const { toast } = useToast();
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message Sent",
      description: "Thank you for contacting us. We'll get back to you within 24 hours.",
    });
    
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  const offices = [
    {
      city: "Manchester (Head Office)",
      address: "109 Cheetham Hill Rd, Cheetham Hill, Manchester M8 8PY",
      phone: "0161 234 5678",
      email: "manchester@investigation.tax",
      hours: "Mon-Fri: 9am - 6pm",
    },
    {
      city: "London",
      address: "125 Old Broad Street, London EC2N 1AR",
      phone: "020 7123 4567",
      email: "london@investigation.tax",
      hours: "Mon-Fri: 8am - 8pm",
    },
    {
      city: "Birmingham",
      address: "55 Colmore Row, Birmingham B3 2AA",
      phone: "0121 345 6789",
      email: "birmingham@investigation.tax",
      hours: "Mon-Fri: 9am - 6pm",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Contact Us" 
        description="Contact Investigation.tax for HMRC investigation defence and tax compliance support. Offices in London, Manchester and Birmingham. 24-hour urgent response available." 
      />
      <Header />

      {/* Hero */}
      <section ref={heroSection.ref} className={`bg-primary text-primary-foreground py-20 transition-smooth ${heroSection.isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Get In <span className="text-gold">Touch</span>
            </h1>
            <p className="text-xl text-primary-foreground/80">
              Whether you're facing an HMRC investigation or need pre-compliance support, we're here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Urgent Contact Banner */}
      <section className="bg-danger/10 border-y border-danger/20 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left">
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-danger" />
              <span className="font-semibold">Urgent HMRC Matter?</span>
            </div>
            <a 
              href="tel:08007720000" 
              className="text-2xl font-bold text-danger hover:text-danger/80 transition-colors"
            >
              0800 772 0000
            </a>
            <span className="text-sm text-muted-foreground">24-hour emergency line available</span>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section ref={formSection.ref} className={`py-20 transition-smooth ${formSection.isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="bg-card rounded-xl shadow-lg border border-border p-8">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              
              <div className="flex items-start gap-3 mb-6 p-4 bg-gold/10 rounded-lg border border-gold/30">
                <Shield className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  Your information is secure and confidential. We never share your details with third parties.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input id="firstName" required placeholder="John" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input id="lastName" required placeholder="Smith" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" type="email" required placeholder="john@example.com" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" placeholder="07700 900000" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="enquiryType">Type of Enquiry *</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select enquiry type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="investigation">HMRC Investigation</SelectItem>
                      <SelectItem value="pre-compliance">Pre-Compliance Check</SelectItem>
                      <SelectItem value="vat">VAT Issues</SelectItem>
                      <SelectItem value="paye">PAYE / CIS</SelectItem>
                      <SelectItem value="general">General Enquiry</SelectItem>
                      <SelectItem value="media">Media / Press</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message">Your Message *</Label>
                  <Textarea 
                    id="message" 
                    required 
                    rows={5}
                    placeholder="Please describe how we can help you..."
                  />
                </div>

                <Button type="submit" variant="danger" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Phone</h3>
                      <a href="tel:08007720000" className="text-lg text-gold hover:text-gold/80 transition-colors">
                        0800 772 0000
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">Free from UK landlines and mobiles</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <a href="mailto:contact@investigation.tax" className="text-lg text-gold hover:text-gold/80 transition-colors">
                        contact@investigation.tax
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">We respond within 4 business hours</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Business Hours</h3>
                      <p className="text-muted-foreground">Monday - Friday: 8am - 8pm</p>
                      <p className="text-muted-foreground">Saturday: 9am - 5pm</p>
                      <p className="text-sm text-danger mt-1">24-hour emergency line for urgent HMRC matters</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Office Map */}
              <div>
                <h3 className="font-semibold text-lg mb-3">Our Location</h3>
                <OfficeMap />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section ref={locationsSection.ref} className={`py-20 bg-muted/30 transition-smooth ${locationsSection.isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Offices</h2>
            <p className="text-xl text-muted-foreground">
              Visit us at any of our UK locations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {offices.map((office, index) => (
              <div 
                key={office.city}
                className="bg-card rounded-xl shadow-lg border border-border p-6 transition-smooth hover:shadow-xl hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-gold" />
                  </div>
                  <h3 className="text-xl font-bold">{office.city}</h3>
                </div>
                
                <div className="space-y-3 text-sm">
                  <p className="text-muted-foreground">{office.address}</p>
                  
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gold" />
                    <a href={`tel:${office.phone.replace(/\s/g, '')}`} className="hover:text-gold transition-colors">
                      {office.phone}
                    </a>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gold" />
                    <a href={`mailto:${office.email}`} className="hover:text-gold transition-colors">
                      {office.email}
                    </a>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gold" />
                    <span className="text-muted-foreground">{office.hours}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
