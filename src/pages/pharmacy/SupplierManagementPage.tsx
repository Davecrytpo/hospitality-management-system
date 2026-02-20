import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Truck, Plus, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockSuppliers = [
  { id: 1, name: "MediPharm Ltd", contact: "+234 801 234 5678", email: "orders@medipharm.ng", products: "Generic Drugs", status: "active", lastOrder: "2024-01-15" },
  { id: 2, name: "BioGen Pharma", contact: "+234 802 345 6789", email: "supply@biogen.ng", products: "Antibiotics", status: "active", lastOrder: "2024-01-10" },
  { id: 3, name: "InsulinPro", contact: "+234 803 456 7890", email: "orders@insulinpro.ng", products: "Diabetes Supplies", status: "inactive", lastOrder: "2023-12-20" },
];

export default function SupplierManagementPage() {
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", contact: "", email: "", products: "" });

  const handleAdd = () => {
    if (!form.name || !form.contact) return toast({ title: "Please fill required fields", variant: "destructive" });
    toast({ title: `Supplier "${form.name}" added successfully!` });
    setShowForm(false);
    setForm({ name: "", contact: "", email: "", products: "" });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2"><Truck className="h-6 w-6 text-primary" /> Supplier Management</h1>
            <p className="text-muted-foreground">Manage drug manufacturer and supplier contacts</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}><Plus className="mr-2 h-4 w-4" /> Add Supplier</Button>
        </div>

        {showForm && (
          <Card>
            <CardHeader><CardTitle>New Supplier</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1"><Label>Company Name *</Label><Input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} /></div>
                <div className="space-y-1"><Label>Phone *</Label><Input value={form.contact} onChange={e => setForm(p => ({ ...p, contact: e.target.value }))} /></div>
                <div className="space-y-1"><Label>Email</Label><Input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} /></div>
                <div className="space-y-1"><Label>Products</Label><Input value={form.products} onChange={e => setForm(p => ({ ...p, products: e.target.value }))} placeholder="e.g. Antibiotics, IV Fluids..." /></div>
              </div>
              <Button onClick={handleAdd}><Save className="mr-2 h-4 w-4" /> Save Supplier</Button>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardContent className="pt-4">
            <Table>
              <TableHeader>
                <TableRow><TableHead>Company</TableHead><TableHead>Contact</TableHead><TableHead>Products</TableHead><TableHead>Last Order</TableHead><TableHead>Status</TableHead><TableHead>Actions</TableHead></TableRow>
              </TableHeader>
              <TableBody>
                {mockSuppliers.map(s => (
                  <TableRow key={s.id}>
                    <TableCell className="font-medium">{s.name}</TableCell>
                    <TableCell><div>{s.contact}</div><div className="text-xs text-muted-foreground">{s.email}</div></TableCell>
                    <TableCell>{s.products}</TableCell>
                    <TableCell>{s.lastOrder}</TableCell>
                    <TableCell><Badge variant={s.status === "active" ? "default" : "secondary"}>{s.status}</Badge></TableCell>
                    <TableCell><Button size="sm" variant="outline" onClick={() => toast({ title: `Order placed to ${s.name}!` })}>Place Order</Button></TableCell>
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
