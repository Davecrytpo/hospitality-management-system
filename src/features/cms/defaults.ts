import aboutBuildingImage from "@/assets/about-building-design.png";
import aboutHeroImage from "@/assets/about-hero-design-cleaner.png";
import blogUrgentImage from "@/assets/mockup-blog-urgent.jpg";
import blogWellnessImage from "@/assets/mockup-blog-wellness.jpg";
import buildingImage from "@/assets/mockup-building.jpg";
import heroImage from "@/assets/mockup-hero-doctor-patient.jpg";
import logoImage from "@/assets/logo-ontime.png";
import resourceImage from "@/assets/mockup-resources-woman.jpg";
import serviceChronicHero from "@/assets/service-page-chronic-hero.png";
import serviceGeriatricHero from "@/assets/service-page-geriatric-hero.png";
import serviceMentalHero from "@/assets/service-page-mental-hero.png";
import serviceMensHero from "@/assets/service-page-mens-hero.png";
import servicePreventiveHero from "@/assets/service-page-preventive-hero.png";
import servicePrimaryHero from "@/assets/service-page-primary-hero.png";
import serviceSubstanceHero from "@/assets/service-page-substance-hero.png";
import serviceUrgentHero from "@/assets/service-page-urgent-hero.png";
import serviceWomensHero from "@/assets/service-page-womens-hero.png";
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

const globalServiceSectionButtons = [button("Request an Appointment", "/services"), button("Call the Clinic", "tel:+14107544343", "outline")];

function buildService(
  config: {
    slug: string;
    title: string;
    shortTitle: string;
    excerpt: string;
    summary: string;
    icon: CmsService["icon"];
    previewImage: CmsImage;
    heroCopy: string;
    features: CmsItem[];
    benefits: CmsItem[];
    statItems: CmsItem[];
    seoDescription: string;
  },
): CmsService {
  return {
    id: createCmsId("service"),
    slug: config.slug,
    title: config.title,
    shortTitle: config.shortTitle,
    categoryLabel: "Clinical Service",
    status: "published",
    sortOrder: 0,
    featuredOnHome: true,
    featuredInNavigation: true,
    excerpt: config.excerpt,
    summary: config.summary,
    icon: config.icon,
    previewImage: config.previewImage,
    seo: seo(config.title, config.seoDescription, `services/${config.slug}`, config.previewImage),
    sections: [
      heroSection(config.title, config.excerpt, config.previewImage, {
        body: config.heroCopy,
        buttons: [button("Book This Service", "/services"), button("Contact Care Team", "/contact", "outline")],
        items: [
          item("Same-week access", "", { icon: "calendar" }),
          item("Coordinated follow-up", "", { icon: "users" }),
          item("Digital updates", "", { icon: "message-square" }),
        ],
      }),
      featureGridSection("What this service covers", config.features, {
        subtitle: "Each detail page is fully database-driven, so the care team can expand, reorder, or revise these offerings from the CMS.",
      }),
      statsSection("Care delivery highlights", config.statItems),
      featureGridSection("Why patients choose this service", config.benefits, {
        subtitle: "Benefits, supporting copy, and the visual presentation are all controlled through the admin dashboard.",
      }),
      teamSection("Meet the clinicians behind this service", "Assign specific physicians, nurses, or counselors to this service from the CMS.", {
        dataSource: "team",
      }),
      testimonialSection("Patient feedback", "Display service-specific testimonials without hardcoding them into the page.", {
        dataSource: "testimonials",
      }),
      faqSection("Frequently asked questions", "Answers can be updated live from the dashboard and tied to this individual service.", {
        dataSource: "faqs",
      }),
      ctaSection(
        "Need help deciding what to book?",
        "Your team can change this CTA, its buttons, and its supporting copy directly from the CMS.",
        globalServiceSectionButtons,
      ),
    ],
  };
}

