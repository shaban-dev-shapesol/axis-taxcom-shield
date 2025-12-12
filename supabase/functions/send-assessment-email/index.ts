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
  documentSummary?: string;
}

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
      documentSummary,
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

          ${documentSummary ? `
          <h2 style="color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 25px;">AI Document Analysis</h2>
          <div style="background-color: #fef7ed; border: 1px solid #f57e20; padding: 15px; border-radius: 8px;">
            <p style="color: #555; margin: 0; white-space: pre-wrap;">${documentSummary}</p>
          </div>
          ` : ''}

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <a href="mailto:${email}?subject=Re: Your HMRC Assessment Request" style="display: inline-block; background-color: #f57e20; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Reply to Client</a>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send confirmation email to the client
    const clientEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>We've Received Your Request</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4;">
        <div style="background-color: #1a1a2e; padding: 30px; border-radius: 10px 10px 0 0;">
          <h1 style="color: #f57e20; margin: 0; font-size: 24px;">Assessment Request Received</h1>
          <p style="color: #ffffff; margin: 10px 0 0 0;">Investigation.tax</p>
        </div>
        
        <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 10px 10px;">
          <p style="color: #333; font-size: 16px;">Dear ${firstName},</p>
          
          <p style="color: #555; line-height: 1.6;">Thank you for contacting Investigation.tax. We have received your assessment request and our team of Chartered Accountants and Business Crime Solicitors will review your case.</p>

          <div style="background-color: #f57e2015; border-left: 4px solid #f57e20; padding: 15px; margin: 20px 0;">
            <strong style="color: #f57e20;">What happens next?</strong>
            <ul style="color: #555; margin: 10px 0 0 0; padding-left: 20px;">
              <li>Our experts will review your submission</li>
              <li>We will contact you within 4 business hours</li>
              ${urgency >= 8 ? '<li style="color: #dc2626;"><strong>High urgency cases are prioritised for immediate response</strong></li>' : ''}
              <li>Initial assessment and recommended next steps</li>
            </ul>
          </div>

          <h3 style="color: #333; margin-top: 25px;">Your Submission Summary</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #666;">Situation:</td><td style="padding: 8px 0;"><strong>${situation}</strong></td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Urgency Level:</td><td style="padding: 8px 0;"><span style="color: ${urgencyColor};">${urgency}/10</span></td></tr>
          </table>

          ${documentSummary ? `
          <h3 style="color: #333; margin-top: 25px;">Document Analysis Summary</h3>
          <div style="background-color: #fef7ed; border: 1px solid #f57e20; padding: 15px; border-radius: 8px;">
            <p style="color: #555; margin: 0; white-space: pre-wrap; font-size: 14px;">${documentSummary}</p>
          </div>
          ` : ''}

          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin-top: 25px; text-align: center;">
            <p style="color: #555; margin: 0 0 10px 0;">Need immediate assistance?</p>
            <a href="tel:+442012345678" style="display: inline-block; background-color: #f57e20; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Call Us Now</a>
          </div>

          <p style="color: #888; font-size: 12px; margin-top: 30px; text-align: center;">
            This email was sent from Investigation.tax. Your information is secure and protected under GDPR.
          </p>
        </div>
      </body>
      </html>
    `;

    // Send email to team (using onboarding@resend.dev for testing, replace with actual team email)
    const teamEmailResponse = await resend.emails.send({
      from: "Investigation.tax <onboarding@resend.dev>",
      to: ["delivered@resend.dev"], // Replace with actual team email
      subject: `${urgencyLevel} New Assessment Request - ${firstName} ${lastName}`,
      html: teamEmailHtml,
    });

    console.log("Team email sent:", teamEmailResponse);

    // Send confirmation email to client
    const clientEmailResponse = await resend.emails.send({
      from: "Investigation.tax <onboarding@resend.dev>",
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
