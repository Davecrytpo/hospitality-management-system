import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpenText,
  Brain,
  Calendar,
  Check,
  ChevronRight,
  FileText,
  HeartHandshake,
  Heart,
  HeartPulse,
  Lock,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Star,
  Stethoscope,
  UserRound,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import logo from "@/assets/logo-ontime.png";
import heroImage from "@/assets/mockup-hero-doctor-patient.jpg";
import buildingImage from "@/assets/mockup-building.jpg";
import resourcesImage from "@/assets/home-patient-resources.jpg";
import blogWellnessImage from "@/assets/mockup-blog-wellness.jpg";
import blogUrgentImage from "@/assets/home-blog-urgent-care.jpg";
import insuranceAetna from "@/assets/insurance-aetna.svg";
import insuranceUnited from "@/assets/insurance-unitedhealthcare.svg";
import insuranceCareFirst from "@/assets/insurance-carefirst.svg";
import insuranceCigna from "@/assets/insurance-cigna.svg";
import insuranceBcbs from "@/assets/insurance-bcbs.svg";
import insuranceMedicare from "@/assets/insurance-medicare.svg";
import { AppointmentRequestDialog } from "@/components/landing/AppointmentRequestDialog";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "#services" },
  { label: "About Us", href: "#about" },
  { label: "Patient Resources", href: "#resources" },
  { label: "Insurance", href: "#insurance" },
  { label: "Contact", href: "#contact" },
];

const trustHighlights = [
  { title: "Same-Day Appointments Available", icon: Calendar },
  { title: "Most Insurance Plans Accepted", icon: ShieldCheck },
  { title: "All-in-One Care Mind, Body, You.", icon: UserRound },
  { title: "Convenient Locations Near You", icon: MapPin },
  { title: "Compassionate Care, Every Step of the Way", icon: HeartHandshake },
];

const serviceCards = [
  {
    number: "1.",
    title: "Primary Care",
    description: "Personalized care for your everyday health needs.",
    icon: Stethoscope,
    accent: "blue",
  },
  {
    number: "2.",
    title: "Preventive Care",
    description: "Stay ahead of health issues with screenings, vaccinations & more.",
    icon: ShieldCheck,
    accent: "red",
  },
  {
    number: "3.",
    title: "Women's Health",
    description: "Compassionate care for every stage of a woman's life.",
    icon: Heart,
    accent: "red",
  },
  {
    number: "4.",
    title: "Chronic Disease Management",
    description: "Ongoing care to help you manage chronic conditions.",
    icon: HeartPulse,
    accent: "blue",
  },
  {
    number: "5.",
    title: "Mental Health Services (OMHC)",
    description: "Support for your mental wellness and emotional well-being.",
    icon: Brain,
    accent: "blue",
  },
  {
    number: "6.",
    title: "Substance Use Treatment",
    description: "Evidence-based treatment and recovery support.",
    icon: HeartHandshake,
    accent: "red",
  },
];

const whyChooseUs = [
  "Experienced providers you can trust",
  "Integrated services for whole-person wellness",
  "Telehealth options for your convenience",
  "Commitment to our community",
];

const stats = [
  { value: "10,000+", label: "Patients Served", icon: UserRound },
  { value: "Same-Day", label: "Appointments", icon: Calendar },
  { value: "Most Major", label: "Insurance Accepted", icon: ShieldCheck },
  { value: "Patient Focused", label: "Care", icon: HeartPulse },
];

const resourceLinks = ["New Patient Forms", "Patient Portal", "FAQs", "Health Tips"];

const insuranceLogos = [
  { name: "Aetna", src: insuranceAetna },
  { name: "United Healthcare", src: insuranceUnited },
  { name: "CareFirst", src: insuranceCareFirst },
  { name: "Cigna", src: insuranceCigna },
  { name: "Blue Cross Blue Shield", src: insuranceBcbs },
  { name: "Medicare", src: insuranceMedicare },
];

