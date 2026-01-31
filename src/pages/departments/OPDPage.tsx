import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Clock, CheckCircle, Calendar } from "lucide-react";

const opdQueue = [
  { token: "OPD001", patient: "John Smith", doctor: "Dr. Johnson", department: "General", time: "09:00", status: "In Progress" },
  { token: "OPD002", patient: "Emily Davis", doctor: "Dr. Chen", department: "Cardiology", time: "09:15", status: "Waiting" },
  { token: "OPD003", patient: "Robert Wilson", doctor: "Dr. Johnson", department: "General", time: "09:30", status: "Waiting" },
  { token: "OPD004", patient: "Sarah Johnson", doctor: "Dr. Davis", department: "Pediatrics", time: "09:45", status: "Waiting" },
];

export default function OPDPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Outpatient Department (OPD)</h1>
          <p className="text-muted-foreground">Manage outpatient appointments and queue</p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Today's Patients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">In Queue</CardTitle>
              <Clock className="h-4 w-4 text-medical-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-medical-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-success">89</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Avg Wait Time</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18 min</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Current Queue</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Token</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {opdQueue.map((item) => (
                  <TableRow key={item.token}>
                    <TableCell className="font-medium">{item.token}</TableCell>
                    <TableCell>{item.patient}</TableCell>
                    <TableCell>{item.doctor}</TableCell>
                    <TableCell><Badge variant="outline">{item.department}</Badge></TableCell>
                    <TableCell>{item.time}</TableCell>
                    <TableCell>
                      <Badge variant={item.status === "In Progress" ? "default" : "secondary"}>
                        {item.status}
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
