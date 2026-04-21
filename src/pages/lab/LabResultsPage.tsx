import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, Eye, Download, FileText } from "lucide-react";

const mockResults = [
  { id: "RES001", patient: "John Smith", test: "CBC", date: "2024-01-15", result: "Normal", doctor: "Dr. Johnson" },
  { id: "RES002", patient: "Emily Davis", test: "Lipid Profile", date: "2024-01-15", result: "Abnormal", doctor: "Dr. Chen" },
  { id: "RES003", patient: "Robert Wilson", test: "Liver Function", date: "2024-01-14", result: "Normal", doctor: "Dr. Smith" },
  { id: "RES004", patient: "Sarah Johnson", test: "Thyroid Panel", date: "2024-01-14", result: "Borderline", doctor: "Dr. Davis" },
];

export default function LabResultsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Test Results</h1>
          <p className="text-muted-foreground">View and manage laboratory test results</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Results</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search results..." className="pl-8 w-full sm:w-64" />
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
                  <TableHead>Result ID</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Test</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Result</TableHead>
                  <TableHead>Reviewing Doctor</TableHead>
                  <TableHead className="w-24">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockResults.map((result) => (
                  <TableRow key={result.id}>
                    <TableCell className="font-medium">{result.id}</TableCell>
                    <TableCell>{result.patient}</TableCell>
                    <TableCell>{result.test}</TableCell>
                    <TableCell>{result.date}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          result.result === "Normal" ? "default" :
                          result.result === "Abnormal" ? "destructive" : "secondary"
                        }
                      >
                        {result.result}
                      </Badge>
                    </TableCell>
                    <TableCell>{result.doctor}</TableCell>
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

