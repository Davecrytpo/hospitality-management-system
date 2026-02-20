import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Plus, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const reports = [
  { id: 1, name: "Monthly Disease Notification Report", period: "Jan 2024", status: "ready", type: "disease" },
  { id: 2, name: "Maternal Mortality Report", period: "Q4 2023", status: "ready", type: "mortality" },
  { id: 3, name: "Immunization Coverage Report", period: "Jan 2024", status: "pending", type: "immunization" },
  { id: 4, name: "Hospital Return (HMIS 035)", period: "Jan 2024", status: "ready", type: "hmis" },
];

export default function TaxCompliancePage() {
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ report_type: "", period: "", notes: "" });

  const handleGenerate = () => {
    if (!form.report_type || !form.period) return toast({ title: "Please select report type and period", variant: "destructive" });
    toast({ title: `${form.report_type} report generation started!` });
    setShowForm(false);
    setForm({ report_type: "", period: "", notes: "" });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2"><FileText className="h-6 w-6 text-primary" /> Tax & Compliance</h1>
            <p className="text-muted-foreground">Generate government-required medical reports (HMIS, NHIA, etc.)</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}><Plus className="mr-2 h-4 w-4" /> Generate Report</Button>
        </div>

        {showForm && (
          <Card>
            <CardHeader><CardTitle>Generate Compliance Report</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label>Report Type *</Label>
                  <Select value={form.report_type} onValueChange={v => setForm(p => ({ ...p, report_type: v }))}>
                    <SelectTrigger><SelectValue placeholder="Select report type" /></SelectTrigger>
                    <SelectContent>
                      {["Disease Notification", "Maternal Health", "Immunization Coverage", "HMIS Monthly Return", "NHIA Claims", "Annual Statistical Report"].map(t => (
                        <SelectItem key={t} value={t}>{t}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1"><Label>Period (Month/Quarter) *</Label><Input value={form.period} onChange={e => setForm(p => ({ ...p, period: e.target.value }))} placeholder="e.g. February 2024" /></div>
              </div>
              <Button onClick={handleGenerate}><Save className="mr-2 h-4 w-4" /> Generate</Button>
            </CardContent>
          </Card>
        )}

        <div className="space-y-3">
          {reports.map(r => (
            <Card key={r.id}>
              <CardContent className="pt-4 flex items-center justify-between">
                <div>
                  <p className="font-medium">{r.name}</p>
                  <p className="text-sm text-muted-foreground">Period: {r.period}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={r.status === "ready" ? "default" : "secondary"}>{r.status}</Badge>
                  {r.status === "ready" && (
                    <Button size="sm" variant="outline" onClick={() => toast({ title: `${r.name} download started!` })}>
                      <Download className="mr-2 h-4 w-4" /> Download
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
