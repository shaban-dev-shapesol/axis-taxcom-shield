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

const testimonials = [
  {
    rating: 5,
    quote: "HMRC claimed I owed £340,000. AXIS + TAXCOM got it down to £82,000 and avoided criminal prosecution entirely. Having the solicitor and accountant work together saved my business.",
    author: "Restaurant Owner, London",
    caseType: "Code of Practice 9 Investigation"
  },
  {
    rating: 5,
    quote: "I was terrified when I received the COP 9 letter. They responded within 4 hours, took control immediately, and walked me through everything. I cannot recommend them enough.",
    author: "IT Contractor, Manchester",
    caseType: "Criminal Tax Investigation"
  },
  {
    rating: 5,
    quote: "The pre-compliance check identified issues before HMRC did. We fixed everything and avoided an investigation altogether. Best money I ever spent.",
    author: "Property Developer, Birmingham",
    caseType: "Pre-Compliance Protection"
  }
];

export const Testimonials = () => {
  const testimonialsSection = useScrollAnimation();

  return (
    <section ref={testimonialsSection.ref} className={`py-20 bg-background ${testimonialsSection.isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real results from real people who faced HMRC investigations
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-full">
                  <div className="p-4">
                    <div className="bg-card p-8 rounded-xl border border-border shadow-lg min-h-[300px] flex flex-col">
                      <div className="flex items-center mb-4">
                        <div className="flex text-gold">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <span key={i} className="text-2xl">★</span>
                          ))}
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-6 italic text-lg flex-grow">
                        "{testimonial.quote}"
                      </p>
                      <div>
                        <p className="font-semibold">— {testimonial.author}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.caseType}</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 -translate-x-12" />
            <CarouselNext className="right-0 translate-x-12" />
          </Carousel>
        </div>

        <div className="mt-12 text-center">
          <Button asChild variant="default" size="lg">
            <Link to="/case-studies">Read More Case Studies →</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
