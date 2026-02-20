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

// Generate a secure 6-digit verification code
function generateVerificationCode(): string {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  return code;
}

// Hash the verification code for secure storage
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

    // Verify admin authorization
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("Missing authorization header");
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      throw new Error("Unauthorized");
    }

    // Check if user is admin
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("user_id", user.id)
      .single();

    if (!profile || (profile.role !== "admin" && profile.role !== "doctor")) {
      throw new Error("Only staff can send invitations");
    }

    const body: InvitationRequest = await req.json();
    const { patientId, patientEmail, patientPhone, deliveryMethod, firstName, lastName } = body;

    if (!patientId || !deliveryMethod) {
      throw new Error("Missing required fields");
    }

    // Generate verification code and hash it
    const verificationCode = generateVerificationCode();
    const hashedCode = await hashCode(verificationCode);

    // Set expiration to 30 minutes from now
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000).toISOString();

    // Get staff profile ID
    const { data: staffProfile } = await supabase
      .from("profiles")
      .select("id")
      .eq("user_id", user.id)
      .single();

    // Create invitation record
    const { data: invitation, error: invitationError } = await supabase
      .from("patient_invitations")
      .insert({
        patient_id: patientId,
        patient_email: patientEmail,
        patient_phone: patientPhone,
        verification_code: hashedCode,
        delivery_method: deliveryMethod,
        expires_at: expiresAt,
        created_by: staffProfile?.id,
      })
      .select()
      .single();

    if (invitationError) {
      console.error("Invitation error:", invitationError);
      throw new Error("Failed to create invitation");
    }

    // Generate registration link
    // Default to the current origin if possible, otherwise use a fallback
    const siteUrl = Deno.env.get("SITE_URL") || "https://hospitality-management-system.lovable.app";
    const registrationLink = `${siteUrl}/patient-register?invitation=${invitation.id}&code=${verificationCode}`;

    let emailSent = false;
    let smsSent = false;

    // Send via selected delivery method
    if (deliveryMethod === "email" && patientEmail) {
      if (resendApiKey) {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: "Hospitality Management System <onboarding@resend.dev>",
            to: [patientEmail],
            subject: "Complete Your Hospital Registration",
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded: 8px;">
                <h2 style="color: #0f172a;">Welcome to MediCare Hospital</h2>
                <p>Hello ${firstName},</p>
                <p>You have been registered at our hospital. To access your Patient Portal and complete your registration, please use the verification code below:</p>
                <div style="background-color: #f1f5f9; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
                  <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #2563eb;">${verificationCode}</span>
                </div>
                <p>Or click the button below to continue directly:</p>
                <a href="${registrationLink}" style="display: inline-block; background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Complete Registration</a>
                <p style="font-size: 12px; color: #64748b; margin-top: 30px;">
                  This link and code will expire in 30 minutes. If you did not expect this email, please ignore it.
                </p>
              </div>
            `,
          }),
        });
        
        if (res.ok) emailSent = true;
        else console.error("Resend error:", await res.text());
      } else {
        console.log("RESEND_API_KEY not found, email logged:", registrationLink);
      }
    } else if (deliveryMethod === "sms" && patientPhone) {
      // SMS integration would go here (e.g. Twilio)
      console.log(`SMS invitation to ${patientPhone}:`, registrationLink);
      smsSent = true; // Mocking for now
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: emailSent ? "Invitation email sent" : "Invitation created (check console for link)",
        invitationId: invitation.id,
        registrationLink,
        verificationCode,
        expiresAt,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-patient-invitation:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
