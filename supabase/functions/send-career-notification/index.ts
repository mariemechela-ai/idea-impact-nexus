import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface CareerNotificationRequest {
  name: string;
  email: string;
  expertise: string;
  message?: string;
  cv_file_name?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, expertise, message, cv_file_name }: CareerNotificationRequest = await req.json();

    console.log("Sending career application notification for:", { name, email, expertise });

    const emailResponse = await resend.emails.send({
      from: "Career Applications <onboarding@resend.dev>",
      to: ["your-email@example.com"], // Replace with your actual email
      subject: `New Career Application from ${name}`,
      html: `
        <h2>New Career Application Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Areas of Expertise:</strong> ${expertise}</p>
        ${message ? `<p><strong>Message:</strong></p><p>${message.replace(/\n/g, '<br>')}</p>` : ''}
        ${cv_file_name ? `<p><strong>CV File:</strong> ${cv_file_name}</p>` : '<p><em>No CV file uploaded</em></p>'}
        <hr>
        <p><small>Submitted at: ${new Date().toLocaleString()}</small></p>
      `,
    });

    console.log("Career notification email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-career-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);