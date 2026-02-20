import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

export type UserRole = "admin" | "doctor" | "nurse" | "pharmacist" | "lab_tech" | "finance" | "receptionist" | "patient";

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: UserRole | UserRole[];
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

        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("role")
          .eq("user_id", session.user.id)
          .single();

        if (profileError || !profile) {
          console.error("AuthGuard: Profile not found", profileError);
          await supabase.auth.signOut();
          if (mounted) navigate("/auth", { replace: true });
          return;
        }

        if (requiredRole) {
          const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
          const hasAccess = roles.includes(profile.role as UserRole) || profile.role === 'admin';

          if (!hasAccess) {
            if (mounted) {
              // Redirect to their respective dashboard if they don't have access to this specific page
              if (profile.role === "patient") {
                navigate("/patient-portal", { replace: true });
              } else {
                navigate("/dashboard", { replace: true });
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
