import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { TrendingDown, CheckCircle, AlertTriangle } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const CaseStudies = () => {
  const heroSection = useScrollAnimation();
  const statsSection = useScrollAnimation();
  const casesSection = useScrollAnimation();
  const ctaSection = useScrollAnimation();

  const cases = [
    {
      industry: "Restaurant Chain",
      problem: "HMRC Full Enquiry - Alleged £450,000 VAT & Income Tax Understatement",
      claim: "HMRC claimed systematic cash suppression across 3 restaurant locations. Threatened criminal prosecution under COP 9.",
      reality: "Poor bookkeeping practices, not fraud. Incomplete till records and staff errors led to discrepancies.",
      solution: "We conducted full forensic reconstruction of sales data. Established legal privilege immediately. Demonstrated no dishonest intent.",
      outcome: "Settlement reduced to £78,000. No criminal charges. COP 9 downgraded to COP 8. Client avoided prison and kept business operating.",
      savings: "£372,000 saved",
    },
    {
      industry: "IT Contractor",
      problem: "IR35 Status Dispute - £180,000 Demand for Back Taxes & Penalties",
      claim: "HMRC argued contractor was deemed employee. Demanded 5 years of back-payments plus penalties.",
      reality: "Genuine consultancy work with multiple clients. Proper contracts in place but not documented correctly for HMRC standards.",
      solution: "Business crime solicitor secured legal privilege. Accountant team reconstructed working patterns and contract evidence.",
      outcome: "HMRC accepted outside IR35 status for 4 out of 5 years. Settlement £42,000. Penalties waived due to reasonable care defence.",
      savings: "£138,000 saved",
    },
    {
      industry: "Property Landlord",
      problem: "Capital Gains Tax Investigation - £95,000 Demand",
      claim: "HMRC alleged failure to declare property sales and rental income suppression across multiple properties.",
      reality: "Poor record-keeping by previous accountant. Main residence relief calculations were incorrect but not fraudulent.",
      solution: "We proved legitimate reliefs and allowable expenses. Reconstructed historical property records and demonstrated good faith errors.",
      outcome: "Settlement reduced to £18,500. Full settlement within 6 months. No further action.",
      savings: "£76,500 saved",
    },
    {
      industry: "Takeaway Business",
      problem: "Code of Practice 8 - £220,000 VAT & Income Tax Demand",
      claim: "HMRC suspected systematic cash suppression. Claimed lifestyle analysis showed income far exceeded declared profits.",
      reality: "Family gifts and loans from overseas were legitimate but not properly documented. Some genuine errors in VAT returns.",
      solution: "Full forensic accounting analysis. Established source of funds. Voluntary disclosure of minor errors before HMRC escalation.",
      outcome: "Settlement £65,000. Criminal investigation avoided. Business remained operational throughout.",
      savings: "£155,000 saved plus avoided COP 9",
    },
    {
      industry: "Medical Consultant",
      problem: "Full Enquiry - £125,000 Demand for Expense Disallowances & Penalties",
      claim: "HMRC challenged private practice expenses, vehicle costs, and home office claims across 4 years.",
      reality: "Legitimate business expenses but poor documentation. HMRC applied overly strict interpretation of allowable costs.",
      solution: "Accountant team reconstructed expense evidence. Solicitor challenged HMRC's legal interpretation of allowable expenses.",
      outcome: "Settlement £28,000. Most expenses accepted. Penalties reduced from 70% to 15% due to cooperation.",
      savings: "£97,000 saved",
    },
    {
      industry: "Construction CIS Contractor",
      problem: "PAYE & CIS Investigation - £310,000 Demand",
      claim: "HMRC alleged disguised employment. Demanded PAYE treatment for subcontractors plus penalties and interest.",
      reality: "Legitimate subcontractor relationships. Complex CIS rules misinterpreted by previous accountant.",
      solution: "Business crime solicitor established legal privilege. Accountant proved genuine self-employment status of subcontractors.",
      outcome: "Settlement £85,000. No criminal charges. HMRC accepted CIS treatment for majority of workers.",
      savings: "£225,000 saved",
    },
    {
      industry: "E-Commerce Seller",
      problem: "VAT Investigation - £65,000 VAT Understatement Claim",
      claim: "HMRC alleged failure to declare full sales revenue. Suspected hidden offshore accounts.",
      reality: "Poor platform integration led to VAT calculation errors. No offshore accounts. Genuine mistakes in complex multi-platform sales.",
      solution: "We provided full platform data export and reconciliation. AI tools analysed transaction patterns to prove no suppression.",
      outcome: "Settlement £12,500. HMRC accepted technical errors not fraud. Penalties waived.",
      savings: "£52,500 saved",
    },
    {
      industry: "Wholesale Food Distributor",
      problem: "COP 9 Criminal Investigation - £580,000 Total Demand",
      claim: "HMRC alleged systematic VAT fraud and money laundering. Serious Fraud Office involvement threatened.",
      reality: "Complex cash flow from multiple supplier relationships created apparent anomalies. No fraud occurred.",
      solution: "Immediate solicitor-led defence. Legal privilege protected all communications. Full forensic accounting reconstruction.",
      outcome: "Criminal prosecution dropped. Downgraded to civil settlement of £145,000. Business protected from closure.",
      savings: "£435,000 saved plus avoided prison sentence",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section ref={heroSection.ref} className={`bg-primary text-primary-foreground py-20 transition-smooth ${heroSection.isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Real Cases. <span className="text-gold">Real Results.</span>
            </h1>
            <p className="text-xl text-primary-foreground/80 mb-8">
              See how we've saved clients millions in penalties and protected businesses from HMRC investigations.
            </p>
            <Button asChild variant="danger" size="lg">
              <Link to="/get-started">Get Similar Results</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section ref={statsSection.ref} className={`py-12 bg-muted/30 transition-smooth ${statsSection.isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-gold mb-2">£1.6M+</div>
              <div className="text-muted-foreground">Total Savings for Clients</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-gold mb-2">73%</div>
              <div className="text-muted-foreground">Average Penalty Reduction</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-gold mb-2">100%</div>
              <div className="text-muted-foreground">Criminal Charges Avoided</div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section ref={casesSection.ref} className={`py-20 transition-smooth ${casesSection.isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
        <div className="container mx-auto px-4">
          <div className="space-y-12 max-w-5xl mx-auto">
            {cases.map((caseStudy, index) => (
              <div key={index} className="bg-card rounded-xl shadow-lg border border-border overflow-hidden transition-smooth hover:shadow-xl hover:scale-[1.02]">
                <div className="bg-gradient-to-r from-navy to-navy-light text-primary-foreground p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-sm text-gold font-semibold mb-1">Case Study #{index + 1}</div>
                      <h3 className="text-2xl font-bold mb-2">{caseStudy.industry}</h3>
                      <p className="text-primary-foreground/80">{caseStudy.problem}</p>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      <div className="bg-gold text-navy px-4 py-2 rounded-lg font-bold text-sm text-center">
                        {caseStudy.savings}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  <div>
                    <div className="flex items-start space-x-3 mb-2">
                      <AlertTriangle className="h-5 w-5 text-danger flex-shrink-0 mt-0.5" />
                      <h4 className="font-semibold text-lg">What HMRC Claimed</h4>
                    </div>
                    <p className="text-muted-foreground ml-8">{caseStudy.claim}</p>
                  </div>

                  <div>
                    <div className="flex items-start space-x-3 mb-2">
                      <CheckCircle className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                      <h4 className="font-semibold text-lg">What Actually Happened</h4>
                    </div>
                    <p className="text-muted-foreground ml-8">{caseStudy.reality}</p>
                  </div>

                  <div>
                    <div className="flex items-start space-x-3 mb-2">
                      <TrendingDown className="h-5 w-5 text-navy flex-shrink-0 mt-0.5" />
                      <h4 className="font-semibold text-lg">How We Solved It</h4>
                    </div>
                    <p className="text-muted-foreground ml-8">{caseStudy.solution}</p>
                  </div>

                  <div className="bg-gold/10 p-4 rounded-lg border border-gold/20">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-lg mb-1">Outcome & Savings</h4>
                        <p className="text-muted-foreground">{caseStudy.outcome}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaSection.ref} className={`py-20 bg-gradient-to-br from-navy via-navy-light to-primary text-primary-foreground border-t border-gold/20 transition-smooth ${ctaSection.isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready for Similar Results?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Every case is different, but our aggressive defence strategy delivers results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="danger" size="lg">
              <Link to="/get-started">Start Your Case</Link>
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

export default CaseStudies;
