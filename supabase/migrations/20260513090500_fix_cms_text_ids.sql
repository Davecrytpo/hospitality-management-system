ALTER TABLE IF EXISTS public.cms_pages
  ALTER COLUMN id DROP DEFAULT,
  ALTER COLUMN id TYPE text USING COALESCE(NULLIF(content->>'id', ''), id::text);

ALTER TABLE IF EXISTS public.cms_services
  ALTER COLUMN id DROP DEFAULT,
  ALTER COLUMN id TYPE text USING COALESCE(NULLIF(content->>'id', ''), id::text);

ALTER TABLE IF EXISTS public.cms_blog_posts
  ALTER COLUMN id DROP DEFAULT,
  ALTER COLUMN id TYPE text USING COALESCE(NULLIF(content->>'id', ''), id::text);

ALTER TABLE IF EXISTS public.cms_faqs
  ALTER COLUMN id DROP DEFAULT,
  ALTER COLUMN id TYPE text USING COALESCE(NULLIF(content->>'id', ''), id::text);

ALTER TABLE IF EXISTS public.cms_testimonials
  ALTER COLUMN id DROP DEFAULT,
  ALTER COLUMN id TYPE text USING COALESCE(NULLIF(content->>'id', ''), id::text);

ALTER TABLE IF EXISTS public.cms_team_members
  ALTER COLUMN id DROP DEFAULT,
  ALTER COLUMN id TYPE text USING COALESCE(NULLIF(content->>'id', ''), id::text);

ALTER TABLE IF EXISTS public.cms_legal_documents
  ALTER COLUMN id DROP DEFAULT,
  ALTER COLUMN id TYPE text USING COALESCE(NULLIF(content->>'id', ''), id::text);

ALTER TABLE IF EXISTS public.cms_media_assets
  ALTER COLUMN id DROP DEFAULT,
  ALTER COLUMN id TYPE text USING COALESCE(NULLIF(content->>'id', ''), id::text);

ALTER TABLE IF EXISTS public.cms_announcements
  ALTER COLUMN id DROP DEFAULT,
  ALTER COLUMN id TYPE text USING COALESCE(NULLIF(content->>'id', ''), id::text);
