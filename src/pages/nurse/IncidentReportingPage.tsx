import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Plus, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function IncidentReportingPage() {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ incident_type: "", severity: "low", description: "", location: "", action_taken: "" });
  const [reports, setReports] = useState<any[]>([]);

  const handleSubmit = async () => {
    if (!form.incident_type || !form.description) return toast({ title: "Please fill required fields", variant: "destructive" });
    setSaving(true);
    try {
      const { error } = await supabase.from("incident_reports").insert({ ...form });
      if (error) throw error;
      toast({ title: "Incident report submitted!" });
      setForm({ incident_type: "", severity: "low", description: "", location: "", action_taken: "" });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2"><AlertTriangle className="h-6 w-6 text-primary" /> Incident Reporting</h1>
          <p className="text-muted-foreground">Log falls, medication errors, reactions, or emergencies</p>
        </div>

        <Card>
          <CardHeader><CardTitle>Report New Incident</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label>Incident Type *</Label>
                <Select value={form.incident_type} onValueChange={v => setForm(p => ({ ...p, incident_type: v }))}>
                  <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                  <SelectContent>
                    {["Patient Fall", "Medication Error", "Allergic Reaction", "Equipment Failure", "Violence/Aggression", "Near Miss", "Other"].map(t => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label>Severity</Label>
                <Select value={form.severity} onValueChange={v => setForm(p => ({ ...p, severity: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["low", "medium", "high", "critical"].map(s => <SelectItem key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1"><Label>Location</Label><Input value={form.location} onChange={e => setForm(p => ({ ...p, location: e.target.value }))} placeholder="Ward A, OT-2, Reception..." /></div>
            </div>
            <div className="space-y-1"><Label>Description *</Label><Textarea rows={4} value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} placeholder="Describe the incident in detail..." /></div>
            <div className="space-y-1"><Label>Action Taken</Label><Textarea rows={3} value={form.action_taken} onChange={e => setForm(p => ({ ...p, action_taken: e.target.value }))} placeholder="What immediate action was taken..." /></div>
            <Button onClick={handleSubmit} disabled={saving} className="w-full">
              <Save className="mr-2 h-4 w-4" />{saving ? "Submitting..." : "Submit Incident Report"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
