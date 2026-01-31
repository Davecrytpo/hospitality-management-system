import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, BedDouble, Clock, TrendingUp } from "lucide-react";

const ipdPatients = [
  { id: "IPD001", patient: "John Smith", room: "101A", doctor: "Dr. Johnson", admitted: "2024-01-10", days: 5, status: "Stable" },
  { id: "IPD002", patient: "Emily Davis", room: "ICU-3", doctor: "Dr. Chen", admitted: "2024-01-12", days: 3, status: "Critical" },
  { id: "IPD003", patient: "Robert Wilson", room: "205B", doctor: "Dr. Smith", admitted: "2024-01-14", days: 1, status: "Recovering" },
  { id: "IPD004", patient: "Sarah Johnson", room: "103A", doctor: "Dr. Davis", admitted: "2024-01-13", days: 2, status: "Stable" },
];

export default function IPDPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Inpatient Department (IPD)</h1>
          <p className="text-muted-foreground">Manage admitted patients and ward occupancy</p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Admitted Patients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">198</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Bed Occupancy</CardTitle>
              <BedDouble className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">79%</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Avg Stay</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.2 days</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Discharges Today</CardTitle>
              <TrendingUp className="h-4 w-4 text-medical-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-success">12</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Current Inpatients</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Admitted</TableHead>
                  <TableHead>Days</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ipdPatients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell className="font-medium">{patient.id}</TableCell>
                    <TableCell>{patient.patient}</TableCell>
                    <TableCell>{patient.room}</TableCell>
                    <TableCell>{patient.doctor}</TableCell>
                    <TableCell>{patient.admitted}</TableCell>
                    <TableCell>{patient.days}</TableCell>
                    <TableCell>
                      <Badge variant={patient.status === "Critical" ? "destructive" : patient.status === "Recovering" ? "default" : "secondary"}>
                        {patient.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
