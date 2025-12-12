import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
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
    const mailtrapApiKey = Deno.env.get("MAILTRAP_API_KEY");
    if (!mailtrapApiKey) {
      throw new Error("MAILTRAP_API_KEY is not configured");
    }

    const data: EmailRequest = await req.json();
    console.log("Received form submission:", { ...data, description: data.description.substring(0, 100) + "..." });

    const urgencyColor = data.urgency >= 8 ? "#dc2626" : data.urgency >= 5 ? "#f97316" : "#22c55e";
    const urgencyLabel = data.urgency >= 8 ? "HIGH" : data.urgency >= 5 ? "MEDIUM" : "LOW";

    // Build the email HTML
    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Assessment Request</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 30px; border-radius: 10px 10px 0 0;">
    <h1 style="color: #f57e20; margin: 0; font-size: 24px;">Investigation.tax</h1>
    <p style="color: #ffffff; margin: 10px 0 0 0;">New Assessment Request</p>
  </div>
  
  <div style="background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none;">
    <div style="background: ${urgencyColor}; color: white; padding: 10px 20px; border-radius: 5px; display: inline-block; margin-bottom: 20px;">
      <strong>Urgency: ${urgencyLabel} (${data.urgency}/10)</strong>
    </div>
    
    <h2 style="color: #1a1a2e; border-bottom: 2px solid #f57e20; padding-bottom: 10px;">Personal Information</h2>
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 8px 0; font-weight: bold; width: 40%;">Name:</td>
        <td style="padding: 8px 0;">${data.firstName} ${data.lastName}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; font-weight: bold;">Email:</td>
        <td style="padding: 8px 0;"><a href="mailto:${data.email}" style="color: #f57e20;">${data.email}</a></td>
      </tr>
      <tr>
        <td style="padding: 8px 0; font-weight: bold;">Phone:</td>
        <td style="padding: 8px 0;"><a href="tel:${data.phone}" style="color: #f57e20;">${data.phone}</a></td>
      </tr>
    </table>
    
    <h2 style="color: #1a1a2e; border-bottom: 2px solid #f57e20; padding-bottom: 10px; margin-top: 30px;">Business Information</h2>
    <table style="width: 100%; border-collapse: collapse;">
      ${data.businessName ? `<tr>
        <td style="padding: 8px 0; font-weight: bold; width: 40%;">Business Name:</td>
        <td style="padding: 8px 0;">${data.businessName}</td>
      </tr>` : ''}
      <tr>
        <td style="padding: 8px 0; font-weight: bold;">Industry:</td>
        <td style="padding: 8px 0;">${data.industry}</td>
      </tr>
      ${data.annualIncome ? `<tr>
        <td style="padding: 8px 0; font-weight: bold;">Annual Income:</td>
        <td style="padding: 8px 0;">${data.annualIncome}</td>
      </tr>` : ''}
    </table>
    
    <h2 style="color: #1a1a2e; border-bottom: 2px solid #f57e20; padding-bottom: 10px; margin-top: 30px;">HMRC Situation</h2>
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 8px 0; font-weight: bold; width: 40%;">Situation Type:</td>
        <td style="padding: 8px 0;">${data.situation}</td>
      </tr>
    </table>
    
    <div style="background: #ffffff; padding: 20px; border-radius: 5px; margin-top: 15px; border-left: 4px solid #f57e20;">
      <h3 style="margin: 0 0 10px 0; color: #1a1a2e;">Description:</h3>
      <p style="margin: 0; white-space: pre-wrap;">${data.description}</p>
    </div>
    
    ${data.documentSummary ? `
    <h2 style="color: #1a1a2e; border-bottom: 2px solid #f57e20; padding-bottom: 10px; margin-top: 30px;">Document Analysis (AI Generated)</h2>
    <div style="background: #fff7ed; padding: 20px; border-radius: 5px; border-left: 4px solid #f57e20;">
      <pre style="margin: 0; white-space: pre-wrap; font-family: Arial, sans-serif; font-size: 14px;">${data.documentSummary}</pre>
    </div>
    ` : ''}
  </div>
  
  <div style="background: #1a1a2e; padding: 20px; border-radius: 0 0 10px 10px; text-align: center;">
    <p style="color: #9ca3af; margin: 0; font-size: 12px;">
      This email was sent from the Investigation.tax website contact form.
    </p>
  </div>
</body>
</html>
    `;

    // Send email via Mailtrap
    const mailtrapResponse = await fetch("https://send.api.mailtrap.io/api/send", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${mailtrapApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: {
          email: "noreply@investigation.tax",
          name: "Investigation.tax"
        },
        to: [
          {
            email: "info@investigation.tax",
            name: "Investigation.tax Team"
          }
        ],
        subject: `${urgencyLabel} Priority: New Assessment Request from ${data.firstName} ${data.lastName}`,
        html: emailHtml,
        category: "Assessment Request"
      }),
    });

    if (!mailtrapResponse.ok) {
      const errorText = await mailtrapResponse.text();
      console.error("Mailtrap API error:", errorText);
      throw new Error(`Failed to send email: ${errorText}`);
    }

    const result = await mailtrapResponse.json();
    console.log("Email sent successfully:", result);

    return new Response(JSON.stringify({ success: true, message: "Email sent successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Error in send-email function:", errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
