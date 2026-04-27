import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpenText,
  Brain,
  Calendar,
  Check,
  ChevronRight,
  FileText,
  HeartHandshake,
  HeartPulse,
  HousePlus,
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
import heroImage from "@/assets/public-hero-real-hospital.jpg";
import campusImage from "@/assets/hospital-exterior.jpg";
import portraitImage from "@/assets/doctor-portrait.jpg";
import blogWellnessImage from "@/assets/service-pharmacy-support.jpg";
import blogUrgentCareImage from "@/assets/service-smart-appointments-v2.jpg";
import logo from "@/assets/logo-ontime.png";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "#services" },
  { label: "About Us", href: "#about" },
  { label: "Patient Resources", href: "#resources" },
  { label: "Insurance", href: "#insurance" },
  { label: "Contact", href: "#contact" },
];

const trustHighlights = [
  {
    title: "Same-Day Appointments Available",
    icon: Calendar,
  },
  {
    title: "Most Insurance Plans Accepted",
    icon: ShieldCheck,
  },
  {
    title: "All-in-One Care Mind, Body, You.",
    icon: UserRound,
  },
  {
    title: "Convenient Locations Near You",
    icon: MapPin,
  },
  {
    title: "Compassionate Care, Every Step of the Way",
    icon: HeartHandshake,
  },
];

const serviceCards = [
  {
    number: "1.",
    title: "Primary Care",
    description: "Personalized care for your everyday health needs.",
    icon: Stethoscope,
  },
  {
    number: "2.",
    title: "Preventive Care",
    description: "Stay ahead of health issues with screenings, vaccinations, and more.",
    icon: ShieldCheck,
  },
  {
    number: "3.",
    title: "Women's Health",
    description: "Compassionate care for every stage of a woman's life.",
    icon: HeartPulse,
  },
  {
    number: "4.",
    title: "Chronic Disease Management",
    description: "Ongoing care to help you manage chronic conditions.",
    icon: HeartPulse,
  },
  {
    number: "5.",
    title: "Mental Health Services (OMHC)",
    description: "Support for your mental wellness and emotional well-being.",
    icon: Brain,
  },
  {
    number: "6.",
    title: "Substance Use Treatment",
    description: "Evidence-based treatment and recovery support.",
    icon: HeartHandshake,
  },
];

const checkList = [
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
  { name: "aetna", className: "text-[#7a3eb1] lowercase tracking-tight" },
  { name: "United Healthcare", className: "text-[#1b4697]" },
  { name: "CareFirst", className: "text-[#1d2d52]" },
  { name: "Cigna", className: "text-[#1792d0]" },
  { name: "BlueCross BlueShield", className: "text-[#14539a]" },
  { name: "Medicare.gov", className: "text-[#1a6d47]" },
];

