import { Calendar, Clock, User, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

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
    <div className="rounded-xl border bg-card shadow-sm">
      <div className="flex items-center justify-between border-b p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-medical-primary/10 p-2">
            <Calendar className="h-5 w-5 text-medical-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">Today's Schedule</h3>
            <p className="text-sm text-muted-foreground">
              {appointments.length} appointments scheduled
            </p>
          </div>
        </div>
        <button 
          onClick={() => navigate("/appointments/calendar")}
          className="text-sm font-medium text-medical-primary hover:underline"
        >
          View Calendar
        </button>
      </div>
      
      <div className="divide-y">
        {appointments.map((apt) => (
          <div 
            key={apt.id} 
            onClick={() => handleAppointmentClick(apt)}
            className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 flex-col items-center justify-center rounded-lg bg-medical-surface">
                <Clock className="h-4 w-4 text-medical-primary" />
                <span className="text-xs font-semibold text-medical-primary">{apt.time}</span>
              </div>
              
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-card-foreground">{apt.patientName}</span>
                  <span className="text-xs text-muted-foreground">({apt.patientId})</span>
                </div>
                <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {apt.doctor}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {apt.room}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Badge variant="outline" className={typeStyles[apt.type]}>
                {apt.type}
              </Badge>
              <span className="text-sm text-muted-foreground">{apt.department}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="border-t p-4 text-center">
        <button 
          onClick={() => navigate("/appointments")}
          className="text-sm font-medium text-medical-primary hover:underline"
        >
          Load More Appointments
        </button>
      </div>
    </div>
  );
}
