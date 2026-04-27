import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import {
  Activity,
  Calendar,
  ChevronRight,
  Clock3,
  FileText,
  HeartPulse,
  Loader2,
  LogOut,
  Pill,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { toast } from "sonner";

import { PatientPortalShell } from "@/components/patient-portal/PatientPortalShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { getPatientPortalContext, type PatientPortalContext } from "@/lib/patient-portal";

interface Appointment {
  id: string;
  appointment_date: string;
  appointment_time: string;
  status?: string | null;
  reason?: string | null;
  doctor?: {
    first_name?: string | null;
    last_name?: string | null;
    specialization?: string | null;
  } | null;
}

interface Prescription {
  id: string;
  medication_name: string;
  dosage?: string | null;
  frequency?: string | null;
  status?: string | null;
  start_date: string;
}

export default function PatientDashboard() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [portalContext, setPortalContext] = useState<PatientPortalContext | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);

  const loadDashboard = useCallback(async () => {
    try {
      const context = await getPatientPortalContext();
      setPortalContext(context);

      const [appointmentsResult, prescriptionsResult] = await Promise.all([
        supabase
          .from("appointments")
          .select(`
            id,
            appointment_date,
            appointment_time,
            status,
            reason,
            doctor:doctors(first_name, last_name, specialization)
          `)
          .eq("patient_id", context.patient.id)
          .gte("appointment_date", new Date().toISOString().split("T")[0])
          .order("appointment_date", { ascending: true })
          .limit(4),
        supabase
          .from("prescriptions")
          .select("id, medication_name, dosage, frequency, status, start_date")
          .eq("patient_id", context.patient.id)
          .eq("status", "active")
          .order("start_date", { ascending: false })
          .limit(4),
      ]);

      if (appointmentsResult.data) {
        setAppointments(appointmentsResult.data as Appointment[]);
      }

      if (prescriptionsResult.data) {
        setPrescriptions(prescriptionsResult.data as Prescription[]);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to load your portal.";

      if (message === "AUTH_REQUIRED" || message === "PATIENT_ACCESS_ONLY") {
        navigate("/patient-portal/login");
        return;
      }

      toast.error(message === "PATIENT_RECORD_NOT_FOUND" ? "Patient record not found." : "Failed to load your dashboard.");
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    loadDashboard();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        navigate("/patient-portal/login");
      }
    });

    return () => subscription.unsubscribe();
  }, [loadDashboard, navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("You have been signed out.");
    navigate("/patient-portal/login");
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f4f8ff]">
        <div className="flex items-center gap-3 rounded-2xl border border-[#dbe4f4] bg-white px-5 py-4 text-sm font-semibold text-[#13306b] shadow-[0_18px_40px_-24px_rgba(19,48,107,0.35)]">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading your portal
        </div>
      </div>
    );
  }

  if (!portalContext) {
    return null;
  }

  const patientName = `${portalContext.patient.first_name} ${portalContext.patient.last_name}`;
  const patientMeta = portalContext.patient.email || portalContext.profile.email || "Secure patient access";

  const summaryCards = [
    {
      label: "Upcoming Visits",
      value: appointments.length,
      detail: "Appointments ahead",
      icon: Calendar,
      iconClass: "bg-[#eef4ff] text-[#13306b]",
    },
    {
      label: "Active Prescriptions",
      value: prescriptions.length,
      detail: "Current medications",
      icon: Pill,
      iconClass: "bg-[#eaf8f0] text-[#1d8b55]",
    },
    {
      label: "Blood Type",
      value: portalContext.patient.blood_type || "N/A",
      detail: "Clinical snapshot",
      icon: Activity,
      iconClass: "bg-[#fff3f2] text-[#ef2027]",
    },
    {
      label: "Profile Status",
      value: "Verified",
      detail: "Secure access enabled",
      icon: ShieldCheck,
      iconClass: "bg-[#edf7ff] text-[#1f5fae]",
    },
  ];

  return (
    <PatientPortalShell
      title={`Welcome back, ${portalContext.patient.first_name}`}
      description="Review upcoming visits, current medications, billing, and your medical records through the same clean experience as the main site."
      patientName={patientName}
      patientMeta={patientMeta}
      onLogout={handleLogout}
      actions={
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <Button className="h-12 rounded-xl bg-[#ef2027] text-sm font-bold uppercase text-white hover:bg-[#d61920]" asChild>
            <Link to="/services/smart-appointments">Book New Appointment</Link>
          </Button>
          <Button variant="outline" className="h-12 rounded-xl border-white/25 bg-white/10 text-sm font-bold uppercase text-white hover:bg-white hover:text-[#13306b]" asChild>
            <Link to="/patient-portal/appointments">View Appointments</Link>
          </Button>
          <Button variant="outline" className="h-12 rounded-xl border-white/25 bg-white/10 text-sm font-bold uppercase text-white hover:bg-white hover:text-[#13306b]" asChild>
            <Link to="/patient-portal/billing">Review Billing</Link>
          </Button>
          <Button variant="outline" className="h-12 rounded-xl border-white/25 bg-white/10 text-sm font-bold uppercase text-white hover:bg-white hover:text-[#13306b]" asChild>
            <Link to="/patient-portal/profile">Update Profile</Link>
          </Button>
        </div>
      }
    >
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => (
          <Card key={card.label} className="rounded-[22px] border border-[#dbe4f4] bg-white shadow-[0_18px_40px_-28px_rgba(19,48,107,0.28)]">
            <CardContent className="flex items-center gap-4 p-5">
              <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${card.iconClass}`}>
                <card.icon className="h-7 w-7" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6b7fa8]">{card.label}</p>
                <p className="mt-2 text-2xl font-extrabold leading-none text-[#13306b]">{card.value}</p>
                <p className="mt-1 text-sm text-[#4f6796]">{card.detail}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="rounded-[24px] border border-[#dbe4f4] bg-white shadow-[0_18px_40px_-28px_rgba(19,48,107,0.28)]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-xl font-extrabold text-[#13306b]">Upcoming Appointments</CardTitle>
              <p className="mt-1 text-sm text-[#5f76a3]">Your next confirmed and scheduled visits.</p>
            </div>
            <Button variant="outline" className="rounded-xl border-[#d0dcf4] text-[#13306b]" asChild>
              <Link to="/patient-portal/appointments">View All</Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {appointments.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-[#d6e0f3] bg-[#f8fbff] px-5 py-10 text-center">
                <Calendar className="mx-auto h-10 w-10 text-[#98a9cb]" />
                <p className="mt-4 text-base font-semibold text-[#13306b]">No upcoming appointments</p>
                <p className="mt-1 text-sm text-[#5f76a3]">When you book a new visit, it will appear here.</p>
              </div>
            ) : (
              appointments.map((appointment) => (
                <div key={appointment.id} className="rounded-2xl border border-[#e0e8f7] bg-[#fbfcff] p-4">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-start gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#eef4ff] text-[#13306b]">
                        <Clock3 className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-base font-bold text-[#13306b]">
                          Dr. {appointment.doctor?.first_name} {appointment.doctor?.last_name}
                        </p>
                        <p className="mt-1 text-sm text-[#5f76a3]">{appointment.doctor?.specialization || "Clinical appointment"}</p>
                        {appointment.reason && <p className="mt-2 text-sm text-[#415b8f]">{appointment.reason}</p>}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 sm:justify-end">
                      <div className="text-sm font-semibold text-[#13306b]">
                        {format(new Date(appointment.appointment_date), "MMM d, yyyy")}
                        <span className="block text-xs font-medium text-[#6b7fa8]">{appointment.appointment_time}</span>
                      </div>
                      <Badge className="rounded-full bg-[#13306b] px-3 py-1 text-white hover:bg-[#13306b]">
                        {appointment.status || "scheduled"}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="rounded-[24px] border border-[#dbe4f4] bg-white shadow-[0_18px_40px_-28px_rgba(19,48,107,0.28)]">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-extrabold text-[#13306b]">Current Prescriptions</CardTitle>
              <p className="mt-1 text-sm text-[#5f76a3]">Medications currently active on your record.</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {prescriptions.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-[#d6e0f3] bg-[#f8fbff] px-5 py-8 text-center">
                  <Pill className="mx-auto h-9 w-9 text-[#98a9cb]" />
                  <p className="mt-4 text-base font-semibold text-[#13306b]">No active prescriptions</p>
                </div>
              ) : (
                prescriptions.map((prescription) => (
                  <div key={prescription.id} className="rounded-2xl border border-[#e0e8f7] bg-[#fbfcff] p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-base font-bold text-[#13306b]">{prescription.medication_name}</p>
                        <p className="mt-1 text-sm text-[#5f76a3]">
                          {prescription.dosage || "Dosage pending"}{prescription.frequency ? ` · ${prescription.frequency}` : ""}
                        </p>
                      </div>
                      <Badge variant="outline" className="rounded-full border-[#1d8b55] text-[#1d8b55]">
                        Active
                      </Badge>
                    </div>
                    <p className="mt-3 text-xs font-medium uppercase tracking-[0.12em] text-[#7a8fb8]">
                      Started {format(new Date(prescription.start_date), "MMM d, yyyy")}
                    </p>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          <Card className="rounded-[24px] border border-[#dbe4f4] bg-white shadow-[0_18px_40px_-28px_rgba(19,48,107,0.28)]">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-extrabold text-[#13306b]">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              {[
                { label: "Medical Records", href: "/patient-portal/records", icon: FileText },
                { label: "Billing & Payments", href: "/patient-portal/billing", icon: HeartPulse },
                { label: "Profile Settings", href: "/patient-portal/profile", icon: UserRound },
                { label: "Sign Out", action: handleLogout, icon: LogOut },
              ].map((action) => (
                action.href ? (
                  <Link
                    key={action.label}
                    to={action.href}
                    className="flex items-center justify-between rounded-2xl border border-[#e0e8f7] bg-[#fbfcff] px-4 py-4 transition hover:border-[#bfd0ef] hover:bg-[#f3f7ff]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eef4ff] text-[#13306b]">
                        <action.icon className="h-5 w-5" />
                      </div>
                      <span className="text-sm font-bold text-[#13306b]">{action.label}</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-[#7e91b8]" />
                  </Link>
                ) : (
                  <button
                    type="button"
                    key={action.label}
                    onClick={action.action}
                    className="flex items-center justify-between rounded-2xl border border-[#e0e8f7] bg-[#fbfcff] px-4 py-4 text-left transition hover:border-[#bfd0ef] hover:bg-[#f3f7ff]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff1f1] text-[#ef2027]">
                        <action.icon className="h-5 w-5" />
                      </div>
                      <span className="text-sm font-bold text-[#13306b]">{action.label}</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-[#7e91b8]" />
                  </button>
                )
              ))}
            </CardContent>
          </Card>
        </div>
      </section>
    </PatientPortalShell>
  );
}
