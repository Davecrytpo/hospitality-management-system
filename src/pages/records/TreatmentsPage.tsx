import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Save, Plus, X } from "lucide-react";
import { useState } from "react";

export default function TreatmentsPage() {
  const [medications, setMedications] = useState([{ id: 1, name: "", dosage: "", frequency: "" }]);

  const addMedication = () => {
    setMedications([...medications, { id: Date.now(), name: "", dosage: "", frequency: "" }]);
  };

  const removeMedication = (id: number) => {
    if (medications.length > 1) {
      setMedications(medications.filter(m => m.id !== id));
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Treatment Plans</h1>
          <p className="text-muted-foreground">Create and manage patient treatment plans</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Patient & Plan Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Select Patient</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Search patient" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="p001">John Smith (P001)</SelectItem>
                    <SelectItem value="p002">Emily Davis (P002)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input type="date" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Treatment Goals</Label>
                <Textarea placeholder="Define treatment objectives" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Medications</CardTitle>
                <Button variant="outline" size="sm" onClick={addMedication}>
                  <Plus className="mr-1 h-4 w-4" />
                  Add
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {medications.map((med, index) => (
                <div key={med.id} className="flex gap-2 items-end">
                  <div className="flex-1 space-y-2">
                    <Label>Medication {index + 1}</Label>
                    <Input placeholder="Medication name" />
                  </div>
                  <div className="w-24 space-y-2">
                    <Label>Dosage</Label>
                    <Input placeholder="mg" />
                  </div>
                  <div className="w-32 space-y-2">
                    <Label>Frequency</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="once">Once daily</SelectItem>
                        <SelectItem value="twice">Twice daily</SelectItem>
                        <SelectItem value="three">Three times</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeMedication(med.id)}
                    disabled={medications.length === 1}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Additional Instructions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Dietary Recommendations</Label>
                <Textarea placeholder="Any dietary restrictions or recommendations" />
              </div>
              <div className="space-y-2">
                <Label>Follow-up Schedule</Label>
                <Textarea placeholder="Describe follow-up appointments and monitoring" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end">
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Save Treatment Plan
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
