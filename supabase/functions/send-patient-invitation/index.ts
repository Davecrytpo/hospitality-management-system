import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface InvitationRequest {
  patientId: string;
  patientEmail?: string;
  patientPhone?: string;
  deliveryMethod: "email" | "sms";
  firstName: string;
  lastName: string;
}

function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function hashCode(code: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(code + Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"));
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("Missing authorization header");

    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) throw new Error("Unauthorized");

    const body: InvitationRequest = await req.json();
    const { patientId, patientEmail, patientPhone, deliveryMethod, firstName } = body;

    const verificationCode = generateVerificationCode();
    const hashedCode = await hashCode(verificationCode);
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000).toISOString();

    const { data: adminProfile } = await supabase.from("profiles").select("id").eq("user_id", user.id).single();

    const { data: invitation, error: invitationError } = await supabase
      .from("patient_invitations")
      .insert({
        patient_id: patientId,
        patient_email: patientEmail,
        patient_phone: patientPhone,
        verification_code: hashedCode,
        delivery_method: deliveryMethod,
        expires_at: expiresAt,
        created_by: adminProfile?.id,
      })
      .select()
      .single();

    if (invitationError) throw new Error("Failed to create invitation");

    // DYNAMIC URL DETECTION - Replaces lovable-app with your production domain automatically
    const siteUrl = Deno.env.get("SITE_URL") || "https://medicare-hospital.com";
    const registrationLink = `${siteUrl}/patient-register?invitation=${invitation.id}&code=${verificationCode}`;

    let emailSent = false;
    if (deliveryMethod === "email" && patientEmail && resendApiKey) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: "MediCare Hospital <onboarding@resend.dev>",
          to: [patientEmail],
          subject: "Welcome to MediCare Hospital - Complete Your Registration",
          html: `
            <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; color: #1e293b; line-height: 1.6;">
              <div style="text-align: center; margin-bottom: 30px;">
                <div style="background: linear-gradient(to bottom right, #2563eb, #0891b2); width: 60px; height: 60px; border-radius: 12px; display: inline-block; padding: 15px;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                </div>
                <h1 style="color: #0f172a; margin-top: 20px; font-size: 24px; font-weight: 800; letter-spacing: -0.025em;">MediCare Hospital</h1>
              </div>
              
              <div style="background-color: #ffffff; border: 1px solid #e2e8f0; padding: 30px; border-radius: 16px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);">
                <p style="font-size: 18px; font-weight: 600; color: #0f172a; margin-bottom: 16px;">Hello ${firstName},</p>
                <p style="margin-bottom: 24px;">Your medical profile has been initialized at <strong>MediCare General Hospital</strong>. To ensure the security of your medical data, please verify your account using the code below:</p>
                
                <div style="background-color: #f8fafc; border: 2px dashed #cbd5e1; padding: 24px; text-align: center; border-radius: 12px; margin: 24px 0;">
                  <span style="font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #2563eb; font-family: monospace;">${verificationCode}</span>
                  <p style="font-size: 12px; color: #64748b; margin-top: 10px; font-weight: 600; text-transform: uppercase;">6-Digit Verification Code</p>
                </div>
                
                <p style="text-align: center; margin: 32px 0;">
                  <a href="${registrationLink}" style="background-color: #2563eb; color: #ffffff; padding: 16px 32px; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 16px; display: inline-block; box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.3);">Complete Setup in Patient Portal</a>
                </p>
                
                <p style="font-size: 14px; color: #64748b; font-style: italic;">Note: This invitation link and code will expire in 30 minutes for your security.</p>
              </div>
              
              <div style="text-align: center; margin-top: 30px; color: #94a3b8; font-size: 12px;">
                <p>© 2026 MediCare General Hospital System. All rights reserved.</p>
                <p>123 Healthcare Avenue, Medical District, Springfield</p>
              </div>
            </div>
          `,
        }),
      });
      if (res.ok) emailSent = true;
    }

    return new Response(JSON.stringify({ success: true, registrationLink, verificationCode }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
