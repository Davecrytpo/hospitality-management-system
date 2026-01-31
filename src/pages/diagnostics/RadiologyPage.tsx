import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, Eye, FileText, Plus } from "lucide-react";

const mockRadiology = [
  { id: "RAD001", patient: "John Smith", study: "Chest X-Ray", radiologist: "Dr. Williams", date: "2024-01-15", status: "Reported" },
  { id: "RAD002", patient: "Emily Davis", study: "Brain MRI", radiologist: "Dr. Brown", date: "2024-01-15", status: "Pending Review" },
  { id: "RAD003", patient: "Robert Wilson", study: "Abdominal CT", radiologist: "Dr. Williams", date: "2024-01-14", status: "Reported" },
];

export default function RadiologyPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Radiology</h1>
            <p className="text-muted-foreground">Radiology studies and reports</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Study
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Radiology Studies</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search studies..." className="pl-8 w-64" />
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
                {mockRadiology.map((study) => (
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
                        <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon"><FileText className="h-4 w-4" /></Button>
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
