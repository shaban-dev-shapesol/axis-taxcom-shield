import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "HMRC claimed I owed £340,000. AXIS + TAXCOM got it down to £82,000 and avoided criminal prosecution entirely. Having the solicitor and accountant work together saved my business.",
    author: "Restaurant Owner",
    role: "London",
    initials: "RO"
  },
  {
    quote: "I was terrified when I received the COP 9 letter. They responded within 4 hours, took control immediately, and walked me through everything. I cannot recommend them enough.",
    author: "IT Contractor",
    role: "Manchester",
    initials: "IC"
  },
  {
    quote: "The pre-compliance check identified issues before HMRC did. We fixed everything and avoided an investigation altogether. Best money I ever spent.",
    author: "Property Developer",
    role: "Birmingham",
    initials: "PD"
  }
];

export const Testimonials = () => {
  const testimonialsSection = useScrollAnimation();

  return (
    <section ref={testimonialsSection.ref} className={`py-20 bg-navy text-primary-foreground ${testimonialsSection.isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-xl text-primary-foreground/70 max-w-3xl mx-auto">
            Real results from real people who faced HMRC investigations
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto overflow-hidden">
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="p-2">
                    <div className="bg-primary-foreground/10 backdrop-blur-sm p-6 rounded-2xl border border-primary-foreground/20 shadow-lg h-full flex flex-col">
                      {/* Quote Icon */}
                      <div className="mb-4">
                        <Quote className="w-10 h-10 text-gold fill-gold/20" />
                      </div>
                      
                      {/* Testimonial Text */}
                      <p className="text-primary-foreground/80 mb-6 text-sm leading-relaxed flex-grow">
                        {testimonial.quote}
                      </p>
                      
                      {/* Author */}
                      <div className="flex items-center gap-3 pt-4 border-t border-primary-foreground/20">
                        <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold font-semibold text-sm">
                          {testimonial.initials}
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-primary-foreground">{testimonial.author}</p>
                          <p className="text-xs text-gold">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center items-center gap-4 mt-8">
              <CarouselPrevious className="static translate-x-0 translate-y-0 h-10 w-10 rounded-full border-gold/50 bg-gold/10 text-gold hover:bg-gold/20 hover:text-gold [&_svg]:stroke-gold [&_svg]:stroke-2" />
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <div key={index} className="w-2 h-2 rounded-full bg-gold/50" />
                ))}
              </div>
              <CarouselNext className="static translate-x-0 translate-y-0 h-10 w-10 rounded-full border-gold/50 bg-gold/10 text-gold hover:bg-gold/20 hover:text-gold [&_svg]:stroke-gold [&_svg]:stroke-2" />
            </div>
          </Carousel>
        </div>

        <div className="mt-12 text-center">
          <Button asChild variant="accent" size="lg">
            <Link to="/case-studies">Read More Case Studies →</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
