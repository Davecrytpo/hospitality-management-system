import { 
  Bell, 
  MessageSquare, 
  Menu,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Search,
  LayoutGrid,
  Stethoscope,
  Heart,
  Pill,
  FlaskConical,
  Building2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GlobalSearch } from "@/components/search/GlobalSearch";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useState, useEffect } from "react";

interface DashboardHeaderProps {
  onMenuToggle: () => void;
  sidebarCollapsed: boolean;
}

export function DashboardHeader({ onMenuToggle, sidebarCollapsed }: DashboardHeaderProps) {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("user_id", session.user.id)
          .single();
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

  const getDepartmentLink = () => {
    if (!userProfile) return "/dashboard";
    switch (userProfile.role) {
      case 'admin': return "/dashboard";
      case 'doctor': return "/doctor/dashboard";
      case 'nurse': return "/nurse/station";
      case 'pharmacist': return "/pharmacy/queue";
      case 'lab_tech': return "/lab";
      default: return "/dashboard";
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-card px-4 lg:px-6">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onMenuToggle}
          className="lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="hidden md:block">
          <GlobalSearch />
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Quick Dept Switcher for Admin/Multi-role */}
        {userProfile?.role === 'admin' && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="hidden sm:flex gap-2">
                <LayoutGrid className="h-4 w-4" />
                Units
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Hospital Units</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/doctor/dashboard")}>
                <Stethoscope className="mr-2 h-4 w-4" /> Doctor Portal
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/nurse/station")}>
                <Heart className="mr-2 h-4 w-4" /> Nurse Station
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/pharmacy/queue")}>
                <Pill className="mr-2 h-4 w-4" /> Pharmacy
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/lab")}>
                <FlaskConical className="mr-2 h-4 w-4" /> Laboratory
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                <Building2 className="mr-2 h-4 w-4" /> Admin Center
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-2">
              <Avatar className="h-8 w-8 border">
                <AvatarFallback className="bg-medical-primary/10 text-medical-primary font-bold">
                  {userProfile?.full_name?.substring(0, 2).toUpperCase() || "ST"}
                </AvatarFallback>
              </Avatar>
              <div className="hidden flex-col items-start lg:flex">
                <span className="text-sm font-medium">{userProfile?.full_name || "Staff Member"}</span>
                <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-tighter">
                  {userProfile?.role || "Hospital Staff"}
                </span>
              </div>
              <ChevronDown className="hidden h-4 w-4 lg:block" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/settings")}>
              <User className="mr-2 h-4 w-4" /> Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/settings")}>
              <Settings className="mr-2 h-4 w-4" /> Settings
            </DropdownMenuItem>
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
