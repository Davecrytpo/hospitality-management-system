import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Plus, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockLogs = [
  { id: 1, nurse: "Nurse Adaeze", shift: "Day (07:00-19:00)", date: "2024-02-19", summary: "Patient in Bed 3 (John Smith) BP elevated — notified Dr. Emeka. Bed 7 patient sleeping well. Quiet shift overall.", priority: "medium" },
  { id: 2, nurse: "Nurse Chioma", shift: "Night (19:00-07:00)", date: "2024-02-19", summary: "Patient in Bed 2 (Robert Wilson) complained of chest pain at 02:30. ECG done, Dr. on-call attended. Patient stable by 03:15.", priority: "high" },
];

export default function ShiftHandoverPage() {
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ shift: "", summary: "", priority: "low" });

  const handleSubmit = () => {
    if (!form.shift || !form.summary) return toast({ title: "Please fill all required fields", variant: "destructive" });
    toast({ title: "Handover log submitted successfully!" });
    setShowForm(false);
    setForm({ shift: "", summary: "", priority: "low" });
  };

  const priorityVariant = (p: string) => p === "high" ? "destructive" : p === "medium" ? "secondary" : "outline";

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2"><BookOpen className="h-6 w-6 text-primary" /> Shift Handover Log</h1>
            <p className="text-muted-foreground">Critical notes passed between day and night nurses</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}><Plus className="mr-2 h-4 w-4" /> New Entry</Button>
        </div>

        {showForm && (
          <Card>
            <CardHeader><CardTitle>New Handover Log</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1"><Label>Shift *</Label><Input value={form.shift} onChange={e => setForm(p => ({ ...p, shift: e.target.value }))} placeholder="e.g. Day Shift 07:00 - 19:00" /></div>
              <div className="space-y-1">
                <Label>Priority</Label>
                <div className="flex gap-2">
                  {["low", "medium", "high"].map(p => (
                    <Button key={p} size="sm" variant={form.priority === p ? "default" : "outline"} onClick={() => setForm(prev => ({ ...prev, priority: p }))}>{p}</Button>
                  ))}
                </div>
              </div>
              <div className="space-y-1"><Label>Summary & Key Events *</Label><Textarea rows={5} value={form.summary} onChange={e => setForm(p => ({ ...p, summary: e.target.value }))} placeholder="Document all critical patient events, medication changes, and notes..." /></div>
              <Button onClick={handleSubmit}><Save className="mr-2 h-4 w-4" /> Submit Log</Button>
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          {mockLogs.map(log => (
            <Card key={log.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{log.shift} — {log.date}</CardTitle>
                  <Badge variant={priorityVariant(log.priority) as any}>{log.priority} priority</Badge>
                </div>
                <p className="text-sm text-muted-foreground">By: {log.nurse}</p>
              </CardHeader>
              <CardContent><p className="text-sm">{log.summary}</p></CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
