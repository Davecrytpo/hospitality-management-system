import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronRight, Phone } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PublicSiteFooter } from "@/components/landing/PublicSiteFooter";
import { PublicSiteHeader } from "@/components/landing/PublicSiteHeader";
import { getCatalogItem, getCatalogItems, getCatalogLabel, type PublicCatalogKind } from "@/data/publicSiteContent";

export default function PublicCatalogPage() {
  const { slug } = useParams();
  const location = useLocation();
  const kind: PublicCatalogKind = location.pathname.startsWith("/specialties") ? "specialties" : "services";
  const items = getCatalogItems(kind);
  const label = getCatalogLabel(kind);
  const item = getCatalogItem(kind, slug);

  if (slug && !item) return <Navigate to={`/${kind}`} replace />;

  if (!slug) {
    return (
      <div className="min-h-screen bg-otmg-page text-otmg-navy">
        <PublicSiteHeader />
        <main>
          <section className="mx-auto max-w-[1240px] px-4 py-10 lg:px-6 lg:py-14">
            <div className="grid overflow-hidden rounded-md bg-card shadow-mock lg:grid-cols-[0.95fr_1.05fr]">
              <div className="flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-12">
                <p className="text-sm font-extrabold uppercase tracking-[0.08em] text-brand-red">Public {label}</p>
                <h1 className="mt-4 max-w-[640px] font-display text-[2.7rem] font-extrabold uppercase leading-none text-otmg-navy sm:text-[4rem]">
                  Explore Our {kind === "services" ? "Services" : "Specialties"}
                </h1>
                <p className="mt-6 max-w-[560px] text-base font-medium leading-8 text-otmg-blue-soft">
                  Browse clear care pathways, department details, and patient next steps with the same trusted On Time Medical Group experience.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Button className="btn-mock-red h-14 px-7 text-[14px] uppercase" asChild>
                    <Link to="/services/smart-appointments">Book Appointment <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                  <Button variant="outline" className="btn-mock-outline h-14 px-7 text-[14px] uppercase" asChild>
                    <Link to="/">Back to Homepage</Link>
                  </Button>
                </div>
              </div>
              <div className="relative min-h-[340px]">
                <img src={items[0]?.image} alt={`${label} at On Time Medical Group`} className="h-full w-full object-cover" loading="eager" />
                <div className="absolute inset-y-0 left-0 hidden w-32 bg-gradient-to-r from-card to-transparent lg:block" />
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-[1240px] px-4 pb-14 lg:px-6">
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {items.map((entry, index) => (
                <motion.div key={entry.slug} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04, duration: 0.3 }}>
                  <Link to={`/${kind}/${entry.slug}`} className="group block h-full">
                    <Card className="h-full overflow-hidden rounded-md border-otmg-border bg-card shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-mock">
                      <div className="relative h-56 overflow-hidden">
                        <img src={entry.image} alt={entry.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" />
                        <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-md bg-card/95 px-3 py-2 text-[11px] font-extrabold uppercase tracking-[0.08em] text-brand-red shadow-card backdrop-blur">
                          <entry.icon className="h-3.5 w-3.5" />
                          {entry.eyebrow}
                        </div>
                      </div>
                      <CardContent className="space-y-5 p-6">
                        <div>
                          <h2 className="font-display text-2xl font-extrabold text-otmg-navy">{entry.title}</h2>
                          <p className="mt-3 text-sm font-medium leading-7 text-otmg-blue-soft">{entry.excerpt}</p>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {entry.metrics.map((metric) => (
                            <div key={metric.label} className="rounded-md bg-otmg-soft p-3 text-center">
                              <p className="font-display text-lg font-extrabold text-otmg-navy">{metric.value}</p>
                              <p className="mt-1 text-[11px] font-medium leading-tight text-otmg-blue-soft">{metric.label}</p>
                            </div>
                          ))}
                        </div>
                        <span className="inline-flex items-center gap-1 text-sm font-extrabold text-brand-red">
                          Learn More <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        </main>
        <PublicSiteFooter />
      </div>
    );
  }

  const relatedItems = items.filter((entry) => entry.slug !== item.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-otmg-page text-otmg-navy">
      <PublicSiteHeader />
      <main>
        <section className="mx-auto max-w-[1240px] px-4 py-10 lg:px-6 lg:py-14">
          <div className="grid overflow-hidden rounded-md bg-card shadow-mock lg:grid-cols-[0.86fr_1.14fr]">
            <div className="flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-12">
              <Link to={`/${kind}`} className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-otmg-blue-soft transition hover:text-brand-red">
                <ArrowLeft className="h-4 w-4" />
                Back to {label.toLowerCase()}
              </Link>
              <p className="inline-flex w-fit items-center gap-2 rounded-md bg-brand-red-soft px-3 py-2 text-xs font-extrabold uppercase tracking-[0.08em] text-brand-red">
                <item.icon className="h-3.5 w-3.5" />
                {item.eyebrow}
              </p>
              <h1 className="mt-5 max-w-[620px] font-display text-[2.8rem] font-extrabold uppercase leading-none text-otmg-navy sm:text-[4.1rem]">{item.title}</h1>
              <p className="mt-6 max-w-[610px] text-base font-medium leading-8 text-otmg-blue-soft">{item.summary}</p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                {item.primaryAction.href.startsWith("tel:") ? (
                  <Button className="btn-mock-red h-14 px-7 text-[14px] uppercase" asChild><a href={item.primaryAction.href}>{item.primaryAction.label} <ArrowRight className="ml-2 h-4 w-4" /></a></Button>
                ) : (
                  <Button className="btn-mock-red h-14 px-7 text-[14px] uppercase" asChild><Link to={item.primaryAction.href}>{item.primaryAction.label} <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
                )}
                {item.secondaryAction.href.startsWith("tel:") ? (
                  <Button variant="outline" className="btn-mock-outline h-14 px-7 text-[14px] uppercase" asChild><a href={item.secondaryAction.href}>{item.secondaryAction.label}</a></Button>
                ) : (
                  <Button variant="outline" className="btn-mock-outline h-14 px-7 text-[14px] uppercase" asChild><Link to={item.secondaryAction.href}>{item.secondaryAction.label}</Link></Button>
                )}
              </div>
            </div>
            <div className="relative min-h-[390px] lg:min-h-[590px]">
              <img src={item.image} alt={item.title} className="h-full w-full object-cover" loading="eager" width={1920} height={1080} />
              <div className="absolute inset-y-0 left-0 hidden w-32 bg-gradient-to-r from-card to-transparent lg:block" />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1240px] px-4 py-4 lg:px-6">
          <div className="grid gap-4 rounded-md bg-otmg-soft px-6 py-6 md:grid-cols-3">
            {item.metrics.map((metric) => (
              <div key={metric.label} className="border-otmg-border md:border-r md:last:border-r-0">
                <p className="font-display text-3xl font-extrabold text-brand-red">{metric.value}</p>
                <p className="mt-2 text-sm font-bold text-otmg-blue-soft">{metric.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-[1240px] px-4 py-10 lg:px-6">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-md border border-otmg-border bg-card p-7 shadow-card lg:p-9">
              <p className="text-sm font-extrabold uppercase tracking-[0.08em] text-brand-red">What this page covers</p>
              <h2 className="mt-3 font-display text-3xl font-extrabold text-otmg-navy">A clearer picture of the care experience.</h2>
              <div className="mt-8 grid gap-5 md:grid-cols-3">
                {item.features.map((feature) => (
                  <div key={feature.title} className="rounded-md bg-otmg-soft p-5">
                    <p className="font-display text-lg font-extrabold text-otmg-navy">{feature.title}</p>
                    <p className="mt-3 text-sm font-medium leading-7 text-otmg-blue-soft">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-md border border-otmg-border bg-card p-7 shadow-card lg:p-9">
              <p className="text-sm font-extrabold uppercase tracking-[0.08em] text-brand-red">Key highlights</p>
              <div className="mt-5 space-y-4">
                {item.highlights.map((highlight) => (
                  <div key={highlight} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-red" />
                    <p className="text-sm font-medium leading-7 text-otmg-blue-soft">{highlight}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 rounded-md bg-otmg-navy p-6 text-primary-foreground">
                <p className="text-sm font-semibold uppercase tracking-[0.08em] text-primary-foreground/75">Need help now?</p>
                <p className="mt-3 font-display text-2xl font-extrabold">Speak with our care coordination team.</p>
                <a href="tel:+14107544343" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary-foreground/90 transition hover:text-primary-foreground"><Phone className="h-4 w-4" />410-754-4343</a>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1240px] px-4 pb-14 lg:px-6">
          <div className="mb-8 text-center">
            <p className="text-sm font-extrabold uppercase tracking-[0.08em] text-brand-red">Related pages</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold uppercase text-otmg-navy">Keep Exploring</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {relatedItems.map((entry) => (
              <Link key={entry.slug} to={`/${kind}/${entry.slug}`} className="group block">
                <Card className="h-full rounded-md border-otmg-border bg-card shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-mock">
                  <CardContent className="space-y-4 p-6">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-red-soft text-brand-red"><entry.icon className="h-6 w-6" /></div>
                    <div><h3 className="font-display text-xl font-extrabold text-otmg-navy">{entry.title}</h3><p className="mt-2 text-sm font-medium leading-7 text-otmg-blue-soft">{entry.excerpt}</p></div>
                    <span className="inline-flex items-center gap-1 text-sm font-extrabold text-brand-red">Learn More <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" /></span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <PublicSiteFooter />
    </div>
  );
}
