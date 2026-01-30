import { MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
  return (
    <div className="rounded-xl border bg-card shadow-sm">
      <div className="flex items-center justify-between border-b p-6">
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">Recent Patients</h3>
          <p className="text-sm text-muted-foreground">Latest patient registrations and visits</p>
        </div>
        <Button variant="outline" size="sm">View All</Button>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient</TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Age/Gender</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Last Visit</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.map((patient) => (
            <TableRow key={patient.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={patient.avatar} alt={patient.name} />
                    <AvatarFallback>{patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-card-foreground">{patient.name}</p>
                    <p className="text-sm text-muted-foreground">{patient.phone}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="font-mono text-sm">{patient.id}</TableCell>
              <TableCell>{patient.age} / {patient.gender}</TableCell>
              <TableCell>{patient.department}</TableCell>
              <TableCell>{patient.lastVisit}</TableCell>
              <TableCell>
                <Badge variant="outline" className={statusStyles[patient.status]}>
                  {patient.status}
                </Badge>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Patient
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-medical-danger">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
