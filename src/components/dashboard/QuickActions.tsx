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
import { cn } from "@/lib/utils";

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
    <div className="rounded-xl border bg-card p-4 sm:p-6 shadow-sm h-full">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base sm:text-lg font-bold text-card-foreground tracking-tight">Quick Actions</h3>
        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-muted-foreground px-2 py-1 bg-muted rounded-md lg:hidden">Staff Tools</span>
      </div>
      
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-4">
        {actions.map((action) => (
          <button type="button"
            key={action.label}
            onClick={() => navigate(action.path)}
            className={cn(
              "flex flex-col items-center justify-center rounded-xl p-3 sm:p-4 text-white transition-all",
              "hover:brightness-110 active:scale-95 cursor-pointer shadow-sm hover:shadow-md",
              action.color
            )}
          >
            <div className="mb-2 sm:mb-3 p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <action.icon className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <span className="text-[11px] sm:text-sm font-bold text-center leading-tight mb-1">{action.label}</span>
            <span className="text-[9px] sm:text-xs opacity-80 text-center font-medium line-clamp-1">{action.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
