import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Package, Plus, Save, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type SupplyStatus = "ok" | "low" | "critical";

type SupplyItem = {
  id: number;
  item: string;
  category: string;
  stock: number;
  min: number;
  unit: string;
  status: SupplyStatus;
};

const mockSupplies: SupplyItem[] = [
  { id: 1, item: "Sterile Gloves (L)", category: "PPE", stock: 250, min: 100, unit: "pairs", status: "ok" },
  { id: 2, item: "Sterile Gauze 4x4", category: "Wound Care", stock: 80, min: 200, unit: "packs", status: "low" },
  { id: 3, item: "IV Cannula 18G", category: "IV Supplies", stock: 45, min: 50, unit: "pcs", status: "critical" },
  { id: 4, item: "Syringes 5ml", category: "Injection", stock: 300, min: 100, unit: "pcs", status: "ok" },
  { id: 5, item: "Alcohol Swabs", category: "Antiseptic", stock: 15, min: 100, unit: "boxes", status: "critical" },
];

export default function ConsumablesTrackerPage() {
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ item: "", category: "", stock: "", min: "", unit: "" });

  const handleAdd = () => {
    if (!form.item || !form.stock) return toast({ title: "Please fill all required fields", variant: "destructive" });
    toast({ title: `${form.item} added to consumables tracker!` });
    setShowForm(false);
    setForm({ item: "", category: "", stock: "", min: "", unit: "" });
  };

  const statusColor: Record<SupplyStatus, BadgeProps["variant"]> = {
    ok: "default",
    low: "secondary",
    critical: "destructive",
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2"><Package className="h-6 w-6 text-primary" /> Consumables Tracker</h1>
            <p className="text-muted-foreground">Ward supplies and consumables inventory</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}><Plus className="mr-2 h-4 w-4" /> Add Item</Button>
        </div>

        {showForm && (
          <Card>
            <CardHeader><CardTitle>Add Consumable Item</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-1"><Label>Item Name *</Label><Input value={form.item} onChange={e => setForm(p => ({ ...p, item: e.target.value }))} /></div>
                <div className="space-y-1"><Label>Category</Label><Input value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} /></div>
                <div className="space-y-1"><Label>Unit</Label><Input value={form.unit} onChange={e => setForm(p => ({ ...p, unit: e.target.value }))} placeholder="pcs, boxes..." /></div>
                <div className="space-y-1"><Label>Current Stock *</Label><Input type="number" value={form.stock} onChange={e => setForm(p => ({ ...p, stock: e.target.value }))} /></div>
                <div className="space-y-1"><Label>Minimum Stock</Label><Input type="number" value={form.min} onChange={e => setForm(p => ({ ...p, min: e.target.value }))} /></div>
              </div>
              <Button onClick={handleAdd}><Save className="mr-2 h-4 w-4" /> Add Item</Button>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Ward Supplies</CardTitle>
            {mockSupplies.some(s => s.status !== "ok") && (
              <p className="text-sm text-destructive flex items-center gap-1"><AlertTriangle className="h-4 w-4" /> {mockSupplies.filter(s => s.status !== "ok").length} items need restocking</p>
            )}
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow><TableHead>Item</TableHead><TableHead>Category</TableHead><TableHead>Stock</TableHead><TableHead>Min. Required</TableHead><TableHead>Status</TableHead></TableRow>
              </TableHeader>
              <TableBody>
                {mockSupplies.map(s => (
                  <TableRow key={s.id}>
                    <TableCell className="font-medium">{s.item}</TableCell>
                    <TableCell>{s.category}</TableCell>
                    <TableCell>{s.stock} {s.unit}</TableCell>
                    <TableCell>{s.min} {s.unit}</TableCell>
                    <TableCell><Badge variant={statusColor[s.status]}>{s.status === "ok" ? "OK" : s.status.toUpperCase()}</Badge></TableCell>
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
