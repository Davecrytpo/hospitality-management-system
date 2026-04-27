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
  ClipboardPlus,
  FileText,
  HeartHandshake,
  HeartPulse,
  Lock,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Star,
  Stethoscope,
  UserRound,
  CircleDot,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import heroImage from "@/assets/home-hero-doctor-patient.jpg";
import campusImage from "@/assets/hospital-exterior.jpg";
import resourcesImage from "@/assets/home-patient-resources.jpg";
import blogWellnessImage from "@/assets/service-pharmacy-support.jpg";
import blogUrgentCareImage from "@/assets/home-blog-urgent-care.jpg";
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
  { title: "Same-Day Appointments Available", icon: Calendar },
  { title: "Most Insurance Plans Accepted", icon: ShieldCheck },
  { title: "All-in-One Care Mind, Body, You.", icon: UserRound },
  { title: "Convenient Locations Near You", icon: MapPin },
  { title: "Compassionate Care, Every Step of the Way", icon: HeartHandshake },
];

const serviceCards = [
  { number: "1.", title: "Primary Care", description: "Personalized care for your everyday health needs.", icon: Stethoscope, href: "/services/smart-appointments" },
  { number: "2.", title: "Preventive Care", description: "Stay ahead of health issues with screenings, vaccinations & more.", icon: ShieldCheck, href: "/services/advanced-diagnostics" },
  { number: "3.", title: "Women's Health", description: "Compassionate care for every stage of a woman's life.", icon: CircleDot, href: "/specialties/pediatrics" },
  { number: "4.", title: "Chronic Disease Management", description: "Ongoing care to help you manage chronic conditions.", icon: HeartPulse, href: "/specialties/cardiology" },
  { number: "5.", title: "Mental Health Services (OMHC)", description: "Support for your mental wellness and emotional well-being.", icon: Brain, href: "/specialties/neurology" },
  { number: "6.", title: "Substance Use Treatment", description: "Evidence-based treatment and recovery support.", icon: HeartHandshake, href: "/services/premium-inpatient-care" },
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
const insuranceLogos = ["aetna", "United Healthcare", "CareFirst", "Cigna", "BlueCross BlueShield", "Medicare.gov"];

export default function PublicLandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-otmg-page text-otmg-navy">
      <header className="sticky top-0 z-50 border-b border-otmg-border bg-card/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-5 px-4 py-4 lg:px-6">
          <Link to="/" className="flex items-center gap-3" aria-label="On Time Medical Group home">
            <img src={logo} alt="On Time Medical Group" className="h-20 w-20 object-contain" width={80} height={80} />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) =>
              item.href.startsWith("#") ? (
                <a key={item.label} href={item.href} className="nav-mock-link">
                  {item.label}
                </a>
              ) : (
                <Link key={item.label} to={item.href} className="nav-mock-link nav-mock-link-active">
                  {item.label}
                </Link>
              ),
            )}
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

          <Button variant="outline" size="icon" className="btn-mock-outline h-12 w-12 lg:hidden" onClick={() => setMobileMenuOpen((open) => !open)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-otmg-border bg-card lg:hidden">
            <div className="mx-auto flex max-w-[1240px] flex-col gap-3 px-4 py-4">
              {navItems.map((item) =>
                item.href.startsWith("#") ? (
                  <a key={item.label} href={item.href} onClick={() => setMobileMenuOpen(false)} className="mobile-mock-link">
                    {item.label}
                  </a>
                ) : (
                  <Link key={item.label} to={item.href} onClick={() => setMobileMenuOpen(false)} className="mobile-mock-link">
                    {item.label}
                  </Link>
                ),
              )}
              <Button className="btn-mock-red h-12 text-[13px] uppercase" asChild>
                <Link to="/services/smart-appointments" onClick={() => setMobileMenuOpen(false)}>Book Appointment</Link>
              </Button>
            </div>
          </div>
        )}
      </header>

      <main>
        <section className="mx-auto max-w-[1240px] px-4 pb-5 pt-5 lg:px-6">
          <div className="mb-4 flex justify-end">
            <a href="tel:+14107544343" className="inline-flex items-center gap-3 text-xl font-extrabold text-otmg-navy sm:text-2xl">
              <Phone className="h-5 w-5" />
              410-754-4343
            </a>
          </div>

          <div className="grid overflow-hidden bg-card shadow-mock lg:grid-cols-[0.82fr_1.18fr]">
            <motion.div initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} className="relative z-10 flex flex-col justify-center px-5 py-10 sm:px-10 lg:py-12">
              <h1 className="max-w-[500px] font-display text-[2.55rem] font-extrabold uppercase leading-[0.98] text-otmg-navy sm:text-[3.55rem] lg:text-[4rem]">
                Comprehensive Healthcare That&apos;s <span className="text-brand-red">On Time.</span> Every Time.
              </h1>
              <p className="mt-6 max-w-[510px] text-base font-medium leading-8 text-otmg-blue-soft">
                On Time Medical Group provides comprehensive primary care, mental health, and substance use treatment with compassion, convenience, and a commitment to your well-being.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button className="btn-mock-red h-14 px-7 text-[14px] uppercase" asChild>
                  <Link to="/services/smart-appointments">Book Appointment <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                <Button variant="outline" className="btn-mock-outline h-14 px-7 text-[14px] uppercase" asChild>
                  <a href="tel:+14107544343"><Phone className="mr-2 h-4 w-4" />Call Us 410-754-4343</a>
                </Button>
              </div>

              <div className="mt-8 flex items-start gap-4 rounded-md border border-otmg-border bg-otmg-soft p-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-card text-otmg-navy">
                  <ClipboardPlus className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-lg font-extrabold text-otmg-navy">Telehealth available for eligible services.</p>
                  <p className="mt-1 text-sm font-medium leading-6 text-otmg-blue-soft">Connect with your care team from the comfort of your home.</p>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.06 }} className="relative min-h-[360px] lg:min-h-[560px]">
              <img src={heroImage} alt="Doctor discussing care with a patient" className="h-full w-full object-cover object-center" loading="eager" width={1536} height={864} />
              <div className="absolute inset-y-0 left-0 hidden w-36 bg-gradient-to-r from-card to-transparent lg:block" />
            </motion.div>
          </div>

          <div className="relative z-20 -mt-1 grid overflow-hidden rounded-md bg-otmg-navy text-primary-foreground shadow-mock md:grid-cols-3 xl:grid-cols-5">
            {trustHighlights.map((item, index) => (
              <div key={item.title} className="flex items-center gap-4 px-5 py-5 xl:border-r xl:border-primary-foreground/20 xl:last:border-r-0">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-primary-foreground/55">
                  <item.icon className="h-6 w-6" />
                </div>
                <p className="max-w-[150px] text-[15px] font-bold leading-7">{item.title}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="services" className="mx-auto max-w-[1240px] px-4 py-5 lg:px-6">
          <div className="text-center">
            <h2 className="font-display text-[2.2rem] font-extrabold uppercase leading-none text-otmg-navy">Our Services</h2>
            <div className="mx-auto mt-3 h-1 w-14 rounded-full bg-brand-red" />
            <p className="mt-3 text-lg text-otmg-blue-soft">Comprehensive care for you and your family—at every stage of life.</p>
          </div>

          <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-6">
            {serviceCards.map((service, index) => (
              <motion.article key={service.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.3, delay: index * 0.04 }} className="flex min-h-[290px] flex-col rounded-md border border-otmg-border bg-card px-6 py-7 text-center shadow-card">
                <div className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full ${index % 2 === 0 ? "bg-otmg-soft text-otmg-navy" : "bg-brand-red-soft text-brand-red"}`}>
                  <service.icon className="h-10 w-10" />
                </div>
                <h3 className="mt-6 text-[1.02rem] font-extrabold leading-6 text-otmg-navy">{service.number} {service.title}</h3>
                <p className="mt-4 text-sm font-medium leading-7 text-otmg-blue-soft">{service.description}</p>
                <Link to={service.href} className="mt-auto inline-flex items-center justify-center gap-2 pt-7 text-sm font-extrabold text-brand-red">
                  Learn More <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.article>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Button className="btn-mock-navy h-12 px-8 text-[13px] uppercase" asChild><Link to="/services">View All Services</Link></Button>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-[1240px] px-4 py-4 lg:px-6">
          <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
            <div className="overflow-hidden rounded-md bg-card shadow-card">
              <img src={campusImage} alt="On Time Medical Group building exterior" className="h-full min-h-[280px] w-full object-cover" loading="lazy" width={1200} height={800} />
            </div>

            <div className="relative overflow-hidden px-1 py-4">
              <div className="absolute right-0 top-1/2 hidden h-72 w-72 -translate-y-1/2 rounded-full border-[18px] border-otmg-soft xl:block" />
              <p className="text-sm font-extrabold uppercase tracking-[0.08em] text-brand-red">About On Time Medical Group</p>
              <h2 className="mt-3 max-w-[420px] font-display text-[3rem] font-extrabold leading-none text-otmg-navy">Why Choose Us?</h2>
              <p className="mt-5 max-w-[560px] text-base font-medium leading-8 text-otmg-blue-soft">We&apos;re more than a healthcare provider—we&apos;re your partner in health. Our patient-centered approach ensures you get the right care, at the right time, every time.</p>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                {checkList.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-otmg-navy text-primary-foreground"><Check className="h-3.5 w-3.5" /></span>
                    <span className="text-sm font-bold leading-6 text-otmg-navy">{item}</span>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="btn-mock-outline mt-8 h-12 px-7 text-[13px] uppercase" asChild><Link to="/specialties">Learn More About Us</Link></Button>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1240px] px-4 py-6 lg:px-6">
          <div className="grid gap-4 rounded-md bg-otmg-soft px-6 py-6 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((item) => (
              <div key={item.label} className="flex items-center gap-4 xl:border-r xl:border-otmg-border xl:last:border-r-0">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-otmg-border bg-card text-otmg-navy"><item.icon className="h-8 w-8" /></div>
                <div><p className="text-[2rem] font-extrabold leading-none text-otmg-navy">{item.value}</p><p className="mt-1 text-lg font-bold text-otmg-blue-soft">{item.label}</p></div>
              </div>
            ))}
          </div>
        </section>

        <section id="resources" className="mx-auto max-w-[1240px] px-4 py-4 lg:px-6">
          <div className="grid gap-5 lg:grid-cols-3">
            <article className="rounded-md border border-otmg-border bg-card p-6 shadow-card">
              <div className="flex items-center gap-3 text-otmg-navy"><BookOpenText className="h-5 w-5" /><h3 className="font-display text-[1.7rem] font-extrabold uppercase leading-none">Patient Resources</h3></div>
              <p className="mt-4 max-w-[320px] text-sm font-medium leading-7 text-otmg-blue-soft">Everything you need to manage your care, all in one place.</p>
              <div className="mt-5 grid gap-5 md:grid-cols-[1fr_132px] md:items-end">
                <div className="space-y-2">
                  {resourceLinks.map((item) => (<Link key={item} to="/patient-register" className="flex items-center gap-2 text-sm font-bold text-otmg-navy hover:text-brand-red"><ChevronRight className="h-4 w-4" />{item}</Link>))}
                </div>
                <img src={resourcesImage} alt="Patient viewing information on a tablet" className="mx-auto h-36 w-full rounded-md object-cover" loading="lazy" width={1024} height={768} />
              </div>
              <Link to="/patient-register" className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-brand-red">Explore Resources <ArrowRight className="h-4 w-4" /></Link>
            </article>

            <article className="rounded-md border border-otmg-border bg-card p-6 shadow-card">
              <div className="flex items-center gap-3 text-otmg-navy"><FileText className="h-5 w-5" /><h3 className="font-display text-[1.7rem] font-extrabold uppercase leading-none">Latest From Our Blog</h3></div>
              <div className="mt-5 space-y-4">
                {[{ img: blogWellnessImage, title: "5 Tips for Maintaining Your Mental Wellness" }, { img: blogUrgentCareImage, title: "When to Visit Urgent Care vs. Your PCP" }].map((post) => (
                  <div key={post.title} className="grid grid-cols-[92px_1fr] gap-4">
                    <img src={post.img} alt={post.title} className="h-20 w-full rounded-md object-cover" loading="lazy" />
                    <div><p className="text-[1.04rem] font-extrabold leading-6 text-otmg-navy">{post.title}</p><Link to="/services" className="mt-2 inline-flex items-center gap-2 text-sm font-extrabold text-brand-red">Read More <ArrowRight className="h-4 w-4" /></Link></div>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-md border border-otmg-border bg-card p-6 shadow-card">
              <div className="flex items-center gap-3 text-otmg-navy"><Star className="h-5 w-5 fill-current" /><h3 className="font-display text-[1.7rem] font-extrabold uppercase leading-none">What Our Patients Say</h3></div>
              <p className="mt-6 text-base font-medium leading-8 text-otmg-blue-soft">“The staff is so kind and professional. I always feel heard and cared for.”</p>
              <div className="mt-5 flex items-center gap-1 text-otmg-gold">{Array.from({ length: 5 }).map((_, index) => (<Star key={index} className="h-5 w-5 fill-current" />))}<span className="ml-3 text-sm font-bold text-otmg-navy">Jessica M.</span></div>
              <a href="https://www.google.com" target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 text-base font-bold text-otmg-navy">View More Reviews on <span className="google-word">Google</span></a>
            </article>
          </div>
        </section>

        <section id="insurance" className="mx-auto max-w-[1240px] px-4 py-6 lg:px-6">
          <div className="rounded-md border border-otmg-border bg-card px-6 py-8 shadow-card">
            <h3 className="text-center font-display text-[2rem] font-extrabold uppercase text-otmg-navy">We Accept Most Major Insurance Plans</h3>
            <div className="mt-8 grid gap-6 text-center text-[1.1rem] font-extrabold text-otmg-blue-soft sm:grid-cols-2 lg:grid-cols-6">
              {insuranceLogos.map((name) => (<div key={name} className="flex min-h-[60px] items-center justify-center rounded-md bg-otmg-soft px-4">{name}</div>))}
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-[1240px] px-4 pb-12 pt-2 lg:px-6">
          <div className="grid overflow-hidden rounded-md bg-otmg-navy text-primary-foreground lg:grid-cols-[1fr_0.9fr_1fr]">
            <div className="flex items-center gap-4 border-b border-primary-foreground/15 px-6 py-7 lg:border-b-0 lg:border-r"><div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-primary-foreground/35"><Calendar className="h-8 w-8" /></div><div><p className="text-2xl font-extrabold">Ready to Take the Next Step?</p><p className="mt-2 text-sm leading-7 text-primary-foreground/85">We&apos;re here to help you live a healthier, happier life—on your time.</p></div></div>
            <div className="flex items-center gap-4 border-b border-primary-foreground/15 px-6 py-7 lg:border-b-0 lg:border-r"><div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-primary-foreground/35"><Phone className="h-8 w-8" /></div><div><p className="text-sm font-semibold uppercase tracking-[0.08em] text-primary-foreground/75">Call Us Today</p><a href="tel:+14107544343" className="mt-1 block text-[2.15rem] font-extrabold leading-none">410-754-4343</a><p className="mt-2 text-sm leading-7 text-primary-foreground/85">Our team is here to help you.</p></div></div>
            <div className="flex flex-col justify-center px-6 py-7"><Button className="btn-mock-red h-14 text-[14px] uppercase" asChild><Link to="/services/smart-appointments">Book Appointment <ArrowRight className="ml-2 h-4 w-4" /></Link></Button><p className="mt-4 text-sm leading-7 text-primary-foreground/85">Appointments available in-office or via telehealth.</p></div>
          </div>
        </section>
      </main>

      <footer className="border-t border-otmg-border bg-card">
        <div className="mx-auto flex max-w-[1240px] flex-col items-center justify-between gap-4 px-4 py-6 text-center text-sm text-otmg-blue-soft lg:flex-row lg:px-6 lg:text-left">
          <div className="flex items-center gap-3"><img src={logo} alt="On Time Medical Group" className="h-12 w-12 object-contain" width={48} height={48} /><div><p className="font-bold text-otmg-navy">On Time Medical Group</p><p>Compassionate care. Clear access. Reliable follow-through.</p></div></div>
          <div className="flex flex-col items-center gap-2 lg:items-end"><p>1500 Wellness Avenue, Medical District</p><div className="flex items-center gap-5"><a href="mailto:care@ontimemedical.com" className="hover:text-brand-red">care@ontimemedical.com</a><a href="tel:+14107544343" className="hover:text-brand-red">410-754-4343</a></div></div>
        </div>
      </footer>

      <section className="fixed bottom-4 left-1/2 z-40 w-[calc(100%-1.5rem)] max-w-[420px] -translate-x-1/2 rounded-md border border-otmg-border bg-card/96 p-3 shadow-mock backdrop-blur lg:hidden">
        <div className="flex items-center gap-3"><Button className="btn-mock-red h-12 flex-1 text-[13px] uppercase" asChild><Link to="/services/smart-appointments">Book Appointment</Link></Button><Button variant="outline" className="btn-mock-outline h-12 px-4" asChild><a href="tel:+14107544343"><Phone className="h-4 w-4" /></a></Button></div>
      </section>
    </div>
  );
}
