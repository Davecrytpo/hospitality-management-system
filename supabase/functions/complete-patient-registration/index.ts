import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface RegistrationRequest {
  invitationId: string;
  verificationCode: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phone?: string;
  gender?: string;
  address?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactRelationship?: string;
  bloodType?: string;
  allergies?: string;
  existingConditions?: string;
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

    const body: RegistrationRequest = await req.json();
    const {
      invitationId,
      verificationCode,
      email,
      password,
      firstName,
      lastName,
      dateOfBirth,
      phone,
      gender,
      address,
      emergencyContactName,
      emergencyContactPhone,
      emergencyContactRelationship,
      bloodType,
      allergies,
      existingConditions,
    } = body;

    // Validate required fields
    if (!invitationId || !verificationCode || !email || !password || !firstName || !lastName || !dateOfBirth) {
      throw new Error("Missing required fields");
    }

    // Hash the provided code
    const hashedCode = await hashCode(verificationCode);

    // Get and validate the invitation
    const { data: invitation, error: invitationError } = await supabase
      .from("patient_invitations")
      .select("*")
      .eq("id", invitationId)
      .single();

    if (invitationError || !invitation) {
      throw new Error("Invalid invitation");
    }

    if (invitation.used_at) {
      throw new Error("This invitation has already been used");
    }

    if (new Date(invitation.expires_at) < new Date()) {
      throw new Error("This verification code has expired. Please contact the hospital administration to request a new invitation link.");
    }

    if (invitation.verification_code !== hashedCode) {
      throw new Error("Invalid verification code");
    }

    // Create the user account
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm since they verified via invitation
    });

    if (authError) {
      console.error("Auth error:", authError);
      if (authError.message.includes("already registered")) {
        throw new Error("An account with this email already exists. Please login instead.");
      }
      throw new Error("Failed to create account: " + authError.message);
    }

    const userId = authData.user.id;

    // Create or update the profile
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .upsert({
        user_id: userId,
        email,
        phone,
        full_name: `${firstName} ${lastName}`,
        role: "patient",
      }, { onConflict: 'user_id' })
      .select()
      .single();

    if (profileError) {
      console.error("Profile error:", profileError);
      // Cleanup: delete the auth user if profile creation/update fails
      await supabase.auth.admin.deleteUser(userId);
      throw new Error("Failed to finalize profile record: " + profileError.message);
    }

    // Update the patient record with profile link and additional info
    const { error: patientError } = await supabase
      .from("patients")
      .update({
        profile_id: profile.id,
        first_name: firstName,
        last_name: lastName,
        date_of_birth: dateOfBirth,
        email,
        phone,
        gender,
        address,
        emergency_contact_name: emergencyContactName,
        emergency_contact_phone: emergencyContactPhone,
        emergency_contact_relationship: emergencyContactRelationship,
        blood_type: bloodType,
        allergies,
        existing_conditions: existingConditions,
        registration_completed: true,
      })
      .eq("id", invitation.patient_id);

    if (patientError) {
      console.error("Patient update error:", patientError);
      // Don't fail completely - the account was created
    }

    // Mark the invitation as used
    await supabase
      .from("patient_invitations")
      .update({ used_at: new Date().toISOString() })
      .eq("id", invitationId);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Registration completed successfully! You can now login to access your patient portal.",
        userId,
        patientId: invitation.patient_id,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in complete-patient-registration:", error);
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
