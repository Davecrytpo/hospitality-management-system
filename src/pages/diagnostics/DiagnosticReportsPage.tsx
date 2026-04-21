import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Printer } from "lucide-react";
import { toast } from "sonner";

export default function DiagnosticReportsPage() {
  const [reportType, setReportType] = useState("");
  const [dateRange, setDateRange] = useState("");
  const [format, setFormat] = useState("");

  const handleDownload = () => {
    if (!reportType || !dateRange || !format) {
      toast.error("Please select report type, date range, and format");
      return;
    }
    toast.success(`${reportType} report (${dateRange}) downloading as ${format.toUpperCase()}`);
  };

  const handlePrint = () => {
    if (!reportType) {
      toast.error("Please select a report type first");
      return;
    }
    toast.success(`Preparing ${reportType} report for printing...`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Diagnostic Reports</h1>
          <p className="text-muted-foreground">Generate diagnostic and imaging reports</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Generate Report</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger><SelectValue placeholder="Report Type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="imaging">Imaging Summary</SelectItem>
                  <SelectItem value="radiology">Radiology Report</SelectItem>
                  <SelectItem value="utilization">Equipment Utilization</SelectItem>
                </SelectContent>
              </Select>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger><SelectValue placeholder="Date Range" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>
              <Select value={format} onValueChange={setFormat}>
                <SelectTrigger><SelectValue placeholder="Format" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              <Button variant="outline" onClick={handlePrint}>
                <Printer className="mr-2 h-4 w-4" />
                Print
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
