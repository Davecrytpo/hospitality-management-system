import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
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
  FolderOpen
} from "lucide-react";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

interface NavItem {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  children?: { title: string; href: string }[];
}

const navigation: NavItem[] = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/" },
  { 
    title: "Patients", 
    icon: Users,
    children: [
      { title: "All Patients", href: "/patients" },
      { title: "Register Patient", href: "/patients/register" },
      { title: "Patient Search", href: "/patients/search" },
      { title: "Patient History", href: "/patients/history" },
    ]
  },
  { 
    title: "Doctors", 
    icon: UserCog,
    children: [
      { title: "All Doctors", href: "/doctors" },
      { title: "Add Doctor", href: "/doctors/add" },
      { title: "Schedules", href: "/doctors/schedules" },
      { title: "Specializations", href: "/doctors/specializations" },
    ]
  },
  { 
    title: "Appointments", 
    icon: Calendar,
    children: [
      { title: "All Appointments", href: "/appointments" },
      { title: "Schedule New", href: "/appointments/new" },
      { title: "Calendar View", href: "/appointments/calendar" },
    ]
  },
  { 
    title: "Admissions", 
    icon: BedDouble,
    children: [
      { title: "Current Admissions", href: "/admissions" },
      { title: "New Admission", href: "/admissions/new" },
      { title: "Discharge", href: "/admissions/discharge" },
      { title: "Bed Management", href: "/admissions/beds" },
    ]
  },
  { 
    title: "Medical Records", 
    icon: FileText,
    children: [
      { title: "Patient Records", href: "/records" },
      { title: "Diagnosis", href: "/records/diagnosis" },
      { title: "Treatment Plans", href: "/records/treatments" },
    ]
  },
  { 
    title: "Prescriptions", 
    icon: Pill,
    children: [
      { title: "All Prescriptions", href: "/prescriptions" },
      { title: "Create Prescription", href: "/prescriptions/new" },
      { title: "Prescription Templates", href: "/prescriptions/templates" },
    ]
  },
  { 
    title: "Pharmacy", 
    icon: Syringe,
    children: [
      { title: "Inventory", href: "/pharmacy" },
      { title: "Dispense", href: "/pharmacy/dispense" },
      { title: "Stock Management", href: "/pharmacy/stock" },
    ]
  },
  { 
    title: "Laboratory", 
    icon: FlaskConical,
    children: [
      { title: "Lab Tests", href: "/lab" },
      { title: "Test Results", href: "/lab/results" },
      { title: "Lab Reports", href: "/lab/reports" },
    ]
  },
  { 
    title: "Diagnostics", 
    icon: Scan,
    children: [
      { title: "Imaging", href: "/diagnostics/imaging" },
      { title: "Radiology", href: "/diagnostics/radiology" },
      { title: "Reports", href: "/diagnostics/reports" },
    ]
  },
  { 
    title: "Vitals", 
    icon: HeartPulse,
    href: "/vitals"
  },
  { 
    title: "Departments", 
    icon: Building2,
    children: [
      { title: "All Departments", href: "/departments" },
      { title: "Emergency", href: "/departments/emergency" },
      { title: "OPD", href: "/departments/opd" },
      { title: "IPD", href: "/departments/ipd" },
    ]
  },
  { 
    title: "Billing", 
    icon: CreditCard,
    children: [
      { title: "Invoices", href: "/billing" },
      { title: "Create Invoice", href: "/billing/new" },
      { title: "Payments", href: "/billing/payments" },
      { title: "Insurance Claims", href: "/billing/insurance" },
    ]
  },
];

const bottomNavigation: NavItem[] = [
  { title: "Settings", icon: Settings, href: "/settings" },
  { title: "Help & Support", icon: HelpCircle, href: "/support" },
];

export function DashboardSidebar({ collapsed, onToggle }: SidebarProps) {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>(["Patients"]);

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

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={cn(
          "fixed inset-0 z-40 bg-black/50 lg:hidden transition-opacity",
          collapsed ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
        onClick={onToggle}
      />
      
      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 z-50 flex h-screen flex-col border-r bg-card transition-all duration-300",
        collapsed ? "w-20 -translate-x-full lg:translate-x-0" : "w-72 translate-x-0"
      )}>
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b px-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-medical-primary to-medical-secondary">
              <Hospital className="h-6 w-6 text-white" />
            </div>
            {!collapsed && (
              <div>
                <h1 className="text-lg font-bold text-medical-primary">MediCare</h1>
                <p className="text-xs text-muted-foreground">Hospital Management</p>
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
            {navigation.map((item) => (
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
                    
                    {!collapsed && expandedItems.includes(item.title) && (
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
