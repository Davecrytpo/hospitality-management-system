import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Bandage,
  BookOpenText,
  Brain,
  CalendarDays,
  CheckSquare,
  ClipboardCheck,
  ClipboardList,
  Clock3,
  Ear,
  Eye,
  FlaskConical,
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
} from "lucide-react";

import chronicHeroImage from "@/assets/service-page-chronic-hero.png";
import geriatricHeroImage from "@/assets/service-page-geriatric-hero.png";
import mentalHeroImage from "@/assets/service-page-mental-hero.png";
import mensHeroImage from "@/assets/service-page-mens-hero.png";
import preventiveHeroImage from "@/assets/service-page-preventive-hero.png";
import primaryHeroImage from "@/assets/service-page-primary-hero.png";
import substanceHeroImage from "@/assets/service-page-substance-hero.png";
import urgentHeroImage from "@/assets/service-page-urgent-hero.png";
import womensHeroImage from "@/assets/service-page-womens-hero.png";

export type ServicePageSlug =
  | "primary-care"
  | "preventive-care"
  | "womens-health"
  | "chronic-disease-management"
  | "mental-health-services"
  | "substance-use-treatment"
  | "mens-health"
  | "geriatric-care"
  | "urgent-care";

export type ServiceAccent = "blue" | "red";

export type ServiceAction =
  | { kind: "appointment"; label: string }
  | { kind: "link"; label: string; href: string }
  | { kind: "phone"; label: string; href: string };

export interface ServiceDirectoryCard {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  accent: ServiceAccent;
  bullets: string[];
  href: string;
  badge?: string;
  featuredOnHome?: boolean;
}

export interface ServiceBadge {
  label: string;
  icon: LucideIcon;
  accent: ServiceAccent;
}

export interface ServiceOffering {
  title: string;
  description: string;
  icon: LucideIcon;
  accent: ServiceAccent;
  bullets?: string[];
}

export interface ServiceBullet {
  label?: string;
  text: string;
}

