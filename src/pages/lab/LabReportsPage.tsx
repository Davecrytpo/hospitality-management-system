import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Download, Printer, BarChart3 } from "lucide-react";

const reportTypes = [
  { name: "Daily Summary", description: "Summary of all tests processed today", icon: FileText },
  { name: "Weekly Statistics", description: "Test volume and turnaround times", icon: BarChart3 },
  { name: "Monthly Report", description: "Comprehensive monthly analytics", icon: FileText },
  { name: "Custom Report", description: "Generate custom date range report", icon: FileText },
];

export default function LabReportsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Lab Reports</h1>
          <p className="text-muted-foreground">Generate and download laboratory reports</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {reportTypes.map((report) => (
            <Card key={report.name}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <report.icon className="h-5 w-5" />
                  {report.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{report.description}</p>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <Printer className="mr-2 h-4 w-4" />
                    Print
                  </Button>
                  <Button className="flex-1">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Custom Report Generator</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <Select>
                <SelectTrigger><SelectValue placeholder="Report Type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tests</SelectItem>
                  <SelectItem value="cbc">Blood Tests</SelectItem>
                  <SelectItem value="urine">Urine Tests</SelectItem>
                  <SelectItem value="imaging">Imaging</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger><SelectValue placeholder="Date Range" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger><SelectValue placeholder="Format" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button>Generate Report</Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
