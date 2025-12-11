import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const TermsOfService = () => {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional standards and service conditions
          </p>
        </section>

        <section
          ref={contentRef}
          className={`max-w-4xl mx-auto space-y-8 transition-all duration-700 delay-200 ${
            contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">1. Agreement to Terms</h2>
            <p className="text-muted-foreground">
              By engaging Investigation.tax's services or using our website, you agree to be bound by these 
              Terms of Service. If you do not agree to these terms, please do not use our services or website.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">2. Services Provided</h2>
            <p className="text-muted-foreground">
              Investigation.tax provides professional services including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Chartered Accountancy services</li>
              <li>Business Crime Solicitor services</li>
              <li>HMRC investigation defence and representation</li>
              <li>Pre-compliance advisory and tax optimization</li>
              <li>Combined hybrid team services for complex cases</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">3. Professional Standards</h2>
            <p className="text-muted-foreground">
              Our services are regulated by:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Institute of Chartered Accountants in England and Wales (ICAEW)</li>
              <li>Solicitors Regulation Authority (SRA)</li>
              <li>The Law Society</li>
              <li>Financial Conduct Authority (FCA) regulations where applicable</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              We maintain professional indemnity insurance and adhere to all relevant professional codes of conduct.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">4. Client Responsibilities</h2>
            <p className="text-muted-foreground">As a client, you agree to:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Provide accurate, complete, and timely information</li>
              <li>Respond promptly to requests for documentation or clarification</li>
              <li>Pay fees and expenses as agreed in the engagement letter</li>
              <li>Inform us immediately of any material changes to your circumstances</li>
              <li>Act on our advice in a timely manner</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">5. Fees and Payment</h2>
            <p className="text-muted-foreground">
              Our fee structure will be outlined in your specific engagement letter. Fees may be:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Fixed fee for defined scope of work</li>
              <li>Hourly rate for ongoing or complex matters</li>
              <li>Contingency-based in specific circumstances (where permitted by regulations)</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              Payment terms are typically 14 days from invoice date unless otherwise agreed. 
              Late payments may incur interest charges as specified in your engagement letter.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">6. Limitation of Liability</h2>
            <p className="text-muted-foreground">
              While we exercise professional care and skill in all services, our liability is limited to 
              the extent permitted by law and our professional regulations. Specific limitations will be 
              detailed in your engagement letter. We cannot guarantee specific outcomes in HMRC investigations 
              or tax matters, as these depend on multiple factors including HMRC's actions and your specific circumstances.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">7. Confidentiality</h2>
            <p className="text-muted-foreground">
              All information you provide is treated as strictly confidential and subject to professional 
              privilege where applicable. We will not disclose your information without your consent except:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Where required by law or court order</li>
              <li>For regulatory compliance purposes</li>
              <li>With your explicit authorization to represent you to HMRC or other authorities</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">8. Termination</h2>
            <p className="text-muted-foreground">
              Either party may terminate the engagement by giving written notice as specified in the 
              engagement letter. You will remain liable for fees and expenses incurred up to the termination 
              date. We reserve the right to cease acting if:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Fees remain unpaid despite reminders</li>
              <li>You fail to provide necessary information or cooperation</li>
              <li>A conflict of interest arises</li>
              <li>We are professionally required to withdraw</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">9. Complaints Procedure</h2>
            <p className="text-muted-foreground">
              If you are dissatisfied with our services, please contact us immediately. We have a formal 
              complaints procedure in accordance with regulatory requirements. If we cannot resolve your 
              complaint, you may refer the matter to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>ICAEW for accountancy services</li>
              <li>Legal Ombudsman for legal services</li>
              <li>The relevant regulatory body overseeing your specific matter</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">10. Governing Law</h2>
            <p className="text-muted-foreground">
              These Terms of Service and any engagement are governed by the laws of England and Wales. 
              Any disputes will be subject to the exclusive jurisdiction of the courts of England and Wales.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">11. Changes to Terms</h2>
            <p className="text-muted-foreground">
              We reserve the right to update these Terms of Service. Material changes will be communicated 
              to active clients. Continued use of our services after changes constitutes acceptance of the 
              updated terms.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">12. Contact Information</h2>
            <p className="text-muted-foreground">
              For questions about these Terms of Service or to discuss an engagement:
            </p>
            <ul className="list-none space-y-2 text-muted-foreground ml-4">
              <li>Email: info@investigation.tax</li>
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

export default TermsOfService;
