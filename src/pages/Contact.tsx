import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SEO } from "@/components/SEO";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Phone, Mail, MapPin, Clock, Send, Shield, Check, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

// UK phone validation regex
const validateUKPhone = (phone: string): boolean => {
  if (!phone || phone.trim() === '') return true; // Phone is optional
  
  // Remove all spaces and the +44 prefix if present
  let cleanPhone = phone.replace(/\s/g, '');
  if (cleanPhone.startsWith('+44')) {
    cleanPhone = cleanPhone.substring(3);
  } else if (cleanPhone.startsWith('0')) {
    cleanPhone = cleanPhone.substring(1);
  }
  
  // UK mobile numbers start with 7 and have 10 digits total (after removing leading 0)
  const mobileRegex = /^7\d{9}$/;
  // UK landline numbers start with 1 or 2 and have 10-11 digits total (after removing leading 0)
  const landlineRegex = /^[12]\d{9,10}$/;
  
  return mobileRegex.test(cleanPhone) || landlineRegex.test(cleanPhone);
};

const contactSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(50, "First name must be less than 50 characters"),
  lastName: z.string().trim().min(1, "Last name is required").max(50, "Last name must be less than 50 characters"),
  email: z.string().trim().email("Please enter a valid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().optional(),
  enquiryType: z.string().min(1, "Please select an enquiry type"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000, "Message must be less than 2000 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const heroSection = useScrollAnimation();
  const formSection = useScrollAnimation();
  const locationsSection = useScrollAnimation();
  const { toast } = useToast();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    enquiryType: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [phoneValid, setPhoneValid] = useState<boolean | null>(null);

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
    
    // Real-time phone validation
    if (field === 'phone') {
      if (value.trim() === '') {
        setPhoneValid(null);
      } else {
        setPhoneValid(validateUKPhone(value));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate form data
    const result = contactSchema.safeParse(formData);
    
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.errors.forEach(err => {
        const field = err.path[0] as keyof ContactFormData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      toast({
        title: "Validation Error",
        description: "Please check the form and correct any errors.",
        variant: "destructive",
      });
      return;
    }
    
    // Validate phone if provided
    if (formData.phone && !validateUKPhone(formData.phone)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid UK phone number.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message Sent",
      description: "Thank you for contacting us. We'll get back to you within 24 hours.",
    });
    
    setIsSubmitting(false);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      enquiryType: '',
      message: '',
    });
    setErrors({});
    setPhoneValid(null);
  };

  const offices = [
    {
      city: "London",
      address: "125 Old Broad Street, London EC2N 1AR",
      phone: "020 7123 4567",
      email: "london@investigation.tax",
      hours: "Mon-Fri: 8am - 8pm",
    },
    {
      city: "Manchester",
      address: "Peter House, Oxford Street, Manchester M1 5AN",
      phone: "0161 234 5678",
      email: "manchester@investigation.tax",
      hours: "Mon-Fri: 9am - 6pm",
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
                    <Input 
                      id="firstName" 
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      placeholder="John"
                      className={errors.firstName ? 'border-destructive' : ''}
                    />
                    {errors.firstName && (
                      <p className="text-sm text-destructive mt-1">{errors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input 
                      id="lastName" 
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      placeholder="Smith"
                      className={errors.lastName ? 'border-destructive' : ''}
                    />
                    {errors.lastName && (
                      <p className="text-sm text-destructive mt-1">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="john@example.com"
                      className={errors.email ? 'border-destructive' : ''}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive mt-1">{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <div className="relative">
                      <Input 
                        id="phone" 
                        type="tel" 
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="07700 900000"
                        className={`pr-10 ${phoneValid === false ? 'border-destructive' : ''}`}
                      />
                      {phoneValid !== null && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          {phoneValid ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-destructive" />
                          )}
                        </div>
                      )}
                    </div>
                    {phoneValid === false && (
                      <p className="text-sm text-destructive mt-1">Please enter a valid UK phone number</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="enquiryType">Type of Enquiry *</Label>
                  <Select 
                    value={formData.enquiryType}
                    onValueChange={(value) => handleInputChange('enquiryType', value)}
                  >
                    <SelectTrigger className={errors.enquiryType ? 'border-destructive' : ''}>
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
                  {errors.enquiryType && (
                    <p className="text-sm text-destructive mt-1">{errors.enquiryType}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="message">Your Message *</Label>
                  <Textarea 
                    id="message" 
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    rows={5}
                    placeholder="Please describe how we can help you..."
                    className={errors.message ? 'border-destructive' : ''}
                  />
                  {errors.message && (
                    <p className="text-sm text-destructive mt-1">{errors.message}</p>
                  )}
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

              {/* Map Placeholder */}
              <div className="bg-muted/50 rounded-xl border border-border overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-navy/10 to-navy/5 flex items-center justify-center">
                  <div className="text-center p-8">
                    <MapPin className="h-12 w-12 text-gold mx-auto mb-4" />
                    <h3 className="font-semibold text-lg mb-2">UK-Wide Coverage</h3>
                    <p className="text-sm text-muted-foreground">
                      With offices in London, Manchester and Birmingham, we serve clients across the United Kingdom
                    </p>
                  </div>
                </div>
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
