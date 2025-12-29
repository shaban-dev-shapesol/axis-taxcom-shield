import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { CTASection } from "@/components/CTASection";
import { PartnershipBanner } from "@/components/PartnershipBanner";
import { Link } from "react-router-dom";
import { AlertTriangle, Shield, FileText, Scale, CheckCircle } from "lucide-react";
import heroImage from "@/assets/hero-investigation.jpg";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const Investigations = () => {
  const heroSection = useScrollAnimation();
  const typesSection = useScrollAnimation();
  const whySection = useScrollAnimation();
  const strategySection = useScrollAnimation();

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="HMRC Investigations" 
        description="Expert HMRC investigation defence services. We handle Aspect Enquiries, Full Enquiries, COP 8 and COP 9 criminal investigations with our hybrid team of accountants and solicitors." 
      />
      <Header />

      {/* Hero */}
      <section ref={heroSection.ref as any} className={`relative bg-primary text-primary-foreground ${heroSection.isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
        <div className="absolute inset-0 opacity-20">
          <img src={heroImage} alt="HMRC Investigations" className="w-full h-full object-cover" />
        </div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-danger/10 text-danger px-4 py-2 rounded-full mb-6">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm font-semibold">Under Investigation? Act Now</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              HMRC Tax Investigation <span className="text-gold">Defence & Resolution</span>
            </h1>
            <p className="text-xl text-primary-foreground/80 mb-8">
              Chartered accountants and business crime solicitors working together to defend you 
              against all types of HMRC investigations.
            </p>
            <Button asChild variant="danger" size="lg">
              <Link to="/get-started">Start Your Defence</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Partnership Banner */}
      <PartnershipBanner variant="accent" size="sm" />

      {/* Types of Investigations */}
      <section ref={typesSection.ref as any} className={`py-20 ${typesSection.isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Types of HMRC Investigations We Handle</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Every investigation type requires different expertise and strategy
          </p>

          <div className="space-y-6 max-w-5xl mx-auto">
            <div className="bg-card p-6 rounded-lg border border-border shadow-sm transition-smooth hover:shadow-lg hover:scale-105">
              <h3 className="text-xl font-bold mb-2">Aspect Enquiries</h3>
              <p className="text-muted-foreground mb-3">
                HMRC questions a specific aspect of your tax return. Lower risk but must be handled correctly 
                to prevent escalation to a full enquiry.
              </p>
              <div className="flex items-start space-x-2 text-sm">
                <CheckCircle className="h-4 w-4 text-gold mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Typically resolved within 2-3 months with proper response</span>
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg border border-border shadow-sm transition-smooth hover:shadow-lg hover:scale-105">
              <h3 className="text-xl font-bold mb-2">Full Enquiries</h3>
              <p className="text-muted-foreground mb-3">
                HMRC opens a comprehensive investigation into your entire tax affairs. High-risk situation 
                requiring immediate accountant and potential solicitor involvement.
              </p>
              <div className="flex items-start space-x-2 text-sm">
                <AlertTriangle className="h-4 w-4 text-danger mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Can lead to significant penalties and criminal prosecution if mishandled</span>
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg border border-border shadow-sm transition-smooth hover:shadow-lg hover:scale-105">
              <h3 className="text-xl font-bold mb-2">Code of Practice 8 (COP 8)</h3>
              <p className="text-muted-foreground mb-3">
                HMRC suspects serious tax fraud but offers a civil settlement route. This is your last chance 
                before criminal prosecution. Solicitor involvement essential.
              </p>
              <div className="flex items-start space-x-2 text-sm">
                <AlertTriangle className="h-4 w-4 text-danger mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Requires full disclosure and cooperation to avoid criminal charges</span>
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg border border-danger/20 shadow-sm border-2 transition-smooth hover:shadow-lg hover:scale-105">
              <h3 className="text-xl font-bold mb-2 text-danger">Code of Practice 9 (COP 9) – Criminal Investigation</h3>
              <p className="text-muted-foreground mb-3">
                HMRC is pursuing criminal prosecution. You are now under criminal investigation. 
                <strong> Business crime solicitor involvement is mandatory from day one.</strong>
              </p>
              <div className="space-y-2">
                <div className="flex items-start space-x-2 text-sm">
                  <AlertTriangle className="h-4 w-4 text-danger mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Prison sentences possible for serious tax fraud</span>
                </div>
                <div className="flex items-start space-x-2 text-sm">
                  <Scale className="h-4 w-4 text-danger mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Legal privilege protects all communications with solicitors</span>
                </div>
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg border border-border shadow-sm transition-smooth hover:shadow-lg hover:scale-105">
              <h3 className="text-xl font-bold mb-2">VAT, PAYE & CIS Checks</h3>
              <p className="text-muted-foreground mb-3">
                Targeted checks on specific tax areas. Common in food industry, construction, and professional services. 
                Often triggered by anomaly detection algorithms.
              </p>
              <div className="flex items-start space-x-2 text-sm">
                <CheckCircle className="h-4 w-4 text-gold mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">Pre-emptive compliance checks can prevent these entirely</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Investigation Happens */}
      <section ref={whySection.ref as any} className={`py-20 bg-muted/30 ${whySection.isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why HMRC Opens Investigations</h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div>
              <h3 className="text-xl font-semibold mb-4">Common Triggers</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <FileText className="h-5 w-5 text-gold mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <strong>Income anomalies:</strong> Lifestyle doesn't match declared income
                  </div>
                </li>
                <li className="flex items-start">
                  <FileText className="h-5 w-5 text-gold mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <strong>Bank deposits:</strong> Unexplained cash deposits or transfers
                  </div>
                </li>
                <li className="flex items-start">
                  <FileText className="h-5 w-5 text-gold mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <strong>Industry patterns:</strong> Food businesses with low profit margins
                  </div>
                </li>
                <li className="flex items-start">
                  <FileText className="h-5 w-5 text-gold mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <strong>Incomplete returns:</strong> Missing or inconsistent tax submissions
                  </div>
                </li>
                <li className="flex items-start">
                  <FileText className="h-5 w-5 text-gold mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <strong>Third-party information:</strong> Tip-offs or data from other investigations
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">High-Risk Industries</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-danger mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <strong>Restaurants & Takeaways:</strong> Cash-heavy, targeted for VAT and income discrepancies
                  </div>
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-danger mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <strong>Construction:</strong> CIS compliance and VAT reverse charge issues
                  </div>
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-danger mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <strong>Landlords:</strong> Property income, capital gains, and rental anomalies
                  </div>
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-danger mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <strong>IT Contractors:</strong> IR35 status disputes and deemed employment
                  </div>
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-danger mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <strong>Professional Services:</strong> Consultants, solicitors, accountants with complex structures
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our Defence Strategy */}
      <section ref={strategySection.ref as any} className={`py-20 ${strategySection.isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Aggressive Defence Strategy</h2>

          <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-12 h-12 bg-gold text-navy rounded-lg flex items-center justify-center font-bold text-xl">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Immediate Legal Privilege Establishment</h3>
                <p className="text-muted-foreground">
                  We establish solicitor-client privilege from day one. This protects all communications from HMRC disclosure 
                  and ensures you cannot be forced to self-incriminate.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-12 h-12 bg-gold text-navy rounded-lg flex items-center justify-center font-bold text-xl">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Forensic Accounting Analysis</h3>
                <p className="text-muted-foreground">
                  Our chartered accountants conduct a complete forensic review of your books, bank statements, and tax submissions. 
                  We identify weaknesses before HMRC does and build counter-arguments.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-12 h-12 bg-gold text-navy rounded-lg flex items-center justify-center font-bold text-xl">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">AI-Powered Risk Assessment</h3>
                <p className="text-muted-foreground">
                Our system analyses your HMRC letter, gauges the investigation risk, and pinpoints the documents and details HMRC will probably request.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-12 h-12 bg-gold text-navy rounded-lg flex items-center justify-center font-bold text-xl">
                4
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Controlled Disclosure & Negotiation</h3>
                <p className="text-muted-foreground">
                  We control what information HMRC receives and when. Our team handles all communication with HMRC inspectors, 
                  ensuring no damaging admissions or mistakes.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-12 h-12 bg-gold text-navy rounded-lg flex items-center justify-center font-bold text-xl">
                5
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Settlement & Penalty Reduction</h3>
                <p className="text-muted-foreground">
                  We negotiate aggressively to minimise penalties, interest, and settlement amounts. Our clients see penalty 
                  reductions of 40-80% on average compared to unrepresented taxpayers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Under Investigation? Get Expert Defence Now"
        description="Don't let HMRC control the narrative. Start your defence today."
        primaryButtonText="Start Your Defence"
        primaryButtonLink="/get-started"
      />

      <Footer />
    </div>
  );
};

export default Investigations;
