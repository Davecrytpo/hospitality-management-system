import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Brush, Plus, Save, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type TaskStatus = "completed" | "in-progress" | "pending";

type Task = {
  id: number;
  room: string;
  task: string;
  assignee: string;
  scheduled: string;
  status: TaskStatus;
};

const mockTasks: Task[] = [
  { id: 1, room: "Ward A - Room 101", task: "Full Room Sanitization", assignee: "Cleaner Bola", scheduled: "08:00 AM", status: "completed" },
  { id: 2, room: "OPD Waiting Area", task: "Floor Mopping & Disinfection", assignee: "Cleaner Kunle", scheduled: "09:00 AM", status: "in-progress" },
  { id: 3, room: "OT-1 (Operating Theatre)", task: "Post-Op Deep Clean", assignee: "Specialist Team", scheduled: "11:00 AM", status: "pending" },
  { id: 4, room: "Lab Reception", task: "Daily Surface Wipe", assignee: "Cleaner Amaka", scheduled: "10:00 AM", status: "pending" },
  { id: 5, room: "ICU", task: "Biohazard Waste Disposal", assignee: "Specialist Team", scheduled: "07:00 AM", status: "completed" },
];

export default function MaintenanceHousekeepingPage() {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ room: "", task: "", assignee: "", scheduled: "" });

  const handleAdd = () => {
    if (!form.room || !form.task) return toast({ title: "Please fill required fields", variant: "destructive" });
    setTasks(prev => [...prev, { id: Date.now(), ...form, status: "pending" }]);
    toast({ title: "Task scheduled successfully!" });
    setShowForm(false);
    setForm({ room: "", task: "", assignee: "", scheduled: "" });
  };

  const markDone = (id: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: "completed" } : t));
    toast({ title: "Task marked as completed!" });
  };

  const statusColor: Record<TaskStatus, BadgeProps["variant"]> = {
    completed: "default",
    "in-progress": "secondary",
    pending: "outline",
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2"><Brush className="h-6 w-6 text-primary" /> Maintenance & Housekeeping</h1>
            <p className="text-muted-foreground">Track cleaning schedules and maintenance tasks</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}><Plus className="mr-2 h-4 w-4" /> Add Task</Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            { label: "Completed", value: tasks.filter(t => t.status === "completed").length },
            { label: "In Progress", value: tasks.filter(t => t.status === "in-progress").length },
            { label: "Pending", value: tasks.filter(t => t.status === "pending").length },
          ].map(s => (
            <Card key={s.label}>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">{s.label}</CardTitle></CardHeader>
              <CardContent><div className="text-3xl font-bold">{s.value}</div></CardContent>
            </Card>
          ))}
        </div>

        {showForm && (
          <Card>
            <CardHeader><CardTitle>Schedule Task</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1"><Label>Room/Area *</Label><Input value={form.room} onChange={e => setForm(p => ({ ...p, room: e.target.value }))} /></div>
                <div className="space-y-1"><Label>Task *</Label><Input value={form.task} onChange={e => setForm(p => ({ ...p, task: e.target.value }))} /></div>
                <div className="space-y-1"><Label>Assignee</Label><Input value={form.assignee} onChange={e => setForm(p => ({ ...p, assignee: e.target.value }))} /></div>
                <div className="space-y-1"><Label>Scheduled Time</Label><Input type="time" value={form.scheduled} onChange={e => setForm(p => ({ ...p, scheduled: e.target.value }))} /></div>
              </div>
              <Button onClick={handleAdd}><Save className="mr-2 h-4 w-4" /> Schedule</Button>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardContent className="pt-4">
            <div className="overflow-x-auto -mx-6 px-6"><Table>
              <TableHeader><TableRow><TableHead>Room/Area</TableHead><TableHead>Task</TableHead><TableHead>Assignee</TableHead><TableHead>Scheduled</TableHead><TableHead>Status</TableHead><TableHead>Action</TableHead></TableRow></TableHeader>
              <TableBody>
                {tasks.map(t => (
                  <TableRow key={t.id}>
                    <TableCell className="font-medium">{t.room}</TableCell>
                    <TableCell>{t.task}</TableCell>
                    <TableCell>{t.assignee}</TableCell>
                    <TableCell>{t.scheduled}</TableCell>
                    <TableCell><Badge variant={statusColor[t.status]}>{t.status}</Badge></TableCell>
                    <TableCell>
                      {t.status !== "completed" && (
                        <Button size="sm" variant="outline" onClick={() => markDone(t.id)}><CheckCircle className="mr-1 h-3 w-3" /> Done</Button>
                      )}
                    </TableCell>
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
