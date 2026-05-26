import { 
  Menu, ChevronDown, User, Settings, LogOut, LayoutGrid,
  Stethoscope, Heart, Pill, FlaskConical, Building2, Search, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { GlobalSearch } from "@/components/search/GlobalSearch";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { NotificationCenter } from "@/components/notifications/NotificationCenter";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface DashboardHeaderProps {
  onMenuToggle: () => void;
  sidebarCollapsed: boolean;
}

type UserProfile = { full_name?: string | null; role?: string | null; };

export function DashboardHeader({ onMenuToggle, sidebarCollapsed }: DashboardHeaderProps) {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

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
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border/60 bg-background/80 backdrop-blur-xl px-3 sm:px-4 lg:px-6">
      <div className="flex items-center gap-2 sm:gap-3 flex-1">
        <Button variant="ghost" size="icon" onClick={onMenuToggle} className="lg:hidden h-9 w-9 shrink-0">
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="hidden sm:block w-full max-w-sm">
          <GlobalSearch />
        </div>

        {/* Mobile Search Toggle */}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setShowMobileSearch(true)} 
          className="sm:hidden h-9 w-9 text-muted-foreground"
        >
          <Search className="h-5 w-5" />
        </Button>
      </div>

      {/* Mobile Search Overlay */}
      <div className={cn(
        "absolute inset-0 z-50 flex items-center bg-background px-4 transition-all duration-200 sm:hidden",
        showMobileSearch ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
      )}>
        <div className="flex w-full items-center gap-3">
          <div className="flex-1">
            <GlobalSearch />
          </div>
          <Button variant="ghost" size="icon" onClick={() => setShowMobileSearch(false)} className="h-9 w-9 shrink-0">
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-1 sm:gap-2 shrink-0">
        <NotificationCenter audience="staff" compact />
        
        {userProfile?.role === 'admin' && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="hidden md:flex gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground">
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

        <div className="hidden sm:block">
          <ThemeToggle />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-1.5 sm:px-2 h-9">
              <Avatar className="h-7 w-7 sm:h-8 sm:w-8 border border-border/50">
                <AvatarFallback className="bg-primary/10 text-primary text-[10px] sm:text-xs font-bold">
                  {userProfile?.full_name?.substring(0, 2).toUpperCase() || "ST"}
                </AvatarFallback>
              </Avatar>
              <div className="hidden flex-col items-start lg:flex">
                <span className="text-sm font-semibold leading-none text-foreground">{userProfile?.full_name || "Staff"}</span>
                <span className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider mt-0.5">
                  {userProfile?.role || "Staff"}
                </span>
              </div>
              <ChevronDown className="hidden h-3.5 w-3.5 text-muted-foreground lg:block" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 p-2">
            <div className="flex items-center gap-3 px-2 py-2 lg:hidden">
              <Avatar className="h-9 w-9 border border-border/50">
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                  {userProfile?.full_name?.substring(0, 2).toUpperCase() || "ST"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-foreground leading-none">{userProfile?.full_name || "Staff"}</span>
                <span className="text-[10px] uppercase font-bold text-muted-foreground mt-1">{userProfile?.role || "Staff"}</span>
              </div>
            </div>
            <DropdownMenuSeparator className="lg:hidden" />
            <DropdownMenuLabel className="text-[10px] uppercase tracking-wider text-muted-foreground px-2 py-1.5">My Account</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigate("/settings")} className="rounded-lg h-10"><User className="mr-2 h-4 w-4 text-muted-foreground" /> Profile</DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/settings")} className="rounded-lg h-10"><Settings className="mr-2 h-4 w-4 text-muted-foreground" /> Settings</DropdownMenuItem>
            <DropdownMenuItem className="sm:hidden rounded-lg h-10" onClick={(event) => event.preventDefault()}>
              <ThemeToggle />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/5 cursor-pointer rounded-lg h-10 font-medium" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" /> Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
