import { describe, expect, it } from "vitest";
import { getServicePageContent } from "@/data/servicePageContent";
import { cmsDefaults } from "@/features/cms/defaults";
import { buildServicePageContent } from "@/features/cms/originalSiteAdapters";
import { serviceLooksLikePlaceholder } from "@/features/cms/publicContent";
import type { CmsService } from "@/features/cms/types";

describe("Service CMS defaults", () => {
  it.each(["chronic-disease-management", "substance-use-treatment", "urgent-care"] as const)(
    "preserves the approved service design content for %s",
    (slug) => {
      const designPage = getServicePageContent(slug);
      const cmsService = cmsDefaults.services.find((service) => service.slug === slug);

      expect(designPage).toBeTruthy();
      expect(cmsService).toBeTruthy();

      const resolvedPage = buildServicePageContent(cmsService!);

      expect(resolvedPage.titleLines).toEqual(designPage!.titleLines);
      expect(resolvedPage.breadcrumbLabel).toBe(designPage!.breadcrumbLabel);
      expect(resolvedPage.subtitle).toBe(designPage!.subtitle);
      expect(resolvedPage.description).toBe(designPage!.description);
      expect(resolvedPage.heroBadges.map((badge) => badge.label)).toEqual(designPage!.heroBadges.map((badge) => badge.label));
      expect(resolvedPage.heroOverlayChoices?.map((choice) => choice.title) ?? []).toEqual(designPage!.heroOverlayChoices?.map((choice) => choice.title) ?? []);
      expect(resolvedPage.sectionTitle).toBe(designPage!.sectionTitle);
      expect(resolvedPage.sectionSubtitle).toBe(designPage!.sectionSubtitle);
      expect(resolvedPage.offeringRows.map((row) => row.map((offering) => offering.title))).toEqual(
        designPage!.offeringRows.map((row) => row.map((offering) => offering.title)),
      );
      expect(resolvedPage.stageBand.title).toBe(designPage!.stageBand.title);
      expect(resolvedPage.stageBand.items.map((item) => item.label)).toEqual(designPage!.stageBand.items.map((item) => item.label));
      expect(resolvedPage.footerColumns.map((column) => column.title)).toEqual(designPage!.footerColumns.map((column) => column.title));
    },
  );

  it("treats the old generic service template as placeholder content", () => {
    const placeholderService: CmsService = {
      id: "service-placeholder",
      slug: "primary-care",
      title: "Primary Care",
      shortTitle: "Primary Care",
      categoryLabel: "Clinical Service",
      status: "published",
      sortOrder: 1,
      featuredOnHome: true,
      featuredInNavigation: true,
      excerpt: "Personalized care for routine visits and long-term support.",
      summary: "Primary care focused on longitudinal care.",
      icon: "stethoscope",
      previewImage: { url: "/cms-assets/placeholder.png", alt: "placeholder" },
      seo: {
        metaTitle: "Primary Care",
        metaDescription: "Primary care services",
        keywords: [],
        slug: "services/primary-care",
      },
      sections: [
        {
          id: "section-placeholder",
          type: "featureGrid",
          name: "What this service covers",
          isVisible: true,
          theme: "light",
          dataSource: "manual",
          title: "What this service covers",
          subtitle: "",
          body: "",
          buttons: [],
          items: [],
          columns: 3,
          style: "grid",
        },
      ],
    };

    expect(serviceLooksLikePlaceholder(placeholderService)).toBe(true);
  });
});
