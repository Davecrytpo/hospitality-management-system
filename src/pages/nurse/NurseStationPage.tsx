import { useCallback, useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BedDouble, RotateCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { DataStatePanel } from "@/components/ui/data-state-panel";
import { getErrorMessage, runActionWithFeedback } from "@/lib/action-feedback";

type BedStatus = "available" | "occupied" | "maintenance";

type BedRow = {
  id: string;
  ward_name: string;
  bed_number: string | number;
  status: BedStatus;
  patients?: {
    first_name?: string | null;
    last_name?: string | null;
    blood_type?: string | null;
  } | null;
};

export default function NurseStationPage() {
  const [beds, setBeds] = useState<BedRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchBeds = useCallback(async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const { data, error } = await supabase
        .from("ward_beds")
        .select("*, patients(first_name, last_name, blood_type)")
        .order("ward_name")
        .order("bed_number");
      if (error) {
        throw error;
      }
      setBeds((data as BedRow[]) || []);
    } catch (error: unknown) {
      console.error(error);
      setErrorMessage(getErrorMessage(error, "Failed to load ward bed status"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBeds();
  }, [fetchBeds]);

  const wards = [...new Set(beds.map(b => b.ward_name))];
  const statusColor: Record<BedStatus, string> = {
    available: "bg-green-100 border-green-300",
    occupied: "bg-red-100 border-red-300",
    maintenance: "bg-yellow-100 border-yellow-300",
  };

  const handleRefresh = async () => {
    try {
      await runActionWithFeedback({
        actionLabel: "Refreshing ward beds...",
        run: fetchBeds,
        successMessage: "Ward status refreshed",
        errorMessage: "Failed to refresh ward status",
      });
    } catch {
      // feedback already handled by helper
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-2">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2"><BedDouble className="h-6 w-6 text-primary" /> Nurse Station Overview</h1>
            <p className="text-muted-foreground">Bird's eye view of all ward beds</p>
          </div>
          <Button variant="outline" size="icon" onClick={handleRefresh} aria-label="Refresh ward beds">
            <RotateCw className="h-4 w-4" />
          </Button>
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
          <DataStatePanel
            state="loading"
            title="Loading ward status"
            description="Please wait while bed occupancy data is fetched."
          />
        ) : errorMessage ? (
          <DataStatePanel
            state="error"
            title="Could not load ward status"
            description={errorMessage}
            actionLabel="Try again"
            onAction={handleRefresh}
          />
        ) : wards.length === 0 ? (
          <DataStatePanel
            state="empty"
            title="No ward beds configured"
            description="Add beds from the Admissions module to start monitoring occupancy."
          />
        ) : wards.map(ward => (
          <Card key={ward}>
            <CardHeader><CardTitle>{ward}</CardTitle></CardHeader>
            <CardContent>
              <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {beds.filter(b => b.ward_name === ward).map(bed => (
                  <div key={bed.id} className={`p-3 rounded-lg border-2 text-center text-sm ${statusColor[bed.status] || "bg-muted"}`}>
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
