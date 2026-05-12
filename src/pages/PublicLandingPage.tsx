import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpenText,
  Calendar,
  Check,
  ChevronRight,
  FileText,
  HeartHandshake,
  HeartPulse,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
  UserRound,
} from "lucide-react";
import insuranceAetna from "@/assets/insurance-aetna.svg";
import insuranceBcbs from "@/assets/insurance-bcbs.svg";
import insuranceCareFirst from "@/assets/insurance-carefirst.svg";
import insuranceCigna from "@/assets/insurance-cigna.svg";
import insuranceMedicare from "@/assets/insurance-medicare.svg";
import insuranceUnited from "@/assets/insurance-unitedhealthcare.svg";
import logoImage from "@/assets/logo-ontime.png";
import blogUrgentImage from "@/assets/mockup-blog-urgent.jpg";
import blogWellnessImage from "@/assets/mockup-blog-wellness.jpg";
import buildingImage from "@/assets/mockup-building.jpg";
import heroImage from "@/assets/mockup-hero-doctor-patient.jpg";
import resourcesImage from "@/assets/mockup-resources-woman.jpg";
import { AppointmentRequestDialog } from "@/components/landing/AppointmentRequestDialog";
import { PublicSiteHeader } from "@/components/landing/PublicSiteHeader";
import { Button } from "@/components/ui/button";
import { cmsDefaults } from "@/features/cms/defaults";
import { useCmsBlogPosts, useCmsPage, useCmsServices, useCmsSiteSettings, useCmsTestimonials } from "@/features/cms/hooks";
import { buildServiceDirectoryCard, findSectionByName, findSectionByType } from "@/features/cms/originalSiteAdapters";
import { pageLooksLikePlaceholder, preferPublicCopy, settingsTextLooksLikePlaceholder } from "@/features/cms/publicContent";
import { useCmsSeo } from "@/features/cms/seo";
import { cn } from "@/lib/utils";

