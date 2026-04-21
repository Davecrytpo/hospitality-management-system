import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Ambulance,
  Baby,
  Bone,
  Brain,
  Calendar,
  Eye,
  HeartPulse,
  Microscope,
  Pill,
  ShieldCheck,
  Stethoscope,
  Users,
} from "lucide-react";

import publicHeroCampusImg from "@/assets/public-hero-campus-v2.jpg";
import serviceAdvancedDiagnosticsImg from "@/assets/service-advanced-diagnostics.jpg";
import serviceExpressCheckinImg from "@/assets/service-express-checkin.jpg";
import servicePatientRegistrationImg from "@/assets/service-patient-registration.jpg";
import servicePharmacySupportImg from "@/assets/service-pharmacy-support.jpg";
import servicePremiumInpatientImg from "@/assets/service-premium-inpatient.jpg";
import serviceSmartAppointmentsImg from "@/assets/service-smart-appointments-v2.jpg";
import serviceSurgicalExcellenceImg from "@/assets/service-surgical-excellence.jpg";
import specialtyCardiologyImg from "@/assets/specialty-cardiology.jpg";
import specialtyEmergencyTraumaImg from "@/assets/specialty-emergency-trauma-v3.jpg";
import specialtyNeurologyImg from "@/assets/specialty-neurology.jpg";
import specialtyOphthalmologyImg from "@/assets/specialty-ophthalmology.jpg";
import specialtyOrthopedicsImg from "@/assets/specialty-orthopedics.jpg";
import specialtyPediatricsImg from "@/assets/specialty-pediatrics.jpg";
import specialtyTelemedicineImg from "@/assets/specialty-telemedicine.jpg";
import diagnosticImagingImg from "@/assets/lab-tech.jpg";

export type PublicCatalogKind = "services" | "specialties";

export interface PublicCatalogMetric {
  value: string;
  label: string;
}

export interface PublicCatalogFeature {
  title: string;
  description: string;
}

export interface PublicCatalogItem {
  slug: string;
  title: string;
  shortTitle: string;
  eyebrow: string;
  excerpt: string;
  summary: string;
  icon: LucideIcon;
  image: string;
  metrics: PublicCatalogMetric[];
  highlights: string[];
  features: PublicCatalogFeature[];
  primaryAction: { label: string; href: string };
  secondaryAction: { label: string; href: string };
}

export const hospitalStats = [
  { value: "50K+", label: "Patients served annually", icon: Users },
  { value: "200+", label: "Board-certified specialists", icon: Stethoscope },
  { value: "24/7", label: "Emergency and care coordination", icon: ShieldCheck },
  { value: "12", label: "Operating theatres across our network", icon: Activity },
];

