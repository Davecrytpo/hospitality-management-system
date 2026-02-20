import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Stethoscope, 
  History, 
  Activity, 
  Pill, 
  FlaskConical, 
  Save, 
  Plus, 
  Trash2,
  Clock,
  User,
  AlertCircle,
  CheckCircle2,
  Loader2
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function ConsultationRoomPage() {
  const { id: patientId } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState<any>(null);
  const [vitals, setVitals] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSubmitting] = useState(false);

  // Consultation State
  const [complaints, setComplaints] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [notes, setNotes] = useState("");
  
  // Dynamic Prescription Items
  const [prescriptions, setPrescriptions] = useState([{ medicine: "", dosage: "", duration: "" }]);
  
  // Lab Order Items
  const [labOrders, setLabOrders] = useState<string[]>([]);

  useEffect(() => {
    if (patientId) {
      fetchPatientData();
    }
  }, [patientId]);

  const fetchPatientData = async () => {
    setIsLoading(true);
    try {
      const { data: p } = await supabase.from("patients").select("*").eq("id", patientId).single();
      const { data: v } = await supabase.from("vitals").select("*").eq("patient_id", patientId).order("recorded_at", { ascending: false }).limit(1).single();
      const { data: h } = await supabase.from("consultation_notes").select("*").eq("patient_id", patientId).order("created_at", { ascending: false });
      
      setPatient(p);
      setVitals(v);
      setHistory(h || []);
    } catch (err) {
      console.error("Error fetching consultation data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const addPrescriptionRow = () => setPrescriptions([...prescriptions, { medicine: "", dosage: "", duration: "" }]);
  
  const removePrescriptionRow = (index: number) => {
    if (prescriptions.length > 1) {
      setPrescriptions(prescriptions.filter((_, i) => i !== index));
    }
  };

  const handlePrescriptionChange = (index: number, field: string, value: string) => {
    const newPrescriptions = [...prescriptions];
    (newPrescriptions[index] as any)[field] = value;
    setPrescriptions(newPrescriptions);
  };

  const toggleLabTest = (test: string) => {
    setLabOrders(prev => prev.includes(test) ? prev.filter(t => t !== test) : [...prev, test]);
  };

  const handleFinishConsultation = async () => {
    if (!diagnosis) {
      toast.error("Please enter a diagnosis before finishing");
      return;
    }

    setIsSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const { data: doctor } = await supabase.from("doctors").select("id").eq("user_id", user?.id).single();

      // 1. Save Consultation Note
      const { data: note, error: noteError } = await supabase.from("consultation_notes").insert({
        patient_id: patientId,
        doctor_id: doctor?.id,
        chief_complaint: complaints,
        assessment: diagnosis,
        plan: notes,
      }).select().single();

      if (noteError) throw noteError;

      // 2. Save Prescriptions
      if (prescriptions.some(p => p.medicine)) {
        const rxData = prescriptions
          .filter(p => p.medicine)
          .map(p => ({
            patient_id: patientId,
            doctor_id: doctor?.id,
            medication: p.medicine,
            dosage: p.dosage,
            duration: p.duration,
            status: "active"
          }));
        await supabase.from("prescriptions").insert(rxData);
      }

      // 3. Save Lab Orders
      if (labOrders.length > 0) {
        const labData = labOrders.map(test => ({
          patient_id: patientId,
          doctor_id: doctor?.id,
          test_name: test,
          test_type: "Consultation Order",
          status: "ordered"
        }));
        await supabase.from("lab_tests").insert(labData);
      }

      toast.success("Consultation finalized and orders sent!");
      navigate("/doctor/dashboard");
    } catch (err: any) {
      console.error("Consultation error:", err);
      toast.error(err.message || "Failed to save consultation");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div className="flex h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 h-[calc(100vh-120px)]">
        {/* Header */}
        <div className="flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" asChild>
              <Link to="/doctor/dashboard"><ArrowLeft className="h-4 w-4" /></Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                Active Consultation: {patient?.first_name} {patient?.last_name}
                <Badge variant="outline" className="ml-2">ID: {patient?.id?.substring(0,8)}</Badge>
              </h1>
              <p className="text-sm text-muted-foreground">Age: {patient?.age} • Gender: {patient?.gender} • Blood: {patient?.blood_type}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => toast.info("Emergency Triage initiated")}>
              <AlertCircle className="mr-2 h-4 w-4 text-medical-danger" />
              Emergency Triage
            </Button>
            <Button onClick={handleFinishConsultation} disabled={isSaving}>
              {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle2 className="mr-2 h-4 w-4" />}
              Finish Consultation
            </Button>
          </div>
        </div>

        {/* Main Split View */}
        <div className="grid grid-cols-12 gap-6 flex-1 min-h-0">
          {/* Left Panel: Patient Context */}
          <div className="col-span-12 lg:col-span-4 space-y-6 flex flex-col min-h-0">
            <Card className="shrink-0 border-l-4 border-l-medical-primary">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                  <Activity className="h-4 w-4 text-medical-primary" />
                  Latest Vitals
                </CardTitle>
              </CardHeader>
              <CardContent>
                {vitals ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase font-bold text-muted-foreground">BP</p>
                      <p className="text-lg font-black">{vitals.blood_pressure_systolic}/{vitals.blood_pressure_diastolic} <span className="text-xs font-normal">mmHg</span></p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase font-bold text-muted-foreground">Heart Rate</p>
                      <p className="text-lg font-black">{vitals.heart_rate} <span className="text-xs font-normal">bpm</span></p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase font-bold text-muted-foreground">Temp</p>
                      <p className="text-lg font-black">{vitals.temperature}°F</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase font-bold text-muted-foreground">SpO2</p>
                      <p className="text-lg font-black">{vitals.oxygen_saturation}%</p>
                    </div>
                  </div>
                ) : <p className="text-xs text-muted-foreground">No vitals recorded today</p>}
              </CardContent>
            </Card>

            <Card className="flex-1 min-h-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                  <History className="h-4 w-4 text-medical-secondary" />
                  Medical History
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[400px] px-6 pb-6">
                  <div className="space-y-4">
                    {history.map((h, i) => (
                      <div key={i} className="p-3 rounded-lg bg-muted/50 border text-sm">
                        <div className="flex justify-between mb-1">
                          <span className="font-bold">{new Date(h.created_at).toLocaleDateString()}</span>
                          <Badge variant="outline" className="text-[10px]">Follow-up</Badge>
                        </div>
                        <p className="font-medium text-medical-primary">{h.assessment}</p>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{h.plan}</p>
                      </div>
                    ))}
                    {history.length === 0 && <p className="text-center py-10 text-muted-foreground text-xs italic">No previous records found</p>}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel: Active Work area */}
          <div className="col-span-12 lg:col-span-8 flex flex-col min-h-0">
            <Card className="flex-1 flex flex-col min-h-0 shadow-lg">
              <Tabs defaultValue="clinical" className="flex-1 flex flex-col min-h-0">
                <div className="px-6 pt-4 border-b">
                  <TabsList className="grid grid-cols-3 w-full mb-2">
                    <TabsTrigger value="clinical" className="gap-2">
                      <Stethoscope className="h-4 w-4" /> Clinical Notes
                    </TabsTrigger>
                    <TabsTrigger value="prescription" className="gap-2">
                      <Pill className="h-4 w-4" /> E-Prescription
                    </TabsTrigger>
                    <TabsTrigger value="lab" className="gap-2">
                      <FlaskConical className="h-4 w-4" /> Diagnostics
                    </TabsTrigger>
                  </TabsList>
                </div>

                <div className="flex-1 overflow-hidden">
                  <TabsContent value="clinical" className="h-full m-0 p-6 space-y-6 overflow-y-auto">
                    <div className="space-y-2">
                      <Label className="text-base font-bold">Chief Complaints</Label>
                      <Textarea 
                        placeholder="Why is the patient here? (e.g. Cough for 3 days, Fever...)" 
                        className="min-h-[100px] text-lg"
                        value={complaints}
                        onChange={(e) => setComplaints(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-base font-bold">Clinical Assessment / Diagnosis</Label>
                      <Input 
                        placeholder="Primary diagnosis (e.g. Acute Bronchitis)" 
                        className="h-12 text-lg border-2 focus-visible:ring-medical-primary"
                        value={diagnosis}
                        onChange={(e) => setDiagnosis(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-base font-bold">Treatment Plan / Advice</Label>
                      <Textarea 
                        placeholder="Next steps, recovery advice..." 
                        className="min-h-[150px]"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="prescription" className="h-full m-0 p-6 overflow-y-auto">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-bold text-lg">Add Medications</h3>
                        <Button variant="outline" size="sm" onClick={addPrescriptionRow}>
                          <Plus className="h-4 w-4 mr-1" /> Add Row
                        </Button>
                      </div>
                      
                      <div className="space-y-3">
                        {prescriptions.map((p, index) => (
                          <div key={index} className="grid grid-cols-12 gap-3 items-end p-4 border rounded-xl bg-muted/30">
                            <div className="col-span-5 space-y-1.5">
                              <Label className="text-[10px] uppercase">Medicine Name</Label>
                              <Input 
                                placeholder="Search medicine..." 
                                value={p.medicine}
                                onChange={(e) => handlePrescriptionChange(index, "medicine", e.target.value)}
                              />
                            </div>
                            <div className="col-span-3 space-y-1.5">
                              <Label className="text-[10px] uppercase">Dosage</Label>
                              <Input 
                                placeholder="1-0-1" 
                                value={p.dosage}
                                onChange={(handlePrescriptionChange.bind(null, index, "dosage")) as any}
                              />
                            </div>
                            <div className="col-span-3 space-y-1.5">
                              <Label className="text-[10px] uppercase">Duration</Label>
                              <Input 
                                placeholder="5 days" 
                                value={p.duration}
                                onChange={(e) => handlePrescriptionChange(index, "duration", e.target.value)}
                              />
                            </div>
                            <div className="col-span-1">
                              <Button variant="ghost" size="icon" className="text-destructive" onClick={() => removePrescriptionRow(index)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="lab" className="h-full m-0 p-6 overflow-y-auto">
                    <div className="space-y-6">
                      <h3 className="font-bold text-lg">Order Laboratory Tests</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {["Complete Blood Count", "Lipid Profile", "Renal Function", "Liver Function", "Urinalysis", "Blood Glucose"].map(test => (
                          <button
                            key={test}
                            onClick={() => toggleLabTest(test)}
                            className={`p-4 rounded-xl border-2 text-left transition-all ${
                              labOrders.includes(test) 
                                ? "border-medical-primary bg-medical-primary/5 ring-1 ring-medical-primary" 
                                : "border-muted hover:border-muted-foreground"
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <span className="font-medium">{test}</span>
                              {labOrders.includes(test) && <CheckCircle2 className="h-4 w-4 text-medical-primary" />}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
