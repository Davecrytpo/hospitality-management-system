import { CmsDocumentRenderer } from "@/components/cms/CmsSectionRenderer";
import { CmsPublicLayout } from "@/components/cms/CmsPublicLayout";
import { useCmsBlogPosts, useCmsFaqs, useCmsPage, useCmsServices, useCmsSiteSettings, useCmsTeamMembers, useCmsTestimonials } from "@/features/cms/hooks";
import { useCmsSeo } from "@/features/cms/seo";
import NotFound from "../NotFound";

function LoadingState() {
  return (
    <div className="mx-auto w-full max-w-[1320px] px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[24px] border border-[#dde5f4] bg-white p-10 shadow-[0_20px_50px_-42px_rgba(19,48,107,0.28)]">
        <div className="h-6 w-32 animate-pulse rounded bg-[#e7eef9]" />
        <div className="mt-6 h-16 w-full max-w-[620px] animate-pulse rounded bg-[#e7eef9]" />
        <div className="mt-5 h-24 w-full animate-pulse rounded bg-[#f2f6fd]" />
      </div>
    </div>
  );
}

export default function PublicCmsPage({ slug }: { slug: string }) {
  const { data: page, isLoading } = useCmsPage(slug);
  const { data: settings } = useCmsSiteSettings();
  const { data: services = [] } = useCmsServices();
  const { data: posts = [] } = useCmsBlogPosts();
  const { data: teamMembers = [] } = useCmsTeamMembers();
  const { data: faqs = [] } = useCmsFaqs(slug === "faq" || slug === "contact" ? undefined : { pageSlug: slug });
  const { data: testimonials = [] } = useCmsTestimonials({ pageSlug: slug });

  useCmsSeo(page?.seo, settings);

  if (isLoading) {
    return (
      <CmsPublicLayout>
        <LoadingState />
      </CmsPublicLayout>
    );
  }

  if (!page) {
    return <NotFound />;
  }

  return (
    <CmsPublicLayout>
      <CmsDocumentRenderer
        page={page}
        services={services}
        faqs={faqs}
        testimonials={testimonials}
        teamMembers={teamMembers}
        posts={posts}
        settings={settings}
      />
    </CmsPublicLayout>
  );
}
