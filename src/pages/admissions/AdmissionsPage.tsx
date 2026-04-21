import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BedDouble, Plus, Search, Filter, AlertTriangle, Eye, MoreHorizontal } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mockAdmissions = [
  { id: "ADM001", patient: "John Smith", room: "101A", doctor: "Dr. Johnson", admitted: "2024-01-10", status: "Stable", type: "General" },
  { id: "ADM002", patient: "Emily Davis", room: "ICU-3", doctor: "Dr. Chen", admitted: "2024-01-12", status: "Critical", type: "ICU" },
  { id: "ADM003", patient: "Robert Wilson", room: "205B", doctor: "Dr. Smith", admitted: "2024-01-14", status: "Recovering", type: "Surgery" },
  { id: "ADM004", patient: "Sarah Johnson", room: "103A", doctor: "Dr. Davis", admitted: "2024-01-13", status: "Stable", type: "General" },
];

export default function AdmissionsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAdmissions = mockAdmissions.filter(a =>
    a.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.room.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Current Admissions</h1>
            <p className="text-muted-foreground">Manage hospital admissions and bed occupancy</p>
          </div>
          <Button asChild>
            <Link to="/admissions/new">
              <Plus className="mr-2 h-4 w-4" />
              New Admission
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Admitted</CardTitle>
              <BedDouble className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">198</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Available Beds</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-success">52</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">ICU Patients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-warning">12</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Critical</CardTitle>
              <AlertTriangle className="h-4 w-4 text-medical-danger" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-danger">5</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <CardTitle>Admission Records</CardTitle>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-initial">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search admissions..."
                    className="pl-8 w-full sm:w-64"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="icon" onClick={() => toast.info("Filter options coming soon")}>
                  <Filter className="h-4 w-4" />
                </Button>
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
                    <TableHead>Room</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Admitted</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAdmissions.map((admission) => (
                    <TableRow key={admission.id} className="cursor-pointer hover:bg-muted/50">
                      <TableCell className="font-medium">{admission.id}</TableCell>
                      <TableCell>{admission.patient}</TableCell>
                      <TableCell>{admission.room}</TableCell>
                      <TableCell>{admission.doctor}</TableCell>
                      <TableCell>{admission.admitted}</TableCell>
                      <TableCell><Badge variant="outline">{admission.type}</Badge></TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            admission.status === "Critical" ? "destructive" :
                            admission.status === "Recovering" ? "default" : "secondary"
                          }
                        >
                          {admission.status}
                        </Badge>
                      </TableCell>
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => toast.success(`Viewing ${admission.patient}`)}>
                              <Eye className="mr-2 h-4 w-4" /> View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate("/admissions/discharge")}>
                              Discharge Patient
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate("/admissions/beds")}>
                              Transfer Bed
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredAdmissions.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                        No admissions found matching "{searchQuery}"
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
