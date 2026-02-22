import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Heart, Thermometer, Wind } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type VitalsRow = {
  id: string;
  recorded_at?: string | null;
  heart_rate?: number | null;
  blood_pressure_systolic?: number | null;
  blood_pressure_diastolic?: number | null;
  temperature?: number | null;
  oxygen_saturation?: number | null;
  patients?: {
    first_name?: string | null;
    last_name?: string | null;
  } | null;
};

export default function WardVitalsMonitorPage() {
  const { toast } = useToast();
  const [vitals, setVitals] = useState<VitalsRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVitals = async () => {
      const { data, error } = await supabase
        .from("vitals")
        .select("*, patients(first_name, last_name)")
        .order("recorded_at", { ascending: false })
        .limit(50);
      if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
      setVitals(data || []);
      setLoading(false);
    };
    fetchVitals();
    const interval = setInterval(fetchVitals, 30000);
    return () => clearInterval(interval);
  }, [toast]);

  const getStatus = (spo2: number | null) => {
    if (!spo2) return "unknown";
    if (spo2 >= 95) return "normal";
    if (spo2 >= 90) return "warning";
    return "critical";
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2"><Activity className="h-6 w-6 text-primary" /> Ward Vitals Monitor</h1>
          <p className="text-muted-foreground">Live vitals feed auto-refreshes every 30 seconds</p>
        </div>

        {loading ? (
          <p className="text-center text-muted-foreground">Loading vitals...</p>
        ) : vitals.length === 0 ? (
          <Card><CardContent className="py-12 text-center text-muted-foreground">No vitals recorded yet.</CardContent></Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {vitals.map(v => {
              const status = getStatus(v.oxygen_saturation);
              return (
                <Card key={v.id} className={status === "critical" ? "border-destructive" : status === "warning" ? "border-yellow-400" : ""}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{v.patients?.first_name} {v.patients?.last_name}</CardTitle>
                      <Badge variant={status === "critical" ? "destructive" : status === "warning" ? "secondary" : "default"}>
                        {status === "critical" ? "CRITICAL" : status === "warning" ? "WARNING" : "Normal"}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{new Date(v.recorded_at).toLocaleString()}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2"><Heart className="h-4 w-4 text-red-500" /><span>HR: {v.heart_rate || "N/A"} bpm</span></div>
                      <div className="flex items-center gap-2"><Activity className="h-4 w-4 text-blue-500" /><span>BP: {v.blood_pressure_systolic}/{v.blood_pressure_diastolic}</span></div>
                      <div className="flex items-center gap-2"><Thermometer className="h-4 w-4 text-orange-500" /><span>Temp: {v.temperature || "N/A"} C</span></div>
                      <div className="flex items-center gap-2"><Wind className="h-4 w-4 text-green-500" /><span>SpO2: {v.oxygen_saturation || "N/A"}%</span></div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
