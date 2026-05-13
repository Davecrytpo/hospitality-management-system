import { supabase } from "@/integrations/supabase/client";
import { cmsDefaults } from "./defaults";
import {
  normalizeCmsBlogPost,
  normalizeCmsLegalDocument,
  normalizeCmsMediaAsset,
  normalizeCmsPage,
  normalizeCmsService,
  normalizeCmsSiteSettings,
  normalizeCmsTeamMember,
  normalizeCmsTestimonial,
} from "./normalizers";
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
import { cloneCmsValue, normalizeCmsSlug } from "./utils";

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

interface CmsMutationResult {
  error: unknown | null;
}

interface CmsQueryResult<T> {
  data: T | null;
  error: unknown | null;
}

interface CmsDeleteQuery {
  eq(column: string, value: unknown): Promise<CmsMutationResult>;
}

interface CmsQueryBuilder<T> extends PromiseLike<CmsQueryResult<T[]>> {
  select(columns: string): CmsQueryBuilder<T>;
  eq(column: string, value: unknown): CmsQueryBuilder<T>;
  order(column: string, options?: { ascending?: boolean }): CmsQueryBuilder<T>;
  limit(count: number): CmsQueryBuilder<T>;
  maybeSingle(): Promise<CmsQueryResult<T>>;
  upsert(payload: unknown, options?: { onConflict?: string }): Promise<CmsMutationResult>;
  delete(): CmsDeleteQuery;
}

interface CmsClient {
  from<T>(table: CmsTableName): CmsQueryBuilder<T>;
}

type CmsFilterableContent = {
  slug?: string;
  pageSlug?: string;
  serviceSlug?: string;
  status?: string;
  sortOrder?: number;
};

const cmsClient = supabase as unknown as CmsClient;

function cmsTable<T = unknown>(table: CmsTableName) {
  return cmsClient.from<T>(table);
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

function collectionFallback<K extends keyof CmsSeedBundle>(key: K): CmsSeedBundle[K] {
  return cloneCmsValue(cmsDefaults[key]);
}

async function fetchSingleton<T>(table: CmsTableName, id: string, fallback: T, normalize: (value: T) => T = (value) => value): Promise<T> {
  const { data, error } = await cmsTable<T>(table).select("content").eq("id", id).maybeSingle();
  if (error) {
    if (isRecoverableCmsError(error)) return normalize(cloneCmsValue(fallback));
    throw error;
  }
  return data?.content && Object.keys(data.content as Record<string, unknown>).length > 0
    ? normalize(cloneCmsValue(data.content as T))
    : normalize(cloneCmsValue(fallback));
}

async function fetchCollection<T extends CmsFilterableContent>(
  table: CmsTableName,
  fallback: T[],
  options?: { filter?: Record<string, string | undefined>; includeDrafts?: boolean; singleSlug?: string },
  normalize: (value: T) => T = (value) => value,
): Promise<T[]> {
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
      if (options?.filter?.page_slug) results = results.filter((item) => item.pageSlug === options.filter?.page_slug);
      if (options?.filter?.service_slug) results = results.filter((item) => item.serviceSlug === options.filter?.service_slug);
      if (options?.singleSlug) results = results.filter((item) => item.slug === options.singleSlug);
      return sortByOrder(results.map(normalize));
    }
    throw error;
  }

  if (!data || data.length === 0) {
    let results = cloneCmsValue(fallback);
    if (!options?.includeDrafts) results = publishedOnly(results);
    if (options?.filter?.page_slug) results = results.filter((item) => item.pageSlug === options.filter?.page_slug);
    if (options?.filter?.service_slug) results = results.filter((item) => item.serviceSlug === options.filter?.service_slug);
    if (options?.singleSlug) results = results.filter((item) => item.slug === options.singleSlug);
    return sortByOrder(results.map(normalize));
  }

  const content = data.map((row: CmsDocumentRow<T>) => normalize(row.content));
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

