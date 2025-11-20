import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Upload, Scan, Shield, Scale, FileSearch, CheckCircle } from "lucide-react";

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              How <span className="text-gold">AXIS + TAXCOM</span> Works
            </h1>
            <p className="text-xl text-primary-foreground/80">
              From HMRC letter to complete resolution: our end-to-end process explained
            </p>
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-16">
            {/* Step 1 */}
            <div className="flex items-start space-x-8">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-gradient-to-r from-navy to-navy-light rounded-lg flex items-center justify-center">
                  <Upload className="h-10 w-10 text-primary-foreground" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <h3 className="text-2xl font-bold">1. Submit Your Information</h3>
                  <span className="bg-gold/10 text-gold px-3 py-1 rounded-full text-xs font-semibold">Day 1</span>
                </div>
                <p className="text-muted-foreground mb-4">
                  Complete our secure intake form and upload your HMRC letter or documents. All data is encrypted 
                  with AES-256 and stored in ISO 27001 certified UK data centres.
                </p>
                <div className="bg-card p-4 rounded-lg border border-border">
                  <h4 className="font-semibold mb-2 text-sm">What We Extract:</h4>
                  <ul className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <li>• Investigation type & reference</li>
                    <li>• Tax periods under review</li>
                    <li>• HMRC concerns and allegations</li>
                    <li>• Response deadlines</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start space-x-8">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-gradient-to-r from-navy to-navy-light rounded-lg flex items-center justify-center">
                  <Scan className="h-10 w-10 text-primary-foreground" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <h3 className="text-2xl font-bold">2. Document Analysis & Risk Assessment</h3>
                  <span className="bg-gold/10 text-gold px-3 py-1 rounded-full text-xs font-semibold">Within hours</span>
                </div>
                <p className="text-muted-foreground mb-4">
                  Our systems extract key information from your documents and analyse them against historical 
                  HMRC investigation patterns. You receive a comprehensive risk assessment.
                </p>
                <div className="bg-card p-4 rounded-lg border border-border">
                  <h4 className="font-semibold mb-2 text-sm">Risk Assessment Factors:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-gold mt-0.5 mr-2 flex-shrink-0" />
                      <span>Investigation type severity (Aspect → COP 9)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-gold mt-0.5 mr-2 flex-shrink-0" />
                      <span>Language patterns indicating criminal intent allegations</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-gold mt-0.5 mr-2 flex-shrink-0" />
                      <span>Presence of fraud terminology or asset freezing mentions</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start space-x-8">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-gradient-to-r from-navy to-navy-light rounded-lg flex items-center justify-center">
                  <Shield className="h-10 w-10 text-primary-foreground" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <h3 className="text-2xl font-bold">3. Expert Consultation</h3>
                  <span className="bg-gold/10 text-gold px-3 py-1 rounded-full text-xs font-semibold">Day 1-2</span>
                </div>
                <p className="text-muted-foreground mb-4">
                  A chartered accountant (and solicitor if high-risk) reviews the AI findings and conducts 
                  a deep-dive consultation with you. You'll understand exactly what you're facing.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-card p-4 rounded-lg border border-border">
                    <h4 className="font-semibold mb-2 text-sm">Accountant Reviews:</h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Technical tax calculations</li>
                      <li>• Forensic accounting needs</li>
                      <li>• Document requirements</li>
                      <li>• Settlement strategy</li>
                    </ul>
                  </div>
                  <div className="bg-card p-4 rounded-lg border border-border">
                    <h4 className="font-semibold mb-2 text-sm">Solicitor Assesses:</h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Criminal prosecution risk</li>
                      <li>• Legal privilege needs</li>
                      <li>• Disclosure strategy</li>
                      <li>• Court representation requirements</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex items-start space-x-8">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-gradient-to-r from-navy to-navy-light rounded-lg flex items-center justify-center">
                  <FileSearch className="h-10 w-10 text-primary-foreground" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <h3 className="text-2xl font-bold">4. Evidence Gathering & Analysis</h3>
                  <span className="bg-gold/10 text-gold px-3 py-1 rounded-full text-xs font-semibold">Weeks 1-4</span>
                </div>
                <p className="text-muted-foreground mb-4">
                  We request and review all relevant documents: bank statements, invoices, VAT returns, payroll records, 
                  and accounting books. Our forensic accountants reconstruct your financial position.
                </p>
                <div className="bg-card p-4 rounded-lg border border-border">
                  <h4 className="font-semibold mb-2 text-sm">What We Analyse:</h4>
                  <ul className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <li>• Bank statement reconciliation</li>
                    <li>• Cash flow vs declared income</li>
                    <li>• VAT input/output analysis</li>
                    <li>• PAYE compliance verification</li>
                    <li>• Expense classifications</li>
                    <li>• Related party transactions</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex items-start space-x-8">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-gradient-to-r from-navy to-navy-light rounded-lg flex items-center justify-center">
                  <Scale className="h-10 w-10 text-primary-foreground" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <h3 className="text-2xl font-bold">5. HMRC Negotiation & Defence</h3>
                  <span className="bg-gold/10 text-gold px-3 py-1 rounded-full text-xs font-semibold">Months 1-6</span>
                </div>
                <p className="text-muted-foreground mb-4">
                  We handle all communication with HMRC. Our team submits technical responses, negotiates penalties, 
                  and fights for the best possible outcome. You're kept informed at every stage.
                </p>
                <div className="bg-card p-4 rounded-lg border border-border">
                  <h4 className="font-semibold mb-2 text-sm">Defence Strategy Includes:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-gold mt-0.5 mr-2 flex-shrink-0" />
                      <span>Initial response establishing legal privilege (if solicitor involved)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-gold mt-0.5 mr-2 flex-shrink-0" />
                      <span>Controlled disclosure of documents and information</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-gold mt-0.5 mr-2 flex-shrink-0" />
                      <span>Technical submissions and calculations</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-gold mt-0.5 mr-2 flex-shrink-0" />
                      <span>Penalty mitigation arguments</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-gold mt-0.5 mr-2 flex-shrink-0" />
                      <span>Settlement negotiations</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Step 6 */}
            <div className="flex items-start space-x-8">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-gradient-to-r from-navy to-navy-light rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-10 w-10 text-primary-foreground" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <h3 className="text-2xl font-bold">6. Settlement & Resolution</h3>
                  <span className="bg-gold/10 text-gold px-3 py-1 rounded-full text-xs font-semibold">Final stage</span>
                </div>
                <p className="text-muted-foreground mb-4">
                  We secure the best possible settlement with HMRC. Penalties are minimised, payment plans arranged if needed, 
                  and criminal risk eliminated. Your case is closed and your business protected.
                </p>
                <div className="bg-gold/10 p-4 rounded-lg border border-gold/30">
                  <h4 className="font-semibold mb-2 text-sm">Average Client Outcomes:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-gold mt-0.5 mr-2 flex-shrink-0" />
                      <span><strong>73% penalty reduction</strong> vs unrepresented taxpayers</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-gold mt-0.5 mr-2 flex-shrink-0" />
                      <span><strong>100% criminal charges avoided</strong> when solicitor involved from start</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-gold mt-0.5 mr-2 flex-shrink-0" />
                      <span><strong>6 months average</strong> investigation duration (vs 18 months unrepresented)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Human Review Matters */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Why Human Review Matters</h2>
            <p className="text-center text-muted-foreground mb-12">
              Technology provides speed and efficiency, but humans provide judgement and expertise
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="text-xl font-bold mb-4">Technology Strengths</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-gold mt-0.5 mr-2 flex-shrink-0" />
                    <span>Rapid pattern recognition across thousands of cases</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-gold mt-0.5 mr-2 flex-shrink-0" />
                    <span>Extract and categorise data quickly</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-gold mt-0.5 mr-2 flex-shrink-0" />
                    <span>Risk assessment based on historical data</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-gold mt-0.5 mr-2 flex-shrink-0" />
                    <span>Generate comprehensive checklists and frameworks</span>
                  </li>
                </ul>
              </div>

              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="text-xl font-bold mb-4">Human Expertise</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-gold mt-0.5 mr-2 flex-shrink-0" />
                    <span>Strategic defence planning and negotiation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-gold mt-0.5 mr-2 flex-shrink-0" />
                    <span>Understanding nuance, context, and intent</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-gold mt-0.5 mr-2 flex-shrink-0" />
                    <span>Legal interpretation and privilege decisions</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-gold mt-0.5 mr-2 flex-shrink-0" />
                    <span>Client relationship and personalised communication</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Defence?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Get advanced analysis tools combined with expert human guidance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="danger" size="lg">
              <Link to="/get-started">Get Started Now</Link>
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

export default HowItWorks;
