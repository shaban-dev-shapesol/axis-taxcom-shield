import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground border-t border-primary/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="text-2xl font-bold">
              Investigation<span className="text-gold">.tax</span>
            </div>
            <p className="text-sm text-primary-foreground/70">
              Chartered Accountants, Tax Specialists & Business Crime Solicitors
            </p>
            <div className="flex space-x-2">
              <div className="px-3 py-1 bg-gold/10 text-gold text-xs font-semibold rounded">
                FCA Regulated
              </div>
              <div className="px-3 py-1 bg-gold/10 text-gold text-xs font-semibold rounded">
                GDPR Secure
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/investigations" className="text-primary-foreground/70 hover:text-gold transition-colors">
                  HMRC Investigations
                </Link>
              </li>
              <li>
                <Link to="/pre-compliance" className="text-primary-foreground/70 hover:text-gold transition-colors">
                  Pre-Compliance Checks
                </Link>
              </li>
              <li>
                <Link to="/team" className="text-primary-foreground/70 hover:text-gold transition-colors">
                  Legal Defence Team
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-primary-foreground/70 hover:text-gold transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/case-studies" className="text-primary-foreground/70 hover:text-gold transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-primary-foreground/70 hover:text-gold transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/book" className="text-primary-foreground/70 hover:text-gold transition-colors">
                  Book Assessment
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <Phone className="h-4 w-4 mt-0.5 flex-shrink-0 text-gold" />
                <a href="tel:02071234567" className="text-primary-foreground/70 hover:text-gold transition-colors">
                  0207 123 4567
                </a>
              </li>
              <li className="flex items-start space-x-2">
              <Mail className="h-4 w-4 mt-0.5 flex-shrink-0 text-gold" />
              <a href="mailto:urgent@investigation.tax" className="text-primary-foreground/70 hover:text-gold transition-colors">
                urgent@investigation.tax
              </a>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-gold" />
                <span className="text-primary-foreground/70">
                  London, Manchester, Birmingham
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-primary-foreground/70">
            © {new Date().getFullYear()} Investigation.tax. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm">
            <Link to="/privacy-policy" className="text-primary-foreground/70 hover:text-gold transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-primary-foreground/70 hover:text-gold transition-colors">
              Terms of Service
            </Link>
            <Link to="/data-security" className="text-primary-foreground/70 hover:text-gold transition-colors">
              Data Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