export default function PublicLandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f7f9ff] text-[#13306b]">
      <header className="sticky top-0 z-50 border-b border-[#d9e1f2] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-6 px-4 py-4 lg:px-6">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="On Time Medical Group" className="h-16 w-16 object-contain lg:h-20 lg:w-20" />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              item.href.startsWith("#") ? (
                <a
                  key={item.label}
                  href={item.href}
                  className={`text-[13px] font-bold uppercase tracking-[0.04em] transition hover:text-[#ef2027] ${
                    item.label === "Home" ? "border-b-2 border-[#ef2027] pb-2 text-[#ef2027]" : "text-[#13306b]"
                  }`}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  to={item.href}
                  className="border-b-2 border-[#ef2027] pb-2 text-[13px] font-bold uppercase tracking-[0.04em] text-[#ef2027]"
                >
                  {item.label}
                </Link>
              )
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Button
              variant="outline"
              className="h-12 rounded-md border-[#13306b] px-5 text-[13px] font-bold uppercase text-[#13306b] hover:bg-[#13306b] hover:text-white"
              asChild
            >
              <Link to="/patient-portal/login">
                <Lock className="mr-2 h-4 w-4" />
                Patient Portal Login
              </Link>
            </Button>
            <Button className="h-12 rounded-md bg-[#ef2027] px-5 text-[13px] font-bold uppercase text-white hover:bg-[#d61920]" asChild>
              <Link to="/services/smart-appointments">
                <Calendar className="mr-2 h-4 w-4" />
                Book Appointment
              </Link>
            </Button>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-md border-[#d0dcf4] text-[#13306b] lg:hidden"
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-[#d9e1f2] bg-white lg:hidden">
            <div className="mx-auto flex max-w-[1240px] flex-col gap-3 px-4 py-4">
              {navItems.map((item) => (
                item.href.startsWith("#") ? (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-xl border border-[#e2e9f7] px-4 py-3 text-sm font-bold uppercase tracking-[0.04em] text-[#13306b]"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-xl border border-[#e2e9f7] px-4 py-3 text-sm font-bold uppercase tracking-[0.04em] text-[#13306b]"
                  >
                    {item.label}
                  </Link>
                )
              ))}

              <div className="grid gap-3 pt-2 sm:grid-cols-2">
                <Button
                  variant="outline"
                  className="h-12 rounded-md border-[#13306b] text-[13px] font-bold uppercase text-[#13306b]"
                  asChild
                >
                  <Link to="/patient-portal/login" onClick={() => setMobileMenuOpen(false)}>
                    <Lock className="mr-2 h-4 w-4" />
                    Patient Portal Login
                  </Link>
                </Button>
                <Button className="h-12 rounded-md bg-[#ef2027] text-[13px] font-bold uppercase text-white hover:bg-[#d61920]" asChild>
                  <Link to="/services/smart-appointments" onClick={() => setMobileMenuOpen(false)}>
                    <Calendar className="mr-2 h-4 w-4" />
                    Book Appointment
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="pb-24 lg:pb-0">
        <section className="mx-auto max-w-[1240px] px-4 pb-6 pt-8 lg:px-6">
          <div className="mb-6 flex justify-center sm:justify-end">
            <a href="tel:+14107544343" className="inline-flex items-center gap-3 text-xl font-extrabold text-[#13306b] sm:text-2xl">
              <Phone className="h-5 w-5" />
              410-754-4343
            </a>
          </div>

          <div className="grid overflow-hidden rounded-[28px] bg-white shadow-[0_30px_80px_-45px_rgba(19,48,107,0.35)] lg:grid-cols-[0.92fr_1.08fr]">
            <motion.div
              initial={{ opacity: 0, x: -22 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45 }}
              className="flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-12"
            >
              <h1 className="max-w-[700px] font-display text-[2.8rem] font-extrabold uppercase leading-[0.94] text-[#13306b] sm:text-[3.8rem]">
                Comprehensive Healthcare That&apos;s <span className="text-[#ef2027]">On Time.</span> Every Time.
              </h1>
              <p className="mt-6 max-w-[510px] text-base leading-8 text-[#334e86]">
                On Time Medical Group provides comprehensive primary care, mental health, and substance use treatment with compassion,
                convenience, and a commitment to your well-being.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button className="h-14 rounded-md bg-[#ef2027] px-7 text-[14px] font-bold uppercase text-white hover:bg-[#d61920]" asChild>
                  <Link to="/services/smart-appointments">
                    Book Appointment
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="h-14 rounded-md border-[#9fb1d8] px-7 text-[14px] font-bold uppercase text-[#13306b] hover:bg-[#f3f6fd]"
                  asChild
                >
                  <a href="tel:+14107544343">
                    <Phone className="mr-2 h-4 w-4" />
                    Call Us 410-754-4343
                  </a>
                </Button>
              </div>

              <div className="mt-8 flex items-start gap-4 rounded-2xl border border-[#dfe7f6] bg-[#f8fbff] p-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#edf2fb] text-[#13306b]">
                  <HousePlus className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-lg font-bold text-[#13306b]">Telehealth available for eligible services.</p>
                  <p className="mt-1 text-sm leading-6 text-[#516997]">Connect with your care team from the comfort of your home.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 22 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.08 }}
              className="relative min-h-[420px] lg:min-h-[640px]"
            >
              <img
                src={heroImage}
                alt="Doctor discussing care with a patient"
                className="h-full w-full object-cover object-top"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-transparent" />
            </motion.div>
          </div>

          <div className="-mt-3 grid rounded-[24px] bg-[#13306b] text-white shadow-[0_24px_48px_-28px_rgba(19,48,107,0.55)] sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
            {trustHighlights.map((item, index) => (
              <div
                key={item.title}
                className={`flex items-center gap-4 px-5 py-5 ${index !== trustHighlights.length - 1 ? "border-b border-white/15 xl:border-b-0 xl:border-r" : ""}`}
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/40">
                  <item.icon className="h-6 w-6" />
                </div>
                <p className="max-w-[150px] text-[15px] font-semibold leading-7">{item.title}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="services" className="mx-auto max-w-[1240px] px-4 py-8 lg:px-6">
          <div className="text-center">
            <p className="font-display text-[2.2rem] font-extrabold uppercase tracking-tight text-[#13306b]">Our Services</p>
            <div className="mx-auto mt-2 h-1 w-14 rounded-full bg-[#ef2027]" />
            <p className="mt-3 text-lg text-[#4f6796]">Comprehensive care for you and your family at every stage of life.</p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-6">
            {serviceCards.map((service, index) => (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className="flex min-h-[320px] flex-col rounded-[18px] border border-[#dbe4f4] bg-white px-6 py-7 text-center shadow-[0_15px_30px_-26px_rgba(19,48,107,0.35)]"
              >
                <div className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full ${index % 2 === 0 ? "bg-[#eef4ff] text-[#13306b]" : "bg-[#fff1f1] text-[#ef2027]"}`}>
                  <service.icon className="h-10 w-10" />
                </div>
                <h3 className="mt-6 text-[1.08rem] font-extrabold text-[#13306b]">
                  {service.number} {service.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[#4f6796]">{service.description}</p>
                <Link to="/services" className="mt-auto inline-flex items-center justify-center gap-2 pt-8 text-sm font-extrabold text-[#ef2027]">
                  Learn More
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.article>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Button className="h-12 rounded-md bg-[#13306b] px-8 text-[13px] font-bold uppercase text-white hover:bg-[#10295b]" asChild>
              <Link to="/services">View All Services</Link>
            </Button>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-[1240px] px-4 py-4 lg:px-6">
          <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
            <div className="overflow-hidden rounded-[24px] bg-white shadow-[0_22px_60px_-36px_rgba(19,48,107,0.35)]">
              <img src={campusImage} alt="On Time Medical Group building exterior" className="h-full w-full object-cover" loading="lazy" />
            </div>

            <div className="relative overflow-hidden rounded-[28px] bg-[#f7f9ff] px-2 py-4">
              <div className="absolute right-0 top-1/2 hidden h-72 w-72 -translate-y-1/2 rounded-full border-[18px] border-[#eaf0fb] xl:block" />
              <div className="absolute right-[6.8rem] top-[7.6rem] hidden h-24 w-24 rounded-full border-[10px] border-[#eef4ff] xl:block" />

              <p className="text-sm font-bold uppercase tracking-[0.08em] text-[#ef2027]">About On Time Medical Group</p>
              <h2 className="mt-3 max-w-[420px] font-display text-[3rem] font-extrabold leading-none text-[#13306b]">Why Choose Us?</h2>
              <p className="mt-5 max-w-[560px] text-base leading-8 text-[#4f6796]">
                We&apos;re more than a healthcare provider, we&apos;re your partner in health. Our patient-centered approach ensures you get the right care,
                at the right time, every time.
              </p>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                {checkList.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#13306b] text-white">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-sm font-semibold leading-6 text-[#13306b]">{item}</span>
                  </div>
                ))}
              </div>

              <Button
                variant="outline"
                className="mt-8 h-12 rounded-md border-[#9fb1d8] px-7 text-[13px] font-bold uppercase text-[#13306b] hover:bg-white"
                asChild
              >
                <Link to="/specialties">Learn More About Us</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1240px] px-4 py-6 lg:px-6">
          <div className="grid gap-4 rounded-[22px] bg-[#edf3ff] px-6 py-6 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((item) => (
              <div key={item.label} className="flex items-center gap-4 border-[#d0dcf4] xl:border-r xl:last:border-r-0">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-[#c4d3ef] bg-white text-[#13306b]">
                  <item.icon className="h-8 w-8" />
                </div>
                <div>
                  <p className="text-[2rem] font-extrabold leading-none text-[#13306b]">{item.value}</p>
                  <p className="mt-1 text-lg font-semibold text-[#2a467f]">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="resources" className="mx-auto max-w-[1240px] px-4 py-4 lg:px-6">
          <div className="grid gap-5 lg:grid-cols-3">
            <article className="rounded-[20px] border border-[#dbe4f4] bg-white p-6 shadow-[0_15px_30px_-26px_rgba(19,48,107,0.35)]">
              <div className="flex items-center gap-3 text-[#13306b]">
                <BookOpenText className="h-5 w-5" />
                <h3 className="font-display text-[1.8rem] font-extrabold uppercase leading-none">Patient Resources</h3>
              </div>
              <p className="mt-4 max-w-[320px] text-sm leading-7 text-[#4f6796]">Everything you need to manage your care, all in one place.</p>
              <div className="mt-5 grid gap-5 md:grid-cols-[1fr_132px] md:items-end">
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
                <img src={portraitImage} alt="Patient viewing information on a phone" className="mx-auto h-36 w-full rounded-2xl object-cover" loading="lazy" />
              </div>
              <Link to="/patient-register" className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-[#ef2027]">
                Explore Resources
                <ArrowRight className="h-4 w-4" />
              </Link>
            </article>

            <article className="rounded-[20px] border border-[#dbe4f4] bg-white p-6 shadow-[0_15px_30px_-26px_rgba(19,48,107,0.35)]">
              <div className="flex items-center gap-3 text-[#13306b]">
                <FileText className="h-5 w-5" />
                <h3 className="font-display text-[1.8rem] font-extrabold uppercase leading-none">Latest From Our Blog</h3>
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
                  <img src={blogUrgentCareImage} alt="Urgent care article" className="h-20 w-full rounded-xl object-cover" loading="lazy" />
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

            <article className="rounded-[20px] border border-[#dbe4f4] bg-white p-6 shadow-[0_15px_30px_-26px_rgba(19,48,107,0.35)]">
              <div className="flex items-center gap-3 text-[#13306b]">
                <Star className="h-5 w-5 fill-current" />
                <h3 className="font-display text-[1.8rem] font-extrabold uppercase leading-none">What Our Patients Say</h3>
              </div>
              <p className="mt-6 text-base leading-8 text-[#3f598f]">
                "The staff is so kind and professional. I always feel heard and cared for."
              </p>
              <div className="mt-5 flex items-center gap-1 text-[#f7b500]">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-5 w-5 fill-current" />
                ))}
                <span className="ml-3 text-sm font-semibold text-[#13306b]">Jessica M.</span>
              </div>
              <a
                href="https://www.google.com"
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center gap-2 text-base font-bold text-[#13306b]"
              >
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

        <section id="insurance" className="mx-auto max-w-[1240px] px-4 py-6 lg:px-6">
          <div className="rounded-[20px] border border-[#dbe4f4] bg-white px-6 py-8 shadow-[0_15px_30px_-26px_rgba(19,48,107,0.35)]">
            <h3 className="text-center font-display text-[2rem] font-extrabold uppercase text-[#13306b]">We Accept Most Major Insurance Plans</h3>
            <div className="mt-8 grid gap-4 text-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              {insuranceLogos.map((insurance) => (
                <div key={insurance.name} className="flex min-h-[88px] items-center justify-center rounded-2xl border border-[#e1e8f5] bg-[#f8fbff] px-4 py-4 shadow-[0_12px_30px_-24px_rgba(19,48,107,0.28)]">
                  <span className={`text-[1.15rem] font-extrabold leading-tight ${insurance.className}`}>{insurance.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-[1240px] px-4 pb-12 pt-2 lg:px-6">
          <div className="grid overflow-hidden rounded-[24px] bg-[#13306b] text-white lg:grid-cols-[1fr_0.9fr_1fr]">
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
                <a href="tel:+14107544343" className="mt-1 block text-[2.3rem] font-extrabold leading-none">410-754-4343</a>
                <p className="mt-2 text-sm leading-7 text-white/85">Our team is here to help you.</p>
              </div>
            </div>

            <div className="flex flex-col justify-center px-6 py-7">
              <Button className="h-14 rounded-md bg-[#ef2027] text-[14px] font-bold uppercase text-white hover:bg-[#d61920]" asChild>
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
        <div className="mx-auto flex max-w-[1240px] flex-col items-center justify-between gap-4 px-4 py-6 text-center text-sm text-[#4f6796] lg:flex-row lg:px-6 lg:text-left">
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
              <a href="mailto:care@ontimemedical.com" className="hover:text-[#ef2027]">care@ontimemedical.com</a>
              <a href="tel:+14107544343" className="hover:text-[#ef2027]">410-754-4343</a>
            </div>
          </div>
        </div>
      </footer>

      <section className="fixed bottom-4 left-1/2 z-40 w-[calc(100%-1.5rem)] max-w-[420px] -translate-x-1/2 rounded-2xl border border-[#13306b]/10 bg-white/96 p-3 shadow-[0_18px_40px_-22px_rgba(19,48,107,0.5)] backdrop-blur lg:hidden">
        <div className="flex items-center gap-3">
          <Button className="h-12 flex-1 rounded-xl bg-[#ef2027] text-[13px] font-bold uppercase hover:bg-[#d61920]" asChild>
            <Link to="/services/smart-appointments">Book Appointment</Link>
          </Button>
          <Button variant="outline" className="h-12 rounded-xl border-[#9fb1d8] px-4 text-[#13306b]" asChild>
            <a href="tel:+14107544343">
              <Phone className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