function resolveDocumentSlug(rawSlug: string | undefined, fallbackTitle: string, fallbackId: string) {
  return normalizeCmsSlug(rawSlug ?? "") || normalizeCmsSlug(fallbackTitle) || fallbackId;
}

export async function fetchCmsSiteSettings(): Promise<CmsSiteSettings> {
  return fetchSingleton<CmsSiteSettings>("cms_site_settings", "default", cmsDefaults.settings, normalizeCmsSiteSettings);
}

export async function fetchCmsPages(includeDrafts = false): Promise<CmsPage[]> {
  return fetchCollection<CmsPage>("cms_pages", collectionFallback("pages"), { includeDrafts }, normalizeCmsPage);
}

export async function fetchCmsPageBySlug(slug: string): Promise<CmsPage | null> {
  const pages = await fetchCollection<CmsPage>("cms_pages", collectionFallback("pages"), { singleSlug: slug }, normalizeCmsPage);
  return pages[0] ?? null;
}

export async function fetchCmsServices(includeDrafts = false): Promise<CmsService[]> {
  return fetchCollection<CmsService>("cms_services", collectionFallback("services"), { includeDrafts }, normalizeCmsService);
}

export async function fetchCmsServiceBySlug(slug: string): Promise<CmsService | null> {
  const services = await fetchCollection<CmsService>("cms_services", collectionFallback("services"), { singleSlug: slug }, normalizeCmsService);
  return services[0] ?? null;
}

export async function fetchCmsBlogPosts(includeDrafts = false): Promise<CmsBlogPost[]> {
  return fetchCollection<CmsBlogPost>("cms_blog_posts", collectionFallback("posts"), { includeDrafts }, normalizeCmsBlogPost);
}

export async function fetchCmsBlogPostBySlug(slug: string): Promise<CmsBlogPost | null> {
  const posts = await fetchCollection<CmsBlogPost>("cms_blog_posts", collectionFallback("posts"), { singleSlug: slug }, normalizeCmsBlogPost);
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
  }, normalizeCmsTestimonial);
}

export async function fetchCmsTeamMembers(options?: { serviceSlug?: string; includeDrafts?: boolean }) {
  return fetchCollection<CmsTeamMember>("cms_team_members", collectionFallback("teamMembers"), {
    includeDrafts: options?.includeDrafts,
    filter: {
      service_slug: options?.serviceSlug,
    },
  }, normalizeCmsTeamMember);
}

export async function fetchCmsLegalDocuments(includeDrafts = false) {
  return fetchCollection<CmsLegalDocument>("cms_legal_documents", collectionFallback("legalDocuments"), { includeDrafts }, normalizeCmsLegalDocument);
}

export async function fetchCmsLegalDocumentBySlug(slug: string) {
  const docs = await fetchCollection<CmsLegalDocument>("cms_legal_documents", collectionFallback("legalDocuments"), { singleSlug: slug }, normalizeCmsLegalDocument);
  return docs[0] ?? null;
}

export async function fetchCmsMediaAssets(includeDrafts = false) {
  return fetchCollection<CmsMediaAsset>("cms_media_assets", collectionFallback("mediaAssets"), { includeDrafts }, normalizeCmsMediaAsset);
}

export async function fetchCmsAnnouncements(includeDrafts = false) {
  return fetchCollection<CmsAnnouncement>("cms_announcements", collectionFallback("announcements"), { includeDrafts });
}

export async function saveCmsSiteSettings(content: CmsSiteSettings) {
  const normalizedContent = normalizeCmsSiteSettings(content);
  const payload: CmsSingletonRow<CmsSiteSettings> = {
    id: normalizedContent.id,
    content: normalizedContent,
  };
  const { error } = await cmsTable("cms_site_settings").upsert(payload, { onConflict: "id" });
  if (error) throw error;
  return normalizedContent;
}

