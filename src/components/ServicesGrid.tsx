import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import heroImage from "@/assets/hero-investigation.jpg";
import preComplianceImage from "@/assets/pre-compliance.jpg";
import teamImage from "@/assets/team-collaboration.jpg";

const services = [
  {
    title: "HMRC Investigation Defence",
    image: heroImage,
    link: "/investigations",
  },
  {
    title: "Pre-Compliance Reviews",
    image: preComplianceImage,
    link: "/pre-compliance",
  },
  {
    title: "Case Studies",
    image: teamImage,
    link: "/case-studies",
  },
];

export const ServicesGrid = () => {
  const animation = useScrollAnimation();
  
  return (
    <section 
      ref={animation.ref}
      className={`py-20 bg-muted/30 ${animation.isVisible ? "animate-fade-in-up" : "opacity-0"}`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Services</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our Solicitors & Accountants Partnership Delivers Exceptional Results
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {services.map((service) => (
            <Link 
              key={service.title}
              to={service.link}
              className="group relative overflow-hidden rounded-2xl aspect-[4/5] shadow-lg"
            >
              <img 
                src={service.image} 
                alt={service.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-bold text-primary-foreground group-hover:text-gold transition-colors">
                  {service.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
