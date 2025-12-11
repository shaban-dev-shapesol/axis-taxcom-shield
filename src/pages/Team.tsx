import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Scale, Shield, Award, Users } from "lucide-react";
import teamImage from "@/assets/team-collaboration.jpg";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const Team = () => {
  const heroSection = useScrollAnimation();
  const whyHybridSection = useScrollAnimation();
  const whenToInvolveSection = useScrollAnimation();
  const credentialsSection = useScrollAnimation();
  const ctaSection = useScrollAnimation();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section ref={heroSection.ref as any} className={`relative bg-primary text-primary-foreground ${heroSection.isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
        <div className="absolute inset-0 opacity-20">
          <img src={teamImage} alt="Our Team" className="w-full h-full object-cover" />
        </div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Accountants <span className="text-gold">+</span> Solicitors <span className="text-gold">= Unstoppable</span>
            </h1>
            <p className="text-xl text-primary-foreground/80 mb-8">
              The only UK firm combining chartered accountants and business crime solicitors 
              under one roof for complete HMRC defence.
            </p>
            <Button asChild variant="danger" size="lg">
              <Link to="/get-started">Work With Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Hybrid Team */}
      <section ref={whyHybridSection.ref as any} className={`py-20 ${whyHybridSection.isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why You Need Both Accountants AND Solicitors</h2>

          <div className="max-w-5xl mx-auto space-y-8">
            <div className="bg-card p-8 rounded-xl shadow-lg border border-border transition-smooth hover:scale-105 hover:shadow-xl">
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <Shield className="h-12 w-12 text-gold" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">When Accountants Are Enough</h3>
                  <p className="text-muted-foreground mb-4">
                    For most Aspect Enquiries, Full Enquiries, and technical tax disputes, chartered accountants can handle 
                    the investigation effectively. They understand HMRC procedures, forensic accounting, and technical tax law.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Technical tax calculations and submissions</li>
                    <li>• Forensic accounting reconstruction</li>
                    <li>• HMRC negotiation and settlement discussions</li>
                    <li>• VAT, PAYE, CIS compliance matters</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-danger/5 p-8 rounded-xl shadow-lg border-2 border-danger/20 transition-smooth hover:scale-105 hover:shadow-xl">
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <Scale className="h-12 w-12 text-danger" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-danger">When Solicitor Involvement Is Mandatory</h3>
                  <p className="text-muted-foreground mb-4">
                    <strong>If your case has escalated to Code of Practice 8 or 9, or involves criminal investigation, 
                    accountants alone cannot defend you.</strong> You need business crime solicitors immediately.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• <strong>Legal privilege:</strong> Only solicitors can provide attorney-client privilege protection</li>
                    <li>• <strong>Criminal defence:</strong> Solicitors defend against prosecution and represent in court</li>
                    <li>• <strong>Disclosure strategy:</strong> Control what information is disclosed and when</li>
                    <li>• <strong>Interview preparation:</strong> Prepare you for HMRC interviews under caution</li>
                    <li>• <strong>Asset protection:</strong> Prevent freezing orders and restraint orders</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gold/5 p-8 rounded-xl shadow-lg border-2 border-gold/40 transition-smooth hover:scale-105 hover:shadow-xl">
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <Users className="h-12 w-12 text-gold" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">The Investigation.tax Advantage</h3>
                  <p className="text-muted-foreground mb-4">
                    We provide both services under one roof. This means seamless coordination, unified strategy, 
                    and no gaps in your defence. Our accountants and solicitors work together from day one.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• <strong>Instant escalation:</strong> If your case becomes criminal, we're already involved</li>
                    <li>• <strong>Unified strategy:</strong> Accountants and solicitors collaborate on defence approach</li>
                    <li>• <strong>No handovers:</strong> Your case doesn't get passed between firms</li>
                    <li>• <strong>Cost efficiency:</strong> One team, one fee structure, no duplication</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* When to Involve Solicitor */}
      <section ref={whenToInvolveSection.ref as any} className={`py-20 bg-muted/30 ${whenToInvolveSection.isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">When to Involve a Business Crime Solicitor</h2>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
                <div className="bg-card p-6 rounded-lg border border-danger/20 transition-smooth hover:shadow-lg hover:scale-105">
                <h3 className="font-bold text-lg mb-2">Code of Practice 9 (COP 9)</h3>
                <p className="text-muted-foreground">
                  <strong>Immediate solicitor involvement required.</strong> This is a criminal investigation. 
                  HMRC is pursuing prosecution. Legal privilege is essential.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border border-danger/20 transition-smooth hover:shadow-lg hover:scale-105">
                <h3 className="font-bold text-lg mb-2">Code of Practice 8 (COP 8)</h3>
                <p className="text-muted-foreground">
                  <strong>Solicitor recommended.</strong> While technically civil, COP 8 can escalate to COP 9. 
                  Solicitor involvement protects you if the investigation worsens.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border border-border transition-smooth hover:shadow-lg hover:scale-105">
                <h3 className="font-bold text-lg mb-2">Serious Fraud Office (SFO) Involvement</h3>
                <p className="text-muted-foreground">
                  <strong>Immediate solicitor involvement required.</strong> SFO cases are criminal prosecutions 
                  with severe penalties including long prison sentences.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border border-border transition-smooth hover:shadow-lg hover:scale-105">
                <h3 className="font-bold text-lg mb-2">Asset Freezing or Restraint Orders</h3>
                <p className="text-muted-foreground">
                  <strong>Immediate solicitor involvement required.</strong> HMRC is seeking to freeze your assets 
                  pending investigation. Urgent legal action needed.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border border-border transition-smooth hover:shadow-lg hover:scale-105">
                <h3 className="font-bold text-lg mb-2">Interview Under Caution</h3>
                <p className="text-muted-foreground">
                  <strong>Solicitor recommended.</strong> If HMRC requests an interview under caution, this indicates 
                  potential criminal proceedings. Never attend without solicitor preparation.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border border-border transition-smooth hover:shadow-lg hover:scale-105">
                <h3 className="font-bold text-lg mb-2">Multi-Million Pound Demands</h3>
                <p className="text-muted-foreground">
                  <strong>Solicitor recommended.</strong> Large settlements often involve complex negotiations 
                  and potential criminal risk. Solicitor oversight ensures proper strategy.
                </p>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gold/10 rounded-lg border border-gold/30">
              <h3 className="font-bold text-lg mb-2">Investigation.tax Rule</h3>
              <p className="text-muted-foreground">
                <strong>If your case has escalated beyond a standard Full Enquiry, your starting point MUST be our solicitor arm.</strong> 
                We assess the criminal risk and involve accountants as needed. Do not start with accountants alone if criminal risk exists.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Credentials */}
      <section ref={credentialsSection.ref as any} className={`py-20 ${credentialsSection.isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Credentials</h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-navy to-navy-light rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-10 w-10 text-primary-foreground" />
              </div>
              <h3 className="font-bold text-xl mb-2">Chartered Accountants</h3>
              <p className="text-muted-foreground text-sm">
                ICAEW & ACCA qualified with forensic accounting specialisation
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-navy to-navy-light rounded-full flex items-center justify-center mx-auto mb-4">
                <Scale className="h-10 w-10 text-primary-foreground" />
              </div>
              <h3 className="font-bold text-xl mb-2">Business Crime Solicitors</h3>
              <p className="text-muted-foreground text-sm">
                SRA regulated with criminal litigation and tax defence expertise
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-navy to-navy-light rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-10 w-10 text-primary-foreground" />
              </div>
              <h3 className="font-bold text-xl mb-2">GDPR & Data Security</h3>
              <p className="text-muted-foreground text-sm">
                ISO 27001 certified data handling with end-to-end encryption
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaSection.ref as any} className={`py-20 bg-primary text-primary-foreground ${ctaSection.isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Get the Full Power of Our Hybrid Team
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Accountants + Solicitors + AI working together for your defence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="danger" size="lg">
              <Link to="/get-started">Start Your Defence</Link>
            </Button>
            <Button asChild variant="accent" size="lg">
              <Link to="/book">Book Free Assessment</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Team;
