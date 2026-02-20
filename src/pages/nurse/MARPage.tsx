import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Pill } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockMAR = [
  { id: 1, patient: "John Smith", bed: "Ward A - Bed 3", medication: "Metformin 500mg", time: "08:00", status: "pending" },
  { id: 2, patient: "Emily Davis", bed: "Ward A - Bed 7", medication: "Lisinopril 10mg", time: "08:00", status: "given" },
  { id: 3, patient: "Robert Wilson", bed: "Ward B - Bed 2", medication: "Atorvastatin 20mg", time: "09:00", status: "pending" },
  { id: 4, patient: "Sarah Johnson", bed: "Ward B - Bed 5", medication: "Omeprazole 20mg", time: "08:00", status: "pending" },
  { id: 5, patient: "John Smith", bed: "Ward A - Bed 3", medication: "Insulin Glargine 10U", time: "06:00", status: "given" },
];

export default function MARPage() {
  const { toast } = useToast();
  const [mar, setMar] = useState(mockMAR);

  const markGiven = (id: number) => {
    setMar(prev => prev.map(m => m.id === id ? { ...m, status: "given" } : m));
    toast({ title: "Medication marked as administered" });
  };

  const pending = mar.filter(m => m.status === "pending");
  const given = mar.filter(m => m.status === "given");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2"><Pill className="h-6 w-6 text-primary" /> Medication Administration Record</h1>
          <p className="text-muted-foreground">{pending.length} pending, {given.length} administered</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            { label: "Pending", value: pending.length, color: "text-orange-600" },
            { label: "Administered", value: given.length, color: "text-green-600" },
            { label: "Total Due Today", value: mar.length, color: "text-primary" },
          ].map(s => (
            <Card key={s.label}>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">{s.label}</CardTitle></CardHeader>
              <CardContent><div className={`text-3xl font-bold ${s.color}`}>{s.value}</div></CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader><CardTitle>Medication Schedule</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mar.map(m => (
                <div key={m.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${m.status === "given" ? "bg-green-100" : "bg-orange-100"}`}>
                      {m.status === "given" ? <CheckCircle className="h-5 w-5 text-green-600" /> : <Clock className="h-5 w-5 text-orange-600" />}
                    </div>
                    <div>
                      <p className="font-medium">{m.patient} — {m.medication}</p>
                      <p className="text-sm text-muted-foreground">{m.bed} • Due: {m.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={m.status === "given" ? "default" : "secondary"}>{m.status === "given" ? "Given" : "Pending"}</Badge>
                    {m.status === "pending" && (
                      <Button size="sm" onClick={() => markGiven(m.id)}>Mark Given</Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
