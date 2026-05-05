import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronRight, Phone, Stethoscope, ShieldCheck, HeartPulse, Heart, UserRound, Brain, HandHeart, Users, Plus, Calendar, MapPin, HeartHandshake } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PublicSiteFooter } from "@/components/landing/PublicSiteFooter";
import { PublicSiteHeader } from "@/components/landing/PublicSiteHeader";
import { getCatalogItem, getCatalogItems, getCatalogLabel, type PublicCatalogKind } from "@/data/publicSiteContent";
import { cn } from "@/lib/utils";

import insuranceAetna from "@/assets/insurance-aetna.svg";
import insuranceUnited from "@/assets/insurance-unitedhealthcare.svg";
import insuranceCareFirst from "@/assets/insurance-carefirst.svg";
import insuranceCigna from "@/assets/insurance-cigna.svg";
import insuranceBcbs from "@/assets/insurance-bcbs.svg";
import insuranceMedicare from "@/assets/insurance-medicare.svg";
import hereForYouImage from "@/assets/mockup-hero-doctor-patient.jpg";

const insuranceLogos = [
  { name: "Aetna", src: insuranceAetna },
  { name: "United Healthcare", src: insuranceUnited },
  { name: "CareFirst", src: insuranceCareFirst },
  { name: "Cigna", src: insuranceCigna },
  { name: "Blue Cross Blue Shield", src: insuranceBcbs },
  { name: "Medicare", src: insuranceMedicare },
];

const trustHighlights = [
  { title: "Same-Day Appointments Available", icon: Calendar },
  { title: "Most Insurance Plans Accepted", icon: ShieldCheck, isRed: true },
  { title: "All-in-One Care Mind, Body, You.", icon: UserRound },
  { title: "Convenient Locations Near You", icon: MapPin },
  { title: "Compassionate Care, Every Step of the Way", icon: HeartHandshake },
];

const serviceList: ServiceCardProps[] = [
  { title: "Primary Care", icon: Stethoscope, number: "1.", desc: "Personalized care for your everyday health needs.", accent: "blue" },
  { title: "Preventive Care", icon: ShieldCheck, number: "2.", desc: "Stay ahead with screenings and preventive services.", accent: "red" },
  { title: "Chronic Disease Management", icon: HeartPulse, number: "3.", desc: "Ongoing care to help you manage chronic conditions.", accent: "blue" },
  { title: "Women's Health", icon: Heart, number: "4.", desc: "Compassionate care for every stage of life.", accent: "red" },
  { title: "Men's Health", icon: UserRound, number: "5.", desc: "Focused care for men's health and wellness.", accent: "blue" },
  { title: "Mental Health Services (OMHC)", icon: Brain, number: "6.", desc: "Support for your mental wellness and emotional well-being.", accent: "blue", badge: "Integrated Care" },
  { title: "Substance Use Treatment", icon: HandHeart, number: "7.", desc: "Evidence-based treatment and recovery support.", accent: "red", badge: "Confidential Care" },
  { title: "Geriatric Care", icon: Users, number: "8.", desc: "Comprehensive care designed for healthy aging.", accent: "blue" },
  { title: "Urgent Care", icon: Plus, number: "9.", desc: "Care for minor illnesses and injuries when you need it.", accent: "red" },
];

type ServiceCardProps = {
  title: string;
  icon: typeof Stethoscope;
  number: string;
  desc: string;
  accent: "blue" | "red";
  badge?: string;
};

