import aboutBuildingImage from "@/assets/about-building-design.png";
import aboutHeroImage from "@/assets/about-hero-design-cleaner.png";
import blogUrgentImage from "@/assets/mockup-blog-urgent.jpg";
import blogWellnessImage from "@/assets/mockup-blog-wellness.jpg";
import buildingImage from "@/assets/mockup-building.jpg";
import heroImage from "@/assets/mockup-hero-doctor-patient.jpg";
import logoImage from "@/assets/logo-ontime.png";
import resourceImage from "@/assets/mockup-resources-woman.jpg";
import secondaryImage from "@/assets/services-family-banner.jpg";
import {
  Activity,
  Bandage,
  BookOpenText,
  Brain,
  CalendarDays,
  ClipboardCheck,
  ClipboardList,
  Clock3,
  Ear,
  Eye,
  HandHeart,
  Heart,
  HeartHandshake,
  HeartPulse,
  Lock,
  MapPin,
  MoonStar,
  NotebookPen,
  Phone,
  Pill,
  ShieldCheck,
  Stethoscope,
  Syringe,
  TestTube2,
  UserRound,
  Users,
  Users2,
  type LucideIcon,
} from "lucide-react";
import {
  getServicePageContent,
  serviceDirectoryCards,
  type ServiceAction,
  type ServiceBadge,
  type ServiceBullet,
  type ServiceBulletPanel,
  type ServiceChoice,
  type ServiceFooterColumn,
  type ServiceOffering,
  type ServicePageSlug,
  type ServiceStageBandItem,
} from "@/data/servicePageContent";
import { createCmsId } from "./utils";
import type {
  CmsAnnouncement,
  CmsBlogPost,
  CmsButton,
  CmsFaq,
  CmsImage,
  CmsItem,
  CmsLegalDocument,
  CmsMediaAsset,
  CmsPage,
  CmsSection,
  CmsSectionTheme,
  CmsSeedBundle,
  CmsSeo,
  CmsService,
  CmsSiteSettings,
  CmsTeamMember,
  CmsTestimonial,
} from "./types";

const siteUrl = "https://ontimemedicalgroup.com";

function image(url: string, alt: string): CmsImage {
  return { url, alt };
}

function button(label: string, href: string, variant: CmsButton["variant"] = "primary"): CmsButton {
  return { id: createCmsId("button"), label, href, variant };
}

function item(title: string, description = "", overrides: Partial<CmsItem> = {}): CmsItem {
  return {
    id: createCmsId("item"),
    title,
    description,
    bullets: [],
    metadata: [],
    ...overrides,
  };
}

function seo(metaTitle: string, metaDescription: string, slug: string, ogImage?: CmsImage): CmsSeo {
  return {
    metaTitle,
    metaDescription,
    keywords: ["healthcare", "medical clinic", "primary care", "wellness", "telehealth"],
    canonicalUrl: `${siteUrl}/${slug}`.replace(/\/home$/, "/"),
    slug,
    ogImage,
  };
}

function section(
  type: CmsSection["type"],
  title: string,
  overrides: Partial<CmsSection> = {},
  theme: CmsSectionTheme = "light",
): CmsSection {
  return {
    id: createCmsId("section"),
    type,
    name: title,
    isVisible: true,
    theme,
    dataSource: "manual",
    title,
    subtitle: "",
    body: "",
    buttons: [],
    items: [],
    columns: 3,
    style: "grid",
    ...overrides,
  };
}

function heroSection(
  title: string,
  subtitle: string,
  heroImage: CmsImage,
  overrides: Partial<CmsSection> = {},
): CmsSection {
  return section(
    "hero",
    title,
    {
      subtitle,
      image: heroImage,
      buttons: [button("Book Appointment", "/services"), button("Contact Us", "/contact", "outline")],
      items: [],
      ...overrides,
    },
    "light",
  );
}

function richTextSection(title: string, body: string, overrides: Partial<CmsSection> = {}) {
  return section("richText", title, { body, ...overrides });
}

function featureGridSection(title: string, itemsList: CmsItem[], overrides: Partial<CmsSection> = {}) {
  return section("featureGrid", title, { items: itemsList, ...overrides });
}

function statsSection(title: string, itemsList: CmsItem[], overrides: Partial<CmsSection> = {}) {
  return section("stats", title, { items: itemsList, style: "band", ...overrides }, "muted");
}

function ctaSection(title: string, body: string, actions: CmsButton[], overrides: Partial<CmsSection> = {}) {
  return section("cta", title, { body, buttons: actions, ...overrides }, "primary");
}

function serviceListSection(title: string, subtitle: string, overrides: Partial<CmsSection> = {}) {
  return section(
    "serviceList",
    title,
    {
      subtitle,
      dataSource: "services",
      items: [],
      columns: 3,
      ...overrides,
    },
    "light",
  );
}

function testimonialSection(title: string, subtitle: string, overrides: Partial<CmsSection> = {}) {
  return section(
    "testimonialList",
    title,
    {
      subtitle,
      dataSource: "testimonials",
      items: [],
      columns: 3,
      ...overrides,
    },
    "muted",
  );
}

function faqSection(title: string, subtitle: string, overrides: Partial<CmsSection> = {}) {
  return section(
    "faqList",
    title,
    {
      subtitle,
      dataSource: "faqs",
      items: [],
      columns: 1,
      ...overrides,
    },
    "light",
  );
}

function teamSection(title: string, subtitle: string, overrides: Partial<CmsSection> = {}) {
  return section(
    "teamGrid",
    title,
    {
      subtitle,
      dataSource: "team",
      items: [],
      columns: 3,
      ...overrides,
    },
    "light",
  );
}

function blogFeedSection(title: string, subtitle: string, overrides: Partial<CmsSection> = {}) {
  return section(
    "blogFeed",
    title,
    {
      subtitle,
      dataSource: "blog-posts",
      items: [],
      columns: 3,
      ...overrides,
    },
    "light",
  );
}

function timelineSection(title: string, itemsList: CmsItem[], overrides: Partial<CmsSection> = {}) {
  return section("timeline", title, { items: itemsList, columns: 4, ...overrides }, "muted");
}

