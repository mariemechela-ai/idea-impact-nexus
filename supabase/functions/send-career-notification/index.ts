import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

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

// HTML sanitization function
const sanitizeHtml = (html: string): string => {
  return html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

// Input validation function
const validateInput = (data: CareerNotificationRequest): string | null => {
  if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
    return 'Name is required and must be a non-empty string';
  }
  if (!data.email || typeof data.email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return 'Valid email is required';
  }
  if (!data.expertise || typeof data.expertise !== 'string' || data.expertise.trim().length === 0) {
    return 'Expertise is required and must be a non-empty string';
  }
  if (data.name.length > 100) {
    return 'Name must be less than 100 characters';
  }
  if (data.expertise.length > 200) {
    return 'Expertise must be less than 200 characters';
  }
  if (data.message && data.message.length > 10000) {
    return 'Message must be less than 10,000 characters';
  }
  return null;
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, expertise, message, cv_file_name }: CareerNotificationRequest = await req.json();

    // Validate input
    const validationError = validateInput({ name, email, expertise, message, cv_file_name });
    if (validationError) {
      return new Response(JSON.stringify({ error: validationError }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    console.log("Sending career application notification for:", { name, email, expertise });

    // Sanitize all user inputs for HTML output
    const sanitizedName = sanitizeHtml(name);
    const sanitizedEmail = sanitizeHtml(email);
    const sanitizedExpertise = sanitizeHtml(expertise);
    const sanitizedMessage = message ? sanitizeHtml(message).replace(/\n/g, '<br>') : '';
    const sanitizedCvFileName = cv_file_name ? sanitizeHtml(cv_file_name) : null;

    const emailResponse = await resend.emails.send({
      from: "Career Applications <onboarding@resend.dev>",
      to: ["marie.mechela@gmail.com"],
      subject: `New Career Application from ${sanitizedName}`,
      html: `
        <h2>New Career Application Received</h2>
        <p><strong>Name:</strong> ${sanitizedName}</p>
        <p><strong>Email:</strong> ${sanitizedEmail}</p>
        <p><strong>Areas of Expertise:</strong> ${sanitizedExpertise}</p>
        ${sanitizedMessage ? `<p><strong>Message:</strong></p><p>${sanitizedMessage}</p>` : ''}
        ${sanitizedCvFileName ? `<p><strong>CV File:</strong> ${sanitizedCvFileName}</p>` : '<p><em>No CV file uploaded</em></p>'}
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