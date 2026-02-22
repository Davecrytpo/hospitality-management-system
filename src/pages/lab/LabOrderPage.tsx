import { useState, useEffect, useCallback } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Plus, Search, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type PersonOption = {
  id: string;
  first_name?: string | null;
  last_name?: string | null;
};

const testCategories = [
  {
    name: "Hematology",
    tests: ["Complete Blood Count (CBC)", "Hemoglobin", "Blood Grouping", "ESR", "Peripheral Smear"]
  },
  {
    name: "Biochemistry",
    tests: ["Blood Glucose (F/PP/R)", "HbA1c", "Lipid Profile", "Liver Function Test (LFT)", "Renal Function Test (RFT)"]
  },
  {
    name: "Immunology & Serology",
    tests: ["HIV 1&2", "HBsAg", "HCV", "VDRL/RPR", "Widal Test", "CRP"]
  },
  {
    name: "Urine Analysis",
    tests: ["Urine Routine", "Urine Culture", "Urine Pregnancy Test"]
  }
];

export default function LabOrderPage() {
  const navigate = useNavigate();
  const [selectedTests, setSelectedTests] = useState<string[]>([]);
  const [urgency, setUrgency] = useState("routine");
  const [patients, setPatients] = useState<PersonOption[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [doctors, setDoctors] = useState<PersonOption[]>([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [notes, setNotes] = useState("");

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

  const toggleTest = (test: string) => {
    setSelectedTests(prev => 
      prev.includes(test) ? prev.filter(t => t !== test) : [...prev, test]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatientId) {
      toast.error("Please select a patient");
      return;
    }
    if (selectedTests.length === 0) {
      toast.error("Please select at least one test");
      return;
    }

    setIsLoading(true);

    try {
      // Create multiple lab test records
      const orders = selectedTests.map(testName => ({
        patient_id: selectedPatientId,
        doctor_id: selectedDoctorId || null,
        test_name: testName,
        test_type: "Routine", // Simplified for now
        priority: urgency,
        status: "ordered",
        notes: notes || null
      }));

      const { error } = await supabase.from("lab_tests").insert(orders);

      if (error) throw error;

      toast.success(`${selectedTests.length} Lab test orders placed successfully`);
      navigate("/lab");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      console.error("Error placing lab order:", error);
      toast.error(message || "Failed to place lab order");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link to="/lab"><ArrowLeft className="h-4 w-4" /></Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">New Lab Order</h1>
            <p className="text-muted-foreground">Request laboratory tests for a patient</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Patient & Priority</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Patient</Label>
                  <Select value={selectedPatientId} onValueChange={setSelectedPatientId}>
                    <SelectTrigger><SelectValue placeholder="Select patient" /></SelectTrigger>
                    <SelectContent>
                      {patients.map(p => (
                        <SelectItem key={p.id} value={p.id}>{p.first_name} {p.last_name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Ordering Physician</Label>
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
                  <Select value={urgency} onValueChange={setUrgency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="routine">Routine</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                      <SelectItem value="stat">STAT (Emergency)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Clinical Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea 
                  placeholder="Reason for test, clinical indications..." 
                  className="min-h-[120px]"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Select Tests</CardTitle>
                  <div className="relative w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search tests..." className="pl-8" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  {testCategories.map((category) => (
                    <div key={category.name} className="space-y-3">
                      <h3 className="font-semibold text-sm text-medical-primary uppercase tracking-wider">
                        {category.name}
                      </h3>
                      <div className="space-y-2">
                        {category.tests.map((test) => (
                          <div key={test} className="flex items-center space-x-2">
                            <Checkbox 
                              id={test} 
                              checked={selectedTests.includes(test)}
                              onCheckedChange={() => toggleTest(test)}
                            />
                            <Label 
                              htmlFor={test} 
                              className="text-sm font-normal cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {test}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
              <Button variant="outline" asChild>
                <Link to="/lab">Cancel</Link>
              </Button>
              <Button type="submit" disabled={isLoading || selectedTests.length === 0}>
                {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Processing...</> : 
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Place Order ({selectedTests.length})
                </>}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
