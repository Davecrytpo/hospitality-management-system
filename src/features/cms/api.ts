import { supabase } from "@/integrations/supabase/client";
import { cmsDefaults } from "./defaults";
import type {
  CmsAnnouncement,
  CmsBlogPost,
  CmsFaq,
  CmsLegalDocument,
  CmsMediaAsset,
  CmsPage,
  CmsSeedBundle,
  CmsService,
  CmsSiteSettings,
  CmsTeamMember,
  CmsTestimonial,
} from "./types";
import { cloneCmsValue } from "./utils";

type CmsTableName =
  | "cms_site_settings"
  | "cms_pages"
  | "cms_services"
  | "cms_blog_posts"
  | "cms_faqs"
  | "cms_testimonials"
  | "cms_team_members"
  | "cms_legal_documents"
  | "cms_media_assets"
  | "cms_announcements";

interface CmsDocumentRow<T> {
  id: string;
  slug?: string | null;
  status?: string | null;
  sort_order?: number | null;
  page_type?: string | null;
  page_slug?: string | null;
  service_slug?: string | null;
  published_at?: string | null;
  content: T;
}

interface CmsSingletonRow<T> {
  id: string;
  content: T;
}

const cmsClient = supabase as any;

function cmsTable<T = unknown>(table: CmsTableName) {
  return cmsClient.from(table) as any;
}

function isRecoverableCmsError(error: unknown) {
  if (!error || typeof error !== "object") return false;
  const code = "code" in error ? String((error as { code?: string }).code ?? "") : "";
  const message = "message" in error ? String((error as { message?: string }).message ?? "") : "";
  return code === "42P01" || code === "PGRST116" || message.toLowerCase().includes("relation") || message.toLowerCase().includes("does not exist");
}

function publishedOnly<T extends { status?: string }>(items: T[]) {
  return items.filter((item) => item.status !== "draft");
}

function sortByOrder<T extends { sortOrder?: number }>(items: T[]) {
  return [...items].sort((left, right) => (left.sortOrder ?? 0) - (right.sortOrder ?? 0));
}

function collectionFallback<K extends keyof CmsSeedBundle>(key: K) {
  return cloneCmsValue(cmsDefaults[key]);
}

async function fetchSingleton<T>(table: CmsTableName, id: string, fallback: T) {
  const { data, error } = await cmsTable<T>(table).select("content").eq("id", id).maybeSingle();
  if (error) {
    if (isRecoverableCmsError(error)) return cloneCmsValue(fallback);
    throw error;
  }
  return data?.content ? cloneCmsValue(data.content as T) : cloneCmsValue(fallback);
}

async function fetchCollection<T extends { status?: string; sortOrder?: number }>(
  table: CmsTableName,
  fallback: T[],
  options?: { filter?: Record<string, string | undefined>; includeDrafts?: boolean; singleSlug?: string },
) {
  let query = cmsTable<CmsDocumentRow<T>>(table).select("content").order("sort_order", { ascending: true });

  if (options?.singleSlug) {
    query = query.eq("slug", options.singleSlug).limit(1);
  }

  if (options?.filter) {
    Object.entries(options.filter).forEach(([column, value]) => {
      if (value) {
        query = query.eq(column, value);
      }
    });
  }

  if (!options?.includeDrafts) {
    query = query.eq("status", "published");
  }

  const { data, error } = await query;
  if (error) {
    if (isRecoverableCmsError(error)) {
      let results = cloneCmsValue(fallback);
      if (!options?.includeDrafts) results = publishedOnly(results);
      if (options?.filter?.page_slug) results = results.filter((item: any) => item.pageSlug === options.filter?.page_slug);
      if (options?.filter?.service_slug) results = results.filter((item: any) => item.serviceSlug === options.filter?.service_slug);
      if (options?.singleSlug) results = results.filter((item: any) => item.slug === options.singleSlug);
      return sortByOrder(results);
    }
    throw error;
  }

  const content = (data ?? []).map((row: CmsDocumentRow<T>) => row.content);
  return sortByOrder(content);
}

function collectionRow<T extends { id: string; status?: string; sortOrder?: number }>(
  content: T,
  extra: Partial<Record<string, string | number | null>> = {},
) {
  return {
    id: content.id,
    status: content.status ?? "published",
    sort_order: content.sortOrder ?? 0,
    content,
    ...extra,
  };
}

export async function fetchCmsSiteSettings() {
  return fetchSingleton<CmsSiteSettings>("cms_site_settings", "default", cmsDefaults.settings);
}

