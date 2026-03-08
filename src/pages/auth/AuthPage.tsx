import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Heart, ArrowLeft, ShieldCheck } from "lucide-react";

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
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, hsl(162 63% 41% / 0.15) 0%, transparent 70%)" }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-15"
        style={{ background: "radial-gradient(circle, hsl(199 89% 48% / 0.1) 0%, transparent 70%)" }} />

      <Card className="relative z-10 w-full max-w-[420px] bg-card border-border shadow-premium rounded-2xl">
        <CardHeader className="text-center space-y-4 pb-2">
          <div className="mx-auto h-14 w-14 rounded-xl flex items-center justify-center bg-primary shadow-glow-sm">
            <Heart className="h-7 w-7 text-primary-foreground" fill="currentColor" />
          </div>
          <div>
            <CardTitle className="text-xl font-display font-bold text-foreground tracking-tight">Staff Portal</CardTitle>
            <CardDescription className="text-muted-foreground text-sm mt-1 flex items-center justify-center gap-1.5">
              <ShieldCheck className="h-3 w-3" /> Authorized personnel only
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="pt-4">
          {error && (
            <div className="mb-4 p-3 bg-destructive/10 border border-destructive/15 rounded-lg text-destructive text-xs font-medium">
              {error}
            </div>
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-5 h-10">
              <TabsTrigger value="login" className="text-xs font-semibold">Login</TabsTrigger>
              <TabsTrigger value="signup" className="text-xs font-semibold">Request Access</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="login-email" className="text-xs font-medium text-muted-foreground">Email</Label>
                  <Input id="login-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="staff@hospital.com" required
                    className="h-11 rounded-lg" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="login-password" className="text-xs font-medium text-muted-foreground">Password</Label>
                  <Input id="login-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required
                    className="h-11 rounded-lg" />
                </div>
                <Button type="submit" className="w-full h-11 font-semibold text-sm rounded-lg bg-primary hover:bg-primary/90" disabled={isLoading}>
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Sign In"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="signup-name" className="text-xs font-medium text-muted-foreground">Full Name</Label>
                  <Input id="signup-name" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="John Doe" required
                    className="h-11 rounded-lg" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="signup-email" className="text-xs font-medium text-muted-foreground">Work Email</Label>
                  <Input id="signup-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@hospital.com" required
                    className="h-11 rounded-lg" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="signup-password" className="text-xs font-medium text-muted-foreground">Password</Label>
                  <Input id="signup-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min 8 characters" required minLength={8}
                    className="h-11 rounded-lg" />
                </div>
                <Button type="submit" className="w-full h-11 font-semibold text-sm rounded-lg bg-primary hover:bg-primary/90" disabled={isLoading}>
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Create Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6 pt-5 border-t border-border">
            <Button variant="ghost" className="w-full text-muted-foreground hover:text-foreground text-xs font-medium" asChild>
              <Link to="/"><ArrowLeft className="mr-2 h-3 w-3" /> Back to Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
