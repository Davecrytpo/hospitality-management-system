import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, HeartHandshake, Lock, Mail, MapPin, Phone, ShieldCheck, UserRound } from "lucide-react";
import logo from "@/assets/logo-ontime.png";
import { AppointmentRequestDialog } from "@/components/landing/AppointmentRequestDialog";
import { Button } from "@/components/ui/button";
import { cmsDefaults } from "@/features/cms/defaults";
import { getCmsIcon } from "@/features/cms/icons";
import { useCmsServices, useCmsSiteSettings } from "@/features/cms/hooks";
import { settingsTextLooksLikePlaceholder } from "@/features/cms/publicContent";
import { cn } from "@/lib/utils";

const fallbackHighlights = [
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

function isExternalHref(href: string) {
  return /^(https?:)?\/\//.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");
}

export function PublicSiteFooter() {
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const shellClassName = "mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8";
  const { data: cmsSettings } = useCmsSiteSettings();
  const { data: cmsServices = [] } = useCmsServices();
  const settings = cmsSettings && !settingsTextLooksLikePlaceholder(cmsSettings) ? cmsSettings : cmsDefaults.settings;
  const services = cmsServices.length > 0 ? cmsServices : cmsDefaults.services;

  const footerHighlights = useMemo(
    () =>
      settings.footer.highlightItems.length > 0
        ? settings.footer.highlightItems.map((item) => ({
            title: item.title,
            description: item.description ?? "",
            icon: getCmsIcon(item.icon),
          }))
        : fallbackHighlights,
    [settings.footer.highlightItems],
  );

  const brandLogo = settings.brand.logo.url || logo;
  const brandAlt = settings.brand.logo.alt || settings.brand.siteName || "On Time Medical Group";
  const brandName = settings.brand.siteName || "On Time Medical Group";
  const brandTagline = settings.brand.tagline || "Compassionate care. Clear access. Reliable follow-through.";
  const phoneLabel = settings.contact.phone || "410-754-4343";
  const emailLabel = settings.contact.email || "care@ontimemedical.com";
  const addressLabel = settings.contact.address || "1500 Wellness Avenue, Medical District";
  const footerSummary = settings.footer.summary || "We're here to help you live a healthier, happier life.";
  const footerCtaTitle = settings.publicUi.footerCtaTitle || "Ready to Take the Next Step?";
  const footerPhoneLabel = settings.publicUi.footerPhoneLabel || "Call Us Today";
  const footerPhoneDescription = settings.publicUi.footerPhoneDescription || "Our team is here to help you.";
  const footerAppointmentLabel = settings.publicUi.footerAppointmentLabel || "Book Appointment Now";
  const footerAppointmentDescription = settings.publicUi.footerAppointmentDescription || "Appointments available in-office or via telehealth.";
  const footerPortalTitle = settings.publicUi.footerPortalTitle || "Patient Portal Login";
  const footerPortalDescription = settings.publicUi.footerPortalDescription || "Access your health information, appointments, and more.";
  const footerPortalLinkLabel = settings.publicUi.footerPortalLinkLabel || "Login Now";

  return (
    <>
      <footer className="border-t border-[#dde5f4] bg-white">
        <section className={`${shellClassName} py-6 lg:py-8`}>
          <div className="rounded-[20px] border border-[#dde5f4] bg-[#f5f8ff]">
            <div className={cn("grid md:grid-cols-2", footerHighlights.length >= 5 ? "xl:grid-cols-5" : footerHighlights.length === 4 ? "xl:grid-cols-4" : "xl:grid-cols-3")}>
              {footerHighlights.map((item, index) => (
                <div key={item.title} className={cn("flex items-start gap-4 px-6 py-6", index < footerHighlights.length - 1 && "border-b border-[#dde5f4] xl:border-b-0 xl:border-r")}>
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

          <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-[0.92fr_0.9fr_0.98fr_1.06fr] lg:gap-0 lg:overflow-hidden lg:rounded-[18px] lg:bg-[#103066] lg:shadow-[0_22px_44px_-36px_rgba(16,48,102,0.58)]">
            <div className="flex flex-col gap-3 rounded-2xl bg-[#103066] px-5 py-5 text-white sm:flex-row sm:items-start sm:gap-4 lg:rounded-none lg:border-r lg:border-white/10 lg:bg-transparent lg:px-6 lg:py-6">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 sm:h-12 sm:w-12">
                <Calendar className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div className="min-w-0">
                <p className="text-[1.05rem] font-black leading-tight sm:text-[1.08rem] xl:text-[1.12rem]">{footerCtaTitle}</p>
                <p className="mt-1.5 text-[0.92rem] leading-6 text-white/80">{footerSummary}</p>
              </div>
            </div>

            <div className="flex flex-col gap-3 rounded-2xl bg-[#103066] px-5 py-5 text-white sm:flex-row sm:items-start sm:gap-4 lg:rounded-none lg:border-r lg:border-white/10 lg:bg-transparent lg:px-6 lg:py-6">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 sm:h-12 sm:w-12">
                <Phone className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div className="min-w-0">
                <p className="whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.14em] text-white/55 sm:text-xs">{footerPhoneLabel}</p>
                <a href={`tel:+1${phoneLabel.replace(/\D/g, "")}`} className="mt-0.5 block whitespace-nowrap text-[1.55rem] font-black leading-none tracking-tight sm:mt-1 xl:text-[1.7rem]">
                  {phoneLabel}
                </a>
                <p className="mt-1 text-[0.9rem] leading-6 text-white/80">{footerPhoneDescription}</p>
              </div>
            </div>

            <div className="flex flex-col justify-center rounded-2xl bg-[#103066] px-5 py-5 text-white lg:rounded-none lg:border-r lg:border-white/10 lg:bg-transparent lg:px-6 lg:py-6">
              <Button className="btn-mock-red h-11 w-full rounded-md text-[13px] uppercase tracking-[0.03em] sm:w-auto" type="button" onClick={() => setAppointmentOpen(true)}>
                {footerAppointmentLabel}
              </Button>
              <p className="mt-3 text-[0.9rem] leading-6 text-white/80">{footerAppointmentDescription}</p>
            </div>

            <div className="flex flex-col gap-3 rounded-2xl bg-[#103066] px-5 py-5 text-white sm:flex-row sm:items-start sm:gap-4 lg:rounded-none lg:bg-transparent lg:px-6 lg:py-6">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 sm:h-12 sm:w-12">
                <Lock className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div className="min-w-0">
                <p className="text-[1.02rem] font-black leading-tight sm:text-[1.05rem] xl:text-[1.08rem]">{footerPortalTitle}</p>
                <p className="mt-1.5 text-[0.9rem] leading-6 text-white/80">{footerPortalDescription}</p>
                <Link to="/patient-portal/login" className="mt-2.5 inline-flex items-center text-[0.82rem] font-black uppercase tracking-[0.06em] text-white transition-colors hover:text-white/75">
                  {footerPortalLinkLabel}
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="border-t border-[#dde5f4] bg-white">
          <div className={`${shellClassName} flex flex-col items-center justify-between gap-4 py-6 text-center text-sm text-[#4f6796] lg:flex-row lg:text-left`}>
            <div className="flex items-center gap-3">
              <img src={brandLogo} alt={brandAlt} className="h-12 w-12 object-contain" width={48} height={48} />
              <div>
                <p className="font-bold text-[#13306b]">{brandName}</p>
                <p>{brandTagline}</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2 lg:items-end">
              <p className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {addressLabel}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-5 lg:justify-end">
                <a href={`mailto:${emailLabel}`} className="inline-flex items-center gap-2 hover:text-[#ef2027]">
                  <Mail className="h-4 w-4" />
                  {emailLabel}
                </a>
                <a href={`tel:+1${phoneLabel.replace(/\D/g, "")}`} className="hover:text-[#ef2027]">
                  {phoneLabel}
                </a>
                {settings.footer.legalLinks.map((link) =>
                  isExternalHref(link.href) ? (
                    <a key={link.id} href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noreferrer" : undefined} className="hover:text-[#ef2027]">
                      {link.label}
                    </a>
                  ) : (
                    <Link key={link.id} to={link.href} className="hover:text-[#ef2027]">
                      {link.label}
                    </Link>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </footer>

      <AppointmentRequestDialog open={appointmentOpen} onOpenChange={setAppointmentOpen} services={services} settings={settings} />
    </>
  );
}
