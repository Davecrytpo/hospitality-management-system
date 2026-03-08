import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pill, Plus, Search, Filter, Eye, Printer, MoreHorizontal } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mockPrescriptions = [
  { id: "RX001", patient: "John Smith", doctor: "Dr. Johnson", date: "2024-01-15", medications: 3, status: "Active" },
  { id: "RX002", patient: "Emily Davis", doctor: "Dr. Chen", date: "2024-01-14", medications: 2, status: "Dispensed" },
  { id: "RX003", patient: "Robert Wilson", doctor: "Dr. Smith", date: "2024-01-13", medications: 4, status: "Active" },
  { id: "RX004", patient: "Sarah Johnson", doctor: "Dr. Davis", date: "2024-01-12", medications: 1, status: "Expired" },
];

export default function PrescriptionsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPrescriptions = mockPrescriptions.filter(rx =>
    rx.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rx.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rx.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleView = (rx: typeof mockPrescriptions[0]) => {
    navigate(`/prescriptions/${rx.id}`);
  };

  const handlePrint = (rx: typeof mockPrescriptions[0]) => {
    toast.success(`Printing prescription ${rx.id}`, {
      description: `${rx.patient} - ${rx.medications} medications`
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
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

        <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
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
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <CardTitle>Prescription List</CardTitle>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-initial">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search prescriptions..."
                    className="pl-8 w-full sm:w-64"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="icon" onClick={() => navigate("/prescriptions/templates")}>
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
                    <TableHead>Rx ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Medications</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPrescriptions.map((rx) => (
                    <TableRow key={rx.id} className="cursor-pointer hover:bg-muted/50" onClick={() => handleView(rx)}>
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
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleView(rx)}>
                              <Eye className="mr-2 h-4 w-4" /> View
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handlePrint(rx)}>
                              <Printer className="mr-2 h-4 w-4" /> Print
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate("/pharmacy/dispense")}>
                              Dispense
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredPrescriptions.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        No prescriptions found matching "{searchQuery}"
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
