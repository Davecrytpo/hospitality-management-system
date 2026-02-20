import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Plus, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

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

  const toggleTest = (test: string) => {
    setSelectedTests(prev => 
      prev.includes(test) ? prev.filter(t => t !== test) : [...prev, test]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Lab order placed successfully");
    navigate("/lab");
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
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select patient" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="p1">John Smith (PAT-001)</SelectItem>
                      <SelectItem value="p2">Sarah Johnson (PAT-002)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Ordering Physician</Label>
                  <Input defaultValue="Dr. Sarah Johnson" disabled />
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
              <Button type="submit" disabled={selectedTests.length === 0}>
                <Save className="mr-2 h-4 w-4" />
                Place Order ({selectedTests.length})
              </Button>
            </div>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
