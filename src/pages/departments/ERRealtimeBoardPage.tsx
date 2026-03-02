import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Ambulance, Plus, Save, AlertTriangle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type TriageLevel = "critical" | "severe" | "moderate" | "mild";

type ERCase = {
  id: string;
  patient: string;
  complaint: string;
  time: string;
  triage: TriageLevel;
  status: string;
  doctor: string;
};

const severityColors: Record<TriageLevel, BadgeProps["variant"]> = {
  critical: "destructive",
  severe: "secondary",
  moderate: "outline",
  mild: "outline",
};

const mockCases: ERCase[] = [
  { id: "ER001", patient: "Unknown Male, ~35", complaint: "Chest Pain + Diaphoresis", time: "09:12 AM", triage: "critical", status: "In Treatment", doctor: "Dr. Emeka" },
  { id: "ER002", patient: "Adaeze Nwosu", complaint: "RTA - Multiple Lacertations", time: "09:45 AM", triage: "severe", status: "Awaiting Scan", doctor: "Dr. Chioma" },
  { id: "ER003", patient: "Musa Al-Hassan", complaint: "Difficulty Breathing", time: "10:02 AM", triage: "severe", status: "Stabilized", doctor: "Dr. Emeka" },
  { id: "ER004", patient: "Grace Eze", complaint: "Diabetic Ketoacidosis", time: "10:15 AM", triage: "moderate", status: "Awaiting Admission", doctor: "Dr. Kemi" },
];

export default function ERRealtimeBoardPage() {
  const { toast } = useToast();
  const [cases, setCases] = useState<ERCase[]>(mockCases);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ patient: "", complaint: "", triage: "moderate" });
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(t);
  }, []);

  const addCase = () => {
    if (!form.patient || !form.complaint) return toast({ title: "Fill required fields", variant: "destructive" });
    setCases(prev => [...prev, {
      id: `ER00${prev.length + 1}`, patient: form.patient, complaint: form.complaint,
      triage: form.triage as TriageLevel,
      time: new Date().toLocaleTimeString(), status: "Triage", doctor: "Unassigned"
    }]);
    toast({ title: "ER case registered!" });
    setShowForm(false);
    setForm({ patient: "", complaint: "", triage: "moderate" });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2"><AlertTriangle className="h-6 w-6 text-destructive" /> Emergency Room - Live Board</h1>
            <p className="text-muted-foreground flex items-center gap-2"><Clock className="h-4 w-4" /> {time}</p>
          </div>
          <Button variant="destructive" onClick={() => setShowForm(!showForm)}><Plus className="mr-2 h-4 w-4" /> Register Case</Button>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {["critical", "severe", "moderate", "mild"].map(s => (
            <Card key={s} className={s === "critical" ? "border-destructive" : ""}>
              <CardHeader className="pb-2"><CardTitle className="text-sm capitalize">{s}</CardTitle></CardHeader>
              <CardContent><div className="text-3xl font-bold">{cases.filter(c => c.triage === s).length}</div></CardContent>
            </Card>
          ))}
        </div>

        {showForm && (
          <Card className="border-destructive">
            <CardHeader><CardTitle className="text-destructive">New ER Case</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1"><Label>Patient Name *</Label><Input value={form.patient} onChange={e => setForm(p => ({ ...p, patient: e.target.value }))} placeholder="Name or 'Unknown Male, ~30'" /></div>
                <div className="space-y-1"><Label>Triage Level</Label>
                  <Select value={form.triage} onValueChange={v => setForm(p => ({ ...p, triage: v }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{["critical", "severe", "moderate", "mild"].map(t => <SelectItem key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-1 md:col-span-2"><Label>Chief Complaint *</Label><Textarea value={form.complaint} onChange={e => setForm(p => ({ ...p, complaint: e.target.value }))} rows={2} /></div>
              </div>
              <Button variant="destructive" onClick={addCase}><Save className="mr-2 h-4 w-4" /> Register Patient</Button>
            </CardContent>
          </Card>
        )}

        <div className="space-y-3">
          {cases.map(c => (
            <Card key={c.id} className={c.triage === "critical" ? "border-destructive border-2" : ""}>
              <CardContent className="pt-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="font-mono text-sm font-bold text-muted-foreground">{c.id}</div>
                    <div>
                      <p className="font-semibold">{c.patient}</p>
                      <p className="text-sm text-muted-foreground">{c.complaint}</p>
                      <p className="text-xs text-muted-foreground">{c.time} - {c.doctor}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={severityColors[c.triage]}>{c.triage.toUpperCase()}</Badge>
                    <Badge variant="outline">{c.status}</Badge>
                    <Button size="sm" variant="outline" onClick={() => toast({ title: `Case ${c.id} updated` })}>Update</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
