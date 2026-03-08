import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Clock, CheckCircle, Calendar, Search } from "lucide-react";
import { toast } from "sonner";

const initialQueue = [
  { token: "OPD001", patient: "John Smith", doctor: "Dr. Johnson", department: "General", time: "09:00", status: "In Progress" },
  { token: "OPD002", patient: "Emily Davis", doctor: "Dr. Chen", department: "Cardiology", time: "09:15", status: "Waiting" },
  { token: "OPD003", patient: "Robert Wilson", doctor: "Dr. Johnson", department: "General", time: "09:30", status: "Waiting" },
  { token: "OPD004", patient: "Sarah Johnson", doctor: "Dr. Davis", department: "Pediatrics", time: "09:45", status: "Waiting" },
];

export default function OPDPage() {
  const [queue, setQueue] = useState(initialQueue);
  const [search, setSearch] = useState("");

  const filtered = queue.filter(i =>
    i.patient.toLowerCase().includes(search.toLowerCase()) ||
    i.doctor.toLowerCase().includes(search.toLowerCase()) ||
    i.token.toLowerCase().includes(search.toLowerCase())
  );

  const markComplete = (token: string) => {
    setQueue(prev => prev.map(i => i.token === token ? { ...i, status: "Completed" } : i));
    toast.success(`${token} marked as completed`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Outpatient Department (OPD)</h1>
            <p className="text-muted-foreground">Manage outpatient appointments and queue</p>
          </div>
        </div>

        <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Today's Patients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">{queue.length}</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">In Queue</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">{queue.filter(i => i.status === "Waiting").length}</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent><div className="text-2xl font-bold text-medical-success">{queue.filter(i => i.status === "Completed").length}</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">{queue.filter(i => i.status === "In Progress").length}</div></CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <CardTitle>Current Queue</CardTitle>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search queue..." className="pl-8" value={search} onChange={e => setSearch(e.target.value)} />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto -mx-6 px-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Token</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((item) => (
                    <TableRow key={item.token}>
                      <TableCell className="font-medium">{item.token}</TableCell>
                      <TableCell>{item.patient}</TableCell>
                      <TableCell>{item.doctor}</TableCell>
                      <TableCell><Badge variant="outline">{item.department}</Badge></TableCell>
                      <TableCell>{item.time}</TableCell>
                      <TableCell>
                        <Badge variant={item.status === "In Progress" ? "default" : item.status === "Completed" ? "secondary" : "outline"}>
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {item.status === "Waiting" && (
                          <Button size="sm" variant="outline" onClick={() => markComplete(item.token)}>Complete</Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                  {filtered.length === 0 && (
                    <TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No results found</TableCell></TableRow>
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
