import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Calendar, Clock3, Loader2, Stethoscope } from "lucide-react";
import { toast } from "sonner";

import { PatientPortalShell } from "@/components/patient-portal/PatientPortalShell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { getPatientPortalContext, type PatientPortalContext } from "@/lib/patient-portal";

interface Appointment {
  id: string;
  appointment_date: string;
  appointment_time: string;
  status?: string | null;
  reason?: string | null;
  notes?: string | null;
  doctor?: {
    first_name?: string | null;
    last_name?: string | null;
    specialization?: string | null;
  } | null;
}

export default function PatientAppointmentsPage() {
  const navigate = useNavigate();
  const [portalContext, setPortalContext] = useState<PatientPortalContext | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadAppointments = useCallback(async () => {
    try {
      const context = await getPatientPortalContext();
      setPortalContext(context);

      const { data, error } = await supabase
        .from("appointments")
        .select(`
          id,
          appointment_date,
          appointment_time,
          status,
          reason,
          notes,
          doctor:doctors(first_name, last_name, specialization)
        `)
        .eq("patient_id", context.patient.id)
        .order("appointment_date", { ascending: false });

      if (error) throw error;
      if (data) setAppointments(data as Appointment[]);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to load appointments.";

      if (message === "AUTH_REQUIRED" || message === "PATIENT_ACCESS_ONLY") {
        navigate("/patient-portal/login");
        return;
      }

      toast.error("Failed to load appointments.");
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    loadAppointments();
  }, [loadAppointments]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/patient-portal/login");
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f4f8ff]">
        <div className="flex items-center gap-3 rounded-2xl border border-[#dbe4f4] bg-white px-5 py-4 text-sm font-semibold text-[#13306b] shadow-[0_18px_40px_-24px_rgba(19,48,107,0.35)]">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading appointments
        </div>
      </div>
    );
  }

  if (!portalContext) {
    return null;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingAppointments = appointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.appointment_date);
    appointmentDate.setHours(0, 0, 0, 0);
    return appointmentDate >= today && appointment.status !== "cancelled";
  });

  const pastAppointments = appointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.appointment_date);
    appointmentDate.setHours(0, 0, 0, 0);
    return appointmentDate < today || appointment.status === "completed" || appointment.status === "cancelled";
  });

  const patientName = `${portalContext.patient.first_name} ${portalContext.patient.last_name}`;
  const patientMeta = portalContext.patient.email || portalContext.profile.email || "Secure patient access";

  return (
    <PatientPortalShell
      title="My Appointments"
      description="Review upcoming visits, past encounters, and the reasons recorded for each appointment."
      patientName={patientName}
      patientMeta={patientMeta}
      onLogout={handleLogout}
    >
      <Tabs defaultValue="upcoming" className="space-y-6">
        <TabsList className="grid h-auto w-full gap-2 rounded-2xl bg-transparent p-0 sm:w-auto sm:grid-cols-2">
          <TabsTrigger value="upcoming" className="rounded-xl border border-[#d6e0f3] bg-white px-4 py-3 data-[state=active]:bg-[#13306b] data-[state=active]:text-white">
            Upcoming ({upcomingAppointments.length})
          </TabsTrigger>
          <TabsTrigger value="past" className="rounded-xl border border-[#d6e0f3] bg-white px-4 py-3 data-[state=active]:bg-[#13306b] data-[state=active]:text-white">
            History ({pastAppointments.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-0">
          <AppointmentSection appointments={upcomingAppointments} emptyTitle="No upcoming appointments" emptyDescription="Scheduled visits will appear here once they are booked." />
        </TabsContent>

        <TabsContent value="past" className="mt-0">
          <AppointmentSection appointments={pastAppointments} emptyTitle="No appointment history" emptyDescription="Completed and previous visits will appear here." dimmed />
        </TabsContent>
      </Tabs>
    </PatientPortalShell>
  );
}

function AppointmentSection({
  appointments,
  emptyTitle,
  emptyDescription,
  dimmed = false,
}: {
  appointments: Appointment[];
  emptyTitle: string;
  emptyDescription: string;
  dimmed?: boolean;
}) {
  if (appointments.length === 0) {
    return (
      <Card className="rounded-[24px] border border-[#dbe4f4] bg-white shadow-[0_18px_40px_-28px_rgba(19,48,107,0.28)]">
        <CardContent className="px-6 py-14 text-center">
          <Calendar className="mx-auto h-12 w-12 text-[#97a9cb]" />
          <p className="mt-4 text-lg font-bold text-[#13306b]">{emptyTitle}</p>
          <p className="mt-2 text-sm text-[#5f76a3]">{emptyDescription}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <Card
          key={appointment.id}
          className={`rounded-[24px] border border-[#dbe4f4] bg-white shadow-[0_18px_40px_-28px_rgba(19,48,107,0.28)] ${dimmed ? "opacity-90" : ""}`}
        >
          <CardHeader className="pb-3">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#eef4ff] text-[#13306b]">
                  <Stethoscope className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-lg font-extrabold text-[#13306b]">
                    Dr. {appointment.doctor?.first_name} {appointment.doctor?.last_name}
                  </CardTitle>
                  <p className="mt-1 text-sm text-[#5f76a3]">{appointment.doctor?.specialization || "Clinical consultation"}</p>
                </div>
              </div>

              <Badge className="w-fit rounded-full bg-[#13306b] px-3 py-1 text-white hover:bg-[#13306b]">
                {appointment.status || "scheduled"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 text-sm text-[#415b8f] sm:grid-cols-2">
              <div className="flex items-center gap-2 rounded-2xl bg-[#f8fbff] px-4 py-3">
                <Calendar className="h-4 w-4 text-[#13306b]" />
                <span>{format(new Date(appointment.appointment_date), "MMMM d, yyyy")}</span>
              </div>
              <div className="flex items-center gap-2 rounded-2xl bg-[#f8fbff] px-4 py-3">
                <Clock3 className="h-4 w-4 text-[#13306b]" />
                <span>{appointment.appointment_time}</span>
              </div>
            </div>

            {appointment.reason && (
              <div className="rounded-2xl border border-[#e0e8f7] bg-[#fbfcff] px-4 py-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7e91b8]">Reason for Visit</p>
                <p className="mt-2 text-sm leading-7 text-[#13306b]">{appointment.reason}</p>
              </div>
            )}

            {appointment.notes && (
              <div className="rounded-2xl border border-[#e0e8f7] bg-[#fbfcff] px-4 py-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7e91b8]">Notes</p>
                <p className="mt-2 text-sm leading-7 text-[#13306b]">{appointment.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
