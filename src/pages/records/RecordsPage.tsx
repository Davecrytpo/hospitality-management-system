import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Search, Filter, Eye, Download } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const mockRecords = [
  { id: "REC001", patient: "John Smith", type: "Diagnosis", date: "2024-01-15", doctor: "Dr. Johnson", status: "Complete" },
  { id: "REC002", patient: "Emily Davis", type: "Lab Report", date: "2024-01-14", doctor: "Dr. Chen", status: "Pending" },
  { id: "REC003", patient: "Robert Wilson", type: "Prescription", date: "2024-01-13", doctor: "Dr. Smith", status: "Complete" },
  { id: "REC004", patient: "Sarah Johnson", type: "Treatment Plan", date: "2024-01-12", doctor: "Dr. Davis", status: "In Progress" },
];

export default function RecordsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const filteredRecords = mockRecords.filter(record => {
    const matchesSearch = record.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.doctor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || record.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleView = (record: typeof mockRecords[0]) => {
    toast.success(`Opening record ${record.id}`, {
      description: `${record.type} for ${record.patient}`
    });
  };

  const handleDownload = (record: typeof mockRecords[0]) => {
    toast.success(`Downloading ${record.id}`, {
      description: `${record.type} - ${record.patient}.pdf`
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Patient Records</h1>
            <p className="text-muted-foreground">Access and manage medical records</p>
          </div>
        </div>

        <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setStatusFilter(null)}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Records</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,847</div>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => { setStatusFilter(null); toast.info("This month's records"); }}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">456</div>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => { setStatusFilter("Pending"); toast.info("Filtering: Pending Review"); }}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-warning">23</div>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => toast.info("Viewing archived records")}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Archived</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-muted-foreground">8,234</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <CardTitle>
                Records
                {statusFilter && <Badge variant="secondary" className="ml-2 cursor-pointer" onClick={() => setStatusFilter(null)}>
                  {statusFilter} ✕
                </Badge>}
              </CardTitle>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-initial">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search records..."
                    className="pl-8 w-full sm:w-64"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="icon" onClick={() => toast.info("Advanced filters coming soon")}>
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
                    <TableHead>Record ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-24">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecords.map((record) => (
                    <TableRow key={record.id} className="cursor-pointer hover:bg-muted/50" onClick={() => handleView(record)}>
                      <TableCell className="font-medium">{record.id}</TableCell>
                      <TableCell>{record.patient}</TableCell>
                      <TableCell><Badge variant="outline">{record.type}</Badge></TableCell>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>{record.doctor}</TableCell>
                      <TableCell>
                        <Badge variant={record.status === "Complete" ? "default" : record.status === "Pending" ? "destructive" : "secondary"}>
                          {record.status}
                        </Badge>
                      </TableCell>
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" onClick={() => handleView(record)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDownload(record)}>
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredRecords.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        No records found matching "{searchQuery}"
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
