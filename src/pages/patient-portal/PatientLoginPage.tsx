import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, ArrowLeft, ShieldCheck, Mail, Phone, Building2 } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Logo } from "@/components/brand/Logo";
import heroImg from "@/assets/reception.jpg";

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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      const { data: profile } = await supabase.from("profiles").select("role, phone, email").eq("user_id", data.user.id).single();
      if (!profile || profile.role !== "patient") {
        await supabase.auth.signOut();
        throw new Error("This portal is for registered patients only. Staff should use the staff portal.");
      }
      setUserId(data.user.id);
      setUserEmail(profile.email);
      setUserPhone(profile.phone);
      await supabase.auth.signOut();
      setStep("2fa-method");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Authentication failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend2FA = async () => {
    if (!userId) return;
    setIsLoading(true); setError(null);
    try {
      const { data, error } = await supabase.functions.invoke("patient-2fa", {
        body: { action: "send", userId, email: userEmail, phone: userPhone, deliveryMethod: twoFaMethod },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      if (twoFaMethod === "phone" && data?.devCode) toast.success(`Your verification code: ${data.devCode}`, { duration: 15000 });
      else toast.success(`Verification code sent via ${twoFaMethod === "email" ? "email" : "SMS"}`);
      setStep("2fa-verify");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to send code.");
    } finally { setIsLoading(false); }
  };

  const handleVerify2FA = async () => {
    if (!userId || twoFaCode.length !== 6) return;
    setIsLoading(true); setError(null);
    try {
      const { data, error } = await supabase.functions.invoke("patient-2fa", {
        body: { action: "verify", userId, code: twoFaCode },
      });
      if (error) throw error;
      if (data.error) throw new Error(data.error);
      if (data.verified) {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) throw signInError;
        toast.success("Verified. Welcome back.");
        navigate("/patient-portal");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Invalid security code.");
    } finally { setIsLoading(false); }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      <div className="relative hidden lg:flex flex-col justify-between p-10 overflow-hidden bg-gradient-hero text-white">
        <img src={heroImg} alt="Patient reception" className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/85 via-primary/70 to-accent/40" />
        <div className="ambient-orb -top-24 -left-24 h-96 w-96" />

        <div className="relative z-10"><Logo variant="light" size="md" /></div>

        <div className="relative z-10 space-y-5 max-w-md">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]">
            <ShieldCheck className="h-3 w-3" /> Patient portal
          </div>
          <h2 className="font-display text-4xl font-bold leading-tight">Your health. Your records. Always with you.</h2>
          <p className="text-white/80 text-base leading-relaxed">Securely access appointments, prescriptions, lab results, and care plans — protected by HIPAA-grade two-factor verification.</p>
        </div>

        <div className="relative z-10 text-xs text-white/60">© {new Date().getFullYear()} On Time Medical Group</div>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-10 relative">
        <div className="absolute inset-0 medical-grid opacity-40 pointer-events-none" />
        <Card className="relative z-10 w-full max-w-[460px] border-border/60 shadow-elevated rounded-2xl">
          <CardHeader className="space-y-3 pb-4">
            <div className="lg:hidden"><Logo size="sm" /></div>
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-xl bg-gradient-brand flex items-center justify-center shadow-card">
                {step === "credentials" ? <Building2 className="h-5 w-5 text-white" /> : <ShieldCheck className="h-5 w-5 text-white" />}
              </div>
              <div>
                <CardTitle className="text-xl font-display font-bold tracking-tight">
                  {step === "credentials" && "Patient sign in"}
                  {step === "2fa-method" && "Choose verification"}
                  {step === "2fa-verify" && "Enter your code"}
                </CardTitle>
                <CardDescription className="text-xs mt-1">
                  {step === "credentials" && "Access your secure health record"}
                  {step === "2fa-method" && "Pick how to receive your security code"}
                  {step === "2fa-verify" && "Enter the 6-digit code you received"}
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-5">
            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-xs font-medium">
                {error}
              </div>
            )}

            {step === "credentials" && (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs font-semibold text-foreground/80">Email address</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" required className="h-11 rounded-lg" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="password" className="text-xs font-semibold text-foreground/80">Password</Label>
                  <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required className="h-11 rounded-lg" />
                </div>
                <Button type="submit" className="w-full h-11 text-sm font-semibold rounded-lg bg-gradient-brand hover:opacity-95" disabled={isLoading}>
                  {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing in...</> : "Continue"}
                </Button>
                <p className="text-[11px] text-muted-foreground text-center pt-2">
                  New patient? Access is provided via secure invitation. Contact our admissions team.
                </p>
              </form>
            )}

            {step === "2fa-method" && (
              <div className="space-y-4">
                <div className="grid gap-3">
                  <button onClick={() => setTwoFaMethod("email")} className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${twoFaMethod === "email" ? "border-accent bg-accent/5" : "border-border hover:border-accent/50"}`}>
                    <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent"><Mail className="h-5 w-5" /></div>
                    <div>
                      <p className="text-sm font-semibold">Email</p>
                      <p className="text-xs text-muted-foreground">{userEmail?.substring(0, 3)}***@***</p>
                    </div>
                  </button>
                  <button onClick={() => setTwoFaMethod("phone")} disabled={!userPhone} className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${!userPhone ? "opacity-50 cursor-not-allowed" : twoFaMethod === "phone" ? "border-accent bg-accent/5" : "border-border hover:border-accent/50"}`}>
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary"><Phone className="h-5 w-5" /></div>
                    <div>
                      <p className="text-sm font-semibold">SMS text</p>
                      <p className="text-xs text-muted-foreground">{userPhone ? `***-***-${userPhone.slice(-4)}` : "Not registered"}</p>
                    </div>
                  </button>
                </div>
                <Button className="w-full h-11 text-sm font-semibold rounded-lg bg-gradient-brand" onClick={handleSend2FA} disabled={isLoading}>
                  {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</> : "Send code"}
                </Button>
              </div>
            )}

            {step === "2fa-verify" && (
              <div className="space-y-6 flex flex-col items-center">
                <InputOTP maxLength={6} value={twoFaCode} onChange={setTwoFaCode}>
                  <InputOTPGroup className="gap-2">
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <InputOTPSlot key={i} index={i} className="h-12 w-11 text-lg font-bold rounded-lg" />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
                <Button className="w-full h-11 text-sm font-semibold rounded-lg bg-gradient-brand" onClick={handleVerify2FA} disabled={isLoading || twoFaCode.length !== 6}>
                  {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying...</> : "Verify & enter portal"}
                </Button>
                <button className="text-xs font-medium text-muted-foreground hover:text-accent transition-colors" onClick={handleSend2FA}>Resend code</button>
              </div>
            )}

            <div className="mt-6 pt-5 border-t border-border">
              <Button variant="ghost" className="w-full text-muted-foreground hover:text-foreground text-xs" asChild>
                <Link to="/"><ArrowLeft className="mr-2 h-3 w-3" /> Back to home</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
