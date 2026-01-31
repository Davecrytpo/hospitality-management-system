import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save } from "lucide-react";
import { Link } from "react-router-dom";

export default function NewAdmissionPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link to="/admissions"><ArrowLeft className="h-4 w-4" /></Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">New Admission</h1>
            <p className="text-muted-foreground">Admit a new patient to the hospital</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Patient Information</CardTitle>
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
                    <SelectItem value="d003">Dr. Emily Davis</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Admission Date</Label>
                <Input type="date" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Room Assignment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Ward Type</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select ward" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Ward</SelectItem>
                    <SelectItem value="private">Private Room</SelectItem>
                    <SelectItem value="icu">ICU</SelectItem>
                    <SelectItem value="surgery">Surgery Ward</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Room Number</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select room" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="101a">101A (Available)</SelectItem>
                    <SelectItem value="102b">102B (Available)</SelectItem>
                    <SelectItem value="205a">205A (Available)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Bed Number</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select bed" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Bed 1</SelectItem>
                    <SelectItem value="2">Bed 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Admission Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Reason for Admission</Label>
                <Textarea placeholder="Describe the reason for admission" />
              </div>
              <div className="space-y-2">
                <Label>Initial Diagnosis</Label>
                <Textarea placeholder="Enter initial diagnosis" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select priority" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="routine">Routine</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                      <SelectItem value="emergency">Emergency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Expected Stay (days)</Label>
                  <Input type="number" placeholder="5" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="outline" asChild>
            <Link to="/admissions">Cancel</Link>
          </Button>
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Admit Patient
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
