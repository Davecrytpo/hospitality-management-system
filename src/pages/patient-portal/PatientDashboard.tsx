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
      description="Review upcoming visits, current medications, billing, and your medical records through a secure and clinical-grade interface."
      patientName={patientName}
      patientMeta={patientMeta}
      onLogout={handleLogout}
      actions={
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <Button className="h-11 sm:h-12 rounded-xl bg-[#ef2027] text-[11px] sm:text-sm font-bold uppercase tracking-wider text-white hover:bg-[#d61920] shadow-lg shadow-red-900/20" asChild>
            <Link to="/services/smart-appointments">Book Appointment</Link>
          </Button>
          <Button variant="outline" className="h-11 sm:h-12 rounded-xl border-white/20 bg-white/5 text-[11px] sm:text-sm font-bold uppercase tracking-wider text-white hover:bg-white hover:text-[#13306b] backdrop-blur-sm" asChild>
            <Link to="/patient-portal/appointments">My Visits</Link>
          </Button>
          <Button variant="outline" className="h-11 sm:h-12 rounded-xl border-white/20 bg-white/5 text-[11px] sm:text-sm font-bold uppercase tracking-wider text-white hover:bg-white hover:text-[#13306b] backdrop-blur-sm" asChild>
            <Link to="/patient-portal/billing">Billing History</Link>
          </Button>
          <Button variant="outline" className="h-11 sm:h-12 rounded-xl border-white/20 bg-white/5 text-[11px] sm:text-sm font-bold uppercase tracking-wider text-white hover:bg-white hover:text-[#13306b] backdrop-blur-sm" asChild>
            <Link to="/patient-portal/profile">My Profile</Link>
          </Button>
        </div>
      }
    >
      <section className="grid gap-4 grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => (
          <Card key={card.label} className="rounded-2xl sm:rounded-[22px] border border-[#dbe4f4] bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
            <CardContent className="flex flex-col sm:flex-row items-center sm:items-center gap-3 sm:gap-4 p-4 sm:p-5">
              <div className={`flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl ${card.iconClass} transition-transform group-hover:scale-110`}>
                <card.icon className="h-6 w-6 sm:h-7 sm:w-7" />
              </div>
              <div className="text-center sm:text-left min-w-0">
                <p className="text-[9px] sm:text-xs font-bold uppercase tracking-[0.18em] text-[#6b7fa8] truncate">{card.label}</p>
                <p className="mt-0.5 sm:mt-1.5 text-xl sm:text-2xl font-extrabold leading-none text-[#13306b]">{card.value}</p>
                <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-sm text-[#4f6796] font-medium truncate">{card.detail}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="rounded-[24px] border border-[#dbe4f4] bg-white shadow-sm overflow-hidden">
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#f0f4fb] bg-[#fbfcff]/50">
            <div>
              <CardTitle className="text-lg sm:text-xl font-extrabold text-[#13306b]">Upcoming Appointments</CardTitle>
              <p className="mt-1 text-[11px] sm:text-sm text-[#5f76a3] font-medium">Your next confirmed and scheduled visits.</p>
            </div>
            <Button variant="ghost" size="sm" className="h-9 rounded-lg text-[#13306b] font-bold text-xs uppercase tracking-wider hover:bg-[#eef4ff]" asChild>
              <Link to="/patient-portal/appointments">View All</Link>
            </Button>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-4">
            {appointments.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-[#d6e0f3] bg-[#f8fbff] px-5 py-12 text-center">
                <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-white shadow-sm mb-4">
                  <Calendar className="h-6 w-6 text-[#98a9cb]" />
                </div>
                <p className="text-base font-bold text-[#13306b]">No upcoming appointments</p>
                <p className="mt-1 text-sm text-[#5f76a3] max-w-[240px] mx-auto">When you book a new visit, it will appear here.</p>
              </div>
            ) : (
              appointments.map((appointment) => (
                <div key={appointment.id} className="rounded-2xl border border-[#e0e8f7] bg-[#fbfcff] p-4 sm:p-5 hover:border-[#bfd0ef] transition-colors group">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-[#e0e8f7] group-hover:ring-[#bfd0ef] text-[#13306b] transition-all">
                        <Clock3 className="h-5 w-5 sm:h-6 sm:w-6" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-base font-bold text-[#13306b] leading-none">
                          Dr. {appointment.doctor?.first_name} {appointment.doctor?.last_name}
                        </p>
                        <p className="mt-1.5 text-xs sm:text-sm text-[#5f76a3] font-medium">{appointment.doctor?.specialization || "Clinical appointment"}</p>
                        {appointment.reason && <p className="mt-3 text-xs sm:text-sm text-[#415b8f] leading-relaxed line-clamp-2">{appointment.reason}</p>}
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:flex-col sm:items-end gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#f0f4fb]">
                      <div className="text-left sm:text-right">
                        <p className="text-[13px] sm:text-[15px] font-bold text-[#13306b]">{format(new Date(appointment.appointment_date), "MMM d, yyyy")}</p>
                        <p className="text-[11px] font-bold text-[#6b7fa8] uppercase tracking-wider">{appointment.appointment_time}</p>
                      </div>
                      <Badge className="rounded-full bg-[#13306b]/5 text-[#13306b] border-[#13306b]/10 px-3 py-1 font-bold text-[10px] uppercase tracking-widest hover:bg-[#13306b]/10 transition-colors">
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
          <Card className="rounded-[24px] border border-[#dbe4f4] bg-white shadow-sm overflow-hidden">
            <CardHeader className="pb-4 border-b border-[#f0f4fb] bg-[#fbfcff]/50">
              <CardTitle className="text-lg sm:text-xl font-extrabold text-[#13306b]">Active Prescriptions</CardTitle>
              <p className="mt-1 text-[11px] sm:text-sm text-[#5f76a3] font-medium">Medications currently active on your record.</p>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              {prescriptions.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-[#d6e0f3] bg-[#f8fbff] px-5 py-10 text-center">
                  <div className="mx-auto h-11 w-11 flex items-center justify-center rounded-full bg-white shadow-sm mb-3">
                    <Pill className="h-5 w-5 text-[#98a9cb]" />
                  </div>
                  <p className="text-sm font-bold text-[#13306b]">No active prescriptions</p>
                </div>
              ) : (
                prescriptions.map((prescription) => (
                  <div key={prescription.id} className="rounded-2xl border border-[#e0e8f7] bg-[#fbfcff] p-4 hover:border-[#bfd0ef] transition-colors group">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="text-base font-bold text-[#13306b] truncate">{prescription.medication_name}</p>
                        <p className="mt-1.5 text-xs sm:text-sm text-[#5f76a3] font-medium">
                          {prescription.dosage || "Dosage pending"}{prescription.frequency ? ` · ${prescription.frequency}` : ""}
                        </p>
                      </div>
                      <Badge variant="outline" className="shrink-0 rounded-full border-emerald-200 bg-emerald-50 text-emerald-700 font-bold text-[10px] uppercase tracking-widest px-2 py-0.5">
                        Active
                      </Badge>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <Calendar className="h-3 w-3 text-[#7a8fb8]" />
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#7a8fb8]">
                        Started {format(new Date(prescription.start_date), "MMM d, yyyy")}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          <Card className="rounded-[24px] border border-[#dbe4f4] bg-white shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg sm:text-xl font-extrabold text-[#13306b]">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0 grid gap-3 sm:grid-cols-2">
              {[
                { label: "Medical Records", href: "/patient-portal/records", icon: FileText, color: "bg-[#eef4ff] text-[#13306b]" },
                { label: "Billing/Payments", href: "/patient-portal/billing", icon: HeartPulse, color: "bg-[#fff3f2] text-[#ef2027]" },
                { label: "Profile Settings", href: "/patient-portal/profile", icon: UserRound, color: "bg-[#eaf8f0] text-[#1d8b55]" },
                { label: "Sign Out", action: handleLogout, icon: LogOut, color: "bg-slate-100 text-slate-600" },
              ].map((action) => (
                action.href ? (
                  <Link
                    key={action.label}
                    to={action.href}
                    className="flex items-center justify-between rounded-2xl border border-[#e0e8f7] bg-[#fbfcff] px-4 py-4 transition hover:border-[#bfd0ef] hover:bg-[#f3f7ff] group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl shadow-sm transition-transform group-hover:scale-110", action.color)}>
                        <action.icon className="h-5 w-5" />
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-[#13306b]">{action.label}</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-[#7e91b8] group-hover:translate-x-1 transition-transform" />
                  </Link>
                ) : (
                  <button
                    type="button"
                    key={action.label}
                    onClick={action.action}
                    className="flex items-center justify-between rounded-2xl border border-[#e0e8f7] bg-[#fbfcff] px-4 py-4 text-left transition hover:border-[#bfd0ef] hover:bg-[#f3f7ff] group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl shadow-sm transition-transform group-hover:scale-110", action.color)}>
                        <action.icon className="h-5 w-5" />
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-[#13306b]">{action.label}</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-[#7e91b8] group-hover:translate-x-1 transition-transform" />
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
