import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Save, Search, Pill, Loader2, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function DispensePage() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState<any[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [selectedRx, setSelectedRx] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDispensing, setIsDispensing] = useState(false);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    const { data } = await supabase.from("patients").select("id, first_name, last_name");
    if (data) setPatients(data);
  };

  const fetchPatientPrescriptions = async (patientId: string) => {
    setIsLoading(true);
    const { data } = await supabase
      .from("prescriptions")
      .select("*, doctors(first_name, last_name)")
      .eq("patient_id", patientId)
      .order("created_at", { ascending: false });
    if (data) setPrescriptions(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (selectedPatientId) {
      fetchPatientPrescriptions(selectedPatientId);
      setSelectedRx(null);
    }
  }, [selectedPatientId]);

  const handleDispense = async () => {
    if (!selectedRx || !selectedPatientId) {
      toast.error("Please select a prescription first");
      return;
    }

    setIsDispensing(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      // In a real app, prescriptions would have items. 
      // For this prototype, we'll use the prescription's main fields.
      const { error } = await supabase.from("pharmacy_dispenses").insert({
        patient_id: selectedPatientId,
        prescription_id: selectedRx.id,
        medication_name: selectedRx.medication || "Prescribed Items",
        quantity_dispensed: 1, // Simplified
        dispensed_by: user?.id,
        status: 'dispensed'
      });

      if (error) throw error;

      toast.success("Medication dispensed successfully!");
      navigate("/pharmacy");
    } catch (error: any) {
      console.error("Error dispensing:", error);
      toast.error(error.message || "Failed to dispense medication");
    } finally {
      setIsDispensing(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Dispense Medication</h1>
          <p className="text-muted-foreground">Process prescription and dispense medication</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Search Patient</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Select Patient</Label>
                <Select value={selectedPatientId} onValueChange={setSelectedPatientId}>
                  <SelectTrigger><SelectValue placeholder="Select patient" /></SelectTrigger>
                  <SelectContent>
                    {patients.map(p => (
                      <SelectItem key={p.id} value={p.id}>{p.first_name} {p.last_name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedPatientId && (
                <div className="space-y-2">
                  <Label>Recent Prescriptions</Label>
                  <div className="space-y-2">
                    {prescriptions.map(rx => (
                      <div 
                        key={rx.id}
                        onClick={() => setSelectedRx(rx)}
                        className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                          selectedRx?.id === rx.id ? "bg-medical-primary/10 border-medical-primary" : "hover:bg-muted"
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <span className="font-bold text-xs">#{rx.id.substring(0, 8)}</span>
                          <span className="text-[10px] text-muted-foreground">{new Date(rx.created_at).toLocaleDateString()}</span>
                        </div>
                        <p className="text-xs mt-1">Dr. {rx.doctors?.first_name} {rx.doctors?.last_name}</p>
                      </div>
                    ))}
                    {prescriptions.length === 0 && !isLoading && (
                      <p className="text-xs text-muted-foreground italic text-center py-4">No prescriptions found</p>
                    )}
                    {isLoading && <div className="flex justify-center py-4"><Loader2 className="h-4 w-4 animate-spin" /></div>}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Pill className="h-5 w-5 text-medical-primary" />
                Dispensing Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedRx ? (
                <div className="space-y-6">
                  <div className="border rounded-lg p-4 bg-muted/50">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground block text-xs uppercase font-bold">Doctor:</span>
                        <span className="font-medium">Dr. {selectedRx.doctors?.first_name} {selectedRx.doctors?.last_name}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block text-xs uppercase font-bold">Date:</span>
                        <span className="font-medium">{new Date(selectedRx.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Medication</TableHead>
                        <TableHead>Dosage</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Inventory Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">{selectedRx.medication || "Consultation Item"}</TableCell>
                        <TableCell>{selectedRx.dosage || "As directed"}</TableCell>
                        <TableCell>{selectedRx.duration || "-"}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-medical-success">
                            <CheckCircle2 className="h-3 w-3" />
                            <span className="text-xs">In Stock</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                  <div className="space-y-2 pt-4 border-t">
                    <Label>Dispensing Notes</Label>
                    <Input placeholder="Batch number, expiry notes, or special instructions" />
                  </div>
                </div>
              ) : (
                <div className="h-64 flex flex-col items-center justify-center text-center p-8 bg-muted/20 border border-dashed rounded-xl">
                  <Pill className="h-12 w-12 text-muted-foreground/30 mb-4" />
                  <p className="text-muted-foreground">Select a patient and prescription to begin dispensing</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end">
          <Button 
            size="lg" 
            disabled={!selectedRx || isDispensing}
            onClick={handleDispense}
          >
            {isDispensing ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Processing...</> : 
            <>
              <Save className="mr-2 h-4 w-4" />
              Dispense Medication
            </>}
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
