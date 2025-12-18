import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AssessmentRequest {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    businessName?: string;
    industry: string;
    annualIncome?: string;
    situation: string;
    description: string;
  };
  urgency: number;
  documentSummaries: string[];
}

const clientSystemPrompt = `You are a senior tax investigation analyst at Investigation.tax, a specialist firm combining Chartered Accountants and Business Crime Solicitors. You are preparing a personalised assessment for a client who has submitted an enquiry.

IMPORTANT: Write this assessment directly TO the client using second-person language ("you", "your", "yourself"). Do NOT refer to them in third person ("the client", "they"). This assessment will be sent directly to them.

Your assessment should be professional, reassuring, and informative. Consider:
1. The nature and severity of the HMRC investigation or compliance issue
2. Risk factors based on industry, income level, and situation
3. Whether this requires immediate attention or standard processing
4. Recommended service tier (accountant-led vs solicitor involvement)
5. Potential areas of concern and defence strategies

Format your assessment as follows:

**🎯 CASE CLASSIFICATION**
[Investigation type / Compliance issue / Pre-emptive action]

**⚡ PRIORITY LEVEL:** [CRITICAL / HIGH / MEDIUM / LOW]
[Brief justification]

**📋 YOUR CASE SUMMARY**
[3-4 sentences summarising YOUR situation and what YOU are facing - use "you", "your"]

**🔍 KEY OBSERVATIONS**
- [Observation about your case 1]
- [Observation about your case 2]
- [Observation about your case 3]

**⚠️ RISK FACTORS TO CONSIDER**
- [Risk 1]
- [Risk 2]
- [Risk 3]

**💼 RECOMMENDED APPROACH FOR YOUR CASE**
[Accountant-led / Joint accountant-solicitor / Solicitor-led]
[Brief explanation of why this approach suits your situation]

**📞 NEXT STEPS**
1. [What you should do / expect next]
2. [Action 2]
3. [Action 3]

**📝 WHAT HAPPENS NOW**
[Reassuring message about how we will contact you and what to expect]

Be direct and professional but reassuring. Address the client directly using "you" and "your" throughout. If documents show serious HMRC action (COP 8, COP 9, criminal investigation letters), flag this clearly but remain supportive.`;

const teamSystemPrompt = `You are a senior tax investigation analyst at Investigation.tax, a specialist firm combining Chartered Accountants and Business Crime Solicitors. You are reviewing a new client enquiry to provide an internal assessment for the team.

IMPORTANT: Write this assessment about the client using third-person language ("the client", "they", "their"). This is an internal document for the team to review before contacting the client.

Your assessment should be professional, thorough, and actionable. Consider:
1. The nature and severity of the HMRC investigation or compliance issue
2. Risk factors based on industry, income level, and situation
3. Whether this requires immediate attention or standard processing
4. Recommended service tier (accountant-led vs solicitor involvement)
5. Potential areas of concern and defence strategies
6. Internal notes on how to approach this client

Format your assessment as follows:

**🎯 CASE CLASSIFICATION**
[Investigation type / Compliance issue / Pre-emptive action]

**⚡ PRIORITY LEVEL:** [CRITICAL / HIGH / MEDIUM / LOW]
[Brief justification]

**📋 CASE SUMMARY**
[3-4 sentences summarising the client's situation and what they are facing]

**🔍 KEY OBSERVATIONS**
- [Observation 1]
- [Observation 2]
- [Observation 3]

**⚠️ RISK FACTORS**
- [Risk 1]
- [Risk 2]
- [Risk 3]

**💼 RECOMMENDED SERVICE APPROACH**
[Accountant-led / Joint accountant-solicitor / Solicitor-led]
[Brief explanation of why this approach is recommended]

**📞 RECOMMENDED NEXT STEPS FOR TEAM**
1. [Action 1]
2. [Action 2]
3. [Action 3]

**📝 NOTES FOR CLIENT COMMUNICATION**
[Key points to convey in initial contact with the client, potential sensitivities to be aware of]

Be direct and professional. If documents show serious HMRC action (COP 8, COP 9, criminal investigation letters), flag this prominently. Include any red flags or concerns the team should be aware of.`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { formData, urgency, documentSummaries }: AssessmentRequest = await req.json();

    console.log('Generating comprehensive assessments for:', formData.firstName, formData.lastName);
    console.log('Urgency:', urgency);
    console.log('Number of documents:', documentSummaries.length);

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    // Build context from form data and documents
    let contextParts: string[] = [];

    // Client info
    contextParts.push(`**Client Information:**
- Name: ${formData.firstName} ${formData.lastName}
- Email: ${formData.email}
- Phone: +44 ${formData.phone}
${formData.businessName ? `- Business: ${formData.businessName}` : ''}
- Industry: ${formData.industry}
${formData.annualIncome ? `- Annual Income: ${formData.annualIncome}` : ''}`);

    // Situation
    contextParts.push(`**Current Situation:** ${formData.situation}`);
    
    // Client's description
    contextParts.push(`**Client's Description of Their Case:**
${formData.description}`);

    // Urgency
    const urgencyLevel = urgency >= 8 ? 'HIGH/CRITICAL' : urgency >= 5 ? 'MEDIUM' : 'LOW';
    contextParts.push(`**Self-Reported Urgency:** ${urgency}/10 (${urgencyLevel})`);

    // Document summaries if any
    if (documentSummaries.length > 0) {
      contextParts.push(`**HMRC Documents Uploaded (${documentSummaries.length}):**`);
      documentSummaries.forEach((summary, i) => {
        contextParts.push(`\n--- Document ${i + 1} ---\n${summary}`);
      });
    } else {
      contextParts.push(`**HMRC Documents:** None uploaded`);
    }

    const fullContext = contextParts.join('\n\n');
    const userMessage = `Please provide a comprehensive initial assessment for this new client enquiry:\n\n${fullContext}`;

    // Generate both assessments in parallel
    const [clientResponse, teamResponse] = await Promise.all([
      fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${LOVABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'google/gemini-2.5-flash',
          messages: [
            { role: 'system', content: clientSystemPrompt },
            { role: 'user', content: userMessage }
          ]
        }),
      }),
      fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${LOVABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'google/gemini-2.5-flash',
          messages: [
            { role: 'system', content: teamSystemPrompt },
            { role: 'user', content: userMessage }
          ]
        }),
      })
    ]);

    // Handle errors
    for (const [name, response] of [['client', clientResponse], ['team', teamResponse]] as const) {
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`AI ${name} assessment error:`, response.status, errorText);
        
        if (response.status === 429) {
          throw new Error('Rate limit exceeded. Please try again in a moment.');
        }
        if (response.status === 402) {
          throw new Error('AI service quota exceeded. Please contact support.');
        }
        throw new Error(`Failed to generate ${name} assessment`);
      }
    }

    const clientData = await clientResponse.json();
    const teamData = await teamResponse.json();
    
    const clientAssessment = clientData.choices?.[0]?.message?.content || 'Unable to generate assessment.';
    const teamAssessment = teamData.choices?.[0]?.message?.content || 'Unable to generate assessment.';

    console.log('Both assessments generated successfully');

    return new Response(
      JSON.stringify({ 
        success: true,
        clientAssessment,
        teamAssessment
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error generating assessment:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to generate assessment';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
