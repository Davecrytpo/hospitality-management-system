import { Link } from "react-router-dom";
import { Calendar, HeartHandshake, Lock, Mail, MapPin, Phone, ShieldCheck, UserRound } from "lucide-react";

import logo from "@/assets/logo-ontime.png";
import { Button } from "@/components/ui/button";

const footerHighlights = [
  {
    title: "Same-Day Appointments Available",
    description: "Get the care you need, when you need it.",
    icon: Calendar,
  },
  {
    title: "Most Insurance Plans Accepted",
    description: "We accept most major insurance plans.",
    icon: ShieldCheck,
  },
  {
    title: "All-in-One Care",
    description: "Primary care, mental health, and substance use treatment under one roof.",
    icon: UserRound,
  },
  {
    title: "Convenient Locations",
    description: "Accessible care close to home.",
    icon: MapPin,
  },
  {
    title: "Compassionate Team",
    description: "A dedicated team here to support you.",
    icon: HeartHandshake,
  },
];

export function PublicSiteFooter() {
  const shellClassName = "mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8";

  return (
    <footer className="border-t border-[#dde5f4] bg-white">
      <section className={`${shellClassName} py-6 lg:py-8`}>
        <div className="rounded-[20px] border border-[#dde5f4] bg-[#f5f8ff]">
          <div className="grid md:grid-cols-2 xl:grid-cols-5">
            {footerHighlights.map((item, index) => (
              <div
                key={item.title}
                className={`flex items-start gap-4 px-6 py-6 ${
                  index < footerHighlights.length - 1 ? "border-b border-[#dde5f4] xl:border-b-0 xl:border-r" : ""
                }`}
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white text-[#13306b] shadow-[0_10px_26px_-20px_rgba(19,48,107,0.45)]">
                  <item.icon className="h-7 w-7" />
                </div>
                <div>
                  <p className="text-[0.95rem] font-black leading-snug text-[#13306b]">{item.title}</p>
                  <p className="mt-2 text-[0.84rem] leading-6 text-[#4f6796]">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 grid overflow-hidden rounded-[20px] bg-[#13306b] text-white lg:grid-cols-[1.14fr_1.02fr_0.94fr_0.9fr]">
          <div className="flex items-center gap-5 border-b border-white/10 px-7 py-8 lg:border-b-0 lg:border-r">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/25">
              <Calendar className="h-7 w-7" />
            </div>
            <div>
              <p className="text-[1.18rem] font-black leading-tight lg:whitespace-nowrap xl:text-[1.35rem]">Ready to Take the Next Step?</p>
              <p className="mt-2 text-sm leading-6 text-white/75">We&apos;re here to help you live a healthier, happier life.</p>
            </div>
          </div>

          <div className="flex items-center gap-5 border-b border-white/10 px-7 py-8 lg:border-b-0 lg:border-r">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/25">
              <Phone className="h-7 w-7" />
            </div>
            <div>
              <p className="whitespace-nowrap text-xs font-bold uppercase tracking-[0.14em] text-white/55">Call Us Today</p>
              <a href="tel:+14107544343" className="mt-1 block whitespace-nowrap text-[1.78rem] font-black leading-none tracking-tight xl:text-[1.95rem]">
                410-754-4343
              </a>
              <p className="mt-2 text-sm leading-6 text-white/75">Our team is here to help you.</p>
            </div>
          </div>

          <div className="flex flex-col justify-center border-b border-white/10 px-7 py-8 lg:border-b-0 lg:border-r">
            <Button className="btn-mock-red h-12 rounded-md text-[13px] uppercase" asChild>
              <Link to="/services/smart-appointments">Book Appointment Now</Link>
            </Button>
            <p className="mt-3 text-sm leading-6 text-white/75">Appointments available in-office or via telehealth.</p>
          </div>

          <div className="flex items-center gap-5 px-7 py-8">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/25">
              <Lock className="h-7 w-7" />
            </div>
            <div>
              <p className="text-[1.1rem] font-black leading-tight">Patient Portal Login</p>
              <p className="mt-2 text-sm leading-6 text-white/75">Access your health information, appointments, and more.</p>
              <Link to="/patient-portal/login" className="mt-3 inline-flex items-center text-sm font-black uppercase tracking-wide text-white">
                Login Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-[#dde5f4] bg-white">
        <div className={`${shellClassName} flex flex-col items-center justify-between gap-4 py-6 text-center text-sm text-[#4f6796] lg:flex-row lg:text-left`}>
          <div className="flex items-center gap-3">
            <img src={logo} alt="On Time Medical Group" className="h-12 w-12 object-contain" width={48} height={48} />
            <div>
              <p className="font-bold text-[#13306b]">On Time Medical Group</p>
              <p>Compassionate care. Clear access. Reliable follow-through.</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 lg:items-end">
            <p className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              1500 Wellness Avenue, Medical District
            </p>
            <div className="flex flex-wrap items-center justify-center gap-5 lg:justify-end">
              <a href="mailto:care@ontimemedical.com" className="inline-flex items-center gap-2 hover:text-[#ef2027]">
                <Mail className="h-4 w-4" />
                care@ontimemedical.com
              </a>
              <a href="tel:+14107544343" className="hover:text-[#ef2027]">
                410-754-4343
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
