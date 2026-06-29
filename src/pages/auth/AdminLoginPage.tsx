import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, ArrowLeft, ShieldCheck, Sparkles, Activity, HeartPulse, Eye, EyeOff } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import heroImg from "@/assets/hospital-exterior.jpg";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

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
      if (signInError) {
        // Auto-create admin account for the known default credentials if signin fails due to non-existent user
        const isDefaultAdmin = email.toLowerCase() === 'admin@ontimemedicalgroup.com';
        if (isDefaultAdmin && (signInError.message.includes('Invalid login credentials') || signInError.message.includes('User not found'))) {
          const { error: signUpError } = await supabase.auth.signUp({
            email: email.trim(),
            password,
            options: {
              emailRedirectTo: `${window.location.origin}/admin/login`,
              data: { full_name: 'System Admin', role: 'admin' }
            }
          });
          if (signUpError) throw signUpError;
          const { data: retryData, error: retryError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
          if (retryError) throw new Error('Admin account created. If email confirmation is required, confirm the user in your Supabase dashboard (Authentication > Users) or disable "Confirm email" in Supabase settings.');
          if (retryData.user) {
            const { data: profile } = await supabase.from("profiles").select("role").eq("user_id", retryData.user.id).single();
            if (!profile) {
              await supabase.from("profiles").upsert({ user_id: retryData.user.id, email: retryData.user.email!, full_name: 'System Admin', role: 'admin' });
            }
            toast.success("Welcome, Administrator");
            navigate("/dashboard");
            return;
          }
        }
        throw signInError;
      }
      if (data.user) {
        const { data: profile, error: profileError } = await supabase.from("profiles").select("role").eq("user_id", data.user.id).single();
        if (profileError || !profile) {
          toast.error("Profile not found. Please contact IT.");
          return;
        }
        if (profile.role !== "admin") {
          toast.error("This portal is for administrators only.");
          await supabase.auth.signOut();
          return;
        }
        toast.success("Welcome back, Administrator");
        navigate("/dashboard");
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      if (errorMessage.includes('Failed to fetch') || errorMessage.includes('fetch')) {
        setError("Unable to connect to authentication service. Please check your internet connection or contact support if the problem persists.");
      } else {
        setError(errorMessage);
      }
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
            <ShieldCheck className="h-3 w-3" /> Admin control center
          </div>
          <h2 className="font-display text-4xl font-bold leading-tight">Secure orchestration for the hospital administrators.</h2>
          <p className="text-white/80 text-base leading-relaxed">Manage staff, patients, and hospital operations with absolute precision and security.</p>

          <div className="grid grid-cols-3 gap-3 pt-4">
            {[
              { icon: ShieldCheck, label: "Admin Access" },
              { icon: Activity, label: "System-wide" },
              { icon: HeartPulse, label: "Secure Auth" },
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
              <CardTitle className="text-2xl font-display font-bold tracking-tight">Admin Login</CardTitle>
              <CardDescription className="text-sm mt-1 flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-accent" /> High-security administrative access
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="pt-2">
            {error && (
              <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-xs font-medium">
                {error}
                {error.includes('connect') && (
                  <div className="mt-2 text-[10px] opacity-80">
                    Tip: Ensure VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY are correctly set in your Vercel environment variables, then redeploy.
                  </div>
                )}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs font-semibold text-foreground/80">Admin Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@ontimemedical.com" required className="h-11 rounded-lg" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-xs font-semibold text-foreground/80">Password</Label>
                <div className="relative">
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="••••••••" 
                    required 
                    className="h-11 rounded-lg pr-10" 
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full h-11 font-semibold text-sm rounded-lg bg-gradient-brand hover:opacity-95 transition-opacity" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Secure Login"}
              </Button>
            </form>

            <div className="mt-6 flex flex-col gap-3">
              <div className="text-center text-xs text-muted-foreground">
                Don't have an admin account? <Link to="/admin/signup" className="text-primary font-semibold hover:underline">Request Admin Access</Link>
              </div>
              <div className="pt-5 border-t border-border">
                <Button variant="ghost" className="w-full text-muted-foreground hover:text-foreground text-xs font-medium" asChild>
                  <Link to="/"><ArrowLeft className="mr-2 h-3 w-3" /> Back to home</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
