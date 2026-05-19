import type { CmsBlogPost, CmsItem, CmsLegalDocument, CmsPage, CmsSection, CmsService, CmsSiteSettings } from "./types";

const placeholderPatterns = [
  /\bcms\b/i,
  /admin dashboard/i,
  /\bdashboard\b/i,
  /hardcoded/i,
  /source code/i,
  /frontend/i,
  /content studio/i,
  /content workspace/i,
  /database-driven/i,
  /\bdeveloper\b/i,
  /\bmarketing\b/i,
  /\boperations\b/i,
  /\bleadership\b/i,
  /engineering involvement/i,
  /without redeploying/i,
  /page-builder/i,
  /records rather than/i,
  /live from cms/i,
  /cms-first/i,
  /cms-managed/i,
  /what this service covers/i,
  /care delivery highlights/i,
  /why patients choose this service/i,
  /need help deciding what to book/i,
  /supports editable messaging/i,
  /program updates/i,
  /without rebuilding the frontend/i,
  /without redesigning the page/i,
  /without route-level rewrites/i,
  /operational anchor/i,
];

function textListHasPlaceholder(values: Array<string | undefined | null>) {
  return values.some((value) => looksLikeCmsPlaceholder(value));
}

export function looksLikeCmsPlaceholder(value?: string | null) {
  if (!value) return false;
  const normalized = value.trim();
  if (!normalized) return false;
  return placeholderPatterns.some((pattern) => pattern.test(normalized));
}

export function preferPublicCopy(value: string | undefined | null, fallback: string) {
  return value && !looksLikeCmsPlaceholder(value) ? value : fallback;
}

export function itemLooksLikePlaceholder(item?: Partial<CmsItem> | null) {
  if (!item) return false;
  return textListHasPlaceholder([
    item.title,
    item.subtitle,
    item.description,
    item.value,
    item.badge,
    ...(item.bullets ?? []),
    ...(item.metadata ?? []),
  ]);
}

export function sectionLooksLikePlaceholder(section?: CmsSection | null) {
  if (!section) return false;
  return (
    textListHasPlaceholder([section.name, section.eyebrow, section.title, section.subtitle, section.body]) ||
    section.items.some((item) => itemLooksLikePlaceholder(item)) ||
    section.buttons.some((button) => looksLikeCmsPlaceholder(button.label))
  );
}

export function pageLooksLikePlaceholder(page?: CmsPage | null) {
  if (!page) return false;
  return looksLikeCmsPlaceholder(page.excerpt) || page.sections.some((section) => sectionLooksLikePlaceholder(section));
}

export function serviceLooksLikePlaceholder(service?: CmsService | null) {
  if (!service) return false;
  return (
    textListHasPlaceholder([service.excerpt, service.summary]) ||
    service.sections.some((section) => sectionLooksLikePlaceholder(section))
  );
}

export function postLooksLikePlaceholder(post?: CmsBlogPost | null) {
  if (!post) return false;
  return textListHasPlaceholder([post.excerpt]) || post.sections.some((section) => sectionLooksLikePlaceholder(section));
}

export function legalDocumentLooksLikePlaceholder(document?: CmsLegalDocument | null) {
  if (!document) return false;
  return textListHasPlaceholder([document.summary]) || document.sections.some((section) => sectionLooksLikePlaceholder(section));
}

export function settingsTextLooksLikePlaceholder(settings?: CmsSiteSettings | null) {
  if (!settings) return false;
  return textListHasPlaceholder([
    settings.announcementBar.text,
    settings.footer.summary,
    settings.publicUi.footerCtaTitle,
    settings.publicUi.footerPhoneDescription,
    settings.publicUi.footerAppointmentDescription,
    settings.publicUi.footerPortalDescription,
    settings.defaultSeo.metaDescription,
  ]);
}
