type StorageMap = Record<string, string>;

class MemoryStorage {
  private store: StorageMap = {};

  get length() {
    return Object.keys(this.store).length;
  }

  clear() {
    this.store = {};
  }

  getItem(key: string) {
    return Object.prototype.hasOwnProperty.call(this.store, key) ? this.store[key] : null;
  }

  key(index: number) {
    return Object.keys(this.store)[index] ?? null;
  }

  removeItem(key: string) {
    delete this.store[key];
  }

  setItem(key: string, value: string) {
    this.store[key] = String(value);
  }
}

Object.defineProperty(globalThis, "localStorage", {
  configurable: true,
  value: new MemoryStorage(),
});

const adminEmail = process.env.CMS_ADMIN_EMAIL ?? "admin@ontimemedicalgroup.com";
const adminPassword = process.env.CMS_ADMIN_PASSWORD ?? "Admin!Hosp2026CMS#";

try {
  const { supabase } = await import("../src/integrations/supabase/client");
  const {
    fetchCmsBlogPosts,
    fetchCmsLegalDocuments,
    fetchCmsMediaAssets,
    fetchCmsPages,
    fetchCmsServices,
    fetchCmsSiteSettings,
    fetchCmsTeamMembers,
    fetchCmsTestimonials,
    saveCmsBlogPost,
    saveCmsLegalDocument,
    saveCmsMediaAsset,
    saveCmsPage,
    saveCmsService,
    saveCmsSiteSettings,
    saveCmsTeamMember,
    saveCmsTestimonial,
  } = await import("../src/features/cms/api");

  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: adminEmail,
    password: adminPassword,
  });

  if (signInError) {
    throw signInError;
  }

  const [settings, pages, services, posts, testimonials, teamMembers, legalDocuments, mediaAssets] = await Promise.all([
    fetchCmsSiteSettings(),
    fetchCmsPages(true),
    fetchCmsServices(true),
    fetchCmsBlogPosts(true),
    fetchCmsTestimonials({ includeDrafts: true }),
    fetchCmsTeamMembers({ includeDrafts: true }),
    fetchCmsLegalDocuments(true),
    fetchCmsMediaAssets(true),
  ]);

  await saveCmsSiteSettings(settings);
  await Promise.all(pages.map((entry) => saveCmsPage(entry)));
  await Promise.all(services.map((entry) => saveCmsService(entry)));
  await Promise.all(posts.map((entry) => saveCmsBlogPost(entry)));
  await Promise.all(testimonials.map((entry) => saveCmsTestimonial(entry)));
  await Promise.all(teamMembers.map((entry) => saveCmsTeamMember(entry)));
  await Promise.all(legalDocuments.map((entry) => saveCmsLegalDocument(entry)));
  await Promise.all(mediaAssets.map((entry) => saveCmsMediaAsset(entry)));

  console.log(
    JSON.stringify(
      {
        repaired: true,
        counts: {
          pages: pages.length,
          services: services.length,
          posts: posts.length,
          testimonials: testimonials.length,
          teamMembers: teamMembers.length,
          legalDocuments: legalDocuments.length,
          mediaAssets: mediaAssets.length,
        },
      },
      null,
      2,
    ),
  );

  await supabase.auth.signOut();
} catch (error) {
  console.error(JSON.stringify(error, null, 2));
  process.exit(1);
}
