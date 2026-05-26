import { Calendar, Clock, User, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Appointment {
  id: string;
  patientName: string;
  patientId: string;
  doctor: string;
  department: string;
  time: string;
  type: "checkup" | "follow-up" | "consultation" | "procedure" | "emergency";
  room: string;
}

const appointments: Appointment[] = [
  {
    id: "1",
    patientName: "John Smith",
    patientId: "PAT-2024-001",
    doctor: "Dr. Sarah Williams",
    department: "Cardiology",
    time: "09:00 AM",
    type: "consultation",
    room: "Room 201"
  },
  {
    id: "2",
    patientName: "Emily Davis",
    patientId: "PAT-2024-042",
    doctor: "Dr. Michael Chen",
    department: "Orthopedics",
    time: "09:30 AM",
    type: "follow-up",
    room: "Room 105"
  },
  {
    id: "3",
    patientName: "Robert Johnson",
    patientId: "PAT-2024-089",
    doctor: "Dr. Lisa Anderson",
    department: "Neurology",
    time: "10:00 AM",
    type: "checkup",
    room: "Room 312"
  },
  {
    id: "4",
    patientName: "Maria Garcia",
    patientId: "PAT-2024-156",
    doctor: "Dr. James Wilson",
    department: "General Medicine",
    time: "10:30 AM",
    type: "procedure",
    room: "Room 108"
  },
  {
    id: "5",
    patientName: "David Lee",
    patientId: "PAT-2024-203",
    doctor: "Dr. Sarah Williams",
    department: "Cardiology",
    time: "11:00 AM",
    type: "emergency",
    room: "ER Bay 3"
  }
];

const typeStyles = {
  checkup: "bg-medical-info/10 text-medical-info border-medical-info/20",
  "follow-up": "bg-medical-secondary/10 text-medical-secondary border-medical-secondary/20",
  consultation: "bg-medical-primary/10 text-medical-primary border-medical-primary/20",
  procedure: "bg-medical-warning/10 text-medical-warning border-medical-warning/20",
  emergency: "bg-medical-danger/10 text-medical-danger border-medical-danger/20"
};

export function UpcomingAppointments() {
  const navigate = useNavigate();

  const handleAppointmentClick = (apt: Appointment) => {
    navigate("/appointments");
    toast.info(`Viewing appointment: ${apt.patientName} - ${apt.time}`);
  };

  return (
    <div className="rounded-xl border bg-card shadow-sm h-full flex flex-col overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b p-4 sm:p-6 gap-4 bg-muted/20">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-medical-primary/10 p-2.5 shadow-sm ring-1 ring-medical-primary/20">
            <Calendar className="h-5 w-5 text-medical-primary" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-card-foreground tracking-tight uppercase">Today&apos;s Schedule</h3>
            <p className="text-xs sm:text-sm text-muted-foreground font-medium mt-0.5">
              {appointments.length} confirmed bookings
            </p>
          </div>
        </div>
        <button type="button" 
          onClick={() => navigate("/appointments/calendar")}
          className="text-[11px] font-bold uppercase tracking-widest text-medical-primary hover:underline"
        >
          Open Calendar
        </button>
      </div>
      
      <div className="divide-y flex-1">
        {appointments.map((apt) => (
          <div 
            key={apt.id} 
            onClick={() => handleAppointmentClick(apt)}
            className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
              <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-medical-surface ring-1 ring-border group-hover:ring-primary/30 transition-all shadow-sm">
                <Clock className="h-3.5 w-3.5 text-medical-primary mb-1" />
                <span className="text-[10px] font-bold text-medical-primary leading-none uppercase">{apt.time.split(' ')[0]}</span>
                <span className="text-[8px] font-bold text-medical-primary/60 mt-0.5">{apt.time.split(' ')[1]}</span>
              </div>
              
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-card-foreground truncate">{apt.patientName}</span>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground font-medium">
                  <span className="flex items-center gap-1">
                    <User className="h-3 w-3 opacity-70" />
                    {apt.doctor.split(' ').slice(-1)}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 opacity-70" />
                    {apt.room}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-2 ml-3">
              <Badge variant="outline" className={cn("rounded-full font-bold text-[9px] uppercase tracking-widest px-2 py-0.5 border-transparent", typeStyles[apt.type])}>
                {apt.type}
              </Badge>
              <span className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-tighter hidden xs:block">{apt.department}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="border-t p-4 text-center bg-muted/5">
        <button type="button" 
          onClick={() => navigate("/appointments")}
          className="text-xs font-bold text-medical-primary hover:underline uppercase tracking-widest"
        >
          Full Appointment List
        </button>
      </div>
    </div>
  );
}
