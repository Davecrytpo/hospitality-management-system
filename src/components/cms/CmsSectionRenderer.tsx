import { Link } from "react-router-dom";
import { ArrowRight, Quote } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { getCmsIcon } from "@/features/cms/icons";
import type {
  CmsBlogPost,
  CmsFaq,
  CmsItem,
  CmsPage,
  CmsSection,
  CmsService,
  CmsSiteSettings,
  CmsTeamMember,
  CmsTestimonial,
} from "@/features/cms/types";
import { cn } from "@/lib/utils";

type ResolvedCmsItem = CmsItem;

interface CmsSectionRendererProps {
  section: CmsSection;
  page?: CmsPage | null;
  service?: CmsService | null;
  services: CmsService[];
  faqs: CmsFaq[];
  testimonials: CmsTestimonial[];
  teamMembers: CmsTeamMember[];
  posts: CmsBlogPost[];
  settings?: CmsSiteSettings;
}

function SectionButtons({ section }: { section: CmsSection }) {
  if (section.buttons.length === 0) return null;

  return (
    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
      {section.buttons.map((action) => {
        const className =
          action.variant === "outline"
            ? "border-2 border-current/15 bg-transparent text-[var(--cms-text)] hover:bg-[var(--cms-soft)]"
            : action.variant === "ghost"
              ? "bg-transparent text-[var(--cms-text)] hover:bg-[var(--cms-soft)]"
              : action.variant === "secondary"
                ? "bg-[var(--cms-soft)] text-[var(--cms-text)] hover:bg-[var(--cms-soft)]/80"
                : "bg-[var(--cms-accent)] text-white hover:bg-[var(--cms-accent)]/90";

        const content = (
          <>
            <span>{action.label}</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        );

        const isInternal = action.href.startsWith("/");

        return (
          <Button key={action.id} className={cn("h-12 rounded-md px-6 text-[13px] font-bold uppercase tracking-[0.04em]", className)} asChild>
            {isInternal ? (
              <Link to={action.href}>{content}</Link>
            ) : (
              <a href={action.href} target={action.newTab ? "_blank" : undefined} rel={action.newTab ? "noreferrer" : undefined}>
                {content}
              </a>
            )}
          </Button>
        );
      })}
    </div>
  );
}

function resolveItems({
  section,
  page,
  services,
  faqs,
  testimonials,
  teamMembers,
  posts,
}: Pick<CmsSectionRendererProps, "section" | "page" | "services" | "faqs" | "testimonials" | "teamMembers" | "posts">) {
  switch (section.dataSource) {
    case "services": {
      const visibleServices = page?.slug === "home" || page?.pageType === "home" ? services.filter((service) => service.featuredOnHome) : services;

      return visibleServices.map((service): ResolvedCmsItem => ({
        id: service.id,
        title: service.title,
        subtitle: service.categoryLabel,
        description: service.excerpt,
        href: `/services/${service.slug}`,
        image: service.previewImage,
        icon: service.icon,
      }));
    }
    case "faqs":
      return faqs.map((faq): ResolvedCmsItem => ({
        id: faq.id,
        title: faq.question,
        description: faq.answer,
      }));
    case "testimonials":
      return testimonials.map((testimonial): ResolvedCmsItem => ({
        id: testimonial.id,
        title: testimonial.name,
        subtitle: testimonial.role,
        description: testimonial.quote,
        image: testimonial.image,
        value: `${testimonial.rating}/5`,
      }));
    case "team":
      return teamMembers.map((member): ResolvedCmsItem => ({
        id: member.id,
        title: member.name,
        subtitle: member.role,
        description: member.bio,
        image: member.image,
        metadata: [member.specialty ?? "", member.email ?? "", member.phone ?? ""].filter(Boolean),
      }));
    case "blog-posts":
      return posts.map((post): ResolvedCmsItem => ({
        id: post.id,
        title: post.title,
        subtitle: `${post.category} - ${post.authorName}`,
        description: post.excerpt,
        href: `/blog/${post.slug}`,
        image: post.coverImage,
      }));
    default:
      return section.items;
  }
}

