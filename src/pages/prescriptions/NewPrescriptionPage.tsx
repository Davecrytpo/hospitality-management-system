import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Plus, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function NewPrescriptionPage() {
  const [medications, setMedications] = useState([{ id: 1 }]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link to="/prescriptions"><ArrowLeft className="h-4 w-4" /></Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Create Prescription</h1>
            <p className="text-muted-foreground">Write a new prescription for a patient</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Patient & Doctor</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Patient</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select patient" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="p001">John Smith (P001)</SelectItem>
                    <SelectItem value="p002">Emily Davis (P002)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Prescribing Doctor</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select doctor" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="d001">Dr. Sarah Johnson</SelectItem>
                    <SelectItem value="d002">Dr. Michael Chen</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Date</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label>Diagnosis</Label>
                <Input placeholder="Related diagnosis" />
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Medications</CardTitle>
                <Button variant="outline" size="sm" onClick={() => setMedications([...medications, { id: Date.now() }])}>
                  <Plus className="mr-1 h-4 w-4" />
                  Add Medication
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {medications.map((med, index) => (
                <Card key={med.id}>
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between mb-4">
                      <span className="font-medium">Medication {index + 1}</span>
                      {medications.length > 1 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setMedications(medications.filter(m => m.id !== med.id))}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      <div className="space-y-2 sm:col-span-2">
                        <Label>Medication Name</Label>
                        <Input placeholder="Enter medication" />
                      </div>
                      <div className="space-y-2">
                        <Label>Dosage</Label>
                        <Input placeholder="e.g., 500mg" />
                      </div>
                      <div className="space-y-2">
                        <Label>Frequency</Label>
                        <Select>
                          <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="od">Once daily</SelectItem>
                            <SelectItem value="bd">Twice daily</SelectItem>
                            <SelectItem value="tds">Three times daily</SelectItem>
                            <SelectItem value="qid">Four times daily</SelectItem>
                            <SelectItem value="prn">As needed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Duration</Label>
                        <Input placeholder="e.g., 7 days" />
                      </div>
                      <div className="space-y-2">
                        <Label>Route</Label>
                        <Select>
                          <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="oral">Oral</SelectItem>
                            <SelectItem value="iv">IV</SelectItem>
                            <SelectItem value="im">IM</SelectItem>
                            <SelectItem value="topical">Topical</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2 sm:col-span-2">
                        <Label>Instructions</Label>
                        <Input placeholder="Special instructions" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Additional Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea placeholder="Any additional instructions or notes for the patient" className="min-h-[100px]" />
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button variant="outline" asChild>
            <Link to="/prescriptions">Cancel</Link>
          </Button>
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Save Prescription
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
