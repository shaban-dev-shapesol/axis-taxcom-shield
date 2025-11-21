import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CheckCircle, Home, Calendar, Phone } from "lucide-react";

const Thanks = () => {
  const heroSection = useScrollAnimation();
  const detailsSection = useScrollAnimation();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 px-4 bg-gradient-to-b from-background via-muted/30 to-background overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          
          <div
            ref={heroSection.ref as React.RefObject<HTMLDivElement>}
            className={`max-w-4xl mx-auto text-center relative z-10 transition-all duration-1000 ${
              heroSection.isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse" />
                <CheckCircle className="h-24 w-24 text-primary relative z-10" />
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Thank You for Reaching Out
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-4 leading-relaxed">
              Your submission has been received successfully.
            </p>

            <div className="h-1 w-32 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
          </div>
        </section>

        {/* Details Section */}
        <section
          ref={detailsSection.ref as React.RefObject<HTMLElement>}
          className={`py-16 px-4 transition-all duration-1000 ${
            detailsSection.isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="max-w-3xl mx-auto">
            {/* What Happens Next */}
            <div className="bg-card border border-border/50 rounded-lg p-8 mb-8 shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="text-2xl font-bold mb-6 text-center">What Happens Next?</h2>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold text-lg">1</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Review Your Details</h3>
                    <p className="text-muted-foreground">
                      Our team will carefully review your submission and assess your situation.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold text-lg">2</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">We'll Contact You</h3>
                    <p className="text-muted-foreground">
                      Expect a call or email from our team within 24-48 hours to discuss your case.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold text-lg">3</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Take Action</h3>
                    <p className="text-muted-foreground">
                      We'll outline the next steps and begin working on your defence or compliance strategy.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button asChild size="lg" className="group">
                <Link to="/">
                  <Home className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Return to Homepage
                </Link>
              </Button>

              <Button asChild variant="outline" size="lg" className="group">
                <Link to="/book">
                  <Calendar className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Book Another Assessment
                </Link>
              </Button>
            </div>

            {/* Contact Box */}
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-lg p-6 text-center">
              <Phone className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Need Immediate Assistance?</h3>
              <p className="text-muted-foreground mb-4">
                If your matter is urgent, don't hesitate to call us directly.
              </p>
              <a 
                href="tel:+442012345678" 
                className="text-primary font-semibold text-xl hover:underline transition-colors"
              >
                +44 (0)20 1234 5678
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Thanks;