function contactCardsSection(title: string, itemsList: CmsItem[], overrides: Partial<CmsSection> = {}) {
  return section("contactCards", title, { items: itemsList, columns: 3, ...overrides }, "muted");
}

function gallerySection(title: string, itemsList: CmsItem[], overrides: Partial<CmsSection> = {}) {
  return section("gallery", title, { items: itemsList, columns: 3, ...overrides }, "light");
}

const cmsServiceIconMap = new Map<LucideIcon, CmsService["icon"]>([
  [Activity, "activity"],
  [Bandage, "bandage"],
  [BookOpenText, "book-open"],
  [Brain, "brain"],
  [CalendarDays, "calendar"],
  [ClipboardCheck, "clipboard-check"],
  [ClipboardList, "clipboard-list"],
  [Clock3, "clock"],
  [Ear, "ear"],
  [Eye, "eye"],
  [HandHeart, "hand-heart"],
  [Heart, "heart"],
  [HeartHandshake, "heart-handshake"],
  [HeartPulse, "heart-pulse"],
  [Lock, "lock"],
  [MapPin, "map-pin"],
  [MoonStar, "moon-star"],
  [NotebookPen, "notebook-pen"],
  [Phone, "phone"],
  [Pill, "pill"],
  [ShieldCheck, "shield"],
  [Stethoscope, "stethoscope"],
  [Syringe, "syringe"],
  [TestTube2, "test-tube"],
  [UserRound, "user-round"],
  [Users, "users"],
  [Users2, "users-2"],
]);

function iconName(icon: LucideIcon, fallback: CmsService["icon"] = "sparkles"): CmsService["icon"] {
  return cmsServiceIconMap.get(icon) ?? fallback;
}

function accentBadge(accent: "red" | "blue") {
  return accent;
}

function buttonFromAction(action: ServiceAction): CmsButton {
  switch (action.kind) {
    case "appointment":
      return button(action.label, "appointment");
    case "phone":
      return button(action.label, action.href, "outline");
    default:
      return button(action.label, action.href, action.href.startsWith("/") ? "primary" : "outline");
  }
}

function itemFromBadge(badge: ServiceBadge): CmsItem {
  return item(badge.label, "", {
    icon: iconName(badge.icon),
    badge: accentBadge(badge.accent),
  });
}

function itemFromOffering(offering: ServiceOffering): CmsItem {
  return item(offering.title, offering.description, {
    icon: iconName(offering.icon),
    badge: accentBadge(offering.accent),
    bullets: offering.bullets ?? [],
  });
}

function itemFromBullet(bullet: ServiceBullet): CmsItem {
  return item(bullet.label ?? "", bullet.text, {
    subtitle: bullet.label ? bullet.text : "",
  });
}

function itemFromChoice(choice: ServiceChoice): CmsItem {
  return item(choice.title, choice.description, {
    icon: iconName(choice.icon),
  });
}

function itemFromStage(stage: ServiceStageBandItem): CmsItem {
  return item(stage.label, "", {
    icon: iconName(stage.icon),
    badge: accentBadge(stage.accent),
  });
}

function itemFromFooter(column: ServiceFooterColumn): CmsItem {
  return item(column.title, column.description, {
    value: column.emphasis,
    href: column.action?.kind === "appointment" ? "appointment" : column.action?.href,
    badge: column.action?.label,
    icon: iconName(column.icon),
  });
}

function richTextSectionFromBulletPanel(panel: ServiceBulletPanel): CmsSection {
  return richTextSection(panel.title, panel.intro ?? "", {
    name: panel.title.includes("Approach") ? "Approach Panel" : "Benefits Panel",
    subtitle: panel.note ?? "",
    items: panel.bullets.map(itemFromBullet),
    columns: panel.columns ?? 1,
  });
}

function sectionFromChoicePanel(name: string, title: string, intro: string, footnote: string | undefined, options: ServiceChoice[]): CmsSection {
  return contactCardsSection(title, options.map(itemFromChoice), {
    name,
    body: intro,
    subtitle: footnote ?? "",
    columns: 2,
  });
}

function createCmsServiceFromDesign(slug: ServicePageSlug): CmsService {
  const page = getServicePageContent(slug);
  const directoryCard = serviceDirectoryCards.find((card) => card.href === `/services/${slug}`);

  if (!page || !directoryCard) {
    throw new Error(`Missing service design source for "${slug}".`);
  }

  const previewImage = image(page.heroImage, `${page.breadcrumbLabel} hero image`);
  const heroTitle = page.titleLines.map((line) => line.text).join("\n");
  const sections: CmsSection[] = [
    heroSection(heroTitle, page.subtitle, previewImage, {
      name: "Hero Banner",
      eyebrow: page.breadcrumbLabel,
      body: page.description,
      buttons: [],
      items: page.heroBadges.map(itemFromBadge),
    }),
    ...page.offeringRows.map((row, index) =>
      featureGridSection(index === 0 ? page.sectionTitle : `Service Cards Row ${index + 1}`, row.map(itemFromOffering), {
        name: page.offeringsStyle === "condition" ? `Condition Cards Row ${index + 1}` : `Service Cards Row ${index + 1}`,
        subtitle: index === 0 ? page.sectionSubtitle : "",
        columns: row.length >= 4 ? 4 : row.length === 2 ? 2 : row.length === 1 ? 1 : 3,
        style: page.offeringsStyle === "split" ? "split" : "grid",
      }),
    ),
    richTextSectionFromBulletPanel(page.lowerLeftPanel),
  ];

  if (page.heroOverlayChoices?.length) {
    sections.push(sectionFromChoicePanel("Hero Overlay Choices", "Hero Overlay Choices", "", "", page.heroOverlayChoices));
  }

  if (page.lowerRightPanel.type === "ctaCard") {
    sections.push(
      ctaSection(page.lowerRightPanel.title, page.lowerRightPanel.intro, [buttonFromAction(page.lowerRightPanel.action)], {
        name: "Side CTA Card",
        subtitle: page.lowerRightPanel.footnote ?? "",
      }),
    );
  } else {
    sections.push(sectionFromChoicePanel("Choice Card", page.lowerRightPanel.title, page.lowerRightPanel.intro, page.lowerRightPanel.footnote, page.lowerRightPanel.options));
  }

  sections.push(
    statsSection(page.stageBand.title, page.stageBand.items.map(itemFromStage), {
      name: "Stage Band",
      body: page.stageBand.description,
    }),
  );

  sections.push(
    contactCardsSection("Footer CTA Cards", page.footerColumns.map(itemFromFooter), {
      name: "Footer CTA Cards",
      columns: 3,
    }),
  );

  return {
    id: createCmsId("service"),
    slug,
    title: directoryCard.title,
    shortTitle: page.navLabel,
    categoryLabel:
      slug === "mental-health-services" || slug === "substance-use-treatment" ? "Behavioral Health Service" : "Clinical Service",
    status: "published",
    sortOrder: 0,
    featuredOnHome: directoryCard.featuredOnHome ?? false,
    featuredInNavigation: true,
    excerpt: directoryCard.description,
    summary: page.description,
    icon: iconName(directoryCard.icon, "stethoscope"),
    previewImage,
    seo: seo(directoryCard.title, `${page.subtitle} ${page.description}`.trim(), `services/${slug}`, previewImage),
    sections,
  };
}

