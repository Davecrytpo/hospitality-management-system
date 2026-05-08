import { useState } from "react";
import { Link } from "react-router-dom";
import { AppointmentRequestDialog } from "@/components/landing/AppointmentRequestDialog";
import { PublicSiteFooter } from "@/components/landing/PublicSiteFooter";
import { PublicSiteHeader } from "@/components/landing/PublicSiteHeader";
import { Button } from "@/components/ui/button";
import {
  type ServiceAction,
  type ServiceBadge,
  type ServiceBulletPanel,
  type ServiceChoicePanel,
  type ServiceCtaPanel,
  type ServiceFooterColumn,
  type ServiceOffering,
  type ServicePageContent,
} from "@/data/servicePageContent";
import { cn } from "@/lib/utils";
import { CheckCircle2, ChevronRight } from "lucide-react";

function getOfferingGridClassName(rowLength: number) {
  if (rowLength <= 1) return "grid-cols-1";
  if (rowLength === 2) return "md:grid-cols-2";
  if (rowLength === 3) return "md:grid-cols-3";
  if (rowLength === 4) return "md:grid-cols-2 xl:grid-cols-4";
  if (rowLength === 5) return "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5";
  return "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6";
}

function renderAction(action: ServiceAction | undefined, onAppointment: () => void, variant: "red" | "outline") {
  if (!action) return null;

  if (action.kind === "appointment") {
    return (
      <Button
        className={cn(
          variant === "red"
            ? "btn-mock-red h-12 rounded-md px-7 text-[12px] font-black uppercase tracking-[0.04em]"
            : "h-11 rounded-md border border-white/30 bg-transparent px-6 text-[12px] font-black uppercase tracking-[0.04em] text-white hover:bg-white/10",
        )}
        variant={variant === "outline" ? "outline" : undefined}
        onClick={onAppointment}
      >
        {action.label}
      </Button>
    );
  }

  if (action.kind === "link") {
    return variant === "red" ? (
      <Button className="btn-mock-red h-12 rounded-md px-7 text-[12px] font-black uppercase tracking-[0.04em]" asChild>
        <Link to={action.href}>{action.label}</Link>
      </Button>
    ) : (
      <Button variant="outline" className="h-11 rounded-md border border-white/30 bg-transparent px-6 text-[12px] font-black uppercase tracking-[0.04em] text-white hover:bg-white/10" asChild>
        <Link to={action.href}>{action.label}</Link>
      </Button>
    );
  }

  return variant === "red" ? (
    <Button className="btn-mock-red h-12 rounded-md px-7 text-[12px] font-black uppercase tracking-[0.04em]" asChild>
      <a href={action.href}>{action.label}</a>
    </Button>
  ) : (
    <Button variant="outline" className="h-11 rounded-md border border-white/30 bg-transparent px-6 text-[12px] font-black uppercase tracking-[0.04em] text-white hover:bg-white/10" asChild>
      <a href={action.href}>{action.label}</a>
    </Button>
  );
}

function BadgeChip({ badge }: { badge: ServiceBadge }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={cn(
          "flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full",
          badge.accent === "red" ? "bg-[#fff0f0] text-[#ef2027]" : "bg-[#eff5ff] text-[#13306b]",
        )}
      >
        <badge.icon className="h-6 w-6" strokeWidth={1.9} />
      </div>
      <span className="max-w-[125px] text-[0.92rem] font-semibold leading-7 text-[#13306b]">{badge.label}</span>
    </div>
  );
}

