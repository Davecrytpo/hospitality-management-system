import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pill, Plus, Search, Filter, Eye, Printer } from "lucide-react";
import { Link } from "react-router-dom";

const mockPrescriptions = [
  { id: "RX001", patient: "John Smith", doctor: "Dr. Johnson", date: "2024-01-15", medications: 3, status: "Active" },
  { id: "RX002", patient: "Emily Davis", doctor: "Dr. Chen", date: "2024-01-14", medications: 2, status: "Dispensed" },
  { id: "RX003", patient: "Robert Wilson", doctor: "Dr. Smith", date: "2024-01-13", medications: 4, status: "Active" },
  { id: "RX004", patient: "Sarah Johnson", doctor: "Dr. Davis", date: "2024-01-12", medications: 1, status: "Expired" },
];

export default function PrescriptionsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">All Prescriptions</h1>
            <p className="text-muted-foreground">Manage patient prescriptions</p>
          </div>
          <Button asChild>
            <Link to="/prescriptions/new">
              <Plus className="mr-2 h-4 w-4" />
              New Prescription
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Prescriptions</CardTitle>
              <Pill className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,847</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-success">567</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Dispensed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-primary">1,234</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Expired</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-muted-foreground">46</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Prescription List</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search prescriptions..." className="pl-8 w-64" />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rx ID</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Medications</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-24">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockPrescriptions.map((rx) => (
                  <TableRow key={rx.id}>
                    <TableCell className="font-medium">{rx.id}</TableCell>
                    <TableCell>{rx.patient}</TableCell>
                    <TableCell>{rx.doctor}</TableCell>
                    <TableCell>{rx.date}</TableCell>
                    <TableCell>{rx.medications} items</TableCell>
                    <TableCell>
                      <Badge variant={rx.status === "Active" ? "default" : rx.status === "Dispensed" ? "secondary" : "outline"}>
                        {rx.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon"><Printer className="h-4 w-4" /></Button>
                      </div>
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
