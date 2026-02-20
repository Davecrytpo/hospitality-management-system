import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import {
  LayoutDashboard,
  Users,
  UserCog,
  Calendar,
  BedDouble,
  FileText,
  Pill,
  FlaskConical,
  Stethoscope,
  Activity,
  Building2,
  CreditCard,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Hospital,
  Clipboard,
  Ambulance,
  HeartPulse,
  Syringe,
  Scan,
  FolderOpen,
  Megaphone,
  Heart,
  Thermometer,
  ShieldCheck,
  Package,
  Microscope,
  DollarSign,
  Headset
} from "lucide-react";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

interface NavItem {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  roles?: string[];
  children?: { title: string; href: string; roles?: string[] }[];
}

const navigation: NavItem[] = [
  { title: "Admin Dashboard", icon: LayoutDashboard, href: "/dashboard", roles: ["admin"] },
  
  // Doctor Portal
  { 
    title: "Doctor Portal", 
    icon: Stethoscope,
    roles: ["doctor", "admin"],
    children: [
      { title: "My Dashboard", href: "/doctor/dashboard" },
      { title: "My Patients", href: "/doctor/patients" },
      { title: "IPD Rounds", href: "/doctor/rounds" },
      { title: "Surgeries", href: "/doctor/surgeries" },
      { title: "Clinical Analytics", href: "/doctor/analytics" },
    ]
  },

  // Nurse Portal
  { 
    title: "Nurse Portal", 
    icon: Heart,
    roles: ["nurse", "admin"],
    children: [
      { title: "Nurse Station", href: "/nurse/station" },
      { title: "Ward Monitoring", href: "/nurse/vitals" },
      { title: "Medication (MAR)", href: "/nurse/mar" },
      { title: "Shift Handover", href: "/nurse/handover" },
      { title: "Ward Inventory", href: "/nurse/inventory" },
    ]
  },

  // Patients
  { 
    title: "Patients", 
    icon: Users,
    roles: ["admin", "doctor", "nurse", "receptionist"],
    children: [
      { title: "All Patients", href: "/patients" },
      { title: "Register Patient", href: "/patients/register" },
      { title: "Patient Search", href: "/patients/search" },
      { title: "Patient History", href: "/patients/history" },
    ]
  },

  // Pharmacy Portal
  { 
    title: "Pharmacy", 
    icon: Pill,
    roles: ["pharmacist", "admin"],
    children: [
      { title: "Dispensing Queue", href: "/pharmacy/queue" },
      { title: "Inventory", href: "/pharmacy" },
      { title: "Dispense Meds", href: "/pharmacy/dispense" },
      { title: "Drug Checker", href: "/pharmacy/checker" },
      { title: "Suppliers", href: "/pharmacy/suppliers" },
    ]
  },

  // Lab Portal
  { 
    title: "Laboratory", 
    icon: FlaskConical,
    roles: ["lab_tech", "admin"],
    children: [
      { title: "Test Orders", href: "/lab" },
      { title: "Test Results", href: "/lab/results" },
      { title: "Sample Tracking", href: "/lab/tracking" },
      { title: "Imaging Workspace", href: "/lab/imaging-workspace" },
      { title: "Blood Bank", href: "/lab/blood-bank" },
    ]
  },

  // Front Office
  { 
    title: "Front Office", 
    icon: Headset,
    roles: ["receptionist", "admin"],
    children: [
      { title: "Reception Desk", href: "/reception" },
      { title: "Queue Manager", href: "/reception/queue" },
      { title: "Appointments", href: "/appointments" },
      { title: "Feedback", href: "/reception/feedback" },
    ]
  },

  // Finance
  { 
    title: "Finance & Billing", 
    icon: CreditCard,
    roles: ["finance", "admin"],
    children: [
      { title: "Revenue Center", href: "/finance/revenue" },
      { title: "Billing/Invoices", href: "/billing" },
      { title: "Payments", href: "/billing/payments" },
      { title: "Payroll", href: "/finance/payroll" },
      { title: "Insurance", href: "/billing/insurance" },
    ]
  },

  // Operations
  { 
    title: "Hospital Ops", 
    icon: Building2,
    roles: ["admin"],
    children: [
      { title: "Staff Management", href: "/staff" },
      { title: "ER Live Board", href: "/departments/er-board" },
      { title: "Ambulance Tracking", href: "/departments/ambulance" },
      { title: "Bed Management", href: "/admissions/beds" },
      { title: "Maintenance", href: "/maintenance" },
    ]
  },

  {
    title: "Notice Board",
    icon: Megaphone,
    href: "/notice-board",
    roles: ["admin", "doctor", "nurse", "pharmacist", "lab_tech", "finance", "receptionist"]
  }
];

const bottomNavigation: NavItem[] = [
  { title: "Settings", icon: Settings, href: "/settings" },
  { title: "Help & Support", icon: HelpCircle, href: "/support" },
];

export function DashboardSidebar({ collapsed, onToggle }: SidebarProps) {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("user_id", session.user.id)
          .single();
        if (profile) setUserRole(profile.role);
      }
    };
    fetchUserRole();
  }, []);

  const toggleExpand = (title: string) => {
    setExpandedItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  const isActive = (href: string) => location.pathname === href;
  const isParentActive = (children?: { href: string }[]) => 
    children?.some(child => location.pathname === child.href);

  // Filter navigation based on role
  const filteredNavigation = navigation.filter(item => {
    if (!userRole) return false;
    if (userRole === 'admin') return true; // Admins see everything
    return item.roles?.includes(userRole);
  });

  return (
    <>
      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 z-50 flex h-screen flex-col border-r bg-card transition-all duration-300",
        collapsed ? "w-20 -translate-x-full lg:translate-x-0" : "w-72 translate-x-0"
      )}>
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b px-4">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-medical-primary to-medical-secondary">
              <Hospital className="h-6 w-6 text-white" />
            </div>
            {!collapsed && (
              <div>
                <h1 className="text-lg font-bold text-medical-primary">MediCare</h1>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">{userRole || "Hospital Staff"}</p>
              </div>
            )}
          </Link>
          
          <button 
            onClick={onToggle}
            className="hidden lg:flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted transition-colors"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3">
          <ul className="space-y-1">
            {filteredNavigation.map((item) => (
              <li key={item.title}>
                {item.children ? (
                  <div>
                    <button
                      onClick={() => !collapsed && toggleExpand(item.title)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                        isParentActive(item.children)
                          ? "bg-medical-primary/10 text-medical-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && (
                        <>
                          <span className="flex-1 text-left">{item.title}</span>
                          <ChevronDown className={cn(
                            "h-4 w-4 transition-transform",
                            expandedItems.includes(item.title) && "rotate-180"
                          )} />
                        </>
                      )}
                    </button>
                    
                    {!collapsed && (expandedItems.includes(item.title) || isParentActive(item.children)) && (
                      <ul className="mt-1 ml-4 space-y-1 border-l pl-4">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              to={child.href}
                              className={cn(
                                "block rounded-lg px-3 py-2 text-sm transition-colors",
                                isActive(child.href)
                                  ? "bg-medical-primary text-white"
                                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
                              )}
                            >
                              {child.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.href!}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive(item.href!)
                        ? "bg-medical-primary text-white"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    {!collapsed && <span>{item.title}</span>}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom Navigation */}
        <div className="border-t p-3">
          <ul className="space-y-1">
            {bottomNavigation.map((item) => (
              <li key={item.title}>
                <Link
                  to={item.href!}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive(item.href!)
                      ? "bg-medical-primary text-white"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {!collapsed && <span>{item.title}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}
