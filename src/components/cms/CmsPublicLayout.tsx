import { useMemo, useState, type CSSProperties } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Calendar, ChevronDown, Lock, Menu, Phone, X } from "lucide-react";
import { AppointmentRequestDialog } from "@/components/landing/AppointmentRequestDialog";
import { Button } from "@/components/ui/button";
import { getCmsIcon } from "@/features/cms/icons";
import { useCmsAnnouncements, useCmsPages, useCmsRealtime, useCmsServices, useCmsSiteSettings } from "@/features/cms/hooks";
import type { CmsNavigationItem, CmsPage, CmsService, CmsSiteSettings } from "@/features/cms/types";
import { cn } from "@/lib/utils";

function getPageHref(page: CmsPage) {
  return page.slug === "home" ? "/" : `/${page.slug}`;
}

function isExternalHref(href: string) {
  return /^(https?:)?\/\//.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");
}

function isExternalNavigationItem(item: Pick<CmsNavigationItem, "type" | "href">) {
  return item.type === "external" || isExternalHref(item.href);
}

function buildNavigationItems(settings: CmsSiteSettings, pages: CmsPage[]) {
  const publishedPages: CmsNavigationItem[] = pages
    .filter((page) => page.status === "published" && page.showInNavigation)
    .sort((left, right) => left.sortOrder - right.sortOrder)
    .map((page) => ({
      id: page.id,
      label: page.navigationLabel || page.title,
      href: getPageHref(page),
      type: page.pageType === "services" ? "services-menu" : "page",
    }));

  const customItems = settings.navigation.primaryItems.filter((item) => item.type !== "page");
  const seen = new Set<string>();
  const combined: CmsNavigationItem[] = [];

  [...publishedPages, ...customItems].forEach((item) => {
    const key = `${item.type}:${item.href}`;
    if (seen.has(key)) return;
    seen.add(key);
    combined.push(item);
  });

  return combined;
}

interface PublicSiteHeaderProps {
  settings: CmsSiteSettings;
  services: CmsService[];
  pages: CmsPage[];
  onOpenAppointment: () => void;
}

