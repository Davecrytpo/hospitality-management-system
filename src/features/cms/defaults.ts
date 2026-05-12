import aboutBuildingImage from "@/assets/about-building-design.png";
import aboutHeroImage from "@/assets/about-hero-design-cleaner.png";
import blogUrgentImage from "@/assets/mockup-blog-urgent.jpg";
import blogWellnessImage from "@/assets/mockup-blog-wellness.jpg";
import buildingImage from "@/assets/mockup-building.jpg";
import heroImage from "@/assets/mockup-hero-doctor-patient.jpg";
import logoImage from "@/assets/logo-ontime.png";
import resourceImage from "@/assets/mockup-resources-woman.jpg";
import secondaryImage from "@/assets/services-family-banner.jpg";
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
        subtitle: "Care details, treatment options, and next steps for this service.",
      }),
      statsSection("Care delivery highlights", config.statItems),
      featureGridSection("Why patients choose this service", config.benefits, {
        subtitle: "Reasons patients choose this service for timely, coordinated care.",
      }),
      teamSection("Meet the clinicians behind this service", "Meet members of the care team who support this service.", {
        dataSource: "team",
      }),
      testimonialSection("Patient feedback", "Display service-specific testimonials without hardcoding them into the page.", {
        dataSource: "testimonials",
      }),
      faqSection("Frequently asked questions", "Common questions about this service and what patients can expect.", {
        dataSource: "faqs",
      }),
      ctaSection(
        "Need help deciding what to book?",
        "Contact the care team if you need help choosing the right service or next step.",
        globalServiceSectionButtons,
      ),
    ],
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

