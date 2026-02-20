import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BedDouble, User, Activity } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function NurseStationPage() {
  const { toast } = useToast();
  const [beds, setBeds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBeds = async () => {
      const { data, error } = await supabase
        .from("ward_beds")
        .select("*, patients(first_name, last_name, blood_type)")
        .order("ward_name").order("bed_number");
      if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
      setBeds(data || []);
      setLoading(false);
    };
    fetchBeds();
  }, []);

  const wards = [...new Set(beds.map(b => b.ward_name))];
  const statusColor = { available: "bg-green-100 border-green-300", occupied: "bg-red-100 border-red-300", maintenance: "bg-yellow-100 border-yellow-300" };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2"><BedDouble className="h-6 w-6 text-primary" /> Nurse Station Overview</h1>
          <p className="text-muted-foreground">Bird's eye view of all ward beds</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            { label: "Total Beds", value: beds.length, color: "text-primary" },
            { label: "Occupied", value: beds.filter(b => b.status === "occupied").length, color: "text-destructive" },
            { label: "Available", value: beds.filter(b => b.status === "available").length, color: "text-green-600" },
          ].map(s => (
            <Card key={s.label}>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">{s.label}</CardTitle></CardHeader>
              <CardContent><div className={`text-3xl font-bold ${s.color}`}>{s.value}</div></CardContent>
            </Card>
          ))}
        </div>

        {loading ? (
          <p className="text-center text-muted-foreground">Loading ward data...</p>
        ) : wards.length === 0 ? (
          <Card><CardContent className="py-12 text-center text-muted-foreground">
            No ward beds configured. Add beds via the Admissions module.
          </CardContent></Card>
        ) : wards.map(ward => (
          <Card key={ward}>
            <CardHeader><CardTitle>{ward}</CardTitle></CardHeader>
            <CardContent>
              <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {beds.filter(b => b.ward_name === ward).map(bed => (
                  <div key={bed.id} className={`p-3 rounded-lg border-2 text-center text-sm ${(statusColor as any)[bed.status] || "bg-muted"}`}>
                    <BedDouble className="h-6 w-6 mx-auto mb-1 opacity-70" />
                    <p className="font-bold">Bed {bed.bed_number}</p>
                    {bed.patients ? (
                      <p className="text-xs truncate">{bed.patients.first_name} {bed.patients.last_name}</p>
                    ) : (
                      <Badge variant="outline" className="text-xs mt-1">Available</Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
