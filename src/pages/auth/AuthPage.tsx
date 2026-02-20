import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Building2, Heart } from "lucide-react";

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
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("user_id", session.user.id)
          .single();

        if (profile) {
          if (profile.role === "patient") {
            navigate("/patient-portal", { replace: true });
          } else if (profile.role === "admin" || profile.role === "doctor") {
            navigate("/dashboard", { replace: true });
          }
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
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (signInError) throw signInError;

      if (data.user) {
        // Wait a small moment for the DB trigger to finish if they just signed up
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("role")
          .eq("user_id", data.user.id)
          .single();

        if (profileError || !profile) {
          // Fallback creation if trigger failed
          const signupRole = email.toLowerCase().includes("admin") ? "admin" : "doctor";
          const { data: newProfile, error: createError } = await supabase
            .from("profiles")
            .upsert({
              user_id: data.user.id,
              email: data.user.email!,
              full_name: data.user.user_metadata?.full_name || "New Staff",
              role: signupRole as any
            })
            .select()
            .single();

          if (createError) {
            console.error("Critical Profile Error:", createError);
            throw new Error("Account verified but profile initialization failed. Please contact IT.");
          }
          
          navigate(newProfile.role === "patient" ? "/patient-portal" : "/dashboard");
          return;
        }

        toast.success("Identity Authorized");
        if (profile.role === "patient") {
          navigate("/patient-portal");
        } else {
          navigate("/dashboard");
        }
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || "Authentication failed.");
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
        email: email.trim(),
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth`,
          data: {
            full_name: fullName,
            role: signupRole,
          },
        },
      });

      if (signUpError) throw signUpError;

      if (data.user) {
        toast.success("Account created successfully. You can now login.");
        setActiveTab("login");
      }
    } catch (err: any) {
      console.error("Signup error:", err);
      setError(err.message || "Credential creation failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 selection:bg-blue-500/30">
      <Card className="w-full max-w-md bg-slate-900/50 border-white/5 backdrop-blur-2xl shadow-2xl rounded-[32px]">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto h-16 w-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Building2 className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-black text-white tracking-tight italic">
            Institutional Portal
          </CardTitle>
          <CardDescription className="text-slate-400">
            Authorized personnel only. Secure biometric access active.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {error && (
            <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-bold uppercase tracking-widest">
              {error}
            </div>
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-white/5 border-white/5 rounded-xl h-12 p-1">
              <TabsTrigger value="login" className="rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white">Login</TabsTrigger>
              <TabsTrigger value="signup" className="rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white">Request Access</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email" className="text-[10px] font-black uppercase text-slate-500 ml-1">Work Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@medicare-hospital.com"
                    required
                    className="bg-white/5 border-white/5 h-12 rounded-xl focus:border-blue-500/50 transition-all text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password" id="pass-label" className="text-[10px] font-black uppercase text-slate-500 ml-1">Access Key</Label>
                  <Input
                    id="login-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="bg-white/5 border-white/5 h-12 rounded-xl focus:border-blue-500/50 transition-all text-white"
                  />
                </div>

                <Button type="submit" className="w-full h-12 bg-blue-600 hover:bg-blue-500 font-black uppercase tracking-widest text-xs rounded-xl" disabled={isLoading}>
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Authenticate"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name" className="text-[10px] font-black uppercase text-slate-500 ml-1">Full Name</Label>
                  <Input
                    id="signup-name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    required
                    className="bg-white/5 border-white/5 h-12 rounded-xl text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-[10px] font-black uppercase text-slate-500 ml-1">Work Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@medicare-hospital.com"
                    required
                    className="bg-white/5 border-white/5 h-12 rounded-xl text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password" id="reg-pass-label" className="text-[10px] font-black uppercase text-slate-500 ml-1">Choose Access Key</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min 8 characters"
                    required
                    minLength={8}
                    className="bg-white/5 border-white/5 h-12 rounded-xl text-white"
                  />
                </div>

                <Button type="submit" className="w-full h-12 bg-blue-600 hover:bg-blue-500 font-black uppercase tracking-widest text-xs rounded-xl" disabled={isLoading}>
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Create Credentials"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-8 pt-6 border-t border-white/5">
            <Button variant="ghost" className="w-full text-slate-500 hover:text-white text-[10px] font-black uppercase tracking-widest" asChild>
              <Link to="/">
                <Heart className="mr-2 h-3 w-3" /> Back to System Core
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