function PublicSiteHeader({ settings, services, pages, onOpenAppointment }: PublicSiteHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const shellClassName = "mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8";

  const serviceItems = services.filter((service) => service.featuredInNavigation);
  const navItems = useMemo(() => buildNavigationItems(settings, pages), [pages, settings]);

  const isNavItemActive = (href: string, type: string) => {
    if (type === "external") return false;
    if (type === "services-menu") return location.pathname.startsWith("/services");
    if (href.startsWith("/#")) {
      const [pathname, hash] = href.split("#");
      return location.pathname === pathname && location.hash === `#${hash}`;
    }
    return location.pathname === href;
  };

  return (
    <header className="relative z-40 border-b border-[#dde5f4] bg-white shadow-[0_14px_34px_-30px_rgba(19,48,107,0.42)]">
      <div className={`${shellClassName} flex min-h-[84px] items-center justify-between gap-4 py-2 lg:min-h-[92px]`}>
        <Link to="/" aria-label={`${settings.brand.siteName} home`} className="inline-flex shrink-0">
          <img src={settings.brand.logo.url} alt={settings.brand.logo.alt} className="h-[62px] w-[62px] object-contain sm:h-[70px] sm:w-[70px] lg:h-[78px] lg:w-[78px]" />
        </Link>

        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-6 lg:flex xl:gap-9">
          {navItems.map((item) =>
            item.type === "services-menu" ? (
              <div key={item.id} className="group relative">
                <Link
                  to={item.href}
                  className={cn(
                    "inline-flex items-center gap-1.5 border-b-2 border-transparent pb-1.5 text-[0.82rem] font-black uppercase tracking-[0.04em] text-[var(--cms-text)] transition-colors hover:text-[var(--cms-accent)] whitespace-nowrap xl:text-[0.86rem]",
                    isNavItemActive(item.href, item.type) && "border-[var(--cms-accent)] text-[var(--cms-accent)]",
                  )}
                >
                  <span>{item.label}</span>
                  <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
                </Link>
                <div className="pointer-events-none absolute left-1/2 top-full z-50 w-[430px] -translate-x-1/2 translate-y-2 pt-4 opacity-0 transition-all duration-150 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  <div className="rounded-[20px] border border-[#dde5f4] bg-white p-5 shadow-[0_26px_52px_-34px_rgba(19,48,107,0.38)]">
                    <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#4f6796]">{settings.publicUi.servicesMenuTitle}</p>
                    <div className="mt-4 grid gap-2 sm:grid-cols-2">
                      {serviceItems.map((service) => (
                        <Link key={service.id} to={`/services/${service.slug}`} className="rounded-[14px] border border-[#e3eaf7] px-4 py-3 text-[0.8rem] font-bold text-[var(--cms-text)] transition-colors hover:border-[var(--cms-accent)]/20 hover:text-[var(--cms-accent)]">
                          {service.title}
                        </Link>
                      ))}
                    </div>
                    <Link to="/services" className="mt-4 inline-flex text-[0.76rem] font-black uppercase tracking-[0.08em] text-[var(--cms-accent)]">
                      {settings.publicUi.servicesMenuActionLabel}
                    </Link>
                  </div>
                </div>
              </div>
            ) : isExternalNavigationItem(item) ? (
              <a
                key={item.id}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                className={cn(
                  "border-b-2 border-transparent pb-1.5 text-[0.82rem] font-black uppercase tracking-[0.04em] text-[var(--cms-text)] transition-colors hover:text-[var(--cms-accent)] whitespace-nowrap xl:text-[0.86rem]",
                  isNavItemActive(item.href, item.type) && "border-[var(--cms-accent)] text-[var(--cms-accent)]",
                )}
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.id}
                to={item.href}
                className={cn(
                  "border-b-2 border-transparent pb-1.5 text-[0.82rem] font-black uppercase tracking-[0.04em] text-[var(--cms-text)] transition-colors hover:text-[var(--cms-accent)] whitespace-nowrap xl:text-[0.86rem]",
                  isNavItemActive(item.href, item.type) && "border-[var(--cms-accent)] text-[var(--cms-accent)]",
                )}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <Button variant="outline" className="h-11 rounded-md border-2 border-[var(--cms-text)]/16 bg-white px-5 text-[11.5px] font-black uppercase tracking-[0.04em] text-[var(--cms-text)] shadow-[0_18px_30px_-28px_rgba(19,48,107,0.35)]" asChild>
            <Link to="/patient-portal/login">
              <Lock className="mr-2 h-4 w-4" />
              {settings.publicUi.portalButtonLabel}
            </Link>
          </Button>
          <Button className="h-11 rounded-md bg-[var(--cms-accent)] px-5 text-[11.5px] font-black uppercase tracking-[0.04em] text-white shadow-[0_18px_30px_-22px_rgba(239,32,39,0.42)] hover:bg-[var(--cms-accent)]/90" onClick={onOpenAppointment}>
            <Calendar className="mr-2 h-4 w-4" />
            {settings.publicUi.appointmentButtonLabel}
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <a href={`tel:+1${settings.contact.phone.replace(/\D/g, "")}`} className="inline-flex items-center gap-2 text-sm font-black text-[var(--cms-text)]">
            <Phone className="h-4 w-4" />
            <span className="hidden sm:inline">{settings.contact.phone}</span>
          </a>
          <Button variant="outline" size="icon" className="h-10 w-10 rounded-md border-[var(--cms-text)]/15" onClick={() => setMobileOpen((open) => !open)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <div className="absolute left-0 top-full w-full border-t border-[#dde5f4] bg-white shadow-[0_18px_40px_-34px_rgba(19,48,107,0.45)] lg:hidden">
          <div className={`${shellClassName} flex flex-col gap-3 py-5`}>
            {navItems.map((item) =>
              isExternalNavigationItem(item) ? (
                <a
                  key={item.id}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-[12px] px-3 py-2 text-[0.95rem] font-bold text-[var(--cms-text)] hover:bg-[var(--cms-soft)] hover:text-[var(--cms-accent)]"
                >
                  {item.label}
                </a>
              ) : (
                <Link key={item.id} to={item.href} onClick={() => setMobileOpen(false)} className="rounded-[12px] px-3 py-2 text-[0.95rem] font-bold text-[var(--cms-text)] hover:bg-[var(--cms-soft)] hover:text-[var(--cms-accent)]">
                  {item.label}
                </Link>
              ),
            )}
            <div className="rounded-[16px] border border-[#dde5f4] bg-[var(--cms-soft)] p-4">
              <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#4f6796]">{settings.publicUi.servicesMenuTitle}</p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {serviceItems.map((service) => (
                  <Link key={service.id} to={`/services/${service.slug}`} onClick={() => setMobileOpen(false)} className="rounded-[12px] border border-[#e3eaf7] bg-white px-4 py-3 text-[0.82rem] font-bold text-[var(--cms-text)] transition-colors hover:text-[var(--cms-accent)]">
                    {service.title}
                  </Link>
                ))}
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Button variant="outline" className="h-12 text-[13px] uppercase" asChild>
                <Link to="/patient-portal/login" onClick={() => setMobileOpen(false)}>
                  {settings.publicUi.portalButtonLabel}
                </Link>
              </Button>
              <Button className="h-12 bg-[var(--cms-accent)] text-[13px] uppercase text-white hover:bg-[var(--cms-accent)]/90" onClick={onOpenAppointment}>
                {settings.publicUi.appointmentButtonLabel}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function PublicSiteFooter({ settings, onOpenAppointment }: { settings: CmsSiteSettings; onOpenAppointment: () => void }) {
  const shellClassName = "mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8";

  return (
    <footer className="border-t border-[#dde5f4] bg-white">
      <section className={`${shellClassName} py-6 lg:py-8`}>
        <div className="rounded-[20px] border border-[#dde5f4] bg-[var(--cms-soft)]">
          <div className="grid md:grid-cols-2 xl:grid-cols-4">
            {settings.footer.highlightItems.map((entry, index) => {
              const Icon = getCmsIcon(entry.icon);
              return (
                <div key={entry.id} className={cn("flex items-start gap-4 px-6 py-6", index < settings.footer.highlightItems.length - 1 ? "border-b border-[#dde5f4] xl:border-b-0 xl:border-r" : "")}>
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white text-[var(--cms-primary)] shadow-[0_10px_26px_-20px_rgba(19,48,107,0.45)]">
                    <Icon className="h-7 w-7" />
                  </div>
                  <div>
                    <p className="text-[0.95rem] font-black leading-snug text-[var(--cms-text)]">{entry.title}</p>
                    {entry.description && <p className="mt-2 text-[0.84rem] leading-6 text-[#4f6796]">{entry.description}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-4 grid overflow-hidden rounded-[18px] bg-[var(--cms-footer)] text-white shadow-[0_22px_44px_-36px_rgba(16,48,102,0.58)] lg:grid-cols-[0.92fr_0.9fr_0.98fr_1.06fr]">
          <div className="flex items-center gap-4 border-b border-white/10 px-6 py-6 lg:border-b-0 lg:border-r">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/25">
              <Calendar className="h-6 w-6" />
            </div>
            <div className="min-w-0">
              <p className="text-[1.04rem] font-black leading-tight xl:text-[1.12rem]">{settings.publicUi.footerCtaTitle}</p>
              <p className="mt-1.5 text-[0.92rem] leading-6 text-white/76">{settings.footer.summary}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 border-b border-white/10 px-6 py-6 lg:border-b-0 lg:border-r">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/25">
              <Phone className="h-6 w-6" />
            </div>
            <div className="min-w-0">
              <p className="whitespace-nowrap text-xs font-bold uppercase tracking-[0.14em] text-white/55">{settings.publicUi.footerPhoneLabel}</p>
              <a href={`tel:+1${settings.contact.phone.replace(/\D/g, "")}`} className="mt-1 block whitespace-nowrap text-[1.56rem] font-black leading-none tracking-tight xl:text-[1.74rem]">
                {settings.contact.phone}
              </a>
              <p className="mt-1.5 text-[0.92rem] leading-6 text-white/76">{settings.publicUi.footerPhoneDescription}</p>
            </div>
          </div>
          <div className="flex flex-col justify-center border-b border-white/10 px-6 py-6 lg:border-b-0 lg:border-r">
            <Button className="h-11 rounded-md bg-[var(--cms-accent)] text-[12px] uppercase tracking-[0.04em] text-white hover:bg-[var(--cms-accent)]/90" onClick={onOpenAppointment}>
              {settings.publicUi.footerAppointmentLabel}
            </Button>
            <p className="mt-2.5 text-[0.92rem] leading-6 text-white/76">{settings.publicUi.footerAppointmentDescription}</p>
          </div>
          <div className="flex items-center gap-4 px-6 py-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/25">
              <Lock className="h-6 w-6" />
            </div>
            <div className="min-w-0">
              <p className="text-[1.02rem] font-black leading-tight xl:text-[1.08rem]">{settings.publicUi.footerPortalTitle}</p>
              <p className="mt-1.5 max-w-[240px] text-[0.92rem] leading-6 text-white/76">{settings.publicUi.footerPortalDescription}</p>
              <Link to="/patient-portal/login" className="mt-2.5 inline-flex items-center text-[0.82rem] font-black uppercase tracking-[0.08em] text-white transition-colors hover:text-white/80">
                {settings.publicUi.footerPortalLinkLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-[#dde5f4] bg-white">
        <div className={`${shellClassName} flex flex-col items-center justify-between gap-4 py-6 text-center text-sm text-[#4f6796] lg:flex-row lg:text-left`}>
          <div className="flex items-center gap-3">
            <img src={settings.brand.logo.url} alt={settings.brand.logo.alt} className="h-12 w-12 object-contain" />
            <div>
              <p className="font-bold text-[var(--cms-text)]">{settings.brand.siteName}</p>
              <p>{settings.brand.tagline}</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 lg:items-end">
            <p>{settings.contact.address}</p>
            <div className="flex flex-wrap items-center justify-center gap-5 lg:justify-end">
              <a href={`mailto:${settings.contact.email}`} className="hover:text-[var(--cms-accent)]">
                {settings.contact.email}
              </a>
              <a href={`tel:+1${settings.contact.phone.replace(/\D/g, "")}`} className="hover:text-[var(--cms-accent)]">
                {settings.contact.phone}
              </a>
              {settings.socialLinks.map((link) => {
                const Icon = getCmsIcon(link.icon);
                return (
                  <a key={link.id} href={link.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-[var(--cms-accent)]">
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </a>
                );
              })}
              {settings.footer.legalLinks.map((link) =>
                isExternalNavigationItem(link) ? (
                  <a key={link.id} href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noreferrer" : undefined} className="hover:text-[var(--cms-accent)]">
                    {link.label}
                  </a>
                ) : (
                  <Link key={link.id} to={link.href} className="hover:text-[var(--cms-accent)]">
                    {link.label}
                  </Link>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function CmsPublicLayout({ children }: { children: React.ReactNode }) {
  useCmsRealtime();

  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const { data: settings } = useCmsSiteSettings();
  const { data: pages = [] } = useCmsPages();
  const { data: services = [] } = useCmsServices();
  const { data: announcements = [] } = useCmsAnnouncements();
  const banner =
    settings?.announcementBar.isVisible && settings.announcementBar.text
      ? {
          text: settings.announcementBar.text,
          href: settings.announcementBar.href,
          buttonLabel: settings.announcementBar.buttonLabel,
        }
      : announcements[0]
        ? {
            text: announcements[0].body,
            href: announcements[0].href,
            buttonLabel: announcements[0].buttonLabel,
          }
        : null;

  const themeStyle = useMemo(
    () =>
      settings
        ? ({
            "--cms-primary": settings.theme.primaryColor,
            "--cms-accent": settings.theme.accentColor,
            "--cms-soft": settings.theme.softColor,
            "--cms-background": settings.theme.backgroundColor,
            "--cms-text": settings.theme.textColor,
            "--cms-footer": settings.theme.footerColor,
          } as CSSProperties)
        : undefined,
    [settings],
  );

  if (!settings) return null;

  return (
    <div style={themeStyle} className="min-h-screen bg-[var(--cms-background)] text-[var(--cms-text)]">
      {banner && (
        <div className="border-b border-[var(--cms-accent)]/10 bg-[var(--cms-accent)]/6">
          <div className="mx-auto flex w-full max-w-[1320px] flex-col items-start justify-between gap-3 px-4 py-3 text-sm text-[var(--cms-text)] sm:flex-row sm:items-center sm:px-6 lg:px-8">
            <p className="font-medium">{banner.text}</p>
            {banner.href && banner.buttonLabel && (
              isExternalHref(banner.href) ? (
                <a href={banner.href} target={banner.href.startsWith("http") ? "_blank" : undefined} rel={banner.href.startsWith("http") ? "noreferrer" : undefined} className="inline-flex items-center font-bold uppercase tracking-[0.08em] text-[var(--cms-accent)]">
                  {banner.buttonLabel}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              ) : (
                <Link to={banner.href} className="inline-flex items-center font-bold uppercase tracking-[0.08em] text-[var(--cms-accent)]">
                  {banner.buttonLabel}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              )
            )}
          </div>
        </div>
      )}

      <PublicSiteHeader settings={settings} services={services} pages={pages} onOpenAppointment={() => setAppointmentOpen(true)} />
      <main>{children}</main>
      <PublicSiteFooter settings={settings} onOpenAppointment={() => setAppointmentOpen(true)} />
      <AppointmentRequestDialog open={appointmentOpen} onOpenChange={setAppointmentOpen} services={services} settings={settings} />
    </div>
  );
}
