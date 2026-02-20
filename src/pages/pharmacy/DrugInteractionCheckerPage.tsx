import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Search, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const interactions: Record<string, string[]> = {
  "warfarin": ["aspirin", "ibuprofen", "naproxen", "metronidazole"],
  "metformin": ["alcohol"],
  "simvastatin": ["clarithromycin", "erythromycin", "amiodarone"],
  "lisinopril": ["potassium", "spironolactone"],
};

export default function DrugInteractionCheckerPage() {
  const { toast } = useToast();
  const [drug1, setDrug1] = useState("");
  const [drug2, setDrug2] = useState("");
  const [result, setResult] = useState<null | { safe: boolean; message: string }>(null);

  const checkInteraction = () => {
    if (!drug1 || !drug2) return toast({ title: "Enter both medications to check", variant: "destructive" });
    const d1 = drug1.toLowerCase().trim();
    const d2 = drug2.toLowerCase().trim();
    const d1Interactions = interactions[d1] || [];
    const d2Interactions = interactions[d2] || [];
    const hasInteraction = d1Interactions.includes(d2) || d2Interactions.includes(d1);
    setResult({
      safe: !hasInteraction,
      message: hasInteraction
        ? `⚠️ Potential interaction detected between ${drug1} and ${drug2}. Consult physician before prescribing together.`
        : `✅ No known major interaction between ${drug1} and ${drug2}.`,
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2"><AlertCircle className="h-6 w-6 text-primary" /> Drug Interaction Checker</h1>
          <p className="text-muted-foreground">Check for potential interactions between two medications</p>
        </div>

        <Card>
          <CardHeader><CardTitle>Interaction Check</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1"><Label>Medication 1 *</Label><Input value={drug1} onChange={e => setDrug1(e.target.value)} placeholder="e.g. Warfarin" /></div>
              <div className="space-y-1"><Label>Medication 2 *</Label><Input value={drug2} onChange={e => setDrug2(e.target.value)} placeholder="e.g. Aspirin" /></div>
            </div>
            <Button className="w-full" onClick={checkInteraction}><Search className="mr-2 h-4 w-4" /> Check Interaction</Button>

            {result && (
              <div className={`p-4 rounded-lg border-2 flex items-start gap-3 ${result.safe ? "bg-green-50 border-green-300" : "bg-red-50 border-red-300"}`}>
                {result.safe ? <CheckCircle className="h-6 w-6 text-green-600 mt-0.5 shrink-0" /> : <XCircle className="h-6 w-6 text-red-600 mt-0.5 shrink-0" />}
                <p className={`font-medium ${result.safe ? "text-green-800" : "text-red-800"}`}>{result.message}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Common Drug Interactions Reference</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(interactions).map(([drug, interacts]) => (
                <div key={drug} className="flex items-center gap-3 p-3 border rounded-lg">
                  <Badge className="capitalize">{drug}</Badge>
                  <span className="text-muted-foreground text-sm">interacts with:</span>
                  <div className="flex gap-1 flex-wrap">{interacts.map(i => <Badge key={i} variant="destructive" className="capitalize">{i}</Badge>)}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
