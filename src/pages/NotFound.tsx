import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Home, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const heroSection = useScrollAnimation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4 py-16 bg-gradient-to-b from-background to-muted/30">
        <section
          ref={heroSection.ref as React.RefObject<HTMLElement>}
          className={`text-center max-w-2xl transition-all duration-1000 ${
            heroSection.isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-primary mb-4 animate-pulse">
              404
            </h1>
            <div className="h-1 w-32 bg-gradient-to-r from-primary to-accent mx-auto mb-6 rounded-full" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Page Not Found
          </h2>
          
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            The page you're looking for doesn't exist or has been moved. 
            <br className="hidden md:block" />
            Let's get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="group">
              <Link to="/">
                <Home className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Go to Homepage
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="group">
              <Link to="javascript:history.back()">
                <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                Go Back
              </Link>
            </Button>
          </div>

          <div className="mt-12 pt-8 border-t border-border/40">
            <p className="text-sm text-muted-foreground mb-4">
              Need help? Contact us or explore our services:
            </p>
            <div className="flex flex-wrap gap-3 justify-center text-sm">
              <Link to="/investigations" className="text-primary hover:underline transition-colors">
                HMRC Investigations
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link to="/pre-compliance" className="text-primary hover:underline transition-colors">
                Pre-Compliance
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link to="/get-started" className="text-primary hover:underline transition-colors">
                Get Started
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