export async function saveCmsPage(page: CmsPage) {
  const normalizedSlug = resolveDocumentSlug(page.slug, page.title, page.id);
  const normalizedPage = normalizeCmsPage({
    ...page,
    slug: normalizedSlug,
    seo: {
      ...page.seo,
      slug: normalizedSlug,
    },
  });
  const { error } = await cmsTable("cms_pages").upsert(
    {
      ...collectionRow(normalizedPage, { slug: normalizedPage.slug, page_type: normalizedPage.pageType }),
      slug: normalizedPage.slug,
      page_type: normalizedPage.pageType,
    },
    { onConflict: "id" },
  );
  if (error) throw error;
  return normalizedPage;
}

export async function saveCmsService(service: CmsService) {
  const normalizedSlug = resolveDocumentSlug(service.slug, service.title, service.id);
  const normalizedService = normalizeCmsService({
    ...service,
    slug: normalizedSlug,
    seo: {
      ...service.seo,
      slug: normalizedSlug,
    },
  });
  const { error } = await cmsTable("cms_services").upsert(
    {
      ...collectionRow(normalizedService, { slug: normalizedService.slug }),
      slug: normalizedService.slug,
    },
    { onConflict: "id" },
  );
  if (error) throw error;
  return normalizedService;
}

export async function saveCmsBlogPost(post: CmsBlogPost) {
  const normalizedSlug = resolveDocumentSlug(post.slug, post.title, post.id);
  const normalizedPost = normalizeCmsBlogPost({
    ...post,
    slug: normalizedSlug,
    seo: {
      ...post.seo,
      slug: normalizedSlug,
    },
  });
  const { error } = await cmsTable("cms_blog_posts").upsert(
    {
      ...collectionRow(normalizedPost, { slug: normalizedPost.slug, published_at: normalizedPost.publishedAt }),
      slug: normalizedPost.slug,
      published_at: normalizedPost.publishedAt,
    },
    { onConflict: "id" },
  );
  if (error) throw error;
  return normalizedPost;
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
  const normalizedTestimonial = normalizeCmsTestimonial(testimonial);
  const { error } = await cmsTable("cms_testimonials").upsert(
    {
      ...collectionRow(normalizedTestimonial, { page_slug: normalizedTestimonial.pageSlug ?? null, service_slug: normalizedTestimonial.serviceSlug ?? null }),
      page_slug: normalizedTestimonial.pageSlug ?? null,
      service_slug: normalizedTestimonial.serviceSlug ?? null,
    },
    { onConflict: "id" },
  );
  if (error) throw error;
  return normalizedTestimonial;
}

export async function saveCmsTeamMember(member: CmsTeamMember) {
  const normalizedMember = normalizeCmsTeamMember(member);
  const { error } = await cmsTable("cms_team_members").upsert(
    {
      ...collectionRow(normalizedMember, { service_slug: normalizedMember.serviceSlug ?? null }),
      service_slug: normalizedMember.serviceSlug ?? null,
    },
    { onConflict: "id" },
  );
  if (error) throw error;
  return normalizedMember;
}

export async function saveCmsLegalDocument(document: CmsLegalDocument) {
  const normalizedSlug = resolveDocumentSlug(document.slug, document.title, document.id);
  const normalizedDocument = normalizeCmsLegalDocument({
    ...document,
    slug: normalizedSlug,
    seo: {
      ...document.seo,
      slug: normalizedSlug,
    },
  });
  const { error } = await cmsTable("cms_legal_documents").upsert(
    {
      ...collectionRow(normalizedDocument, { slug: normalizedDocument.slug }),
      slug: normalizedDocument.slug,
    },
    { onConflict: "id" },
  );
  if (error) throw error;
  return normalizedDocument;
}

export async function saveCmsMediaAsset(asset: CmsMediaAsset) {
  const normalizedAsset = normalizeCmsMediaAsset(asset);
  const { error } = await cmsTable("cms_media_assets").upsert(
    {
      ...collectionRow(normalizedAsset),
    },
    { onConflict: "id" },
  );
  if (error) throw error;
  return normalizedAsset;
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
