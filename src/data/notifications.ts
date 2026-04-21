export type NotificationAudience = "all" | "public" | "staff";
export type NotificationPriority = "info" | "warning" | "critical";

export interface GlobalNotification {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  priority: NotificationPriority;
  audience: NotificationAudience;
  pinned?: boolean;
  link?: string;
  linkLabel?: string;
}

export const globalNotifications: GlobalNotification[] = [
  {
    id: "maint-2026-04-22",
    title: "Planned Maintenance Window",
    message: "Core services may be intermittently unavailable on April 22, 2026 from 01:00 to 03:00 WAT.",
    createdAt: "2026-04-21T08:00:00.000Z",
    priority: "warning",
    audience: "all",
    pinned: true,
  },
  {
    id: "urgent-er-routing",
    title: "Emergency Routing Reminder",
    message: "All trauma admissions must be routed through Emergency and triage before ward transfer.",
    createdAt: "2026-04-20T18:00:00.000Z",
    priority: "critical",
    audience: "staff",
    link: "/departments/emergency",
    linkLabel: "Open emergency unit",
  },
  {
    id: "public-patient-portal",
    title: "Patient Portal Service Update",
    message: "Patient portal billing and records are now available with improved mobile access.",
    createdAt: "2026-04-20T10:30:00.000Z",
    priority: "info",
    audience: "public",
    link: "/patient-portal/login",
    linkLabel: "Open patient portal",
  },
];
