import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Save, Beaker, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

export default function LabResultEntryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Mock test template based on ID
  const testInfo = {
    id: id || "LAB-2024-001",
    patient: "John Smith",
    testName: "Complete Blood Count (CBC)",
    parameters: [
      { name: "Hemoglobin", unit: "g/dL", range: "13.5 - 17.5", value: "" },
      { name: "White Blood Cells", unit: "10^9/L", range: "4.5 - 11.0", value: "" },
      { name: "Platelets", unit: "10^9/L", range: "150 - 450", value: "" },
      { name: "Red Blood Cells", unit: "10^12/L", range: "4.7 - 6.1", value: "" }
    ]
  };

  const [results, setResults] = useState(testInfo.parameters);

  const handleValueChange = (index: number, val: string) => {
    const newResults = [...results];
    newResults[index].value = val;
    setResults(newResults);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Lab results finalized and sent to physician");
    navigate("/lab/results");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link to="/lab/results"><ArrowLeft className="h-4 w-4" /></Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Result Entry</h1>
            <p className="text-muted-foreground">{testInfo.testName} for {testInfo.patient}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">
          <Card>
            <CardHeader className="bg-medical-primary/5">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Test Parameters</CardTitle>
                  <CardDescription>Enter clinical values observed in the laboratory</CardDescription>
                </div>
                <Beaker className="h-8 w-8 text-medical-primary opacity-20" />
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="grid grid-cols-12 gap-4 font-semibold text-sm text-muted-foreground border-b pb-2">
                  <div className="col-span-4">Parameter Name</div>
                  <div className="col-span-3">Value</div>
                  <div className="col-span-2">Unit</div>
                  <div className="col-span-3">Reference Range</div>
                </div>

                {results.map((param, index) => (
                  <div key={param.name} className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-4 font-medium">{param.name}</div>
                    <div className="col-span-3">
                      <Input 
                        placeholder="0.00" 
                        value={param.value}
                        onChange={(e) => handleValueChange(index, e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-span-2 text-sm text-muted-foreground">{param.unit}</div>
                    <div className="col-span-3 text-sm font-mono bg-muted p-1 rounded text-center">
                      {param.range}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Technician Remarks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-sm text-amber-800 dark:text-amber-400">
                  Values outside reference ranges will be automatically flagged in the patient's record.
                </p>
              </div>
              <Label>Laboratory Notes</Label>
              <Input placeholder="Additional observations or sample quality notes..." />
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button variant="outline" type="button" onClick={() => navigate("/lab/results")}>Cancel</Button>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              Finalize Results
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
