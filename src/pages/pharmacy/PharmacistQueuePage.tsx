import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pill, Search, CheckCircle, Clock, Eye } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function PharmacistQueuePage() {
  const { toast } = useToast();
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("prescriptions")
      .select("*, patients(first_name, last_name), doctors(first_name, last_name)")
      .eq("status", "active")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
        setPrescriptions(data || []);
        setLoading(false);
      });
  }, []);

  const handleDispense = async (prescriptionId: string, patientId: string, medName: string) => {
    try {
      const { error } = await supabase.from("pharmacy_dispenses").insert({
        prescription_id: prescriptionId,
        patient_id: patientId,
        medication_name: medName,
        quantity_dispensed: 1,
        status: "dispensed",
      });
      if (error) throw error;
      await supabase.from("prescriptions").update({ status: "dispensed" }).eq("id", prescriptionId);
      setPrescriptions(prev => prev.filter(p => p.id !== prescriptionId));
      toast({ title: "Medication dispensed successfully!" });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  const filtered = prescriptions.filter(p =>
    `${p.patients?.first_name} ${p.patients?.last_name} ${p.medication_name}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2"><Pill className="h-6 w-6 text-primary" /> Dispensing Queue</h1>
          <p className="text-muted-foreground">{filtered.length} prescriptions waiting to be dispensed</p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input className="pl-9" placeholder="Search by patient or medication..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>

        <Card>
          <CardContent className="pt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Medication</TableHead>
                  <TableHead>Dosage</TableHead>
                  <TableHead>Frequency</TableHead>
                  <TableHead>Prescribed By</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">Loading...</TableCell></TableRow>
                ) : filtered.length === 0 ? (
                  <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">Queue is empty.</TableCell></TableRow>
                ) : filtered.map(p => (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium">{p.patients?.first_name} {p.patients?.last_name}</TableCell>
                    <TableCell>{p.medication_name}</TableCell>
                    <TableCell>{p.dosage}</TableCell>
                    <TableCell>{p.frequency}</TableCell>
                    <TableCell>Dr. {p.doctors?.first_name} {p.doctors?.last_name}</TableCell>
                    <TableCell>
                      <Button size="sm" onClick={() => handleDispense(p.id, p.patient_id, p.medication_name)}>
                        <CheckCircle className="mr-2 h-3 w-3" /> Dispense
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
