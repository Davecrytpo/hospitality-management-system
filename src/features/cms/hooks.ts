import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  deleteCmsMediaAsset,
  deleteCmsRecord,
  fetchCmsAnnouncements,
  fetchCmsBlogPostBySlug,
  fetchCmsBlogPosts,
  fetchCmsFaqs,
  fetchCmsLegalDocumentBySlug,
  fetchCmsLegalDocuments,
  fetchCmsMediaAssets,
  fetchCmsPageBySlug,
  fetchCmsPages,
  fetchCmsServiceBySlug,
  fetchCmsServices,
  fetchCmsSiteSettings,
  fetchCmsTeamMembers,
  fetchCmsTestimonials,
  saveCmsAnnouncement,
  saveCmsBlogPost,
  saveCmsFaq,
  saveCmsLegalDocument,
  saveCmsMediaAsset,
  saveCmsPage,
  saveCmsService,
  saveCmsSiteSettings,
  saveCmsTeamMember,
  saveCmsTestimonial,
  seedCmsDefaults,
} from "./api";

export const cmsQueryKeys = {
  all: ["cms"] as const,
  settings: ["cms", "settings"] as const,
  pages: ["cms", "pages"] as const,
  page: (slug: string) => ["cms", "page", slug] as const,
  services: ["cms", "services"] as const,
  service: (slug: string) => ["cms", "service", slug] as const,
  posts: ["cms", "posts"] as const,
  post: (slug: string) => ["cms", "post", slug] as const,
  faqs: (pageSlug?: string, serviceSlug?: string, includeDrafts?: boolean) => ["cms", "faqs", pageSlug ?? "", serviceSlug ?? "", includeDrafts ?? false] as const,
  testimonials: (pageSlug?: string, serviceSlug?: string, includeDrafts?: boolean) => ["cms", "testimonials", pageSlug ?? "", serviceSlug ?? "", includeDrafts ?? false] as const,
  team: (serviceSlug?: string, includeDrafts?: boolean) => ["cms", "team", serviceSlug ?? "", includeDrafts ?? false] as const,
  legalDocuments: ["cms", "legal-documents"] as const,
  legalDocument: (slug: string) => ["cms", "legal-document", slug] as const,
  mediaAssets: ["cms", "media-assets"] as const,
  announcements: ["cms", "announcements"] as const,
};

export function useCmsRealtime() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = supabase
      .channel("cms-content")
      .on("postgres_changes", { event: "*", schema: "public", table: "cms_site_settings" }, () => {
        queryClient.invalidateQueries({ queryKey: cmsQueryKeys.all });
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "cms_pages" }, () => {
        queryClient.invalidateQueries({ queryKey: cmsQueryKeys.all });
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "cms_services" }, () => {
        queryClient.invalidateQueries({ queryKey: cmsQueryKeys.all });
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "cms_blog_posts" }, () => {
        queryClient.invalidateQueries({ queryKey: cmsQueryKeys.all });
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "cms_faqs" }, () => {
        queryClient.invalidateQueries({ queryKey: cmsQueryKeys.all });
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "cms_testimonials" }, () => {
        queryClient.invalidateQueries({ queryKey: cmsQueryKeys.all });
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "cms_team_members" }, () => {
        queryClient.invalidateQueries({ queryKey: cmsQueryKeys.all });
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "cms_legal_documents" }, () => {
        queryClient.invalidateQueries({ queryKey: cmsQueryKeys.all });
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "cms_media_assets" }, () => {
        queryClient.invalidateQueries({ queryKey: cmsQueryKeys.all });
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "cms_announcements" }, () => {
        queryClient.invalidateQueries({ queryKey: cmsQueryKeys.all });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);
}

export function useCmsSiteSettings() {
  return useQuery({
    queryKey: cmsQueryKeys.settings,
    queryFn: fetchCmsSiteSettings,
  });
}

export function useCmsPages(includeDrafts = false) {
  return useQuery({
    queryKey: [...cmsQueryKeys.pages, includeDrafts] as const,
    queryFn: () => fetchCmsPages(includeDrafts),
  });
}

export function useCmsPage(slug: string) {
  return useQuery({
    queryKey: cmsQueryKeys.page(slug),
    queryFn: () => fetchCmsPageBySlug(slug),
    enabled: Boolean(slug),
  });
}

export function useCmsServices(includeDrafts = false) {
  return useQuery({
    queryKey: [...cmsQueryKeys.services, includeDrafts] as const,
    queryFn: () => fetchCmsServices(includeDrafts),
  });
}

