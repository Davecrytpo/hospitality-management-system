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
import { useNavigate } from "react-router-dom";

const actions = [
  { 
    label: "Register Patient", 
    icon: UserPlus, 
    color: "bg-medical-primary hover:bg-medical-primary/90",
    description: "Add new patient",
    path: "/patients/register"
  },
  { 
    label: "New Appointment", 
    icon: Calendar, 
    color: "bg-medical-secondary hover:bg-medical-secondary/90",
    description: "Schedule visit",
    path: "/appointments/new"
  },
  { 
    label: "Create Prescription", 
    icon: Pill, 
    color: "bg-medical-accent hover:bg-medical-accent/90",
    description: "Issue medication",
    path: "/prescriptions/new"
  },
  { 
    label: "Lab Request", 
    icon: TestTube, 
    color: "bg-medical-info hover:bg-medical-info/90",
    description: "Order tests",
    path: "/lab"
  },
  { 
    label: "Admit Patient", 
    icon: Bed, 
    color: "bg-medical-warning hover:bg-medical-warning/90 text-foreground",
    description: "Ward admission",
    path: "/admissions/new"
  },
  { 
    label: "Generate Bill", 
    icon: Receipt, 
    color: "bg-medical-success hover:bg-medical-success/90",
    description: "Create invoice",
    path: "/billing/new"
  },
  { 
    label: "Medical Record", 
    icon: FileText, 
    color: "bg-medical-danger hover:bg-medical-danger/90",
    description: "View/Edit records",
    path: "/records"
  },
  { 
    label: "Consultation", 
    icon: Stethoscope, 
    color: "bg-medical-primary/80 hover:bg-medical-primary/70",
    description: "Start consult",
    path: "/doctors"
  },
];

export function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-card-foreground">Quick Actions</h3>
      
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {actions.map((action) => (
          <button
            key={action.label}
            onClick={() => navigate(action.path)}
            className={`flex flex-col items-center justify-center rounded-xl p-4 text-white transition-all hover:scale-105 active:scale-95 cursor-pointer ${action.color}`}
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
