export type CmsStatus = "draft" | "published" | "deleted";

export type CmsSectionType =
  | "hero"
  | "richText"
  | "featureGrid"
  | "stats"
  | "serviceList"
  | "testimonialList"
  | "faqList"
  | "cta"
  | "teamGrid"
  | "gallery"
  | "timeline"
  | "blogFeed"
  | "contactCards";

export type CmsSectionTheme = "light" | "muted" | "primary" | "accent";
export type CmsDataSource = "manual" | "services" | "testimonials" | "faqs" | "team" | "blog-posts";
export type CmsButtonVariant = "primary" | "secondary" | "outline" | "ghost";

export type CmsPageType = "home" | "about" | "services" | "contact" | "faq" | "blog" | "legal" | "standard";

export type CmsIconName =
  | "activity"
  | "ambulance"
  | "arrow-right"
  | "baby"
  | "bone"
  | "book-open"
  | "brain"
  | "building"
  | "calendar"
  | "camera"
  | "check-circle"
  | "clock"
  | "eye"
  | "file-text"
  | "globe"
  | "hand-heart"
  | "heart"
  | "lock"
  | "mail"
  | "map-pin"
  | "megaphone"
  | "message-square"
  | "microscope"
  | "phone"
  | "pill"
  | "shield"
  | "sparkles"
  | "star"
  | "stethoscope"
  | "target"
  | "user-round"
  | "users";

export interface CmsImage {
  url: string;
  alt: string;
  publicId?: string;
  width?: number;
  height?: number;
}

export interface CmsButton {
  id: string;
  label: string;
  href: string;
  variant: CmsButtonVariant;
  newTab?: boolean;
}

export interface CmsItem {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  value?: string;
  icon?: CmsIconName;
  image?: CmsImage;
  href?: string;
  badge?: string;
  bullets?: string[];
  metadata?: string[];
}

export interface CmsSection {
  id: string;
  type: CmsSectionType;
  name: string;
  isVisible: boolean;
  theme: CmsSectionTheme;
  dataSource: CmsDataSource;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  body?: string;
  image?: CmsImage;
  backgroundImage?: CmsImage;
  buttons: CmsButton[];
  items: CmsItem[];
  columns?: 1 | 2 | 3 | 4;
  style?: "grid" | "band" | "split";
}

export interface CmsSeo {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  ogImage?: CmsImage;
  canonicalUrl?: string;
  slug?: string;
}

export interface CmsPage {
  id: string;
  slug: string;
  title: string;
  navigationLabel: string;
  pageType: CmsPageType;
  status: CmsStatus;
  sortOrder: number;
  showInNavigation: boolean;
  excerpt: string;
  seo: CmsSeo;
  sections: CmsSection[];
}

export interface CmsService {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  categoryLabel: string;
  status: CmsStatus;
  sortOrder: number;
  featuredOnHome: boolean;
  featuredInNavigation: boolean;
  excerpt: string;
  summary: string;
  icon: CmsIconName;
  previewImage: CmsImage;
  seo: CmsSeo;
  sections: CmsSection[];
}

export interface CmsBlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  authorName: string;
  status: CmsStatus;
  sortOrder: number;
  excerpt: string;
  coverImage: CmsImage;
  publishedAt: string;
  seo: CmsSeo;
  sections: CmsSection[];
}

export interface CmsFaq {
  id: string;
  question: string;
  answer: string;
  category: string;
  status: CmsStatus;
  sortOrder: number;
  pageSlug?: string;
  serviceSlug?: string;
}

export interface CmsTestimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  rating: number;
  status: CmsStatus;
  sortOrder: number;
  image?: CmsImage;
  pageSlug?: string;
  serviceSlug?: string;
}

export interface CmsTeamMember {
  id: string;
  name: string;
  role: string;
  specialty?: string;
  bio: string;
  status: CmsStatus;
  sortOrder: number;
  image?: CmsImage;
  email?: string;
  phone?: string;
  serviceSlug?: string;
}

export interface CmsLegalDocument {
  id: string;
  slug: string;
  title: string;
  summary: string;
  status: CmsStatus;
  sortOrder: number;
  seo: CmsSeo;
  sections: CmsSection[];
}

export interface CmsMediaAsset {
  id: string;
  name: string;
  alt: string;
  url: string;
  type: "image" | "video" | "file";
  status: CmsStatus;
  sortOrder: number;
  cloudinaryPublicId?: string;
  folder?: string;
  tags: string[];
  width?: number;
  height?: number;
}

export interface CmsAnnouncement {
  id: string;
  title: string;
  body: string;
  status: CmsStatus;
  sortOrder: number;
  href?: string;
  buttonLabel?: string;
}

export interface CmsNavigationItem {
  id: string;
  label: string;
  href: string;
  type: "page" | "external" | "anchor" | "services-menu";
}

export interface CmsSocialLink {
  id: string;
  label: string;
  href: string;
  icon: CmsIconName;
}

export interface CmsSiteSettings {
  id: string;
  brand: {
    siteName: string;
    tagline: string;
    logo: CmsImage;
  };
  contact: {
    phone: string;
    email: string;
    address: string;
    supportHours: string[];
  };
  socialLinks: CmsSocialLink[];
  navigation: {
    primaryItems: CmsNavigationItem[];
  };
  footer: {
    summary: string;
    highlightItems: CmsItem[];
    legalLinks: CmsNavigationItem[];
  };
  publicUi: {
    servicesMenuTitle: string;
    servicesMenuActionLabel: string;
    portalButtonLabel: string;
    appointmentButtonLabel: string;
    footerCtaTitle: string;
    footerPhoneLabel: string;
    footerPhoneDescription: string;
    footerAppointmentLabel: string;
    footerAppointmentDescription: string;
    footerPortalTitle: string;
    footerPortalDescription: string;
    footerPortalLinkLabel: string;
  };
  announcementBar: {
    isVisible: boolean;
    text: string;
    href?: string;
    buttonLabel?: string;
  };
  appointmentSettings: {
    patientStatuses: string[];
    visitTypes: string[];
    locations: string[];
    warningText: string;
  };
  theme: {
    primaryColor: string;
    accentColor: string;
    softColor: string;
    backgroundColor: string;
    textColor: string;
    footerColor: string;
  };
  defaultSeo: CmsSeo;
}

export interface CmsSeedBundle {
  settings: CmsSiteSettings;
  pages: CmsPage[];
  services: CmsService[];
  posts: CmsBlogPost[];
  faqs: CmsFaq[];
  testimonials: CmsTestimonial[];
  teamMembers: CmsTeamMember[];
  legalDocuments: CmsLegalDocument[];
  mediaAssets: CmsMediaAsset[];
  announcements: CmsAnnouncement[];
}
