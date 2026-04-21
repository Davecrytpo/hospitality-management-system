import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronRight, Mail, Phone, MapPin } from "lucide-react";

import { Logo } from "@/components/brand/Logo";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { publicServices, publicSpecialties } from "@/data/publicSiteContent";

const topActions = [
  { label: "Self Check-in", href: "/kiosk" },
  { label: "Verify Records", href: "/verify" },
];

export function PublicSiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const primaryLinks = useMemo(
    () => [
      { label: "Services", href: "/services" },
      { label: "Specialties", href: "/specialties" },
      { label: "Patient Registration", href: "/patient-register" },
    ],
    [],
  );

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-2xl">
      <div className="border-b border-border/60 bg-gradient-brand text-primary-foreground">
        <div className="container mx-auto flex min-h-11 flex-wrap items-center justify-between gap-3 px-4 py-2 sm:px-6">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm">
            <a href="tel:+1800668463" className="inline-flex items-center gap-2 text-primary-foreground/90 transition hover:text-primary-foreground">
              <Phone className="h-3.5 w-3.5" />
              <span>+1 (800) ON-TIME</span>
            </a>
            <a href="mailto:care@ontimemedical.com" className="inline-flex items-center gap-2 text-primary-foreground/90 transition hover:text-primary-foreground">
              <Mail className="h-3.5 w-3.5" />
              <span>care@ontimemedical.com</span>
            </a>
            <span className="inline-flex items-center gap-2 text-primary-foreground/75">
              <MapPin className="h-3.5 w-3.5" />
              <span>24/7 emergency access across our network</span>
            </span>
          </div>
          <div className="hidden items-center gap-4 text-xs sm:flex">
            {topActions.map((action) => (
              <Link key={action.href} to={action.href} className="text-primary-foreground/90 transition hover:text-primary-foreground">
                {action.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto flex min-h-20 items-center justify-between gap-4 px-4 sm:px-6">
        <Logo size="md" />

        <div className="hidden xl:flex xl:items-center xl:gap-6">
          <NavigationMenu>
            <NavigationMenuList className="gap-1">
              <NavigationMenuItem>
                <NavigationMenuTrigger className="rounded-full bg-transparent px-4 text-sm text-foreground hover:bg-secondary hover:text-foreground">
                  Services
                </NavigationMenuTrigger>
                <NavigationMenuContent className="rounded-3xl border border-border bg-card p-5 shadow-elevated">
                  <div className="grid w-[620px] grid-cols-2 gap-3">
                    {publicServices.map((item) => (
                      <NavigationMenuLink key={item.slug} asChild>
                        <Link to={`/services/${item.slug}`} className="group rounded-2xl border border-border bg-background p-4 transition hover:border-accent/35 hover:bg-secondary/50">
                          <div className="flex items-start gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground">
                              <item.icon className="h-4 w-4" />
                            </div>
                            <div className="space-y-1.5">
                              <p className="font-display text-sm font-semibold text-foreground">{item.title}</p>
                              <p className="text-xs leading-relaxed text-muted-foreground">{item.excerpt}</p>
                              <span className="inline-flex items-center gap-1 text-xs font-medium text-accent">
                                Explore <ChevronRight className="h-3 w-3 transition group-hover:translate-x-0.5" />
                              </span>
                            </div>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="rounded-full bg-transparent px-4 text-sm text-foreground hover:bg-secondary hover:text-foreground">
                  Specialties
                </NavigationMenuTrigger>
                <NavigationMenuContent className="rounded-3xl border border-border bg-card p-5 shadow-elevated">
                  <div className="grid w-[680px] grid-cols-2 gap-3">
                    {publicSpecialties.map((item) => (
                      <NavigationMenuLink key={item.slug} asChild>
                        <Link to={`/specialties/${item.slug}`} className="group rounded-2xl border border-border bg-background p-4 transition hover:border-accent/35 hover:bg-secondary/50">
                          <div className="flex items-start gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground">
                              <item.icon className="h-4 w-4" />
                            </div>
                            <div className="space-y-1.5">
                              <p className="font-display text-sm font-semibold text-foreground">{item.title}</p>
                              <p className="text-xs leading-relaxed text-muted-foreground">{item.excerpt}</p>
                              <span className="inline-flex items-center gap-1 text-xs font-medium text-accent">
                                Open page <ChevronRight className="h-3 w-3 transition group-hover:translate-x-0.5" />
                              </span>
                            </div>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-1">
            {primaryLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition",
                  location.pathname === link.href ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Button variant="outline" size="sm" className="rounded-full" asChild>
            <Link to="/patient-portal/login">Patient Portal</Link>
          </Button>
          <Button size="sm" className="rounded-full" asChild>
            <Link to="/auth">Staff Login</Link>
          </Button>
        </div>

        <div className="flex items-center gap-2 xl:hidden">
          <ThemeToggle />
          <Button variant="outline" size="icon" className="rounded-full" onClick={() => setMobileOpen((open) => !open)}>
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-background xl:hidden">
          <div className="container mx-auto space-y-6 px-4 py-6 sm:px-6">
            <div className="grid gap-3 sm:grid-cols-2">
              {primaryLinks.concat(topActions).map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-2xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition hover:border-accent/35 hover:bg-secondary/50"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-3xl border border-border bg-card p-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-accent">Services</p>
                <div className="space-y-2">
                  {publicServices.map((item) => (
                    <Link key={item.slug} to={`/services/${item.slug}`} onClick={() => setMobileOpen(false)} className="flex items-center justify-between rounded-2xl px-3 py-2 text-sm text-foreground transition hover:bg-secondary">
                      <span>{item.title}</span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </Link>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-border bg-card p-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-accent">Specialties</p>
                <div className="space-y-2">
                  {publicSpecialties.map((item) => (
                    <Link key={item.slug} to={`/specialties/${item.slug}`} onClick={() => setMobileOpen(false)} className="flex items-center justify-between rounded-2xl px-3 py-2 text-sm text-foreground transition hover:bg-secondary">
                      <span>{item.title}</span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button variant="outline" className="w-full rounded-full" asChild>
                <Link to="/patient-portal/login" onClick={() => setMobileOpen(false)}>
                  Patient Portal
                </Link>
              </Button>
              <Button className="w-full rounded-full" asChild>
                <Link to="/auth" onClick={() => setMobileOpen(false)}>
                  Staff Login
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
