import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Wrench, Plus, Save, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type CalibrationStatus = "Calibrated" | "Due Soon" | "Overdue";

type EquipmentItem = {
  id: number;
  name: string;
  lastCalibrated: string;
  nextDue: string;
  technician: string;
  status: CalibrationStatus;
};

const mockEquipment: EquipmentItem[] = [
  { id: 1, name: "Hematology Analyzer XT-4000", lastCalibrated: "2024-01-10", nextDue: "2024-04-10", technician: "Lab Tech John", status: "Calibrated" },
  { id: 2, name: "Centrifuge Model CR-5", lastCalibrated: "2024-01-05", nextDue: "2024-02-05", technician: "Lab Tech Amina", status: "Due Soon" },
  { id: 3, name: "Microscope BX-53", lastCalibrated: "2024-01-15", nextDue: "2024-07-15", technician: "Lab Tech John", status: "Calibrated" },
  { id: 4, name: "Blood Gas Analyzer ABL90", lastCalibrated: "2023-12-20", nextDue: "2024-01-20", technician: "External Team", status: "Overdue" },
];

export default function LabEquipmentCalibrationPage() {
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ equipment: "", technician: "", notes: "", nextDue: "" });

  const handleLog = () => {
    if (!form.equipment) return toast({ title: "Enter equipment name", variant: "destructive" });
    toast({ title: "Calibration logged successfully!" });
    setShowForm(false);
    setForm({ equipment: "", technician: "", notes: "", nextDue: "" });
  };

  const statusColors: Record<CalibrationStatus, BadgeProps["variant"]> = {
    Calibrated: "default",
    "Due Soon": "secondary",
    Overdue: "destructive",
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2"><Wrench className="h-6 w-6 text-primary" /> Equipment Calibration Log</h1>
            <p className="text-muted-foreground">Track maintenance and calibration of lab machinery</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}><Plus className="mr-2 h-4 w-4" /> Log Calibration</Button>
        </div>

        {showForm && (
          <Card>
            <CardHeader><CardTitle>New Calibration Entry</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1"><Label>Equipment Name *</Label><Input value={form.equipment} onChange={e => setForm(p => ({ ...p, equipment: e.target.value }))} /></div>
                <div className="space-y-1"><Label>Technician</Label><Input value={form.technician} onChange={e => setForm(p => ({ ...p, technician: e.target.value }))} /></div>
                <div className="space-y-1"><Label>Next Calibration Due</Label><Input type="date" value={form.nextDue} onChange={e => setForm(p => ({ ...p, nextDue: e.target.value }))} /></div>
              </div>
              <div className="space-y-1"><Label>Notes</Label><Textarea value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} placeholder="Calibration details..." /></div>
              <Button onClick={handleLog}><Save className="mr-2 h-4 w-4" /> Log Entry</Button>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardContent className="pt-4">
            <Table>
              <TableHeader>
                <TableRow><TableHead>Equipment</TableHead><TableHead>Last Calibrated</TableHead><TableHead>Next Due</TableHead><TableHead>Technician</TableHead><TableHead>Status</TableHead></TableRow>
              </TableHeader>
              <TableBody>
                {mockEquipment.map(e => (
                  <TableRow key={e.id}>
                    <TableCell className="font-medium">{e.name}</TableCell>
                    <TableCell>{e.lastCalibrated}</TableCell>
                    <TableCell>{e.nextDue}</TableCell>
                    <TableCell>{e.technician}</TableCell>
                    <TableCell><Badge variant={statusColors[e.status] || "secondary"}>{e.status}</Badge></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
