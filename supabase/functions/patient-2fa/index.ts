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
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const resendFrom = Deno.env.get("RESEND_FROM") || "MediCare Security <onboarding@resend.dev>";

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Server configuration error: missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    }
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { action, userId, email, phone, deliveryMethod, code } = await req.json();

    if (action === "send") {
      if (!userId) throw new Error("Missing userId");
      
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

      let sent = false;
      let errorDetail = "";

      // Email delivery
      if ((deliveryMethod === "email" || !deliveryMethod) && email) {
        if (!resendApiKey) {
          errorDetail = "Email service not configured. Please contact administration.";
        } else {
          try {
            const res = await fetch("https://api.resend.com/emails", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${resendApiKey}`,
              },
              body: JSON.stringify({
                from: resendFrom,
                to: [email],
                subject: "Your Medical Portal Security Code",
                html: `
                  <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 0; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden;">
                    <div style="background: linear-gradient(135deg, #1e40af, #3b82f6); padding: 24px; text-align: center;">
                      <h2 style="color: white; margin: 0; font-size: 20px;">🔐 Security Verification</h2>
                    </div>
                    <div style="padding: 32px;">
                      <p style="color: #334155;">Your one-time verification code is:</p>
                      <div style="background: #f1f5f9; padding: 20px; text-align: center; border-radius: 12px; margin: 20px 0; border: 2px dashed #93c5fd;">
                        <span style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #1e40af;">${twoFactorCode}</span>
                      </div>
                      <p style="font-size: 13px; color: #64748b;">This code expires in <strong>5 minutes</strong>. Do not share it with anyone.</p>
                    </div>
                  </div>
                `,
              }),
            });

            if (res.ok) {
              sent = true;
            } else {
              let errData: { message?: string } | null = null;
              try { errData = await res.json(); } catch { errData = null; }
              errorDetail = errData?.message || "Email delivery failed";
            }
          } catch (emailErr) {
            errorDetail = emailErr instanceof Error ? emailErr.message : "Email sending failed";
          }
        }
      }

      // SMS delivery
      if (deliveryMethod === "phone" && phone) {
        // Currently SMS is not configured - return the code for development
        // In production, integrate Twilio or similar SMS provider
        console.log(`SMS 2FA code for ${phone}: ${twoFactorCode}`);
        errorDetail = "SMS service is being configured. Your code has been generated.";
        sent = true; // Mark as sent so user can proceed with the dev code
      }

      return new Response(
        JSON.stringify({
          success: true,
          sent,
          errorDetail,
          devCode: twoFactorCode, // For development - remove in production
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
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return new Response(
      JSON.stringify({ error: message }),
      { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
