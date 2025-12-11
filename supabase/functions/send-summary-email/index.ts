import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SendSummaryRequest {
  email: string;
  name: string;
  summary: string;
  fileName: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, name, summary, fileName }: SendSummaryRequest = await req.json();

    console.log(`Sending summary email to ${email} for file: ${fileName}`);

    if (!email || !summary) {
      return new Response(
        JSON.stringify({ error: "Email and summary are required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const emailResponse = await resend.emails.send({
      from: "Investigation.tax <onboarding@resend.dev>",
      to: [email],
      subject: "Your HMRC Document Analysis - Investigation.tax",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: #f57e20; margin: 0; font-size: 28px;">Investigation.tax</h1>
            <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 14px;">Your HMRC Defence Experts</p>
          </div>
          
          <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e5e5; border-top: none;">
            <h2 style="color: #1a1a2e; margin-top: 0;">Dear ${name || 'Valued Client'},</h2>
            
            <p>Thank you for using Investigation.tax to analyse your HMRC document. Below is the summary of <strong>${fileName}</strong>:</p>
            
            <div style="background: #f8f9fa; border-left: 4px solid #f57e20; padding: 20px; margin: 20px 0; border-radius: 0 8px 8px 0;">
              <h3 style="color: #1a1a2e; margin-top: 0; margin-bottom: 15px;">Document Analysis</h3>
              <div style="white-space: pre-wrap; font-size: 14px; color: #444;">
${summary.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}
              </div>
            </div>
            
            <div style="background: #fff3e0; border: 1px solid #f57e20; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; font-size: 14px;"><strong>⚠️ Important:</strong> This is an automated analysis. For a full professional assessment and defence strategy, please speak with our expert team.</p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://investigation.tax/book" style="background: #f57e20; color: #ffffff; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Book a Free Consultation</a>
            </div>
            
            <p style="color: #666; font-size: 14px;">If you have any questions, please don't hesitate to contact us.</p>
          </div>
          
          <div style="background: #1a1a2e; padding: 20px; border-radius: 0 0 10px 10px; text-align: center;">
            <p style="color: #888; margin: 0; font-size: 12px;">
              © ${new Date().getFullYear()} Investigation.tax | Chartered Accountants & Business Crime Solicitors
            </p>
            <p style="color: #888; margin: 10px 0 0 0; font-size: 12px;">
              <a href="tel:02081389107" style="color: #f57e20; text-decoration: none;">0208 138 9107</a> | 
              <a href="mailto:contact@investigation.tax" style="color: #f57e20; text-decoration: none;">contact@investigation.tax</a>
            </p>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Error in send-summary-email function:", errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
