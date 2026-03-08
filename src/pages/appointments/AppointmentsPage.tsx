import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, Plus, Search, Filter, Clock, CheckCircle, XCircle, AlertCircle, MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mockAppointments = [
  { id: "A001", patient: "John Smith", doctor: "Dr. Sarah Johnson", date: "2024-01-15", time: "09:00", type: "Consultation", status: "Confirmed" },
  { id: "A002", patient: "Emily Davis", doctor: "Dr. Michael Chen", date: "2024-01-15", time: "10:30", type: "Follow-up", status: "Pending" },
  { id: "A003", patient: "Robert Wilson", doctor: "Dr. Emily Davis", date: "2024-01-15", time: "11:00", type: "Emergency", status: "Confirmed" },
  { id: "A004", patient: "Sarah Johnson", doctor: "Dr. James Wilson", date: "2024-01-15", time: "14:00", type: "Checkup", status: "Cancelled" },
  { id: "A005", patient: "Michael Brown", doctor: "Dr. Lisa Anderson", date: "2024-01-15", time: "15:30", type: "Consultation", status: "Confirmed" },
];

export default function AppointmentsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredAppointments = mockAppointments.filter(apt =>
    apt.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
    apt.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    apt.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleView = (apt: typeof mockAppointments[0]) => {
    toast.success(`Viewing appointment ${apt.id}`, {
      description: `${apt.patient} with ${apt.doctor}`
    });
  };

  const handleEdit = (apt: typeof mockAppointments[0]) => {
    navigate("/appointments/new");
    toast.info(`Editing appointment ${apt.id}`);
  };

  const handleCancel = (apt: typeof mockAppointments[0]) => {
    toast.error(`Cancel appointment?`, {
      description: `${apt.patient} - ${apt.date} at ${apt.time}`,
      action: {
        label: "Confirm",
        onClick: () => toast.success("Appointment cancelled")
      }
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">All Appointments</h1>
            <p className="text-muted-foreground">Manage patient appointments and schedules</p>
          </div>
          <Button asChild>
            <Link to="/appointments/new">
              <Plus className="mr-2 h-4 w-4" />
              New Appointment
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate("/appointments/calendar")}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => toast.info("Filtering confirmed appointments")}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
              <CheckCircle className="h-4 w-4 text-medical-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-success">18</div>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => toast.info("Filtering pending appointments")}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <AlertCircle className="h-4 w-4 text-medical-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-warning">4</div>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => toast.info("Filtering cancelled appointments")}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Cancelled</CardTitle>
              <XCircle className="h-4 w-4 text-medical-danger" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-danger">2</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Appointment List</CardTitle>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-initial">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search appointments..." 
                    className="pl-8 w-full sm:w-64"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button 
                  variant={showFilters ? "default" : "outline"} 
                  size="icon"
                  onClick={() => {
                    setShowFilters(!showFilters);
                    toast.info(showFilters ? "Filters hidden" : "Filters shown");
                  }}
                >
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
                  <TableHead>Doctor</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAppointments.map((apt) => (
                  <TableRow 
                    key={apt.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleView(apt)}
                  >
                    <TableCell className="font-medium">{apt.id}</TableCell>
                    <TableCell>{apt.patient}</TableCell>
                    <TableCell>{apt.doctor}</TableCell>
                    <TableCell>{apt.date}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {apt.time}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{apt.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          apt.status === "Confirmed" ? "default" :
                          apt.status === "Cancelled" ? "destructive" : "secondary"
                        }
                      >
                        {apt.status}
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
                          <DropdownMenuItem onClick={() => handleView(apt)}>
                            <Eye className="mr-2 h-4 w-4" /> View
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEdit(apt)}>
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive" onClick={() => handleCancel(apt)}>
                            <Trash2 className="mr-2 h-4 w-4" /> Cancel
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredAppointments.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      No appointments found matching "{searchQuery}"
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
