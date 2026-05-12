import { useEffect } from "react";
import type { CmsSeo, CmsSiteSettings } from "./types";

function upsertMeta(name: string, content: string, attribute: "name" | "property" = "name") {
  const selector = `meta[${attribute}="${name}"]`;
  let tag = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function upsertCanonical(href: string) {
  let link = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  link.href = href;
}

export function useCmsSeo(pageSeo?: CmsSeo, settings?: CmsSiteSettings) {
  useEffect(() => {
    const seo = pageSeo ?? settings?.defaultSeo;
    if (!seo) return;

    document.title = seo.metaTitle || settings?.brand.siteName || "Website";
    upsertMeta("description", seo.metaDescription);
    upsertMeta("keywords", seo.keywords.join(", "));
    upsertMeta("og:title", seo.metaTitle, "property");
    upsertMeta("og:description", seo.metaDescription, "property");
    upsertMeta("og:type", "website", "property");

    if (seo.ogImage?.url) {
      upsertMeta("og:image", seo.ogImage.url, "property");
    }

    if (seo.canonicalUrl) {
      upsertCanonical(seo.canonicalUrl);
    }
  }, [pageSeo, settings]);
}
