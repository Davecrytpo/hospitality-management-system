import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, LogOut, Calendar, CreditCard, FileText, LayoutGrid, Pill, UserRound } from "lucide-react";

import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const portalLinks = [
  { label: "Overview", href: "/patient-portal", icon: LayoutGrid },
  { label: "Appointments", href: "/patient-portal/appointments", icon: Calendar },
  { label: "Prescriptions", href: "/patient-portal/prescriptions", icon: Pill },
  { label: "Records", href: "/patient-portal/records", icon: FileText },
  { label: "Billing", href: "/patient-portal/billing", icon: CreditCard },
  { label: "Profile", href: "/patient-portal/profile", icon: UserRound },
];

interface PatientPortalShellProps {
  title: string;
  description: string;
  patientName?: string;
  patientMeta?: string;
  onLogout?: () => void;
  actions?: ReactNode;
  children: ReactNode;
}

export function PatientPortalShell({
  title,
  description,
  patientName,
  patientMeta,
  onLogout,
  actions,
  children,
}: PatientPortalShellProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#f4f8ff] text-[#13306b]">
      <header className="relative overflow-hidden bg-[#13306b] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_28%),linear-gradient(135deg,#10295b_0%,#13306b_52%,#1f5fae_100%)]" />
        <div className="absolute inset-0 opacity-15 [background-image:linear-gradient(rgba(255,255,255,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.22)_1px,transparent_1px)] [background-size:28px_28px]" />

        <div className="relative mx-auto max-w-[1240px] px-4 py-4 sm:py-6 lg:px-6">
          <div className="flex items-center justify-between gap-4 mb-6 sm:mb-8">
            <Logo size="sm" variant="light" className="sm:scale-110 origin-left" />

            <div className="flex items-center gap-2 sm:gap-3">
              <Button
                variant="outline"
                size="sm"
                className="h-9 sm:h-11 rounded-xl border-white/20 bg-white/5 px-3 sm:px-4 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white hover:bg-white hover:text-[#13306b] transition-all"
                asChild
              >
                <Link to="/">
                  <Home className="mr-1.5 sm:mr-2 h-3.5 sm:h-4 w-3.5 sm:w-4" />
                  <span className="hidden xs:inline">Portal </span>Home
                </Link>
              </Button>
              {onLogout && (
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 sm:h-11 rounded-xl border-white/20 bg-white/5 px-3 sm:px-4 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white hover:bg-white hover:text-[#13306b] transition-all"
                  onClick={onLogout}
                >
                  <LogOut className="mr-1.5 sm:mr-2 h-3.5 sm:h-4 w-3.5 sm:w-4" />
                  Exit
                </Button>
              )}
            </div>
          </div>

          <div className="rounded-[24px] sm:rounded-[32px] border border-white/10 bg-white/5 p-5 sm:p-8 shadow-2xl backdrop-blur-xl ring-1 ring-white/10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1 min-w-0">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Patient Access
                </div>
                <h1 className="mt-4 font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">{title}</h1>
                <p className="mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-white/75">{description}</p>
              </div>

              <div className="shrink-0 flex items-center gap-4 sm:gap-5 rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
                <div className="h-12 w-12 sm:h-14 sm:w-14 shrink-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-white/20 to-white/5 ring-1 ring-white/20">
                  <UserRound className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Verified Patient</p>
                  <p className="mt-1 text-base sm:text-lg font-bold text-white truncate">{patientName || "Patient"}</p>
                  {patientMeta && <p className="mt-0.5 text-xs text-white/50 truncate">{patientMeta}</p>}
                </div>
              </div>
            </div>

            {actions && <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/10">{actions}</div>}
          </div>
        </div>
      </header>

      <div className="sticky top-0 z-30 border-b border-[#d9e1f2] bg-white/80 backdrop-blur-xl shadow-sm">
        <div className="mx-auto max-w-[1240px] px-4 lg:px-6">
          <nav className="flex items-center gap-1 overflow-x-auto no-scrollbar py-2 sm:py-3">
            {portalLinks.map((item) => {
              const isActive = location.pathname === item.href;

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-2 rounded-xl px-3 sm:px-5 py-2 sm:py-3 text-[11px] sm:text-sm font-bold uppercase tracking-wide transition-all shrink-0",
                    isActive
                      ? "bg-[#13306b] text-white shadow-lg ring-1 ring-[#13306b]"
                      : "text-[#335389] hover:bg-[#eef4ff] hover:text-[#13306b]",
                  )}
                >
                  <item.icon className={cn("h-3.5 w-3.5 sm:h-4 sm:w-4", isActive ? "text-emerald-400" : "text-[#7b96c8]")} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      <main className="mx-auto max-w-[1240px] px-4 py-6 sm:py-10 lg:px-6">{children}</main>
    </div>
  );
}
