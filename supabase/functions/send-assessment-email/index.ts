import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AssessmentEmailRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  businessName?: string;
  industry: string;
  annualIncome?: string;
  situation: string;
  description: string;
  urgency: number;
  clientAssessment?: string;
  teamAssessment?: string;
  documentCount?: number;
  voiceNoteUrls?: string[];
}

interface VoiceTranscription {
  url: string;
  transcript: string;
  summary: string;
}

// Transcribe voice note using Lovable AI
async function transcribeVoiceNote(audioUrl: string): Promise<{ transcript: string; summary: string }> {
  try {
    console.log("Fetching audio from:", audioUrl);
    
    // Fetch the audio file
    const audioResponse = await fetch(audioUrl);
    if (!audioResponse.ok) {
      throw new Error(`Failed to fetch audio: ${audioResponse.status}`);
    }
    
    const audioBuffer = await audioResponse.arrayBuffer();
    const base64Audio = btoa(String.fromCharCode(...new Uint8Array(audioBuffer)));
    
    // Determine mime type from URL
    const mimeType = audioUrl.includes('.webm') ? 'audio/webm' : 
                     audioUrl.includes('.mp3') ? 'audio/mp3' : 
                     audioUrl.includes('.wav') ? 'audio/wav' : 'audio/webm';
    
    console.log("Transcribing audio with Lovable AI...");
    
    // Use Lovable AI to transcribe and analyze
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You are an expert transcriptionist and analyst for a tax investigation consultancy. 
Your task is to:
1. Accurately transcribe the audio recording
2. Provide a brief professional summary highlighting key concerns, financial details, and urgency indicators

Format your response EXACTLY as:
TRANSCRIPT:
[Full transcription of the audio]

SUMMARY:
[2-3 sentence professional summary highlighting key points relevant to an HMRC investigation case]`
          },
          {
            role: "user",
            content: [
              {
                type: "input_audio",
                input_audio: {
                  data: base64Audio,
                  format: mimeType.split('/')[1]
                }
              },
              {
                type: "text",
                text: "Please transcribe this voice note from a client describing their HMRC tax situation, then provide a brief summary."
              }
            ]
          }
        ],
        max_tokens: 2000
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Lovable AI error:", response.status, errorText);
      throw new Error(`Transcription failed: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";
    
    console.log("Transcription received, parsing...");
    
    // Parse the response
    const transcriptMatch = content.match(/TRANSCRIPT:\s*([\s\S]*?)(?=SUMMARY:|$)/i);
    const summaryMatch = content.match(/SUMMARY:\s*([\s\S]*?)$/i);
    
    const transcript = transcriptMatch?.[1]?.trim() || content;
    const summary = summaryMatch?.[1]?.trim() || "Voice note recorded - manual review recommended.";
    
    return { transcript, summary };
  } catch (error) {
    console.error("Error transcribing voice note:", error);
    return { 
      transcript: "Unable to transcribe audio - manual review required.", 
      summary: "Voice note attached - please listen to the recording for details."
    };
  }
}

