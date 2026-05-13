import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  ArrowDown,
  ArrowUp,
  Copy,
  ImagePlus,
  Loader2,
  Plus,
  RefreshCcw,
  Save,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { cmsDefaults } from "@/features/cms/defaults";
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
  CmsSiteSettings,
  CmsSocialLink,
  CmsTeamMember,
  CmsTestimonial,
} from "@/features/cms/types";
import { cloneCmsValue, createCmsId, createEmptyButton, createEmptyImage, createEmptyItem, createEmptySection } from "@/features/cms/utils";

const sectionTypes: CmsSection["type"][] = ["hero", "richText", "featureGrid", "stats", "serviceList", "testimonialList", "faqList", "cta", "teamGrid", "gallery", "timeline", "blogFeed", "contactCards"];
const sectionThemes: CmsSection["theme"][] = ["light", "muted", "primary", "accent"];
const dataSources: CmsSection["dataSource"][] = ["manual", "services", "testimonials", "faqs", "team", "blog-posts"];
const cmsTabValues = ["settings", "pages", "services", "blog", "faqs", "testimonials", "team", "legal", "media", "announcements"] as const;
type CmsTabValue = (typeof cmsTabValues)[number];

function isCmsTabValue(value: string | null | undefined): value is CmsTabValue {
  return value ? cmsTabValues.includes(value as CmsTabValue) : false;
}

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

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <Label className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">{children}</Label>;
}