export async function fetchCmsPages(includeDrafts = false) {
  return fetchCollection<CmsPage>("cms_pages", collectionFallback("pages"), { includeDrafts });
}

export async function fetchCmsPageBySlug(slug: string) {
  const pages = await fetchCollection<CmsPage>("cms_pages", collectionFallback("pages"), { singleSlug: slug });
  return pages[0] ?? null;
}

export async function fetchCmsServices(includeDrafts = false) {
  return fetchCollection<CmsService>("cms_services", collectionFallback("services"), { includeDrafts });
}

export async function fetchCmsServiceBySlug(slug: string) {
  const services = await fetchCollection<CmsService>("cms_services", collectionFallback("services"), { singleSlug: slug });
  return services[0] ?? null;
}

export async function fetchCmsBlogPosts(includeDrafts = false) {
  return fetchCollection<CmsBlogPost>("cms_blog_posts", collectionFallback("posts"), { includeDrafts });
}

export async function fetchCmsBlogPostBySlug(slug: string) {
  const posts = await fetchCollection<CmsBlogPost>("cms_blog_posts", collectionFallback("posts"), { singleSlug: slug });
  return posts[0] ?? null;
}

export async function fetchCmsFaqs(options?: { pageSlug?: string; serviceSlug?: string; includeDrafts?: boolean }) {
  return fetchCollection<CmsFaq>("cms_faqs", collectionFallback("faqs"), {
    includeDrafts: options?.includeDrafts,
    filter: {
      page_slug: options?.pageSlug,
      service_slug: options?.serviceSlug,
    },
  });
}

export async function fetchCmsTestimonials(options?: { pageSlug?: string; serviceSlug?: string; includeDrafts?: boolean }) {
  return fetchCollection<CmsTestimonial>("cms_testimonials", collectionFallback("testimonials"), {
    includeDrafts: options?.includeDrafts,
    filter: {
      page_slug: options?.pageSlug,
      service_slug: options?.serviceSlug,
    },
  });
}

export async function fetchCmsTeamMembers(options?: { serviceSlug?: string; includeDrafts?: boolean }) {
  return fetchCollection<CmsTeamMember>("cms_team_members", collectionFallback("teamMembers"), {
    includeDrafts: options?.includeDrafts,
    filter: {
      service_slug: options?.serviceSlug,
    },
  });
}

export async function fetchCmsLegalDocuments(includeDrafts = false) {
  return fetchCollection<CmsLegalDocument>("cms_legal_documents", collectionFallback("legalDocuments"), { includeDrafts });
}

export async function fetchCmsLegalDocumentBySlug(slug: string) {
  const docs = await fetchCollection<CmsLegalDocument>("cms_legal_documents", collectionFallback("legalDocuments"), { singleSlug: slug });
  return docs[0] ?? null;
}

export async function fetchCmsMediaAssets(includeDrafts = false) {
  return fetchCollection<CmsMediaAsset>("cms_media_assets", collectionFallback("mediaAssets"), { includeDrafts });
}

export async function fetchCmsAnnouncements(includeDrafts = false) {
  return fetchCollection<CmsAnnouncement>("cms_announcements", collectionFallback("announcements"), { includeDrafts });
}

export async function saveCmsSiteSettings(content: CmsSiteSettings) {
  const payload: CmsSingletonRow<CmsSiteSettings> = {
    id: content.id,
    content,
  };
  const { error } = await cmsTable("cms_site_settings").upsert(payload, { onConflict: "id" });
  if (error) throw error;
  return content;
}

export async function saveCmsPage(page: CmsPage) {
  const { error } = await cmsTable("cms_pages").upsert(
    {
      ...collectionRow(page, { slug: page.slug, page_type: page.pageType }),
      slug: page.slug,
      page_type: page.pageType,
    },
    { onConflict: "slug" },
  );
  if (error) throw error;
  return page;
}

export async function saveCmsService(service: CmsService) {
  const { error } = await cmsTable("cms_services").upsert(
    {
      ...collectionRow(service, { slug: service.slug }),
      slug: service.slug,
    },
    { onConflict: "slug" },
  );
  if (error) throw error;
  return service;
}

export async function saveCmsBlogPost(post: CmsBlogPost) {
  const { error } = await cmsTable("cms_blog_posts").upsert(
    {
      ...collectionRow(post, { slug: post.slug, published_at: post.publishedAt }),
      slug: post.slug,
      published_at: post.publishedAt,
    },
    { onConflict: "slug" },
  );
  if (error) throw error;
  return post;
}

