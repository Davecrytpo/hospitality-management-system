import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, ArrowLeft, ShieldCheck, Sparkles, Activity, HeartPulse } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import heroImg from "@/assets/hospital-exterior.jpg";

export default function AuthPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("login");

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: profile } = await supabase.from("profiles").select("role").eq("user_id", session.user.id).single();
        if (profile) {
          navigate(profile.role === "patient" ? "/patient-portal" : "/dashboard", { replace: true });
        }
      }
    };
    checkAuth();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (signInError) throw signInError;
      if (data.user) {
        const { data: profile, error: profileError } = await supabase.from("profiles").select("role").eq("user_id", data.user.id).single();
        if (profileError || !profile) {
          const signupRole = email.toLowerCase().includes("admin") ? "admin" : "doctor";
          const { data: newProfile, error: createError } = await supabase.from("profiles")
            .upsert({ user_id: data.user.id, email: data.user.email!, full_name: data.user.user_metadata?.full_name || "New Staff", role: signupRole as "admin" | "doctor" })
            .select().single();
          if (createError) throw new Error("Profile initialization failed. Please contact IT.");
          navigate(newProfile.role === "patient" ? "/patient-portal" : "/dashboard");
          return;
        }
        toast.success("Welcome back");
        navigate(profile.role === "patient" ? "/patient-portal" : "/dashboard");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const signupRole = email.toLowerCase().includes("admin") ? "admin" : "doctor";
    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email.trim(), password,
        options: { emailRedirectTo: `${window.location.origin}/auth`, data: { full_name: fullName, role: signupRole } },
      });
      if (signUpError) throw signUpError;
      if (data.user) { toast.success("Account created. You can now login."); setActiveTab("login"); }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full grid lg:grid-cols-2 bg-background">
      {/* Left visual panel */}
      <div className="relative hidden lg:flex flex-col justify-between p-10 overflow-hidden bg-gradient-hero text-white">
        <img src={heroImg} alt="On Time Medical hospital" className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/85 via-primary/70 to-accent/40" />
        <div className="ambient-orb -top-24 -left-24 h-96 w-96" />
        <div className="ambient-orb -bottom-24 -right-24 h-96 w-96" />

        <div className="relative z-10">
          <Logo variant="light" size="md" />
        </div>

        <div className="relative z-10 space-y-6 max-w-md">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]">
            <Sparkles className="h-3 w-3" /> Staff command surface
          </div>
          <h2 className="font-display text-4xl font-bold leading-tight">Care orchestration, redefined for the modern hospital.</h2>
          <p className="text-white/80 text-base leading-relaxed">Unified clinical, operational, and financial workflows in one elegant workspace — built for clinicians, secured for patients.</p>

          <div className="grid grid-cols-3 gap-3 pt-4">
            {[
              { icon: ShieldCheck, label: "HIPAA Secure" },
              { icon: Activity, label: "Real-time" },
              { icon: HeartPulse, label: "Clinical-grade" },
            ].map((f) => (
              <div key={f.label} className="rounded-xl border border-white/15 bg-white/5 backdrop-blur p-3">
                <f.icon className="h-4 w-4 text-accent mb-2" />
                <p className="text-[11px] font-semibold tracking-wide">{f.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-xs text-white/60">© {new Date().getFullYear()} On Time Medical Group. All rights reserved.</div>
      </div>

      {/* Right form */}
      <div className="flex items-center justify-center p-6 sm:p-10 relative">
        <div className="absolute inset-0 medical-grid opacity-40 pointer-events-none" />
        <Card className="relative z-10 w-full max-w-[460px] border-border/60 shadow-elevated rounded-2xl bg-card">
          <CardHeader className="space-y-3 pb-4">
            <div className="lg:hidden">
              <Logo size="sm" />
            </div>
            <div>
              <CardTitle className="text-2xl font-display font-bold tracking-tight">Welcome back</CardTitle>
              <CardDescription className="text-sm mt-1 flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-accent" /> Authorized personnel only
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="pt-2">
            {error && (
              <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-xs font-medium">
                {error}
              </div>
            )}

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-5 h-11 bg-muted/60">
                <TabsTrigger value="login" className="text-xs font-semibold">Sign in</TabsTrigger>
                <TabsTrigger value="signup" className="text-xs font-semibold">Request access</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="login-email" className="text-xs font-semibold text-foreground/80">Work email</Label>
                    <Input id="login-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="staff@ontimemedical.com" required className="h-11 rounded-lg" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="login-password" className="text-xs font-semibold text-foreground/80">Password</Label>
                    <Input id="login-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required className="h-11 rounded-lg" />
                  </div>
                  <Button type="submit" className="w-full h-11 font-semibold text-sm rounded-lg bg-gradient-brand hover:opacity-95 transition-opacity" disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Sign in to workspace"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="signup-name" className="text-xs font-semibold text-foreground/80">Full name</Label>
                    <Input id="signup-name" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Dr. Jane Doe" required className="h-11 rounded-lg" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="signup-email" className="text-xs font-semibold text-foreground/80">Work email</Label>
                    <Input id="signup-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@ontimemedical.com" required className="h-11 rounded-lg" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="signup-password" className="text-xs font-semibold text-foreground/80">Password</Label>
                    <Input id="signup-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min 8 characters" required minLength={8} className="h-11 rounded-lg" />
                  </div>
                  <Button type="submit" className="w-full h-11 font-semibold text-sm rounded-lg bg-gradient-brand hover:opacity-95 transition-opacity" disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Request access"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 pt-5 border-t border-border">
              <Button variant="ghost" className="w-full text-muted-foreground hover:text-foreground text-xs font-medium" asChild>
                <Link to="/"><ArrowLeft className="mr-2 h-3 w-3" /> Back to home</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