function ImageFields({ label, value, onChange }: { label: string; value?: CmsImage; onChange: (next: CmsImage) => void }) {
  const current = value ?? createEmptyImage();

  return (
    <div className="space-y-3">
      <FieldLabel>{label}</FieldLabel>
      <div className="grid gap-3 md:grid-cols-[1fr_220px]">
        <Input value={current.url} onChange={(event) => onChange({ ...current, url: event.target.value })} placeholder="https://..." />
        <Input value={current.alt} onChange={(event) => onChange({ ...current, alt: event.target.value })} placeholder="Alt text" />
      </div>
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
      <div className="space-y-4">
        {value.map((sectionValue, index) => (
          <div key={sectionValue.id} className="space-y-4 rounded-xl border border-border bg-card/50 p-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-3">
                <Badge variant="secondary">{sectionValue.type}</Badge>
                <span className="text-sm font-semibold text-foreground">{sectionValue.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 rounded-lg border px-3 py-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Visible</span>
                  <Switch checked={sectionValue.isVisible} onCheckedChange={(checked) => onChange(value.map((entry) => (entry.id === sectionValue.id ? { ...entry, isVisible: checked } : entry)))} />
                </div>
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
        ))}
      </div>
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

function PageEditorCard({ value, onSave, onDelete }: { value: CmsPage; onSave: (page: CmsPage) => Promise<unknown>; onDelete: () => Promise<unknown> }) {
  const [draft, setDraft] = useState(value);
  useEffect(() => setDraft(value), [value]);

  return (
    <DocumentCard title={draft.title} badge={draft.status} onSave={() => onSave(draft)} onDelete={onDelete}>
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
            <SelectItem value="draft">draft</SelectItem>
            <SelectItem value="published">published</SelectItem>
          </SelectContent>
        </Select>
        <Input type="number" value={draft.sortOrder} onChange={(event) => setDraft({ ...draft, sortOrder: Number(event.target.value) || 0 })} placeholder="Sort order" />
        <div className="flex items-center justify-between rounded-lg border px-3">
          <span className="text-sm font-medium">Show in navigation</span>
          <Switch checked={draft.showInNavigation} onCheckedChange={(checked) => setDraft({ ...draft, showInNavigation: checked })} />
        </div>
      </div>
      <Textarea value={draft.excerpt} onChange={(event) => setDraft({ ...draft, excerpt: event.target.value })} placeholder="Page excerpt" rows={3} />
      <SeoEditor value={draft.seo} onChange={(next) => setDraft({ ...draft, seo: next })} />
      <SectionsEditor value={draft.sections} onChange={(next) => setDraft({ ...draft, sections: next })} />
    </DocumentCard>
  );
}

function ServiceEditorCard({ value, onSave, onDelete }: { value: CmsService; onSave: (service: CmsService) => Promise<unknown>; onDelete: () => Promise<unknown> }) {
  const [draft, setDraft] = useState(value);
  useEffect(() => setDraft(value), [value]);

  return (
    <DocumentCard title={draft.title} badge={draft.status} onSave={() => onSave(draft)} onDelete={onDelete}>
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
            <SelectItem value="draft">draft</SelectItem>
            <SelectItem value="published">published</SelectItem>
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
      <Textarea value={draft.excerpt} onChange={(event) => setDraft({ ...draft, excerpt: event.target.value })} placeholder="Service excerpt" rows={3} />
      <Textarea value={draft.summary} onChange={(event) => setDraft({ ...draft, summary: event.target.value })} placeholder="Service summary" rows={4} />
      <ImageFields label="Preview Image" value={draft.previewImage} onChange={(next) => setDraft({ ...draft, previewImage: next })} />
      <SeoEditor value={draft.seo} onChange={(next) => setDraft({ ...draft, seo: next })} />
      <SectionsEditor value={draft.sections} onChange={(next) => setDraft({ ...draft, sections: next })} />
    </DocumentCard>
  );
}

function BlogEditorCard({ value, onSave, onDelete }: { value: CmsBlogPost; onSave: (post: CmsBlogPost) => Promise<unknown>; onDelete: () => Promise<unknown> }) {
  const [draft, setDraft] = useState(value);
  useEffect(() => setDraft(value), [value]);

  return (
    <DocumentCard title={draft.title} badge={draft.status} onSave={() => onSave(draft)} onDelete={onDelete}>
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
            <SelectItem value="draft">draft</SelectItem>
            <SelectItem value="published">published</SelectItem>
          </SelectContent>
        </Select>
        <Input type="number" value={draft.sortOrder} onChange={(event) => setDraft({ ...draft, sortOrder: Number(event.target.value) || 0 })} placeholder="Sort order" />
        <Input type="date" value={draft.publishedAt.slice(0, 10)} onChange={(event) => setDraft({ ...draft, publishedAt: event.target.value })} />
      </div>
      <Textarea value={draft.excerpt} onChange={(event) => setDraft({ ...draft, excerpt: event.target.value })} placeholder="Post excerpt" rows={3} />
      <ImageFields label="Cover Image" value={draft.coverImage} onChange={(next) => setDraft({ ...draft, coverImage: next })} />
      <SeoEditor value={draft.seo} onChange={(next) => setDraft({ ...draft, seo: next })} />
      <SectionsEditor value={draft.sections} onChange={(next) => setDraft({ ...draft, sections: next })} />
    </DocumentCard>
  );
}

function LegalEditorCard({ value, onSave, onDelete }: { value: CmsLegalDocument; onSave: (document: CmsLegalDocument) => Promise<unknown>; onDelete: () => Promise<unknown> }) {
  const [draft, setDraft] = useState(value);
  useEffect(() => setDraft(value), [value]);

  return (
    <DocumentCard title={draft.title} badge={draft.status} onSave={() => onSave(draft)} onDelete={onDelete}>
      <div className="grid gap-3 lg:grid-cols-4">
        <Input value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} placeholder="Title" />
        <Input value={draft.slug} onChange={(event) => setDraft({ ...draft, slug: event.target.value, seo: { ...draft.seo, slug: event.target.value } })} placeholder="Slug" />
        <Select value={draft.status} onValueChange={(status) => setDraft({ ...draft, status: status as CmsLegalDocument["status"] })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="draft">draft</SelectItem>
            <SelectItem value="published">published</SelectItem>
          </SelectContent>
        </Select>
        <Input type="number" value={draft.sortOrder} onChange={(event) => setDraft({ ...draft, sortOrder: Number(event.target.value) || 0 })} placeholder="Sort order" />
      </div>
      <Textarea value={draft.summary} onChange={(event) => setDraft({ ...draft, summary: event.target.value })} placeholder="Summary" rows={3} />
      <SeoEditor value={draft.seo} onChange={(next) => setDraft({ ...draft, seo: next })} />
      <SectionsEditor value={draft.sections} onChange={(next) => setDraft({ ...draft, sections: next })} />
    </DocumentCard>
  );
}

function FaqEditorCard({ value, onSave, onDelete }: { value: CmsFaq; onSave: (faq: CmsFaq) => Promise<unknown>; onDelete: () => Promise<unknown> }) {
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
            <SelectItem value="draft">draft</SelectItem>
            <SelectItem value="published">published</SelectItem>
          </SelectContent>
        </Select>
        <Input type="number" value={draft.sortOrder} onChange={(event) => setDraft({ ...draft, sortOrder: Number(event.target.value) || 0 })} placeholder="Sort order" />
      </div>
      <Textarea value={draft.answer} onChange={(event) => setDraft({ ...draft, answer: event.target.value })} placeholder="Answer" rows={5} />
    </DocumentCard>
  );
}

function TestimonialEditorCard({ value, onSave, onDelete }: { value: CmsTestimonial; onSave: (testimonial: CmsTestimonial) => Promise<unknown>; onDelete: () => Promise<unknown> }) {
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
            <SelectItem value="draft">draft</SelectItem>
            <SelectItem value="published">published</SelectItem>
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

function TeamEditorCard({ value, onSave, onDelete }: { value: CmsTeamMember; onSave: (member: CmsTeamMember) => Promise<unknown>; onDelete: () => Promise<unknown> }) {
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
            <SelectItem value="draft">draft</SelectItem>
            <SelectItem value="published">published</SelectItem>
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

function MediaEditorCard({ value, onSave, onDelete }: { value: CmsMediaAsset; onSave: (asset: CmsMediaAsset) => Promise<unknown>; onDelete: () => Promise<unknown> }) {
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

function AnnouncementEditorCard({ value, onSave, onDelete }: { value: CmsAnnouncement; onSave: (announcement: CmsAnnouncement) => Promise<unknown>; onDelete: () => Promise<unknown> }) {
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
          <SelectItem value="draft">draft</SelectItem>
          <SelectItem value="published">published</SelectItem>
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

function SiteSettingsEditor({ value, onSave }: { value: CmsSiteSettings; onSave: (settings: CmsSiteSettings) => Promise<unknown> }) {
  const [draft, setDraft] = useState(value);
  useEffect(() => setDraft(value), [value]);

  return (
    <DocumentCard title="Site Settings" onSave={() => onSave(draft)}>
      <div className="grid gap-3 lg:grid-cols-2">
        <Input value={draft.brand.siteName} onChange={(event) => setDraft({ ...draft, brand: { ...draft.brand, siteName: event.target.value } })} placeholder="Site name" />
        <Input value={draft.brand.tagline} onChange={(event) => setDraft({ ...draft, brand: { ...draft.brand, tagline: event.target.value } })} placeholder="Tagline" />
      </div>
      <ImageFields label="Logo" value={draft.brand.logo} onChange={(next) => setDraft({ ...draft, brand: { ...draft.brand, logo: next } })} />
      <div className="grid gap-3 lg:grid-cols-3">
        <Input value={draft.contact.phone} onChange={(event) => setDraft({ ...draft, contact: { ...draft.contact, phone: event.target.value } })} placeholder="Phone" />
        <Input value={draft.contact.email} onChange={(event) => setDraft({ ...draft, contact: { ...draft.contact, email: event.target.value } })} placeholder="Email" />
        <Input value={draft.contact.address} onChange={(event) => setDraft({ ...draft, contact: { ...draft.contact, address: event.target.value } })} placeholder="Address" />
      </div>
      <Textarea value={draft.contact.supportHours.join("\n")} onChange={(event) => setDraft({ ...draft, contact: { ...draft.contact, supportHours: event.target.value.split("\n").map((line) => line.trim()).filter(Boolean) } })} rows={3} placeholder="Support hours, one per line" />
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
      <NavigationEditor value={draft.navigation.primaryItems} onChange={(next) => setDraft({ ...draft, navigation: { ...draft.navigation, primaryItems: next } })} />
      <SocialEditor value={draft.socialLinks} onChange={(next) => setDraft({ ...draft, socialLinks: next })} />
      <ItemsEditor value={draft.footer.highlightItems} onChange={(next) => setDraft({ ...draft, footer: { ...draft.footer, highlightItems: next } })} />
      <NavigationEditor value={draft.footer.legalLinks} onChange={(next) => setDraft({ ...draft, footer: { ...draft.footer, legalLinks: next } })} />
      <Textarea value={draft.footer.summary} onChange={(event) => setDraft({ ...draft, footer: { ...draft.footer, summary: event.target.value } })} rows={3} placeholder="Footer summary" />
      <div className="space-y-3 rounded-lg border p-4">
        <FieldLabel>Public UI Labels</FieldLabel>
        <div className="grid gap-3 lg:grid-cols-2">
          <Input value={draft.publicUi.servicesMenuTitle} onChange={(event) => setDraft({ ...draft, publicUi: { ...draft.publicUi, servicesMenuTitle: event.target.value } })} placeholder="Services menu title" />
          <Input value={draft.publicUi.servicesMenuActionLabel} onChange={(event) => setDraft({ ...draft, publicUi: { ...draft.publicUi, servicesMenuActionLabel: event.target.value } })} placeholder="Services menu action label" />
        </div>
        <div className="grid gap-3 lg:grid-cols-2">
          <Input value={draft.publicUi.portalButtonLabel} onChange={(event) => setDraft({ ...draft, publicUi: { ...draft.publicUi, portalButtonLabel: event.target.value } })} placeholder="Portal button label" />
          <Input value={draft.publicUi.appointmentButtonLabel} onChange={(event) => setDraft({ ...draft, publicUi: { ...draft.publicUi, appointmentButtonLabel: event.target.value } })} placeholder="Appointment button label" />
        </div>
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
      </div>
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
      <Textarea value={draft.appointmentSettings.warningText} onChange={(event) => setDraft({ ...draft, appointmentSettings: { ...draft.appointmentSettings, warningText: event.target.value } })} rows={3} placeholder="Appointment warning text" />
      <div className="grid gap-3 lg:grid-cols-3">
        <Textarea value={draft.appointmentSettings.patientStatuses.join("\n")} onChange={(event) => setDraft({ ...draft, appointmentSettings: { ...draft.appointmentSettings, patientStatuses: event.target.value.split("\n").map((line) => line.trim()).filter(Boolean) } })} rows={3} placeholder="Patient statuses" />
        <Textarea value={draft.appointmentSettings.visitTypes.join("\n")} onChange={(event) => setDraft({ ...draft, appointmentSettings: { ...draft.appointmentSettings, visitTypes: event.target.value.split("\n").map((line) => line.trim()).filter(Boolean) } })} rows={3} placeholder="Visit types" />
        <Textarea value={draft.appointmentSettings.locations.join("\n")} onChange={(event) => setDraft({ ...draft, appointmentSettings: { ...draft.appointmentSettings, locations: event.target.value.split("\n").map((line) => line.trim()).filter(Boolean) } })} rows={3} placeholder="Locations" />
      </div>
      <SeoEditor value={draft.defaultSeo} onChange={(next) => setDraft({ ...draft, defaultSeo: next })} />
    </DocumentCard>
  );
}

export default function CmsManagementPage() {
  const navigate = useNavigate();
  const { tab } = useParams<{ tab?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
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
  const requestedTab = tab ?? searchParams.get("tab");
  const activeTab: CmsTabValue = isCmsTabValue(requestedTab) ? requestedTab : "settings";

  const contentHealth = useMemo(
    () => [
      { label: "Pages", value: pages.length },
      { label: "Services", value: services.length },
      { label: "Blog Posts", value: posts.length },
      { label: "FAQs", value: faqs.length },
      { label: "Testimonials", value: testimonials.length },
      { label: "Media Assets", value: mediaAssets.length },
    ],
    [faqs.length, mediaAssets.length, pages.length, posts.length, services.length, testimonials.length],
  );

  if (isLoading || !settings) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[50vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Website CMS</h1>
            <p className="text-muted-foreground">Manage pages, services, FAQs, testimonials, blog posts, legal pages, media, navigation, branding, and SEO.</p>
          </div>
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
              Seed Starter Content
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
          {contentHealth.map((entry) => (
            <Card key={entry.label}>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">{entry.label}</p>
                <p className="mt-2 text-3xl font-black tracking-tight">{entry.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs
          value={activeTab}
          onValueChange={(nextValue) => {
            const nextTab = isCmsTabValue(nextValue) ? nextValue : "settings";
            if (tab) {
              navigate(`/cms/${nextTab}`, { replace: true });
              return;
            }

            const nextParams = new URLSearchParams(searchParams);
            nextParams.set("tab", nextTab);
            setSearchParams(nextParams, { replace: true });
          }}
          className="space-y-4"
        >
          <TabsList className="flex h-auto flex-wrap justify-start gap-2 bg-transparent p-0">
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="pages">Pages</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="blog">Blog</TabsTrigger>
            <TabsTrigger value="faqs">FAQs</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="legal">Policies</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="announcements">Announcements</TabsTrigger>
          </TabsList>

          <TabsContent value="settings" className="space-y-4">
            <SiteSettingsEditor value={settings} onSave={(next) => saveSettings.mutateAsync(next)} />
          </TabsContent>

          <TabsContent value="pages" className="space-y-4">
            <Button type="button" onClick={() => savePage.mutateAsync(createBlankPage())}>
              <Plus className="mr-2 h-4 w-4" />
              Add Page
            </Button>
            {pages.map((page) => (
              <PageEditorCard key={page.id} value={page} onSave={(next) => savePage.mutateAsync(next)} onDelete={() => deleteRecord.mutateAsync({ table: "cms_pages", id: page.id })} />
            ))}
          </TabsContent>

          <TabsContent value="services" className="space-y-4">
            <Button type="button" onClick={() => saveService.mutateAsync(createBlankService())}>
              <Plus className="mr-2 h-4 w-4" />
              Add Service
            </Button>
            {services.map((service) => (
              <ServiceEditorCard key={service.id} value={service} onSave={(next) => saveService.mutateAsync(next)} onDelete={() => deleteRecord.mutateAsync({ table: "cms_services", id: service.id })} />
            ))}
          </TabsContent>

          <TabsContent value="blog" className="space-y-4">
            <Button type="button" onClick={() => savePost.mutateAsync(createBlankPost())}>
              <Plus className="mr-2 h-4 w-4" />
              Add Blog Post
            </Button>
            {posts.map((post) => (
              <BlogEditorCard key={post.id} value={post} onSave={(next) => savePost.mutateAsync(next)} onDelete={() => deleteRecord.mutateAsync({ table: "cms_blog_posts", id: post.id })} />
            ))}
          </TabsContent>

          <TabsContent value="faqs" className="space-y-4">
            <Button type="button" onClick={() => saveFaq.mutateAsync(createBlankFaq())}>
              <Plus className="mr-2 h-4 w-4" />
              Add FAQ
            </Button>
            {faqs.map((faq) => (
              <FaqEditorCard key={faq.id} value={faq} onSave={(next) => saveFaq.mutateAsync(next)} onDelete={() => deleteRecord.mutateAsync({ table: "cms_faqs", id: faq.id })} />
            ))}
          </TabsContent>

          <TabsContent value="testimonials" className="space-y-4">
            <Button type="button" onClick={() => saveTestimonial.mutateAsync(createBlankTestimonial())}>
              <Plus className="mr-2 h-4 w-4" />
              Add Testimonial
            </Button>
            {testimonials.map((testimonial) => (
              <TestimonialEditorCard key={testimonial.id} value={testimonial} onSave={(next) => saveTestimonial.mutateAsync(next)} onDelete={() => deleteRecord.mutateAsync({ table: "cms_testimonials", id: testimonial.id })} />
            ))}
          </TabsContent>

          <TabsContent value="team" className="space-y-4">
            <Button type="button" onClick={() => saveTeamMember.mutateAsync(createBlankTeamMember())}>
              <Plus className="mr-2 h-4 w-4" />
              Add Team Member
            </Button>
            {teamMembers.map((member) => (
              <TeamEditorCard key={member.id} value={member} onSave={(next) => saveTeamMember.mutateAsync(next)} onDelete={() => deleteRecord.mutateAsync({ table: "cms_team_members", id: member.id })} />
            ))}
          </TabsContent>

          <TabsContent value="legal" className="space-y-4">
            <Button type="button" onClick={() => saveLegal.mutateAsync(createBlankLegal())}>
              <Plus className="mr-2 h-4 w-4" />
              Add Legal Page
            </Button>
            {legalDocuments.map((document) => (
              <LegalEditorCard key={document.id} value={document} onSave={(next) => saveLegal.mutateAsync(next)} onDelete={() => deleteRecord.mutateAsync({ table: "cms_legal_documents", id: document.id })} />
            ))}
          </TabsContent>

          <TabsContent value="media" className="space-y-4">
            <Button type="button" onClick={() => saveMedia.mutateAsync(createBlankMediaAsset())}>
              <Plus className="mr-2 h-4 w-4" />
              Add Media Asset
            </Button>
            {mediaAssets.map((asset) => (
              <MediaEditorCard key={asset.id} value={asset} onSave={(next) => saveMedia.mutateAsync(next)} onDelete={() => deleteMedia.mutateAsync(asset)} />
            ))}
          </TabsContent>

          <TabsContent value="announcements" className="space-y-4">
            <Button type="button" onClick={() => saveAnnouncement.mutateAsync(createBlankAnnouncement())}>
              <Plus className="mr-2 h-4 w-4" />
              Add Announcement
            </Button>
            {announcements.map((announcement) => (
              <AnnouncementEditorCard key={announcement.id} value={announcement} onSave={(next) => saveAnnouncement.mutateAsync(next)} onDelete={() => deleteRecord.mutateAsync({ table: "cms_announcements", id: announcement.id })} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