const trustHighlights = [
  { title: "Same-Day Appointments Available", icon: Calendar },
  { title: "Most Insurance Plans Accepted", icon: ShieldCheck, isAccent: true },
  { title: "All-in-One Care Mind, Body, You.", icon: UserRound },
  { title: "Convenient Locations Near You", icon: MapPin },
  { title: "Compassionate Care, Every Step of the Way", icon: HeartHandshake },
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

const resourceLinks = [
  { label: "New Patient Forms", href: "/patient-register" },
  { label: "Patient Portal", href: "/patient-portal/login" },
  { label: "FAQs", href: "/faq" },
  { label: "Health Tips", href: "/blog" },
];

const insuranceLogos = [
  { name: "Aetna", src: insuranceAetna },
  { name: "United Healthcare", src: insuranceUnited },
  { name: "CareFirst", src: insuranceCareFirst },
  { name: "Cigna", src: insuranceCigna },
  { name: "Blue Cross Blue Shield", src: insuranceBcbs },
  { name: "Medicare", src: insuranceMedicare },
];

const defaultHeroTitle = "Comprehensive Healthcare That's On Time. Every Time.";

function splitHeroTitle(title: string) {
  if (title === defaultHeroTitle) {
    return ["Comprehensive", "Healthcare That's", "On Time. Every Time."];
  }

  const lines = title
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return lines.length > 0 ? lines : [title];
}

function renderHeroLine(line: string) {
  const accent = "On Time.";
  const accentIndex = line.indexOf(accent);

  if (accentIndex === -1) return line;

  return (
    <>
      {line.slice(0, accentIndex)}
      <span className="text-[#ef2027]">{accent}</span>
      {line.slice(accentIndex + accent.length)}
    </>
  );
}

export default function PublicLandingPage() {
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const shellClassName = "mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8";
  const { data: cmsPage } = useCmsPage("home");
  const { data: cmsServices = [] } = useCmsServices();
  const { data: cmsPosts = [] } = useCmsBlogPosts();
  const { data: cmsTestimonials = [] } = useCmsTestimonials({ pageSlug: "home" });
  const { data: cmsSettings } = useCmsSiteSettings();

  const fallbackPage = cmsDefaults.pages.find((page) => page.slug === "home") ?? cmsDefaults.pages[0];
  const page = cmsPage && !pageLooksLikePlaceholder(cmsPage) ? cmsPage : fallbackPage;
  const settings = cmsSettings && !settingsTextLooksLikePlaceholder(cmsSettings) ? cmsSettings : cmsDefaults.settings;
  const services = cmsServices.length > 0 ? cmsServices : cmsDefaults.services;
  const posts = cmsPosts.length > 0 ? cmsPosts : cmsDefaults.posts;
  const testimonials = cmsTestimonials.length > 0 ? cmsTestimonials : cmsDefaults.testimonials.filter((entry) => entry.pageSlug === "home");

  useCmsSeo(page?.seo, settings);

  const heroSection = findSectionByType(page.sections, "hero");
  const aboutSection = findSectionByName(page.sections, /why choose us|about/i) ?? findSectionByType(page.sections, "richText");
  const statsSection = findSectionByType(page.sections, "stats");
  const resourcesSection = findSectionByName(page.sections, /resource/i);
  const telehealthSection = findSectionByName(page.sections, /telehealth|quick access/i);
  const serviceSection = findSectionByType(page.sections, "serviceList");
  const blogSection = findSectionByType(page.sections, "blogFeed");
  const testimonialSection = findSectionByType(page.sections, "testimonialList");
  const insuranceSection = findSectionByType(page.sections, "gallery");
  const contactSection = findSectionByType(page.sections, "cta");

  const phoneLabel = settings.contact.phone || "410-754-4343";
  const emailLabel = settings.contact.email || "care@ontimemedical.com";
  const addressLabel = settings.contact.address || "1500 Wellness Avenue, Medical District";
  const brandLogo = settings.brand.logo.url || logoImage;
  const brandAlt = settings.brand.logo.alt || settings.brand.siteName || "On Time Medical Group";
  const brandName = settings.brand.siteName || "On Time Medical Group";
  const brandTagline = settings.brand.tagline || "Compassionate care. Clear access. Reliable follow-through.";

  const heroTitle = preferPublicCopy(heroSection?.title, defaultHeroTitle);
  const heroLines = splitHeroTitle(heroTitle);
  const displayedHighlights =
    heroSection?.items.length
      ? heroSection.items.slice(0, 5).map((item, index) => ({
          title: item.title,
          icon: trustHighlights[index]?.icon ?? Calendar,
          isAccent: item.badge?.toLowerCase().includes("red") ?? trustHighlights[index]?.isAccent,
        }))
      : trustHighlights;
  const homeServiceCards = useMemo(
    () =>
      services
        .filter((service) => service.featuredOnHome)
        .sort((left, right) => left.sortOrder - right.sortOrder)
        .slice(0, 6)
        .map((service, index) => buildServiceDirectoryCard(service, index)),
    [services],
  );
  const displayedStats =
    statsSection?.items.length
      ? statsSection.items.slice(0, 4).map((item, index) => ({
          value: item.value || stats[index]?.value || "",
          label: item.title || stats[index]?.label || "",
          icon: stats[index]?.icon ?? UserRound,
        }))
      : stats;
  const displayedWhyChooseUs =
    aboutSection?.items.length
      ? aboutSection.items.slice(0, 4).map((item) => item.title || item.description || "")
      : whyChooseUs;
  const displayedResourceLinks =
    resourcesSection?.items.length
      ? resourcesSection.items.map((item, index) => ({
          label: item.title,
          href: item.href || resourceLinks[index]?.href || "/patient-register",
        }))
      : resourceLinks;
  const displayedPosts = [...posts].sort((left, right) => left.sortOrder - right.sortOrder).slice(0, 2);
  const featuredTestimonial =
    [...testimonials].sort((left, right) => left.sortOrder - right.sortOrder)[0] ??
    cmsDefaults.testimonials.find((entry) => entry.pageSlug === "home") ??
    cmsDefaults.testimonials[0];
  const insuranceItems =
    insuranceSection?.items.length
      ? insuranceSection.items.map((item) => ({
          name: item.title,
          src: item.image?.url ?? "",
        }))
      : insuranceLogos;
  const telehealthTitle = preferPublicCopy(telehealthSection?.items[0]?.title, "Telehealth available for eligible services.");
  const telehealthBody = preferPublicCopy(telehealthSection?.items[0]?.description, "Connect with your care team from the comfort of your home.");
  const contactTitle = preferPublicCopy(contactSection?.title, "Ready to Take the Next Step?");
  const contactBody = preferPublicCopy(contactSection?.body, "We're here to help you live a healthier, happier life on your time.");
  const contactButtonLabel = preferPublicCopy(contactSection?.buttons[0]?.label, "Book Appointment");
  const aboutTitle = preferPublicCopy(aboutSection?.title, "Why Choose Us?");
  const aboutEyebrow = preferPublicCopy(aboutSection?.eyebrow, "About On Time Medical Group");
  const aboutBody = preferPublicCopy(
    aboutSection?.body,
    "We're more than a healthcare provider - we're your partner in health. Our patient-centered approach ensures you get the right care, at the right time, every time.",
  );
  const serviceHeading = preferPublicCopy(serviceSection?.title, "Our Services");
  const serviceSubtitle = preferPublicCopy(serviceSection?.subtitle, "Comprehensive care for you and your family - at every stage of life.");

  return (
    <div className="min-h-screen bg-white text-[#13306b]">
      <PublicSiteHeader />

      <main className="overflow-x-hidden bg-white">
        <section className="overflow-visible pt-4 lg:pt-7">
          <div className={`${shellClassName} relative`}>
            <div className="mb-4 hidden justify-end lg:flex">
              <a href={`tel:+1${phoneLabel.replace(/\D/g, "")}`} className="inline-flex items-center gap-3 whitespace-nowrap text-[#13306b] transition-colors hover:text-[#ef2027]">
                <Phone className="h-6 w-6" strokeWidth={2.2} />
                <span className="text-[2.15rem] font-black tracking-tight">{phoneLabel}</span>
              </a>
            </div>

            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-start lg:gap-8 xl:gap-10">
              <div className="pt-2 lg:pt-4">
                <div className="max-w-[550px]">
                  <h1 className="hero-mock-title text-[3rem] font-black uppercase leading-[0.92] tracking-tight text-[#13306b] sm:text-[3.55rem] md:text-[3.85rem] lg:text-[4rem] xl:text-[4.28rem]">
                    {heroLines.map((line) => (
                      <span key={line} className="block">
                        {renderHeroLine(line)}
                      </span>
                    ))}
                  </h1>
                  <p className="mt-6 max-w-[520px] text-[1rem] leading-8 text-[#4f6796] lg:text-[1.04rem]">
                    {preferPublicCopy(
                      heroSection?.body,
                      "On Time Medical Group provides comprehensive primary care, mental health, and substance use treatment with compassion, convenience, and a commitment to your well-being.",
                    )}
                  </p>

                  <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                    <Button className="btn-mock-red h-14 min-w-[220px] rounded-md px-7 text-[13px] font-bold uppercase shadow-lg shadow-[#ef2027]/15" onClick={() => setAppointmentOpen(true)}>
                      <span className="inline-flex items-center">
                        {preferPublicCopy(heroSection?.buttons[0]?.label, "Book Appointment")}
                        <ArrowRight className="ml-3 h-4 w-4" />
                      </span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-14 min-w-[220px] rounded-md border-2 border-[#13306b]/15 bg-white px-7 text-[13px] font-bold uppercase"
                      asChild
                    >
                      <a href={`tel:+1${phoneLabel.replace(/\D/g, "")}`} className="flex items-center justify-center">
                        <Phone className="mr-3 h-5 w-5 text-[#13306b]" />
                        <div className="flex flex-col items-start leading-tight">
                          <span className="text-[9px] tracking-[0.22em] text-[#4f6796]">CALL US</span>
                          <span className="text-[1.2rem] font-black tracking-tight text-[#13306b]">{phoneLabel}</span>
                        </div>
                      </a>
                    </Button>
                  </div>

                  <div className="mt-8 flex max-w-[470px] items-start gap-4 rounded-[18px] border border-[#dce6f5] bg-[#f4f8ff] p-5 shadow-[0_18px_38px_-36px_rgba(19,48,107,0.45)]">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#13306b] shadow-sm">
                      <BookOpenText className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[1rem] font-black text-[#13306b]">{telehealthTitle}</p>
                      <p className="mt-1 text-sm leading-6 text-[#4f6796]">{telehealthBody}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative z-10 flex justify-center lg:justify-end">
                <div className="w-full overflow-hidden rounded-[28px] shadow-[0_28px_60px_-40px_rgba(19,48,107,0.42)]">
                  <img src={heroSection?.image?.url || heroImage} alt={heroSection?.image?.alt || "Doctor discussing care plan with a patient"} className="w-full object-cover object-center" loading="eager" />
                </div>
              </div>
            </div>

            <div className="relative z-20 mt-8 rounded-[22px] bg-[#13306b] px-2 py-1 text-white shadow-mock lg:-mt-10">
              <div className="grid sm:grid-cols-2 lg:grid-cols-5">
                {displayedHighlights.map((item, index) => (
                  <div
                    key={item.title}
                    className={`flex items-center gap-4 px-5 py-6 ${
                      index < displayedHighlights.length - 1 ? "border-b border-white/10 lg:border-b-0 lg:border-r lg:border-white/15" : ""
                    }`}
                  >
                    <div
                      className={cn(
                        "flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-white/30 bg-white/5",
                        item.isAccent && "border-[#ef2027]/45 bg-[#ef2027]/12 text-[#ef2027]",
                      )}
                    >
                      <item.icon className="h-6 w-6" />
                    </div>
                    <p className="text-[0.95rem] font-bold leading-snug text-white">{item.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="services" className={`${shellClassName} py-14 lg:py-16`}>
          <div className="text-center">
            <h2 className="hero-mock-title text-[2.75rem] font-black uppercase leading-none tracking-tight text-[#13306b] sm:text-[3rem]">{serviceHeading}</h2>
            <div className="mx-auto mt-3 h-[4px] w-16 rounded-full bg-[#ef2027]" />
            <p className="mt-5 text-[1rem] font-medium text-[#4f6796] lg:text-[1.06rem]">{serviceSubtitle}</p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {homeServiceCards.map((service) => (
              <article
                key={service.href}
                className="flex min-h-[282px] flex-col rounded-[18px] border border-[#dbe4f4] bg-white px-5 py-8 text-center shadow-[0_18px_40px_-34px_rgba(19,48,107,0.28)] transition-all hover:shadow-mock"
              >
                <div className={cn("mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-full", service.accent === "red" ? "bg-[#fff2f2] text-[#ef2027]" : "bg-[#edf3ff] text-[#13306b]")}>
                  <service.icon className="h-9 w-9" strokeWidth={1.8} />
                </div>
                <h3 className="mt-6 text-[1.08rem] font-black leading-tight text-[#13306b]">
                  {service.number} {service.title}
                </h3>
                <p className="mt-4 text-[0.86rem] leading-6 text-[#4f6796]">{service.description}</p>
                <Link to={service.href} className="mt-auto inline-flex items-center justify-center gap-2 pt-7 text-[0.8rem] font-black uppercase text-[#ef2027]">
                  Learn More
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Button className="btn-mock-navy h-12 rounded-md px-10 text-[13px] font-bold uppercase shadow-lg shadow-[#13306b]/18" asChild>
              <Link to="/services">{preferPublicCopy(serviceSection?.buttons[0]?.label, "View All Services")}</Link>
            </Button>
          </div>
        </section>

        <section id="about" className={`${shellClassName} py-4 lg:py-6`}>
          <div className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
            <div className="overflow-hidden rounded-[22px] border border-[#dde5f4] shadow-[0_24px_58px_-42px_rgba(19,48,107,0.4)]">
              <img src={aboutSection?.image?.url || buildingImage} alt={aboutSection?.image?.alt || "On Time Medical Group building exterior"} className="w-full object-contain" loading="lazy" />
            </div>

            <div className="relative">
              <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#ef2027]">{aboutEyebrow}</p>
              <h2 className="mt-3 hero-mock-title text-[3rem] font-black leading-none tracking-tight text-[#13306b] lg:text-[3.6rem]">{aboutTitle}</h2>
              <p className="mt-5 max-w-[520px] text-[1rem] leading-8 text-[#4f6796] lg:text-[1.04rem]">{aboutBody}</p>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                {displayedWhyChooseUs.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#13306b] text-white">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    <span className="text-[0.95rem] font-bold leading-7 text-[#13306b]">{item}</span>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="mt-8 h-12 rounded-md border-2 border-[#13306b]/18 px-7 text-[13px] font-bold uppercase shadow-sm" asChild>
                <Link to={aboutSection?.buttons[0]?.href || "/about-us"}>{preferPublicCopy(aboutSection?.buttons[0]?.label, "Learn More About Us")}</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className={`${shellClassName} py-8 lg:py-10`}>
          <div className="rounded-[20px] border border-[#dde5f4] bg-[#eef4ff] shadow-[0_18px_38px_-34px_rgba(19,48,107,0.22)]">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4">
              {displayedStats.map((item, index) => (
                <div
                  key={item.label}
                  className={`flex items-center justify-center gap-4 px-6 py-6 ${
                    index < displayedStats.length - 1 ? "border-b border-[#d7e2f5] sm:border-b-0 lg:border-r" : ""
                  }`}
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#c7d4eb] bg-white text-[#13306b]">
                    <item.icon className="h-7 w-7" />
                  </div>
                  <div className="min-w-[132px]">
                    <p className="text-[2rem] font-black leading-none tracking-tight text-[#13306b]">{item.value}</p>
                    <p className="mt-1 text-[0.98rem] font-bold text-[#4f6796]">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="resources" className={`${shellClassName} py-2 lg:py-4`}>
          <div className="grid gap-6 lg:grid-cols-3">
            <article className="rounded-[18px] border border-[#dbe4f4] bg-white p-6 shadow-[0_18px_38px_-34px_rgba(19,48,107,0.28)] lg:p-7">
              <div className="flex items-center gap-3 text-[#13306b]">
                <BookOpenText className="h-5 w-5" />
                <h3 className="hero-mock-title text-[1.7rem] font-black uppercase leading-none">{preferPublicCopy(resourcesSection?.title, "Patient Resources")}</h3>
              </div>
              <div className="mt-5 grid gap-5 md:grid-cols-[1fr_150px] md:items-end">
                <div>
                  <p className="text-[0.95rem] leading-7 text-[#4f6796]">{preferPublicCopy(resourcesSection?.body, "Everything you need to manage your care, all in one place.")}</p>
                  <div className="mt-5 space-y-2.5">
                    {displayedResourceLinks.map((item) => (
                      <Link key={item.label} to={item.href} className="flex items-center gap-2 text-[0.93rem] font-bold text-[#13306b] transition-colors hover:text-[#ef2027]">
                        <ChevronRight className="h-4 w-4 text-[#13306b]" />
                        {item.label}
                      </Link>
                    ))}
                  </div>
                  <Link to={resourcesSection?.buttons[0]?.href || "/patient-register"} className="mt-6 inline-flex items-center gap-2 text-[0.82rem] font-black uppercase text-[#ef2027]">
                    {preferPublicCopy(resourcesSection?.buttons[0]?.label, "Explore Resources")}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
                <div className="flex items-end justify-end">
                  <img src={resourcesSection?.image?.url || resourcesImage} alt={resourcesSection?.image?.alt || "Patient using a phone"} className="h-[170px] w-auto max-w-full object-contain" loading="lazy" />
                </div>
              </div>
            </article>

            <article className="rounded-[18px] border border-[#dbe4f4] bg-white p-6 shadow-[0_18px_38px_-34px_rgba(19,48,107,0.28)] lg:p-7">
              <div className="flex items-center gap-3 text-[#13306b]">
                <FileText className="h-5 w-5" />
                <h3 className="hero-mock-title text-[1.7rem] font-black uppercase leading-none">{preferPublicCopy(blogSection?.title, "Latest From Our Blog")}</h3>
              </div>

              <div className="mt-6 space-y-6">
                {displayedPosts.map((post, index) => (
                  <div key={post.slug} className="grid grid-cols-[88px_1fr] gap-4">
                    <img
                      src={post.coverImage?.url || (index === 0 ? blogWellnessImage : blogUrgentImage)}
                      alt={post.coverImage?.alt || post.title}
                      className="h-[78px] w-full rounded-xl object-cover"
                      loading="lazy"
                    />
                    <div>
                      <p className="text-[1rem] font-bold leading-tight text-[#13306b]">{post.title}</p>
                      <Link to={`/blog/${post.slug}`} className="mt-3 inline-flex items-center gap-2 text-[0.8rem] font-black uppercase text-[#ef2027]">
                        Read More
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-[18px] border border-[#dbe4f4] bg-white p-6 shadow-[0_18px_38px_-34px_rgba(19,48,107,0.28)] lg:p-7">
              <div className="flex items-center gap-3 text-[#13306b]">
                <Star className="h-5 w-5 fill-current text-[#13306b]" />
                <h3 className="hero-mock-title text-[1.7rem] font-black uppercase leading-none">{preferPublicCopy(testimonialSection?.title, "What Our Patients Say")}</h3>
              </div>
              <p className="mt-6 text-[1rem] leading-8 text-[#4f6796]">&quot;{featuredTestimonial.quote}&quot;</p>
              <div className="mt-6 flex items-center gap-1 text-[#f7b500]">
                {Array.from({ length: featuredTestimonial.rating }).map((_, index) => (
                  <Star key={index} className="h-5 w-5 fill-current" />
                ))}
                <span className="ml-3 text-[0.98rem] font-bold text-[#13306b]">{featuredTestimonial.name}</span>
              </div>
              <div className="mt-8 flex items-center gap-2 text-sm font-bold text-[#13306b]">
                <span>View More Reviews on</span>
                <div className="flex items-center gap-0.5 text-[2rem] font-black">
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

        <section id="insurance" className={`${shellClassName} py-10 lg:py-12`}>
          <h3 className="hero-mock-title text-center text-[1.85rem] font-black uppercase leading-none text-[#13306b]">
            {preferPublicCopy(insuranceSection?.title, "We Accept Most Major Insurance Plans")}
          </h3>
          <div className="mt-9 grid grid-cols-2 items-center gap-x-10 gap-y-8 md:grid-cols-3 xl:grid-cols-6">
            {insuranceItems.map((insurance) => (
              <div key={insurance.name} className="flex min-h-[42px] items-center justify-center">
                <img src={insurance.src} alt={`${insurance.name} logo`} className="h-9 w-auto max-w-full object-contain opacity-100" />
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-sm font-bold text-[#4f6796]">{preferPublicCopy(insuranceSection?.body, "...and many more.")}</p>
        </section>

        <section id="contact" className={`${shellClassName} pb-10 pt-2`}>
          <div className="grid overflow-hidden rounded-[22px] bg-[#13306b] text-white lg:grid-cols-[1.12fr_1fr_0.88fr]">
            <div className="flex items-center gap-5 border-b border-white/10 px-7 py-8 lg:border-b-0 lg:border-r">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-white/20">
                <Calendar className="h-7 w-7" />
              </div>
              <div>
                <p className="text-[1.18rem] font-black leading-tight lg:whitespace-nowrap xl:text-[1.35rem]">{contactTitle}</p>
                <p className="mt-2 text-sm leading-6 text-white/75">{contactBody}</p>
              </div>
            </div>

            <div className="flex items-center gap-5 border-b border-white/10 px-7 py-8 lg:border-b-0 lg:border-r">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-white/20">
                <Phone className="h-7 w-7" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/55">Call Us Today</p>
                <a href={`tel:+1${phoneLabel.replace(/\D/g, "")}`} className="mt-1 block whitespace-nowrap text-[1.78rem] font-black leading-none tracking-tight xl:text-[2rem]">
                  {phoneLabel}
                </a>
              </div>
            </div>

            <div className="flex flex-col justify-center px-7 py-8">
              <Button className="btn-mock-red h-12 rounded-md text-[13px] uppercase" onClick={() => setAppointmentOpen(true)}>
                {contactButtonLabel}
              </Button>
              <p className="mt-3 text-sm leading-6 text-white/75">
                {preferPublicCopy(contactSection?.subtitle, "Appointments available in-office or via telehealth.")}
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#d9e1f2] bg-white">
        <div className={`${shellClassName} flex flex-col items-center justify-between gap-5 py-6 lg:flex-row`}>
          <div className="flex items-center gap-3">
            <img src={brandLogo} alt={brandAlt} className="h-10 w-10 object-contain" />
            <div className="text-sm text-[#4f6796]">
              <p className="font-bold text-[#13306b]">{brandName}</p>
              <p>{brandTagline}</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 text-sm text-[#4f6796] lg:items-end">
            <p>{addressLabel}</p>
            <div className="flex flex-wrap items-center justify-center gap-5 lg:justify-end">
              <a href={`mailto:${emailLabel}`} className="hover:text-[#ef2027]">
                {emailLabel}
              </a>
              <a href={`tel:+1${phoneLabel.replace(/\D/g, "")}`} className="hover:text-[#ef2027]">
                {phoneLabel}
              </a>
            </div>
          </div>
        </div>
      </footer>

      <AppointmentRequestDialog open={appointmentOpen} onOpenChange={setAppointmentOpen} services={services} settings={settings} />
    </div>
  );
}
