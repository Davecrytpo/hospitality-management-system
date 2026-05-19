import type { LucideIcon } from "lucide-react";
import { getServicePageContent, serviceDirectoryCards, type ServiceAction, type ServiceBadge, type ServiceBulletPanel, type ServiceChoice, type ServiceChoicePanel, type ServiceDirectoryCard, type ServiceFooterColumn, type ServiceOffering, type ServicePageContent, type ServicePanel, type ServiceStageBandItem } from "@/data/servicePageContent";
import { getCmsIcon } from "./icons";
import { preferPublicCopy, sectionLooksLikePlaceholder, serviceLooksLikePlaceholder } from "./publicContent";
import type { CmsButton, CmsItem, CmsSection, CmsService } from "./types";

function toIcon(name: CmsItem["icon"] | CmsService["icon"] | undefined, fallback: LucideIcon) {
  return (name ? getCmsIcon(name) : fallback) as unknown as LucideIcon;
}

function mapButtonToAction(button: CmsButton | undefined, fallback: ServiceAction): ServiceAction {
  if (!button) return fallback;

  if (button.href.startsWith("tel:")) {
    return { kind: "phone", label: button.label, href: button.href };
  }

  if (button.href.startsWith("/")) {
    return { kind: "link", label: button.label, href: button.href };
  }

  if (button.href.startsWith("http")) {
    return { kind: "link", label: button.label, href: button.href };
  }

  return button.label.toLowerCase().includes("book") || button.label.toLowerCase().includes("appointment")
    ? { kind: "appointment", label: button.label }
    : fallback;
}

function mapItemsToOfferings(items: CmsItem[], fallbackItems: ServiceOffering[]) {
  if (items.length === 0) return fallbackItems;

  return items.map((item, index) => {
    const fallback = fallbackItems[index] ?? fallbackItems[fallbackItems.length - 1];

    return {
      title: preferPublicCopy(item.title, fallback?.title || ""),
      description: preferPublicCopy(item.description, fallback?.description || ""),
      icon: toIcon(item.icon, fallback?.icon ?? fallbackItems[0]?.icon),
      accent: item.badge?.toLowerCase().includes("red") ? "red" : fallback?.accent ?? (index % 2 === 0 ? "blue" : "red"),
      bullets: item.bullets && item.bullets.length > 0 ? item.bullets : fallback?.bullets,
    } satisfies ServiceOffering;
  });
}

function mapItemsToBadges(items: CmsItem[], fallbackBadges: ServiceBadge[]) {
  if (items.length === 0) return fallbackBadges;

  return items.map((item, index) => {
    const fallback = fallbackBadges[index] ?? fallbackBadges[fallbackBadges.length - 1];

    return {
      label: preferPublicCopy(item.title, fallback?.label || ""),
      icon: toIcon(item.icon, fallback?.icon ?? fallbackBadges[0]?.icon),
      accent: item.badge?.toLowerCase().includes("red") ? "red" : fallback?.accent ?? (index % 2 === 0 ? "blue" : "red"),
    } satisfies ServiceBadge;
  });
}

function parseTitleLines(title: string | undefined, fallback: ServicePageContent["titleLines"]): ServicePageContent["titleLines"] {
  const normalized = title?.trim();
  if (!normalized) return fallback;

  const lines = normalized
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length === 0) return fallback;

  return lines.map((line) => ({
    text: line,
    ...(line.startsWith("(") && line.endsWith(")") ? { size: "small" as const } : {}),
  }));
}

function mapItemsToChoices(items: CmsItem[], fallbackChoices: ServiceChoice[] | undefined) {
  if (!fallbackChoices || fallbackChoices.length === 0) return undefined;
  if (items.length === 0) return fallbackChoices;

  return items.map((item, index) => {
    const fallback = fallbackChoices[index] ?? fallbackChoices[fallbackChoices.length - 1];

    return {
      title: preferPublicCopy(item.title, fallback?.title || ""),
      description: preferPublicCopy(item.description, fallback?.description || ""),
      icon: toIcon(item.icon, fallback?.icon ?? fallbackChoices[0]?.icon),
    } satisfies ServiceChoice;
  });
}

function mapBulletPanel(section: CmsSection | undefined, fallback: ServiceBulletPanel): ServiceBulletPanel {
  if (!section) return fallback;

  return {
    ...fallback,
    title: preferPublicCopy(section.title, fallback.title),
    intro: preferPublicCopy(section.body, fallback.intro || ""),
    note: preferPublicCopy(section.subtitle, fallback.note || ""),
    bullets:
      section.items.length > 0
        ? section.items.map((item) => {
            const label = item.title ? preferPublicCopy(item.title, "") : "";
            return {
              label: label || undefined,
              text: preferPublicCopy(item.description, preferPublicCopy(item.subtitle, preferPublicCopy(item.value, ""))),
            };
          })
        : fallback.bullets,
  };
}

