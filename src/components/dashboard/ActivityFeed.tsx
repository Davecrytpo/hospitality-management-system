import { cn } from "@/lib/utils";
import { 
  UserPlus, 
  Calendar, 
  FileText, 
  Pill, 
  TestTube, 
  CreditCard,
  UserCheck,
  AlertCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Activity {
  id: string;
  type: "patient_registered" | "appointment" | "prescription" | "lab_result" | "payment" | "discharge" | "emergency";
  message: string;
  time: string;
  user?: string;
  path: string;
}

const activities: Activity[] = [
  {
    id: "1",
    type: "patient_registered",
    message: "New patient Sarah Johnson registered",
    time: "2 mins ago",
    user: "Reception",
    path: "/patients"
  },
  {
    id: "2",
    type: "appointment",
    message: "Dr. Williams completed consultation with Patient #4521",
    time: "15 mins ago",
    user: "Dr. Williams",
    path: "/appointments"
  },
  {
    id: "3",
    type: "lab_result",
    message: "Lab results ready for Patient Michael Chen",
    time: "32 mins ago",
    user: "Lab Tech",
    path: "/lab/results"
  },
  {
    id: "4",
    type: "prescription",
    message: "New prescription issued for Patient #3892",
    time: "45 mins ago",
    user: "Dr. Martinez",
    path: "/prescriptions"
  },
  {
    id: "5",
    type: "emergency",
    message: "Emergency admission - Trauma case in ER",
    time: "1 hour ago",
    user: "ER Staff",
    path: "/departments/emergency"
  },
  {
    id: "6",
    type: "payment",
    message: "Payment received from Patient Emily Davis - $1,250",
    time: "1.5 hours ago",
    user: "Billing",
    path: "/billing/payments"
  },
  {
    id: "7",
    type: "discharge",
    message: "Patient Robert Wilson discharged from Ward B",
    time: "2 hours ago",
    user: "Nurse Station",
    path: "/admissions/discharge"
  }
];

const activityIcons = {
  patient_registered: UserPlus,
  appointment: Calendar,
  prescription: Pill,
  lab_result: TestTube,
  payment: CreditCard,
  discharge: UserCheck,
  emergency: AlertCircle
};

const activityColors = {
  patient_registered: "bg-medical-success/10 text-medical-success",
  appointment: "bg-medical-primary/10 text-medical-primary",
  prescription: "bg-medical-accent/10 text-medical-accent",
  lab_result: "bg-medical-secondary/10 text-medical-secondary",
  payment: "bg-medical-success/10 text-medical-success",
  discharge: "bg-medical-info/10 text-medical-info",
  emergency: "bg-medical-danger/10 text-medical-danger"
};

export function ActivityFeed() {
  const navigate = useNavigate();

  return (
    <div className="rounded-xl border bg-card p-4 sm:p-6 shadow-sm h-full flex flex-col">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base sm:text-lg font-bold text-card-foreground tracking-tight uppercase">Recent Activity</h3>
        <button type="button" 
          onClick={() => navigate("/support")}
          className="text-[11px] font-bold uppercase tracking-widest text-medical-primary hover:underline"
        >
          View Full Log
        </button>
      </div>
      
      <div className="space-y-4 flex-1">
        {activities.map((activity) => {
          const Icon = activityIcons[activity.type];
          const colorClass = activityColors[activity.type];
          
          return (
            <div 
              key={activity.id} 
              onClick={() => navigate(activity.path)}
              className="flex items-start gap-4 cursor-pointer rounded-xl p-3 -mx-1 hover:bg-muted/30 transition-all border border-transparent hover:border-border/50 group"
            >
              <div className={cn("rounded-xl p-2.5 shrink-0 shadow-sm transition-transform group-hover:scale-110", colorClass)}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] sm:text-sm font-semibold text-card-foreground leading-snug group-hover:text-primary transition-colors">
                  {activity.message}
                </p>
                <div className="mt-1.5 flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-muted-foreground/60">
                  <span className="flex items-center gap-1">
                    <div className="h-1 w-1 rounded-full bg-current opacity-40" />
                    {activity.time}
                  </span>
                  {activity.user && (
                    <>
                      <span>•</span>
                      <span className="text-primary/70">{activity.user}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 pt-4 border-t border-border/50">
        <Button variant="ghost" className="w-full h-9 rounded-lg text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary" onClick={() => navigate("/support")}>
          Refresh Feed
        </Button>
      </div>
    </div>
  );
}
