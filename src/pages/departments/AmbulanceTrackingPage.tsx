import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Navigation, Plus, Save, MapPin, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type AmbulanceStatus = "available" | "on-mission" | "maintenance";

type Ambulance = {
  id: string;
  driver: string;
  phone: string;
  status: AmbulanceStatus;
  location: string;
  mission: string | null;
};

const mockAmbulances: Ambulance[] = [
  { id: "AMB-01", driver: "Yusuf Musa", phone: "+234 701 111 2222", status: "available", location: "Hospital Base", mission: null },
  { id: "AMB-02", driver: "Chibundo Eze", phone: "+234 702 333 4444", status: "on-mission", location: "Oshodi Express", mission: "Pickup: RTA victim" },
  { id: "AMB-03", driver: "Abdul Hassan", phone: "+234 703 555 6666", status: "available", location: "Hospital Base", mission: null },
  { id: "AMB-04", driver: "Nkechi Obi", phone: "+234 704 777 8888", status: "maintenance", location: "Workshop", mission: null },
];

export default function AmbulanceTrackingPage() {
  const { toast } = useToast();
  const [ambulances, setAmbulances] = useState<Ambulance[]>(mockAmbulances);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ id: "", driver: "", phone: "", mission: "" });

  const dispatch = (ambId: string) => {
    if (!form.mission) return toast({ title: "Enter mission details", variant: "destructive" });
    setAmbulances(prev => prev.map(a => a.id === ambId ? { ...a, status: "on-mission", mission: form.mission } : a));
    toast({ title: `${ambId} dispatched!` });
    setForm(p => ({ ...p, mission: "" }));
  };

  const recall = (ambId: string) => {
    setAmbulances(prev => prev.map(a => a.id === ambId ? { ...a, status: "available", location: "Hospital Base", mission: null } : a));
    toast({ title: `${ambId} returned to base` });
  };

  const statusColor: Record<AmbulanceStatus, BadgeProps["variant"]> = {
    available: "default",
    "on-mission": "destructive",
    maintenance: "secondary",
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2"><Navigation className="h-6 w-6 text-primary" /> Ambulance Tracking</h1>
          <p className="text-muted-foreground">GPS status and dispatch management for the fleet</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            { label: "Available", value: ambulances.filter(a => a.status === "available").length },
            { label: "On Mission", value: ambulances.filter(a => a.status === "on-mission").length },
            { label: "Maintenance", value: ambulances.filter(a => a.status === "maintenance").length },
          ].map(s => (
            <Card key={s.label}>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">{s.label}</CardTitle></CardHeader>
              <CardContent><div className="text-3xl font-bold">{s.value}</div></CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {ambulances.map(amb => (
            <Card key={amb.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{amb.id}</CardTitle>
                  <Badge variant={statusColor[amb.status]}>{amb.status.replace("-", " ").toUpperCase()}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm space-y-1">
                  <p className="flex items-center gap-2"><span className="font-medium">Driver:</span> {amb.driver}</p>
                  <p className="flex items-center gap-2"><Phone className="h-3 w-3" /> {amb.phone}</p>
                  <p className="flex items-center gap-2"><MapPin className="h-3 w-3" /> {amb.location}</p>
                  {amb.mission && <p className="flex items-center gap-2 text-destructive font-medium">Mission: {amb.mission}</p>}
                </div>
                {amb.status === "available" && (
                  <div className="flex gap-2">
                    <Input placeholder="Mission details..." value={form.mission} onChange={e => setForm(p => ({ ...p, mission: e.target.value }))} className="flex-1 text-sm" />
                    <Button size="sm" onClick={() => dispatch(amb.id)}>Dispatch</Button>
                  </div>
                )}
                {amb.status === "on-mission" && (
                  <Button size="sm" variant="outline" className="w-full" onClick={() => recall(amb.id)}>Recall to Base</Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
