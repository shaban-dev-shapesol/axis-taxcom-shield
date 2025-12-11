import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SEO } from "@/components/SEO";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useRef } from "react";
import { Upload, AlertTriangle, Lock, FileText, Loader2, CheckCircle, X } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useToast } from "@/hooks/use-toast";

const GetStarted = () => {
  const heroSection = useScrollAnimation();
  const formSection = useScrollAnimation();
  const { toast } = useToast();
  
  const [urgency, setUrgency] = useState(5);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [documentSummary, setDocumentSummary] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const allowedExtensions = ['.pdf', '.jpg', '.jpeg', '.png', '.docx'];
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    
    if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(fileExtension)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF, JPG, PNG, or DOCX file.",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 10MB.",
        variant: "destructive",
      });
      return;
    }

    setUploadedFile(file);
    setDocumentSummary(null);
    
    // Automatically analyze the document
    await analyzeDocument(file);
  };

  const analyzeDocument = async (file: File) => {
    setIsAnalyzing(true);
    
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analyze-document`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to analyze document');
      }

      const data = await response.json();
      setDocumentSummary(data.summary);
      
      toast({
        title: "Document analysed",
        description: "We've generated a summary of your HMRC letter.",
      });
    } catch (error) {
      console.error('Error analyzing document:', error);
      toast({
        title: "Analysis failed",
        description: error instanceof Error ? error.message : "Failed to analyze document. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    setDocumentSummary(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file && fileInputRef.current) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      fileInputRef.current.files = dataTransfer.files;
      await handleFileUpload({ target: { files: dataTransfer.files } } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Get Started" 
        description="Begin your HMRC defence or pre-compliance check with Investigation.tax. Complete our secure form to get expert guidance from our team of accountants and solicitors." 
      />
      <Header />

      {/* Hero */}
      <section ref={heroSection.ref} className={`bg-primary text-primary-foreground py-12 transition-smooth ${heroSection.isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Get Started With <span className="text-gold">Investigation.tax</span>
            </h1>
            <p className="text-xl text-primary-foreground/80">
              Complete this form to begin your HMRC defence or pre-compliance check
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section ref={formSection.ref} className={`py-20 transition-smooth ${formSection.isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Security Notice */}
            <div className="bg-gold/10 border border-gold/30 rounded-lg p-6 mb-8 flex items-start space-x-4">
              <Lock className="h-6 w-6 text-gold flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold mb-2">Your Information is Secure</h3>
                <p className="text-sm text-muted-foreground">
                  All data is encrypted with AES-256 encryption. GDPR compliant. ISO 27001 certified infrastructure. 
                  Your information will only be used for your case assessment and will never be shared with third parties.
                </p>
              </div>
            </div>

            <div className="bg-card rounded-xl shadow-lg border border-border p-8 transition-smooth hover:shadow-xl">
              <form className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input id="firstName" required placeholder="John" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input id="lastName" required placeholder="Smith" />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" type="email" required placeholder="john@example.com" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input id="phone" type="tel" required placeholder="07700 900000" />
                  </div>
                </div>

                {/* Business Information */}
                <div className="pt-6 border-t border-border">
                  <h2 className="text-2xl font-bold mb-6">Business Information</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="businessName">Business Name (if applicable)</Label>
                      <Input id="businessName" placeholder="ABC Trading Ltd" />
                    </div>

                    <div>
                      <Label htmlFor="industry">Industry / Business Type *</Label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="restaurant">Restaurant / Takeaway / Catering</SelectItem>
                          <SelectItem value="construction">Construction / CIS Contractor</SelectItem>
                          <SelectItem value="property">Property / Landlord</SelectItem>
                          <SelectItem value="it-contractor">IT Contractor / Consultant</SelectItem>
                          <SelectItem value="medical">Medical / Healthcare Professional</SelectItem>
                          <SelectItem value="professional-services">Professional Services (Law, Accounting, etc.)</SelectItem>
                          <SelectItem value="ecommerce">E-Commerce / Online Retail</SelectItem>
                          <SelectItem value="wholesale">Wholesale / Distribution</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="annualIncome">Approximate Annual Income / Turnover</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select income bracket" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under-50k">Under £50,000</SelectItem>
                          <SelectItem value="50k-100k">£50,000 - £100,000</SelectItem>
                          <SelectItem value="100k-250k">£100,000 - £250,000</SelectItem>
                          <SelectItem value="250k-500k">£250,000 - £500,000</SelectItem>
                          <SelectItem value="500k-1m">£500,000 - £1,000,000</SelectItem>
                          <SelectItem value="over-1m">Over £1,000,000</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* HMRC Situation */}
                <div className="pt-6 border-t border-border">
                  <h2 className="text-2xl font-bold mb-6">HMRC Situation</h2>

                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="situation">What best describes your situation? *</Label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select situation" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under-investigation">Under active HMRC investigation</SelectItem>
                          <SelectItem value="received-letter">Just received HMRC letter</SelectItem>
                          <SelectItem value="cop8">Code of Practice 8 (COP 8)</SelectItem>
                          <SelectItem value="cop9">Code of Practice 9 (COP 9 - Criminal)</SelectItem>
                          <SelectItem value="pre-compliance">Want pre-compliance check (no investigation yet)</SelectItem>
                          <SelectItem value="settlement">Negotiating settlement with HMRC</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="description">Brief Description of Your Situation *</Label>
                      <Textarea 
                        id="description" 
                        required 
                        rows={6}
                        placeholder="Please describe your situation in detail. Include:
- What HMRC has contacted you about
- When you received the letter/notice
- What they are claiming or investigating
- Any amounts mentioned
- Any deadlines you're facing"
                      />
                    </div>

                    <div>
                      <Label htmlFor="urgency">
                        Urgency Level: <span className="text-gold font-bold">{urgency}/10</span>
                      </Label>
                      <input 
                        type="range" 
                        id="urgency"
                        min="1" 
                        max="10" 
                        value={urgency}
                        onChange={(e) => setUrgency(Number(e.target.value))}
                        className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-gold"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>Not urgent</span>
                        <span>Extremely urgent</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Document Upload */}
                <div className="pt-6 border-t border-border">
                  <h2 className="text-2xl font-bold mb-4">Upload HMRC Letter or Documents</h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    If you have received a letter, notice, or email from HMRC, please upload it here. 
                    Our AI will analyse it immediately and provide a summary.
                  </p>

                  {!uploadedFile ? (
                    <div 
                      className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-gold/50 transition-colors cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                    >
                      <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="font-medium mb-2">Click to upload or drag and drop</p>
                      <p className="text-sm text-muted-foreground">PDF, JPG, PNG, DOCX (Max 10MB)</p>
                      <input 
                        ref={fileInputRef}
                        type="file" 
                        className="hidden" 
                        accept=".pdf,.jpg,.jpeg,.png,.docx"
                        onChange={handleFileUpload}
                      />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Uploaded File Card */}
                      <div className="bg-muted/50 rounded-lg p-4 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-8 w-8 text-gold" />
                          <div>
                            <p className="font-medium">{uploadedFile.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {isAnalyzing ? (
                            <div className="flex items-center text-gold">
                              <Loader2 className="h-5 w-5 animate-spin mr-2" />
                              <span className="text-sm">Analysing...</span>
                            </div>
                          ) : documentSummary ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : null}
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={removeFile}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Document Summary */}
                      {isAnalyzing && (
                        <div className="bg-gold/5 border border-gold/20 rounded-lg p-6">
                          <div className="flex items-center justify-center space-x-3">
                            <Loader2 className="h-6 w-6 animate-spin text-gold" />
                            <p className="text-sm font-medium">Analysing your HMRC document...</p>
                          </div>
                          <p className="text-xs text-muted-foreground text-center mt-2">
                            This usually takes 10-20 seconds
                          </p>
                        </div>
                      )}

                      {documentSummary && !isAnalyzing && (
                        <div className="bg-gold/5 border border-gold/20 rounded-lg p-6">
                          <h3 className="font-bold text-lg mb-4 flex items-center">
                            <FileText className="h-5 w-5 mr-2 text-gold" />
                            Document Analysis
                          </h3>
                          <div className="prose prose-sm max-w-none text-foreground">
                            <div 
                              className="whitespace-pre-wrap text-sm leading-relaxed"
                              dangerouslySetInnerHTML={{ 
                                __html: documentSummary
                                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                  .replace(/\n/g, '<br />')
                              }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Upload another file */}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload a different document
                      </Button>
                    </div>
                  )}
                </div>

                {/* Urgency Warning */}
                {urgency >= 8 && (
                  <div className="bg-danger/10 border border-danger/30 rounded-lg p-6 flex items-start space-x-4">
                    <AlertTriangle className="h-6 w-6 text-danger flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold mb-2 text-danger">High Urgency Detected</h3>
                      <p className="text-sm text-muted-foreground">
                        Based on your urgency level, we recommend booking an urgent paid consultation (£500) 
                        for immediate expert assessment. We can typically see you within 24 hours.
                      </p>
                    </div>
                  </div>
                )}

                {/* Submit */}
                <div className="pt-6">
                  <Button type="submit" variant="danger" size="lg" className="w-full">
                    Submit Assessment Request
                  </Button>
                  <p className="text-xs text-center text-muted-foreground mt-4">
                    By submitting this form, you agree to our Privacy Policy and Terms of Service. 
                    We will contact you within 4 business hours (or sooner for urgent cases).
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GetStarted;
