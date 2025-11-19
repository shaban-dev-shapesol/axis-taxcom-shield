import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, CheckCircle, AlertTriangle, Scan } from "lucide-react";
import preComplianceImage from "@/assets/pre-compliance.jpg";

const PreCompliance = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative bg-primary text-primary-foreground">
        <div className="absolute inset-0 opacity-20">
          <img src={preComplianceImage} alt="Pre-Compliance Protection" className="w-full h-full object-cover" />
        </div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Stop HMRC Investigations <span className="text-gold">Before They Start</span>
            </h1>
            <p className="text-xl text-primary-foreground/80 mb-8">
              AI-powered compliance scanning detects red flags in your tax records before HMRC does. 
              Fix problems proactively, not reactively.
            </p>
            <Button asChild variant="danger" size="lg">
              <Link to="/get-started">Get Pre-Compliance Check</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">The Problem: Most Investigations Are Avoidable</h2>
            <p className="text-lg text-center text-muted-foreground mb-12">
              HMRC uses sophisticated algorithms to detect tax anomalies. These algorithms trigger investigations 
              automatically when patterns match known risk profiles. Most businesses don't know they're at risk until 
              it's too late.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card p-6 rounded-lg border border-danger/20">
                <AlertTriangle className="h-8 w-8 text-danger mb-4" />
                <h3 className="font-bold text-lg mb-2">Reactive Approach (Expensive)</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Wait for HMRC investigation letter</li>
                  <li>• Scramble to gather evidence</li>
                  <li>• Pay penalties and interest</li>
                  <li>• Damage to business reputation</li>
                  <li>• Legal fees for defence</li>
                  <li>• Months or years of stress</li>
                </ul>
              </div>

              <div className="bg-card p-6 rounded-lg border border-gold/40">
                <CheckCircle className="h-8 w-8 text-gold mb-4" />
                <h3 className="font-bold text-lg mb-2">Proactive Approach (Smart)</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Identify issues before HMRC does</li>
                  <li>• Fix problems voluntarily</li>
                  <li>• Zero penalties (or minimal)</li>
                  <li>• No investigation stress</li>
                  <li>• Lower overall costs</li>
                  <li>• Sleep soundly at night</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Check */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What Our Pre-Compliance Check Covers</h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-card p-6 rounded-lg shadow-lg border border-border">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Scan className="h-6 w-6 text-gold mr-2" />
                VAT Compliance Audit
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• VAT return accuracy and consistency</li>
                <li>• Input/output VAT ratio anomalies</li>
                <li>• Reverse charge compliance (construction)</li>
                <li>• Flat rate scheme eligibility</li>
                <li>• Reclaim patterns that trigger investigations</li>
                <li>• Zero-rated and exempt supply classifications</li>
              </ul>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-lg border border-border">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Scan className="h-6 w-6 text-gold mr-2" />
                PAYE & Employment Status
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• IR35 status risk assessment</li>
                <li>• Disguised employment indicators</li>
                <li>• PAYE deduction compliance</li>
                <li>• Benefits in Kind reporting</li>
                <li>• Employee vs contractor classification</li>
                <li>• Payroll record accuracy</li>
              </ul>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-lg border border-border">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Scan className="h-6 w-6 text-gold mr-2" />
                CIS Compliance (Construction)
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• CIS deduction verification</li>
                <li>• Subcontractor status validation</li>
                <li>• Monthly return accuracy</li>
                <li>• Reverse charge VAT compliance</li>
                <li>• Labour-only vs materials classification</li>
                <li>• Verification scheme compliance</li>
              </ul>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-lg border border-border">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Scan className="h-6 w-6 text-gold mr-2" />
                Bookkeeping Integrity
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Missing or incomplete records</li>
                <li>• Cash flow vs declared income analysis</li>
                <li>• Bank statement reconciliation gaps</li>
                <li>• Expense classification accuracy</li>
                <li>• Related party transactions</li>
                <li>• Lifestyle analysis risks</li>
              </ul>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-lg border border-border">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Scan className="h-6 w-6 text-gold mr-2" />
                Property Tax Review
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Capital gains tax calculations</li>
                <li>• Main residence relief claims</li>
                <li>• Rental income declaration accuracy</li>
                <li>• Allowable expense classifications</li>
                <li>• Property disposal reporting</li>
                <li>• Non-resident landlord compliance</li>
              </ul>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-lg border border-border">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Scan className="h-6 w-6 text-gold mr-2" />
                AI Anomaly Detection
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Bank statement pattern analysis</li>
                <li>• Industry benchmark comparison</li>
                <li>• Cash suppression indicators</li>
                <li>• Round number flagging</li>
                <li>• Transaction frequency analysis</li>
                <li>• Risk scoring algorithm</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How Pre-Compliance Checking Works</h2>

          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-12 h-12 bg-gold text-navy rounded-lg flex items-center justify-center font-bold text-xl">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Submit Your Records</h3>
                <p className="text-muted-foreground">
                  Upload your VAT returns, PAYE records, bank statements, and tax submissions via our secure GDPR-compliant portal. 
                  All data is encrypted end-to-end.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-12 h-12 bg-gold text-navy rounded-lg flex items-center justify-center font-bold text-xl">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">AI Scanning & Risk Scoring</h3>
                <p className="text-muted-foreground">
                  Our AI analyses your records against HMRC risk indicators, industry benchmarks, and known investigation triggers. 
                  You receive a comprehensive risk score (low, medium, high, critical).
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-12 h-12 bg-gold text-navy rounded-lg flex items-center justify-center font-bold text-xl">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Chartered Accountant Review</h3>
                <p className="text-muted-foreground">
                  Our chartered accountants review the AI findings and identify specific issues requiring correction. 
                  We provide detailed recommendations for each problem.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-12 h-12 bg-gold text-navy rounded-lg flex items-center justify-center font-bold text-xl">
                4
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Voluntary Disclosure (If Required)</h3>
                <p className="text-muted-foreground">
                  If errors are found, we prepare and submit voluntary disclosures to HMRC. This massively reduces penalties 
                  (often to zero) and prevents formal investigation.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-12 h-12 bg-gold text-navy rounded-lg flex items-center justify-center font-bold text-xl">
                5
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Ongoing Compliance Monitoring</h3>
                <p className="text-muted-foreground">
                  We provide quarterly or annual re-checks to ensure you remain compliant. Continuous monitoring 
                  ensures HMRC has no reason to investigate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Benefits of Pre-Compliance</h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-gold" />
              </div>
              <h3 className="font-bold text-xl mb-2">Zero Investigation Risk</h3>
              <p className="text-muted-foreground text-sm">
                Fix issues before HMRC discovers them. No investigation stress, no penalties.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-gold" />
              </div>
              <h3 className="font-bold text-xl mb-2">Massive Cost Savings</h3>
              <p className="text-muted-foreground text-sm">
                Pre-compliance costs a fraction of investigation defence. Save 90%+ vs reactive approach.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="h-8 w-8 text-gold" />
              </div>
              <h3 className="font-bold text-xl mb-2">Peace of Mind</h3>
              <p className="text-muted-foreground text-sm">
                Sleep soundly knowing your tax affairs are bulletproof and HMRC-compliant.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Avoid Investigation Before It Starts
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Get your pre-compliance check today and fix problems before HMRC finds them.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="danger" size="lg">
              <Link to="/get-started">Get Pre-Compliance Check</Link>
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

export default PreCompliance;
