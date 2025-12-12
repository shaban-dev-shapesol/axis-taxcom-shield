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
          email: "hello@demomailtrap.com",
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
      console.error("Mailtrap API error (team email):", errorText);
      throw new Error(`Failed to send team email: ${errorText}`);
    }

    const teamResult = await mailtrapResponse.json();
    console.log("Team email sent successfully:", teamResult);

    // Send confirmation email to user with document summary if available
    const userEmailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Assessment Request - Investigation.tax</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 30px; border-radius: 10px 10px 0 0;">
    <h1 style="color: #f57e20; margin: 0; font-size: 24px;">Investigation.tax</h1>
    <p style="color: #ffffff; margin: 10px 0 0 0;">Your Assessment Request Has Been Received</p>
  </div>
  
  <div style="background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none;">
    <p style="font-size: 16px; margin-bottom: 20px;">Dear ${data.firstName},</p>
    
    <p style="margin-bottom: 20px;">Thank you for submitting your assessment request. Our team of Chartered Accountants and Business Crime Solicitors will review your case and contact you within <strong>4 business hours</strong>${data.urgency >= 8 ? ' (priority handling due to high urgency)' : ''}.</p>
    
    <div style="background: #fff; padding: 20px; border-radius: 5px; border-left: 4px solid #f57e20; margin-bottom: 20px;">
      <h3 style="margin: 0 0 10px 0; color: #1a1a2e;">Your Reference Details:</h3>
      <p style="margin: 5px 0;"><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
      <p style="margin: 5px 0;"><strong>Email:</strong> ${data.email}</p>
      <p style="margin: 5px 0;"><strong>Phone:</strong> ${data.phone}</p>
      <p style="margin: 5px 0;"><strong>Situation:</strong> ${data.situation}</p>
    </div>
    
    ${data.documentSummary ? `
    <h2 style="color: #1a1a2e; border-bottom: 2px solid #f57e20; padding-bottom: 10px; margin-top: 30px;">Your Document Analysis</h2>
    <p style="margin-bottom: 15px; color: #666;">Below is the AI-generated analysis of the HMRC document you uploaded. This summary will help our team prepare for your case.</p>
    <div style="background: #fff7ed; padding: 20px; border-radius: 5px; border-left: 4px solid #f57e20;">
      <pre style="margin: 0; white-space: pre-wrap; font-family: Arial, sans-serif; font-size: 14px;">${data.documentSummary}</pre>
    </div>
    ` : ''}
    
    <div style="margin-top: 30px; padding: 20px; background: #fff; border-radius: 5px;">
      <h3 style="margin: 0 0 15px 0; color: #1a1a2e;">What Happens Next?</h3>
      <ol style="margin: 0; padding-left: 20px;">
        <li style="margin-bottom: 10px;">Our team will review your submission</li>
        <li style="margin-bottom: 10px;">A specialist will be assigned to your case</li>
        <li style="margin-bottom: 10px;">We'll contact you to discuss your situation and next steps</li>
      </ol>
    </div>
    
    <p style="margin-top: 30px; color: #666;">If you have any urgent questions, please call us directly.</p>
  </div>
  
  <div style="background: #1a1a2e; padding: 20px; border-radius: 0 0 10px 10px; text-align: center;">
    <p style="color: #f57e20; margin: 0 0 10px 0; font-weight: bold;">Investigation.tax</p>
    <p style="color: #9ca3af; margin: 0; font-size: 12px;">
      Chartered Accountants & Business Crime Solicitors<br>
      Specialists in HMRC Investigation Defence
    </p>
  </div>
</body>
</html>
    `;

    const userEmailResponse = await fetch("https://send.api.mailtrap.io/api/send", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${mailtrapApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: {
          email: "hello@demomailtrap.com",
          name: "Investigation.tax"
        },
        to: [
          {
            email: data.email,
            name: `${data.firstName} ${data.lastName}`
          }
        ],
        subject: `Your Assessment Request - Investigation.tax${data.documentSummary ? ' (Document Analysis Included)' : ''}`,
        html: userEmailHtml,
        category: "User Confirmation"
      }),
    });

    if (!userEmailResponse.ok) {
      const errorText = await userEmailResponse.text();
      console.error("Mailtrap API error (user email):", errorText);
      // Don't throw here - team email was sent successfully
      console.log("User confirmation email failed, but team email was sent");
    } else {
      const userResult = await userEmailResponse.json();
      console.log("User confirmation email sent successfully:", userResult);
    }

    return new Response(JSON.stringify({ success: true, message: "Emails sent successfully" }), {
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
