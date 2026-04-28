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

        <div className="relative mx-auto max-w-[1240px] px-4 py-5 lg:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Logo size="md" variant="light" />

            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="outline"
                className="h-11 rounded-xl border-white/30 bg-white/10 px-4 text-white hover:bg-white hover:text-[#13306b]"
                asChild
              >
                <Link to="/">
                  <Home className="mr-2 h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
              {onLogout && (
                <Button
                  variant="outline"
                  className="h-11 rounded-xl border-white/30 bg-transparent px-4 text-white hover:bg-white hover:text-[#13306b]"
                  onClick={onLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              )}
            </div>
          </div>

          <div className="mt-6 rounded-[28px] border border-white/15 bg-white/10 p-5 shadow-[0_25px_60px_-32px_rgba(0,0,0,0.45)] backdrop-blur-md sm:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-white/70">Secure Patient Portal</p>
                <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">{title}</h1>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-white/82 sm:text-base">{description}</p>
              </div>

              <div className="rounded-2xl border border-white/15 bg-[#0e2552]/65 px-4 py-4 text-sm text-white/85">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">Signed In</p>
                <p className="mt-2 text-lg font-bold text-white">{patientName || "Patient"}</p>
                {patientMeta && <p className="mt-1 text-xs text-white/72">{patientMeta}</p>}
              </div>
            </div>

            {actions && <div className="mt-5">{actions}</div>}
          </div>
        </div>
      </header>

      <div className="border-b border-[#d9e1f2] bg-white/96 backdrop-blur">
        <div className="mx-auto max-w-[1240px] overflow-x-auto px-4 lg:px-6">
          <nav className="flex min-w-max gap-2 py-3">
            {portalLinks.map((item) => {
              const isActive = location.pathname === item.href;

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition",
                    isActive
                      ? "bg-[#13306b] text-white shadow-[0_10px_24px_-16px_rgba(19,48,107,0.65)]"
                      : "text-[#335389] hover:bg-[#eef4ff] hover:text-[#13306b]",
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      <main className="mx-auto max-w-[1240px] px-4 py-6 sm:py-8 lg:px-6">{children}</main>
    </div>
  );
}
