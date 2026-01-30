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

interface Activity {
  id: string;
  type: "patient_registered" | "appointment" | "prescription" | "lab_result" | "payment" | "discharge" | "emergency";
  message: string;
  time: string;
  user?: string;
}

const activities: Activity[] = [
  {
    id: "1",
    type: "patient_registered",
    message: "New patient Sarah Johnson registered",
    time: "2 mins ago",
    user: "Reception"
  },
  {
    id: "2",
    type: "appointment",
    message: "Dr. Williams completed consultation with Patient #4521",
    time: "15 mins ago",
    user: "Dr. Williams"
  },
  {
    id: "3",
    type: "lab_result",
    message: "Lab results ready for Patient Michael Chen",
    time: "32 mins ago",
    user: "Lab Tech"
  },
  {
    id: "4",
    type: "prescription",
    message: "New prescription issued for Patient #3892",
    time: "45 mins ago",
    user: "Dr. Martinez"
  },
  {
    id: "5",
    type: "emergency",
    message: "Emergency admission - Trauma case in ER",
    time: "1 hour ago",
    user: "ER Staff"
  },
  {
    id: "6",
    type: "payment",
    message: "Payment received from Patient Emily Davis - $1,250",
    time: "1.5 hours ago",
    user: "Billing"
  },
  {
    id: "7",
    type: "discharge",
    message: "Patient Robert Wilson discharged from Ward B",
    time: "2 hours ago",
    user: "Nurse Station"
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
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-card-foreground">Recent Activity</h3>
        <button className="text-sm text-medical-primary hover:underline">View All</button>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = activityIcons[activity.type];
          const colorClass = activityColors[activity.type];
          
          return (
            <div key={activity.id} className="flex items-start gap-3">
              <div className={cn("rounded-full p-2", colorClass)}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-card-foreground line-clamp-2">
                  {activity.message}
                </p>
                <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{activity.time}</span>
                  {activity.user && (
                    <>
                      <span>•</span>
                      <span>{activity.user}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