export default function PublicLandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  
  // Master Instruction: Max width 1200px – 1280px
  const shellClassName = "mx-auto w-full max-w-[1280px] px-5 sm:px-8";

  const heroTitle = useMemo(
    () => (
      <>
        <span className="block">COMPREHENSIVE</span>
        <span className="block">HEALTHCARE THAT&apos;S</span>
        <span className="block">
          <span className="text-[#ef2027]">ON TIME.</span> EVERY TIME.
        </span>
      </>
    ),
    [],
  );

  return (
    <div className="min-h-screen bg-white text-[#13306b] overflow-y-auto overflow-x-hidden">
      <header className="sticky top-0 z-50 border-b border-[#dde5f4] bg-white shadow-sm">
        <div className={`${shellClassName} flex items-center justify-between h-[70px]`}>
          <Link to="/" className="inline-flex shrink-0 items-center" aria-label="On Time Medical Group home">
            <img src={logo} alt="On Time Medical Group" className="h-[48px] w-auto object-contain" />
          </Link>

          <nav className="hidden min-w-0 flex-1 items-center justify-center gap-6 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={cn(
                  "text-[0.75rem] font-bold tracking-tight text-[#13306b] uppercase transition-colors hover:text-[#ef2027] whitespace-nowrap",
                  item.label === "Home" && "text-[#ef2027] border-b-2 border-[#ef2027]"
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden shrink-0 items-center gap-4 lg:flex">
            <Button variant="outline" className="h-10 px-5 text-[11px] font-bold uppercase border-2 border-[#13306b]/20" asChild>
              <Link to="/patient-portal/login">
                Portal Login
              </Link>
            </Button>
            <Button className="btn-mock-red h-10 px-5 text-[11px] font-bold uppercase shadow-sm shadow-[#ef2027]/15" onClick={() => setAppointmentOpen(true)}>
              Book Appointment
            </Button>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 lg:hidden"
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full border-t border-[#dde5f4] bg-white lg:hidden">
            <div className={`${shellClassName} flex flex-col gap-3 py-6`}>
              {navItems.map((item) => (
                <a key={item.label} href={item.href} onClick={() => setMobileMenuOpen(false)} className="mobile-mock-link">
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="bg-white">
        {/* Hero Section */}
        <section className="relative flex items-center min-h-[calc(100vh-70px)] py-[60px]">
          <div className={`${shellClassName} w-full`}>
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="flex flex-col justify-center">
                <div className="max-w-[550px]">
                  <h1 className="hero-mock-title text-[2.6rem] font-black uppercase leading-[1.05] tracking-tight text-[#13306b] sm:text-[3.4rem] lg:text-[4.2rem]">
                    {heroTitle}
                  </h1>
                  <p className="mt-8 text-[1.1rem] leading-[1.8] text-[#5f6b7a]">
                    On Time Medical Group provides comprehensive primary care, mental health, and substance use treatment
                    with compassion, convenience, and a commitment to your well-being.
                  </p>

                  <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                    <Button className="btn-mock-red h-16 min-w-[240px] px-8 text-[14px] font-bold uppercase shadow-lg shadow-[#ef2027]/20" onClick={() => setAppointmentOpen(true)}>
                      <span className="inline-flex items-center">
                        Book Appointment
                        <ArrowRight className="ml-3 h-5 w-5" />
                      </span>
                    </Button>
                    <Button variant="outline" className="h-16 min-w-[240px] px-8 text-[14px] font-bold uppercase border-2 border-[#13306b]/15 bg-white" asChild>
                      <a href="tel:+14107544343" className="flex items-center justify-center">
                        <Phone className="mr-3 h-5 w-5 text-[#13306b]" />
                        <div className="flex flex-col items-start leading-tight">
                          <span className="text-[9px] tracking-widest text-[#4f6796]">CALL US</span>
                          <span className="text-[1.35rem] font-black tracking-tighter text-[#13306b]">410-754-4343</span>
                        </div>
                      </a>
                    </Button>
                  </div>

                  <div className="mt-10 flex items-start gap-4 rounded-2xl border border-[#dce6f5] bg-[#f4f8ff] p-5 max-w-[480px]">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-[#13306b] shadow-sm">
                      <BookOpenText className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-[1rem] font-black text-[#13306b]">Telehealth available for eligible services.</p>
                      <p className="mt-1 text-sm leading-6 text-[#4f6796]">Connect with your care team from the comfort of your home.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative flex justify-center lg:justify-end">
                <img
                  src={heroImage}
                  alt="Doctor discussing care plan with a patient"
                  className="w-full h-auto max-h-[600px] object-contain rounded-[32px] shadow-sm"
                  loading="eager"
                />
              </div>
            </div>

            <div className="relative z-10 mt-16 rounded-[24px] bg-[#13306b] px-4 py-2 text-white shadow-mock">
              <div className="grid sm:grid-cols-2 lg:grid-cols-5">
                {trustHighlights.map((item, index) => (
                  <div
                    key={item.title}
                    className={`flex items-center gap-4 px-6 py-8 ${
                      index < trustHighlights.length - 1 ? "border-b border-white/10 lg:border-b-0 lg:border-r" : ""
                    }`}
                  >
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-white/30 bg-white/5">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <p className="text-[0.9rem] font-bold leading-snug text-white">{item.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className={`${shellClassName} py-[60px]`}>
          <div className="text-center">
            <h2 className="hero-mock-title text-[2.6rem] font-black uppercase leading-none tracking-tight text-[#13306b] sm:text-[3rem]">
              Our Services
            </h2>
            <div className="mx-auto mt-4 h-[4px] w-16 rounded-full bg-[#ef2027]" />
            <p className="mt-6 text-[1.1rem] font-medium text-[#4f6796]">Comprehensive care for you and your family—at every stage of life.</p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-6">
            {serviceCards.map((service) => (
              <article
                key={service.title}
                className="flex flex-col rounded-[20px] border border-[#dbe4f4] bg-white px-6 py-10 text-center shadow-sm hover:shadow-mock transition-all"
              >
                <div
                  className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full ${
                    service.accent === "red" ? "bg-[#fff2f2] text-[#ef2027]" : "bg-[#edf3ff] text-[#13306b]"
                  }`}
                >
                  <service.icon className="h-10 w-10" strokeWidth={1.8} />
                </div>
                <h3 className="mt-8 text-[1.1rem] font-black leading-tight text-[#13306b]">
                  {service.number} {service.title}
                </h3>
                <p className="mt-4 text-[0.88rem] leading-6 text-[#4f6796]">{service.description}</p>
                <Link to="/services" className="mt-auto inline-flex items-center justify-center gap-2 pt-8 text-[0.8rem] font-black uppercase text-[#ef2027]">
                  Learn More
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Button className="btn-mock-navy h-14 px-10 text-[14px] font-bold uppercase shadow-lg shadow-[#13306b]/20" asChild>
              <Link to="/services">View All Services</Link>
            </Button>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section id="about" className={`${shellClassName} py-[60px]`}>
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div className="overflow-hidden rounded-[24px] shadow-sm">
              <img src={buildingImage} alt="On Time Medical Group building exterior" className="w-full h-auto object-contain" loading="lazy" />
            </div>

            <div className="relative">
              <p className="text-sm font-bold uppercase tracking-[0.1em] text-[#ef2027]">About On Time Medical Group</p>
              <h2 className="mt-4 hero-mock-title text-[3rem] font-black leading-none tracking-tight text-[#13306b] lg:text-[3.8rem]">
                Why Choose Us?
              </h2>
              <p className="mt-6 text-[1.1rem] leading-[1.8] text-[#4f6796]">
                We&apos;re more than a healthcare provider, we&apos;re your partner in health. Our patient-centered approach ensures you get
                the right care, at the right time, every time.
              </p>

              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                {whyChooseUs.map((item) => (
                  <div key={item} className="flex items-start gap-4">
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#13306b] text-white">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    <span className="text-[1rem] font-bold leading-snug text-[#13306b]">{item}</span>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="mt-10 h-14 px-8 text-[14px] font-bold uppercase border-2 shadow-sm" asChild>
                <Link to="/services">Learn More About Us</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="bg-[#f0f5ff] py-[40px]">
          <div className={`${shellClassName}`}>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((item) => (
                <div key={item.label} className="flex items-center gap-5 justify-center lg:justify-start">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-[#c7d4eb] bg-white text-[#13306b]">
                    <item.icon className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="text-[2.2rem] font-black leading-none tracking-tight text-[#13306b]">{item.value}</p>
                    <p className="mt-1 text-[1rem] font-bold text-[#4f6796]">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom Columns */}
        <section id="resources" className={`${shellClassName} py-[60px]`}>
          <div className="grid gap-8 lg:grid-cols-3">
            <article className="rounded-[16px] border border-[#dbe4f4] bg-white p-8 shadow-sm">
              <div className="flex items-center gap-3 text-[#13306b]">
                <BookOpenText className="h-6 w-6" />
                <h3 className="hero-mock-title text-[1.8rem] font-black uppercase leading-none">Patient Resources</h3>
              </div>
              <p className="mt-4 text-[0.95rem] leading-7 text-[#4f6796]">Everything you need to manage your care, all in one place.</p>
              <div className="mt-8 space-y-4">
                {resourceLinks.map((item) => (
                  <Link
                    key={item}
                    to={item === "Patient Portal" ? "/patient-portal/login" : "/patient-register"}
                    className="flex items-center gap-3 text-[0.95rem] font-bold text-[#13306b] hover:text-[#ef2027] transition-colors"
                  >
                    <ChevronRight className="h-4 w-4 text-[#ef2027]" />
                    {item}
                  </Link>
                ))}
              </div>
              <div className="mt-10">
                <img src={resourcesImage} alt="Patient using a phone" className="w-full h-40 object-contain rounded-2xl" loading="lazy" />
              </div>
            </article>

            <article className="rounded-[16px] border border-[#dbe4f4] bg-white p-8 shadow-sm">
              <div className="flex items-center gap-3 text-[#13306b]">
                <FileText className="h-6 w-6" />
                <h3 className="hero-mock-title text-[1.8rem] font-black uppercase leading-none">Latest From Our Blog</h3>
              </div>

              <div className="mt-8 space-y-8">
                <div className="grid grid-cols-[80px_1fr] gap-6">
                  <img src={blogWellnessImage} alt="Wellness article" className="h-20 w-full rounded-xl object-contain" loading="lazy" />
                  <div>
                    <p className="text-[1rem] font-bold leading-tight text-[#13306b]">5 Tips for Maintaining Your Mental Wellness</p>
                    <Link to="/services" className="mt-3 inline-flex items-center gap-2 text-[0.8rem] font-black uppercase text-[#ef2027]">
                      Read More
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>

                <div className="grid grid-cols-[80px_1fr] gap-6">
                  <img src={blogUrgentImage} alt="Urgent care article" className="h-20 w-full rounded-xl object-contain" loading="lazy" />
                  <div>
                    <p className="text-[1rem] font-bold leading-tight text-[#13306b]">When to Visit Urgent Care vs. Your PCP</p>
                    <Link to="/services" className="mt-3 inline-flex items-center gap-2 text-[0.8rem] font-black uppercase text-[#ef2027]">
                      Read More
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </article>

            <article className="rounded-[16px] border border-[#dbe4f4] bg-white p-8 shadow-sm">
              <div className="flex items-center gap-3 text-[#13306b]">
                <Star className="h-6 w-6 fill-current text-[#f7b500]" />
                <h3 className="hero-mock-title text-[1.8rem] font-black uppercase leading-none">What Our Patients Say</h3>
              </div>
              <p className="mt-8 text-[1.1rem] leading-[1.8] text-[#4f6796] italic">&quot;The staff is so kind and professional. I always feel heard and cared for.&quot;</p>
              <div className="mt-8 flex items-center gap-1 text-[#f7b500]">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-5 w-5 fill-current" />
                ))}
                <span className="ml-3 text-[1rem] font-bold text-[#13306b]">Jessica M.</span>
              </div>
              <div className="mt-12 flex flex-col gap-4">
                <p className="text-xs font-bold uppercase tracking-widest text-[#4f6796]">View More Reviews on</p>
                <div className="flex items-center gap-2 text-[2.2rem] font-black">
                  <span className="text-[#4285F4]">G</span>
                  <span className="text-[#DB4437]">o</span>
                  <span className="text-[#F4B400]">o</span>
                  <span className="text-[#4285F4]">g</span>
                  <span className="text-[#0F9D58]">l</span>
                  <span className="text-[#DB4437]">e</span>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* Insurance Section */}
        <section id="insurance" className="py-[60px] border-t border-[#dde5f4]">
          <div className={`${shellClassName}`}>
            <h3 className="hero-mock-title text-center text-[1.8rem] font-black uppercase leading-none text-[#13306b]">
              We Accept Most Major Insurance Plans
            </h3>
            <div className="mt-12 grid grid-cols-2 items-center gap-x-12 gap-y-12 md:grid-cols-3 xl:grid-cols-6">
              {insuranceLogos.map((insurance) => (
                <div key={insurance.name} className="flex min-h-[44px] items-center justify-center">
                  <img src={insurance.src} alt={`${insurance.name} logo`} className="h-10 w-auto max-w-full object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section id="contact" className={`${shellClassName} pb-[60px] pt-4`}>
          <div className="grid overflow-hidden rounded-[24px] bg-[#13306b] text-white lg:grid-cols-3">
            <div className="flex items-center gap-6 border-b border-white/10 px-10 py-12 lg:border-b-0 lg:border-r">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-white/20">
                <Calendar className="h-8 w-8" />
              </div>
              <div>
                <p className="text-[1.5rem] font-black leading-tight">Ready to Take the Next Step?</p>
                <p className="mt-2 text-sm text-white/70">We&apos;re here to help you live a healthier, happier life on your time.</p>
              </div>
            </div>

            <div className="flex items-center gap-6 border-b border-white/10 px-10 py-12 lg:border-b-0 lg:border-r">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-white/20">
                <Phone className="h-8 w-8" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-white/50">Call Us Today</p>
                <a href="tel:+14107544343" className="mt-1 block text-[2.2rem] font-black leading-none tracking-tight">
                  410-754-4343
                </a>
              </div>
            </div>

            <div className="flex flex-col justify-center px-10 py-12">
              <Button className="btn-mock-red h-14 text-[14px] uppercase" onClick={() => setAppointmentOpen(true)}>
                Book Appointment
              </Button>
              <p className="mt-4 text-xs text-white/50">Appointments available in-office or via telehealth.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#d9e1f2] bg-white py-8">
        <div className={`${shellClassName} flex flex-col items-center justify-between gap-6 lg:flex-row`}>
          <div className="flex items-center gap-4">
            <img src={logo} alt="On Time Medical Group" className="h-10 w-10 object-contain" />
            <div className="text-sm text-[#4f6796]">
              <p className="font-bold text-[#13306b]">On Time Medical Group</p>
              <p>Compassionate care. Clear access. Reliable follow-through.</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 lg:items-end text-sm text-[#4f6796]">
            <p>1500 Wellness Avenue, Medical District</p>
            <div className="flex items-center gap-6">
              <a href="mailto:care@ontimemedical.com" className="hover:text-[#ef2027]">care@ontimemedical.com</a>
              <a href="tel:+14107544343" className="hover:text-[#ef2027]">410-754-4343</a>
            </div>
          </div>
        </div>
      </footer>

      <AppointmentRequestDialog open={appointmentOpen} onOpenChange={setAppointmentOpen} />
    </div>
  );
}

