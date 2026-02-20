import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: "admin" | "doctor" | "patient";
}

export function AuthGuard({ children, requiredRole }: AuthGuardProps) {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    let mounted = true;

    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
          if (mounted) navigate("/auth", { replace: true });
          return;
        }

        if (requiredRole) {
          const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("role")
            .eq("user_id", session.user.id)
            .single();

          if (profileError || !profile) {
            // Profile not found - sign out to prevent loop
            console.error("Profile not found for user:", session.user.id);
            await supabase.auth.signOut();
            if (mounted) navigate("/auth", { replace: true });
            return;
          }

          if (profile.role !== requiredRole) {
            if (mounted) {
              if (profile.role === "patient") {
                navigate("/patient-portal", { replace: true });
              } else if (profile.role === "admin" || profile.role === "doctor") {
                navigate("/dashboard", { replace: true });
              } else {
                await supabase.auth.signOut();
                navigate("/auth", { replace: true });
              }
            }
            return;
          }
        }

        if (mounted) setIsAuthorized(true);
      } catch (err) {
        console.error("Auth check failed:", err);
        if (mounted) navigate("/auth", { replace: true });
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        if (mounted) navigate("/auth", { replace: true });
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate, requiredRole]);

  if (isAuthorized === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return <>{children}</>;
}