const settings: CmsSiteSettings = {
  id: "default",
  brand: {
    siteName: "On Time Medical Group",
    tagline: "Compassionate care. Clear access. Reliable follow-through.",
    logo: image(logoImage, "On Time Medical Group logo"),
  },
  contact: {
    phone: "410-754-4343",
    email: "care@ontimemedical.com",
    address: "1500 Wellness Avenue, Medical District",
    supportHours: ["Mon-Fri: 8:00 AM - 6:00 PM", "Sat: 9:00 AM - 2:00 PM", "Emergency support available 24/7"],
  },
  socialLinks: [
    { id: createCmsId("social"), label: "Facebook", href: "https://facebook.com/ontimemedical", icon: "globe" },
    { id: createCmsId("social"), label: "Instagram", href: "https://instagram.com/ontimemedical", icon: "camera" },
    { id: createCmsId("social"), label: "LinkedIn", href: "https://linkedin.com/company/ontimemedical", icon: "building" },
  ],
  navigation: {
    primaryItems: [
      { id: createCmsId("nav"), label: "Home", href: "/", type: "page" },
      { id: createCmsId("nav"), label: "Services", href: "/services", type: "services-menu" },
      { id: createCmsId("nav"), label: "About Us", href: "/about-us", type: "page" },
      { id: createCmsId("nav"), label: "Blog", href: "/blog", type: "page" },
      { id: createCmsId("nav"), label: "FAQs", href: "/faq", type: "page" },
      { id: createCmsId("nav"), label: "Contact", href: "/contact", type: "page" },
    ],
  },
  footer: {
    summary: "We're here to help you live a healthier, happier life.",
    highlightItems: [
      item("Same-Day Appointments Available", "Get the care you need, when you need it.", { icon: "calendar" }),
      item("Most Insurance Plans Accepted", "We accept most major insurance plans.", { icon: "shield" }),
      item("All-in-One Care", "Primary care, mental health, and substance use treatment under one roof.", { icon: "user-round" }),
      item("Convenient Locations", "Accessible care close to home.", { icon: "map-pin" }),
      item("Compassionate Team", "A dedicated team here to support you.", { icon: "hand-heart" }),
    ],
    legalLinks: [
      { id: createCmsId("legal-link"), label: "Privacy Policy", href: "/policies/privacy-policy", type: "page" },
      { id: createCmsId("legal-link"), label: "Terms of Service", href: "/policies/terms-of-service", type: "page" },
    ],
  },
  publicUi: {
    servicesMenuTitle: "Explore Care Services",
    servicesMenuActionLabel: "View All Services",
    portalButtonLabel: "Patient Portal Login",
    appointmentButtonLabel: "Book Appointment",
    footerCtaTitle: "Ready to take the next step?",
    footerPhoneLabel: "Call Us Today",
    footerPhoneDescription: "Our team is here to help you.",
    footerAppointmentLabel: "Book Appointment Now",
    footerAppointmentDescription: "Appointments available in-office or via telehealth.",
    footerPortalTitle: "Patient Portal Login",
    footerPortalDescription: "Access your health information, appointments, and more.",
    footerPortalLinkLabel: "Login Now",
  },
  announcementBar: {
    isVisible: true,
    text: "Now accepting new patients for primary care, preventive care, and behavioral health services.",
    href: "/contact",
    buttonLabel: "Contact Us",
  },
  appointmentSettings: {
    patientStatuses: ["New patient", "Existing patient", "Referral"],
    visitTypes: ["In-person", "Telehealth", "First available"],
    locations: ["Main Campus", "Specialty Center", "Family Care Pavilion"],
    warningText: "For chest pain, severe bleeding, trouble breathing, or other emergencies, call 911 or go to the nearest emergency room immediately.",
  },
  theme: {
    primaryColor: "#13306b",
    accentColor: "#ef2027",
    softColor: "#f4f8ff",
    backgroundColor: "#ffffff",
    textColor: "#13306b",
    footerColor: "#10306a",
  },
  defaultSeo: seo(
    "On Time Medical Group",
    "Compassionate primary care, mental health, urgent care, and wellness services for individuals and families.",
    "home",
    image(heroImage, "Doctor discussing care with a patient"),
  ),
};