function renderSectionCard(item: ReturnType<typeof resolveItems>[number], showLink = true) {
  const Icon = getCmsIcon(item.icon);

  return (
    <article key={item.id} className="flex h-full flex-col overflow-hidden rounded-[20px] border border-[#dde5f4] bg-white shadow-[0_20px_50px_-42px_rgba(19,48,107,0.28)]">
      {item.image?.url && <img src={item.image.url} alt={item.image.alt} className="h-52 w-full object-cover" loading="lazy" />}
      <div className="flex h-full flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--cms-soft)] text-[var(--cms-primary)]">
            <Icon className="h-6 w-6" />
          </div>
          {item.badge && <span className="rounded-full bg-[var(--cms-accent)]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--cms-accent)]">{item.badge}</span>}
        </div>
        <h3 className="mt-5 text-[1.1rem] font-black leading-tight text-[var(--cms-text)]">{item.title}</h3>
        {item.subtitle && <p className="mt-2 text-sm font-semibold text-[var(--cms-accent)]">{item.subtitle}</p>}
        {item.value && <p className="mt-2 text-[1.85rem] font-black leading-none text-[var(--cms-primary)]">{item.value}</p>}
        {item.description && <p className="mt-4 text-[0.95rem] leading-7 text-[#4f6796]">{item.description}</p>}
        {item.bullets && item.bullets.length > 0 && (
          <ul className="mt-4 space-y-2 text-sm leading-6 text-[#4f6796]">
            {item.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--cms-accent)]" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        )}
        {item.metadata && item.metadata.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {item.metadata.map((entry) => (
              <span key={entry} className="rounded-full bg-[var(--cms-soft)] px-3 py-1 text-xs font-semibold text-[var(--cms-text)]">
                {entry}
              </span>
            ))}
          </div>
        )}
        {showLink && item.href && (
          <Link to={item.href} className="mt-auto inline-flex items-center pt-6 text-[0.82rem] font-black uppercase tracking-[0.08em] text-[var(--cms-accent)]">
            Explore
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        )}
      </div>
    </article>
  );
}

