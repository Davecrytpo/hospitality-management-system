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
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { action, userId, email, deliveryMethod, code } = await req.json();

    if (action === "send") {
      const twoFactorCode = generateCode();
      const codeHash = await hashCode(twoFactorCode, supabaseServiceKey);
      const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();

      await supabase.from("patient_2fa_codes").delete().eq("user_id", userId);

      const { error: insertError } = await supabase
        .from("patient_2fa_codes")
        .insert({
          user_id: userId,
          code_hash: codeHash,
          delivery_method: deliveryMethod || "email",
          expires_at: expiresAt,
        });

      if (insertError) throw insertError;

      let emailSent = false;
      let errorDetail = "";

      if ((deliveryMethod === "email" || !deliveryMethod) && email && resendApiKey) {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: "MediCare Security <onboarding@resend.dev>",
            to: [email],
            subject: "Your Medical Portal Access Code",
            html: `
              <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
                <h2 style="color: #0f172a;">Identity Verification</h2>
                <p>Use the code below to access your MediCare patient portal. This code is valid for 5 minutes.</p>
                <div style="background-color: #f1f5f9; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
                  <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #2563eb;">${twoFactorCode}</span>
                </div>
                <p style="font-size: 12px; color: #64748b;">If you didn't request this code, please secure your account immediately.</p>
              </div>
            `,
          }),
        });
        
        if (res.ok) {
          emailSent = true;
        } else {
          const errData = await res.json();
          errorDetail = errData.message || "Resend configuration error";
        }
      }

      return new Response(
        JSON.stringify({
          success: true,
          emailSent,
          errorDetail,
          devCode: twoFactorCode, // Still logging for debug
          expiresAt,
        }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (action === "verify") {
      if (!userId || !code) throw new Error("Missing userId or code");
      const codeHash = await hashCode(code, supabaseServiceKey);

      const { data: twoFaRecord, error: fetchError } = await supabase
        .from("patient_2fa_codes")
        .select("*")
        .eq("user_id", userId)
        .is("verified_at", null)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (fetchError || !twoFaRecord) throw new Error("Verification code not found");
      if (new Date(twoFaRecord.expires_at) < new Date()) throw new Error("Code expired");
      if (twoFaRecord.code_hash !== codeHash) throw new Error("Invalid code");

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
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