export const publicServices: PublicCatalogItem[] = [
  {
    slug: "smart-appointments",
    title: "Smart Appointments",
    shortTitle: "Appointments",
    eyebrow: "Access & Scheduling",
    excerpt: "Book online in seconds with intelligent slot matching, reminders, and virtual follow-up options.",
    summary:
      "Our appointment experience is designed to feel premium from the first click. Patients can request visits, view availability, coordinate follow-ups, and move seamlessly into virtual consultations without losing continuity.",
    icon: Calendar,
    image: serviceSmartAppointmentsImg,
    metrics: [
      { value: "< 60 sec", label: "Average booking flow" },
      { value: "24/7", label: "Self-service scheduling" },
      { value: "SMS + Email", label: "Automated reminders" },
    ],
    highlights: [
      "Real-time clinician availability across departments",
      "Same-day and next-day appointment prioritization",
      "Automatic reminders and rescheduling protection",
      "Integrated telemedicine for post-visit continuity",
    ],
    features: [
      {
        title: "Concierge intake",
        description: "Start with symptom-led booking, then get routed to the right clinician, specialty, and visit type.",
      },
      {
        title: "Fewer no-shows",
        description: "Smart reminders, confirmation nudges, and clear arrival instructions reduce missed appointments.",
      },
      {
        title: "One timeline",
        description: "Appointments, diagnostics, prescriptions, and notes stay connected in one patient journey.",
      },
    ],
    primaryAction: { label: "Start patient journey", href: "/patient-register" },
    secondaryAction: { label: "Try self check-in", href: "/kiosk" },
  },
  {
    slug: "premium-inpatient-care",
    title: "Premium Inpatient Care",
    shortTitle: "Inpatient",
    eyebrow: "Recovery & Monitoring",
    excerpt: "Private rooms, high-touch nursing, live bed coordination, and recovery plans tailored to each admission.",
    summary:
      "From admission to discharge, our inpatient experience is structured around clinical precision and hotel-level comfort. Every stay is supported by coordinated nurses, consultants, pharmacy, imaging, and family updates.",
    icon: HeartPulse,
    image: servicePremiumInpatientImg,
    metrics: [
      { value: "24/7", label: "Nursing coverage" },
      { value: "Real-time", label: "Ward monitoring" },
      { value: "Private", label: "Recovery suites available" },
    ],
    highlights: [
      "Private and semi-private accommodation tiers",
      "Round-the-clock nursing and bedside observation",
      "Coordinated pharmacy, lab, and imaging support",
      "Structured discharge planning with follow-up pathways",
    ],
    features: [
      {
        title: "Patient-first comfort",
        description: "Thoughtful room design, calming environments, and clear communication for patients and family members.",
      },
      {
        title: "Clinical command visibility",
        description: "Bed status, medications, vitals, and escalation notes are visible to the care team in real time.",
      },
      {
        title: "Safer discharge",
        description: "Discharge planning begins early so recovery continues smoothly after the patient goes home.",
      },
    ],
    primaryAction: { label: "Explore emergency & admissions", href: "/specialties/emergency-trauma" },
    secondaryAction: { label: "Speak to admissions", href: "tel:+1800668463" },
  },
  {
    slug: "surgical-excellence",
    title: "Surgical Excellence",
    shortTitle: "Surgical",
    eyebrow: "Procedures & Recovery",
    excerpt: "Precision-led surgery supported by modern theatres, pre-op planning, and rapid recovery workflows.",
    summary:
      "Our surgical program combines advanced theatres, high-skill clinicians, and carefully designed perioperative workflows. Patients get clarity before surgery, strong monitoring during procedures, and structured recovery afterward.",
    icon: Stethoscope,
    image: serviceSurgicalExcellenceImg,
    metrics: [
      { value: "12", label: "Operating theatres" },
      { value: "Multi-team", label: "Pre-op coordination" },
      { value: "Fast-track", label: "Recovery pathways" },
    ],
    highlights: [
      "Digital pre-operative preparation and consent support",
      "Consultant-led surgery scheduling and theatre visibility",
      "Enhanced recovery protocols after major procedures",
      "Specialist collaboration across anesthesia, nursing, and rehab",
    ],
    features: [
      {
        title: "Confident pre-op planning",
        description: "Patients and families receive clearer preparation, timelines, and expected recovery milestones.",
      },
      {
        title: "Surgical precision",
        description: "Modern tools, dedicated teams, and theatre readiness protocols support safer procedures.",
      },
      {
        title: "Recovery with continuity",
        description: "Post-op monitoring, medications, and follow-up appointments stay connected after discharge.",
      },
    ],
    primaryAction: { label: "Start surgical consultation", href: "/services/smart-appointments" },
    secondaryAction: { label: "Verify procedure updates", href: "/verify" },
  },
  {
    slug: "advanced-diagnostics",
    title: "Advanced Diagnostics",
    shortTitle: "Diagnostics",
    eyebrow: "Lab & Imaging",
    excerpt: "High-speed diagnostics with imaging, pathology, and lab workflows connected to the broader care team.",
    summary:
      "Diagnostics should move fast without sacrificing quality. Our imaging and laboratory services are designed to accelerate decisions for emergency, inpatient, outpatient, and specialist teams.",
    icon: Microscope,
    image: serviceAdvancedDiagnosticsImg,
    metrics: [
      { value: "60 min", label: "Typical urgent turnaround" },
      { value: "On-site", label: "Lab and imaging capability" },
      { value: "Same-day", label: "Result visibility for teams" },
    ],
    highlights: [
      "MRI, CT, ultrasound, pathology, and laboratory testing",
      "Fast clinician visibility into ordered diagnostics",
      "Digital verification for patient-facing status checks",
      "Integrated reporting that feeds treatment decisions quickly",
    ],
    features: [
      {
        title: "Rapid triage support",
        description: "Urgent diagnostics route directly into active treatment workflows for faster intervention.",
      },
      {
        title: "Clear reporting",
        description: "Structured, clinician-readable results improve handoffs between departments and specialists.",
      },
      {
        title: "Patient transparency",
        description: "Patients can verify diagnostic status and access results through secure public and portal flows.",
      },
    ],
    primaryAction: { label: "Open imaging & diagnostics", href: "/specialties/diagnostic-imaging" },
    secondaryAction: { label: "Verify records", href: "/verify" },
  },
  {
    slug: "express-check-in",
    title: "Express Check-In",
    shortTitle: "Check-In",
    eyebrow: "Arrival & Triage",
    excerpt: "Move from arrival to triage faster with digital check-in, verified details, and queue-aware routing.",
    summary:
      "Our self-service arrival flow reduces friction at the front desk while preserving the professionalism and clarity expected from a premium healthcare network.",
    icon: ShieldCheck,
    image: serviceExpressCheckinImg,
    metrics: [
      { value: "< 2 min", label: "Typical self check-in" },
      { value: "Live", label: "Queue-aware routing" },
      { value: "Secure", label: "Identity verification" },
    ],
    highlights: [
      "Digital arrival workflow for scheduled and walk-in patients",
      "Faster desk handoff with pre-verified information",
      "Cleaner routing into triage, reception, or specialty intake",
      "More confidence for patients before they reach the care team",
    ],
    features: [
      {
        title: "Smoother arrivals",
        description: "Patients can start their visit confidently without waiting for every step to happen at the counter.",
      },
      {
        title: "Front-desk efficiency",
        description: "Teams receive cleaner information sooner, improving throughput and reducing repetitive intake work.",
      },
      {
        title: "Better first impression",
        description: "The experience feels structured, premium, and more respectful of patient time.",
      },
    ],
    primaryAction: { label: "Open self check-in", href: "/kiosk" },
    secondaryAction: { label: "Verify visit details", href: "/verify" },
  },
  {
    slug: "patient-registration",
    title: "Patient Registration",
    shortTitle: "Registration",
    eyebrow: "Enrollment & Access",
    excerpt: "Register once, capture the right details, and move into future appointments, verification, and portal access faster.",
    summary:
      "Registration should feel trustworthy and effortless. Our enrollment flow is designed to gather the essentials clearly, reduce duplicate entry, and prepare patients for future visits.",
    icon: Users,
    image: servicePatientRegistrationImg,
    metrics: [
      { value: "Guided", label: "Step-by-step intake" },
      { value: "Secure", label: "Protected patient data" },
      { value: "Reusable", label: "Future visit readiness" },
    ],
    highlights: [
      "Clean digital capture of essential patient information",
      "Less repetitive intake across future visits and services",
      "Better readiness for appointments, diagnostics, and portal access",
      "A professional first-touch experience for new patients",
    ],
    features: [
      {
        title: "Clear onboarding",
        description: "Patients know exactly what is needed and what comes next without feeling overwhelmed.",
      },
      {
        title: "Operational readiness",
        description: "Front office teams receive cleaner records that are easier to work with across the hospital.",
      },
      {
        title: "Foundation for continuity",
        description: "Registration becomes the start of a more connected long-term care journey.",
      },
    ],
    primaryAction: { label: "Register as a patient", href: "/patient-register" },
    secondaryAction: { label: "Explore appointments", href: "/services/smart-appointments" },
  },
  {
    slug: "pharmacy-support",
    title: "Pharmacy Support",
    shortTitle: "Pharmacy",
    eyebrow: "Medication & Fulfillment",
    excerpt: "Prescription coordination, medication readiness, and pharmacy follow-through designed to feel reliable and fast.",
    summary:
      "Pharmacy support should feel like part of one continuous care journey. Patients can move from prescription to dispensing to follow-up with more transparency and less friction.",
    icon: Pill,
    image: servicePharmacySupportImg,
    metrics: [
      { value: "Fast", label: "Dispense readiness" },
      { value: "Connected", label: "Prescription workflow" },
      { value: "Clear", label: "Medication instructions" },
    ],
    highlights: [
      "Prescription fulfillment coordinated with clinical teams",
      "Cleaner pharmacy communication after consultations and discharge",
      "Support for medication readiness, refills, and patient understanding",
      "Better visibility into the medication step of care delivery",
    ],
    features: [
      {
        title: "Reliable medication access",
        description: "Patients can move into the medication step faster after a consult, procedure, or admission.",
      },
      {
        title: "Connected care workflow",
        description: "Pharmacy stays tied to diagnostics, consultations, and discharge planning instead of operating in isolation.",
      },
      {
        title: "Higher patient confidence",
        description: "Clearer pickup readiness and instructions reduce confusion after treatment.",
      },
    ],
    primaryAction: { label: "Explore patient services", href: "/patient-register" },
    secondaryAction: { label: "Check verification status", href: "/verify" },
  },
];

