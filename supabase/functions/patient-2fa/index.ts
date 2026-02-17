import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

async function hashCode(code: string, salt: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(code + salt);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

function generateCode(): string {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return String(array[0] % 1000000).padStart(6, "0");
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { action, userId, email, phone, deliveryMethod, code } = await req.json();

    if (action === "send") {
      // Generate a 6-digit code
      const twoFactorCode = generateCode();
      const codeHash = await hashCode(twoFactorCode, supabaseServiceKey);
      const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString(); // 5 min expiry

      // Delete old codes for this user
      await supabase
        .from("patient_2fa_codes")
        .delete()
        .eq("user_id", userId);

      // Insert new code
      const { error: insertError } = await supabase
        .from("patient_2fa_codes")
        .insert({
          user_id: userId,
          code_hash: codeHash,
          delivery_method: deliveryMethod || "email",
          expires_at: expiresAt,
        });

      if (insertError) throw insertError;

      // In production, send via SendGrid/Twilio
      // For now, log the code (would be sent via email/SMS)
      console.log(`2FA code for user ${userId}: ${twoFactorCode}`);

      return new Response(
        JSON.stringify({
          success: true,
          message: `Verification code sent via ${deliveryMethod || "email"}`,
          // Include code in dev for testing - remove in production
          devCode: twoFactorCode,
          expiresAt,
        }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (action === "verify") {
      if (!userId || !code) {
        throw new Error("Missing userId or code");
      }

      const codeHash = await hashCode(code, supabaseServiceKey);

      const { data: twoFaRecord, error: fetchError } = await supabase
        .from("patient_2fa_codes")
        .select("*")
        .eq("user_id", userId)
        .is("verified_at", null)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (fetchError || !twoFaRecord) {
        throw new Error("No pending verification code found. Please request a new one.");
      }

      // Check attempts
      if (twoFaRecord.attempts >= 5) {
        await supabase.from("patient_2fa_codes").delete().eq("id", twoFaRecord.id);
        throw new Error("Too many attempts. Please request a new code.");
      }

      // Increment attempts
      await supabase
        .from("patient_2fa_codes")
        .update({ attempts: twoFaRecord.attempts + 1 })
        .eq("id", twoFaRecord.id);

      // Check expiry
      if (new Date(twoFaRecord.expires_at) < new Date()) {
        await supabase.from("patient_2fa_codes").delete().eq("id", twoFaRecord.id);
        throw new Error("Verification code has expired. Please request a new one.");
      }

      // Check code
      if (twoFaRecord.code_hash !== codeHash) {
        throw new Error("Invalid verification code. Please try again.");
      }

      // Mark as verified
      await supabase
        .from("patient_2fa_codes")
        .update({ verified_at: new Date().toISOString() })
        .eq("id", twoFaRecord.id);

      return new Response(
        JSON.stringify({ success: true, verified: true }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    throw new Error("Invalid action");
  } catch (error: any) {
    console.error("2FA error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
