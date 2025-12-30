import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Testimonials } from "@/components/Testimonials";
import { SEO } from "@/components/SEO";
import { CTASection } from "@/components/CTASection";
import { PartnershipBanner } from "@/components/PartnershipBanner";
import { Link } from "react-router-dom";
import {
  Shield,
  Scale,
  CheckCircle,
  Clock,
  Award,
  Brain,
  FileCheck,
  Briefcase,
  BookOpen,
  ShieldCheck,
  Lock,
  Calendar,
  ArrowRight,
  Tag,
} from "lucide-react";
import heroImage from "@/assets/hero-investigation.jpg";
import blogHmrcImage from "@/assets/blog-hmrc-investigation.jpg";
import blogPreComplianceImage from "@/assets/blog-pre-compliance.jpg";
import blogLegalPrivilegeImage from "@/assets/blog-legal-privilege.jpg";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const blogPosts = [
  {
    id: "understanding-hmrc-investigations",
    title: "Understanding HMRC Investigations: What You Need to Know",
    excerpt: "A comprehensive guide to HMRC investigation triggers, processes, and how to protect yourself from the outset.",
    category: "HMRC Investigations",
    date: "March 15, 2024",
    readTime: "8 min read",
    image: blogHmrcImage,
  },
  {
    id: "pre-compliance-benefits",
    title: "The Benefits of Pre-Compliance Reviews for Your Business",
    excerpt: "Discover how proactive compliance checks can save you thousands and prevent HMRC investigations before they start.",
    category: "Pre-Compliance",
    date: "March 10, 2024",
    readTime: "6 min read",
    image: blogPreComplianceImage,
  },
  {
    id: "legal-privilege-tax-cases",
    title: "Legal Privilege in Tax Cases: Why It Matters",
    excerpt: "Understanding the critical role of legal professional privilege when facing HMRC scrutiny and criminal investigations.",
    category: "Legal Defence",
    date: "March 5, 2024",
    readTime: "10 min read",
    image: blogLegalPrivilegeImage,
  },
];