function OfferingCard({ offering, compact = false }: { offering: ServiceOffering; compact?: boolean }) {
  return (
    <article className="flex h-full flex-col rounded-[18px] border border-[#e4ebf7] bg-white px-5 py-7 text-center shadow-[0_18px_40px_-38px_rgba(19,48,107,0.18)]">
      <div
        className={cn(
          "mx-auto flex h-[74px] w-[74px] items-center justify-center rounded-full",
          offering.accent === "red" ? "bg-[#fff0f0] text-[#ef2027]" : "bg-[#eff5ff] text-[#13306b]",
          compact && "h-[68px] w-[68px]",
        )}
      >
        <offering.icon className={cn(compact ? "h-8 w-8" : "h-9 w-9")} strokeWidth={1.8} />
      </div>
      <h3 className={cn("mt-6 font-black leading-tight text-[#13306b]", compact ? "text-[1rem]" : "text-[1.06rem]")}>{offering.title}</h3>
      <p className={cn("mt-4 leading-7 text-[#13306b]", compact ? "text-[0.83rem]" : "text-[0.92rem]")}>{offering.description}</p>
    </article>
  );
}

function SplitOfferingRow({ offerings, isLast }: { offerings: ServiceOffering[]; isLast: boolean }) {
  return (
    <div className={cn("grid md:grid-cols-3", !isLast && "border-b border-[#e8eef8]")}>
      {offerings.map((offering, index) => (
        <article
          key={offering.title}
          className={cn(
            "px-4 py-8 sm:px-6 lg:px-8",
            index < offerings.length - 1 && "md:border-r md:border-[#e8eef8]",
          )}
        >
          <div className="flex items-start gap-4">
            <div
              className={cn(
                "flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-full",
                offering.accent === "red" ? "bg-[#fff0f0] text-[#ef2027]" : "bg-[#eff5ff] text-[#13306b]",
              )}
            >
              <offering.icon className="h-8 w-8" strokeWidth={1.8} />
            </div>
            <div className="pt-1">
              <h3 className="text-[1.06rem] font-black leading-tight text-[#13306b]">{offering.title}</h3>
              <p className="mt-3 max-w-[260px] text-[0.92rem] leading-8 text-[#13306b]">{offering.description}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function ConditionCard({ offering }: { offering: ServiceOffering }) {
  return (
    <article className="flex h-full flex-col rounded-[18px] border border-[#e4ebf7] bg-white px-6 py-7 shadow-[0_18px_40px_-38px_rgba(19,48,107,0.18)]">
      <div
        className={cn(
          "flex h-[72px] w-[72px] items-center justify-center rounded-full",
          offering.accent === "red" ? "bg-[#fff0f0] text-[#ef2027]" : "bg-[#eff5ff] text-[#13306b]",
        )}
      >
        <offering.icon className="h-8 w-8" strokeWidth={1.8} />
      </div>
      <h3 className="mt-5 text-[1.08rem] font-black leading-tight text-[#13306b]">{offering.title}</h3>
      <p className="mt-3 text-[0.9rem] leading-7 text-[#13306b]">{offering.description}</p>
      <ul className="mt-5 space-y-2.5">
        {(offering.bullets ?? []).map((bullet) => (
          <li key={bullet} className="flex items-start gap-3 text-[0.88rem] leading-6 text-[#13306b]">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#ef2027]" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function BulletPanel({ panel }: { panel: ServiceBulletPanel }) {
  return (
    <article className="relative overflow-hidden rounded-[20px] border border-[#dfE8f6] bg-[#f4f8ff] px-6 py-7 shadow-[0_18px_40px_-38px_rgba(19,48,107,0.16)] lg:px-7">
      <h3 className="text-[1.55rem] font-black leading-tight text-[#13306b]">{panel.title}</h3>
      <div className="mt-3 h-[4px] w-14 rounded-full bg-[#ef2027]" />
      {panel.intro && <p className="mt-4 max-w-[560px] text-[0.96rem] leading-8 text-[#13306b]">{panel.intro}</p>}
      <div className={cn("mt-6 grid gap-x-8 gap-y-3", panel.columns === 2 ? "md:grid-cols-2" : "grid-cols-1")}>
        {panel.bullets.map((bullet) => (
          <div key={`${bullet.label ?? ""}${bullet.text}`} className="flex items-start gap-3 text-[0.92rem] leading-7 text-[#13306b]">
            <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#ef2027]" />
            <span>
              {bullet.label && <strong className="font-black">{bullet.label}: </strong>}
              {bullet.text}
            </span>
          </div>
        ))}
      </div>
      {panel.note && (
        <div className="mt-6 flex items-start gap-3 rounded-[16px] bg-white/80 px-4 py-4 text-[0.92rem] leading-7 text-[#13306b]">
          {panel.noteIcon && <panel.noteIcon className="mt-1 h-5 w-5 shrink-0 text-[#13306b]" />}
          <span>{panel.note}</span>
        </div>
      )}
      {panel.watermarkIcon && <panel.watermarkIcon className="pointer-events-none absolute bottom-5 right-5 h-24 w-24 text-[#dbe4f7]" strokeWidth={1.2} />}
    </article>
  );
}

function CtaPanel({ panel, onAppointment }: { panel: ServiceCtaPanel; onAppointment: () => void }) {
  return (
    <article className="flex h-full flex-col items-center justify-center rounded-[20px] bg-[#10306a] px-7 py-8 text-center text-white shadow-[0_22px_46px_-34px_rgba(16,48,106,0.58)]">
      <panel.icon className="h-16 w-16 text-[#ffd2d4]" strokeWidth={1.5} />
      <h3 className="mt-6 text-[1.7rem] font-black leading-tight">{panel.title}</h3>
      <p className="mt-4 max-w-[360px] text-[1rem] leading-8 text-white/90">{panel.intro}</p>
      <div className="mt-7">{renderAction(panel.action, onAppointment, "red")}</div>
      {panel.footnote && <p className="mt-4 text-[0.92rem] leading-6 text-white/80">{panel.footnote}</p>}
    </article>
  );
}

function ChoicePanel({ panel }: { panel: ServiceChoicePanel }) {
  return (
    <article className="rounded-[20px] bg-[#10306a] px-7 py-8 text-white shadow-[0_22px_46px_-34px_rgba(16,48,106,0.58)]">
      <h3 className="text-[1.7rem] font-black leading-tight">{panel.title}</h3>
      <div className="mt-3 h-[4px] w-14 rounded-full bg-[#ef2027]" />
      <p className="mt-4 text-[1rem] leading-8 text-white/90">{panel.intro}</p>
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {panel.options.map((option, index) => (
          <div key={option.title} className={cn("flex items-start gap-4", index === 0 ? "md:border-r md:border-white/15 md:pr-5" : "md:pl-1")}>
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-white/25 text-white">
              <option.icon className="h-7 w-7" strokeWidth={1.7} />
            </div>
            <div>
              <h4 className="text-[1.25rem] font-black leading-tight">{option.title}</h4>
              <p className="mt-3 text-[0.95rem] leading-7 text-white/85">{option.description}</p>
            </div>
          </div>
        ))}
      </div>
      {panel.footnote && <p className="mt-6 border-t border-white/15 pt-5 text-center text-[0.96rem] font-semibold text-white/90">{panel.footnote}</p>}
    </article>
  );
}

function FooterColumnCard({ column, onAppointment }: { column: ServiceFooterColumn; onAppointment: () => void }) {
  return (
    <div className="flex h-full items-center gap-5 border-b border-white/12 px-7 py-7 lg:border-b-0 lg:px-8">
      <div className="flex h-[76px] w-[76px] shrink-0 items-center justify-center rounded-full border-2 border-white/35 text-white">
        <column.icon className="h-9 w-9" strokeWidth={1.7} />
      </div>
      <div className="min-w-0">
        <h4 className="text-[1.12rem] font-black leading-tight text-white">{column.title}</h4>
        {column.emphasis && <p className="mt-3 text-[2rem] font-black leading-none tracking-tight text-white">{column.emphasis}</p>}
        <p className="mt-3 whitespace-pre-line text-[0.94rem] leading-6 text-white/82">{column.description}</p>
        {column.action && <div className="mt-5">{renderAction(column.action, onAppointment, column.action.kind === "link" && column.title.includes("Portal") ? "outline" : "red")}</div>}
      </div>
    </div>
  );
}

export default function PublicServicePage({ service }: { service: ServicePageContent }) {
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const shellClassName = "mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8";
  const longestRow = Math.max(...service.offeringRows.map((row) => row.length));
  const hasStageItems = service.stageBand.items.length > 0;

  return (
    <div className="min-h-screen bg-white text-[#13306b]">
      <PublicSiteHeader />

      <main className="overflow-x-hidden bg-white pb-8">
        <section className="pt-5 lg:pt-7">
          <div className={shellClassName}>
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:items-start">
              <div className="pt-2">
                <nav className="mb-6 flex flex-wrap items-center gap-2 text-[0.9rem] text-[#4f6796]">
                  <Link to="/" className="hover:text-[#ef2027]">
                    Home
                  </Link>
                  <ChevronRight className="h-4 w-4" />
                  <Link to="/services" className="hover:text-[#ef2027]">
                    Services
                  </Link>
                  <ChevronRight className="h-4 w-4" />
                  <span className="font-bold text-[#13306b]">{service.breadcrumbLabel}</span>
                </nav>

                <h1 className="hero-mock-title text-[3.15rem] font-black leading-[0.92] tracking-tight text-[#13306b] sm:text-[4rem] lg:text-[4.55rem]">
                  {service.titleLines.map((line) => (
                    <span
                      key={line.text}
                      className={cn("block", line.size === "small" && "text-[2.05rem] leading-[1.02] sm:text-[2.3rem] lg:text-[2.45rem]")}
                    >
                      {line.text}
                    </span>
                  ))}
                </h1>
                <div className="mt-4 h-[4px] w-16 rounded-full bg-[#ef2027]" />
                {service.subtitle.length > 0 && <p className="mt-5 text-[1.18rem] font-medium leading-9 text-[#ef2027]">{service.subtitle}</p>}
                <p className="mt-4 max-w-[520px] text-[1rem] leading-8 text-[#13306b]">{service.description}</p>

                <div className="mt-8 flex flex-wrap gap-x-5 gap-y-4">
                  {service.heroBadges.map((badge) => (
                    <BadgeChip key={badge.label} badge={badge} />
                  ))}
                </div>
              </div>

              <div className="justify-self-end">
                <div className="relative overflow-hidden">
                  <img src={service.heroImage} alt={service.breadcrumbLabel} className="w-full max-w-[580px]" loading="eager" />
                  <div className="pointer-events-none absolute inset-y-0 left-0 w-9 bg-gradient-to-r from-white via-white/80 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pt-5 lg:pt-7">
          <div className={shellClassName}>
            <div className="text-center">
              <h2 className="hero-mock-title text-[2.55rem] font-black leading-none tracking-tight text-[#13306b] sm:text-[2.85rem]">{service.sectionTitle}</h2>
              <div className="mx-auto mt-3 h-[4px] w-16 rounded-full bg-[#ef2027]" />
              {service.sectionSubtitle.length > 0 && (
                <p className="mx-auto mt-4 max-w-[760px] text-[1.05rem] leading-8 text-[#13306b]">{service.sectionSubtitle}</p>
              )}
            </div>

            {service.offeringsStyle === "split" ? (
              <div className="mt-8 overflow-hidden rounded-[20px] bg-white">
                {service.offeringRows.map((row, index) => (
                  <SplitOfferingRow key={`${service.slug}-${index}`} offerings={row} isLast={index === service.offeringRows.length - 1} />
                ))}
              </div>
            ) : (
              <div className="mt-8 space-y-4">
                {service.offeringRows.map((row, index) => (
                  <div
                    key={`${service.slug}-${index}`}
                    className={cn(
                      "grid gap-4",
                      getOfferingGridClassName(row.length),
                      row.length <= 3 && row.length < longestRow && longestRow >= 5 && "mx-auto w-full max-w-[980px]",
                    )}
                  >
                    {row.map((offering) =>
                      service.offeringsStyle === "condition" ? (
                        <ConditionCard key={offering.title} offering={offering} />
                      ) : (
                        <OfferingCard key={offering.title} offering={offering} compact={longestRow >= 6} />
                      ),
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="pt-6 lg:pt-8">
          <div className={shellClassName}>
            <div className="grid gap-5 lg:grid-cols-[1.08fr_0.92fr]">
              {service.lowerLeftPanel.type === "bulletCard" && <BulletPanel panel={service.lowerLeftPanel} />}
              {service.lowerRightPanel.type === "ctaCard" && <CtaPanel panel={service.lowerRightPanel} onAppointment={() => setAppointmentOpen(true)} />}
              {service.lowerRightPanel.type === "choiceCard" && <ChoicePanel panel={service.lowerRightPanel} />}
            </div>
          </div>
        </section>

        <section className="pt-6 lg:pt-8">
          <div className={shellClassName}>
            <div className="rounded-[18px] border border-[#e2e9f6] bg-[#fbfcff] px-6 py-5 shadow-[0_16px_34px_-34px_rgba(19,48,107,0.18)]">
              <div className={cn("grid gap-6", hasStageItems && "lg:grid-cols-[0.48fr_0.52fr] lg:items-center")}>
                <div className={cn("flex items-start gap-5", !hasStageItems && "mx-auto max-w-[760px]")}>
                  <div
                    className={cn(
                      "flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-full",
                      service.stageBand.accent === "red" ? "bg-[#fff0f0] text-[#ef2027]" : "bg-[#eff5ff] text-[#13306b]",
                    )}
                  >
                    <service.stageBand.icon className="h-9 w-9" strokeWidth={1.7} />
                  </div>
                  <div>
                    <h3 className="text-[1.8rem] font-black leading-tight text-[#13306b]">{service.stageBand.title}</h3>
                    <p className="mt-3 max-w-[520px] text-[0.96rem] leading-8 text-[#13306b]">{service.stageBand.description}</p>
                  </div>
                </div>

                {hasStageItems && (
                  <div className={cn("grid gap-3", service.stageBand.items.length === 3 ? "md:grid-cols-3" : service.stageBand.items.length === 4 ? "md:grid-cols-4" : "md:grid-cols-5")}>
                    {service.stageBand.items.map((item, index) => (
                      <div
                        key={item.label}
                        className={cn(
                          "flex flex-col items-center justify-center gap-3 border-t border-[#e3e9f5] px-4 pt-5 text-center md:border-t-0 md:pt-0",
                          index > 0 && "md:border-l md:border-[#e3e9f5]",
                        )}
                      >
                        <div
                          className={cn(
                            "flex h-[64px] w-[64px] items-center justify-center rounded-full",
                            item.accent === "red" ? "bg-[#fff0f0] text-[#ef2027]" : "bg-[#eff5ff] text-[#13306b]",
                          )}
                        >
                          <item.icon className="h-8 w-8" strokeWidth={1.8} />
                        </div>
                        <span className="text-[0.92rem] font-semibold leading-6 text-[#13306b]">{item.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="pt-6 lg:pt-8">
          <div className={shellClassName}>
            <div className="grid overflow-hidden rounded-[22px] bg-[#10306a] text-white shadow-[0_26px_58px_-42px_rgba(16,48,106,0.6)] lg:grid-cols-3">
              {service.footerColumns.map((column, index) => (
                <div key={column.title} className={cn(index < service.footerColumns.length - 1 && "lg:border-r lg:border-white/12")}>
                  <FooterColumnCard column={column} onAppointment={() => setAppointmentOpen(true)} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <PublicSiteFooter />
      <AppointmentRequestDialog open={appointmentOpen} onOpenChange={setAppointmentOpen} />
    </div>
  );
}
