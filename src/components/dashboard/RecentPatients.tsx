import { MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
  lastVisit: string;
  status: "admitted" | "outpatient" | "discharged" | "critical";
  department: string;
  avatar?: string;
}

const patients: Patient[] = [
  {
    id: "PAT-2024-001",
    name: "John Smith",
    age: 45,
    gender: "Male",
    phone: "+1 234-567-8901",
    lastVisit: "Today",
    status: "admitted",
    department: "Cardiology",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
  },
  {
    id: "PAT-2024-042",
    name: "Emily Davis",
    age: 32,
    gender: "Female",
    phone: "+1 234-567-8902",
    lastVisit: "Today",
    status: "outpatient",
    department: "Orthopedics",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
  },
  {
    id: "PAT-2024-089",
    name: "Robert Johnson",
    age: 58,
    gender: "Male",
    phone: "+1 234-567-8903",
    lastVisit: "Yesterday",
    status: "critical",
    department: "ICU",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
  },
  {
    id: "PAT-2024-156",
    name: "Maria Garcia",
    age: 28,
    gender: "Female",
    phone: "+1 234-567-8904",
    lastVisit: "Today",
    status: "admitted",
    department: "Maternity",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
  },
  {
    id: "PAT-2024-203",
    name: "David Lee",
    age: 67,
    gender: "Male",
    phone: "+1 234-567-8905",
    lastVisit: "2 days ago",
    status: "discharged",
    department: "General Medicine"
  },
];

const statusStyles = {
  admitted: "bg-medical-info/10 text-medical-info border-medical-info/20",
  outpatient: "bg-medical-success/10 text-medical-success border-medical-success/20",
  discharged: "bg-muted text-muted-foreground border-muted",
  critical: "bg-medical-danger/10 text-medical-danger border-medical-danger/20"
};

export function RecentPatients() {
  const navigate = useNavigate();

  const handleViewDetails = (patientId: string) => {
    navigate(`/patients/${patientId}`);
    toast.success(`Viewing details for ${patientId}`);
  };

  const handleEditPatient = (patientId: string) => {
    navigate("/patients/register");
    toast.info(`Editing patient ${patientId}`);
  };

  const handleDeletePatient = (patientId: string, patientName: string) => {
    toast.error(`Patient ${patientName} would be deleted`, {
      description: "This action requires database integration",
    });
  };

  return (
    <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b p-4 sm:p-6 gap-4 bg-muted/20">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-card-foreground tracking-tight uppercase">Recent Patients</h3>
          <p className="text-xs sm:text-sm text-muted-foreground font-medium mt-0.5">Latest registrations and clinical visits</p>
        </div>
        <Button variant="outline" size="sm" className="rounded-lg h-9 font-bold text-[11px] uppercase tracking-wider" onClick={() => navigate("/patients")}>
          View Directory
        </Button>
      </div>
      
      {/* Mobile Card View */}
      <div className="md:hidden divide-y border-t">
        {patients.map((patient) => (
          <div 
            key={patient.id} 
            className="p-4 active:bg-muted/50 transition-colors"
            onClick={() => handleViewDetails(patient.id)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border border-border/50">
                  <AvatarImage src={patient.avatar} alt={patient.name} />
                  <AvatarFallback className="bg-primary/5 text-primary font-bold">{patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold text-card-foreground">{patient.name}</p>
                  <p className="text-[10px] font-mono uppercase text-muted-foreground mt-0.5">{patient.id}</p>
                </div>
              </div>
              <Badge variant="outline" className={cn("rounded-full font-bold text-[10px] uppercase tracking-widest px-2", statusStyles[patient.status])}>
                {patient.status}
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-xs mb-3">
              <div className="text-muted-foreground font-medium">Department: <span className="text-foreground font-bold">{patient.department}</span></div>
              <div className="text-muted-foreground font-medium text-right">Age/Sex: <span className="text-foreground font-bold">{patient.age} / {patient.gender[0]}</span></div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-border/40">
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Last: <span className="text-foreground">{patient.lastVisit}</span>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-primary" onClick={(e) => { e.stopPropagation(); handleViewDetails(patient.id); }}>
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={(e) => { e.stopPropagation(); handleEditPatient(patient.id); }}>
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30">
              <TableHead className="font-bold uppercase text-[11px] tracking-wider">Patient</TableHead>
              <TableHead className="font-bold uppercase text-[11px] tracking-wider">ID</TableHead>
              <TableHead className="font-bold uppercase text-[11px] tracking-wider">Age/Gender</TableHead>
              <TableHead className="font-bold uppercase text-[11px] tracking-wider">Department</TableHead>
              <TableHead className="font-bold uppercase text-[11px] tracking-wider">Last Visit</TableHead>
              <TableHead className="font-bold uppercase text-[11px] tracking-wider">Status</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.map((patient) => (
              <TableRow 
                key={patient.id}
                className="cursor-pointer hover:bg-muted/50 group"
                onClick={() => handleViewDetails(patient.id)}
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 border border-border/50">
                      <AvatarImage src={patient.avatar} alt={patient.name} />
                      <AvatarFallback className="bg-primary/5 text-primary font-bold">{patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold text-card-foreground group-hover:text-primary transition-colors">{patient.name}</p>
                      <p className="text-xs text-muted-foreground font-medium">{patient.phone}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-mono text-[11px] uppercase font-bold text-muted-foreground tracking-tighter">{patient.id}</TableCell>
                <TableCell className="text-sm font-medium">{patient.age} <span className="text-muted-foreground">/</span> {patient.gender}</TableCell>
                <TableCell className="text-sm font-bold text-primary/80">{patient.department}</TableCell>
                <TableCell className="text-xs font-bold text-muted-foreground uppercase">{patient.lastVisit}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={cn("rounded-full font-bold text-[10px] uppercase tracking-widest px-3 py-1", statusStyles[patient.status])}>
                    {patient.status}
                  </Badge>
                </TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 p-2">
                      <DropdownMenuItem onClick={() => handleViewDetails(patient.id)} className="rounded-md">
                        <Eye className="mr-2 h-4 w-4 text-primary" />
                        <span className="font-semibold text-sm">View Details</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEditPatient(patient.id)} className="rounded-md">
                        <Edit className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span className="font-semibold text-sm">Edit Patient</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="text-medical-danger focus:text-medical-danger focus:bg-medical-danger/5 rounded-md"
                        onClick={() => handleDeletePatient(patient.id, patient.name)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span className="font-bold text-sm">Delete Record</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
