DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_type t
    JOIN pg_enum e ON t.oid = e.enumtypid
    WHERE t.typname = 'user_role' AND e.enumlabel = 'content_manager'
  ) THEN
    ALTER TYPE public.user_role ADD VALUE 'content_manager';
  END IF;
END
$$;

CREATE OR REPLACE FUNCTION public.is_content_manager()
RETURNS boolean
LANGUAGE sql
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE user_id = auth.uid()
      AND role::text IN ('admin', 'content_manager')
  );
$$;

CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TABLE IF NOT EXISTS public.cms_site_settings (
  id text PRIMARY KEY,
  content jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.cms_pages (
  id text PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  page_type text NOT NULL DEFAULT 'standard',
  status text NOT NULL DEFAULT 'draft',
  sort_order integer NOT NULL DEFAULT 0,
  content jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.cms_services (
  id text PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  status text NOT NULL DEFAULT 'draft',
  sort_order integer NOT NULL DEFAULT 0,
  content jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.cms_blog_posts (
  id text PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  status text NOT NULL DEFAULT 'draft',
  sort_order integer NOT NULL DEFAULT 0,
  published_at timestamp with time zone,
  content jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.cms_faqs (
  id text PRIMARY KEY,
  status text NOT NULL DEFAULT 'draft',
  sort_order integer NOT NULL DEFAULT 0,
  page_slug text,
  service_slug text,
  content jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.cms_testimonials (
  id text PRIMARY KEY,
  status text NOT NULL DEFAULT 'draft',
  sort_order integer NOT NULL DEFAULT 0,
  page_slug text,
  service_slug text,
  content jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.cms_team_members (
  id text PRIMARY KEY,
  status text NOT NULL DEFAULT 'draft',
  sort_order integer NOT NULL DEFAULT 0,
  service_slug text,
  content jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.cms_legal_documents (
  id text PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  status text NOT NULL DEFAULT 'draft',
  sort_order integer NOT NULL DEFAULT 0,
  content jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.cms_media_assets (
  id text PRIMARY KEY,
  status text NOT NULL DEFAULT 'draft',
  sort_order integer NOT NULL DEFAULT 0,
  content jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.cms_announcements (
  id text PRIMARY KEY,
  status text NOT NULL DEFAULT 'draft',
  sort_order integer NOT NULL DEFAULT 0,
  content jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_cms_pages_slug_status ON public.cms_pages (slug, status);
CREATE INDEX IF NOT EXISTS idx_cms_pages_sort_order ON public.cms_pages (sort_order);
CREATE INDEX IF NOT EXISTS idx_cms_services_slug_status ON public.cms_services (slug, status);
CREATE INDEX IF NOT EXISTS idx_cms_services_sort_order ON public.cms_services (sort_order);
CREATE INDEX IF NOT EXISTS idx_cms_blog_posts_slug_status ON public.cms_blog_posts (slug, status);
CREATE INDEX IF NOT EXISTS idx_cms_blog_posts_published_at ON public.cms_blog_posts (published_at DESC);
CREATE INDEX IF NOT EXISTS idx_cms_faqs_page_service ON public.cms_faqs (page_slug, service_slug, status);
CREATE INDEX IF NOT EXISTS idx_cms_testimonials_page_service ON public.cms_testimonials (page_slug, service_slug, status);
CREATE INDEX IF NOT EXISTS idx_cms_team_members_service ON public.cms_team_members (service_slug, status);
CREATE INDEX IF NOT EXISTS idx_cms_legal_documents_slug_status ON public.cms_legal_documents (slug, status);

DROP TRIGGER IF EXISTS touch_cms_site_settings_updated_at ON public.cms_site_settings;
CREATE TRIGGER touch_cms_site_settings_updated_at
BEFORE UPDATE ON public.cms_site_settings
FOR EACH ROW
EXECUTE FUNCTION public.touch_updated_at();

DROP TRIGGER IF EXISTS touch_cms_pages_updated_at ON public.cms_pages;
CREATE TRIGGER touch_cms_pages_updated_at
BEFORE UPDATE ON public.cms_pages
FOR EACH ROW
EXECUTE FUNCTION public.touch_updated_at();

DROP TRIGGER IF EXISTS touch_cms_services_updated_at ON public.cms_services;
CREATE TRIGGER touch_cms_services_updated_at
BEFORE UPDATE ON public.cms_services
FOR EACH ROW
EXECUTE FUNCTION public.touch_updated_at();

DROP TRIGGER IF EXISTS touch_cms_blog_posts_updated_at ON public.cms_blog_posts;
CREATE TRIGGER touch_cms_blog_posts_updated_at
BEFORE UPDATE ON public.cms_blog_posts
FOR EACH ROW
EXECUTE FUNCTION public.touch_updated_at();

DROP TRIGGER IF EXISTS touch_cms_faqs_updated_at ON public.cms_faqs;
CREATE TRIGGER touch_cms_faqs_updated_at
BEFORE UPDATE ON public.cms_faqs
FOR EACH ROW
EXECUTE FUNCTION public.touch_updated_at();

DROP TRIGGER IF EXISTS touch_cms_testimonials_updated_at ON public.cms_testimonials;
CREATE TRIGGER touch_cms_testimonials_updated_at
BEFORE UPDATE ON public.cms_testimonials
FOR EACH ROW
EXECUTE FUNCTION public.touch_updated_at();

DROP TRIGGER IF EXISTS touch_cms_team_members_updated_at ON public.cms_team_members;
CREATE TRIGGER touch_cms_team_members_updated_at
BEFORE UPDATE ON public.cms_team_members
FOR EACH ROW
EXECUTE FUNCTION public.touch_updated_at();

DROP TRIGGER IF EXISTS touch_cms_legal_documents_updated_at ON public.cms_legal_documents;
CREATE TRIGGER touch_cms_legal_documents_updated_at
BEFORE UPDATE ON public.cms_legal_documents
FOR EACH ROW
EXECUTE FUNCTION public.touch_updated_at();

DROP TRIGGER IF EXISTS touch_cms_media_assets_updated_at ON public.cms_media_assets;
CREATE TRIGGER touch_cms_media_assets_updated_at
BEFORE UPDATE ON public.cms_media_assets
FOR EACH ROW
EXECUTE FUNCTION public.touch_updated_at();

DROP TRIGGER IF EXISTS touch_cms_announcements_updated_at ON public.cms_announcements;
CREATE TRIGGER touch_cms_announcements_updated_at
BEFORE UPDATE ON public.cms_announcements
FOR EACH ROW
EXECUTE FUNCTION public.touch_updated_at();

ALTER TABLE public.cms_site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_legal_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_announcements ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read site settings" ON public.cms_site_settings;
CREATE POLICY "Public read site settings"
ON public.cms_site_settings
FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Content managers manage site settings" ON public.cms_site_settings;
CREATE POLICY "Content managers manage site settings"
ON public.cms_site_settings
FOR ALL
USING (public.is_content_manager())
WITH CHECK (public.is_content_manager());

DROP POLICY IF EXISTS "Public read published pages" ON public.cms_pages;
CREATE POLICY "Public read published pages"
ON public.cms_pages
FOR SELECT
USING (status = 'published' OR public.is_content_manager());

DROP POLICY IF EXISTS "Content managers manage pages" ON public.cms_pages;
CREATE POLICY "Content managers manage pages"
ON public.cms_pages
FOR ALL
USING (public.is_content_manager())
WITH CHECK (public.is_content_manager());

DROP POLICY IF EXISTS "Public read published services" ON public.cms_services;
CREATE POLICY "Public read published services"
ON public.cms_services
FOR SELECT
USING (status = 'published' OR public.is_content_manager());

DROP POLICY IF EXISTS "Content managers manage services" ON public.cms_services;
CREATE POLICY "Content managers manage services"
ON public.cms_services
FOR ALL
USING (public.is_content_manager())
WITH CHECK (public.is_content_manager());

DROP POLICY IF EXISTS "Public read published blog posts" ON public.cms_blog_posts;
CREATE POLICY "Public read published blog posts"
ON public.cms_blog_posts
FOR SELECT
USING (status = 'published' OR public.is_content_manager());

DROP POLICY IF EXISTS "Content managers manage blog posts" ON public.cms_blog_posts;
CREATE POLICY "Content managers manage blog posts"
ON public.cms_blog_posts
FOR ALL
USING (public.is_content_manager())
WITH CHECK (public.is_content_manager());

DROP POLICY IF EXISTS "Public read published faqs" ON public.cms_faqs;
CREATE POLICY "Public read published faqs"
ON public.cms_faqs
FOR SELECT
USING (status = 'published' OR public.is_content_manager());

DROP POLICY IF EXISTS "Content managers manage faqs" ON public.cms_faqs;
CREATE POLICY "Content managers manage faqs"
ON public.cms_faqs
FOR ALL
USING (public.is_content_manager())
WITH CHECK (public.is_content_manager());

DROP POLICY IF EXISTS "Public read published testimonials" ON public.cms_testimonials;
CREATE POLICY "Public read published testimonials"
ON public.cms_testimonials
FOR SELECT
USING (status = 'published' OR public.is_content_manager());

DROP POLICY IF EXISTS "Content managers manage testimonials" ON public.cms_testimonials;
CREATE POLICY "Content managers manage testimonials"
ON public.cms_testimonials
FOR ALL
USING (public.is_content_manager())
WITH CHECK (public.is_content_manager());

DROP POLICY IF EXISTS "Public read published team members" ON public.cms_team_members;
CREATE POLICY "Public read published team members"
ON public.cms_team_members
FOR SELECT
USING (status = 'published' OR public.is_content_manager());

DROP POLICY IF EXISTS "Content managers manage team members" ON public.cms_team_members;
CREATE POLICY "Content managers manage team members"
ON public.cms_team_members
FOR ALL
USING (public.is_content_manager())
WITH CHECK (public.is_content_manager());

DROP POLICY IF EXISTS "Public read published legal documents" ON public.cms_legal_documents;
CREATE POLICY "Public read published legal documents"
ON public.cms_legal_documents
FOR SELECT
USING (status = 'published' OR public.is_content_manager());

DROP POLICY IF EXISTS "Content managers manage legal documents" ON public.cms_legal_documents;
CREATE POLICY "Content managers manage legal documents"
ON public.cms_legal_documents
FOR ALL
USING (public.is_content_manager())
WITH CHECK (public.is_content_manager());

DROP POLICY IF EXISTS "Public read published media assets" ON public.cms_media_assets;
CREATE POLICY "Public read published media assets"
ON public.cms_media_assets
FOR SELECT
USING (status = 'published' OR public.is_content_manager());

DROP POLICY IF EXISTS "Content managers manage media assets" ON public.cms_media_assets;
CREATE POLICY "Content managers manage media assets"
ON public.cms_media_assets
FOR ALL
USING (public.is_content_manager())
WITH CHECK (public.is_content_manager());

DROP POLICY IF EXISTS "Public read published announcements" ON public.cms_announcements;
CREATE POLICY "Public read published announcements"
ON public.cms_announcements
FOR SELECT
USING (status = 'published' OR public.is_content_manager());

DROP POLICY IF EXISTS "Content managers manage announcements" ON public.cms_announcements;
CREATE POLICY "Content managers manage announcements"
ON public.cms_announcements
FOR ALL
USING (public.is_content_manager())
WITH CHECK (public.is_content_manager());