export interface ServiceChoice {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface ServiceBulletPanel {
  type: "bulletCard";
  title: string;
  intro?: string;
  bullets: ServiceBullet[];
  columns?: 1 | 2;
  note?: string;
  noteIcon?: LucideIcon;
  watermarkIcon?: LucideIcon;
}

export interface ServiceCtaPanel {
  type: "ctaCard";
  title: string;
  intro: string;
  icon: LucideIcon;
  action: ServiceAction;
  footnote?: string;
}

export interface ServiceChoicePanel {
  type: "choiceCard";
  title: string;
  intro: string;
  options: ServiceChoice[];
  footnote?: string;
}

export type ServicePanel = ServiceBulletPanel | ServiceCtaPanel | ServiceChoicePanel;

export interface ServiceStageBandItem {
  label: string;
  icon: LucideIcon;
  accent: ServiceAccent;
}

export interface ServiceFooterColumn {
  title: string;
  description: string;
  icon: LucideIcon;
  emphasis?: string;
  action?: ServiceAction;
}

export interface ServicePageContent {
  slug: ServicePageSlug;
  navLabel: string;
  breadcrumbLabel: string;
  titleLines: Array<{ text: string; size?: "default" | "small" }>;
  subtitle: string;
  description: string;
  heroImage: string;
  heroBadges: ServiceBadge[];
  sectionTitle: string;
  sectionSubtitle: string;
  offeringsStyle: "outlined" | "split" | "condition";
  offeringRows: ServiceOffering[][];
  lowerLeftPanel: ServicePanel;
  lowerRightPanel: ServicePanel;
  stageBand: {
    icon: LucideIcon;
    accent: ServiceAccent;
    title: string;
    description: string;
    items: ServiceStageBandItem[];
  };
  footerColumns: [ServiceFooterColumn, ServiceFooterColumn, ServiceFooterColumn];
}

export const serviceDirectoryCards: ServiceDirectoryCard[] = [
  {
    number: "1.",
    title: "Primary Care",
    description: "Personalized care for your everyday health needs.",
    icon: Stethoscope,
    accent: "blue",
    bullets: ["Annual Physical Exams", "Same-Day Sick Visits", "Medication Refills", "Chronic Follow-Up"],
    href: "/services/primary-care",
    featuredOnHome: true,
  },
  {
    number: "2.",
    title: "Preventive Care",
    description: "Stay ahead with screenings and preventive services.",
    icon: ShieldCheck,
    accent: "red",
    bullets: ["Annual Wellness Visits", "Cancer Screenings", "Vaccinations", "STD Testing"],
    href: "/services/preventive-care",
    featuredOnHome: true,
  },
  {
    number: "3.",
    title: "Chronic Disease Management",
    description: "Ongoing care to help you manage chronic conditions.",
    icon: HeartPulse,
    accent: "blue",
    bullets: ["Diabetes Management", "Hypertension Care", "Thyroid Support", "Weight Management"],
    href: "/services/chronic-disease-management",
    featuredOnHome: true,
  },
  {
    number: "4.",
    title: "Women's Health",
    description: "Compassionate care for every stage of life.",
    icon: Heart,
    accent: "red",
    bullets: ["Well-Woman Exams", "Pap Smears", "Breast Health", "Menopause Care"],
    href: "/services/womens-health",
    featuredOnHome: true,
  },
  {
    number: "5.",
    title: "Men's Health",
    description: "Focused care for men's health and wellness.",
    icon: UserRound,
    accent: "blue",
    bullets: ["Physical Exams", "Prostate Screenings", "Testosterone Care", "Lab Testing"],
    href: "/services/mens-health",
  },
  {
    number: "6.",
    title: "Mental Health Services",
    description: "Support for your mental wellness and emotional well-being.",
    icon: Brain,
    accent: "blue",
    bullets: ["Individual Therapy", "Stress Management", "Psychiatric Evaluation", "Ongoing Support"],
    href: "/services/mental-health-services",
    badge: "Integrated Care",
    featuredOnHome: true,
  },
  {
    number: "7.",
    title: "Substance Use Treatment",
    description: "Evidence-based treatment and recovery support.",
    icon: HandHeart,
    accent: "red",
    bullets: ["Assessment & Evaluation", "MAT", "Individual Therapy", "Aftercare Support"],
    href: "/services/substance-use-treatment",
    badge: "Confidential Care",
    featuredOnHome: true,
  },
  {
    number: "8.",
    title: "Geriatric Care",
    description: "Comprehensive care designed for healthy aging and independence.",
    icon: Users,
    accent: "blue",
    bullets: ["Geriatric Assessments", "Fall Prevention", "Memory Support", "Care Coordination"],
    href: "/services/geriatric-care",
  },
  {
    number: "9.",
    title: "Urgent Care",
    description: "Care for minor illnesses and injuries when you need it most.",
    icon: Clock3,
    accent: "red",
    bullets: ["Cold & Flu Care", "Minor Injuries", "Lab Testing", "Telehealth Available"],
    href: "/services/urgent-care",
  },
];

export const homepageServiceCards = serviceDirectoryCards.filter((card) => card.featuredOnHome);

export const serviceNavItems = serviceDirectoryCards.map((card) => ({
  label: card.title,
  href: card.href,
}));

const servicePages: ServicePageContent[] = [
  {
    slug: "primary-care",
    navLabel: "Primary Care",
    breadcrumbLabel: "Primary Care",
    titleLines: [{ text: "Primary Care" }],
    subtitle: "Personalized care for your everyday health needs.",
    description:
      "Our primary care team is your partner in health. We provide comprehensive care for all ages, focusing on preventing illness, managing conditions, and supporting your overall well-being.",
    heroImage: primaryHeroImage,
    heroBadges: [
      { label: "Same-Day Appointments Available", icon: CalendarDays, accent: "red" },
      { label: "Most Insurance Accepted", icon: ShieldCheck, accent: "blue" },
      { label: "Care for the Whole Family", icon: Users2, accent: "red" },
      { label: "Your Health. On Time.", icon: HeartPulse, accent: "blue" },
    ],
    sectionTitle: "What We Offer",
    sectionSubtitle: "",
    offeringsStyle: "split",
    offeringRows: [
      [
        {
          title: "Annual Physical Exams",
          description: "Comprehensive physicals to keep you healthy and catch issues early.",
          icon: Stethoscope,
          accent: "blue",
        },
        {
          title: "Sick Visits (Same-Day)",
          description: "Feeling under the weather? We offer same-day appointments when you need care fast.",
          icon: ClipboardList,
          accent: "red",
        },
        {
          title: "Medication Management & Refills",
          description: "Safe, effective medication management and convenient prescription refills.",
          icon: Pill,
          accent: "blue",
        },
      ],
      [
        {
          title: "Lab Orders & Testing",
          description: "On-site and partner lab testing to monitor your health and diagnose conditions.",
          icon: TestTube2,
          accent: "red",
        },
        {
          title: "Care Coordination",
          description: "We coordinate with specialists and hospitals to ensure you get the right care at the right time.",
          icon: Users,
          accent: "blue",
        },
        {
          title: "Chronic Condition Follow-Up",
          description: "Ongoing care for diabetes, high blood pressure, asthma, and more.",
          icon: ClipboardCheck,
          accent: "red",
        },
      ],
    ],
    lowerLeftPanel: {
      type: "bulletCard",
      title: "Benefits of Primary Care",
      bullets: [
        { label: "Build a Relationship", text: "Develop a strong relationship with a provider who knows your history." },
        { label: "Early Detection", text: "Catch potential health issues early for better outcomes." },
        { label: "Prevent Complications", text: "Manage conditions and prevent complications before they start." },
        { label: "Better Health Outcomes", text: "Consistent care leads to healthier lives and fewer hospital visits." },
        { label: "Personalized Care", text: "Care tailored to your unique needs and health goals." },
      ],
    },
    lowerRightPanel: {
      type: "ctaCard",
      title: "We're Here for You",
      intro: "Your health is our priority. We're here to help you live a healthier, happier life.",
      icon: Stethoscope,
      action: { kind: "appointment", label: "Book an Appointment" },
    },
    stageBand: {
      icon: Users,
      accent: "blue",
      title: "Care for the Whole Family",
      description: "From children to seniors, we provide comprehensive primary care for every stage of life.",
      items: [
        { label: "Children", icon: UserRound, accent: "red" },
        { label: "Adults", icon: UserRound, accent: "blue" },
        { label: "Seniors", icon: Users, accent: "red" },
      ],
    },
    footerColumns: [
      {
        title: "Ready to Take the Next Step?",
        description: "We're here to help you feel your best.",
        icon: CalendarDays,
        action: { kind: "appointment", label: "Book an Appointment" },
      },
      {
        title: "Call Us Today",
        description: "We're happy to answer your questions.",
        emphasis: "410-754-4343",
        icon: Phone,
      },
      {
        title: "Patient Portal Login",
        description: "Access your health information, appointments, and more.",
        icon: Lock,
        action: { kind: "link", label: "Login Now", href: "/patient-portal/login" },
      },
    ],
  },
  {
    slug: "preventive-care",
    navLabel: "Preventive Care",
    breadcrumbLabel: "Preventive Care",
    titleLines: [{ text: "Preventive Care" }],
    subtitle: "Stay ahead with screenings and preventive services.",
    description:
      "Preventive care helps detect potential health issues early - often before symptoms appear. Our goal is to keep you healthy, catch problems early, and support your long-term well-being.",
    heroImage: preventiveHeroImage,
    heroBadges: [
      { label: "Early Detection Saves Lives", icon: ShieldCheck, accent: "blue" },
      { label: "Care for Every Stage of Life", icon: Users2, accent: "blue" },
      { label: "Better Health Outcomes", icon: HeartPulse, accent: "red" },
      { label: "Covered by Most Insurance Plans", icon: ClipboardCheck, accent: "blue" },
    ],
    sectionTitle: "Our Preventive Services",
    sectionSubtitle: "Comprehensive screenings and preventive care tailored to your age, gender, and health history.",
    offeringsStyle: "split",
    offeringRows: [
      [
        {
          title: "Annual Wellness Visits",
          description: "Yearly wellness exams to review your health, update screenings, and create a personalized prevention plan.",
          icon: Stethoscope,
          accent: "blue",
        },
        {
          title: "Cancer Screenings",
          description: "Early detection is key. We offer screenings for breast, cervical, and colorectal cancers.",
          icon: ShieldCheck,
          accent: "red",
        },
        {
          title: "Blood Pressure & Cholesterol Screening",
          description: "Quick and easy checks to monitor your heart health and reduce risk of serious conditions.",
          icon: HeartPulse,
          accent: "blue",
        },
      ],
      [
        {
          title: "Diabetes Screening",
          description: "Screenings to identify prediabetes or diabetes early - when it's most manageable.",
          icon: Activity,
          accent: "red",
        },
        {
          title: "STD Testing & Screening",
          description: "Confidential testing and counseling to protect your health and peace of mind.",
          icon: TestTube2,
          accent: "blue",
        },
        {
          title: "Vaccinations & More",
          description: "Stay protected with recommended vaccines including flu, COVID-19, pneumonia, and more.",
          icon: Syringe,
          accent: "red",
        },
      ],
    ],
    lowerLeftPanel: {
      type: "bulletCard",
      title: "Benefits of Preventive Care",
      bullets: [
        { label: "Catch Issues Early", text: "Detect health problems before they become serious." },
        { label: "Lower Healthcare Costs", text: "Prevention can reduce the need for costly treatments later." },
        { label: "Live a Longer, Healthier Life", text: "Small steps today lead to better outcomes tomorrow." },
        { label: "Personalized Prevention", text: "We tailor screenings and recommendations to you." },
      ],
    },
    lowerRightPanel: {
      type: "ctaCard",
      title: "Take Control of Your Health",
      intro: "Prevention is the best protection. Schedule your preventive care visit today.",
      icon: CalendarDays,
      action: { kind: "appointment", label: "Book an Appointment" },
    },
    stageBand: {
      icon: Users2,
      accent: "blue",
      title: "Care for Every Stage of Life",
      description: "From children to seniors, we provide age-appropriate screenings and preventive care to help you stay healthy at every step.",
      items: [
        { label: "Children", icon: UserRound, accent: "blue" },
        { label: "Adults", icon: UserRound, accent: "blue" },
        { label: "Women", icon: Heart, accent: "red" },
        { label: "Seniors", icon: Users, accent: "blue" },
      ],
    },
    footerColumns: [
      {
        title: "Ready to Take the Next Step?",
        description: "We're here to help you feel your best.",
        icon: CalendarDays,
        action: { kind: "appointment", label: "Book an Appointment" },
      },
      {
        title: "Call Us Today",
        description: "We're happy to answer your questions.",
        emphasis: "410-754-4343",
        icon: Phone,
      },
      {
        title: "Patient Portal Login",
        description: "Access your health information, appointments, and more.",
        icon: Lock,
        action: { kind: "link", label: "Login Now", href: "/patient-portal/login" },
      },
    ],
  },
  {
    slug: "womens-health",
    navLabel: "Women's Health",
    breadcrumbLabel: "Women's Health",
    titleLines: [{ text: "Women's Health" }],
    subtitle: "Compassionate care for every stage of life.",
    description:
      "We provide comprehensive women's health services in a comfortable, supportive environment. From preventive care to specialized services, we're here to support your health and well-being.",
    heroImage: womensHeroImage,
    heroBadges: [
      { label: "Personalized Care", icon: UserRound, accent: "red" },
      { label: "Confidential & Respectful", icon: ShieldCheck, accent: "blue" },
      { label: "Whole-Person Approach", icon: HeartHandshake, accent: "red" },
      { label: "Care for Every Stage of Life", icon: Users2, accent: "blue" },
    ],
    sectionTitle: "Our Women's Health Services",
    sectionSubtitle: "Comprehensive care tailored to your unique needs at every stage of life.",
    offeringsStyle: "outlined",
    offeringRows: [
      [
        {
          title: "Well-Woman Exams",
          description: "Routine exams to monitor your overall health and catch issues early.",
          icon: CalendarDays,
          accent: "red",
        },
        {
          title: "Pap Smears",
          description: "Cervical cancer screening to help you stay healthy and worry-free.",
          icon: ShieldCheck,
          accent: "blue",
        },
        {
          title: "Birth Control Counseling & Management",
          description: "We help you find the right birth control option for your lifestyle and goals.",
          icon: NotebookPen,
          accent: "red",
        },
        {
          title: "Hormonal & Menstrual Care",
          description: "Diagnosis and treatment for irregular periods, PMS, PCOS, and menopause symptoms.",
          icon: HeartPulse,
          accent: "blue",
        },
      ],
      [
        {
          title: "Preconception & Family Planning",
          description: "Guidance and support as you plan for a healthy future.",
          icon: Syringe,
          accent: "red",
        },
        {
          title: "Breast Health",
          description: "Clinical breast exams and referrals for imaging when needed.",
          icon: Heart,
          accent: "blue",
        },
        {
          title: "Menopause Management",
          description: "Personalized care to help you manage symptoms and feel your best.",
          icon: UserRound,
          accent: "red",
        },
        {
          title: "STD Testing & Treatment",
          description: "Confidential testing, treatment, and counseling for your peace of mind.",
          icon: TestTube2,
          accent: "blue",
        },
      ],
    ],
    lowerLeftPanel: {
      type: "bulletCard",
      title: "Benefits of Women's Health Care",
      bullets: [
        { label: "Early Detection", text: "Regular exams help detect potential issues early." },
        { label: "Personalized Care", text: "Treatment plans tailored to your unique needs." },
        { label: "Better Quality of Life", text: "Support for physical, emotional, and hormonal health." },
        { label: "Preventive Care", text: "Screenings and guidance to help prevent future problems." },
        { label: "Empowerment", text: "We listen, educate, and empower you to make informed decisions about your health." },
      ],
    },
    lowerRightPanel: {
      type: "ctaCard",
      title: "Your Health. Our Priority.",
      intro: "We're here to support you with compassionate care you can trust.",
      icon: Heart,
      action: { kind: "appointment", label: "Book an Appointment" },
      footnote: "Same-day appointments may be available.",
    },
    stageBand: {
      icon: Users2,
      accent: "red",
      title: "Care for Every Stage of Life",
      description: "From your first visit to every milestone after, we're with you every step of the way.",
      items: [
        { label: "Adolescence", icon: UserRound, accent: "red" },
        { label: "Reproductive Years", icon: Users2, accent: "blue" },
        { label: "Pregnancy Planning", icon: UserRound, accent: "red" },
        { label: "Menopause", icon: UserRound, accent: "blue" },
        { label: "Beyond", icon: Heart, accent: "red" },
      ],
    },
    footerColumns: [
      {
        title: "Ready to Take the Next Step?",
        description: "We're here to help you feel your best.",
        icon: CalendarDays,
        action: { kind: "appointment", label: "Book an Appointment" },
      },
      {
        title: "Call Us Today",
        description: "Our team is here to help you.",
        emphasis: "410-754-4343",
        icon: Phone,
      },
      {
        title: "Patient Portal Login",
        description: "Access your health information, appointments, and more.",
        icon: Lock,
        action: { kind: "link", label: "Login Now", href: "/patient-portal/login" },
      },
    ],
  },
  {
    slug: "chronic-disease-management",
    navLabel: "Chronic Disease Management",
    breadcrumbLabel: "Chronic Disease Management",
    titleLines: [{ text: "Chronic Disease" }, { text: "Management" }],
    subtitle: "Ongoing care to help you manage chronic conditions and live a healthier, fuller life.",
    description:
      "Our team works with you to create personalized treatment plans, monitor your progress, and provide the support and education you need to stay in control of your health.",
    heroImage: chronicHeroImage,
    heroBadges: [
      { label: "Personalized Treatment Plans", icon: Users2, accent: "blue" },
      { label: "Regular Monitoring", icon: HeartPulse, accent: "blue" },
      { label: "Prevent Complications", icon: ShieldCheck, accent: "blue" },
      { label: "Better Health Outcomes", icon: UserRound, accent: "blue" },
    ],
    sectionTitle: "Conditions We Manage",
    sectionSubtitle: "We provide expert care and ongoing support for a wide range of chronic conditions.",
    offeringsStyle: "condition",
    offeringRows: [
      [
        {
          title: "Diabetes Management",
          description: "We help you manage blood sugar levels, monitor A1c, adjust medications, and prevent complications.",
          icon: Activity,
          accent: "blue",
          bullets: ["A1c Testing", "Medication Management", "Nutrition & Lifestyle Guidance"],
        },
        {
          title: "High Blood Pressure (Hypertension)",
          description: "We monitor and manage blood pressure to reduce your risk of heart disease, stroke, and kidney problems.",
          icon: HeartPulse,
          accent: "red",
          bullets: ["Regular Monitoring", "Medication Management", "Lifestyle Recommendations"],
        },
        {
          title: "High Cholesterol",
          description: "We help manage cholesterol levels to improve heart health and lower cardiovascular risk.",
          icon: Heart,
          accent: "blue",
          bullets: ["Lipid Profile Testing", "Medication Management", "Diet & Exercise Guidance"],
        },
      ],
      [
        {
          title: "Asthma & COPD",
          description: "We provide ongoing care to help you breathe easier and reduce flare-ups.",
          icon: Stethoscope,
          accent: "red",
          bullets: ["Symptom Management", "Inhaler & Medication Management", "Action Plan Development"],
        },
        {
          title: "Thyroid Disorders",
          description: "We diagnose and manage thyroid conditions to help maintain energy, mood, and overall wellness.",
          icon: HeartHandshake,
          accent: "blue",
          bullets: ["Thyroid Testing", "Medication Management", "Ongoing Monitoring"],
        },
        {
          title: "Weight Management",
          description: "We create personalized plans to help you reach and maintain a healthy weight.",
          icon: ClipboardList,
          accent: "red",
          bullets: ["Weight Loss Support", "Nutrition Counseling", "Lifestyle Coaching"],
        },
      ],
    ],
    lowerLeftPanel: {
      type: "bulletCard",
      title: "Benefits of Chronic Disease Management",
      bullets: [
        { label: "Better Control", text: "Keep your condition under control and feel your best." },
        { label: "Fewer Complications", text: "Lower your risk of serious health problems." },
        { label: "Improved Quality of Life", text: "More energy, fewer symptoms, and greater independence." },
        { label: "Personalized Care", text: "Treatment plans designed specifically for you." },
        { label: "Ongoing Support", text: "We're with you every step of the way." },
      ],
    },
    lowerRightPanel: {
      type: "ctaCard",
      title: "You Don't Have to Manage Alone",
      intro: "Our team is here to support you with compassionate care and proven strategies.",
      icon: ShieldCheck,
      action: { kind: "appointment", label: "Book an Appointment" },
    },
    stageBand: {
      icon: Users2,
      accent: "blue",
      title: "Better Health Outcomes Start Here",
      description: "With the right care, support, and tools, you can take control of your health and enjoy life to the fullest.",
      items: [
        { label: "Expert Care", icon: UserRound, accent: "blue" },
        { label: "Ongoing Monitoring", icon: ClipboardCheck, accent: "blue" },
        { label: "Education", icon: BookOpenText, accent: "blue" },
        { label: "Support", icon: HeartPulse, accent: "blue" },
      ],
    },
    footerColumns: [
      {
        title: "Ready to Take the Next Step?",
        description: "Let us help you manage your health and live better every day.",
        icon: CalendarDays,
        action: { kind: "appointment", label: "Book an Appointment" },
      },
      {
        title: "Call Us Today",
        description: "We're here to answer your questions and schedule your visit.",
        emphasis: "410-754-4343",
        icon: Phone,
      },
      {
        title: "Patient Portal Login",
        description: "Access your health information, appointments, and more.",
        icon: Lock,
        action: { kind: "link", label: "Login Now", href: "/patient-portal/login" },
      },
    ],
  },
  {
    slug: "mental-health-services",
    navLabel: "Mental Health Services",
    breadcrumbLabel: "Mental Health Services",
    titleLines: [{ text: "Mental Health" }, { text: "Services" }],
    subtitle: "Compassionate care for your mind and well-being.",
    description:
      "Your mental health is just as important as your physical health. Our caring team provides personalized support, therapy, and treatment to help you feel your best and live a more balanced, fulfilling life.",
    heroImage: mentalHeroImage,
    heroBadges: [
      { label: "Personalized Care", icon: UserRound, accent: "red" },
      { label: "Confidential & Respectful", icon: ShieldCheck, accent: "blue" },
      { label: "Evidence-Based Treatment", icon: Brain, accent: "red" },
      { label: "Support for Every Step of Your Journey", icon: Users2, accent: "blue" },
    ],
    sectionTitle: "Our Mental Health Services",
    sectionSubtitle: "Comprehensive care to support your emotional well-being and mental wellness.",
    offeringsStyle: "outlined",
    offeringRows: [
      [
        {
          title: "Individual Therapy",
          description: "One-on-one sessions to help you manage challenges, build coping skills, and improve your overall well-being.",
          icon: Brain,
          accent: "blue",
        },
        {
          title: "Anxiety & Stress Management",
          description: "Effective strategies and treatment to reduce anxiety, stress, and worry.",
          icon: Users,
          accent: "red",
        },
        {
          title: "Depression Treatment",
          description: "Compassionate care to help you overcome depression and regain a positive outlook.",
          icon: Activity,
          accent: "blue",
        },
        {
          title: "Life Transitions Support",
          description: "Support through major life changes such as work, school, relationships, and bereavement.",
          icon: UserRound,
          accent: "red",
        },
      ],
      [
        {
          title: "Trauma & PTSD Support",
          description: "Specialized care to help process trauma and improve emotional resilience.",
          icon: Brain,
          accent: "red",
        },
        {
          title: "Sleep & Mood Concerns",
          description: "Evaluation and treatment for sleep issues, mood swings, and related concerns.",
          icon: MoonStar,
          accent: "blue",
        },
        {
          title: "Psychiatric Evaluation & Medication Management",
          description: "Comprehensive evaluations and medication management when appropriate.",
          icon: ClipboardCheck,
          accent: "red",
        },
        {
          title: "Ongoing Support & Follow-Up",
          description: "Continuous support and follow-up to help you stay on track and achieve your goals.",
          icon: HeartHandshake,
          accent: "blue",
        },
      ],
    ],
    lowerLeftPanel: {
      type: "bulletCard",
      title: "Benefits of Mental Health Care",
      bullets: [
        { label: "Improved Well-Being", text: "Feel better emotionally and mentally." },
        { label: "Better Coping Skills", text: "Learn tools to manage life's challenges." },
        { label: "Stronger Relationships", text: "Improve communication and connections." },
        { label: "Increased Resilience", text: "Build confidence and overcome obstacles." },
        { label: "Personalized Care", text: "Treatment tailored to your unique needs and goals." },
      ],
    },
    lowerRightPanel: {
      type: "ctaCard",
      title: "You Don't Have to Face It Alone",
      intro: "We're here to listen, support, and help you take the next step toward feeling better.",
      icon: HeartHandshake,
      action: { kind: "appointment", label: "Book an Appointment" },
      footnote: "Same-day appointments may be available.",
    },
    stageBand: {
      icon: Users2,
      accent: "blue",
      title: "Care That Fits Your Life",
      description: "We offer flexible appointment times and a supportive environment where you can feel comfortable and heard.",
      items: [
        { label: "Compassionate Team", icon: Users2, accent: "blue" },
        { label: "Confidential Care", icon: ShieldCheck, accent: "blue" },
        { label: "Convenient Appointments", icon: CalendarDays, accent: "blue" },
        { label: "Patient-Focused Approach", icon: HeartPulse, accent: "blue" },
      ],
    },
    footerColumns: [
      {
        title: "Ready to Take the Next Step?",
        description: "We're here to help you feel your best.",
        icon: CalendarDays,
        action: { kind: "appointment", label: "Book an Appointment" },
      },
      {
        title: "Call Us Today",
        description: "We're happy to answer your questions and help you schedule your visit.",
        emphasis: "410-754-4343",
        icon: Phone,
      },
      {
        title: "Patient Portal Login",
        description: "Access your health information, appointments, and more.",
        icon: Lock,
        action: { kind: "link", label: "Login Now", href: "/patient-portal/login" },
      },
    ],
  },
  {
    slug: "substance-use-treatment",
    navLabel: "Substance Use Treatment",
    breadcrumbLabel: "Substance Use Treatment (Addiction & Recovery)",
    titleLines: [{ text: "Substance Use" }, { text: "Treatment" }, { text: "(Addiction & Recovery)", size: "small" }],
    subtitle: "Compassionate care. Real support. Lasting recovery.",
    description:
      "Recovery is possible, and you don't have to do it alone. Our team provides evidence-based treatment, ongoing support, and personalized care to help you break free from addiction and build a healthier, fulfilling life.",
    heroImage: substanceHeroImage,
    heroBadges: [
      { label: "Judgment-Free Care", icon: UserRound, accent: "blue" },
      { label: "Personalized Treatment Plans", icon: HeartHandshake, accent: "blue" },
      { label: "Confidential & Respectful", icon: ShieldCheck, accent: "blue" },
      { label: "Support for Long-Term Recovery", icon: Users2, accent: "blue" },
    ],
    sectionTitle: "Our Addiction & Recovery Services",
    sectionSubtitle: "Comprehensive, evidence-based care for every stage of recovery.",
    offeringsStyle: "outlined",
    offeringRows: [
      [
        {
          title: "Assessment & Evaluation",
          description: "Thorough evaluations to understand your needs and create the right treatment plan.",
          icon: HeartHandshake,
          accent: "blue",
        },
        {
          title: "Detox Referral & Support",
          description: "Safe, medically supervised detox referrals and support to help you take the first step.",
          icon: ShieldCheck,
          accent: "blue",
        },
        {
          title: "Withdrawal Management (Outpatient)",
          description: "Medical monitoring and support to safely manage withdrawal symptoms in an outpatient setting.",
          icon: Users,
          accent: "blue",
        },
        {
          title: "Medication-Assisted Treatment (MAT)",
          description: "FDA-approved medications combined with counseling to reduce cravings and support long-term recovery.",
          icon: Brain,
          accent: "red",
        },
        {
          title: "Individual Therapy",
          description: "One-on-one therapy to address the underlying causes of addiction and build coping strategies.",
          icon: UserRound,
          accent: "blue",
        },
        {
          title: "Group Therapy & Peer Support",
          description: "Connect with others who understand and gain strength through shared experiences.",
          icon: Users2,
          accent: "blue",
        },
      ],
      [
        {
          title: "Family Support & Education",
          description: "We help families heal, learn, and build healthier relationships through education and support.",
          icon: Users2,
          accent: "red",
        },
        {
          title: "Relapse Prevention",
          description: "Tools and strategies to help you maintain sobriety and prevent relapse.",
          icon: HeartPulse,
          accent: "blue",
        },
        {
          title: "Aftercare & Ongoing Support",
          description: "Continued care and support to help you stay on track and thrive in recovery.",
          icon: ClipboardList,
          accent: "red",
        },
        {
          title: "Case Management & Care Coordination",
          description: "We connect you with resources and coordinate care for a seamless recovery journey.",
          icon: ClipboardCheck,
          accent: "blue",
        },
        {
          title: "Co-Occurring Disorder Treatment",
          description: "Integrated care for mental health and substance use disorders.",
          icon: HeartHandshake,
          accent: "red",
        },
        {
          title: "Sober Living & Community Resources",
          description: "Connections to sober living options and community resources for long-term success.",
          icon: HandHeart,
          accent: "red",
        },
      ],
    ],
    lowerLeftPanel: {
      type: "bulletCard",
      title: "Benefits of Our Addiction & Recovery Care",
      bullets: [
        { label: "Personalized Care", text: "Treatment plans tailored to your unique needs." },
        { label: "Evidence-Based Treatment", text: "Proven therapies and medications that work." },
        { label: "Whole-Person Approach", text: "We treat the mind, body, and spirit." },
        { label: "Long-Term Support", text: "Ongoing care to help you achieve lasting recovery." },
        { label: "Hope & Healing", text: "A team that believes in you and your future." },
      ],
    },
    lowerRightPanel: {
      type: "ctaCard",
      title: "You Don't Have to Do This Alone",
      intro: "We're here to help you take the first step toward a healthier, substance-free life.",
      icon: HandHeart,
      action: { kind: "appointment", label: "Book an Appointment" },
      footnote: "Same-day appointments may be available.",
    },
    stageBand: {
      icon: Users2,
      accent: "blue",
      title: "Recovery is Possible",
      description: "With the right support, treatment, and resources, you can rebuild your life and your future.",
      items: [
        { label: "Compassionate Team", icon: Heart, accent: "blue" },
        { label: "Confidential Care", icon: ShieldCheck, accent: "blue" },
        { label: "Respect & Dignity", icon: Users2, accent: "blue" },
        { label: "Every Step of the Way", icon: HandHeart, accent: "blue" },
      ],
    },
    footerColumns: [
      {
        title: "Ready to Take the Next Step?",
        description: "We're here to help you or your loved one start the journey to recovery.",
        icon: CalendarDays,
        action: { kind: "appointment", label: "Book an Appointment" },
      },
      {
        title: "Call Us Today",
        description: "We're happy to answer your questions and help you get the support you need.",
        emphasis: "410-754-4343",
        icon: Phone,
      },
      {
        title: "Patient Portal Login",
        description: "Access your health information, appointments, and more.",
        icon: Lock,
        action: { kind: "link", label: "Login Now", href: "/patient-portal/login" },
      },
    ],
  },
  {
    slug: "mens-health",
    navLabel: "Men's Health",
    breadcrumbLabel: "Men's Health",
    titleLines: [{ text: "Men's Health" }],
    subtitle: "Focused care for men's health and wellness.",
    description:
      "We provide comprehensive men's health services designed to help you stay healthy, prevent illness, and address concerns at every stage of life.",
    heroImage: mensHeroImage,
    heroBadges: [
      { label: "Personalized Care", icon: UserRound, accent: "red" },
      { label: "Confidential & Respectful", icon: ShieldCheck, accent: "blue" },
      { label: "Preventive Approach", icon: Heart, accent: "red" },
      { label: "Care for Every Stage of Life", icon: Users2, accent: "blue" },
    ],
    sectionTitle: "Our Men's Health Services",
    sectionSubtitle: "Expert care for prevention, wellness, and managing men's health concerns.",
    offeringsStyle: "outlined",
    offeringRows: [
      [
        {
          title: "Annual Physical Exams",
          description: "Comprehensive exams to monitor your overall health and catch issues early.",
          icon: ClipboardCheck,
          accent: "blue",
        },
        {
          title: "Prostate Health Screenings",
          description: "Screenings to detect prostate issues early, including PSA testing and exams.",
          icon: Activity,
          accent: "red",
        },
        {
          title: "Testosterone Evaluation & Management",
          description: "Assessment and treatment for low testosterone and related symptoms.",
          icon: HeartPulse,
          accent: "blue",
        },
        {
          title: "Cardiovascular Health",
          description: "Assess and manage risk factors like high blood pressure, high cholesterol, and more.",
          icon: HeartHandshake,
          accent: "red",
        },
      ],
      [
        {
          title: "Weight Management",
          description: "Personalized plans to help you achieve and maintain a healthy weight.",
          icon: ClipboardList,
          accent: "red",
        },
        {
          title: "Stress & Mental Well-Being",
          description: "Support for stress, mood, and mental well-being to help you feel your best.",
          icon: Brain,
          accent: "blue",
        },
        {
          title: "Erectile Dysfunction (ED) Treatment",
          description: "Effective, confidential treatments to help improve performance and confidence.",
          icon: Activity,
          accent: "red",
        },
        {
          title: "Lab Testing",
          description: "In-office or partner lab testing for a wide range of men's health concerns.",
          icon: TestTube2,
          accent: "blue",
        },
      ],
    ],
    lowerLeftPanel: {
      type: "bulletCard",
      title: "Benefits of Men's Health Care",
      bullets: [
        { label: "Early Detection", text: "Catch potential issues early for better outcomes." },
        { label: "Improved Quality of Life", text: "Address concerns and feel your best physically and mentally." },
        { label: "Preventive Care", text: "Reduce the risk of serious health conditions." },
        { label: "Personalized Treatment", text: "Care tailored to your unique needs and goals." },
        { label: "Confidential & Comfortable", text: "Your health is private with a team you can trust." },
      ],
    },
    lowerRightPanel: {
      type: "ctaCard",
      title: "Your Health Matters",
      intro: "We're here to help you stay strong, healthy, and in control of your well-being.",
      icon: ShieldCheck,
      action: { kind: "appointment", label: "Book an Appointment" },
      footnote: "Same-day appointments may be available.",
    },
    stageBand: {
      icon: Users2,
      accent: "blue",
      title: "Care for Every Stage of Life",
      description: "From your 20s to your 60s and beyond, we're here for your health at every stage.",
      items: [
        { label: "20s & 30s", icon: UserRound, accent: "blue" },
        { label: "40s & 50s", icon: UserRound, accent: "red" },
        { label: "60+", icon: UserRound, accent: "blue" },
        { label: "Every Stage", icon: Heart, accent: "red" },
      ],
    },
    footerColumns: [
      {
        title: "Ready to Take the Next Step?",
        description: "We're here to help you feel your best.",
        icon: CalendarDays,
        action: { kind: "appointment", label: "Book an Appointment" },
      },
      {
        title: "Call Us Today",
        description: "We're happy to answer your questions and help you schedule your visit.",
        emphasis: "410-754-4343",
        icon: Phone,
      },
      {
        title: "Patient Portal Login",
        description: "Access your health information, appointments, and more.",
        icon: Lock,
        action: { kind: "link", label: "Login Now", href: "/patient-portal/login" },
      },
    ],
  },
  {
    slug: "geriatric-care",
    navLabel: "Geriatric Care",
    breadcrumbLabel: "Geriatric Care",
    titleLines: [{ text: "Geriatric Care" }],
    subtitle: "Compassionate care for every stage of aging.",
    description:
      "We provide comprehensive, personalized care for older adults to help maintain health, independence, and quality of life. Our experienced team focuses on prevention, early detection, and treatment of age-related conditions with dignity and respect.",
    heroImage: geriatricHeroImage,
    heroBadges: [
      { label: "Compassionate Care", icon: HeartHandshake, accent: "blue" },
      { label: "Safe & Respectful", icon: ShieldCheck, accent: "red" },
      { label: "Comprehensive Support", icon: Users2, accent: "blue" },
      { label: "Focused on Your Quality of Life", icon: HeartPulse, accent: "red" },
    ],
    sectionTitle: "Our Geriatric Care Services",
    sectionSubtitle: "Personalized care to help older adults stay healthy and independent.",
    offeringsStyle: "outlined",
    offeringRows: [
      [
        {
          title: "Comprehensive Geriatric Assessment",
          description: "Thorough evaluations to address medical, functional, cognitive, and emotional health.",
          icon: Stethoscope,
          accent: "blue",
        },
        {
          title: "Chronic Disease Management",
          description: "Ongoing care for conditions like diabetes, hypertension, heart disease, arthritis, and more.",
          icon: Heart,
          accent: "red",
        },
        {
          title: "Memory & Cognitive Health",
          description: "Evaluation and support for memory concerns, dementia, and Alzheimer's disease.",
          icon: Brain,
          accent: "blue",
        },
        {
          title: "Fall Prevention & Mobility Support",
          description: "Assessments and strategies to improve balance, strength, and reduce fall risk.",
          icon: Activity,
          accent: "red",
        },
        {
          title: "Medication Management",
          description: "Medication reviews to prevent interactions and ensure safe, effective treatment.",
          icon: Pill,
          accent: "blue",
        },
      ],
      [
        {
          title: "Nutrition & Weight Management",
          description: "Guidance to support healthy eating, weight maintenance, and overall wellness.",
          icon: Activity,
          accent: "red",
        },
        {
          title: "Mental Health Support",
          description: "Care for anxiety, depression, grief, and other emotional well-being concerns.",
          icon: Brain,
          accent: "blue",
        },
        {
          title: "Bone Health & Osteoporosis",
          description: "Screening, treatment, and prevention to maintain strong bones.",
          icon: Activity,
          accent: "red",
        },
        {
          title: "Preventive Care",
          description: "Vaccinations, screenings, and wellness visits tailored to your needs.",
          icon: Syringe,
          accent: "blue",
        },
        {
          title: "Care Coordination",
          description: "We work with specialists, families, and caregivers to deliver seamless, coordinated care.",
          icon: HandHeart,
          accent: "red",
        },
      ],
    ],
    lowerLeftPanel: {
      type: "bulletCard",
      title: "Our Approach",
      intro: "We take the time to listen, understand, and build lasting relationships with our patients and their families.",
      bullets: [
        { text: "Personalized care plans" },
        { text: "Respect for your goals and preferences" },
        { text: "Support for independence and daily living" },
        { text: "Care that evolves with your needs" },
      ],
      watermarkIcon: HeartHandshake,
    },
    lowerRightPanel: {
      type: "choiceCard",
      title: "Care Options That Fit Your Life",
      intro: "Receive quality care in the way that works best for you.",
      options: [
        {
          title: "Telehealth",
          description: "Connect with your provider from the comfort of your home.",
          icon: Activity,
        },
        {
          title: "In-Person Care",
          description: "Visit our office for personalized, face-to-face care.",
          icon: MapPin,
        },
      ],
      footnote: "Both in-person and telehealth appointments available.",
    },
    stageBand: {
      icon: Users2,
      accent: "blue",
      title: "Schedule an Appointment",
      description: "We're here to support your health and well-being.",
      items: [],
    },
    footerColumns: [
      {
        title: "Schedule an Appointment",
        description: "We're here to support your health and well-being.",
        icon: CalendarDays,
        action: { kind: "appointment", label: "Book Appointment" },
      },
      {
        title: "Call Us Today",
        description: "Our team is ready to help you or your loved one.",
        emphasis: "410-754-4343",
        icon: Phone,
      },
      {
        title: "Visit Us",
        description: "On Time Medical Group\nMultiple convenient locations to serve you.",
        icon: MapPin,
        action: { kind: "link", label: "Find a Location", href: "/about-us#contact" },
      },
    ],
  },
  {
    slug: "urgent-care",
    navLabel: "Urgent Care",
    breadcrumbLabel: "Urgent Care",
    titleLines: [{ text: "Urgent Care" }],
    subtitle: "",
    description:
      "Our urgent care clinic is here when you need immediate medical attention for non-life-threatening illnesses and injuries. We provide fast, high-quality care - both in-person and through telehealth - so you can get treated in the way that works best for you.",
    heroImage: urgentHeroImage,
    heroBadges: [
      { label: "Walk-Ins Welcome", icon: Clock3, accent: "blue" },
      { label: "Extended Hours", icon: CalendarDays, accent: "red" },
      { label: "Experienced Providers", icon: Users2, accent: "blue" },
      { label: "Quality Care You Can Trust", icon: ShieldCheck, accent: "red" },
    ],
    sectionTitle: "Our Urgent Care Services",
    sectionSubtitle: "Treatment for a wide range of non-life-threatening illnesses and injuries.",
    offeringsStyle: "outlined",
    offeringRows: [
      [
        {
          title: "Cold, Flu & Sore Throat",
          description: "Relief for common illnesses and seasonal symptoms.",
          icon: Stethoscope,
          accent: "blue",
        },
        {
          title: "Cough, Congestion & Respiratory Issues",
          description: "Evaluation and treatment for coughs, colds, and breathing concerns.",
          icon: Activity,
          accent: "red",
        },
        {
          title: "Minor Injuries",
          description: "Cuts, scrapes, sprains, strains, and minor burns.",
          icon: Bandage,
          accent: "blue",
        },
        {
          title: "Nausea, Vomiting & Diarrhea",
          description: "Care for stomach bugs and other digestive issues.",
          icon: Pill,
          accent: "red",
        },
        {
          title: "Ear Infections",
          description: "Treatment for ear pain, infections, and discomfort.",
          icon: Ear,
          accent: "blue",
        },
      ],
      [
        {
          title: "Rashes & Skin Conditions",
          description: "Diagnosis and treatment for rashes, allergies, and skin irritations.",
          icon: HandHeart,
          accent: "red",
        },
        {
          title: "Eye Irritations & Infections",
          description: "Red eyes, irritation, and minor eye infections.",
          icon: Eye,
          accent: "blue",
        },
        {
          title: "Lab Testing",
          description: "Rapid testing for strep, flu, COVID-19, and more.",
          icon: ClipboardCheck,
          accent: "red",
        },
      ],
    ],
    lowerLeftPanel: {
      type: "bulletCard",
      title: "When to Visit Urgent Care",
      intro: "We're here for non-life-threatening conditions such as:",
      columns: 2,
      bullets: [
        { text: "Fever, colds, and flu symptoms" },
        { text: "Minor cuts, burns, and sprains" },
        { text: "Earaches and sore throats" },
        { text: "Nausea, vomiting, and diarrhea" },
        { text: "Rashes, skin irritations, and allergies" },
        { text: "Eye redness and irritation" },
      ],
      note: "For severe emergencies, call 911 or visit the nearest emergency room.",
      noteIcon: Clock3,
    },
    lowerRightPanel: {
      type: "choiceCard",
      title: "Convenient Care. Your Choice.",
      intro: "Choose the care option that works best for you.",
      options: [
        {
          title: "Telehealth Care",
          description: "Connect with a provider securely from your phone, tablet, or computer.",
          icon: Activity,
        },
        {
          title: "In-Person Care",
          description: "Visit our clinic for fast, personalized care when you need it.",
          icon: MapPin,
        },
      ],
      footnote: "Same quality care. Same trusted team.",
    },
    stageBand: {
      icon: CalendarDays,
      accent: "blue",
      title: "Save Your Spot Online",
      description: "Check in online and save time when you arrive.",
      items: [],
    },
    footerColumns: [
      {
        title: "Save Your Spot Online",
        description: "Check in online and save time when you arrive.",
        icon: CalendarDays,
        action: { kind: "link", label: "Check In Now", href: "/kiosk" },
      },
      {
        title: "Call Us Today",
        description: "Our team is ready to help you feel better - fast.",
        emphasis: "410-754-4343",
        icon: Phone,
      },
      {
        title: "Visit Us",
        description: "On Time Medical Group\nMultiple convenient locations to serve you.",
        icon: MapPin,
        action: { kind: "link", label: "Find a Location", href: "/about-us#contact" },
      },
    ],
  },
];

export function getServicePageContent(slug?: string) {
  if (!slug) return null;
  return servicePages.find((page) => page.slug === slug) ?? null;
}
