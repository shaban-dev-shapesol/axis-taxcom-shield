import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import { useState } from "react";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/investigations", label: "HMRC Investigations" },
    { path: "/case-studies", label: "Case Studies" },
    { path: "/team", label: "Our Team" },
    { path: "/pre-compliance", label: "Pre-Compliance" },
    { path: "/ai-pipeline", label: "AI Technology" },
  ];

  return (
    <header className="bg-primary border-b border-primary/20 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3">
            <div className="text-2xl font-bold text-primary-foreground">
              AXIS <span className="text-gold">+ TAXCOM</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 text-sm font-medium transition-colors rounded-md ${
                  isActive(link.path)
                    ? "bg-primary-foreground/10 text-gold"
                    : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <a href="tel:02071234567" className="flex items-center space-x-2 text-primary-foreground/80 hover:text-gold transition-colors">
              <Phone className="h-4 w-4" />
              <span className="text-sm font-medium">0207 123 4567</span>
            </a>
            <Button asChild variant="danger" size="sm">
              <Link to="/get-started">Get Started Now</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-primary-foreground p-2"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-primary/20">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 text-sm font-medium transition-colors rounded-md ${
                    isActive(link.path)
                      ? "bg-primary-foreground/10 text-gold"
                      : "text-primary-foreground/80"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 space-y-3">
                <a
                  href="tel:02071234567"
                  className="flex items-center justify-center space-x-2 text-primary-foreground/80 py-3"
                >
                  <Phone className="h-4 w-4" />
                  <span className="text-sm font-medium">0207 123 4567</span>
                </a>
                <Button asChild variant="danger" size="sm" className="w-full">
                  <Link to="/get-started" onClick={() => setMobileMenuOpen(false)}>
                    Get Started Now
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
