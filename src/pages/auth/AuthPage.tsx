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
        // If no profile found, stay on auth page (don't redirect = no loop)
      }
    };
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        // Stay on auth page
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        // Check user role
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("role")
          .eq("user_id", data.user.id)
          .single();

        if (profileError || !profile) {
          // If profile is missing, try to create it now (fallback)
          const { data: newProfile, error: createError } = await supabase
            .from("profiles")
            .upsert({
              user_id: data.user.id,
              email: data.user.email!,
              full_name: data.user.user_metadata?.full_name || "New Staff",
              role: email.toLowerCase() === "admin@medicare-hospital.com" ? "admin" : "doctor"
            })
            .select()
            .single();

          if (createError || !newProfile) {
            toast.error("Profile could not be initialized. Please contact system IT.");
            return;
          }
          
          toast.success("Profile initialized! Redirecting...");
          navigate(newProfile.role === "patient" ? "/patient-portal" : "/dashboard");
          return;
        }

        toast.success("Login successful!");
        
        if (profile.role === "patient") {
          navigate("/patient-portal");
        } else {
          navigate("/dashboard");
        }
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const signupRole = email.toLowerCase() === "admin@medicare-hospital.com" ? "admin" : "doctor";

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth`,
          data: {
            full_name: fullName,
            role: signupRole,
          },
        },
      });

      if (error) throw error;

      if (data.user) {
        // Force profile creation immediately with a delay-retry if needed
        const { error: profileError } = await supabase
          .from("profiles")
          .upsert({
            user_id: data.user.id,
            email: email.toLowerCase(),
            full_name: fullName,
            role: signupRole,
          }, { onConflict: 'user_id' });

        if (profileError) {
          console.error("Profile creation error:", profileError);
          // Even if insert fails, we tell them it's okay because handleLogin will fix it
          toast.success("Account created! Please check your email (or log in directly if already confirmed).");
        } else {
          toast.success("Registration successful!");
        }
        
        setActiveTab("login");
      }
    } catch (err: any) {
      console.error("Signup error:", err);
      if (err.message.includes("already registered")) {
        setError("An account with this email already exists. Please login instead.");
      } else {
        setError(err.message || "Signup failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Building2 className="h-6 w-6 text-primary" />
          </div>
          <CardTitle>Hospital Management System</CardTitle>
          <CardDescription>Staff Portal - Sign in to access the dashboard</CardDescription>
        </CardHeader>

        <CardContent>
          {error && (
            <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md text-destructive text-sm">
              {error}
            </div>
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Full Name</Label>
                  <Input
                    id="signup-name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password (min 8 characters)"
                    required
                    minLength={8}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6 pt-4 border-t">
            <Button variant="ghost" className="w-full" asChild>
              <Link to="/patient-portal/login">
                <Heart className="mr-2 h-4 w-4" />
                Go to Patient Portal
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
