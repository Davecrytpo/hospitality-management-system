import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertTriangle, Clock, Users, BedDouble, Search, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const initialPatients = [
  { id: "ER001", name: "John Doe", age: 45, complaint: "Chest Pain", priority: "Critical", waitTime: "2 min", status: "In Treatment" },
  { id: "ER002", name: "Jane Smith", age: 32, complaint: "Fracture", priority: "High", waitTime: "15 min", status: "Waiting" },
  { id: "ER003", name: "Bob Wilson", age: 67, complaint: "Difficulty Breathing", priority: "Critical", waitTime: "5 min", status: "In Treatment" },
  { id: "ER004", name: "Alice Brown", age: 28, complaint: "Laceration", priority: "Medium", waitTime: "25 min", status: "Waiting" },
];

export default function EmergencyPage() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState(initialPatients);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = patients.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.complaint.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStatusChange = (id: string, newStatus: string) => {
    setPatients(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p));
    toast.success(`Patient ${id} status updated to ${newStatus}`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Emergency Department</h1>
            <p className="text-muted-foreground">Real-time emergency room status</p>
          </div>
          <Button onClick={() => navigate("/departments/er-board")}>Open ER Live Board</Button>
        </div>

        <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Critical Cases</CardTitle>
              <AlertTriangle className="h-4 w-4 text-medical-danger" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-danger">{patients.filter(p => p.priority === "Critical").length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Waiting</CardTitle>
              <Clock className="h-4 w-4 text-medical-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{patients.filter(p => p.status === "Waiting").length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">In Treatment</CardTitle>
              <Users className="h-4 w-4 text-medical-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{patients.filter(p => p.status === "In Treatment").length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Available Beds</CardTitle>
              <BedDouble className="h-4 w-4 text-medical-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <CardTitle>Emergency Patients</CardTitle>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search patients..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto -mx-6 px-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Chief Complaint</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Wait Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell className="font-medium">{patient.id}</TableCell>
                      <TableCell>{patient.name}</TableCell>
                      <TableCell>{patient.age}</TableCell>
                      <TableCell>{patient.complaint}</TableCell>
                      <TableCell>
                        <Badge variant={patient.priority === "Critical" ? "destructive" : patient.priority === "High" ? "default" : "secondary"}>
                          {patient.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>{patient.waitTime}</TableCell>
                      <TableCell>
                        <Badge variant={patient.status === "In Treatment" ? "default" : "outline"}>
                          {patient.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleStatusChange(patient.id, "In Treatment")}>Start Treatment</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(patient.id, "Discharged")}>Discharge</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate("/admissions/new")}>Admit to Ward</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filtered.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                        No patients found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
