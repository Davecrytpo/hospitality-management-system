import { useState } from "react";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BookOpenText,
  Calendar,
  CheckCircle2,
  HeartHandshake,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import heroImage from "@/assets/mockup-hero-doctor-patient.jpg";
import secondaryImage from "@/assets/services-family-banner.jpg";
import insuranceAetna from "@/assets/insurance-aetna.svg";
import insuranceBcbs from "@/assets/insurance-bcbs.svg";
import insuranceCareFirst from "@/assets/insurance-carefirst.svg";
import insuranceCigna from "@/assets/insurance-cigna.svg";
import insuranceMedicare from "@/assets/insurance-medicare.svg";
import insuranceUnited from "@/assets/insurance-unitedhealthcare.svg";
import { AppointmentRequestDialog } from "@/components/landing/AppointmentRequestDialog";
import { PublicSiteFooter } from "@/components/landing/PublicSiteFooter";
import { PublicSiteHeader } from "@/components/landing/PublicSiteHeader";
import { Button } from "@/components/ui/button";
import { getCatalogItem, getCatalogItems, getCatalogLabel, type PublicCatalogKind } from "@/data/publicSiteContent";
import { getServicePageContent, serviceDirectoryCards, type ServiceDirectoryCard } from "@/data/servicePageContent";
import { cn } from "@/lib/utils";
import PublicServicePage from "./PublicServicePage";

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

