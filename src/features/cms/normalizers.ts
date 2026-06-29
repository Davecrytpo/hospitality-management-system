import type {
  CmsBlogPost,
  CmsImage,
  CmsItem,
  CmsLegalDocument,
  CmsMediaAsset,
  CmsPage,
  CmsSection,
  CmsSeo,
  CmsService,
  CmsSiteSettings,
  CmsTeamMember,
  CmsTestimonial,
} from "./types";

const assetModules = import.meta.glob("../../assets/*", {
  eager: true,
  import: "default",
}) as Record<string, string>;

interface StableAssetEntry {
  filename: string;
  baseName: string;
  extension: string;
  stableUrl: string;
  bundledUrl: string;
}

const stableAssetEntries: StableAssetEntry[] = Object.entries(assetModules).map(([modulePath, bundledUrl]) => {
  const filename = modulePath.split("/").pop() ?? modulePath;
  const extensionIndex = filename.lastIndexOf(".");
  const baseName = extensionIndex >= 0 ? filename.slice(0, extensionIndex) : filename;
  const extension = extensionIndex >= 0 ? filename.slice(extensionIndex + 1) : "";

  return {
    filename,
    baseName,
    extension,
    stableUrl: `/cms-assets/${filename}`,
    bundledUrl,
  };
});

const stableAssetByLegacyUrl = new Map<string, string>(
  stableAssetEntries.flatMap((entry) => [
    [entry.bundledUrl, entry.stableUrl],
    [`/src/assets/${entry.filename}`, entry.stableUrl],
  ]),
);

function resolveStableAssetByFilename(filename: string) {
  const directMatch = stableAssetEntries.find((entry) => entry.filename === filename);
  if (directMatch) return directMatch.stableUrl;

  return stableAssetEntries.find((entry) => {
    if (!entry.extension) return filename === `${entry.baseName}`;
    return filename.startsWith(`${entry.baseName}-`) && filename.endsWith(`.${entry.extension}`);
  })?.stableUrl;
}

export function normalizeCmsAssetUrl(url: string) {
  if (!url) return url;
  if (url.startsWith("/cms-assets/")) return url;

  const exactMatch = stableAssetByLegacyUrl.get(url);
  if (exactMatch) return exactMatch;

  try {
    const parsed = new URL(url, "https://cms.local");
    const filename = parsed.pathname.split("/").pop();
    if (!filename) return url;

    return resolveStableAssetByFilename(filename) ?? url;
  } catch {
    return url;
  }
}

export function normalizeCmsImage(image?: CmsImage): CmsImage | undefined {
  if (!image) return image;
  return {
    ...image,
    url: normalizeCmsAssetUrl(image.url),
  };
}

function normalizeCmsItem(item: CmsItem): CmsItem {
  return {
    ...item,
    image: normalizeCmsImage(item.image),
  };
}

function normalizeCmsSeo(seo: CmsSeo): CmsSeo {
  return {
    ...seo,
    ogImage: normalizeCmsImage(seo.ogImage),
  };
}

function normalizeCmsSection(section: CmsSection): CmsSection {
  return {
    ...section,
    image: normalizeCmsImage(section.image),
    backgroundImage: normalizeCmsImage(section.backgroundImage),
    items: section.items.map(normalizeCmsItem),
  };
}

export function normalizeCmsPage(page: CmsPage): CmsPage {
  return {
    ...page,
    seo: normalizeCmsSeo(page.seo),
    sections: page.sections.map(normalizeCmsSection),
  };
}

export function normalizeCmsService(service: CmsService): CmsService {
  return {
    ...service,
    previewImage: normalizeCmsImage(service.previewImage) ?? service.previewImage,
    seo: normalizeCmsSeo(service.seo),
    sections: (service.sections || []).map(normalizeCmsSection),
  };
}

export function normalizeCmsBlogPost(post: CmsBlogPost): CmsBlogPost {
  return {
    ...post,
    coverImage: normalizeCmsImage(post.coverImage) ?? post.coverImage,
    seo: normalizeCmsSeo(post.seo),
    sections: (post.sections || []).map(normalizeCmsSection),
  };
}

export function normalizeCmsTestimonial(testimonial: CmsTestimonial): CmsTestimonial {
  return {
    ...testimonial,
    image: normalizeCmsImage(testimonial.image),
  };
}

export function normalizeCmsTeamMember(member: CmsTeamMember): CmsTeamMember {
  return {
    ...member,
    image: normalizeCmsImage(member.image),
  };
}

export function normalizeCmsLegalDocument(document: CmsLegalDocument): CmsLegalDocument {
  return {
    ...document,
    seo: normalizeCmsSeo(document.seo),
    sections: (document.sections || []).map(normalizeCmsSection),
  };
}

export function normalizeCmsMediaAsset(asset: CmsMediaAsset): CmsMediaAsset {
  return {
    ...asset,
    url: normalizeCmsAssetUrl(asset.url),
  };
}

export function normalizeCmsSiteSettings(settings: CmsSiteSettings): CmsSiteSettings {
  return {
    ...settings,
    brand: {
      ...settings.brand,
      logo: normalizeCmsImage(settings.brand.logo) ?? settings.brand.logo,
    },
    footer: {
      ...settings.footer,
      highlightItems: settings.footer.highlightItems.map(normalizeCmsItem),
    },
    defaultSeo: normalizeCmsSeo(settings.defaultSeo),
  };
}
