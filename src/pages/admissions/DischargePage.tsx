import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, UserMinus } from "lucide-react";
import { Link } from "react-router-dom";

export default function DischargePage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link to="/admissions"><ArrowLeft className="h-4 w-4" /></Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Patient Discharge</h1>
            <p className="text-muted-foreground">Process patient discharge from hospital</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Select Patient</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Admitted Patient</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select patient to discharge" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="adm001">John Smith - Room 101A</SelectItem>
                    <SelectItem value="adm003">Robert Wilson - Room 205B</SelectItem>
                    <SelectItem value="adm004">Sarah Johnson - Room 103A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Discharge Date</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label>Discharge Type</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal Discharge</SelectItem>
                    <SelectItem value="against">Against Medical Advice</SelectItem>
                    <SelectItem value="transfer">Transfer to Another Facility</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Discharge Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Final Diagnosis</Label>
                <Textarea placeholder="Enter final diagnosis" />
              </div>
              <div className="space-y-2">
                <Label>Treatment Summary</Label>
                <Textarea placeholder="Summarize treatment provided" />
              </div>
              <div className="space-y-2">
                <Label>Follow-up Instructions</Label>
                <Textarea placeholder="Instructions for patient follow-up" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="outline" asChild>
            <Link to="/admissions">Cancel</Link>
          </Button>
          <Button>
            <UserMinus className="mr-2 h-4 w-4" />
            Process Discharge
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
