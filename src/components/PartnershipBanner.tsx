import { Scale, FileCheck, Users } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

export const PartnershipBanner = () => {
  const animation = useScrollAnimation();
  
  return (
    <section 
      ref={animation.ref}
      className={`py-6 bg-primary border-y border-primary/20 ${animation.isVisible ? "animate-fade-in" : "opacity-0"}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center">
              <Scale className="h-5 w-5 text-gold" />
            </div>
            <div>
              <p className="text-primary-foreground font-semibold text-sm">Business Crime Solicitors</p>
              <p className="text-primary-foreground/60 text-xs">SRA Regulated Partners</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center">
            <Users className="h-6 w-6 text-gold" />
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center">
              <FileCheck className="h-5 w-5 text-gold" />
            </div>
            <div>
              <p className="text-primary-foreground font-semibold text-sm">Chartered Accountants</p>
              <p className="text-primary-foreground/60 text-xs">ICAEW Qualified Partners</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
