import { ShieldCheck, Award, HeartPulse, Stethoscope, Building2, Microscope, Activity, Users } from "lucide-react";

const items = [
  { icon: ShieldCheck, label: "HIPAA Compliant" },
  { icon: Award, label: "Joint Commission Accredited" },
  { icon: HeartPulse, label: "24/7 Cardiac Care" },
  { icon: Stethoscope, label: "200+ Specialists" },
  { icon: Building2, label: "Multi-Facility Network" },
  { icon: Microscope, label: "Advanced Diagnostics" },
  { icon: Activity, label: "Real-time Monitoring" },
  { icon: Users, label: "50,000+ Patients/Year" },
];

export function Marquee() {
  const loop = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-border bg-muted/30 py-5">
      <div className="flex w-max animate-marquee gap-12 px-6">
        {loop.map((item, i) => (
          <div key={i} className="flex items-center gap-2.5 text-sm font-medium text-muted-foreground whitespace-nowrap">
            <item.icon className="h-4 w-4 text-accent" />
            {item.label}
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
}
