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
  const shellClassName = "mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8";

  const openAppointment = () => {
    setMobileOpen(false);
    setAppointmentOpen(true);
  };

  const isNavItemActive = (label: string, href: string) => {
    if (label === "Services") return location.pathname.startsWith("/services");

    const [pathname, hash] = href.split("#");
    if (hash) {
      return location.pathname === pathname && location.hash === `#${hash}`;
    }

    return location.pathname === href && location.hash.length === 0;
  };

  return (
    <>
      <header className="relative z-40 border-b border-[#dde5f4] bg-white shadow-[0_14px_34px_-30px_rgba(19,48,107,0.42)]">
        <div className={`${shellClassName} flex min-h-[84px] items-center justify-between gap-4 py-2 lg:min-h-[92px]`}>
          <Link to="/" aria-label="On Time Medical Group home" className="inline-flex shrink-0">
            <img
              src={logo}
              alt="On Time Medical Group"
              className="h-[62px] w-[62px] object-contain sm:h-[70px] sm:w-[70px] lg:h-[78px] lg:w-[78px]"
              width={78}
              height={78}
            />
          </Link>

          <nav className="hidden min-w-0 flex-1 items-center justify-center gap-6 lg:flex xl:gap-9">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={cn(
                  "border-b-2 border-transparent pb-1.5 text-[0.82rem] font-black uppercase tracking-[0.04em] text-[#13306b] transition-colors hover:text-[#ef2027] whitespace-nowrap xl:text-[0.86rem]",
                  isNavItemActive(item.label, item.href) && "border-[#ef2027] text-[#ef2027]",
                )}
                aria-current={isNavItemActive(item.label, item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden shrink-0 items-center gap-3 lg:flex">
            <Button
              variant="outline"
              className="h-11 rounded-md border-2 border-[#13306b]/16 bg-white px-5 text-[11.5px] font-black uppercase tracking-[0.04em] text-[#13306b] shadow-[0_18px_30px_-28px_rgba(19,48,107,0.35)]"
              asChild
            >
              <Link to="/patient-portal/login">
                <Lock className="mr-2 h-4 w-4" />
                Patient Portal Login
              </Link>
            </Button>
            <Button
              className="btn-mock-red h-11 rounded-md px-5 text-[11.5px] font-black uppercase tracking-[0.04em] shadow-[0_18px_30px_-22px_rgba(239,32,39,0.42)]"
              type="button"
              onClick={openAppointment}
            >
              <Calendar className="mr-2 h-4 w-4" />
              Book Appointment
            </Button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <a href="tel:+14107544343" className="inline-flex items-center gap-2 text-sm font-black text-[#13306b]">
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline">410-754-4343</span>
            </a>
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-md border-[#13306b]/15"
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