function HeroSection({ section }: { section: CmsSection }) {
  return (
    <section className="pt-4 lg:pt-7">
      <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:items-start">
          <div className="pt-3 lg:pt-6">
            {section.eyebrow && <p className="text-sm font-bold uppercase tracking-[0.12em] text-[var(--cms-accent)]">{section.eyebrow}</p>}
            <h1 className="mt-3 text-[3rem] font-black uppercase leading-[0.92] tracking-tight text-[var(--cms-text)] sm:text-[3.8rem] lg:text-[4.6rem]">
              {section.title}
            </h1>
            <div className="mt-4 h-[4px] w-16 rounded-full bg-[var(--cms-accent)]" />
            {section.subtitle && <p className="mt-5 text-[1.2rem] font-medium leading-8 text-[var(--cms-accent)]">{section.subtitle}</p>}
            {section.body && <p className="mt-4 max-w-[560px] text-[1rem] leading-8 text-[#4f6796]">{section.body}</p>}
            <SectionButtons section={section} />
            {section.items.length > 0 && (
              <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {section.items.map((entry) => {
                  const Icon = getCmsIcon(entry.icon);
                  return (
                    <div key={entry.id} className="flex items-center gap-3 rounded-[18px] border border-[#dde5f4] bg-white p-4 shadow-[0_16px_34px_-30px_rgba(19,48,107,0.22)]">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--cms-soft)] text-[var(--cms-primary)]">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm font-black leading-6 text-[var(--cms-text)]">{entry.title}</p>
                        {entry.description && <p className="text-xs leading-5 text-[#4f6796]">{entry.description}</p>}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div className="relative z-10 flex justify-center lg:justify-end">
            {section.image?.url && <img src={section.image.url} alt={section.image.alt} className="w-full max-w-[620px] rounded-[28px] shadow-[0_28px_60px_-40px_rgba(19,48,107,0.42)]" loading="eager" />}
          </div>
        </div>
      </div>
    </section>
  );
}

export function CmsSectionRenderer(props: CmsSectionRendererProps) {
  const { section } = props;

  if (!section.isVisible) return null;

  if (section.type === "hero") {
    return <HeroSection section={section} />;
  }

  const items = resolveItems(props);
  const columnsClass =
    section.columns === 4 ? "md:grid-cols-2 xl:grid-cols-4" : section.columns === 2 ? "md:grid-cols-2" : "md:grid-cols-2 xl:grid-cols-3";

  if (section.type === "richText") {
    return (
      <section className="py-8 lg:py-10">
        <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 rounded-[24px] border border-[#dde5f4] bg-white p-8 shadow-[0_20px_50px_-42px_rgba(19,48,107,0.28)] lg:grid-cols-[1fr_0.92fr] lg:p-10">
            <div>
              <h2 className="text-[2.2rem] font-black uppercase leading-none tracking-tight text-[var(--cms-text)] sm:text-[2.7rem]">{section.title}</h2>
              {section.subtitle && <p className="mt-4 text-[1rem] font-medium leading-7 text-[var(--cms-accent)]">{section.subtitle}</p>}
              {section.body && <p className="mt-5 whitespace-pre-line text-[1rem] leading-8 text-[#4f6796]">{section.body}</p>}
              <SectionButtons section={section} />
            </div>
            {section.image?.url && <img src={section.image.url} alt={section.image.alt} className="w-full rounded-[20px] object-cover shadow-[0_22px_44px_-36px_rgba(19,48,107,0.28)]" loading="lazy" />}
          </div>
        </div>
      </section>
    );
  }

  if (section.type === "faqList") {
    return (
      <section className="py-8 lg:py-10">
        <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-[900px]">
            <h2 className="text-[2.2rem] font-black uppercase leading-none tracking-tight text-[var(--cms-text)] sm:text-[2.7rem]">{section.title}</h2>
            {section.subtitle && <p className="mt-4 text-[1rem] leading-8 text-[#4f6796]">{section.subtitle}</p>}
          </div>
          <div className="mt-8 rounded-[22px] border border-[#dde5f4] bg-white p-4 shadow-[0_20px_50px_-42px_rgba(19,48,107,0.28)] sm:p-6">
            <Accordion type="single" collapsible className="space-y-2">
              {items.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id} className="rounded-[16px] border border-[#e6edf8] px-5">
                  <AccordionTrigger className="text-left text-[1rem] font-bold text-[var(--cms-text)]">{faq.title}</AccordionTrigger>
                  <AccordionContent className="pt-2 text-[0.95rem] leading-7 text-[#4f6796]">{faq.description}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    );
  }

  if (section.type === "testimonialList") {
    return (
      <section className="py-8 lg:py-10">
        <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-[860px]">
            <h2 className="text-[2.2rem] font-black uppercase leading-none tracking-tight text-[var(--cms-text)] sm:text-[2.7rem]">{section.title}</h2>
            {section.subtitle && <p className="mt-4 text-[1rem] leading-8 text-[#4f6796]">{section.subtitle}</p>}
          </div>
          <div className={cn("mt-8 grid gap-5", columnsClass)}>
            {items.map((testimonial) => (
              <article key={testimonial.id} className="rounded-[20px] border border-[#dde5f4] bg-white p-6 shadow-[0_20px_50px_-42px_rgba(19,48,107,0.28)]">
                <Quote className="h-8 w-8 text-[var(--cms-accent)]" />
                <p className="mt-4 text-[1rem] leading-8 text-[#4f6796]">&quot;{testimonial.description}&quot;</p>
                <div className="mt-6">
                  <p className="font-black text-[var(--cms-text)]">{testimonial.title}</p>
                  {testimonial.subtitle && <p className="text-sm font-medium text-[var(--cms-accent)]">{testimonial.subtitle}</p>}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (section.type === "cta") {
    return (
      <section className="py-8 lg:py-10">
        <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <div className="rounded-[24px] bg-[var(--cms-primary)] px-8 py-10 text-white shadow-[0_26px_58px_-42px_rgba(16,48,106,0.6)] lg:px-12">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <h2 className="text-[2rem] font-black uppercase leading-none tracking-tight sm:text-[2.6rem]">{section.title}</h2>
                {section.body && <p className="mt-5 max-w-[720px] text-[1rem] leading-8 text-white/82">{section.body}</p>}
              </div>
              <div>
                <SectionButtons section={section} />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 lg:py-10">
      <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-[900px]">
          <h2 className="text-[2.2rem] font-black uppercase leading-none tracking-tight text-[var(--cms-text)] sm:text-[2.7rem]">{section.title}</h2>
          {section.subtitle && <p className="mt-4 text-[1rem] leading-8 text-[#4f6796]">{section.subtitle}</p>}
          {section.body && <p className="mt-4 text-[1rem] leading-8 text-[#4f6796]">{section.body}</p>}
        </div>
        <div className={cn("mt-8 grid gap-5", columnsClass)}>
          {items.map((entry) => renderSectionCard(entry, section.type !== "stats" && section.type !== "timeline" && section.type !== "contactCards" && section.type !== "teamGrid"))}
        </div>
      </div>
    </section>
  );
}

interface CmsDocumentRendererProps {
  page?: CmsPage | null;
  service?: CmsService | null;
  sectionsOverride?: CmsSection[];
  services: CmsService[];
  faqs: CmsFaq[];
  testimonials: CmsTestimonial[];
  teamMembers: CmsTeamMember[];
  posts: CmsBlogPost[];
  settings?: CmsSiteSettings;
}

export function CmsDocumentRenderer({ page, service, sectionsOverride, services, faqs, testimonials, teamMembers, posts, settings }: CmsDocumentRendererProps) {
  const sections = sectionsOverride ?? service?.sections ?? page?.sections ?? [];

  return (
    <>
      {sections.map((section) => (
        <CmsSectionRenderer
          key={section.id}
          section={section}
          page={page}
          service={service}
          services={services}
          faqs={faqs}
          testimonials={testimonials}
          teamMembers={teamMembers}
          posts={posts}
          settings={settings}
        />
      ))}
    </>
  );
}
