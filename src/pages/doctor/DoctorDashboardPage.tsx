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
    { label: "Today's Load", value: appointments.length, icon: Calendar, color: "text-primary" },
    { label: "In Waiting", value: appointments.filter(a => a.status === "scheduled").length, icon: ClipboardList, color: "text-medical-warning" },
    { label: "Completed", value: appointments.filter(a => a.status === "completed").length, icon: Activity, color: "text-medical-success" },
    { label: "Avg Wait", value: "12m", icon: Clock, color: "text-medical-info" },
  ];

  const nextPatientId = appointments.find((appointment) => appointment.patient_id)?.patient_id;

  const handleRefresh = async () => {
    try {
      await runActionWithFeedback({
        actionLabel: "Refreshing schedule...",
        run: fetchData,
        successMessage: "Schedule updated",
        errorMessage: "Failed to refresh",
      });
    } catch {
      // feedback already handled by helper
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 bg-white/40 p-5 sm:p-6 rounded-[24px] border border-border/40 backdrop-blur-sm shadow-sm">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/10 mb-3">
              <Stethoscope className="h-3 w-3" />
              Clinical Practitioner Portal
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-foreground tracking-tight uppercase leading-tight">Doctor&apos;s <span className="text-primary/40">Workspace</span></h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 font-medium">Real-time clinical queue and patient coordination</p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button variant="outline" size="icon" className="h-11 w-11 shrink-0 rounded-xl border-border/60 hover:bg-white" onClick={handleRefresh}>
              <RotateCw className={cn("h-4 w-4 text-muted-foreground", loading && "animate-spin")} />
            </Button>
            <Button className="h-11 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-primary/20 flex-1 sm:flex-initial" asChild>
              <Link to={nextPatientId ? `/doctor/consultation/${nextPatientId}` : "/doctor/patients"}>
                Begin Next Consultation
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="rounded-2xl border-border/50 shadow-sm">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground truncate">{stat.label}</p>
                    <p className={cn("mt-1.5 text-xl sm:text-2xl font-extrabold leading-none", stat.color)}>{stat.value}</p>
                  </div>
                  <div className="h-10 w-10 sm:h-12 sm:w-12 shrink-0 flex items-center justify-center rounded-xl bg-muted/30">
                    <stat.icon className={cn("h-5 w-5 sm:h-6 sm:w-6", stat.color)} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="rounded-[24px] border-border/50 shadow-sm overflow-hidden">
          <CardHeader className="p-4 sm:p-6 border-b border-border/40 bg-muted/10">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold text-foreground uppercase tracking-tight flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" /> Today&apos;s Queue
              </CardTitle>
              <Badge className="bg-primary/5 text-primary border-primary/10 font-bold px-3">Live Feed</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="py-20">
                <DataStatePanel
                  state="loading"
                  title="Retrieving Queue"
                  description="Synchronizing with hospital scheduling system..."
                />
              </div>
            ) : errorMessage ? (
              <div className="py-20 px-6">
                <DataStatePanel
                  state="error"
                  title="Queue Synchronization Failed"
                  description={errorMessage}
                  actionLabel="Re-connect"
                  onAction={handleRefresh}
                />
              </div>
            ) : appointments.length === 0 ? (
              <div className="py-20 px-6">
                <DataStatePanel
                  state="empty"
                  title="Clinical Queue Clear"
                  description="No appointments currently scheduled for today."
                  actionLabel="Browse History"
                  onAction={() => navigate("/doctor/patients")}
                />
              </div>
            ) : (
              <div className="divide-y">
                {appointments.map((apt) => (
                  <div key={apt.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 hover:bg-muted/30 transition-all group">
                    <div className="flex items-center gap-4 mb-4 sm:mb-0">
                      <div className="h-12 w-12 flex flex-col items-center justify-center rounded-xl bg-primary/5 text-primary ring-1 ring-primary/10 shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
                        <Clock className="h-3.5 w-3.5 mb-1" />
                        <span className="text-[10px] font-bold uppercase tracking-tighter">{apt.appointment_time?.split(':')[0]}:{apt.appointment_time?.split(':')[1]}</span>
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-card-foreground text-base leading-tight group-hover:text-primary transition-colors truncate">
                          {apt.patients?.first_name} {apt.patients?.last_name}
                        </p>
                        <p className="text-xs sm:text-sm text-muted-foreground font-medium mt-1 uppercase tracking-tight">
                          {apt.reason || "Clinical Assessment"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-3 pt-4 sm:pt-0 border-t sm:border-t-0 border-border/40">
                      <Badge variant="outline" className={cn("rounded-full font-bold text-[9px] uppercase tracking-widest px-3 py-1", apt.status === "completed" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-blue-50 text-blue-700 border-blue-200")}>
                        {apt.status}
                      </Badge>
                      <Button size="sm" variant="ghost" className="h-9 w-9 rounded-xl hover:bg-primary hover:text-white transition-all" asChild>
                        <Link to={`/doctor/consultation/${apt.patient_id}`}>
                          <ChevronRight className="h-5 w-5" />
                        </Link>
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
