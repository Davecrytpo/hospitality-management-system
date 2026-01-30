import { 
  UserPlus, 
  Calendar, 
  FileText, 
  Pill, 
  TestTube,
  Bed,
  Receipt,
  Stethoscope
} from "lucide-react";
import { Button } from "@/components/ui/button";

const actions = [
  { 
    label: "Register Patient", 
    icon: UserPlus, 
    color: "bg-medical-primary hover:bg-medical-primary/90",
    description: "Add new patient"
  },
  { 
    label: "New Appointment", 
    icon: Calendar, 
    color: "bg-medical-secondary hover:bg-medical-secondary/90",
    description: "Schedule visit"
  },
  { 
    label: "Create Prescription", 
    icon: Pill, 
    color: "bg-medical-accent hover:bg-medical-accent/90",
    description: "Issue medication"
  },
  { 
    label: "Lab Request", 
    icon: TestTube, 
    color: "bg-medical-info hover:bg-medical-info/90",
    description: "Order tests"
  },
  { 
    label: "Admit Patient", 
    icon: Bed, 
    color: "bg-medical-warning hover:bg-medical-warning/90 text-foreground",
    description: "Ward admission"
  },
  { 
    label: "Generate Bill", 
    icon: Receipt, 
    color: "bg-medical-success hover:bg-medical-success/90",
    description: "Create invoice"
  },
  { 
    label: "Medical Record", 
    icon: FileText, 
    color: "bg-medical-danger hover:bg-medical-danger/90",
    description: "View/Edit records"
  },
  { 
    label: "Consultation", 
    icon: Stethoscope, 
    color: "bg-medical-primary/80 hover:bg-medical-primary/70",
    description: "Start consult"
  },
];

export function QuickActions() {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-card-foreground">Quick Actions</h3>
      
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {actions.map((action) => (
          <button
            key={action.label}
            className={`flex flex-col items-center justify-center rounded-xl p-4 text-white transition-all hover:scale-105 ${action.color}`}
          >
            <action.icon className="mb-2 h-6 w-6" />
            <span className="text-sm font-medium">{action.label}</span>
            <span className="text-xs opacity-80">{action.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
