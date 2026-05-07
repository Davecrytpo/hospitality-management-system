import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  HandHeart,
  Heart,
  HeartHandshake,
  Lock,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Target,
  UserRound,
  Users2,
  type LucideIcon,
} from "lucide-react";

import aboutHeroImage from "@/assets/about-hero-design-cleaner.png";
import aboutBuildingImage from "@/assets/about-building-design.png";
import insuranceAetna from "@/assets/insurance-aetna.svg";
import insuranceBcbs from "@/assets/insurance-bcbs.svg";
import insuranceCareFirst from "@/assets/insurance-carefirst.svg";
import insuranceCigna from "@/assets/insurance-cigna.svg";
import insuranceMedicare from "@/assets/insurance-medicare.svg";
import insuranceUnited from "@/assets/insurance-unitedhealthcare.svg";
import { AppointmentRequestDialog } from "@/components/landing/AppointmentRequestDialog";
import { PublicSiteHeader } from "@/components/landing/PublicSiteHeader";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type IconCard = {
  title: string;
  icon: LucideIcon;
  accent: "blue" | "red";
};

type FeaturePanel = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const heroHighlights: IconCard[] = [
  { title: "Patient Centered", icon: UserRound, accent: "blue" },
  { title: "Quality Care", icon: ShieldCheck, accent: "red" },
  { title: "Integrated Care", icon: HeartHandshake, accent: "blue" },
  { title: "Stronger Together", icon: Heart, accent: "red" },
];

const featurePanels: FeaturePanel[] = [
  {
    title: "Experienced Providers",
    description: "Our team brings years of experience and a passion for patient care.",
    icon: CalendarDays,
  },
  {
    title: "Convenient Locations",
    description: "Multiple locations to serve you and your family better.",
    icon: MapPin,
  },
  {
    title: "On-Time, Every Time",
    description: "We respect your time with efficient scheduling and timely appointments.",
    icon: Clock3,
  },
  {
    title: "Comprehensive Healthcare",
    description: "We provide complete, coordinated care for your whole health and well-being.",
    icon: HeartHandshake,
  },
];

const insuranceLogos = [
  { name: "Aetna", src: insuranceAetna, className: "h-8 sm:h-9" },
  { name: "United Healthcare", src: insuranceUnited, className: "h-9 sm:h-10" },
  { name: "CareFirst", src: insuranceCareFirst, className: "h-9 sm:h-10" },
  { name: "Cigna", src: insuranceCigna, className: "h-9 sm:h-10" },
  { name: "Blue Cross Blue Shield", src: insuranceBcbs, className: "h-9 sm:h-10" },
  { name: "Medicare", src: insuranceMedicare, className: "h-7 sm:h-8" },
];

const communityBullets = [
  "Culturally sensitive care",
  "Affordable & accessible services",
  "Accept most major insurance plans",
  "Telehealth available for eligible services",
];

function SectionAccentLine() {
  return <div className="mt-3 h-[4px] w-16 rounded-full bg-[#ef2027]" />;
}

function OutlineIcon({ icon: Icon, accent }: IconCard) {
  return (
    <div
      className={cn(
        "flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full border",
        accent === "red" ? "border-[#ffd3d4] bg-[#fff7f7] text-[#ef2027]" : "border-[#dce5f6] bg-[#f7faff] text-[#13306b]",
      )}
    >
      <Icon className="h-7 w-7" strokeWidth={1.8} />
    </div>
  );
}

function FeaturePanelCard({ title, description, icon: Icon }: FeaturePanel) {
  return (
    <div className="flex items-start gap-5 px-6 py-7 xl:px-8">
      <div className="flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-full border border-[#1ba1ff] text-white">
        <Icon className="h-7 w-7" strokeWidth={1.9} />
      </div>
      <div>
        <h3 className="text-[1.05rem] font-black leading-tight text-white sm:text-[1.1rem]">{title}</h3>
        <p className="mt-3 max-w-[235px] text-[0.94rem] leading-7 text-white/88">{description}</p>
      </div>
    </div>
  );
}