export const publicSpecialties: PublicCatalogItem[] = [
  {
    slug: "emergency-trauma",
    title: "Emergency & Trauma",
    shortTitle: "Emergency",
    eyebrow: "Critical Response",
    excerpt: "24/7 rapid-response emergency care with coordinated triage, stabilization, diagnostics, and specialist backup.",
    summary:
      "Our emergency and trauma service is built for urgent decision-making. Patients are stabilized quickly, diagnostics are prioritized, and specialist teams stay aligned from arrival to disposition.",
    icon: Ambulance,
    image: specialtyEmergencyTraumaImg,
    metrics: [
      { value: "< 10 min", label: "Target initial triage" },
      { value: "24/7", label: "Emergency response" },
      { value: "Fast-track", label: "Imaging + lab escalation" },
    ],
    highlights: [
      "Rapid triage and stabilization protocols",
      "Direct access to imaging, lab, and inpatient escalation",
      "Emergency-trained clinicians and coordinated response teams",
      "Digital visibility into active emergency workflows",
    ],
    features: [
      { title: "Immediate intervention", description: "Critical patients are prioritized through fast assessment, bed coordination, and rapid diagnostics." },
      { title: "Specialist backup", description: "Cardiology, surgery, neurology, and inpatient teams are activated without losing time." },
      { title: "Continuity after stabilization", description: "Patients move into admissions, surgery, or discharge pathways with cleaner handoffs." },
    ],
    primaryAction: { label: "Start urgent access", href: "/services/express-check-in" },
    secondaryAction: { label: "Call emergency desk", href: "tel:+1800668463" },
  },
  {
    slug: "cardiology",
    title: "Cardiology",
    shortTitle: "Cardiology",
    eyebrow: "Heart & Vascular",
    excerpt: "Cardiac evaluation, monitoring, diagnostics, intervention planning, and longer-term heart health management.",
    summary:
      "Our cardiology program supports prevention, acute evaluation, and long-term management. Patients move through tests, consultations, treatment plans, and follow-up without fragmented experiences.",
    icon: HeartPulse,
    image: specialtyCardiologyImg,
    metrics: [
      { value: "ECG", label: "Non-invasive testing" },
      { value: "Cath lab", label: "Interventional readiness" },
      { value: "Ongoing", label: "Cardiac follow-up support" },
    ],
    highlights: [
      "Chest pain evaluation and urgent cardiology review",
      "Advanced imaging and cardiac testing pathways",
      "Preventive care, rehab, and long-term disease management",
      "Integrated medication and follow-up planning",
    ],
    features: [
      { title: "Preventive cardiology", description: "Early intervention plans support patients before issues become emergencies." },
      { title: "Diagnostic confidence", description: "Testing and specialist review stay tightly connected for faster decisions." },
      { title: "Recovery and rehab", description: "After intervention, patients move into rehab and longitudinal support without losing continuity." },
    ],
    primaryAction: { label: "Request cardiology visit", href: "/services/smart-appointments" },
    secondaryAction: { label: "Register as a patient", href: "/patient-register" },
  },
  {
    slug: "neurology",
    title: "Neurology",
    shortTitle: "Neurology",
    eyebrow: "Brain & Nerve Care",
    excerpt: "Specialist support for stroke, seizures, headaches, mobility disorders, and complex neurological assessments.",
    summary:
      "Neurology requires clarity, speed, and coordinated long-term care. We support urgent neurological evaluation and structured follow-up with diagnostics and rehabilitation pathways built in.",
    icon: Brain,
    image: specialtyNeurologyImg,
    metrics: [
      { value: "Stroke-ready", label: "Acute evaluation pathway" },
      { value: "EEG + Imaging", label: "Diagnostic depth" },
      { value: "Ongoing", label: "Rehab collaboration" },
    ],
    highlights: [
      "Acute stroke and seizure assessment support",
      "Diagnostic imaging and neurological testing integration",
      "Collaborative care planning with rehab and inpatient teams",
      "Follow-up pathways for chronic neurological conditions",
    ],
    features: [
      { title: "Urgent neurology response", description: "Time-sensitive neurological cases are escalated with imaging and specialist coordination." },
      { title: "Complex case review", description: "Multiple teams can collaborate on difficult neurological diagnoses and treatment planning." },
      { title: "Long-term management", description: "Patients with chronic neurological conditions receive more structured continuity of care." },
    ],
    primaryAction: { label: "Start neurology consult", href: "/services/smart-appointments" },
    secondaryAction: { label: "Explore diagnostics", href: "/services/advanced-diagnostics" },
  },
  {
    slug: "orthopedics",
    title: "Orthopedics",
    shortTitle: "Orthopedics",
    eyebrow: "Bones, Joints & Mobility",
    excerpt: "Joint care, fracture support, sports medicine, and surgical treatment plans focused on movement restoration.",
    summary:
      "Orthopedic care should feel coordinated across consultation, imaging, surgery, and rehabilitation. We support that full pathway so patients move from pain to recovery with less friction.",
    icon: Bone,
    image: specialtyOrthopedicsImg,
    metrics: [
      { value: "Sports + Spine", label: "Specialist coverage" },
      { value: "Imaging-linked", label: "Diagnostic workflow" },
      { value: "Rehab-ready", label: "Recovery continuity" },
    ],
    highlights: [
      "Fracture assessment and musculoskeletal imaging",
      "Joint replacement and surgical pathway planning",
      "Sports medicine and mobility restoration programs",
      "Coordinated post-op and rehab support",
    ],
    features: [
      { title: "Faster diagnosis", description: "Consults and imaging are structured to reduce repeated visits and unclear next steps." },
      { title: "Procedure readiness", description: "When surgery is needed, patients move into a more organized surgical experience." },
      { title: "Return to movement", description: "Rehab and follow-up keep recovery progressing after intervention." },
    ],
    primaryAction: { label: "See orthopedic options", href: "/services/smart-appointments" },
    secondaryAction: { label: "Request surgery consult", href: "/services/surgical-excellence" },
  },
  {
    slug: "pediatrics",
    title: "Pediatrics",
    shortTitle: "Pediatrics",
    eyebrow: "Children & Family Care",
    excerpt: "Compassionate child-centered care from newborn checkups to adolescent health and coordinated specialty referrals.",
    summary:
      "Families need reassurance, clarity, and easy access. Our pediatric experience is built to feel calm, coordinated, and responsive while still giving clinicians the tools they need.",
    icon: Baby,
    image: specialtyPediatricsImg,
    metrics: [
      { value: "Family-first", label: "Communication approach" },
      { value: "Newborn to teen", label: "Age coverage" },
      { value: "Fast referrals", label: "Specialty escalation" },
    ],
    highlights: [
      "Routine pediatric visits and developmental support",
      "Quick access for acute concerns and child-friendly intake",
      "Specialty coordination for more complex pediatric cases",
      "Parent communication designed for clarity and confidence",
    ],
    features: [
      { title: "Gentle intake", description: "Calmer, family-friendly flows reduce stress before the child ever sees the clinician." },
      { title: "Connected specialty access", description: "When more care is needed, referrals are easier to coordinate across the hospital." },
      { title: "Continuity for parents", description: "Parents get clearer next steps, instructions, and follow-up pathways after each visit." },
    ],
    primaryAction: { label: "Book pediatric care", href: "/services/smart-appointments" },
    secondaryAction: { label: "View patient registration", href: "/patient-register" },
  },
  {
    slug: "ophthalmology",
    title: "Ophthalmology",
    shortTitle: "Ophthalmology",
    eyebrow: "Vision & Eye Care",
    excerpt: "Specialist eye care spanning routine exams, advanced imaging, cataract pathways, retina support, and more.",
    summary:
      "Vision care benefits from precision, clean diagnostics, and clearly communicated treatment plans. Our ophthalmology pathway is designed to feel expert-led and understandable.",
    icon: Eye,
    image: specialtyOphthalmologyImg,
    metrics: [
      { value: "Routine + Advanced", label: "Scope of care" },
      { value: "Imaging-led", label: "Diagnostic support" },
      { value: "Surgical-ready", label: "Escalation pathway" },
    ],
    highlights: [
      "Vision assessments and eye-health monitoring",
      "Imaging-supported review for retina and glaucoma pathways",
      "Structured preparation for cataract and other procedures",
      "Long-term care plans for chronic eye conditions",
    ],
    features: [
      { title: "Clear evaluation", description: "Patients understand what is being tested, why it matters, and what comes next." },
      { title: "Better planning", description: "When procedures are required, surgical and follow-up pathways stay connected." },
      { title: "Longitudinal support", description: "Chronic conditions receive consistent review instead of fragmented visits." },
    ],
    primaryAction: { label: "Request eye care visit", href: "/services/smart-appointments" },
    secondaryAction: { label: "Explore diagnostics", href: "/services/advanced-diagnostics" },
  },
  {
    slug: "diagnostic-imaging",
    title: "Diagnostic Imaging",
    shortTitle: "Imaging",
    eyebrow: "Radiology & Imaging",
    excerpt: "MRI, CT, ultrasound, and image-led reporting connected to fast clinical decisions and patient follow-up.",
    summary:
      "Imaging is one of the most critical accelerators of modern care. This specialty page gives patients and families a clearer window into what our imaging capability supports.",
    icon: Microscope,
    image: diagnosticImagingImg,
    metrics: [
      { value: "MRI / CT / US", label: "Imaging coverage" },
      { value: "Same-day", label: "Urgent report visibility" },
      { value: "Integrated", label: "Clinical follow-through" },
    ],
    highlights: [
      "Advanced imaging with fast clinician access to reports",
      "Support for emergency, inpatient, outpatient, and specialty use cases",
      "Structured communication of next steps after imaging review",
      "Better continuity between imaging, diagnosis, and treatment",
    ],
    features: [
      { title: "Faster decision-making", description: "Imaging results are easier to move into active clinical care when teams stay connected." },
      { title: "Patient clarity", description: "The pathway from scan to explanation to action becomes more understandable." },
      { title: "High-value diagnostics", description: "Imaging supports multiple service lines without creating disconnected experiences." },
    ],
    primaryAction: { label: "Check result status", href: "/verify" },
    secondaryAction: { label: "Explore diagnostic services", href: "/services/advanced-diagnostics" },
  },
  {
    slug: "telemedicine",
    title: "Telemedicine",
    shortTitle: "Telemedicine",
    eyebrow: "Virtual Care",
    excerpt: "Remote consultations that feel connected to the same hospital ecosystem as in-person appointments and follow-up.",
    summary:
      "Telemedicine should extend your care model, not feel like a side experience. Our virtual pathway keeps scheduling, consultations, prescriptions, and follow-up connected.",
    icon: Activity,
    image: specialtyTelemedicineImg,
    metrics: [
      { value: "Virtual", label: "Specialist consult access" },
      { value: "Same platform", label: "Records continuity" },
      { value: "Anywhere", label: "Patient convenience" },
    ],
    highlights: [
      "Virtual consultations for eligible specialties and follow-ups",
      "Integrated scheduling and reminders across in-person and virtual visits",
      "Reduced travel time and easier post-visit continuity",
      "Connected prescription and diagnostics follow-up",
    ],
    features: [
      { title: "Digital-first convenience", description: "Patients can access care quickly without losing the feel of a serious clinical experience." },
      { title: "Continuity with in-person care", description: "Virtual appointments connect back into diagnostics, prescriptions, and next steps." },
      { title: "Operational efficiency", description: "Clinicians and teams manage telemedicine without creating a second disconnected workflow." },
    ],
    primaryAction: { label: "Start virtual visit journey", href: "/services/smart-appointments" },
    secondaryAction: { label: "Register for access", href: "/patient-register" },
  },
];

