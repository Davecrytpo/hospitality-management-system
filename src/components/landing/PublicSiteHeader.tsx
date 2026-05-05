import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Calendar, Lock, Menu, Phone, X } from "lucide-react";

import logo from "@/assets/logo-ontime.png";
import { AppointmentRequestDialog } from "@/components/landing/AppointmentRequestDialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About Us", href: "/#about" },
  { label: "Patient Resources", href: "/#resources" },
  { label: "Insurance", href: "/#insurance" },
  { label: "Contact", href: "/#contact" },
];

export function PublicSiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const location = useLocation();
  const shellClassName = "mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-7";

  const openAppointment = () => {
    setMobileOpen(false);
    setAppointmentOpen(true);
  };

  const isNavItemActive = (label: string, href: string) => {
    if (label === "Home") return location.pathname === "/";
    if (label === "Services") return location.pathname.startsWith("/services");
    return location.pathname === href;
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[#dde5f4] bg-white/95 shadow-[0_1px_0_rgba(19,48,107,0.08)] backdrop-blur">
        <div className={`${shellClassName} flex h-[68px] items-center justify-between gap-4`}>
          <Link to="/" aria-label="On Time Medical Group home" className="inline-flex shrink-0">
            <img src={logo} alt="On Time Medical Group" className="h-[50px] w-auto object-contain" width={50} height={50} />
          </Link>

          <nav className="hidden min-w-0 flex-1 items-center justify-center gap-5 lg:flex xl:gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={cn(
                  "border-b-2 border-transparent pb-1 text-[0.74rem] font-black uppercase tracking-tight text-[#13306b] transition-colors hover:text-[#ef2027] whitespace-nowrap",
                  isNavItemActive(item.label, item.href) && "border-[#ef2027] text-[#ef2027]",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden shrink-0 items-center gap-3 lg:flex">
            <Button variant="outline" className="h-9 rounded-md border-2 border-[#13306b]/20 px-4 text-[10.5px] font-bold uppercase text-[#13306b]" asChild>
              <Link to="/patient-portal/login">
                <Lock className="mr-2 h-4 w-4" />
                Patient Portal Login
              </Link>
            </Button>
            <Button className="btn-mock-red h-9 rounded-md px-4 text-[10.5px] font-bold uppercase shadow-sm" type="button" onClick={openAppointment}>
              <Calendar className="mr-2 h-4 w-4" />
              Book Appointment
            </Button>
            <a href="tel:+14107544343" className="ml-1 inline-flex items-center gap-2 whitespace-nowrap text-[#13306b] transition-colors hover:text-[#ef2027]">
              <Phone className="h-4 w-4" />
              <span className="text-[0.98rem] font-black tracking-tight">410-754-4343</span>
            </a>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <a href="tel:+14107544343" className="inline-flex items-center gap-2 text-sm font-black text-[#13306b]">
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline">410-754-4343</span>
            </a>
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-md border-[#13306b]/15"
              onClick={() => setMobileOpen((open) => !open)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {mobileOpen && (
          <div className="absolute left-0 top-full w-full border-t border-[#dde5f4] bg-white shadow-[0_18px_40px_-34px_rgba(19,48,107,0.45)] lg:hidden">
            <div className={`${shellClassName} flex flex-col gap-3 py-5`}>
              {navItems.map((item) => (
                <Link key={item.label} to={item.href} onClick={() => setMobileOpen(false)} className="mobile-mock-link">
                  {item.label}
                </Link>
              ))}
              <div className="grid gap-3 sm:grid-cols-2">
                <Button variant="outline" className="btn-mock-outline h-12 text-[13px] uppercase" asChild>
                  <Link to="/patient-portal/login" onClick={() => setMobileOpen(false)}>
                    Patient Portal Login
                  </Link>
                </Button>
                <Button className="btn-mock-red h-12 text-[13px] uppercase" type="button" onClick={openAppointment}>
                  Book Appointment
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>
      <AppointmentRequestDialog open={appointmentOpen} onOpenChange={setAppointmentOpen} />
    </>
  );
}
