import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
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
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const resendFrom = Deno.env.get("RESEND_FROM") || "Hospitality Management System <onboarding@resend.dev>";

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Server configuration error: missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("Missing authorization header. Please sign in again.");

    const body: InvitationRequest = await req.json();
    const { patientId, patientEmail, patientPhone, deliveryMethod, firstName } = body;

    // Get the sender's profile ID
    const { data: { user }, error: userError } = await supabase.auth.getUser(authHeader.replace("Bearer ", ""));
    if (userError || !user) {
      console.error("Auth error:", userError);
      throw new Error("Unauthorized: " + (userError?.message || "User not found"));
    }

    const { data: senderProfile, error: profileError } = await supabase
      .from("profiles")
      .select("id")
      .eq("user_id", user.id)
      .single();
    
    if (profileError || !senderProfile) {
      console.error("Profile fetch error:", profileError);
      throw new Error("Sender profile not found. Please ensure your staff profile is correctly set up.");
    }

    // Generate code and expiration
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const encoder = new TextEncoder();
    const data = encoder.encode(verificationCode + supabaseServiceKey);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashedCode = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, "0")).join("");
    
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000).toISOString();

    console.log(`Verifying patient existence for ID: ${patientId}`);
    const { data: patient, error: patientFetchError } = await supabase
      .from("patients")
      .select("id")
      .eq("id", patientId)
      .single();

    if (patientFetchError || !patient) {
      console.error("Patient check failed:", patientFetchError);
      throw new Error(`Patient record with ID ${patientId} not found. Please ensure the patient is registered first.`);
    }

    console.log(`Creating invitation record for patient ${patientId} by staff ${senderProfile.id}`);

    // Create record
    const { data: invitation, error: invitationError } = await supabase
      .from("patient_invitations")
      .insert({
        patient_id: patientId,
        patient_email: patientEmail || null,
        patient_phone: patientPhone || null,
        verification_code: hashedCode,
        delivery_method: deliveryMethod,
        expires_at: expiresAt,
        created_by: senderProfile.id
      })
      .select().single();

    if (invitationError) {
      console.error("Invitation insert error:", invitationError);
      throw new Error(`Database error creating invitation: ${invitationError.message} (Detail: ${invitationError.details || 'none'})`);
    }

    console.log(`Invitation created successfully with ID: ${invitation.id}`);

    // Use SITE_URL or fallback to a sensible default
    let siteUrl = Deno.env.get("SITE_URL");
    if (!siteUrl) {
      siteUrl = "https://hospitality-management-system-nine.vercel.app";
      console.warn("SITE_URL not set, falling back to:", siteUrl);
    }
    
    const registrationLink = `${siteUrl.replace(/\/$/, '')}/patient-register?invitation=${invitation.id}&code=${verificationCode}`;

    let emailSent = false;
    let emailErrorMessage = "";

    if (deliveryMethod === "email" && patientEmail) {
      if (!resendApiKey) {
        emailErrorMessage = "RESEND_API_KEY not set";
      } else {
        try {
          const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${resendApiKey}` },
            body: JSON.stringify({
              from: resendFrom,
              to: [patientEmail],
              subject: "Action Required: Complete Your Hospital Registration",
              html: `
                <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden;">
                  <div style="background: linear-gradient(135deg, #1e40af, #3b82f6); padding: 32px 40px; text-align: center;">
                    <h1 style="color: white; margin: 0; font-size: 24px;">Hospitality Management System</h1>
                    <p style="color: #bfdbfe; margin: 8px 0 0 0; font-size: 13px;">Secure Patient Registration Portal</p>
                  </div>
                  <div style="padding: 40px;">
                    <p style="font-size: 16px; color: #334155;">Hello <strong>${firstName}</strong>,</p>
                    <p style="color: #475569; line-height: 1.6;">A patient account has been created for you at our hospital. Please use the secure verification code below to complete your registration and access your Patient Portal.</p>
                    <div style="background: #f1f5f9; padding: 24px; text-align: center; font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #1e40af; border-radius: 12px; margin: 24px 0; border: 2px dashed #93c5fd;">
                      ${verificationCode}
                    </div>
                    <p style="color: #475569; text-align: center;">Or click the button below to go directly:</p>
                    <div style="text-align: center; margin: 24px 0;">
                      <a href="${registrationLink}" style="display: inline-block; background: #1e40af; color: white; padding: 16px 40px; text-decoration: none; border-radius: 10px; font-weight: bold; font-size: 15px;">Complete Registration -></a>
                    </div>
                    <div style="background: #fef3c7; padding: 16px; border-radius: 8px; border-left: 4px solid #f59e0b; margin-top: 24px;">
                      <p style="margin: 0; font-size: 13px; color: #92400e;"><strong>Important:</strong> This verification code expires in <strong>30 minutes</strong>. If it expires, please contact the hospital to generate a new invitation.</p>
                    </div>
                    <p style="font-size: 12px; color: #94a3b8; margin-top: 32px; text-align: center;">If you did not expect this email, please ignore it. No account will be created.</p>
                  </div>
                  <div style="background: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
                    <p style="margin: 0; font-size: 11px; color: #94a3b8;">(c) 2026 Hospitality Management System. All rights reserved.</p>
                  </div>
                </div>
              `
            })
          });
          
          if (res.ok) {
            emailSent = true;
            console.log("Email sent successfully to:", patientEmail);
          } else {
            let errorData: { message?: string } | null = null;
            try {
              errorData = await res.json();
            } catch {
              errorData = null;
            }
            emailErrorMessage = errorData?.message || "Unknown error from email service";
            console.error("Email delivery failed:", errorData || res.statusText);
          }
        } catch (emailErr) {
          const message = emailErr instanceof Error ? emailErr.message : String(emailErr);
          emailErrorMessage = `Email sending error: ${message}`;
          console.error("Email send exception:", emailErr);
        }
      }
    }

    // SMS handling placeholder
    if (deliveryMethod === "sms" && patientPhone) {
      console.log(`SMS would be sent to ${patientPhone} with code ${verificationCode}`);
      // TODO: Integrate Twilio for SMS delivery
    }

    return new Response(JSON.stringify({ 
      success: true, 
      registrationLink, 
      verificationCode, 
      expiresAt, 
      emailSent,
      emailErrorMessage 
    }), {
      status: 200, headers: { "Content-Type": "application/json", ...corsHeaders }
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("send-patient-invitation error:", error);
    return new Response(JSON.stringify({ error: message }), { 
      status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } 
    });
  }
};

serve(handler);