export async function saveCmsFaq(faq: CmsFaq) {
  const { error } = await cmsTable("cms_faqs").upsert(
    {
      ...collectionRow(faq, { page_slug: faq.pageSlug ?? null, service_slug: faq.serviceSlug ?? null }),
      page_slug: faq.pageSlug ?? null,
      service_slug: faq.serviceSlug ?? null,
    },
    { onConflict: "id" },
  );
  if (error) throw error;
  return faq;
}

export async function saveCmsTestimonial(testimonial: CmsTestimonial) {
  const { error } = await cmsTable("cms_testimonials").upsert(
    {
      ...collectionRow(testimonial, { page_slug: testimonial.pageSlug ?? null, service_slug: testimonial.serviceSlug ?? null }),
      page_slug: testimonial.pageSlug ?? null,
      service_slug: testimonial.serviceSlug ?? null,
    },
    { onConflict: "id" },
  );
  if (error) throw error;
  return testimonial;
}

export async function saveCmsTeamMember(member: CmsTeamMember) {
  const { error } = await cmsTable("cms_team_members").upsert(
    {
      ...collectionRow(member, { service_slug: member.serviceSlug ?? null }),
      service_slug: member.serviceSlug ?? null,
    },
    { onConflict: "id" },
  );
  if (error) throw error;
  return member;
}

export async function saveCmsLegalDocument(document: CmsLegalDocument) {
  const { error } = await cmsTable("cms_legal_documents").upsert(
    {
      ...collectionRow(document, { slug: document.slug }),
      slug: document.slug,
    },
    { onConflict: "slug" },
  );
  if (error) throw error;
  return document;
}

export async function saveCmsMediaAsset(asset: CmsMediaAsset) {
  const { error } = await cmsTable("cms_media_assets").upsert(
    {
      ...collectionRow(asset),
    },
    { onConflict: "id" },
  );
  if (error) throw error;
  return asset;
}

export async function saveCmsAnnouncement(announcement: CmsAnnouncement) {
  const { error } = await cmsTable("cms_announcements").upsert(
    {
      ...collectionRow(announcement),
    },
    { onConflict: "id" },
  );
  if (error) throw error;
  return announcement;
}

export async function deleteCmsRecord(table: CmsTableName, id: string) {
  const { error } = await cmsTable(table).delete().eq("id", id);
  if (error) throw error;
}

export async function deleteCmsMediaAsset(asset: CmsMediaAsset) {
  if (asset.cloudinaryPublicId) {
    const resourceType = asset.type === "video" ? "video" : asset.type === "file" ? "raw" : "image";
    const { data, error } = await supabase.functions.invoke("cloudinary-media-delete", {
      body: {
        publicId: asset.cloudinaryPublicId,
        resourceType,
      },
    });

    if (error) throw error;

    const result = data as { success?: boolean; error?: string } | null;
    if (result?.success === false) {
      throw new Error(result.error || "Cloudinary delete failed.");
    }
  }

  await deleteCmsRecord("cms_media_assets", asset.id);
}

export async function seedCmsDefaults() {
  await saveCmsSiteSettings(cloneCmsValue(cmsDefaults.settings));
  await Promise.all(cloneCmsValue(cmsDefaults.pages).map((page) => saveCmsPage(page)));
  await Promise.all(cloneCmsValue(cmsDefaults.services).map((service) => saveCmsService(service)));
  await Promise.all(cloneCmsValue(cmsDefaults.posts).map((post) => saveCmsBlogPost(post)));
  await Promise.all(cloneCmsValue(cmsDefaults.faqs).map((faq) => saveCmsFaq(faq)));
  await Promise.all(cloneCmsValue(cmsDefaults.testimonials).map((testimonial) => saveCmsTestimonial(testimonial)));
  await Promise.all(cloneCmsValue(cmsDefaults.teamMembers).map((member) => saveCmsTeamMember(member)));
  await Promise.all(cloneCmsValue(cmsDefaults.legalDocuments).map((document) => saveCmsLegalDocument(document)));
  await Promise.all(cloneCmsValue(cmsDefaults.mediaAssets).map((asset) => saveCmsMediaAsset(asset)));
  await Promise.all(cloneCmsValue(cmsDefaults.announcements).map((announcement) => saveCmsAnnouncement(announcement)));
}
