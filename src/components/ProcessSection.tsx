import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const steps = [
  {
    number: "01",
    title: "Assessment & Documentation",
    description: "We review your case, gather all relevant documents, and assess the scope of the investigation.",
  },
  {
    number: "02",
    title: "Developing a Defence Strategy",
    description: "Our solicitors and accountants collaborate to build a robust defence tailored to your situation.",
  },
  {
    number: "03",
    title: "Negotiation and Communication",
    description: "We handle all HMRC communications, protecting you with legal privilege throughout.",
  },
  {
    number: "04",
    title: "Implementation and Resolution",
    description: "We execute the strategy, negotiate settlements, and bring your case to the best possible outcome.",
  },
];

export const ProcessSection = () => {
  const animation = useScrollAnimation();
  
  return (
    <section 
      ref={animation.ref}
      className={`py-20 bg-background ${animation.isVisible ? "animate-fade-in-up" : "opacity-0"}`}
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Description */}
          <div className="lg:sticky lg:top-32">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">How Our Process Works?</h2>
            <p className="text-muted-foreground mb-6">
              Our integrated team of <span className="font-semibold text-foreground">Business Crime Solicitors</span> and{" "}
              <span className="font-semibold text-foreground">Chartered Accountants</span> work together seamlessly to defend you against HMRC.
            </p>
            <p className="text-muted-foreground">
              Every step is coordinated between our legal and accounting experts, ensuring you get the strongest possible defence with full legal privilege protection.
            </p>
          </div>
          
          {/* Right Column - Steps */}
          <div className="space-y-6">
            {steps.map((step, index) => (
              <div 
                key={step.number}
                className="relative bg-card p-6 rounded-xl border border-border shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group"
              >
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <span className="text-4xl font-bold text-gold/30 group-hover:text-gold transition-colors">
                      {step.number}.
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
