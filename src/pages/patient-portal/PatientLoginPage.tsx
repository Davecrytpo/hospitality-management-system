import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Heart, ArrowLeft, ShieldCheck, Mail, Phone, Building2, Lock } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp";

type LoginStep = "credentials" | "2fa-method" | "2fa-verify";

export default function PatientLoginPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<LoginStep>("credentials");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [userPhone, setUserPhone] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [twoFaMethod, setTwoFaMethod] = useState<"email" | "phone">("email");
  const [twoFaCode, setTwoFaCode] = useState("");
  const [devCode, setDevCode] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      // Check if user is a patient
      const { data: profile } = await supabase
        .from("profiles")
        .select("role, phone, email")
        .eq("user_id", data.user.id)
        .single();

      if (!profile || profile.role !== "patient") {
        await supabase.auth.signOut();
        throw new Error("This portal is for registered patients only. Staff members should use the primary portal.");
      }

      setUserId(data.user.id);
      setUserEmail(profile.email);
      setUserPhone(profile.phone);

      // Sign out temporarily - will sign back in after 2FA
      await supabase.auth.signOut();

      setStep("2fa-method");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.error("Login error:", err);
      setError(message || "Authentication failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend2FA = async () => {
    if (!userId) return;
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.functions.invoke("patient-2fa", {
        body: {
          action: "send",
          userId,
          email: userEmail,
          phone: userPhone,
          deliveryMethod: twoFaMethod,
        },
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);

      if (data.devCode) setDevCode(data.devCode);

      toast.success(`Verification security code dispatched via ${twoFaMethod === "email" ? "email" : "SMS"}`);
      setStep("2fa-verify");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.error("2FA send error:", err);
      setError(message || "Failed to transmit security code. Please contact administration.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify2FA = async () => {
    if (!userId || twoFaCode.length !== 6) return;
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.functions.invoke("patient-2fa", {
        body: { action: "verify", userId, code: twoFaCode },
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);

      if (data.verified) {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) throw signInError;

        toast.success("Security verification complete. Access granted.");
        navigate("/patient-portal");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.error("2FA verify error:", err);
      setError(message || "Invalid security code. Access denied.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 selection:bg-blue-500/30 font-sans">
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[120px]" />
      </div>

      <Card className="w-full max-w-md bg-slate-900/50 border-white/5 backdrop-blur-2xl shadow-2xl rounded-[32px]">
        <CardHeader className="text-center space-y-4 pb-8">
          <div className="mx-auto h-16 w-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            {step === "credentials" ? (
              <Building2 className="h-8 w-8 text-white" />
            ) : (
              <ShieldCheck className="h-8 w-8 text-white" />
            )}
          </div>
          <div>
            <CardTitle className="text-2xl font-black text-white tracking-tight">
              {step === "credentials" && "Institutional Access"}
              {step === "2fa-method" && "Security Checkpoint"}
              {step === "2fa-verify" && "Verify Credentials"}
            </CardTitle>
            <CardDescription className="text-slate-400 font-medium">
              {step === "credentials" && "MediCare Enterprise Patient Portal"}
              {step === "2fa-method" && "Authorized access required for medical data"}
              {step === "2fa-verify" && "Enter the 6-digit encryption key sent to your device"}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm font-bold flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              {error}
            </div>
          )}

          {step === "credentials" && (
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Secure Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@institution.com"
                  required
                  className="h-12 bg-white/5 border-white/5 focus:border-blue-500/50 transition-all rounded-xl text-white"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <Label htmlFor="password" className="text-xs font-black uppercase tracking-widest text-slate-500">Access Key</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  required
                  className="h-12 bg-white/5 border-white/5 focus:border-blue-500/50 transition-all rounded-xl text-white"
                />
              </div>
              <Button type="submit" className="w-full h-12 text-xs font-black uppercase tracking-widest bg-blue-600 hover:bg-blue-500 transition-all rounded-xl" disabled={isLoading}>
                {isLoading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Authorizing...</>
                ) : (
                  "Authenticate"
                )}
              </Button>
              
              <div className="pt-4 text-center">
                <p className="text-[10px] text-slate-500 font-bold leading-relaxed uppercase tracking-tighter">
                  New Patient? Access is provided via secure hospital invitation only. Please contact administration for credentials.
                </p>
              </div>
            </form>
          )}

          {step === "2fa-method" && (
            <div className="space-y-6">
              <div className="grid gap-3">
                <button
                  onClick={() => setTwoFaMethod("email")}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${
                    twoFaMethod === "email" ? "border-blue-500 bg-blue-500/10" : "border-white/5 bg-white/5 hover:border-white/10"
                  }`}
                >
                  <div className="h-10 w-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-white uppercase tracking-tight">Email Verification</p>
                    <p className="text-[10px] text-slate-500 font-bold">{userEmail?.substring(0, 3)}***@***</p>
                  </div>
                </button>
                
                <button
                  onClick={() => setTwoFaMethod("phone")}
                  disabled={!userPhone}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${
                    !userPhone ? "opacity-40 grayscale cursor-not-allowed" :
                    twoFaMethod === "phone" ? "border-blue-500 bg-blue-500/10" : "border-white/5 bg-white/5 hover:border-white/10"
                  }`}
                >
                  <div className="h-10 w-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-white uppercase tracking-tight">SMS Security Code</p>
                    <p className="text-[10px] text-slate-500 font-bold">{userPhone ? `***-***-${userPhone.slice(-4)}` : "Mobile not registered"}</p>
                  </div>
                </button>
              </div>
              
              <Button className="w-full h-12 text-xs font-black uppercase tracking-widest bg-blue-600 rounded-xl" onClick={handleSend2FA} disabled={isLoading}>
                {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</> : "Generate Security Code"}
              </Button>
            </div>
          )}

          {step === "2fa-verify" && (
            <div className="space-y-8 flex flex-col items-center">
              <InputOTP maxLength={6} value={twoFaCode} onChange={(value) => setTwoFaCode(value)}>
                <InputOTPGroup className="gap-2">
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <InputOTPSlot key={i} index={i} className="h-14 w-12 bg-white/5 border-white/10 text-white font-black text-xl rounded-xl" />
                  ))}
                </InputOTPGroup>
              </InputOTP>

              <Button
                className="w-full h-12 text-xs font-black uppercase tracking-widest bg-blue-600 rounded-xl"
                onClick={handleVerify2FA}
                disabled={isLoading || twoFaCode.length !== 6}
              >
                {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying...</> : "Verify & Access Portal"}
              </Button>

              <button className="text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-colors" onClick={handleSend2FA}>
                Resend Encryption Key
              </button>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-white/5">
            <Button variant="ghost" className="w-full text-xs font-black uppercase tracking-widest text-slate-500 hover:text-white hover:bg-white/5" asChild>
              <Link to="/">
                <ArrowLeft className="mr-2 h-3 w-3" /> System Home
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
