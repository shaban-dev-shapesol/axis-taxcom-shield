import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SEO } from "@/components/SEO";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useRef } from "react";
import { Upload, AlertTriangle, Lock, FileText, Loader2, CheckCircle, X, Check, AlertCircle } from "lucide-react";
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    businessName: '',
    industry: '',
    annualIncome: '',
    situation: '',
    description: '',
  });

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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Validate UK phone number format
  const validateUKPhone = (phone: string): boolean => {
    // Remove all spaces
    const cleanPhone = phone.replace(/\s/g, '');
    
    // UK phone numbers (without country code) should be 10-11 digits
    // Mobile: starts with 7 (10 digits total, e.g., 7700900000)
    // Landline: starts with 1 or 2 (10-11 digits total)
    const ukPhoneRegex = /^(7\d{9}|[12]\d{9,10})$/;
    
    return ukPhoneRegex.test(cleanPhone);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.industry || !formData.situation || !formData.description) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Validate UK phone number
    if (!validateUKPhone(formData.phone)) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid UK phone number. Mobile numbers start with 7 (10 digits), landlines start with 1 or 2 (10-11 digits).",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-assessment-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          urgency,
          documentSummary,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit form');
      }

      toast({
        title: "Request submitted successfully",
        description: "We've sent you a confirmation email. Our team will contact you within 4 business hours.",
      });

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        businessName: '',
        industry: '',
        annualIncome: '',
        situation: '',
        description: '',
      });
      setUrgency(5);
      setUploadedFile(null);
      setDocumentSummary(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Submission failed",
        description: error instanceof Error ? error.message : "Failed to submit form. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Personal Information */}
                <div>
                  <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input 
                        id="firstName" 
                        required 
                        placeholder="John" 
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input 
                        id="lastName" 
                        required 
                        placeholder="Smith" 
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      required 
                      placeholder="john@example.com" 
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                        +44
                      </span>
                      <div className="relative flex-1">
                        <Input 
                          id="phone" 
                          type="tel" 
                          required 
                          placeholder="7700 900000" 
                          className={`rounded-l-none pr-10 ${
                            formData.phone.length > 0 
                              ? validateUKPhone(formData.phone) 
                                ? 'border-green-500 focus-visible:ring-green-500' 
                                : 'border-destructive focus-visible:ring-destructive'
                              : ''
                          }`}
                          value={formData.phone}
                          onChange={(e) => {
                            // Only allow numbers and spaces
                            const value = e.target.value.replace(/[^\d\s]/g, '');
                            handleInputChange('phone', value);
                          }}
                          maxLength={15}
                        />
                        {formData.phone.length > 0 && (
                          <span className="absolute right-3 top-1/2 -translate-y-1/2">
                            {validateUKPhone(formData.phone) ? (
                              <Check className="h-4 w-4 text-green-500" />
                            ) : (
                              <AlertCircle className="h-4 w-4 text-destructive" />
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                    {formData.phone.length > 0 && !validateUKPhone(formData.phone) ? (
                      <p className="text-xs text-destructive mt-1">
                        Mobile: 10 digits starting with 7 | Landline: 10-11 digits starting with 1 or 2
                      </p>
                    ) : (
                      <p className="text-xs text-muted-foreground mt-1">Enter number without country code</p>
                    )}
                  </div>
                </div>

                {/* Business Information */}
                <div className="pt-6 border-t border-border">
                  <h2 className="text-2xl font-bold mb-6">Business Information</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="businessName">Business Name (if applicable)</Label>
                      <Input 
                        id="businessName" 
                        placeholder="ABC Trading Ltd" 
                        value={formData.businessName}
                        onChange={(e) => handleInputChange('businessName', e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="industry">Industry / Business Type *</Label>
                      <Select value={formData.industry} onValueChange={(value) => handleInputChange('industry', value)}>
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
                      <Select value={formData.annualIncome} onValueChange={(value) => handleInputChange('annualIncome', value)}>
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
                      <Select value={formData.situation} onValueChange={(value) => handleInputChange('situation', value)}>
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
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
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

                  {/* Hidden file input - always in DOM */}
                  <input 
                    ref={fileInputRef}
                    type="file" 
                    className="hidden" 
                    accept=".pdf,.jpg,.jpeg,.png,.docx"
                    onChange={handleFileUpload}
                  />

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

                      {/* Analysis Status */}
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
                        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 flex items-center space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <p className="text-sm font-medium">Document analysed successfully. The analysis will be included in your submission.</p>
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
                  <Button type="submit" variant="danger" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin mr-2" />
                        Submitting...
                      </>
                    ) : (
                      'Submit Assessment Request'
                    )}
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
