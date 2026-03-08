import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BookOpen, Plus, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockRecords = [
  { id: "MOR001", name: "John Adeyemi", age: 67, dod: "2024-02-10", cause: "Cardiac Arrest", certifiedBy: "Dr. Emeka Obi", status: "Certificate Issued" },
  { id: "MOR002", name: "Fatima Bello", age: 45, dod: "2024-02-12", cause: "Septicemia", certifiedBy: "Dr. Chioma Eze", status: "Awaiting Family" },
  { id: "MOR003", name: "Unknown Male", age: null, dod: "2024-02-14", cause: "RTA Injuries", certifiedBy: "Dr. Emeka Obi", status: "Police Case" },
];

export default function MortuaryManagementPage() {
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", age: "", dod: "", cause: "", certifiedBy: "", notes: "" });

  const handleSubmit = () => {
    if (!form.name || !form.cause) return toast({ title: "Please fill required fields", variant: "destructive" });
    toast({ title: "Mortuary record created successfully!" });
    setShowForm(false);
    setForm({ name: "", age: "", dod: "", cause: "", certifiedBy: "", notes: "" });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2"><BookOpen className="h-6 w-6 text-primary" /> Mortuary Management</h1>
            <p className="text-muted-foreground">Record keeping for deceased patients</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}><Plus className="mr-2 h-4 w-4" /> New Record</Button>
        </div>

        {showForm && (
          <Card>
            <CardHeader><CardTitle>New Mortuary Record</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-1"><Label>Name *</Label><Input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Full name or 'Unknown'" /></div>
                <div className="space-y-1"><Label>Age</Label><Input type="number" value={form.age} onChange={e => setForm(p => ({ ...p, age: e.target.value }))} /></div>
                <div className="space-y-1"><Label>Date of Death</Label><Input type="date" value={form.dod} onChange={e => setForm(p => ({ ...p, dod: e.target.value }))} /></div>
                <div className="space-y-1"><Label>Cause of Death *</Label><Input value={form.cause} onChange={e => setForm(p => ({ ...p, cause: e.target.value }))} /></div>
                <div className="space-y-1"><Label>Certified By</Label><Input value={form.certifiedBy} onChange={e => setForm(p => ({ ...p, certifiedBy: e.target.value }))} /></div>
              </div>
              <div className="space-y-1"><Label>Notes</Label><Textarea value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} placeholder="Additional information..." /></div>
              <Button onClick={handleSubmit}><Save className="mr-2 h-4 w-4" /> Create Record</Button>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardContent className="pt-4">
            <div className="overflow-x-auto -mx-6 px-6"><Table>
              <TableHeader>
                <TableRow><TableHead>Case ID</TableHead><TableHead>Name</TableHead><TableHead>Age</TableHead><TableHead>Date of Death</TableHead><TableHead>Cause</TableHead><TableHead>Certified By</TableHead><TableHead>Status</TableHead></TableRow>
              </TableHeader>
              <TableBody>
                {mockRecords.map(r => (
                  <TableRow key={r.id}>
                    <TableCell className="font-mono text-sm">{r.id}</TableCell>
                    <TableCell className="font-medium">{r.name}</TableCell>
                    <TableCell>{r.age || "Unknown"}</TableCell>
                    <TableCell>{r.dod}</TableCell>
                    <TableCell>{r.cause}</TableCell>
                    <TableCell>{r.certifiedBy}</TableCell>
                    <TableCell><Badge variant={r.status === "Certificate Issued" ? "default" : "secondary"}>{r.status}</Badge></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table></div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
