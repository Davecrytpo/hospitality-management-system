import { Link } from "react-router-dom";
import { Calendar, Mail, MapPin, Phone } from "lucide-react";

import logo from "@/assets/logo-ontime.png";
import { Button } from "@/components/ui/button";

export function PublicSiteFooter() {
  return (
    <footer className="border-t border-otmg-border bg-card">
      <section className="mx-auto max-w-[1240px] px-4 py-8 lg:px-6">
        <div className="grid overflow-hidden rounded-md bg-otmg-navy text-primary-foreground lg:grid-cols-[1fr_0.9fr_1fr]">
          <div className="flex items-center gap-4 border-b border-primary-foreground/15 px-6 py-7 lg:border-b-0 lg:border-r">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-primary-foreground/35">
              <Calendar className="h-8 w-8" />
            </div>
            <div>
              <p className="text-2xl font-extrabold">Ready to Take the Next Step?</p>
              <p className="mt-2 text-sm leading-7 text-primary-foreground/85">We&apos;re here to help you live a healthier, happier life—on your time.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 border-b border-primary-foreground/15 px-6 py-7 lg:border-b-0 lg:border-r">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-primary-foreground/35">
              <Phone className="h-8 w-8" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.08em] text-primary-foreground/75">Call Us Today</p>
              <a href="tel:+14107544343" className="mt-1 block text-[2.15rem] font-extrabold leading-none">410-754-4343</a>
              <p className="mt-2 text-sm leading-7 text-primary-foreground/85">Our team is here to help you.</p>
            </div>
          </div>

          <div className="flex flex-col justify-center px-6 py-7">
            <Button className="btn-mock-red h-14 text-[14px] uppercase" asChild>
              <Link to="/services/smart-appointments">Book Appointment</Link>
            </Button>
            <p className="mt-4 text-sm leading-7 text-primary-foreground/85">Appointments available in-office or via telehealth.</p>
          </div>
        </div>
      </section>

      <div className="mx-auto flex max-w-[1240px] flex-col items-center justify-between gap-4 border-t border-otmg-border px-4 py-6 text-center text-sm text-otmg-blue-soft lg:flex-row lg:px-6 lg:text-left">
        <div className="flex items-center gap-3">
          <img src={logo} alt="On Time Medical Group" className="h-12 w-12 object-contain" width={48} height={48} />
          <div>
            <p className="font-bold text-otmg-navy">On Time Medical Group</p>
            <p>Compassionate care. Clear access. Reliable follow-through.</p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 lg:items-end">
          <p className="inline-flex items-center gap-2"><MapPin className="h-4 w-4" />1500 Wellness Avenue, Medical District</p>
          <div className="flex items-center gap-5">
            <a href="mailto:care@ontimemedical.com" className="inline-flex items-center gap-2 hover:text-brand-red"><Mail className="h-4 w-4" />care@ontimemedical.com</a>
            <a href="tel:+14107544343" className="hover:text-brand-red">410-754-4343</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
