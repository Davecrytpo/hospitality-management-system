# CMS Setup

## 1. Apply the CMS migration

Run the new Supabase migration:

- `supabase/migrations/20260512093000_add_cms_content_platform.sql`

This migration:

- adds the `content_manager` role to the existing `user_role` enum
- creates CMS tables for settings, pages, services, blog posts, FAQs, testimonials, team members, legal documents, media assets, and announcements
- enables public read access for published content
- enables write access for `admin` and `content_manager`

## 2. Seed starter content

After the migration is applied:

1. Sign in as `admin` or `content_manager`
2. Open `/cms`
3. Click `Seed Starter Content`

This loads the structured starter dataset for:

- homepage
- about page
- services page
- contact page
- FAQ page
- blog page
- all required service detail pages
- testimonials
- FAQs
- team members
- legal pages
- media assets
- announcements

## 3. Cloudinary configuration

To enable media uploads from the CMS media tab, add these environment variables:

- `VITE_CLOUDINARY_CLOUD_NAME`
- `VITE_CLOUDINARY_UPLOAD_PRESET`

The media library will still work with direct URLs if Cloudinary is not configured yet, but upload buttons require both vars.

To enable Cloudinary asset deletion when media entries are removed from `/cms`, deploy the new Supabase Edge Function and configure these server-side secrets:

- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

Function to deploy:

- `supabase/functions/cloudinary-media-delete`

Without that function, CMS media records can still be removed, but Cloudinary-hosted source assets will not be deleted automatically.

## 4. Access model

- `admin`: full hospital system access plus CMS access
- `content_manager`: CMS access only

CMS route:

- `/cms`

## 5. What is now CMS-driven

- homepage sections
- about page sections
- services directory
- service detail pages
- contact page
- FAQ page
- blog landing page
- blog posts
- policies and terms pages
- generic published CMS pages by slug
- navigation
- footer
- contact details
- testimonials
- FAQs
- team members
- announcements
- SEO fields