const pages: CmsPage[] = [
  {
    id: createCmsId("page"),
    slug: "home",
    title: "Homepage",
    navigationLabel: "Home",
    pageType: "home",
    status: "published",
    sortOrder: 1,
    showInNavigation: true,
    excerpt: "The public homepage featuring services, patient resources, testimonials, and contact information.",
    seo: seo(
      "Comprehensive Healthcare That's On Time",
      "Compassionate primary care, mental health, urgent care, and wellness services for individuals and families.",
      "home",
      image(heroImage, "Doctor discussing care with a patient"),
    ),
    sections: [
      heroSection(
        "Comprehensive Healthcare That's On Time. Every Time.",
        "Compassionate care for the whole family.",
        image(heroImage, "Doctor discussing care with a patient"),
        {
          body:
            "On Time Medical Group provides comprehensive primary care, mental health, and substance use treatment with compassion, convenience, and a commitment to your well-being.",
          buttons: [button("Book Appointment", "/contact"), button("Call 410-754-4343", "tel:+14107544343", "outline")],
          items: [
            item("Same-Day Appointments Available", "", { icon: "calendar" }),
            item("Most Insurance Plans Accepted", "", { icon: "shield", badge: "red" }),
            item("All-in-One Care Mind, Body, You.", "", { icon: "user-round" }),
            item("Convenient Locations Near You", "", { icon: "map-pin" }),
            item("Compassionate Care, Every Step of the Way", "", { icon: "hand-heart" }),
          ],
        },
      ),
      featureGridSection(
        "Telehealth callout",
        [
          item("Telehealth available for eligible services.", "Connect with your care team from the comfort of your home.", { icon: "book-open" }),
        ],
        {
          columns: 1,
        },
      ),
      serviceListSection("Our Services", "Comprehensive care for you and your family - at every stage of life.", {
        buttons: [button("View All Services", "/services")],
      }),
      richTextSection(
        "Why Choose Us?",
        "We're more than a healthcare provider - we're your partner in health. Our patient-centered approach ensures you get the right care, at the right time, every time.",
        {
          eyebrow: "About On Time Medical Group",
          buttons: [button("Learn More About Us", "/about-us", "outline")],
          image: image(buildingImage, "On Time Medical Group building exterior"),
          items: [
            item("Experienced providers you can trust"),
            item("Integrated services for whole-person wellness"),
            item("Telehealth options for your convenience"),
            item("Commitment to our community"),
          ],
        },
      ),
      statsSection("Care Highlights", [
        item("Patients Served", "", { value: "10,000+", icon: "user-round" }),
        item("Appointments", "", { value: "Same-Day", icon: "calendar" }),
        item("Insurance Accepted", "", { value: "Most Major", icon: "shield" }),
        item("Care", "", { value: "Patient Focused", icon: "heart" }),
      ]),
      richTextSection(
        "Patient Resources",
        "Everything you need to manage your care, all in one place.",
        {
          image: image(resourceImage, "Patient using a phone"),
          buttons: [button("Explore Resources", "/patient-register")],
          items: [
            item("New Patient Forms", "", { href: "/patient-register" }),
            item("Patient Portal", "", { href: "/patient-portal/login" }),
            item("FAQs", "", { href: "/faq" }),
            item("Health Tips", "", { href: "/blog" }),
          ],
        },
      ),
      blogFeedSection("Latest From Our Blog", "Helpful guidance and health tips from our team."),
      testimonialSection("What Our Patients Say", "Hear from patients who trust our team with their care."),
      gallerySection("We Accept Most Major Insurance Plans", [], {
        body: "...and many more.",
      }),
      ctaSection(
        "Ready to Take the Next Step?",
        "We're here to help you live a healthier, happier life on your time.",
        [button("Book Appointment", "/contact"), button("Call 410-754-4343", "tel:+14107544343", "outline")],
        {
          subtitle: "Appointments available in-office or via telehealth.",
        },
      ),
    ],
  },
  {
    id: createCmsId("page"),
    slug: "about-us",
    title: "About Us",
    navigationLabel: "About Us",
    pageType: "about",
    status: "published",
    sortOrder: 2,
    showInNavigation: true,
    excerpt: "Learn more about On Time Medical Group, our mission, and our commitment to patient-centered care.",
    seo: seo("About On Time Medical Group", "Learn more about our mission, our story, and the care values that guide our team.", "about-us", image(aboutHeroImage, "Doctor speaking with a patient")),
    sections: [
      heroSection(
        "About Us",
        "",
        image(aboutHeroImage, "Doctor speaking with a patient"),
        {
          body:
            "At On Time Medical Group, we provide high-quality, compassionate healthcare that's on time, every time. We're here to support you and your family on your health journey - today and for years to come.",
          items: [
            item("Patient Centered", "", { icon: "user-round" }),
            item("Quality Care", "", { icon: "shield", badge: "red" }),
            item("Integrated Care", "", { icon: "hand-heart" }),
            item("Stronger Together", "", { icon: "heart", badge: "red" }),
          ],
        },
      ),
      featureGridSection(
        "What defines the organization",
        [
          item("Experienced Providers", "Our team brings years of experience and a passion for patient care.", { icon: "calendar" }),
          item("Convenient Locations", "Multiple locations to serve you and your family better.", { icon: "map-pin" }),
          item("On-Time, Every Time", "We respect your time with efficient scheduling and timely appointments.", { icon: "clock" }),
          item("Comprehensive Healthcare", "We provide complete, coordinated care for your whole health and well-being.", { icon: "hand-heart" }),
        ],
      ),
      richTextSection("Our Mission", "To deliver timely, accessible, and comprehensive healthcare that empowers individuals and families to live healthier, fuller lives.", {
        image: image(aboutBuildingImage, "On Time Medical Group building exterior"),
      }),
      richTextSection("Our Story", "On Time Medical Group was founded with a simple belief: everyone deserves quality care - on time, every time. We bring together experienced providers and a wide range of services under one roof to meet your needs at every stage of life."),
      richTextSection("We Care For Our Community", "Proudly serving our neighbors and strengthening the communities we call home.", {
        items: [
          item("Culturally sensitive care"),
          item("Affordable & accessible services"),
          item("Accept most major insurance plans"),
          item("Telehealth available for eligible services"),
        ],
      }),
      gallerySection("We Accept Most Major Insurance Plans", [], {
        body: "...and many more.",
      }),
      ctaSection("Ready to Take the Next Step?", "We're here to help you live a healthier, happier life.", [button("Book Appointment Now", "/contact"), button("Patient Portal Login", "/patient-portal/login", "outline")]),
    ],
  },
  {
    id: createCmsId("page"),
    slug: "services",
    title: "Services",
    navigationLabel: "Services",
    pageType: "services",
    status: "published",
    sortOrder: 3,
    showInNavigation: true,
    excerpt: "Explore the services available at On Time Medical Group, from primary care to urgent care and behavioral health.",
    seo: seo("Our Services", "Explore the healthcare services available at On Time Medical Group for individuals and families.", "services", image(heroImage, "Doctor discussing care with a patient")),
    sections: [
      heroSection(
        "Our Services",
        "Comprehensive care for you and your family.",
        image(heroImage, "Doctor discussing care with a patient"),
        {
          body:
            "At On Time Medical Group, we offer a wide range of services designed to support your physical and mental well-being - every step of the way.",
          buttons: [button("Contact Care Team", "/contact"), button("View Blog", "/blog", "outline")],
          items: [
            item("Telehealth available for eligible services.", "Connect with your care team from the comfort of your home.", { icon: "book-open" }),
          ],
        },
      ),
      featureGridSection("Care Highlights", [
        item("Same-Day Appointments Available", "", { icon: "calendar" }),
        item("Most Insurance Plans Accepted", "", { icon: "shield", badge: "red" }),
        item("All-in-One Care Mind, Body, You.", "", { icon: "user-round" }),
        item("Convenient Locations Near You", "", { icon: "map-pin" }),
        item("Compassionate Care, Every Step of the Way", "", { icon: "hand-heart" }),
      ], {
        columns: 5,
      }),
      serviceListSection("Our Services Include", ""),
      richTextSection("We're Here For You", "Whether it's a routine check-up, mental health support, or urgent care, our team is here to help you feel your best - today and every day.", {
        image: image(secondaryImage, "Family sitting together on a couch"),
        buttons: [button("Book Appointment", "/contact"), button("Call 410-754-4343", "tel:+14107544343", "outline")],
      }),
      gallerySection("We Accept Most Major Insurance Plans", [], {
        body: "...and many more.",
      }),
    ],
  },
  {
    id: createCmsId("page"),
    slug: "contact",
    title: "Contact",
    navigationLabel: "Contact",
    pageType: "contact",
    status: "published",
    sortOrder: 4,
    showInNavigation: true,
    excerpt: "Get in touch with the On Time Medical Group team for appointments, questions, and patient support.",
    seo: seo("Contact Us", "Contact On Time Medical Group for appointments, patient support, and general questions.", "contact", image(buildingImage, "Medical building exterior")),
    sections: [
      heroSection(
        "Contact the care team",
        "We're here to help you schedule care, ask questions, and find the right next step.",
        image(buildingImage, "Medical building exterior"),
        {
          body: "Use this page for intake help, service inquiries, care coordination requests, insurance questions, or general patient support.",
          buttons: [button("Call 410-754-4343", "tel:+14107544343"), button("Email the clinic", "mailto:care@ontimemedical.com", "outline")],
        },
      ),
      contactCardsSection("Contact channels", [
        item("Call us", "410-754-4343", { icon: "phone", href: "tel:+14107544343" }),
        item("Email support", "care@ontimemedical.com", { icon: "mail", href: "mailto:care@ontimemedical.com" }),
        item("Visit us", "1500 Wellness Avenue, Medical District", { icon: "map-pin" }),
      ]),
      richTextSection(
        "Support hours and next steps",
        "Reach out during regular business hours for scheduling support, insurance questions, referrals, and general patient assistance. For urgent or life-threatening emergencies, call 911 or go to the nearest emergency room.",
      ),
      faqSection("Contact and scheduling FAQs", "Answers to common questions about appointments, support, and patient communication."),
      ctaSection("Need help getting started?", "Choose the option that works best for you and our team will help with the rest.", [button("Request Appointment", "/services"), button("Open Patient Portal", "/patient-portal/login", "outline")]),
    ],
  },
  {
    id: createCmsId("page"),
    slug: "faq",
    title: "FAQ",
    navigationLabel: "FAQs",
    pageType: "faq",
    status: "published",
    sortOrder: 5,
    showInNavigation: true,
    excerpt: "Answers to common questions about services, appointments, insurance, and patient support.",
    seo: seo("Frequently Asked Questions", "Find answers to common questions about appointments, services, insurance, and patient support.", "faq", image(resourceImage, "Patient resource photography")),
    sections: [
      heroSection(
        "Frequently asked questions",
        "Find quick answers about appointments, services, insurance, and patient support.",
        image(resourceImage, "Patient resources"),
        {
          body: "If you still need help after reading through these answers, our team is available by phone, email, or through the patient portal.",
        },
      ),
      faqSection("General FAQ collection", "Common questions from patients and families."),
      ctaSection("Still need help?", "Our team can help you find the right service, schedule a visit, or answer your questions.", [button("Contact Us", "/contact"), button("Browse Services", "/services", "outline")]),
    ],
  },
  {
    id: createCmsId("page"),
    slug: "blog",
    title: "Blog",
    navigationLabel: "Blog",
    pageType: "blog",
    status: "published",
    sortOrder: 6,
    showInNavigation: true,
    excerpt: "Patient education, wellness guidance, and healthcare updates from the On Time Medical Group team.",
    seo: seo("Health Blog", "Patient education, wellness guidance, and healthcare updates from On Time Medical Group.", "blog", image(blogWellnessImage, "Health blog photography")),
    sections: [
      heroSection(
        "Insights, updates, and patient education",
        "Helpful articles designed to support your health, answer questions, and guide everyday care decisions.",
        image(blogWellnessImage, "Health blog photography"),
        {
          body: "Use the blog collection for patient education, community updates, campaign content, or service-related trust building.",
          buttons: [button("Read Latest Posts", "/blog"), button("Contact the Team", "/contact", "outline")],
        },
      ),
      richTextSection(
        "Health information you can use",
        "From preventive care reminders to urgent-care guidance, our blog helps patients and families stay informed and prepared.",
      ),
      blogFeedSection("Latest articles", "Recent articles from our care and patient education teams."),
      ctaSection("Looking for care now?", "Explore our services or contact the team if you need help finding the right next step.", [button("Contact Us", "/contact"), button("View Services", "/services", "outline")]),
    ],
  },
];

