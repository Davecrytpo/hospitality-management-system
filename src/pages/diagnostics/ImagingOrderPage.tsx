import { useState, useEffect, useCallback } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Scan, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type PersonOption = {
  id: string;
  first_name?: string | null;
  last_name?: string | null;
};

export default function ImagingOrderPage() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState<PersonOption[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [doctors, setDoctors] = useState<PersonOption[]>([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [imagingType, setImagingType] = useState("");
  const [bodyArea, setBodyArea] = useState("");
  const [priority, setPriority] = useState("routine");
  const [indication, setIndication] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchPatients = useCallback(async () => {
    const { data } = await supabase.from("patients").select("id, first_name, last_name");
    if (data) setPatients(data);
  }, []);

  const fetchDoctors = useCallback(async () => {
    const { data } = await supabase.from("doctors").select("id, first_name, last_name");
    if (data) setDoctors(data);
  }, []);

  useEffect(() => {
    fetchPatients();
    fetchDoctors();
  }, [fetchDoctors, fetchPatients]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatientId || !imagingType) {
      toast.error("Please fill in required fields");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.from("imaging_orders").insert({
        patient_id: selectedPatientId,
        doctor_id: selectedDoctorId || null,
        imaging_type: imagingType,
        body_area: bodyArea || null,
        priority: priority,
        clinical_indication: indication || null,
        status: 'ordered'
      });

      if (error) throw error;

      toast.success("Imaging order placed successfully");
      navigate("/diagnostics/imaging");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      console.error("Error ordering imaging:", error);
      toast.error(message || "Failed to place imaging order");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link to="/diagnostics/imaging"><ArrowLeft className="h-4 w-4" /></Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">New Imaging Order</h1>
            <p className="text-muted-foreground">Request X-Ray, MRI, or CT scans for a patient</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Patient & Physician</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Patient</Label>
                  <Select value={selectedPatientId} onValueChange={setSelectedPatientId} required>
                    <SelectTrigger><SelectValue placeholder="Select patient" /></SelectTrigger>
                    <SelectContent>
                      {patients.map(p => (
                        <SelectItem key={p.id} value={p.id}>{p.first_name} {p.last_name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Requesting Doctor</Label>
                  <Select value={selectedDoctorId} onValueChange={setSelectedDoctorId}>
                    <SelectTrigger><SelectValue placeholder="Select doctor" /></SelectTrigger>
                    <SelectContent>
                      {doctors.map(d => (
                        <SelectItem key={d.id} value={d.id}>Dr. {d.first_name} {d.last_name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select value={priority} onValueChange={setPriority}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="routine">Routine</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                      <SelectItem value="stat">STAT (Emergency)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scan className="h-5 w-5 text-medical-primary" />
                  Imaging Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Imaging Modality</Label>
                    <Select value={imagingType} onValueChange={setImagingType} required>
                      <SelectTrigger><SelectValue placeholder="e.g. X-Ray, MRI" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="X-Ray">X-Ray</SelectItem>
                        <SelectItem value="MRI">MRI</SelectItem>
                        <SelectItem value="CT Scan">CT Scan</SelectItem>
                        <SelectItem value="Ultrasound">Ultrasound</SelectItem>
                        <SelectItem value="PET Scan">PET Scan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Body Area / Region</Label>
                    <Input 
                      placeholder="e.g. Chest, Lower Back" 
                      value={bodyArea}
                      onChange={(e) => setBodyArea(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Clinical Indication / Notes</Label>
                  <Textarea 
                    placeholder="Reason for imaging, suspected diagnosis..." 
                    className="min-h-[150px]"
                    value={indication}
                    onChange={(e) => setIndication(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
              <Button variant="outline" asChild type="button">
                <Link to="/diagnostics/imaging">Cancel</Link>
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Ordering...</> : 
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Place Imaging Order
                </>}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
