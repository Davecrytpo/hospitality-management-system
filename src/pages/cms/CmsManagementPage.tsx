import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowDown,
  ArrowUp,
  CheckCircle2,
  ChevronRight,
  Copy,
  Eye,
  ExternalLink,
  FileText,
  ImagePlus,
  LayoutDashboard,
  Loader2,
  Megaphone,
  Newspaper,
  Plus,
  RefreshCcw,
  Save,
  Settings2,
  Shield,
  Stethoscope,
  Trash2,
  Undo2,
  Users,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { cmsIconOptions } from "@/features/cms/icons";
import {
  useCmsAnnouncements,
  useCmsBlogPosts,
  useCmsFaqs,
  useCmsLegalDocuments,
  useCmsMediaAssets,
  useCmsPages,
  useCmsServices,
  useCmsSiteSettings,
  useCmsTeamMembers,
  useCmsTestimonials,
  useDeleteCmsMediaAsset,
  useDeleteCmsRecord,
  useSaveCmsAnnouncement,
  useSaveCmsBlogPost,
  useSaveCmsFaq,
  useSaveCmsLegalDocument,
  useSaveCmsMediaAsset,
  useSaveCmsPage,
  useSaveCmsService,
  useSaveCmsSiteSettings,
  useSaveCmsTeamMember,
  useSaveCmsTestimonial,
  useSeedCmsDefaults,
} from "@/features/cms/hooks";
import type {
  CmsAnnouncement,
  CmsBlogPost,
  CmsButton,
  CmsFaq,
  CmsImage,
  CmsItem,
  CmsLegalDocument,
  CmsMediaAsset,
  CmsNavigationItem,
  CmsPage,
  CmsSection,
  CmsService,
  CmsStatus,
  CmsSiteSettings,
  CmsSocialLink,
  CmsTeamMember,
  CmsTestimonial,
} from "@/features/cms/types";
import { cloneCmsValue, createCmsId, createEmptyButton, createEmptyImage, createEmptyItem, createEmptySection } from "@/features/cms/utils";
import { cn } from "@/lib/utils";

const sectionTypes: CmsSection["type"][] = ["hero", "richText", "featureGrid", "stats", "serviceList", "testimonialList", "faqList", "cta", "teamGrid", "gallery", "timeline", "blogFeed", "contactCards"];
const sectionThemes: CmsSection["theme"][] = ["light", "muted", "primary", "accent"];
const dataSources: CmsSection["dataSource"][] = ["manual", "services", "testimonials", "faqs", "team", "blog-posts"];

function moveItem<T>(items: T[], index: number, direction: -1 | 1) {
  const nextIndex = index + direction;
  if (nextIndex < 0 || nextIndex >= items.length) return items;
  const updated = [...items];
  const [current] = updated.splice(index, 1);
  updated.splice(nextIndex, 0, current);
  return updated;
}

function createBlankSeo(slug: string) {
  return {
    metaTitle: "",
    metaDescription: "",
    keywords: [],
    canonicalUrl: slug ? `https://ontimemedicalgroup.com/${slug}` : "",
    slug,
  };
}

function createBlankPage(): CmsPage {
  return {
    id: createCmsId("page"),
    slug: `new-page-${Date.now()}`,
    title: "New Page",
    navigationLabel: "New Page",
    pageType: "standard",
    status: "draft",
    sortOrder: 999,
    showInNavigation: false,
    excerpt: "",
    seo: createBlankSeo(""),
    sections: [createEmptySection("hero"), createEmptySection("richText")],
  };
}

function createBlankService(): CmsService {
  return {
    id: createCmsId("service"),
    slug: `new-service-${Date.now()}`,
    title: "New Service",
    shortTitle: "New Service",
    categoryLabel: "Clinical Service",
    status: "draft",
    sortOrder: 999,
    featuredOnHome: false,
    featuredInNavigation: true,
    excerpt: "",
    summary: "",
    icon: "stethoscope",
    previewImage: createEmptyImage(),
    seo: createBlankSeo(""),
    sections: [createEmptySection("hero"), createEmptySection("featureGrid"), createEmptySection("cta")],
  };
}

function createBlankPost(): CmsBlogPost {
  return {
    id: createCmsId("post"),
    slug: `new-post-${Date.now()}`,
    title: "New Blog Post",
    category: "General",
    authorName: "Content Team",
    status: "draft",
    sortOrder: 999,
    excerpt: "",
    coverImage: createEmptyImage(),
    publishedAt: new Date().toISOString().slice(0, 10),
    seo: createBlankSeo(""),
    sections: [createEmptySection("hero"), createEmptySection("richText")],
  };
}

function createBlankLegal(): CmsLegalDocument {
  return {
    id: createCmsId("legal"),
    slug: `new-legal-${Date.now()}`,
    title: "New Legal Page",
    summary: "",
    status: "draft",
    sortOrder: 999,
    seo: createBlankSeo(""),
    sections: [createEmptySection("hero"), createEmptySection("richText")],
  };
}

function createBlankFaq(): CmsFaq {
  return {
    id: createCmsId("faq"),
    question: "New FAQ question",
    answer: "",
    category: "General",
    status: "draft",
    sortOrder: 999,
  };
}

function createBlankTestimonial(): CmsTestimonial {
  return {
    id: createCmsId("testimonial"),
    quote: "",
    name: "New testimonial",
    role: "",
    rating: 5,
    status: "draft",
    sortOrder: 999,
  };
}

function createBlankTeamMember(): CmsTeamMember {
  return {
    id: createCmsId("team"),
    name: "New team member",
    role: "",
    bio: "",
    status: "draft",
    sortOrder: 999,
  };
}

function createBlankMediaAsset(): CmsMediaAsset {
  return {
    id: createCmsId("media"),
    name: "New asset",
    alt: "",
    url: "",
    type: "image",
    status: "draft",
    sortOrder: 999,
    tags: [],
  };
}

function createBlankAnnouncement(): CmsAnnouncement {
  return {
    id: createCmsId("announcement"),
    title: "New announcement",
    body: "",
    status: "draft",
    sortOrder: 999,
  };
}

type CmsCollectionKey =
  | "overview"
  | "settings"
  | "pages"
  | "services"
  | "blog"
  | "faqs"
  | "testimonials"
  | "team"
  | "legal"
  | "media"
  | "announcements";

type CmsScopeKey = "live" | "drafts" | "deleted" | "all";
type CmsSettingsPanelKey = "branding" | "contact" | "navbar" | "footer" | "social" | "theme" | "announcements" | "appointments" | "seo";

interface CmsWorkspaceRecord<T extends { id: string; status: CmsStatus }> {
  key: string;
  title: string;
  subtitle?: string;
  description?: string;
  status: CmsStatus;
  item: T;
  chips?: string[];
}

interface CmsMediaLibraryContextValue {
  mediaAssets: CmsMediaAsset[];
}

const CmsMediaLibraryContext = createContext<CmsMediaLibraryContextValue | null>(null);

const corePageSlugs = ["home", "about-us", "services", "contact", "faq", "blog"];
const collectionOrder: CmsCollectionKey[] = ["overview", "settings", "pages", "services", "blog", "faqs", "testimonials", "team", "legal", "media", "announcements"];
const scopeOptions: Array<{ key: CmsScopeKey; label: string }> = [
  { key: "live", label: "Live" },
  { key: "drafts", label: "Drafts" },
  { key: "deleted", label: "Deleted" },
  { key: "all", label: "All" },
];
const settingsPanelLabels: Array<{ key: CmsSettingsPanelKey; label: string }> = [
  { key: "branding", label: "Branding" },
  { key: "contact", label: "Contact" },
  { key: "navbar", label: "Navbar" },
  { key: "footer", label: "Footer" },
  { key: "social", label: "Social Links" },
  { key: "theme", label: "Theme Settings" },
  { key: "announcements", label: "Announcements" },
  { key: "appointments", label: "Appointments" },
  { key: "seo", label: "SEO" },
];
const collectionMeta: Record<Exclude<CmsCollectionKey, "overview">, { label: string; singularLabel: string; description: string; icon: LucideIcon; defaultScope?: CmsScopeKey }> = {
  settings: {
    label: "Settings",
    singularLabel: "Setting",
    description: "Branding, contact details, navigation, footer, SEO defaults, and booking labels.",
    icon: Settings2,
  },
  pages: {
    label: "Pages",
    singularLabel: "Page",
    description: "Homepage, About, Services page, Contact, FAQ, Blog landing, and standard pages.",
    icon: FileText,
    defaultScope: "live",
  },
  services: {
    label: "Services",
    singularLabel: "Service",
    description: "Service directory cards and service detail pages.",
    icon: Stethoscope,
    defaultScope: "live",
  },
  blog: {
    label: "Blog",
    singularLabel: "Blog post",
    description: "Blog landing content and individual blog posts.",
    icon: Newspaper,
    defaultScope: "live",
  },
  faqs: {
    label: "FAQs",
    singularLabel: "FAQ",
    description: "Global FAQs and service-specific FAQ entries.",
    icon: CheckCircle2,
    defaultScope: "live",
  },
  testimonials: {
    label: "Testimonials",
    singularLabel: "Testimonial",
    description: "Homepage, services, and page-specific testimonials.",
    icon: ExternalLink,
    defaultScope: "live",
  },
  team: {
    label: "Team",
    singularLabel: "Team member",
    description: "Doctors, clinicians, and service team members.",
    icon: Users,
    defaultScope: "live",
  },
  legal: {
    label: "Policies",
    singularLabel: "Policy",
    description: "Privacy policy, terms, and other legal content.",
    icon: Shield,
    defaultScope: "live",
  },
  media: {
    label: "Media",
    singularLabel: "Media asset",
    description: "Media library for images, videos, and downloadable files.",
    icon: ImagePlus,
    defaultScope: "live",
  },
  announcements: {
    label: "Announcements",
    singularLabel: "Announcement",
    description: "Announcement bar notices and public alerts.",
    icon: Megaphone,
    defaultScope: "live",
  },
};

function isCmsCollectionKey(value: string | null | undefined): value is CmsCollectionKey {
  return Boolean(value) && collectionOrder.includes(value as CmsCollectionKey);
}

function isCmsScopeKey(value: string | null | undefined): value is CmsScopeKey {
  return value === "live" || value === "drafts" || value === "deleted" || value === "all";
}

function isCmsSettingsPanelKey(value: string | null | undefined): value is CmsSettingsPanelKey {
  return value === "branding" || value === "contact" || value === "navbar" || value === "footer" || value === "social" || value === "theme" || value === "announcements" || value === "appointments" || value === "seo";
}

function getScopeFromStatus(status: CmsStatus): CmsScopeKey {
  switch (status) {
    case "published":
      return "live";
    case "deleted":
      return "deleted";
    default:
      return "drafts";
  }
}

function matchesScope(status: CmsStatus, scope: CmsScopeKey) {
  if (scope === "all") return true;
  if (scope === "live") return status === "published";
  if (scope === "deleted") return status === "deleted";
  return status === "draft";
}

function getStatusLabel(status: CmsStatus) {
  switch (status) {
    case "published":
      return "Live";
    case "deleted":
      return "Deleted";
    default:
      return "Draft";
  }
}

function useCmsMediaLibrary() {
  return useContext(CmsMediaLibraryContext);
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <Label className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">{children}</Label>;
}

function StatusSelectItems() {
  return (
    <>
      <SelectItem value="draft">Draft</SelectItem>
      <SelectItem value="published">Live</SelectItem>
      <SelectItem value="deleted">Deleted</SelectItem>
    </>
  );
}

function StatusBadge({ status }: { status: CmsStatus }) {
  return (
    <Badge
      className={cn(
        "border text-[11px] font-semibold uppercase tracking-[0.12em]",
        status === "published" && "border-emerald-200 bg-emerald-50 text-emerald-700",
        status === "draft" && "border-amber-200 bg-amber-50 text-amber-700",
        status === "deleted" && "border-rose-200 bg-rose-50 text-rose-700",
      )}
    >
      {getStatusLabel(status)}
    </Badge>
  );
}

function StatusDot({ status }: { status: CmsStatus }) {
  return (
    <span
      className={cn(
        "inline-flex h-2.5 w-2.5 rounded-full",
        status === "published" && "bg-emerald-500",
        status === "draft" && "bg-amber-500",
        status === "deleted" && "bg-rose-500",
      )}
    />
  );
}

