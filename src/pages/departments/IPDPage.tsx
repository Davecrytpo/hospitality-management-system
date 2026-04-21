import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, BedDouble, Clock, TrendingUp, Search } from "lucide-react";
import { toast } from "sonner";

const initialPatients = [
  { id: "IPD001", patient: "John Smith", room: "101A", doctor: "Dr. Johnson", admitted: "2024-01-10", days: 5, status: "Stable" },
  { id: "IPD002", patient: "Emily Davis", room: "ICU-3", doctor: "Dr. Chen", admitted: "2024-01-12", days: 3, status: "Critical" },
  { id: "IPD003", patient: "Robert Wilson", room: "205B", doctor: "Dr. Smith", admitted: "2024-01-14", days: 1, status: "Recovering" },
  { id: "IPD004", patient: "Sarah Johnson", room: "103A", doctor: "Dr. Davis", admitted: "2024-01-13", days: 2, status: "Stable" },
];

export default function IPDPage() {
  const [patients, setPatients] = useState(initialPatients);
  const [search, setSearch] = useState("");

  const filtered = patients.filter(p =>
    p.patient.toLowerCase().includes(search.toLowerCase()) ||
    p.id.toLowerCase().includes(search.toLowerCase()) ||
    p.room.toLowerCase().includes(search.toLowerCase())
  );

  const discharge = (id: string) => {
    setPatients(prev => prev.filter(p => p.id !== id));
    toast.success(`Patient ${id} discharged successfully`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Inpatient Department (IPD)</h1>
            <p className="text-muted-foreground">Manage admitted patients and ward occupancy</p>
          </div>
        </div>

        <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Admitted</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">{patients.length}</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Critical</CardTitle>
              <BedDouble className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent><div className="text-2xl font-bold text-destructive">{patients.filter(p => p.status === "Critical").length}</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Stable</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">{patients.filter(p => p.status === "Stable").length}</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Recovering</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent><div className="text-2xl font-bold text-medical-success">{patients.filter(p => p.status === "Recovering").length}</div></CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <CardTitle>Current Inpatients</CardTitle>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search patients..." className="pl-8" value={search} onChange={e => setSearch(e.target.value)} />
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
                    <TableHead>Days</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((patient) => (
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
                      <TableCell>
                        <Button size="sm" variant="outline" onClick={() => discharge(patient.id)}>Discharge</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filtered.length === 0 && (
                    <TableRow><TableCell colSpan={8} className="text-center py-8 text-muted-foreground">No patients found</TableCell></TableRow>
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