function mapChoicePanel(section: CmsSection | undefined, fallback: ServiceChoicePanel): ServiceChoicePanel {
  if (!section) return fallback;

  return {
    ...fallback,
    title: preferPublicCopy(section.title, fallback.title),
    intro: preferPublicCopy(section.body, fallback.intro),
    options:
      section.items.length > 0
        ? section.items.map((item, index) => {
            const defaultOption = fallback.options[index] ?? fallback.options[fallback.options.length - 1];
            return {
              title: preferPublicCopy(item.title, defaultOption?.title || ""),
              description: preferPublicCopy(item.description, defaultOption?.description || ""),
              icon: toIcon(item.icon, defaultOption?.icon ?? fallback.options[0]?.icon),
            };
          })
        : fallback.options,
    footnote: preferPublicCopy(section.subtitle, fallback.footnote || ""),
  };
}

function mapRightPanel(ctaSection: CmsSection | undefined, choiceSection: CmsSection | undefined, fallback: ServicePanel): ServicePanel {
  if (fallback.type === "choiceCard") {
    return mapChoicePanel(choiceSection, fallback);
  }

  if (!ctaSection) return fallback;

  return {
    ...fallback,
    title: preferPublicCopy(ctaSection.title, fallback.title),
    intro: preferPublicCopy(ctaSection.body, fallback.intro),
    action: mapButtonToAction(ctaSection.buttons[0], fallback.action),
    footnote: preferPublicCopy(ctaSection.subtitle, fallback.footnote || ""),
  };
}

function mapStageBand(section: CmsSection | undefined, fallback: ServicePageContent["stageBand"]): ServicePageContent["stageBand"] {
  if (!section) return fallback;

  return {
    ...fallback,
    title: preferPublicCopy(section.title, fallback.title),
    description: preferPublicCopy(section.body, fallback.description),
    items:
      section.items.length > 0
        ? section.items.map((item, index) => {
            const defaultItem = fallback.items[index] ?? fallback.items[fallback.items.length - 1];
            return {
              label: preferPublicCopy(item.title, defaultItem?.label || ""),
              icon: toIcon(item.icon, defaultItem?.icon ?? fallback.icon),
              accent: item.badge?.toLowerCase().includes("red") ? "red" : defaultItem?.accent ?? (index % 2 === 0 ? "blue" : "red"),
            } satisfies ServiceStageBandItem;
          })
        : fallback.items,
  };
}

function mapFooterColumns(section: CmsSection | undefined, fallback: ServicePageContent["footerColumns"]): ServicePageContent["footerColumns"] {
  if (!section || section.items.length === 0) return fallback;

  const columns = section.items.slice(0, 3).map((item, index) => {
    const defaultColumn = fallback[index] ?? fallback[fallback.length - 1];

    return {
      title: preferPublicCopy(item.title, defaultColumn.title),
      description: preferPublicCopy(item.description, preferPublicCopy(item.subtitle, defaultColumn.description)),
      icon: toIcon(item.icon, defaultColumn.icon),
      emphasis: preferPublicCopy(item.value, defaultColumn.emphasis || ""),
      action: item.href
        ? item.href === "appointment"
          ? { kind: "appointment", label: item.badge || defaultColumn.action?.label || "Book Appointment" }
          : item.href.startsWith("tel:")
          ? { kind: "phone", label: item.badge || defaultColumn.action?.label || "Call Now", href: item.href }
          : { kind: "link", label: item.badge || defaultColumn.action?.label || "Learn More", href: item.href }
        : defaultColumn.action,
    } satisfies ServiceFooterColumn;
  });

  return columns as ServicePageContent["footerColumns"];
}

export function findSectionByType(sections: CmsSection[], type: CmsSection["type"], occurrence = 0) {
  return sections.filter((section) => section.type === type)[occurrence];
}

export function findSectionByName(sections: CmsSection[], matcher: RegExp) {
  return sections.find((section) => matcher.test(section.name) || matcher.test(section.title));
}

