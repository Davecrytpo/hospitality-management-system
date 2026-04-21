import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import {
  LayoutDashboard, Users, Calendar, BedDouble, FileText, Pill,
  FlaskConical, Stethoscope, Activity, Building2, CreditCard,
  Settings, HelpCircle, ChevronLeft, ChevronRight, ChevronDown,
  Heart, Ambulance, Megaphone, Headset, X
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
  { 
    title: "Doctor Portal", icon: Stethoscope, roles: ["doctor", "admin"],
    children: [
      { title: "My Dashboard", href: "/doctor/dashboard" },
      { title: "My Patients", href: "/doctor/patients" },
      { title: "IPD Rounds", href: "/doctor/rounds" },
      { title: "Surgeries", href: "/doctor/surgeries" },
      { title: "Clinical Analytics", href: "/doctor/analytics" },
    ]
  },
  { 
    title: "Nurse Portal", icon: Heart, roles: ["nurse", "admin"],
    children: [
      { title: "Nurse Station", href: "/nurse/station" },
      { title: "Ward Monitoring", href: "/nurse/vitals" },
      { title: "Medication (MAR)", href: "/nurse/mar" },
      { title: "Shift Handover", href: "/nurse/handover" },
      { title: "Ward Inventory", href: "/nurse/inventory" },
    ]
  },
  { 
    title: "Patients", icon: Users, roles: ["admin", "doctor", "nurse", "receptionist"],
    children: [
      { title: "All Patients", href: "/patients" },
      { title: "Register Patient", href: "/patients/register" },
      { title: "Patient Search", href: "/patients/search" },
      { title: "Patient History", href: "/patients/history" },
    ]
  },
  { 
    title: "Pharmacy", icon: Pill, roles: ["pharmacist", "admin"],
    children: [
      { title: "Dispensing Queue", href: "/pharmacy/queue" },
      { title: "Inventory", href: "/pharmacy" },
      { title: "Dispense Meds", href: "/pharmacy/dispense" },
      { title: "Drug Checker", href: "/pharmacy/checker" },
      { title: "Suppliers", href: "/pharmacy/suppliers" },
    ]
  },
  { 
    title: "Laboratory", icon: FlaskConical, roles: ["lab_tech", "admin"],
    children: [
      { title: "Test Orders", href: "/lab" },
      { title: "Test Results", href: "/lab/results" },
      { title: "Sample Tracking", href: "/lab/tracking" },
      { title: "Imaging Workspace", href: "/lab/imaging-workspace" },
      { title: "Blood Bank", href: "/lab/blood-bank" },
    ]
  },
  { 
    title: "Front Office", icon: Headset, roles: ["receptionist", "admin"],
    children: [
      { title: "Reception Desk", href: "/reception" },
      { title: "Queue Manager", href: "/reception/queue" },
      { title: "Appointments", href: "/appointments" },
      { title: "Feedback", href: "/reception/feedback" },
    ]
  },
  { 
    title: "Finance & Billing", icon: CreditCard, roles: ["finance", "admin"],
    children: [
      { title: "Revenue Center", href: "/finance/revenue" },
      { title: "Billing/Invoices", href: "/billing" },
      { title: "Payments", href: "/billing/payments" },
      { title: "Payroll", href: "/finance/payroll" },
      { title: "Insurance", href: "/billing/insurance" },
    ]
  },
  { 
    title: "Hospital Ops", icon: Building2, roles: ["admin"],
    children: [
      { title: "Staff Management", href: "/staff" },
      { title: "ER Live Board", href: "/departments/er-board" },
      { title: "Ambulance Tracking", href: "/departments/ambulance" },
      { title: "Bed Management", href: "/admissions/beds" },
      { title: "Maintenance", href: "/maintenance" },
    ]
  },
  {
    title: "Notice Board", icon: Megaphone, href: "/notice-board",
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
      prev.includes(title) ? prev.filter(item => item !== title) : [...prev, title]
    );
  };

  const isActive = (href: string) => location.pathname === href;
  const isParentActive = (children?: { href: string }[]) =>
    children?.some(child => location.pathname === child.href);

  const filteredNavigation = navigation.filter(item => {
    if (!userRole) return false;
    if (userRole === 'admin') return true;
    return item.roles?.includes(userRole);
  });

  return (
    <>
      {/* Mobile overlay */}
      {!collapsed && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden" onClick={onToggle} />
      )}

      <aside className={cn(
        "fixed left-0 top-0 z-50 flex h-screen flex-col transition-all duration-300 ease-in-out",
        "bg-sidebar border-r border-sidebar-border",
        collapsed ? "w-[72px] -translate-x-full lg:translate-x-0" : "w-[272px] translate-x-0"
      )}>
        {/* Logo area */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl shrink-0 bg-gradient-brand shadow-glow">
              <Heart className="h-5 w-5 text-white" fill="currentColor" />
            </div>
            {!collapsed && (
              <div className="overflow-hidden">
                <h1 className="text-sm font-bold text-sidebar-foreground tracking-tight leading-none font-display">On Time Medical</h1>
                <p className="text-[9px] uppercase tracking-[0.18em] text-sidebar-primary font-semibold mt-1">
                  {userRole || "Staff"} • Workspace
                </p>
              </div>
            )}
          </Link>
          
          {!collapsed && (
            <button onClick={onToggle} className="lg:hidden h-7 w-7 flex items-center justify-center rounded-lg text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors">
              <X className="h-4 w-4" />
            </button>
          )}
          <button onClick={onToggle} className="hidden lg:flex h-7 w-7 items-center justify-center rounded-lg text-sidebar-foreground/40 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors">
            {collapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-3 px-3">
          <ul className="space-y-0.5">
            {filteredNavigation.map((item) => (
              <li key={item.title}>
                {item.children ? (
                  <div>
                    <button
                      onClick={() => !collapsed && toggleExpand(item.title)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium transition-all duration-200",
                        isParentActive(item.children)
                          ? "bg-sidebar-primary/10 text-sidebar-primary"
                          : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                      )}
                    >
                      <item.icon className="h-[18px] w-[18px] flex-shrink-0" />
                      {!collapsed && (
                        <>
                          <span className="flex-1 text-left truncate">{item.title}</span>
                          <ChevronDown className={cn(
                            "h-3.5 w-3.5 transition-transform duration-200 opacity-50",
                            expandedItems.includes(item.title) && "rotate-180"
                          )} />
                        </>
                      )}
                    </button>

                    {!collapsed && (expandedItems.includes(item.title) || isParentActive(item.children)) && (
                      <ul className="mt-0.5 ml-[18px] space-y-0.5 border-l border-sidebar-border pl-3">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              to={child.href}
                              className={cn(
                                "block rounded-md px-3 py-1.5 text-[12px] transition-all duration-200",
                                isActive(child.href)
                                  ? "bg-sidebar-primary text-white font-semibold"
                                  : "text-sidebar-foreground/55 hover:bg-sidebar-accent hover:text-sidebar-foreground"
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
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium transition-all duration-200",
                      isActive(item.href!)
                        ? "bg-sidebar-primary text-white shadow-glow-sm"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                    )}
                  >
                    <item.icon className="h-[18px] w-[18px] flex-shrink-0" />
                    {!collapsed && <span className="truncate">{item.title}</span>}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom nav */}
        <div className="border-t border-sidebar-border p-3">
          <ul className="space-y-0.5">
            {bottomNavigation.map((item) => (
              <li key={item.title}>
                <Link
                  to={item.href!}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium transition-all duration-200",
                    isActive(item.href!)
                      ? "bg-sidebar-primary text-white"
                      : "text-sidebar-foreground/50 hover:bg-sidebar-accent hover:text-sidebar-foreground/80"
                  )}
                >
                  <item.icon className="h-[18px] w-[18px] flex-shrink-0" />
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
