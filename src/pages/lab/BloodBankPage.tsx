import { useEffect, useState, useCallback } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Droplets, Plus, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

type BloodUnit = {
  id: string;
  blood_type?: string | null;
  units_available?: number | null;
  donor_name?: string | null;
  collection_date?: string | null;
  expiry_date?: string | null;
};

export default function BloodBankPage() {
  const { toast } = useToast();
  const [inventory, setInventory] = useState<BloodUnit[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ blood_type: "", units_available: "", donor_name: "", collection_date: "", expiry_date: "" });
  const [loading, setLoading] = useState(true);

  const fetchInventory = useCallback(async () => {
    const { data, error } = await supabase.from("blood_bank").select("*").order("blood_type");
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    setInventory(data || []);
    setLoading(false);
  }, [toast]);

  useEffect(() => { fetchInventory(); }, [fetchInventory]);

  const handleAdd = async () => {
    if (!form.blood_type || !form.units_available) return toast({ title: "Please fill required fields", variant: "destructive" });
    const { error } = await supabase.from("blood_bank").insert({
      blood_type: form.blood_type,
      units_available: parseInt(form.units_available),
      donor_name: form.donor_name,
      collection_date: form.collection_date || new Date().toISOString().split("T")[0],
      expiry_date: form.expiry_date || null,
    });
    if (error) return toast({ title: "Error", description: error.message, variant: "destructive" });
    toast({ title: "Blood unit added to bank!" });
    setShowForm(false);
    setForm({ blood_type: "", units_available: "", donor_name: "", collection_date: "", expiry_date: "" });
    fetchInventory();
  };

  const summary = bloodTypes.map(bt => ({
    type: bt,
    units: inventory.filter(i => i.blood_type === bt).reduce((sum, i) => sum + Number(i.units_available ?? 0), 0),
  }));

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2"><Droplets className="h-6 w-6 text-primary" /> Blood Bank Management</h1>
            <p className="text-muted-foreground">Blood unit inventory and donor records</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}><Plus className="mr-2 h-4 w-4" /> Add Units</Button>
        </div>

        <div className="grid grid-cols-4 gap-3 md:grid-cols-8">
          {summary.map(s => (
            <Card key={s.type} className={s.units < 5 ? "border-destructive" : ""}>
              <CardContent className="pt-4 text-center">
                <div className="text-2xl font-bold text-primary">{s.type}</div>
                <div className={`text-lg font-semibold ${s.units < 5 ? "text-destructive" : "text-green-600"}`}>{s.units}</div>
                <div className="text-xs text-muted-foreground">units</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {showForm && (
          <Card>
            <CardHeader><CardTitle>Add Blood Units</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <Label>Blood Type *</Label>
                  <Select value={form.blood_type} onValueChange={v => setForm(p => ({ ...p, blood_type: v }))}>
                    <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                    <SelectContent>{bloodTypes.map(bt => <SelectItem key={bt} value={bt}>{bt}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-1"><Label>Units *</Label><Input type="number" value={form.units_available} onChange={e => setForm(p => ({ ...p, units_available: e.target.value }))} /></div>
                <div className="space-y-1"><Label>Donor Name</Label><Input value={form.donor_name} onChange={e => setForm(p => ({ ...p, donor_name: e.target.value }))} /></div>
                <div className="space-y-1"><Label>Collection Date</Label><Input type="date" value={form.collection_date} onChange={e => setForm(p => ({ ...p, collection_date: e.target.value }))} /></div>
                <div className="space-y-1"><Label>Expiry Date</Label><Input type="date" value={form.expiry_date} onChange={e => setForm(p => ({ ...p, expiry_date: e.target.value }))} /></div>
              </div>
              <Button onClick={handleAdd}><Save className="mr-2 h-4 w-4" /> Add to Bank</Button>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader><CardTitle>Inventory Log</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader><TableRow><TableHead>Blood Type</TableHead><TableHead>Units</TableHead><TableHead>Donor</TableHead><TableHead>Collected</TableHead><TableHead>Expires</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
              <TableBody>
                {loading ? <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">Loading...</TableCell></TableRow>
                  : inventory.length === 0 ? <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No blood units in bank.</TableCell></TableRow>
                  : inventory.map(item => (
                    <TableRow key={item.id}>
                      <TableCell><Badge>{item.blood_type}</Badge></TableCell>
                      <TableCell className="font-medium">{item.units_available}</TableCell>
                      <TableCell>{item.donor_name || "Anonymous"}</TableCell>
                      <TableCell>{item.collection_date}</TableCell>
                      <TableCell>{item.expiry_date || "N/A"}</TableCell>
                      <TableCell><Badge variant={item.units_available > 5 ? "default" : "destructive"}>{item.units_available > 5 ? "Available" : "Critical Low"}</Badge></TableCell>
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