function WorkspacePanel({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-background/80 p-5 shadow-sm">
      <div className="mb-4 space-y-1">
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
        {description && <p className="text-sm leading-6 text-muted-foreground">{description}</p>}
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function ImageFields({ label, value, onChange }: { label: string; value?: CmsImage; onChange: (next: CmsImage) => void }) {
  const current = value ?? createEmptyImage();
  const mediaLibrary = useCmsMediaLibrary();
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const imageAssets = useMemo(
    () =>
      (mediaLibrary?.mediaAssets ?? [])
        .filter((asset) => asset.type === "image" && asset.status !== "deleted")
        .sort((left, right) => (left.sortOrder ?? 0) - (right.sortOrder ?? 0)),
    [mediaLibrary?.mediaAssets],
  );

  return (
    <div className="space-y-3">
      <FieldLabel>{label}</FieldLabel>
      <div className="grid gap-3 md:grid-cols-[1fr_220px]">
        <Input value={current.url} onChange={(event) => onChange({ ...current, url: event.target.value })} placeholder="/cms-assets/... or https://..." />
        <Input value={current.alt} onChange={(event) => onChange({ ...current, alt: event.target.value })} placeholder="Alt text" />
      </div>
      <div className="flex flex-wrap items-center gap-3">
        {imageAssets.length > 0 && (
          <Button type="button" variant="outline" size="sm" onClick={() => setLibraryOpen(true)}>
            <Eye className="mr-2 h-4 w-4" />
            Choose From Media Library
          </Button>
        )}
        <Label className="inline-flex cursor-pointer items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium">
          <ImagePlus className="h-4 w-4" />
          Upload Image
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={async (event) => {
              const file = event.target.files?.[0];
              if (!file) return;

              try {
                setUploading(true);
                const uploaded = await uploadToCloudinary(file);
                const fallbackAlt = file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ").trim();
                onChange({
                  ...current,
                  url: uploaded.secure_url,
                  alt: current.alt || fallbackAlt,
                  publicId: uploaded.public_id,
                  width: uploaded.width,
                  height: uploaded.height,
                });
                toast.success("Image uploaded");
              } catch (error) {
                toast.error(error instanceof Error ? error.message : "Upload failed");
              } finally {
                setUploading(false);
                event.target.value = "";
              }
            }}
          />
        </Label>
        <span className="text-xs text-muted-foreground">
          No need to paste a link. Upload here or choose an existing asset from the media library.
        </span>
      </div>
      {uploading && <p className="text-sm text-muted-foreground">Uploading image...</p>}
      {current.url && (
        <div className="overflow-hidden rounded-xl border border-border bg-muted/20">
          <img src={current.url} alt={current.alt || label} className="max-h-60 w-full object-contain" />
        </div>
      )}
      <Dialog open={libraryOpen} onOpenChange={setLibraryOpen}>
        <DialogContent className="sm:max-w-5xl">
          <DialogHeader>
            <DialogTitle>Select an image</DialogTitle>
            <DialogDescription>Choose an existing image from the CMS media library.</DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[70vh] pr-4">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {imageAssets.map((asset) => (
                <button
                  key={asset.id}
                  type="button"
                  className="overflow-hidden rounded-xl border border-border bg-background text-left transition-colors hover:border-primary/40"
                  onClick={() => {
                    onChange({
                      ...current,
                      url: asset.url,
                      alt: current.alt || asset.alt || asset.name,
                      width: asset.width,
                      height: asset.height,
                    });
                    setLibraryOpen(false);
                  }}
                >
                  <div className="aspect-[4/3] overflow-hidden bg-muted/30">
                    <img src={asset.url} alt={asset.alt || asset.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="space-y-1 p-4">
                    <p className="font-semibold text-foreground">{asset.name}</p>
                    <p className="line-clamp-2 text-sm text-muted-foreground">{asset.alt || "No alt text yet"}</p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      <StatusBadge status={asset.status} />
                      {asset.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ButtonsEditor({ value, onChange }: { value: CmsButton[]; onChange: (next: CmsButton[]) => void }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <FieldLabel>Buttons</FieldLabel>
        <Button type="button" variant="outline" size="sm" onClick={() => onChange([...value, createEmptyButton()])}>
          <Plus className="mr-2 h-4 w-4" />
          Add Button
        </Button>
      </div>
      <div className="space-y-3">
        {value.map((entry, index) => (
          <div key={entry.id} className="rounded-lg border border-border p-3">
            <div className="grid gap-3 lg:grid-cols-[1fr_1fr_180px_auto]">
              <Input value={entry.label} onChange={(event) => onChange(value.map((button) => (button.id === entry.id ? { ...button, label: event.target.value } : button)))} placeholder="Button label" />
              <Input value={entry.href} onChange={(event) => onChange(value.map((button) => (button.id === entry.id ? { ...button, href: event.target.value } : button)))} placeholder="/contact or https://..." />
              <Select value={entry.variant} onValueChange={(variant) => onChange(value.map((button) => (button.id === entry.id ? { ...button, variant: variant as CmsButton["variant"] } : button)))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="primary">Primary</SelectItem>
                  <SelectItem value="secondary">Secondary</SelectItem>
                  <SelectItem value="outline">Outline</SelectItem>
                  <SelectItem value="ghost">Ghost</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex gap-2">
                <Button type="button" variant="outline" size="icon" onClick={() => onChange(moveItem(value, index, -1))}>
                  <ArrowUp className="h-4 w-4" />
                </Button>
                <Button type="button" variant="outline" size="icon" onClick={() => onChange(moveItem(value, index, 1))}>
                  <ArrowDown className="h-4 w-4" />
                </Button>
                <Button type="button" variant="outline" size="icon" onClick={() => onChange([...value, { ...cloneCmsValue(entry), id: createCmsId("button") }])}>
                  <Copy className="h-4 w-4" />
                </Button>
                <Button type="button" variant="destructive" size="icon" onClick={() => onChange(value.filter((button) => button.id !== entry.id))}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ItemsEditor({ value, onChange }: { value: CmsItem[]; onChange: (next: CmsItem[]) => void }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <FieldLabel>Items</FieldLabel>
        <Button type="button" variant="outline" size="sm" onClick={() => onChange([...value, createEmptyItem()])}>
          <Plus className="mr-2 h-4 w-4" />
          Add Item
        </Button>
      </div>
      <div className="space-y-4">
        {value.map((entry, index) => (
          <div key={entry.id} className="space-y-3 rounded-lg border border-border p-4">
            <div className="flex items-center justify-between gap-2">
              <Badge variant="secondary">Item {index + 1}</Badge>
              <div className="flex gap-2">
                <Button type="button" variant="outline" size="icon" onClick={() => onChange(moveItem(value, index, -1))}>
                  <ArrowUp className="h-4 w-4" />
                </Button>
                <Button type="button" variant="outline" size="icon" onClick={() => onChange(moveItem(value, index, 1))}>
                  <ArrowDown className="h-4 w-4" />
                </Button>
                <Button type="button" variant="outline" size="icon" onClick={() => onChange([...value, { ...cloneCmsValue(entry), id: createCmsId("item") }])}>
                  <Copy className="h-4 w-4" />
                </Button>
                <Button type="button" variant="destructive" size="icon" onClick={() => onChange(value.filter((itemValue) => itemValue.id !== entry.id))}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="grid gap-3 lg:grid-cols-2">
              <Input value={entry.title} onChange={(event) => onChange(value.map((itemValue) => (itemValue.id === entry.id ? { ...itemValue, title: event.target.value } : itemValue)))} placeholder="Title" />
              <Input value={entry.subtitle ?? ""} onChange={(event) => onChange(value.map((itemValue) => (itemValue.id === entry.id ? { ...itemValue, subtitle: event.target.value } : itemValue)))} placeholder="Subtitle" />
            </div>
            <Textarea value={entry.description ?? ""} onChange={(event) => onChange(value.map((itemValue) => (itemValue.id === entry.id ? { ...itemValue, description: event.target.value } : itemValue)))} placeholder="Description" rows={3} />
            <div className="grid gap-3 lg:grid-cols-4">
              <Input value={entry.value ?? ""} onChange={(event) => onChange(value.map((itemValue) => (itemValue.id === entry.id ? { ...itemValue, value: event.target.value } : itemValue)))} placeholder="Value / stat" />
              <Input value={entry.href ?? ""} onChange={(event) => onChange(value.map((itemValue) => (itemValue.id === entry.id ? { ...itemValue, href: event.target.value } : itemValue)))} placeholder="Link" />
              <Input value={entry.badge ?? ""} onChange={(event) => onChange(value.map((itemValue) => (itemValue.id === entry.id ? { ...itemValue, badge: event.target.value } : itemValue)))} placeholder="Badge" />
              <Select value={entry.icon ?? "sparkles"} onValueChange={(icon) => onChange(value.map((itemValue) => (itemValue.id === entry.id ? { ...itemValue, icon: icon as CmsItem["icon"] } : itemValue)))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {cmsIconOptions.map((icon) => (
                    <SelectItem key={icon} value={icon}>
                      {icon}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <ImageFields label="Item Image" value={entry.image} onChange={(next) => onChange(value.map((itemValue) => (itemValue.id === entry.id ? { ...itemValue, image: next } : itemValue)))} />
            <div className="grid gap-3 lg:grid-cols-2">
              <Textarea
                value={(entry.bullets ?? []).join("\n")}
                onChange={(event) => onChange(value.map((itemValue) => (itemValue.id === entry.id ? { ...itemValue, bullets: event.target.value.split("\n").map((line) => line.trim()).filter(Boolean) } : itemValue)))}
                rows={3}
                placeholder="Bullets, one per line"
              />
              <Textarea
                value={(entry.metadata ?? []).join("\n")}
                onChange={(event) => onChange(value.map((itemValue) => (itemValue.id === entry.id ? { ...itemValue, metadata: event.target.value.split("\n").map((line) => line.trim()).filter(Boolean) } : itemValue)))}
                rows={3}
                placeholder="Metadata tags, one per line"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionsEditor({ value, onChange }: { value: CmsSection[]; onChange: (next: CmsSection[]) => void }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <FieldLabel>Page Sections</FieldLabel>
        <Button type="button" variant="outline" size="sm" onClick={() => onChange([...value, createEmptySection("richText")])}>
          <Plus className="mr-2 h-4 w-4" />
          Add Section
        </Button>
      </div>
      <Accordion type="multiple" className="space-y-4">
        {value.map((sectionValue, index) => (
          <AccordionItem key={sectionValue.id} value={sectionValue.id} className="overflow-hidden rounded-2xl border border-border bg-card/50 px-0">
            <AccordionTrigger className="px-4 py-4 hover:no-underline">
              <div className="flex min-w-0 flex-1 items-center gap-3 text-left">
                <Badge variant="secondary">{sectionValue.type}</Badge>
                <div className="min-w-0">
                  <p className="truncate font-semibold text-foreground">{sectionValue.name}</p>
                  <p className="truncate text-sm text-muted-foreground">{sectionValue.title || "Untitled section"}</p>
                </div>
                <div className="ml-auto flex items-center gap-2 pr-2">
                  <StatusDot status={sectionValue.isVisible ? "published" : "draft"} />
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    {sectionValue.isVisible ? "Visible" : "Hidden"}
                  </span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-5">
              <div className="space-y-4 border-t border-border pt-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 rounded-lg border px-3 py-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Visible</span>
                    <Switch checked={sectionValue.isVisible} onCheckedChange={(checked) => onChange(value.map((entry) => (entry.id === sectionValue.id ? { ...entry, isVisible: checked } : entry)))} />
                  </div>
                  <div className="flex items-center gap-2">
                    <Button type="button" variant="outline" size="icon" onClick={() => onChange(moveItem(value, index, -1))}>
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <Button type="button" variant="outline" size="icon" onClick={() => onChange(moveItem(value, index, 1))}>
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                    <Button type="button" variant="outline" size="icon" onClick={() => onChange([...value, { ...cloneCmsValue(sectionValue), id: createCmsId("section"), name: `${sectionValue.name} Copy` }])}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button type="button" variant="destructive" size="icon" onClick={() => onChange(value.filter((entry) => entry.id !== sectionValue.id))}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid gap-3 lg:grid-cols-4">
                  <Input value={sectionValue.name} onChange={(event) => onChange(value.map((entry) => (entry.id === sectionValue.id ? { ...entry, name: event.target.value } : entry)))} placeholder="Section name" />
                  <Select value={sectionValue.type} onValueChange={(nextType) => onChange(value.map((entry) => (entry.id === sectionValue.id ? { ...entry, type: nextType as CmsSection["type"] } : entry)))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {sectionTypes.map((entryType) => (
                        <SelectItem key={entryType} value={entryType}>
                          {entryType}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={sectionValue.theme} onValueChange={(theme) => onChange(value.map((entry) => (entry.id === sectionValue.id ? { ...entry, theme: theme as CmsSection["theme"] } : entry)))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {sectionThemes.map((theme) => (
                        <SelectItem key={theme} value={theme}>
                          {theme}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={sectionValue.dataSource} onValueChange={(source) => onChange(value.map((entry) => (entry.id === sectionValue.id ? { ...entry, dataSource: source as CmsSection["dataSource"] } : entry)))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {dataSources.map((source) => (
                        <SelectItem key={source} value={source}>
                          {source}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Input value={sectionValue.eyebrow ?? ""} onChange={(event) => onChange(value.map((entry) => (entry.id === sectionValue.id ? { ...entry, eyebrow: event.target.value } : entry)))} placeholder="Eyebrow" />
                <div className="grid gap-3 lg:grid-cols-2">
                  <Input value={sectionValue.title} onChange={(event) => onChange(value.map((entry) => (entry.id === sectionValue.id ? { ...entry, title: event.target.value } : entry)))} placeholder="Section title" />
                  <Input value={sectionValue.subtitle ?? ""} onChange={(event) => onChange(value.map((entry) => (entry.id === sectionValue.id ? { ...entry, subtitle: event.target.value } : entry)))} placeholder="Section subtitle" />
                </div>
                <Textarea value={sectionValue.body ?? ""} onChange={(event) => onChange(value.map((entry) => (entry.id === sectionValue.id ? { ...entry, body: event.target.value } : entry)))} placeholder="Section body" rows={4} />
                <div className="grid gap-3 lg:grid-cols-2">
                  <Select value={String(sectionValue.columns ?? 3)} onValueChange={(columns) => onChange(value.map((entry) => (entry.id === sectionValue.id ? { ...entry, columns: Number(columns) as CmsSection["columns"] } : entry)))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 column</SelectItem>
                      <SelectItem value="2">2 columns</SelectItem>
                      <SelectItem value="3">3 columns</SelectItem>
                      <SelectItem value="4">4 columns</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={sectionValue.style ?? "grid"} onValueChange={(style) => onChange(value.map((entry) => (entry.id === sectionValue.id ? { ...entry, style: style as CmsSection["style"] } : entry)))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="grid">Grid</SelectItem>
                      <SelectItem value="band">Band</SelectItem>
                      <SelectItem value="split">Split</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <ImageFields label="Section Image" value={sectionValue.image} onChange={(next) => onChange(value.map((entry) => (entry.id === sectionValue.id ? { ...entry, image: next } : entry)))} />
                <ButtonsEditor value={sectionValue.buttons} onChange={(next) => onChange(value.map((entry) => (entry.id === sectionValue.id ? { ...entry, buttons: next } : entry)))} />
                {sectionValue.dataSource === "manual" ? (
                  <ItemsEditor value={sectionValue.items} onChange={(next) => onChange(value.map((entry) => (entry.id === sectionValue.id ? { ...entry, items: next } : entry)))} />
                ) : (
                  <div className="rounded-lg border border-dashed border-border p-4 text-sm text-muted-foreground">
                    This section pulls from the <strong>{sectionValue.dataSource}</strong> collection. Add items there instead of hardcoding them into the page.
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

function SeoEditor({ value, onChange }: { value: CmsPage["seo"]; onChange: (next: CmsPage["seo"]) => void }) {
  return (
    <div className="space-y-3">
      <FieldLabel>SEO</FieldLabel>
      <div className="grid gap-3 lg:grid-cols-2">
        <Input value={value.metaTitle} onChange={(event) => onChange({ ...value, metaTitle: event.target.value })} placeholder="Meta title" />
        <Input value={value.canonicalUrl ?? ""} onChange={(event) => onChange({ ...value, canonicalUrl: event.target.value })} placeholder="Canonical URL" />
      </div>
      <Textarea value={value.metaDescription} onChange={(event) => onChange({ ...value, metaDescription: event.target.value })} placeholder="Meta description" rows={3} />
      <Input value={(value.keywords ?? []).join(", ")} onChange={(event) => onChange({ ...value, keywords: event.target.value.split(",").map((entry) => entry.trim()).filter(Boolean) })} placeholder="Keywords, comma separated" />
      <ImageFields label="OG Image" value={value.ogImage} onChange={(next) => onChange({ ...value, ogImage: next })} />
    </div>
  );
}

function DocumentCard({
  title,
  children,
  badge,
  onSave,
  onDelete,
}: {
  title: string;
  children: React.ReactNode;
  badge?: string;
  onSave: () => Promise<unknown>;
  onDelete?: () => Promise<unknown>;
}) {
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div>
          <CardTitle className="text-lg">{title}</CardTitle>
          {badge && <Badge className="mt-2">{badge}</Badge>}
        </div>
        <div className="flex gap-2">
          {onDelete && (
            <Button
              type="button"
              variant="destructive"
              size="sm"
              disabled={deleting}
              onClick={async () => {
                try {
                  setDeleting(true);
                  await onDelete();
                  toast.success("Deleted");
                } catch (error) {
                  toast.error(error instanceof Error ? error.message : "Delete failed");
                } finally {
                  setDeleting(false);
                }
              }}
            >
              {deleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 className="mr-2 h-4 w-4" />}
              Delete
            </Button>
          )}
          <Button
            type="button"
            size="sm"
            disabled={saving}
            onClick={async () => {
              try {
                setSaving(true);
                await onSave();
                toast.success("Saved");
              } catch (error) {
                toast.error(error instanceof Error ? error.message : "Save failed");
              } finally {
                setSaving(false);
              }
            }}
          >
            {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Save
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">{children}</CardContent>
    </Card>
  );
}

function PageEditorCard({ value, onSave, onDelete }: { value: CmsPage; onSave: (page: CmsPage) => Promise<unknown>; onDelete?: () => Promise<unknown> }) {
  const [draft, setDraft] = useState(value);
  useEffect(() => setDraft(value), [value]);

  return (
    <DocumentCard title={draft.title} badge={draft.status} onSave={() => onSave(draft)} onDelete={onDelete}>
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="h-auto flex-wrap justify-start gap-2 rounded-2xl bg-muted/70 p-2">
          <TabsTrigger value="overview" className="rounded-xl px-4 py-2">Overview</TabsTrigger>
          <TabsTrigger value="sections" className="rounded-xl px-4 py-2">Sections</TabsTrigger>
          <TabsTrigger value="seo" className="rounded-xl px-4 py-2">SEO</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-5">
          <WorkspacePanel title="Page Setup" description="Manage the page identity, URL, navigation label, and publishing controls.">
            <div className="grid gap-3 lg:grid-cols-3">
              <Input value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} placeholder="Page title" />
              <Input value={draft.navigationLabel} onChange={(event) => setDraft({ ...draft, navigationLabel: event.target.value })} placeholder="Navigation label" />
              <Input value={draft.slug} onChange={(event) => setDraft({ ...draft, slug: event.target.value, seo: { ...draft.seo, slug: event.target.value } })} placeholder="Slug" />
            </div>
            <div className="grid gap-3 lg:grid-cols-4">
              <Select value={draft.pageType} onValueChange={(pageType) => setDraft({ ...draft, pageType: pageType as CmsPage["pageType"] })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="home">home</SelectItem>
                  <SelectItem value="about">about</SelectItem>
                  <SelectItem value="services">services</SelectItem>
                  <SelectItem value="contact">contact</SelectItem>
                  <SelectItem value="faq">faq</SelectItem>
                  <SelectItem value="blog">blog</SelectItem>
                  <SelectItem value="legal">legal</SelectItem>
                  <SelectItem value="standard">standard</SelectItem>
                </SelectContent>
              </Select>
              <Select value={draft.status} onValueChange={(status) => setDraft({ ...draft, status: status as CmsPage["status"] })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <StatusSelectItems />
                </SelectContent>
              </Select>
              <Input type="number" value={draft.sortOrder} onChange={(event) => setDraft({ ...draft, sortOrder: Number(event.target.value) || 0 })} placeholder="Sort order" />
              <div className="flex items-center justify-between rounded-lg border px-3">
                <span className="text-sm font-medium">Show in navigation</span>
                <Switch checked={draft.showInNavigation} onCheckedChange={(checked) => setDraft({ ...draft, showInNavigation: checked })} />
              </div>
            </div>
          </WorkspacePanel>

          <WorkspacePanel title="Page Summary" description="This summary helps the CMS team quickly understand what appears on this page.">
            <Textarea value={draft.excerpt} onChange={(event) => setDraft({ ...draft, excerpt: event.target.value })} placeholder="Page excerpt" rows={4} />
          </WorkspacePanel>
        </TabsContent>

        <TabsContent value="sections" className="space-y-5">
          <WorkspacePanel title="Section Management" description="Organize hero, content, testimonials, FAQs, CTAs, and other page sections in a cleaner accordion workspace.">
            <SectionsEditor value={draft.sections} onChange={(next) => setDraft({ ...draft, sections: next })} />
          </WorkspacePanel>
        </TabsContent>

        <TabsContent value="seo" className="space-y-5">
          <WorkspacePanel title="SEO Settings" description="Manage metadata, canonical URL, keywords, and social preview images for this page.">
            <SeoEditor value={draft.seo} onChange={(next) => setDraft({ ...draft, seo: next })} />
          </WorkspacePanel>
        </TabsContent>
      </Tabs>
    </DocumentCard>
  );
}

function ServiceEditorCard({ value, onSave, onDelete }: { value: CmsService; onSave: (service: CmsService) => Promise<unknown>; onDelete?: () => Promise<unknown> }) {
  const [draft, setDraft] = useState(value);
  useEffect(() => setDraft(value), [value]);

  return (
    <DocumentCard title={draft.title} badge={draft.status} onSave={() => onSave(draft)} onDelete={onDelete}>
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="h-auto flex-wrap justify-start gap-2 rounded-2xl bg-muted/70 p-2">
          <TabsTrigger value="overview" className="rounded-xl px-4 py-2">Overview</TabsTrigger>
          <TabsTrigger value="content" className="rounded-xl px-4 py-2">Content</TabsTrigger>
          <TabsTrigger value="seo" className="rounded-xl px-4 py-2">SEO</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-5">
          <WorkspacePanel title="Service Identity" description="Set the name, slug, category, icon, and publication state for this service page.">
            <div className="grid gap-3 lg:grid-cols-4">
              <Input value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} placeholder="Service title" />
              <Input value={draft.shortTitle} onChange={(event) => setDraft({ ...draft, shortTitle: event.target.value })} placeholder="Short title" />
              <Input value={draft.slug} onChange={(event) => setDraft({ ...draft, slug: event.target.value, seo: { ...draft.seo, slug: event.target.value } })} placeholder="Slug" />
              <Input value={draft.categoryLabel} onChange={(event) => setDraft({ ...draft, categoryLabel: event.target.value })} placeholder="Category label" />
            </div>
            <div className="grid gap-3 lg:grid-cols-4">
              <Select value={draft.status} onValueChange={(status) => setDraft({ ...draft, status: status as CmsService["status"] })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <StatusSelectItems />
                </SelectContent>
              </Select>
              <Input type="number" value={draft.sortOrder} onChange={(event) => setDraft({ ...draft, sortOrder: Number(event.target.value) || 0 })} placeholder="Sort order" />
              <Select value={draft.icon} onValueChange={(icon) => setDraft({ ...draft, icon: icon as CmsService["icon"] })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {cmsIconOptions.map((icon) => (
                    <SelectItem key={icon} value={icon}>
                      {icon}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input value={draft.categoryLabel} onChange={(event) => setDraft({ ...draft, categoryLabel: event.target.value })} placeholder="Category" />
            </div>
          </WorkspacePanel>

          <WorkspacePanel title="Visibility & Highlights" description="Control where this service appears across the public website.">
            <div className="grid gap-3 lg:grid-cols-2">
              <div className="flex items-center justify-between rounded-lg border px-3 py-2">
                <span className="text-sm font-medium">Featured on homepage</span>
                <Switch checked={draft.featuredOnHome} onCheckedChange={(checked) => setDraft({ ...draft, featuredOnHome: checked })} />
              </div>
              <div className="flex items-center justify-between rounded-lg border px-3 py-2">
                <span className="text-sm font-medium">Show in navigation</span>
                <Switch checked={draft.featuredInNavigation} onCheckedChange={(checked) => setDraft({ ...draft, featuredInNavigation: checked })} />
              </div>
            </div>
          </WorkspacePanel>

          <WorkspacePanel title="Summary & Preview" description="Control the public service preview card and the lead summary content for this service dashboard.">
            <Textarea value={draft.excerpt} onChange={(event) => setDraft({ ...draft, excerpt: event.target.value })} placeholder="Service excerpt" rows={3} />
            <Textarea value={draft.summary} onChange={(event) => setDraft({ ...draft, summary: event.target.value })} placeholder="Service summary" rows={4} />
            <ImageFields label="Preview Image" value={draft.previewImage} onChange={(next) => setDraft({ ...draft, previewImage: next })} />
          </WorkspacePanel>
        </TabsContent>

        <TabsContent value="content" className="space-y-5">
          <WorkspacePanel title="Service Sections" description="Manage hero, benefits, FAQs, CTA blocks, doctors, testimonials, and other service content sections.">
            <SectionsEditor value={draft.sections} onChange={(next) => setDraft({ ...draft, sections: next })} />
          </WorkspacePanel>
        </TabsContent>

        <TabsContent value="seo" className="space-y-5">
          <WorkspacePanel title="SEO Settings" description="Manage service metadata, keywords, canonical URL, and social share previews.">
            <SeoEditor value={draft.seo} onChange={(next) => setDraft({ ...draft, seo: next })} />
          </WorkspacePanel>
        </TabsContent>
      </Tabs>
    </DocumentCard>
  );
}

function BlogEditorCard({ value, onSave, onDelete }: { value: CmsBlogPost; onSave: (post: CmsBlogPost) => Promise<unknown>; onDelete?: () => Promise<unknown> }) {
  const [draft, setDraft] = useState(value);
  useEffect(() => setDraft(value), [value]);

  return (
    <DocumentCard title={draft.title} badge={draft.status} onSave={() => onSave(draft)} onDelete={onDelete}>
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="h-auto flex-wrap justify-start gap-2 rounded-2xl bg-muted/70 p-2">
          <TabsTrigger value="overview" className="rounded-xl px-4 py-2">Overview</TabsTrigger>
          <TabsTrigger value="content" className="rounded-xl px-4 py-2">Content</TabsTrigger>
          <TabsTrigger value="seo" className="rounded-xl px-4 py-2">SEO</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-5">
          <WorkspacePanel title="Post Details" description="Manage the post title, slug, category, author, and publishing schedule.">
            <div className="grid gap-3 lg:grid-cols-4">
              <Input value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} placeholder="Post title" />
              <Input value={draft.slug} onChange={(event) => setDraft({ ...draft, slug: event.target.value, seo: { ...draft.seo, slug: event.target.value } })} placeholder="Slug" />
              <Input value={draft.category} onChange={(event) => setDraft({ ...draft, category: event.target.value })} placeholder="Category" />
              <Input value={draft.authorName} onChange={(event) => setDraft({ ...draft, authorName: event.target.value })} placeholder="Author name" />
            </div>
            <div className="grid gap-3 lg:grid-cols-3">
              <Select value={draft.status} onValueChange={(status) => setDraft({ ...draft, status: status as CmsBlogPost["status"] })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <StatusSelectItems />
                </SelectContent>
              </Select>
              <Input type="number" value={draft.sortOrder} onChange={(event) => setDraft({ ...draft, sortOrder: Number(event.target.value) || 0 })} placeholder="Sort order" />
              <Input type="date" value={draft.publishedAt.slice(0, 10)} onChange={(event) => setDraft({ ...draft, publishedAt: event.target.value })} />
            </div>
          </WorkspacePanel>
        </TabsContent>

        <TabsContent value="content" className="space-y-5">
          <WorkspacePanel title="Editorial Content" description="Manage the post summary, cover image, and content sections.">
            <Textarea value={draft.excerpt} onChange={(event) => setDraft({ ...draft, excerpt: event.target.value })} placeholder="Post excerpt" rows={3} />
            <ImageFields label="Cover Image" value={draft.coverImage} onChange={(next) => setDraft({ ...draft, coverImage: next })} />
            <SectionsEditor value={draft.sections} onChange={(next) => setDraft({ ...draft, sections: next })} />
          </WorkspacePanel>
        </TabsContent>

        <TabsContent value="seo" className="space-y-5">
          <WorkspacePanel title="SEO Settings" description="Manage search metadata and social preview assets for this blog post.">
            <SeoEditor value={draft.seo} onChange={(next) => setDraft({ ...draft, seo: next })} />
          </WorkspacePanel>
        </TabsContent>
      </Tabs>
    </DocumentCard>
  );
}

function LegalEditorCard({ value, onSave, onDelete }: { value: CmsLegalDocument; onSave: (document: CmsLegalDocument) => Promise<unknown>; onDelete?: () => Promise<unknown> }) {
  const [draft, setDraft] = useState(value);
  useEffect(() => setDraft(value), [value]);

  return (
    <DocumentCard title={draft.title} badge={draft.status} onSave={() => onSave(draft)} onDelete={onDelete}>
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="h-auto flex-wrap justify-start gap-2 rounded-2xl bg-muted/70 p-2">
          <TabsTrigger value="overview" className="rounded-xl px-4 py-2">Overview</TabsTrigger>
          <TabsTrigger value="content" className="rounded-xl px-4 py-2">Content</TabsTrigger>
          <TabsTrigger value="seo" className="rounded-xl px-4 py-2">SEO</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-5">
          <WorkspacePanel title="Policy Setup" description="Manage the title, slug, order, and publication status for this legal page.">
            <div className="grid gap-3 lg:grid-cols-4">
              <Input value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} placeholder="Title" />
              <Input value={draft.slug} onChange={(event) => setDraft({ ...draft, slug: event.target.value, seo: { ...draft.seo, slug: event.target.value } })} placeholder="Slug" />
              <Select value={draft.status} onValueChange={(status) => setDraft({ ...draft, status: status as CmsLegalDocument["status"] })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <StatusSelectItems />
                </SelectContent>
              </Select>
              <Input type="number" value={draft.sortOrder} onChange={(event) => setDraft({ ...draft, sortOrder: Number(event.target.value) || 0 })} placeholder="Sort order" />
            </div>
            <Textarea value={draft.summary} onChange={(event) => setDraft({ ...draft, summary: event.target.value })} placeholder="Summary" rows={3} />
          </WorkspacePanel>
        </TabsContent>

        <TabsContent value="content" className="space-y-5">
          <WorkspacePanel title="Policy Content" description="Manage the content sections for this policy or legal page.">
            <SectionsEditor value={draft.sections} onChange={(next) => setDraft({ ...draft, sections: next })} />
          </WorkspacePanel>
        </TabsContent>

        <TabsContent value="seo" className="space-y-5">
          <WorkspacePanel title="SEO Settings" description="Manage metadata and social sharing settings for this policy page.">
            <SeoEditor value={draft.seo} onChange={(next) => setDraft({ ...draft, seo: next })} />
          </WorkspacePanel>
        </TabsContent>
      </Tabs>
    </DocumentCard>
  );
}

function FaqEditorCard({ value, onSave, onDelete }: { value: CmsFaq; onSave: (faq: CmsFaq) => Promise<unknown>; onDelete?: () => Promise<unknown> }) {
  const [draft, setDraft] = useState(value);
  useEffect(() => setDraft(value), [value]);

  return (
    <DocumentCard title={draft.question} badge={draft.status} onSave={() => onSave(draft)} onDelete={onDelete}>
      <div className="grid gap-3 lg:grid-cols-4">
        <Input value={draft.question} onChange={(event) => setDraft({ ...draft, question: event.target.value })} placeholder="Question" />
        <Input value={draft.category} onChange={(event) => setDraft({ ...draft, category: event.target.value })} placeholder="Category" />
        <Input value={draft.pageSlug ?? ""} onChange={(event) => setDraft({ ...draft, pageSlug: event.target.value || undefined })} placeholder="Page slug (optional)" />
        <Input value={draft.serviceSlug ?? ""} onChange={(event) => setDraft({ ...draft, serviceSlug: event.target.value || undefined })} placeholder="Service slug (optional)" />
      </div>
      <div className="grid gap-3 lg:grid-cols-2">
        <Select value={draft.status} onValueChange={(status) => setDraft({ ...draft, status: status as CmsFaq["status"] })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <StatusSelectItems />
          </SelectContent>
        </Select>
        <Input type="number" value={draft.sortOrder} onChange={(event) => setDraft({ ...draft, sortOrder: Number(event.target.value) || 0 })} placeholder="Sort order" />
      </div>
      <Textarea value={draft.answer} onChange={(event) => setDraft({ ...draft, answer: event.target.value })} placeholder="Answer" rows={5} />
    </DocumentCard>
  );
}

function TestimonialEditorCard({ value, onSave, onDelete }: { value: CmsTestimonial; onSave: (testimonial: CmsTestimonial) => Promise<unknown>; onDelete?: () => Promise<unknown> }) {
  const [draft, setDraft] = useState(value);
  useEffect(() => setDraft(value), [value]);

  return (
    <DocumentCard title={draft.name} badge={draft.status} onSave={() => onSave(draft)} onDelete={onDelete}>
      <div className="grid gap-3 lg:grid-cols-4">
        <Input value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} placeholder="Name" />
        <Input value={draft.role} onChange={(event) => setDraft({ ...draft, role: event.target.value })} placeholder="Role" />
        <Input value={draft.pageSlug ?? ""} onChange={(event) => setDraft({ ...draft, pageSlug: event.target.value || undefined })} placeholder="Page slug (optional)" />
        <Input value={draft.serviceSlug ?? ""} onChange={(event) => setDraft({ ...draft, serviceSlug: event.target.value || undefined })} placeholder="Service slug (optional)" />
      </div>
      <div className="grid gap-3 lg:grid-cols-2">
        <Select value={draft.status} onValueChange={(status) => setDraft({ ...draft, status: status as CmsTestimonial["status"] })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <StatusSelectItems />
          </SelectContent>
        </Select>
        <Input type="number" value={draft.sortOrder} onChange={(event) => setDraft({ ...draft, sortOrder: Number(event.target.value) || 0 })} placeholder="Sort order" />
      </div>
      <Input type="number" max={5} min={1} value={draft.rating} onChange={(event) => setDraft({ ...draft, rating: Number(event.target.value) || 5 })} placeholder="Rating" />
      <Textarea value={draft.quote} onChange={(event) => setDraft({ ...draft, quote: event.target.value })} placeholder="Quote" rows={4} />
      <ImageFields label="Portrait Image" value={draft.image} onChange={(next) => setDraft({ ...draft, image: next })} />
    </DocumentCard>
  );
}

function TeamEditorCard({ value, onSave, onDelete }: { value: CmsTeamMember; onSave: (member: CmsTeamMember) => Promise<unknown>; onDelete?: () => Promise<unknown> }) {
  const [draft, setDraft] = useState(value);
  useEffect(() => setDraft(value), [value]);

  return (
    <DocumentCard title={draft.name} badge={draft.status} onSave={() => onSave(draft)} onDelete={onDelete}>
      <div className="grid gap-3 lg:grid-cols-4">
        <Input value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} placeholder="Name" />
        <Input value={draft.role} onChange={(event) => setDraft({ ...draft, role: event.target.value })} placeholder="Role" />
        <Input value={draft.specialty ?? ""} onChange={(event) => setDraft({ ...draft, specialty: event.target.value })} placeholder="Specialty" />
        <Input value={draft.serviceSlug ?? ""} onChange={(event) => setDraft({ ...draft, serviceSlug: event.target.value || undefined })} placeholder="Service slug (optional)" />
      </div>
      <div className="grid gap-3 lg:grid-cols-4">
        <Input value={draft.email ?? ""} onChange={(event) => setDraft({ ...draft, email: event.target.value })} placeholder="Email" />
        <Input value={draft.phone ?? ""} onChange={(event) => setDraft({ ...draft, phone: event.target.value })} placeholder="Phone" />
        <Select value={draft.status} onValueChange={(status) => setDraft({ ...draft, status: status as CmsTeamMember["status"] })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <StatusSelectItems />
          </SelectContent>
        </Select>
        <Input type="number" value={draft.sortOrder} onChange={(event) => setDraft({ ...draft, sortOrder: Number(event.target.value) || 0 })} placeholder="Sort order" />
      </div>
      <Textarea value={draft.bio} onChange={(event) => setDraft({ ...draft, bio: event.target.value })} placeholder="Bio" rows={4} />
      <ImageFields label="Portrait Image" value={draft.image} onChange={(next) => setDraft({ ...draft, image: next })} />
    </DocumentCard>
  );
}

async function uploadToCloudinary(file: File) {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error("Cloudinary env vars are missing. Set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET.");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Cloudinary upload failed.");
  }

  return response.json();
}

function MediaEditorCard({ value, onSave, onDelete }: { value: CmsMediaAsset; onSave: (asset: CmsMediaAsset) => Promise<unknown>; onDelete?: () => Promise<unknown> }) {
  const [draft, setDraft] = useState(value);
  const [uploading, setUploading] = useState(false);
  useEffect(() => setDraft(value), [value]);

  return (
    <DocumentCard title={draft.name} badge={draft.status} onSave={() => onSave(draft)} onDelete={onDelete}>
      <div className="grid gap-3 lg:grid-cols-4">
        <Input value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} placeholder="Asset name" />
        <Input value={draft.alt} onChange={(event) => setDraft({ ...draft, alt: event.target.value })} placeholder="Alt text" />
        <Select value={draft.type} onValueChange={(type) => setDraft({ ...draft, type: type as CmsMediaAsset["type"] })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="image">image</SelectItem>
            <SelectItem value="video">video</SelectItem>
            <SelectItem value="file">file</SelectItem>
          </SelectContent>
        </Select>
        <Input type="number" value={draft.sortOrder} onChange={(event) => setDraft({ ...draft, sortOrder: Number(event.target.value) || 0 })} placeholder="Sort order" />
      </div>
      <div className="grid gap-3 lg:grid-cols-3">
        <Input value={draft.url} onChange={(event) => setDraft({ ...draft, url: event.target.value })} placeholder="Asset URL" />
        <Input value={draft.folder ?? ""} onChange={(event) => setDraft({ ...draft, folder: event.target.value })} placeholder="Folder" />
        <Input value={draft.cloudinaryPublicId ?? ""} onChange={(event) => setDraft({ ...draft, cloudinaryPublicId: event.target.value })} placeholder="Cloudinary public ID" />
      </div>
      <Input value={draft.tags.join(", ")} onChange={(event) => setDraft({ ...draft, tags: event.target.value.split(",").map((entry) => entry.trim()).filter(Boolean) })} placeholder="Tags, comma separated" />
      <div className="flex flex-wrap items-center gap-3">
        <Label className="inline-flex cursor-pointer items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium">
          <ImagePlus className="h-4 w-4" />
          Upload to Cloudinary
          <input
            type="file"
            className="hidden"
            accept="image/*,video/*,application/pdf"
            onChange={async (event) => {
              const file = event.target.files?.[0];
              if (!file) return;
              try {
                setUploading(true);
                const uploaded = await uploadToCloudinary(file);
                setDraft((current) => ({
                  ...current,
                  url: uploaded.secure_url,
                  cloudinaryPublicId: uploaded.public_id,
                  width: uploaded.width,
                  height: uploaded.height,
                  type: uploaded.resource_type === "video" ? "video" : "image",
                }));
                toast.success("Uploaded to Cloudinary");
              } catch (error) {
                toast.error(error instanceof Error ? error.message : "Upload failed");
              } finally {
                setUploading(false);
                event.target.value = "";
              }
            }}
          />
        </Label>
        {uploading && <span className="text-sm text-muted-foreground">Uploading...</span>}
      </div>
      {draft.url && <img src={draft.url} alt={draft.alt || draft.name} className="max-h-56 rounded-lg border object-contain" />}
    </DocumentCard>
  );
}

function AnnouncementEditorCard({ value, onSave, onDelete }: { value: CmsAnnouncement; onSave: (announcement: CmsAnnouncement) => Promise<unknown>; onDelete?: () => Promise<unknown> }) {
  const [draft, setDraft] = useState(value);
  useEffect(() => setDraft(value), [value]);

  return (
    <DocumentCard title={draft.title} badge={draft.status} onSave={() => onSave(draft)} onDelete={onDelete}>
      <div className="grid gap-3 lg:grid-cols-4">
        <Input value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} placeholder="Title" />
        <Input value={draft.href ?? ""} onChange={(event) => setDraft({ ...draft, href: event.target.value })} placeholder="Link" />
        <Input value={draft.buttonLabel ?? ""} onChange={(event) => setDraft({ ...draft, buttonLabel: event.target.value })} placeholder="Button label" />
        <Input type="number" value={draft.sortOrder} onChange={(event) => setDraft({ ...draft, sortOrder: Number(event.target.value) || 0 })} placeholder="Sort order" />
      </div>
      <Select value={draft.status} onValueChange={(status) => setDraft({ ...draft, status: status as CmsAnnouncement["status"] })}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <StatusSelectItems />
        </SelectContent>
      </Select>
      <Textarea value={draft.body} onChange={(event) => setDraft({ ...draft, body: event.target.value })} placeholder="Announcement text" rows={4} />
    </DocumentCard>
  );
}

function NavigationEditor({ value, onChange }: { value: CmsNavigationItem[]; onChange: (next: CmsNavigationItem[]) => void }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <FieldLabel>Navigation Items</FieldLabel>
        <Button type="button" variant="outline" size="sm" onClick={() => onChange([...value, { id: createCmsId("nav"), label: "New Nav Item", href: "/", type: "page" }])}>
          <Plus className="mr-2 h-4 w-4" />
          Add Item
        </Button>
      </div>
      <div className="space-y-3">
        {value.map((entry, index) => (
          <div key={entry.id} className="grid gap-3 rounded-lg border p-3 lg:grid-cols-[1fr_1fr_180px_auto]">
            <Input value={entry.label} onChange={(event) => onChange(value.map((itemValue) => (itemValue.id === entry.id ? { ...itemValue, label: event.target.value } : itemValue)))} placeholder="Label" />
            <Input value={entry.href} onChange={(event) => onChange(value.map((itemValue) => (itemValue.id === entry.id ? { ...itemValue, href: event.target.value } : itemValue)))} placeholder="Href" />
            <Select value={entry.type} onValueChange={(type) => onChange(value.map((itemValue) => (itemValue.id === entry.id ? { ...itemValue, type: type as CmsNavigationItem["type"] } : itemValue)))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="page">page</SelectItem>
                <SelectItem value="external">external</SelectItem>
                <SelectItem value="anchor">anchor</SelectItem>
                <SelectItem value="services-menu">services-menu</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button type="button" variant="outline" size="icon" onClick={() => onChange(moveItem(value, index, -1))}>
                <ArrowUp className="h-4 w-4" />
              </Button>
              <Button type="button" variant="outline" size="icon" onClick={() => onChange(moveItem(value, index, 1))}>
                <ArrowDown className="h-4 w-4" />
              </Button>
              <Button type="button" variant="destructive" size="icon" onClick={() => onChange(value.filter((itemValue) => itemValue.id !== entry.id))}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SocialEditor({ value, onChange }: { value: CmsSocialLink[]; onChange: (next: CmsSocialLink[]) => void }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <FieldLabel>Social Links</FieldLabel>
        <Button type="button" variant="outline" size="sm" onClick={() => onChange([...value, { id: createCmsId("social"), label: "New Social Link", href: "", icon: "globe" }])}>
          <Plus className="mr-2 h-4 w-4" />
          Add Link
        </Button>
      </div>
      {value.map((entry) => (
        <div key={entry.id} className="grid gap-3 rounded-lg border p-3 lg:grid-cols-[1fr_1fr_180px_auto]">
          <Input value={entry.label} onChange={(event) => onChange(value.map((link) => (link.id === entry.id ? { ...link, label: event.target.value } : link)))} placeholder="Label" />
          <Input value={entry.href} onChange={(event) => onChange(value.map((link) => (link.id === entry.id ? { ...link, href: event.target.value } : link)))} placeholder="https://..." />
          <Select value={entry.icon} onValueChange={(icon) => onChange(value.map((link) => (link.id === entry.id ? { ...link, icon: icon as CmsSocialLink["icon"] } : link)))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {cmsIconOptions.map((icon) => (
                <SelectItem key={icon} value={icon}>
                  {icon}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button type="button" variant="destructive" size="icon" onClick={() => onChange(value.filter((link) => link.id !== entry.id))}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}

function SiteSettingsEditor({
  value,
  onSave,
  activePanel,
  onOpenPanel,
}: {
  value: CmsSiteSettings;
  onSave: (settings: CmsSiteSettings) => Promise<unknown>;
  activePanel: CmsSettingsPanelKey;
  onOpenPanel: (panel: CmsSettingsPanelKey) => void;
}) {
  const [draft, setDraft] = useState(value);
  useEffect(() => setDraft(value), [value]);

  return (
    <DocumentCard title="Site Settings" onSave={() => onSave(draft)}>
      <Tabs value={activePanel} onValueChange={(next) => onOpenPanel(next as CmsSettingsPanelKey)} className="space-y-6">
        <TabsList className="h-auto flex-wrap justify-start gap-2 rounded-2xl bg-muted/70 p-2">
          {settingsPanelLabels.map((panel) => (
            <TabsTrigger key={panel.key} value={panel.key} className="rounded-xl px-4 py-2">
              {panel.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="branding" className="space-y-5">
          <WorkspacePanel title="Brand Identity" description="Manage the organization name, tagline, and brand logo used across the website.">
            <div className="grid gap-3 lg:grid-cols-2">
              <Input value={draft.brand.siteName} onChange={(event) => setDraft({ ...draft, brand: { ...draft.brand, siteName: event.target.value } })} placeholder="Site name" />
              <Input value={draft.brand.tagline} onChange={(event) => setDraft({ ...draft, brand: { ...draft.brand, tagline: event.target.value } })} placeholder="Tagline" />
            </div>
            <ImageFields label="Logo" value={draft.brand.logo} onChange={(next) => setDraft({ ...draft, brand: { ...draft.brand, logo: next } })} />
          </WorkspacePanel>
        </TabsContent>

        <TabsContent value="contact" className="space-y-5">
          <WorkspacePanel title="Contact Information" description="Manage the public phone number, email address, location, and support hours.">
            <div className="grid gap-3 lg:grid-cols-3">
              <Input value={draft.contact.phone} onChange={(event) => setDraft({ ...draft, contact: { ...draft.contact, phone: event.target.value } })} placeholder="Phone" />
              <Input value={draft.contact.email} onChange={(event) => setDraft({ ...draft, contact: { ...draft.contact, email: event.target.value } })} placeholder="Email" />
              <Input value={draft.contact.address} onChange={(event) => setDraft({ ...draft, contact: { ...draft.contact, address: event.target.value } })} placeholder="Address" />
            </div>
            <Textarea value={draft.contact.supportHours.join("\n")} onChange={(event) => setDraft({ ...draft, contact: { ...draft.contact, supportHours: event.target.value.split("\n").map((line) => line.trim()).filter(Boolean) } })} rows={3} placeholder="Support hours, one per line" />
          </WorkspacePanel>
        </TabsContent>

        <TabsContent value="navbar" className="space-y-5">
          <WorkspacePanel title="Navbar Navigation" description="Manage the website navbar links and the labels used for the header actions.">
            <NavigationEditor value={draft.navigation.primaryItems} onChange={(next) => setDraft({ ...draft, navigation: { ...draft.navigation, primaryItems: next } })} />
          </WorkspacePanel>
          <WorkspacePanel title="Navbar Labels" description="Control how the header calls-to-action are labeled on the public website.">
            <div className="grid gap-3 lg:grid-cols-2">
              <Input value={draft.publicUi.servicesMenuTitle} onChange={(event) => setDraft({ ...draft, publicUi: { ...draft.publicUi, servicesMenuTitle: event.target.value } })} placeholder="Services menu title" />
              <Input value={draft.publicUi.servicesMenuActionLabel} onChange={(event) => setDraft({ ...draft, publicUi: { ...draft.publicUi, servicesMenuActionLabel: event.target.value } })} placeholder="Services menu action label" />
            </div>
            <div className="grid gap-3 lg:grid-cols-2">
              <Input value={draft.publicUi.portalButtonLabel} onChange={(event) => setDraft({ ...draft, publicUi: { ...draft.publicUi, portalButtonLabel: event.target.value } })} placeholder="Portal button label" />
              <Input value={draft.publicUi.appointmentButtonLabel} onChange={(event) => setDraft({ ...draft, publicUi: { ...draft.publicUi, appointmentButtonLabel: event.target.value } })} placeholder="Appointment button label" />
            </div>
          </WorkspacePanel>
        </TabsContent>

        <TabsContent value="footer" className="space-y-5">
          <WorkspacePanel title="Footer Content" description="Manage the footer summary, highlight cards, and legal links.">
            <ItemsEditor value={draft.footer.highlightItems} onChange={(next) => setDraft({ ...draft, footer: { ...draft.footer, highlightItems: next } })} />
            <NavigationEditor value={draft.footer.legalLinks} onChange={(next) => setDraft({ ...draft, footer: { ...draft.footer, legalLinks: next } })} />
            <Textarea value={draft.footer.summary} onChange={(event) => setDraft({ ...draft, footer: { ...draft.footer, summary: event.target.value } })} rows={3} placeholder="Footer summary" />
          </WorkspacePanel>
          <WorkspacePanel title="Footer Labels" description="Control the footer CTA, contact labels, and patient portal copy.">
            <div className="grid gap-3 lg:grid-cols-2">
              <Input value={draft.publicUi.footerCtaTitle} onChange={(event) => setDraft({ ...draft, publicUi: { ...draft.publicUi, footerCtaTitle: event.target.value } })} placeholder="Footer CTA title" />
              <Input value={draft.publicUi.footerPhoneLabel} onChange={(event) => setDraft({ ...draft, publicUi: { ...draft.publicUi, footerPhoneLabel: event.target.value } })} placeholder="Footer phone label" />
            </div>
            <div className="grid gap-3 lg:grid-cols-2">
              <Input value={draft.publicUi.footerPhoneDescription} onChange={(event) => setDraft({ ...draft, publicUi: { ...draft.publicUi, footerPhoneDescription: event.target.value } })} placeholder="Footer phone description" />
              <Input value={draft.publicUi.footerAppointmentLabel} onChange={(event) => setDraft({ ...draft, publicUi: { ...draft.publicUi, footerAppointmentLabel: event.target.value } })} placeholder="Footer appointment label" />
            </div>
            <div className="grid gap-3 lg:grid-cols-2">
              <Input value={draft.publicUi.footerAppointmentDescription} onChange={(event) => setDraft({ ...draft, publicUi: { ...draft.publicUi, footerAppointmentDescription: event.target.value } })} placeholder="Footer appointment description" />
              <Input value={draft.publicUi.footerPortalTitle} onChange={(event) => setDraft({ ...draft, publicUi: { ...draft.publicUi, footerPortalTitle: event.target.value } })} placeholder="Footer portal title" />
            </div>
            <div className="grid gap-3 lg:grid-cols-2">
              <Input value={draft.publicUi.footerPortalDescription} onChange={(event) => setDraft({ ...draft, publicUi: { ...draft.publicUi, footerPortalDescription: event.target.value } })} placeholder="Footer portal description" />
              <Input value={draft.publicUi.footerPortalLinkLabel} onChange={(event) => setDraft({ ...draft, publicUi: { ...draft.publicUi, footerPortalLinkLabel: event.target.value } })} placeholder="Footer portal link label" />
            </div>
          </WorkspacePanel>
        </TabsContent>

        <TabsContent value="social" className="space-y-5">
          <WorkspacePanel title="Social Links" description="Manage the social links that appear across the website footer and contact areas.">
            <SocialEditor value={draft.socialLinks} onChange={(next) => setDraft({ ...draft, socialLinks: next })} />
          </WorkspacePanel>
        </TabsContent>

        <TabsContent value="theme" className="space-y-5">
          <WorkspacePanel title="Theme Settings" description="Adjust the website brand colors used across the frontend experience.">
            <div className="grid gap-3 lg:grid-cols-3">
              <Input value={draft.theme.primaryColor} onChange={(event) => setDraft({ ...draft, theme: { ...draft.theme, primaryColor: event.target.value } })} placeholder="#13306b" />
              <Input value={draft.theme.accentColor} onChange={(event) => setDraft({ ...draft, theme: { ...draft.theme, accentColor: event.target.value } })} placeholder="#ef2027" />
              <Input value={draft.theme.softColor} onChange={(event) => setDraft({ ...draft, theme: { ...draft.theme, softColor: event.target.value } })} placeholder="#f4f8ff" />
            </div>
            <div className="grid gap-3 lg:grid-cols-3">
              <Input value={draft.theme.backgroundColor} onChange={(event) => setDraft({ ...draft, theme: { ...draft.theme, backgroundColor: event.target.value } })} placeholder="#ffffff" />
              <Input value={draft.theme.textColor} onChange={(event) => setDraft({ ...draft, theme: { ...draft.theme, textColor: event.target.value } })} placeholder="#13306b" />
              <Input value={draft.theme.footerColor} onChange={(event) => setDraft({ ...draft, theme: { ...draft.theme, footerColor: event.target.value } })} placeholder="#10306a" />
            </div>
          </WorkspacePanel>
        </TabsContent>

        <TabsContent value="announcements" className="space-y-5">
          <WorkspacePanel title="Announcement Bar" description="Manage the global announcement bar that appears across the public website.">
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <FieldLabel>Announcement Bar</FieldLabel>
                <Switch checked={draft.announcementBar.isVisible} onCheckedChange={(checked) => setDraft({ ...draft, announcementBar: { ...draft.announcementBar, isVisible: checked } })} />
              </div>
              <div className="mt-3 grid gap-3 lg:grid-cols-3">
                <Input value={draft.announcementBar.text} onChange={(event) => setDraft({ ...draft, announcementBar: { ...draft.announcementBar, text: event.target.value } })} placeholder="Announcement text" />
                <Input value={draft.announcementBar.href ?? ""} onChange={(event) => setDraft({ ...draft, announcementBar: { ...draft.announcementBar, href: event.target.value } })} placeholder="Announcement link" />
                <Input value={draft.announcementBar.buttonLabel ?? ""} onChange={(event) => setDraft({ ...draft, announcementBar: { ...draft.announcementBar, buttonLabel: event.target.value } })} placeholder="Announcement button label" />
              </div>
            </div>
          </WorkspacePanel>
        </TabsContent>

        <TabsContent value="appointments" className="space-y-5">
          <WorkspacePanel title="Appointment Settings" description="Manage the appointment warning text and the available patient workflow options.">
            <Textarea value={draft.appointmentSettings.warningText} onChange={(event) => setDraft({ ...draft, appointmentSettings: { ...draft.appointmentSettings, warningText: event.target.value } })} rows={3} placeholder="Appointment warning text" />
            <div className="grid gap-3 lg:grid-cols-3">
              <Textarea value={draft.appointmentSettings.patientStatuses.join("\n")} onChange={(event) => setDraft({ ...draft, appointmentSettings: { ...draft.appointmentSettings, patientStatuses: event.target.value.split("\n").map((line) => line.trim()).filter(Boolean) } })} rows={3} placeholder="Patient statuses" />
              <Textarea value={draft.appointmentSettings.visitTypes.join("\n")} onChange={(event) => setDraft({ ...draft, appointmentSettings: { ...draft.appointmentSettings, visitTypes: event.target.value.split("\n").map((line) => line.trim()).filter(Boolean) } })} rows={3} placeholder="Visit types" />
              <Textarea value={draft.appointmentSettings.locations.join("\n")} onChange={(event) => setDraft({ ...draft, appointmentSettings: { ...draft.appointmentSettings, locations: event.target.value.split("\n").map((line) => line.trim()).filter(Boolean) } })} rows={3} placeholder="Locations" />
            </div>
          </WorkspacePanel>
        </TabsContent>

        <TabsContent value="seo" className="space-y-5">
          <WorkspacePanel title="Default SEO Settings" description="Manage the fallback metadata used when pages do not override their own SEO settings.">
            <SeoEditor value={draft.defaultSeo} onChange={(next) => setDraft({ ...draft, defaultSeo: next })} />
          </WorkspacePanel>
        </TabsContent>
      </Tabs>
    </DocumentCard>
  );
}

function buildCmsHref(collection: CmsCollectionKey, scope?: CmsScopeKey, key?: string) {
  if (collection === "overview") return "/cms";
  if (collection === "settings") return "/cms/settings";

  const segments = ["/cms", collection];
  if (scope) segments.push(scope);
  if (key) segments.push(encodeURIComponent(key));
  return segments.join("/");
}

function buildSettingsHref(panel?: CmsSettingsPanelKey) {
  return panel ? `/cms/settings/${panel}` : "/cms/settings";
}

function CmsEmptyState({
  title,
  body,
  actionLabel,
  onAction,
}: {
  title: string;
  body: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <Card className="border-dashed">
      <CardContent className="flex min-h-[260px] flex-col items-center justify-center gap-4 p-8 text-center">
        <div className="rounded-full bg-primary/8 p-3 text-primary">
          <LayoutDashboard className="h-6 w-6" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-foreground">{title}</h3>
          <p className="mx-auto max-w-xl text-sm leading-6 text-muted-foreground">{body}</p>
        </div>
        {actionLabel && onAction && (
          <Button type="button" onClick={onAction}>
            <Plus className="mr-2 h-4 w-4" />
            {actionLabel}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

function CmsSidebarSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <p className="px-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{title}</p>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function CmsSidebarButton({
  label,
  description,
  active,
  onClick,
  badge,
  trailing,
}: {
  label: string;
  description?: string;
  active?: boolean;
  onClick: () => void;
  badge?: React.ReactNode;
  trailing?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full rounded-2xl border px-4 py-3 text-left transition-colors",
        active ? "border-primary bg-primary/5 shadow-sm" : "border-border bg-background hover:border-primary/30",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="truncate font-semibold text-foreground">{label}</p>
            {badge}
          </div>
          {description && <p className="mt-1 text-xs leading-5 text-muted-foreground">{description}</p>}
        </div>
        {trailing}
      </div>
    </button>
  );
}

function CmsOverviewDashboard({
  counts,
  pages,
  draftServices,
  onOpenCollection,
  onOpenPage,
}: {
  counts: Array<{ key: Exclude<CmsCollectionKey, "overview">; total: number; live: number; drafts: number; deleted: number }>;
  pages: CmsPage[];
  draftServices: CmsService[];
  onOpenCollection: (collection: Exclude<CmsCollectionKey, "overview">) => void;
  onOpenPage: (page: CmsPage) => void;
}) {
  const corePages = pages.filter((page) => corePageSlugs.includes(page.slug)).sort((left, right) => corePageSlugs.indexOf(left.slug) - corePageSlugs.indexOf(right.slug));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {counts.map((entry) => {
          const meta = collectionMeta[entry.key];
          const Icon = meta.icon;
          return (
            <button
              key={entry.key}
              type="button"
              onClick={() => onOpenCollection(entry.key)}
              className="rounded-2xl border border-border bg-card p-5 text-left shadow-sm transition-colors hover:border-primary/30"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="inline-flex rounded-full bg-primary/8 p-2 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-foreground">{meta.label}</p>
                    <p className="text-sm leading-6 text-muted-foreground">{meta.description}</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="mt-6 grid grid-cols-4 gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Total</p>
                  <p className="mt-1 text-2xl font-black tracking-tight text-foreground">{entry.total}</p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Live</p>
                  <p className="mt-1 text-xl font-bold text-emerald-700">{entry.live}</p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Drafts</p>
                  <p className="mt-1 text-xl font-bold text-amber-700">{entry.drafts}</p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Deleted</p>
                  <p className="mt-1 text-xl font-bold text-rose-700">{entry.deleted}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <Card>
          <CardHeader>
            <CardTitle>Core Page Dashboards</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            {corePages.map((page) => (
              <button
                key={page.id}
                type="button"
                onClick={() => onOpenPage(page)}
                className="rounded-2xl border border-border bg-background p-4 text-left transition-colors hover:border-primary/30"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-foreground">{page.title}</p>
                    <p className="text-sm text-muted-foreground">/{page.slug === "home" ? "" : page.slug}</p>
                  </div>
                  <StatusBadge status={page.status} />
                </div>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {page.excerpt || "Open this dashboard to manage its hero, sections, SEO, and page content."}
                </p>
              </button>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Publishing Workflow</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
              <p className="text-sm font-semibold text-emerald-800">1. Create in Drafts</p>
              <p className="mt-1 text-sm leading-6 text-emerald-700">New pages and services are saved as drafts first so they never go live by accident.</p>
            </div>
            <div className="rounded-2xl border border-sky-100 bg-sky-50 p-4">
              <p className="text-sm font-semibold text-sky-800">2. Publish when ready</p>
              <p className="mt-1 text-sm leading-6 text-sky-700">Set the status to Live and save. If it is a service, also turn on homepage or navigation visibility where needed.</p>
            </div>
            <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4">
              <p className="text-sm font-semibold text-amber-800">3. Keep deleted items recoverable</p>
              <p className="mt-1 text-sm leading-6 text-amber-700">Deleting now moves records into a Deleted view first so they can be restored before permanent removal.</p>
            </div>
            {draftServices.length > 0 && (
              <div className="rounded-2xl border border-border p-4">
                <p className="text-sm font-semibold text-foreground">{draftServices.length} service draft{draftServices.length > 1 ? "s" : ""} waiting for review</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {draftServices.slice(0, 4).map((service) => (
                    <Badge key={service.id} variant="secondary">
                      {service.title}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function PagesOverviewPanel({
  pages,
  onOpen,
}: {
  pages: CmsPage[];
  onOpen: (page: CmsPage) => void;
}) {
  const corePages = pages.filter((page) => corePageSlugs.includes(page.slug)).sort((left, right) => corePageSlugs.indexOf(left.slug) - corePageSlugs.indexOf(right.slug));
  const otherPages = pages.filter((page) => !corePageSlugs.includes(page.slug));

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Page Dashboards</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {corePages.map((page) => (
            <button
              key={page.id}
              type="button"
              onClick={() => onOpen(page)}
              className="rounded-2xl border border-border bg-background p-4 text-left transition-colors hover:border-primary/30"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="font-semibold text-foreground">{page.title}</p>
                <StatusBadge status={page.status} />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">/{page.slug === "home" ? "" : page.slug}</p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {page.excerpt || "Open this dashboard to manage sections, content, SEO, and layout data for this page."}
              </p>
            </button>
          ))}
        </CardContent>
      </Card>

      {otherPages.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Other Pages</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {otherPages.map((page) => (
              <button
                key={page.id}
                type="button"
                onClick={() => onOpen(page)}
                className="flex w-full items-center justify-between rounded-xl border border-border bg-background px-4 py-3 text-left transition-colors hover:border-primary/30"
              >
                <div>
                  <p className="font-medium text-foreground">{page.title}</p>
                  <p className="text-sm text-muted-foreground">/{page.slug}</p>
                </div>
                <StatusBadge status={page.status} />
              </button>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function ServicesOverviewPanel({
  services,
  onOpen,
}: {
  services: CmsService[];
  onOpen: (service: CmsService) => void;
}) {
  const liveCount = services.filter((service) => service.status === "published").length;
  const draftCount = services.filter((service) => service.status === "draft").length;
  const deletedCount = services.filter((service) => service.status === "deleted").length;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Service Workspace</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
            <p className="text-sm font-semibold text-emerald-800">Live services</p>
            <p className="mt-2 text-3xl font-black tracking-tight text-emerald-700">{liveCount}</p>
          </div>
          <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4">
            <p className="text-sm font-semibold text-amber-800">Draft services</p>
            <p className="mt-2 text-3xl font-black tracking-tight text-amber-700">{draftCount}</p>
          </div>
          <div className="rounded-2xl border border-rose-100 bg-rose-50 p-4">
            <p className="text-sm font-semibold text-rose-800">Deleted services</p>
            <p className="mt-2 text-3xl font-black tracking-tight text-rose-700">{deletedCount}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>What controls the public site</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-2xl border border-border p-4">
            <p className="font-semibold text-foreground">To show a service publicly</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">Set the service status to Live. That makes the detail page public at <code>/services/your-slug</code>.</p>
          </div>
          <div className="rounded-2xl border border-border p-4">
            <p className="font-semibold text-foreground">To show it on the homepage</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">Turn on <strong>Featured on homepage</strong>. The homepage service section only pulls services with that switch enabled.</p>
          </div>
          <div className="rounded-2xl border border-border p-4">
            <p className="font-semibold text-foreground">To show it in navigation</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">Turn on <strong>Show in navigation</strong> so it appears in the services menu.</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Open a service dashboard</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          {services.slice(0, 6).map((service) => (
            <button
              key={service.id}
              type="button"
              onClick={() => onOpen(service)}
              className="rounded-xl border border-border bg-background p-4 text-left transition-colors hover:border-primary/30"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="font-semibold text-foreground">{service.title}</p>
                <StatusBadge status={service.status} />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">/{service.slug}</p>
            </button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function CollectionWorkspace<T extends { id: string; status: CmsStatus }>({
  collectionKey,
  title,
  description,
  scope,
  records,
  selectedKey,
  createLabel,
  emptyBody,
  overview,
  publicHref,
  onScopeChange,
  onSelect,
  onCreate,
  onChangeStatus,
  onPermanentDelete,
  renderEditor,
}: {
  collectionKey: Exclude<CmsCollectionKey, "overview" | "settings">;
  title: string;
  description: string;
  scope: CmsScopeKey;
  records: Array<CmsWorkspaceRecord<T>>;
  selectedKey?: string;
  createLabel: string;
  emptyBody: string;
  overview?: React.ReactNode;
  publicHref?: (item: T) => string | null;
  onScopeChange: (scope: CmsScopeKey) => void;
  onSelect: (record: CmsWorkspaceRecord<T>) => void;
  onCreate: () => Promise<void>;
  onChangeStatus: (item: T, status: CmsStatus) => Promise<T>;
  onPermanentDelete: (item: T) => Promise<void>;
  renderEditor: (item: T) => React.ReactNode;
}) {
  const singularLabel = collectionMeta[collectionKey].singularLabel;
  const [busyAction, setBusyAction] = useState<string | null>(null);
  const counts = useMemo(
    () => ({
      live: records.filter((record) => record.status === "published").length,
      drafts: records.filter((record) => record.status === "draft").length,
      deleted: records.filter((record) => record.status === "deleted").length,
      all: records.length,
    }),
    [records],
  );
  const filteredRecords = useMemo(
    () => (scope === "all" ? records : records.filter((record) => matchesScope(record.status, scope))),
    [records, scope],
  );
  const selectedRecord = useMemo(
    () => records.find((record) => record.key === selectedKey),
    [records, selectedKey],
  );

  const runAction = async (label: string, action: () => Promise<void>, successMessage: string) => {
    try {
      setBusyAction(label);
      await action();
      toast.success(successMessage);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Action failed");
    } finally {
      setBusyAction(null);
    }
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
      <Card className="overflow-hidden">
        <CardHeader className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <CardTitle>{title}</CardTitle>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{description}</p>
            </div>
            <Button type="button" size="sm" onClick={() => void onCreate()}>
              <Plus className="mr-2 h-4 w-4" />
              {createLabel}
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {scopeOptions.map((option) => (
              <button
                key={option.key}
                type="button"
                onClick={() => onScopeChange(option.key)}
                className={cn(
                  "rounded-xl border px-3 py-3 text-left transition-colors",
                  option.key === scope ? "border-primary bg-primary/5" : "border-border bg-background hover:border-primary/30",
                )}
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">{option.label}</p>
                <p className="mt-1 text-2xl font-black tracking-tight text-foreground">{counts[option.key]}</p>
              </button>
            ))}
          </div>
        </CardHeader>
        <Separator />
        <ScrollArea className="max-h-[calc(100vh-23rem)]">
          <CardContent className="space-y-3 p-4">
            {filteredRecords.length === 0 ? (
              <div className="rounded-2xl border border-dashed p-5 text-sm leading-6 text-muted-foreground">
                No items exist in the <strong>{scopeOptions.find((option) => option.key === scope)?.label?.toLowerCase()}</strong> view yet.
              </div>
            ) : (
              filteredRecords.map((record) => (
                <button
                  key={record.key}
                  type="button"
                  onClick={() => onSelect(record)}
                  className={cn(
                    "w-full rounded-2xl border p-4 text-left transition-colors",
                    record.key === selectedKey ? "border-primary bg-primary/5" : "border-border bg-background hover:border-primary/30",
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-semibold text-foreground">{record.title}</p>
                      {record.subtitle && <p className="mt-1 truncate text-sm text-muted-foreground">{record.subtitle}</p>}
                    </div>
                    <StatusBadge status={record.status} />
                  </div>
                  {record.description && <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">{record.description}</p>}
                  {record.chips && record.chips.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {record.chips.slice(0, 3).map((chip) => (
                        <Badge key={chip} variant="secondary">
                          {chip}
                        </Badge>
                      ))}
                    </div>
                  )}
                </button>
              ))
            )}
          </CardContent>
        </ScrollArea>
      </Card>

      <div className="space-y-6">
        {selectedRecord ? (
          <>
            <Card>
              <CardContent className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-xl font-semibold text-foreground">{selectedRecord.title}</h2>
                    <StatusBadge status={selectedRecord.status} />
                  </div>
                  {selectedRecord.subtitle && <p className="text-sm text-muted-foreground">{selectedRecord.subtitle}</p>}
                  {selectedRecord.chips && selectedRecord.chips.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {selectedRecord.chips.map((chip) => (
                        <Badge key={chip} variant="secondary">
                          {chip}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {publicHref && selectedRecord.status === "published" && publicHref(selectedRecord.item) && (
                    <Button type="button" variant="outline" asChild>
                      <a href={publicHref(selectedRecord.item) ?? "#"} target="_blank" rel="noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Live
                      </a>
                    </Button>
                  )}
                  {selectedRecord.status !== "published" && (
                    <Button
                      type="button"
                      disabled={busyAction !== null}
                      onClick={() =>
                        void runAction(
                          "publish",
                          async () => {
                            await onChangeStatus(selectedRecord.item, "published");
                          },
                          `${singularLabel} moved to Live.`,
                        )
                      }
                    >
                      {busyAction === "publish" ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Eye className="mr-2 h-4 w-4" />}
                      Publish
                    </Button>
                  )}
                  {selectedRecord.status !== "draft" && (
                    <Button
                      type="button"
                      variant="outline"
                      disabled={busyAction !== null}
                      onClick={() =>
                        void runAction(
                          "draft",
                          async () => {
                            await onChangeStatus(selectedRecord.item, "draft");
                          },
                          `${singularLabel} moved to Drafts.`,
                        )
                      }
                    >
                      {busyAction === "draft" ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Undo2 className="mr-2 h-4 w-4" />}
                      Move to Drafts
                    </Button>
                  )}
                  {selectedRecord.status !== "deleted" && (
                    <Button
                      type="button"
                      variant="outline"
                      disabled={busyAction !== null}
                      onClick={() =>
                        void runAction(
                          "trash",
                          async () => {
                            await onChangeStatus(selectedRecord.item, "deleted");
                          },
                          `${singularLabel} moved to Deleted.`,
                        )
                      }
                    >
                      {busyAction === "trash" ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 className="mr-2 h-4 w-4" />}
                      Move to Deleted
                    </Button>
                  )}
                  {selectedRecord.status === "deleted" && (
                    <Button
                      type="button"
                      variant="destructive"
                      disabled={busyAction !== null}
                      onClick={() =>
                        void runAction(
                          "permanent-delete",
                          async () => {
                            await onPermanentDelete(selectedRecord.item);
                          },
                          `${singularLabel} deleted permanently.`,
                        )
                      }
                    >
                      {busyAction === "permanent-delete" ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 className="mr-2 h-4 w-4" />}
                      Delete Permanently
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
            {renderEditor(selectedRecord.item)}
          </>
        ) : overview ? (
          overview
        ) : (
          <CmsEmptyState
            title={`Select a ${singularLabel.toLowerCase()} to edit`}
            body={emptyBody}
            actionLabel={createLabel}
            onAction={() => void onCreate()}
          />
        )}
      </div>
    </div>
  );
}

export default function CmsManagementPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: settings, isLoading } = useCmsSiteSettings();
  const { data: pages = [] } = useCmsPages(true);
  const { data: services = [] } = useCmsServices(true);
  const { data: posts = [] } = useCmsBlogPosts(true);
  const { data: faqs = [] } = useCmsFaqs({ includeDrafts: true });
  const { data: testimonials = [] } = useCmsTestimonials({ includeDrafts: true });
  const { data: teamMembers = [] } = useCmsTeamMembers({ includeDrafts: true });
  const { data: legalDocuments = [] } = useCmsLegalDocuments(true);
  const { data: mediaAssets = [] } = useCmsMediaAssets(true);
  const { data: announcements = [] } = useCmsAnnouncements(true);

  const saveSettings = useSaveCmsSiteSettings();
  const savePage = useSaveCmsPage();
  const saveService = useSaveCmsService();
  const savePost = useSaveCmsBlogPost();
  const saveFaq = useSaveCmsFaq();
  const saveTestimonial = useSaveCmsTestimonial();
  const saveTeamMember = useSaveCmsTeamMember();
  const saveLegal = useSaveCmsLegalDocument();
  const saveMedia = useSaveCmsMediaAsset();
  const saveAnnouncement = useSaveCmsAnnouncement();
  const deleteRecord = useDeleteCmsRecord();
  const deleteMedia = useDeleteCmsMediaAsset();
  const seedDefaults = useSeedCmsDefaults();

  const cmsPath = useMemo(
    () => location.pathname.replace(/^\/cms\/?/, "").split("/").filter(Boolean),
    [location.pathname],
  );
  const legacyTab = useMemo(() => new URLSearchParams(location.search).get("tab"), [location.search]);
  const requestedCollection = cmsPath[0] ?? (isCmsCollectionKey(legacyTab) ? legacyTab : "overview");
  const activeCollection: CmsCollectionKey = isCmsCollectionKey(requestedCollection) ? requestedCollection : "overview";
  const activeSettingsPanel: CmsSettingsPanelKey = activeCollection === "settings" && isCmsSettingsPanelKey(cmsPath[1]) ? cmsPath[1] : "branding";
  const activeScope: CmsScopeKey =
    activeCollection === "overview" || activeCollection === "settings"
      ? "all"
      : isCmsScopeKey(cmsPath[1])
        ? cmsPath[1]
        : (collectionMeta[activeCollection].defaultScope ?? "live");
  const selectedKey = cmsPath[2] ? decodeURIComponent(cmsPath[2]) : undefined;

  useEffect(() => {
    if (cmsPath.length === 0 && isCmsCollectionKey(legacyTab) && legacyTab !== "overview") {
      navigate(buildCmsHref(legacyTab, legacyTab === "settings" ? undefined : collectionMeta[legacyTab].defaultScope), { replace: true });
    }
  }, [cmsPath.length, legacyTab, navigate]);

  useEffect(() => {
    if (activeCollection !== "overview" && activeCollection !== "settings" && cmsPath.length === 1) {
      navigate(buildCmsHref(activeCollection, collectionMeta[activeCollection].defaultScope), { replace: true });
    }
  }, [activeCollection, cmsPath.length, navigate]);

  useEffect(() => {
    if (activeCollection === "settings" && cmsPath.length <= 1) {
      navigate(buildSettingsHref("branding"), { replace: true });
    }
  }, [activeCollection, cmsPath.length, navigate]);

  const pageRecords = useMemo(
    () =>
      [...pages]
        .sort((left, right) => {
          const leftIndex = corePageSlugs.indexOf(left.slug);
          const rightIndex = corePageSlugs.indexOf(right.slug);
          const normalizedLeft = leftIndex === -1 ? corePageSlugs.length + left.sortOrder : leftIndex;
          const normalizedRight = rightIndex === -1 ? corePageSlugs.length + right.sortOrder : rightIndex;
          return normalizedLeft - normalizedRight;
        })
        .map(
          (page): CmsWorkspaceRecord<CmsPage> => ({
            key: page.slug,
            title: page.title,
            subtitle: `/${page.slug === "home" ? "" : page.slug}`,
            description: page.excerpt,
            status: page.status,
            item: page,
            chips: [page.pageType, page.showInNavigation ? "In navigation" : "Hidden from navigation"],
          }),
        ),
    [pages],
  );
  const serviceRecords = useMemo(
    () =>
      [...services]
        .sort((left, right) => left.sortOrder - right.sortOrder || left.title.localeCompare(right.title))
        .map(
          (service): CmsWorkspaceRecord<CmsService> => ({
            key: service.slug,
            title: service.title,
            subtitle: `/services/${service.slug}`,
            description: service.excerpt || service.summary,
            status: service.status,
            item: service,
            chips: [
              service.categoryLabel,
              service.featuredOnHome ? "Homepage" : "Not on homepage",
              service.featuredInNavigation ? "Navigation" : "Not in navigation",
            ],
          }),
        ),
    [services],
  );
  const postRecords = useMemo(
    () =>
      [...posts]
        .sort((left, right) => left.sortOrder - right.sortOrder || right.publishedAt.localeCompare(left.publishedAt))
        .map(
          (post): CmsWorkspaceRecord<CmsBlogPost> => ({
            key: post.slug,
            title: post.title,
            subtitle: `/blog/${post.slug}`,
            description: post.excerpt,
            status: post.status,
            item: post,
            chips: [post.category, post.publishedAt, post.authorName],
          }),
        ),
    [posts],
  );
  const faqRecords = useMemo(
    () =>
      [...faqs]
        .sort((left, right) => left.sortOrder - right.sortOrder)
        .map(
          (faq): CmsWorkspaceRecord<CmsFaq> => ({
            key: faq.id,
            title: faq.question,
            subtitle: faq.category,
            description: faq.answer,
            status: faq.status,
            item: faq,
            chips: [faq.pageSlug ? `Page: ${faq.pageSlug}` : faq.serviceSlug ? `Service: ${faq.serviceSlug}` : "General"],
          }),
        ),
    [faqs],
  );
  const testimonialRecords = useMemo(
    () =>
      [...testimonials]
        .sort((left, right) => left.sortOrder - right.sortOrder)
        .map(
          (testimonial): CmsWorkspaceRecord<CmsTestimonial> => ({
            key: testimonial.id,
            title: testimonial.name,
            subtitle: testimonial.role,
            description: testimonial.quote,
            status: testimonial.status,
            item: testimonial,
            chips: [testimonial.pageSlug ? `Page: ${testimonial.pageSlug}` : testimonial.serviceSlug ? `Service: ${testimonial.serviceSlug}` : "General"],
          }),
        ),
    [testimonials],
  );
  const teamRecords = useMemo(
    () =>
      [...teamMembers]
        .sort((left, right) => left.sortOrder - right.sortOrder)
        .map(
          (member): CmsWorkspaceRecord<CmsTeamMember> => ({
            key: member.id,
            title: member.name,
            subtitle: member.specialty ? `${member.role} • ${member.specialty}` : member.role,
            description: member.bio,
            status: member.status,
            item: member,
            chips: [member.serviceSlug ? `Service: ${member.serviceSlug}` : "General", member.email ?? "No email"],
          }),
        ),
    [teamMembers],
  );
  const legalRecords = useMemo(
    () =>
      [...legalDocuments]
        .sort((left, right) => left.sortOrder - right.sortOrder)
        .map(
          (document): CmsWorkspaceRecord<CmsLegalDocument> => ({
            key: document.slug,
            title: document.title,
            subtitle: `/policies/${document.slug}`,
            description: document.summary,
            status: document.status,
            item: document,
            chips: ["Legal page"],
          }),
        ),
    [legalDocuments],
  );
  const mediaRecords = useMemo(
    () =>
      [...mediaAssets]
        .sort((left, right) => left.sortOrder - right.sortOrder)
        .map(
          (asset): CmsWorkspaceRecord<CmsMediaAsset> => ({
            key: asset.id,
            title: asset.name,
            subtitle: asset.folder || asset.type,
            description: asset.alt || asset.url,
            status: asset.status,
            item: asset,
            chips: [asset.type, ...asset.tags.slice(0, 2)],
          }),
        ),
    [mediaAssets],
  );
  const announcementRecords = useMemo(
    () =>
      [...announcements]
        .sort((left, right) => left.sortOrder - right.sortOrder)
        .map(
          (announcement): CmsWorkspaceRecord<CmsAnnouncement> => ({
            key: announcement.id,
            title: announcement.title,
            subtitle: announcement.href ?? "Announcement bar",
            description: announcement.body,
            status: announcement.status,
            item: announcement,
            chips: [announcement.buttonLabel ?? "No button label"],
          }),
        ),
    [announcements],
  );

  const contentHealth = useMemo(
    () => [
      { key: "pages" as const, total: pages.length, live: pages.filter((item) => item.status === "published").length, drafts: pages.filter((item) => item.status === "draft").length, deleted: pages.filter((item) => item.status === "deleted").length },
      { key: "services" as const, total: services.length, live: services.filter((item) => item.status === "published").length, drafts: services.filter((item) => item.status === "draft").length, deleted: services.filter((item) => item.status === "deleted").length },
      { key: "blog" as const, total: posts.length, live: posts.filter((item) => item.status === "published").length, drafts: posts.filter((item) => item.status === "draft").length, deleted: posts.filter((item) => item.status === "deleted").length },
      { key: "faqs" as const, total: faqs.length, live: faqs.filter((item) => item.status === "published").length, drafts: faqs.filter((item) => item.status === "draft").length, deleted: faqs.filter((item) => item.status === "deleted").length },
      { key: "testimonials" as const, total: testimonials.length, live: testimonials.filter((item) => item.status === "published").length, drafts: testimonials.filter((item) => item.status === "draft").length, deleted: testimonials.filter((item) => item.status === "deleted").length },
      { key: "team" as const, total: teamMembers.length, live: teamMembers.filter((item) => item.status === "published").length, drafts: teamMembers.filter((item) => item.status === "draft").length, deleted: teamMembers.filter((item) => item.status === "deleted").length },
      { key: "legal" as const, total: legalDocuments.length, live: legalDocuments.filter((item) => item.status === "published").length, drafts: legalDocuments.filter((item) => item.status === "draft").length, deleted: legalDocuments.filter((item) => item.status === "deleted").length },
      { key: "media" as const, total: mediaAssets.length, live: mediaAssets.filter((item) => item.status === "published").length, drafts: mediaAssets.filter((item) => item.status === "draft").length, deleted: mediaAssets.filter((item) => item.status === "deleted").length },
      { key: "announcements" as const, total: announcements.length, live: announcements.filter((item) => item.status === "published").length, drafts: announcements.filter((item) => item.status === "draft").length, deleted: announcements.filter((item) => item.status === "deleted").length },
    ],
    [announcements, faqs, legalDocuments, mediaAssets, pages, posts, services, teamMembers, testimonials],
  );

  const canSeedDefaults = contentHealth.every((entry) => entry.total === 0);
  const getPageWorkspaceHref = (slug: string) => {
    const page = pages.find((entry) => entry.slug === slug);
    return page ? buildCmsHref("pages", getScopeFromStatus(page.status), page.slug) : buildCmsHref("pages", "live");
  };
  const getServiceWorkspaceHref = (slug: string) => {
    const service = services.find((entry) => entry.slug === slug);
    return service ? buildCmsHref("services", getScopeFromStatus(service.status), service.slug) : buildCmsHref("services", "live");
  };
  const sortedSidebarServices = [...services]
    .filter((service) => service.status !== "deleted")
    .sort((left, right) => {
      const leftRank = left.status === "published" ? 0 : 1;
      const rightRank = right.status === "published" ? 0 : 1;
      return leftRank - rightRank || left.sortOrder - right.sortOrder || left.title.localeCompare(right.title);
    });
  const isPathActive = (href: string, exact = false) => (exact ? location.pathname === href : location.pathname === href || location.pathname.startsWith(`${href}/`));

  const openCollection = (collection: Exclude<CmsCollectionKey, "overview">) => {
    navigate(buildCmsHref(collection, collection === "settings" ? undefined : collectionMeta[collection].defaultScope));
  };

  const openRecord = (collection: Exclude<CmsCollectionKey, "overview" | "settings">, scope: CmsScopeKey, key: string) => {
    navigate(buildCmsHref(collection, scope, key));
  };

  const savePageAndRoute = async (page: CmsPage) => {
    const saved = await savePage.mutateAsync(page);
    navigate(buildCmsHref("pages", getScopeFromStatus(saved.status), saved.slug));
    return saved;
  };
  const saveServiceAndRoute = async (service: CmsService) => {
    const saved = await saveService.mutateAsync(service);
    navigate(buildCmsHref("services", getScopeFromStatus(saved.status), saved.slug));
    return saved;
  };
  const savePostAndRoute = async (post: CmsBlogPost) => {
    const saved = await savePost.mutateAsync(post);
    navigate(buildCmsHref("blog", getScopeFromStatus(saved.status), saved.slug));
    return saved;
  };
  const saveFaqAndRoute = async (faq: CmsFaq) => {
    const saved = await saveFaq.mutateAsync(faq);
    navigate(buildCmsHref("faqs", getScopeFromStatus(saved.status), saved.id));
    return saved;
  };
  const saveTestimonialAndRoute = async (testimonial: CmsTestimonial) => {
    const saved = await saveTestimonial.mutateAsync(testimonial);
    navigate(buildCmsHref("testimonials", getScopeFromStatus(saved.status), saved.id));
    return saved;
  };
  const saveTeamMemberAndRoute = async (member: CmsTeamMember) => {
    const saved = await saveTeamMember.mutateAsync(member);
    navigate(buildCmsHref("team", getScopeFromStatus(saved.status), saved.id));
    return saved;
  };
  const saveLegalAndRoute = async (document: CmsLegalDocument) => {
    const saved = await saveLegal.mutateAsync(document);
    navigate(buildCmsHref("legal", getScopeFromStatus(saved.status), saved.slug));
    return saved;
  };
  const saveMediaAndRoute = async (asset: CmsMediaAsset) => {
    const saved = await saveMedia.mutateAsync(asset);
    navigate(buildCmsHref("media", getScopeFromStatus(saved.status), saved.id));
    return saved;
  };
  const saveAnnouncementAndRoute = async (announcement: CmsAnnouncement) => {
    const saved = await saveAnnouncement.mutateAsync(announcement);
    navigate(buildCmsHref("announcements", getScopeFromStatus(saved.status), saved.id));
    return saved;
  };

  if (isLoading || !settings) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[50vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  let workspace: React.ReactNode = null;

  if (activeCollection === "overview") {
    workspace = (
      <CmsOverviewDashboard
        counts={contentHealth}
        pages={pages}
        draftServices={services.filter((service) => service.status === "draft")}
        onOpenCollection={openCollection}
        onOpenPage={(page) => openRecord("pages", getScopeFromStatus(page.status), page.slug)}
      />
    );
  } else if (activeCollection === "settings") {
    workspace = (
      <SiteSettingsEditor
        value={settings}
        activePanel={activeSettingsPanel}
        onOpenPanel={(panel) => navigate(buildSettingsHref(panel))}
        onSave={(next) => saveSettings.mutateAsync(next)}
      />
    );
  } else if (activeCollection === "pages") {
    workspace = (
      <CollectionWorkspace
        collectionKey="pages"
        title="Pages"
        description={collectionMeta.pages.description}
        scope={activeScope}
        records={pageRecords}
        selectedKey={selectedKey}
        createLabel="Add Page"
        emptyBody="Each page has its own dashboard. Select a page from the left to edit it, or create a new draft page."
        overview={<PagesOverviewPanel pages={pages} onOpen={(page) => openRecord("pages", getScopeFromStatus(page.status), page.slug)} />}
        publicHref={(page) => (page.slug === "home" ? "/" : `/${page.slug}`)}
        onScopeChange={(scope) => navigate(buildCmsHref("pages", scope))}
        onSelect={(record) => openRecord("pages", activeScope, record.key)}
        onCreate={async () => {
          const saved = await savePageAndRoute(createBlankPage());
          toast.success(`Draft page "${saved.title}" created.`);
        }}
        onChangeStatus={(item, status) => savePageAndRoute({ ...item, status })}
        onPermanentDelete={async (item) => {
          await deleteRecord.mutateAsync({ table: "cms_pages", id: item.id });
          navigate(buildCmsHref("pages", "deleted"));
        }}
        renderEditor={(item) => <PageEditorCard value={item} onSave={savePageAndRoute} />}
      />
    );
  } else if (activeCollection === "services") {
    workspace = (
      <CollectionWorkspace
        collectionKey="services"
        title="Services"
        description={collectionMeta.services.description}
        scope={activeScope}
        records={serviceRecords}
        selectedKey={selectedKey}
        createLabel="Add Service"
        emptyBody="Create a new service draft, then publish it when the content and settings are ready."
        overview={<ServicesOverviewPanel services={services} onOpen={(service) => openRecord("services", getScopeFromStatus(service.status), service.slug)} />}
        publicHref={(service) => `/services/${service.slug}`}
        onScopeChange={(scope) => navigate(buildCmsHref("services", scope))}
        onSelect={(record) => openRecord("services", activeScope, record.key)}
        onCreate={async () => {
          const saved = await saveServiceAndRoute(createBlankService());
          toast.success(`Draft service "${saved.title}" created.`);
        }}
        onChangeStatus={(item, status) => saveServiceAndRoute({ ...item, status })}
        onPermanentDelete={async (item) => {
          await deleteRecord.mutateAsync({ table: "cms_services", id: item.id });
          navigate(buildCmsHref("services", "deleted"));
        }}
        renderEditor={(item) => <ServiceEditorCard value={item} onSave={saveServiceAndRoute} />}
      />
    );
  } else if (activeCollection === "blog") {
    workspace = (
      <CollectionWorkspace
        collectionKey="blog"
        title="Blog"
        description={collectionMeta.blog.description}
        scope={activeScope}
        records={postRecords}
        selectedKey={selectedKey}
        createLabel="Add Blog Post"
        emptyBody="Pick a blog post from the left or create a new draft post to start writing."
        publicHref={(post) => `/blog/${post.slug}`}
        onScopeChange={(scope) => navigate(buildCmsHref("blog", scope))}
        onSelect={(record) => openRecord("blog", activeScope, record.key)}
        onCreate={async () => {
          const saved = await savePostAndRoute(createBlankPost());
          toast.success(`Draft post "${saved.title}" created.`);
        }}
        onChangeStatus={(item, status) => savePostAndRoute({ ...item, status })}
        onPermanentDelete={async (item) => {
          await deleteRecord.mutateAsync({ table: "cms_blog_posts", id: item.id });
          navigate(buildCmsHref("blog", "deleted"));
        }}
        renderEditor={(item) => <BlogEditorCard value={item} onSave={savePostAndRoute} />}
      />
    );
  } else if (activeCollection === "faqs") {
    workspace = (
      <CollectionWorkspace
        collectionKey="faqs"
        title="FAQs"
        description={collectionMeta.faqs.description}
        scope={activeScope}
        records={faqRecords}
        selectedKey={selectedKey}
        createLabel="Add FAQ"
        emptyBody="Create FAQs here, then connect them to a page or service using the slug fields."
        onScopeChange={(scope) => navigate(buildCmsHref("faqs", scope))}
        onSelect={(record) => openRecord("faqs", activeScope, record.key)}
        onCreate={async () => {
          const saved = await saveFaqAndRoute(createBlankFaq());
          toast.success(`Draft FAQ created.`);
          return saved;
        }}
        onChangeStatus={(item, status) => saveFaqAndRoute({ ...item, status })}
        onPermanentDelete={async (item) => {
          await deleteRecord.mutateAsync({ table: "cms_faqs", id: item.id });
          navigate(buildCmsHref("faqs", "deleted"));
        }}
        renderEditor={(item) => <FaqEditorCard value={item} onSave={saveFaqAndRoute} />}
      />
    );
  } else if (activeCollection === "testimonials") {
    workspace = (
      <CollectionWorkspace
        collectionKey="testimonials"
        title="Testimonials"
        description={collectionMeta.testimonials.description}
        scope={activeScope}
        records={testimonialRecords}
        selectedKey={selectedKey}
        createLabel="Add Testimonial"
        emptyBody="Create testimonials and assign them to a page or service so they appear in the correct frontend section."
        onScopeChange={(scope) => navigate(buildCmsHref("testimonials", scope))}
        onSelect={(record) => openRecord("testimonials", activeScope, record.key)}
        onCreate={async () => {
          await saveTestimonialAndRoute(createBlankTestimonial());
          toast.success("Draft testimonial created.");
        }}
        onChangeStatus={(item, status) => saveTestimonialAndRoute({ ...item, status })}
        onPermanentDelete={async (item) => {
          await deleteRecord.mutateAsync({ table: "cms_testimonials", id: item.id });
          navigate(buildCmsHref("testimonials", "deleted"));
        }}
        renderEditor={(item) => <TestimonialEditorCard value={item} onSave={saveTestimonialAndRoute} />}
      />
    );
  } else if (activeCollection === "team") {
    workspace = (
      <CollectionWorkspace
        collectionKey="team"
        title="Team"
        description={collectionMeta.team.description}
        scope={activeScope}
        records={teamRecords}
        selectedKey={selectedKey}
        createLabel="Add Team Member"
        emptyBody="Create a team member profile here and connect it to a service slug where needed."
        onScopeChange={(scope) => navigate(buildCmsHref("team", scope))}
        onSelect={(record) => openRecord("team", activeScope, record.key)}
        onCreate={async () => {
          await saveTeamMemberAndRoute(createBlankTeamMember());
          toast.success("Draft team member created.");
        }}
        onChangeStatus={(item, status) => saveTeamMemberAndRoute({ ...item, status })}
        onPermanentDelete={async (item) => {
          await deleteRecord.mutateAsync({ table: "cms_team_members", id: item.id });
          navigate(buildCmsHref("team", "deleted"));
        }}
        renderEditor={(item) => <TeamEditorCard value={item} onSave={saveTeamMemberAndRoute} />}
      />
    );
  } else if (activeCollection === "legal") {
    workspace = (
      <CollectionWorkspace
        collectionKey="legal"
        title="Policies"
        description={collectionMeta.legal.description}
        scope={activeScope}
        records={legalRecords}
        selectedKey={selectedKey}
        createLabel="Add Policy Page"
        emptyBody="Create legal or policy pages here, then publish them when they are approved."
        publicHref={(document) => `/policies/${document.slug}`}
        onScopeChange={(scope) => navigate(buildCmsHref("legal", scope))}
        onSelect={(record) => openRecord("legal", activeScope, record.key)}
        onCreate={async () => {
          const saved = await saveLegalAndRoute(createBlankLegal());
          toast.success(`Draft policy "${saved.title}" created.`);
        }}
        onChangeStatus={(item, status) => saveLegalAndRoute({ ...item, status })}
        onPermanentDelete={async (item) => {
          await deleteRecord.mutateAsync({ table: "cms_legal_documents", id: item.id });
          navigate(buildCmsHref("legal", "deleted"));
        }}
        renderEditor={(item) => <LegalEditorCard value={item} onSave={saveLegalAndRoute} />}
      />
    );
  } else if (activeCollection === "media") {
    workspace = (
      <CollectionWorkspace
        collectionKey="media"
        title="Media"
        description={collectionMeta.media.description}
        scope={activeScope}
        records={mediaRecords}
        selectedKey={selectedKey}
        createLabel="Add Media Asset"
        emptyBody="Use the media library to upload assets centrally, then choose them from page, service, or settings editors."
        publicHref={(asset) => asset.url}
        onScopeChange={(scope) => navigate(buildCmsHref("media", scope))}
        onSelect={(record) => openRecord("media", activeScope, record.key)}
        onCreate={async () => {
          const saved = await saveMediaAndRoute(createBlankMediaAsset());
          toast.success(`Draft media asset "${saved.name}" created.`);
        }}
        onChangeStatus={(item, status) => saveMediaAndRoute({ ...item, status })}
        onPermanentDelete={async (item) => {
          await deleteMedia.mutateAsync(item);
          navigate(buildCmsHref("media", "deleted"));
        }}
        renderEditor={(item) => <MediaEditorCard value={item} onSave={saveMediaAndRoute} />}
      />
    );
  } else if (activeCollection === "announcements") {
    workspace = (
      <CollectionWorkspace
        collectionKey="announcements"
        title="Announcements"
        description={collectionMeta.announcements.description}
        scope={activeScope}
        records={announcementRecords}
        selectedKey={selectedKey}
        createLabel="Add Announcement"
        emptyBody="Use announcements for the public notice bar and short important updates."
        onScopeChange={(scope) => navigate(buildCmsHref("announcements", scope))}
        onSelect={(record) => openRecord("announcements", activeScope, record.key)}
        onCreate={async () => {
          await saveAnnouncementAndRoute(createBlankAnnouncement());
          toast.success("Draft announcement created.");
        }}
        onChangeStatus={(item, status) => saveAnnouncementAndRoute({ ...item, status })}
        onPermanentDelete={async (item) => {
          await deleteRecord.mutateAsync({ table: "cms_announcements", id: item.id });
          navigate(buildCmsHref("announcements", "deleted"));
        }}
        renderEditor={(item) => <AnnouncementEditorCard value={item} onSave={saveAnnouncementAndRoute} />}
      />
    );
  }

  return (
    <CmsMediaLibraryContext.Provider value={{ mediaAssets }}>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Content Management</h1>
              <p className="text-muted-foreground">Manage website pages, service dashboards, branding, media, SEO, and website settings from dedicated enterprise workspaces.</p>
            </div>
            {canSeedDefaults && (
              <div className="flex flex-wrap gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={async () => {
                  try {
                    await seedDefaults.mutateAsync(undefined as never);
                    toast.success("CMS defaults seeded");
                  } catch (error) {
                    toast.error(error instanceof Error ? error.message : "Seed failed");
                  }
                }}
              >
                <RefreshCcw className="mr-2 h-4 w-4" />
                Seed Website Content
              </Button>
              </div>
            )}
          </div>

          <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
            <div className="space-y-4 xl:sticky xl:top-6 xl:self-start">
              <Card className="overflow-hidden">
                <CardContent className="space-y-5 p-4">
                  <CmsSidebarSection title="Dashboard">
                    <CmsSidebarButton
                      label="CMS Overview"
                      description="Open the master CMS dashboard."
                      active={activeCollection === "overview"}
                      onClick={() => navigate("/cms")}
                      badge={<Badge variant="secondary">{contentHealth.reduce((total, item) => total + item.total, 0)}</Badge>}
                    />
                  </CmsSidebarSection>

                  <Separator />

                  <CmsSidebarSection title="Website Management">
                    <CmsSidebarButton label="Homepage" active={location.pathname === getPageWorkspaceHref("home")} onClick={() => navigate(getPageWorkspaceHref("home"))} />
                    <CmsSidebarButton label="About Us" active={location.pathname === getPageWorkspaceHref("about-us")} onClick={() => navigate(getPageWorkspaceHref("about-us"))} />
                    <CmsSidebarButton label="Services Page" active={location.pathname === getPageWorkspaceHref("services")} onClick={() => navigate(getPageWorkspaceHref("services"))} />
                    <CmsSidebarButton label="Blog" active={isPathActive(buildCmsHref("blog", "live"))} onClick={() => navigate(buildCmsHref("blog", "live"))} />
                    <CmsSidebarButton label="Contact" active={location.pathname === getPageWorkspaceHref("contact")} onClick={() => navigate(getPageWorkspaceHref("contact"))} />
                    <CmsSidebarButton label="FAQ" active={isPathActive(buildCmsHref("faqs", "live"))} onClick={() => navigate(buildCmsHref("faqs", "live"))} />
                    <CmsSidebarButton label="Testimonials" active={isPathActive(buildCmsHref("testimonials", "live"))} onClick={() => navigate(buildCmsHref("testimonials", "live"))} />
                    <CmsSidebarButton label="Team" active={isPathActive(buildCmsHref("team", "live"))} onClick={() => navigate(buildCmsHref("team", "live"))} />
                    <CmsSidebarButton label="SEO" active={isPathActive(buildSettingsHref("seo"))} onClick={() => navigate(buildSettingsHref("seo"))} />
                    <CmsSidebarButton label="Media Library" active={isPathActive(buildCmsHref("media", "live"))} onClick={() => navigate(buildCmsHref("media", "live"))} />
                  </CmsSidebarSection>

                  <Separator />

                  <CmsSidebarSection title="Services Management">
                    <CmsSidebarButton
                      label="All Services"
                      description={`${services.filter((service) => service.status === "published").length} live / ${services.filter((service) => service.status === "draft").length} drafts`}
                      active={activeCollection === "services" && !selectedKey}
                      onClick={() => navigate(buildCmsHref("services", "live"))}
                    />
                    <ScrollArea className="max-h-72 pr-2">
                      <div className="space-y-2">
                        {sortedSidebarServices.map((service) => (
                          <CmsSidebarButton
                            key={service.id}
                            label={service.title}
                            active={activeCollection === "services" && selectedKey === service.slug}
                            onClick={() => navigate(getServiceWorkspaceHref(service.slug))}
                            badge={<StatusDot status={service.status} />}
                          />
                        ))}
                      </div>
                    </ScrollArea>
                  </CmsSidebarSection>

                  <Separator />

                  <CmsSidebarSection title="Website Settings">
                    <CmsSidebarButton label="Navbar" active={isPathActive(buildSettingsHref("navbar"))} onClick={() => navigate(buildSettingsHref("navbar"))} />
                    <CmsSidebarButton label="Footer" active={isPathActive(buildSettingsHref("footer"))} onClick={() => navigate(buildSettingsHref("footer"))} />
                    <CmsSidebarButton label="Branding" active={isPathActive(buildSettingsHref("branding"))} onClick={() => navigate(buildSettingsHref("branding"))} />
                    <CmsSidebarButton label="Social Links" active={isPathActive(buildSettingsHref("social"))} onClick={() => navigate(buildSettingsHref("social"))} />
                    <CmsSidebarButton label="Theme Settings" active={isPathActive(buildSettingsHref("theme"))} onClick={() => navigate(buildSettingsHref("theme"))} />
                  </CmsSidebarSection>

                  <Separator />

                  <CmsSidebarSection title="Hospital Operations">
                    <CmsSidebarButton label="Patients" active={false} onClick={() => navigate("/patients")} />
                    <CmsSidebarButton label="Doctors" active={false} onClick={() => navigate("/doctors")} />
                    <CmsSidebarButton label="Billing" active={false} onClick={() => navigate("/billing")} />
                    <CmsSidebarButton label="Pharmacy" active={false} onClick={() => navigate("/pharmacy")} />
                    <CmsSidebarButton label="Laboratory" active={false} onClick={() => navigate("/lab")} />
                  </CmsSidebarSection>

                  <Separator />

                  <CmsSidebarSection title="System Settings">
                    <CmsSidebarButton label="Platform Settings" active={false} onClick={() => navigate("/settings")} />
                    <CmsSidebarButton label="Help & Support" active={false} onClick={() => navigate("/support")} />
                  </CmsSidebarSection>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">{workspace}</div>
          </div>
        </div>
      </DashboardLayout>
    </CmsMediaLibraryContext.Provider>
  );
}
