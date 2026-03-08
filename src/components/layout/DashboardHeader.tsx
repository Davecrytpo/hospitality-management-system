import { 
  Menu, ChevronDown, User, Settings, LogOut, LayoutGrid,
  Stethoscope, Heart, Pill, FlaskConical, Building2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { GlobalSearch } from "@/components/search/GlobalSearch";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useState, useEffect } from "react";

interface DashboardHeaderProps {
  onMenuToggle: () => void;
  sidebarCollapsed: boolean;
}

type UserProfile = { full_name?: string | null; role?: string | null; };

export function DashboardHeader({ onMenuToggle, sidebarCollapsed }: DashboardHeaderProps) {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data } = await supabase.from("profiles").select("*").eq("user_id", session.user.id).single();
        setUserProfile(data);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out successfully");
    navigate("/auth");
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border/60 bg-background/80 backdrop-blur-xl px-4 lg:px-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onMenuToggle} className="lg:hidden h-9 w-9">
          <Menu className="h-5 w-5" />
        </Button>
        <div className="hidden md:block">
          <GlobalSearch />
        </div>
      </div>

      <div className="flex items-center gap-2">
        {userProfile?.role === 'admin' && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="hidden sm:flex gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground">
                <LayoutGrid className="h-4 w-4" /> Units
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuLabel className="text-xs text-muted-foreground font-semibold">Hospital Units</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/doctor/dashboard")}><Stethoscope className="mr-2 h-4 w-4" /> Doctor Portal</DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/nurse/station")}><Heart className="mr-2 h-4 w-4" /> Nurse Station</DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/pharmacy/queue")}><Pill className="mr-2 h-4 w-4" /> Pharmacy</DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/lab")}><FlaskConical className="mr-2 h-4 w-4" /> Laboratory</DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/dashboard")}><Building2 className="mr-2 h-4 w-4" /> Admin Center</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-2 h-9">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                  {userProfile?.full_name?.substring(0, 2).toUpperCase() || "ST"}
                </AvatarFallback>
              </Avatar>
              <div className="hidden flex-col items-start lg:flex">
                <span className="text-sm font-semibold leading-none">{userProfile?.full_name || "Staff"}</span>
                <span className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider mt-0.5">
                  {userProfile?.role || "Staff"}
                </span>
              </div>
              <ChevronDown className="hidden h-3.5 w-3.5 text-muted-foreground lg:block" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuLabel className="text-xs text-muted-foreground">Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/settings")}><User className="mr-2 h-4 w-4" /> Profile</DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/settings")}><Settings className="mr-2 h-4 w-4" /> Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive cursor-pointer" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