const services: CmsService[] = serviceDirectoryCards.map((card, index) => {
  const slug = card.href.replace("/services/", "") as ServicePageSlug;
  const service = createCmsServiceFromDesign(slug);
  return {
    ...service,
    sortOrder: index + 1,
    featuredOnHome: card.featuredOnHome ?? false,
  };
});

const posts: CmsBlogPost[] = [
  {
    id: createCmsId("post"),
    slug: "when-to-choose-urgent-care",
    title: "When to Choose Urgent Care Instead of Waiting",
    category: "Urgent Care",
    authorName: "Clinical Communications Team",
    status: "published",
    sortOrder: 1,
    excerpt: "Help patients make faster, clearer decisions about non-emergency symptoms and care access.",
    coverImage: image(blogUrgentImage, "Urgent care article image"),
    publishedAt: "2026-05-12",
    seo: seo("When to Choose Urgent Care", "Patient guidance on when urgent care is the right choice for non-emergency symptoms and minor injuries.", "blog/when-to-choose-urgent-care", image(blogUrgentImage, "Urgent care article image")),
    sections: [
      heroSection("When to choose urgent care", "Learn when urgent care is the right next step for fast, non-emergency treatment.", image(blogUrgentImage, "Urgent care article image")),
      richTextSection(
        "Fast guidance for non-emergency symptoms",
        "Use urgent care for symptoms or injuries that need prompt attention but are not severe enough for the emergency room. Common reasons include cold and flu symptoms, minor cuts, sprains, rashes, and uncomplicated infections.",
      ),
      featureGridSection("Common examples", [
        item("Cold and flu symptoms", "Use blog cards to reinforce which symptoms are appropriate for urgent care.", { icon: "activity" }),
        item("Minor sprains or cuts", "Clarify injury examples and explain what patients should expect.", { icon: "shield" }),
        item("Testing and follow-up", "Tie urgent care messaging back into related services or contact flows.", { icon: "microscope" }),
      ]),
    ],
  },
  {
    id: createCmsId("post"),
    slug: "building-a-better-preventive-care-routine",
    title: "Building a Better Preventive Care Routine",
    category: "Preventive Care",
    authorName: "Patient Education Team",
    status: "published",
    sortOrder: 2,
    excerpt: "A practical guide to screenings, annual visits, and long-term wellness planning that the content team can keep fresh.",
    coverImage: image(blogWellnessImage, "Preventive care wellness article"),
    publishedAt: "2026-05-08",
    seo: seo("Build a Better Preventive Care Routine", "Practical guidance for wellness visits, screenings, vaccines, and long-term preventive care planning.", "blog/building-a-better-preventive-care-routine", image(blogWellnessImage, "Preventive care wellness article")),
    sections: [
      heroSection("Build a better preventive care routine", "Simple habits and regular screenings can make a meaningful difference over time.", image(blogWellnessImage, "Preventive care wellness article")),
      richTextSection(
        "Why prevention matters",
        "Patients are more likely to stay healthy when preventive care is part of a regular routine. Wellness visits, recommended screenings, vaccines, and follow-up on results all play a role in protecting long-term health.",
      ),
      featureGridSection("Simple habits that matter", [
        item("Schedule wellness visits", "Promote annual planning and consistent touchpoints.", { icon: "calendar" }),
        item("Keep screenings up to date", "Use current program language tied to actual service availability.", { icon: "shield" }),
        item("Follow through on results", "Connect posts back to contact, portal, or service pages.", { icon: "arrow-right" }),
      ]),
    ],
  },
  {
    id: createCmsId("post"),
    slug: "how-to-prepare-for-your-first-visit",
    title: "How to Prepare for Your First Visit",
    category: "Patient Resources",
    authorName: "Care Navigation Team",
    status: "published",
    sortOrder: 3,
    excerpt: "A simple checklist to help new patients feel prepared before their first appointment.",
    coverImage: image(buildingImage, "Healthcare website strategy article"),
    publishedAt: "2026-05-04",
    seo: seo("How to Prepare for Your First Visit", "A simple first-visit checklist for new patients at On Time Medical Group.", "blog/how-to-prepare-for-your-first-visit", image(buildingImage, "Healthcare website strategy article")),
    sections: [
      heroSection("How to prepare for your first visit", "A little preparation can make your first appointment smoother and less stressful.", image(buildingImage, "Healthcare website strategy article")),
      richTextSection(
        "What to bring and what to expect",
        "Bring a photo ID, insurance card, medication list, and any relevant medical records or referral notes. Arrive a few minutes early if you need to complete forms, and write down any symptoms, questions, or concerns you want to discuss with your care team.",
      ),
      featureGridSection("Helpful reminders", [
        item("Bring your essentials", "Have your ID, insurance details, and medication list ready.", { icon: "check-circle" }),
        item("Write down questions", "A short list helps you cover everything that matters during the visit.", { icon: "book-open" }),
        item("Know your next steps", "Ask about follow-up, prescriptions, labs, or referrals before you leave.", { icon: "building" }),
      ]),
    ],
  },
];

