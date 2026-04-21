import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, ClipboardList, Clock, Activity, ChevronRight, Stethoscope, RotateCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { DataStatePanel } from "@/components/ui/data-state-panel";
import { getErrorMessage, runActionWithFeedback } from "@/lib/action-feedback";

type AppointmentRow = {
  id: string;
  patient_id: string;
  appointment_time?: string | null;
  status?: string | null;
  reason?: string | null;
  patients?: {
    first_name?: string | null;
    last_name?: string | null;
  } | null;
};

export default function DoctorDashboardPage() {
  const [appointments, setAppointments] = useState<AppointmentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const { data, error } = await supabase
        .from("appointments")
        .select("*, patients(first_name, last_name)")
        .eq("appointment_date", new Date().toISOString().split("T")[0])
        .order("appointment_time");
      if (error) {
        throw error;
      }
      setAppointments(data || []);
    } catch (err: unknown) {
      console.error(err);
      setErrorMessage(getErrorMessage(err, "Failed to load appointments"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const stats = [
    { label: "Today's Appointments", value: appointments.length, icon: Calendar, color: "text-blue-600" },
    { label: "Pending Consultations", value: appointments.filter(a => a.status === "scheduled").length, icon: ClipboardList, color: "text-orange-600" },
    { label: "Completed Today", value: appointments.filter(a => a.status === "completed").length, icon: Activity, color: "text-green-600" },
    { label: "Avg. Wait Time", value: "12 min", icon: Clock, color: "text-purple-600" },
  ];

  const nextPatientId = appointments.find((appointment) => appointment.patient_id)?.patient_id;

  const handleRefresh = async () => {
    try {
      await runActionWithFeedback({
        actionLabel: "Refreshing appointments...",
        run: fetchData,
        successMessage: "Appointments refreshed",
        errorMessage: "Failed to refresh appointments",
      });
    } catch {
      // feedback already handled by helper
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2"><Stethoscope className="h-6 w-6 text-primary" /> Doctor Dashboard</h1>
            <p className="text-muted-foreground">Your clinical workspace for today</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={handleRefresh} aria-label="Refresh appointments">
              <RotateCw className="h-4 w-4" />
            </Button>
            <Button asChild>
              <Link to={nextPatientId ? `/doctor/consultation/${nextPatientId}` : "/doctor/patients"}>Start Consultation</Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent><div className="text-3xl font-bold">{stat.value}</div></CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Calendar className="h-5 w-5" /> Today's Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <DataStatePanel
                state="loading"
                title="Loading today's appointments"
                description="Please wait while your schedule is fetched."
              />
            ) : errorMessage ? (
              <DataStatePanel
                state="error"
                title="Could not load appointments"
                description={errorMessage}
                actionLabel="Try again"
                onAction={handleRefresh}
              />
            ) : appointments.length === 0 ? (
              <DataStatePanel
                state="empty"
                title="No appointments scheduled"
                description="You are clear for now. New appointments for today will appear here."
              />
            ) : (
              <div className="space-y-3">
                {appointments.map((apt) => (
                  <div key={apt.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{apt.patients?.first_name} {apt.patients?.last_name}</p>
                        <p className="text-sm text-muted-foreground">{apt.appointment_time} - {apt.reason || "General Consultation"}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={apt.status === "completed" ? "default" : "secondary"}>{apt.status}</Badge>
                      <Button size="sm" variant="ghost" asChild>
                        <Link to={`/doctor/consultation/${apt.patient_id}`}><ChevronRight className="h-4 w-4" /></Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