const settings: CmsSiteSettings = {
  id: "default",
  brand: {
    siteName: "On Time Medical Group",
    tagline: "Client-managed healthcare website with dynamic content, services, media, and SEO.",
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
    summary: "Compassionate care, structured digital experiences, and a public website that your client can manage without touching code.",
    highlightItems: [
      item("All homepage sections are editable", "Hero banners, featured services, counters, FAQs, CTAs, and footer content all come from the CMS.", { icon: "sparkles" }),
      item("Service pages scale cleanly", "Create new services, update page layouts, and manage service-specific FAQs or testimonials from the dashboard.", { icon: "stethoscope" }),
      item("SEO stays in the admin workflow", "Meta titles, descriptions, slugs, canonical URLs, and OG images live with the content records.", { icon: "target" }),
      item("Media is centralized", "Upload Cloudinary assets into a shared media library and reuse them across pages and services.", { icon: "camera" }),
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
    text: "This website is now fully CMS-driven. Marketing, operations, and leadership can update frontend content from the dashboard.",
    href: "/contact",
    buttonLabel: "Talk to us",
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
    "A fully CMS-managed healthcare website with dynamic services, content sections, media, and SEO controlled from the admin dashboard.",
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
    excerpt: "The public homepage with editable hero, service previews, stats, testimonials, FAQs, and CTA sections.",
    seo: seo(
      "Comprehensive Healthcare That's On Time",
      "Manage hero messaging, service previews, testimonials, statistics, FAQs, footer, and branding from the admin dashboard.",
      "home",
      image(heroImage, "Doctor discussing care with a patient"),
    ),
    sections: [
      heroSection(
        "Comprehensive healthcare that's on time. Every time.",
        "No homepage text or imagery is hardcoded anymore. Every visible section on this page is driven from CMS records.",
        image(heroImage, "Doctor discussing care with a patient"),
        {
          eyebrow: "Homepage",
          body:
            "Your client can now update homepage messaging, swap background imagery, control buttons, and change highlighted proof points without a developer touching source code.",
          buttons: [button("Explore Services", "/services"), button("Book Appointment", "/contact", "outline")],
          items: [
            item("Same-day appointment pathways", "", { icon: "calendar" }),
            item("Most insurance plans accepted", "", { icon: "shield" }),
            item("Integrated care across teams", "", { icon: "users" }),
            item("Locations with virtual follow-up", "", { icon: "map-pin" }),
          ],
        },
      ),
      featureGridSection(
        "Why patients choose this network",
        [
          item("Patient-centered access", "Dynamic booking, contact, and patient-resource sections guide visitors clearly into the next step.", { icon: "book-open" }),
          item("Reusable service architecture", "Homepage service previews now pull from service records rather than duplicated page-specific markup.", { icon: "stethoscope" }),
          item("Content operations from the dashboard", "Marketing teams can add, hide, duplicate, or reorder sections on the public site.", { icon: "sparkles" }),
          item("Scalable governance", "Testimonials, FAQs, team members, blog posts, and policies are managed as structured collections.", { icon: "target" }),
        ],
        {
          subtitle: "These cards are rendered from structured block data and can be expanded or reordered from the content studio.",
        },
      ),
      statsSection("Operational proof points", [
        item("Patients served annually", "", { value: "50K+", icon: "users" }),
        item("Care coordination access", "", { value: "24/7", icon: "activity" }),
        item("Specialists across the network", "", { value: "200+", icon: "stethoscope" }),
        item("Locations and partner clinics", "", { value: "12", icon: "building" }),
      ]),
      serviceListSection("Featured services", "The cards below are driven from the services collection and can be expanded without frontend code edits."),
      richTextSection(
        "Patient resources and self-service tools",
        "This section can be converted into links, resource cards, or a richer editorial block at any time from the admin dashboard. Use it for forms, portal links, insurance notes, telehealth readiness, or wellness campaigns.",
        {
          buttons: [button("Patient Portal", "/patient-portal/login"), button("Contact the clinic", "/contact", "secondary")],
          image: image(resourceImage, "Patient looking at a phone"),
        },
      ),
      testimonialSection("What patients are saying", "Testimonials now live in their own collection and can be shown site-wide or targeted to a specific page."),
      faqSection("Frequently asked questions", "Answers on the homepage now pull from the shared FAQ collection and can be updated instantly from the dashboard."),
      ctaSection(
        "Ready to take the next step?",
        "The CTA title, body, buttons, and styling are fully editable from the content workspace.",
        [button("Book Appointment", "/contact"), button("Call 410-754-4343", "tel:+14107544343", "outline")],
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
    excerpt: "Mission, vision, team, timeline, certifications, and about-page CTAs managed from the CMS.",
    seo: seo("About On Time Medical Group", "Update about-page copy, leadership content, timelines, statistics, and supporting imagery from the admin dashboard.", "about-us", image(aboutHeroImage, "Doctor speaking with a patient")),
    sections: [
      heroSection(
        "About On Time Medical Group",
        "Mission, vision, timeline, team profiles, certificates, and CTA modules now live in a flexible page-builder structure.",
        image(aboutHeroImage, "Doctor speaking with a patient"),
        {
          body:
            "The goal of this page is no longer to freeze copy into JSX. The client can manage narrative copy, trust points, and supporting blocks directly from the dashboard.",
          buttons: [button("Meet the team", "/about-us"), button("Contact us", "/contact", "outline")],
          items: [
            item("Patient-centered care", "", { icon: "heart" }),
            item("Integrated medical network", "", { icon: "building" }),
            item("Reliable access and follow-through", "", { icon: "check-circle" }),
          ],
        },
      ),
      richTextSection(
        "Mission, vision, and story",
        "Mission: Deliver timely, accessible, and coordinated healthcare for families and communities.\n\nVision: Build a healthcare experience where operational clarity and compassionate care work together.\n\nStory: On Time Medical Group was founded to remove friction from everyday healthcare access and make service delivery feel reliable, connected, and human.",
        {
          image: image(aboutBuildingImage, "Medical building exterior"),
        },
      ),
      featureGridSection(
        "What defines the organization",
        [
          item("Clinical quality", "Measure and communicate quality standards clearly across the site and within service pages.", { icon: "shield" }),
          item("Connected service lines", "Primary care, mental health, urgent care, chronic care, and specialty access all share one content structure.", { icon: "activity" }),
          item("Editable proof and credentials", "Certificates, awards, community affiliations, and partnerships are maintained from the admin dashboard.", { icon: "star" }),
        ],
      ),
      timelineSection("Organization timeline", [
        item("2016", "On Time Medical Group launches with a commitment to accessible care.", { value: "2016", icon: "target" }),
        item("2019", "Expanded into integrated behavioral health and chronic-care coordination.", { value: "2019", icon: "brain" }),
        item("2022", "Rolled out patient-facing digital workflows and telehealth pathways.", { value: "2022", icon: "message-square" }),
        item("2026", "Shifted the entire public website to a structured CMS architecture.", { value: "2026", icon: "sparkles" }),
      ]),
      statsSection("About-page statistics", [
        item("Years serving the region", "", { value: "10+", icon: "building" }),
        item("Clinical programs", "", { value: "9", icon: "stethoscope" }),
        item("Partnered care teams", "", { value: "40+", icon: "users" }),
        item("Patient resources online", "", { value: "100%", icon: "globe" }),
      ]),
      teamSection("Leadership and clinical team", "Team members are editable records with bios, photos, specialties, and service assignments."),
      gallerySection("Certificates and campus highlights", [
        item("Main campus", "Use gallery cards for facilities, accreditations, or campaign visuals.", { image: image(buildingImage, "Main campus exterior"), icon: "building" }),
        item("Patient-first consultation spaces", "Swap or reorder visuals without redeploying the frontend.", { image: image(heroImage, "Consultation room"), icon: "camera" }),
        item("Community-ready care model", "Represent partnerships, events, or proof points with image-backed cards.", { image: image(resourceImage, "Patient resource photography"), icon: "users" }),
      ]),
      ctaSection("Talk to the team behind the care model", "This CTA can be changed from the dashboard and reused across pages or campaigns.", [button("Contact Us", "/contact"), button("Explore Services", "/services", "outline")]),
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
    excerpt: "The service directory itself is dynamic and renders service cards from the CMS collection.",
    seo: seo("Our Services", "Add, edit, delete, or reorder services and publish service detail pages without code changes.", "services", image(servicePrimaryHero, "Primary care illustration")),
    sections: [
      heroSection(
        "Our services",
        "The entire services hub is now driven from database records, including service cards, images, slugs, and detail-page layouts.",
        image(servicePrimaryHero, "Service directory hero"),
        {
          body:
            "Clients can create a new service record, assign a slug, write the page copy, upload imagery, configure SEO, and publish the page directly from the admin dashboard.",
          buttons: [button("Contact Care Team", "/contact"), button("View Blog", "/blog", "outline")],
          items: [
            item("Create new service pages", "", { icon: "sparkles" }),
            item("Upload service imagery", "", { icon: "camera" }),
            item("Control SEO and slugs", "", { icon: "target" }),
          ],
        },
      ),
      richTextSection(
        "A structured service architecture",
        "Instead of storing service content in route-specific TypeScript files, each service now exists as structured content with hero data, reusable sections, FAQs, testimonials, assigned clinicians, and CTA blocks.",
      ),
      serviceListSection("Service directory", "Cards below are pulled from the CMS services collection."),
      ctaSection("Need a custom service campaign page?", "Use the same block system to launch seasonal programs, screenings, or service-specific landing pages.", [button("Book Consultation", "/contact"), button("Call the Front Desk", "tel:+14107544343", "outline")]),
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
    excerpt: "Contact information, support hours, CTAs, and helpful next steps managed from the CMS.",
    seo: seo("Contact Us", "Update contact details, opening hours, CTA content, and patient-support guidance from the admin dashboard.", "contact", image(buildingImage, "Medical building exterior")),
    sections: [
      heroSection(
        "Contact the care team",
        "Phone numbers, email addresses, addresses, social links, support hours, and CTA content can now be updated from the dashboard.",
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
        "Use this area to communicate operating hours, emergency guidance, referral instructions, or campaign-specific contact details. Because it is block-driven, the content team can rework this section for seasonal campaigns without developer intervention.",
      ),
      faqSection("Contact and scheduling FAQs", "Use shared FAQs here or assign contact-specific FAQs from the admin dashboard."),
      ctaSection("Want a callback instead?", "Your team can swap this CTA at any time for a callback request, WhatsApp flow, or appointment form.", [button("Request Appointment", "/services"), button("Open Patient Portal", "/patient-portal/login", "outline")]),
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
    excerpt: "Frequently asked questions page built from the FAQ collection instead of embedded JSX arrays.",
    seo: seo("Frequently Asked Questions", "Manage website FAQs, answers, categories, and service-specific FAQ collections from the admin dashboard.", "faq", image(resourceImage, "Patient resource photography")),
    sections: [
      heroSection(
        "Frequently asked questions",
        "Global FAQs, service-specific FAQs, and contact guidance now live in one editable collection.",
        image(resourceImage, "Patient resources"),
        {
          body: "Add a new answer once, then target it to the homepage, services, contact page, or a specific service detail page.",
        },
      ),
      faqSection("General FAQ collection", "This page automatically renders published FAQ entries assigned to the site-wide experience."),
      ctaSection("Still need help?", "Move visitors directly to the right next step with editable CTA buttons.", [button("Contact Us", "/contact"), button("Browse Services", "/services", "outline")]),
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
    excerpt: "Blog landing page fed from the CMS blog post collection.",
    seo: seo("Health Blog", "Publish blog posts, update featured imagery, manage SEO, and control the blog landing page from the admin dashboard.", "blog", image(blogWellnessImage, "Health blog photography")),
    sections: [
      heroSection(
        "Insights, updates, and patient education",
        "The blog index and each individual post are now CMS records with editable layouts and SEO fields.",
        image(blogWellnessImage, "Health blog photography"),
        {
          body: "Use the blog collection for patient education, community updates, campaign content, or service-related trust building.",
          buttons: [button("Read Latest Posts", "/blog"), button("Contact the Team", "/contact", "outline")],
        },
      ),
      richTextSection(
        "A real content workflow for marketing teams",
        "Blog cards, cover images, authors, categories, post bodies, and metadata are no longer tied to code changes. Publish educational content and keep the site fresh from the dashboard.",
      ),
      blogFeedSection("Latest articles", "This section pulls from published blog records."),
      ctaSection("Need a campaign page or editorial landing page?", "Use the same block builder to support events, programs, or awareness campaigns.", [button("Talk to Marketing Support", "/contact"), button("View Services", "/services", "outline")]),
    ],
  },
];

const services: CmsService[] = [
  buildService({
    slug: "primary-care",
    title: "Primary Care",
    shortTitle: "Primary Care",
    excerpt: "Personalized everyday care for preventive health, routine concerns, and long-term care coordination.",
    summary: "A flexible service detail page where clinicians or marketing staff can manage hero copy, care highlights, FAQs, testimonials, and calls to action from the admin dashboard.",
    icon: "stethoscope",
    previewImage: image(servicePrimaryHero, "Primary care illustration"),
    heroCopy: "Primary care becomes the operational anchor for long-term relationships, preventive planning, medication review, and coordinated referrals.",
    features: [
      item("Annual checkups", "Support for preventive visits, routine screenings, and longitudinal care planning.", { icon: "calendar" }),
      item("Same-day visits", "Promote urgent but non-emergency appointment access directly from the service page.", { icon: "clock" }),
      item("Medication management", "Coordinate refills, follow-up care, and treatment adjustments with less friction.", { icon: "pill" }),
      item("Referral coordination", "Link patients into specialty pathways while keeping primary care at the center of continuity.", { icon: "users" }),
    ],
    benefits: [
      item("Relationship-based care", "A consistent provider relationship creates better long-term outcomes and patient trust.", { icon: "heart" }),
      item("Clear next steps", "Move from consultation to testing, referral, or follow-up with fewer disconnected handoffs.", { icon: "check-circle" }),
      item("Scalable digital touchpoints", "Appointments, follow-up messaging, and patient education all connect through one system.", { icon: "globe" }),
    ],
    statItems: [
      item("Typical onboarding flow", "", { value: "< 10 min", icon: "clock" }),
      item("Appointment access", "", { value: "Same week", icon: "calendar" }),
      item("Follow-up model", "", { value: "Coordinated", icon: "users" }),
    ],
    seoDescription: "Edit the entire primary-care detail page from the admin dashboard, including hero copy, benefits, FAQs, testimonials, assigned clinicians, and SEO.",
  }),
  buildService({
    slug: "preventive-care",
    title: "Preventive Care",
    shortTitle: "Preventive Care",
    excerpt: "Screenings, wellness planning, vaccinations, and early-detection support tailored to life stage and risk profile.",
    summary: "This service page is structured for preventive programs, seasonal campaigns, and risk-based care messaging that teams can update independently.",
    icon: "shield",
    previewImage: image(servicePreventiveHero, "Preventive care illustration"),
    heroCopy: "Preventive care content can now flex with seasonality, campaign focus, and patient education priorities without restructuring code.",
    features: [
      item("Annual wellness visits", "Shape the experience around early detection, personalized screening plans, and recurring follow-up.", { icon: "calendar" }),
      item("Cancer screenings", "Promote age-appropriate screening pathways and the supporting care journey.", { icon: "shield" }),
      item("Vaccinations", "Support vaccine campaigns, reminders, and educational copy from the CMS.", { icon: "activity" }),
      item("Lab-led prevention", "Connect cholesterol, blood-pressure, diabetes, and related testing into a cohesive program message.", { icon: "microscope" }),
    ],
    benefits: [
      item("Earlier intervention", "Updated preventive messaging helps patients understand why screening matters before symptoms appear.", { icon: "target" }),
      item("Lower downstream risk", "Prevention-focused care reduces avoidable complications and missed care gaps.", { icon: "heart" }),
      item("Better campaign flexibility", "Swap visuals, copy, and CTAs for wellness months or screening pushes from the dashboard.", { icon: "sparkles" }),
    ],
    statItems: [
      item("Preventive pathways", "", { value: "Multi-stage", icon: "activity" }),
      item("Visit planning", "", { value: "Personalized", icon: "target" }),
      item("Coverage readiness", "", { value: "Insurance-aware", icon: "shield" }),
    ],
    seoDescription: "Manage preventive care hero content, wellness programs, FAQs, and seasonal campaign messaging from the admin dashboard.",
  }),
  buildService({
    slug: "chronic-disease-management",
    title: "Chronic Disease Management",
    shortTitle: "Chronic Care",
    excerpt: "Structured support for diabetes, hypertension, thyroid conditions, weight management, and longer-term treatment planning.",
    summary: "The chronic-care page is designed for longitudinal programs, recurring touchpoints, and evolving care-plan messaging controlled in the CMS.",
    icon: "activity",
    previewImage: image(serviceChronicHero, "Chronic disease management illustration"),
    heroCopy: "This page can evolve alongside care models, payer expectations, and digital follow-up programs without route-level rewrites.",
    features: [
      item("Diabetes care", "Explain treatment, testing cadence, medication review, and education support.", { icon: "activity" }),
      item("Hypertension management", "Communicate monitoring plans, medication adjustments, and follow-up expectations.", { icon: "heart" }),
      item("Thyroid and metabolic care", "Support condition-specific programs with their own content emphasis and CTAs.", { icon: "sparkles" }),
      item("Long-term follow-up", "Present ongoing case review, goal tracking, and digital continuity in one place.", { icon: "users" }),
    ],
    benefits: [
      item("Improved continuity", "Patients understand the full long-term care journey instead of isolated appointments.", { icon: "users" }),
      item("Stronger education", "Use the page to reinforce monitoring, self-management, and lifestyle support content.", { icon: "book-open" }),
      item("Flexible program messaging", "Adjust campaigns, coaching offers, or care bundles from the dashboard.", { icon: "sparkles" }),
    ],
    statItems: [
      item("Care model", "", { value: "Longitudinal", icon: "users" }),
      item("Review cadence", "", { value: "Ongoing", icon: "calendar" }),
      item("Digital communication", "", { value: "Included", icon: "message-square" }),
    ],
    seoDescription: "Keep chronic-disease management pages current with editable care-program content, FAQs, testimonials, and service SEO settings.",
  }),
  buildService({
    slug: "womens-health",
    title: "Women's Health",
    shortTitle: "Women's Health",
    excerpt: "Comprehensive women's health support spanning preventive care, hormonal care, reproductive planning, and wellness.",
    summary: "Use structured CMS content to keep women's-health messaging current across life stages, campaigns, and patient education priorities.",
    icon: "heart",
    previewImage: image(serviceWomensHero, "Women's health illustration"),
    heroCopy: "This service page supports rich lifecycle messaging, evolving programs, and page-level SEO without hardcoded content dependencies.",
    features: [
      item("Well-woman exams", "Promote preventive visits and recurring wellness pathways from one editable page.", { icon: "calendar" }),
      item("Hormonal care", "Manage copy for cycle health, menopause support, and symptom-led follow-up programs.", { icon: "heart" }),
      item("Family planning", "Update reproductive-health guidance, counseling language, and CTA pathways as needed.", { icon: "users" }),
      item("Breast and cervical screening", "Support age-specific prevention and referral clarity.", { icon: "shield" }),
    ],
    benefits: [
      item("Life-stage flexibility", "Organize messaging around adolescence, reproductive years, and menopause without redesigning the page.", { icon: "sparkles" }),
      item("Confident education", "Use the CMS to publish clearer guidance and FAQs that answer real patient concerns.", { icon: "book-open" }),
      item("Integrated care access", "Connect primary care, preventive care, diagnostics, and counseling through one digital journey.", { icon: "activity" }),
    ],
    statItems: [
      item("Care scope", "", { value: "Whole-person", icon: "heart" }),
      item("Visit options", "", { value: "Virtual + in-person", icon: "globe" }),
      item("Program flexibility", "", { value: "High", icon: "sparkles" }),
    ],
    seoDescription: "Women’s health content, lifecycle copy, FAQs, testimonials, SEO, and CTAs are all editable from the admin dashboard.",
  }),
  buildService({
    slug: "mens-health",
    title: "Men's Health",
    shortTitle: "Men's Health",
    excerpt: "Preventive, diagnostic, and lifestyle support tailored to common men's-health needs across adulthood.",
    summary: "The men's-health service page supports editable messaging around preventive care, labs, cardiovascular risk, and quality-of-life concerns.",
    icon: "user-round",
    previewImage: image(serviceMensHero, "Men's health illustration"),
    heroCopy: "Marketing or clinical staff can update programs, education blocks, and CTA emphasis as service priorities evolve.",
    features: [
      item("Routine physicals", "Support annual health reviews and recurring prevention messaging.", { icon: "calendar" }),
      item("Prostate screening", "Publish tailored guidance for screening readiness and follow-up conversations.", { icon: "shield" }),
      item("Lab-led evaluation", "Explain testing, interpretation, and next-step pathways more clearly.", { icon: "microscope" }),
      item("Lifestyle and wellness support", "Tie cardiovascular health, nutrition, and stress support into one service narrative.", { icon: "activity" }),
    ],
    benefits: [
      item("Better engagement", "Reduce friction for topics patients often delay or avoid discussing.", { icon: "message-square" }),
      item("Clear treatment pathways", "Use structured sections to explain options, timing, and likely next steps.", { icon: "check-circle" }),
      item("Flexible campaign support", "Run awareness content or men's-health promotions from the dashboard.", { icon: "sparkles" }),
    ],
    statItems: [
      item("Support areas", "", { value: "Preventive + diagnostic", icon: "shield" }),
      item("Access model", "", { value: "Fast consult pathways", icon: "clock" }),
      item("Education readiness", "", { value: "Editable", icon: "book-open" }),
    ],
    seoDescription: "Manage men’s-health service content, images, assigned clinicians, FAQs, testimonials, and SEO settings from the dashboard.",
  }),
  buildService({
    slug: "mental-health-services",
    title: "Mental Health Services",
    shortTitle: "Mental Health",
    excerpt: "Therapy, psychiatric evaluation, stress support, and integrated behavioral-health care within the wider medical ecosystem.",
    summary: "This service page supports program updates, therapist assignments, and education content without rebuilding the frontend.",
    icon: "brain",
    previewImage: image(serviceMentalHero, "Mental health illustration"),
    heroCopy: "Behavioral-health content needs flexibility. This page now supports service updates, clinician assignments, and FAQ changes from the CMS.",
    features: [
      item("Therapy pathways", "Describe counseling options, intake expectations, and follow-up structure in editable blocks.", { icon: "message-square" }),
      item("Psychiatric evaluation", "Clarify assessment steps, medication support, and coordination with other care teams.", { icon: "brain" }),
      item("Stress and resilience care", "Run seasonal or campaign-based mental-wellness content without code changes.", { icon: "heart" }),
      item("Integrated care coordination", "Connect mental-health services to primary care and chronic-care pathways.", { icon: "users" }),
    ],
    benefits: [
      item("Better accessibility", "Editable content helps reduce stigma and clarify what getting help looks like.", { icon: "heart" }),
      item("More adaptive programming", "Support group updates, telehealth emphasis, or care-model changes from the CMS.", { icon: "sparkles" }),
      item("Connected patient journey", "Keep referrals, medication follow-up, and education aligned across teams.", { icon: "activity" }),
    ],
    statItems: [
      item("Visit options", "", { value: "Virtual + in-person", icon: "globe" }),
      item("Care model", "", { value: "Integrated", icon: "users" }),
      item("Publishing flexibility", "", { value: "High", icon: "sparkles" }),
    ],
    seoDescription: "Mental-health pages, therapist sections, FAQs, testimonials, telehealth messaging, and SEO are all manageable from the admin dashboard.",
  }),
  buildService({
    slug: "substance-use-treatment",
    title: "Substance Use Treatment",
    shortTitle: "Recovery Support",
    excerpt: "Evidence-based treatment, counseling, medication-assisted treatment, and recovery support with a structured digital presence.",
    summary: "The recovery-support page is built for evolving programs, clinician assignments, community resources, and compassionate editorial control.",
    icon: "hand-heart",
    previewImage: image(serviceSubstanceHero, "Substance use treatment illustration"),
    heroCopy: "Recovery programs often change over time. This service page now adapts to those changes without a developer editing code.",
    features: [
      item("Assessment and intake", "Describe confidential entry points and first-step expectations clearly.", { icon: "message-square" }),
      item("Medication-assisted treatment", "Manage treatment-program detail and education content from the CMS.", { icon: "pill" }),
      item("Counseling and support", "Highlight therapy, family support, and peer recovery pathways.", { icon: "users" }),
      item("Aftercare planning", "Publish ongoing support models and resource links directly from the dashboard.", { icon: "globe" }),
    ],
    benefits: [
      item("Confidential, patient-first messaging", "Give staff control over tone and clarity as programs evolve.", { icon: "shield" }),
      item("Program adaptability", "Update services, support models, and CTA pathways without redesign work.", { icon: "sparkles" }),
      item("Stronger resource visibility", "Promote support options, community resources, and follow-up expectations.", { icon: "book-open" }),
    ],
    statItems: [
      item("Care model", "", { value: "Evidence-based", icon: "shield" }),
      item("Support depth", "", { value: "Assessment to aftercare", icon: "users" }),
      item("Message control", "", { value: "CMS-managed", icon: "sparkles" }),
    ],
    seoDescription: "Substance-use treatment pages, recovery program details, FAQs, clinician sections, testimonials, and SEO live in the CMS.",
  }),
  buildService({
    slug: "geriatric-care",
    title: "Geriatric Care",
    shortTitle: "Geriatric Care",
    excerpt: "Comprehensive support for aging adults, caregivers, memory concerns, chronic conditions, and independence planning.",
    summary: "This service page is optimized for caregiver-facing education, aging-well programs, and coordinated clinical storytelling from the CMS.",
    icon: "users",
    previewImage: image(serviceGeriatricHero, "Geriatric care illustration"),
    heroCopy: "The CMS allows care teams to tailor language for patients, caregivers, and community partners without engineering involvement.",
    features: [
      item("Comprehensive assessments", "Explain functional, cognitive, and preventive reviews in a clearer way.", { icon: "stethoscope" }),
      item("Caregiver coordination", "Add service-specific resources, caregiver tips, or support pathways as needed.", { icon: "users" }),
      item("Memory support", "Publish evolving content for cognitive screening, follow-up, and referral options.", { icon: "brain" }),
      item("Healthy-aging planning", "Highlight fall prevention, medication review, and independence support.", { icon: "activity" }),
    ],
    benefits: [
      item("Patient and caregiver clarity", "Keep page copy understandable for families coordinating longer-term care.", { icon: "message-square" }),
      item("Program-specific education", "Launch or revise aging-well initiatives directly from the dashboard.", { icon: "book-open" }),
      item("Flexible support content", "Support home-based, virtual, or in-office care models without route rewrites.", { icon: "sparkles" }),
    ],
    statItems: [
      item("Care audience", "", { value: "Patients + caregivers", icon: "users" }),
      item("Support model", "", { value: "Long-term", icon: "activity" }),
      item("Program agility", "", { value: "CMS-first", icon: "sparkles" }),
    ],
    seoDescription: "Geriatric-care content, caregiver resources, clinician sections, FAQs, and SEO are editable from the admin dashboard.",
  }),
  buildService({
    slug: "urgent-care",
    title: "Urgent Care",
    shortTitle: "Urgent Care",
    excerpt: "Fast, non-emergency care for minor illnesses and injuries, with telehealth and in-person pathways.",
    summary: "This urgent-care page supports changing access messaging, seasonal campaigns, and service-specific operational updates without code changes.",
    icon: "clock",
    previewImage: image(serviceUrgentHero, "Urgent care illustration"),
    heroCopy: "Urgent-care demand changes fast. The CMS allows operations or marketing teams to update messaging, wait-time notes, and next-step guidance quickly.",
    features: [
      item("Cold and flu care", "Publish seasonal guidance and acute-symptom intake expectations from the dashboard.", { icon: "activity" }),
      item("Minor injuries", "Keep treatment and triage explanations current as workflows change.", { icon: "shield" }),
      item("Rapid testing", "Promote available tests, timelines, and telehealth follow-up processes.", { icon: "microscope" }),
      item("Telehealth screening", "Let the team pivot messaging between virtual and in-person capacity as needed.", { icon: "globe" }),
    ],
    benefits: [
      item("Operational responsiveness", "Adjust access language and CTAs quickly when demand patterns shift.", { icon: "clock" }),
      item("Clearer patient routing", "Help visitors understand whether urgent care or another service fits best.", { icon: "check-circle" }),
      item("Seasonal agility", "Use the block builder for flu season, school physicals, or public-health campaigns.", { icon: "sparkles" }),
    ],
    statItems: [
      item("Care type", "", { value: "Non-emergency", icon: "shield" }),
      item("Access options", "", { value: "Virtual + walk-in", icon: "globe" }),
      item("Update speed", "", { value: "Live from CMS", icon: "sparkles" }),
    ],
    seoDescription: "Urgent-care access messaging, hero banners, FAQs, service highlights, and SEO are editable from the CMS dashboard.",
  }),
];

services.forEach((service, index) => {
  service.sortOrder = index + 1;
  service.featuredOnHome = index < 6;
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
    seo: seo("When to Choose Urgent Care", "A CMS-managed patient education article about choosing urgent care for non-emergency situations.", "blog/when-to-choose-urgent-care", image(blogUrgentImage, "Urgent care article image")),
    sections: [
      heroSection("When to choose urgent care", "This post layout, content, imagery, and SEO are editable from the blog collection.", image(blogUrgentImage, "Urgent care article image")),
      richTextSection(
        "Fast guidance for non-emergency symptoms",
        "Use urgent care for symptoms or injuries that need prompt attention but are not severe enough for the emergency room. The advantage of a CMS-driven blog is that your team can keep this guidance current with service availability, seasonal advice, or updated patient routing rules.",
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
    seo: seo("Build a Better Preventive Care Routine", "Dynamic preventive-care blog content managed from the admin dashboard.", "blog/building-a-better-preventive-care-routine", image(blogWellnessImage, "Preventive care wellness article")),
    sections: [
      heroSection("Build a better preventive care routine", "The blog system supports cover images, categories, SEO, and modular post bodies.", image(blogWellnessImage, "Preventive care wellness article")),
      richTextSection(
        "Why prevention needs a clearer digital experience",
        "Patients are more likely to act when information is clear, relevant, and easy to trust. The CMS lets your team update copy, FAQs, and supporting CTAs as preventive programs evolve.",
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
    slug: "how-cms-driven-service-pages-improve-patient-trust",
    title: "How CMS-Driven Service Pages Improve Patient Trust",
    category: "Digital Experience",
    authorName: "Website Strategy Team",
    status: "published",
    sortOrder: 3,
    excerpt: "A content-operations perspective on why structured service pages outperform hardcoded one-off layouts.",
    coverImage: image(buildingImage, "Healthcare website strategy article"),
    publishedAt: "2026-05-04",
    seo: seo("How CMS-Driven Service Pages Improve Patient Trust", "A blog post about structured healthcare content architecture and patient trust.", "blog/how-cms-driven-service-pages-improve-patient-trust", image(buildingImage, "Healthcare website strategy article")),
    sections: [
      heroSection("How CMS-driven service pages improve patient trust", "Explain your content operations strategy directly on the site and keep it current from the dashboard.", image(buildingImage, "Healthcare website strategy article")),
      richTextSection(
        "Structured content creates better patient experiences",
        "When services use the same flexible architecture, the website becomes easier to maintain and easier for patients to trust. Consistent structure supports better SEO, clearer next steps, and fewer outdated content fragments.",
      ),
      featureGridSection("What improves", [
        item("Consistency", "Every service page can include hero, features, FAQs, clinicians, testimonials, and CTAs.", { icon: "check-circle" }),
        item("Speed of updates", "Teams publish changes without waiting for a developer deployment.", { icon: "sparkles" }),
        item("Scalability", "New services or campaigns use the same reusable section system.", { icon: "building" }),
      ]),
    ],
  },
];

const faqs: CmsFaq[] = [
  { id: createCmsId("faq"), question: "Can the client update the homepage without a developer?", answer: "Yes. Hero content, service previews, statistics, testimonials, FAQs, CTAs, footer content, and contact details are editable from the admin dashboard.", category: "General", status: "published", sortOrder: 1, pageSlug: "home" },
  { id: createCmsId("faq"), question: "Can I add a brand-new service page from admin?", answer: "Yes. Create a new service record, assign the slug, upload imagery, configure SEO, and publish the page without editing code.", category: "Services", status: "published", sortOrder: 2, pageSlug: "services" },
  { id: createCmsId("faq"), question: "Where do I manage meta titles and descriptions?", answer: "Every page, service, blog post, and policy record includes editable SEO fields in the admin workspace.", category: "SEO", status: "published", sortOrder: 3, pageSlug: "faq" },
  { id: createCmsId("faq"), question: "Can the website team reorder sections on a page?", answer: "Yes. The section editor allows pages and service layouts to be reordered, duplicated, hidden, or removed from the dashboard.", category: "General", status: "published", sortOrder: 4, pageSlug: "home" },
  { id: createCmsId("faq"), question: "What should I expect during a primary care visit?", answer: "Your care team can use this answer to explain consultation flow, follow-up, lab coordination, or annual wellness expectations.", category: "Service FAQ", status: "published", sortOrder: 5, serviceSlug: "primary-care" },
  { id: createCmsId("faq"), question: "Do you offer same-day appointments for primary care?", answer: "Yes. The service page can be updated to reflect same-day, next-day, or scheduled-only availability directly from the CMS.", category: "Service FAQ", status: "published", sortOrder: 6, serviceSlug: "primary-care" },
  { id: createCmsId("faq"), question: "How often should I schedule preventive screenings?", answer: "That depends on age, risk factors, and health history. Use the CMS to tailor screening guidance as programs change.", category: "Service FAQ", status: "published", sortOrder: 7, serviceSlug: "preventive-care" },
  { id: createCmsId("faq"), question: "Are preventive visits covered by insurance?", answer: "Coverage varies by plan, but the admin team can keep this answer aligned to the clinic's current guidance.", category: "Service FAQ", status: "published", sortOrder: 8, serviceSlug: "preventive-care" },
  { id: createCmsId("faq"), question: "How is chronic care follow-up organized?", answer: "Use this answer to explain check-ins, monitoring cadence, medication review, and care-coordination touchpoints.", category: "Service FAQ", status: "published", sortOrder: 9, serviceSlug: "chronic-disease-management" },
  { id: createCmsId("faq"), question: "Can chronic care content be personalized by program?", answer: "Yes. Sections can be adjusted for diabetes, hypertension, thyroid care, or broader care-management campaigns.", category: "Service FAQ", status: "published", sortOrder: 10, serviceSlug: "chronic-disease-management" },
  { id: createCmsId("faq"), question: "Do you support patients across different life stages?", answer: "Yes. Women's-health content can be organized around prevention, reproductive planning, menopause support, or broader wellness needs.", category: "Service FAQ", status: "published", sortOrder: 11, serviceSlug: "womens-health" },
  { id: createCmsId("faq"), question: "Can this page promote campaign-specific women's health programs?", answer: "Yes. Hero content, section order, CTAs, and supporting copy are all editable from the dashboard.", category: "Service FAQ", status: "published", sortOrder: 12, serviceSlug: "womens-health" },
  { id: createCmsId("faq"), question: "Can men's-health services cover preventive and lifestyle concerns?", answer: "Yes. The service page can explain screening, labs, cardiovascular health, and quality-of-life concerns together.", category: "Service FAQ", status: "published", sortOrder: 13, serviceSlug: "mens-health" },
  { id: createCmsId("faq"), question: "Can you run awareness campaigns through this page?", answer: "Yes. Use the CMS to change visuals, CTAs, or educational blocks for men's-health awareness initiatives.", category: "Service FAQ", status: "published", sortOrder: 14, serviceSlug: "mens-health" },
  { id: createCmsId("faq"), question: "Are virtual mental-health visits supported?", answer: "Yes. Mental-health service pages can present virtual and in-person care pathways side by side.", category: "Service FAQ", status: "published", sortOrder: 15, serviceSlug: "mental-health-services" },
  { id: createCmsId("faq"), question: "Can therapist or provider sections be updated from admin?", answer: "Yes. Clinician assignments are stored as CMS records rather than hardcoded into the page.", category: "Service FAQ", status: "published", sortOrder: 16, serviceSlug: "mental-health-services" },
  { id: createCmsId("faq"), question: "Is substance-use treatment information handled sensitively?", answer: "Yes. The CMS allows tone, language, and program details to be updated carefully as services evolve.", category: "Service FAQ", status: "published", sortOrder: 17, serviceSlug: "substance-use-treatment" },
  { id: createCmsId("faq"), question: "Can community resources be added to recovery pages?", answer: "Yes. Teams can add new sections, support resources, or CTAs without developer assistance.", category: "Service FAQ", status: "published", sortOrder: 18, serviceSlug: "substance-use-treatment" },
  { id: createCmsId("faq"), question: "Can caregivers use the geriatric-care page for guidance?", answer: "Yes. The CMS makes it easy to maintain caregiver-facing content, support steps, and next actions.", category: "Service FAQ", status: "published", sortOrder: 19, serviceSlug: "geriatric-care" },
  { id: createCmsId("faq"), question: "Can this page highlight memory or mobility support?", answer: "Yes. The block system is flexible enough to emphasize specific programs or concerns.", category: "Service FAQ", status: "published", sortOrder: 20, serviceSlug: "geriatric-care" },
  { id: createCmsId("faq"), question: "What conditions fit urgent care best?", answer: "Urgent-care content can clarify common non-emergency conditions and route patients to the right next step.", category: "Service FAQ", status: "published", sortOrder: 21, serviceSlug: "urgent-care" },
  { id: createCmsId("faq"), question: "Can urgent-care messaging change during high-volume periods?", answer: "Yes. Because the content is CMS-driven, the page can adapt quickly to volume, seasons, or campaign needs.", category: "Service FAQ", status: "published", sortOrder: 22, serviceSlug: "urgent-care" },
];

const testimonials: CmsTestimonial[] = [
  { id: createCmsId("testimonial"), quote: "The new site finally feels organized. We can update homepage campaigns and service details ourselves without waiting on code changes.", name: "Marketing Director", role: "Healthcare network leadership", rating: 5, status: "published", sortOrder: 1, pageSlug: "home" },
  { id: createCmsId("testimonial"), quote: "The primary-care page explains the care journey clearly and makes follow-up expectations easier to understand.", name: "Nia R.", role: "Primary care patient", rating: 5, status: "published", sortOrder: 2, serviceSlug: "primary-care" },
  { id: createCmsId("testimonial"), quote: "Our wellness campaign team can launch updated preventive-care messaging in hours instead of waiting for a developer sprint.", name: "Operations Lead", role: "Preventive program team", rating: 5, status: "published", sortOrder: 3, serviceSlug: "preventive-care" },
  { id: createCmsId("testimonial"), quote: "The mental-health page feels more compassionate and practical now, and the FAQs answer what I needed before booking.", name: "Amina K.", role: "Behavioral health patient", rating: 5, status: "published", sortOrder: 4, serviceSlug: "mental-health-services" },
  { id: createCmsId("testimonial"), quote: "We can manage service imagery, team sections, and SEO in one place, which is exactly what our content workflow needed.", name: "Digital Strategy Manager", role: "Admin dashboard user", rating: 5, status: "published", sortOrder: 5, pageSlug: "services" },
  { id: createCmsId("testimonial"), quote: "The urgent-care page now answers the right questions quickly and routes patients more clearly into the right next step.", name: "Reception Supervisor", role: "Front-office operations", rating: 5, status: "published", sortOrder: 6, serviceSlug: "urgent-care" },
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
    summary: "Editable privacy-policy content managed from the legal-documents collection.",
    status: "published",
    sortOrder: 1,
    seo: seo("Privacy Policy", "Manage privacy policy content and SEO from the admin dashboard.", "policies/privacy-policy"),
    sections: [
      heroSection("Privacy Policy", "Policies are now managed as content records instead of hardcoded legal pages.", image(buildingImage, "Privacy policy header image")),
      richTextSection(
        "How information is handled",
        "This page should outline what data is collected, how it is used, where it is stored, and how patients can contact the organization about privacy concerns. Because the page is CMS-managed, legal or operations teams can keep it current without editing code.",
      ),
    ],
  },
  {
    id: createCmsId("legal"),
    slug: "terms-of-service",
    title: "Terms of Service",
    summary: "Editable terms page managed from the legal-documents collection.",
    status: "published",
    sortOrder: 2,
    seo: seo("Terms of Service", "Manage terms-of-service content and SEO from the admin dashboard.", "policies/terms-of-service"),
    sections: [
      heroSection("Terms of Service", "Your legal content is now part of the same structured CMS workflow as the rest of the website.", image(buildingImage, "Terms of service header image")),
      richTextSection(
        "Use, access, and site terms",
        "Use this page for website usage terms, disclaimers, service access conditions, booking terms, and other legal content that should remain under administrative control.",
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
    title: "CMS Launch",
    body: "The public website now runs on a structured CMS model with editable pages, services, media, blog, FAQs, policies, and SEO.",
    status: "published",
    sortOrder: 1,
    href: "/services",
    buttonLabel: "Explore the site",
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