export function buildServiceDirectoryCard(service: CmsService, index: number): ServiceDirectoryCard {
  const fallback = serviceDirectoryCards.find((card) => card.href === `/services/${service.slug}`) ?? serviceDirectoryCards[index] ?? serviceDirectoryCards[0];
  const isPlaceholder = serviceLooksLikePlaceholder(service);
  const featureBullets = service.sections
    .filter((section) => section.type === "featureGrid" && !sectionLooksLikePlaceholder(section))
    .flatMap((section) => section.items.map((item) => item.title))
    .filter(Boolean)
    .slice(0, 4);

  return {
    ...fallback,
    number: `${index + 1}.`,
    title: isPlaceholder ? fallback.title : preferPublicCopy(service.title, fallback.title),
    description: isPlaceholder ? fallback.description : preferPublicCopy(service.excerpt, fallback.description),
    icon: toIcon(service.icon, fallback.icon),
    bullets: isPlaceholder ? fallback.bullets : featureBullets.length > 0 ? featureBullets : fallback.bullets,
    href: `/services/${service.slug}`,
    featuredOnHome: service.featuredOnHome,
  };
}

export function buildServicePageContent(service: CmsService): ServicePageContent {
  const fallback = getServicePageContent(service.slug) ?? getServicePageContent("primary-care");
  if (!fallback) {
    throw new Error(`No service fallback found for slug "${service.slug}"`);
  }

  const sections = service.sections ?? [];
  const heroSection = findSectionByType(sections, "hero");
  const offeringSections = sections.filter((section) => section.type === "featureGrid" && !sectionLooksLikePlaceholder(section));
  const richTextSection = findSectionByType(sections, "richText");
  const ctaSection = findSectionByType(sections, "cta");
  const stageSection = findSectionByType(sections, "stats") ?? findSectionByName(sections, /stage|journey|schedule|care/i);
  const heroOverlaySection = findSectionByName(sections, /hero overlay|hero availability|hero care options/i);
  const contactSections = sections.filter((section) => section.type === "contactCards" && section.id !== heroOverlaySection?.id && !sectionLooksLikePlaceholder(section));
  const choiceSection = findSectionByName(contactSections, /choice|care options/i) ?? contactSections.find((section) => section.items.length === 2);
  const footerSection = [...contactSections].reverse().find((section) => section.items.length >= 3);
  const safeHeroSection = heroSection && !sectionLooksLikePlaceholder(heroSection) ? heroSection : undefined;
  const safeRichTextSection = richTextSection && !sectionLooksLikePlaceholder(richTextSection) ? richTextSection : undefined;
  const safeCtaSection = ctaSection && !sectionLooksLikePlaceholder(ctaSection) ? ctaSection : undefined;
  const safeStageSection = stageSection && !sectionLooksLikePlaceholder(stageSection) ? stageSection : undefined;
  const safeHeroOverlaySection = heroOverlaySection && !sectionLooksLikePlaceholder(heroOverlaySection) ? heroOverlaySection : undefined;
  const serviceTitle = preferPublicCopy(service.title, fallback.breadcrumbLabel);
  const breadcrumbOverride = preferPublicCopy(safeHeroSection?.eyebrow, "");
  const breadcrumbLabel =
    breadcrumbOverride ||
    (fallback.breadcrumbLabel.length > serviceTitle.length && fallback.breadcrumbLabel.startsWith(serviceTitle) ? fallback.breadcrumbLabel : serviceTitle);

  return {
    ...fallback,
    navLabel: preferPublicCopy(service.shortTitle, preferPublicCopy(service.title, fallback.navLabel)),
    breadcrumbLabel,
    titleLines: parseTitleLines(safeHeroSection?.title, fallback.titleLines),
    subtitle: preferPublicCopy(safeHeroSection?.subtitle, fallback.subtitle),
    description: preferPublicCopy(safeHeroSection?.body, preferPublicCopy(service.summary, preferPublicCopy(service.excerpt, fallback.description))),
    heroImage: safeHeroSection?.image?.url || service.previewImage?.url || fallback.heroImage,
    heroBadges: mapItemsToBadges(safeHeroSection?.items ?? [], fallback.heroBadges),
    heroOverlayChoices: mapItemsToChoices(safeHeroOverlaySection?.items ?? [], fallback.heroOverlayChoices),
    sectionTitle: preferPublicCopy(offeringSections[0]?.title, fallback.sectionTitle),
    sectionSubtitle: preferPublicCopy(offeringSections[0]?.subtitle, fallback.sectionSubtitle),
    offeringRows:
      offeringSections.length > 0
        ? offeringSections.map((section, index) => mapItemsToOfferings(section.items, fallback.offeringRows[index] ?? fallback.offeringRows[0] ?? []))
        : fallback.offeringRows,
    lowerLeftPanel: fallback.lowerLeftPanel.type === "bulletCard" ? mapBulletPanel(safeRichTextSection, fallback.lowerLeftPanel) : fallback.lowerLeftPanel,
    lowerRightPanel: mapRightPanel(safeCtaSection, choiceSection, fallback.lowerRightPanel),
    stageBand: mapStageBand(safeStageSection, fallback.stageBand),
    footerColumns: mapFooterColumns(footerSection, fallback.footerColumns),
  };
}
