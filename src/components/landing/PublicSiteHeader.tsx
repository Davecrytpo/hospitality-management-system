import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Calendar, ChevronDown, Lock, Menu, Phone, X } from "lucide-react";
import logo from "@/assets/logo-ontime.png";
import { AppointmentRequestDialog } from "@/components/landing/AppointmentRequestDialog";
import { Button } from "@/components/ui/button";
import { cmsDefaults } from "@/features/cms/defaults";
import { useCmsRealtime, useCmsServices, useCmsSiteSettings } from "@/features/cms/hooks";
import { settingsTextLooksLikePlaceholder } from "@/features/cms/publicContent";
import type { CmsNavigationItem } from "@/features/cms/types";
import { serviceNavItems } from "@/data/servicePageContent";
import { cn } from "@/lib/utils";

const fallbackNavItems: CmsNavigationItem[] = [
  { id: "nav-home", label: "Home", href: "/", type: "page" },
  { id: "nav-services", label: "Services", href: "/services", type: "services-menu" },
  { id: "nav-about", label: "About Us", href: "/about-us", type: "page" },
  { id: "nav-resources", label: "Patient Resources", href: "/#resources", type: "anchor" },
  { id: "nav-insurance", label: "Insurance", href: "/#insurance", type: "anchor" },
  { id: "nav-contact", label: "Contact", href: "/#contact", type: "anchor" },
];

function isExternalHref(href: string) {
  return /^(https?:)?\/\//.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");
}

function isServicesItem(item: CmsNavigationItem) {
  return item.type === "services-menu" || item.label.toLowerCase() === "services";
}

