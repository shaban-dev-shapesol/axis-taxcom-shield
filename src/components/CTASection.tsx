import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

interface CTASectionProps {
  title: string;
  description: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
}

export const CTASection = ({
  title,
  description,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText = "Book Free Assessment",
  secondaryButtonLink = "/book",
}: CTASectionProps) => {
  const ctaSection = useScrollAnimation();

  return (
    <section
      ref={ctaSection.ref}
      className={`py-20 bg-muted/30 transition-smooth ${
        ctaSection.isVisible ? "animate-fade-in" : "opacity-0"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="bg-primary text-primary-foreground rounded-2xl p-10 md:p-16 text-center max-w-5xl mx-auto shadow-elegant">
          <div className="inline-flex items-center gap-2 bg-gold/20 px-4 py-2 rounded-full mb-6">
            <span className="text-gold text-sm font-semibold">Solicitors & Accountants Partnership</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{title}</h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="danger" size="lg">
              <Link to={primaryButtonLink}>{primaryButtonText}</Link>
            </Button>
            {secondaryButtonText && (
              <Button asChild variant="accent" size="lg">
                <Link to={secondaryButtonLink}>{secondaryButtonText}</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
