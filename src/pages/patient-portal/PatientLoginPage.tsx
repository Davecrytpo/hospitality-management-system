import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Heart, ArrowLeft, ShieldCheck, Mail, Phone } from "lucide-react";
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
        throw new Error("This portal is for patients only. Please use the staff portal if you are a healthcare provider.");
      }

      setUserId(data.user.id);
      setUserEmail(profile.email);
      setUserPhone(profile.phone);

      // Sign out temporarily - will sign back in after 2FA
      await supabase.auth.signOut();

      setStep("2fa-method");
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || "Login failed. Please check your credentials.");
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

      // For development/testing, show the code
      if (data.devCode) {
        setDevCode(data.devCode);
      }

      toast.success(`Verification code sent via ${twoFaMethod === "email" ? "email" : "SMS"}`);
      setStep("2fa-verify");
    } catch (err: any) {
      console.error("2FA send error:", err);
      setError(err.message || "Failed to send verification code");
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
        // Now sign in again after successful 2FA
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) throw signInError;

        toast.success("Login successful! Welcome to your patient portal.");
        navigate("/patient-portal");
      }
    } catch (err: any) {
      console.error("2FA verify error:", err);
      setError(err.message || "Verification failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            {step === "credentials" ? (
              <Heart className="h-6 w-6 text-primary" />
            ) : (
              <ShieldCheck className="h-6 w-6 text-primary" />
            )}
          </div>
          <CardTitle>
            {step === "credentials" && "Patient Portal"}
            {step === "2fa-method" && "Two-Factor Authentication"}
            {step === "2fa-verify" && "Enter Verification Code"}
          </CardTitle>
          <CardDescription>
            {step === "credentials" && "Sign in to access your medical records, appointments, and prescriptions"}
            {step === "2fa-method" && "Choose how to receive your verification code for secure access"}
            {step === "2fa-verify" && `A 6-digit code was sent via ${twoFaMethod === "email" ? "email" : "SMS"}. Enter it below.`}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {error && (
            <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md text-destructive text-sm">
              {error}
            </div>
          )}

          {step === "credentials" && (
            <>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Signing in...</>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
              <div className="mt-6 text-center text-sm text-muted-foreground">
                <p>Don't have an account? Contact your hospital to receive a registration link.</p>
              </div>
            </>
          )}

          {step === "2fa-method" && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground text-center">
                For your security, we require two-factor authentication to access your medical records.
              </p>
              <div className="grid gap-3">
                <Button
                  variant={twoFaMethod === "email" ? "default" : "outline"}
                  className="w-full justify-start h-auto py-4 px-4"
                  onClick={() => setTwoFaMethod("email")}
                >
                  <Mail className="mr-3 h-5 w-5 flex-shrink-0" />
                  <div className="text-left">
                    <div className="font-medium">Email Verification</div>
                    <div className="text-xs opacity-80 mt-0.5">
                      Send code to {userEmail ? `${userEmail.substring(0, 3)}***` : "your email"}
                    </div>
                  </div>
                </Button>
                <Button
                  variant={twoFaMethod === "phone" ? "default" : "outline"}
                  className="w-full justify-start h-auto py-4 px-4"
                  onClick={() => setTwoFaMethod("phone")}
                  disabled={!userPhone}
                >
                  <Phone className="mr-3 h-5 w-5 flex-shrink-0" />
                  <div className="text-left">
                    <div className="font-medium">SMS Verification</div>
                    <div className="text-xs opacity-80 mt-0.5">
                      {userPhone ? `Send code to ***${userPhone.slice(-4)}` : "No phone number on file"}
                    </div>
                  </div>
                </Button>
              </div>
              <Button className="w-full" onClick={handleSend2FA} disabled={isLoading}>
                {isLoading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Sending...</>
                ) : (
                  "Send Verification Code"
                )}
              </Button>
              <Button variant="ghost" className="w-full" onClick={() => { setStep("credentials"); setError(null); }}>
                Back to Login
              </Button>
            </div>
          )}

          {step === "2fa-verify" && (
            <div className="space-y-6">
              <div className="flex flex-col items-center space-y-4">
                <InputOTP maxLength={6} value={twoFaCode} onChange={(value) => setTwoFaCode(value)}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
                <p className="text-xs text-muted-foreground">Code expires in 5 minutes</p>
              </div>

              {devCode && (
                <div className="p-3 bg-muted rounded-lg text-center">
                  <p className="text-xs text-muted-foreground mb-1">Development Mode - Your code:</p>
                  <p className="font-mono text-lg font-bold tracking-widest">{devCode}</p>
                </div>
              )}

              <Button
                className="w-full"
                onClick={handleVerify2FA}
                disabled={isLoading || twoFaCode.length !== 6}
              >
                {isLoading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Verifying...</>
                ) : (
                  "Verify & Sign In"
                )}
              </Button>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => { setStep("2fa-method"); setTwoFaCode(""); setError(null); setDevCode(null); }}>
                  Back
                </Button>
                <Button variant="outline" className="flex-1" onClick={handleSend2FA} disabled={isLoading}>
                  Resend Code
                </Button>
              </div>
            </div>
          )}

          <div className="mt-4 pt-4 border-t">
            <Button variant="ghost" className="w-full" asChild>
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Hospital Portal
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
