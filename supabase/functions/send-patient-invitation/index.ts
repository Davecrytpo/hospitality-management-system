import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface InvitationRequest {
  patientId: string;
  patientEmail?: string;
  patientPhone?: string;
  deliveryMethod: "email" | "sms";
  firstName: string;
  lastName: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("Missing authorization header");

    const body: InvitationRequest = await req.json();
    const { patientId, patientEmail, patientPhone, deliveryMethod, firstName } = body;

    // Generate code and expiration
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const encoder = new TextEncoder();
    const data = encoder.encode(verificationCode + supabaseServiceKey);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashedCode = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, "0")).join("");
    
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000).toISOString();

    // Create record
    const { data: invitation, error: invitationError } = await supabase
      .from("patient_invitations")
      .insert({
        patient_id: patientId,
        patient_email: patientEmail,
        patient_phone: patientPhone,
        verification_code: hashedCode,
        delivery_method: deliveryMethod,
        expires_at: expiresAt,
        created_by: (await supabase.auth.getUser(authHeader.replace("Bearer ", ""))).data.user?.id
      })
      .select().single();

    if (invitationError) throw invitationError;

    // FIX: Use Origin from request or SITE_URL secret
    const origin = req.headers.get("origin") || Deno.env.get("SITE_URL") || "https://hospitality-management-system-six.vercel.app";
    const registrationLink = `${origin}/patient-register?invitation=${invitation.id}&code=${verificationCode}`;

    let emailSent = false;
    if (deliveryMethod === "email" && patientEmail) {
      if (!resendApiKey) {
        console.error("ERROR: RESEND_API_KEY is not set in Supabase Secrets");
      } else {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${resendApiKey}` },
          body: JSON.stringify({
            from: "MediCare Hospital <onboarding@resend.dev>",
            to: [patientEmail],
            subject: "Action Required: Complete Your Hospital Registration",
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 40px; border-radius: 10px;">
                <h2 style="color: #2563eb;">Welcome to MediCare Hospital</h2>
                <p>Hello ${firstName},</p>
                <p>A patient account has been created for you. Please use the secure code below to complete your registration and access the Patient Portal:</p>
                <div style="background: #f1f5f9; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #2563eb; border-radius: 8px; margin: 20px 0;">
                  ${verificationCode}
                </div>
                <p>Or click the button below to continue:</p>
                <a href="${registrationLink}" style="display: block; background: #2563eb; color: white; padding: 15px; text-align: center; text-decoration: none; border-radius: 8px; font-weight: bold;">Complete Registration</a>
                <p style="font-size: 12px; color: #666; margin-top: 30px;">This link expires in 30 minutes. If you did not expect this, please ignore this email.</p>
              </div>
            `
          })
        });
        emailSent = res.ok;
      }
    }

    return new Response(JSON.stringify({ success: true, registrationLink, verificationCode, expiresAt, emailSent }), {
      status: 200, headers: { "Content-Type": "application/json", ...corsHeaders }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
};

serve(handler);
