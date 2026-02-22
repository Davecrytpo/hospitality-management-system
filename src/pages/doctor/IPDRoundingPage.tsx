import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { BedDouble, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type AdmissionRow = {
  id: string;
  patient_id: string;
  ward?: string | null;
  bed_number?: string | number | null;
  diagnosis?: string | null;
  patients?: {
    first_name?: string | null;
    last_name?: string | null;
    blood_type?: string | null;
  } | null;
};

export default function IPDRoundingPage() {
  const { toast } = useToast();
  const [admissions, setAdmissions] = useState<AdmissionRow[]>([]);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    supabase.from("admissions").select("*, patients(first_name, last_name, blood_type)").eq("status", "admitted")
      .then(({ data }) => setAdmissions(data || []));
  }, []);

  const saveNote = async (admissionId: string, patientId: string) => {
    setSaving(admissionId);
    try {
      const { error } = await supabase.from("medical_records").insert({
        patient_id: patientId, record_type: "ipd_round", title: "IPD Rounding Note",
        description: notes[admissionId], record_date: new Date().toISOString().split("T")[0],
      });
      if (error) throw error;
      toast({ title: "Rounding note saved!" });
      setNotes(prev => ({ ...prev, [admissionId]: "" }));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      toast({ title: "Error", description: message, variant: "destructive" });
    } finally {
      setSaving(null);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2"><BedDouble className="h-6 w-6 text-primary" /> IPD Rounding Log</h1>
          <p className="text-muted-foreground">Document notes for admitted patients during rounds</p>
        </div>
        {admissions.length === 0 ? (
          <Card><CardContent className="py-12 text-center text-muted-foreground">No admitted patients found.</CardContent></Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {admissions.map(adm => (
              <Card key={adm.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{adm.patients?.first_name} {adm.patients?.last_name}</CardTitle>
                    <Badge>{adm.ward} - Bed {adm.bed_number}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Diagnosis: {adm.diagnosis || "N/A"}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Textarea rows={3} placeholder="Rounding notes..." value={notes[adm.id] || ""} onChange={e => setNotes(prev => ({ ...prev, [adm.id]: e.target.value }))} />
                  <Button size="sm" className="w-full" disabled={saving === adm.id} onClick={() => saveNote(adm.id, adm.patient_id)}>
                    <Save className="mr-2 h-4 w-4" />{saving === adm.id ? "Saving..." : "Save Note"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
