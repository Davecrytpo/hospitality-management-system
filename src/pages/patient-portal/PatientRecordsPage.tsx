import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { FileText, Loader2, Lock, UserRound } from "lucide-react";
import { toast } from "sonner";

import { PatientPortalShell } from "@/components/patient-portal/PatientPortalShell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { getPatientPortalContext, type PatientPortalContext } from "@/lib/patient-portal";

interface MedicalRecord {
  id: string;
  record_type: string;
  title: string;
  description?: string | null;
  diagnosis?: string | null;
  treatment?: string | null;
  record_date: string;
  is_confidential?: boolean | null;
  doctor?: {
    first_name?: string | null;
    last_name?: string | null;
    specialization?: string | null;
  } | null;
}

const recordTypeClassMap: Record<string, string> = {
  diagnosis: "bg-[#fff1f1] text-[#ef2027]",
  lab_result: "bg-[#eef6ff] text-[#1f5fae]",
  imaging: "bg-[#f2ecff] text-[#7050c8]",
  procedure: "bg-[#fff6ea] text-[#d27a16]",
  consultation: "bg-[#eaf8f0] text-[#1d8b55]",
};

export default function PatientRecordsPage() {
  const navigate = useNavigate();
  const [portalContext, setPortalContext] = useState<PatientPortalContext | null>(null);
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadRecords = useCallback(async () => {
    try {
      const context = await getPatientPortalContext();
      setPortalContext(context);

      const { data, error } = await supabase
        .from("medical_records")
        .select(`
          id,
          record_type,
          title,
          description,
          diagnosis,
          treatment,
          record_date,
          is_confidential,
          doctor:doctors(first_name, last_name, specialization)
        `)
        .eq("patient_id", context.patient.id)
        .order("record_date", { ascending: false });

      if (error) throw error;
      if (data) setRecords(data as MedicalRecord[]);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to load medical records.";

      if (message === "AUTH_REQUIRED" || message === "PATIENT_ACCESS_ONLY") {
        navigate("/patient-portal/login");
        return;
      }

      toast.error("Failed to load medical records.");
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    loadRecords();
  }, [loadRecords]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/patient-portal/login");
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f4f8ff]">
        <div className="flex items-center gap-3 rounded-2xl border border-[#dbe4f4] bg-white px-5 py-4 text-sm font-semibold text-[#13306b] shadow-[0_18px_40px_-24px_rgba(19,48,107,0.35)]">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading medical records
        </div>
      </div>
    );
  }

  if (!portalContext) {
    return null;
  }

  const patientName = `${portalContext.patient.first_name} ${portalContext.patient.last_name}`;
  const patientMeta = portalContext.patient.email || portalContext.profile.email || "Secure patient access";

  return (
    <PatientPortalShell
      title="Medical Records"
      description="Browse diagnoses, consultations, procedures, lab summaries, and treatment notes stored in your chart."
      patientName={patientName}
      patientMeta={patientMeta}
      onLogout={handleLogout}
    >
      <Card className="mb-6 rounded-[24px] border border-[#dbe4f4] bg-white shadow-[0_18px_40px_-28px_rgba(19,48,107,0.28)]">
        <CardContent className="flex items-start gap-3 p-5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#eef4ff] text-[#13306b]">
            <Lock className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#6f85af]">Protected Health Information</p>
            <p className="mt-2 text-sm leading-7 text-[#415b8f]">
              These records are visible only to you and authorized clinical staff. Confidential records are clearly marked below.
            </p>
          </div>
        </CardContent>
      </Card>

      {records.length === 0 ? (
        <Card className="rounded-[24px] border border-[#dbe4f4] bg-white shadow-[0_18px_40px_-28px_rgba(19,48,107,0.28)]">
          <CardContent className="px-6 py-14 text-center">
            <FileText className="mx-auto h-12 w-12 text-[#97a9cb]" />
            <p className="mt-4 text-lg font-bold text-[#13306b]">No medical records found</p>
            <p className="mt-2 text-sm text-[#5f76a3]">As records are added to your chart, they will appear here.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {records.map((record) => (
            <Card key={record.id} className="rounded-[24px] border border-[#dbe4f4] bg-white shadow-[0_18px_40px_-28px_rgba(19,48,107,0.28)]">
              <CardHeader className="pb-3">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-3">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${recordTypeClassMap[record.record_type] || "bg-[#eef4ff] text-[#13306b]"}`}>
                      <FileText className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-extrabold text-[#13306b]">{record.title}</CardTitle>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <Badge variant="outline" className="rounded-full border-[#c7d6f1] capitalize text-[#13306b]">
                          {record.record_type.replace("_", " ")}
                        </Badge>
                        {record.is_confidential && (
                          <Badge className="rounded-full bg-[#13306b] text-white hover:bg-[#13306b]">
                            <Lock className="mr-1 h-3.5 w-3.5" />
                            Confidential
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <p className="text-sm font-semibold text-[#5f76a3]">{format(new Date(record.record_date), "MMM d, yyyy")}</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {record.doctor && (
                  <div className="flex items-center gap-2 rounded-2xl bg-[#f8fbff] px-4 py-3 text-sm text-[#415b8f]">
                    <UserRound className="h-4 w-4 text-[#13306b]" />
                    Dr. {record.doctor.first_name} {record.doctor.last_name}
                    {record.doctor.specialization ? ` · ${record.doctor.specialization}` : ""}
                  </div>
                )}

                {record.description && (
                  <ContentBlock label="Summary" value={record.description} />
                )}

                {record.diagnosis && (
                  <ContentBlock label="Diagnosis" value={record.diagnosis} />
                )}

                {record.treatment && (
                  <ContentBlock label="Treatment" value={record.treatment} />
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </PatientPortalShell>
  );
}

function ContentBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#e0e8f7] bg-[#fbfcff] px-4 py-4">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7e91b8]">{label}</p>
      <p className="mt-2 text-sm leading-7 text-[#13306b]">{value}</p>
    </div>
  );
}