export default function PublicCatalogPage() {
  const { slug } = useParams();
  const location = useLocation();
  const kind: PublicCatalogKind = location.pathname.startsWith("/specialties") ? "specialties" : "services";
  const items = getCatalogItems(kind);
  const label = getCatalogLabel(kind);
  const item = getCatalogItem(kind, slug);
  
  const shellClassName = "mx-auto w-full max-w-[1280px] px-5 sm:px-8";

  if (slug && !item) return <Navigate to={`/${kind}`} replace />;

  if (!slug) {
    return (
      <div className="min-h-screen bg-white text-[#13306b]">
        <PublicSiteHeader />
        <main>
          {/* Hero section aligned with homepage hero */}
          <section className="relative flex items-center pt-[60px] pb-[40px]">
            <div className={`${shellClassName} w-full`}>
              <div className="grid items-center gap-12 lg:grid-cols-2">
                <div className="flex flex-col justify-center">
                  <h1 className="hero-mock-title text-[3.2rem] font-black uppercase leading-none tracking-tight text-[#13306b] lg:text-[4.5rem]">
                    Our Services
                  </h1>
                  <div className="mt-4 h-[5px] w-20 rounded-full bg-[#ef2027]" />
                  <p className="mt-8 text-[1.2rem] font-bold text-[#13306b]">Comprehensive care for you and your family.</p>
                  <p className="mt-4 max-w-[540px] text-[1.05rem] leading-[1.8] text-[#5f6b7a]">
                    At On Time Medical Group, we offer a wide range of services designed to support your physical and mental well-being—every step of the way.
                  </p>
                  <div className="mt-8 flex items-start gap-4 rounded-2xl border border-[#dce6f5] bg-[#f4f8ff] p-5 max-w-[480px]">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#13306b] shadow-sm">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-[1rem] font-black text-[#13306b]">Telehealth available for eligible services.</p>
                      <p className="mt-1 text-sm text-[#4f6796]">Connect with your care team from the comfort of your home.</p>
                    </div>
                  </div>
                </div>
                <div className="relative flex justify-center lg:justify-end">
                  <img src={hereForYouImage} alt="Services" className="w-full h-auto max-h-[500px] object-contain rounded-[32px]" loading="eager" />
                </div>
              </div>

              <div className="relative z-10 mt-16 rounded-[24px] bg-[#13306b] px-4 py-2 text-white shadow-mock">
                <div className="grid sm:grid-cols-2 lg:grid-cols-5">
                  {trustHighlights.map((item, index) => (
                    <div key={item.title} className={`flex items-center gap-4 px-6 py-8 ${index < trustHighlights.length - 1 ? "border-b border-white/10 lg:border-b-0 lg:border-r" : ""}`}>
                      <div className={cn("flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-white/30 bg-white/5", item.isRed && "border-[#ef2027]/40 bg-[#ef2027]/10 text-[#ef2027]")}>
                        <item.icon className="h-6 w-6" />
                      </div>
                      <p className="text-[0.9rem] font-bold leading-snug text-white">{item.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Service Grid Section */}
          <section className={`${shellClassName} py-[60px]`}>
            <div className="text-center mb-16">
              <h2 className="hero-mock-title text-[2.6rem] font-black uppercase tracking-tight text-[#13306b]">Our Services Include</h2>
              <div className="mx-auto mt-4 h-[4px] w-16 rounded-full bg-[#ef2027]" />
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {serviceList.slice(0, 5).map((s) => <ServiceCard key={s.title} {...s} />)}
            </div>
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-[1000px] mx-auto">
              {serviceList.slice(5).map((s) => <ServiceCard key={s.title} {...s} />)}
            </div>
          </section>

          {/* We're here for you section */}
          <section className={`${shellClassName} py-[40px]`}>
            <div className="grid overflow-hidden rounded-[24px] bg-[#f0f5ff] lg:grid-cols-2">
              <div className="relative min-h-[400px]">
                <img src={hereForYouImage} alt="Family" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#f0f5ff] hidden lg:block" />
              </div>
              <div className="flex flex-col justify-center px-10 py-12 lg:px-16">
                <h3 className="hero-mock-title text-[2.8rem] font-black uppercase leading-tight text-[#13306b]">We&apos;re here for you</h3>
                <p className="mt-6 text-[1.1rem] leading-[1.8] text-[#5f6b7a]">
                  Whether it&apos;s a routine check-up, mental health support, or urgent care, our team is here to help you feel your best—today and every day.
                </p>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <Button className="btn-mock-red h-14 px-10 text-[14px] uppercase" asChild><Link to="/services/smart-appointments">Book Appointment</Link></Button>
                  <Button variant="outline" className="h-14 px-10 text-[14px] uppercase bg-white border-2 border-[#13306b]/20" asChild><a href="tel:+14107544343">Call 410-754-4343</a></Button>
                </div>
              </div>
            </div>
          </section>

          {/* Insurance Section */}
          <section className="py-[60px]">
            <div className={shellClassName}>
              <h3 className="hero-mock-title text-center text-[1.6rem] font-black uppercase text-[#13306b] mb-12">We Accept Most Major Insurance Plans</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-8 items-center">
                {insuranceLogos.map((logo) => (
                  <div key={logo.name} className="flex justify-center">
                    <img src={logo.src} alt={logo.name} className="h-10 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all" />
                  </div>
                ))}
              </div>
              <p className="text-center mt-10 text-sm font-bold text-[#4f6796]">...and many more.</p>
            </div>
          </section>
        </main>
        <PublicSiteFooter />
      </div>
    );
  }

  // Single Item View (reusing standard layout but with master instructions alignment)
  const relatedItems = items.filter((entry) => entry.slug !== item.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-white text-[#13306b]">
      <PublicSiteHeader />
      <main className="py-[60px]">
        <section className={shellClassName}>
          <div className="grid overflow-hidden rounded-md bg-white border border-[#dde5f4] lg:grid-cols-[0.86fr_1.14fr]">
            <div className="flex flex-col justify-center px-10 py-12">
              <Link to={`/${kind}`} className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-[#4f6796] hover:text-[#ef2027]">
                <ArrowLeft className="h-4 w-4" />
                Back to {label.toLowerCase()}
              </Link>
              <h1 className="hero-mock-title text-[2.8rem] font-black uppercase leading-tight text-[#13306b] mb-6">{item?.title}</h1>
              <p className="text-[1.1rem] leading-[1.8] text-[#5f6b7a] mb-8">{item?.summary || item?.excerpt}</p>
              <div className="flex flex-col gap-4 sm:flex-row">
                {item?.primaryAction?.href && (
                  <Button className="btn-mock-red h-14 px-8" asChild>
                    <Link to={item.primaryAction.href}>{item.primaryAction.label}</Link>
                  </Button>
                )}
              </div>
            </div>
            <div className="relative min-h-[400px]">
              <img src={item?.image} alt={item?.title} className="w-full h-full object-contain" />
            </div>
          </div>
        </section>
      </main>
      <PublicSiteFooter />
    </div>
  );
}

function ServiceCard({ title, icon: Icon, number, desc, accent, badge }: ServiceCardProps) {
  return (
    <article className="flex flex-col rounded-[24px] border border-[#dbe4f4] bg-white p-8 text-center shadow-sm hover:shadow-mock transition-all">
      <div className={cn("mx-auto flex h-16 w-16 items-center justify-center rounded-full mb-6", accent === "red" ? "bg-[#fff2f2] text-[#ef2027]" : "bg-[#edf3ff] text-[#13306b]")}>
        {Icon && <Icon className="h-8 w-8" />}
      </div>
      <h3 className="text-[1.1rem] font-black leading-tight text-[#13306b] mb-4">{number} {title}</h3>
      {badge && <div className="mb-4"><span className={cn("px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider", accent === "red" ? "bg-[#fff2f2] text-[#ef2027]" : "bg-[#edf3ff] text-[#13306b]")}>{badge}</span></div>}
      <p className="text-[0.85rem] leading-6 text-[#4f6796] mb-6">{desc}</p>
      <Link to="/services" className="mt-auto inline-flex items-center justify-center gap-2 text-[0.8rem] font-black uppercase text-[#ef2027]">
        Learn More <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  );
}

