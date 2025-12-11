import { useParams, Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { CTASection } from "@/components/CTASection";
import { Calendar, Clock, ArrowLeft, Share2, BookOpen, AlertCircle } from "lucide-react";

// Sample blog data (in a real app, this would come from a CMS or API)
const blogData: Record<string, any> = {
  "understanding-hmrc-investigations": {
    title: "Understanding HMRC Investigations: What You Need to Know",
    category: "HMRC Investigations",
    date: "March 15, 2024",
    readTime: "8 min read",
    author: "Investigation.tax Team",
    image: "/placeholder.svg",
    content: [
      {
        type: "paragraph",
        text: "Facing an HMRC investigation can be one of the most stressful experiences for any business owner or individual. Understanding the process, your rights, and the potential outcomes is crucial to mounting an effective defence."
      },
      {
        type: "heading",
        text: "What Triggers an HMRC Investigation?"
      },
      {
        type: "paragraph",
        text: "HMRC investigations can be triggered by various factors, including anomalies in tax returns, whistleblower reports, lifestyle inconsistencies, or random selection. Common red flags include:"
      },
      {
        type: "list",
        items: [
          "Significant discrepancies between declared income and lifestyle",
          "Unusual patterns in VAT returns or expense claims",
          "Cash-intensive business operations without proper documentation",
          "Late or incomplete tax returns",
          "Industry-specific compliance issues"
        ]
      },
      {
        type: "heading",
        text: "Types of HMRC Investigations"
      },
      {
        type: "paragraph",
        text: "HMRC conducts several types of investigations, each with different implications:"
      },
      {
        type: "subheading",
        text: "1. Aspect Enquiries"
      },
      {
        type: "paragraph",
        text: "These focus on specific aspects of your tax return and are usually resolved quickly if proper documentation is provided."
      },
      {
        type: "subheading",
        text: "2. Full Enquiries"
      },
      {
        type: "paragraph",
        text: "A comprehensive review of all your tax affairs, requiring extensive documentation and often taking months or years to resolve."
      },
      {
        type: "subheading",
        text: "3. Criminal Investigations"
      },
      {
        type: "paragraph",
        text: "Reserved for cases of suspected serious fraud or tax evasion, where HMRC believes criminal prosecution may be warranted. These require immediate legal representation."
      },
      {
        type: "heading",
        text: "Your Rights During an Investigation"
      },
      {
        type: "paragraph",
        text: "Understanding your rights is essential when dealing with HMRC:"
      },
      {
        type: "list",
        items: [
          "Right to professional representation",
          "Right to legal privilege (when represented by a solicitor)",
          "Right to reasonable time to gather evidence",
          "Right to challenge HMRC's findings",
          "Right to appeal decisions"
        ]
      },
      {
        type: "callout",
        text: "Legal privilege is a critical protection that only applies when you're represented by a qualified solicitor. This is why our hybrid model combining Chartered Accountants with Business Crime Solicitors is so valuable."
      },
      {
        type: "heading",
        text: "How to Respond to an HMRC Investigation"
      },
      {
        type: "paragraph",
        text: "The first 48 hours after receiving notice of an investigation are critical. Here's what you should do:"
      },
      {
        type: "list",
        items: [
          "Don't panic or ignore the notice",
          "Contact specialist advisors immediately",
          "Gather all relevant documentation",
          "Don't communicate directly with HMRC without professional guidance",
          "Understand the scope and nature of the investigation"
        ]
      },
      {
        type: "heading",
        text: "Why Expert Representation Matters"
      },
      {
        type: "paragraph",
        text: "HMRC investigators are highly trained professionals with extensive experience. Attempting to handle an investigation alone puts you at a significant disadvantage. Our team of Chartered Accountants and Business Crime Solicitors provides:"
      },
      {
        type: "list",
        items: [
          "Technical expertise in tax law and accounting",
          "Legal defence capabilities under privilege",
          "Negotiation skills to minimize penalties",
          "Strategic guidance throughout the process",
          "Protection of your rights and interests"
        ]
      },
      {
        type: "paragraph",
        text: "Don't face HMRC alone. Contact Investigation.tax today for a confidential assessment of your situation."
      }
    ]
  },
  "pre-compliance-benefits": {
    title: "The Benefits of Pre-Compliance Reviews for Your Business",
    category: "Pre-Compliance",
    date: "March 10, 2024",
    readTime: "6 min read",
    author: "Investigation.tax Team",
    image: "/placeholder.svg",
    content: [
      {
        type: "paragraph",
        text: "Prevention is always better than cure, especially when it comes to tax compliance. A pre-compliance review can identify and resolve issues before they trigger an HMRC investigation, saving you significant time, money, and stress."
      },
      {
        type: "heading",
        text: "What is a Pre-Compliance Review?"
      },
      {
        type: "paragraph",
        text: "A pre-compliance review is a comprehensive analysis of your tax affairs conducted by experts to identify potential compliance issues, correct errors, and implement proper systems before HMRC becomes involved."
      },
      {
        type: "heading",
        text: "Key Benefits"
      },
      {
        type: "list",
        items: [
          "Identify and correct errors before HMRC discovers them",
          "Significantly reduce potential penalties",
          "Avoid the stress and disruption of an investigation",
          "Implement proper systems and controls",
          "Gain peace of mind about your tax position"
        ]
      },
      {
        type: "callout",
        text: "Voluntary disclosure before HMRC discovers an issue can reduce penalties by up to 90% compared to penalties applied after an investigation."
      },
      {
        type: "paragraph",
        text: "Contact us today to schedule your pre-compliance review and protect your business from future investigations."
      }
    ]
  }
};

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const heroSection = useScrollAnimation();
  const contentSection = useScrollAnimation();
  
  const post = slug ? blogData[slug] : null;

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
            <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title={post.title} 
        description={`Read about ${post.title} - Expert insights from Investigation.tax on HMRC investigations and tax compliance.`}
        type="article"
      />
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-12 px-4 bg-gradient-to-b from-background via-muted/30 to-background overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          
          <div
            ref={heroSection.ref as React.RefObject<HTMLDivElement>}
            className={`max-w-4xl mx-auto relative z-10 transition-all duration-1000 ${
              heroSection.isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <Link to="/blog" className="inline-flex items-center text-primary hover:underline mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>

            <div className="mb-4">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full">
                {post.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
              <span className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                {post.author}
              </span>
              <span>•</span>
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {post.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
            </div>

            <button className="inline-flex items-center gap-2 text-primary hover:underline">
              <Share2 className="h-4 w-4" />
              Share Article
            </button>
          </div>
        </section>

        {/* Featured Image */}
        <section className="px-4 mb-12">
          <div className="max-w-4xl mx-auto">
            <div className="relative h-96 bg-muted rounded-lg overflow-hidden shadow-xl">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section
          ref={contentSection.ref as React.RefObject<HTMLElement>}
          className={`px-4 pb-16 transition-all duration-1000 ${
            contentSection.isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <article className="max-w-3xl mx-auto prose prose-lg dark:prose-invert">
            {post.content.map((block: any, index: number) => {
              switch (block.type) {
                case "paragraph":
                  return (
                    <p key={index} className="text-foreground/90 leading-relaxed mb-6">
                      {block.text}
                    </p>
                  );
                case "heading":
                  return (
                    <h2 key={index} className="text-3xl font-bold mt-12 mb-6 text-foreground">
                      {block.text}
                    </h2>
                  );
                case "subheading":
                  return (
                    <h3 key={index} className="text-2xl font-semibold mt-8 mb-4 text-foreground">
                      {block.text}
                    </h3>
                  );
                case "list":
                  return (
                    <ul key={index} className="list-disc pl-6 mb-6 space-y-2">
                      {block.items.map((item: string, i: number) => (
                        <li key={i} className="text-foreground/90">{item}</li>
                      ))}
                    </ul>
                  );
                case "callout":
                  return (
                    <div key={index} className="bg-primary/10 border-l-4 border-primary p-6 rounded-r-lg my-8">
                      <div className="flex gap-3">
                        <AlertCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                        <p className="text-foreground/90 leading-relaxed m-0">
                          {block.text}
                        </p>
                      </div>
                    </div>
                  );
                default:
                  return null;
              }
            })}
          </article>
        </section>

        <CTASection
          title="Need Expert Advice?"
          description="Our team of Chartered Accountants and Business Crime Solicitors is ready to help with your tax compliance and defence needs."
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

export default BlogDetail;