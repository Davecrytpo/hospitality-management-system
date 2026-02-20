import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Pill, FileText, Stethoscope } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function ConsultationRoomPage() {
  const [searchParams] = useSearchParams();
  const patientId = searchParams.get("patient");
  const { toast } = useToast();
  const [patient, setPatient] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [notes, setNotes] = useState({ chief_complaint: "", history_of_illness: "", physical_examination: "", assessment: "", plan: "" });
  const [prescription, setPrescription] = useState({ medication_name: "", dosage: "", frequency: "", duration: "", instructions: "" });

  useEffect(() => {
    if (patientId) {
      supabase.from("patients").select("*").eq("id", patientId).single().then(({ data }) => setPatient(data));
    }
  }, [patientId]);

  const saveNotes = async () => {
    if (!patientId) return toast({ title: "No patient selected", variant: "destructive" });
    setSaving(true);
    try {
      const doctorRes = await supabase.rpc("get_my_doctor_id");
      const { error } = await supabase.from("consultation_notes").insert({ ...notes, patient_id: patientId, doctor_id: doctorRes.data });
      if (error) throw error;
      toast({ title: "Notes saved successfully!" });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const savePrescription = async () => {
    if (!patientId) return toast({ title: "No patient selected", variant: "destructive" });
    if (!prescription.medication_name || !prescription.dosage || !prescription.frequency) {
      return toast({ title: "Please fill all required fields", variant: "destructive" });
    }
    setSaving(true);
    try {
      const doctorRes = await supabase.rpc("get_my_doctor_id");
      const { error } = await supabase.from("prescriptions").insert({
        ...prescription, patient_id: patientId, doctor_id: doctorRes.data,
        start_date: new Date().toISOString().split("T")[0],
      });
      if (error) throw error;
      toast({ title: "Prescription saved successfully!" });
      setPrescription({ medication_name: "", dosage: "", frequency: "", duration: "", instructions: "" });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2"><Stethoscope className="h-6 w-6 text-primary" /> Active Consultation</h1>
            {patient && <p className="text-muted-foreground">Patient: {patient.first_name} {patient.last_name}</p>}
          </div>
        </div>

        {!patientId && (
          <Card><CardContent className="py-12 text-center text-muted-foreground">
            Please select a patient from your appointment list to begin consultation.
          </CardContent></Card>
        )}

        {patientId && (
          <Tabs defaultValue="notes">
            <TabsList><TabsTrigger value="notes">Clinical Notes</TabsTrigger><TabsTrigger value="prescription">E-Prescription</TabsTrigger></TabsList>
            <TabsContent value="notes" className="space-y-4 mt-4">
              <Card>
                <CardHeader><CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5" /> SOAP Notes</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { key: "chief_complaint", label: "Chief Complaint" },
                    { key: "history_of_illness", label: "History of Present Illness" },
                    { key: "physical_examination", label: "Physical Examination" },
                    { key: "assessment", label: "Assessment / Diagnosis" },
                    { key: "plan", label: "Treatment Plan" },
                  ].map(({ key, label }) => (
                    <div key={key} className="space-y-1">
                      <Label>{label}</Label>
                      <Textarea rows={3} value={(notes as any)[key]} onChange={e => setNotes(prev => ({ ...prev, [key]: e.target.value }))} placeholder={`Enter ${label.toLowerCase()}...`} />
                    </div>
                  ))}
                  <Button onClick={saveNotes} disabled={saving} className="w-full"><Save className="mr-2 h-4 w-4" />{saving ? "Saving..." : "Save Consultation Notes"}</Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="prescription" className="mt-4">
              <Card>
                <CardHeader><CardTitle className="flex items-center gap-2"><Pill className="h-5 w-5" /> E-Prescription</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1"><Label>Medication Name *</Label><Input value={prescription.medication_name} onChange={e => setPrescription(p => ({ ...p, medication_name: e.target.value }))} placeholder="e.g. Amoxicillin 500mg" /></div>
                    <div className="space-y-1"><Label>Dosage *</Label><Input value={prescription.dosage} onChange={e => setPrescription(p => ({ ...p, dosage: e.target.value }))} placeholder="e.g. 1 tablet" /></div>
                    <div className="space-y-1"><Label>Frequency *</Label>
                      <Select value={prescription.frequency} onValueChange={v => setPrescription(p => ({ ...p, frequency: v }))}>
                        <SelectTrigger><SelectValue placeholder="Select frequency" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Once daily">Once daily</SelectItem>
                          <SelectItem value="Twice daily">Twice daily</SelectItem>
                          <SelectItem value="Three times daily">Three times daily</SelectItem>
                          <SelectItem value="Every 6 hours">Every 6 hours</SelectItem>
                          <SelectItem value="As needed">As needed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1"><Label>Duration</Label><Input value={prescription.duration} onChange={e => setPrescription(p => ({ ...p, duration: e.target.value }))} placeholder="e.g. 7 days" /></div>
                  </div>
                  <div className="space-y-1"><Label>Special Instructions</Label><Textarea value={prescription.instructions} onChange={e => setPrescription(p => ({ ...p, instructions: e.target.value }))} placeholder="Take with food, avoid alcohol..." /></div>
                  <Button onClick={savePrescription} disabled={saving} className="w-full"><Save className="mr-2 h-4 w-4" />{saving ? "Saving..." : "Issue Prescription"}</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </DashboardLayout>
  );
}
