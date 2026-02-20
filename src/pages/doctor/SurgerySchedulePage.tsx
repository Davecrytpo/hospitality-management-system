import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Scissors, Plus, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockSchedule = [
  { id: 1, patient: "John Smith", procedure: "Appendectomy", theater: "OT-1", date: "2024-02-20", time: "08:00", status: "Scheduled" },
  { id: 2, patient: "Emily Davis", procedure: "Cholecystectomy", theater: "OT-2", date: "2024-02-20", time: "10:30", status: "Completed" },
  { id: 3, patient: "Robert Wilson", procedure: "Hernia Repair", theater: "OT-1", date: "2024-02-21", time: "09:00", status: "Scheduled" },
];

export default function SurgerySchedulePage() {
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ patient: "", procedure: "", theater: "", date: "", time: "" });

  const handleSave = () => {
    if (!form.patient || !form.procedure || !form.date) {
      return toast({ title: "Please fill all required fields", variant: "destructive" });
    }
    toast({ title: "Surgery scheduled successfully!" });
    setShowForm(false);
    setForm({ patient: "", procedure: "", theater: "", date: "", time: "" });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2"><Scissors className="h-6 w-6 text-primary" /> Surgery Schedule</h1>
            <p className="text-muted-foreground">Manage operating theater timings</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}><Plus className="mr-2 h-4 w-4" /> Schedule Surgery</Button>
        </div>

        {showForm && (
          <Card>
            <CardHeader><CardTitle>New Surgery Entry</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1"><Label>Patient Name *</Label><Input value={form.patient} onChange={e => setForm(p => ({ ...p, patient: e.target.value }))} /></div>
                <div className="space-y-1"><Label>Procedure *</Label><Input value={form.procedure} onChange={e => setForm(p => ({ ...p, procedure: e.target.value }))} /></div>
                <div className="space-y-1"><Label>Theater</Label>
                  <Select value={form.theater} onValueChange={v => setForm(p => ({ ...p, theater: v }))}>
                    <SelectTrigger><SelectValue placeholder="Select theater" /></SelectTrigger>
                    <SelectContent>
                      {["OT-1", "OT-2", "OT-3", "OT-4"].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1"><Label>Date *</Label><Input type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} /></div>
                <div className="space-y-1"><Label>Time</Label><Input type="time" value={form.time} onChange={e => setForm(p => ({ ...p, time: e.target.value }))} /></div>
              </div>
              <Button onClick={handleSave}><Save className="mr-2 h-4 w-4" /> Schedule</Button>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader><CardTitle>Upcoming Surgeries</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockSchedule.map(s => (
                <div key={s.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{s.patient}</p>
                    <p className="text-sm text-muted-foreground">{s.procedure} • {s.theater} • {s.date} at {s.time}</p>
                  </div>
                  <Badge variant={s.status === "Completed" ? "default" : "secondary"}>{s.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