export const landingTestimonials = [
  {
    quote:
      "The booking experience felt premium from the first click. Every update was clear, and by the time I arrived the care team already knew my case.",
    name: "Maya O.",
    role: "Outpatient cardiology patient",
  },
  {
    quote:
      "This is the first healthcare website that actually feels modern. The specialty pages are clear, the process makes sense, and nothing feels hidden.",
    name: "Daniel R.",
    role: "Telemedicine patient",
  },
  {
    quote:
      "Our family used pediatrics, diagnostics, and pharmacy in one week. Everything felt connected instead of scattered across different systems.",
    name: "Amina K.",
    role: "Parent and caregiver",
  },
];

export const landingFaqs = [
  {
    question: "Can I explore services before signing in?",
    answer:
      "Yes. Service pages and specialty pages are public so patients can understand care options first, then choose when to book, register, or sign in.",
  },
  {
    question: "How do I book an appointment?",
    answer:
      "Open the Smart Appointments page, review the pathway that fits your need, then proceed to booking when you're ready.",
  },
  {
    question: "Can I verify records or track status publicly?",
    answer:
      "Yes. Use the Verify Records page to check eligible lab or pharmacy updates with your secure reference code.",
  },
  {
    question: "Do you support inpatient and surgical care too?",
    answer:
      "Yes. The public service pages explain inpatient care, surgical pathways, diagnostics, and specialty-led recovery options.",
  },
];

