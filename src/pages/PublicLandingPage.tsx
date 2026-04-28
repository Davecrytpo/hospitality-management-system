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
import heroImage from "@/assets/home-hero-doctor-patient.jpg";
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
  const shellClassName = "mx-auto w-full max-w-[1240px] px-4 sm:px-6";

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
    <div className="min-h-screen bg-white text-[#13306b]">
      <header className="sticky top-0 z-50 border-b border-[#dde5f4] bg-white/95 backdrop-blur">
        <div className={`${shellClassName} flex items-center justify-between gap-6 py-4`}>
          <Link to="/" className="inline-flex shrink-0 items-center" aria-label="On Time Medical Group home">
            <img src={logo} alt="On Time Medical Group" className="h-[72px] w-[72px] object-contain sm:h-[88px] sm:w-[88px]" />
          </Link>

          <nav className="hidden min-w-0 flex-1 items-center justify-center gap-7 lg:flex xl:gap-10">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`nav-mock-link whitespace-nowrap ${item.label === "Home" ? "nav-mock-link-active" : ""}`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden shrink-0 items-center gap-3 lg:flex">
            <Button variant="outline" className="btn-mock-outline h-12 px-5 text-[12px] uppercase" asChild>
              <Link to="/patient-portal/login">
                <Lock className="mr-2 h-4 w-4" />
                Patient Portal Login
              </Link>
            </Button>
            <Button className="btn-mock-red h-12 px-5 text-[12px] uppercase" asChild>
              <Link to="/services/smart-appointments">
                <Calendar className="mr-2 h-4 w-4" />
                Book Appointment
              </Link>
            </Button>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="btn-mock-outline h-12 w-12 lg:hidden"
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        <div className={`${shellClassName} hidden justify-end pb-4 lg:flex`}>
          <a href="tel:+14107544343" className="inline-flex items-center gap-3 text-[2rem] font-black tracking-[-0.03em] text-[#13306b]">
            <Phone className="h-5 w-5" />
            410-754-4343
          </a>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-[#dde5f4] bg-white lg:hidden">
            <div className={`${shellClassName} flex flex-col gap-3 py-4`}>
              {navItems.map((item) => (
                <a key={item.label} href={item.href} onClick={() => setMobileMenuOpen(false)} className="mobile-mock-link">
                  {item.label}
                </a>
              ))}
              <div className="grid gap-3 pt-2 sm:grid-cols-2">
                <Button variant="outline" className="btn-mock-outline h-12 text-[13px] uppercase" asChild>
                  <Link to="/patient-portal/login" onClick={() => setMobileMenuOpen(false)}>
                    Patient Portal Login
                  </Link>
                </Button>
                <Button className="btn-mock-red h-12 text-[13px] uppercase" asChild>
                  <Link to="/services/smart-appointments" onClick={() => setMobileMenuOpen(false)}>
                    Book Appointment
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="overflow-hidden bg-white">
        <section className="border-b border-[#edf2fb]">
          <div className={`${shellClassName} pt-4 sm:pt-6 lg:pt-2`}>
            <div className="grid items-stretch gap-0 lg:grid-cols-[1.03fr_1.22fr]">
              <div className="flex flex-col justify-center py-10 lg:py-16 xl:py-20">
                <div className="max-w-[560px]">
                  <h1 className="hero-mock-title text-[3.65rem] font-black leading-[0.92] tracking-[-0.05em] text-[#113178] sm:text-[4.6rem] lg:max-w-[640px] lg:text-[5.45rem] xl:text-[6.05rem]">
                    {heroTitle}
                  </h1>
                  <p className="mt-6 max-w-[520px] text-[1.05rem] leading-8 text-[#3f588c]">
                    On Time Medical Group provides comprehensive primary care, mental health, and substance use treatment
                    with compassion, convenience, and a commitment to your well-being.
                  </p>

                  <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                    <Button className="btn-mock-red h-14 min-w-[232px] px-7 text-[13px] uppercase" asChild>
                      <Link to="/services/smart-appointments">
                        Book Appointment
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" className="btn-mock-outline h-14 min-w-[232px] px-7 text-[13px] uppercase" asChild>
                      <a href="tel:+14107544343">
                        <Phone className="mr-2 h-4 w-4" />
                        Call Us
                        <span className="ml-2 text-[1.35rem] font-black normal-case tracking-[-0.03em]">410-754-4343</span>
                      </a>
                    </Button>
                  </div>

                  <div className="mt-6 flex items-start gap-4 rounded-2xl border border-[#dce6f5] bg-white p-4 shadow-[0_16px_40px_-36px_rgba(19,48,107,0.5)]">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f1f5fd] text-[#13306b]">
                      <BookOpenText className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-[1.05rem] font-extrabold text-[#13306b]">Telehealth available for eligible services.</p>
                      <p className="mt-1 text-sm leading-6 text-[#4f6796]">Connect with your care team from the comfort of your home.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative flex items-end justify-end lg:-mr-8 xl:-mr-12">
                <div className="relative w-full overflow-hidden rounded-[22px] bg-[#f5f7fc] lg:rounded-b-none lg:rounded-tl-[22px]">
                  <img
                    src={heroImage}
                    alt="Doctor discussing care plan with a patient"
                    className="h-full min-h-[360px] w-full object-cover object-center"
                    loading="eager"
                  />
                </div>
              </div>
            </div>

            <div className="relative z-10 -mt-1 rounded-[22px] bg-[#13306b] text-white shadow-[0_30px_56px_-32px_rgba(19,48,107,0.68)]">
              <div className="grid sm:grid-cols-2 lg:grid-cols-5">
                {trustHighlights.map((item, index) => (
                  <div
                    key={item.title}
                    className={`flex items-center gap-4 px-5 py-5 ${
                      index < trustHighlights.length - 1 ? "border-b border-white/15 lg:border-b-0 lg:border-r" : ""
                    }`}
                  >
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/45">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <p className="text-[1rem] font-semibold leading-7 text-white">{item.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="services" className={`${shellClassName} py-10 lg:py-12`}>
          <div className="text-center">
            <h2 className="hero-mock-title text-[2.7rem] font-black uppercase leading-none tracking-[-0.04em] text-[#13306b] sm:text-[3rem]">
              Our Services
            </h2>
            <div className="mx-auto mt-2 h-[4px] w-14 rounded-full bg-[#ef2027]" />
            <p className="mt-3 text-[1.12rem] text-[#4f6796]">Comprehensive care for you and your family at every stage of life.</p>
          </div>

          <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-6">
            {serviceCards.map((service) => (
              <article
                key={service.title}
                className="flex min-h-[290px] flex-col rounded-[18px] border border-[#dbe4f4] bg-white px-6 py-7 text-center shadow-[0_18px_35px_-32px_rgba(19,48,107,0.55)]"
              >
                <div
                  className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full ${
                    service.accent === "red" ? "bg-[#fff2f2] text-[#ef2027]" : "bg-[#edf3ff] text-[#13306b]"
                  }`}
                >
                  <service.icon className="h-10 w-10" strokeWidth={1.7} />
                </div>
                <h3 className="mt-6 text-[1.1rem] font-extrabold leading-7 text-[#13306b]">
                  {service.number} {service.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[#4f6796]">{service.description}</p>
                <Link to="/services" className="mt-auto inline-flex items-center justify-center gap-2 pt-8 text-sm font-extrabold text-[#ef2027]">
                  Learn More
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Button className="btn-mock-navy h-12 px-10 text-[13px] uppercase" asChild>
              <Link to="/services">View All Services</Link>
            </Button>
          </div>
        </section>

        <section id="about" className={`${shellClassName} py-2 lg:py-4`}>
          <div className="grid gap-7 lg:grid-cols-[1.02fr_1fr] lg:items-center">
            <div className="overflow-hidden rounded-[18px]">
              <img src={buildingImage} alt="On Time Medical Group building exterior" className="h-full w-full object-cover" loading="lazy" />
            </div>

            <div className="relative overflow-hidden rounded-[18px] bg-white px-2 py-4 lg:py-5">
              <div className="absolute bottom-[-3.5rem] right-[-2rem] hidden h-[260px] w-[260px] rounded-full border-[16px] border-[#eef3fc] xl:block" />
              <div className="absolute bottom-[5.8rem] right-[4.7rem] hidden h-[88px] w-[88px] rounded-full border-[9px] border-[#f3f7fd] xl:block" />
              <div className="absolute bottom-[4.5rem] right-[6.55rem] hidden h-[115px] w-[3px] rounded-full bg-[#eef3fc] xl:block" />
              <div className="absolute bottom-[9.65rem] right-[5.1rem] hidden h-[3px] w-[32px] rounded-full bg-[#eef3fc] xl:block" />

              <p className="text-sm font-bold uppercase tracking-[0.06em] text-[#ef2027]">About On Time Medical Group</p>
              <h2 className="mt-3 hero-mock-title text-[3.1rem] font-black leading-none tracking-[-0.04em] text-[#13306b]">
                Why Choose Us?
              </h2>
              <p className="mt-5 max-w-[580px] text-base leading-8 text-[#4f6796]">
                We&apos;re more than a healthcare provider, we&apos;re your partner in health. Our patient-centered approach ensures you get
                the right care, at the right time, every time.
              </p>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                {whyChooseUs.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#13306b] text-white">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-sm font-semibold leading-6 text-[#13306b]">{item}</span>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="btn-mock-outline mt-8 h-12 px-7 text-[13px] uppercase" asChild>
                <Link to="/specialties">Learn More About Us</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className={`${shellClassName} py-6`}>
          <div className="grid gap-4 rounded-[18px] bg-[#edf4ff] px-6 py-6 lg:grid-cols-4">
            {stats.map((item, index) => (
              <div key={item.label} className={`flex items-center gap-4 ${index < stats.length - 1 ? "lg:border-r lg:border-[#d4dff3]" : ""}`}>
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-[#c7d4eb] bg-white text-[#13306b]">
                  <item.icon className="h-8 w-8" />
                </div>
                <div>
                  <p className="text-[2rem] font-black leading-none tracking-[-0.04em] text-[#13306b]">{item.value}</p>
                  <p className="mt-1 text-lg font-semibold text-[#27457b]">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="resources" className={`${shellClassName} py-2`}>
          <div className="grid gap-5 lg:grid-cols-3">
            <article className="rounded-[16px] border border-[#dbe4f4] bg-white p-6 shadow-[0_18px_35px_-32px_rgba(19,48,107,0.55)]">
              <div className="flex items-center gap-3 text-[#13306b]">
                <BookOpenText className="h-5 w-5" />
                <h3 className="hero-mock-title text-[2rem] font-black uppercase leading-none tracking-[-0.04em]">Patient Resources</h3>
              </div>
              <p className="mt-4 max-w-[320px] text-sm leading-7 text-[#4f6796]">Everything you need to manage your care, all in one place.</p>
              <div className="mt-5 grid gap-5 md:grid-cols-[1fr_150px] md:items-end">
                <div className="space-y-2">
                  {resourceLinks.map((item) => (
                    <Link
                      key={item}
                      to={item === "Patient Portal" ? "/patient-portal/login" : "/patient-register"}
                      className="flex items-center gap-2 text-sm font-semibold text-[#13306b] hover:text-[#ef2027]"
                    >
                      <ChevronRight className="h-4 w-4" />
                      {item}
                    </Link>
                  ))}
                </div>
                <img src={resourcesImage} alt="Patient using a phone" className="mx-auto h-40 w-full rounded-2xl object-cover" loading="lazy" />
              </div>
              <Link to="/patient-register" className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-[#ef2027]">
                Explore Resources
                <ArrowRight className="h-4 w-4" />
              </Link>
            </article>

            <article className="rounded-[16px] border border-[#dbe4f4] bg-white p-6 shadow-[0_18px_35px_-32px_rgba(19,48,107,0.55)]">
              <div className="flex items-center gap-3 text-[#13306b]">
                <FileText className="h-5 w-5" />
                <h3 className="hero-mock-title text-[2rem] font-black uppercase leading-none tracking-[-0.04em]">Latest From Our Blog</h3>
              </div>

              <div className="mt-5 space-y-4">
                <div className="grid grid-cols-[92px_1fr] gap-4">
                  <img src={blogWellnessImage} alt="Wellness article" className="h-20 w-full rounded-xl object-cover" loading="lazy" />
                  <div>
                    <p className="text-[1.04rem] font-extrabold leading-6 text-[#13306b]">5 Tips for Maintaining Your Mental Wellness</p>
                    <Link to="/services" className="mt-2 inline-flex items-center gap-2 text-sm font-extrabold text-[#ef2027]">
                      Read More
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>

                <div className="grid grid-cols-[92px_1fr] gap-4">
                  <img src={blogUrgentImage} alt="Urgent care article" className="h-20 w-full rounded-xl object-cover" loading="lazy" />
                  <div>
                    <p className="text-[1.04rem] font-extrabold leading-6 text-[#13306b]">When to Visit Urgent Care vs. Your PCP</p>
                    <Link to="/services" className="mt-2 inline-flex items-center gap-2 text-sm font-extrabold text-[#ef2027]">
                      Read More
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </article>

            <article className="rounded-[16px] border border-[#dbe4f4] bg-white p-6 shadow-[0_18px_35px_-32px_rgba(19,48,107,0.55)]">
              <div className="flex items-center gap-3 text-[#13306b]">
                <Star className="h-5 w-5 fill-current" />
                <h3 className="hero-mock-title text-[2rem] font-black uppercase leading-none tracking-[-0.04em]">What Our Patients Say</h3>
              </div>
              <p className="mt-6 text-base leading-8 text-[#3f598f]">&quot;The staff is so kind and professional. I always feel heard and cared for.&quot;</p>
              <div className="mt-5 flex items-center gap-1 text-[#f7b500]">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-5 w-5 fill-current" />
                ))}
                <span className="ml-3 text-sm font-semibold text-[#13306b]">Jessica M.</span>
              </div>
              <a href="https://www.google.com" target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 text-base font-bold text-[#13306b]">
                View More Reviews on
                <span className="text-[#4285F4]">G</span>
                <span className="text-[#DB4437]">o</span>
                <span className="text-[#F4B400]">o</span>
                <span className="text-[#4285F4]">g</span>
                <span className="text-[#0F9D58]">l</span>
                <span className="text-[#DB4437]">e</span>
              </a>
            </article>
          </div>
        </section>

        <section id="insurance" className={`${shellClassName} py-6`}>
          <div className="rounded-[18px] border border-[#dbe4f4] bg-white px-5 py-8 shadow-[0_18px_35px_-32px_rgba(19,48,107,0.55)] sm:px-8">
            <h3 className="hero-mock-title text-center text-[2rem] font-black uppercase leading-none tracking-[-0.04em] text-[#13306b]">
              We Accept Most Major Insurance Plans
            </h3>
            <div className="mt-8 grid grid-cols-2 items-center gap-x-8 gap-y-8 md:grid-cols-3 xl:grid-cols-6">
              {insuranceLogos.map((insurance) => (
                <div key={insurance.name} className="flex min-h-[44px] items-center justify-center">
                  <img src={insurance.src} alt={`${insurance.name} logo`} className="h-10 w-auto max-w-full object-contain" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className={`${shellClassName} pb-10 pt-2`}>
          <div className="grid overflow-hidden rounded-[18px] bg-[#13306b] text-white lg:grid-cols-[1fr_0.9fr_1fr]">
            <div className="flex items-center gap-4 border-b border-white/15 px-6 py-7 lg:border-b-0 lg:border-r">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-white/35">
                <Calendar className="h-8 w-8" />
              </div>
              <div>
                <p className="text-2xl font-extrabold">Ready to Take the Next Step?</p>
                <p className="mt-2 text-sm leading-7 text-white/85">We&apos;re here to help you live a healthier, happier life on your time.</p>
              </div>
            </div>

            <div className="flex items-center gap-4 border-b border-white/15 px-6 py-7 lg:border-b-0 lg:border-r">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-white/35">
                <Phone className="h-8 w-8" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.08em] text-white/75">Call Us Today</p>
                <a href="tel:+14107544343" className="mt-1 block text-[2.3rem] font-black leading-none tracking-[-0.04em]">
                  410-754-4343
                </a>
                <p className="mt-2 text-sm leading-7 text-white/85">Our team is here to help you.</p>
              </div>
            </div>

            <div className="flex flex-col justify-center px-6 py-7">
              <Button className="btn-mock-red h-14 text-[14px] uppercase" asChild>
                <Link to="/services/smart-appointments">
                  Book Appointment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <p className="mt-4 text-sm leading-7 text-white/85">Appointments available in-office or via telehealth.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#d9e1f2] bg-white">
        <div className={`${shellClassName} flex flex-col items-center justify-between gap-4 py-6 text-center text-sm text-[#4f6796] lg:flex-row lg:text-left`}>
          <div className="flex items-center gap-3">
            <img src={logo} alt="On Time Medical Group" className="h-12 w-12 object-contain" />
            <div>
              <p className="font-bold text-[#13306b]">On Time Medical Group</p>
              <p>Compassionate care. Clear access. Reliable follow-through.</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 lg:items-end">
            <p>1500 Wellness Avenue, Medical District</p>
            <div className="flex items-center gap-5">
              <a href="mailto:care@ontimemedical.com" className="hover:text-[#ef2027]">
                care@ontimemedical.com
              </a>
              <a href="tel:+14107544343" className="hover:text-[#ef2027]">
                410-754-4343
              </a>
            </div>
          </div>
        </div>
      </footer>

      <section className="fixed bottom-4 left-1/2 z-40 w-[calc(100%-1.5rem)] max-w-[420px] -translate-x-1/2 rounded-2xl border border-[#13306b]/10 bg-white/96 p-3 shadow-[0_18px_40px_-22px_rgba(19,48,107,0.5)] backdrop-blur lg:hidden">
        <div className="flex items-center gap-3">
          <Button className="btn-mock-red h-12 flex-1 rounded-xl text-[13px] uppercase" asChild>
            <Link to="/services/smart-appointments">Book Appointment</Link>
          </Button>
          <Button variant="outline" className="btn-mock-outline h-12 rounded-xl px-4" asChild>
            <a href="tel:+14107544343">
              <Phone className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
