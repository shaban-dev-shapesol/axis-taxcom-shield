import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Upload, Scan, FileSearch, BarChart, CheckCircle, Lock } from "lucide-react";
import aiImage from "@/assets/ai-pipeline.jpg";

const AIPipeline = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative bg-primary text-primary-foreground">
        <div className="absolute inset-0 opacity-20">
          <img src={aiImage} alt="AI Pipeline" className="w-full h-full object-cover" />
        </div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Advanced HMRC Letter Analysis <span className="text-gold">In Minutes</span>
            </h1>
            <p className="text-xl text-primary-foreground/80 mb-8">
              Upload your HMRC letter. Our systems extract data, assess risk, generate document lists, 
              and create defence strategies—all in real-time.
            </p>
            <Button asChild variant="danger" size="lg">
              <Link to="/get-started">Upload Your Letter</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">The Document Processing Pipeline</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            From HMRC letter to actionable defence strategy in under 5 minutes
          </p>

          <div className="max-w-5xl mx-auto space-y-12">
            {/* Step 1 */}
            <div className="flex items-start space-x-8">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-gradient-to-r from-navy to-navy-light rounded-lg flex items-center justify-center">
                  <Upload className="h-10 w-10 text-primary-foreground" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <h3 className="text-2xl font-bold">Step 1: Upload HMRC Document</h3>
                  <span className="bg-gold/10 text-gold px-3 py-1 rounded-full text-xs font-semibold">30 seconds</span>
                </div>
                <p className="text-muted-foreground mb-4">
                  Upload your HMRC investigation letter, notice, or email as PDF, JPG, PNG, or DOCX. 
                  Our system accepts all common document formats.
                </p>
                <div className="bg-card p-4 rounded-lg border border-border">
                  <h4 className="font-semibold mb-2 text-sm">Accepted Documents:</h4>
                  <ul className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <li>• Investigation opening letters</li>
                    <li>• Code of Practice 8 or 9 notices</li>
                    <li>• Information requests</li>
                    <li>• Aspect enquiry notices</li>
                    <li>• VAT/PAYE/CIS check letters</li>
                    <li>• Settlement proposals</li>
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
                  <h3 className="text-2xl font-bold">Step 2: OCR Data Extraction</h3>
                  <span className="bg-gold/10 text-gold px-3 py-1 rounded-full text-xs font-semibold">1 minute</span>
                </div>
                <p className="text-muted-foreground mb-4">
                  Our Optical Character Recognition (OCR) system extracts all text from your document with 99.8% accuracy. 
                  This includes structured and unstructured data.
                </p>
                <div className="bg-card p-4 rounded-lg border border-border">
                  <h4 className="font-semibold mb-2 text-sm">Extracted Information:</h4>
                  <ul className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <li>• Investigation type and reference</li>
                    <li>• Tax periods under review</li>
                    <li>• Specific concerns raised</li>
                    <li>• Response deadlines</li>
                    <li>• HMRC contact details</li>
                    <li>• Key phrases and terminology</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start space-x-8">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-gradient-to-r from-navy to-navy-light rounded-lg flex items-center justify-center">
                  <BarChart className="h-10 w-10 text-primary-foreground" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <h3 className="text-2xl font-bold">Step 3: Automated Risk Assessment</h3>
                  <span className="bg-gold/10 text-gold px-3 py-1 rounded-full text-xs font-semibold">2 minutes</span>
                </div>
                <p className="text-muted-foreground mb-4">
                  Our systems analyse the extracted data against a database of historical HMRC investigations. 
                  It assigns a risk score and identifies key threats.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-danger/5 p-4 rounded-lg border border-danger/20">
                    <h4 className="font-semibold mb-2 text-sm text-danger">High Risk Indicators</h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• COP 9 criminal investigation</li>
                      <li>• Fraud allegations present</li>
                      <li>• Interview under caution requested</li>
                      <li>• Asset freezing mentioned</li>
                    </ul>
                  </div>
                  <div className="bg-gold/5 p-4 rounded-lg border border-gold/20">
                    <h4 className="font-semibold mb-2 text-sm text-gold">Medium/Low Risk Indicators</h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Standard aspect enquiry</li>
                      <li>• Information request only</li>
                      <li>• Technical clarification needed</li>
                      <li>• Routine compliance check</li>
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
                  <h3 className="text-2xl font-bold">Step 4: Document List Generation</h3>
                  <span className="bg-gold/10 text-gold px-3 py-1 rounded-full text-xs font-semibold">1 minute</span>
                </div>
                <p className="text-muted-foreground mb-4">
                  Based on the investigation type and HMRC's requests, our systems generate a comprehensive list 
                  of documents you'll need to provide.
                </p>
                <div className="bg-card p-4 rounded-lg border border-border">
                  <h4 className="font-semibold mb-2 text-sm">Typical Document Requirements:</h4>
                  <ul className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <li>• Bank statements (business & personal)</li>
                    <li>• VAT returns and records</li>
                    <li>• Sales invoices and receipts</li>
                    <li>• Purchase invoices and records</li>
                    <li>• Payroll records (if applicable)</li>
                    <li>• Bookkeeping records</li>
                    <li>• Tax computations</li>
                    <li>• Company accounts</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex items-start space-x-8">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-gradient-to-r from-navy to-navy-light rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-10 w-10 text-primary-foreground" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <h3 className="text-2xl font-bold">Step 5: Defence Script Creation</h3>
                  <span className="bg-gold/10 text-gold px-3 py-1 rounded-full text-xs font-semibold">30 seconds</span>
                </div>
                <p className="text-muted-foreground mb-4">
                  Our systems generate a detailed action plan and defence script for your accountant or solicitor. 
                  This includes response templates, timelines, and strategy recommendations.
                </p>
                <div className="bg-card p-4 rounded-lg border border-border">
                  <h4 className="font-semibold mb-2 text-sm">Script Includes:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-gold mt-0.5 mr-2 flex-shrink-0" />
                      <span>Recommended first response to HMRC</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-gold mt-0.5 mr-2 flex-shrink-0" />
                      <span>Timeline for document submission</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-gold mt-0.5 mr-2 flex-shrink-0" />
                      <span>Key arguments and defence angles</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-gold mt-0.5 mr-2 flex-shrink-0" />
                      <span>When to involve solicitor (if criminal risk)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start space-x-6">
              <Lock className="h-12 w-12 text-gold flex-shrink-0" />
              <div>
                <h2 className="text-3xl font-bold mb-4">GDPR-Secure & Encrypted</h2>
                <p className="text-muted-foreground mb-6">
                  Your documents and data are protected by military-grade encryption. All processing happens 
                  in secure UK data centres with ISO 27001 certification. We are fully GDPR compliant.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">End-to-end encryption (AES-256)</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">Data deleted after case completion</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">ISO 27001 certified infrastructure</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">UK-based secure data centres</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">Full GDPR compliance</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">Secure access logs and audit trails</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Technology + Human */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Technology + Human Review?</h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-card p-6 rounded-lg border border-border">
              <h3 className="text-xl font-bold mb-4">What Technology Does Best</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-gold mt-0.5 mr-2 flex-shrink-0" />
                  <span>Rapid pattern recognition across thousands of cases</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-gold mt-0.5 mr-2 flex-shrink-0" />
                  <span>Extract and categorise data efficiently</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-gold mt-0.5 mr-2 flex-shrink-0" />
                  <span>Risk assessment based on historical data</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-gold mt-0.5 mr-2 flex-shrink-0" />
                  <span>Generate comprehensive document checklists</span>
                </li>
              </ul>
            </div>

            <div className="bg-card p-6 rounded-lg border border-border">
              <h3 className="text-xl font-bold mb-4">What Humans Do Best</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-gold mt-0.5 mr-2 flex-shrink-0" />
                  <span>Strategic defence planning and negotiation</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-gold mt-0.5 mr-2 flex-shrink-0" />
                  <span>Understanding nuance and context</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-gold mt-0.5 mr-2 flex-shrink-0" />
                  <span>Legal interpretation and privilege decisions</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-gold mt-0.5 mr-2 flex-shrink-0" />
                  <span>Client relationship and communication</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="max-w-3xl mx-auto mt-8 p-6 bg-gold/10 rounded-lg border border-gold/30 text-center">
            <p className="font-semibold">
              Technology provides the speed and efficiency. Humans provide the judgement and expertise. 
              Together, they create the most powerful HMRC defence available.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Get Your HMRC Letter Analysed Now
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Upload your letter and receive instant analysis, risk assessment, and defence strategy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="danger" size="lg">
              <Link to="/get-started">Upload Letter Now</Link>
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

export default AIPipeline;
