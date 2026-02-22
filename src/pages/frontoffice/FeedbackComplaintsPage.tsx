import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { MessageSquare, Plus, Save, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type FeedbackStatus = "open" | "resolved" | "under review";

type FeedbackItem = {
  id: number;
  name: string;
  type: "complaint" | "compliment" | "suggestion" | "general";
  subject: string;
  rating: number;
  status: FeedbackStatus;
  date: string;
};

const mockFeedback: FeedbackItem[] = [
  { id: 1, name: "Adaeze O.", type: "complaint", subject: "Long wait time at OPD", rating: 2, status: "open", date: "2024-02-15" },
  { id: 2, name: "Emeka J.", type: "compliment", subject: "Excellent care from Dr. Chidi", rating: 5, status: "resolved", date: "2024-02-14" },
  { id: 3, name: "Fatima H.", type: "suggestion", subject: "Add online appointment booking", rating: 4, status: "under review", date: "2024-02-13" },
];

export default function FeedbackComplaintsPage() {
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ patient_name: "", feedback_type: "general", subject: "", message: "", rating: "5" });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async () => {
    if (!form.subject || !form.message) return toast({ title: "Please fill all required fields", variant: "destructive" });
    setSaving(true);
    try {
      const { error } = await supabase.from("feedback").insert({
        patient_name: form.patient_name,
        feedback_type: form.feedback_type,
        subject: form.subject,
        message: form.message,
        rating: parseInt(form.rating),
      });
      if (error) throw error;
      toast({ title: "Feedback submitted successfully!" });
      setShowForm(false);
      setForm({ patient_name: "", feedback_type: "general", subject: "", message: "", rating: "5" });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      toast({ title: "Error", description: message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const statusVariant = (s: FeedbackStatus): BadgeProps["variant"] =>
    s === "resolved" ? "default" : s === "under review" ? "secondary" : "outline";

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2"><MessageSquare className="h-6 w-6 text-primary" /> Feedback & Complaints</h1>
            <p className="text-muted-foreground">Track patient satisfaction and resolve complaints</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}><Plus className="mr-2 h-4 w-4" /> Add Entry</Button>
        </div>

        {showForm && (
          <Card>
            <CardHeader><CardTitle>New Feedback Entry</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1"><Label>Patient Name</Label><Input value={form.patient_name} onChange={e => setForm(p => ({ ...p, patient_name: e.target.value }))} /></div>
                <div className="space-y-1">
                  <Label>Type</Label>
                  <Select value={form.feedback_type} onValueChange={v => setForm(p => ({ ...p, feedback_type: v }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {["complaint", "compliment", "suggestion", "general"].map(t => <SelectItem key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1 md:col-span-2"><Label>Subject *</Label><Input value={form.subject} onChange={e => setForm(p => ({ ...p, subject: e.target.value }))} /></div>
              </div>
              <div className="space-y-1"><Label>Message *</Label><Textarea rows={4} value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} /></div>
              <div className="space-y-1">
                <Label>Rating</Label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(r => (
                    <Button key={r} size="sm" variant={form.rating === String(r) ? "default" : "outline"} onClick={() => setForm(p => ({ ...p, rating: String(r) }))}>
                      <Star className="h-3 w-3 mr-1" />{r}
                    </Button>
                  ))}
                </div>
              </div>
              <Button onClick={handleSubmit} disabled={saving}><Save className="mr-2 h-4 w-4" />{saving ? "Saving..." : "Submit Feedback"}</Button>
            </CardContent>
          </Card>
        )}

        <div className="space-y-3">
          {mockFeedback.map(f => (
            <Card key={f.id}>
              <CardContent className="pt-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={f.type === "complaint" ? "destructive" : f.type === "compliment" ? "default" : "outline"}>{f.type}</Badge>
                      <span className="font-medium">{f.subject}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{f.name} - {f.date}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {Array.from({ length: f.rating }).map((_, i) => <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />)}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={statusVariant(f.status)}>{f.status}</Badge>
                    <Button size="sm" variant="outline" onClick={() => toast({ title: "Response sent!" })}>Respond</Button>
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
