import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

async function sha1(input: string) {
  const payload = new TextEncoder().encode(input);
  const hash = await crypto.subtle.digest("SHA-1", payload);
  return Array.from(new Uint8Array(hash))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const cloudName = Deno.env.get("CLOUDINARY_CLOUD_NAME");
    const apiKey = Deno.env.get("CLOUDINARY_API_KEY");
    const apiSecret = Deno.env.get("CLOUDINARY_API_SECRET");
    const body = await req.json();
    const publicId = typeof body?.publicId === "string" ? body.publicId.trim() : "";
    const resourceType = body?.resourceType === "video" || body?.resourceType === "raw" ? body.resourceType : "image";

    if (!publicId) {
      return new Response(JSON.stringify({ success: false, error: "No Cloudinary public ID provided." }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!cloudName || !apiKey || !apiSecret) {
      return new Response(JSON.stringify({ success: false, error: "Cloudinary deletion is not configured." }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const timestamp = Math.floor(Date.now() / 1000);
    const signature = await sha1(`public_id=${publicId}&timestamp=${timestamp}${apiSecret}`);
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/destroy`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        public_id: publicId,
        timestamp: String(timestamp),
        api_key: apiKey,
        signature,
        invalidate: "true",
      }).toString(),
    });

    const result = await response.json();

    if (!response.ok) {
      return new Response(JSON.stringify({ success: false, error: result?.error?.message ?? "Cloudinary delete failed." }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, result: result?.result ?? "ok" }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return new Response(JSON.stringify({ success: false, error: message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
