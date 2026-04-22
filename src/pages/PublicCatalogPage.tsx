import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronRight, Phone, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PublicSiteFooter } from "@/components/landing/PublicSiteFooter";
import { PublicSiteHeader } from "@/components/landing/PublicSiteHeader";
import {
  getCatalogItem,
  getCatalogItems,
  getCatalogLabel,
  type PublicCatalogKind,
} from "@/data/publicSiteContent";

export default function PublicCatalogPage() {
  const { slug } = useParams();
  const location = useLocation();
  const kind: PublicCatalogKind = location.pathname.startsWith("/specialties") ? "specialties" : "services";
  const items = getCatalogItems(kind);
  const label = getCatalogLabel(kind);
  const item = getCatalogItem(kind, slug);

  if (slug && !item) {
    return <Navigate to={`/${kind}`} replace />;
  }

  if (!slug) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <PublicSiteHeader />
        <main>
          <section className="relative overflow-hidden border-b border-border bg-gradient-hero text-primary-foreground">
            <div className="ambient-orb left-0 top-10 h-72 w-72 opacity-50" />
            <div className="ambient-orb right-0 top-24 h-96 w-96 opacity-50" />
            <div className="container mx-auto px-4 py-20 sm:px-6 lg:py-28">
              <div className="max-w-3xl space-y-6">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary-foreground/70">Public {label}</p>
                <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                  Explore our {kind === "services" ? "care pathways" : "specialty departments"} before you book.
                </h1>
                <p className="max-w-2xl text-base leading-relaxed text-primary-foreground/80 sm:text-lg">
                  Every card below opens a real destination page with care details, what to expect, and the right next step — no dead-end redirects.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button size="lg" className="rounded-full bg-card text-card-foreground hover:bg-card/90" asChild>
                    <Link to="/services/smart-appointments">Start with appointments <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                  <Button size="lg" variant="outline" className="rounded-full border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10" asChild>
                    <Link to="/">Back to homepage</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          <section className="py-16 lg:py-20">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {items.map((entry, index) => (
                  <motion.div
                    key={entry.slug}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.45 }}
                  >
                    <Link to={`/${kind}/${entry.slug}`} className="group block h-full">
                      <Card className="h-full overflow-hidden rounded-[2rem] border-border bg-card transition duration-300 hover:-translate-y-1 hover:border-accent/35 hover:shadow-elevated">
                        <div className="relative h-60 overflow-hidden">
                          <img src={entry.image} alt={entry.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" />
                          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
                          <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-card/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent backdrop-blur-md">
                            <entry.icon className="h-3.5 w-3.5" />
                            {entry.eyebrow}
                          </div>
                        </div>
                        <CardContent className="space-y-5 p-6">
                          <div>
                            <h2 className="font-display text-2xl font-bold tracking-tight">{entry.title}</h2>
                            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{entry.excerpt}</p>
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            {entry.metrics.map((metric) => (
                              <div key={metric.label} className="rounded-2xl bg-secondary p-3 text-center">
                                <p className="font-display text-lg font-semibold text-foreground">{metric.value}</p>
                                <p className="mt-1 text-[11px] leading-tight text-muted-foreground">{metric.label}</p>
                              </div>
                            ))}
                          </div>
                          <div className="inline-flex items-center gap-1 text-sm font-semibold text-accent">
                            Open page <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </main>
        <PublicSiteFooter />
      </div>
    );
  }

  const relatedItems = items.filter((entry) => entry.slug !== item.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <PublicSiteHeader />
      <main>
        {/* Hero with large prominent unique image */}
        <section className="relative overflow-hidden border-b border-border">
          <div className="absolute inset-0">
            <img src={item.image} alt={item.title} className="h-full w-full object-cover" loading="eager" width={1920} height={1080} />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/65 to-slate-950/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30" />
          </div>
          <div className="container relative mx-auto px-4 py-16 sm:px-6 lg:py-24">
            <div className="max-w-3xl space-y-6 text-white">
              <Link to={`/${kind}`} className="inline-flex items-center gap-2 text-sm text-white/80 transition hover:text-white">
                <ArrowLeft className="h-4 w-4" />
                Back to {label.toLowerCase()}
              </Link>
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-red/40 bg-brand-red/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.28em] text-white backdrop-blur-md">
                <item.icon className="h-3.5 w-3.5 text-brand-red" />
                {item.eyebrow}
              </div>
              <h1 className="font-display text-4xl font-bold tracking-tight drop-shadow-2xl sm:text-5xl lg:text-6xl">{item.title}</h1>
              <p className="max-w-3xl text-base leading-relaxed text-white/90 sm:text-lg">{item.summary}</p>
              <div className="flex flex-wrap gap-3">
                {item.primaryAction.href.startsWith("tel:") ? (
                  <Button size="lg" className="rounded-full bg-white px-7 text-slate-900 hover:bg-white/90" asChild>
                    <a href={item.primaryAction.href}>{item.primaryAction.label} <ArrowRight className="ml-2 h-4 w-4" /></a>
                  </Button>
                ) : (
                  <Button size="lg" className="rounded-full bg-white px-7 text-slate-900 hover:bg-white/90" asChild>
                    <Link to={item.primaryAction.href}>{item.primaryAction.label} <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                )}
                {item.secondaryAction.href.startsWith("tel:") ? (
                  <Button size="lg" className="rounded-full bg-brand-red px-7 text-white hover:bg-brand-red/90" asChild>
                    <a href={item.secondaryAction.href}>{item.secondaryAction.label}</a>
                  </Button>
                ) : (
                  <Button size="lg" variant="outline" className="rounded-full border-white/40 bg-transparent px-7 text-white hover:bg-white/10" asChild>
                    <Link to={item.secondaryAction.href}>{item.secondaryAction.label}</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Featured image showcase — large, no gradient overlay */}
        <section className="border-b border-border bg-muted/30 py-10 lg:py-14">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-elevated">
              <div className="relative">
                <img
                  src={item.image}
                  alt={`${item.title} at On Time Medical`}
                  className="h-[20rem] w-full object-cover sm:h-[26rem] lg:h-[32rem]"
                  loading="lazy"
                  width={1920}
                  height={1080}
                />
                <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-brand-red/30 bg-card/95 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-brand-red shadow-elevated backdrop-blur-md sm:bottom-6 sm:left-6">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-red opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-red" />
                  </span>
                  Inside our {item.shortTitle.toLowerCase()} experience
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 lg:py-18">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid gap-4 md:grid-cols-3">
              {item.metrics.map((metric) => (
                <div key={metric.label} className="rounded-[1.75rem] border border-border bg-card p-6 shadow-card">
                  <p className="font-display text-3xl font-bold text-brand-red">{metric.value}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-16 lg:pb-20">
          <div className="container mx-auto grid gap-8 px-4 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
            <div className="rounded-[2rem] border border-border bg-card p-7 shadow-card lg:p-9">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">What this page covers</p>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight">A clearer picture of the care experience.</h2>
              <div className="mt-8 grid gap-5 md:grid-cols-3">
                {item.features.map((feature) => (
                  <div key={feature.title} className="rounded-[1.5rem] bg-secondary p-5">
                    <p className="font-display text-lg font-semibold text-foreground">{feature.title}</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-border bg-card p-7 shadow-card lg:p-9">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">Key highlights</p>
              <div className="mt-5 space-y-4">
                {item.highlights.map((highlight) => (
                  <div key={highlight} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-red" />
                    <p className="text-sm leading-relaxed text-muted-foreground">{highlight}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 rounded-[1.5rem] bg-gradient-brand p-6 text-primary-foreground">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary-foreground/70">Need help now?</p>
                <p className="mt-3 font-display text-2xl font-semibold">Speak with our care coordination team.</p>
                <a href="tel:+1800668463" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary-foreground/90 transition hover:text-primary-foreground">
                  <Phone className="h-4 w-4" />
                  +1 (800) ON-TIME
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-muted/40 py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="mb-8 max-w-2xl space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">Related pages</p>
              <h2 className="font-display text-3xl font-bold tracking-tight">Keep exploring the public care experience.</h2>
              <p className="text-sm text-muted-foreground">Every related card below is a functional public page, so patients can keep browsing before they commit to a next step.</p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedItems.map((entry) => (
                <Link key={entry.slug} to={`/${kind}/${entry.slug}`} className="group block">
                  <Card className="h-full rounded-[1.75rem] border-border bg-card transition duration-300 hover:-translate-y-1 hover:border-accent/35 hover:shadow-elevated">
                    <CardContent className="space-y-4 p-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground">
                        <entry.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-display text-xl font-semibold">{entry.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{entry.excerpt}</p>
                      </div>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-accent">
                        Open page <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="rounded-[2rem] bg-gradient-brand p-8 text-primary-foreground shadow-elevated lg:p-12">
              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary-foreground/70">Ready for the next step?</p>
                  <h2 className="mt-3 font-display text-3xl font-bold tracking-tight">Move from research to action when you’re ready.</h2>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-primary-foreground/85">
                    Public discovery should feel complete on its own. When you're ready, continue into booking, registration, or secure patient access.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                  <Button className="rounded-full bg-card text-card-foreground hover:bg-card/90" asChild>
                    <Link to="/services/smart-appointments">Book Appointment</Link>
                  </Button>
                  <Button variant="outline" className="rounded-full border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10" asChild>
                    <Link to="/patient-portal/login">Patient Portal</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <PublicSiteFooter />
    </div>
  );
}
