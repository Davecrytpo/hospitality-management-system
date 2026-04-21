import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, ShieldCheck } from "lucide-react";

import { Logo } from "@/components/brand/Logo";
import { publicServices, publicSpecialties } from "@/data/publicSiteContent";

export function PublicSiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-14 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="space-y-5">
            <Logo size="md" />
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              A premium digital front door for a full hospital ecosystem — designed to guide patients clearly before, during, and after care.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <a href="tel:+1800668463" className="flex items-center gap-2 transition hover:text-foreground">
                <Phone className="h-3.5 w-3.5 text-accent" />
                +1 (800) ON-TIME
              </a>
              <a href="mailto:care@ontimemedical.com" className="flex items-center gap-2 transition hover:text-foreground">
                <Mail className="h-3.5 w-3.5 text-accent" />
                care@ontimemedical.com
              </a>
              <p className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-accent" />
                1500 Wellness Avenue, Medical District
              </p>
            </div>
          </div>

          <div>
            <p className="mb-4 font-display text-sm font-semibold text-foreground">Patient Access</p>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link to="/services/smart-appointments" className="transition hover:text-foreground">Book Appointment</Link></li>
              <li><Link to="/patient-register" className="transition hover:text-foreground">Register as Patient</Link></li>
              <li><Link to="/kiosk" className="transition hover:text-foreground">Self Check-in</Link></li>
              <li><Link to="/verify" className="transition hover:text-foreground">Verify Records</Link></li>
            </ul>
          </div>

          <div>
            <p className="mb-4 font-display text-sm font-semibold text-foreground">Services</p>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {publicServices.map((item) => (
                <li key={item.slug}>
                  <Link to={`/services/${item.slug}`} className="transition hover:text-foreground">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 font-display text-sm font-semibold text-foreground">Specialties</p>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {publicSpecialties.slice(0, 6).map((item) => (
                <li key={item.slug}>
                  <Link to={`/specialties/${item.slug}`} className="transition hover:text-foreground">
                    {item.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/specialties" className="transition hover:text-foreground">Browse all specialties</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} On Time Medical Group. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <ShieldCheck className="h-3.5 w-3.5 text-accent" />
            Privacy-minded patient access, secure verification, and guided care journeys.
          </p>
        </div>
      </div>
    </footer>
  );
}
