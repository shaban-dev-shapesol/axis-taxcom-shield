import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

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
  voiceNoteTranscriptions?: string[];
}

// Convert markdown bold syntax to HTML
const formatMarkdownToHtml = (text: string): string => {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br />');
};

// Get urgency background color (light version for backgrounds)
const getUrgencyBgColor = (urgency: number): string => {
  if (urgency >= 8) return '#fef2f2'; // light red
  if (urgency >= 5) return '#fffbeb'; // light amber
  return '#f0fdf4'; // light green
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
      voiceNoteTranscriptions,
    } = data;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !industry || !situation || !description) {
      console.error("Missing required fields");
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const urgencyLevel = urgency >= 8 ? "HIGH URGENCY" : urgency >= 5 ? "Medium Urgency" : "Low Urgency";
    const urgencyColor = urgency >= 8 ? "#dc2626" : urgency >= 5 ? "#f59e0b" : "#22c55e";
    const urgencyBgColor = getUrgencyBgColor(urgency);

    // Generate voice notes HTML for team email with transcriptions
    const voiceNotesHtml = voiceNoteUrls && voiceNoteUrls.length > 0 ? `
      <h2 style="color: #1a1a2e; border-bottom: 2px solid #f57e20; padding-bottom: 10px; margin-top: 30px; font-family: Arial, Helvetica, sans-serif;">Voice Notes (${voiceNoteUrls.length})</h2>

      <div style="background-color: #fff7ed; border: 1px solid #f57e20; padding: 20px; border-radius: 12px; margin-top: 15px;">
        ${voiceNoteUrls.map((url, index) => {
          const transcription = voiceNoteTranscriptions && voiceNoteTranscriptions[index];
          return `
          <div style="background-color: #ffffff; border-radius: 10px; padding: 16px; margin-bottom: 12px; border: 1px solid #fde0c2;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="vertical-align: middle; font-family: Arial, Helvetica, sans-serif;">
                  <table cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="background-color: #f57e20; color: #ffffff; width: 28px; height: 28px; border-radius: 50%; text-align: center; font-size: 12px; font-weight: bold; font-family: Arial, Helvetica, sans-serif;">${index + 1}</td>
                      <td style="padding-left: 12px; color: #1a1a2e; font-weight: 600; font-size: 15px; font-family: Arial, Helvetica, sans-serif;">Voice Note ${index + 1}</td>
                    </tr>
                  </table>
                </td>
                <td style="text-align: right; vertical-align: middle;">
                  <a href="${url}" target="_blank" rel="noreferrer" style="display: inline-block; background-color: #f57e20; color: #ffffff; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; font-family: Arial, Helvetica, sans-serif;">Play / Download</a>
                </td>
              </tr>
            </table>
            <div style="margin-top: 12px; padding: 12px; background-color: #f8fafc; border-radius: 8px; border-left: 3px solid #f57e20;">
              <p style="margin: 0 0 6px 0; font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600; font-family: Arial, Helvetica, sans-serif;">FULL TRANSCRIPT:</p>
              <p style="margin: 0; color: #334155; font-size: 14px; line-height: 1.6; white-space: pre-wrap; font-family: Arial, Helvetica, sans-serif;">${transcription || 'Unable to transcribe audio - manual review required.'}</p>
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
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Assessment Request</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, Helvetica, sans-serif; -webkit-font-smoothing: antialiased;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f4f4f4;">
          <tr>
            <td align="center" style="padding: 20px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width: 600px;">
                <!-- Header -->
                <tr>
                  <td style="background-color: #1a1a2e; padding: 30px; border-radius: 10px 10px 0 0;">
                    <h1 style="color: #f57e20; margin: 0; font-size: 24px; font-family: Arial, Helvetica, sans-serif;">New Assessment Request</h1>
                    <p style="color: #ffffff; margin: 10px 0 0 0; font-family: Arial, Helvetica, sans-serif;">Investigation.tax</p>
                  </td>
                </tr>
                
                <!-- Body -->
                <tr>
                  <td style="background-color: #ffffff; padding: 30px; border-radius: 0 0 10px 10px;">
                    <!-- Urgency Banner -->
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 20px;">
                      <tr>
                        <td style="background-color: ${urgencyBgColor}; border-left: 4px solid ${urgencyColor}; padding: 15px;">
                          <strong style="color: ${urgencyColor}; font-family: Arial, Helvetica, sans-serif;">${urgencyLevel} (${urgency}/10)</strong>
                        </td>
                      </tr>
                    </table>

                    <h2 style="color: #333333; border-bottom: 1px solid #eeeeee; padding-bottom: 10px; font-family: Arial, Helvetica, sans-serif;">Contact Information</h2>
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr><td style="padding: 8px 0; color: #666666; font-family: Arial, Helvetica, sans-serif;">Name:</td><td style="padding: 8px 0; font-family: Arial, Helvetica, sans-serif;"><strong style="color: #333333;">${firstName} ${lastName}</strong></td></tr>
                      <tr><td style="padding: 8px 0; color: #666666; font-family: Arial, Helvetica, sans-serif;">Email:</td><td style="padding: 8px 0; font-family: Arial, Helvetica, sans-serif;"><a href="mailto:${email}" style="color: #f57e20;">${email}</a></td></tr>
                      <tr><td style="padding: 8px 0; color: #666666; font-family: Arial, Helvetica, sans-serif;">Phone:</td><td style="padding: 8px 0; font-family: Arial, Helvetica, sans-serif;"><a href="tel:${phone}" style="color: #f57e20;">${phone}</a></td></tr>
                    </table>

                    <h2 style="color: #333333; border-bottom: 1px solid #eeeeee; padding-bottom: 10px; margin-top: 25px; font-family: Arial, Helvetica, sans-serif;">Business Information</h2>
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                      ${businessName ? `<tr><td style="padding: 8px 0; color: #666666; font-family: Arial, Helvetica, sans-serif;">Business:</td><td style="padding: 8px 0; font-family: Arial, Helvetica, sans-serif;"><strong style="color: #333333;">${businessName}</strong></td></tr>` : ''}
                      <tr><td style="padding: 8px 0; color: #666666; font-family: Arial, Helvetica, sans-serif;">Industry:</td><td style="padding: 8px 0; color: #333333; font-family: Arial, Helvetica, sans-serif;">${industry}</td></tr>
                      ${annualIncome ? `<tr><td style="padding: 8px 0; color: #666666; font-family: Arial, Helvetica, sans-serif;">Annual Income:</td><td style="padding: 8px 0; color: #333333; font-family: Arial, Helvetica, sans-serif;">${annualIncome}</td></tr>` : ''}
                    </table>

                    <h2 style="color: #333333; border-bottom: 1px solid #eeeeee; padding-bottom: 10px; margin-top: 25px; font-family: Arial, Helvetica, sans-serif;">HMRC Situation</h2>
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr><td style="padding: 8px 0; color: #666666; font-family: Arial, Helvetica, sans-serif;">Situation Type:</td><td style="padding: 8px 0; font-family: Arial, Helvetica, sans-serif;"><strong style="color: #333333;">${situation}</strong></td></tr>
                    </table>
                    
                    <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin-top: 15px;">
                      <strong style="color: #333333; font-family: Arial, Helvetica, sans-serif;">Description:</strong>
                      <p style="color: #555555; margin: 10px 0 0 0; white-space: pre-wrap; font-family: Arial, Helvetica, sans-serif;">${description}</p>
                    </div>

                    ${teamAssessment ? `
                    <h2 style="color: #333333; border-bottom: 1px solid #eeeeee; padding-bottom: 10px; margin-top: 25px; font-family: Arial, Helvetica, sans-serif;">AI Case Assessment (Internal)</h2>
                    <div style="background-color: #fef7ed; border: 1px solid #f57e20; padding: 15px; border-radius: 8px;">
                      <p style="color: #555555; margin: 0; font-family: Arial, Helvetica, sans-serif;">${formatMarkdownToHtml(teamAssessment)}</p>
                    </div>
                    ${documentCount ? `<p style="color: #666666; font-size: 12px; margin-top: 10px; font-family: Arial, Helvetica, sans-serif;">${documentCount} document(s) uploaded and analyzed</p>` : ''}
                    ` : ''}

                    ${voiceNotesHtml}

                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eeeeee;">
                      <tr>
                        <td>
                          <a href="mailto:${email}?subject=Re: Your HMRC Assessment Request" style="display: inline-block; background-color: #f57e20; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; font-family: Arial, Helvetica, sans-serif;">Reply to Client</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    // Generate situation-specific guidance for the client
    const getSituationGuidance = (sit: string): { title: string; message: string; urgentAction: string } => {
      const situationMap: Record<string, { title: string; message: string; urgentAction: string }> = {
        'cop9': {
          title: 'Code of Practice 9 (COP9) Investigation',
          message: 'A COP9 letter is one of the most serious communications HMRC issues—it means they suspect deliberate tax fraud. However, this also presents a critical opportunity: the Contractual Disclosure Facility (CDF) allows you to make a full disclosure and avoid criminal prosecution. Time is of the essence, and having expert representation from day one can make a substantial difference to the outcome.',
          urgentAction: 'Do NOT respond to HMRC until you have spoken with our specialists. Any communication without proper guidance could significantly impact your case.'
        },
        'hmrc-investigation': {
          title: 'HMRC Investigation',
          message: 'An HMRC investigation can feel overwhelming, but with the right expertise, many cases are resolved favourably. Our team has successfully defended hundreds of investigations, often reducing proposed penalties significantly or having enquiries closed with minimal adjustments.',
          urgentAction: 'Gather all correspondence from HMRC and avoid making any statements or providing documents until we review your case together.'
        },
        'tax-tribunal': {
          title: 'Tax Tribunal Appeal',
          message: 'Taking your case to the Tax Tribunal is a significant step, but it can be the right one. Many taxpayers who challenge HMRC decisions with proper representation achieve successful outcomes. Our solicitors and accountants work together to build robust cases.',
          urgentAction: 'Keep track of all deadlines—tribunal timelines are strict. We will help you prepare a compelling case.'
        },
        'unpaid-taxes': {
          title: 'Unpaid Tax Liabilities',
          message: 'Unpaid tax debts can escalate quickly with interest and penalties, but proactive disclosure often leads to significantly better outcomes than waiting for HMRC to discover discrepancies. Our team specialises in negotiating Time to Pay arrangements and minimising penalties.',
          urgentAction: 'Coming forward voluntarily can reduce penalties by up to 30-40%. Let us help you take control of this situation.'
        },
        'vat-dispute': {
          title: 'VAT Dispute',
          message: 'VAT disputes can be complex, with significant sums at stake. Whether it\'s an assessment you disagree with or a penalty you wish to challenge, our experts understand VAT legislation inside out and have successfully resolved numerous disputes.',
          urgentAction: 'Review your VAT records and any correspondence from HMRC. We will assess the strength of your position.'
        },
        'criminal-prosecution': {
          title: 'Criminal Tax Prosecution',
          message: 'Facing criminal prosecution for tax matters is extremely serious, but it\'s not the end. Having experienced Business Crime Solicitors alongside Chartered Accountants provides the strongest possible defence. Early intervention is critical.',
          urgentAction: 'Exercise your right to remain silent. Do not speak to HMRC or investigators without legal representation present.'
        },
        'other': {
          title: 'Your Tax Matter',
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
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your Case Assessment - Investigation.tax</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, Helvetica, sans-serif; -webkit-font-smoothing: antialiased;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f4f4f4;">
          <tr>
            <td align="center" style="padding: 20px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width: 600px;">
                <!-- Header -->
                <tr>
                  <td style="background-color: #1a1a2e; padding: 30px; border-radius: 10px 10px 0 0;">
                    <h1 style="color: #f57e20; margin: 0; font-size: 24px; font-family: Arial, Helvetica, sans-serif;">Your Case Is Now With Our Experts</h1>
                    <p style="color: #ffffff; margin: 10px 0 0 0; font-family: Arial, Helvetica, sans-serif;">Investigation.tax | Chartered Accountants &amp; Business Crime Solicitors</p>
                  </td>
                </tr>
                
                <!-- Body -->
                <tr>
                  <td style="background-color: #ffffff; padding: 30px; border-radius: 0 0 10px 10px;">
                    <p style="color: #333333; font-size: 18px; font-weight: 600; font-family: Arial, Helvetica, sans-serif;">Dear ${firstName},</p>
                    
                    <p style="color: #555555; line-height: 1.7; font-size: 15px; font-family: Arial, Helvetica, sans-serif;">Thank you for reaching out to us. <strong>You've taken the right first step</strong>—speaking to specialists who understand exactly what you're facing. We want you to know that you're not alone, and situations like yours can often be resolved more favourably than you might expect.</p>

                    <!-- Situation-Specific Case Summary Box -->
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin: 25px 0;">
                      <tr>
                        <td style="background-color: #1a1a2e; border-radius: 12px; padding: 25px;">
                          <h2 style="color: #f57e20; margin: 0 0 15px 0; font-size: 18px; font-family: Arial, Helvetica, sans-serif;">${guidance.title}</h2>
                          <p style="color: #ffffff; line-height: 1.7; margin: 0; font-size: 14px; font-family: Arial, Helvetica, sans-serif;">${guidance.message}</p>
                        </td>
                      </tr>
                    </table>

                    <!-- Urgent Action Box -->
                    ${urgency >= 5 ? `
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin: 20px 0;">
                      <tr>
                        <td style="background-color: #fef2f2; border: 2px solid #dc2626; border-radius: 10px; padding: 20px;">
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tr>
                              <td width="40" valign="top" style="font-size: 24px;">⚡</td>
                              <td valign="top">
                                <strong style="color: #dc2626; font-size: 15px; font-family: Arial, Helvetica, sans-serif;">Important: What to Do Right Now</strong>
                                <p style="color: #7f1d1d; margin: 8px 0 0 0; font-size: 14px; line-height: 1.6; font-family: Arial, Helvetica, sans-serif;">${guidance.urgentAction}</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                    ` : ''}

                    <!-- Why Investigation.tax -->
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin: 25px 0;">
                      <tr>
                        <td style="background-color: #f8fafc; border-radius: 10px; padding: 20px;">
                          <h3 style="color: #1a1a2e; margin: 0 0 15px 0; font-size: 16px; font-family: Arial, Helvetica, sans-serif;">Why Clients Trust Us</h3>
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tr>
                              <td width="30" valign="top" style="padding: 8px 0; color: #22c55e; font-size: 16px;">✓</td>
                              <td style="padding: 8px 0; color: #555555; font-size: 14px; font-family: Arial, Helvetica, sans-serif;"><strong>Dual Expertise:</strong> Chartered Accountants and Business Crime Solicitors working together on your case</td>
                            </tr>
                            <tr>
                              <td width="30" valign="top" style="padding: 8px 0; color: #22c55e; font-size: 16px;">✓</td>
                              <td style="padding: 8px 0; color: #555555; font-size: 14px; font-family: Arial, Helvetica, sans-serif;"><strong>Proven Track Record:</strong> Successfully resolved hundreds of HMRC investigations and disputes</td>
                            </tr>
                            <tr>
                              <td width="30" valign="top" style="padding: 8px 0; color: #22c55e; font-size: 16px;">✓</td>
                              <td style="padding: 8px 0; color: #555555; font-size: 14px; font-family: Arial, Helvetica, sans-serif;"><strong>Confidential &amp; Protected:</strong> All communications covered by legal privilege where applicable</td>
                            </tr>
                            <tr>
                              <td width="30" valign="top" style="padding: 8px 0; color: #22c55e; font-size: 16px;">✓</td>
                              <td style="padding: 8px 0; color: #555555; font-size: 14px; font-family: Arial, Helvetica, sans-serif;"><strong>Fast Response:</strong> Priority cases reviewed within hours, not days</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <!-- What Happens Next -->
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin: 20px 0;">
                      <tr>
                        <td style="background-color: #fff7ed; border-left: 4px solid #f57e20; padding: 20px; border-radius: 0 10px 10px 0;">
                          <strong style="color: #f57e20; font-size: 16px; font-family: Arial, Helvetica, sans-serif;">What Happens Next?</strong>
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top: 15px;">
                            <tr>
                              <td width="25" valign="top" style="color: #f57e20; font-weight: bold; font-family: Arial, Helvetica, sans-serif;">1.</td>
                              <td style="color: #555555; padding-bottom: 8px; font-family: Arial, Helvetica, sans-serif;"><strong>Expert Review</strong> — Our specialists are analysing your case right now</td>
                            </tr>
                            <tr>
                              <td width="25" valign="top" style="color: #f57e20; font-weight: bold; font-family: Arial, Helvetica, sans-serif;">2.</td>
                              <td style="color: #555555; padding-bottom: 8px; font-family: Arial, Helvetica, sans-serif;"><strong>Personal Contact</strong> — ${urgency >= 8 ? 'Given the urgency, expect a call within 2 hours' : 'We will contact you within 4 business hours'}</td>
                            </tr>
                            <tr>
                              <td width="25" valign="top" style="color: #f57e20; font-weight: bold; font-family: Arial, Helvetica, sans-serif;">3.</td>
                              <td style="color: #555555; padding-bottom: 8px; font-family: Arial, Helvetica, sans-serif;"><strong>Tailored Strategy</strong> — We will outline your options and recommend the best approach</td>
                            </tr>
                            <tr>
                              <td width="25" valign="top" style="color: #f57e20; font-weight: bold; font-family: Arial, Helvetica, sans-serif;">4.</td>
                              <td style="color: #555555; font-family: Arial, Helvetica, sans-serif;"><strong>Clear Path Forward</strong> — No jargon, just straightforward guidance</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    ${clientAssessment ? `
                    <!-- AI Case Assessment -->
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin: 25px 0;">
                      <tr>
                        <td style="background-color: #fef7ed; border: 1px solid #f57e20; padding: 20px; border-radius: 12px;">
                          <h3 style="color: #1a1a2e; margin: 0 0 15px 0; font-size: 16px; font-family: Arial, Helvetica, sans-serif;">Your Preliminary Case Assessment</h3>
                          <div style="color: #555555; font-size: 14px; line-height: 1.7; font-family: Arial, Helvetica, sans-serif;">${formatMarkdownToHtml(clientAssessment)}</div>
                        </td>
                      </tr>
                    </table>
                    ` : ''}

                    <!-- Your Submission Reference -->
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin: 20px 0;">
                      <tr>
                        <td style="background-color: #f1f5f9; border-radius: 8px; padding: 15px;">
                          <p style="color: #64748b; margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; font-family: Arial, Helvetica, sans-serif;">Your Submission Reference</p>
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tr><td style="padding: 4px 0; color: #666666; font-size: 14px; font-family: Arial, Helvetica, sans-serif;">Case Type:</td><td style="padding: 4px 0; font-size: 14px; font-family: Arial, Helvetica, sans-serif;"><strong style="color: #333333;">${situation}</strong></td></tr>
                            <tr><td style="padding: 4px 0; color: #666666; font-size: 14px; font-family: Arial, Helvetica, sans-serif;">Priority Level:</td><td style="padding: 4px 0; font-family: Arial, Helvetica, sans-serif;"><span style="background-color: ${urgencyBgColor}; color: ${urgencyColor}; padding: 2px 8px; border-radius: 4px; font-size: 13px; font-weight: 600;">${urgency}/10</span></td></tr>
                            ${documentCount ? `<tr><td style="padding: 4px 0; color: #666666; font-size: 14px; font-family: Arial, Helvetica, sans-serif;">Documents:</td><td style="padding: 4px 0; font-size: 14px; color: #333333; font-family: Arial, Helvetica, sans-serif;">${documentCount} file(s) uploaded</td></tr>` : ''}
                            ${voiceNoteUrls && voiceNoteUrls.length > 0 ? `<tr><td style="padding: 4px 0; color: #666666; font-size: 14px; font-family: Arial, Helvetica, sans-serif;">Voice Notes:</td><td style="padding: 4px 0; font-size: 14px; color: #333333; font-family: Arial, Helvetica, sans-serif;">${voiceNoteUrls.length} recording(s) attached</td></tr>` : ''}
                          </table>
                        </td>
                      </tr>
                    </table>

                    <!-- Call to Action -->
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top: 25px;">
                      <tr>
                        <td style="background-color: #1a1a2e; padding: 25px; border-radius: 12px; text-align: center;">
                          <p style="color: #ffffff; margin: 0 0 15px 0; font-size: 16px; font-family: Arial, Helvetica, sans-serif;">Need to speak with someone urgently?</p>
                          <a href="tel:+442012345678" style="display: inline-block; background-color: #f57e20; color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; font-family: Arial, Helvetica, sans-serif;">Call Us Now</a>
                          <p style="color: #94a3b8; margin: 15px 0 0 0; font-size: 13px; font-family: Arial, Helvetica, sans-serif;">Available Monday–Friday, 9am–6pm</p>
                        </td>
                      </tr>
                    </table>

                    <!-- Reassurance Footer -->
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
                      <tr>
                        <td style="text-align: center;">
                          <p style="color: #64748b; font-size: 14px; line-height: 1.6; margin: 0; font-family: Arial, Helvetica, sans-serif;">
                            <strong>Remember:</strong> Early action leads to better outcomes.<br />
                            We're here to guide you through this—one step at a time.
                          </p>
                        </td>
                      </tr>
                    </table>

                    <p style="color: #94a3b8; font-size: 11px; margin-top: 25px; text-align: center; line-height: 1.5; font-family: Arial, Helvetica, sans-serif;">
                      This email was sent from Investigation.tax. Your information is secure and protected under GDPR.<br />
                      © Investigation.tax | Chartered Accountants &amp; Business Crime Solicitors
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
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