const faqs: CmsFaq[] = [
  { id: createCmsId("faq"), question: "Do you accept new patients?", answer: "Yes. We welcome new patients for a range of primary care, preventive care, and behavioral health services.", category: "General", status: "published", sortOrder: 1, pageSlug: "home" },
  { id: createCmsId("faq"), question: "What services do you offer?", answer: "Our team provides primary care, preventive care, chronic disease management, women's health, men's health, mental health services, substance use treatment, geriatric care, and urgent care.", category: "Services", status: "published", sortOrder: 2, pageSlug: "services" },
  { id: createCmsId("faq"), question: "How can I contact the clinic?", answer: "You can call, email, or use the patient portal to reach our team for appointments, questions, and follow-up support.", category: "Support", status: "published", sortOrder: 3, pageSlug: "faq" },
  { id: createCmsId("faq"), question: "Do you offer telehealth visits?", answer: "Yes. Telehealth is available for eligible services and follow-up care when appropriate.", category: "General", status: "published", sortOrder: 4, pageSlug: "home" },
  { id: createCmsId("faq"), question: "What should I expect during a primary care visit?", answer: "Your care team can use this answer to explain consultation flow, follow-up, lab coordination, or annual wellness expectations.", category: "Service FAQ", status: "published", sortOrder: 5, serviceSlug: "primary-care" },
  { id: createCmsId("faq"), question: "Do you offer same-day appointments for primary care?", answer: "Yes. Same-day appointments may be available depending on scheduling and the type of concern.", category: "Service FAQ", status: "published", sortOrder: 6, serviceSlug: "primary-care" },
  { id: createCmsId("faq"), question: "How often should I schedule preventive screenings?", answer: "That depends on your age, medical history, family history, and risk factors. Your provider can recommend the right schedule for you.", category: "Service FAQ", status: "published", sortOrder: 7, serviceSlug: "preventive-care" },
  { id: createCmsId("faq"), question: "Are preventive visits covered by insurance?", answer: "Coverage varies by plan, but many preventive services are covered. Our team can help you understand what to expect.", category: "Service FAQ", status: "published", sortOrder: 8, serviceSlug: "preventive-care" },
  { id: createCmsId("faq"), question: "How is chronic care follow-up organized?", answer: "Use this answer to explain check-ins, monitoring cadence, medication review, and care-coordination touchpoints.", category: "Service FAQ", status: "published", sortOrder: 9, serviceSlug: "chronic-disease-management" },
  { id: createCmsId("faq"), question: "Can chronic care content be personalized by program?", answer: "Yes. Sections can be adjusted for diabetes, hypertension, thyroid care, or broader care-management campaigns.", category: "Service FAQ", status: "published", sortOrder: 10, serviceSlug: "chronic-disease-management" },
  { id: createCmsId("faq"), question: "Do you support patients across different life stages?", answer: "Yes. Women's-health content can be organized around prevention, reproductive planning, menopause support, or broader wellness needs.", category: "Service FAQ", status: "published", sortOrder: 11, serviceSlug: "womens-health" },
  { id: createCmsId("faq"), question: "What women's health services do you provide?", answer: "We support preventive visits, reproductive wellness, hormonal care, and healthy aging with compassionate, whole-person care.", category: "Service FAQ", status: "published", sortOrder: 12, serviceSlug: "womens-health" },
  { id: createCmsId("faq"), question: "Can men's-health services cover preventive and lifestyle concerns?", answer: "Yes. The service page can explain screening, labs, cardiovascular health, and quality-of-life concerns together.", category: "Service FAQ", status: "published", sortOrder: 13, serviceSlug: "mens-health" },
  { id: createCmsId("faq"), question: "What concerns can men's health visits address?", answer: "Men's health visits can include preventive screening, lab review, lifestyle support, cardiovascular risk, and quality-of-life concerns.", category: "Service FAQ", status: "published", sortOrder: 14, serviceSlug: "mens-health" },
  { id: createCmsId("faq"), question: "Are virtual mental-health visits supported?", answer: "Yes. Mental-health service pages can present virtual and in-person care pathways side by side.", category: "Service FAQ", status: "published", sortOrder: 15, serviceSlug: "mental-health-services" },
  { id: createCmsId("faq"), question: "What can I expect from a first mental-health visit?", answer: "Your first visit may include a conversation about symptoms, history, goals, and the care options that fit your needs.", category: "Service FAQ", status: "published", sortOrder: 16, serviceSlug: "mental-health-services" },
  { id: createCmsId("faq"), question: "Is substance-use treatment information handled sensitively?", answer: "Yes. We approach recovery support with compassion, privacy, and respect for each patient's situation.", category: "Service FAQ", status: "published", sortOrder: 17, serviceSlug: "substance-use-treatment" },
  { id: createCmsId("faq"), question: "Can community resources be added to recovery pages?", answer: "Yes. Recovery support can include counseling, aftercare planning, and helpful community-based resources.", category: "Service FAQ", status: "published", sortOrder: 18, serviceSlug: "substance-use-treatment" },
  { id: createCmsId("faq"), question: "Can caregivers use the geriatric-care page for guidance?", answer: "Yes. Geriatric care often includes caregiver support, care coordination, and practical next-step guidance.", category: "Service FAQ", status: "published", sortOrder: 19, serviceSlug: "geriatric-care" },
  { id: createCmsId("faq"), question: "Can this page highlight memory or mobility support?", answer: "Yes. The block system is flexible enough to emphasize specific programs or concerns.", category: "Service FAQ", status: "published", sortOrder: 20, serviceSlug: "geriatric-care" },
  { id: createCmsId("faq"), question: "What conditions fit urgent care best?", answer: "Urgent-care content can clarify common non-emergency conditions and route patients to the right next step.", category: "Service FAQ", status: "published", sortOrder: 21, serviceSlug: "urgent-care" },
  { id: createCmsId("faq"), question: "Can urgent-care messaging change during high-volume periods?", answer: "Yes. Wait times, availability, and patient guidance may change based on volume, season, and clinic operations.", category: "Service FAQ", status: "published", sortOrder: 22, serviceSlug: "urgent-care" },
];

