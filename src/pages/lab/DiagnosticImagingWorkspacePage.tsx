import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Scan, Plus, Save, Eye, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockScans = [
  { id: 1, patient: "John Smith", study: "Chest X-Ray", date: "2024-02-15", status: "Pending Report", modality: "X-Ray" },
  { id: 2, patient: "Emily Davis", study: "Brain MRI", date: "2024-02-14", status: "Reported", modality: "MRI" },
  { id: 3, patient: "Robert Wilson", study: "Abdominal CT", date: "2024-02-13", status: "Reported", modality: "CT Scan" },
  { id: 4, patient: "Sarah Johnson", study: "Knee Ultrasound", date: "2024-02-15", status: "Pending Report", modality: "Ultrasound" },
];

export default function DiagnosticImagingWorkspacePage() {
  const { toast } = useToast();
  const [selected, setSelected] = useState<any>(null);
  const [report, setReport] = useState("");
  const [saving, setSaving] = useState(false);

  const submitReport = () => {
    if (!report.trim()) return toast({ title: "Please enter a report", variant: "destructive" });
    setSaving(true);
    setTimeout(() => {
      toast({ title: "Radiologist report submitted successfully!" });
      setReport("");
      setSelected(null);
      setSaving(false);
    }, 800);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2"><Scan className="h-6 w-6 text-primary" /> Diagnostic Imaging Workspace</h1>
          <p className="text-muted-foreground">Radiologist view and report interface</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader><CardTitle>Imaging Queue</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockScans.map(scan => (
                  <div key={scan.id} className={`p-3 border rounded-lg cursor-pointer transition-colors ${selected?.id === scan.id ? "border-primary bg-primary/5" : "hover:bg-muted/50"}`} onClick={() => setSelected(scan)}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{scan.patient}</p>
                        <p className="text-sm text-muted-foreground">{scan.study} • {scan.modality} • {scan.date}</p>
                      </div>
                      <Badge variant={scan.status === "Reported" ? "default" : "secondary"}>{scan.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>{selected ? `Report: ${selected.study}` : "Select a Scan"}</CardTitle></CardHeader>
            <CardContent>
              {!selected ? (
                <p className="text-muted-foreground text-center py-12">Click on a scan from the queue to write a report.</p>
              ) : (
                <div className="space-y-4">
                  <div className="p-3 bg-muted rounded-lg text-sm">
                    <p><strong>Patient:</strong> {selected.patient}</p>
                    <p><strong>Study:</strong> {selected.study}</p>
                    <p><strong>Modality:</strong> {selected.modality}</p>
                    <p><strong>Date:</strong> {selected.date}</p>
                  </div>
                  <div className="h-40 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed">
                    <p className="text-muted-foreground text-sm">Image viewer (DICOM) — Upload in production</p>
                  </div>
                  <div className="space-y-1">
                    <Label>Radiologist Report *</Label>
                    <Textarea rows={6} value={report} onChange={e => setReport(e.target.value)} placeholder="Findings: ...\n\nImpression: ...\n\nRecommendation: ..." />
                  </div>
                  <Button onClick={submitReport} disabled={saving} className="w-full">
                    <Save className="mr-2 h-4 w-4" />{saving ? "Submitting..." : "Submit Report"}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
