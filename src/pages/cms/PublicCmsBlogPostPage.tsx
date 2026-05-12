import { useParams } from "react-router-dom";
import { CmsDocumentRenderer } from "@/components/cms/CmsSectionRenderer";
import { CmsPublicLayout } from "@/components/cms/CmsPublicLayout";
import { cmsDefaults } from "@/features/cms/defaults";
import { useCmsBlogPost, useCmsSiteSettings } from "@/features/cms/hooks";
import { postLooksLikePlaceholder } from "@/features/cms/publicContent";
import { useCmsSeo } from "@/features/cms/seo";
import NotFound from "../NotFound";

export default function PublicCmsBlogPostPage() {
  const { slug = "" } = useParams();
  const { data: rawPost, isLoading } = useCmsBlogPost(slug);
  const { data: settings } = useCmsSiteSettings();
  const fallbackPost = cmsDefaults.posts.find((entry) => entry.slug === slug) ?? null;
  const post = rawPost && !postLooksLikePlaceholder(rawPost) ? rawPost : fallbackPost;

  useCmsSeo(post?.seo, settings);

  if (isLoading) {
    return (
      <CmsPublicLayout>
        <div className="mx-auto w-full max-w-[1320px] px-4 py-16 sm:px-6 lg:px-8">
          <div className="h-[420px] animate-pulse rounded-[28px] bg-[#eef4ff]" />
        </div>
      </CmsPublicLayout>
    );
  }

  if (!post) {
    return <NotFound />;
  }

  return (
    <CmsPublicLayout>
      <CmsDocumentRenderer sectionsOverride={post.sections} services={[]} faqs={[]} testimonials={[]} teamMembers={[]} posts={[]} settings={settings} />
    </CmsPublicLayout>
  );
}
