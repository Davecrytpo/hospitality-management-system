import { useParams } from "react-router-dom";
import { CmsDocumentRenderer } from "@/components/cms/CmsSectionRenderer";
import { CmsPublicLayout } from "@/components/cms/CmsPublicLayout";
import { cmsDefaults } from "@/features/cms/defaults";
import { useCmsLegalDocument, useCmsSiteSettings } from "@/features/cms/hooks";
import { legalDocumentLooksLikePlaceholder } from "@/features/cms/publicContent";
import { useCmsSeo } from "@/features/cms/seo";
import NotFound from "../NotFound";

export default function PublicCmsLegalPage() {
  const { slug = "" } = useParams();
  const { data: rawDocument, isLoading } = useCmsLegalDocument(slug);
  const { data: settings } = useCmsSiteSettings();
  const fallbackDocument = cmsDefaults.legalDocuments.find((entry) => entry.slug === slug) ?? null;
  const document = rawDocument && !legalDocumentLooksLikePlaceholder(rawDocument) ? rawDocument : fallbackDocument;

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
