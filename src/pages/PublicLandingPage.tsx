import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock3,
  HeartPulse,
  MonitorSmartphone,
  MoveRight,
  Shield,
  ShieldCheck,
  Siren,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { PublicSiteFooter } from "@/components/landing/PublicSiteFooter";
import { PublicSiteHeader } from "@/components/landing/PublicSiteHeader";
import { NotificationBanner } from "@/components/notifications/NotificationBanner";
import heroAtriumPremium from "@/assets/public-hero-real-hospital.jpg";
import overviewCommandImg from "@/assets/public-overview-command.jpg";
import {
  hospitalStats,
  landingFaqs,
  landingTestimonials,
  locationHighlights,
  publicOverviewCards,
  publicServices,
  publicSpecialties,
} from "@/data/publicSiteContent";

export default function PublicLandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <PublicSiteHeader />

      <main>
        <section className="container mx-auto px-4 pt-4 sm:px-6">
          <NotificationBanner audience="public" />
        </section>

        <section className="relative overflow-hidden border-b border-border bg-[radial-gradient(circle_at_top_left,_rgba(13,148,136,0.18),transparent_32%),radial-gradient(circle_at_85%_15%,_rgba(15,23,42,0.1),transparent_22%)]">
          <div className="absolute inset-0 medical-grid opacity-[0.16]" />
          <div className="ambient-orb -left-16 top-12 h-80 w-80 opacity-60" />
          <div className="ambient-orb right-[-8rem] top-24 h-[28rem] w-[28rem] opacity-50" />

          <div className="container relative mx-auto px-4 py-14 sm:px-6 lg:py-24">
            <div className="grid items-center gap-12 xl:grid-cols-[1.02fr_0.98fr]">
              <div className="max-w-3xl space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45 }}
                  className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-card/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-accent shadow-card backdrop-blur-md"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-red opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-red" />
                  </span>
                  A modern front door for serious healthcare
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.05 }}
                  className="max-w-4xl font-display text-4xl font-bold tracking-tight sm:text-5xl xl:text-7xl"
                >
                  A hospital experience people <span className="gradient-text">trust</span> from the very first screen.
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.1 }}
                  className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:text-[1.18rem]"
                >
                  Discover services, specialties, urgent access, and patient tools through a sharper digital entrance — modern, immediate, and deeply professional on every device.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.16 }}
                  className="flex flex-wrap gap-3"
                >
                  <Button size="lg" className="rounded-full px-7" asChild>
                    <Link to="/services">
                      Explore services
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="rounded-full px-7 border-brand-red/40 text-brand-red hover:bg-brand-red hover:text-white" asChild>
                    <a href="tel:+1800668463">
                      <Siren className="mr-2 h-4 w-4" />
                      24/7 Emergency
                    </a>
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.2 }}
                  className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
                >
                  {[
                    "24/7 urgent care routing",
                    "Premium patient-facing flows",
                    "Mobile-first patient access",
                    "Real services, real next steps",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 rounded-2xl border border-border/80 bg-card/80 px-4 py-3 text-sm text-foreground shadow-card backdrop-blur-md">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" />
                      <span>{item}</span>
                    </div>
                  ))}
                </motion.div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {hospitalStats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, delay: 0.24 + index * 0.06 }}
                      className="rounded-[1.75rem] border border-border bg-card/85 p-5 shadow-card backdrop-blur-md"
                    >
                      <stat.icon className="h-5 w-5 text-accent" />
                      <p className="mt-4 font-display text-3xl font-bold text-foreground">{stat.value}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.12 }}
                className="relative min-h-[34rem]"
              >
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                  className="relative w-full rounded-[2.2rem] border border-border/70 bg-card/75 p-3 shadow-elevated backdrop-blur-xl"
                >
                  <div className="relative overflow-hidden rounded-[1.8rem]">
                    <img
                      src={heroAtriumPremium}
                      alt="On Time Medical hospital atrium with marble floors, navy walls and warm sunset light"
                      className="h-[26rem] w-full object-cover sm:h-[34rem]"
                      loading="eager"
                      width={1920}
                      height={1080}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/10 to-transparent" />
                    <div className="absolute left-4 right-4 top-4 flex items-center justify-between gap-3 sm:left-6 sm:right-6">
                      <div className="inline-flex items-center gap-2 rounded-full bg-slate-950/70 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-md">
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-red opacity-75" />
                          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand-red" />
                        </span>
                        Live hospital access
                      </div>
                      <div className="rounded-full border border-white/20 bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                        Mobile-first experience
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 rounded-[1.6rem] border border-white/15 bg-slate-950/55 p-4 text-white backdrop-blur-md sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-xs">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">Digital front door</p>
                      <p className="mt-2 font-display text-2xl font-semibold leading-tight">Clear entry into care, diagnostics, and urgent access.</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 18, y: -8 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.4 }}
                  className="absolute -right-2 top-10 z-10 hidden w-[14rem] rounded-[1.6rem] border border-border bg-card/95 p-4 shadow-elevated backdrop-blur-xl sm:block"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-red-soft text-brand-red">
                      <MonitorSmartphone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Fast patient flow</p>
                      <p className="mt-1 text-sm font-medium text-foreground">Check-in, verify, register</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -18, y: 8 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.5 }}
                  className="absolute -bottom-4 -left-2 z-10 hidden w-[14rem] rounded-[1.6rem] border border-border bg-card/95 p-4 shadow-elevated backdrop-blur-xl sm:block"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-secondary text-accent">
                      <HeartPulse className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Immediate care routing</p>
                      <p className="mt-1 text-sm font-medium text-foreground">Emergency • Specialty • Diagnostics</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Services</p>
                <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                  Powerful pathways, not generic landing-page cards.
                </h2>
              </div>
              <Button variant="outline" className="rounded-full" asChild>
                <Link to="/services">Browse all services</Link>
              </Button>
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
              {publicServices.map((service, index) => (
                <motion.div
                  key={service.slug}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                >
                  <Link to={`/services/${service.slug}`} className="group block h-full">
                    <article className="grid h-full overflow-hidden rounded-[2rem] border border-border bg-card transition duration-300 hover:-translate-y-1 hover:border-accent/35 hover:shadow-elevated md:grid-cols-[0.9fr_1.1fr]">
                      <div className="relative min-h-[18rem] overflow-hidden">
                        <img src={service.image} alt={service.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                      </div>
                      <div className="flex flex-col justify-between p-6 lg:p-7">
                        <div>
                          <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                            <service.icon className="h-3.5 w-3.5" />
                            {service.eyebrow}
                          </div>
                          <h3 className="mt-4 font-display text-2xl font-bold tracking-tight">{service.title}</h3>
                          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{service.excerpt}</p>
                        </div>
                        <div className="mt-6 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock3 className="h-4 w-4 text-accent" />
                            Real page, real next steps
                          </div>
                          <span className="inline-flex items-center gap-1 text-sm font-semibold text-accent">
                            Learn More <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-muted/35 py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Specialties</p>
                <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                  Every specialty under one roof, and every one has its own page.
                </h2>
              </div>
              <Button variant="outline" className="rounded-full" asChild>
                <Link to="/specialties">See all specialties</Link>
              </Button>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {publicSpecialties.map((specialty, index) => (
                <motion.div
                  key={specialty.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: index * 0.04 }}
                >
                  <Link to={`/specialties/${specialty.slug}`} className="group block h-full rounded-[1.75rem] border border-border bg-card p-5 transition duration-300 hover:-translate-y-1 hover:border-accent/35 hover:shadow-elevated">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground">
                      <specialty.icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 font-display text-xl font-semibold tracking-tight">{specialty.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{specialty.excerpt}</p>
                    <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                      Explore specialty <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55 }}
                className="relative"
              >
                <div className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-elevated">
                  <img
                    src={overviewCommandImg}
                    alt="On Time Medical clinical command center with live patient flow dashboards"
                    className="h-[22rem] w-full object-cover sm:h-[28rem]"
                    loading="lazy"
                    width={1920}
                    height={1080}
                  />
                </div>
                <div className="absolute -bottom-5 -right-3 hidden rounded-2xl border border-brand-red/30 bg-card px-4 py-3 shadow-elevated sm:flex sm:items-center sm:gap-3">
                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-red opacity-75" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-brand-red" />
                  </span>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-red">Live coordination</p>
                    <p className="text-sm font-semibold text-foreground">Emergency · ICU · Wards</p>
                  </div>
                </div>
              </motion.div>

              <div className="max-w-2xl">
                <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                  <Sparkles className="h-3.5 w-3.5" />
                  Why this homepage feels different
                </p>
                <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                  Built like the digital front door of a serious care network.
                </h2>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  Every section connects to a real destination — services, specialties, urgent access, and patient utilities — through a sharper, modern interface that performs beautifully on desktop and mobile.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {publicOverviewCards.map((card, index) => (
                    <motion.article
                      key={card.title}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="rounded-[1.5rem] border border-border bg-card p-5 shadow-card transition hover:-translate-y-0.5 hover:border-accent/35"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary text-accent">
                        <card.icon className="h-5 w-5" />
                      </div>
                      <h3 className="mt-4 font-display text-lg font-semibold tracking-tight">{card.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{card.description}</p>
                    </motion.article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-gradient-hero py-16 text-primary-foreground lg:py-20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="mb-10 max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-foreground/70">Locations & access</p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                More depth, better structure, clearer public access.
              </h2>
            </div>
            <div className="grid gap-5 lg:grid-cols-3">
              {locationHighlights.map((location) => (
                <div key={location.name} className="rounded-[1.75rem] border border-primary-foreground/10 bg-primary-foreground/8 p-6 backdrop-blur-md">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-foreground/12 text-primary-foreground">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight">{location.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-primary-foreground/80">{location.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="mb-10 max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Patient perspective</p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                The experience should feel premium before the first appointment.
              </h2>
            </div>
            <div className="grid gap-5 lg:grid-cols-3">
              {landingTestimonials.map((testimonial) => (
                <article key={testimonial.name} className="rounded-[1.75rem] border border-border bg-card p-6 shadow-card">
                  <div className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-accent">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Verified patient feedback
                  </div>
                  <p className="mt-5 font-display text-xl leading-relaxed text-foreground">"{testimonial.quote}"</p>
                  <div className="mt-6">
                    <p className="font-display text-lg font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-muted/35 py-16 lg:py-20">
          <div className="container mx-auto grid gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Frequently asked questions</p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">Everything essential stays accessible.</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                The public site should explain the care journey clearly, then let patients decide when to move into booking, registration, or secure account access.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button className="rounded-full" asChild>
                  <a href="tel:+1800668463">Call care team</a>
                </Button>
                <Button variant="outline" className="rounded-full" asChild>
                  <a href="mailto:care@ontimemedical.com">Email care team</a>
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              {landingFaqs.map((faq, index) => (
                <div key={faq.question} className="overflow-hidden rounded-[1.5rem] border border-border bg-card shadow-card">
                  <button type="button"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                  >
                    <span className="font-display text-lg font-semibold tracking-tight">{faq.question}</span>
                    <ChevronRight className={`h-4 w-4 shrink-0 text-muted-foreground transition ${openFaq === index ? "rotate-90 text-accent" : ""}`} />
                  </button>
                  {openFaq === index && (
                    <div className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="rounded-[2rem] bg-gradient-brand p-8 text-primary-foreground shadow-elevated lg:p-12">
              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-foreground/70">Ready when you are</p>
                  <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                    Move from discovery into real care without losing the premium feel.
                  </h2>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-primary-foreground/85">
                    Start with service discovery, go deeper into specialties, then continue into patient registration, secure verification, or appointment booking only when needed.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                  <Button className="rounded-full bg-card text-card-foreground hover:bg-card/90" asChild>
                    <Link to="/services/smart-appointments">
                      Book appointment
                      <Calendar className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" className="rounded-full border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10" asChild>
                    <Link to="/patient-register">Patient registration</Link>
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
