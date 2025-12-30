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
        className={`relative bg-primary text-primary-foreground overflow-hidden min-h-[90vh] flex flex-col justify-center ${heroSection.isVisible ? "animate-fade-in" : "opacity-0"}`}
      >
        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-24 h-24 bg-gold/20 rounded-full hidden lg:block" />
        <div className="absolute bottom-40 right-1/3 w-16 h-16 bg-gold/30 rounded-full hidden lg:block" />
        
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Headline */}
            <div className="relative z-10">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Stop HMRC Investigations
                <br />
                <span className="text-gold">Before They Destroy Your Business</span>
              </h1>
              <p className="text-xl text-primary-foreground/80 mb-8 max-w-lg">
                Chartered Accountants & Business Crime Solicitors. The most aggressive HMRC defence team in the UK.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button asChild variant="danger" size="lg">
                  <Link to="/get-started">Fix Your HMRC Problem Now</Link>
                </Button>
                <Button asChild variant="hero" size="lg">
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
            <div className="bg-primary-foreground/10 backdrop-blur-sm p-6 rounded-xl border border-primary-foreground/20 hover:bg-primary-foreground/20 transition-smooth">
              <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center mb-4">
                <Scale className="h-5 w-5 text-gold" />
              </div>
              <h3 className="font-bold text-sm mb-1">HMRC Defence</h3>
              <p className="text-xs text-primary-foreground/70">Full investigation defence & criminal protection</p>
            </div>
            <div className="bg-primary-foreground/10 backdrop-blur-sm p-6 rounded-xl border border-primary-foreground/20 hover:bg-primary-foreground/20 transition-smooth">
              <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-5 w-5 text-gold" />
              </div>
              <h3 className="font-bold text-sm mb-1">Pre-Compliance</h3>
              <p className="text-xs text-primary-foreground/70">Avoid investigations before they start</p>
            </div>
            <div className="bg-primary-foreground/10 backdrop-blur-sm p-6 rounded-xl border border-primary-foreground/20 hover:bg-primary-foreground/20 transition-smooth">
              <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center mb-4">
                <Briefcase className="h-5 w-5 text-gold" />
              </div>
              <h3 className="font-bold text-sm mb-1">Business Crime</h3>
              <p className="text-xs text-primary-foreground/70">Solicitors protecting your business</p>
            </div>
            <div className="bg-primary-foreground/10 backdrop-blur-sm p-6 rounded-xl border border-primary-foreground/20 hover:bg-primary-foreground/20 transition-smooth">
              <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center mb-4">
                <Lock className="h-5 w-5 text-gold" />
              </div>
              <h3 className="font-bold text-sm mb-1">Legal Privilege</h3>
              <p className="text-xs text-primary-foreground/70">Protected communications with HMRC</p>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Banner */}
      <PartnershipBanner variant="accent" size="lg" />

      {/* Urgency Section */}
      <section
        ref={urgencySection.ref}
        className={`py-24 bg-muted/30 relative overflow-hidden ${urgencySection.isVisible ? "animate-fade-in-up" : "opacity-0"}`}
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-danger/5 via-transparent to-transparent" />
        <div className="absolute top-10 left-10 w-32 h-32 bg-danger/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-gold/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-danger/10 rounded-full text-danger text-sm font-semibold mb-6">
                <Clock className="h-4 w-4" />
                Urgent Situation?
              </span>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
                Under HMRC Investigation
                <br />
                <span className="text-accent">Right Now?</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Every day you wait costs you money, reputation, and control. HMRC is trained to maximise settlements. <strong className="text-foreground">You need us immediately.</strong>
              </p>
            </div>

            {/* Comparison Cards - Side by Side */}
            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              {/* Negative Card */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-danger/10 to-danger/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative bg-card p-8 rounded-2xl border border-danger/20 shadow-lg h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-danger/10 rounded-xl flex items-center justify-center">
                      <Clock className="h-6 w-6 text-danger" />
                    </div>
                    <h3 className="text-xl font-bold text-danger">What Happens If You Do Nothing</h3>
                  </div>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-danger/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-danger text-xs">✕</span>
                      </div>
                      <span className="text-muted-foreground">HMRC assumes guilt and maximises penalties</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-danger/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-danger text-xs">✕</span>
                      </div>
                      <span className="text-muted-foreground">You may incriminate yourself unknowingly</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-danger/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-danger text-xs">✕</span>
                      </div>
                      <span className="text-muted-foreground">Criminal prosecution becomes more likely</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-danger/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-danger text-xs">✕</span>
                      </div>
                      <span className="text-muted-foreground">Your assets could be frozen</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-danger/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-danger text-xs">✕</span>
                      </div>
                      <span className="text-muted-foreground">Your business reputation is destroyed</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Positive Card */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-gold/15 to-gold/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative bg-card p-8 rounded-2xl border border-gold/30 shadow-lg h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gold/15 rounded-xl flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-gold" />
                    </div>
                    <h3 className="text-xl font-bold text-gold">What Happens When You Act Now</h3>
                  </div>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-gold/15 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle className="h-3 w-3 text-gold" />
                      </div>
                      <span className="text-muted-foreground">Legal privilege protects your communications</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-gold/15 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle className="h-3 w-3 text-gold" />
                      </div>
                      <span className="text-muted-foreground">We control the narrative from day one</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-gold/15 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle className="h-3 w-3 text-gold" />
                      </div>
                      <span className="text-muted-foreground">Penalties reduced by 40-80% on average</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-gold/15 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle className="h-3 w-3 text-gold" />
                      </div>
                      <span className="text-muted-foreground">Criminal risk eliminated in most cases</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-gold/15 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle className="h-3 w-3 text-gold" />
                      </div>
                      <span className="text-muted-foreground">Your business and reputation protected</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <Button asChild variant="danger" size="lg" className="text-lg px-8 py-6">
                <Link to="/get-started">Start Your Defence Now <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section
        ref={servicesSection.ref}
        className={`py-20 bg-navy text-primary-foreground ${servicesSection.isVisible ? "animate-fade-in-up" : "opacity-0"}`}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16">
            <div>
              <span className="text-gold text-sm font-semibold tracking-wider uppercase mb-2 block">What We Do</span>
              <h2 className="text-3xl md:text-4xl font-bold">Our Services</h2>
            </div>
            <p className="text-primary-foreground/70 max-w-md mt-4 lg:mt-0">
              From prevention to full criminal defence — comprehensive protection at every stage.
            </p>
          </div>
          
          {/* Horizontal Cards Layout */}
          <div className="space-y-6 max-w-6xl mx-auto">
            {/* Card 1 - HMRC Investigation Defence */}
            <div className="group relative bg-gradient-to-r from-gold/15 via-gold/10 to-transparent backdrop-blur-sm rounded-2xl border border-gold/30 overflow-hidden transition-smooth hover:border-gold/50">
              <div className="flex flex-col md:flex-row items-stretch">
                <div className="flex-1 p-8 md:p-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gold/20 rounded-xl flex items-center justify-center">
                      <Award className="h-6 w-6 text-gold" />
                    </div>
                    <span className="text-gold text-xs font-semibold tracking-wider uppercase px-3 py-1 bg-gold/10 rounded-full">Featured</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3">HMRC Investigation Defence</h3>
                  <p className="text-primary-foreground/70 mb-6 max-w-xl">
                    Full-spectrum defence for all HMRC investigation types including COP 8 & 9, VAT/PAYE checks, and criminal prosecutions.
                  </p>
                  <div className="flex flex-wrap gap-3 mb-6">
                    <span className="text-xs px-3 py-1.5 bg-primary-foreground/10 rounded-full">24hr Response</span>
                    <span className="text-xs px-3 py-1.5 bg-primary-foreground/10 rounded-full">Legal Privilege</span>
                    <span className="text-xs px-3 py-1.5 bg-primary-foreground/10 rounded-full">Criminal Defence</span>
                  </div>
                  <Button asChild variant="accent" size="lg">
                    <Link to="/investigations">Get Protected <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </div>
                <div className="hidden md:block w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
                <div className="hidden md:flex items-center justify-center p-10 min-w-[200px]">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-gold mb-1">95%</div>
                    <p className="text-sm text-primary-foreground/60">Criminal Cases<br />Avoided</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Cards Row */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Card 2 - Pre-Compliance */}
              <div className="group relative bg-card/10 backdrop-blur-sm p-8 rounded-2xl border border-primary-foreground/20 transition-smooth hover:bg-card/15 hover:border-primary-foreground/30">
                <div className="w-12 h-12 bg-gold/20 rounded-xl flex items-center justify-center mb-5">
                  <Shield className="h-6 w-6 text-gold" />
                </div>
                <h3 className="text-xl font-bold mb-3">Pre-Compliance Protection</h3>
                <p className="text-primary-foreground/70 mb-6">
                  Avoid investigations entirely. We scan your VAT, PAYE, CIS, and bookkeeping to detect red flags before HMRC does.
                </p>
                <Link to="/pre-compliance" className="inline-flex items-center text-gold font-semibold group-hover:underline">
                  Learn More <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Card 3 - Case Studies */}
              <div className="group relative bg-card/10 backdrop-blur-sm p-8 rounded-2xl border border-primary-foreground/20 transition-smooth hover:bg-card/15 hover:border-primary-foreground/30">
                <div className="w-12 h-12 bg-gold/20 rounded-xl flex items-center justify-center mb-5">
                  <Scale className="h-6 w-6 text-gold" />
                </div>
                <h3 className="text-xl font-bold mb-3">Case Studies & Wins</h3>
                <p className="text-primary-foreground/70 mb-6">
                  Real results from real clients. See how we saved businesses from HMRC penalties and criminal prosecution.
                </p>
                <Link to="/case-studies" className="inline-flex items-center text-gold font-semibold group-hover:underline">
                  View Cases <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
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

      {/* Three Pillars - Why We Win */}
      <section
        ref={pillarsSection.ref}
        className={`py-20 bg-muted/30 ${pillarsSection.isVisible ? "animate-fade-in-up" : "opacity-0"}`}
      >
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Content */}
            <div>
              <span className="text-accent text-sm font-semibold tracking-wider uppercase mb-2 block">Our Advantage</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why We Win
                <br />
                <span className="text-accent">Against HMRC</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-10">
                Three forces combined into one unstoppable defence strategy that HMRC rarely sees.
              </p>

              {/* Accordion-style Cards */}
              <div className="space-y-4">
                <div className="group bg-card rounded-xl border border-border overflow-hidden transition-smooth hover:shadow-lg hover:border-accent/30">
                  <div className="flex items-center gap-4 p-6">
                    <div className="w-14 h-14 bg-navy rounded-xl flex items-center justify-center flex-shrink-0">
                      <Scale className="h-7 w-7 text-gold" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-1">Business Crime Solicitors</h3>
                      <p className="text-sm text-muted-foreground">Legal privilege & courtroom-ready criminal defence</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
                  </div>
                </div>

                <div className="group bg-card rounded-xl border border-border overflow-hidden transition-smooth hover:shadow-lg hover:border-accent/30">
                  <div className="flex items-center gap-4 p-6">
                    <div className="w-14 h-14 bg-navy rounded-xl flex items-center justify-center flex-shrink-0">
                      <FileCheck className="h-7 w-7 text-gold" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-1">Chartered Accountants</h3>
                      <p className="text-sm text-muted-foreground">Forensic analysis & technical tax submissions</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
                  </div>
                </div>

                <div className="group bg-card rounded-xl border border-border overflow-hidden transition-smooth hover:shadow-lg hover:border-accent/30">
                  <div className="flex items-center gap-4 p-6">
                    <div className="w-14 h-14 bg-navy rounded-xl flex items-center justify-center flex-shrink-0">
                      <Brain className="h-7 w-7 text-gold" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-1">Technology & Systems</h3>
                      <p className="text-sm text-muted-foreground">Advanced document processing & risk assessment</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Feature Highlights */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-navy text-primary-foreground p-6 rounded-2xl">
                  <CheckCircle className="h-8 w-8 text-gold mb-4" />
                  <h4 className="font-bold mb-2">Legal Privilege</h4>
                  <p className="text-sm text-primary-foreground/70">All communications protected from HMRC disclosure</p>
                </div>
                <div className="bg-card p-6 rounded-2xl border border-border mt-8">
                  <CheckCircle className="h-8 w-8 text-accent mb-4" />
                  <h4 className="font-bold mb-2">Criminal Defence</h4>
                  <p className="text-sm text-muted-foreground">Courtroom-ready representation when stakes are highest</p>
                </div>
                <div className="bg-card p-6 rounded-2xl border border-border">
                  <CheckCircle className="h-8 w-8 text-accent mb-4" />
                  <h4 className="font-bold mb-2">Forensic Analysis</h4>
                  <p className="text-sm text-muted-foreground">Deep dive into VAT, PAYE, CIS records</p>
                </div>
                <div className="bg-navy text-primary-foreground p-6 rounded-2xl mt-8">
                  <CheckCircle className="h-8 w-8 text-gold mb-4" />
                  <h4 className="font-bold mb-2">GDPR Secure</h4>
                  <p className="text-sm text-primary-foreground/70">Encrypted systems protecting your data</p>
                </div>
              </div>
              {/* Decorative element */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
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
        className={`py-20 bg-background ${credentialsSection.isVisible ? "animate-fade-in-up" : "opacity-0"}`}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header Row */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
              <div>
                <span className="text-accent text-sm font-semibold tracking-wider uppercase mb-2 block">Trust & Authority</span>
                <h2 className="text-3xl md:text-4xl font-bold">Credentials & Certifications</h2>
              </div>
              <p className="text-muted-foreground max-w-md mt-4 md:mt-0">
                Qualified, regulated, and trusted to defend your business.
              </p>
            </div>

            {/* Two-column layout */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Professional Qualifications */}
              <div className="bg-navy text-primary-foreground p-8 rounded-2xl">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Award className="h-5 w-5 text-gold" />
                  Professional Qualifications
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-primary-foreground/5 rounded-xl">
                    <div className="w-10 h-10 bg-gold/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="h-5 w-5 text-gold" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Chartered Accountants</h4>
                      <p className="text-sm text-primary-foreground/70">ICAEW qualified with specialist tax investigation expertise</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-primary-foreground/5 rounded-xl">
                    <div className="w-10 h-10 bg-gold/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Briefcase className="h-5 w-5 text-gold" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Solicitors Regulation Authority</h4>
                      <p className="text-sm text-primary-foreground/70">SRA regulated business crime solicitors with litigation rights</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-primary-foreground/5 rounded-xl">
                    <div className="w-10 h-10 bg-gold/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <BookOpen className="h-5 w-5 text-gold" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Law Society Members</h4>
                      <p className="text-sm text-primary-foreground/70">Full membership with specialist criminal defence accreditation</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Certifications */}
              <div className="bg-card border border-border p-8 rounded-2xl">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-accent" />
                  Security Certifications
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-xl">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Shield className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">ISO 27001 Certified</h4>
                      <p className="text-sm text-muted-foreground">Information security management to protect your sensitive data</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-xl">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <ShieldCheck className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">GDPR Compliant</h4>
                      <p className="text-sm text-muted-foreground">Full compliance with UK data protection and privacy regulations</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-xl">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Lock className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Cyber Essentials Plus</h4>
                      <p className="text-sm text-muted-foreground">Advanced cybersecurity certification protecting client confidentiality</p>
                    </div>
                  </div>
                </div>
              </div>
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