export default function PublicCatalogPage() {
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const { slug } = useParams();
  const location = useLocation();
  const kind: PublicCatalogKind = location.pathname.startsWith("/specialties") ? "specialties" : "services";
  const items = getCatalogItems(kind);
  const label = getCatalogLabel(kind);
  const item = getCatalogItem(kind, slug);
  const servicePage = kind === "services" ? getServicePageContent(slug) : null;
  const shellClassName = "mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8";

  if (servicePage) return <PublicServicePage service={servicePage} />;

  if (slug && !item) return <Navigate to={`/${kind}`} replace />;

  if (!slug && kind === "services") {
    return (
      <div className="min-h-screen bg-white text-[#13306b]">
        <PublicSiteHeader />
        <main className="overflow-x-hidden bg-white">
          <section className="overflow-visible pt-4 lg:pt-7">
            <div className={`${shellClassName} relative`}>
              <div className="mb-4 hidden justify-end lg:flex">
                <a href="tel:+14107544343" className="inline-flex items-center gap-3 whitespace-nowrap text-[#13306b] transition-colors hover:text-[#ef2027]">
                  <Phone className="h-6 w-6" strokeWidth={2.2} />
                  <span className="text-[2.15rem] font-black tracking-tight">410-754-4343</span>
                </a>
              </div>

              <div className="grid gap-8 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-start lg:gap-8 xl:gap-10">
                <div className="pt-2 lg:pt-4">
                  <div className="max-w-[520px]">
                    <h1 className="hero-mock-title text-[2.95rem] font-black uppercase leading-[0.94] tracking-tight text-[#13306b] sm:text-[3.75rem] lg:text-[4.55rem]">
                      Our Services
                    </h1>
                    <div className="mt-4 h-[4px] w-16 rounded-full bg-[#ef2027]" />
                    <p className="mt-5 text-[1.35rem] font-medium text-[#13306b]">Comprehensive care for you and your family.</p>
                    <p className="mt-4 text-[1rem] leading-8 text-[#4f6796] lg:text-[1.04rem]">
                      At On Time Medical Group, we offer a wide range of services designed to support your physical and mental
                      well-being - every step of the way.
                    </p>

                    <div className="mt-8 flex max-w-[470px] items-start gap-4 rounded-[18px] border border-[#dce6f5] bg-[#f4f8ff] p-5 shadow-[0_18px_38px_-36px_rgba(19,48,107,0.45)]">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#13306b] shadow-sm">
                        <BookOpenText className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-[1rem] font-black text-[#13306b]">Telehealth available for eligible services.</p>
                        <p className="mt-1 text-sm leading-6 text-[#4f6796]">Connect with your care team from the comfort of your home.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 flex justify-center lg:justify-end">
                  <div className="w-full overflow-hidden rounded-[28px] shadow-[0_28px_60px_-40px_rgba(19,48,107,0.42)]">
                    <img
                      src={heroImage}
                      alt="Doctor discussing care with a patient"
                      className="w-full object-cover object-center"
                      loading="eager"
                    />
                  </div>
                </div>
              </div>

              <div className="relative z-20 mt-8 rounded-[22px] bg-[#13306b] px-2 py-1 text-white shadow-mock lg:-mt-10">
                <div className="grid sm:grid-cols-2 lg:grid-cols-5">
                  {trustHighlights.map((entry, index) => (
                    <div
                      key={entry.title}
                      className={`flex items-center gap-4 px-5 py-6 ${
                        index < trustHighlights.length - 1 ? "border-b border-white/10 lg:border-b-0 lg:border-r lg:border-white/15" : ""
                      }`}
                    >
                      <div
                        className={cn(
                          "flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-white/30 bg-white/5",
                          entry.isRed && "border-[#ef2027]/45 bg-[#ef2027]/12 text-[#ef2027]",
                        )}
                      >
                        <entry.icon className="h-6 w-6" />
                      </div>
                      <p className="text-[0.95rem] font-bold leading-snug text-white">{entry.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className={`${shellClassName} py-14 lg:py-16`}>
            <div className="text-center">
              <h2 className="hero-mock-title text-[2.75rem] font-black uppercase tracking-tight text-[#13306b] sm:text-[3rem]">
                Our Services Include
              </h2>
              <div className="mx-auto mt-3 h-[4px] w-16 rounded-full bg-[#ef2027]" />
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {serviceDirectoryCards.slice(0, 5).map((service) => (
                <ServiceCard key={service.title} {...service} />
              ))}
            </div>

            <div className="mx-auto mt-5 grid max-w-[980px] gap-5 md:grid-cols-2 xl:grid-cols-4">
              {serviceDirectoryCards.slice(5).map((service) => (
                <ServiceCard key={service.title} {...service} />
              ))}
            </div>
          </section>

          <section className={`${shellClassName} pb-10 pt-2 lg:pb-12`}>
            <div className="grid overflow-hidden rounded-[22px] border border-[#dde5f4] bg-[#f2f7ff] lg:grid-cols-[0.95fr_1.05fr]">
              <div className="relative min-h-[240px] bg-white sm:min-h-[280px] lg:min-h-[320px]">
                <img
                  src={secondaryImage}
                  alt="Family sitting together on a couch"
                  className="absolute inset-0 h-full w-full object-cover object-center"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col justify-center px-6 py-8 sm:px-8 lg:px-12">
                <h3 className="hero-mock-title text-[2.2rem] font-black uppercase leading-none text-[#13306b] sm:text-[2.35rem] lg:text-[2.9rem]">
                  We&apos;re Here For You
                </h3>
                <p className="mt-4 max-w-[560px] text-[1rem] leading-8 text-[#4f6796]">
                  Whether it&apos;s a routine check-up, mental health support, or urgent care, our team is here to help you feel your best -
                  today and every day.
                </p>
                <div className="mt-7 flex flex-col gap-4 sm:flex-row">
                  <Button className="btn-mock-red h-12 rounded-md px-8 text-[13px] uppercase" type="button" onClick={() => setAppointmentOpen(true)}>
                    <span className="inline-flex items-center">
                      Book Appointment
                      <ArrowRight className="ml-3 h-4 w-4" />
                    </span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-12 rounded-md border-2 border-[#13306b]/18 bg-white px-6 text-[13px] uppercase text-[#13306b]"
                    asChild
                  >
                    <a href="tel:+14107544343" className="flex items-center justify-center">
                      <Phone className="mr-3 h-5 w-5 text-[#13306b]" />
                      <div className="flex flex-col items-start leading-tight">
                        <span className="text-[9px] tracking-[0.22em] text-[#4f6796]">CALL US</span>
                        <span className="text-[1.2rem] font-black tracking-tight text-[#13306b]">410-754-4343</span>
                      </div>
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          <section className={`${shellClassName} pb-8 pt-0 lg:pb-10`}>
            <h3 className="hero-mock-title text-center text-[1.8rem] font-black uppercase text-[#13306b]">
              We Accept Most Major Insurance Plans
            </h3>
            <div className="mt-8 grid grid-cols-2 items-center gap-x-10 gap-y-8 md:grid-cols-3 xl:grid-cols-6">
              {insuranceLogos.map((logo) => (
                <div key={logo.name} className="flex justify-center">
                  <img src={logo.src} alt={logo.name} className="h-9 w-auto object-contain opacity-100" />
                </div>
              ))}
            </div>
            <p className="mt-5 text-center text-sm font-bold text-[#4f6796]">...and many more.</p>
          </section>
        </main>
        <PublicSiteFooter />
        <AppointmentRequestDialog open={appointmentOpen} onOpenChange={setAppointmentOpen} />
      </div>
    );
  }

  if (!slug) {
    return (
      <div className="min-h-screen bg-white text-[#13306b]">
        <PublicSiteHeader />
        <main className="bg-white py-10 lg:py-14">
          <section className={shellClassName}>
            <div className="rounded-[24px] border border-[#dde5f4] bg-white p-8 shadow-[0_20px_50px_-42px_rgba(19,48,107,0.4)] lg:p-10">
              <h1 className="hero-mock-title text-[3rem] font-black uppercase leading-none text-[#13306b] lg:text-[4rem]">
                Our {label}
              </h1>
              <div className="mt-4 h-[4px] w-16 rounded-full bg-[#ef2027]" />
              <p className="mt-5 max-w-[620px] text-[1rem] leading-8 text-[#4f6796]">
                Explore our {label.toLowerCase()} and care pathways, then move into the right appointment, registration, or follow-up flow.
              </p>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {items.map((entry) => (
                <article key={entry.slug} className="flex h-full flex-col rounded-[20px] border border-[#dbe4f4] bg-white p-6 shadow-[0_18px_38px_-34px_rgba(19,48,107,0.28)]">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#edf3ff] text-[#13306b]">
                    <entry.icon className="h-8 w-8" />
                  </div>
                  <h2 className="mt-5 text-[1.2rem] font-black leading-tight text-[#13306b]">{entry.title}</h2>
                  <p className="mt-3 text-[0.95rem] leading-7 text-[#4f6796]">{entry.excerpt}</p>
                  <Link to={`/${kind}/${entry.slug}`} className="mt-auto inline-flex items-center gap-2 pt-6 text-[0.82rem] font-black uppercase text-[#ef2027]">
                    Explore
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </article>
              ))}
            </div>
          </section>
        </main>
        <PublicSiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#13306b]">
      <PublicSiteHeader />
      <main className="bg-white py-10 lg:py-14">
        <section className={shellClassName}>
          <div className="grid overflow-hidden rounded-[24px] border border-[#dde5f4] bg-white shadow-[0_20px_50px_-42px_rgba(19,48,107,0.4)] lg:grid-cols-[0.88fr_1.12fr]">
            <div className="flex flex-col justify-center px-7 py-8 lg:px-10 lg:py-10">
              <Link to={`/${kind}`} className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-[#4f6796] hover:text-[#ef2027]">
                <ArrowLeft className="h-4 w-4" />
                Back to {label.toLowerCase()}
              </Link>
              <h1 className="hero-mock-title text-[2.75rem] font-black uppercase leading-none text-[#13306b] lg:text-[3.4rem]">
                {item?.title}
              </h1>
              <p className="mt-5 text-[1rem] leading-8 text-[#4f6796]">{item?.summary || item?.excerpt}</p>
              <div className="mt-7 flex flex-col gap-4 sm:flex-row">
                {item?.primaryAction?.href && (
                  <Button className="btn-mock-red h-12 rounded-md px-7 text-[13px] uppercase" asChild>
                    <Link to={item.primaryAction.href}>{item.primaryAction.label}</Link>
                  </Button>
                )}
                {item?.secondaryAction?.href && (
                  <Button variant="outline" className="h-12 rounded-md border-2 border-[#13306b]/18 px-7 text-[13px] uppercase text-[#13306b]" asChild>
                    <Link to={item.secondaryAction.href}>{item.secondaryAction.label}</Link>
                  </Button>
                )}
              </div>
            </div>
            <div className="relative min-h-[360px] bg-[#f8fbff]">
              <img src={item?.image} alt={item?.title} className="h-full w-full object-contain p-6 lg:p-8" />
            </div>
          </div>
        </section>
      </main>
      <PublicSiteFooter />
    </div>
  );
}

function ServiceCard({ title, icon: Icon, number, description, accent, bullets, badge, href }: ServiceDirectoryCard) {
  return (
    <article className="flex min-h-[408px] flex-col rounded-[18px] border border-[#dbe4f4] bg-white p-6 shadow-[0_18px_38px_-34px_rgba(19,48,107,0.28)] transition-all hover:shadow-mock">
      <div
        className={cn(
          "mx-auto flex h-[74px] w-[74px] items-center justify-center rounded-full",
          accent === "red" ? "bg-[#fff2f2] text-[#ef2027]" : "bg-[#edf3ff] text-[#13306b]",
        )}
      >
        <Icon className="h-9 w-9" />
      </div>
      <h3 className="mt-5 text-center text-[1.08rem] font-black leading-tight text-[#13306b]">
        {number} {title}
      </h3>
      {badge && (
        <div className="mt-3 text-center">
          <span
            className={cn(
              "rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em]",
              accent === "red" ? "bg-[#fff2f2] text-[#ef2027]" : "bg-[#edf3ff] text-[#13306b]",
            )}
          >
            {badge}
          </span>
        </div>
      )}
      <p className="mt-4 text-center text-[0.86rem] leading-6 text-[#4f6796]">{description}</p>
      <ul className="mt-5 space-y-2.5 text-left">
        {bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-2 text-[0.82rem] leading-5 text-[#13306b]">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#13306b]" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
      <Link to={href} className="mt-auto inline-flex items-center gap-2 pt-6 text-[0.82rem] font-black uppercase text-[#ef2027]">
        Learn More
        <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  );
}
