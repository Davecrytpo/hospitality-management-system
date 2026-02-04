import { 
  Bell, 
  MessageSquare, 
  Menu,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Search,
  Heart
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

interface DashboardHeaderProps {
  onMenuToggle: () => void;
  sidebarCollapsed: boolean;
}

export function DashboardHeader({ onMenuToggle, sidebarCollapsed }: DashboardHeaderProps) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out successfully");
    navigate("/auth");
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-card px-4 lg:px-6">
      {/* Left side */}
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onMenuToggle}
          className="lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        {/* Search - Desktop */}
        <div className="hidden md:block">
          <GlobalSearch />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        {/* Mobile Search */}
        <Button variant="ghost" size="icon" className="md:hidden">
          <Search className="h-5 w-5" />
        </Button>
        
        {/* Patient Portal Link */}
        <Button variant="outline" size="sm" className="hidden sm:flex" asChild>
          <Link to="/patient-portal/login">
            <Heart className="mr-2 h-4 w-4" />
            Patient Portal
          </Link>
        </Button>
        
        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Messages */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <MessageSquare className="h-5 w-5" />
              <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px] bg-medical-accent">
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Messages</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
              <div className="flex items-center gap-2">
                <span className="font-medium">Dr. Sarah Williams</span>
                <span className="text-xs text-muted-foreground">2m ago</span>
              </div>
              <p className="text-sm text-muted-foreground">Patient lab results are ready for review</p>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
              <div className="flex items-center gap-2">
                <span className="font-medium">Lab Department</span>
                <span className="text-xs text-muted-foreground">15m ago</span>
              </div>
              <p className="text-sm text-muted-foreground">Urgent: Critical lab values detected</p>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-center text-medical-primary cursor-pointer"
              onClick={() => navigate("/support")}
            >
              View All Messages
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px] bg-medical-danger">
                5
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="flex flex-col items-start gap-1 p-3 cursor-pointer"
              onClick={() => navigate("/patients")}
            >
              <span className="font-medium">New Patient Registration</span>
              <p className="text-sm text-muted-foreground">Sarah Johnson has been registered</p>
              <span className="text-xs text-muted-foreground">5 minutes ago</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="flex flex-col items-start gap-1 p-3 cursor-pointer"
              onClick={() => navigate("/departments/emergency")}
            >
              <span className="font-medium">Emergency Alert</span>
              <p className="text-sm text-muted-foreground">Trauma case incoming to ER</p>
              <span className="text-xs text-muted-foreground">12 minutes ago</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-center text-medical-primary cursor-pointer"
              onClick={() => navigate("/support")}
            >
              View All Notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div className="hidden flex-col items-start lg:flex">
                <span className="text-sm font-medium">Admin User</span>
                <span className="text-xs text-muted-foreground">Administrator</span>
              </div>
              <ChevronDown className="hidden h-4 w-4 lg:block" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="cursor-pointer"
              onClick={() => navigate("/settings")}
            >
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="cursor-pointer"
              onClick={() => navigate("/settings")}
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive cursor-pointer" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
