import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Testimonials } from "@/components/Testimonials";
import { SEO } from "@/components/SEO";
import { CTASection } from "@/components/CTASection";
import { PartnershipBanner } from "@/components/PartnershipBanner";
import { ProcessSection } from "@/components/ProcessSection";
import { ServicesGrid } from "@/components/ServicesGrid";
import { Link } from "react-router-dom";
import {
  Shield,
  Scale,
  CheckCircle,
  Clock,
  Award,
  FileCheck,
  Briefcase,
  BookOpen,
  ShieldCheck,
  Lock,
  Calendar,
  ArrowRight,
  Tag,
  Star,
  Users,
} from "lucide-react";
import heroImage from "@/assets/hero-investigation.jpg";
import teamImage from "@/assets/team-collaboration.jpg";
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
  const blogSection = useScrollAnimation();
  const splitSection = useScrollAnimation();

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Home"
        description="Investigation.tax - The UK's leading HMRC investigation defence team. Chartered Accountants and Business Crime Solicitors working together to protect your business from HMRC."
      />
      <Header />

      {/* Hero Section - Split Layout */}
      <section
        ref={heroSection.ref}
        className={`relative bg-primary min-h-[90vh] ${heroSection.isVisible ? "animate-fade-in" : "opacity-0"}`}
      >
        <div className="grid lg:grid-cols-2 min-h-[90vh]">
          {/* Left - Content */}
          <div className="relative z-10 flex flex-col justify-center px-6 md:px-12 lg:px-16 py-16 lg:py-24">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6">
              Trusted Choice for
              <br />
              <span className="text-gold">HMRC Defence</span> for
              <br />
              over 15 Years
            </h1>
            
            {/* Integrated Testimonial */}
            <div className="mb-8">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-gold text-gold" />
                ))}
              </div>
              <blockquote className="text-primary-foreground/80 italic mb-3">
                "Their expertise and personalized approach made navigating the complex world of HMRC investigations a breeze."
              </blockquote>
              <p className="text-primary-foreground/60 text-sm">
                ~ Mirana V. | Businesswoman
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button asChild variant="danger" size="lg">
                <Link to="/contact">Contact Us</Link>
              </Button>
              <Button asChild variant="hero" size="lg">
                <Link to="/how-it-works">Know More</Link>
              </Button>
            </div>
            
            {/* Partnership Highlight */}
            <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-primary-foreground/20">
              <div className="flex items-center gap-2">
                <Scale className="h-5 w-5 text-gold" />
                <span className="text-primary-foreground text-sm font-medium">Business Crime Solicitors</span>
              </div>
              <div className="flex items-center gap-2">
                <FileCheck className="h-5 w-5 text-gold" />
                <span className="text-primary-foreground text-sm font-medium">Chartered Accountants</span>
              </div>
            </div>
          </div>
          
          {/* Right - Image */}
          <div className="relative hidden lg:block">
            <img 
              src={heroImage} 
              alt="HMRC Investigation Defence Team" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-transparent" />
          </div>
        </div>
      </section>

      {/* Partnership Banner */}
      <PartnershipBanner />

      {/* Stats Section */}
      <section
        ref={urgencySection.ref}
        className={`py-16 bg-muted/30 ${urgencySection.isVisible ? "animate-fade-in-up" : "opacity-0"}`}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <p className="text-lg text-muted-foreground">
              Navigate HMRC Investigations Stress-Free with Our{" "}
              <span className="font-semibold text-foreground">Solicitor & Accountant Partnership</span>
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <p className="font-bold text-lg">15 Years</p>
              <p className="text-xs text-muted-foreground">of Experience</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <p className="font-bold text-lg">5,000+</p>
              <p className="text-xs text-muted-foreground">Satisfied Clients</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <p className="font-bold text-lg">Most Trusted</p>
              <p className="text-xs text-muted-foreground">Tax Defence Provider</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <p className="font-bold text-lg">Industry</p>
              <p className="text-xs text-muted-foreground">Leadership Award</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <p className="font-bold text-lg">Best Corporate</p>
              <p className="text-xs text-muted-foreground">Tax Advisory</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <p className="font-bold text-lg">5-Star</p>
              <p className="text-xs text-muted-foreground">Client Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <ProcessSection />

      {/* Split Image Section */}
      <section
        ref={splitSection.ref}
        className={`py-20 bg-background ${splitSection.isVisible ? "animate-fade-in-up" : "opacity-0"}`}
      >
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img 
                src={teamImage} 
                alt="Smarter Solutions" 
                className="rounded-2xl shadow-xl w-full"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Smarter Solutions,
                <br />
                <span className="text-gold">Bigger Savings</span>
              </h2>
              <p className="text-muted-foreground mb-6">
                Our partnership of <span className="font-semibold text-foreground">Business Crime Solicitors</span> and{" "}
                <span className="font-semibold text-foreground">Chartered Accountants</span> provides a unique advantage that typical firms can't match.
              </p>
              <p className="text-muted-foreground mb-8">
                When your case involves both technical tax issues and legal risk, you need both expertise working together from day one. Our integrated approach means faster responses, unified strategy, and better outcomes.
              </p>
              <Button asChild variant="danger" size="lg">
                <Link to="/how-it-works">Know More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <ServicesGrid />

      {/* What We Can Do Section - Split Layout */}
      <section
        ref={whySection.ref}
        className={`py-20 bg-background ${whySection.isVisible ? "animate-fade-in-up" : "opacity-0"}`}
      >
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative">
                <img 
                  src={heroImage} 
                  alt="What We Can Do" 
                  className="rounded-2xl shadow-xl w-full"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                What We Can Do
                <br />
                to Help You
              </h2>
              <p className="text-muted-foreground mb-6">
                Our <span className="font-semibold text-foreground">Solicitor and Accountant partnership</span> gives you the complete defence you need against HMRC investigations.
              </p>
              <p className="text-muted-foreground mb-6">
                Whether you're facing a routine enquiry or a serious criminal investigation, our dual expertise ensures every angle is covered - from forensic accounting analysis to legal privilege protection.
              </p>
              <p className="text-muted-foreground mb-8">
                We don't just defend you; we protect your business, your reputation, and your future.
              </p>
              <Button asChild variant="danger" size="lg">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Investigation.tax Section */}
      <section
        ref={pillarsSection.ref}
        className={`py-20 bg-primary text-primary-foreground ${pillarsSection.isVisible ? "animate-fade-in-up" : "opacity-0"}`}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Investigation.tax?</h2>
            <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto">
              The only firm combining Chartered Accountants and Business Crime Solicitors as partners
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="bg-primary-foreground/10 backdrop-blur-sm p-6 rounded-xl border border-primary-foreground/20 transition-smooth hover:scale-105 hover:shadow-lg">
              <div className="w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-gold" />
              </div>
              <h3 className="text-lg font-bold mb-2">Dual Partnership</h3>
              <p className="text-sm text-primary-foreground/70">
                Solicitors and Accountants working as partners, not just collaborators.
              </p>
            </div>
            <div className="bg-primary-foreground/10 backdrop-blur-sm p-6 rounded-xl border border-primary-foreground/20 transition-smooth hover:scale-105 hover:shadow-lg">
              <div className="w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-gold" />
              </div>
              <h3 className="text-lg font-bold mb-2">24-Hour Response</h3>
              <p className="text-sm text-primary-foreground/70">
                Crisis response with both legal and accounting expertise immediately.
              </p>
            </div>
            <div className="bg-primary-foreground/10 backdrop-blur-sm p-6 rounded-xl border border-primary-foreground/20 transition-smooth hover:scale-105 hover:shadow-lg">
              <div className="w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-gold" />
              </div>
              <h3 className="text-lg font-bold mb-2">Legal Privilege</h3>
              <p className="text-sm text-primary-foreground/70">
                All communications protected under solicitor-client privilege.
              </p>
            </div>
            <div className="bg-primary-foreground/10 backdrop-blur-sm p-6 rounded-xl border border-primary-foreground/20 transition-smooth hover:scale-105 hover:shadow-lg">
              <div className="w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-gold" />
              </div>
              <h3 className="text-lg font-bold mb-2">Proven Results</h3>
              <p className="text-sm text-primary-foreground/70">
                £950M+ saved for clients with 95% criminal prosecutions avoided.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Track Record Section */}
      <section
        ref={trackRecordSection.ref}
        className={`py-20 bg-muted/30 ${trackRecordSection.isVisible ? "animate-scale-in" : "opacity-0"}`}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Track Record</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Results delivered by our Solicitor & Accountant partnership
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-primary mb-2">£950M+</div>
              <p className="text-lg text-muted-foreground">Total Saved for Clients</p>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-primary mb-2">400+</div>
              <p className="text-lg text-muted-foreground">Cases Successfully Defended</p>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-primary mb-2">95%</div>
              <p className="text-lg text-muted-foreground">Criminal Prosecutions Avoided</p>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-primary mb-2">24hrs</div>
              <p className="text-lg text-muted-foreground">Average Crisis Response Time</p>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials & Certifications Section */}
      <section
        ref={credentialsSection.ref}
        className={`py-20 bg-background ${credentialsSection.isVisible ? "animate-fade-in-up" : "opacity-0"}`}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Credentials & Certifications</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our Solicitors and Accountants are fully qualified and regulated
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-card p-8 rounded-xl border border-border text-center transition-smooth hover:scale-105 hover:shadow-lg">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Chartered Accountants</h3>
              <p className="text-sm text-muted-foreground">
                ICAEW qualified with specialist tax investigation expertise
              </p>
            </div>
            <div className="bg-card p-8 rounded-xl border border-border text-center transition-smooth hover:scale-105 hover:shadow-lg">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Business Crime Solicitors</h3>
              <p className="text-sm text-muted-foreground">
                SRA regulated with litigation rights and criminal defence expertise
              </p>
            </div>
            <div className="bg-card p-8 rounded-xl border border-border text-center transition-smooth hover:scale-105 hover:shadow-lg">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Law Society Members</h3>
              <p className="text-sm text-muted-foreground">
                Full membership with specialist criminal defence accreditation
              </p>
            </div>
            <div className="bg-card p-8 rounded-xl border border-border text-center transition-smooth hover:scale-105 hover:shadow-lg">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">ISO 27001 Certified</h3>
              <p className="text-sm text-muted-foreground">
                Information security management to protect your sensitive data
              </p>
            </div>
            <div className="bg-card p-8 rounded-xl border border-border text-center transition-smooth hover:scale-105 hover:shadow-lg">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">GDPR Compliant</h3>
              <p className="text-sm text-muted-foreground">
                Full compliance with UK data protection and privacy regulations
              </p>
            </div>
            <div className="bg-card p-8 rounded-xl border border-border text-center transition-smooth hover:scale-105 hover:shadow-lg">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="h-8 w-8 text-primary" />
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
              Expert advice from our Solicitor & Accountant partnership
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
        description="Get the combined power of our Solicitor and Accountant partnership on your side."
        primaryButtonText="Get Started Now"
        primaryButtonLink="/get-started"
      />

      <Footer />
    </div>
  );
};
export default Index;
