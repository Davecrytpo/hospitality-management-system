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
  
  // Master Instruction: Max width 1200px – 1280px
  const shellClassName = "mx-auto w-full max-w-[1280px] px-5 sm:px-8";

  const openAppointment = () => {
    setMobileOpen(false);
    setAppointmentOpen(true);
  };

  return (
    <>
    {/* Master Instruction: Navbar height 70px – 80px max, position sticky */}
    <header className="sticky top-0 z-50 h-[70px] border-b border-[#dde5f4] bg-white shadow-sm flex items-center">
      <div className={`${shellClassName} flex items-center justify-between gap-4 h-full`}>
        <Link to="/" aria-label="On Time Medical Group home" className="inline-flex shrink-0">
          {/* Master Instruction: Reduce logo size */}
          <img src={logo} alt="On Time Medical Group" className="h-[48px] w-auto object-contain" width={48} height={48} />
        </Link>

        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-4 lg:flex xl:gap-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={cn(
                "text-[0.75rem] font-bold tracking-tight text-[#13306b] uppercase transition-colors hover:text-[#ef2027] whitespace-nowrap",
                location.pathname === item.href && "text-[#ef2027] border-b-2 border-[#ef2027]"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-4 lg:flex">
          <Button variant="outline" className="h-10 px-4 text-[11px] font-bold uppercase border-2 border-[#13306b]/20" asChild>
            <Link to="/patient-portal/login">
              <Lock className="mr-2 h-4 w-4" />
              Portal
            </Link>
          </Button>
          <Button className="btn-mock-red h-10 px-4 text-[11px] font-bold uppercase shadow-sm" type="button" onClick={openAppointment}>
              <Calendar className="mr-2 h-4 w-4" />
              Appointment
          </Button>
        </div>

        <div className="lg:hidden flex items-center gap-2">
          <Button variant="outline" size="icon" className="h-10 w-10" onClick={() => setMobileOpen((open) => !open)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <div className="absolute top-full left-0 w-full border-t border-[#dde5f4] bg-white lg:hidden">
          <div className="mx-auto flex max-w-[1280px] flex-col gap-3 px-6 py-6">
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
