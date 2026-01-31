import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Save, Stethoscope } from "lucide-react";

export default function DiagnosisPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Diagnosis Entry</h1>
          <p className="text-muted-foreground">Record patient diagnosis and findings</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Stethoscope className="h-5 w-5" />
                Patient Selection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Select Patient</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Search patient" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="p001">John Smith (P001)</SelectItem>
                    <SelectItem value="p002">Emily Davis (P002)</SelectItem>
                    <SelectItem value="p003">Robert Wilson (P003)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Attending Doctor</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select doctor" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="d001">Dr. Sarah Johnson</SelectItem>
                    <SelectItem value="d002">Dr. Michael Chen</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Diagnosis Date</Label>
                <Input type="date" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Diagnosis Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>ICD-10 Code</Label>
                <Input placeholder="Enter ICD-10 code" />
              </div>
              <div className="space-y-2">
                <Label>Primary Diagnosis</Label>
                <Textarea placeholder="Enter primary diagnosis" />
              </div>
              <div className="space-y-2">
                <Label>Secondary Diagnosis</Label>
                <Textarea placeholder="Enter any secondary diagnosis" />
              </div>
              <div className="space-y-2">
                <Label>Clinical Notes</Label>
                <Textarea placeholder="Additional clinical observations" className="min-h-[120px]" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end">
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Save Diagnosis
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