export function useCmsService(slug: string) {
  return useQuery({
    queryKey: cmsQueryKeys.service(slug),
    queryFn: () => fetchCmsServiceBySlug(slug),
    enabled: Boolean(slug),
  });
}

export function useCmsBlogPosts(includeDrafts = false) {
  return useQuery({
    queryKey: [...cmsQueryKeys.posts, includeDrafts] as const,
    queryFn: () => fetchCmsBlogPosts(includeDrafts),
  });
}

export function useCmsBlogPost(slug: string) {
  return useQuery({
    queryKey: cmsQueryKeys.post(slug),
    queryFn: () => fetchCmsBlogPostBySlug(slug),
    enabled: Boolean(slug),
  });
}

export function useCmsFaqs(options?: { pageSlug?: string; serviceSlug?: string; includeDrafts?: boolean }) {
  return useQuery({
    queryKey: cmsQueryKeys.faqs(options?.pageSlug, options?.serviceSlug, options?.includeDrafts),
    queryFn: () => fetchCmsFaqs(options),
  });
}

export function useCmsTestimonials(options?: { pageSlug?: string; serviceSlug?: string; includeDrafts?: boolean }) {
  return useQuery({
    queryKey: cmsQueryKeys.testimonials(options?.pageSlug, options?.serviceSlug, options?.includeDrafts),
    queryFn: () => fetchCmsTestimonials(options),
  });
}

export function useCmsTeamMembers(options?: { serviceSlug?: string; includeDrafts?: boolean }) {
  return useQuery({
    queryKey: cmsQueryKeys.team(options?.serviceSlug, options?.includeDrafts),
    queryFn: () => fetchCmsTeamMembers(options),
  });
}

export function useCmsLegalDocuments(includeDrafts = false) {
  return useQuery({
    queryKey: [...cmsQueryKeys.legalDocuments, includeDrafts] as const,
    queryFn: () => fetchCmsLegalDocuments(includeDrafts),
  });
}

export function useCmsLegalDocument(slug: string) {
  return useQuery({
    queryKey: cmsQueryKeys.legalDocument(slug),
    queryFn: () => fetchCmsLegalDocumentBySlug(slug),
    enabled: Boolean(slug),
  });
}

export function useCmsMediaAssets(includeDrafts = false) {
  return useQuery({
    queryKey: [...cmsQueryKeys.mediaAssets, includeDrafts] as const,
    queryFn: () => fetchCmsMediaAssets(includeDrafts),
  });
}

export function useCmsAnnouncements(includeDrafts = false) {
  return useQuery({
    queryKey: [...cmsQueryKeys.announcements, includeDrafts] as const,
    queryFn: () => fetchCmsAnnouncements(includeDrafts),
  });
}

function useCmsMutation<TData, TVariables>(mutationFn: (variables: TVariables) => Promise<TData>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cmsQueryKeys.all });
    },
  });
}

export function useSaveCmsSiteSettings() {
  return useCmsMutation(saveCmsSiteSettings);
}

export function useSaveCmsPage() {
  return useCmsMutation(saveCmsPage);
}

export function useSaveCmsService() {
  return useCmsMutation(saveCmsService);
}

export function useSaveCmsBlogPost() {
  return useCmsMutation(saveCmsBlogPost);
}

export function useSaveCmsFaq() {
  return useCmsMutation(saveCmsFaq);
}

export function useSaveCmsTestimonial() {
  return useCmsMutation(saveCmsTestimonial);
}

export function useSaveCmsTeamMember() {
  return useCmsMutation(saveCmsTeamMember);
}

export function useSaveCmsLegalDocument() {
  return useCmsMutation(saveCmsLegalDocument);
}

export function useSaveCmsMediaAsset() {
  return useCmsMutation(saveCmsMediaAsset);
}

export function useSaveCmsAnnouncement() {
  return useCmsMutation(saveCmsAnnouncement);
}

export function useDeleteCmsRecord() {
  return useCmsMutation(({ table, id }: { table: Parameters<typeof deleteCmsRecord>[0]; id: string }) => deleteCmsRecord(table, id));
}

export function useDeleteCmsMediaAsset() {
  return useCmsMutation(deleteCmsMediaAsset);
}

export function useSeedCmsDefaults() {
  return useCmsMutation(async () => {
    await seedCmsDefaults();
    return true;
  });
}