const testimonials: CmsTestimonial[] = [
  { id: createCmsId("testimonial"), quote: "The staff is so kind and professional. I always feel heard and cared for.", name: "Jessica M.", role: "Patient", rating: 5, status: "published", sortOrder: 1, pageSlug: "home" },
  { id: createCmsId("testimonial"), quote: "The primary-care page explains the care journey clearly and makes follow-up expectations easier to understand.", name: "Nia R.", role: "Primary care patient", rating: 5, status: "published", sortOrder: 2, serviceSlug: "primary-care" },
  { id: createCmsId("testimonial"), quote: "My preventive visit was thorough, encouraging, and easy to schedule. I left with a clear plan for follow-up.", name: "Carla S.", role: "Preventive care patient", rating: 5, status: "published", sortOrder: 3, serviceSlug: "preventive-care" },
  { id: createCmsId("testimonial"), quote: "The mental-health page feels more compassionate and practical now, and the FAQs answer what I needed before booking.", name: "Amina K.", role: "Behavioral health patient", rating: 5, status: "published", sortOrder: 4, serviceSlug: "mental-health-services" },
  { id: createCmsId("testimonial"), quote: "The services page made it easy to understand what care was available for my family and what to do next.", name: "Marcus T.", role: "Patient", rating: 5, status: "published", sortOrder: 5, pageSlug: "services" },
  { id: createCmsId("testimonial"), quote: "Urgent care was quick, professional, and reassuring when I needed help right away.", name: "Danielle R.", role: "Urgent care patient", rating: 5, status: "published", sortOrder: 6, serviceSlug: "urgent-care" },
];

