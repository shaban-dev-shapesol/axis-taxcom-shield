import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, Phone } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const Book = () => {
  const heroSection = useScrollAnimation();
  const optionsSection = useScrollAnimation();
  const processSection = useScrollAnimation();
  const contactSection = useScrollAnimation();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section ref={heroSection.ref} className={`bg-primary text-primary-foreground py-20 transition-smooth ${heroSection.isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Book Your <span className="text-gold">Expert Assessment</span>
            </h1>
            <p className="text-xl text-primary-foreground/80">
              Get clarity on your HMRC situation with expert guidance
            </p>
          </div>
        </div>
      </section>

      {/* Assessment Options */}
      <section ref={optionsSection.ref} className={`py-20 transition-smooth ${optionsSection.isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Free Assessment */}
            <div className="bg-card rounded-xl shadow-lg border border-border p-8 transition-smooth hover:shadow-xl hover:scale-105">
              <div className="text-center mb-6">
                <div className="inline-block bg-gold/10 px-4 py-2 rounded-full mb-4">
                  <span className="text-gold font-bold text-sm">FREE</span>
                </div>
                <h2 className="text-3xl font-bold mb-2">15-Minute Assessment Call</h2>
                <p className="text-muted-foreground">Perfect for initial guidance and understanding your situation</p>
              </div>

              <div className="space-y-4 mb-8">
                <h3 className="font-semibold">What's Covered:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-gold flex-shrink-0 mt-0.5 mr-3" />
                    <span className="text-sm text-muted-foreground">Quick overview of your HMRC situation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-gold flex-shrink-0 mt-0.5 mr-3" />
                    <span className="text-sm text-muted-foreground">Initial risk assessment</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-gold flex-shrink-0 mt-0.5 mr-3" />
                    <span className="text-sm text-muted-foreground">Explanation of investigation types</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-gold flex-shrink-0 mt-0.5 mr-3" />
                    <span className="text-sm text-muted-foreground">Recommended next steps</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-gold flex-shrink-0 mt-0.5 mr-3" />
                    <span className="text-sm text-muted-foreground">Pricing overview for full representation</span>
                  </li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-3">Best For:</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Just received an HMRC letter</li>
                  <li>• Want to understand investigation types</li>
                  <li>• Considering pre-compliance checks</li>
                  <li>• Need initial guidance before committing</li>
                </ul>
              </div>

              <Button variant="accent" size="lg" className="w-full">
                Book Free 15-Min Call
              </Button>
            </div>

            {/* Paid Consultation */}
            <div className="bg-gradient-to-br from-danger/5 to-danger/10 rounded-xl shadow-lg border-2 border-danger/30 p-8 transition-smooth hover:shadow-xl hover:scale-105">
              <div className="text-center mb-6">
                <div className="inline-block bg-danger/10 px-4 py-2 rounded-full mb-4">
                  <span className="text-danger font-bold text-sm">URGENT</span>
                </div>
                <h2 className="text-3xl font-bold mb-2">£500 Urgent Consultation</h2>
                <p className="text-muted-foreground">Immediate expert assessment with detailed action plan</p>
              </div>

              <div className="space-y-4 mb-8">
                <h3 className="font-semibold">What's Covered:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-danger flex-shrink-0 mt-0.5 mr-3" />
                    <span className="text-sm text-muted-foreground">60-90 minute deep-dive consultation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-danger flex-shrink-0 mt-0.5 mr-3" />
                    <span className="text-sm text-muted-foreground">Detailed forensic review of your documents</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-danger flex-shrink-0 mt-0.5 mr-3" />
                    <span className="text-sm text-muted-foreground">AI analysis of HMRC letter (if available)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-danger flex-shrink-0 mt-0.5 mr-3" />
                    <span className="text-sm text-muted-foreground">Comprehensive risk assessment and scoring</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-danger flex-shrink-0 mt-0.5 mr-3" />
                    <span className="text-sm text-muted-foreground">Written action plan and defence strategy</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-danger flex-shrink-0 mt-0.5 mr-3" />
                    <span className="text-sm text-muted-foreground">Document checklist preparation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-danger flex-shrink-0 mt-0.5 mr-3" />
                    <span className="text-sm text-muted-foreground">Solicitor involvement assessment</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-danger flex-shrink-0 mt-0.5 mr-3" />
                    <span className="text-sm text-muted-foreground">Follow-up email support for 7 days</span>
                  </li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-3">Required When:</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Code of Practice 8 or 9 investigation</li>
                  <li>• Criminal investigation suspected</li>
                  <li>• Large penalties or settlements (£50k+)</li>
                  <li>• Urgent deadline (within 7 days)</li>
                  <li>• Multiple tax years under review</li>
                </ul>
              </div>

              <div className="bg-background/50 backdrop-blur p-4 rounded-lg mb-6">
                <div className="flex items-center space-x-2 text-sm font-semibold mb-2">
                  <Clock className="h-4 w-4 text-danger" />
                  <span>Available within 24 hours</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  For urgent cases, we can typically arrange consultations within 24 hours of payment.
                </p>
              </div>

              <Button variant="danger" size="lg" className="w-full">
                Book Urgent Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What Happens Next */}
      <section ref={processSection.ref} className={`py-20 bg-muted/30 transition-smooth ${processSection.isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What Happens After Booking?</h2>

            <div className="space-y-8">
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-12 h-12 bg-gold text-navy rounded-lg flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Confirmation & Scheduling</h3>
                  <p className="text-muted-foreground">
                    You'll receive an email confirmation within 1 hour with available time slots. 
                    Choose the time that works best for you.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-12 h-12 bg-gold text-navy rounded-lg flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Document Upload (Optional)</h3>
                  <p className="text-muted-foreground">
                    If you have HMRC letters or documents, upload them via our secure portal before your call. 
                    This allows us to prepare more thoroughly.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-12 h-12 bg-gold text-navy rounded-lg flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Your Consultation</h3>
                  <p className="text-muted-foreground">
                    Speak directly with a chartered accountant (and solicitor if needed). We'll review your situation, 
                    assess risk, and provide actionable recommendations.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-12 h-12 bg-gold text-navy rounded-lg flex items-center justify-center font-bold text-xl">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Action Plan Delivery</h3>
                  <p className="text-muted-foreground">
                    For paid consultations, you'll receive a written action plan within 24 hours detailing 
                    your defence strategy, document requirements, and next steps.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-12 h-12 bg-gold text-navy rounded-lg flex items-center justify-center font-bold text-xl">
                  5
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Decision Time</h3>
                  <p className="text-muted-foreground">
                    You decide whether to proceed with full representation. If you do, the £500 consultation fee 
                    is credited towards your total case fee.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Alternative */}
      <section ref={contactSection.ref} className={`py-20 transition-smooth ${contactSection.isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-card rounded-xl shadow-lg border border-border p-8">
            <div className="text-center mb-8">
              <Phone className="h-12 w-12 text-gold mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4">Prefer to Speak Immediately?</h2>
              <p className="text-muted-foreground mb-6">
                Call our urgent response line and speak to a member of our team now
              </p>
              <a href="tel:02071234567" className="text-3xl font-bold text-gold hover:text-gold/80 transition-colors">
                0207 123 4567
              </a>
              <p className="text-sm text-muted-foreground mt-4">
                Monday - Friday: 8am - 8pm<br />
                Saturday: 9am - 5pm<br />
                Sunday & Bank Holidays: Emergency cases only
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Book;
