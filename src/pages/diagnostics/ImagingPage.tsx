import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Scan, Search, Filter, Eye, Download, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const mockImaging = [
  { id: "IMG001", patient: "John Smith", type: "X-Ray", area: "Chest", date: "2024-01-15", status: "Completed" },
  { id: "IMG002", patient: "Emily Davis", type: "MRI", area: "Brain", date: "2024-01-15", status: "Scheduled" },
  { id: "IMG003", patient: "Robert Wilson", type: "CT Scan", area: "Abdomen", date: "2024-01-14", status: "In Progress" },
  { id: "IMG004", patient: "Sarah Johnson", type: "Ultrasound", area: "Abdomen", date: "2024-01-14", status: "Completed" },
];

export default function ImagingPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Imaging</h1>
            <p className="text-muted-foreground">Medical imaging and scans</p>
          </div>
          <Button asChild>
            <Link to="/diagnostics/imaging/new">
              <Plus className="mr-2 h-4 w-4" />
              Order Imaging
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Scans</CardTitle>
              <Scan className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">456</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-warning">23</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-primary">8</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-success">34</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Imaging Orders</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search..." className="pl-8 w-full sm:w-64" />
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
                  <TableHead>ID</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Area</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-24">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockImaging.map((img) => (
                  <TableRow key={img.id}>
                    <TableCell className="font-medium">{img.id}</TableCell>
                    <TableCell>{img.patient}</TableCell>
                    <TableCell><Badge variant="outline">{img.type}</Badge></TableCell>
                    <TableCell>{img.area}</TableCell>
                    <TableCell>{img.date}</TableCell>
                    <TableCell>
                      <Badge variant={img.status === "Completed" ? "default" : img.status === "Scheduled" ? "secondary" : "outline"}>
                        {img.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon"><Download className="h-4 w-4" /></Button>
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

