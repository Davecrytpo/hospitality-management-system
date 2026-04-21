import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const resendFrom = Deno.env.get("RESEND_FROM") || "Hospitality Management System <onboarding@resend.dev>";
    const body = await req.json();
    const { email, name, role, temporaryPassword } = body;

    if (!email) {
      return new Response(JSON.stringify({ success: false, error: "No email provided" }), {
        status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    if (!resendApiKey) {
      console.error("RESEND_API_KEY not configured");
      return new Response(JSON.stringify({ success: false, error: "Email service not configured" }), {
        status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    const siteUrl = Deno.env.get("SITE_URL") || "https://hospitality-management-system-nine.vercel.app";

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${resendApiKey}` },
      body: JSON.stringify({
        from: resendFrom,
        to: [email],
        subject: `Welcome to the Medical Staff - ${role}`,
        html: `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #1e40af, #3b82f6); padding: 32px 40px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px;">Hospitality Management System</h1>
              <p style="color: #bfdbfe; margin: 8px 0 0 0; font-size: 13px;">Staff Onboarding Portal</p>
            </div>
            <div style="padding: 40px;">
              <p style="font-size: 16px; color: #334155;">Hello <strong>${name}</strong>,</p>
              <p style="color: #475569; line-height: 1.6;">You have been officially registered as a <strong style="color: #1e40af;">${role}</strong> in the Hospitality Management System.</p>
              <p style="color: #475569;">Your institutional account is now active. Please use the credentials below to access your portal:</p>
              <div style="background: #f1f5f9; padding: 24px; border-radius: 12px; margin: 24px 0; border: 1px solid #e2e8f0;">
                <p style="margin: 8px 0; color: #334155;"><strong>Portal URL:</strong> <a href="${siteUrl}/auth" style="color: #2563eb;">${siteUrl}/auth</a></p>
                <p style="margin: 8px 0; color: #334155;"><strong>Username:</strong> ${email}</p>
                ${temporaryPassword ? `<p style="margin: 8px 0; color: #334155;"><strong>Temporary Password:</strong> <code style="background: #dbeafe; padding: 4px 8px; border-radius: 4px; color: #1e40af;">${temporaryPassword}</code></p>` : ''}
              </div>
              <div style="background: #fef3c7; padding: 16px; border-radius: 8px; border-left: 4px solid #f59e0b;">
                <p style="margin: 0; font-size: 13px; color: #92400e;"><strong>Security Notice:</strong> Please update your password immediately after your first login for your protection.</p>
              </div>
              <p style="font-size: 12px; color: #94a3b8; margin-top: 32px; text-align: center;">If you believe you received this email in error, please contact hospital administration.</p>
            </div>
            <div style="background: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0; font-size: 11px; color: #94a3b8;">(c) 2026 Hospitality Management System. All rights reserved.</p>
            </div>
          </div>
        `
      })
    });

    if (res.ok) {
      console.log("Staff onboarding email sent to:", email);
      return new Response(JSON.stringify({ success: true }), {
        status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    } else {
      const errorData = await res.json();
      console.error("Staff email failed:", errorData);
      return new Response(JSON.stringify({ success: false, error: errorData.message }), {
        status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("send-staff-onboarding error:", error);
    return new Response(JSON.stringify({ error: message }), {
      status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
