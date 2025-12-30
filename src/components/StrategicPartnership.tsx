import { Scale, Calculator, Handshake, Shield, FileCheck, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const StrategicPartnership = () => {
  return (
    <section className="py-20 bg-primary relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent" />
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-gold/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/30 rounded-full text-gold text-sm font-semibold mb-6">
            <Handshake className="h-4 w-4" />
            Strategic Alliance
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
            Two Professions. One Mission.
          </h2>
          <p className="text-xl text-primary-foreground/70 max-w-2xl mx-auto">
            The only HMRC defence team combining Chartered Accountants & Business Crime Solicitors under one roof.
          </p>
        </div>

        {/* Partnership Cards */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {/* Solicitors Card */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
            <div className="relative bg-primary-foreground/5 backdrop-blur-sm p-8 rounded-2xl border border-primary-foreground/10 h-full hover:border-gold/30 transition-all duration-300">
              <div className="w-16 h-16 bg-gold/20 rounded-2xl flex items-center justify-center mb-6">
                <Scale className="h-8 w-8 text-gold" />
              </div>
              <h3 className="text-2xl font-bold text-primary-foreground mb-3">Business Crime Solicitors</h3>
              <p className="text-primary-foreground/60 mb-6">TAXCOM</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-primary-foreground/80">Legal Professional Privilege</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-primary-foreground/80">Criminal Defence Expertise</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-primary-foreground/80">Court Representation</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-primary-foreground/80">Interview Protection</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Center Connection */}
          <div className="relative flex flex-col items-center justify-center">
            {/* Glowing handshake icon */}
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gold/30 rounded-full blur-2xl animate-pulse" />
              <div className="relative w-24 h-24 bg-gold rounded-full flex items-center justify-center shadow-2xl shadow-gold/30">
                <Handshake className="h-12 w-12 text-primary" />
              </div>
            </div>
            
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gold mb-2">Strategic Partners</h3>
              <p className="text-primary-foreground/60 text-sm max-w-xs">
                Working together to deliver complete protection that neither profession could offer alone
              </p>
            </div>

            {/* Trust indicators */}
            <div className="mt-8 space-y-3 w-full">
              <div className="flex items-center justify-center gap-2 bg-primary-foreground/5 rounded-lg px-4 py-2">
                <Award className="h-4 w-4 text-gold" />
                <span className="text-sm text-primary-foreground/80">Combined 50+ Years Experience</span>
              </div>
              <div className="flex items-center justify-center gap-2 bg-primary-foreground/5 rounded-lg px-4 py-2">
                <FileCheck className="h-4 w-4 text-gold" />
                <span className="text-sm text-primary-foreground/80">500+ Cases Defended</span>
              </div>
            </div>
          </div>

          {/* Accountants Card */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
            <div className="relative bg-primary-foreground/5 backdrop-blur-sm p-8 rounded-2xl border border-primary-foreground/10 h-full hover:border-gold/30 transition-all duration-300">
              <div className="w-16 h-16 bg-gold/20 rounded-2xl flex items-center justify-center mb-6">
                <Calculator className="h-8 w-8 text-gold" />
              </div>
              <h3 className="text-2xl font-bold text-primary-foreground mb-3">Chartered Accountants</h3>
              <p className="text-primary-foreground/60 mb-6">AXIS</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <FileCheck className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-primary-foreground/80">Technical Tax Expertise</span>
                </li>
                <li className="flex items-start gap-3">
                  <FileCheck className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-primary-foreground/80">Financial Record Analysis</span>
                </li>
                <li className="flex items-start gap-3">
                  <FileCheck className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-primary-foreground/80">HMRC Negotiations</span>
                </li>
                <li className="flex items-start gap-3">
                  <FileCheck className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-primary-foreground/80">Compliance Restoration</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Why This Matters */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-primary-foreground/5 backdrop-blur-sm rounded-2xl border border-primary-foreground/10 p-8 md:p-12">
            <h3 className="text-2xl font-bold text-primary-foreground mb-4">
              Why This Partnership Matters
            </h3>
            <p className="text-primary-foreground/70 mb-8 max-w-2xl mx-auto">
              When HMRC investigates, you need more than number crunchers. You need legal protection. 
              Our strategic partnership ensures every communication is privileged, every strategy is legally sound, 
              and every outcome is optimised for your protection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="default" size="lg" className="bg-gold hover:bg-gold/90 text-primary">
                <Link to="/team">Meet Our Team</Link>
              </Button>
              <Button asChild variant="hero" size="lg">
                <Link to="/get-started">Start Your Defence</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