const Index = () => {
  const heroSection = useScrollAnimation();
  const urgencySection = useScrollAnimation();
  const whySection = useScrollAnimation();
  const pillarsSection = useScrollAnimation();
  const trackRecordSection = useScrollAnimation();
  const credentialsSection = useScrollAnimation();
  const servicesSection = useScrollAnimation();
  const blogSection = useScrollAnimation();
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Home"
        description="Investigation.tax - The UK's leading HMRC investigation defence team. Chartered Accountants and Business Crime Solicitors working together to protect your business from HMRC."
      />
      <Header />

      {/* Hero Section */}
      <section
        ref={heroSection.ref}
        className={`relative bg-muted/30 overflow-hidden min-h-[90vh] flex flex-col justify-center ${heroSection.isVisible ? "animate-fade-in" : "opacity-0"}`}
      >
        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-24 h-24 bg-gold/20 rounded-full hidden lg:block" />
        <div className="absolute bottom-40 right-1/3 w-16 h-16 bg-gold/30 rounded-full hidden lg:block" />
        
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Quote Headline */}
            <div className="relative z-10">
              <div className="inline-flex items-center space-x-2 bg-danger/10 text-danger px-4 py-2 rounded-full mb-6">
                <Clock className="h-4 w-4" />
                <span className="text-sm font-semibold">24-Hour HMRC Crisis Response</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif italic leading-tight mb-8 text-foreground">
                "Protecting
                <br />
                your rights,
                <br />
                securing
                <br />
                <span className="text-gold">your future"</span>
              </h1>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button asChild variant="accent" size="lg" className="shadow-lg">
                  <Link to="/get-started">Get Started Now</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/book">Book Free Assessment</Link>
                </Button>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="relative hidden lg:block">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-gold/20 rounded-full" />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={heroImage} 
                  alt="Professional HMRC Defence Team" 
                  className="w-full h-[500px] object-cover"
                />
              </div>
              {/* Decorative gold accent */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gold rounded-full opacity-80" />
            </div>
          </div>

          {/* Service Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
            <div className="bg-card p-6 rounded-xl shadow-md border border-border hover:shadow-lg transition-smooth">
              <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center mb-4">
                <Scale className="h-5 w-5 text-gold" />
              </div>
              <h3 className="font-bold text-sm mb-1">HMRC Defence</h3>
              <p className="text-xs text-muted-foreground">Full investigation defence & criminal protection</p>
            </div>
            <div className="bg-card p-6 rounded-xl shadow-md border border-border hover:shadow-lg transition-smooth">
              <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-5 w-5 text-gold" />
              </div>
              <h3 className="font-bold text-sm mb-1">Pre-Compliance</h3>
              <p className="text-xs text-muted-foreground">Avoid investigations before they start</p>
            </div>
            <div className="bg-card p-6 rounded-xl shadow-md border border-border hover:shadow-lg transition-smooth">
              <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center mb-4">
                <Briefcase className="h-5 w-5 text-gold" />
              </div>
              <h3 className="font-bold text-sm mb-1">Business Crime</h3>
              <p className="text-xs text-muted-foreground">Solicitors protecting your business</p>
            </div>
            <div className="bg-card p-6 rounded-xl shadow-md border border-border hover:shadow-lg transition-smooth">
              <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center mb-4">
                <Lock className="h-5 w-5 text-gold" />
              </div>
              <h3 className="font-bold text-sm mb-1">Legal Privilege</h3>
              <p className="text-xs text-muted-foreground">Protected communications with HMRC</p>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Banner */}
      <PartnershipBanner variant="accent" size="lg" />

      {/* Urgency Section */}
      <section
        ref={urgencySection.ref}
        className={`py-20 bg-danger/5 border-y border-danger/20 ${urgencySection.isVisible ? "animate-fade-in-up" : "opacity-0"}`}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Under HMRC Investigation Right Now?</h2>
            <p className="text-xl text-foreground/80 mb-8">
              Every day you wait costs you money, reputation, and control. HMRC will not go easy on you. They are
              trained to maximise settlements and penalties. <strong>You need us immediately.</strong>
            </p>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-card p-6 rounded-lg border border-danger/20 transition-smooth hover:scale-105 hover:shadow-lg">
                <h3 className="font-bold text-lg mb-3 text-danger">What Happens If You Do Nothing</h3>
                <ul className="text-left space-y-2 text-sm text-muted-foreground">
                  <li>• HMRC assumes guilt and maximises penalties</li>
                  <li>• You may incriminate yourself unknowingly</li>
                  <li>• Criminal prosecution becomes more likely</li>
                  <li>• Your assets could be frozen</li>
                  <li>• Your business reputation is destroyed</li>
                </ul>
              </div>
              <div className="bg-card p-6 rounded-lg border border-gold/40 transition-smooth hover:scale-105 hover:shadow-lg">
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

      {/* Services Overview */}
      <section
        ref={servicesSection.ref}
        className={`py-20 bg-navy text-primary-foreground ${servicesSection.isVisible ? "animate-fade-in-up" : "opacity-0"}`}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto">
              From prevention to full criminal defence
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-card/10 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-primary-foreground/20 transition-smooth hover:scale-105 hover:shadow-xl flex flex-col h-full">
              <Award className="h-10 w-10 text-gold mb-4" />
              <h3 className="text-2xl font-bold mb-4">HMRC Investigation Defence</h3>
              <p className="text-primary-foreground/80 mb-4 flex-grow">
                Full-spectrum defence for all HMRC investigation types: Aspect Enquiries, Full Enquiries, Code of
                Practice 8 & 9, VAT/PAYE/CIS checks, and criminal prosecutions.
              </p>
              <Button asChild variant="accent" className="mt-auto">
                <Link to="/investigations">Learn More →</Link>
              </Button>
            </div>

            <div className="bg-card/10 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-primary-foreground/20 transition-smooth hover:scale-105 hover:shadow-xl flex flex-col h-full">
              <Shield className="h-10 w-10 text-gold mb-4" />
              <h3 className="text-2xl font-bold mb-4">Pre-Compliance Protection</h3>
              <p className="text-primary-foreground/80 mb-4 flex-grow">
                Avoid investigation entirely. Risk scanning of your VAT, PAYE, CIS, and bookkeeping to detect red flags
                before HMRC does.
              </p>
              <Button asChild variant="accent" className="mt-auto">
                <Link to="/pre-compliance">Learn More →</Link>
              </Button>
            </div>

            <div className="bg-card/10 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-primary-foreground/20 transition-smooth hover:scale-105 hover:shadow-xl flex flex-col h-full">
              <Scale className="h-10 w-10 text-gold mb-4" />
              <h3 className="text-2xl font-bold mb-4">Case Studies & Wins</h3>
              <p className="text-primary-foreground/80 mb-4 flex-grow">
                Real results from real clients: restaurants, consultants, landlords, and contractors. See how we saved
                businesses from HMRC penalties and criminal prosecution.
              </p>
              <Button asChild variant="accent" className="mt-auto">
                <Link to="/case-studies">View Cases →</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Investigation.tax Section */}
      <section
        ref={whySection.ref}
        className={`py-20 bg-background overflow-hidden ${whySection.isVisible ? "animate-fade-in-up" : "opacity-0"}`}
      >
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Image with curved corner */}
            <div className="relative">
              <p className="text-muted-foreground mb-6 max-w-md">
                The only firm in the UK combining Chartered Accountants and Business Crime Solicitors under one roof.
              </p>
              <Button asChild variant="accent" size="lg" className="mb-8">
                <Link to="/about">Explore Our Team</Link>
              </Button>
              <div className="relative">
                <div className="overflow-hidden rounded-tr-[100px] rounded-bl-lg rounded-tl-lg rounded-br-lg">
                  <img 
                    src={heroImage} 
                    alt="Professional HMRC Investigation Defence Team" 
                    className="w-full h-[400px] object-cover"
                  />
                </div>
                {/* Decorative curved element */}
                <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-accent/20 rounded-full -z-10" />
              </div>
            </div>

            {/* Right Side - Title and Numbered Points */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-10">
                Why Choose Us for
                <br />
                <span className="text-accent">Expert HMRC Defence</span>
              </h2>

              <div className="space-y-8">
                {/* Point 01 */}
                <div className="flex items-start gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-12 bg-accent rounded-full" />
                    <span className="text-3xl font-bold text-accent">01</span>
                  </div>
                  <div className="pt-1">
                    <h3 className="font-bold text-lg mb-1">Dual Expertise Under One Roof</h3>
                    <p className="text-muted-foreground">
                      Accountants handle the numbers, solicitors handle the law. You get both without coordination delays or conflicting advice.
                    </p>
                  </div>
                </div>

                {/* Point 02 */}
                <div className="flex items-start gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-12 bg-gold rounded-full" />
                    <span className="text-3xl font-bold text-gold">02</span>
                  </div>
                  <div className="pt-1">
                    <h3 className="font-bold text-lg mb-1">24-Hour Crisis Response</h3>
                    <p className="text-muted-foreground">
                      When HMRC strikes, every hour counts. We mobilise immediately with accountants and solicitors working in parallel.
                    </p>
                  </div>
                </div>

                {/* Point 03 */}
                <div className="flex items-start gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-12 bg-accent rounded-full" />
                    <span className="text-3xl font-bold text-accent">03</span>
                  </div>
                  <div className="pt-1">
                    <h3 className="font-bold text-lg mb-1">Legal Privilege Protection</h3>
                    <p className="text-muted-foreground">
                      Our solicitors protect everything you share under legal privilege. HMRC cannot force disclosure of our communications.
                    </p>
                  </div>
                </div>

                {/* Point 04 */}
                <div className="flex items-start gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-12 bg-gold rounded-full" />
                    <span className="text-3xl font-bold text-gold">04</span>
                  </div>
                  <div className="pt-1">
                    <h3 className="font-bold text-lg mb-1">Proven Track Record</h3>
                    <p className="text-muted-foreground">
                      Millions saved for clients. Criminal prosecutions avoided. Settlements reduced by 40-80%.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Pillars */}
      <section
        ref={pillarsSection.ref}
        className={`py-20 bg-muted/30 ${pillarsSection.isVisible ? "animate-fade-in-up" : "opacity-0"}`}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why We Win Against HMRC</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Three forces combined into one unstoppable defence strategy
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-xl shadow-lg border border-border hover:shadow-xl transition-smooth hover:scale-105">
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

            <div className="bg-card p-8 rounded-xl shadow-lg border border-border hover:shadow-xl transition-smooth hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-r from-navy to-navy-light rounded-lg flex items-center justify-center mb-6">
                <FileCheck className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Chartered Accountants</h3>
              <p className="text-muted-foreground mb-4">
                Expert forensic analysis of your books, VAT, PAYE, and CIS records. We speak HMRC's language and know
                exactly what they're looking for.
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

            <div className="bg-card p-8 rounded-xl shadow-lg border border-border hover:shadow-xl transition-smooth hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-r from-navy to-navy-light rounded-lg flex items-center justify-center mb-6">
                <Brain className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Technology & Systems</h3>
              <p className="text-muted-foreground mb-4">
                Advanced document processing and analysis tools to quickly assess your case, identify risks, and prepare
                defence strategies. GDPR-secure and encrypted.
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
      <section
        ref={trackRecordSection.ref}
        className={`py-20 bg-navy text-primary-foreground ${trackRecordSection.isVisible ? "animate-scale-in" : "opacity-0"}`}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Track Record</h2>
            <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto">
              Numbers that prove we deliver results when it matters most
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-gold mb-2">£950M+</div>
              <p className="text-lg text-primary-foreground/80">Total Saved for Clients</p>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-gold mb-2">400+</div>
              <p className="text-lg text-primary-foreground/80">Cases Successfully Defended</p>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-gold mb-2">95%</div>
              <p className="text-lg text-primary-foreground/80">Criminal Prosecutions Avoided</p>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-gold mb-2">24hrs</div>
              <p className="text-lg text-primary-foreground/80">Average Crisis Response Time</p>
            </div>
          </div>
          <div className="mt-12 text-center">
            <p className="text-lg text-primary-foreground/60 italic">
              "Average penalty reduction of 70-80% across all investigation types"
            </p>
          </div>
        </div>
      </section>

      {/* Credentials & Certifications Section */}
      <section
        ref={credentialsSection.ref}
        className={`py-20 bg-muted/30 ${credentialsSection.isVisible ? "animate-fade-in-up" : "opacity-0"}`}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Credentials & Certifications</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Qualified, regulated, and trusted to defend your business
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-card p-8 rounded-xl border border-border text-center transition-smooth hover:scale-105 hover:shadow-lg">
              <div className="w-16 h-16 bg-navy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-navy" />
              </div>
              <h3 className="text-xl font-bold mb-2">Chartered Accountants</h3>
              <p className="text-sm text-muted-foreground">
                ICAEW qualified with specialist tax investigation expertise
              </p>
            </div>
            <div className="bg-card p-8 rounded-xl border border-border text-center transition-smooth hover:scale-105 hover:shadow-lg">
              <div className="w-16 h-16 bg-navy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-8 w-8 text-navy" />
              </div>
              <h3 className="text-xl font-bold mb-2">Solicitors Regulation Authority</h3>
              <p className="text-sm text-muted-foreground">
                SRA regulated business crime solicitors with litigation rights
              </p>
            </div>
            <div className="bg-card p-8 rounded-xl border border-border text-center transition-smooth hover:scale-105 hover:shadow-lg">
              <div className="w-16 h-16 bg-navy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-navy" />
              </div>
              <h3 className="text-xl font-bold mb-2">Law Society Members</h3>
              <p className="text-sm text-muted-foreground">
                Full membership with specialist criminal defence accreditation
              </p>
            </div>
            <div className="bg-card p-8 rounded-xl border border-border text-center transition-smooth hover:scale-105 hover:shadow-lg">
              <div className="w-16 h-16 bg-navy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-navy" />
              </div>
              <h3 className="text-xl font-bold mb-2">ISO 27001 Certified</h3>
              <p className="text-sm text-muted-foreground">
                Information security management to protect your sensitive data
              </p>
            </div>
            <div className="bg-card p-8 rounded-xl border border-border text-center transition-smooth hover:scale-105 hover:shadow-lg">
              <div className="w-16 h-16 bg-navy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="h-8 w-8 text-navy" />
              </div>
              <h3 className="text-xl font-bold mb-2">GDPR Compliant</h3>
              <p className="text-sm text-muted-foreground">
                Full compliance with UK data protection and privacy regulations
              </p>
            </div>
            <div className="bg-card p-8 rounded-xl border border-border text-center transition-smooth hover:scale-105 hover:shadow-lg">
              <div className="w-16 h-16 bg-navy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="h-8 w-8 text-navy" />
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
      <Testimonials />

      {/* Blog Section */}
      <section
        ref={blogSection.ref}
        className={`py-20 bg-muted/30 ${blogSection.isVisible ? "animate-fade-in-up" : "opacity-0"}`}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Insights</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Expert advice on HMRC investigations, tax compliance, and business crime defence
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="bg-card border border-border/50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-semibold rounded-full">
                      <Tag className="h-3 w-3" />
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <Link to={`/blog/${post.id}`}>
                    <Button variant="outline" size="sm" className="w-full group/btn">
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild variant="default" size="lg">
              <Link to="/blog">
                View All Articles
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <CTASection
        title="Don't Face HMRC Alone"
        description="Get the combined power of chartered accountants and business crime solicitors on your side."
        primaryButtonText="Get Started Now"
        primaryButtonLink="/get-started"
      />

      <Footer />
    </div>
  );
};
export default Index;
