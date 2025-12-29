import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Mail } from "lucide-react";
import { useState } from "react";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: "/investigations", label: "HMRC Investigations" },
    { path: "/case-studies", label: "Case Studies" },
    { path: "/team", label: "Our Team" },
    { path: "/pre-compliance", label: "Pre-Compliance" },
    { path: "/about", label: "About" },
    { path: "/blog", label: "Blog" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top Bar with CTA */}
        <div className="hidden lg:flex justify-end py-3">
          <Button asChild variant="outline" size="sm" className="border-gold text-gold hover:bg-gold hover:text-primary">
            <Link to="/book">Book A Consultation</Link>
          </Button>
        </div>

        {/* Main Navigation */}
        <div className="flex items-center justify-between py-4 border-t border-primary-foreground/10">
          <Link to="/" className="flex items-center space-x-3">
            <div className="text-2xl font-bold text-primary-foreground">
              Investigation<span className="text-gold">.tax</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? "text-gold border-b-2 border-gold"
                    : "text-primary-foreground/80 hover:text-gold"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Contact Info */}
          <div className="hidden lg:flex items-center space-x-6">
            <a href="tel:02071234567" className="flex items-center space-x-3 text-primary-foreground/80 hover:text-gold transition-colors group">
              <div className="w-10 h-10 rounded-full border border-gold flex items-center justify-center">
                <Phone className="h-4 w-4 text-gold" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-primary-foreground/60">Call Us On:</span>
                <span className="text-sm font-medium text-primary-foreground group-hover:text-gold">0207 123 4567</span>
              </div>
            </a>
            <a href="mailto:contact@investigation.tax" className="flex items-center space-x-3 text-primary-foreground/80 hover:text-gold transition-colors group">
              <div className="w-10 h-10 rounded-full border border-gold flex items-center justify-center">
                <Mail className="h-4 w-4 text-gold" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-primary-foreground/60">Email Us On:</span>
                <span className="text-sm font-medium text-primary-foreground group-hover:text-gold">contact@investigation.tax</span>
              </div>
            </a>
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
          <div className="lg:hidden py-4 border-t border-primary-foreground/10 bg-primary/95 backdrop-blur-sm">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? "text-gold"
                      : "text-primary-foreground/80"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 space-y-3 px-4">
                <a
                  href="tel:02071234567"
                  className="flex items-center space-x-2 text-primary-foreground/80 py-2"
                >
                  <Phone className="h-4 w-4 text-gold" />
                  <span className="text-sm font-medium">0207 123 4567</span>
                </a>
                <a
                  href="mailto:contact@investigation.tax"
                  className="flex items-center space-x-2 text-primary-foreground/80 py-2"
                >
                  <Mail className="h-4 w-4 text-gold" />
                  <span className="text-sm font-medium">contact@investigation.tax</span>
                </a>
                <Button asChild variant="outline" size="sm" className="w-full border-gold text-gold hover:bg-gold hover:text-primary">
                  <Link to="/book" onClick={() => setMobileMenuOpen(false)}>
                    Book A Consultation
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
