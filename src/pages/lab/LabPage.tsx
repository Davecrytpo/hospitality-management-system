import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FlaskConical, Plus, Search, Filter, Clock, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const mockTests = [
  { id: "LAB001", patient: "John Smith", test: "Complete Blood Count", orderedBy: "Dr. Johnson", date: "2024-01-15", status: "Pending" },
  { id: "LAB002", patient: "Emily Davis", test: "Lipid Profile", orderedBy: "Dr. Chen", date: "2024-01-15", status: "In Progress" },
  { id: "LAB003", patient: "Robert Wilson", test: "Liver Function", orderedBy: "Dr. Smith", date: "2024-01-14", status: "Completed" },
  { id: "LAB004", patient: "Sarah Johnson", test: "Thyroid Panel", orderedBy: "Dr. Davis", date: "2024-01-14", status: "Completed" },
];

export default function LabPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Lab Tests</h1>
            <p className="text-muted-foreground">Manage laboratory test orders</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Order Test
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Tests</CardTitle>
              <FlaskConical className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">847</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-medical-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-warning">67</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-primary">23</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
              <CheckCircle className="h-4 w-4 text-medical-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-success">45</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Test Orders</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search tests..." className="pl-8 w-64" />
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
                  <TableHead>Lab ID</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Test</TableHead>
                  <TableHead>Ordered By</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockTests.map((test) => (
                  <TableRow key={test.id}>
                    <TableCell className="font-medium">{test.id}</TableCell>
                    <TableCell>{test.patient}</TableCell>
                    <TableCell>{test.test}</TableCell>
                    <TableCell>{test.orderedBy}</TableCell>
                    <TableCell>{test.date}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          test.status === "Completed" ? "default" :
                          test.status === "Pending" ? "secondary" : "outline"
                        }
                      >
                        {test.status}
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
