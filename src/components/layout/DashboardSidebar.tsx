import { useState, useEffect, useMemo } from "react";
import { useLocation, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useCmsPages, useCmsServices } from "@/features/cms/hooks";
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
  icon?: React.ComponentType<{ className?: string }>;
  href?: string;
  roles?: string[];
  children?: NavItem[];
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
  },
];

const bottomNavigation: NavItem[] = [
  { title: "Settings", icon: Settings, href: "/settings", roles: ["admin"] },
  { title: "Help & Support", icon: HelpCircle, href: "/support", roles: ["admin"] },
];

export function DashboardSidebar({ collapsed, onToggle }: SidebarProps) {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [userRole, setUserRole] = useState<string | null>(null);
  const includeCmsDrafts = userRole === "admin" || userRole === "content_manager";
  const { data: cmsPages = [] } = useCmsPages(includeCmsDrafts);
  const { data: cmsServices = [] } = useCmsServices(includeCmsDrafts);

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
  const isPathActive = (href: string) => location.pathname === href || location.pathname.startsWith(`${href}/`);
  const cmsScopeFromStatus = (status?: string) => {
    if (status === "deleted") return "deleted";
    if (status === "draft") return "drafts";
    return "live";
  };

  const cmsNavigation = useMemo<NavItem>(() => {
    const corePageOrder = ["home", "about-us", "services", "contact", "faq", "blog"];
    const pageLabelMap: Record<string, string> = {
      home: "Homepage",
      "about-us": "About Us",
      services: "Services Page",
      contact: "Contact",
      faq: "FAQ Page",
      blog: "Blog Landing",
    };
    const pageLinks = corePageOrder.map((slug) => {
      const page = cmsPages.find((entry) => entry.slug === slug);
      return {
        title: pageLabelMap[slug] ?? slug,
        href: page ? `/cms/pages/${cmsScopeFromStatus(page.status)}/${page.slug}` : "/cms/pages/live",
      };
    });

    const serviceLinks = cmsServices
      .filter((service) => service.status !== "deleted")
      .sort((left, right) => left.sortOrder - right.sortOrder || left.title.localeCompare(right.title))
      .map((service) => ({
        title: service.title,
        href: `/cms/services/${cmsScopeFromStatus(service.status)}/${service.slug}`,
      }));

    return {
      title: "Website CMS",
      icon: LayoutDashboard,
      roles: ["admin", "content_manager"],
      children: [
        { title: "CMS Dashboard", href: "/cms" },
        {
          title: "Website Management",
          children: [
            ...pageLinks,
            { title: "Blog Posts", href: "/cms/blog/live" },
            { title: "FAQs", href: "/cms/faqs/live" },
            { title: "Testimonials", href: "/cms/testimonials/live" },
            { title: "Team", href: "/cms/team/live" },
            { title: "Policies", href: "/cms/legal/live" },
            { title: "Media Library", href: "/cms/media/live" },
            { title: "Announcements", href: "/cms/announcements/live" },
          ],
        },
        {
          title: "Services Management",
          children: [
            { title: "All Services", href: "/cms/services/live" },
            ...serviceLinks,
          ],
        },
        {
          title: "Website Settings",
          children: [
            { title: "Branding", href: "/cms/settings/branding" },
            { title: "Navbar", href: "/cms/settings/navbar" },
            { title: "Footer", href: "/cms/settings/footer" },
            { title: "Contact", href: "/cms/settings/contact" },
            { title: "Social Links", href: "/cms/settings/social" },
            { title: "Theme Settings", href: "/cms/settings/theme" },
            { title: "SEO", href: "/cms/settings/seo" },
          ],
        },
      ],
    };
  }, [cmsPages, cmsServices]);

  const isItemActive = (item: NavItem): boolean => {
    if (item.href && isPathActive(item.href)) return true;
    return item.children?.some(isItemActive) ?? false;
  };

  const filteredNavigation = [...navigation, cmsNavigation].filter(item => {
    if (!userRole) return false;
    if (userRole === 'admin') return true;
    return item.roles?.includes(userRole);
  });

  const renderNavItems = (items: NavItem[], depth = 0, parentKey = "root") => (
    <ul className={cn(depth === 0 ? "space-y-0.5" : "mt-0.5 space-y-0.5 border-l border-sidebar-border pl-3", depth >= 2 && "ml-2")}>
      {items.map((item) => {
        const key = `${parentKey}/${item.title}`;
        const hasChildren = Boolean(item.children?.length);
        const active = isItemActive(item);
        const expanded = expandedItems.includes(key) || active;
        const Icon = item.icon;

        if (hasChildren) {
          return (
            <li key={key}>
              <button
                type="button"
                onClick={() => !collapsed && toggleExpand(key)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg transition-all duration-200",
                  depth === 0 ? "px-3 py-2 text-[13px] font-medium" : "px-3 py-2 text-[12px] font-medium",
                  active
                    ? depth === 0
                      ? "bg-sidebar-primary/10 text-sidebar-primary"
                      : "bg-sidebar-accent text-sidebar-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                )}
              >
                {depth === 0 && Icon ? <Icon className="h-[18px] w-[18px] flex-shrink-0" /> : <span className="h-1.5 w-1.5 rounded-full bg-current opacity-50" />}
                {!collapsed && (
                  <>
                    <span className="flex-1 text-left truncate">{item.title}</span>
                    <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-200 opacity-50", expanded && "rotate-180")} />
                  </>
                )}
              </button>

              {!collapsed && expanded && item.children && renderNavItems(item.children, depth + 1, key)}
            </li>
          );
        }

        return (
          <li key={key}>
            <Link
              to={item.href!}
              className={cn(
                "flex items-center gap-3 rounded-lg transition-all duration-200",
                depth === 0 ? "px-3 py-2 text-[13px] font-medium" : depth === 1 ? "px-3 py-1.5 text-[12px]" : "px-3 py-1.5 text-[11px]",
                active
                  ? depth === 0
                    ? "bg-sidebar-primary text-white shadow-glow-sm"
                    : "bg-sidebar-primary text-white font-semibold"
                  : depth === 0
                    ? "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                    : "text-sidebar-foreground/55 hover:bg-sidebar-accent hover:text-sidebar-foreground",
              )}
            >
              {depth === 0 && Icon ? <Icon className="h-[18px] w-[18px] flex-shrink-0" /> : <span className="h-1.5 w-1.5 rounded-full bg-current opacity-50" />}
              {!collapsed && <span className="truncate">{item.title}</span>}
            </Link>
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      {/* Mobile overlay */}
      {!collapsed && (
        <div 
          className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-[2px] lg:hidden transition-opacity duration-300" 
          onClick={onToggle} 
        />
      )}

      <aside className={cn(
        "fixed left-0 top-0 z-50 flex h-screen flex-col transition-all duration-300 ease-in-out",
        "bg-sidebar border-r border-sidebar-border shadow-elevated lg:shadow-none",
        collapsed ? "w-[72px] -translate-x-full lg:translate-x-0" : "w-[280px] translate-x-0"
      )}>
        {/* Logo area */}
        <div className="flex h-16 items-center justify-between px-4 sm:px-5 border-b border-sidebar-border bg-sidebar-background/50 backdrop-blur">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl shrink-0 bg-gradient-brand shadow-glow ring-1 ring-white/10">
              <Heart className="h-5 w-5 text-white" fill="currentColor" />
            </div>
            {!collapsed && (
              <div className="overflow-hidden">
                <h1 className="text-sm font-bold text-sidebar-foreground tracking-tight leading-none font-display uppercase">On Time Medical</h1>
                <p className="text-[9px] uppercase tracking-[0.18em] text-sidebar-primary font-bold mt-1.5 opacity-80">
                  {userRole || "Staff"} • Portal
                </p>
              </div>
            )}
          </Link>
          
          {!collapsed && (
            <button 
              type="button" 
              onClick={onToggle} 
              className="lg:hidden h-8 w-8 flex items-center justify-center rounded-lg text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-all active:scale-90"
            >
              <X className="h-5 w-5" />
            </button>
          )}
          <button 
            type="button" 
            onClick={onToggle} 
            className="hidden lg:flex h-8 w-8 items-center justify-center rounded-lg text-sidebar-foreground/40 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-all group"
          >
            {collapsed ? <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" /> : <ChevronLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-3 px-3">
          {renderNavItems(filteredNavigation)}
        </nav>

        {/* Bottom nav */}
        <div className="border-t border-sidebar-border p-3">
          <ul className="space-y-0.5">
            {bottomNavigation.filter(item => {
              if (!item.roles) return true;
              if (!userRole) return false;
              if (userRole === 'admin') return true;
              return item.roles.includes(userRole);
            }).map((item) => (
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
