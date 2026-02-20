import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save, Activity, Heart, Thermometer, Gauge } from "lucide-react";
import { toast } from "sonner";

export default function TriageAssessmentPage() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Initial triage assessment saved");
    navigate("/vitals");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link to="/vitals"><ArrowLeft className="h-4 w-4" /></Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Nursing Triage & Assessment</h1>
            <p className="text-muted-foreground">Record initial vitals and symptoms</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-medical-primary" />
                Vitals Recording
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label className="flex items-center gap-1"><Heart className="h-3 w-3" /> Blood Pressure (Systolic/Diastolic)</Label>
                  <div className="flex items-center gap-2">
                    <Input placeholder="120" className="text-center" />
                    <span>/</span>
                    <Input placeholder="80" className="text-center" />
                    <span className="text-xs text-muted-foreground">mmHg</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-1"><Activity className="h-3 w-3" /> Heart Rate</Label>
                  <div className="flex items-center gap-2">
                    <Input placeholder="72" />
                    <span className="text-xs text-muted-foreground">bpm</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-1"><Thermometer className="h-3 w-3" /> Temperature</Label>
                  <div className="flex items-center gap-2">
                    <Input placeholder="98.6" />
                    <span className="text-xs text-muted-foreground">°F</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-1"><Gauge className="h-3 w-3" /> Oxygen Saturation (SpO2)</Label>
                  <div className="flex items-center gap-2">
                    <Input placeholder="98" />
                    <span className="text-xs text-muted-foreground">%</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 pt-4 border-t">
                <Label>Patient Complaints / Symptoms</Label>
                <Textarea 
                  placeholder="Primary reasons for visit, duration of symptoms..." 
                  className="min-h-[150px]"
                />
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Triage Category</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select defaultValue="routine">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="emergency">Emergency (Red)</SelectItem>
                    <SelectItem value="urgent">Urgent (Yellow)</SelectItem>
                    <SelectItem value="routine">Routine (Green)</SelectItem>
                  </SelectContent>
                </Select>
                <div className="p-3 bg-blue-50 dark:bg-blue-900/10 rounded-lg text-xs text-blue-800 dark:text-blue-300">
                  Select the urgency level based on the initial assessment. Emergency cases are prioritized in the doctor's queue.
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Patient Identification</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select required>
                  <SelectTrigger><SelectValue placeholder="Select patient" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="p1">John Smith (PAT-001)</SelectItem>
                    <SelectItem value="p2">Sarah Johnson (PAT-002)</SelectItem>
                  </SelectContent>
                </Select>
                <div className="space-y-2">
                  <Label>Assessing Nurse</Label>
                  <Input defaultValue="Nurse Alice Thompson" disabled />
                </div>
              </CardContent>
            </Card>

            <Button type="submit" className="w-full h-12">
              <Save className="mr-2 h-5 w-5" />
              Complete Triage
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
