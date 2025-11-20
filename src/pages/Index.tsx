import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { Shield, Scale, CheckCircle, Clock, Award, Brain } from "lucide-react";
import heroImage from "@/assets/hero-investigation.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={heroImage} alt="HMRC Investigation Defence" className="w-full h-full object-cover" />
        </div>
        <div className="relative container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-4xl">
            <div className="inline-flex items-center space-x-2 bg-danger/10 text-danger px-4 py-2 rounded-full mb-6">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-semibold">24-Hour HMRC Crisis Response Available</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Stop HMRC Investigations<br />
              <span className="text-gold">Before They Destroy Your Business</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/80 mb-8 max-w-2xl">
              Chartered Accountants + Business Crime Solicitors. 
              The most aggressive HMRC defence team in the UK.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild variant="danger" size="lg">
                <Link to="/get-started">Fix Your HMRC Problem Now</Link>
              </Button>
              <Button asChild variant="hero" size="lg">
                <Link to="/book">Book Free 15-Min Assessment</Link>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-6">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-gold" />
                <span className="text-sm">Chartered Accountants</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-gold" />
                <span className="text-sm">Business Crime Solicitors</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-gold" />
                <span className="text-sm">GDPR-Secure Systems</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Urgency Section */}
      <section className="py-20 bg-danger/5 border-y border-danger/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Under HMRC Investigation Right Now?
            </h2>
            <p className="text-xl text-foreground/80 mb-8">
              Every day you wait costs you money, reputation, and control. HMRC will not go easy on you. 
              They are trained to maximise settlements and penalties. <strong>You need us immediately.</strong>
            </p>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-card p-6 rounded-lg border border-danger/20">
                <h3 className="font-bold text-lg mb-3 text-danger">What Happens If You Do Nothing</h3>
                <ul className="text-left space-y-2 text-sm text-muted-foreground">
                  <li>• HMRC assumes guilt and maximises penalties</li>
                  <li>• You may incriminate yourself unknowingly</li>
                  <li>• Criminal prosecution becomes more likely</li>
                  <li>• Your assets could be frozen</li>
                  <li>• Your business reputation is destroyed</li>
                </ul>
              </div>
              <div className="bg-card p-6 rounded-lg border border-gold/40">
                <h3 className="font-bold text-lg mb-3 text-gold">What Happens When You Act Now</h3>
                <ul className="text-left space-y-2 text-sm text-muted-foreground">
                  <li>• Legal privilege protects your communications</li>
                  <li>• We control the narrative from day one</li>
                  <li>• Penalties reduced by 40-80% on average</li>
                  <li>• Criminal risk eliminated in most cases</li>
                  <li>• Your business and reputation protected</li>
                </ul>
              </div>
            </div>
            <Button asChild variant="danger" size="lg">
              <Link to="/get-started">Start Your Defence Now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why AXIS + TAXCOM Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why AXIS + TAXCOM?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The only firm in the UK combining Chartered Accountants and Business Crime Solicitors under one roof
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-card p-6 rounded-xl border border-border">
              <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-gold" />
              </div>
              <h3 className="text-lg font-bold mb-2">Dual Expertise</h3>
              <p className="text-sm text-muted-foreground">
                Accountants handle the numbers, solicitors handle the law. You get both without coordination delays or conflicting advice.
              </p>
            </div>
            <div className="bg-card p-6 rounded-xl border border-border">
              <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-gold" />
              </div>
              <h3 className="text-lg font-bold mb-2">24-Hour Crisis Response</h3>
              <p className="text-sm text-muted-foreground">
                When HMRC strikes, every hour counts. We mobilise immediately with accountants and solicitors working in parallel.
              </p>
            </div>
            <div className="bg-card p-6 rounded-xl border border-border">
              <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center mb-4">
                <Scale className="h-6 w-6 text-gold" />
              </div>
              <h3 className="text-lg font-bold mb-2">Legal Privilege</h3>
              <p className="text-sm text-muted-foreground">
                Our solicitors protect everything you share under legal privilege. HMRC cannot force disclosure of our communications.
              </p>
            </div>
            <div className="bg-card p-6 rounded-xl border border-border">
              <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-gold" />
              </div>
              <h3 className="text-lg font-bold mb-2">Proven Track Record</h3>
              <p className="text-sm text-muted-foreground">
                Millions saved for clients. Criminal prosecutions avoided. Settlements reduced by 40-80%. Results that speak for themselves.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why We Win Against HMRC</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Three forces combined into one unstoppable defence strategy
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-xl shadow-lg border border-border hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-r from-navy to-navy-light rounded-lg flex items-center justify-center mb-6">
                <Scale className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Business Crime Solicitors</h3>
              <p className="text-muted-foreground mb-4">
                When HMRC escalates to criminal investigation (Code of Practice 9), accountants alone cannot defend you. 
                Our solicitors provide legal privilege and courtroom-ready defence.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-gold mt-0.5 mr-2 flex-shrink-0" />
                  <span>Legal privilege protection</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-gold mt-0.5 mr-2 flex-shrink-0" />
                  <span>Criminal defence strategy</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-gold mt-0.5 mr-2 flex-shrink-0" />
                  <span>Court representation</span>
                </li>
              </ul>
            </div>

            <div className="bg-card p-8 rounded-xl shadow-lg border border-border hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-r from-navy to-navy-light rounded-lg flex items-center justify-center mb-6">
                <Shield className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Chartered Accountants</h3>
              <p className="text-muted-foreground mb-4">
                Expert forensic analysis of your books, VAT, PAYE, and CIS records. We speak HMRC's language 
                and know exactly what they're looking for.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-gold mt-0.5 mr-2 flex-shrink-0" />
                  <span>Forensic accounting analysis</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-gold mt-0.5 mr-2 flex-shrink-0" />
                  <span>Technical tax submissions</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-gold mt-0.5 mr-2 flex-shrink-0" />
                  <span>Settlement negotiations</span>
                </li>
              </ul>
            </div>

            <div className="bg-card p-8 rounded-xl shadow-lg border border-border hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-r from-navy to-navy-light rounded-lg flex items-center justify-center mb-6">
                <Shield className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Technology & Systems</h3>
              <p className="text-muted-foreground mb-4">
                Advanced document processing and analysis tools to quickly assess your case, identify risks, 
                and prepare defence strategies. GDPR-secure and encrypted.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-gold mt-0.5 mr-2 flex-shrink-0" />
                  <span>Document extraction & analysis</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-gold mt-0.5 mr-2 flex-shrink-0" />
                  <span>Risk assessment tools</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-gold mt-0.5 mr-2 flex-shrink-0" />
                  <span>Automated document processing</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Track Record Section */}
      <section className="py-20 bg-navy text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Track Record</h2>
            <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto">
              Numbers that prove we deliver results when it matters most
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-gold mb-2">£47M+</div>
              <p className="text-lg text-primary-foreground/80">Total Saved for Clients</p>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-gold mb-2">320+</div>
              <p className="text-lg text-primary-foreground/80">Cases Successfully Defended</p>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-gold mb-2">92%</div>
              <p className="text-lg text-primary-foreground/80">Criminal Prosecutions Avoided</p>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-gold mb-2">24hrs</div>
              <p className="text-lg text-primary-foreground/80">Average Crisis Response Time</p>
            </div>
          </div>
          <div className="mt-12 text-center">
            <p className="text-lg text-primary-foreground/60 italic">
              "Average penalty reduction of 40-80% across all investigation types"
            </p>
          </div>
        </div>
      </section>

      {/* Credentials & Certifications Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Credentials & Certifications</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Qualified, regulated, and trusted to defend your business
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-card p-8 rounded-xl border border-border text-center">
              <div className="w-16 h-16 bg-navy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-navy" />
              </div>
              <h3 className="text-xl font-bold mb-2">Chartered Accountants</h3>
              <p className="text-sm text-muted-foreground">
                ICAEW qualified with specialist tax investigation expertise
              </p>
            </div>
            <div className="bg-card p-8 rounded-xl border border-border text-center">
              <div className="w-16 h-16 bg-navy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Scale className="h-8 w-8 text-navy" />
              </div>
              <h3 className="text-xl font-bold mb-2">Solicitors Regulation Authority</h3>
              <p className="text-sm text-muted-foreground">
                SRA regulated business crime solicitors with litigation rights
              </p>
            </div>
            <div className="bg-card p-8 rounded-xl border border-border text-center">
              <div className="w-16 h-16 bg-navy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-navy" />
              </div>
              <h3 className="text-xl font-bold mb-2">Law Society Members</h3>
              <p className="text-sm text-muted-foreground">
                Full membership with specialist criminal defence accreditation
              </p>
            </div>
            <div className="bg-card p-8 rounded-xl border border-border text-center">
              <div className="w-16 h-16 bg-navy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-navy" />
              </div>
              <h3 className="text-xl font-bold mb-2">ISO 27001 Certified</h3>
              <p className="text-sm text-muted-foreground">
                Information security management to protect your sensitive data
              </p>
            </div>
            <div className="bg-card p-8 rounded-xl border border-border text-center">
              <div className="w-16 h-16 bg-navy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-navy" />
              </div>
              <h3 className="text-xl font-bold mb-2">GDPR Compliant</h3>
              <p className="text-sm text-muted-foreground">
                Full compliance with UK data protection and privacy regulations
              </p>
            </div>
            <div className="bg-card p-8 rounded-xl border border-border text-center">
              <div className="w-16 h-16 bg-navy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-navy" />
              </div>
              <h3 className="text-xl font-bold mb-2">Cyber Essentials Plus</h3>
              <p className="text-sm text-muted-foreground">
                Advanced cybersecurity certification protecting client confidentiality
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Client Testimonials Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real results from real people who faced HMRC investigations
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-card p-8 rounded-xl border border-border">
              <div className="flex items-center mb-4">
                <div className="flex text-gold">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground mb-6 italic">
                "HMRC claimed I owed £340,000. AXIS + TAXCOM got it down to £82,000 and avoided criminal prosecution entirely. 
                Having the solicitor and accountant work together saved my business."
              </p>
              <p className="font-semibold">— Restaurant Owner, London</p>
              <p className="text-sm text-muted-foreground">Code of Practice 9 Investigation</p>
            </div>
            <div className="bg-card p-8 rounded-xl border border-border">
              <div className="flex items-center mb-4">
                <div className="flex text-gold">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground mb-6 italic">
                "I was terrified when I received the COP 9 letter. They responded within 4 hours, 
                took control immediately, and walked me through everything. I cannot recommend them enough."
              </p>
              <p className="font-semibold">— IT Contractor, Manchester</p>
              <p className="text-sm text-muted-foreground">Criminal Tax Investigation</p>
            </div>
            <div className="bg-card p-8 rounded-xl border border-border">
              <div className="flex items-center mb-4">
                <div className="flex text-gold">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground mb-6 italic">
                "The pre-compliance check identified issues before HMRC did. We fixed everything and avoided an investigation altogether. 
                Best money I ever spent."
              </p>
              <p className="font-semibold">— Property Developer, Birmingham</p>
              <p className="text-sm text-muted-foreground">Pre-Compliance Protection</p>
            </div>
          </div>
          <div className="mt-12 text-center">
            <Button asChild variant="default" size="lg">
              <Link to="/case-studies">Read More Case Studies →</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-navy text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-xl text-primary-foreground/70 max-w-3xl mx-auto">
              From prevention to full criminal defence
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-background text-foreground p-8 rounded-xl shadow-lg border border-navy-light">
              <Award className="h-10 w-10 text-gold mb-4" />
              <h3 className="text-2xl font-bold mb-4">HMRC Investigation Defence</h3>
              <p className="text-muted-foreground mb-4">
                Full-spectrum defence for all HMRC investigation types: Aspect Enquiries, Full Enquiries, 
                Code of Practice 8 & 9, VAT/PAYE/CIS checks, and criminal prosecutions.
              </p>
              <Button asChild variant="outline">
                <Link to="/investigations">Learn More →</Link>
              </Button>
            </div>

            <div className="bg-background text-foreground p-8 rounded-xl shadow-lg border border-navy-light">
              <Shield className="h-10 w-10 text-gold mb-4" />
              <h3 className="text-2xl font-bold mb-4">Pre-Compliance Protection</h3>
              <p className="text-muted-foreground mb-4">
                Avoid investigation entirely. AI-powered risk scanning of your VAT, PAYE, CIS, and bookkeeping 
                to detect red flags before HMRC does.
              </p>
              <Button asChild variant="outline">
                <Link to="/pre-compliance">Learn More →</Link>
              </Button>
            </div>

            <div className="bg-background text-foreground p-8 rounded-xl shadow-lg border border-navy-light">
              <Brain className="h-10 w-10 text-gold mb-4" />
              <h3 className="text-2xl font-bold mb-4">AI Document Analysis</h3>
              <p className="text-muted-foreground mb-4">
                Upload your HMRC letter or notice. Our AI uses OCR to extract key data, assess risk, 
                and generate an immediate action plan with required documents.
              </p>
              <Button asChild variant="outline">
                <Link to="/ai-pipeline">Learn More →</Link>
              </Button>
            </div>

            <div className="bg-background text-foreground p-8 rounded-xl shadow-lg border border-navy-light">
              <Scale className="h-10 w-10 text-gold mb-4" />
              <h3 className="text-2xl font-bold mb-4">Case Studies & Wins</h3>
              <p className="text-muted-foreground mb-4">
                Real results from real clients: restaurants, consultants, landlords, and contractors. 
                See how we saved businesses from HMRC penalties and criminal prosecution.
              </p>
              <Button asChild variant="outline">
                <Link to="/case-studies">View Cases →</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-crimson text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Don't Face HMRC Alone
          </h2>
          <p className="text-xl md:text-2xl text-primary-foreground/80 mb-8 max-w-3xl mx-auto">
            Get the combined power of chartered accountants, business crime solicitors, 
            and AI technology on your side.
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

export default Index;
