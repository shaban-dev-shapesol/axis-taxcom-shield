import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Shield, Scale, Users, Award, Target, CheckCircle2 } from "lucide-react";

const About = () => {
  const hero = useScrollAnimation();
  const mission = useScrollAnimation();
  const partnership = useScrollAnimation();
  const values = useScrollAnimation();
  const credentials = useScrollAnimation();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section
          ref={hero.ref as React.RefObject<HTMLElement>}
          className={`py-20 px-4 ${hero.isVisible ? 'animate-fade-in' : 'opacity-0'}`}
        >
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent">
              About Investigation.tax
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              The UK's premier alliance of Chartered Accountants and Business Crime Solicitors,
              delivering unmatched expertise in HMRC investigations and tax compliance.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section
          ref={mission.ref as React.RefObject<HTMLElement>}
          className={`py-16 px-4 bg-muted/30 ${mission.isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
        >
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-foreground">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We exist to protect businesses and individuals facing HMRC investigations, 
                  combining deep technical accounting expertise with aggressive legal defence strategies.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Whether you're under investigation or seeking pre-compliance optimization, 
                  our hybrid team delivers the complete solution: technical precision from 
                  Chartered Accountants and legal protection from Business Crime Solicitors.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We don't just respond to HMRC—we dominate the engagement, leveraging 
                  legal privilege, forensic analysis, and decades of combined experience.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-card p-6 rounded-lg border border-border transition-smooth hover:scale-105 hover:shadow-lg">
                  <Target className="w-12 h-12 text-accent mb-4" />
                  <h3 className="font-bold mb-2 text-foreground">Crisis Management</h3>
                  <p className="text-sm text-muted-foreground">
                    Immediate response to HMRC challenges
                  </p>
                </div>
                <div className="bg-card p-6 rounded-lg border border-border transition-smooth hover:scale-105 hover:shadow-lg">
                  <Shield className="w-12 h-12 text-accent mb-4" />
                  <h3 className="font-bold mb-2 text-foreground">Legal Protection</h3>
                  <p className="text-sm text-muted-foreground">
                    Full legal privilege on all communications
                  </p>
                </div>
                <div className="bg-card p-6 rounded-lg border border-border transition-smooth hover:scale-105 hover:shadow-lg">
                  <CheckCircle2 className="w-12 h-12 text-accent mb-4" />
                  <h3 className="font-bold mb-2 text-foreground">Results Driven</h3>
                  <p className="text-sm text-muted-foreground">
                    Track record of significant client wins
                  </p>
                </div>
                <div className="bg-card p-6 rounded-lg border border-border transition-smooth hover:scale-105 hover:shadow-lg">
                  <Users className="w-12 h-12 text-accent mb-4" />
                  <h3 className="font-bold mb-2 text-foreground">Expert Team</h3>
                  <p className="text-sm text-muted-foreground">
                    Accountants + Solicitors working as one
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Partnership Section */}
        <section
          ref={partnership.ref as React.RefObject<HTMLElement>}
          className={`py-16 px-4 ${partnership.isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
        >
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-12 text-center text-foreground">
              The Investigation.tax Partnership
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-card border border-border rounded-lg p-8 transition-smooth hover:scale-105 hover:shadow-lg">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-accent/10 p-3 rounded-lg">
                    <Scale className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">AXIS</h3>
                </div>
                <p className="text-lg font-semibold mb-4 text-foreground">Chartered Accountants</p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span>Technical tax expertise and forensic analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span>Pre-compliance optimization and risk assessment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span>Complex financial reconstructions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span>VAT, PAYE, Corporation Tax, and Self-Assessment</span>
                  </li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-8 transition-smooth hover:scale-105 hover:shadow-lg">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-accent/10 p-3 rounded-lg">
                    <Shield className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">TAXCOM</h3>
                </div>
                <p className="text-lg font-semibold mb-4 text-foreground">Business Crime Solicitors</p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span>Legal privilege and client confidentiality protection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span>Criminal tax investigation defence</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span>High-risk escalation management</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span>Tribunal representation and litigation</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-8 bg-accent/5 border border-accent/20 rounded-lg p-6 text-center">
              <p className="text-lg text-foreground">
                <span className="font-bold">Together,</span> we provide a seamless service model that adapts to case complexity—
                accountant-led for technical matters, solicitor-led for high-risk legal defence.
              </p>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section
          ref={values.ref as React.RefObject<HTMLElement>}
          className={`py-16 px-4 bg-muted/30 ${values.isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
        >
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-12 text-center text-foreground">Our Core Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">Aggressive Defence</h3>
                <p className="text-muted-foreground">
                  We don't back down. We challenge HMRC's assumptions, demand evidence, 
                  and fight for every pound of tax relief our clients deserve.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">Technical Precision</h3>
                <p className="text-muted-foreground">
                  Every number matters. Our forensic approach ensures complete accuracy 
                  in reconstructions, calculations, and compliance submissions.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">Client First</h3>
                <p className="text-muted-foreground">
                  Your business and freedom are at stake. We prioritize immediate response, 
                  clear communication, and outcomes that protect your future.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Credentials Section */}
        <section
          ref={credentials.ref as React.RefObject<HTMLElement>}
          className={`py-16 px-4 ${credentials.isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
        >
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold mb-12 text-center text-foreground">
              Professional Accreditations
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-center gap-4 bg-card border border-border rounded-lg p-6 transition-smooth hover:scale-105 hover:shadow-lg">
                <Award className="w-10 h-10 text-accent flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-foreground">Institute of Chartered Accountants</h3>
                  <p className="text-sm text-muted-foreground">ICAEW Members</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-card border border-border rounded-lg p-6 transition-smooth hover:scale-105 hover:shadow-lg">
                <Award className="w-10 h-10 text-accent flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-foreground">Solicitors Regulation Authority</h3>
                  <p className="text-sm text-muted-foreground">SRA Regulated</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-card border border-border rounded-lg p-6 transition-smooth hover:scale-105 hover:shadow-lg">
                <Award className="w-10 h-10 text-accent flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-foreground">Law Society Members</h3>
                  <p className="text-sm text-muted-foreground">Accredited Solicitors</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-card border border-border rounded-lg p-6 transition-smooth hover:scale-105 hover:shadow-lg">
                <Award className="w-10 h-10 text-accent flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-foreground">Professional Indemnity Insurance</h3>
                  <p className="text-sm text-muted-foreground">£10M Coverage</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
