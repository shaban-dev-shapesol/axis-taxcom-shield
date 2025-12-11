import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Shield, Lock, Server, Key, Eye, FileCheck, AlertTriangle, CheckCircle } from "lucide-react";

const DataSecurity = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation();
  const { ref: featuresRef, isVisible: featuresVisible } = useScrollAnimation();

  const securityFeatures = [
    {
      icon: Lock,
      title: "End-to-End Encryption",
      description: "All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption"
    },
    {
      icon: Server,
      title: "Secure Infrastructure",
      description: "UK-based servers with ISO 27001 certified data centers and redundant backup systems"
    },
    {
      icon: Key,
      title: "Access Controls",
      description: "Multi-factor authentication and role-based access control for all team members"
    },
    {
      icon: Eye,
      title: "Continuous Monitoring",
      description: "24/7 security monitoring, intrusion detection, and regular security audits"
    },
    {
      icon: FileCheck,
      title: "Data Integrity",
      description: "Regular backups with version control and audit trails for all document changes"
    },
    {
      icon: Shield,
      title: "Legal Privilege Protection",
      description: "Communications with solicitors benefit from legal professional privilege protections"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Data Security" 
        description="Investigation.tax data security and encryption practices. Military-grade security protecting your sensitive financial and legal information." 
      />
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <section
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-700 ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Data Security & Encryption</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Military-grade security protecting your sensitive financial and legal information
          </p>
        </section>

        <section
          ref={featuresRef}
          className={`mb-16 transition-all duration-700 delay-200 ${
            featuresVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {securityFeatures.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-lg border bg-card hover:shadow-lg transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <feature.icon className="w-12 h-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          ref={contentRef}
          className={`max-w-4xl mx-auto space-y-8 transition-all duration-700 delay-300 ${
            contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Our Security Commitment</h2>
            <p className="text-muted-foreground">
              When you're facing HMRC investigations or handling sensitive tax matters, data security 
              isn't optional—it's essential. Investigation.tax implements enterprise-grade security measures 
              that exceed industry standards to protect your confidential information.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Encryption Standards</h2>
            <div className="space-y-3 text-muted-foreground">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <p><strong>Data in Transit:</strong> TLS 1.3 encryption for all data transmission, ensuring secure communication between your devices and our servers</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <p><strong>Data at Rest:</strong> AES-256 encryption for stored data, the same standard used by banks and government agencies</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <p><strong>Encrypted Backups:</strong> All backup systems use separate encryption keys with secure key management protocols</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Infrastructure Security</h2>
            <p className="text-muted-foreground">
              Our systems are hosted in ISO 27001 certified UK data centers with:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Physical security with 24/7 surveillance and access controls</li>
              <li>Redundant power supplies and network connections</li>
              <li>Regular penetration testing by independent security firms</li>
              <li>Firewall protection and intrusion prevention systems</li>
              <li>DDoS mitigation and traffic filtering</li>
              <li>Regular security patches and system updates</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Access Management</h2>
            <p className="text-muted-foreground">
              We implement strict access controls to ensure only authorized personnel can access your data:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Multi-factor authentication (MFA) required for all team members</li>
              <li>Role-based access control limiting data access to case-relevant staff only</li>
              <li>Individual user accounts with unique credentials (no shared passwords)</li>
              <li>Regular access reviews and immediate deprovisioning of departed staff</li>
              <li>Comprehensive audit logs tracking all system access and data modifications</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">GDPR Compliance</h2>
            <p className="text-muted-foreground">
              Our data handling practices fully comply with GDPR requirements:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Lawful basis for processing clearly documented</li>
              <li>Data minimization—we only collect what's necessary</li>
              <li>Purpose limitation—data used only for stated purposes</li>
              <li>Retention policies aligned with legal and professional requirements</li>
              <li>Regular Data Protection Impact Assessments (DPIAs)</li>
              <li>Appointed Data Protection Officer overseeing compliance</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Legal Professional Privilege</h2>
            <p className="text-muted-foreground">
              Communications with our solicitors are protected by legal professional privilege, 
              providing an additional layer of confidentiality beyond technical security measures. This 
              means such communications cannot be disclosed to third parties (including HMRC) without your 
              explicit consent, except in very limited circumstances prescribed by law.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Incident Response</h2>
            <p className="text-muted-foreground">
              In the unlikely event of a security incident, we have established procedures:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>24/7 security operations center monitoring for threats</li>
              <li>Documented incident response plan with defined roles and procedures</li>
              <li>Immediate notification to affected clients if breach occurs</li>
              <li>Forensic analysis to identify root cause and prevent recurrence</li>
              <li>Notification to relevant authorities as required by law</li>
              <li>Post-incident review and security enhancement measures</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Staff Training & Vetting</h2>
            <p className="text-muted-foreground">
              All Investigation.tax team members undergo:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Comprehensive background checks before employment</li>
              <li>Regular security awareness training covering phishing, social engineering, and data handling</li>
              <li>Confidentiality agreements and professional codes of conduct</li>
              <li>Annual refresher training on GDPR and data protection</li>
              <li>Clear desk and clear screen policies when handling sensitive information</li>
            </ul>
          </div>

          <div className="bg-muted/50 border border-border rounded-lg p-6 space-y-3">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg mb-2">Your Role in Security</h3>
                <p className="text-muted-foreground mb-3">
                  While we implement comprehensive security measures, security is a shared responsibility. 
                  We ask you to:
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li>Use strong, unique passwords and enable two-factor authentication</li>
                  <li>Never share your login credentials with anyone</li>
                  <li>Access our systems only from secure, trusted networks</li>
                  <li>Report any suspicious activity or security concerns immediately</li>
                  <li>Keep your contact information up to date for security notifications</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Certifications & Compliance</h2>
            <p className="text-muted-foreground">
              Our security practices are aligned with:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>ISO 27001 Information Security Management</li>
              <li>Cyber Essentials Plus certification</li>
              <li>ICAEW and SRA professional security standards</li>
              <li>National Cyber Security Centre (NCSC) guidelines</li>
              <li>UK GDPR and Data Protection Act 2018</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Regular Security Audits</h2>
            <p className="text-muted-foreground">
              We conduct regular security assessments including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Annual penetration testing by independent cybersecurity firms</li>
              <li>Quarterly vulnerability scans and patch management reviews</li>
              <li>Monthly access control audits</li>
              <li>Continuous automated security monitoring</li>
              <li>Regular review and update of security policies and procedures</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Questions About Security?</h2>
            <p className="text-muted-foreground">
              We're transparent about our security practices. If you have specific security questions 
              or requirements, please contact our security team:
            </p>
            <ul className="list-none space-y-2 text-muted-foreground ml-4">
              <li>Email: security@investigation.tax</li>
              <li>Phone: 0800 772 0000</li>
            </ul>
          </div>

          <div className="text-sm text-muted-foreground pt-8 border-t">
            <p>Last updated: {new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DataSecurity;
