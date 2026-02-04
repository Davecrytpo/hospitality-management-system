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

    if (!profile || profile.role !== "admin") {
      throw new Error("Only admins can send invitations");
    }

    const body: InvitationRequest = await req.json();
    const { patientId, patientEmail, patientPhone, deliveryMethod, firstName, lastName } = body;

    if (!patientId || !deliveryMethod) {
      throw new Error("Missing required fields");
    }

    if (deliveryMethod === "email" && !patientEmail) {
      throw new Error("Email is required for email delivery");
    }

    if (deliveryMethod === "sms" && !patientPhone) {
      throw new Error("Phone number is required for SMS delivery");
    }

    // Generate verification code and hash it
    const verificationCode = generateVerificationCode();
    const hashedCode = await hashCode(verificationCode);

    // Set expiration to 30 minutes from now
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000).toISOString();

    // Get admin profile ID
    const { data: adminProfile } = await supabase
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
        created_by: adminProfile?.id,
      })
      .select()
      .single();

    if (invitationError) {
      console.error("Invitation error:", invitationError);
      throw new Error("Failed to create invitation");
    }

    // Generate registration link
    const baseUrl = Deno.env.get("SITE_URL") || supabaseUrl.replace(".supabase.co", ".lovable.app");
    const registrationLink = `${baseUrl}/patient-register?invitation=${invitation.id}&code=${verificationCode}`;

    // Send via selected delivery method
    if (deliveryMethod === "email") {
      // For now, return the link - email integration to be added
      console.log(`Email invitation to ${patientEmail}:`, registrationLink);
      
      // TODO: Integrate with SendGrid when API key is provided
      // const sendgridKey = Deno.env.get("SENDGRID_API_KEY");
    } else if (deliveryMethod === "sms") {
      // For now, return the link - SMS integration to be added
      console.log(`SMS invitation to ${patientPhone}:`, registrationLink);
      
      // TODO: Integrate with Twilio when credentials are provided
      // const twilioSid = Deno.env.get("TWILIO_ACCOUNT_SID");
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Invitation ${deliveryMethod === "email" ? "email" : "SMS"} would be sent to ${deliveryMethod === "email" ? patientEmail : patientPhone}`,
        invitationId: invitation.id,
        // Include link for testing - remove in production
        registrationLink,
        verificationCode, // Include for testing - remove in production
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
