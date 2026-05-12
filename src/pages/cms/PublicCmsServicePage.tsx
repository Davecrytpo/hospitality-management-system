import { useParams } from "react-router-dom";
import { CmsDocumentRenderer } from "@/components/cms/CmsSectionRenderer";
import { CmsPublicLayout } from "@/components/cms/CmsPublicLayout";
import { useCmsBlogPosts, useCmsFaqs, useCmsService, useCmsServices, useCmsSiteSettings, useCmsTeamMembers, useCmsTestimonials } from "@/features/cms/hooks";
import { useCmsSeo } from "@/features/cms/seo";
import NotFound from "../NotFound";

function LoadingState() {
  return (
    <div className="mx-auto w-full max-w-[1320px] px-4 py-16 sm:px-6 lg:px-8">
      <div className="h-[420px] animate-pulse rounded-[28px] bg-[#eef4ff]" />
    </div>
  );
}

export default function PublicCmsServicePage() {
  const { slug = "" } = useParams();
  const { data: service, isLoading } = useCmsService(slug);
  const { data: settings } = useCmsSiteSettings();
  const { data: services = [] } = useCmsServices();
  const { data: posts = [] } = useCmsBlogPosts();
  const { data: faqs = [] } = useCmsFaqs({ serviceSlug: slug });
  const { data: testimonials = [] } = useCmsTestimonials({ serviceSlug: slug });
  const { data: teamMembers = [] } = useCmsTeamMembers({ serviceSlug: slug });

  useCmsSeo(service?.seo, settings);

  if (isLoading) {
    return (
      <CmsPublicLayout>
        <LoadingState />
      </CmsPublicLayout>
    );
  }

  if (!service) {
    return <NotFound />;
  }

  return (
    <CmsPublicLayout>
      <CmsDocumentRenderer
        service={service}
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