export function PublicSiteHeader() {
  useCmsRealtime();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const location = useLocation();
  const shellClassName = "mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8";
  const { data: cmsSettings } = useCmsSiteSettings();
  const { data: cmsServices = [] } = useCmsServices();

  const settings = cmsSettings && !settingsTextLooksLikePlaceholder(cmsSettings) ? cmsSettings : cmsDefaults.settings;
  const services = cmsServices.length > 0 ? cmsServices : cmsDefaults.services;
  const navItems = settings.navigation.primaryItems.length > 0 ? settings.navigation.primaryItems : fallbackNavItems;
  const serviceItems = services
    .filter((service) => service.featuredInNavigation)
    .sort((left, right) => left.sortOrder - right.sortOrder)
    .map((service) => ({
      label: service.title,
      href: `/services/${service.slug}`,
    }));
  const displayedServiceItems = serviceItems.length > 0 ? serviceItems : serviceNavItems;
  const phoneLabel = settings.contact.phone || "410-754-4343";

  const openAppointment = () => {
    setMobileOpen(false);
    setAppointmentOpen(true);
  };

  const isNavItemActive = (item: CmsNavigationItem) => {
    if (isServicesItem(item)) return location.pathname.startsWith("/services");
    if (item.type === "external" || isExternalHref(item.href)) return false;

    const [pathname, hash] = item.href.split("#");
    if (hash) {
      return location.pathname === pathname && location.hash === `#${hash}`;
    }

    return location.pathname === item.href && location.hash.length === 0;
  };

  const serviceMenuTitle = settings.publicUi.servicesMenuTitle || "Explore Care Services";
  const serviceMenuActionLabel = settings.publicUi.servicesMenuActionLabel || "View All Services";
  const portalButtonLabel = settings.publicUi.portalButtonLabel || "Patient Portal Login";
  const appointmentButtonLabel = settings.publicUi.appointmentButtonLabel || "Book Appointment";

  const brandLogo = settings.brand.logo.url || logo;
  const brandAlt = settings.brand.logo.alt || settings.brand.siteName || "On Time Medical Group";

  const renderNavLink = (item: CmsNavigationItem, mobile = false) => {
    const className = mobile
      ? "mobile-mock-link"
      : cn(
          "border-b-2 border-transparent pb-1.5 text-[0.82rem] font-black uppercase tracking-[0.04em] text-[#13306b] transition-colors hover:text-[#ef2027] whitespace-nowrap xl:text-[0.86rem]",
          isNavItemActive(item) && "border-[#ef2027] text-[#ef2027]",
        );

    if (isExternalHref(item.href) || item.type === "external") {
      return (
        <a
          key={item.id}
          href={item.href}
          target={item.href.startsWith("http") ? "_blank" : undefined}
          rel={item.href.startsWith("http") ? "noreferrer" : undefined}
          onClick={() => setMobileOpen(false)}
          className={className}
        >
          {item.label}
        </a>
      );
    }

    return (
      <Link key={item.id} to={item.href} onClick={() => setMobileOpen(false)} className={className} aria-current={isNavItemActive(item) ? "page" : undefined}>
        {item.label}
      </Link>
    );
  };

  return (
    <>
      <header className="relative z-40 border-b border-[#dde5f4] bg-white shadow-[0_14px_34px_-30px_rgba(19,48,107,0.42)]">
        <div className={`${shellClassName} flex min-h-[84px] items-center justify-between gap-4 py-2 lg:min-h-[92px]`}>
          <Link to="/" aria-label={`${settings.brand.siteName || "On Time Medical Group"} home`} className="inline-flex shrink-0">
            <img src={brandLogo} alt={brandAlt} className="h-[62px] w-[62px] object-contain sm:h-[70px] sm:w-[70px] lg:h-[78px] lg:w-[78px]" width={78} height={78} />
          </Link>

          <nav className="hidden min-w-0 flex-1 items-center justify-center gap-6 lg:flex xl:gap-9">
            {navItems.map((item) =>
              isServicesItem(item) ? (
                <div key={item.id} className="group relative">
                  <Link
                    to={item.href}
                    className={cn(
                      "inline-flex items-center gap-1.5 border-b-2 border-transparent pb-1.5 text-[0.82rem] font-black uppercase tracking-[0.04em] text-[#13306b] transition-colors hover:text-[#ef2027] whitespace-nowrap xl:text-[0.86rem]",
                      isNavItemActive(item) && "border-[#ef2027] text-[#ef2027]",
                    )}
                    aria-current={isNavItemActive(item) ? "page" : undefined}
                  >
                    <span>{item.label}</span>
                    <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
                  </Link>

                  <div className="pointer-events-none absolute left-1/2 top-full z-50 w-[430px] -translate-x-1/2 translate-y-2 pt-4 opacity-0 transition-all duration-150 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
                    <div className="rounded-[20px] border border-[#dde5f4] bg-white p-5 shadow-[0_26px_52px_-34px_rgba(19,48,107,0.38)]">
                      <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#4f6796]">{serviceMenuTitle}</p>
                      <div className="mt-4 grid gap-2 sm:grid-cols-2">
                        {displayedServiceItems.map((service) => (
                          <Link key={service.href} to={service.href} className="rounded-[14px] border border-[#e3eaf7] px-4 py-3 text-[0.8rem] font-bold text-[#13306b] transition-colors hover:border-[#ef2027]/20 hover:text-[#ef2027]">
                            {service.label}
                          </Link>
                        ))}
                      </div>
                      <Link to="/services" className="mt-4 inline-flex text-[0.76rem] font-black uppercase tracking-[0.08em] text-[#ef2027]">
                        {serviceMenuActionLabel}
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                renderNavLink(item)
              ),
            )}
          </nav>

          <div className="hidden shrink-0 items-center gap-3 lg:flex">
            <Button variant="outline" className="h-11 rounded-md border-2 border-[#13306b]/16 bg-white px-5 text-[11.5px] font-black uppercase tracking-[0.04em] text-[#13306b] shadow-[0_18px_30px_-28px_rgba(19,48,107,0.35)]" asChild>
              <Link to="/patient-portal/login">
                <Lock className="mr-2 h-4 w-4" />
                {portalButtonLabel}
              </Link>
            </Button>
            <Button className="btn-mock-red h-11 rounded-md px-5 text-[11.5px] font-black uppercase tracking-[0.04em] shadow-[0_18px_30px_-22px_rgba(239,32,39,0.42)]" type="button" onClick={openAppointment}>
              <Calendar className="mr-2 h-4 w-4" />
              {appointmentButtonLabel}
            </Button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <a href={`tel:+1${phoneLabel.replace(/\D/g, "")}`} className="inline-flex items-center gap-2 text-sm font-black text-[#13306b]">
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline">{phoneLabel}</span>
            </a>
            <Button variant="outline" size="icon" className="h-10 w-10 rounded-md border-[#13306b]/15" onClick={() => setMobileOpen((open) => !open)}>
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {mobileOpen && (
          <div className="absolute left-0 top-full w-full border-t border-[#dde5f4] bg-white shadow-[0_18px_40px_-34px_rgba(19,48,107,0.45)] lg:hidden">
            <div className={`${shellClassName} flex flex-col gap-3 py-5`}>
              {navItems.map((item) => renderNavLink(item, true))}
              <div className="rounded-[16px] border border-[#dde5f4] bg-[#f5f8ff] p-4">
                <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#4f6796]">{serviceMenuTitle}</p>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {displayedServiceItems.map((service) => (
                    <Link key={service.href} to={service.href} onClick={() => setMobileOpen(false)} className="rounded-[12px] border border-[#e3eaf7] bg-white px-4 py-3 text-[0.82rem] font-bold text-[#13306b] transition-colors hover:text-[#ef2027]">
                      {service.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Button variant="outline" className="btn-mock-outline h-12 text-[13px] uppercase" asChild>
                  <Link to="/patient-portal/login" onClick={() => setMobileOpen(false)}>
                    {portalButtonLabel}
                  </Link>
                </Button>
                <Button className="btn-mock-red h-12 text-[13px] uppercase" type="button" onClick={openAppointment}>
                  {appointmentButtonLabel}
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      <AppointmentRequestDialog open={appointmentOpen} onOpenChange={setAppointmentOpen} services={services} settings={settings} />
    </>
  );
}
