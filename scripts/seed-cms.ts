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
  const { seedCmsDefaults } = await import("../src/features/cms/api");

  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: adminEmail,
    password: adminPassword,
  });

  if (signInError) {
    throw signInError;
  }

  await seedCmsDefaults();

  const [{ count: pages }, { count: services }, { count: posts }] = await Promise.all([
    supabase.from("cms_pages").select("*", { count: "exact", head: true }),
    supabase.from("cms_services").select("*", { count: "exact", head: true }),
    supabase.from("cms_blog_posts").select("*", { count: "exact", head: true }),
  ]);

  console.log(
    JSON.stringify(
      {
        seeded: true,
        email: adminEmail,
        counts: {
          pages: pages ?? 0,
          services: services ?? 0,
          posts: posts ?? 0,
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
