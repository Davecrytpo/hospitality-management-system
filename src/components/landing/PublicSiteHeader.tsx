import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Calendar, Lock, Menu, Phone, X } from "lucide-react";

import logo from "@/assets/logo-ontime.png";
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
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-otmg-border bg-card/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-5 px-4 py-4 lg:px-6">
        <Link to="/" aria-label="On Time Medical Group home" className="inline-flex">
          <img src={logo} alt="On Time Medical Group" className="h-20 w-20 object-contain" width={80} height={80} />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={cn("nav-mock-link", location.pathname === item.href && "nav-mock-link-active")}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button variant="outline" className="btn-mock-outline h-12 px-5 text-[13px] uppercase" asChild>
            <Link to="/patient-portal/login">
              <Lock className="mr-2 h-4 w-4" />
              Patient Portal Login
            </Link>
          </Button>
          <Button className="btn-mock-red h-12 px-5 text-[13px] uppercase" asChild>
            <Link to="/services/smart-appointments">
              <Calendar className="mr-2 h-4 w-4" />
              Book Appointment
            </Link>
          </Button>
        </div>

        <Button variant="outline" size="icon" className="btn-mock-outline h-12 w-12 lg:hidden" onClick={() => setMobileOpen((open) => !open)}>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      <div className="mx-auto hidden max-w-[1240px] justify-end px-4 pb-3 lg:flex lg:px-6">
        <a href="tel:+14107544343" className="inline-flex items-center gap-3 text-xl font-extrabold text-otmg-navy">
          <Phone className="h-5 w-5" />
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
              <Button className="btn-mock-red h-12 text-[13px] uppercase" asChild>
                <Link to="/services/smart-appointments" onClick={() => setMobileOpen(false)}>Book Appointment</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
