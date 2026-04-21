import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HeartPulse, Thermometer, Activity, Wind, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export default function VitalsPage() {
  const [selectedPatient, setSelectedPatient] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [vitals, setVitals] = useState({
    systolic: "", diastolic: "", temperature: "", heartRate: "",
    respiratoryRate: "", oxygenSaturation: "", weight: "", height: ""
  });

  const handleChange = (field: string, value: string) => {
    setVitals(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!selectedPatient) {
      toast.error("Please select a patient first");
      return;
    }

    const hasAnyVital = Object.values(vitals).some(v => v.trim() !== "");
    if (!hasAnyVital) {
      toast.error("Please enter at least one vital sign");
      return;
    }

    setIsSaving(true);
    try {
      const { error } = await supabase.from("vitals").insert({
        patient_id: selectedPatient,
        blood_pressure_systolic: vitals.systolic ? Number(vitals.systolic) : null,
        blood_pressure_diastolic: vitals.diastolic ? Number(vitals.diastolic) : null,
        temperature: vitals.temperature ? Number(vitals.temperature) : null,
        heart_rate: vitals.heartRate ? Number(vitals.heartRate) : null,
        respiratory_rate: vitals.respiratoryRate ? Number(vitals.respiratoryRate) : null,
        oxygen_saturation: vitals.oxygenSaturation ? Number(vitals.oxygenSaturation) : null,
        weight: vitals.weight ? Number(vitals.weight) : null,
        height: vitals.height ? Number(vitals.height) : null,
        recorded_at: new Date().toISOString(),
      });

      if (error) throw error;
      toast.success("Vitals saved successfully!");
      setVitals({ systolic: "", diastolic: "", temperature: "", heartRate: "", respiratoryRate: "", oxygenSaturation: "", weight: "", height: "" });
    } catch (err) {
      console.error(err);
      toast.error("Failed to save vitals");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Patient Vitals</h1>
          <p className="text-muted-foreground">Record and monitor patient vital signs</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Select Patient</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedPatient} onValueChange={setSelectedPatient}>
              <SelectTrigger className="w-full max-w-md">
                <SelectValue placeholder="Search patient" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="p001">John Smith (P001)</SelectItem>
                <SelectItem value="p002">Emily Davis (P002)</SelectItem>
                <SelectItem value="p003">Robert Wilson (P003)</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Blood Pressure</CardTitle>
              <HeartPulse className="h-4 w-4 text-medical-danger" />
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex gap-2">
                <div className="flex-1">
                  <Label className="text-xs">Systolic</Label>
                  <Input placeholder="120" value={vitals.systolic} onChange={(e) => handleChange("systolic", e.target.value)} />
                </div>
                <div className="flex-1">
                  <Label className="text-xs">Diastolic</Label>
                  <Input placeholder="80" value={vitals.diastolic} onChange={(e) => handleChange("diastolic", e.target.value)} />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">mmHg</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Temperature</CardTitle>
              <Thermometer className="h-4 w-4 text-medical-warning" />
            </CardHeader>
            <CardContent className="space-y-2">
              <Input placeholder="98.6" value={vitals.temperature} onChange={(e) => handleChange("temperature", e.target.value)} />
              <p className="text-xs text-muted-foreground">°F</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Heart Rate</CardTitle>
              <Activity className="h-4 w-4 text-medical-primary" />
            </CardHeader>
            <CardContent className="space-y-2">
              <Input placeholder="72" value={vitals.heartRate} onChange={(e) => handleChange("heartRate", e.target.value)} />
              <p className="text-xs text-muted-foreground">bpm</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Respiratory Rate</CardTitle>
              <Wind className="h-4 w-4 text-medical-secondary" />
            </CardHeader>
            <CardContent className="space-y-2">
              <Input placeholder="16" value={vitals.respiratoryRate} onChange={(e) => handleChange("respiratoryRate", e.target.value)} />
              <p className="text-xs text-muted-foreground">breaths/min</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Additional Measurements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
              <div className="space-y-2">
                <Label>Oxygen Saturation (SpO2)</Label>
                <div className="flex items-center gap-2">
                  <Input placeholder="98" value={vitals.oxygenSaturation} onChange={(e) => handleChange("oxygenSaturation", e.target.value)} />
                  <span className="text-sm text-muted-foreground">%</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Weight</Label>
                <div className="flex items-center gap-2">
                  <Input placeholder="70" value={vitals.weight} onChange={(e) => handleChange("weight", e.target.value)} />
                  <span className="text-sm text-muted-foreground">kg</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Height</Label>
                <div className="flex items-center gap-2">
                  <Input placeholder="175" value={vitals.height} onChange={(e) => handleChange("height", e.target.value)} />
                  <span className="text-sm text-muted-foreground">cm</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            {isSaving ? "Saving..." : "Save Vitals"}
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