const teamMembers: CmsTeamMember[] = [
  { id: createCmsId("team"), name: "Dr. Naomi Carter", role: "Medical Director", specialty: "Primary Care", bio: "Leads care-model design across primary care and chronic-care coordination programs.", status: "published", sortOrder: 1, serviceSlug: "primary-care", email: "naomi.carter@ontimemedical.com" },
  { id: createCmsId("team"), name: "Dr. Samuel Adeyemi", role: "Preventive Care Lead", specialty: "Population Health", bio: "Shapes screening, wellness, and prevention pathways across the network.", status: "published", sortOrder: 2, serviceSlug: "preventive-care", email: "samuel.adeyemi@ontimemedical.com" },
  { id: createCmsId("team"), name: "Dr. Lena Brooks", role: "Behavioral Health Director", specialty: "Mental Health", bio: "Oversees therapy, psychiatric consultation, and integrated behavioral-health programs.", status: "published", sortOrder: 3, serviceSlug: "mental-health-services", email: "lena.brooks@ontimemedical.com" },
  { id: createCmsId("team"), name: "Dr. Victor Hall", role: "Urgent Care Physician", specialty: "Acute Care", bio: "Supports urgent access pathways, high-volume scheduling, and rapid follow-up coordination.", status: "published", sortOrder: 4, serviceSlug: "urgent-care", email: "victor.hall@ontimemedical.com" },
  { id: createCmsId("team"), name: "Dr. Ruth Hammond", role: "Women's Health Specialist", specialty: "Women's Health", bio: "Leads whole-person women's-health programs spanning prevention, wellness, and hormonal care.", status: "published", sortOrder: 5, serviceSlug: "womens-health", email: "ruth.hammond@ontimemedical.com" },
  { id: createCmsId("team"), name: "Angela Morris, LCSW-C", role: "Recovery Program Lead", specialty: "Substance Use Treatment", bio: "Coordinates counseling, recovery support, and family-resource programs.", status: "published", sortOrder: 6, serviceSlug: "substance-use-treatment", email: "angela.morris@ontimemedical.com" },
];

const legalDocuments: CmsLegalDocument[] = [
  {
    id: createCmsId("legal"),
    slug: "privacy-policy",
    title: "Privacy Policy",
    summary: "Information about how patient and visitor information is collected, used, and protected.",
    status: "published",
    sortOrder: 1,
    seo: seo("Privacy Policy", "Learn how On Time Medical Group collects, uses, and protects patient and visitor information.", "policies/privacy-policy"),
    sections: [
      heroSection("Privacy Policy", "Learn how patient and visitor information is collected, used, and protected.", image(buildingImage, "Privacy policy header image")),
      richTextSection(
        "How information is handled",
        "This policy explains what information may be collected through the website, how it is used to support care and communication, how it is protected, and how patients can contact the organization with privacy questions.",
      ),
    ],
  },
  {
    id: createCmsId("legal"),
    slug: "terms-of-service",
    title: "Terms of Service",
    summary: "Terms that govern the use of this website and related patient communication tools.",
    status: "published",
    sortOrder: 2,
    seo: seo("Terms of Service", "Read the terms that govern use of the On Time Medical Group website and related services.", "policies/terms-of-service"),
    sections: [
      heroSection("Terms of Service", "Terms that govern the use of this website and related patient communication tools.", image(buildingImage, "Terms of service header image")),
      richTextSection(
        "Use, access, and site terms",
        "This page can outline website usage terms, disclaimers, booking conditions, acceptable use policies, and any other legal terms that apply to patients and visitors using the site.",
      ),
    ],
  },
];

const mediaAssets: CmsMediaAsset[] = [
  { id: createCmsId("media"), name: "Site Logo", alt: "On Time Medical Group logo", url: logoImage, type: "image", status: "published", sortOrder: 1, tags: ["branding", "logo"] },
  { id: createCmsId("media"), name: "Homepage Hero", alt: "Doctor discussing care with a patient", url: heroImage, type: "image", status: "published", sortOrder: 2, tags: ["homepage", "hero"] },
  { id: createCmsId("media"), name: "About Hero", alt: "Doctor speaking with a patient", url: aboutHeroImage, type: "image", status: "published", sortOrder: 3, tags: ["about", "hero"] },
  { id: createCmsId("media"), name: "Building Exterior", alt: "Medical building exterior", url: buildingImage, type: "image", status: "published", sortOrder: 4, tags: ["campus", "gallery"] },
  { id: createCmsId("media"), name: "Wellness Blog Cover", alt: "Wellness blog image", url: blogWellnessImage, type: "image", status: "published", sortOrder: 5, tags: ["blog", "wellness"] },
  { id: createCmsId("media"), name: "Urgent Care Blog Cover", alt: "Urgent care blog image", url: blogUrgentImage, type: "image", status: "published", sortOrder: 6, tags: ["blog", "urgent-care"] },
];

const announcements: CmsAnnouncement[] = [
  {
    id: createCmsId("announcement"),
    title: "New Patient Appointments",
    body: "Appointments are available for primary care, preventive care, and select behavioral health services.",
    status: "published",
    sortOrder: 1,
    href: "/contact",
    buttonLabel: "Contact Us",
  },
];

export const cmsDefaults: CmsSeedBundle = {
  settings,
  pages,
  services,
  posts,
  faqs,
  testimonials,
  teamMembers,
  legalDocuments,
  mediaAssets,
  announcements,
};
