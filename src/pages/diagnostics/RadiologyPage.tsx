import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Eye, FileText, Plus } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const mockRadiology = [
  { id: "RAD001", patient: "John Smith", study: "Chest X-Ray", radiologist: "Dr. Williams", date: "2024-01-15", status: "Reported" },
  { id: "RAD002", patient: "Emily Davis", study: "Brain MRI", radiologist: "Dr. Brown", date: "2024-01-15", status: "Pending Review" },
  { id: "RAD003", patient: "Robert Wilson", study: "Abdominal CT", radiologist: "Dr. Williams", date: "2024-01-14", status: "Reported" },
];

export default function RadiologyPage() {
  const [search, setSearch] = useState("");

  const filtered = mockRadiology.filter(s =>
    s.patient.toLowerCase().includes(search.toLowerCase()) ||
    s.study.toLowerCase().includes(search.toLowerCase()) ||
    s.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Radiology</h1>
            <p className="text-muted-foreground">Radiology studies and reports</p>
          </div>
          <Button asChild>
            <Link to="/diagnostics/imaging/new">
              <Plus className="mr-2 h-4 w-4" />
              New Study
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <CardTitle>Radiology Studies</CardTitle>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search studies..." className="pl-8" value={search} onChange={e => setSearch(e.target.value)} />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto -mx-6 px-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Study ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Study Type</TableHead>
                    <TableHead>Radiologist</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-24">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((study) => (
                    <TableRow key={study.id}>
                      <TableCell className="font-medium">{study.id}</TableCell>
                      <TableCell>{study.patient}</TableCell>
                      <TableCell>{study.study}</TableCell>
                      <TableCell>{study.radiologist}</TableCell>
                      <TableCell>{study.date}</TableCell>
                      <TableCell>
                        <Badge variant={study.status === "Reported" ? "default" : "secondary"}>
                          {study.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" onClick={() => toast.success(`Viewing ${study.id}`)}><Eye className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="icon" onClick={() => toast.success(`Report for ${study.id} opened`)}><FileText className="h-4 w-4" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filtered.length === 0 && (
                    <TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No studies found</TableCell></TableRow>
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