// Convert markdown bold syntax to HTML
const formatMarkdownToHtml = (text: string): string => {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br />');
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: AssessmentEmailRequest = await req.json();
    console.log("Received assessment request:", { ...data, description: data.description.substring(0, 50) + "..." });

    const {
      firstName,
      lastName,
      email,
      phone,
      businessName,
      industry,
      annualIncome,
      situation,
      description,
      urgency,
      clientAssessment,
      teamAssessment,
      documentCount,
      voiceNoteUrls,
    } = data;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !industry || !situation || !description) {
      console.error("Missing required fields");
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const urgencyLevel = urgency >= 8 ? "🔴 HIGH URGENCY" : urgency >= 5 ? "🟡 Medium Urgency" : "🟢 Low Urgency";
    const urgencyColor = urgency >= 8 ? "#dc2626" : urgency >= 5 ? "#f59e0b" : "#22c55e";

    // Transcribe all voice notes
    let voiceTranscriptions: VoiceTranscription[] = [];
    if (voiceNoteUrls && voiceNoteUrls.length > 0) {
      console.log(`Transcribing ${voiceNoteUrls.length} voice note(s)...`);
      
      const transcriptionPromises = voiceNoteUrls.map(async (url) => {
        const { transcript, summary } = await transcribeVoiceNote(url);
        return { url, transcript, summary };
      });
      
      voiceTranscriptions = await Promise.all(transcriptionPromises);
      console.log("Voice transcriptions completed");
    }

    // Generate voice notes HTML for team email with transcriptions
    const voiceNotesHtml = voiceTranscriptions.length > 0 ? `
      <h2 style="color: #1a1a2e; border-bottom: 2px solid #f57e20; padding-bottom: 10px; margin-top: 30px;">🎤 Voice Notes & Transcriptions (${voiceTranscriptions.length})</h2>

      <div style="background: linear-gradient(135deg, #fff7ed 0%, #fef3e2 100%); border: 1px solid #f57e20; padding: 20px; border-radius: 12px; margin-top: 15px;">
        ${voiceTranscriptions.map((vt, index) => {
          return `
          <div style="background-color: white; border-radius: 10px; padding: 20px; margin-bottom: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); border: 1px solid #fde0c2;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
              <div>
                <div style="display: inline-block; background-color: #f57e20; color: white; width: 28px; height: 28px; border-radius: 50%; text-align: center; line-height: 28px; font-size: 12px; font-weight: bold; margin-right: 12px;">${index + 1}</div>
                <span style="color: #1a1a2e; font-weight: 600; font-size: 15px;">Voice Note ${index + 1}</span>
              </div>
              <a href="${vt.url}" target="_blank" rel="noreferrer" style="display: inline-block; background-color: #f57e20; color: #ffffff; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">▶ Play Audio</a>
            </div>
            
            <!-- Summary Box -->
            <div style="background-color: #fef7ed; border-left: 4px solid #f57e20; padding: 12px 16px; margin-bottom: 15px; border-radius: 0 8px 8px 0;">
              <strong style="color: #f57e20; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">📋 Key Points:</strong>
              <p style="color: #1a1a2e; margin: 8px 0 0 0; font-size: 14px; line-height: 1.6;">${vt.summary}</p>
            </div>
            
            <!-- Full Transcript -->
            <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px;">
              <strong style="color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">📝 Full Transcript:</strong>
              <p style="color: #374151; margin: 10px 0 0 0; font-size: 14px; line-height: 1.7; white-space: pre-wrap;">${vt.transcript}</p>
            </div>
          </div>
          `;
        }).join('')}
      </div>
    ` : '';

    // Send notification email to the team
    const teamEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Assessment Request</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4;">
        <div style="background-color: #1a1a2e; padding: 30px; border-radius: 10px 10px 0 0;">
          <h1 style="color: #f57e20; margin: 0; font-size: 24px;">New Assessment Request</h1>
          <p style="color: #ffffff; margin: 10px 0 0 0;">Investigation.tax</p>
        </div>
        
        <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 10px 10px;">
          <div style="background-color: ${urgencyColor}15; border-left: 4px solid ${urgencyColor}; padding: 15px; margin-bottom: 20px;">
            <strong style="color: ${urgencyColor};">${urgencyLevel} (${urgency}/10)</strong>
          </div>

          <h2 style="color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px;">Contact Information</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #666;">Name:</td><td style="padding: 8px 0;"><strong>${firstName} ${lastName}</strong></td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Phone:</td><td style="padding: 8px 0;"><a href="tel:${phone}">${phone}</a></td></tr>
          </table>

          <h2 style="color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 25px;">Business Information</h2>
          <table style="width: 100%; border-collapse: collapse;">
            ${businessName ? `<tr><td style="padding: 8px 0; color: #666;">Business:</td><td style="padding: 8px 0;"><strong>${businessName}</strong></td></tr>` : ''}
            <tr><td style="padding: 8px 0; color: #666;">Industry:</td><td style="padding: 8px 0;">${industry}</td></tr>
            ${annualIncome ? `<tr><td style="padding: 8px 0; color: #666;">Annual Income:</td><td style="padding: 8px 0;">${annualIncome}</td></tr>` : ''}
          </table>

          <h2 style="color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 25px;">HMRC Situation</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #666;">Situation Type:</td><td style="padding: 8px 0;"><strong>${situation}</strong></td></tr>
          </table>
          
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin-top: 15px;">
            <strong style="color: #333;">Description:</strong>
            <p style="color: #555; margin: 10px 0 0 0; white-space: pre-wrap;">${description}</p>
          </div>

          ${teamAssessment ? `
          <h2 style="color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 25px;">AI Case Assessment (Internal)</h2>
          <div style="background-color: #fef7ed; border: 1px solid #f57e20; padding: 15px; border-radius: 8px;">
            <p style="color: #555; margin: 0;">${formatMarkdownToHtml(teamAssessment)}</p>
          </div>
          ${documentCount ? `<p style="color: #666; font-size: 12px; margin-top: 10px;">📎 ${documentCount} document(s) uploaded and analyzed</p>` : ''}
          ` : ''}

          ${voiceNotesHtml}

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <a href="mailto:${email}?subject=Re: Your HMRC Assessment Request" style="display: inline-block; background-color: #f57e20; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Reply to Client</a>
          </div>
        </div>
      </body>
      </html>
    `;

    // Generate situation-specific guidance for the client
    const getSituationGuidance = (sit: string): { title: string; message: string; urgentAction: string } => {
      const situationMap: Record<string, { title: string; message: string; urgentAction: string }> = {
        'cop9': {
          title: '🔴 Code of Practice 9 (COP9) Investigation',
          message: 'A COP9 letter is one of the most serious communications HMRC issues—it means they suspect deliberate tax fraud. However, this also presents a critical opportunity: the Contractual Disclosure Facility (CDF) allows you to make a full disclosure and avoid criminal prosecution. Time is of the essence, and having expert representation from day one can make a substantial difference to the outcome.',
          urgentAction: 'Do NOT respond to HMRC until you have spoken with our specialists. Any communication without proper guidance could significantly impact your case.'
        },
        'hmrc-investigation': {
          title: '⚠️ HMRC Investigation',
          message: 'An HMRC investigation can feel overwhelming, but with the right expertise, many cases are resolved favourably. Our team has successfully defended hundreds of investigations, often reducing proposed penalties significantly or having enquiries closed with minimal adjustments.',
          urgentAction: 'Gather all correspondence from HMRC and avoid making any statements or providing documents until we review your case together.'
        },
        'tax-tribunal': {
          title: '⚖️ Tax Tribunal Appeal',
          message: 'Taking your case to the Tax Tribunal is a significant step, but it can be the right one. Many taxpayers who challenge HMRC decisions with proper representation achieve successful outcomes. Our solicitors and accountants work together to build robust cases.',
          urgentAction: 'Keep track of all deadlines—tribunal timelines are strict. We will help you prepare a compelling case.'
        },
        'unpaid-taxes': {
          title: '💷 Unpaid Tax Liabilities',
          message: 'Unpaid tax debts can escalate quickly with interest and penalties, but proactive disclosure often leads to significantly better outcomes than waiting for HMRC to discover discrepancies. Our team specialises in negotiating Time to Pay arrangements and minimising penalties.',
          urgentAction: 'Coming forward voluntarily can reduce penalties by up to 30-40%. Let us help you take control of this situation.'
        },
        'vat-dispute': {
          title: '📋 VAT Dispute',
          message: 'VAT disputes can be complex, with significant sums at stake. Whether it\'s an assessment you disagree with or a penalty you wish to challenge, our experts understand VAT legislation inside out and have successfully resolved numerous disputes.',
          urgentAction: 'Review your VAT records and any correspondence from HMRC. We will assess the strength of your position.'
        },
        'criminal-prosecution': {
          title: '🚨 Criminal Tax Prosecution',
          message: 'Facing criminal prosecution for tax matters is extremely serious, but it\'s not the end. Having experienced Business Crime Solicitors alongside Chartered Accountants provides the strongest possible defence. Early intervention is critical.',
          urgentAction: 'Exercise your right to remain silent. Do not speak to HMRC or investigators without legal representation present.'
        },
        'other': {
          title: '📌 Your Tax Matter',
          message: 'Every tax situation is unique, and ours is a team that understands this. Whether you\'re facing an enquiry, planning to make a disclosure, or need guidance on a complex matter, we provide tailored advice backed by decades of experience.',
          urgentAction: 'Our team will review your specific circumstances and provide personalised guidance.'
        }
      };
      return situationMap[sit] || situationMap['other'];
    };

    const guidance = getSituationGuidance(situation);

    // Send confirmation email to the client with compelling case summary
    const clientEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Your Case Assessment - Investigation.tax</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4;">
        <div style="background-color: #1a1a2e; padding: 30px; border-radius: 10px 10px 0 0;">
          <h1 style="color: #f57e20; margin: 0; font-size: 24px;">Your Case Is Now With Our Experts</h1>
          <p style="color: #ffffff; margin: 10px 0 0 0;">Investigation.tax | Chartered Accountants & Business Crime Solicitors</p>
        </div>
        
        <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 10px 10px;">
          <p style="color: #333; font-size: 18px; font-weight: 600;">Dear ${firstName},</p>
          
          <p style="color: #555; line-height: 1.7; font-size: 15px;">Thank you for reaching out to us. <strong>You've taken the right first step</strong>—speaking to specialists who understand exactly what you're facing. We want you to know that you're not alone, and situations like yours can often be resolved more favourably than you might expect.</p>

          <!-- Situation-Specific Case Summary Box -->
          <div style="background: linear-gradient(135deg, #1a1a2e 0%, #2d2d4a 100%); border-radius: 12px; padding: 25px; margin: 25px 0;">
            <h2 style="color: #f57e20; margin: 0 0 15px 0; font-size: 18px;">${guidance.title}</h2>
            <p style="color: #ffffff; line-height: 1.7; margin: 0; font-size: 14px;">${guidance.message}</p>
          </div>

          <!-- Urgent Action Box -->
          ${urgency >= 5 ? `
          <div style="background-color: #fef2f2; border: 2px solid #dc2626; border-radius: 10px; padding: 20px; margin: 20px 0;">
            <div style="display: flex; align-items: flex-start;">
              <span style="font-size: 24px; margin-right: 12px;">⚡</span>
              <div>
                <strong style="color: #dc2626; font-size: 15px;">Important: What to Do Right Now</strong>
                <p style="color: #7f1d1d; margin: 8px 0 0 0; font-size: 14px; line-height: 1.6;">${guidance.urgentAction}</p>
              </div>
            </div>
          </div>
          ` : ''}

          <!-- Why Investigation.tax -->
          <div style="background-color: #f8fafc; border-radius: 10px; padding: 20px; margin: 25px 0;">
            <h3 style="color: #1a1a2e; margin: 0 0 15px 0; font-size: 16px;">Why Clients Trust Us</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; vertical-align: top; width: 30px;"><span style="color: #22c55e;">✓</span></td>
                <td style="padding: 8px 0; color: #555; font-size: 14px;"><strong>Dual Expertise:</strong> Chartered Accountants and Business Crime Solicitors working together on your case</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; vertical-align: top;"><span style="color: #22c55e;">✓</span></td>
                <td style="padding: 8px 0; color: #555; font-size: 14px;"><strong>Proven Track Record:</strong> Successfully resolved hundreds of HMRC investigations and disputes</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; vertical-align: top;"><span style="color: #22c55e;">✓</span></td>
                <td style="padding: 8px 0; color: #555; font-size: 14px;"><strong>Confidential & Protected:</strong> All communications covered by legal privilege where applicable</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; vertical-align: top;"><span style="color: #22c55e;">✓</span></td>
                <td style="padding: 8px 0; color: #555; font-size: 14px;"><strong>Fast Response:</strong> Priority cases reviewed within hours, not days</td>
              </tr>
            </table>
          </div>

          <!-- What Happens Next -->
          <div style="background-color: #f57e2010; border-left: 4px solid #f57e20; padding: 20px; margin: 20px 0; border-radius: 0 10px 10px 0;">
            <strong style="color: #f57e20; font-size: 16px;">What Happens Next?</strong>
            <ol style="color: #555; margin: 15px 0 0 0; padding-left: 20px; line-height: 1.8;">
              <li><strong>Expert Review</strong> — Our specialists are analysing your case right now</li>
              <li><strong>Personal Contact</strong> — ${urgency >= 8 ? 'Given the urgency, expect a call within 2 hours' : 'We will contact you within 4 business hours'}</li>
              <li><strong>Tailored Strategy</strong> — We will outline your options and recommend the best approach</li>
              <li><strong>Clear Path Forward</strong> — No jargon, just straightforward guidance</li>
            </ol>
          </div>

          ${clientAssessment ? `
          <!-- AI Case Assessment -->
          <div style="background: linear-gradient(135deg, #fef7ed 0%, #fff7ed 100%); border: 1px solid #f57e20; padding: 20px; border-radius: 12px; margin: 25px 0;">
            <h3 style="color: #1a1a2e; margin: 0 0 15px 0; font-size: 16px;">📋 Your Preliminary Case Assessment</h3>
            <div style="color: #555; font-size: 14px; line-height: 1.7;">${formatMarkdownToHtml(clientAssessment)}</div>
          </div>
          ` : ''}

          <!-- Your Submission Reference -->
          <div style="background-color: #f1f5f9; border-radius: 8px; padding: 15px; margin: 20px 0;">
            <p style="color: #64748b; margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Your Submission Reference</p>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 4px 0; color: #666; font-size: 14px;">Case Type:</td><td style="padding: 4px 0; font-size: 14px;"><strong>${situation}</strong></td></tr>
              <tr><td style="padding: 4px 0; color: #666; font-size: 14px;">Priority Level:</td><td style="padding: 4px 0;"><span style="background-color: ${urgencyColor}20; color: ${urgencyColor}; padding: 2px 8px; border-radius: 4px; font-size: 13px; font-weight: 600;">${urgency}/10</span></td></tr>
              ${documentCount ? `<tr><td style="padding: 4px 0; color: #666; font-size: 14px;">Documents:</td><td style="padding: 4px 0; font-size: 14px;">${documentCount} file(s) uploaded</td></tr>` : ''}
              ${voiceNoteUrls && voiceNoteUrls.length > 0 ? `<tr><td style="padding: 4px 0; color: #666; font-size: 14px;">Voice Notes:</td><td style="padding: 4px 0; font-size: 14px;">${voiceNoteUrls.length} recording(s) attached</td></tr>` : ''}
            </table>
          </div>

          <!-- Call to Action -->
          <div style="background: linear-gradient(135deg, #1a1a2e 0%, #2d2d4a 100%); padding: 25px; border-radius: 12px; margin-top: 25px; text-align: center;">
            <p style="color: #ffffff; margin: 0 0 15px 0; font-size: 16px;">Need to speak with someone urgently?</p>
            <a href="tel:+442012345678" style="display: inline-block; background-color: #f57e20; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">📞 Call Us Now</a>
            <p style="color: #94a3b8; margin: 15px 0 0 0; font-size: 13px;">Available Monday–Friday, 9am–6pm</p>
          </div>

          <!-- Reassurance Footer -->
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center;">
            <p style="color: #64748b; font-size: 14px; line-height: 1.6; margin: 0;">
              <strong>Remember:</strong> Early action leads to better outcomes.<br />
              We're here to guide you through this—one step at a time.
            </p>
          </div>

          <p style="color: #94a3b8; font-size: 11px; margin-top: 25px; text-align: center; line-height: 1.5;">
            This email was sent from Investigation.tax. Your information is secure and protected under GDPR.<br />
            © Investigation.tax | Chartered Accountants & Business Crime Solicitors
          </p>
        </div>
      </body>
      </html>
    `;

    // Send email to team
    const teamEmailResponse = await resend.emails.send({
      from: "Investigation.tax <noreply@investigationtax.shapesol.io>",
      to: ["shaban@shapesol.io"],
      subject: `${urgencyLevel} New Assessment Request - ${firstName} ${lastName}`,
      html: teamEmailHtml,
    });

    console.log("Team email sent:", teamEmailResponse);

    // Send confirmation email to client
    const clientEmailResponse = await resend.emails.send({
      from: "Investigation.tax <noreply@investigationtax.shapesol.io>",
      to: [email],
      subject: "We've Received Your HMRC Assessment Request",
      html: clientEmailHtml,
    });

    console.log("Client email sent:", clientEmailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Emails sent successfully",
        teamEmailId: teamEmailResponse.data?.id,
        clientEmailId: clientEmailResponse.data?.id
      }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Error in send-assessment-email function:", errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
