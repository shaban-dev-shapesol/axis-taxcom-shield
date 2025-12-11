import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { CTASection } from "@/components/CTASection";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import blogHmrcImage from "@/assets/blog-hmrc-investigation.jpg";
import blogPreComplianceImage from "@/assets/blog-pre-compliance.jpg";
import blogLegalPrivilegeImage from "@/assets/blog-legal-privilege.jpg";
import blogVatFraudImage from "@/assets/blog-vat-fraud.jpg";
import blogCashComplianceImage from "@/assets/blog-cash-compliance.jpg";
import blogCriminalProsecutionImage from "@/assets/blog-criminal-prosecution.jpg";

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
  {
    id: "vat-fraud-penalties",
    title: "VAT Fraud Allegations: Penalties and Defence Strategies",
    excerpt: "How to respond to VAT fraud accusations and the importance of immediate expert legal representation.",
    category: "Tax Fraud",
    date: "February 28, 2024",
    readTime: "7 min read",
    image: blogVatFraudImage,
  },
  {
    id: "cash-business-compliance",
    title: "Cash Business Compliance: Avoiding Red Flags",
    excerpt: "Essential compliance tips for cash-heavy businesses to maintain accurate records and avoid HMRC investigations.",
    category: "Compliance",
    date: "February 20, 2024",
    readTime: "5 min read",
    image: blogCashComplianceImage,
  },
  {
    id: "criminal-tax-prosecution",
    title: "When Tax Issues Become Criminal: What to Expect",
    excerpt: "Understanding the transition from civil tax disputes to criminal prosecution and how to mount an effective defence.",
    category: "Criminal Defence",
    date: "February 15, 2024",
    readTime: "9 min read",
    image: blogCriminalProsecutionImage,
  },
];

const Blog = () => {
  const heroSection = useScrollAnimation();
  const postsSection = useScrollAnimation();

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Blog" 
        description="Expert insights and updates on HMRC investigations, tax compliance, and business crime defence from the Investigation.tax team." 
      />
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 px-4 bg-gradient-to-b from-background via-muted/30 to-background overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          
          <div
            ref={heroSection.ref as React.RefObject<HTMLDivElement>}
            className={`max-w-4xl mx-auto text-center relative z-10 transition-all duration-1000 ${
              heroSection.isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Expert Insights & Updates
            </h1>
            <p className="text-xl text-muted-foreground mb-4 leading-relaxed max-w-2xl mx-auto">
              Stay informed with the latest news, strategies, and expert advice on HMRC investigations, tax compliance, and business crime defence.
            </p>
            <div className="h-1 w-32 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section
          ref={postsSection.ref as React.RefObject<HTMLElement>}
          className={`py-16 px-4 transition-all duration-1000 ${
            postsSection.isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <article
                  key={post.id}
                  className="bg-card border border-border/50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative h-48 bg-muted overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-semibold rounded-full">
                        <Tag className="h-3 w-3" />
                        {post.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {post.readTime}
                      </span>
                    </div>
                    
                    <h2 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <Link to={`/blog/${post.id}`}>
                      <Button variant="outline" className="w-full group/btn">
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <CTASection
          title="Need Expert Guidance?"
          description="Don't wait until it's too late. Get professional advice from our team of Chartered Accountants and Business Crime Solicitors."
          primaryButtonText="Get Started"
          primaryButtonLink="/get-started"
          secondaryButtonText="Book Assessment"
          secondaryButtonLink="/book"
        />
      </main>

      <Footer />
    </div>
  );
};

export default Blog;