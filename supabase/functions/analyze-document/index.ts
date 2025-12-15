import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { encode } from "https://deno.land/std@0.168.0/encoding/base64.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return new Response(
        JSON.stringify({ error: 'No file provided' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Processing file: ${file.name}, type: ${file.type}, size: ${file.size}`);

    let extractedText = '';
    const fileType = file.type;
    const fileName = file.name.toLowerCase();

    // Handle different file types
    if (fileType === 'application/pdf' || fileName.endsWith('.pdf')) {
      // For PDFs, we'll send the base64 to the AI model for vision-based extraction
      const arrayBuffer = await file.arrayBuffer();
      const base64 = encode(arrayBuffer);
      
      // Use AI vision to extract text from PDF
      const extractionResponse = await extractTextWithVision(base64, 'application/pdf');
      extractedText = extractionResponse;
      
    } else if (fileType.startsWith('image/') || fileName.endsWith('.jpg') || fileName.endsWith('.jpeg') || fileName.endsWith('.png')) {
      // For images, use AI vision directly
      const arrayBuffer = await file.arrayBuffer();
      const base64 = encode(arrayBuffer);
      
      const extractionResponse = await extractTextWithVision(base64, fileType);
      extractedText = extractionResponse;
      
    } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || fileName.endsWith('.docx')) {
      // For DOCX, extract text manually (basic extraction)
      const arrayBuffer = await file.arrayBuffer();
      const base64 = encode(arrayBuffer);
      
      // Use AI to process the document
      const extractionResponse = await extractTextWithVision(base64, fileType);
      extractedText = extractionResponse;
      
    } else {
      return new Response(
        JSON.stringify({ error: 'Unsupported file type. Please upload PDF, JPG, PNG, or DOCX files.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Now generate a summary of the extracted text
    const summary = await generateSummary(extractedText);

    console.log('Document analysis complete');

    return new Response(
      JSON.stringify({ 
        success: true,
        extractedText: extractedText.substring(0, 500) + (extractedText.length > 500 ? '...' : ''),
        summary 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error processing document:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to process document';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

async function extractTextWithVision(base64Data: string, mimeType: string): Promise<string> {
  const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
  
  if (!LOVABLE_API_KEY) {
    throw new Error('LOVABLE_API_KEY is not configured');
  }

  const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${LOVABLE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'google/gemini-2.5-flash',
      messages: [
        {
          role: 'system',
          content: `You are an expert document text extractor. Your task is to extract ALL text from the uploaded document image or PDF. 
          
Extract the text exactly as it appears, preserving:
- Headers and titles
- Paragraph structure
- Reference numbers and dates
- Any tables or lists
- Addresses and contact information

Focus especially on:
- HMRC reference numbers
- Tax years mentioned
- Amounts and figures
- Deadlines and dates
- Names and addresses
- Any warnings or penalty notices`
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Please extract all text from this HMRC document. Include every detail you can see.'
            },
            {
              type: 'image_url',
              image_url: {
                url: `data:${mimeType};base64,${base64Data}`
              }
            }
          ]
        }
      ]
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('AI extraction error:', response.status, errorText);
    
    if (response.status === 429) {
      throw new Error('Rate limit exceeded. Please try again in a moment.');
    }
    if (response.status === 402) {
      throw new Error('AI service quota exceeded. Please contact support.');
    }
    throw new Error('Failed to extract text from document');
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || '';
}

async function generateSummary(extractedText: string): Promise<string> {
  const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
  
  if (!LOVABLE_API_KEY) {
    throw new Error('LOVABLE_API_KEY is not configured');
  }

  const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${LOVABLE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'google/gemini-2.5-flash',
      messages: [
        {
          role: 'system',
          content: `You are an expert HMRC tax investigation analyst working for Investigation.tax, a firm of Chartered Accountants and Business Crime Solicitors.

Your task is to analyse HMRC correspondence and provide a professional summary that helps the client understand:
1. What HMRC is claiming or investigating
2. The severity and urgency of the matter
3. Key dates and deadlines
4. Financial implications
5. Recommended next steps

Format your response as follows:

**📋 Document Type:** [Type of HMRC letter/notice]

**🔴 Urgency Level:** [Low/Medium/High/Critical]

**📝 Summary:**
[2-3 sentence overview of what HMRC wants]

**💰 Financial Implications:**
[Any amounts mentioned, potential penalties, tax owed]

**📅 Key Dates:**
[List any deadlines or important dates]

**⚠️ Key Concerns:**
[What the client should be most aware of]

**✅ Recommended Actions:**
[3-4 specific steps the client should take]

Be professional, clear, and helpful. If this appears to be a serious matter (COP 8, COP 9, criminal investigation), emphasise the urgency and need for professional representation.`
        },
        {
          role: 'user',
          content: `Please analyse this HMRC document and provide a summary:\n\n${extractedText}`
        }
      ]
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('AI summary error:', response.status, errorText);
    
    if (response.status === 429) {
      throw new Error('Rate limit exceeded. Please try again in a moment.');
    }
    if (response.status === 402) {
      throw new Error('AI service quota exceeded. Please contact support.');
    }
    throw new Error('Failed to generate summary');
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || 'Unable to generate summary.';
}
