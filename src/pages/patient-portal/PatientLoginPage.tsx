import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Building2, Loader2, Lock, Mail, Phone, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
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

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) throw signInError;

      const { data: profile } = await supabase
        .from("profiles")
        .select("role, phone, email")
        .eq("user_id", data.user.id)
        .single();

      if (!profile || profile.role !== "patient") {
        await supabase.auth.signOut();
        throw new Error("This portal is for registered patients only. Staff should use the staff portal.");
      }

      setUserId(data.user.id);
      setUserEmail(profile.email);
      setUserPhone(profile.phone);
      await supabase.auth.signOut();
      setStep("2fa-method");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Authentication failed.");
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
        body: { action: "send", userId, email: userEmail, phone: userPhone, deliveryMethod: twoFaMethod },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      if (twoFaMethod === "phone" && data?.devCode) {
        toast.success(`Verification code: ${data.devCode}`, { duration: 15000 });
      } else {
        toast.success(`Verification code sent via ${twoFaMethod === "email" ? "email" : "SMS"}.`);
      }

      setStep("2fa-verify");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to send code.");
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
      if (data?.error) throw new Error(data.error);

      if (data?.verified) {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) throw signInError;

        toast.success("Welcome back.");
        navigate("/patient-portal");
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Invalid security code.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f8ff] text-[#13306b] lg:grid lg:grid-cols-[0.96fr_1.04fr]">
      <section className="relative hidden overflow-hidden lg:flex">
        <img src={heroImg} alt="On Time Medical reception team" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(16,41,91,0.92)_0%,rgba(19,48,107,0.86)_50%,rgba(31,95,174,0.7)_100%)]" />
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.24)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.24)_1px,transparent_1px)] [background-size:34px_34px]" />

        <div className="relative z-10 flex w-full flex-col justify-between p-10 text-white">
          <Logo variant="light" size="md" />

          <div className="max-w-xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] backdrop-blur">
              <ShieldCheck className="h-4 w-4" />
              Secure patient access
            </div>
            <h1 className="font-display text-5xl font-extrabold leading-[1.02]">
              Your appointments, records, and billing in one secure place.
            </h1>
            <p className="max-w-lg text-base leading-8 text-white/82">
              Sign in to the patient portal to review upcoming visits, current medications, medical records, and account activity with two-factor verification.
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "Secure 2-step verification",
                "Appointments and medications",
                "Mobile-first patient access",
                "Billing and clinical records",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold text-white/90 backdrop-blur">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-white/60">© {new Date().getFullYear()} On Time Medical Group</p>
        </div>
      </section>

      <section className="flex min-h-screen items-center justify-center px-4 py-8 sm:px-6">
        <div className="w-full max-w-[520px]">
          <div className="mb-6 flex items-center justify-between lg:hidden">
            <Logo size="sm" />
            <Button variant="ghost" className="rounded-xl text-[#13306b]" asChild>
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Home
              </Link>
            </Button>
          </div>

          <Card className="rounded-[28px] border border-[#dbe4f4] bg-white shadow-[0_28px_60px_-34px_rgba(19,48,107,0.35)]">
            <CardHeader className="space-y-4 pb-4">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#13306b] text-white shadow-[0_14px_30px_-20px_rgba(19,48,107,0.65)]">
                  {step === "credentials" ? <Building2 className="h-6 w-6" /> : <ShieldCheck className="h-6 w-6" />}
                </div>
                <div>
                  <CardTitle className="font-display text-2xl font-extrabold text-[#13306b]">
                    {step === "credentials" && "Patient Portal Login"}
                    {step === "2fa-method" && "Choose Verification Method"}
                    {step === "2fa-verify" && "Enter Verification Code"}
                  </CardTitle>
                  <CardDescription className="mt-1 text-sm text-[#5f76a3]">
                    {step === "credentials" && "Access your health records, appointments, and billing details."}
                    {step === "2fa-method" && "Select where to receive your one-time security code."}
                    {step === "2fa-verify" && "Enter the 6-digit code sent to your selected destination."}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-5">
              {error && (
                <div className="rounded-2xl border border-[#ffd7d9] bg-[#fff5f5] px-4 py-3 text-sm font-medium text-[#b42318]">
                  {error}
                </div>
              )}

              {step === "credentials" && (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs font-bold uppercase tracking-[0.18em] text-[#6f85af]">
                      Email Address
                    </Label>
                    <Input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" required className="h-12 rounded-xl border-[#d5dff2]" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-xs font-bold uppercase tracking-[0.18em] text-[#6f85af]">
                      Password
                    </Label>
                    <Input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" required className="h-12 rounded-xl border-[#d5dff2]" />
                  </div>

                  <Button type="submit" className="h-12 w-full rounded-xl bg-[#ef2027] text-sm font-bold uppercase text-white hover:bg-[#d61920]" disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Continue
                  </Button>

                  <p className="text-center text-sm leading-7 text-[#5f76a3]">
                    Need portal access first? Use your registration invite or contact the care team.
                  </p>
                </form>
              )}

              {step === "2fa-method" && (
                <div className="space-y-4">
                  <button
                    type="button"
                    onClick={() => setTwoFaMethod("email")}
                    className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${twoFaMethod === "email" ? "border-[#13306b] bg-[#f5f9ff]" : "border-[#dbe4f4] bg-white hover:border-[#bfd0ef]"}`}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef4ff] text-[#13306b]">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-base font-bold text-[#13306b]">Email Verification</p>
                      <p className="mt-1 text-sm text-[#5f76a3]">{userEmail?.substring(0, 3)}***@***</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTwoFaMethod("phone")}
                    disabled={!userPhone}
                    className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${!userPhone ? "cursor-not-allowed opacity-50" : twoFaMethod === "phone" ? "border-[#13306b] bg-[#f5f9ff]" : "border-[#dbe4f4] bg-white hover:border-[#bfd0ef]"}`}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff1f1] text-[#ef2027]">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-base font-bold text-[#13306b]">SMS Verification</p>
                      <p className="mt-1 text-sm text-[#5f76a3]">{userPhone ? `***-***-${userPhone.slice(-4)}` : "Phone number not registered"}</p>
                    </div>
                  </button>

                  <Button className="h-12 w-full rounded-xl bg-[#ef2027] text-sm font-bold uppercase text-white hover:bg-[#d61920]" onClick={handleSend2FA} disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Send Verification Code
                  </Button>
                </div>
              )}

              {step === "2fa-verify" && (
                <div className="space-y-6">
                  <div className="rounded-2xl border border-[#dbe4f4] bg-[#f8fbff] px-4 py-4 text-sm leading-7 text-[#415b8f]">
                    Enter the code sent to your {twoFaMethod === "email" ? "email address" : "phone"}.
                  </div>

                  <div className="flex justify-center">
                    <InputOTP maxLength={6} value={twoFaCode} onChange={setTwoFaCode}>
                      <InputOTPGroup className="gap-2">
                        {[0, 1, 2, 3, 4, 5].map((index) => (
                          <InputOTPSlot key={index} index={index} className="h-12 w-11 rounded-xl border-[#d5dff2] text-lg font-extrabold" />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </div>

                  <Button className="h-12 w-full rounded-xl bg-[#ef2027] text-sm font-bold uppercase text-white hover:bg-[#d61920]" onClick={handleVerify2FA} disabled={isLoading || twoFaCode.length !== 6}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Verify and Continue
                  </Button>

                  <button type="button" className="w-full text-center text-sm font-semibold text-[#13306b] hover:text-[#ef2027]" onClick={handleSend2FA}>
                    Resend code
                  </button>
                </div>
              )}

              <div className="border-t border-[#e5ebf6] pt-4">
                <Button variant="ghost" className="w-full rounded-xl text-sm font-semibold text-[#13306b] hover:bg-[#f3f7ff] hover:text-[#13306b]" asChild>
                  <Link to="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to home
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