export default function PublicAboutPage() {
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const shellClassName = "mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8";

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(19,48,107,0.07),transparent_24%),radial-gradient(circle_at_top_right,_rgba(239,32,39,0.04),transparent_18%),#ffffff] text-[#13306b]">
      <PublicSiteHeader />

      <main className="overflow-x-hidden bg-transparent">
        <section className="pt-4 lg:pt-7">
          <div className={`${shellClassName} relative`}>
            <div className="mb-4 hidden justify-end lg:flex">
              <a href="tel:+14107544343" className="inline-flex items-center gap-3 whitespace-nowrap text-[#13306b] transition-colors hover:text-[#ef2027]">
                <Phone className="h-6 w-6" strokeWidth={2.2} />
                <span className="text-[2.15rem] font-black tracking-tight">410-754-4343</span>
              </a>
            </div>

            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-start lg:gap-8 xl:gap-10">
              <div className="pt-2 lg:pt-7">
                <div className="max-w-[480px]">
                  <h1 className="hero-mock-title text-[3.25rem] font-black uppercase leading-[0.9] tracking-tight text-[#13306b] sm:text-[3.9rem] lg:text-[4.55rem]">
                    About Us
                  </h1>
                  <SectionAccentLine />
                  <p className="mt-6 text-[1rem] leading-8 text-[#13306b] sm:text-[1.02rem]">
                    At On Time Medical Group, we provide high-quality,
                    <strong className="font-black"> compassionate healthcare </strong>
                    that&apos;s on time,
                    <strong className="font-black"> every time.</strong>
                    <br />
                    We&apos;re here to support you and your family on your health journey - today and for years to come.
                  </p>
                </div>
              </div>

              <div className="relative z-10 flex justify-center lg:justify-end">
                <div className="relative w-full overflow-hidden rounded-[28px] shadow-[0_26px_60px_-40px_rgba(19,48,107,0.42)]">
                  <img
                    src={aboutHeroImage}
                    alt="Doctor speaking with a patient during an appointment"
                    className="w-full object-cover object-center"
                    loading="eager"
                  />
                  <div className="absolute bottom-0 left-0 h-[96px] w-[52px] rounded-tr-[20px] bg-white sm:h-[106px] sm:w-[60px]" />
                </div>
              </div>
            </div>

            <div className="relative z-20 mt-7 overflow-hidden rounded-[22px] border border-[#e7edf8] bg-white shadow-[0_24px_56px_-38px_rgba(19,48,107,0.32)] lg:-mt-14 lg:max-w-[636px]">
              <div className="grid grid-cols-2 md:grid-cols-4">
                {heroHighlights.map((item, index) => (
                  <div
                    key={item.title}
                    className={cn(
                      "flex items-center gap-3 px-4 py-5 sm:px-5",
                      index < heroHighlights.length - 1 && "border-b border-[#eef3fb] md:border-b-0 md:border-r",
                    )}
                  >
                    <OutlineIcon {...item} />
                    <p className="text-[0.92rem] font-black leading-7 text-[#13306b]">{item.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={`${shellClassName} pt-5`}>
          <div className="grid overflow-hidden rounded-[24px] bg-[#10306a] text-white shadow-[0_26px_58px_-42px_rgba(16,48,106,0.6)] lg:grid-cols-4">
            {featurePanels.map((item, index) => (
              <div key={item.title} className={cn(index < featurePanels.length - 1 && "border-b border-white/12 lg:border-b-0 lg:border-r lg:border-white/14")}>
                <FeaturePanelCard {...item} />
              </div>
            ))}
          </div>
        </section>

        <section className={`${shellClassName} py-6 lg:py-7`}>
          <div className="grid gap-5 lg:items-start lg:grid-cols-[0.96fr_0.88fr_0.88fr_1fr]">
            <article className="self-start overflow-hidden rounded-[22px] border border-[#dfe7f5] bg-white shadow-[0_22px_48px_-38px_rgba(19,48,107,0.3)]">
              <img src={aboutBuildingImage} alt="On Time Medical Group building exterior" className="h-auto w-full" loading="lazy" />
            </article>

            <article className="relative overflow-hidden rounded-[22px] border border-[#dfe7f5] bg-white px-6 py-6 shadow-[0_22px_48px_-38px_rgba(19,48,107,0.3)] sm:px-7">
              <div className="flex items-center gap-3 text-[#13306b]">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f3f7ff] text-[#13306b]">
                  <Target className="h-6 w-6" strokeWidth={2} />
                </div>
                <div>
                  <h2 className="hero-mock-title text-[1.75rem] font-black uppercase leading-none text-[#13306b]">Our Mission</h2>
                  <div className="mt-2 h-[3px] w-10 rounded-full bg-[#ef2027]" />
                </div>
              </div>
              <p className="mt-8 text-[1rem] leading-8 text-[#13306b]">
                To deliver timely, accessible, and comprehensive healthcare that empowers individuals and families to live healthier,
                fuller lives.
              </p>
              <Heart className="pointer-events-none absolute bottom-5 right-7 h-16 w-16 text-[#dfe5ff]" strokeWidth={1.3} />
            </article>

            <article className="rounded-[22px] border border-[#dfe7f5] bg-white px-6 py-6 shadow-[0_22px_48px_-38px_rgba(19,48,107,0.3)] sm:px-7">
              <div className="flex items-center gap-3 text-[#13306b]">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f3f7ff] text-[#13306b]">
                  <Users2 className="h-6 w-6" strokeWidth={2} />
                </div>
                <div>
                  <h2 className="hero-mock-title text-[1.75rem] font-black uppercase leading-none text-[#13306b]">Our Story</h2>
                  <div className="mt-2 h-[3px] w-10 rounded-full bg-[#ef2027]" />
                </div>
              </div>
              <p className="mt-8 text-[1rem] leading-8 text-[#13306b]">
                On Time Medical Group was founded with a simple belief: everyone deserves quality care - on time, every time. We bring
                together experienced providers and a wide range of services under one roof to meet your needs at every stage of life.
              </p>
            </article>

            <article className="rounded-[22px] border border-[#dfe7f5] bg-white px-6 py-6 shadow-[0_22px_48px_-38px_rgba(19,48,107,0.3)] sm:px-7">
              <div className="flex items-center gap-3 text-[#13306b]">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f3f7ff] text-[#13306b]">
                  <HandHeart className="h-6 w-6" strokeWidth={2} />
                </div>
                <div>
                  <h2 className="hero-mock-title text-[1.7rem] font-black uppercase leading-none text-[#13306b] sm:text-[1.75rem]">
                    We Care For
                    <br />
                    Our Community
                  </h2>
                  <div className="mt-2 h-[3px] w-10 rounded-full bg-[#ef2027]" />
                </div>
              </div>

              <ul className="mt-7 space-y-3">
                {communityBullets.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[0.98rem] leading-7 text-[#13306b]">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#13306b]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-9 text-center">
                <Heart className="mx-auto h-7 w-7 text-[#ef2027]" strokeWidth={1.8} />
                <Users2 className="mx-auto mt-1 h-12 w-12 text-[#13306b]/85" strokeWidth={1.8} />
                <p className="mx-auto mt-2 max-w-[250px] text-[0.92rem] leading-6 text-[#13306b]">
                  Proudly serving our neighbors and strengthening the communities we call home.
                </p>
              </div>
            </article>
          </div>
        </section>

        <section className={`${shellClassName} pb-4 pt-3`}>
          <div className="flex items-center justify-center gap-4 sm:gap-6">
            <div className="h-px flex-1 max-w-[110px] bg-[#d9e2f3]" />
            <h2 className="hero-mock-title text-center text-[1.6rem] font-black uppercase leading-none text-[#13306b] sm:text-[1.85rem]">
              We Accept Most Major Insurance Plans
            </h2>
            <div className="h-px flex-1 max-w-[110px] bg-[#d9e2f3]" />
          </div>

          <div className="mt-7 grid grid-cols-2 items-center gap-x-10 gap-y-7 md:grid-cols-3 xl:grid-cols-6">
            {insuranceLogos.map((logo) => (
              <div key={logo.name} className="flex min-h-[40px] items-center justify-center">
                <img src={logo.src} alt={`${logo.name} logo`} className={cn("w-auto max-w-full object-contain", logo.className)} loading="lazy" />
              </div>
            ))}
          </div>
          <p className="mt-3 text-center text-sm font-bold text-[#13306b]">...and many more.</p>
        </section>

        <section className={`${shellClassName} pb-4 pt-5`}>
          <div className="grid overflow-hidden rounded-[24px] bg-[#10306a] text-white shadow-[0_26px_58px_-42px_rgba(16,48,106,0.6)] lg:grid-cols-[1.02fr_0.86fr_0.96fr_1fr]">
            <div className="flex items-center gap-4 border-b border-white/12 px-6 py-6 lg:border-b-0 lg:border-r lg:px-8">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/24">
                <CalendarDays className="h-6 w-6" />
              </div>
              <div>
                <p className="text-[1.15rem] font-black leading-tight">Ready to Take the Next Step?</p>
                <p className="mt-2 text-[0.95rem] leading-6 text-white/76">We&apos;re here to help you live a healthier, happier life.</p>
              </div>
            </div>

            <div className="flex items-center gap-4 border-b border-white/12 px-6 py-6 lg:border-b-0 lg:border-r lg:px-8">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/24">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/55">Call Us Today</p>
                <a href="tel:+14107544343" className="mt-1 block whitespace-nowrap text-[1.8rem] font-black leading-none tracking-tight">
                  410-754-4343
                </a>
                <p className="mt-2 text-[0.95rem] leading-6 text-white/76">Our team is here to help you.</p>
              </div>
            </div>

            <div className="flex flex-col justify-center border-b border-white/12 px-6 py-6 lg:border-b-0 lg:border-r lg:px-8">
              <Button className="btn-mock-red h-12 rounded-md text-[12px] uppercase tracking-[0.04em]" onClick={() => setAppointmentOpen(true)}>
                <span className="inline-flex items-center gap-2">
                  Book Appointment Now
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Button>
              <p className="mt-3 text-[0.95rem] leading-6 text-white/76">Appointments available in-office or via telehealth.</p>
            </div>

            <div className="flex items-center gap-4 px-6 py-6 lg:px-8">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/24">
                <Lock className="h-6 w-6" />
              </div>
              <div>
                <p className="text-[1.08rem] font-black leading-tight">Patient Portal Login</p>
                <p className="mt-2 max-w-[250px] text-[0.95rem] leading-6 text-white/76">
                  Access your health information, appointments, and more.
                </p>
                <Link
                  to="/patient-portal/login"
                  className="mt-3 inline-flex items-center gap-2 text-[0.82rem] font-black uppercase tracking-[0.08em] text-white transition-colors hover:text-white/80"
                >
                  Login Now
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-4 overflow-hidden rounded-[18px] border border-[#e4e9f5] bg-[#f8faff] shadow-[0_18px_40px_-36px_rgba(19,48,107,0.18)]">
            <div className="grid divide-y divide-[#e0e6f3] text-[#13306b] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              <div className="flex items-center justify-center gap-3 px-5 py-4 text-center text-[0.95rem] font-medium">
                <MapPin className="h-5 w-5 shrink-0" />
                <span>9010 Pulaski Highway, Baltimore, MD 21237</span>
              </div>
              <div className="flex items-center justify-center gap-3 px-5 py-4 text-center text-[0.95rem] font-medium">
                <Phone className="h-5 w-5 shrink-0" />
                <a href="tel:+14107544343" className="hover:text-[#ef2027]">
                  410-754-4343
                </a>
              </div>
              <div className="flex items-center justify-center gap-3 px-5 py-4 text-center text-[0.95rem] font-medium">
                <Mail className="h-5 w-5 shrink-0" />
                <a href="mailto:info@ontimemedgroup.com" className="hover:text-[#ef2027]">
                  info@ontimemedgroup.com
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <AppointmentRequestDialog open={appointmentOpen} onOpenChange={setAppointmentOpen} />
    </div>
  );
}
