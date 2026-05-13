import type {
  CmsButton,
  CmsDataSource,
  CmsImage,
  CmsItem,
  CmsSection,
  CmsSectionTheme,
  CmsSectionType,
} from "./types";

export function createCmsId(prefix = "cms") {
  const random = typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : Math.random().toString(36).slice(2);
  return `${prefix}-${random}`;
}

export function cloneCmsValue<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

export function normalizeCmsSlug(value: string) {
  return value
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

export function createEmptyImage(): CmsImage {
  return { url: "", alt: "" };
}

export function createEmptyButton(): CmsButton {
  return {
    id: createCmsId("button"),
    label: "",
    href: "",
    variant: "primary",
    newTab: false,
  };
}

export function createEmptyItem(): CmsItem {
  return {
    id: createCmsId("item"),
    title: "New item",
    description: "",
    bullets: [],
    metadata: [],
  };
}

export function createEmptySection(type: CmsSectionType = "richText"): CmsSection {
  return {
    id: createCmsId("section"),
    type,
    name: "New section",
    isVisible: true,
    theme: "light",
    dataSource: "manual",
    title: "Section title",
    subtitle: "",
    body: "",
    buttons: [],
    items: [],
    columns: 3,
    style: "grid",
  };
}

export function isCollectionDrivenSection(dataSource: CmsDataSource) {
  return dataSource !== "manual";
}

export function getSectionThemeClasses(theme: CmsSectionTheme) {
  switch (theme) {
    case "primary":
      return "bg-[var(--cms-primary)] text-white";
    case "accent":
      return "bg-[var(--cms-accent)]/10 text-[var(--cms-text)]";
    case "muted":
      return "bg-[var(--cms-soft)] text-[var(--cms-text)]";
    default:
      return "bg-white text-[var(--cms-text)]";
  }
}
