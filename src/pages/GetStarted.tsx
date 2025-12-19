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
import { VoiceRecorder } from "@/components/VoiceRecorder";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useToast } from "@/hooks/use-toast";

const GetStarted = () => {
  const heroSection = useScrollAnimation();
  const formSection = useScrollAnimation();
  const { toast } = useToast();
  
  const [urgency, setUrgency] = useState(5);
  const [uploadedFiles, setUploadedFiles] = useState<Array<{
    file: File;
    isAnalyzing: boolean;
    summary: string | null;
    failed: boolean;
  }>>([]);
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
  const [voiceNote, setVoiceNote] = useState<Blob | null>(null);

  // Format currency with £ symbol and comma separators
  const formatCurrency = (value: string): string => {
    // Remove all non-digit characters
    const digitsOnly = value.replace(/[^\d]/g, '');
    
    if (!digitsOnly) return '';
    
    // Convert to number and format with commas
    const number = parseInt(digitsOnly, 10);
    const formatted = number.toLocaleString('en-GB');
    
    return `£${formatted}`;
  };

  const handleTurnoverChange = (value: string) => {
    const formatted = formatCurrency(value);
    handleInputChange('annualIncome', formatted);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const allowedExtensions = ['.pdf', '.jpg', '.jpeg', '.png', '.docx'];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      
      if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(fileExtension)) {
        toast({
          title: "Invalid file type",
          description: `${file.name}: Please upload PDF, JPG, PNG, or DOCX files.`,
          variant: "destructive",
        });
        continue;
      }

      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: `${file.name}: Please upload files smaller than 10MB.`,
          variant: "destructive",
        });
        continue;
      }

      // Check if file already exists
      if (uploadedFiles.some(f => f.file.name === file.name && f.file.size === file.size)) {
        continue;
      }

      // Add file to state with analyzing status
      const newFile = { file, isAnalyzing: true, summary: null, failed: false };
      setUploadedFiles(prev => [...prev, newFile]);
      
      // Analyze document in background
      analyzeDocument(file);
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const analyzeDocument = async (file: File) => {
    try {
      const formDataObj = new FormData();
      formDataObj.append('file', file);

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analyze-document`, {
        method: 'POST',
        body: formDataObj,
      });

      if (response.ok) {
        const data = await response.json();
        setUploadedFiles(prev => prev.map(f => 
          f.file.name === file.name && f.file.size === file.size
            ? { ...f, isAnalyzing: false, summary: data.summary, failed: false }
            : f
        ));
      } else {
        // Mark as failed if response not ok
        setUploadedFiles(prev => prev.map(f => 
          f.file.name === file.name && f.file.size === file.size
            ? { ...f, isAnalyzing: false, summary: null, failed: true }
            : f
        ));
      }
    } catch (error) {
      console.error('Error analyzing document:', error);
      setUploadedFiles(prev => prev.map(f => 
        f.file.name === file.name && f.file.size === file.size
          ? { ...f, isAnalyzing: false, summary: null, failed: true }
          : f
      ));
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files && files.length > 0 && fileInputRef.current) {
      const dataTransfer = new DataTransfer();
      for (let i = 0; i < files.length; i++) {
        dataTransfer.items.add(files[i]);
      }
      fileInputRef.current.files = dataTransfer.files;
      await handleFileUpload({ target: { files: dataTransfer.files } } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  // Check if any files are still being analyzed or have failed
  const isAnyFileAnalyzing = uploadedFiles.some(f => f.isAnalyzing);
  const hasAnyFailedFile = uploadedFiles.some(f => f.failed);
  const canSubmitDocuments = uploadedFiles.length === 0 || (!isAnyFileAnalyzing && !hasAnyFailedFile);

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
    
    // Validate required fields (description is optional if voice note is attached)
    const hasDescription = formData.description || voiceNote;
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.industry || !formData.annualIncome || !formData.situation || !hasDescription) {
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

    // Check document analysis status
    if (uploadedFiles.length > 0) {
      if (isAnyFileAnalyzing) {
        toast({
          title: "Please wait",
          description: "Your documents are still being processed. Please wait a moment.",
          variant: "destructive",
        });
        return;
      }
      if (hasAnyFailedFile) {
        toast({
          title: "Document analysis failed",
          description: "Some documents failed to process. Please remove them and try again.",
          variant: "destructive",
        });
        return;
      }
    }

    setIsSubmitting(true);

    try {
      // Collect document summaries
      const documentSummaries = uploadedFiles
        .filter(f => f.summary)
        .map(f => f.summary as string);

      // Generate comprehensive assessment combining form + documents
      let clientAssessment: string | null = null;
      let teamAssessment: string | null = null;
      
      // Prepare description (indicate if voice note is attached)
      const descriptionForAssessment = voiceNote && !formData.description 
        ? "[Voice note attached - audio message from client]"
        : formData.description;
      
      const assessmentResponse = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-assessment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formData: { ...formData, description: descriptionForAssessment },
          urgency,
          documentSummaries,
          hasVoiceNote: !!voiceNote,
        }),
      });

      if (assessmentResponse.ok) {
        const assessmentData = await assessmentResponse.json();
        clientAssessment = assessmentData.clientAssessment;
        teamAssessment = assessmentData.teamAssessment;
      } else {
        console.error('Failed to generate comprehensive assessment, continuing with email...');
      }

      // Send email with both assessments
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-assessment-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          description: descriptionForAssessment,
          urgency,
          clientAssessment,
          teamAssessment,
          documentCount: uploadedFiles.length,
          hasVoiceNote: !!voiceNote,
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
      setUploadedFiles([]);
      setVoiceNote(null);
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
                      <Label htmlFor="annualTurnover">Approximate Annual Turnover *</Label>
                      <Input 
                        id="annualTurnover" 
                        placeholder="e.g. £150,000" 
                        value={formData.annualIncome}
                        onChange={(e) => handleTurnoverChange(e.target.value)}
                        required
                      />
                      <p className="text-xs text-muted-foreground mt-1">Enter your approximate annual business turnover or personal income</p>
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
                      <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                        <Label htmlFor="description">Brief Description of Your Situation {!voiceNote && '*'}</Label>
                        <VoiceRecorder 
                          onVoiceNote={setVoiceNote}
                          disabled={isSubmitting}
                          hasVoiceNote={!!voiceNote}
                        />
                      </div>
                      <Textarea 
                        id="description" 
                        required={!voiceNote}
                        rows={6}
                        placeholder="Please describe your situation in detail. Include:
- What HMRC has contacted you about
- When you received the letter/notice
- What they are claiming or investigating
- Any amounts mentioned
- Any deadlines you're facing

Or use the 'Record Voice Note' button above to speak your message instead."
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                      />
                      {voiceNote && !formData.description && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Voice note attached. You can also add written details above if needed.
                        </p>
                      )}
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
                  <h2 className="text-2xl font-bold mb-4">Upload HMRC Letters or Documents</h2>
                  <p className="text-sm text-muted-foreground mb-6">
                   If you've received letters, notices, or emails from HMRC, please upload them here so we can review them right away. You can upload multiple documents.
                  </p>

                  {/* Hidden file input - always in DOM */}
                  <input 
                    ref={fileInputRef}
                    type="file" 
                    className="hidden" 
                    accept=".pdf,.jpg,.jpeg,.png,.docx"
                    onChange={handleFileUpload}
                    multiple
                  />

                  <div className="space-y-4">
                    {/* Upload area */}
                    <div 
                      className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-gold/50 transition-colors cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                    >
                      <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="font-medium mb-2">Click to upload or drag and drop</p>
                      <p className="text-sm text-muted-foreground">PDF, JPG, PNG, DOCX (Max 10MB per file)</p>
                    </div>

                    {/* Uploaded Files List */}
                    {uploadedFiles.length > 0 && (
                      <div className="space-y-3">
                        <p className="text-sm font-medium text-muted-foreground">
                          {uploadedFiles.length} document{uploadedFiles.length > 1 ? 's' : ''} uploaded
                        </p>
                        {uploadedFiles.map((fileData, index) => (
                          <div key={`${fileData.file.name}-${index}`} className="bg-muted/50 rounded-lg p-4 flex items-center gap-3 overflow-hidden">
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              <FileText className="h-6 w-6 text-gold flex-shrink-0" />
                              <div className="min-w-0 flex-1">
                                <p className="font-medium truncate">{fileData.file.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {(fileData.file.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              {fileData.isAnalyzing ? (
                                <Loader2 className="h-5 w-5 animate-spin text-gold" />
                              ) : fileData.failed ? (
                                <AlertCircle className="h-5 w-5 text-destructive" />
                              ) : (
                                <CheckCircle className="h-5 w-5 text-green-500" />
                              )}
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFile(index)}
                                className="text-muted-foreground hover:text-foreground p-1 h-auto"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}

                        {/* Processing indicator */}
                        {isAnyFileAnalyzing && (
                          <div className="bg-gold/5 border border-gold/20 rounded-lg p-4">
                            <div className="flex items-center justify-center space-x-3">
                              <Loader2 className="h-5 w-5 animate-spin text-gold" />
                              <p className="text-sm font-medium">Processing your documents...</p>
                            </div>
                          </div>
                        )}
                        
                        {/* Failed documents warning */}
                        {hasAnyFailedFile && !isAnyFileAnalyzing && (
                          <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4">
                            <div className="flex items-center justify-center space-x-3">
                              <AlertCircle className="h-5 w-5 text-destructive" />
                              <p className="text-sm font-medium text-destructive">Some documents failed to process. Please remove them to continue.</p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
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
                  <Button type="submit" variant="danger" size="lg" className="w-full" disabled={isSubmitting || !canSubmitDocuments}>
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
