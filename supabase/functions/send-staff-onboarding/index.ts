import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const body = await req.json();
    const { email, name, role, temporaryPassword } = body;

    if (!resendApiKey) throw new Error("RESEND_API_KEY not configured");

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${resendApiKey}` },
      body: JSON.stringify({
        from: "MediCare Institutional <onboarding@resend.dev>",
        to: [email],
        subject: `Welcome to the Medical Staff - ${name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 40px; border-radius: 10px;">
            <h2 style="color: #2563eb;">MediCare Enterprise HMS</h2>
            <p>Hello ${name},</p>
            <p>You have been officially registered as a <strong>${role}</strong> in the MediCare Hospital Management System.</p>
            <p>Your institutional account is now active. Please use the credentials below to access your portal:</p>
            <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 5px 0;"><strong>Portal URL:</strong> https://hospitality-management-system-six.vercel.app/auth</p>
              <p style="margin: 5px 0;"><strong>Username:</strong> ${email}</p>
              ${temporaryPassword ? `<p style="margin: 5px 0;"><strong>Temporary Password:</strong> ${temporaryPassword}</p>` : ''}
            </div>
            <p>For your security, please update your password immediately after your first login.</p>
            <p style="font-size: 12px; color: #666; margin-top: 30px;">© 2026 MediCare General Hospital. All rights reserved.</p>
          </div>
        `
      })
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
