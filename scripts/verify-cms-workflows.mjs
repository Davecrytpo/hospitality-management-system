import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.VITE_SUPABASE_URL ?? "https://phvpnjvgtsitjecpwxus.supabase.co";
const supabasePublishableKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? "sb_publishable_aWVhGtnXivRIwqWJKURh7w_tuy0_cE8";
const adminEmail = process.env.CMS_ADMIN_EMAIL ?? "admin@ontimemedicalgroup.com";
const adminPassword = process.env.CMS_ADMIN_PASSWORD ?? "Admin!Hosp2026CMS#";

const adminClient = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

const publicClient = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

const createdRecords = [];

function normalizeSlug(value) {
  return String(value ?? "")
    .trim()
    .replace(/^\/+|\/+$/g, "")
    .split("/")
    .map((segment) =>
      segment
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, ""),
    )
    .filter(Boolean)
    .join("/");
}

function createId(prefix) {
  return `${prefix}-${crypto.randomUUID()}`;
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function trackRecord(table, id) {
  createdRecords.push({ table, id });
}

async function upsertSingleton(table, payload) {
  const { error } = await adminClient.from(table).upsert(payload, { onConflict: "id" });
  if (error) throw error;
}

async function upsertDocument(table, payload) {
  const { error } = await adminClient.from(table).upsert(payload, { onConflict: "id" });
  if (error) throw error;
}

async function fetchPublishedRow(table, slug) {
  const { data, error } = await publicClient.from(table).select("id, slug, content").eq("slug", slug).eq("status", "published").maybeSingle();
  if (error) throw error;
  return data;
}

async function fetchPublishedCollection(table, filter = {}) {
  let query = publicClient.from(table).select("id, content").eq("status", "published");

  for (const [column, value] of Object.entries(filter)) {
    if (value !== undefined && value !== null && value !== "") {
      query = query.eq(column, value);
    }
  }

  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

async function cleanup() {
  for (const record of [...createdRecords].reverse()) {
    const { error } = await adminClient.from(record.table).delete().eq("id", record.id);
    if (error) {
      console.error(`Cleanup failed for ${record.table}:${record.id}`, error);
    }
  }
}

async function main() {
  const timestamp = Date.now();

  const { error: signInError } = await adminClient.auth.signInWithPassword({
    email: adminEmail,
    password: adminPassword,
  });

  if (signInError) throw signInError;

  try {
    const { data: existingSettings, error: settingsError } = await adminClient.from("cms_site_settings").select("id, content").eq("id", "default").maybeSingle();
    if (settingsError) throw settingsError;
    assert(existingSettings?.id === "default", "Site settings record was not found.");
    await upsertSingleton("cms_site_settings", existingSettings);

    const pageId = createId("page");
    const pageDraftSlug = normalizeSlug(` QA Page ${timestamp} `);
    const pagePublishedSlug = normalizeSlug(`QA Published Page ${timestamp}`);
    const pageDraft = {
      id: pageId,
      slug: pageDraftSlug,
      status: "draft",
      sort_order: 9999,
      page_type: "standard",
      content: {
        id: pageId,
        slug: pageDraftSlug,
        title: `QA Page ${timestamp}`,
        navigationLabel: "QA Page",
        pageType: "standard",
        status: "draft",
        sortOrder: 9999,
        showInNavigation: false,
        excerpt: "QA page draft verification record.",
        seo: {
          metaTitle: `QA Page ${timestamp}`,
          metaDescription: "QA page verification.",
          keywords: ["qa"],
          slug: pageDraftSlug,
        },
        sections: [
          {
            id: createId("section"),
            type: "hero",
            name: "Hero",
            isVisible: true,
            theme: "light",
            dataSource: "manual",
            title: `QA Page ${timestamp}`,
            subtitle: "",
            body: "QA page body copy.",
            buttons: [],
            items: [],
            columns: 3,
            style: "grid",
          },
        ],
      },
    };
    await upsertDocument("cms_pages", pageDraft);
    trackRecord("cms_pages", pageId);
    assert((await fetchPublishedRow("cms_pages", pageDraftSlug)) === null, "Draft page should not be publicly visible.");

    await upsertDocument("cms_pages", {
      ...pageDraft,
      slug: pagePublishedSlug,
      status: "published",
      content: {
        ...pageDraft.content,
        slug: pagePublishedSlug,
        status: "published",
        showInNavigation: true,
        excerpt: "QA page published verification record.",
        seo: {
          ...pageDraft.content.seo,
          slug: pagePublishedSlug,
        },
      },
    });
    assert((await fetchPublishedRow("cms_pages", pagePublishedSlug))?.id === pageId, "Published page could not be fetched.");

    const serviceId = createId("service");
    const serviceDraftSlug = normalizeSlug(` QA Service ${timestamp} `);
    const servicePublishedSlug = normalizeSlug(`QA Published Service ${timestamp}`);
    const serviceDraft = {
      id: serviceId,
      slug: serviceDraftSlug,
      status: "draft",
      sort_order: 9999,
      content: {
        id: serviceId,
        slug: serviceDraftSlug,
        title: `QA Service ${timestamp}`,
        shortTitle: "QA Service",
        categoryLabel: "QA",
        status: "draft",
        sortOrder: 9999,
        featuredOnHome: false,
        featuredInNavigation: false,
        excerpt: "QA service draft verification record.",
        summary: "QA service summary.",
        icon: "stethoscope",
        previewImage: { url: "/cms-assets/logo-ontime.png", alt: "QA service image" },
        seo: {
          metaTitle: `QA Service ${timestamp}`,
          metaDescription: "QA service verification.",
          keywords: ["qa"],
          slug: serviceDraftSlug,
        },
        sections: [
          {
            id: createId("section"),
            type: "hero",
            name: "Hero",
            isVisible: true,
            theme: "light",
            dataSource: "manual",
            title: `QA Service ${timestamp}`,
            subtitle: "QA subtitle",
            body: "QA service hero body.",
            image: { url: "/cms-assets/service-page-primary-hero.png", alt: "QA hero image" },
            buttons: [],
            items: [],
            columns: 3,
            style: "grid",
          },
          {
            id: createId("section"),
            type: "featureGrid",
            name: "Features",
            isVisible: true,
            theme: "light",
            dataSource: "manual",
            title: "What this service covers",
            subtitle: "",
            body: "",
            buttons: [],
            items: [
              { id: createId("item"), title: "Feature one", description: "Feature one description.", bullets: [], metadata: [] },
              { id: createId("item"), title: "Feature two", description: "Feature two description.", bullets: [], metadata: [] },
            ],
            columns: 3,
            style: "grid",
          },
          {
            id: createId("section"),
            type: "cta",
            name: "CTA",
            isVisible: true,
            theme: "primary",
            dataSource: "manual",
            title: "Need this service?",
            subtitle: "",
            body: "Book now.",
            buttons: [{ id: createId("button"), label: "Book appointment", href: "/contact", variant: "primary" }],
            items: [],
            columns: 3,
            style: "grid",
          },
        ],
      },
    };
    await upsertDocument("cms_services", serviceDraft);
    trackRecord("cms_services", serviceId);
    assert((await fetchPublishedRow("cms_services", serviceDraftSlug)) === null, "Draft service should not be publicly visible.");

    await upsertDocument("cms_services", {
      ...serviceDraft,
      slug: servicePublishedSlug,
      status: "published",
      content: {
        ...serviceDraft.content,
        slug: servicePublishedSlug,
        status: "published",
        featuredInNavigation: true,
        seo: {
          ...serviceDraft.content.seo,
          slug: servicePublishedSlug,
        },
      },
    });
    assert((await fetchPublishedRow("cms_services", servicePublishedSlug))?.id === serviceId, "Published service could not be fetched.");

    const faqId = createId("faq");
    await upsertDocument("cms_faqs", {
      id: faqId,
      status: "published",
      sort_order: 9999,
      service_slug: servicePublishedSlug,
      page_slug: null,
      content: {
        id: faqId,
        question: `QA FAQ ${timestamp}?`,
        answer: "QA answer.",
        category: "QA",
        status: "published",
        sortOrder: 9999,
        serviceSlug: servicePublishedSlug,
      },
    });
    trackRecord("cms_faqs", faqId);
    assert((await fetchPublishedCollection("cms_faqs", { service_slug: servicePublishedSlug })).some((entry) => entry.id === faqId), "Published FAQ could not be fetched.");

    const testimonialId = createId("testimonial");
    await upsertDocument("cms_testimonials", {
      id: testimonialId,
      status: "published",
      sort_order: 9999,
      service_slug: servicePublishedSlug,
      page_slug: null,
      content: {
        id: testimonialId,
        quote: "QA testimonial.",
        name: "QA Patient",
        role: "Patient",
        rating: 5,
        status: "published",
        sortOrder: 9999,
        serviceSlug: servicePublishedSlug,
      },
    });
    trackRecord("cms_testimonials", testimonialId);
    assert((await fetchPublishedCollection("cms_testimonials", { service_slug: servicePublishedSlug })).some((entry) => entry.id === testimonialId), "Published testimonial could not be fetched.");

    const teamId = createId("team");
    await upsertDocument("cms_team_members", {
      id: teamId,
      status: "published",
      sort_order: 9999,
      service_slug: servicePublishedSlug,
      content: {
        id: teamId,
        name: "QA Clinician",
        role: "QA Lead",
        bio: "QA bio.",
        status: "published",
        sortOrder: 9999,
        serviceSlug: servicePublishedSlug,
      },
    });
    trackRecord("cms_team_members", teamId);
    assert((await fetchPublishedCollection("cms_team_members", { service_slug: servicePublishedSlug })).some((entry) => entry.id === teamId), "Published team member could not be fetched.");

    const postId = createId("post");
    const postDraftSlug = normalizeSlug(` QA Blog ${timestamp} `);
    const postPublishedSlug = normalizeSlug(`QA Published Blog ${timestamp}`);
    const postDraft = {
      id: postId,
      slug: postDraftSlug,
      status: "draft",
      sort_order: 9999,
      published_at: new Date().toISOString().slice(0, 10),
      content: {
        id: postId,
        slug: postDraftSlug,
        title: `QA Blog ${timestamp}`,
        category: "QA",
        authorName: "QA Team",
        status: "draft",
        sortOrder: 9999,
        excerpt: "QA blog draft verification record.",
        coverImage: { url: "/cms-assets/mockup-blog-wellness.jpg", alt: "QA cover" },
        publishedAt: new Date().toISOString().slice(0, 10),
        seo: {
          metaTitle: `QA Blog ${timestamp}`,
          metaDescription: "QA blog verification.",
          keywords: ["qa"],
          slug: postDraftSlug,
        },
        sections: [
          {
            id: createId("section"),
            type: "hero",
            name: "Hero",
            isVisible: true,
            theme: "light",
            dataSource: "manual",
            title: `QA Blog ${timestamp}`,
            subtitle: "",
            body: "QA blog body.",
            image: { url: "/cms-assets/mockup-blog-wellness.jpg", alt: "QA blog" },
            buttons: [],
            items: [],
            columns: 3,
            style: "grid",
          },
        ],
      },
    };
    await upsertDocument("cms_blog_posts", postDraft);
    trackRecord("cms_blog_posts", postId);
    assert((await fetchPublishedRow("cms_blog_posts", postDraftSlug)) === null, "Draft blog post should not be publicly visible.");

    await upsertDocument("cms_blog_posts", {
      ...postDraft,
      slug: postPublishedSlug,
      status: "published",
      content: {
        ...postDraft.content,
        slug: postPublishedSlug,
        status: "published",
        excerpt: "QA blog published verification record.",
        seo: {
          ...postDraft.content.seo,
          slug: postPublishedSlug,
        },
      },
    });
    assert((await fetchPublishedRow("cms_blog_posts", postPublishedSlug))?.id === postId, "Published blog post could not be fetched.");

    const legalId = createId("legal");
    const legalDraftSlug = normalizeSlug(` QA Policy ${timestamp} `);
    const legalPublishedSlug = normalizeSlug(`QA Published Policy ${timestamp}`);
    const legalDraft = {
      id: legalId,
      slug: legalDraftSlug,
      status: "draft",
      sort_order: 9999,
      content: {
        id: legalId,
        slug: legalDraftSlug,
        title: `QA Policy ${timestamp}`,
        summary: "QA legal draft verification record.",
        status: "draft",
        sortOrder: 9999,
        seo: {
          metaTitle: `QA Policy ${timestamp}`,
          metaDescription: "QA legal verification.",
          keywords: ["qa"],
          slug: legalDraftSlug,
        },
        sections: [
          {
            id: createId("section"),
            type: "hero",
            name: "Hero",
            isVisible: true,
            theme: "light",
            dataSource: "manual",
            title: `QA Policy ${timestamp}`,
            subtitle: "",
            body: "QA legal body.",
            buttons: [],
            items: [],
            columns: 3,
            style: "grid",
          },
        ],
      },
    };
    await upsertDocument("cms_legal_documents", legalDraft);
    trackRecord("cms_legal_documents", legalId);
    assert((await fetchPublishedRow("cms_legal_documents", legalDraftSlug)) === null, "Draft legal document should not be publicly visible.");

    await upsertDocument("cms_legal_documents", {
      ...legalDraft,
      slug: legalPublishedSlug,
      status: "published",
      content: {
        ...legalDraft.content,
        slug: legalPublishedSlug,
        status: "published",
        summary: "QA legal published verification record.",
        seo: {
          ...legalDraft.content.seo,
          slug: legalPublishedSlug,
        },
      },
    });
    assert((await fetchPublishedRow("cms_legal_documents", legalPublishedSlug))?.id === legalId, "Published legal document could not be fetched.");

    const mediaId = createId("media");
    await upsertDocument("cms_media_assets", {
      id: mediaId,
      status: "published",
      sort_order: 9999,
      content: {
        id: mediaId,
        name: "QA Asset",
        alt: "QA asset",
        url: "/cms-assets/logo-ontime.png",
        type: "image",
        status: "published",
        sortOrder: 9999,
        tags: ["qa"],
      },
    });
    trackRecord("cms_media_assets", mediaId);
    assert((await fetchPublishedCollection("cms_media_assets")).some((entry) => entry.id === mediaId), "Media asset could not be fetched.");

    const announcementId = createId("announcement");
    await upsertDocument("cms_announcements", {
      id: announcementId,
      status: "published",
      sort_order: 9999,
      content: {
        id: announcementId,
        title: "QA Announcement",
        body: "QA announcement body.",
        status: "published",
        sortOrder: 9999,
        href: "/contact",
        buttonLabel: "Contact",
      },
    });
    trackRecord("cms_announcements", announcementId);
    assert((await fetchPublishedCollection("cms_announcements")).some((entry) => entry.id === announcementId), "Announcement could not be fetched.");

    console.log(
      JSON.stringify(
        {
          verified: true,
          timestamp,
          recordsChecked: {
            settings: true,
            page: pagePublishedSlug,
            service: servicePublishedSlug,
            faq: faqId,
            testimonial: testimonialId,
            teamMember: teamId,
            blogPost: postPublishedSlug,
            legalDocument: legalPublishedSlug,
            mediaAsset: mediaId,
            announcement: announcementId,
          },
        },
        null,
        2,
      ),
    );
  } finally {
    await cleanup();
    await adminClient.auth.signOut();
  }
}

main().catch((error) => {
  console.error(JSON.stringify(error, null, 2));
  process.exit(1);
});
