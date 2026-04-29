import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Calendar, Lock, Menu, Phone, X } from "lucide-react";

import logo from "@/assets/logo-ontime.png";
import { Button } from "@/components/ui/button";
import { AppointmentRequestDialog } from "@/components/landing/AppointmentRequestDialog";
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
  const shellClassName = "mx-auto w-full max-w-[1580px] px-6 sm:px-10 xl:px-14";

  const openAppointment = () => {
    setMobileOpen(false);
    setAppointmentOpen(true);
  };

  return (
    <>
    <header className="relative z-50 bg-card shadow-sm border-b border-[#dde5f4]">
      <div className={`${shellClassName} flex items-center justify-between gap-4 py-4 lg:py-7`}>
        <Link to="/" aria-label="On Time Medical Group home" className="inline-flex">
          <img src={logo} alt="On Time Medical Group" className="h-[76px] w-[76px] object-contain sm:h-[96px] sm:w-[96px] xl:h-[114px] xl:w-[114px]" width={114} height={114} />
        </Link>

        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-3 lg:flex xl:gap-6">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={cn(
                "text-[0.8rem] font-bold tracking-tight text-[#13306b] uppercase transition-colors hover:text-[#ef2027] whitespace-nowrap lg:text-[0.85rem] xl:text-[0.9rem]",
                location.pathname === item.href && "text-[#ef2027] border-b-2 border-[#ef2027]"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-5 lg:flex">
          <Button variant="outline" className="btn-mock-outline h-[52px] px-7 text-[13px] font-bold uppercase border-2 border-[#13306b]/20" asChild>
            <Link to="/patient-portal/login">
              <Lock className="mr-2 h-4.5 w-4.5" />
              Patient Portal Login
            </Link>
          </Button>
          <Button className="btn-mock-red h-[52px] px-7 text-[13px] font-bold uppercase shadow-md shadow-[#ef2027]/15" type="button" onClick={openAppointment}>
              <Calendar className="mr-2 h-4.5 w-4.5" />
              Book Appointment
          </Button>
        </div>

        <Button variant="outline" size="icon" className="btn-mock-outline h-12 w-12 lg:hidden" onClick={() => setMobileOpen((open) => !open)}>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      <div className={`${shellClassName} hidden justify-end pb-4 lg:flex`}>
        <a href="tel:+14107544343" className="inline-flex items-center gap-3 text-[2.4rem] font-black tracking-tighter text-[#13306b]">
          <Phone className="h-7 w-7 text-[#13306b]" />
          410-754-4343
        </a>
      </div>

      {mobileOpen && (
        <div className="border-t border-otmg-border bg-card lg:hidden">
          <div className="mx-auto flex max-w-[1240px] flex-col gap-3 px-4 py-4">
            {navItems.map((item) => (
              <Link key={item.label} to={item.href} onClick={() => setMobileOpen(false)} className="mobile-mock-link">
                {item.label}
              </Link>
            ))}
            <div className="grid gap-3 sm:grid-cols-2">
              <Button variant="outline" className="btn-mock-outline h-12 text-[13px] uppercase" asChild>
                <Link to="/patient-portal/login" onClick={() => setMobileOpen(false)}>Patient Portal Login</Link>
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
