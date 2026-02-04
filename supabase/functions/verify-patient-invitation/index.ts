import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface VerificationRequest {
  invitationId: string;
  verificationCode: string;
}

// Hash the verification code to compare
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
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const body: VerificationRequest = await req.json();
    const { invitationId, verificationCode } = body;

    if (!invitationId || !verificationCode) {
      throw new Error("Missing invitation ID or verification code");
    }

    // Hash the provided code
    const hashedCode = await hashCode(verificationCode);

    // Get the invitation
    const { data: invitation, error: invitationError } = await supabase
      .from("patient_invitations")
      .select(`
        *,
        patient:patients(*)
      `)
      .eq("id", invitationId)
      .single();

    if (invitationError || !invitation) {
      throw new Error("Invalid invitation");
    }

    // Check if already used
    if (invitation.used_at) {
      throw new Error("This invitation has already been used");
    }

    // Check if expired
    if (new Date(invitation.expires_at) < new Date()) {
      throw new Error("This verification code has expired. Please contact the hospital administration to request a new invitation link.");
    }

    // Verify the code
    if (invitation.verification_code !== hashedCode) {
      throw new Error("Invalid verification code");
    }

    // Return patient details for registration form
    return new Response(
      JSON.stringify({
        success: true,
        patient: {
          id: invitation.patient?.id,
          firstName: invitation.patient?.first_name,
          lastName: invitation.patient?.last_name,
          email: invitation.patient_email || invitation.patient?.email,
          phone: invitation.patient_phone || invitation.patient?.phone,
          dateOfBirth: invitation.patient?.date_of_birth,
        },
        invitationId: invitation.id,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in verify-patient-invitation:", error);
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