export const locationHighlights = [
  {
    name: "Flagship Medical Campus",
    detail: "Emergency, surgery, diagnostics, inpatient wards, and executive recovery suites.",
  },
  {
    name: "Specialty Center",
    detail: "Cardiology, neurology, orthopedics, telemedicine command suites, and imaging support.",
  },
  {
    name: "Family Care Pavilion",
    detail: "Pediatrics, outpatient clinics, preventive care, and patient registration services.",
  },
];

export function getCatalogItems(kind: PublicCatalogKind) {
  return kind === "services" ? publicServices : publicSpecialties;
}

export function getCatalogItem(kind: PublicCatalogKind, slug?: string) {
  if (!slug) return null;
  return getCatalogItems(kind).find((item) => item.slug === slug) ?? null;
}

export function getCatalogLabel(kind: PublicCatalogKind) {
  return kind === "services" ? "Services" : "Specialties";
}

export const publicOverviewCards = [
  {
    title: "Command-center operations",
    description: "Emergency, inpatient, diagnostics, billing, and patient access stay connected through one ecosystem.",
    icon: ShieldCheck,
  },
  {
    title: "Concierge patient journeys",
    description: "Public pages guide patients clearly before asking them to register, verify, or continue into secure access.",
    icon: Users,
  },
  {
    title: "Premium clinical execution",
    description: "From surgery to telemedicine, each care pathway is designed to feel structured and high-trust.",
    icon: HeartPulse,
  },
  {
    title: "Future-ready hospital platform",
    description: "The frontend supports a large hospital ecosystem rather than a brochure with dead ends.",
    icon: Activity,
  },
];

export const publicHeroImage = publicHeroCampusImg;
