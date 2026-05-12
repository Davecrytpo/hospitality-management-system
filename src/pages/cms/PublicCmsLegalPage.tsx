import { useParams } from "react-router-dom";
import { CmsDocumentRenderer } from "@/components/cms/CmsSectionRenderer";
import { CmsPublicLayout } from "@/components/cms/CmsPublicLayout";
import { useCmsLegalDocument, useCmsSiteSettings } from "@/features/cms/hooks";
import { useCmsSeo } from "@/features/cms/seo";
import NotFound from "../NotFound";

export default function PublicCmsLegalPage() {
  const { slug = "" } = useParams();
  const { data: document, isLoading } = useCmsLegalDocument(slug);
  const { data: settings } = useCmsSiteSettings();

  useCmsSeo(document?.seo, settings);

  if (isLoading) {
    return (
      <CmsPublicLayout>
        <div className="mx-auto w-full max-w-[1320px] px-4 py-16 sm:px-6 lg:px-8">
          <div className="h-[420px] animate-pulse rounded-[28px] bg-[#eef4ff]" />
        </div>
      </CmsPublicLayout>
    );
  }

  if (!document) {
    return <NotFound />;
  }

  return (
    <CmsPublicLayout>
      <CmsDocumentRenderer sectionsOverride={document.sections} services={[]} faqs={[]} testimonials={[]} teamMembers={[]} posts={[]} settings={settings} />
    </CmsPublicLayout>
  );
}
