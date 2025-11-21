import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const PrivacyPolicy = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <section
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-700 ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your privacy and data security are our top priorities
          </p>
        </section>

        <section
          ref={contentRef}
          className={`max-w-4xl mx-auto space-y-8 transition-all duration-700 delay-200 ${
            contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">1. Introduction</h2>
            <p className="text-muted-foreground">
              AXIS + TAXCOM is committed to protecting your personal data and respecting your privacy. 
              This Privacy Policy explains how we collect, use, store, and protect your information when 
              you use our services or interact with our website.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">2. Information We Collect</h2>
            <p className="text-muted-foreground">We collect and process the following types of information:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Personal identification information (name, email address, phone number)</li>
              <li>Financial information relevant to your HMRC case or tax compliance</li>
              <li>Business information and documentation</li>
              <li>Communication records between you and our team</li>
              <li>Website usage data and analytics</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">3. How We Use Your Information</h2>
            <p className="text-muted-foreground">We use your personal data to:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Provide professional accounting and legal services</li>
              <li>Communicate with you about your case or inquiry</li>
              <li>Comply with legal and regulatory obligations</li>
              <li>Improve our services and website functionality</li>
              <li>Send important updates about your case or our services</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">4. Data Security</h2>
            <p className="text-muted-foreground">
              We implement robust security measures including encryption, secure servers, and strict 
              access controls to protect your data. All sensitive information is encrypted both in 
              transit and at rest. Our systems comply with industry best practices for data security.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">5. Legal Privilege</h2>
            <p className="text-muted-foreground">
              Communications with our solicitors may be subject to legal professional privilege, 
              providing an additional layer of protection for your sensitive information. This privilege 
              means that certain communications cannot be disclosed without your consent.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">6. Data Retention</h2>
            <p className="text-muted-foreground">
              We retain your personal data only for as long as necessary to fulfill the purposes for 
              which it was collected, or as required by law. For professional services, this typically 
              means at least 6 years from the end of our engagement, in compliance with regulatory requirements.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">7. Your Rights</h2>
            <p className="text-muted-foreground">Under GDPR, you have the right to:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Access your personal data</li>
              <li>Correct inaccurate or incomplete data</li>
              <li>Request deletion of your data (subject to legal obligations)</li>
              <li>Object to processing of your data</li>
              <li>Request data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">8. Third-Party Disclosure</h2>
            <p className="text-muted-foreground">
              We do not sell, trade, or transfer your personal data to third parties without your consent, 
              except when required by law or necessary to provide our services (e.g., sharing information 
              with HMRC on your behalf with proper authorization).
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">9. Cookies</h2>
            <p className="text-muted-foreground">
              Our website uses cookies to enhance user experience and analyze website traffic. You can 
              control cookie preferences through your browser settings.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">10. Changes to This Policy</h2>
            <p className="text-muted-foreground">
              We may update this Privacy Policy from time to time. Any changes will be posted on this 
              page with an updated revision date. We encourage you to review this policy periodically.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">11. Contact Us</h2>
            <p className="text-muted-foreground">
              If you have any questions about this Privacy Policy or wish to exercise your rights, 
              please contact us:
            </p>
            <ul className="list-none space-y-2 text-muted-foreground ml-4">
              <li>Email: privacy@axistaxcom.co.uk</li>
              <li>Phone: 0800 772 0000</li>
              <li>Address: London, United Kingdom</li>
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

export default PrivacyPolicy;