const services: CmsService[] = [
  buildService({
    slug: "primary-care",
    title: "Primary Care",
    shortTitle: "Primary Care",
    excerpt: "Personalized everyday care for preventive health, routine concerns, and long-term care coordination.",
    summary: "Personalized care for routine visits, preventive screenings, and long-term health support.",
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
    seoDescription: "Primary care services for routine visits, preventive screenings, medication management, and long-term health support.",
  }),
  buildService({
    slug: "preventive-care",
    title: "Preventive Care",
    shortTitle: "Preventive Care",
    excerpt: "Screenings, wellness planning, vaccinations, and early-detection support tailored to life stage and risk profile.",
    summary: "Preventive care focused on screenings, wellness visits, vaccinations, and early detection.",
    icon: "shield",
    previewImage: image(servicePreventiveHero, "Preventive care illustration"),
    heroCopy: "Preventive care content can now flex with seasonality, campaign focus, and patient education priorities without restructuring code.",
    features: [
      item("Annual wellness visits", "Shape the experience around early detection, personalized screening plans, and recurring follow-up.", { icon: "calendar" }),
      item("Cancer screenings", "Promote age-appropriate screening pathways and the supporting care journey.", { icon: "shield" }),
      item("Vaccinations", "Stay current on recommended vaccines and seasonal protection.", { icon: "activity" }),
      item("Lab-led prevention", "Connect cholesterol, blood-pressure, diabetes, and related testing into a cohesive program message.", { icon: "microscope" }),
    ],
    benefits: [
      item("Earlier intervention", "Updated preventive messaging helps patients understand why screening matters before symptoms appear.", { icon: "target" }),
      item("Lower downstream risk", "Prevention-focused care reduces avoidable complications and missed care gaps.", { icon: "heart" }),
      item("Personalized wellness planning", "Tailor screening and prevention plans around age, history, and health goals.", { icon: "sparkles" }),
    ],
    statItems: [
      item("Preventive pathways", "", { value: "Multi-stage", icon: "activity" }),
      item("Visit planning", "", { value: "Personalized", icon: "target" }),
      item("Coverage readiness", "", { value: "Insurance-aware", icon: "shield" }),
    ],
    seoDescription: "Preventive care services including annual wellness visits, screenings, vaccinations, and proactive health planning.",
  }),
  buildService({
    slug: "chronic-disease-management",
    title: "Chronic Disease Management",
    shortTitle: "Chronic Care",
    excerpt: "Structured support for diabetes, hypertension, thyroid conditions, weight management, and longer-term treatment planning.",
    summary: "Ongoing support for chronic conditions including diabetes, hypertension, thyroid concerns, and weight management.",
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
      item("Goal-focused care planning", "Support follow-up goals, coaching, and lifestyle changes over time.", { icon: "sparkles" }),
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
    summary: "Comprehensive women's health support across preventive care, reproductive wellness, hormonal care, and healthy aging.",
    icon: "heart",
    previewImage: image(serviceWomensHero, "Women's health illustration"),
    heroCopy: "Women's health care should feel compassionate, clear, and supportive through every stage of life.",
    features: [
      item("Well-woman exams", "Promote preventive visits and recurring wellness pathways from one editable page.", { icon: "calendar" }),
      item("Hormonal care", "Manage copy for cycle health, menopause support, and symptom-led follow-up programs.", { icon: "heart" }),
      item("Family planning", "Update reproductive-health guidance, counseling language, and CTA pathways as needed.", { icon: "users" }),
      item("Breast and cervical screening", "Support age-specific prevention and referral clarity.", { icon: "shield" }),
    ],
    benefits: [
      item("Life-stage flexibility", "Organize messaging around adolescence, reproductive years, and menopause without redesigning the page.", { icon: "sparkles" }),
      item("Clear preventive guidance", "Get practical information about screenings, wellness visits, and next steps.", { icon: "book-open" }),
      item("Integrated care access", "Connect primary care, preventive care, diagnostics, and counseling through one digital journey.", { icon: "activity" }),
    ],
    statItems: [
      item("Care scope", "", { value: "Whole-person", icon: "heart" }),
      item("Visit options", "", { value: "Virtual + in-person", icon: "globe" }),
      item("Program flexibility", "", { value: "High", icon: "sparkles" }),
    ],
    seoDescription: "Women's health services including well-woman exams, family planning, hormonal care, and preventive screenings.",
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
      item("Focused preventive support", "Encourage earlier conversations around screening, labs, and wellness planning.", { icon: "sparkles" }),
    ],
    statItems: [
      item("Support areas", "", { value: "Preventive + diagnostic", icon: "shield" }),
      item("Access model", "", { value: "Fast consult pathways", icon: "clock" }),
      item("Education readiness", "", { value: "Editable", icon: "book-open" }),
    ],
    seoDescription: "Men's health services including physicals, lab evaluation, screenings, and lifestyle-focused care.",
  }),
  buildService({
    slug: "mental-health-services",
    title: "Mental Health Services",
    shortTitle: "Mental Health",
    excerpt: "Therapy, psychiatric evaluation, stress support, and integrated behavioral-health care within the wider medical ecosystem.",
    summary: "This service page supports program updates, therapist assignments, and education content without rebuilding the frontend.",
    icon: "brain",
    previewImage: image(serviceMentalHero, "Mental health illustration"),
    heroCopy: "Behavioral health care should feel accessible, compassionate, and connected to your overall wellness.",
    features: [
      item("Therapy pathways", "Describe counseling options, intake expectations, and follow-up structure in editable blocks.", { icon: "message-square" }),
      item("Psychiatric evaluation", "Clarify assessment steps, medication support, and coordination with other care teams.", { icon: "brain" }),
      item("Stress and resilience care", "Support for stress, anxiety, emotional wellness, and everyday coping.", { icon: "heart" }),
      item("Integrated care coordination", "Connect mental-health services to primary care and chronic-care pathways.", { icon: "users" }),
    ],
    benefits: [
      item("Better accessibility", "Editable content helps reduce stigma and clarify what getting help looks like.", { icon: "heart" }),
      item("Flexible care options", "Support in-person visits, virtual care, and coordinated follow-up.", { icon: "sparkles" }),
      item("Connected patient journey", "Keep referrals, medication follow-up, and education aligned across teams.", { icon: "activity" }),
    ],
    statItems: [
      item("Visit options", "", { value: "Virtual + in-person", icon: "globe" }),
      item("Care model", "", { value: "Integrated", icon: "users" }),
      item("Publishing flexibility", "", { value: "High", icon: "sparkles" }),
    ],
    seoDescription: "Mental health services including therapy, psychiatric evaluation, stress support, and integrated behavioral health care.",
  }),
  buildService({
    slug: "substance-use-treatment",
    title: "Substance Use Treatment",
    shortTitle: "Recovery Support",
    excerpt: "Evidence-based treatment, counseling, medication-assisted treatment, and recovery support with a structured digital presence.",
    summary: "The recovery-support page is built for evolving programs, clinician assignments, community resources, and compassionate editorial control.",
    icon: "hand-heart",
    previewImage: image(serviceSubstanceHero, "Substance use treatment illustration"),
    heroCopy: "Recovery support should be compassionate, clear, and focused on each patient's path forward.",
    features: [
      item("Assessment and intake", "Describe confidential entry points and first-step expectations clearly.", { icon: "message-square" }),
      item("Medication-assisted treatment", "Evidence-based medication support as part of a broader recovery plan.", { icon: "pill" }),
      item("Counseling and support", "Highlight therapy, family support, and peer recovery pathways.", { icon: "users" }),
      item("Aftercare planning", "Ongoing support, community resources, and follow-up planning for continued recovery.", { icon: "globe" }),
    ],
    benefits: [
      item("Confidential, patient-first messaging", "Give staff control over tone and clarity as programs evolve.", { icon: "shield" }),
      item("Program adaptability", "Update services, support models, and CTA pathways without redesign work.", { icon: "sparkles" }),
      item("Stronger resource visibility", "Promote support options, community resources, and follow-up expectations.", { icon: "book-open" }),
    ],
    statItems: [
      item("Care model", "", { value: "Evidence-based", icon: "shield" }),
      item("Support depth", "", { value: "Assessment to aftercare", icon: "users" }),
      item("Care approach", "", { value: "Coordinated", icon: "sparkles" }),
    ],
    seoDescription: "Substance use treatment services including assessment, counseling, medication-assisted treatment, and recovery support.",
  }),
  buildService({
    slug: "geriatric-care",
    title: "Geriatric Care",
    shortTitle: "Geriatric Care",
    excerpt: "Comprehensive support for aging adults, caregivers, memory concerns, chronic conditions, and independence planning.",
    summary: "Comprehensive care for aging adults, caregivers, memory concerns, chronic conditions, and healthy aging.",
    icon: "users",
    previewImage: image(serviceGeriatricHero, "Geriatric care illustration"),
    heroCopy: "Geriatric care should support both patients and caregivers with practical guidance, planning, and long-term coordination.",
    features: [
      item("Comprehensive assessments", "Explain functional, cognitive, and preventive reviews in a clearer way.", { icon: "stethoscope" }),
      item("Caregiver coordination", "Add service-specific resources, caregiver tips, or support pathways as needed.", { icon: "users" }),
      item("Memory support", "Publish evolving content for cognitive screening, follow-up, and referral options.", { icon: "brain" }),
      item("Healthy-aging planning", "Highlight fall prevention, medication review, and independence support.", { icon: "activity" }),
    ],
    benefits: [
      item("Patient and caregiver clarity", "Keep page copy understandable for families coordinating longer-term care.", { icon: "message-square" }),
      item("Program-specific education", "Helpful information for healthy aging, safety, memory support, and caregiver coordination.", { icon: "book-open" }),
      item("Flexible support content", "Support home-based, virtual, or in-office care models without route rewrites.", { icon: "sparkles" }),
    ],
    statItems: [
      item("Care audience", "", { value: "Patients + caregivers", icon: "users" }),
      item("Support model", "", { value: "Long-term", icon: "activity" }),
      item("Care focus", "", { value: "Aging well", icon: "sparkles" }),
    ],
    seoDescription: "Geriatric care services supporting aging adults, caregivers, memory concerns, and long-term wellness.",
  }),
  buildService({
    slug: "urgent-care",
    title: "Urgent Care",
    shortTitle: "Urgent Care",
    excerpt: "Fast, non-emergency care for minor illnesses and injuries, with telehealth and in-person pathways.",
    summary: "Fast, non-emergency care for minor illnesses and injuries with in-person and virtual support.",
    icon: "clock",
    previewImage: image(serviceUrgentHero, "Urgent care illustration"),
    heroCopy: "When you need prompt care for a non-emergency illness or injury, our urgent care team is here to help.",
    features: [
      item("Cold and flu care", "Prompt evaluation and treatment for common illnesses and seasonal symptoms.", { icon: "activity" }),
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
      item("Access support", "", { value: "Same-day guidance", icon: "sparkles" }),
    ],
    seoDescription: "Urgent care services for minor illnesses, injuries, rapid testing, and same-day guidance.",
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
