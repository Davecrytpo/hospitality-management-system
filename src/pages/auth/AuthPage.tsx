import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Hospital, ArrowLeft, ShieldCheck } from "lucide-react";

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
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: "linear-gradient(145deg, hsl(222 47% 5%) 0%, hsl(222 47% 11%) 50%, hsl(217 91% 8%) 100%)" }}>
      
      {/* Subtle background */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: `linear-gradient(hsl(217 91% 50%) 1px, transparent 1px), linear-gradient(90deg, hsl(217 91% 50%) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
        style={{ background: "radial-gradient(circle, hsl(217 91% 50% / 0.06) 0%, transparent 70%)" }} />

      <Card className="relative z-10 w-full max-w-[420px] bg-white/[0.04] border-white/[0.06] backdrop-blur-2xl shadow-2xl rounded-2xl">
        <CardHeader className="text-center space-y-4 pb-2">
          <div className="mx-auto h-14 w-14 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, hsl(217 91% 50%), hsl(255 60% 58%))", boxShadow: "0 0 40px hsl(217 91% 50% / 0.2)" }}>
            <Hospital className="h-7 w-7 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold text-white tracking-tight">Staff Portal</CardTitle>
            <CardDescription className="text-white/40 text-sm mt-1 flex items-center justify-center gap-1.5">
              <ShieldCheck className="h-3 w-3" /> Authorized personnel only
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="pt-4">
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/15 rounded-lg text-red-400 text-xs font-medium">
              {error}
            </div>
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-5 bg-white/[0.04] border border-white/[0.06] rounded-lg h-10 p-0.5">
              <TabsTrigger value="login" className="rounded-md text-xs font-semibold data-[state=active]:bg-primary data-[state=active]:text-white text-white/50">Login</TabsTrigger>
              <TabsTrigger value="signup" className="rounded-md text-xs font-semibold data-[state=active]:bg-primary data-[state=active]:text-white text-white/50">Request Access</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="login-email" className="text-[11px] font-semibold uppercase text-white/30 tracking-wider">Email</Label>
                  <Input id="login-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="staff@hospital.com" required
                    className="bg-white/[0.04] border-white/[0.06] h-11 rounded-lg text-white placeholder:text-white/20 focus:border-primary/50" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="login-password" className="text-[11px] font-semibold uppercase text-white/30 tracking-wider">Password</Label>
                  <Input id="login-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required
                    className="bg-white/[0.04] border-white/[0.06] h-11 rounded-lg text-white placeholder:text-white/20 focus:border-primary/50" />
                </div>
                <Button type="submit" className="w-full h-11 font-semibold text-sm rounded-lg" disabled={isLoading}>
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Sign In"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="signup-name" className="text-[11px] font-semibold uppercase text-white/30 tracking-wider">Full Name</Label>
                  <Input id="signup-name" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="John Doe" required
                    className="bg-white/[0.04] border-white/[0.06] h-11 rounded-lg text-white placeholder:text-white/20" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="signup-email" className="text-[11px] font-semibold uppercase text-white/30 tracking-wider">Work Email</Label>
                  <Input id="signup-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@hospital.com" required
                    className="bg-white/[0.04] border-white/[0.06] h-11 rounded-lg text-white placeholder:text-white/20" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="signup-password" className="text-[11px] font-semibold uppercase text-white/30 tracking-wider">Password</Label>
                  <Input id="signup-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min 8 characters" required minLength={8}
                    className="bg-white/[0.04] border-white/[0.06] h-11 rounded-lg text-white placeholder:text-white/20" />
                </div>
                <Button type="submit" className="w-full h-11 font-semibold text-sm rounded-lg" disabled={isLoading}>
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Create Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6 pt-5 border-t border-white/[0.06]">
            <Button variant="ghost" className="w-full text-white/30 hover:text-white/60 text-xs font-medium" asChild>
              <Link to="/"><ArrowLeft className="mr-2 h-3 w-3" /> Back to Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
