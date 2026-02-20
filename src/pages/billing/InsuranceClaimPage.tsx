import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Plus, FileText } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function InsuranceClaimPage() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Insurance claim submitted successfully");
    navigate("/billing/insurance");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link to="/billing/insurance"><ArrowLeft className="h-4 w-4" /></Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">New Insurance Claim</h1>
            <p className="text-muted-foreground">Submit a new reimbursement request</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Claim Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Patient</Label>
                  <Select required>
                    <SelectTrigger><SelectValue placeholder="Select patient" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="p1">John Smith (PAT-001)</SelectItem>
                      <SelectItem value="p2">Sarah Johnson (PAT-002)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Insurance Provider</Label>
                  <Select required>
                    <SelectTrigger><SelectValue placeholder="Select provider" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bc">BlueCross BlueShield</SelectItem>
                      <SelectItem value="ae">Aetna</SelectItem>
                      <SelectItem value="un">UnitedHealthcare</SelectItem>
                      <SelectItem value="ci">Cigna</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Policy Number</Label>
                  <Input placeholder="Enter policy number" required />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Attachments</CardTitle>
                <CardDescription>Upload supporting documents</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="invoice">Invoice / Bill</Label>
                  <Input id="invoice" type="file" />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="report">Medical Report</Label>
                  <Input id="report" type="file" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Claim Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Claim Date</Label>
                    <Input type="date" required />
                  </div>
                  <div className="space-y-2">
                    <Label>Claim Amount ($)</Label>
                    <Input type="number" step="0.01" placeholder="0.00" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Diagnosis Code (ICD-10)</Label>
                  <Input placeholder="e.g. I10 (Essential hypertension)" />
                </div>
                <div className="space-y-2">
                  <Label>Treatment Description</Label>
                  <Textarea 
                    placeholder="Briefly describe the treatment or service provided..." 
                    className="min-h-[150px]"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
              <Button variant="outline" asChild>
                <Link to="/billing/insurance">Cancel</Link>
              </Button>
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" />
                Submit Claim
              </Button>
            </div>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
