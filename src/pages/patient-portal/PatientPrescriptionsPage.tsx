import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Loader2, Pill } from "lucide-react";
import { toast } from "sonner";

import { PatientPortalShell } from "@/components/patient-portal/PatientPortalShell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { getPatientPortalContext, type PatientPortalContext } from "@/lib/patient-portal";

interface Prescription {
  id: string;
  medication_name: string;
  dosage?: string | null;
  frequency?: string | null;
  duration?: string | null;
  instructions?: string | null;
  start_date: string;
  end_date?: string | null;
  status?: string | null;
  refills_remaining?: number | null;
  doctor?: {
    first_name?: string | null;
    last_name?: string | null;
    specialization?: string | null;
  } | null;
}

export default function PatientPrescriptionsPage() {
  const navigate = useNavigate();
  const [portalContext, setPortalContext] = useState<PatientPortalContext | null>(null);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadPrescriptions = useCallback(async () => {
    try {
      const context = await getPatientPortalContext();
      setPortalContext(context);

      const { data, error } = await supabase
        .from("prescriptions")
        .select(`
          id,
          medication_name,
          dosage,
          frequency,
          duration,
          instructions,
          start_date,
          end_date,
          status,
          refills_remaining,
          doctor:doctors(first_name, last_name, specialization)
        `)
        .eq("patient_id", context.patient.id)
        .order("start_date", { ascending: false });

      if (error) throw error;
      if (data) setPrescriptions(data as Prescription[]);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to load prescriptions.";

      if (message === "AUTH_REQUIRED" || message === "PATIENT_ACCESS_ONLY") {
        navigate("/patient-portal/login");
        return;
      }

      toast.error("Failed to load prescriptions.");
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    loadPrescriptions();
  }, [loadPrescriptions]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/patient-portal/login");
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f4f8ff]">
        <div className="flex items-center gap-3 rounded-2xl border border-[#dbe4f4] bg-white px-5 py-4 text-sm font-semibold text-[#13306b] shadow-[0_18px_40px_-24px_rgba(19,48,107,0.35)]">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading prescriptions
        </div>
      </div>
    );
  }

  if (!portalContext) {
    return null;
  }

  const activePrescriptions = prescriptions.filter((prescription) => prescription.status === "active");
  const historyPrescriptions = prescriptions.filter((prescription) => prescription.status !== "active");

  const patientName = `${portalContext.patient.first_name} ${portalContext.patient.last_name}`;
  const patientMeta = portalContext.patient.email || portalContext.profile.email || "Secure patient access";

  return (
    <PatientPortalShell
      title="My Prescriptions"
      description="Track active medications, refill counts, instructions, and your previous prescription history."
      patientName={patientName}
      patientMeta={patientMeta}
      onLogout={handleLogout}
    >
      <Tabs defaultValue="active" className="space-y-6">
        <TabsList className="grid h-auto w-full gap-2 rounded-2xl bg-transparent p-0 sm:w-auto sm:grid-cols-2">
          <TabsTrigger value="active" className="rounded-xl border border-[#d6e0f3] bg-white px-4 py-3 data-[state=active]:bg-[#13306b] data-[state=active]:text-white">
            Active ({activePrescriptions.length})
          </TabsTrigger>
          <TabsTrigger value="history" className="rounded-xl border border-[#d6e0f3] bg-white px-4 py-3 data-[state=active]:bg-[#13306b] data-[state=active]:text-white">
            History ({historyPrescriptions.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-0">
          <PrescriptionSection prescriptions={activePrescriptions} emptyTitle="No active prescriptions" emptyDescription="Any medications currently prescribed to you will appear here." active />
        </TabsContent>

        <TabsContent value="history" className="mt-0">
          <PrescriptionSection prescriptions={historyPrescriptions} emptyTitle="No prescription history" emptyDescription="Previous or completed prescriptions will appear here." />
        </TabsContent>
      </Tabs>
    </PatientPortalShell>
  );
}

function PrescriptionSection({
  prescriptions,
  emptyTitle,
  emptyDescription,
  active = false,
}: {
  prescriptions: Prescription[];
  emptyTitle: string;
  emptyDescription: string;
  active?: boolean;
}) {
  if (prescriptions.length === 0) {
    return (
      <Card className="rounded-[24px] border border-[#dbe4f4] bg-white shadow-[0_18px_40px_-28px_rgba(19,48,107,0.28)]">
        <CardContent className="px-6 py-14 text-center">
          <Pill className="mx-auto h-12 w-12 text-[#97a9cb]" />
          <p className="mt-4 text-lg font-bold text-[#13306b]">{emptyTitle}</p>
          <p className="mt-2 text-sm text-[#5f76a3]">{emptyDescription}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {prescriptions.map((prescription) => (
        <Card key={prescription.id} className="rounded-[24px] border border-[#dbe4f4] bg-white shadow-[0_18px_40px_-28px_rgba(19,48,107,0.28)]">
          <CardHeader className="pb-3">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-3">
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${active ? "bg-[#eaf8f0] text-[#1d8b55]" : "bg-[#eef4ff] text-[#13306b]"}`}>
                  <Pill className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-lg font-extrabold text-[#13306b]">{prescription.medication_name}</CardTitle>
                  <p className="mt-1 text-sm text-[#5f76a3]">
                    Prescribed by Dr. {prescription.doctor?.first_name} {prescription.doctor?.last_name}
                    {prescription.doctor?.specialization ? ` · ${prescription.doctor.specialization}` : ""}
                  </p>
                </div>
              </div>

              <Badge
                variant={active ? "outline" : "secondary"}
                className={active ? "rounded-full border-[#1d8b55] text-[#1d8b55]" : "rounded-full"}
              >
                {active ? "Active" : prescription.status || "Completed"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <InfoBlock label="Dosage" value={prescription.dosage || "Not recorded"} />
              <InfoBlock label="Frequency" value={prescription.frequency || "Not recorded"} />
              <InfoBlock label="Start Date" value={format(new Date(prescription.start_date), "MMMM d, yyyy")} />
              <InfoBlock label="End Date" value={prescription.end_date ? format(new Date(prescription.end_date), "MMMM d, yyyy") : "Open ended"} />
            </div>

            {prescription.instructions && (
              <div className="rounded-2xl border border-[#e0e8f7] bg-[#fbfcff] px-4 py-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7e91b8]">Instructions</p>
                <p className="mt-2 text-sm leading-7 text-[#13306b]">{prescription.instructions}</p>
              </div>
            )}

            {active && typeof prescription.refills_remaining === "number" && (
              <p className="text-sm font-semibold text-[#415b8f]">Refills remaining: {prescription.refills_remaining}</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-[#f8fbff] px-4 py-4">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7e91b8]">{label}</p>
      <p className="mt-2 text-sm font-semibold text-[#13306b]">{value}</p>
    </div>
  );
}
